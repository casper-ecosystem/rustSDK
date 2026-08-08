//! Network view: summary table after parallel refresh.

use ratatui::layout::Rect;
use ratatui::style::{Color, Modifier, Style};
use ratatui::text::Span;
use ratatui::widgets::{Block, Borders, Paragraph, Wrap};
use ratatui::Frame;

use crate::model::AppModel;

pub fn draw_network(frame: &mut Frame, area: Rect, model: &AppModel) {
    let title = if model.pending && model.view == crate::model::ViewMode::Network {
        " Network | five-RPC seance in progress... "
    } else {
        " Network | r refresh | e edit RPC "
    };

    let body = if let Some(snap) = &model.network {
        snap.render_table()
    } else {
        placeholder_text(model)
    };

    let widget = Paragraph::new(body)
        .style(Style::default().fg(Color::Gray))
        .block(
            Block::default()
                .borders(Borders::ALL)
                .border_style(Style::default().fg(Color::Cyan))
                .title(Span::styled(
                    title,
                    Style::default()
                        .fg(Color::Cyan)
                        .add_modifier(Modifier::BOLD),
                )),
        )
        .wrap(Wrap { trim: false })
        .scroll((model.body_scroll, 0));

    frame.render_widget(widget, area);
}

fn placeholder_text(model: &AppModel) -> String {
    format!(
        "\
Boo. The Network table is still empty.

  RPC     {rpc}
  Events  {events}
  Preset  {preset}

Hit r to run get_node_status + peers + era + SRH + auction
in parallel (one séance, five chains).

Or press e to point the ghost at another RPC URL.

(When NCTL is asleep, even Casper cannot haunt the JSON-RPC.)
",
        rpc = model.rpc_url,
        events = model.events_url,
        preset = model.preset_label,
    )
}
