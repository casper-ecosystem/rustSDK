//! Writes view: Transfer / stake forms with Build → Sign → Put.

use ratatui::layout::{Constraint, Direction, Layout, Rect};
use ratatui::style::{Color, Modifier, Style};
use ratatui::text::{Line, Span};
use ratatui::widgets::{Block, Borders, Paragraph, Wrap};
use ratatui::Frame;

use crate::model::{AppModel, InputMode};
use crate::write_flow::{WriteKind, WriteStage};

pub fn draw_writes(frame: &mut Frame, area: Rect, model: &AppModel) {
    if !model.enable_writes {
        draw_locked(frame, area);
        return;
    }

    let chunks = Layout::default()
        .direction(Direction::Vertical)
        .constraints([
            Constraint::Length(4),
            Constraint::Length(10),
            Constraint::Min(5),
        ])
        .split(area);

    draw_chrome(frame, chunks[0], model);
    draw_form(frame, chunks[1], model);
    draw_preview(frame, chunks[2], model);
}

fn draw_locked(frame: &mut Frame, area: Rect) {
    let lines = vec![
        Line::from(Span::styled(
            "Writes locked",
            Style::default()
                .fg(Color::Yellow)
                .add_modifier(Modifier::BOLD),
        )),
        Line::from(""),
        Line::from("Restart with --enable-writes [--secret-key PATH] [--policy-path PATH]"),
        Line::from("Then press o to load a PEM (or pass --secret-key), x to unload."),
    ];
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

fn draw_chrome(frame: &mut Frame, area: Rect, model: &AppModel) {
    let pk = if model.public_key.is_empty() {
        "(no key · press o to load PEM)".to_string()
    } else {
        let s = &model.public_key;
        if s.len() > 20 {
            format!("{}..{}", &s[..10], &s[s.len() - 6..])
        } else {
            s.clone()
        }
    };
    let kinds: Vec<Span> = WriteKind::ALL
        .iter()
        .map(|k| {
            let selected = *k == model.writes.kind;
            let label = format!(" {} ", k.title());
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

    let lines = vec![
        Line::from(Span::styled(
            format!(
                "o load PEM | x unload | Tab kind | b build | s sign | p put | t one-shot | stage={:?}",
                model.writes.stage
            ),
            Style::default().fg(Color::DarkGray),
        )),
        Line::from(Span::styled(
            format!("signer: {pk}"),
            Style::default().fg(Color::Green),
        )),
        Line::from(kinds),
    ];
    frame.render_widget(
        Paragraph::new(lines).block(
            Block::default()
                .borders(Borders::ALL)
                .border_style(Style::default().fg(Color::Magenta))
                .title(" Writes | sign like WebClient, haunt carefully "),
        ),
        area,
    );
}

fn draw_form(frame: &mut Frame, area: Rect, model: &AppModel) {
    let editing = model.input_mode == InputMode::WriteForm;
    let fields = model.writes.field_labels();
    let mut lines = vec![Line::from(Span::styled(
        "Enter edit fields | Tab next field | Esc leave form",
        Style::default().fg(Color::DarkGray),
    ))];
    for (i, label) in fields.iter().enumerate() {
        let input = model.writes.field_at(i);
        let active = editing && model.writes.field_idx == i;
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
        lines.push(Line::from(Span::styled(format!("{label}: {value}"), style)));
    }
    frame.render_widget(
        Paragraph::new(lines).block(
            Block::default()
                .borders(Borders::ALL)
                .border_style(Style::default().fg(Color::Yellow))
                .title(format!(" {} form ", model.writes.kind.title())),
        ),
        area,
    );
}

fn draw_preview(frame: &mut Frame, area: Rect, model: &AppModel) {
    let title = match model.writes.stage {
        WriteStage::Form => " preview (build first) ",
        WriteStage::Preview => " unsigned preview ",
        WriteStage::Signed => " signed tx ",
        WriteStage::Result => " put result ",
    };
    let body = model
        .writes
        .preview_text
        .as_deref()
        .unwrap_or("No transaction JSON yet. Fill the form and press b.");
    frame.render_widget(
        Paragraph::new(body)
            .block(
                Block::default()
                    .borders(Borders::ALL)
                    .border_style(Style::default().fg(Color::Cyan))
                    .title(title),
            )
            .wrap(Wrap { trim: false })
            .scroll((model.writes.scroll, 0)),
        area,
    );
}
