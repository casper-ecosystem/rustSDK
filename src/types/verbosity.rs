use casper_client::Verbosity as _Verbosity;
use serde::{Deserialize, Deserializer, Serialize};
#[cfg(feature = "js")]
use wasm_bindgen::prelude::*;

#[derive(Debug, Serialize, Clone, Copy, PartialEq)]
#[cfg_attr(feature = "js", wasm_bindgen)]
pub enum Verbosity {
    Low = 0,
    Medium = 1,
    High = 2,
}

impl<'de> Deserialize<'de> for Verbosity {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'de>,
    {
        #[derive(Deserialize)]
        #[serde(untagged)]
        enum Value {
            IntValue(u64),
            StrValue(String),
        }

        let value: Value = Deserialize::deserialize(deserializer)?;

        match value {
            Value::IntValue(v) => match v {
                0 => Ok(Verbosity::Low),
                1 => Ok(Verbosity::Medium),
                2 => Ok(Verbosity::High),
                _ => Err(serde::de::Error::custom("Invalid verbosity value")),
            },
            Value::StrValue(s) => Ok(Verbosity::from(s.as_str())),
        }
    }
}

impl From<Verbosity> for u64 {
    fn from(verbosity: Verbosity) -> Self {
        match verbosity {
            Verbosity::Low => 0,
            Verbosity::Medium => 1,
            Verbosity::High => 2,
        }
    }
}

impl From<u64> for Verbosity {
    fn from(value: u64) -> Self {
        match value {
            0 => Verbosity::Low,
            1 => Verbosity::Medium,
            2 => Verbosity::High,
            _ => unreachable!("Invalid u64 value for Verbosity"),
        }
    }
}

impl From<&str> for Verbosity {
    fn from(s: &str) -> Self {
        match s.to_lowercase().as_str() {
            "low" => Verbosity::Low,
            "medium" => Verbosity::Medium,
            "high" => Verbosity::High,
            _ => unreachable!("Invalid verbosity string"),
        }
    }
}

impl From<String> for Verbosity {
    fn from(s: String) -> Self {
        s.as_str().into()
    }
}

impl From<Verbosity> for _Verbosity {
    fn from(verbosity: Verbosity) -> Self {
        match verbosity {
            Verbosity::Low => _Verbosity::Low,
            Verbosity::Medium => _Verbosity::Medium,
            Verbosity::High => _Verbosity::High,
        }
    }
}

impl From<_Verbosity> for Verbosity {
    fn from(verbosity: _Verbosity) -> Self {
        match verbosity {
            _Verbosity::Low => Verbosity::Low,
            _Verbosity::Medium => Verbosity::Medium,
            _Verbosity::High => Verbosity::High,
        }
    }
}
