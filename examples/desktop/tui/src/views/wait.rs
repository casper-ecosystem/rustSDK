//! Wait view: `wait_transaction` + bounded SSE collect.

use ratatui::layout::{Constraint, Direction, Layout, Rect};
use ratatui::style::{Color, Modifier, Style};
use ratatui::text::{Line, Span};
use ratatui::widgets::{Block, Borders, Paragraph, Wrap};
use ratatui::Frame;

use crate::model::{AppModel, InputMode, WaitPane};

pub fn draw_wait(frame: &mut Frame, area: Rect, model: &AppModel) {
    let chunks = Layout::default()
        .direction(Direction::Vertical)
        .constraints([
            Constraint::Length(3),
            Constraint::Length(11),
            Constraint::Min(5),
        ])
        .split(area);

    draw_chrome(frame, chunks[0], model);
    draw_form(frame, chunks[1], model);
    draw_result(frame, chunks[2], model);
}

fn draw_chrome(frame: &mut Frame, area: Rect, model: &AppModel) {
    let panes: Vec<Span> = WaitPane::ALL
        .iter()
        .map(|p| {
            let selected = *p == model.wait.pane;
            let label = format!(" {} ", p.title());
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

    let status = if model.wait.waiting {
        Span::styled(
            " · listening… ",
            Style::default()
                .fg(Color::Yellow)
                .add_modifier(Modifier::BOLD),
        )
    } else {
        Span::styled(" · idle ", Style::default().fg(Color::DarkGray))
    };

    let mut line = vec![Span::styled("mode", Style::default().fg(Color::Magenta))];
    line.extend(panes);
    line.push(status);

    frame.render_widget(
        Paragraph::new(Line::from(line)).block(
            Block::default()
                .borders(Borders::ALL)
                .border_style(Style::default().fg(Color::Magenta))
                .title(Span::styled(
                    " Wait / SSE ",
                    Style::default()
                        .fg(Color::Magenta)
                        .add_modifier(Modifier::BOLD),
                )),
        ),
        area,
    );
}

fn draw_form(frame: &mut Frame, area: Rect, model: &AppModel) {
    let editing = model.input_mode == InputMode::WaitForm;
    let mut lines = Vec::new();

    match model.wait.pane {
        WaitPane::WaitTx => {
            lines.push(Line::from(
                "Haunt the events stream until a transaction is processed.",
            ));
            lines.push(Line::from(""));
            lines.push(field_line(
                "hash",
                &model.wait.hash.buffer,
                editing && model.wait.field_idx == 0,
            ));
            lines.push(field_line(
                "events",
                &model.wait.events_url.buffer,
                editing && model.wait.field_idx == 1,
            ));
            lines.push(field_line(
                "timeout_ms",
                &model.wait.timeout_ms.buffer,
                editing && model.wait.field_idx == 2,
            ));
            lines.push(Line::from(""));
            lines.push(Line::from(Span::styled(
                "/ edit · Enter or w start · Tab pane · Esc leave form",
                Style::default().fg(Color::DarkGray),
            )));
        }
        WaitPane::SseCollect => {
            lines.push(Line::from(
                "Scoop a few SSE frames (bounded collect). Space toggles names.",
            ));
            lines.push(Line::from(""));
            lines.push(field_line(
                "events",
                &model.wait.events_url.buffer,
                editing && model.wait.field_idx == 0,
            ));
            lines.push(field_line(
                "max_events",
                &model.wait.max_events.buffer,
                editing && model.wait.field_idx == 1,
            ));
            lines.push(field_line(
                "timeout_ms",
                &model.wait.timeout_ms.buffer,
                editing && model.wait.field_idx == 2,
            ));
            lines.push(Line::from(""));
            let mut name_spans = Vec::new();
            for (i, (name, on)) in model.wait.event_names.iter().enumerate() {
                let mark = if *on { "[x]" } else { "[ ]" };
                let selected = !editing && model.wait.name_idx == i;
                let style = if selected {
                    Style::default()
                        .fg(Color::Black)
                        .bg(Color::Cyan)
                        .add_modifier(Modifier::BOLD)
                } else if *on {
                    Style::default().fg(Color::Green)
                } else {
                    Style::default().fg(Color::DarkGray)
                };
                name_spans.push(Span::styled(format!(" {mark}{name} "), style));
            }
            lines.push(Line::from(name_spans));
            lines.push(Line::from(Span::styled(
                "j/k names · Space toggle · / edit · w collect",
                Style::default().fg(Color::DarkGray),
            )));
        }
    }

    frame.render_widget(
        Paragraph::new(lines)
            .block(
                Block::default()
                    .borders(Borders::ALL)
                    .border_style(Style::default().fg(if editing {
                        Color::Cyan
                    } else {
                        Color::DarkGray
                    }))
                    .title(" Form "),
            )
            .wrap(Wrap { trim: false }),
        area,
    );
}

fn draw_result(frame: &mut Frame, area: Rect, model: &AppModel) {
    let text = model
        .wait
        .result_text
        .as_deref()
        .unwrap_or("(no result yet · put a tx on Writes, then Wait with its hash)");
    frame.render_widget(
        Paragraph::new(text)
            .block(
                Block::default()
                    .borders(Borders::ALL)
                    .border_style(Style::default().fg(Color::Magenta))
                    .title(" Result "),
            )
            .wrap(Wrap { trim: false })
            .scroll((model.wait.scroll, 0)),
        area,
    );
}

fn field_line(label: &str, value: &str, focused: bool) -> Line<'static> {
    let style = if focused {
        Style::default()
            .fg(Color::Black)
            .bg(Color::Cyan)
            .add_modifier(Modifier::BOLD)
    } else {
        Style::default().fg(Color::White)
    };
    let shown = if value.is_empty() {
        "…".to_string()
    } else if value.len() > 72 {
        format!("{}…", &value[..72])
    } else {
        value.to_string()
    };
    Line::from(vec![
        Span::styled(format!(" {label:<10} "), Style::default().fg(Color::Yellow)),
        Span::styled(shown, style),
    ])
}
