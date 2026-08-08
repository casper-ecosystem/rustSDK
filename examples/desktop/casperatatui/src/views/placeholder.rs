//! Placeholder body for views that land in later phases.

use ratatui::layout::Rect;
use ratatui::style::{Color, Modifier, Style};
use ratatui::text::{Line, Span};
use ratatui::widgets::{Block, Borders, Paragraph, Wrap};
use ratatui::Frame;

use crate::model::{AppModel, ViewMode};

pub fn draw_coming_soon(frame: &mut Frame, area: Rect, model: &AppModel, view: ViewMode) {
    let gag = match view {
        ViewMode::Contracts => "Contracts is live! Press 6, / auction, Enter.",
        ViewMode::Writes => "Writes is live on tab 8 when --enable-writes is set (o loads PEM).",
        ViewMode::Wait => "Wait is live on tab 9 (wait_transaction + SSE collect).",
        ViewMode::Network
        | ViewMode::Help
        | ViewMode::Blocks
        | ViewMode::Transactions
        | ViewMode::Accounts
        | ViewMode::Validators
        | ViewMode::Actions => "You should not see this (view is already live).",
    };

    let lines = vec![
        Line::from(Span::styled(
            format!("{} - under construction", view.title()),
            Style::default()
                .fg(Color::Yellow)
                .add_modifier(Modifier::BOLD),
        )),
        Line::from(""),
        Line::from(gag),
        Line::from(""),
        Line::from("Tab back to Network, or press h for Help."),
        Line::from(format!("RPC stays warm at {}", model.rpc_url)),
    ];

    let widget = Paragraph::new(lines)
        .block(
            Block::default()
                .borders(Borders::ALL)
                .border_style(Style::default().fg(Color::Yellow))
                .title(format!(" {} ", view.title())),
        )
        .wrap(Wrap { trim: false });

    frame.render_widget(widget, area);
}
