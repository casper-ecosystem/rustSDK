//! Accounts view: identity lookup, overview, stakes, era rewards.

use ratatui::layout::{Constraint, Direction, Layout, Rect};
use ratatui::style::{Color, Modifier, Style};
use ratatui::text::{Line, Span};
use ratatui::widgets::{Block, Borders, List, ListItem, Paragraph, Wrap};
use ratatui::Frame;

use crate::model::{AccountsSection, AppModel, InputMode};

pub fn draw_accounts(frame: &mut Frame, area: Rect, model: &AppModel) {
    let chunks = Layout::default()
        .direction(Direction::Vertical)
        .constraints([Constraint::Length(5), Constraint::Min(5)])
        .split(area);

    draw_header(frame, chunks[0], model);
    draw_section(frame, chunks[1], model);
}

fn draw_header(frame: &mut Frame, area: Rect, model: &AppModel) {
    let identity = if model.input_mode == InputMode::AccountLookup {
        format!("/{}", model.accounts.identity.display_with_cursor())
    } else {
        let buf = if model.accounts.identity.buffer.is_empty() {
            model
                .accounts
                .loaded_identity
                .as_deref()
                .unwrap_or("(press / to paste pubkey or account-hash)")
        } else {
            model.accounts.identity.buffer.as_str()
        };
        format!("/{buf}")
    };

    let tabs: Vec<Span> = AccountsSection::ALL
        .iter()
        .map(|sec| {
            let selected = *sec == model.accounts.section;
            let label = format!(" {} ", sec.title());
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

    let mut lines = vec![
        Line::from(Span::styled(
            "/ identity | Tab section | Enter load | w reward form | j/k lists",
            Style::default().fg(Color::DarkGray),
        )),
        Line::from(Span::styled(identity, Style::default().fg(Color::Cyan))),
        Line::from(tabs),
    ];
    if let Some(loaded) = &model.accounts.loaded_identity {
        lines.push(Line::from(Span::styled(
            format!("loaded: {loaded}"),
            Style::default().fg(Color::Green),
        )));
    }

    frame.render_widget(
        Paragraph::new(lines).block(
            Block::default()
                .borders(Borders::ALL)
                .border_style(Style::default().fg(Color::Cyan))
                .title(" Accounts | wallets under the mattress "),
        ),
        area,
    );
}

fn draw_section(frame: &mut Frame, area: Rect, model: &AppModel) {
    match model.accounts.section {
        AccountsSection::Overview => draw_overview(frame, area, model),
        AccountsSection::NamedKeys => draw_named_keys(frame, area, model),
        AccountsSection::Delegations => draw_delegations(frame, area, model),
        AccountsSection::Undelegations => draw_undelegations(frame, area, model),
        AccountsSection::Rewards => draw_rewards(frame, area, model),
    }
}

fn draw_overview(frame: &mut Frame, area: Rect, model: &AppModel) {
    let mut lines: Vec<Line> = Vec::new();
    match &model.accounts.overview {
        Some(o) => {
            lines.push(Line::from(format!("kind: {}", o.kind)));
            lines.push(Line::from(format!(
                "account_hash: {}",
                o.account_hash.as_deref().unwrap_or("?")
            )));
            lines.push(Line::from(format!(
                "main_purse: {}",
                o.main_purse.as_deref().unwrap_or("?")
            )));
            lines.push(Line::from(format!(
                "associated_keys: {}",
                o.associated_keys.len()
            )));
            for ak in &o.associated_keys {
                lines.push(Line::from(format!(
                    "  weight {} | {}",
                    ak.weight, ak.account_hash
                )));
            }
        }
        None => lines.push(Line::from("No entity yet. / paste a key and Enter.")),
    }

    lines.push(Line::from(""));
    lines.push(Line::from(Span::styled(
        "Balances",
        Style::default()
            .fg(Color::Yellow)
            .add_modifier(Modifier::BOLD),
    )));
    lines.push(Line::from(format!(
        "balance: {}",
        model.accounts.balance_motes.as_deref().unwrap_or("?")
    )));
    lines.push(Line::from(format!(
        "total: {}",
        model.accounts.total_balance.as_deref().unwrap_or("?")
    )));
    lines.push(Line::from(format!(
        "available: {}",
        model.accounts.available_balance.as_deref().unwrap_or("?")
    )));

    if let Some(ss) = &model.accounts.self_stake {
        lines.push(Line::from(""));
        lines.push(Line::from(Span::styled(
            "Validator self-stake",
            Style::default()
                .fg(Color::Yellow)
                .add_modifier(Modifier::BOLD),
        )));
        lines.push(Line::from(format!("staked: {}", ss.staked_amount)));
        lines.push(Line::from(format!(
            "rate: {} | inactive: {} | delegators: {}",
            ss.delegation_rate
                .map(|r| r.to_string())
                .unwrap_or_else(|| "?".into()),
            ss.inactive,
            ss.delegator_count
        )));
    }

    lines.push(Line::from(""));
    lines.push(Line::from(format!(
        "delegations: {} | undelegations: {}",
        model.accounts.delegations.len(),
        model.accounts.undelegations.len()
    )));

    if !model.accounts.partial_errors.is_empty() {
        lines.push(Line::from(""));
        lines.push(Line::from(Span::styled(
            "Partial errors",
            Style::default().fg(Color::Red).add_modifier(Modifier::BOLD),
        )));
        for err in &model.accounts.partial_errors {
            lines.push(Line::from(format!("  - {err}")));
        }
    }

    frame.render_widget(
        Paragraph::new(lines)
            .block(
                Block::default()
                    .borders(Borders::ALL)
                    .border_style(Style::default().fg(Color::Cyan))
                    .title(" Overview "),
            )
            .wrap(Wrap { trim: false })
            .scroll((model.accounts.scroll, 0)),
        area,
    );
}

fn draw_named_keys(frame: &mut Frame, area: Rect, model: &AppModel) {
    let keys = model
        .accounts
        .overview
        .as_ref()
        .map(|o| o.named_keys.as_slice())
        .unwrap_or(&[]);
    let items: Vec<ListItem> = if keys.is_empty() {
        vec![ListItem::new("No named keys (or load an account first).")]
    } else {
        keys.iter()
            .enumerate()
            .map(|(i, row)| {
                let marker = if i == model.accounts.list_selected {
                    ">"
                } else {
                    " "
                };
                let line = format!("{marker} {:<24} {}", truncate(&row.name, 24), row.key);
                let style = if i == model.accounts.list_selected {
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
    frame.render_widget(
        List::new(items).block(
            Block::default()
                .borders(Borders::ALL)
                .border_style(Style::default().fg(Color::Cyan))
                .title(" Named keys "),
        ),
        area,
    );
}

fn draw_delegations(frame: &mut Frame, area: Rect, model: &AppModel) {
    let mut lines: Vec<(String, bool)> = Vec::new();
    if let Some(ss) = &model.accounts.self_stake {
        lines.push((
            format!(
                "self-stake -> {} motes={} purse={}",
                short_key(&ss.public_key),
                ss.staked_amount,
                short_key(&ss.bonding_purse)
            ),
            true,
        ));
    }
    for d in &model.accounts.delegations {
        lines.push((
            format!(
                "del {} -> val {} motes={} purse={}",
                short_key(&d.delegator_public_key),
                short_key(&d.validator_public_key),
                d.staked_amount,
                short_key(&d.bonding_purse)
            ),
            false,
        ));
    }

    let items: Vec<ListItem> = if lines.is_empty() {
        vec![ListItem::new(
            "No auction stakes for this identity (faucet usually sits this one out).",
        )]
    } else {
        lines
            .iter()
            .enumerate()
            .map(|(i, (text, is_self))| {
                let marker = if i == model.accounts.list_selected {
                    ">"
                } else {
                    " "
                };
                let prefix = if *is_self { "[V] " } else { "[D] " };
                let line = format!("{marker} {prefix}{text}");
                let style = if i == model.accounts.list_selected {
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

    frame.render_widget(
        List::new(items).block(
            Block::default()
                .borders(Borders::ALL)
                .border_style(Style::default().fg(Color::Cyan))
                .title(" Delegations / self-stake "),
        ),
        area,
    );
}

fn draw_undelegations(frame: &mut Frame, area: Rect, model: &AppModel) {
    let items: Vec<ListItem> = if model.accounts.undelegations.is_empty() {
        vec![ListItem::new(
            "No unbonding purses in auction_info for this identity.",
        )]
    } else {
        model
            .accounts
            .undelegations
            .iter()
            .enumerate()
            .map(|(i, row)| {
                let marker = if i == model.accounts.list_selected {
                    ">"
                } else {
                    " "
                };
                let era = row
                    .era_of_creation
                    .map(|e| e.to_string())
                    .unwrap_or_else(|| "?".into());
                let line = format!(
                    "{marker} unbonder {} val {} amount {} era {} purse {}",
                    short_key(&row.unbonder_public_key),
                    short_key(&row.validator_public_key),
                    row.amount,
                    era,
                    short_key(&row.bonding_purse)
                );
                let style = if i == model.accounts.list_selected {
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
    frame.render_widget(
        List::new(items).block(
            Block::default()
                .borders(Borders::ALL)
                .border_style(Style::default().fg(Color::Cyan))
                .title(" Undelegations "),
        ),
        area,
    );
}

fn draw_rewards(frame: &mut Frame, area: Rect, model: &AppModel) {
    let chunks = Layout::default()
        .direction(Direction::Vertical)
        .constraints([Constraint::Length(8), Constraint::Min(3)])
        .split(area);

    let editing = model.input_mode == InputMode::AccountReward;
    let field = |idx: usize, label: &str, input: &crate::text_input::TextInput| -> Line<'_> {
        let active = editing && model.accounts.reward_field % 3 == idx;
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
        Line::from(Span::styled(format!("{label}: {value}"), style))
    };

    let form = Paragraph::new(vec![
        Line::from(Span::styled(
            "w edit form | Enter fetch | Tab fields | Esc cancel",
            Style::default().fg(Color::DarkGray),
        )),
        field(0, "validator", &model.accounts.reward_validator),
        field(1, "era     ", &model.accounts.reward_era),
        field(2, "delegator (optional)", &model.accounts.reward_delegator),
    ])
    .block(
        Block::default()
            .borders(Borders::ALL)
            .border_style(Style::default().fg(Color::Yellow))
            .title(" Era reward form "),
    );
    frame.render_widget(form, chunks[0]);

    let body = model
        .accounts
        .reward_text
        .as_deref()
        .unwrap_or("No reward payload yet.");
    frame.render_widget(
        Paragraph::new(body)
            .block(
                Block::default()
                    .borders(Borders::ALL)
                    .border_style(Style::default().fg(Color::Cyan))
                    .title(" Reward result "),
            )
            .wrap(Wrap { trim: false })
            .scroll((model.accounts.scroll, 0)),
        chunks[1],
    );
}

fn short_key(s: &str) -> String {
    if s.len() <= 18 {
        s.to_string()
    } else {
        format!("{}..{}", &s[..8], &s[s.len() - 6..])
    }
}

fn truncate(s: &str, max: usize) -> String {
    if s.chars().count() <= max {
        format!("{s:<max$}")
    } else {
        let mut out: String = s.chars().take(max.saturating_sub(2)).collect();
        out.push_str("..");
        out
    }
}
