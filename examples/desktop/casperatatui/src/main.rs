//! `casperatatui` binary: clap + async UI loop.

use anyhow::Result;
use casperatatui::command::ParsedCommand;
use casperatatui::config::Cli;
use casperatatui::draw;
use casperatatui::model::{ActionLaunch, ActionsPane, AppModel, InputMode, RpcEvent, ViewMode};
use casperatatui::sdk_client::{ActionWriteCtx, OneShotTransferOwned, SdkClient, WriteBuildJob};
use casperatatui::terminal::{StopFlag, TerminalGuard};
use casperatatui::write_flow::{chain_name_for_preset, WriteKind};
use clap::Parser;
use crossterm::event::{self, Event, KeyCode, KeyEventKind, KeyModifiers};
use std::path::{Path, PathBuf};
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::Arc;
use std::time::{Duration, Instant};
use tokio::sync::mpsc;

struct KeyCtx<'a> {
    model: &'a mut AppModel,
    client: &'a mut SdkClient,
    rpc_tx: &'a mpsc::UnboundedSender<RpcEvent>,
    stop: &'a StopFlag,
}

#[tokio::main]
async fn main() -> Result<()> {
    let cli = Cli::parse();
    let cfg = cli.resolve()?;
    let stop: StopFlag = Arc::new(AtomicBool::new(false));
    let mut guard = TerminalGuard::enter(stop.clone())?;
    let mut client = SdkClient::new(cfg.rpc_url.clone(), cfg.verbosity);
    let chain_name = chain_name_for_preset(cfg.preset.label()).to_string();
    let mut model = AppModel::new(
        cfg.rpc_url,
        cfg.events_url,
        cfg.preset.label().to_string(),
        cfg.enable_writes,
        cfg.policy,
        chain_name,
    );

    if model.enable_writes {
        if let Some(path) = cfg.secret_key_path.as_ref() {
            match model.load_pem_from_path(&path.display().to_string()) {
                Ok(()) => model.set_status(format!(
                    "PEM loaded | pk {}",
                    truncate_pk(&model.public_key)
                )),
                Err(err) => model.set_error(err),
            }
        }
    }

    let (rpc_tx, mut rpc_rx) = mpsc::unbounded_channel();

    if model.can_refresh() {
        model.begin_network_refresh();
        client.spawn_network_refresh(rpc_tx.clone());
    }

    let mut last_tip = Instant::now();

    while !stop.load(Ordering::SeqCst) {
        while let Ok(ev) = rpc_rx.try_recv() {
            model.apply_rpc(ev);
        }

        guard
            .terminal_mut()
            .draw(|frame| draw::draw(frame, &model))?;

        if event::poll(Duration::from_millis(200))? {
            match event::read()? {
                Event::Key(key) if key.kind == KeyEventKind::Press => {
                    let mut ctx = KeyCtx {
                        model: &mut model,
                        client: &mut client,
                        rpc_tx: &rpc_tx,
                        stop: &stop,
                    };
                    if handle_key(key.code, key.modifiers, &mut ctx)? {
                        break;
                    }
                }
                Event::Resize(_, _) => {}
                _ => {}
            }
        }

        model.tick = model.tick.wrapping_add(1);
        if last_tip.elapsed() >= Duration::from_secs(5) {
            model.tip_index = model.tip_index.wrapping_add(1);
            last_tip = Instant::now();
        }
    }

    guard.restore()?;
    eprintln!(
        "Casperatatui: terminal restored. The ghost has left the building (RPC was {}).",
        client.rpc_url()
    );
    Ok(())
}

fn handle_key(code: KeyCode, modifiers: KeyModifiers, ctx: &mut KeyCtx<'_>) -> Result<bool> {
    match ctx.model.input_mode {
        InputMode::Command => return handle_command_key(code, ctx),
        InputMode::EditRpc => return handle_edit_rpc_key(code, ctx),
        InputMode::ActionForm => return handle_action_form_key(code, ctx),
        InputMode::BlockLookup => return handle_block_lookup_key(code, ctx),
        InputMode::TxLookup => return handle_tx_lookup_key(code, ctx),
        InputMode::AccountLookup => return handle_account_lookup_key(code, ctx),
        InputMode::AccountReward => return handle_account_reward_key(code, ctx),
        InputMode::ValidatorFilter => return handle_validator_filter_key(code, ctx),
        InputMode::ContractLookup => return handle_contract_lookup_key(code, ctx),
        InputMode::ContractQueryKey => return handle_contract_query_key_key(code, ctx),
        InputMode::ContractQueryDict => return handle_contract_query_dict_key(code, ctx),
        InputMode::WriteForm => return handle_write_form_key(code, ctx),
        InputMode::LoadPem => return handle_load_pem_key(code, ctx),
        InputMode::WaitForm => return handle_wait_form_key(code, ctx),
        InputMode::Normal => {}
    }

    if code == KeyCode::Char('c') && modifiers.contains(KeyModifiers::CONTROL) {
        ctx.stop.store(true, Ordering::SeqCst);
        return Ok(true);
    }

    if code == KeyCode::Esc {
        if modifiers.contains(KeyModifiers::CONTROL) {
            ctx.stop.store(true, Ordering::SeqCst);
            return Ok(true);
        }
        return handle_escape(ctx);
    }

    if code == KeyCode::Char('q') {
        ctx.stop.store(true, Ordering::SeqCst);
        return Ok(true);
    }

    match code {
        KeyCode::Char(':') => ctx.model.open_command(),
        KeyCode::Char('e') => ctx.model.open_rpc_edit(),
        KeyCode::Char('h') => {
            ctx.model.view = ViewMode::Help;
            ctx.model.set_status("help | the ghost wrote a manual");
        }
        KeyCode::Char('r') => request_refresh(ctx),
        KeyCode::Char('l') if ctx.model.view == ViewMode::Blocks => request_latest_blocks(ctx),
        KeyCode::Char('/') if ctx.model.view == ViewMode::Blocks => {
            ctx.model.open_block_lookup();
        }
        KeyCode::Char('/') if ctx.model.view == ViewMode::Transactions => {
            ctx.model.open_tx_lookup();
        }
        KeyCode::Char('/') if ctx.model.view == ViewMode::Accounts => {
            ctx.model.open_account_lookup();
        }
        KeyCode::Char('/') if ctx.model.view == ViewMode::Validators => {
            ctx.model.open_validator_filter();
        }
        KeyCode::Char('/') if ctx.model.view == ViewMode::Contracts => {
            ctx.model.open_contract_lookup();
        }
        KeyCode::Char('/') if ctx.model.view == ViewMode::Wait => {
            ctx.model.open_wait_form();
        }
        KeyCode::Char('w') if ctx.model.view == ViewMode::Accounts => {
            ctx.model.open_account_reward_form();
        }
        KeyCode::Char('w') if ctx.model.view == ViewMode::Validators => {
            ctx.model.open_validator_reward_form();
        }
        KeyCode::Char('w') if ctx.model.view == ViewMode::Wait => request_wait_or_collect(ctx),
        KeyCode::Char(' ') if ctx.model.view == ViewMode::Wait => {
            if ctx.model.wait.pane == casperatatui::model::WaitPane::SseCollect {
                ctx.model.wait.toggle_selected_name();
            }
        }
        KeyCode::Char('o') if ctx.model.enable_writes => ctx.model.open_load_pem(),
        KeyCode::Char('x') if ctx.model.enable_writes => {
            ctx.model.unload_pem();
            ctx.model.set_status("PEM unloaded | session key cleared");
        }
        KeyCode::Char('b') if ctx.model.view == ViewMode::Writes => request_write_build(ctx),
        KeyCode::Char('s') if ctx.model.view == ViewMode::Writes => request_write_sign(ctx),
        KeyCode::Char('p') if ctx.model.view == ViewMode::Writes => request_write_put(ctx),
        KeyCode::Char('t') if ctx.model.view == ViewMode::Writes => request_one_shot_transfer(ctx),
        KeyCode::Tab => {
            if ctx.model.view == ViewMode::Actions {
                cycle_actions_pane(ctx.model);
            } else if ctx.model.view == ViewMode::Accounts {
                ctx.model.accounts.cycle_section(true);
                ctx.model
                    .set_status(format!("accounts | {}", ctx.model.accounts.section.title()));
            } else if ctx.model.view == ViewMode::Validators {
                ctx.model.validators.cycle_section(true);
                ctx.model.set_status(format!(
                    "validators | {}",
                    ctx.model.validators.section.title()
                ));
            } else if ctx.model.view == ViewMode::Contracts {
                let enable = ctx.model.enable_writes;
                ctx.model.contracts.cycle_section(true, enable);
                ctx.model.set_status(format!(
                    "contracts | {}",
                    ctx.model.contracts.section.title()
                ));
            } else if ctx.model.view == ViewMode::Writes {
                ctx.model.writes.cycle_kind(true);
                ctx.model
                    .set_status(format!("writes | {}", ctx.model.writes.kind.title()));
            } else if ctx.model.view == ViewMode::Wait {
                ctx.model.wait.pane = ctx.model.wait.pane.next();
                ctx.model.wait.field_idx = 0;
                ctx.model
                    .set_status(format!("wait | {}", ctx.model.wait.pane.title()));
            } else {
                ctx.model.view = ctx.model.view.next();
                ctx.model
                    .set_status(format!("view | {}", ctx.model.view.title()));
            }
        }
        KeyCode::BackTab => {
            if ctx.model.view == ViewMode::Accounts {
                ctx.model.accounts.cycle_section(false);
                ctx.model
                    .set_status(format!("accounts | {}", ctx.model.accounts.section.title()));
            } else if ctx.model.view == ViewMode::Validators {
                ctx.model.validators.cycle_section(false);
                ctx.model.set_status(format!(
                    "validators | {}",
                    ctx.model.validators.section.title()
                ));
            } else if ctx.model.view == ViewMode::Contracts {
                let enable = ctx.model.enable_writes;
                ctx.model.contracts.cycle_section(false, enable);
                ctx.model.set_status(format!(
                    "contracts | {}",
                    ctx.model.contracts.section.title()
                ));
            } else if ctx.model.view == ViewMode::Writes {
                ctx.model.writes.cycle_kind(false);
                ctx.model
                    .set_status(format!("writes | {}", ctx.model.writes.kind.title()));
            } else if ctx.model.view == ViewMode::Wait {
                ctx.model.wait.pane = ctx.model.wait.pane.next();
                ctx.model.wait.field_idx = 0;
                ctx.model
                    .set_status(format!("wait | {}", ctx.model.wait.pane.title()));
            } else {
                ctx.model.view = ctx.model.view.prev();
                ctx.model
                    .set_status(format!("view | {}", ctx.model.view.title()));
            }
        }
        KeyCode::Right => {
            ctx.model.view = ctx.model.view.next();
            ctx.model
                .set_status(format!("view | {}", ctx.model.view.title()));
        }
        KeyCode::Left => {
            ctx.model.view = ctx.model.view.prev();
            ctx.model
                .set_status(format!("view | {}", ctx.model.view.title()));
        }
        KeyCode::Char(c) if c.is_ascii_digit() => {
            if let Some(view) = ViewMode::from_digit(c) {
                ctx.model.view = view;
                ctx.model.set_status(format!("view | {}", view.title()));
                if view == ViewMode::Validators && ctx.model.validators.bidders.is_empty() {
                    request_validators_auction(ctx);
                }
            }
        }
        KeyCode::Down | KeyCode::Char('j') => scroll_or_list(ctx.model, 1),
        KeyCode::Up | KeyCode::Char('k') => scroll_or_list(ctx.model, -1),
        KeyCode::PageDown => scroll_page(ctx.model, 10),
        KeyCode::PageUp => scroll_page(ctx.model, -10),
        KeyCode::Enter => match ctx.model.view {
            ViewMode::Actions => launch_selected_action(ctx),
            ViewMode::Blocks => blocks_enter(ctx),
            ViewMode::Transactions => request_transaction(ctx),
            ViewMode::Accounts => accounts_enter(ctx),
            ViewMode::Validators => validators_enter(ctx),
            ViewMode::Contracts => contracts_enter(ctx),
            ViewMode::Writes => ctx.model.open_write_form(),
            ViewMode::Wait => {
                if ctx.model.wait.pane == casperatatui::model::WaitPane::SseCollect
                    && ctx.model.input_mode == InputMode::Normal
                {
                    // Prefer starting collect when form looks filled.
                    request_wait_or_collect(ctx);
                } else {
                    ctx.model.open_wait_form();
                }
            }
            _ => {}
        },
        _ => {}
    }
    Ok(false)
}

fn handle_escape(ctx: &mut KeyCtx<'_>) -> Result<bool> {
    use casperatatui::model::BlocksPane;
    if ctx.model.view == ViewMode::Actions && ctx.model.actions.pane != ActionsPane::List {
        ctx.model.actions.close_form();
        ctx.model.actions.pane = ActionsPane::List;
        ctx.model.set_status("back to the spell list");
        return Ok(false);
    }
    if ctx.model.view == ViewMode::Blocks && ctx.model.blocks.pane == BlocksPane::Detail {
        ctx.model.blocks.pane = BlocksPane::List;
        ctx.model.set_status("back to the brick pile");
        return Ok(false);
    }
    // Esc never quits: stay put and hint how to leave.
    ctx.model
        .set_status("nowhere to go back | Ctrl+Esc (or q / Ctrl-C) to quit");
    Ok(false)
}

fn request_latest_blocks(ctx: &mut KeyCtx<'_>) {
    if !ctx.model.can_refresh() {
        ctx.model
            .set_status("still busy | let the previous haunt finish");
        return;
    }
    let n = ctx.model.blocks.latest_count;
    ctx.model
        .begin_blocks_job(format!("stacking latest {n} blocks..."));
    ctx.client.spawn_latest_blocks(n, ctx.rpc_tx.clone());
}

fn blocks_enter(ctx: &mut KeyCtx<'_>) {
    use casperatatui::model::BlocksPane;
    match ctx.model.blocks.pane {
        BlocksPane::List => {
            if ctx.model.blocks.rows.is_empty() {
                request_latest_blocks(ctx);
                return;
            }
            let Some(row) = ctx.model.blocks.rows.get(ctx.model.blocks.selected) else {
                return;
            };
            if !ctx.model.can_refresh() {
                ctx.model
                    .set_status("still busy | let the previous haunt finish");
                return;
            }
            let id = row.height.to_string();
            ctx.model
                .begin_blocks_job(format!("opening block #{id}..."));
            ctx.client.spawn_block_detail(Some(id), ctx.rpc_tx.clone());
        }
        BlocksPane::Detail => {
            let Some(hash) = ctx.model.blocks.selected_tx_hash() else {
                ctx.model.set_status("no tx selected | this brick is empty");
                return;
            };
            ctx.model.transactions.hash_input.set(hash.clone());
            ctx.model.view = ViewMode::Transactions;
            if !ctx.model.can_refresh() {
                ctx.model.set_status("hash parked in Txs | wait then Enter");
                return;
            }
            ctx.model
                .begin_blocks_job(format!("fetching tx {}...", &hash[..8.min(hash.len())]));
            ctx.client.spawn_transaction(hash, ctx.rpc_tx.clone());
        }
    }
}

fn request_transaction(ctx: &mut KeyCtx<'_>) {
    let hash = ctx.model.transactions.hash_input.buffer.trim().to_string();
    if hash.is_empty() {
        ctx.model.open_tx_lookup();
        return;
    }
    if !ctx.model.can_refresh() {
        ctx.model
            .set_status("still busy | let the previous haunt finish");
        return;
    }
    ctx.model
        .begin_blocks_job(format!("fetching tx {}...", short_prefix(&hash)));
    ctx.client.spawn_transaction(hash, ctx.rpc_tx.clone());
}

fn short_prefix(s: &str) -> String {
    if s.len() <= 12 {
        s.to_string()
    } else {
        format!("{}...", &s[..10])
    }
}

fn handle_block_lookup_key(code: KeyCode, ctx: &mut KeyCtx<'_>) -> Result<bool> {
    match code {
        KeyCode::Esc => {
            ctx.model.input_mode = InputMode::Normal;
            ctx.model.set_status("lookup cancelled");
        }
        KeyCode::Enter => {
            let id = ctx.model.blocks.lookup.buffer.trim().to_string();
            ctx.model.input_mode = InputMode::Normal;
            if id.is_empty() {
                ctx.model
                    .set_error("empty lookup | ghosts need a height or hash");
                return Ok(false);
            }
            if !ctx.model.can_refresh() {
                ctx.model
                    .set_status("still busy | let the previous haunt finish");
                return Ok(false);
            }
            ctx.model
                .begin_blocks_job(format!("looking up block {id}..."));
            ctx.client.spawn_block_detail(Some(id), ctx.rpc_tx.clone());
        }
        KeyCode::Backspace => ctx.model.blocks.lookup.backspace(),
        KeyCode::Delete => ctx.model.blocks.lookup.delete(),
        KeyCode::Left => ctx.model.blocks.lookup.move_left(),
        KeyCode::Right => ctx.model.blocks.lookup.move_right(),
        KeyCode::Char(c) => ctx.model.blocks.lookup.insert(c),
        _ => {}
    }
    Ok(false)
}

fn handle_tx_lookup_key(code: KeyCode, ctx: &mut KeyCtx<'_>) -> Result<bool> {
    match code {
        KeyCode::Esc => {
            ctx.model.input_mode = InputMode::Normal;
            ctx.model.set_status("tx edit cancelled");
        }
        KeyCode::Enter => {
            ctx.model.input_mode = InputMode::Normal;
            request_transaction(ctx);
        }
        KeyCode::Backspace => ctx.model.transactions.hash_input.backspace(),
        KeyCode::Delete => ctx.model.transactions.hash_input.delete(),
        KeyCode::Left => ctx.model.transactions.hash_input.move_left(),
        KeyCode::Right => ctx.model.transactions.hash_input.move_right(),
        KeyCode::Char(c) => ctx.model.transactions.hash_input.insert(c),
        _ => {}
    }
    Ok(false)
}

fn handle_account_lookup_key(code: KeyCode, ctx: &mut KeyCtx<'_>) -> Result<bool> {
    match code {
        KeyCode::Esc => {
            ctx.model.input_mode = InputMode::Normal;
            ctx.model.set_status("account lookup cancelled");
        }
        KeyCode::Enter => {
            ctx.model.input_mode = InputMode::Normal;
            request_account_load(ctx);
        }
        KeyCode::Backspace => ctx.model.accounts.identity.backspace(),
        KeyCode::Delete => ctx.model.accounts.identity.delete(),
        KeyCode::Left => ctx.model.accounts.identity.move_left(),
        KeyCode::Right => ctx.model.accounts.identity.move_right(),
        KeyCode::Char(c) => ctx.model.accounts.identity.insert(c),
        _ => {}
    }
    Ok(false)
}

fn handle_account_reward_key(code: KeyCode, ctx: &mut KeyCtx<'_>) -> Result<bool> {
    let on_validators = ctx.model.view == ViewMode::Validators;
    match code {
        KeyCode::Esc => {
            ctx.model.input_mode = InputMode::Normal;
            ctx.model.set_status("reward form cancelled");
        }
        KeyCode::Tab => {
            if on_validators {
                ctx.model.validators.reward_field = (ctx.model.validators.reward_field + 1) % 3;
            } else {
                ctx.model.accounts.reward_field = (ctx.model.accounts.reward_field + 1) % 3;
            }
        }
        KeyCode::BackTab => {
            if on_validators {
                ctx.model.validators.reward_field = (ctx.model.validators.reward_field + 2) % 3;
            } else {
                ctx.model.accounts.reward_field = (ctx.model.accounts.reward_field + 2) % 3;
            }
        }
        KeyCode::Enter => {
            ctx.model.input_mode = InputMode::Normal;
            request_reward(ctx);
        }
        KeyCode::Backspace => {
            if on_validators {
                ctx.model.validators.reward_field_mut().backspace();
            } else {
                ctx.model.accounts.reward_field_mut().backspace();
            }
        }
        KeyCode::Delete => {
            if on_validators {
                ctx.model.validators.reward_field_mut().delete();
            } else {
                ctx.model.accounts.reward_field_mut().delete();
            }
        }
        KeyCode::Left => {
            if on_validators {
                ctx.model.validators.reward_field_mut().move_left();
            } else {
                ctx.model.accounts.reward_field_mut().move_left();
            }
        }
        KeyCode::Right => {
            if on_validators {
                ctx.model.validators.reward_field_mut().move_right();
            } else {
                ctx.model.accounts.reward_field_mut().move_right();
            }
        }
        KeyCode::Char(c) => {
            if on_validators {
                ctx.model.validators.reward_field_mut().insert(c);
            } else {
                ctx.model.accounts.reward_field_mut().insert(c);
            }
        }
        _ => {}
    }
    Ok(false)
}

fn handle_validator_filter_key(code: KeyCode, ctx: &mut KeyCtx<'_>) -> Result<bool> {
    match code {
        KeyCode::Esc => {
            ctx.model.input_mode = InputMode::Normal;
            ctx.model.set_status("filter cancelled");
        }
        KeyCode::Enter => {
            ctx.model.input_mode = InputMode::Normal;
            ctx.model.validators.list_selected = 0;
            ctx.model.set_status(format!(
                "filter applied | {} validators / {} bidders visible",
                ctx.model.validators.filtered_validators().len(),
                ctx.model.validators.filtered_bidders().len()
            ));
        }
        KeyCode::Backspace => ctx.model.validators.filter.backspace(),
        KeyCode::Delete => ctx.model.validators.filter.delete(),
        KeyCode::Left => ctx.model.validators.filter.move_left(),
        KeyCode::Right => ctx.model.validators.filter.move_right(),
        KeyCode::Char(c) => ctx.model.validators.filter.insert(c),
        _ => {}
    }
    Ok(false)
}

fn accounts_enter(ctx: &mut KeyCtx<'_>) {
    use casperatatui::model::AccountsSection;
    match ctx.model.accounts.section {
        AccountsSection::Rewards => {
            if ctx.model.accounts.reward_validator.buffer.trim().is_empty() {
                ctx.model.open_account_reward_form();
            } else {
                request_reward(ctx);
            }
        }
        _ => request_account_load(ctx),
    }
}

fn request_account_load(ctx: &mut KeyCtx<'_>) {
    let identity = ctx.model.accounts.identity.buffer.trim().to_string();
    let identity = if identity.is_empty() {
        ctx.model
            .accounts
            .loaded_identity
            .clone()
            .unwrap_or_default()
    } else {
        identity
    };
    if identity.is_empty() {
        ctx.model
            .set_status("need an identity | / paste pubkey or account-hash");
        return;
    }
    if !ctx.model.can_refresh() {
        ctx.model
            .set_status("still busy · let the previous spell land");
        return;
    }
    ctx.model.accounts.identity.set(identity.clone());
    ctx.model
        .begin_account_job("summoning account + balances + auction...");
    ctx.client.spawn_account_load(identity, ctx.rpc_tx.clone());
}

fn request_reward(ctx: &mut KeyCtx<'_>) {
    let on_validators = ctx.model.view == ViewMode::Validators;
    let (validator, era, delegator) = if on_validators {
        (
            ctx.model
                .validators
                .reward_validator
                .buffer
                .trim()
                .to_string(),
            {
                let s = ctx.model.validators.reward_era.buffer.trim().to_string();
                if s.is_empty() {
                    None
                } else {
                    Some(s)
                }
            },
            {
                let s = ctx
                    .model
                    .validators
                    .reward_delegator
                    .buffer
                    .trim()
                    .to_string();
                if s.is_empty() {
                    None
                } else {
                    Some(s)
                }
            },
        )
    } else {
        (
            ctx.model
                .accounts
                .reward_validator
                .buffer
                .trim()
                .to_string(),
            {
                let s = ctx.model.accounts.reward_era.buffer.trim().to_string();
                if s.is_empty() {
                    None
                } else {
                    Some(s)
                }
            },
            {
                let s = ctx
                    .model
                    .accounts
                    .reward_delegator
                    .buffer
                    .trim()
                    .to_string();
                if s.is_empty() {
                    None
                } else {
                    Some(s)
                }
            },
        )
    };
    if validator.is_empty() {
        ctx.model
            .set_status("reward needs a validator pubkey | press w");
        return;
    }
    if !ctx.model.can_refresh() {
        ctx.model
            .set_status("still busy · let the previous spell land");
        return;
    }
    if on_validators {
        ctx.model
            .begin_validators_job("asking the era for its tip jar...");
    } else {
        ctx.model
            .begin_account_job("asking the era for its tip jar...");
    }
    ctx.client
        .spawn_reward(validator, delegator, era, ctx.rpc_tx.clone());
}

fn validators_enter(ctx: &mut KeyCtx<'_>) {
    use casperatatui::model::ValidatorsSection;
    match ctx.model.validators.section {
        ValidatorsSection::Rewards => {
            if ctx
                .model
                .validators
                .reward_validator
                .buffer
                .trim()
                .is_empty()
            {
                ctx.model.open_validator_reward_form();
            } else {
                request_reward(ctx);
            }
        }
        ValidatorsSection::Detail => {
            if ctx.model.validators.detail.is_none() {
                ctx.model.set_status("pick a validator from the list first");
            } else {
                ctx.model.open_validator_reward_form();
            }
        }
        ValidatorsSection::Validators | ValidatorsSection::Bidders => {
            if ctx.model.validators.bidders.is_empty() {
                request_validators_auction(ctx);
                return;
            }
            let rows: Vec<String> = if ctx.model.validators.section == ValidatorsSection::Validators
            {
                ctx.model
                    .validators
                    .filtered_validators()
                    .into_iter()
                    .map(|r| r.public_key.clone())
                    .collect()
            } else {
                ctx.model
                    .validators
                    .filtered_bidders()
                    .into_iter()
                    .map(|r| r.public_key.clone())
                    .collect()
            };
            if rows.is_empty() {
                ctx.model
                    .set_status("no rows | adjust / filter or r reload");
                return;
            }
            let idx = ctx.model.validators.list_selected.min(rows.len() - 1);
            let pk = rows[idx].clone();
            // Re-parse detail from last auction by reloading if needed: use get_validator on stored lists.
            request_validator_detail(ctx, &pk);
        }
    }
}

fn request_validator_detail(ctx: &mut KeyCtx<'_>, public_key: &str) {
    // Prefer detail from current bidder list via a fresh auction reload is heavy;
    // rebuild from in-memory auction by matching list rows + get_validator needs raw JSON.
    // Keep last auction in state: store raw Value on ValidatorsState.
    if let Some(raw) = ctx.model.validators.raw_auction.clone() {
        if let Some(detail) = casperatatui::auction_view::get_validator(&raw, public_key) {
            ctx.model.validators.detail = Some(detail);
            ctx.model.validators.section = casperatatui::model::ValidatorsSection::Detail;
            ctx.model.validators.del_selected = 0;
            ctx.model.validators.scroll = 0;
            ctx.model.set_status(format!(
                "detail | {}",
                &public_key[..16.min(public_key.len())]
            ));
            return;
        }
    }
    ctx.model
        .set_status("reload auction with r, then Enter again");
}

fn request_validators_auction(ctx: &mut KeyCtx<'_>) {
    if !ctx.model.can_refresh() {
        ctx.model
            .set_status("still busy | let the previous haunt finish");
        return;
    }
    ctx.model
        .begin_validators_job("polling the auction house...");
    ctx.client.spawn_auction_info(ctx.rpc_tx.clone());
}

fn handle_contract_lookup_key(code: KeyCode, ctx: &mut KeyCtx<'_>) -> Result<bool> {
    match code {
        KeyCode::Esc => {
            ctx.model.input_mode = InputMode::Normal;
            ctx.model.set_status("contract lookup cancelled");
        }
        KeyCode::Enter => {
            ctx.model.input_mode = InputMode::Normal;
            request_contract_load(ctx);
        }
        KeyCode::Backspace => ctx.model.contracts.lookup.backspace(),
        KeyCode::Delete => ctx.model.contracts.lookup.delete(),
        KeyCode::Left => ctx.model.contracts.lookup.move_left(),
        KeyCode::Right => ctx.model.contracts.lookup.move_right(),
        KeyCode::Char(c) => ctx.model.contracts.lookup.insert(c),
        _ => {}
    }
    Ok(false)
}

fn handle_contract_query_key_key(code: KeyCode, ctx: &mut KeyCtx<'_>) -> Result<bool> {
    match code {
        KeyCode::Esc => {
            ctx.model.input_mode = InputMode::Normal;
            ctx.model.set_status("query key cancelled");
        }
        KeyCode::Enter => {
            ctx.model.input_mode = InputMode::Normal;
            request_contract_query_key(ctx);
        }
        KeyCode::Backspace => ctx.model.contracts.query_path.backspace(),
        KeyCode::Delete => ctx.model.contracts.query_path.delete(),
        KeyCode::Left => ctx.model.contracts.query_path.move_left(),
        KeyCode::Right => ctx.model.contracts.query_path.move_right(),
        KeyCode::Char(c) => ctx.model.contracts.query_path.insert(c),
        _ => {}
    }
    Ok(false)
}

fn handle_contract_query_dict_key(code: KeyCode, ctx: &mut KeyCtx<'_>) -> Result<bool> {
    match code {
        KeyCode::Esc => {
            ctx.model.input_mode = InputMode::Normal;
            ctx.model.set_status("dict form cancelled");
        }
        KeyCode::Tab => {
            ctx.model.contracts.dict_field = (ctx.model.contracts.dict_field + 1) % 3;
        }
        KeyCode::BackTab => {
            ctx.model.contracts.dict_field = (ctx.model.contracts.dict_field + 2) % 3;
        }
        KeyCode::Enter => {
            ctx.model.input_mode = InputMode::Normal;
            request_contract_query_dict(ctx);
        }
        KeyCode::Backspace => {
            ctx.model.contracts.dict_field_mut().backspace();
        }
        KeyCode::Delete => {
            ctx.model.contracts.dict_field_mut().delete();
        }
        KeyCode::Left => {
            ctx.model.contracts.dict_field_mut().move_left();
        }
        KeyCode::Right => {
            ctx.model.contracts.dict_field_mut().move_right();
        }
        KeyCode::Char(c) => {
            ctx.model.contracts.dict_field_mut().insert(c);
        }
        _ => {}
    }
    Ok(false)
}

fn contracts_enter(ctx: &mut KeyCtx<'_>) {
    use casperatatui::model::ContractsSection;
    match ctx.model.contracts.section {
        ContractsSection::QueryKey => {
            if ctx.model.input_mode == InputMode::ContractQueryKey {
                request_contract_query_key(ctx);
            } else {
                ctx.model.open_contract_query_key();
            }
        }
        ContractsSection::QueryDict => {
            if ctx.model.contracts.dict_seed.buffer.trim().is_empty() {
                ctx.model.open_contract_query_dict();
            } else {
                request_contract_query_dict(ctx);
            }
        }
        ContractsSection::Writes => {
            ctx.model.view = ViewMode::Writes;
            ctx.model
                .set_status("Writes view | o PEM | b/s/p transfer-stake | t one-shot");
        }
        _ => request_contract_load(ctx),
    }
}

fn request_contract_load(ctx: &mut KeyCtx<'_>) {
    let key = ctx.model.contracts.lookup.buffer.trim().to_string();
    let key = if key.is_empty() {
        ctx.model.contracts.loaded_key.clone().unwrap_or_default()
    } else {
        key
    };
    if key.is_empty() {
        ctx.model
            .set_status("need a key | / hash-… or auction|mint");
        return;
    }
    if !ctx.model.can_refresh() {
        ctx.model
            .set_status("still busy · let the previous spell land");
        return;
    }
    ctx.model.contracts.lookup.set(key.clone());
    ctx.model
        .begin_contract_job("rattling query_global_state for a contract...");
    ctx.client.spawn_contract_load(key, ctx.rpc_tx.clone());
}

fn request_contract_query_key(ctx: &mut KeyCtx<'_>) {
    let entity = ctx.model.contracts.loaded_key.clone().unwrap_or_default();
    if entity.is_empty() {
        ctx.model
            .set_status("load a contract first | / auction Enter");
        return;
    }
    let path = ctx.model.contracts.query_path.buffer.trim().to_string();
    if path.is_empty() {
        ctx.model.set_status("path required | e.g. era_id");
        return;
    }
    if !ctx.model.can_refresh() {
        ctx.model
            .set_status("still busy · let the previous spell land");
        return;
    }
    ctx.model
        .begin_contract_job(format!("query_contract_key path={path}"));
    ctx.client
        .spawn_contract_query_key(entity, path, ctx.rpc_tx.clone());
}

fn request_contract_query_dict(ctx: &mut KeyCtx<'_>) {
    let seed = ctx.model.contracts.dict_seed.buffer.trim().to_string();
    let item = ctx.model.contracts.dict_item.buffer.trim().to_string();
    if seed.is_empty() || item.is_empty() {
        ctx.model
            .set_status("dict needs seed_uref + item_key | Enter to edit");
        return;
    }
    if !ctx.model.can_refresh() {
        ctx.model
            .set_status("still busy · let the previous spell land");
        return;
    }
    let srh = {
        let s = ctx.model.contracts.dict_srh.buffer.trim().to_string();
        if s.is_empty() {
            None
        } else {
            Some(s)
        }
    };
    ctx.model.begin_contract_job("query_contract_dict...");
    ctx.client
        .spawn_contract_query_dict(seed, item, srh, ctx.rpc_tx.clone());
}

fn cycle_actions_pane(model: &mut AppModel) {
    model.actions.pane = match model.actions.pane {
        ActionsPane::List => {
            if model.actions.last_result_text.is_some() {
                ActionsPane::Result
            } else {
                ActionsPane::List
            }
        }
        ActionsPane::Result => ActionsPane::List,
        ActionsPane::Form => ActionsPane::Form,
    };
    model.set_status(format!("actions focus · {:?}", model.actions.pane));
}

fn scroll_or_list(model: &mut AppModel, delta: i32) {
    use casperatatui::model::BlocksPane;
    match model.view {
        ViewMode::Actions if model.actions.pane == ActionsPane::List => {
            let len = casperatatui::actions_catalog::visible_actions(
                model.enable_writes,
                model.has_pem(),
            )
            .len();
            if len == 0 {
                return;
            }
            model
                .actions
                .clamp_selected(model.enable_writes, model.has_pem());
            if delta > 0 {
                model.actions.selected = (model.actions.selected + 1) % len;
            } else {
                model.actions.selected = (model.actions.selected + len - 1) % len;
            }
        }
        ViewMode::Actions if model.actions.pane == ActionsPane::Result => {
            adjust_u16(&mut model.actions.result_scroll, delta);
        }
        ViewMode::Blocks if model.blocks.pane == BlocksPane::List => {
            let len = model.blocks.rows.len();
            if len == 0 {
                return;
            }
            if delta > 0 {
                model.blocks.selected = (model.blocks.selected + 1) % len;
            } else {
                model.blocks.selected = (model.blocks.selected + len - 1) % len;
            }
        }
        ViewMode::Blocks if model.blocks.pane == BlocksPane::Detail => {
            if let Some(row) = model.blocks.detail_row.as_ref() {
                let len = row.tx_hashes.len().max(1);
                if delta > 0 {
                    model.blocks.tx_selected = (model.blocks.tx_selected + 1) % len;
                } else {
                    model.blocks.tx_selected = (model.blocks.tx_selected + len - 1) % len;
                }
            } else {
                adjust_u16(&mut model.blocks.scroll, delta);
            }
        }
        ViewMode::Transactions => adjust_u16(&mut model.transactions.scroll, delta),
        ViewMode::Accounts => {
            use casperatatui::model::AccountsSection;
            let list_len = model.accounts.list_len();
            match model.accounts.section {
                AccountsSection::NamedKeys
                | AccountsSection::Delegations
                | AccountsSection::Undelegations
                    if list_len > 0 =>
                {
                    if delta > 0 {
                        model.accounts.list_selected =
                            (model.accounts.list_selected + 1) % list_len;
                    } else {
                        model.accounts.list_selected =
                            (model.accounts.list_selected + list_len - 1) % list_len;
                    }
                }
                _ => adjust_u16(&mut model.accounts.scroll, delta),
            }
        }
        ViewMode::Validators => {
            use casperatatui::model::ValidatorsSection;
            let list_len = model.validators.list_len();
            match model.validators.section {
                ValidatorsSection::Validators | ValidatorsSection::Bidders if list_len > 0 => {
                    if delta > 0 {
                        model.validators.list_selected =
                            (model.validators.list_selected + 1) % list_len;
                    } else {
                        model.validators.list_selected =
                            (model.validators.list_selected + list_len - 1) % list_len;
                    }
                }
                ValidatorsSection::Detail if list_len > 0 => {
                    if delta > 0 {
                        model.validators.del_selected =
                            (model.validators.del_selected + 1) % list_len;
                    } else {
                        model.validators.del_selected =
                            (model.validators.del_selected + list_len - 1) % list_len;
                    }
                }
                _ => adjust_u16(&mut model.validators.scroll, delta),
            }
        }
        ViewMode::Contracts => {
            use casperatatui::model::ContractsSection;
            let list_len = model.contracts.list_len();
            match model.contracts.section {
                ContractsSection::NamedKeys | ContractsSection::EntryPoints if list_len > 0 => {
                    if delta > 0 {
                        model.contracts.list_selected =
                            (model.contracts.list_selected + 1) % list_len;
                    } else {
                        model.contracts.list_selected =
                            (model.contracts.list_selected + list_len - 1) % list_len;
                    }
                }
                _ => adjust_u16(&mut model.contracts.scroll, delta),
            }
        }
        ViewMode::Writes => adjust_u16(&mut model.writes.scroll, delta),
        ViewMode::Wait => {
            use casperatatui::model::WaitPane;
            if model.wait.pane == WaitPane::SseCollect && model.input_mode == InputMode::Normal {
                let len = model.wait.event_names.len().max(1);
                if delta > 0 {
                    model.wait.name_idx = (model.wait.name_idx + 1) % len;
                } else {
                    model.wait.name_idx = (model.wait.name_idx + len - 1) % len;
                }
            } else {
                adjust_u16(&mut model.wait.scroll, delta);
            }
        }
        ViewMode::Network | ViewMode::Help => adjust_u16(&mut model.body_scroll, delta),
        _ => {}
    }
}

fn scroll_page(model: &mut AppModel, delta: i32) {
    match model.view {
        ViewMode::Actions => adjust_u16(&mut model.actions.result_scroll, delta),
        ViewMode::Blocks => adjust_u16(&mut model.blocks.scroll, delta),
        ViewMode::Transactions => adjust_u16(&mut model.transactions.scroll, delta),
        ViewMode::Accounts => adjust_u16(&mut model.accounts.scroll, delta),
        ViewMode::Contracts => adjust_u16(&mut model.contracts.scroll, delta),
        ViewMode::Writes => adjust_u16(&mut model.writes.scroll, delta),
        ViewMode::Wait => adjust_u16(&mut model.wait.scroll, delta),
        _ => adjust_u16(&mut model.body_scroll, delta),
    }
}

fn adjust_u16(value: &mut u16, delta: i32) {
    if delta >= 0 {
        *value = value.saturating_add(delta as u16);
    } else {
        *value = value.saturating_sub((-delta) as u16);
    }
}

fn launch_selected_action(ctx: &mut KeyCtx<'_>) {
    let enable = ctx.model.enable_writes;
    let has_pem = ctx.model.has_pem();
    ctx.model.actions.clamp_selected(enable, has_pem);
    match ctx.model.actions.open_or_run_selected(enable, has_pem) {
        ActionLaunch::NeedForm => {
            ctx.model.input_mode = InputMode::ActionForm;
            ctx.model
                .set_status("fill the ingredients · Tab fields · Enter cast");
        }
        ActionLaunch::Run { method, args } => {
            if !ctx.model.can_refresh() {
                ctx.model
                    .set_status("still busy · let the previous spell land");
                return;
            }
            ctx.model.begin_action(method);
            let write = action_write_ctx(ctx.model);
            ctx.client
                .spawn_action_with_write(method, args, write, ctx.rpc_tx.clone());
        }
    }
}

fn action_write_ctx(model: &AppModel) -> ActionWriteCtx {
    ActionWriteCtx {
        pem: model.secret_key_pem.clone(),
        public_key: model.public_key.clone(),
        chain_name: model.chain_name.clone(),
        events_url: model.events_url.clone(),
        policy: model.policy.clone(),
    }
}

fn handle_action_form_key(code: KeyCode, ctx: &mut KeyCtx<'_>) -> Result<bool> {
    match code {
        KeyCode::Esc => {
            ctx.model.actions.close_form();
            ctx.model.input_mode = InputMode::Normal;
            ctx.model.set_status("form cancelled · spell uncast");
        }
        KeyCode::Tab => {
            let n = ctx.model.actions.form_fields.len();
            if n > 0 {
                ctx.model.actions.form_field_idx = (ctx.model.actions.form_field_idx + 1) % n;
            }
        }
        KeyCode::BackTab => {
            let n = ctx.model.actions.form_fields.len();
            if n > 0 {
                ctx.model.actions.form_field_idx = (ctx.model.actions.form_field_idx + n - 1) % n;
            }
        }
        KeyCode::Enter => match ctx.model.actions.collect_form_args() {
            None => {
                ctx.model
                    .set_error("missing required ingredient · the ritual frowns");
            }
            Some((method, args)) => {
                if !ctx.model.can_refresh() {
                    ctx.model
                        .set_status("still busy · let the previous spell land");
                    return Ok(false);
                }
                ctx.model.input_mode = InputMode::Normal;
                ctx.model.begin_action(method);
                let write = action_write_ctx(ctx.model);
                ctx.client
                    .spawn_action_with_write(method, args, write, ctx.rpc_tx.clone());
            }
        },
        KeyCode::Backspace => {
            if let Some(field) = ctx
                .model
                .actions
                .form_fields
                .get_mut(ctx.model.actions.form_field_idx)
            {
                field.backspace();
            }
        }
        KeyCode::Delete => {
            if let Some(field) = ctx
                .model
                .actions
                .form_fields
                .get_mut(ctx.model.actions.form_field_idx)
            {
                field.delete();
            }
        }
        KeyCode::Left => {
            if let Some(field) = ctx
                .model
                .actions
                .form_fields
                .get_mut(ctx.model.actions.form_field_idx)
            {
                field.move_left();
            }
        }
        KeyCode::Right => {
            if let Some(field) = ctx
                .model
                .actions
                .form_fields
                .get_mut(ctx.model.actions.form_field_idx)
            {
                field.move_right();
            }
        }
        KeyCode::Char(c) => {
            if let Some(field) = ctx
                .model
                .actions
                .form_fields
                .get_mut(ctx.model.actions.form_field_idx)
            {
                field.insert(c);
            }
        }
        _ => {}
    }
    Ok(false)
}

fn handle_edit_rpc_key(code: KeyCode, ctx: &mut KeyCtx<'_>) -> Result<bool> {
    match code {
        KeyCode::Esc => {
            ctx.model.close_rpc_edit();
            ctx.model.set_status("RPC edit cancelled");
        }
        KeyCode::Enter => {
            let url = ctx.model.rpc_edit.buffer.trim().to_string();
            if url.is_empty() {
                ctx.model
                    .set_error("RPC URL cannot be empty · ghosts need an address");
                return Ok(false);
            }
            ctx.model.rpc_url = url.clone();
            ctx.client.set_rpc_url(url);
            ctx.model.close_rpc_edit();
            ctx.model
                .set_status("RPC updated · press r to haunt the new house");
            request_refresh(ctx);
        }
        KeyCode::Backspace => ctx.model.rpc_edit.backspace(),
        KeyCode::Delete => ctx.model.rpc_edit.delete(),
        KeyCode::Left => ctx.model.rpc_edit.move_left(),
        KeyCode::Right => ctx.model.rpc_edit.move_right(),
        KeyCode::Char(c) => ctx.model.rpc_edit.insert(c),
        _ => {}
    }
    Ok(false)
}

fn handle_command_key(code: KeyCode, ctx: &mut KeyCtx<'_>) -> Result<bool> {
    match code {
        KeyCode::Esc => ctx.model.close_command(),
        KeyCode::Enter => {
            if let Some(cmd) = ctx.model.palette.parse_and_take() {
                ctx.model.close_command();
                if apply_command(cmd, ctx)? {
                    return Ok(true);
                }
            } else {
                ctx.model.close_command();
            }
        }
        KeyCode::Tab => ctx.model.palette.tab_complete(),
        KeyCode::Backspace => ctx.model.palette.backspace(),
        KeyCode::Left => ctx.model.palette.move_left(),
        KeyCode::Right => ctx.model.palette.move_right(),
        KeyCode::Up => ctx.model.palette.history_up(),
        KeyCode::Down => ctx.model.palette.history_down(),
        KeyCode::Char(c) => ctx.model.palette.insert(c),
        _ => {}
    }
    Ok(false)
}

fn apply_command(cmd: ParsedCommand, ctx: &mut KeyCtx<'_>) -> Result<bool> {
    match cmd {
        ParsedCommand::Help => {
            ctx.model.view = ViewMode::Help;
            ctx.model.set_status("help via :help");
        }
        ParsedCommand::Refresh => request_refresh(ctx),
        ParsedCommand::EditRpc => ctx.model.open_rpc_edit(),
        ParsedCommand::Clear => {
            ctx.model.clear_error();
            ctx.model.set_status("errors banished");
        }
        ParsedCommand::Quit => {
            ctx.stop.store(true, Ordering::SeqCst);
            return Ok(true);
        }
        ParsedCommand::Goto(name) => {
            if let Some(view) = parse_view_name(&name) {
                ctx.model.view = view;
                ctx.model.set_status(format!("goto {}", view.title()));
                if view == ViewMode::Validators && ctx.model.validators.bidders.is_empty() {
                    request_validators_auction(ctx);
                }
            } else {
                ctx.model.set_error(format!("unknown view `{name}`"));
            }
        }
        ParsedCommand::Cd(path) => {
            let target = resolve_path(&ctx.model.palette.cwd, &path);
            match std::fs::canonicalize(&target) {
                Ok(abs) if abs.is_dir() => {
                    ctx.model.palette.cwd = abs.clone();
                    ctx.model.set_status(format!("cwd {}", abs.display()));
                }
                Ok(_) => ctx
                    .model
                    .set_error(format!("not a directory: {}", target.display())),
                Err(err) => ctx.model.set_error(format!("cd: {err}")),
            }
        }
        ParsedCommand::Ls(path) => {
            let target = path
                .map(|p| resolve_path(&ctx.model.palette.cwd, &p))
                .unwrap_or_else(|| ctx.model.palette.cwd.clone());
            match std::fs::read_dir(&target) {
                Ok(entries) => {
                    let mut names: Vec<String> = entries
                        .filter_map(|e| e.ok())
                        .map(|e| {
                            let name = e.file_name().to_string_lossy().into_owned();
                            if e.file_type().map(|t| t.is_dir()).unwrap_or(false) {
                                format!("{name}/")
                            } else {
                                name
                            }
                        })
                        .collect();
                    names.sort();
                    ctx.model.set_status(format!(
                        "ls {} · {} entries (see : for path toys)",
                        target.display(),
                        names.len()
                    ));
                }
                Err(err) => ctx.model.set_error(format!("ls: {err}")),
            }
        }
        ParsedCommand::Unknown(name) => {
            ctx.model.set_error(format!(
                "unknown command `{name}` · try :help or Tab completion"
            ));
        }
    }
    Ok(false)
}

fn request_refresh(ctx: &mut KeyCtx<'_>) {
    if !ctx.model.can_refresh() {
        ctx.model
            .set_status("refresh cooling down · sip some ectoplasm");
        return;
    }
    if ctx.model.view == ViewMode::Validators {
        request_validators_auction(ctx);
        return;
    }
    ctx.model.begin_network_refresh();
    ctx.client.spawn_network_refresh(ctx.rpc_tx.clone());
}

fn handle_load_pem_key(code: KeyCode, ctx: &mut KeyCtx<'_>) -> Result<bool> {
    match code {
        KeyCode::Esc => {
            ctx.model.input_mode = InputMode::Normal;
            ctx.model.set_status("PEM load cancelled");
        }
        KeyCode::Enter => {
            let path = ctx.model.pem_path_input.buffer.trim().to_string();
            ctx.model.input_mode = InputMode::Normal;
            if path.is_empty() {
                ctx.model.set_error("empty PEM path");
                return Ok(false);
            }
            match ctx.model.load_pem_from_path(&path) {
                Ok(()) => {
                    ctx.model.actions.clamp_selected(true, true);
                    ctx.model.set_status(format!(
                        "PEM loaded | pk {}",
                        truncate_pk(&ctx.model.public_key)
                    ));
                }
                Err(err) => {
                    ctx.model.unload_pem();
                    ctx.model.set_error(err);
                }
            }
        }
        KeyCode::Backspace => ctx.model.pem_path_input.backspace(),
        KeyCode::Delete => ctx.model.pem_path_input.delete(),
        KeyCode::Left => ctx.model.pem_path_input.move_left(),
        KeyCode::Right => ctx.model.pem_path_input.move_right(),
        KeyCode::Char(c) => ctx.model.pem_path_input.insert(c),
        _ => {}
    }
    Ok(false)
}

fn handle_write_form_key(code: KeyCode, ctx: &mut KeyCtx<'_>) -> Result<bool> {
    let n = ctx.model.writes.field_count().max(1);
    match code {
        KeyCode::Esc => {
            ctx.model.input_mode = InputMode::Normal;
            ctx.model.set_status("write form left | b build when ready");
        }
        KeyCode::Tab => {
            ctx.model.writes.field_idx = (ctx.model.writes.field_idx + 1) % n;
        }
        KeyCode::BackTab => {
            ctx.model.writes.field_idx = (ctx.model.writes.field_idx + n - 1) % n;
        }
        KeyCode::Enter => {
            ctx.model.input_mode = InputMode::Normal;
            request_write_build(ctx);
        }
        KeyCode::Backspace => {
            let i = ctx.model.writes.field_idx;
            ctx.model.writes.field_at_mut(i).backspace();
        }
        KeyCode::Delete => {
            let i = ctx.model.writes.field_idx;
            ctx.model.writes.field_at_mut(i).delete();
        }
        KeyCode::Left => {
            let i = ctx.model.writes.field_idx;
            ctx.model.writes.field_at_mut(i).move_left();
        }
        KeyCode::Right => {
            let i = ctx.model.writes.field_idx;
            ctx.model.writes.field_at_mut(i).move_right();
        }
        KeyCode::Char(c) => {
            let i = ctx.model.writes.field_idx;
            ctx.model.writes.field_at_mut(i).insert(c);
        }
        _ => {}
    }
    Ok(false)
}

fn handle_wait_form_key(code: KeyCode, ctx: &mut KeyCtx<'_>) -> Result<bool> {
    let n = ctx.model.wait.field_count().max(1);
    match code {
        KeyCode::Esc => {
            ctx.model.input_mode = InputMode::Normal;
            ctx.model.set_status("wait form left | w to start");
        }
        KeyCode::Tab => {
            ctx.model.wait.field_idx = (ctx.model.wait.field_idx + 1) % n;
        }
        KeyCode::BackTab => {
            ctx.model.wait.field_idx = (ctx.model.wait.field_idx + n - 1) % n;
        }
        KeyCode::Enter => {
            ctx.model.input_mode = InputMode::Normal;
            request_wait_or_collect(ctx);
        }
        KeyCode::Backspace => {
            let i = ctx.model.wait.field_idx;
            ctx.model.wait.field_at_mut(i).backspace();
        }
        KeyCode::Delete => {
            let i = ctx.model.wait.field_idx;
            ctx.model.wait.field_at_mut(i).delete();
        }
        KeyCode::Left => {
            let i = ctx.model.wait.field_idx;
            ctx.model.wait.field_at_mut(i).move_left();
        }
        KeyCode::Right => {
            let i = ctx.model.wait.field_idx;
            ctx.model.wait.field_at_mut(i).move_right();
        }
        KeyCode::Char(c) => {
            let i = ctx.model.wait.field_idx;
            ctx.model.wait.field_at_mut(i).insert(c);
        }
        _ => {}
    }
    Ok(false)
}

fn request_wait_or_collect(ctx: &mut KeyCtx<'_>) {
    use casperatatui::model::WaitPane;
    if ctx.model.wait.waiting || !ctx.model.can_refresh() {
        ctx.model
            .set_status("still listening · wait for the previous haunt");
        return;
    }
    let events_url = ctx.model.wait.events_url.buffer.trim().to_string();
    if events_url.is_empty() {
        ctx.model.set_error("events URL required");
        return;
    }
    let timeout_ms = ctx
        .model
        .wait
        .timeout_ms
        .buffer
        .trim()
        .parse::<u64>()
        .ok()
        .filter(|v| *v > 0);
    match ctx.model.wait.pane {
        WaitPane::WaitTx => {
            let hash = ctx.model.wait.hash.buffer.trim().to_string();
            if hash.is_empty() {
                ctx.model
                    .set_error("transaction hash required | paste after put or /");
                return;
            }
            ctx.model.wait.waiting = true;
            ctx.model.pending = true;
            ctx.model.last_refresh = Some(std::time::Instant::now());
            ctx.model.set_status(format!("waiting on {hash} via SSE…"));
            ctx.model.clear_error();
            ctx.client
                .spawn_wait_transaction(events_url, hash, timeout_ms, ctx.rpc_tx.clone());
        }
        WaitPane::SseCollect => {
            let names = ctx.model.wait.selected_event_names();
            if names.is_empty() {
                ctx.model
                    .set_error("enable at least one event name (Space)");
                return;
            }
            let max_events = ctx
                .model
                .wait
                .max_events
                .buffer
                .trim()
                .parse::<usize>()
                .unwrap_or(10)
                .clamp(1, 100);
            let timeout = timeout_ms.unwrap_or(15_000);
            ctx.model.wait.waiting = true;
            ctx.model.pending = true;
            ctx.model.last_refresh = Some(std::time::Instant::now());
            ctx.model.set_status(format!(
                "SSE collect max={max_events} timeout_ms={timeout}…"
            ));
            ctx.model.clear_error();
            ctx.client.spawn_sse_collect(
                events_url,
                names,
                max_events,
                timeout,
                ctx.rpc_tx.clone(),
            );
        }
    }
}

fn request_write_build(ctx: &mut KeyCtx<'_>) {
    if !ctx.model.enable_writes {
        ctx.model
            .set_error("writes disabled | restart with --enable-writes");
        return;
    }
    if ctx.model.public_key.is_empty() {
        ctx.model
            .set_error("load a PEM first (o) | need initiator pubkey");
        return;
    }
    if !ctx.model.can_refresh() {
        ctx.model
            .set_status("still busy · let the previous spell land");
        return;
    }
    let job = match write_build_job(ctx.model) {
        Ok(j) => j,
        Err(err) => {
            ctx.model.set_error(err);
            return;
        }
    };
    ctx.model
        .begin_write_job("building unsigned transaction...");
    ctx.client.spawn_write_build(job, ctx.rpc_tx.clone());
}

fn write_build_job(model: &AppModel) -> Result<WriteBuildJob, String> {
    let amount = model.writes.amount.buffer.trim().to_string();
    let payment = model.writes.payment.buffer.trim().to_string();
    if amount.is_empty() || payment.is_empty() {
        return Err("amount and payment are required".into());
    }
    match model.writes.kind {
        WriteKind::Transfer => {
            let target = model.writes.target.buffer.trim().to_string();
            if target.is_empty() {
                return Err("target public key required".into());
            }
            Ok(WriteBuildJob {
                kind: WriteKind::Transfer,
                chain_name: model.chain_name.clone(),
                initiator: model.public_key.clone(),
                target,
                amount,
                payment,
                validator: String::new(),
                new_validator: String::new(),
            })
        }
        kind @ (WriteKind::Delegate | WriteKind::Undelegate | WriteKind::Redelegate) => {
            let validator = model.writes.validator.buffer.trim().to_string();
            if validator.is_empty() {
                return Err("validator public key required".into());
            }
            let new_validator = model.writes.new_validator.buffer.trim().to_string();
            if kind == WriteKind::Redelegate && new_validator.is_empty() {
                return Err("new_validator required for redelegate".into());
            }
            Ok(WriteBuildJob {
                kind,
                chain_name: model.chain_name.clone(),
                initiator: model.public_key.clone(),
                target: String::new(),
                amount,
                payment,
                validator,
                new_validator,
            })
        }
    }
}

fn request_write_sign(ctx: &mut KeyCtx<'_>) {
    let Some(pem) = ctx.model.secret_key_pem.clone() else {
        ctx.model
            .set_error("secret_key is missing | press o to load a PEM");
        return;
    };
    let Some(unsigned) = ctx.model.writes.unsigned.clone() else {
        ctx.model.set_error("build first (b) | no unsigned tx");
        return;
    };
    if !ctx.model.can_refresh() {
        ctx.model
            .set_status("still busy · let the previous spell land");
        return;
    }
    ctx.model.begin_write_job("signing transaction...");
    ctx.client
        .spawn_write_sign(unsigned, pem, ctx.rpc_tx.clone());
}

fn request_write_put(ctx: &mut KeyCtx<'_>) {
    let Some(signed) = ctx.model.writes.signed.clone() else {
        ctx.model.set_error("sign first (s) | no signed tx");
        return;
    };
    let op = ctx.model.writes.kind.op_name();
    if let Err(err) = check_write_policy(ctx.model, op) {
        ctx.model.set_error(err);
        return;
    }
    if !ctx.model.can_refresh() {
        ctx.model
            .set_status("still busy · let the previous spell land");
        return;
    }
    ctx.model.begin_write_job("putting transaction...");
    ctx.client.spawn_write_put(signed, ctx.rpc_tx.clone());
}

fn check_write_policy(model: &AppModel, op: &str) -> Result<(), String> {
    let amount = model.writes.amount.buffer.trim();
    match model.writes.kind {
        WriteKind::Transfer => {
            let target = model.writes.target.buffer.trim();
            model.policy.check_transfer(target, amount)
        }
        WriteKind::Delegate | WriteKind::Undelegate | WriteKind::Redelegate => {
            let validator = model.writes.validator.buffer.trim();
            model.policy.check_stake(op, validator, amount)
        }
    }
}

fn request_one_shot_transfer(ctx: &mut KeyCtx<'_>) {
    if ctx.model.writes.kind != WriteKind::Transfer {
        ctx.model
            .set_error("one-shot (t) is transfer-only | Tab to Transfer");
        return;
    }
    let Some(pem) = ctx.model.secret_key_pem.clone() else {
        ctx.model
            .set_error("secret_key is missing | press o to load a PEM");
        return;
    };
    let target = ctx.model.writes.target.buffer.trim().to_string();
    let amount = ctx.model.writes.amount.buffer.trim().to_string();
    let payment = ctx.model.writes.payment.buffer.trim().to_string();
    if target.is_empty() || amount.is_empty() || payment.is_empty() {
        ctx.model
            .set_error("fill target, amount, payment | Enter opens form");
        return;
    }
    if !ctx.model.can_refresh() {
        ctx.model
            .set_status("still busy · let the previous spell land");
        return;
    }
    ctx.model
        .begin_write_job("one-shot transfer (build+sign+put)...");
    ctx.client.spawn_one_shot_transfer(
        OneShotTransferOwned {
            chain_name: ctx.model.chain_name.clone(),
            pem,
            public_key: ctx.model.public_key.clone(),
            target,
            amount,
            payment,
            policy: ctx.model.policy.clone(),
        },
        ctx.rpc_tx.clone(),
    );
}

fn truncate_pk(pk: &str) -> String {
    if pk.len() > 16 {
        format!("{}..{}", &pk[..8], &pk[pk.len() - 4..])
    } else {
        pk.to_string()
    }
}

fn parse_view_name(name: &str) -> Option<ViewMode> {
    match name.trim().to_ascii_lowercase().as_str() {
        "network" | "net" | "1" => Some(ViewMode::Network),
        "blocks" | "2" => Some(ViewMode::Blocks),
        "transactions" | "txs" | "tx" | "3" => Some(ViewMode::Transactions),
        "accounts" | "4" => Some(ViewMode::Accounts),
        "validators" | "5" => Some(ViewMode::Validators),
        "contracts" | "6" => Some(ViewMode::Contracts),
        "actions" | "7" => Some(ViewMode::Actions),
        "writes" | "8" => Some(ViewMode::Writes),
        "wait" | "9" => Some(ViewMode::Wait),
        "help" | "h" => Some(ViewMode::Help),
        _ => None,
    }
}

fn resolve_path(cwd: &Path, path: &Path) -> PathBuf {
    let raw = path.to_string_lossy();
    if let Some(rest) = raw.strip_prefix("~/") {
        if let Some(home) = std::env::var_os("HOME") {
            return PathBuf::from(home).join(rest);
        }
    }
    if raw == "~" {
        if let Some(home) = std::env::var_os("HOME") {
            return PathBuf::from(home);
        }
    }
    if path.is_absolute() {
        path.to_path_buf()
    } else {
        cwd.join(path)
    }
}
