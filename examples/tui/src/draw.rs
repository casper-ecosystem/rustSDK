//! Layout: title tabs + body + footer (+ command / edit line).

use ratatui::layout::{Constraint, Direction, Layout, Rect};
use ratatui::style::{Color, Modifier, Style};
use ratatui::text::{Line, Span};
use ratatui::widgets::{Block, Borders, Paragraph};
use ratatui::Frame;

use crate::model::{AppModel, InputMode, ViewMode, TIPS};
use crate::views::{
    draw_accounts, draw_actions, draw_blocks, draw_coming_soon, draw_contracts, draw_help,
    draw_network, draw_transactions, draw_wait, draw_writes,
};

pub fn draw(frame: &mut Frame, model: &AppModel) {
    let overlay_h = match model.input_mode {
        InputMode::Command | InputMode::EditRpc | InputMode::LoadPem => 3,
        _ => 0,
    };
    let chunks = Layout::default()
        .direction(Direction::Vertical)
        .constraints([
            Constraint::Length(3),
            Constraint::Min(5),
            Constraint::Length(overlay_h),
            Constraint::Length(3),
        ])
        .split(frame.area());

    draw_title(frame, chunks[0], model);
    draw_body(frame, chunks[1], model);
    if overlay_h > 0 {
        draw_overlay(frame, chunks[2], model);
    }
    draw_footer(frame, chunks[3], model);
}

fn draw_title(frame: &mut Frame, area: Rect, model: &AppModel) {
    let tabs: Vec<Span> = ViewMode::ALL
        .iter()
        .map(|mode| {
            let selected = *mode == model.view;
            let label = if let Some(d) = mode.digit() {
                format!(" {d}:{name} ", name = mode.title())
            } else {
                format!(" h:{} ", mode.title())
            };
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

    let mut line = vec![Span::styled(
        " casper-sdk-tui ",
        Style::default()
            .fg(Color::Magenta)
            .add_modifier(Modifier::BOLD),
    )];
    line.extend(tabs);

    let title = if model.public_key.is_empty() {
        format!(" {} | {} ", model.preset_label, short_url(&model.rpc_url))
    } else {
        format!(
            " {} | {} | pk {} ",
            model.preset_label,
            short_url(&model.rpc_url),
            truncate_pk(&model.public_key)
        )
    };

    let widget = Paragraph::new(Line::from(line)).block(
        Block::default()
            .borders(Borders::ALL)
            .border_style(Style::default().fg(Color::Magenta))
            .title(Span::styled(title, Style::default().fg(Color::Yellow))),
    );
    frame.render_widget(widget, area);
}

fn draw_body(frame: &mut Frame, area: Rect, model: &AppModel) {
    match model.view {
        ViewMode::Network => draw_network(frame, area, model),
        ViewMode::Blocks => draw_blocks(frame, area, model),
        ViewMode::Transactions => draw_transactions(frame, area, model),
        ViewMode::Accounts => draw_accounts(frame, area, model),
        ViewMode::Contracts => draw_contracts(frame, area, model),
        ViewMode::Actions => draw_actions(frame, area, model),
        ViewMode::Writes => draw_writes(frame, area, model),
        ViewMode::Wait => draw_wait(frame, area, model),
        ViewMode::Help => draw_help(frame, area, model),
        other => draw_coming_soon(frame, area, model, other),
    }
}

fn draw_overlay(frame: &mut Frame, area: Rect, model: &AppModel) {
    match model.input_mode {
        InputMode::Command => {
            let hint = model
                .palette
                .last_message
                .as_deref()
                .unwrap_or("Tab complete | Up/Down history | Enter run | Esc cancel");
            let display = if model.palette.cursor >= model.palette.buffer.len() {
                format!(":{}|", model.palette.buffer)
            } else {
                let (a, b) = model.palette.buffer.split_at(model.palette.cursor);
                format!(":{a}|{b}")
            };
            let widget = Paragraph::new(vec![
                Line::from(Span::styled(
                    display,
                    Style::default()
                        .fg(Color::Green)
                        .add_modifier(Modifier::BOLD),
                )),
                Line::from(Span::styled(hint, Style::default().fg(Color::DarkGray))),
            ])
            .block(
                Block::default()
                    .borders(Borders::ALL)
                    .border_style(Style::default().fg(Color::Green))
                    .title(" command "),
            );
            frame.render_widget(widget, area);
        }
        InputMode::EditRpc => {
            let display = format!("rpc {} ", model.rpc_edit.display_with_cursor());
            let widget = Paragraph::new(vec![
                Line::from(Span::styled(
                    display,
                    Style::default()
                        .fg(Color::Yellow)
                        .add_modifier(Modifier::BOLD),
                )),
                Line::from(Span::styled(
                    "Enter apply | Esc cancel | point the ghost at a new haunt",
                    Style::default().fg(Color::DarkGray),
                )),
            ])
            .block(
                Block::default()
                    .borders(Borders::ALL)
                    .border_style(Style::default().fg(Color::Yellow))
                    .title(" edit RPC "),
            );
            frame.render_widget(widget, area);
        }
        InputMode::LoadPem => {
            let display = format!("pem {} ", model.pem_path_input.display_with_cursor());
            let widget = Paragraph::new(vec![
                Line::from(Span::styled(
                    display,
                    Style::default()
                        .fg(Color::Yellow)
                        .add_modifier(Modifier::BOLD),
                )),
                Line::from(Span::styled(
                    "Enter load into session | Esc cancel | never written back to disk",
                    Style::default().fg(Color::DarkGray),
                )),
            ])
            .block(
                Block::default()
                    .borders(Borders::ALL)
                    .border_style(Style::default().fg(Color::Yellow))
                    .title(" load secret key PEM "),
            );
            frame.render_widget(widget, area);
        }
        _ => {}
    }
}

fn draw_footer(frame: &mut Frame, area: Rect, model: &AppModel) {
    let (text, style) = if let Some(err) = &model.error {
        (
            format!(" error: {err}"),
            Style::default().fg(Color::Red).add_modifier(Modifier::BOLD),
        )
    } else if model.pending {
        let spin = ["|", "/", "-", "\\"];
        let frame_i = (model.tick as usize) % spin.len();
        (
            format!(" {} {}", spin[frame_i], model.status),
            Style::default().fg(Color::Yellow),
        )
    } else {
        let tip = TIPS[model.tip_index % TIPS.len()];
        (
            format!(" {} | {}", model.status, tip),
            Style::default().fg(Color::Gray),
        )
    };

    let widget = Paragraph::new(text).style(style).block(
        Block::default()
            .borders(Borders::ALL)
            .border_style(Style::default().fg(Color::DarkGray))
            .title(Span::styled(
                format!(" events {} ", short_url(&model.events_url)),
                Style::default().fg(Color::DarkGray),
            )),
    );
    frame.render_widget(widget, area);
}

fn short_url(url: &str) -> String {
    if url.len() <= 40 {
        url.to_string()
    } else {
        format!("{}...", &url[..37])
    }
}

fn truncate_pk(pk: &str) -> String {
    if pk.len() > 16 {
        format!("{}..{}", &pk[..8], &pk[pk.len() - 4..])
    } else {
        pk.to_string()
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::policy::WritePolicy;
    use ratatui::backend::TestBackend;
    use ratatui::Terminal;

    fn test_model(enable_writes: bool) -> AppModel {
        AppModel::new(
            "http://127.0.0.1:11101".into(),
            "http://127.0.0.1:18101/events".into(),
            "nctl (local ghosts)".into(),
            enable_writes,
            WritePolicy::default(),
            "casper-net-1".into(),
        )
    }

    #[test]
    fn draws_network_chrome() {
        let backend = TestBackend::new(120, 30);
        let mut terminal = Terminal::new(backend).unwrap();
        let model = test_model(false);
        terminal.draw(|f| draw(f, &model)).expect("draw");
        let buffer = terminal.backend().buffer().clone();
        let flat: String = buffer.content().iter().map(|c| c.symbol()).collect();
        assert!(flat.contains("Network") || flat.contains("casper-sdk-tui"));
    }

    #[test]
    fn draws_actions_chrome() {
        let backend = TestBackend::new(120, 30);
        let mut terminal = Terminal::new(backend).unwrap();
        let mut model = test_model(false);
        model.view = ViewMode::Actions;
        terminal.draw(|f| draw(f, &model)).expect("draw");
        let buffer = terminal.backend().buffer().clone();
        let flat: String = buffer.content().iter().map(|c| c.symbol()).collect();
        assert!(flat.contains("get_node_status") || flat.contains("Spells"));
    }

    #[test]
    fn draws_wait_chrome() {
        let backend = TestBackend::new(120, 30);
        let mut terminal = Terminal::new(backend).unwrap();
        let mut model = test_model(false);
        model.view = ViewMode::Wait;
        terminal.draw(|f| draw(f, &model)).expect("draw");
        let buffer = terminal.backend().buffer().clone();
        let flat: String = buffer.content().iter().map(|c| c.symbol()).collect();
        assert!(flat.contains("Wait") || flat.contains("SSE"));
    }
}
