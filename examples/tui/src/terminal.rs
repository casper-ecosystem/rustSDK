//! Raw-mode + alternate-screen guard with panic and signal restore.

use anyhow::{Context, Result};
use crossterm::execute;
use crossterm::terminal::{
    disable_raw_mode, enable_raw_mode, EnterAlternateScreen, LeaveAlternateScreen,
};
use ratatui::backend::CrosstermBackend;
use ratatui::Terminal;
use std::io::{self, Stdout};
use std::panic;
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::Arc;

/// Shared stop flag: Ctrl-C / SIGTERM or `q` / Esc.
pub type StopFlag = Arc<AtomicBool>;

/// Owns terminal modes; Drop always restores the shell.
///
/// Mouse capture is intentionally **off** so the terminal can select/copy text.
pub struct TerminalGuard {
    terminal: Terminal<CrosstermBackend<Stdout>>,
    use_alt_screen: bool,
    restored: bool,
}

impl TerminalGuard {
    /// Enter raw mode (and alternate screen unless `STY` is set).
    pub fn enter(stop: StopFlag) -> Result<Self> {
        // Screen/tmux: keep the scrollback instead of flipping buffers.
        let use_alt_screen = std::env::var_os("STY").is_none();

        enable_raw_mode().context("enable raw mode")?;
        let mut stdout = io::stdout();
        if use_alt_screen {
            execute!(stdout, EnterAlternateScreen).context("enter alternate screen")?;
        }

        let backend = CrosstermBackend::new(stdout);
        let terminal = Terminal::new(backend).context("create ratatui terminal")?;

        install_panic_hook(use_alt_screen);
        install_signal_handlers(stop)?;

        Ok(Self {
            terminal,
            use_alt_screen,
            restored: false,
        })
    }

    pub fn terminal_mut(&mut self) -> &mut Terminal<CrosstermBackend<Stdout>> {
        &mut self.terminal
    }

    /// Explicit restore (also runs on Drop).
    pub fn restore(&mut self) -> Result<()> {
        if self.restored {
            return Ok(());
        }
        restore_terminal(self.use_alt_screen)?;
        self.restored = true;
        Ok(())
    }
}

impl Drop for TerminalGuard {
    fn drop(&mut self) {
        let _ = self.restore();
    }
}

fn restore_terminal(use_alt_screen: bool) -> Result<()> {
    let mut stdout = io::stdout();
    if use_alt_screen {
        let _ = execute!(stdout, LeaveAlternateScreen);
    }
    disable_raw_mode().context("disable raw mode")?;
    Ok(())
}

fn install_panic_hook(use_alt_screen: bool) {
    let previous = panic::take_hook();
    panic::set_hook(Box::new(move |info| {
        let _ = restore_terminal(use_alt_screen);
        previous(info);
    }));
}

fn install_signal_handlers(stop: StopFlag) -> Result<()> {
    ctrlc::set_handler(move || {
        stop.store(true, Ordering::SeqCst);
    })
    .context("install Ctrl-C / SIGTERM handler")?;
    Ok(())
}
