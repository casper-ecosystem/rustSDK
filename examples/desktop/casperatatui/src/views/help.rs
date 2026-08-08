//! Help view: keys, palette, Casper silliness.

use ratatui::layout::Rect;
use ratatui::style::{Color, Modifier, Style};
use ratatui::text::{Line, Span};
use ratatui::widgets::{Block, Borders, Paragraph, Wrap};
use ratatui::Frame;

use crate::actions_catalog::ACTIONS;
use crate::command::COMMANDS;
use crate::model::AppModel;

pub fn draw_help(frame: &mut Frame, area: Rect, model: &AppModel) {
    let mut lines: Vec<Line> = vec![
        Line::from(Span::styled(
            "Casperatatui - friendly neighborhood blockchain ghost",
            Style::default()
                .fg(Color::Magenta)
                .add_modifier(Modifier::BOLD),
        )),
        Line::from(""),
        Line::from(Span::styled(
            "Keys",
            Style::default()
                .fg(Color::Cyan)
                .add_modifier(Modifier::BOLD),
        )),
        Line::from("  q           quit and restore the terminal"),
        Line::from("  Esc         back (Actions/Blocks detail) or quit"),
        Line::from("  Tab / Left/Right  cycle views (Accounts/Contracts/Writes sections)"),
        Line::from("  1-9 / h     Network…Wait / Help"),
        Line::from("  r           Network seance (5 RPCs, parallel)"),
        Line::from("  e           edit RPC URL (rebuild SDK haunt)"),
        Line::from("  l           (Blocks) load latest N blocks"),
        Line::from("  /           (Blocks/Txs/Accounts/Contracts) focus lookup"),
        Line::from("  w           (Accounts) era reward form"),
        Line::from("  o           load secret key PEM (--enable-writes)"),
        Line::from("  x           unload session PEM"),
        Line::from("  b / s / p   (Writes) build / sign / put"),
        Line::from("  t           (Writes) one-shot transfer"),
        Line::from("  / / w       (Wait) edit form / start wait or SSE collect"),
        Line::from("  Space       (Wait SSE) toggle event name"),
        Line::from("  j / k / Up/Down  scroll or move lists"),
        Line::from("  Enter       Action / block / tx / account / contract / write / wait"),
        Line::from("  :           command palette"),
        Line::from("  mouse       select+copy works (mouse capture off)"),
        Line::from(""),
        Line::from(Span::styled(
            "Writes CLI",
            Style::default()
                .fg(Color::Cyan)
                .add_modifier(Modifier::BOLD),
        )),
        Line::from("  --enable-writes [--secret-key PATH] [--policy-path PATH]"),
        Line::from(""),
        Line::from(Span::styled(
            "Wait / SSE (key 9)",
            Style::default()
                .fg(Color::Cyan)
                .add_modifier(Modifier::BOLD),
        )),
        Line::from("  Wait tx: hash + events URL → wait_transaction"),
        Line::from("  SSE collect: toggle names, max_events, timeout → SSEClient::collect"),
        Line::from(""),
        Line::from(Span::styled(
            "Command palette",
            Style::default()
                .fg(Color::Cyan)
                .add_modifier(Modifier::BOLD),
        )),
        Line::from("  Enter       run command"),
        Line::from("  Esc         cancel"),
        Line::from("  ↑ / ↓       command history"),
        Line::from("  Tab         complete commands, views, and file paths"),
        Line::from(""),
    ];

    lines.push(Line::from(Span::styled(
        "Commands",
        Style::default()
            .fg(Color::Cyan)
            .add_modifier(Modifier::BOLD),
    )));
    for cmd in COMMANDS {
        lines.push(Line::from(format!("  {:<10} {}", cmd.name, cmd.help)));
    }

    lines.push(Line::from(""));
    lines.push(Line::from(Span::styled(
        "Actions catalog",
        Style::default()
            .fg(Color::Cyan)
            .add_modifier(Modifier::BOLD),
    )));
    for action in ACTIONS {
        lines.push(Line::from(format!(
            "  [{:<7}] {}",
            action.group.label(),
            action.id
        )));
    }

    lines.push(Line::from(""));
    lines.push(Line::from(format!(
        "Connected intent: {} · {}",
        model.preset_label, model.rpc_url
    )));
    lines.push(Line::from(""));
    lines.push(Line::from(Span::styled(
        "Remember: JSON-RPC only. No binary-port ghouls allowed in this house.",
        Style::default().fg(Color::DarkGray),
    )));

    let widget = Paragraph::new(lines)
        .block(
            Block::default()
                .borders(Borders::ALL)
                .border_style(Style::default().fg(Color::Magenta))
                .title(Span::styled(
                    " Help ",
                    Style::default()
                        .fg(Color::Magenta)
                        .add_modifier(Modifier::BOLD),
                )),
        )
        .wrap(Wrap { trim: false })
        .scroll((model.body_scroll, 0));

    frame.render_widget(widget, area);
}
