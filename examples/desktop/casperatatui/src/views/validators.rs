//! Validators / Bidders: auction list, detail, era reward.

use ratatui::layout::{Constraint, Direction, Layout, Rect};
use ratatui::style::{Color, Modifier, Style};
use ratatui::text::{Line, Span};
use ratatui::widgets::{Block, Borders, List, ListItem, Paragraph, Wrap};
use ratatui::Frame;

use crate::model::{AppModel, InputMode, ValidatorsSection};

pub fn draw_validators(frame: &mut Frame, area: Rect, model: &AppModel) {
    let chunks = Layout::default()
        .direction(Direction::Vertical)
        .constraints([Constraint::Length(4), Constraint::Min(3)])
        .split(area);

    let tabs: Vec<Span> = ValidatorsSection::ALL
        .iter()
        .map(|sec| {
            let selected = *sec == model.validators.section;
            let label = format!(" {} ", sec.title());
            if selected {
                Span::styled(
                    label,
                    Style::default()
                        .fg(Color::Black)
                        .bg(Color::Yellow)
                        .add_modifier(Modifier::BOLD),
                )
            } else {
                Span::styled(label, Style::default().fg(Color::DarkGray))
            }
        })
        .collect();

    let filter = if model.input_mode == InputMode::ValidatorFilter {
        format!("/{}", model.validators.filter.display_with_cursor())
    } else {
        let buf = model.validators.filter.buffer.as_str();
        if buf.is_empty() {
            "(press / to filter pubkey · r reload auction)".to_string()
        } else {
            format!("filter: {buf}")
        }
    };

    let header = Paragraph::new(vec![
        Line::from(tabs),
        Line::from(Span::styled(
            "Tab section | Enter open | w reward | j/k list",
            Style::default().fg(Color::DarkGray),
        )),
        Line::from(Span::styled(filter, Style::default().fg(Color::Cyan))),
    ])
    .block(
        Block::default()
            .borders(Borders::ALL)
            .title(" Validators / Bidders "),
    );
    frame.render_widget(header, chunks[0]);

    match model.validators.section {
        ValidatorsSection::Validators => draw_list(frame, chunks[1], model, true),
        ValidatorsSection::Bidders => draw_list(frame, chunks[1], model, false),
        ValidatorsSection::Detail => draw_detail(frame, chunks[1], model),
        ValidatorsSection::Rewards => draw_rewards(frame, chunks[1], model),
    }
}

fn draw_list(frame: &mut Frame, area: Rect, model: &AppModel, active_only: bool) {
    if let Some(err) = &model.validators.error {
        let widget = Paragraph::new(err.as_str())
            .style(Style::default().fg(Color::Red))
            .block(Block::default().borders(Borders::ALL).title(" error "));
        frame.render_widget(widget, area);
        return;
    }

    let rows = if active_only {
        model.validators.filtered_validators()
    } else {
        model.validators.filtered_bidders()
    };
    let title = if active_only {
        format!(" active validators ({}) ", rows.len())
    } else {
        format!(" all bidders ({}) ", rows.len())
    };

    if rows.is_empty() {
        let msg = if model.validators.bidders.is_empty() {
            "No auction yet. Press r to load get_auction_info."
        } else {
            "No rows match filter."
        };
        let widget = Paragraph::new(msg)
            .block(Block::default().borders(Borders::ALL).title(title))
            .wrap(Wrap { trim: false });
        frame.render_widget(widget, area);
        return;
    }

    let items: Vec<ListItem> = rows
        .iter()
        .enumerate()
        .map(|(i, row)| {
            let marker = if i == model.validators.list_selected {
                ">"
            } else {
                " "
            };
            let inactive = if row.inactive { " inactive" } else { "" };
            let rate = row
                .delegation_rate
                .map(|r| format!(" rate={r}"))
                .unwrap_or_default();
            let line = format!(
                "{marker} {} total={} self={} dels={}{rate}{inactive}",
                short_pk(&row.public_key),
                abbreviate_motes(&row.total_stake),
                abbreviate_motes(&row.staked_amount),
                row.delegator_count,
            );
            let style = if i == model.validators.list_selected {
                Style::default()
                    .fg(Color::Yellow)
                    .add_modifier(Modifier::BOLD)
            } else {
                Style::default()
            };
            ListItem::new(Line::from(Span::styled(line, style)))
        })
        .collect();

    let widget = List::new(items).block(Block::default().borders(Borders::ALL).title(title));
    frame.render_widget(widget, area);
}

fn draw_detail(frame: &mut Frame, area: Rect, model: &AppModel) {
    let Some(detail) = &model.validators.detail else {
        let widget =
            Paragraph::new("No detail yet. Open Validators or Bidders, select a row, press Enter.")
                .block(Block::default().borders(Borders::ALL).title(" detail "))
                .wrap(Wrap { trim: false });
        frame.render_widget(widget, area);
        return;
    };

    let v = &detail.validator;
    let mut lines = vec![
        Line::from(Span::styled(
            format!("pk {}", v.public_key),
            Style::default().fg(Color::Cyan),
        )),
        Line::from(format!(
            "total={} self={} rate={:?} inactive={} purse={}",
            abbreviate_motes(&v.total_stake),
            abbreviate_motes(&v.staked_amount),
            v.delegation_rate,
            v.inactive,
            short_pk(&v.bonding_purse),
        )),
        Line::from(""),
        Line::from(Span::styled(
            format!("delegators ({})", detail.delegators.len()),
            Style::default().add_modifier(Modifier::BOLD),
        )),
    ];

    if detail.delegators.is_empty() {
        lines.push(Line::from("  (none)"));
    } else {
        for (i, d) in detail.delegators.iter().enumerate() {
            let marker = if i == model.validators.del_selected {
                ">"
            } else {
                " "
            };
            let style = if i == model.validators.del_selected {
                Style::default().fg(Color::Yellow)
            } else {
                Style::default()
            };
            lines.push(Line::from(Span::styled(
                format!(
                    "{marker} {} stake={}",
                    short_pk(&d.delegator_public_key),
                    abbreviate_motes(&d.staked_amount)
                ),
                style,
            )));
        }
    }

    let widget = Paragraph::new(lines)
        .block(Block::default().borders(Borders::ALL).title(" detail "))
        .wrap(Wrap { trim: false })
        .scroll((model.validators.scroll, 0));
    frame.render_widget(widget, area);
}

fn draw_rewards(frame: &mut Frame, area: Rect, model: &AppModel) {
    let editing = model.input_mode == InputMode::AccountReward
        && model.view == crate::model::ViewMode::Validators;

    let field = |idx: usize, label: &str, input: &crate::text_input::TextInput| -> Line {
        let active = editing && model.validators.reward_field % 3 == idx;
        let value = if active {
            input.display_with_cursor()
        } else if input.buffer.is_empty() {
            "-".to_string()
        } else {
            input.buffer.clone()
        };
        let style = if active {
            Style::default()
                .fg(Color::Yellow)
                .add_modifier(Modifier::BOLD)
        } else {
            Style::default()
        };
        Line::from(Span::styled(format!("{label}: {value}"), style))
    };

    let mut lines = vec![
        Line::from(Span::styled(
            "Era reward (get_reward)",
            Style::default().add_modifier(Modifier::BOLD),
        )),
        field(0, "validator", &model.validators.reward_validator),
        field(1, "era     ", &model.validators.reward_era),
        field(
            2,
            "delegator (optional)",
            &model.validators.reward_delegator,
        ),
        Line::from(""),
        Line::from(Span::styled(
            "w opens form | Enter submits",
            Style::default().fg(Color::DarkGray),
        )),
        Line::from(""),
    ];

    if let Some(text) = &model.validators.reward_text {
        for line in text.lines().take(40) {
            lines.push(Line::from(line.to_string()));
        }
    } else {
        lines.push(Line::from("No reward result yet."));
    }

    let widget = Paragraph::new(lines)
        .block(Block::default().borders(Borders::ALL).title(" rewards "))
        .wrap(Wrap { trim: false })
        .scroll((model.validators.scroll, 0));
    frame.render_widget(widget, area);
}

fn short_pk(s: &str) -> String {
    if s.len() <= 16 {
        s.to_string()
    } else {
        format!("{}…{}", &s[..8], &s[s.len() - 6..])
    }
}

fn abbreviate_motes(s: &str) -> String {
    if s.len() <= 12 {
        s.to_string()
    } else {
        format!("{}…", &s[..10])
    }
}
