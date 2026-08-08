//! Command palette: history, tab completion (commands + paths).

use std::fs;
use std::path::{Path, PathBuf};

const HISTORY_CAP: usize = 128;

/// Known slash-commands (name + short help).
pub struct CommandSpec {
    pub name: &'static str,
    pub help: &'static str,
    pub takes_path: bool,
}

pub const COMMANDS: &[CommandSpec] = &[
    CommandSpec {
        name: "help",
        help: "open Help view",
        takes_path: false,
    },
    CommandSpec {
        name: "refresh",
        help: "Network séance (5 RPCs in parallel)",
        takes_path: false,
    },
    CommandSpec {
        name: "network",
        help: "jump to Network",
        takes_path: false,
    },
    CommandSpec {
        name: "actions",
        help: "jump to Actions spellbook",
        takes_path: false,
    },
    CommandSpec {
        name: "rpc",
        help: "edit RPC URL (same as key e)",
        takes_path: false,
    },
    CommandSpec {
        name: "clear",
        help: "clear error footer",
        takes_path: false,
    },
    CommandSpec {
        name: "quit",
        help: "exit and restore terminal",
        takes_path: false,
    },
    CommandSpec {
        name: "exit",
        help: "alias for quit",
        takes_path: false,
    },
    CommandSpec {
        name: "status",
        help: "alias for refresh",
        takes_path: false,
    },
    CommandSpec {
        name: "goto",
        help: "goto <view>  (network|help|…)",
        takes_path: false,
    },
    CommandSpec {
        name: "cd",
        help: "cd <path>  (tab-complete paths; remembers cwd for next tabs)",
        takes_path: true,
    },
    CommandSpec {
        name: "ls",
        help: "ls [path]  list directory (path completion demo)",
        takes_path: true,
    },
];

#[derive(Debug, Clone)]
pub enum ParsedCommand {
    Help,
    Refresh,
    Clear,
    Quit,
    Goto(String),
    EditRpc,
    Cd(PathBuf),
    Ls(Option<PathBuf>),
    Unknown(String),
}

/// Line editor state for `:` mode.
pub struct CommandPalette {
    pub buffer: String,
    pub cursor: usize,
    history: Vec<String>,
    history_idx: Option<usize>,
    /// Scratch while browsing history so Escape can restore.
    draft: String,
    pub completions: Vec<String>,
    pub completion_idx: Option<usize>,
    pub cwd: PathBuf,
    pub last_message: Option<String>,
}

impl CommandPalette {
    pub fn new() -> Self {
        Self {
            buffer: String::new(),
            cursor: 0,
            history: Vec::new(),
            history_idx: None,
            draft: String::new(),
            completions: Vec::new(),
            completion_idx: None,
            cwd: std::env::current_dir().unwrap_or_else(|_| PathBuf::from(".")),
            last_message: None,
        }
    }

    pub fn open(&mut self) {
        self.buffer.clear();
        self.cursor = 0;
        self.history_idx = None;
        self.draft.clear();
        self.clear_completions();
        self.last_message = None;
    }

    pub fn close(&mut self) {
        self.buffer.clear();
        self.cursor = 0;
        self.history_idx = None;
        self.clear_completions();
    }

    pub fn clear_completions(&mut self) {
        self.completions.clear();
        self.completion_idx = None;
    }

    pub fn insert(&mut self, c: char) {
        self.clear_completions();
        self.history_idx = None;
        self.buffer.insert(self.cursor, c);
        self.cursor += c.len_utf8();
    }

    pub fn backspace(&mut self) {
        self.clear_completions();
        if self.cursor == 0 {
            return;
        }
        let prev = self.buffer[..self.cursor]
            .chars()
            .next_back()
            .map(|c| c.len_utf8())
            .unwrap_or(0);
        let start = self.cursor - prev;
        self.buffer.drain(start..self.cursor);
        self.cursor = start;
    }

    pub fn move_left(&mut self) {
        if self.cursor == 0 {
            return;
        }
        let prev = self.buffer[..self.cursor]
            .chars()
            .next_back()
            .map(|c| c.len_utf8())
            .unwrap_or(0);
        self.cursor -= prev;
    }

    pub fn move_right(&mut self) {
        if self.cursor >= self.buffer.len() {
            return;
        }
        let next = self.buffer[self.cursor..]
            .chars()
            .next()
            .map(|c| c.len_utf8())
            .unwrap_or(0);
        self.cursor += next;
    }

    pub fn history_up(&mut self) {
        if self.history.is_empty() {
            return;
        }
        match self.history_idx {
            None => {
                self.draft = self.buffer.clone();
                let idx = self.history.len() - 1;
                self.history_idx = Some(idx);
                self.set_buffer(self.history[idx].clone());
            }
            Some(0) => {}
            Some(i) => {
                let idx = i - 1;
                self.history_idx = Some(idx);
                self.set_buffer(self.history[idx].clone());
            }
        }
        self.clear_completions();
    }

    pub fn history_down(&mut self) {
        let Some(i) = self.history_idx else {
            return;
        };
        if i + 1 >= self.history.len() {
            self.history_idx = None;
            self.set_buffer(self.draft.clone());
        } else {
            let idx = i + 1;
            self.history_idx = Some(idx);
            self.set_buffer(self.history[idx].clone());
        }
        self.clear_completions();
    }

    fn set_buffer(&mut self, s: String) {
        self.cursor = s.len();
        self.buffer = s;
    }

    pub fn push_history(&mut self, line: String) {
        let line = line.trim().to_string();
        if line.is_empty() {
            return;
        }
        if self.history.last().map(|s| s == &line).unwrap_or(false) {
            return;
        }
        self.history.push(line);
        if self.history.len() > HISTORY_CAP {
            self.history.remove(0);
        }
    }

    /// Tab: cycle completions, or compute a fresh list.
    pub fn tab_complete(&mut self) {
        if self.completions.is_empty() {
            self.completions = compute_completions(&self.buffer, &self.cwd);
            self.completion_idx = None;
            if self.completions.is_empty() {
                self.last_message = Some("no completions (try help, refresh, or a path)".into());
                return;
            }
        }
        let next = match self.completion_idx {
            None => 0,
            Some(i) => (i + 1) % self.completions.len(),
        };
        self.completion_idx = Some(next);
        let chosen = self.completions[next].clone();
        self.set_buffer(chosen);
        self.last_message = Some(format!(
            "completion {}/{}",
            next + 1,
            self.completions.len()
        ));
    }

    pub fn parse_and_take(&mut self) -> Option<ParsedCommand> {
        let raw = self.buffer.trim().to_string();
        if raw.is_empty() {
            return None;
        }
        self.push_history(raw.clone());
        Some(parse_command(&raw))
    }
}

impl Default for CommandPalette {
    fn default() -> Self {
        Self::new()
    }
}

pub fn parse_command(raw: &str) -> ParsedCommand {
    let mut parts = raw.split_whitespace();
    let head = parts.next().unwrap_or("").to_ascii_lowercase();
    let rest: Vec<&str> = parts.collect();
    match head.as_str() {
        "help" | "h" | "?" => ParsedCommand::Help,
        "refresh" | "r" | "status" => ParsedCommand::Refresh,
        "clear" => ParsedCommand::Clear,
        "quit" | "exit" | "q" => ParsedCommand::Quit,
        "network" => ParsedCommand::Goto("network".into()),
        "actions" => ParsedCommand::Goto("actions".into()),
        "rpc" | "endpoint" => ParsedCommand::EditRpc,
        "goto" | "view" => {
            let target = rest.first().copied().unwrap_or("network").to_string();
            ParsedCommand::Goto(target)
        }
        "cd" => {
            let path = rest
                .first()
                .map(PathBuf::from)
                .unwrap_or_else(|| PathBuf::from("."));
            ParsedCommand::Cd(path)
        }
        "ls" => {
            let path = rest.first().map(PathBuf::from);
            ParsedCommand::Ls(path)
        }
        other => ParsedCommand::Unknown(other.to_string()),
    }
}

fn compute_completions(buffer: &str, cwd: &Path) -> Vec<String> {
    let trimmed = buffer.trim_start();
    if trimmed.is_empty() {
        return COMMANDS.iter().map(|c| c.name.to_string()).collect();
    }

    let mut parts = trimmed.split_whitespace();
    let first = parts.next().unwrap_or("");
    let rest: Vec<&str> = parts.collect();

    // Completing the command verb.
    if rest.is_empty() && !trimmed.ends_with(char::is_whitespace) {
        let lower = first.to_ascii_lowercase();
        let out: Vec<String> = COMMANDS
            .iter()
            .filter(|c| c.name.starts_with(&lower))
            .map(|c| c.name.to_string())
            .collect();
        // Also complete view names after partial "goto ".
        if lower == "goto" || lower == "view" {
            // wait for space
        }
        if out.len() == 1 && out[0] == first {
            // Exact match: offer trailing space + path if needed.
            if let Some(spec) = COMMANDS.iter().find(|c| c.name == out[0]) {
                if spec.takes_path {
                    return path_completions("", cwd)
                        .into_iter()
                        .map(|p| format!("{} {p}", spec.name))
                        .collect();
                }
            }
        }
        // goto <view>
        if COMMANDS.iter().any(|c| c.name == lower) {
            return out;
        }
        return out;
    }

    let cmd = first.to_ascii_lowercase();
    if cmd == "goto" || cmd == "view" {
        let partial = rest.first().copied().unwrap_or("").to_ascii_lowercase();
        let views = [
            "network",
            "blocks",
            "transactions",
            "accounts",
            "validators",
            "contracts",
            "actions",
            "writes",
            "wait",
            "help",
        ];
        return views
            .iter()
            .filter(|v| v.starts_with(&partial))
            .map(|v| format!("{cmd} {v}"))
            .collect();
    }

    if let Some(spec) = COMMANDS.iter().find(|c| c.name == cmd) {
        if spec.takes_path {
            let partial = rest.first().copied().unwrap_or("");
            return path_completions(partial, cwd)
                .into_iter()
                .map(|p| format!("{cmd} {p}"))
                .collect();
        }
    }

    Vec::new()
}

fn path_completions(partial: &str, cwd: &Path) -> Vec<String> {
    let expanded = expand_tilde(partial);
    let path = PathBuf::from(&expanded);
    let (dir, file_prefix) = if expanded.is_empty() {
        (cwd.to_path_buf(), String::new())
    } else if expanded.ends_with('/') {
        (cwd.join(&path), String::new())
    } else {
        let parent = path
            .parent()
            .map(|p| cwd.join(p))
            .unwrap_or_else(|| cwd.to_path_buf());
        let name = path
            .file_name()
            .map(|s| s.to_string_lossy().into_owned())
            .unwrap_or_default();
        (parent, name)
    };

    let dir = if dir.as_os_str().is_empty() {
        cwd.to_path_buf()
    } else {
        dir
    };

    let Ok(entries) = fs::read_dir(&dir) else {
        return Vec::new();
    };

    let mut names: Vec<String> = entries
        .filter_map(|e| e.ok())
        .filter(|e| e.file_name().to_string_lossy().starts_with(&file_prefix))
        .map(|e| {
            let name = e.file_name().to_string_lossy().into_owned();
            let is_dir = e.file_type().map(|t| t.is_dir()).unwrap_or(false);
            let base = if expanded.ends_with('/') {
                format!("{expanded}{name}")
            } else if let Some(parent) = Path::new(partial).parent() {
                let parent = parent.to_string_lossy();
                if parent.is_empty() || parent == "." {
                    name.clone()
                } else {
                    format!("{parent}/{name}")
                }
            } else {
                name.clone()
            };
            if is_dir && !base.ends_with('/') {
                format!("{base}/")
            } else {
                base
            }
        })
        .collect();
    names.sort();
    names.truncate(64);
    names
}

fn expand_tilde(path: &str) -> String {
    if let Some(rest) = path.strip_prefix("~/") {
        if let Some(home) = std::env::var_os("HOME") {
            return PathBuf::from(home)
                .join(rest)
                .to_string_lossy()
                .into_owned();
        }
    }
    if path == "~" {
        if let Some(home) = std::env::var_os("HOME") {
            return PathBuf::from(home).to_string_lossy().into_owned();
        }
    }
    path.to_string()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parses_refresh_aliases() {
        assert!(matches!(parse_command("r"), ParsedCommand::Refresh));
        assert!(matches!(parse_command("status"), ParsedCommand::Refresh));
    }

    #[test]
    fn tab_lists_commands() {
        let cwd = PathBuf::from(".");
        let list = compute_completions("", &cwd);
        assert!(list.iter().any(|s| s == "refresh"));
        assert!(list.iter().any(|s| s == "help"));
    }
}
