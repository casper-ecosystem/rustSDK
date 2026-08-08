//! Transactions view: hash lookup + scrollable JSON.

use ratatui::layout::{Constraint, Direction, Layout, Rect};
use ratatui::style::{Color, Modifier, Style};
use ratatui::text::{Line, Span};
use ratatui::widgets::{Block, Borders, Paragraph, Wrap};
use ratatui::Frame;

use crate::model::{AppModel, InputMode};

pub fn draw_transactions(frame: &mut Frame, area: Rect, model: &AppModel) {
    let chunks = Layout::default()
        .direction(Direction::Vertical)
        .constraints([Constraint::Length(4), Constraint::Min(5)])
        .split(area);

    let hash_line = if model.input_mode == InputMode::TxLookup {
        format!(
            "hash {}",
            model.transactions.hash_input.display_with_cursor()
        )
    } else {
        format!(
            "hash {}  (press / to edit, Enter to fetch)",
            if model.transactions.hash_input.buffer.is_empty() {
                "<empty>"
            } else {
                model.transactions.hash_input.buffer.as_str()
            }
        )
    };

    let header = Paragraph::new(vec![
        Line::from(Span::styled(
            "Transactions haunt | / edit hash | Enter fetch | Esc clears edit",
            Style::default().fg(Color::DarkGray),
        )),
        Line::from(Span::styled(
            hash_line,
            Style::default()
                .fg(Color::Cyan)
                .add_modifier(Modifier::BOLD),
        )),
    ])
    .block(
        Block::default()
            .borders(Borders::ALL)
            .border_style(Style::default().fg(Color::Cyan))
            .title(" Txs "),
    );
    frame.render_widget(header, chunks[0]);

    let body = model.transactions.result_text.clone().unwrap_or_else(|| {
        "No transaction loaded.\nOpen one from a Block detail, or / paste a hash here.".into()
    });
    frame.render_widget(
        Paragraph::new(body)
            .style(Style::default().fg(Color::Gray))
            .block(
                Block::default()
                    .borders(Borders::ALL)
                    .border_style(Style::default().fg(Color::Green))
                    .title(" Result "),
            )
            .wrap(Wrap { trim: false })
            .scroll((model.transactions.scroll, 0)),
        chunks[1],
    );
}
