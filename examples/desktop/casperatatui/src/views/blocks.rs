//! Blocks view: latest list, lookup, detail + txs + transfers.

use ratatui::layout::{Constraint, Direction, Layout, Rect};
use ratatui::style::{Color, Modifier, Style};
use ratatui::text::{Line, Span};
use ratatui::widgets::{Block, Borders, List, ListItem, Paragraph, Wrap};
use ratatui::Frame;

use crate::block_view::short_hash;
use crate::model::{AppModel, BlocksPane, InputMode};

pub fn draw_blocks(frame: &mut Frame, area: Rect, model: &AppModel) {
    match model.blocks.pane {
        BlocksPane::List => draw_list(frame, area, model),
        BlocksPane::Detail => draw_detail(frame, area, model),
    }
}

fn draw_list(frame: &mut Frame, area: Rect, model: &AppModel) {
    let chunks = Layout::default()
        .direction(Direction::Vertical)
        .constraints([Constraint::Length(3), Constraint::Min(5)])
        .split(area);

    let lookup = if model.input_mode == InputMode::BlockLookup {
        format!("/{}", model.blocks.lookup.display_with_cursor())
    } else {
        format!(
            "/{}  (press / to type height or hash)",
            model.blocks.lookup.buffer
        )
    };
    let header = Paragraph::new(vec![
        Line::from(Span::styled(
            "l latest | / lookup | Enter open | Esc back",
            Style::default().fg(Color::DarkGray),
        )),
        Line::from(Span::styled(lookup, Style::default().fg(Color::Cyan))),
    ])
    .block(
        Block::default()
            .borders(Borders::ALL)
            .border_style(Style::default().fg(Color::Cyan))
            .title(" Blocks | masonry "),
    );
    frame.render_widget(header, chunks[0]);

    let items: Vec<ListItem> = if model.blocks.rows.is_empty() {
        vec![ListItem::new(
            "No bricks yet. Press l to fetch the latest stack (or / to look one up).",
        )]
    } else {
        model
            .blocks
            .rows
            .iter()
            .enumerate()
            .map(|(i, row)| {
                let marker = if i == model.blocks.selected { ">" } else { " " };
                let era = row.era.map(|e| e.to_string()).unwrap_or_else(|| "?".into());
                let line = format!(
                    "{marker} #{:<8} era {:<5} txs:{:<3} {}",
                    row.height,
                    era,
                    row.tx_hashes.len(),
                    short_hash(&row.hash)
                );
                let style = if i == model.blocks.selected {
                    Style::default()
                        .fg(Color::Black)
                        .bg(Color::Cyan)
                        .add_modifier(Modifier::BOLD)
                } else {
                    Style::default().fg(Color::Gray)
                };
                ListItem::new(Line::from(Span::styled(line, style)))
            })
            .collect()
    };

    let list = List::new(items).block(
        Block::default()
            .borders(Borders::ALL)
            .border_style(Style::default().fg(Color::Cyan))
            .title(" latest / results "),
    );
    frame.render_widget(list, chunks[1]);
}

fn draw_detail(frame: &mut Frame, area: Rect, model: &AppModel) {
    let chunks = Layout::default()
        .direction(Direction::Vertical)
        .constraints([
            Constraint::Length(7),
            Constraint::Percentage(45),
            Constraint::Percentage(55),
        ])
        .split(area);

    let row = model.blocks.detail_row.as_ref();
    let summary = match row {
        Some(r) => format!(
            "height {} | era {} | hash {}\ntimestamp {}\ntxs {} | transfers {}\nEsc back | Enter opens selected tx in Txs view",
            r.height,
            r.era.map(|e| e.to_string()).unwrap_or_else(|| "?".into()),
            r.hash,
            r.timestamp.clone().unwrap_or_else(|| "?".into()),
            r.tx_hashes.len(),
            model.blocks.transfers.len(),
        ),
        None => "Block detail missing its soul.".into(),
    };
    frame.render_widget(
        Paragraph::new(summary)
            .block(
                Block::default()
                    .borders(Borders::ALL)
                    .border_style(Style::default().fg(Color::Yellow))
                    .title(" Block detail "),
            )
            .wrap(Wrap { trim: false }),
        chunks[0],
    );

    let tx_items: Vec<ListItem> = match row {
        Some(r) if r.tx_hashes.is_empty() => {
            vec![ListItem::new("(no transaction hashes in this brick)")]
        }
        Some(r) => r
            .tx_hashes
            .iter()
            .enumerate()
            .map(|(i, h)| {
                let marker = if i == model.blocks.tx_selected {
                    ">"
                } else {
                    " "
                };
                let style = if i == model.blocks.tx_selected {
                    Style::default()
                        .fg(Color::Black)
                        .bg(Color::Green)
                        .add_modifier(Modifier::BOLD)
                } else {
                    Style::default().fg(Color::Gray)
                };
                ListItem::new(Line::from(Span::styled(format!("{marker} {h}"), style)))
            })
            .collect(),
        None => vec![ListItem::new("(none)")],
    };
    frame.render_widget(
        List::new(tx_items).block(
            Block::default()
                .borders(Borders::ALL)
                .border_style(Style::default().fg(Color::Green))
                .title(" Transactions in block "),
        ),
        chunks[1],
    );

    let xfer_lines: Vec<Line> = if model.blocks.transfers.is_empty() {
        vec![Line::from(
            "No transfers reported for this block (quiet night).",
        )]
    } else {
        model
            .blocks
            .transfers
            .iter()
            .map(|t| {
                Line::from(format!(
                    "{} -> {} | {} motes | tx {}",
                    short_hash(&t.from),
                    short_hash(&t.to),
                    t.amount,
                    t.transaction_hash
                        .as_deref()
                        .map(short_hash)
                        .unwrap_or_else(|| "-".into())
                ))
            })
            .collect()
    };
    frame.render_widget(
        Paragraph::new(xfer_lines)
            .block(
                Block::default()
                    .borders(Borders::ALL)
                    .border_style(Style::default().fg(Color::Magenta))
                    .title(" Transfers "),
            )
            .wrap(Wrap { trim: false })
            .scroll((model.blocks.scroll, 0)),
        chunks[2],
    );
}
