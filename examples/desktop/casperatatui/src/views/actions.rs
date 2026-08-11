//! Actions view: catalog list + form + scrollable JSON result.

use ratatui::layout::{Constraint, Direction, Layout, Rect};
use ratatui::style::{Color, Modifier, Style};
use ratatui::text::{Line, Span};
use ratatui::widgets::{Block, Borders, List, ListItem, Paragraph, Wrap};
use ratatui::Frame;

use crate::actions_catalog::find_action;
use crate::model::{ActionsPane, AppModel, InputMode};

pub fn draw_actions(frame: &mut Frame, area: Rect, model: &AppModel) {
    let chunks = Layout::default()
        .direction(Direction::Horizontal)
        .constraints([Constraint::Percentage(38), Constraint::Percentage(62)])
        .split(area);

    draw_list(frame, chunks[0], model);
    draw_right(frame, chunks[1], model);
}

fn draw_list(frame: &mut Frame, area: Rect, model: &AppModel) {
    let visible = model.actions.visible(model.enable_writes, model.has_pem());
    let selected = if visible.is_empty() {
        0
    } else {
        model.actions.selected.min(visible.len() - 1)
    };
    let items: Vec<ListItem> = visible
        .iter()
        .enumerate()
        .map(|(i, spec)| {
            let marker = if i == selected { ">" } else { " " };
            let line = format!(
                "{marker} [{group}] {id}",
                group = spec.group.label(),
                id = spec.id
            );
            let style = if i == selected {
                Style::default()
                    .fg(Color::Black)
                    .bg(Color::Green)
                    .add_modifier(Modifier::BOLD)
            } else {
                Style::default().fg(Color::Gray)
            };
            ListItem::new(Line::from(Span::styled(line, style)))
        })
        .collect();

    let section = match model.actions.group_filter {
        Some(g) => g.label(),
        None => "all",
    };
    #[cfg(feature = "ceps")]
    let base = "CEPS";
    #[cfg(not(feature = "ceps"))]
    let base = "Spells";
    let title = if model.actions.pane == ActionsPane::List
        && model.input_mode == InputMode::Normal
        && model.view == crate::model::ViewMode::Actions
    {
        format!(" {base} [{section}] (↑↓ Enter | [ ] section) ")
    } else {
        format!(" {base} [{section}] ")
    };

    let list = List::new(items).block(
        Block::default()
            .borders(Borders::ALL)
            .border_style(Style::default().fg(Color::Green))
            .title(Span::styled(
                title,
                Style::default()
                    .fg(Color::Green)
                    .add_modifier(Modifier::BOLD),
            )),
    );
    frame.render_widget(list, area);
}

fn draw_right(frame: &mut Frame, area: Rect, model: &AppModel) {
    let chunks = Layout::default()
        .direction(Direction::Vertical)
        .constraints([Constraint::Length(8), Constraint::Min(4)])
        .split(area);

    draw_form_or_blurb(frame, chunks[0], model);
    draw_result(frame, chunks[1], model);
}

fn draw_form_or_blurb(frame: &mut Frame, area: Rect, model: &AppModel) {
    let (title, lines) = if model.actions.pane == ActionsPane::Form {
        let method = model.actions.form_method.unwrap_or("?");
        let spec = find_action(method);
        let mut lines = vec![Line::from(Span::styled(
            format!("Casting {method}"),
            Style::default()
                .fg(Color::Yellow)
                .add_modifier(Modifier::BOLD),
        ))];
        if let Some(spec) = spec {
            for (i, arg) in spec.args.iter().enumerate() {
                let focused =
                    i == model.actions.form_field_idx && model.input_mode == InputMode::ActionForm;
                let value = model
                    .actions
                    .form_fields
                    .get(i)
                    .map(|f| {
                        if focused {
                            f.display_with_cursor()
                        } else {
                            f.buffer.clone()
                        }
                    })
                    .unwrap_or_default();
                let req = if arg.required { "*" } else { " " };
                let style = if focused {
                    Style::default().fg(Color::Cyan)
                } else {
                    Style::default().fg(Color::Gray)
                };
                lines.push(Line::from(Span::styled(
                    format!("{req}{name}: {value}", name = arg.name),
                    style,
                )));
                lines.push(Line::from(Span::styled(
                    format!("   hint: {}", arg.hint),
                    Style::default().fg(Color::DarkGray),
                )));
            }
            lines.push(Line::from(Span::styled(
                "Tab next field | Enter cast | Esc back",
                Style::default().fg(Color::DarkGray),
            )));
        }
        (" Ingredients ", lines)
    } else {
        let spec = model
            .actions
            .selected_spec(model.enable_writes, model.has_pem());
        let lines = vec![
            Line::from(Span::styled(
                spec.id,
                Style::default()
                    .fg(Color::Yellow)
                    .add_modifier(Modifier::BOLD),
            )),
            Line::from(format!("[{}] {}", spec.group.label(), spec.blurb)),
            Line::from(""),
            Line::from(if spec.args.is_empty() {
                "Enter casts immediately (no ingredients)."
            } else {
                "Enter opens the ingredient form."
            }),
            Line::from("Tab focuses result scroll when a brew exists."),
            Line::from(if spec.requires_pem {
                "Needs loaded PEM (o)."
            } else if spec.requires_writes {
                "Needs --enable-writes."
            } else {
                ""
            }),
        ];
        (" About this spell ", lines)
    };

    let widget = Paragraph::new(lines)
        .block(
            Block::default()
                .borders(Borders::ALL)
                .border_style(Style::default().fg(Color::Yellow))
                .title(title),
        )
        .wrap(Wrap { trim: false });
    frame.render_widget(widget, area);
}

fn draw_result(frame: &mut Frame, area: Rect, model: &AppModel) {
    let title = match &model.actions.last_method {
        Some(m) => format!(" Result | {m} "),
        None => " Result | (cast something) ".to_string(),
    };
    let body =
        model.actions.last_result_text.clone().unwrap_or_else(|| {
            "No ectoplasm yet.\nPick a spell on the left and press Enter.".into()
        });
    let focused = model.actions.pane == ActionsPane::Result;
    let border = if focused {
        Color::Cyan
    } else {
        Color::DarkGray
    };

    let widget = Paragraph::new(body)
        .style(Style::default().fg(Color::Gray))
        .block(
            Block::default()
                .borders(Borders::ALL)
                .border_style(Style::default().fg(border))
                .title(Span::styled(
                    title,
                    Style::default().fg(border).add_modifier(Modifier::BOLD),
                )),
        )
        .wrap(Wrap { trim: false })
        .scroll((model.actions.result_scroll, 0));
    frame.render_widget(widget, area);
}
