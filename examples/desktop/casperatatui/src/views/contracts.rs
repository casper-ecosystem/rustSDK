//! Contracts view: hash/package lookup, entry points, key/dict queries.

use ratatui::layout::{Constraint, Direction, Layout, Rect};
use ratatui::style::{Color, Modifier, Style};
use ratatui::text::{Line, Span};
use ratatui::widgets::{Block, Borders, List, ListItem, Paragraph, Wrap};
use ratatui::Frame;

use crate::model::{AppModel, ContractsSection, InputMode};

pub fn draw_contracts(frame: &mut Frame, area: Rect, model: &AppModel) {
    let chunks = Layout::default()
        .direction(Direction::Vertical)
        .constraints([Constraint::Length(5), Constraint::Min(5)])
        .split(area);

    draw_header(frame, chunks[0], model);
    draw_section(frame, chunks[1], model);
}

fn draw_header(frame: &mut Frame, area: Rect, model: &AppModel) {
    let lookup = if model.input_mode == InputMode::ContractLookup {
        format!("/{}", model.contracts.lookup.display_with_cursor())
    } else {
        let buf = if model.contracts.lookup.buffer.is_empty() {
            model
                .contracts
                .loaded_key
                .as_deref()
                .unwrap_or("(press / hash|package|auction|mint)")
        } else {
            model.contracts.lookup.buffer.as_str()
        };
        format!("/{buf}")
    };

    let tabs: Vec<Span> = ContractsSection::visible(model.enable_writes)
        .iter()
        .map(|sec| {
            let selected = *sec == model.contracts.section;
            let label = format!(" {} ", sec.title());
            if selected {
                Span::styled(
                    label,
                    Style::default()
                        .fg(Color::Black)
                        .bg(Color::Cyan)
                        .add_modifier(Modifier::BOLD),
                )
            } else {
                Span::styled(label, Style::default().fg(Color::DarkGray))
            }
        })
        .collect();

    let mut lines = vec![
        Line::from(Span::styled(
            "/ lookup | Tab section | Enter load/query | j/k lists",
            Style::default().fg(Color::DarkGray),
        )),
        Line::from(Span::styled(lookup, Style::default().fg(Color::Cyan))),
        Line::from(tabs),
    ];
    if let Some(loaded) = &model.contracts.loaded_key {
        lines.push(Line::from(Span::styled(
            format!("loaded: {loaded}"),
            Style::default().fg(Color::Green),
        )));
    }

    frame.render_widget(
        Paragraph::new(lines).block(
            Block::default()
                .borders(Borders::ALL)
                .border_style(Style::default().fg(Color::Cyan))
                .title(" Contracts | entry points & ghosts in the attic "),
        ),
        area,
    );
}

fn draw_section(frame: &mut Frame, area: Rect, model: &AppModel) {
    match model.contracts.section {
        ContractsSection::Overview => draw_overview(frame, area, model),
        ContractsSection::NamedKeys => draw_named_keys(frame, area, model),
        ContractsSection::EntryPoints => draw_entry_points(frame, area, model),
        ContractsSection::QueryKey => draw_query_key(frame, area, model),
        ContractsSection::QueryDict => draw_query_dict(frame, area, model),
        ContractsSection::Writes => draw_writes(frame, area, model),
    }
}

fn draw_overview(frame: &mut Frame, area: Rect, model: &AppModel) {
    let mut lines: Vec<Line> = Vec::new();
    match &model.contracts.overview {
        Some(o) => {
            lines.push(Line::from(format!("kind: {}", o.kind)));
            lines.push(Line::from(format!("key: {}", o.key)));
            lines.push(Line::from(format!(
                "package: {}",
                o.package_hash.as_deref().unwrap_or("?")
            )));
            lines.push(Line::from(format!(
                "wasm: {}",
                o.wasm_hash.as_deref().unwrap_or("?")
            )));
            lines.push(Line::from(format!(
                "named_keys: {} | entry_points: {}",
                o.named_keys.len(),
                o.entry_points.len()
            )));
        }
        None => {
            lines.push(Line::from(
                "No contract loaded. / paste hash-… or shortcut auction|mint then Enter.",
            ));
        }
    }
    frame.render_widget(
        Paragraph::new(lines)
            .block(
                Block::default()
                    .borders(Borders::ALL)
                    .border_style(Style::default().fg(Color::Cyan))
                    .title(" Overview "),
            )
            .wrap(Wrap { trim: false })
            .scroll((model.contracts.scroll, 0)),
        area,
    );
}

fn draw_named_keys(frame: &mut Frame, area: Rect, model: &AppModel) {
    let keys = model
        .contracts
        .overview
        .as_ref()
        .map(|o| o.named_keys.as_slice())
        .unwrap_or(&[]);
    let items: Vec<ListItem> = if keys.is_empty() {
        vec![ListItem::new("No named keys (load a Contract first).")]
    } else {
        keys.iter()
            .enumerate()
            .map(|(i, row)| {
                let marker = if i == model.contracts.list_selected {
                    ">"
                } else {
                    " "
                };
                let line = format!("{marker} {:<28} {}", truncate(&row.name, 28), row.key);
                list_item(line, i == model.contracts.list_selected)
            })
            .collect()
    };
    frame.render_widget(
        List::new(items).block(
            Block::default()
                .borders(Borders::ALL)
                .border_style(Style::default().fg(Color::Cyan))
                .title(" Named keys "),
        ),
        area,
    );
}

fn draw_entry_points(frame: &mut Frame, area: Rect, model: &AppModel) {
    let eps = model
        .contracts
        .overview
        .as_ref()
        .map(|o| o.entry_points.as_slice())
        .unwrap_or(&[]);
    let items: Vec<ListItem> = if eps.is_empty() {
        vec![ListItem::new("No entry points yet.")]
    } else {
        eps.iter()
            .enumerate()
            .map(|(i, row)| {
                let marker = if i == model.contracts.list_selected {
                    ">"
                } else {
                    " "
                };
                let args = if row.args_summary.is_empty() {
                    "()".to_string()
                } else {
                    format!("({})", row.args_summary)
                };
                let line = format!(
                    "{marker} {} {} -> {} [{}]",
                    row.name, args, row.ret, row.access
                );
                list_item(line, i == model.contracts.list_selected)
            })
            .collect()
    };
    frame.render_widget(
        List::new(items).block(
            Block::default()
                .borders(Borders::ALL)
                .border_style(Style::default().fg(Color::Cyan))
                .title(" Entry points "),
        ),
        area,
    );
}

fn draw_query_key(frame: &mut Frame, area: Rect, model: &AppModel) {
    let chunks = Layout::default()
        .direction(Direction::Vertical)
        .constraints([Constraint::Length(6), Constraint::Min(3)])
        .split(area);

    let editing = model.input_mode == InputMode::ContractQueryKey;
    let path = if editing {
        model.contracts.query_path.display_with_cursor()
    } else if model.contracts.query_path.buffer.is_empty() {
        "(empty - press Enter to edit path)".into()
    } else {
        model.contracts.query_path.buffer.clone()
    };
    let entity = model
        .contracts
        .loaded_key
        .as_deref()
        .unwrap_or("(load a contract first)");

    let form = Paragraph::new(vec![
        Line::from(Span::styled(
            "query_contract_key | Enter edit/submit | Esc cancel",
            Style::default().fg(Color::DarkGray),
        )),
        Line::from(format!("entity: {entity}")),
        Line::from(Span::styled(
            format!("path: {path}"),
            if editing {
                Style::default()
                    .fg(Color::Black)
                    .bg(Color::Yellow)
                    .add_modifier(Modifier::BOLD)
            } else {
                Style::default().fg(Color::Gray)
            },
        )),
    ])
    .block(
        Block::default()
            .borders(Borders::ALL)
            .border_style(Style::default().fg(Color::Yellow))
            .title(" Query key "),
    );
    frame.render_widget(form, chunks[0]);

    let body = model
        .contracts
        .query_result_text
        .as_deref()
        .unwrap_or("No query result yet. Try path era_id on auction.");
    frame.render_widget(
        Paragraph::new(body)
            .block(
                Block::default()
                    .borders(Borders::ALL)
                    .border_style(Style::default().fg(Color::Cyan))
                    .title(" Result "),
            )
            .wrap(Wrap { trim: false })
            .scroll((model.contracts.scroll, 0)),
        chunks[1],
    );
}

fn draw_query_dict(frame: &mut Frame, area: Rect, model: &AppModel) {
    let chunks = Layout::default()
        .direction(Direction::Vertical)
        .constraints([Constraint::Length(9), Constraint::Min(3)])
        .split(area);

    let editing = model.input_mode == InputMode::ContractQueryDict;
    let field = |idx: usize, label: &str, input: &crate::text_input::TextInput| -> Line<'_> {
        let active = editing && model.contracts.dict_field % 3 == idx;
        let value = if active {
            input.display_with_cursor()
        } else if input.buffer.is_empty() {
            "(empty)".to_string()
        } else {
            input.buffer.clone()
        };
        let style = if active {
            Style::default()
                .fg(Color::Black)
                .bg(Color::Yellow)
                .add_modifier(Modifier::BOLD)
        } else {
            Style::default().fg(Color::Gray)
        };
        Line::from(Span::styled(format!("{label}: {value}"), style))
    };

    let form = Paragraph::new(vec![
        Line::from(Span::styled(
            "query_contract_dict (uref) | Enter edit/submit | Tab fields",
            Style::default().fg(Color::DarkGray),
        )),
        field(0, "seed_uref", &model.contracts.dict_seed),
        field(1, "item_key ", &model.contracts.dict_item),
        field(2, "state_root (optional)", &model.contracts.dict_srh),
    ])
    .block(
        Block::default()
            .borders(Borders::ALL)
            .border_style(Style::default().fg(Color::Yellow))
            .title(" Query dict "),
    );
    frame.render_widget(form, chunks[0]);

    let body = model
        .contracts
        .query_result_text
        .as_deref()
        .unwrap_or("No dictionary result yet.");
    frame.render_widget(
        Paragraph::new(body)
            .block(
                Block::default()
                    .borders(Borders::ALL)
                    .border_style(Style::default().fg(Color::Cyan))
                    .title(" Result "),
            )
            .wrap(Wrap { trim: false })
            .scroll((model.contracts.scroll, 0)),
        chunks[1],
    );
}

fn draw_writes(frame: &mut Frame, area: Rect, model: &AppModel) {
    let lines = if model.enable_writes {
        vec![
            Line::from(Span::styled(
                "Writes unlocked (--enable-writes)",
                Style::default()
                    .fg(Color::Green)
                    .add_modifier(Modifier::BOLD),
            )),
            Line::from(""),
            Line::from("install / call_entrypoint need a session PEM (press o, or --secret-key)."),
            Line::from("Until then, use Actions for read queries, or expect SDK errors here."),
            Line::from(""),
            Line::from(format!(
                "Loaded contract: {}",
                model.contracts.loaded_key.as_deref().unwrap_or("(none)")
            )),
        ]
    } else {
        vec![
            Line::from(Span::styled(
                "Writes locked",
                Style::default()
                    .fg(Color::Yellow)
                    .add_modifier(Modifier::BOLD),
            )),
            Line::from(""),
            Line::from("Restart with --enable-writes to show install / call_entrypoint."),
            Line::from("Then load a PEM with o or --secret-key."),
        ]
    };
    frame.render_widget(
        Paragraph::new(lines)
            .block(
                Block::default()
                    .borders(Borders::ALL)
                    .border_style(Style::default().fg(Color::Yellow))
                    .title(" Writes "),
            )
            .wrap(Wrap { trim: false }),
        area,
    );
}

fn list_item(line: String, selected: bool) -> ListItem<'static> {
    let style = if selected {
        Style::default()
            .fg(Color::Black)
            .bg(Color::Cyan)
            .add_modifier(Modifier::BOLD)
    } else {
        Style::default().fg(Color::Gray)
    };
    ListItem::new(Line::from(Span::styled(line, style)))
}

fn truncate(s: &str, max: usize) -> String {
    if s.chars().count() <= max {
        format!("{s:<max$}")
    } else {
        let mut out: String = s.chars().take(max.saturating_sub(2)).collect();
        out.push_str("..");
        out
    }
}
