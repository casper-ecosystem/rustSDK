//! Network presets (RPC + SSE).

#[derive(Debug, Clone, Copy, PartialEq, Eq, serde::Serialize, serde::Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum Preset {
    Nctl,
    Testnet,
    Mainnet,
}

impl Preset {
    pub fn from_label(s: &str) -> Self {
        match s.trim().to_ascii_lowercase().as_str() {
            "testnet" => Self::Testnet,
            "mainnet" => Self::Mainnet,
            _ => Self::Nctl,
        }
    }

    pub fn rpc(self) -> &'static str {
        match self {
            Self::Nctl => "http://127.0.0.1:11101",
            Self::Testnet => "https://node.testnet.casper.network",
            Self::Mainnet => "https://node.mainnet.casper.network",
        }
    }

    pub fn events(self) -> &'static str {
        match self {
            Self::Nctl => "http://127.0.0.1:18101/events",
            Self::Testnet => "https://events.testnet.casper.network/events",
            Self::Mainnet => "https://events.mainnet.casper.network/events",
        }
    }

    pub fn chain_name(self) -> &'static str {
        match self {
            Self::Nctl => "casper-net-1",
            Self::Testnet => "casper-test",
            Self::Mainnet => "casper",
        }
    }
}
