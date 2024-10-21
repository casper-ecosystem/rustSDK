// use casper_types::TransactionCategory as _TransactionCategory;
// use core::fmt;
// use serde::{Deserialize, Deserializer, Serialize};
// use wasm_bindgen::prelude::*;

// #[derive(Copy, Clone, Ord, PartialOrd, Eq, PartialEq, Hash, Serialize, Debug, Default)]
// #[wasm_bindgen]
// #[repr(u8)]
// pub enum TransactionCategory {
//     Mint = 0,
//     Auction = 1,
//     #[default]
//     InstallUpgrade = 2,
//     Large = 3,
//     Medium = 4,
//     Small = 5,
// }

// impl TransactionCategory {
//     const MINT: &'static str = "Mint";
//     const AUCTION: &'static str = "Auction";
//     const INSTALL_UPGRADE: &'static str = "InstallUpgrade";
//     const LARGE: &'static str = "Large";
//     const MEDIUM: &'static str = "Medium";
//     const SMALL: &'static str = "Small";
// }

// impl<'de> Deserialize<'de> for TransactionCategory {
//     fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
//     where
//         D: Deserializer<'de>,
//     {
//         #[derive(Deserialize)]
//         #[serde(untagged)]
//         enum Value {
//             IntValue(u8),
//             StrValue(String),
//         }

//         let value: Value = Deserialize::deserialize(deserializer)?;

//         match value {
//             Value::IntValue(v) => match v {
//                 0 => Ok(TransactionCategory::Mint),
//                 1 => Ok(TransactionCategory::Auction),
//                 2 => Ok(TransactionCategory::InstallUpgrade),
//                 3 => Ok(TransactionCategory::Large),
//                 4 => Ok(TransactionCategory::Medium),
//                 5 => Ok(TransactionCategory::Small),
//                 _ => Err(serde::de::Error::custom(
//                     "Invalid transaction_category value",
//                 )),
//             },
//             Value::StrValue(s) => Ok(TransactionCategory::from(s.as_str())),
//         }
//     }
// }

// impl From<TransactionCategory> for u8 {
//     fn from(transaction_category: TransactionCategory) -> Self {
//         match transaction_category {
//             TransactionCategory::Mint => 0,
//             TransactionCategory::Auction => 1,
//             TransactionCategory::InstallUpgrade => 2,
//             TransactionCategory::Large => 3,
//             TransactionCategory::Medium => 4,
//             TransactionCategory::Small => 5,
//         }
//     }
// }

// impl From<u8> for TransactionCategory {
//     fn from(value: u8) -> Self {
//         match value {
//             0 => Self::Mint,
//             1 => Self::Auction,
//             2 => Self::InstallUpgrade,
//             3 => Self::Large,
//             4 => Self::Medium,
//             5 => Self::Small,
//             _ => unreachable!("Invalid u8 value for TransactionCategory"),
//         }
//     }
// }

// impl From<&str> for TransactionCategory {
//     fn from(s: &str) -> Self {
//         match s {
//             Self::MINT => Self::Mint,
//             Self::AUCTION => Self::Auction,
//             Self::INSTALL_UPGRADE => Self::InstallUpgrade,
//             Self::LARGE => Self::Large,
//             Self::MEDIUM => Self::Medium,
//             Self::SMALL => Self::Small,
//             _ => unreachable!("Invalid transaction_category string"),
//         }
//     }
// }

// impl From<String> for TransactionCategory {
//     fn from(s: String) -> Self {
//         s.as_str().into()
//     }
// }

// impl fmt::Display for TransactionCategory {
//     fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
//         match self {
//             TransactionCategory::Mint => write!(f, "{}", TransactionCategory::MINT),
//             TransactionCategory::Auction => write!(f, "{}", TransactionCategory::AUCTION),
//             TransactionCategory::InstallUpgrade => {
//                 write!(f, "{}", TransactionCategory::INSTALL_UPGRADE)
//             }
//             TransactionCategory::Large => write!(f, "{}", TransactionCategory::LARGE),
//             TransactionCategory::Medium => write!(f, "{}", TransactionCategory::MEDIUM),
//             TransactionCategory::Small => write!(f, "{}", TransactionCategory::SMALL),
//         }
//     }
// }

// impl From<TransactionCategory> for _TransactionCategory {
//     fn from(transaction_category: TransactionCategory) -> Self {
//         match transaction_category {
//             TransactionCategory::Mint => _TransactionCategory::Mint,
//             TransactionCategory::Auction => _TransactionCategory::Auction,
//             TransactionCategory::InstallUpgrade => _TransactionCategory::InstallUpgrade,
//             TransactionCategory::Large => _TransactionCategory::Large,
//             TransactionCategory::Medium => _TransactionCategory::Medium,
//             TransactionCategory::Small => _TransactionCategory::Small,
//         }
//     }
// }

// impl From<_TransactionCategory> for TransactionCategory {
//     fn from(transaction_category: _TransactionCategory) -> Self {
//         match transaction_category {
//             _TransactionCategory::Mint => TransactionCategory::Mint,
//             _TransactionCategory::Auction => TransactionCategory::Auction,
//             _TransactionCategory::InstallUpgrade => TransactionCategory::InstallUpgrade,
//             _TransactionCategory::Large => TransactionCategory::Large,
//             _TransactionCategory::Medium => TransactionCategory::Medium,
//             _TransactionCategory::Small => TransactionCategory::Small,
//         }
//     }
// }
