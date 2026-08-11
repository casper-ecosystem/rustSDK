//! Static Actions catalog (RPC + helpers + write-gated CEP groups).

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum ActionGroup {
    Rpc,
    Helpers,
    #[cfg(feature = "ceps")]
    Cep18,
    #[cfg(feature = "ceps")]
    Cep78,
    #[cfg(feature = "ceps")]
    Cep85,
    #[cfg(feature = "ceps")]
    Cep95,
    #[cfg(feature = "ceps")]
    Ces,
    #[cfg(feature = "ceps")]
    CepsShared,
}

impl ActionGroup {
    pub fn label(self) -> &'static str {
        match self {
            Self::Rpc => "rpc",
            Self::Helpers => "helpers",
            #[cfg(feature = "ceps")]
            Self::Cep18 => "cep18",
            #[cfg(feature = "ceps")]
            Self::Cep78 => "cep78",
            #[cfg(feature = "ceps")]
            Self::Cep85 => "cep85",
            #[cfg(feature = "ceps")]
            Self::Cep95 => "cep95",
            #[cfg(feature = "ceps")]
            Self::Ces => "ces",
            #[cfg(feature = "ceps")]
            Self::CepsShared => "shared",
        }
    }
}

#[cfg(feature = "ceps")]
pub const CEPS_GROUP_CYCLE: &[ActionGroup] = &[
    ActionGroup::Cep18,
    ActionGroup::Cep78,
    ActionGroup::Cep85,
    ActionGroup::Cep95,
    ActionGroup::Ces,
    ActionGroup::CepsShared,
    ActionGroup::Rpc,
    ActionGroup::Helpers,
];

#[derive(Debug, Clone, Copy)]
pub struct ArgSpec {
    pub name: &'static str,
    pub hint: &'static str,
    pub required: bool,
}

#[derive(Debug, Clone, Copy)]
pub struct ActionSpec {
    pub id: &'static str,
    pub group: ActionGroup,
    pub blurb: &'static str,
    pub args: &'static [ArgSpec],
    pub requires_writes: bool,
    pub requires_pem: bool,
}

const fn action(
    id: &'static str,
    group: ActionGroup,
    blurb: &'static str,
    args: &'static [ArgSpec],
) -> ActionSpec {
    ActionSpec {
        id,
        group,
        blurb,
        args,
        requires_writes: false,
        requires_pem: false,
    }
}

const fn write_action(
    id: &'static str,
    blurb: &'static str,
    args: &'static [ArgSpec],
    requires_pem: bool,
) -> ActionSpec {
    ActionSpec {
        id,
        group: ActionGroup::Rpc,
        blurb,
        args,
        requires_writes: true,
        requires_pem,
    }
}

#[cfg(feature = "ceps")]
const fn ceps_action(
    id: &'static str,
    group: ActionGroup,
    blurb: &'static str,
    args: &'static [ArgSpec],
) -> ActionSpec {
    ActionSpec {
        id,
        group,
        blurb,
        args,
        requires_writes: false,
        requires_pem: false,
    }
}

#[cfg(feature = "ceps")]
const fn ceps_write_action(
    id: &'static str,
    group: ActionGroup,
    blurb: &'static str,
    args: &'static [ArgSpec],
) -> ActionSpec {
    ActionSpec {
        id,
        group,
        blurb,
        args,
        requires_writes: true,
        requires_pem: true,
    }
}

pub const ACTIONS: &[ActionSpec] = &[
    action(
        "get_node_status",
        ActionGroup::Rpc,
        "ask the ghost how the house is doing",
        &[],
    ),
    action(
        "get_peers",
        ActionGroup::Rpc,
        "who else is rattling chains nearby",
        &[],
    ),
    action(
        "get_chainspec",
        ActionGroup::Rpc,
        "the house rules (raw bytes gossip)",
        &[],
    ),
    action(
        "list_rpcs",
        ActionGroup::Rpc,
        "menu of spells the node admits to",
        &[],
    ),
    action(
        "get_block",
        ActionGroup::Rpc,
        "fetch a brick by height or hash",
        &[ArgSpec {
            name: "block_identifier",
            hint: "height or hash (empty = latest)",
            required: false,
        }],
    ),
    action(
        "get_era_summary",
        ActionGroup::Rpc,
        "era gossip for a block",
        &[ArgSpec {
            name: "block_identifier",
            hint: "height or hash (empty = latest)",
            required: false,
        }],
    ),
    action(
        "get_auction_info",
        ActionGroup::Rpc,
        "validators flexing their stake",
        &[ArgSpec {
            name: "block_identifier",
            hint: "height or hash (empty = latest)",
            required: false,
        }],
    ),
    action(
        "get_entity",
        ActionGroup::Rpc,
        "look up an addressable entity / account",
        &[ArgSpec {
            name: "entity_identifier",
            hint: "public key / account-hash / entity-…",
            required: true,
        }],
    ),
    action(
        "query_balance",
        ActionGroup::Rpc,
        "how many motes haunt this purse",
        &[ArgSpec {
            name: "purse_identifier",
            hint: "uref-… / public key / account-hash-…",
            required: true,
        }],
    ),
    action(
        "get_transaction",
        ActionGroup::Rpc,
        "track a signed intent by hash",
        &[ArgSpec {
            name: "transaction_hash",
            hint: "64-byte hex hash",
            required: true,
        }],
    ),
    action(
        "query_global_state",
        ActionGroup::Rpc,
        "peek a key in the global attic",
        &[
            ArgSpec {
                name: "key",
                hint: "hash-… / account-hash-… / uref-… / system-entity-registry-…",
                required: true,
            },
            ArgSpec {
                name: "path",
                hint: "optional path from key (e.g. era_id)",
                required: false,
            },
        ],
    ),
    action(
        "query_contract_key",
        ActionGroup::Rpc,
        "named key under a contract hash/entity",
        &[
            ArgSpec {
                name: "entity_identifier",
                hint: "hash-… / entity-contract-…",
                required: true,
            },
            ArgSpec {
                name: "path",
                hint: "named key path (required)",
                required: true,
            },
        ],
    ),
    action(
        "query_contract_dict",
        ActionGroup::Rpc,
        "dictionary item via uref seed",
        &[
            ArgSpec {
                name: "seed_uref",
                hint: "uref-… seed",
                required: true,
            },
            ArgSpec {
                name: "dictionary_item_key",
                hint: "item key string",
                required: true,
            },
            ArgSpec {
                name: "state_root_hash",
                hint: "optional state root hex",
                required: false,
            },
        ],
    ),
    write_action(
        "make_transfer_transaction",
        "build unsigned transfer (session pubkey as initiator)",
        &[
            ArgSpec {
                name: "target",
                hint: "recipient public key",
                required: true,
            },
            ArgSpec {
                name: "amount",
                hint: "motes (default 2500000000)",
                required: false,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "gas payment motes",
                required: false,
            },
            ArgSpec {
                name: "chain_name",
                hint: "override chain name",
                required: false,
            },
        ],
        false,
    ),
    write_action(
        "make_transaction",
        "build unsigned stake tx (delegate/undelegate/redelegate)",
        &[
            ArgSpec {
                name: "kind",
                hint: "delegate | undelegate | redelegate",
                required: true,
            },
            ArgSpec {
                name: "validator",
                hint: "validator public key",
                required: true,
            },
            ArgSpec {
                name: "amount",
                hint: "motes",
                required: true,
            },
            ArgSpec {
                name: "new_validator",
                hint: "required for redelegate",
                required: false,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "gas payment motes",
                required: false,
            },
            ArgSpec {
                name: "chain_name",
                hint: "override chain name",
                required: false,
            },
        ],
        false,
    ),
    write_action(
        "sign_transaction",
        "sign a transaction JSON with the loaded PEM",
        &[ArgSpec {
            name: "transaction_json",
            hint: "unsigned transaction JSON string",
            required: true,
        }],
        true,
    ),
    write_action(
        "put_transaction",
        "put a signed transaction (policy checked)",
        &[ArgSpec {
            name: "transaction_json",
            hint: "signed transaction JSON string",
            required: true,
        }],
        true,
    ),
    write_action(
        "transfer_transaction",
        "one-shot build+sign+put transfer",
        &[
            ArgSpec {
                name: "target",
                hint: "recipient public key",
                required: true,
            },
            ArgSpec {
                name: "amount",
                hint: "motes",
                required: true,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "gas payment motes",
                required: false,
            },
            ArgSpec {
                name: "chain_name",
                hint: "override chain name",
                required: false,
            },
        ],
        true,
    ),
    write_action(
        "install",
        "install wasm (Contracts Writes UI; needs PEM)",
        &[ArgSpec {
            name: "note",
            hint: "use Contracts view Writes section once wired",
            required: false,
        }],
        true,
    ),
    write_action(
        "call_entrypoint",
        "call entry point (Contracts Writes UI; needs PEM)",
        &[ArgSpec {
            name: "note",
            hint: "use Contracts view Writes section once wired",
            required: false,
        }],
        true,
    ),
    action(
        "motes_to_cspr",
        ActionGroup::Helpers,
        "motes → CSPR (desk calculator for ghosts)",
        &[ArgSpec {
            name: "motes",
            hint: "integer string, e.g. 2500000000",
            required: true,
        }],
    ),
    action(
        "get_blake2b_hash",
        ActionGroup::Helpers,
        "blake2b digest of a string",
        &[ArgSpec {
            name: "meta_data",
            hint: "any utf-8 text",
            required: true,
        }],
    ),
    action(
        "get_current_timestamp",
        ActionGroup::Helpers,
        "now, or parse a timestamp string",
        &[ArgSpec {
            name: "timestamp",
            hint: "empty = now; or RFC3339-ish",
            required: false,
        }],
    ),
];

#[cfg(feature = "ceps")]
pub const CEPS_ACTIONS: &[ActionSpec] = &[
    ceps_action(
        "cep18_info",
        ActionGroup::Cep18,
        "CEP-18 client endpoints",
        &[],
    ),
    ceps_action(
        "cep18_name",
        ActionGroup::Cep18,
        "token name",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
        ],
    ),
    ceps_action(
        "cep18_symbol",
        ActionGroup::Cep18,
        "token symbol",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
        ],
    ),
    ceps_action(
        "cep18_decimals",
        ActionGroup::Cep18,
        "decimals",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
        ],
    ),
    ceps_action(
        "cep18_total_supply",
        ActionGroup::Cep18,
        "total supply",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
        ],
    ),
    ceps_action(
        "cep18_events_mode",
        ActionGroup::Cep18,
        "events mode",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
        ],
    ),
    ceps_action(
        "cep18_is_mint_and_burn_enabled",
        ActionGroup::Cep18,
        "mint/burn flag",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
        ],
    ),
    ceps_action(
        "cep18_balance_of",
        ActionGroup::Cep18,
        "balance_of(account)",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "account",
                hint: "key",
                required: true,
            },
        ],
    ),
    ceps_action(
        "cep18_allowances",
        ActionGroup::Cep18,
        "allowances(owner,spender)",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "owner",
                hint: "key",
                required: true,
            },
            ArgSpec {
                name: "spender",
                hint: "key",
                required: true,
            },
        ],
    ),
    ceps_action(
        "cep18_security_badge",
        ActionGroup::Cep18,
        "security badge",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "account",
                hint: "key",
                required: true,
            },
        ],
    ),
    ceps_action(
        "cep18_get_account_named_key",
        ActionGroup::Cep18,
        "account named key",
        &[
            ArgSpec {
                name: "account",
                hint: "pk",
                required: true,
            },
            ArgSpec {
                name: "named_key",
                hint: "name",
                required: true,
            },
        ],
    ),
    ceps_write_action(
        "cep18_install",
        ActionGroup::Cep18,
        "install CEP-18",
        &[
            ArgSpec {
                name: "wasm",
                hint: "alias cep18 or path under CEPS_WASM_ROOT",
                required: true,
            },
            ArgSpec {
                name: "name",
                hint: "token",
                required: true,
            },
            ArgSpec {
                name: "symbol",
                hint: "sym",
                required: false,
            },
            ArgSpec {
                name: "decimals",
                hint: "9",
                required: false,
            },
            ArgSpec {
                name: "total_supply",
                hint: "1000",
                required: false,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_write_action(
        "cep18_upgrade",
        ActionGroup::Cep18,
        "upgrade CEP-18",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "wasm",
                hint: "alias cep18 or path under CEPS_WASM_ROOT",
                required: true,
            },
            ArgSpec {
                name: "name",
                hint: "token",
                required: true,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_write_action(
        "cep18_transfer",
        ActionGroup::Cep18,
        "transfer",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "recipient",
                hint: "key",
                required: true,
            },
            ArgSpec {
                name: "amount",
                hint: "motes",
                required: true,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_write_action(
        "cep18_transfer_from",
        ActionGroup::Cep18,
        "transfer_from",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "owner",
                hint: "key",
                required: true,
            },
            ArgSpec {
                name: "recipient",
                hint: "key",
                required: true,
            },
            ArgSpec {
                name: "amount",
                hint: "motes",
                required: true,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_write_action(
        "cep18_approve",
        ActionGroup::Cep18,
        "approve",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "spender",
                hint: "key",
                required: true,
            },
            ArgSpec {
                name: "amount",
                hint: "motes",
                required: true,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_write_action(
        "cep18_increase_allowance",
        ActionGroup::Cep18,
        "increase_allowance",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "spender",
                hint: "key",
                required: true,
            },
            ArgSpec {
                name: "amount",
                hint: "motes",
                required: true,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_write_action(
        "cep18_decrease_allowance",
        ActionGroup::Cep18,
        "decrease_allowance",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "spender",
                hint: "key",
                required: true,
            },
            ArgSpec {
                name: "amount",
                hint: "motes",
                required: true,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_write_action(
        "cep18_mint",
        ActionGroup::Cep18,
        "mint",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "owner",
                hint: "key",
                required: true,
            },
            ArgSpec {
                name: "amount",
                hint: "motes",
                required: true,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_write_action(
        "cep18_burn",
        ActionGroup::Cep18,
        "burn",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "owner",
                hint: "key",
                required: true,
            },
            ArgSpec {
                name: "amount",
                hint: "motes",
                required: true,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_write_action(
        "cep18_change_security",
        ActionGroup::Cep18,
        "change_security",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "admin_list",
                hint: "csv keys",
                required: false,
            },
            ArgSpec {
                name: "minter_list",
                hint: "csv keys",
                required: false,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_write_action(
        "cep18_change_events_mode",
        ActionGroup::Cep18,
        "change_events_mode",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "events_mode",
                hint: "0|1|2 ces",
                required: true,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_action("cep78_info", ActionGroup::Cep78, "CEP-78 endpoints", &[]),
    ceps_action(
        "cep78_collection_name",
        ActionGroup::Cep78,
        "collection_name",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
        ],
    ),
    ceps_action(
        "cep78_collection_symbol",
        ActionGroup::Cep78,
        "collection_symbol",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
        ],
    ),
    ceps_action(
        "cep78_total_token_supply",
        ActionGroup::Cep78,
        "total_token_supply",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
        ],
    ),
    ceps_action(
        "cep78_number_of_minted_tokens",
        ActionGroup::Cep78,
        "minted count",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
        ],
    ),
    ceps_action(
        "cep78_events_mode",
        ActionGroup::Cep78,
        "events_mode",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
        ],
    ),
    ceps_action(
        "cep78_allow_minting",
        ActionGroup::Cep78,
        "allow_minting",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
        ],
    ),
    ceps_action(
        "cep78_minting_mode",
        ActionGroup::Cep78,
        "minting_mode",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
        ],
    ),
    ceps_action(
        "cep78_whitelist_mode",
        ActionGroup::Cep78,
        "whitelist_mode",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
        ],
    ),
    ceps_action(
        "cep78_reporting_mode",
        ActionGroup::Cep78,
        "reporting_mode",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
        ],
    ),
    ceps_action(
        "cep78_burn_mode",
        ActionGroup::Cep78,
        "burn_mode",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
        ],
    ),
    ceps_action(
        "cep78_operator_burn_mode",
        ActionGroup::Cep78,
        "operator_burn_mode",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
        ],
    ),
    ceps_action(
        "cep78_holder_mode",
        ActionGroup::Cep78,
        "holder_mode",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
        ],
    ),
    ceps_action(
        "cep78_identifier_mode",
        ActionGroup::Cep78,
        "identifier_mode",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
        ],
    ),
    ceps_action(
        "cep78_metadata_mutability",
        ActionGroup::Cep78,
        "metadata_mutability",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
        ],
    ),
    ceps_action(
        "cep78_nft_kind",
        ActionGroup::Cep78,
        "nft_kind",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
        ],
    ),
    ceps_action(
        "cep78_nft_metadata_kind",
        ActionGroup::Cep78,
        "nft_metadata_kind",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
        ],
    ),
    ceps_action(
        "cep78_ownership_mode",
        ActionGroup::Cep78,
        "ownership_mode",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
        ],
    ),
    ceps_action(
        "cep78_package_operator_mode",
        ActionGroup::Cep78,
        "package_operator_mode",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
        ],
    ),
    ceps_action(
        "cep78_acl_package_mode",
        ActionGroup::Cep78,
        "acl_package_mode",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
        ],
    ),
    ceps_action(
        "cep78_json_schema",
        ActionGroup::Cep78,
        "json_schema",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
        ],
    ),
    ceps_action(
        "cep78_is_acl_whitelisted",
        ActionGroup::Cep78,
        "is_acl_whitelisted",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "account",
                hint: "key",
                required: true,
            },
        ],
    ),
    ceps_action(
        "cep78_owner_of",
        ActionGroup::Cep78,
        "owner_of",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "token_id",
                hint: "id",
                required: false,
            },
            ArgSpec {
                name: "token_hash",
                hint: "hash",
                required: false,
            },
        ],
    ),
    ceps_action(
        "cep78_balance_of",
        ActionGroup::Cep78,
        "balance_of",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "account",
                hint: "key",
                required: true,
            },
        ],
    ),
    ceps_action(
        "cep78_get_approved",
        ActionGroup::Cep78,
        "get_approved",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "token_id",
                hint: "id",
                required: false,
            },
            ArgSpec {
                name: "token_hash",
                hint: "hash",
                required: false,
            },
        ],
    ),
    ceps_action(
        "cep78_is_approved_for_all",
        ActionGroup::Cep78,
        "is_approved_for_all",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "owner",
                hint: "key",
                required: true,
            },
            ArgSpec {
                name: "operator",
                hint: "key",
                required: true,
            },
        ],
    ),
    ceps_action(
        "cep78_metadata",
        ActionGroup::Cep78,
        "metadata",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "token_id",
                hint: "id",
                required: false,
            },
            ArgSpec {
                name: "token_hash",
                hint: "hash",
                required: false,
            },
            ArgSpec {
                name: "nft_metadata_kind",
                hint: "cep78|nft721|raw|custom or u8",
                required: false,
            },
        ],
    ),
    ceps_action(
        "cep78_get_account_named_key",
        ActionGroup::Cep78,
        "account named key",
        &[
            ArgSpec {
                name: "account",
                hint: "pk",
                required: true,
            },
            ArgSpec {
                name: "named_key",
                hint: "name",
                required: true,
            },
        ],
    ),
    ceps_write_action(
        "cep78_install",
        ActionGroup::Cep78,
        "install CEP-78",
        &[
            ArgSpec {
                name: "wasm",
                hint: "alias cep18 or path under CEPS_WASM_ROOT",
                required: true,
            },
            ArgSpec {
                name: "collection_name",
                hint: "name",
                required: true,
            },
            ArgSpec {
                name: "collection_symbol",
                hint: "sym",
                required: false,
            },
            ArgSpec {
                name: "total_token_supply",
                hint: "50",
                required: false,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_write_action(
        "cep78_upgrade",
        ActionGroup::Cep78,
        "upgrade CEP-78",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "wasm",
                hint: "alias cep18 or path under CEPS_WASM_ROOT",
                required: true,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_write_action(
        "cep78_mint",
        ActionGroup::Cep78,
        "mint",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "token_owner",
                hint: "key",
                required: true,
            },
            ArgSpec {
                name: "token_meta_data",
                hint: "json meta",
                required: false,
            },
            ArgSpec {
                name: "token_id",
                hint: "id",
                required: false,
            },
            ArgSpec {
                name: "token_hash",
                hint: "hash",
                required: false,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_write_action(
        "cep78_mint_session",
        ActionGroup::Cep78,
        "mint_session",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "wasm",
                hint: "alias cep18 or path under CEPS_WASM_ROOT",
                required: true,
            },
            ArgSpec {
                name: "token_owner",
                hint: "key",
                required: true,
            },
            ArgSpec {
                name: "token_meta_data",
                hint: "json",
                required: false,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_write_action(
        "cep78_burn",
        ActionGroup::Cep78,
        "burn",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "token_id",
                hint: "id",
                required: false,
            },
            ArgSpec {
                name: "token_hash",
                hint: "hash",
                required: false,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_write_action(
        "cep78_transfer",
        ActionGroup::Cep78,
        "transfer",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "source_key",
                hint: "from",
                required: true,
            },
            ArgSpec {
                name: "target_key",
                hint: "to",
                required: true,
            },
            ArgSpec {
                name: "token_id",
                hint: "id",
                required: false,
            },
            ArgSpec {
                name: "token_hash",
                hint: "hash",
                required: false,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_write_action(
        "cep78_transfer_session",
        ActionGroup::Cep78,
        "transfer_session",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "wasm",
                hint: "alias cep18 or path under CEPS_WASM_ROOT",
                required: true,
            },
            ArgSpec {
                name: "source_key",
                hint: "from",
                required: true,
            },
            ArgSpec {
                name: "target_key",
                hint: "to",
                required: true,
            },
            ArgSpec {
                name: "token_id",
                hint: "id",
                required: false,
            },
            ArgSpec {
                name: "token_hash",
                hint: "hash",
                required: false,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_write_action(
        "cep78_register_owner",
        ActionGroup::Cep78,
        "register_owner",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "token_owner",
                hint: "key",
                required: true,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_write_action(
        "cep78_approve",
        ActionGroup::Cep78,
        "approve",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "operator",
                hint: "key",
                required: true,
            },
            ArgSpec {
                name: "token_id",
                hint: "id",
                required: false,
            },
            ArgSpec {
                name: "token_hash",
                hint: "hash",
                required: false,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_write_action(
        "cep78_revoke",
        ActionGroup::Cep78,
        "revoke",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "operator",
                hint: "key",
                required: true,
            },
            ArgSpec {
                name: "token_id",
                hint: "id",
                required: false,
            },
            ArgSpec {
                name: "token_hash",
                hint: "hash",
                required: false,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_write_action(
        "cep78_set_approval_for_all",
        ActionGroup::Cep78,
        "set_approval_for_all",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "operator",
                hint: "key",
                required: true,
            },
            ArgSpec {
                name: "approve_all",
                hint: "true|false",
                required: true,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_write_action(
        "cep78_set_token_metadata",
        ActionGroup::Cep78,
        "set_token_metadata",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "token_meta_data",
                hint: "json",
                required: true,
            },
            ArgSpec {
                name: "token_id",
                hint: "id",
                required: false,
            },
            ArgSpec {
                name: "token_hash",
                hint: "hash",
                required: false,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_write_action(
        "cep78_set_variables",
        ActionGroup::Cep78,
        "set_variables",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "allow_minting",
                hint: "bool",
                required: false,
            },
            ArgSpec {
                name: "acl_whitelist",
                hint: "csv keys",
                required: false,
            },
            ArgSpec {
                name: "acl_package_mode",
                hint: "bool",
                required: false,
            },
            ArgSpec {
                name: "package_operator_mode",
                hint: "bool",
                required: false,
            },
            ArgSpec {
                name: "operator_burn_mode",
                hint: "bool",
                required: false,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_write_action(
        "cep78_updated_receipts",
        ActionGroup::Cep78,
        "updated_receipts",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "wasm",
                hint: "alias cep18 or path under CEPS_WASM_ROOT",
                required: true,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_write_action(
        "cep78_owner_of_session",
        ActionGroup::Cep78,
        "owner_of_session",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "wasm",
                hint: "alias or path under CEPS_WASM_ROOT",
                required: true,
            },
            ArgSpec {
                name: "key_name",
                hint: "named key",
                required: false,
            },
            ArgSpec {
                name: "token_id",
                hint: "id",
                required: false,
            },
            ArgSpec {
                name: "token_hash",
                hint: "hash",
                required: false,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_write_action(
        "cep78_balance_of_session",
        ActionGroup::Cep78,
        "balance_of_session",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "wasm",
                hint: "alias or path under CEPS_WASM_ROOT",
                required: true,
            },
            ArgSpec {
                name: "token_owner",
                hint: "key",
                required: true,
            },
            ArgSpec {
                name: "key_name",
                hint: "named key",
                required: false,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_write_action(
        "cep78_get_approved_session",
        ActionGroup::Cep78,
        "get_approved_session",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "wasm",
                hint: "alias or path under CEPS_WASM_ROOT",
                required: true,
            },
            ArgSpec {
                name: "key_name",
                hint: "named key",
                required: false,
            },
            ArgSpec {
                name: "token_id",
                hint: "id",
                required: false,
            },
            ArgSpec {
                name: "token_hash",
                hint: "hash",
                required: false,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_write_action(
        "cep78_is_approved_for_all_session",
        ActionGroup::Cep78,
        "is_approved_for_all_session",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "wasm",
                hint: "alias or path under CEPS_WASM_ROOT",
                required: true,
            },
            ArgSpec {
                name: "token_owner",
                hint: "key",
                required: true,
            },
            ArgSpec {
                name: "operator",
                hint: "key",
                required: true,
            },
            ArgSpec {
                name: "key_name",
                hint: "named key",
                required: false,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_action("cep85_info", ActionGroup::Cep85, "CEP-85 endpoints", &[]),
    ceps_action(
        "cep85_collection_name",
        ActionGroup::Cep85,
        "collection_name",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
        ],
    ),
    ceps_action(
        "cep85_collection_uri",
        ActionGroup::Cep85,
        "collection_uri",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
        ],
    ),
    ceps_action(
        "cep85_balance_of",
        ActionGroup::Cep85,
        "balance_of",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "account",
                hint: "key",
                required: true,
            },
            ArgSpec {
                name: "id",
                hint: "token id",
                required: true,
            },
        ],
    ),
    ceps_action(
        "cep85_balance_of_batch",
        ActionGroup::Cep85,
        "balance_of_batch",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "accounts",
                hint: "csv",
                required: true,
            },
            ArgSpec {
                name: "ids",
                hint: "csv",
                required: true,
            },
        ],
    ),
    ceps_action(
        "cep85_is_approved_for_all",
        ActionGroup::Cep85,
        "is_approved_for_all",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "account",
                hint: "key",
                required: true,
            },
            ArgSpec {
                name: "operator",
                hint: "key",
                required: true,
            },
        ],
    ),
    ceps_action(
        "cep85_supply_of",
        ActionGroup::Cep85,
        "supply_of",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "id",
                hint: "token id",
                required: true,
            },
        ],
    ),
    ceps_action(
        "cep85_supply_of_batch",
        ActionGroup::Cep85,
        "supply_of_batch",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "ids",
                hint: "csv",
                required: true,
            },
        ],
    ),
    ceps_action(
        "cep85_total_supply_of",
        ActionGroup::Cep85,
        "total_supply_of",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "id",
                hint: "token id",
                required: true,
            },
        ],
    ),
    ceps_action(
        "cep85_total_supply_of_batch",
        ActionGroup::Cep85,
        "total_supply_of_batch",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "ids",
                hint: "csv",
                required: true,
            },
        ],
    ),
    ceps_action(
        "cep85_total_fungible_supply",
        ActionGroup::Cep85,
        "total_fungible_supply",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "id",
                hint: "token id",
                required: true,
            },
        ],
    ),
    ceps_action(
        "cep85_uri",
        ActionGroup::Cep85,
        "uri",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "id",
                hint: "token id",
                required: false,
            },
        ],
    ),
    ceps_action(
        "cep85_is_non_fungible",
        ActionGroup::Cep85,
        "is_non_fungible",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "id",
                hint: "token id",
                required: true,
            },
        ],
    ),
    ceps_action(
        "cep85_enable_burn",
        ActionGroup::Cep85,
        "enable_burn query",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
        ],
    ),
    ceps_action(
        "cep85_events_mode",
        ActionGroup::Cep85,
        "events_mode",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
        ],
    ),
    ceps_action(
        "cep85_number_of_minted_tokens",
        ActionGroup::Cep85,
        "minted count",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
        ],
    ),
    ceps_action(
        "cep85_transfer_filter_contract",
        ActionGroup::Cep85,
        "transfer_filter_contract",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
        ],
    ),
    ceps_action(
        "cep85_transfer_filter_method",
        ActionGroup::Cep85,
        "transfer_filter_method",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
        ],
    ),
    ceps_action(
        "cep85_security_badge",
        ActionGroup::Cep85,
        "security_badge",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "account",
                hint: "key",
                required: true,
            },
        ],
    ),
    ceps_action(
        "cep85_get_account_named_key",
        ActionGroup::Cep85,
        "account named key",
        &[
            ArgSpec {
                name: "account",
                hint: "pk",
                required: true,
            },
            ArgSpec {
                name: "named_key",
                hint: "name",
                required: true,
            },
        ],
    ),
    ceps_write_action(
        "cep85_install",
        ActionGroup::Cep85,
        "install CEP-85",
        &[
            ArgSpec {
                name: "wasm",
                hint: "alias cep18 or path under CEPS_WASM_ROOT",
                required: true,
            },
            ArgSpec {
                name: "name",
                hint: "collection",
                required: true,
            },
            ArgSpec {
                name: "uri",
                hint: "uri",
                required: false,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_write_action(
        "cep85_upgrade",
        ActionGroup::Cep85,
        "upgrade CEP-85",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "name",
                hint: "collection name",
                required: true,
            },
            ArgSpec {
                name: "wasm",
                hint: "alias cep85 or path under CEPS_WASM_ROOT",
                required: true,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_write_action(
        "cep85_mint",
        ActionGroup::Cep85,
        "mint",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "recipient",
                hint: "key",
                required: true,
            },
            ArgSpec {
                name: "id",
                hint: "token id",
                required: true,
            },
            ArgSpec {
                name: "amount",
                hint: "qty",
                required: true,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_write_action(
        "cep85_batch_mint",
        ActionGroup::Cep85,
        "batch_mint",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "recipient",
                hint: "key",
                required: true,
            },
            ArgSpec {
                name: "ids",
                hint: "csv",
                required: true,
            },
            ArgSpec {
                name: "amounts",
                hint: "csv",
                required: true,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_write_action(
        "cep85_burn",
        ActionGroup::Cep85,
        "burn",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "owner",
                hint: "key",
                required: true,
            },
            ArgSpec {
                name: "id",
                hint: "token id",
                required: true,
            },
            ArgSpec {
                name: "amount",
                hint: "qty",
                required: true,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_write_action(
        "cep85_batch_burn",
        ActionGroup::Cep85,
        "batch_burn",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "owner",
                hint: "key",
                required: true,
            },
            ArgSpec {
                name: "ids",
                hint: "csv",
                required: true,
            },
            ArgSpec {
                name: "amounts",
                hint: "csv",
                required: true,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_write_action(
        "cep85_transfer",
        ActionGroup::Cep85,
        "transfer",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "from",
                hint: "owner key",
                required: true,
            },
            ArgSpec {
                name: "to",
                hint: "recipient key",
                required: true,
            },
            ArgSpec {
                name: "id",
                hint: "token id",
                required: true,
            },
            ArgSpec {
                name: "amount",
                hint: "qty",
                required: true,
            },
            ArgSpec {
                name: "data",
                hint: "optional bytes as text",
                required: false,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_write_action(
        "cep85_batch_transfer",
        ActionGroup::Cep85,
        "batch_transfer",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "from",
                hint: "owner key",
                required: true,
            },
            ArgSpec {
                name: "to",
                hint: "recipient key",
                required: true,
            },
            ArgSpec {
                name: "ids",
                hint: "csv",
                required: true,
            },
            ArgSpec {
                name: "amounts",
                hint: "csv",
                required: true,
            },
            ArgSpec {
                name: "data",
                hint: "optional bytes as text",
                required: false,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_write_action(
        "cep85_set_approval_for_all",
        ActionGroup::Cep85,
        "set_approval_for_all",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "operator",
                hint: "key",
                required: true,
            },
            ArgSpec {
                name: "approved",
                hint: "true|false",
                required: true,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_write_action(
        "cep85_set_uri",
        ActionGroup::Cep85,
        "set_uri",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "uri",
                hint: "uri",
                required: true,
            },
            ArgSpec {
                name: "id",
                hint: "token id",
                required: false,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_write_action(
        "cep85_set_total_supply_of",
        ActionGroup::Cep85,
        "set_total_supply_of",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "id",
                hint: "token id",
                required: true,
            },
            ArgSpec {
                name: "total_supply",
                hint: "qty",
                required: true,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_write_action(
        "cep85_set_total_supply_of_batch",
        ActionGroup::Cep85,
        "set_total_supply_of_batch",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "ids",
                hint: "csv",
                required: true,
            },
            ArgSpec {
                name: "total_supplies",
                hint: "csv",
                required: true,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_write_action(
        "cep85_change_security",
        ActionGroup::Cep85,
        "change_security",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "admin_list",
                hint: "csv",
                required: false,
            },
            ArgSpec {
                name: "minter_list",
                hint: "csv",
                required: false,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_write_action(
        "cep85_set_modalities",
        ActionGroup::Cep85,
        "set_modalities",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "enable_burn",
                hint: "bool",
                required: false,
            },
            ArgSpec {
                name: "events_mode",
                hint: "u8",
                required: false,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_action("cep95_info", ActionGroup::Cep95, "CEP-95 endpoints", &[]),
    ceps_action(
        "cep95_name",
        ActionGroup::Cep95,
        "name",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
        ],
    ),
    ceps_action(
        "cep95_symbol",
        ActionGroup::Cep95,
        "symbol",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
        ],
    ),
    ceps_action(
        "cep95_total_supply",
        ActionGroup::Cep95,
        "total_supply",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
        ],
    ),
    ceps_action(
        "cep95_get_owner",
        ActionGroup::Cep95,
        "contract owner",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
        ],
    ),
    ceps_action(
        "cep95_balance_of",
        ActionGroup::Cep95,
        "balance_of",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "account",
                hint: "key",
                required: true,
            },
        ],
    ),
    ceps_action(
        "cep95_owner_of",
        ActionGroup::Cep95,
        "owner_of",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "token_id",
                hint: "id",
                required: true,
            },
        ],
    ),
    ceps_action(
        "cep95_get_approved",
        ActionGroup::Cep95,
        "get_approved",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "token_id",
                hint: "id",
                required: true,
            },
        ],
    ),
    ceps_action(
        "cep95_is_approved_for_all",
        ActionGroup::Cep95,
        "is_approved_for_all",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "owner",
                hint: "key",
                required: true,
            },
            ArgSpec {
                name: "operator",
                hint: "key",
                required: true,
            },
        ],
    ),
    ceps_action(
        "cep95_token_metadata",
        ActionGroup::Cep95,
        "token_metadata",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "token_id",
                hint: "id",
                required: true,
            },
        ],
    ),
    ceps_action(
        "cep95_get_account_named_key",
        ActionGroup::Cep95,
        "account named key",
        &[
            ArgSpec {
                name: "account",
                hint: "pk",
                required: true,
            },
            ArgSpec {
                name: "named_key",
                hint: "name",
                required: true,
            },
        ],
    ),
    ceps_write_action(
        "cep95_install",
        ActionGroup::Cep95,
        "install CEP-95 + bind_odra",
        &[
            ArgSpec {
                name: "wasm",
                hint: "alias cep18 or path under CEPS_WASM_ROOT",
                required: true,
            },
            ArgSpec {
                name: "name",
                hint: "name",
                required: true,
            },
            ArgSpec {
                name: "symbol",
                hint: "sym",
                required: false,
            },
            ArgSpec {
                name: "package_key_name",
                hint: "odra package key",
                required: true,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_write_action(
        "cep95_bind_odra_install",
        ActionGroup::Cep95,
        "bind_odra_install",
        &[
            ArgSpec {
                name: "installer",
                hint: "pk",
                required: true,
            },
            ArgSpec {
                name: "package_key_name",
                hint: "key",
                required: true,
            },
        ],
    ),
    ceps_write_action(
        "cep95_mint",
        ActionGroup::Cep95,
        "mint",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "to",
                hint: "key",
                required: true,
            },
            ArgSpec {
                name: "token_id",
                hint: "id",
                required: false,
            },
            ArgSpec {
                name: "token_meta_data",
                hint: "json",
                required: false,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_write_action(
        "cep95_burn",
        ActionGroup::Cep95,
        "burn",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "token_id",
                hint: "id",
                required: true,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_write_action(
        "cep95_transfer_from",
        ActionGroup::Cep95,
        "transfer_from",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "from",
                hint: "key",
                required: true,
            },
            ArgSpec {
                name: "to",
                hint: "key",
                required: true,
            },
            ArgSpec {
                name: "token_id",
                hint: "id",
                required: true,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_write_action(
        "cep95_safe_transfer_from",
        ActionGroup::Cep95,
        "safe_transfer_from",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "from",
                hint: "key",
                required: true,
            },
            ArgSpec {
                name: "to",
                hint: "key",
                required: true,
            },
            ArgSpec {
                name: "token_id",
                hint: "id",
                required: true,
            },
            ArgSpec {
                name: "data",
                hint: "hex",
                required: false,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_write_action(
        "cep95_approve",
        ActionGroup::Cep95,
        "approve",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "spender",
                hint: "key",
                required: true,
            },
            ArgSpec {
                name: "token_id",
                hint: "id",
                required: true,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_write_action(
        "cep95_revoke_approval",
        ActionGroup::Cep95,
        "revoke_approval",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "token_id",
                hint: "id",
                required: true,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_write_action(
        "cep95_approve_for_all",
        ActionGroup::Cep95,
        "approve_for_all",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "operator",
                hint: "key",
                required: true,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_write_action(
        "cep95_revoke_approval_for_all",
        ActionGroup::Cep95,
        "revoke_approval_for_all",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "operator",
                hint: "key",
                required: true,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_write_action(
        "cep95_transfer_ownership",
        ActionGroup::Cep95,
        "transfer_ownership",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "new_owner",
                hint: "key",
                required: true,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
    ceps_action(
        "ces_parse_execution",
        ActionGroup::Ces,
        "parse CES from execution JSON",
        &[
            ArgSpec {
                name: "contract_hashes",
                hint: "csv hashes",
                required: true,
            },
            ArgSpec {
                name: "execution_json",
                hint: "execution result json",
                required: true,
            },
        ],
    ),
    ceps_action(
        "ces_parse_transaction",
        ActionGroup::Ces,
        "parse CES from tx hash",
        &[
            ArgSpec {
                name: "contract_hashes",
                hint: "csv hashes",
                required: true,
            },
            ArgSpec {
                name: "transaction_hash",
                hint: "hash",
                required: true,
            },
        ],
    ),
    ceps_action(
        "ces_collect",
        ActionGroup::Ces,
        "collect CES events (SSE)",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "ces_event_names",
                hint: "csv names",
                required: true,
            },
            ArgSpec {
                name: "max_transactions",
                hint: "N",
                required: false,
            },
            ArgSpec {
                name: "timeout_ms",
                hint: "ms",
                required: false,
            },
        ],
    ),
    ceps_action(
        "ceps_wasm_root",
        ActionGroup::CepsShared,
        "CEPS_WASM_ROOT / discovered root",
        &[],
    ),
    ceps_action(
        "ceps_wasm_resolve",
        ActionGroup::CepsShared,
        "resolve wasm path",
        &[ArgSpec {
            name: "name",
            hint: "alias or path",
            required: true,
        }],
    ),
    ceps_action(
        "ceps_wasm_load",
        ActionGroup::CepsShared,
        "load wasm bytes meta",
        &[ArgSpec {
            name: "name",
            hint: "alias or path",
            required: true,
        }],
    ),
    ceps_write_action(
        "ceps_put_transaction",
        ActionGroup::CepsShared,
        "put signed Transaction JSON",
        &[
            ArgSpec {
                name: "transaction_json",
                hint: "json or @file",
                required: true,
            },
            ArgSpec {
                name: "wait",
                hint: "true|false",
                required: false,
            },
            ArgSpec {
                name: "wait_timeout_ms",
                hint: "ms",
                required: false,
            },
            ArgSpec {
                name: "contract_hash",
                hint: "CES bind",
                required: false,
            },
            ArgSpec {
                name: "package_hash",
                hint: "opt",
                required: false,
            },
        ],
    ),
    ceps_action(
        "ceps_wait_transaction",
        ActionGroup::CepsShared,
        "wait tx on SSE",
        &[
            ArgSpec {
                name: "transaction_hash",
                hint: "hash",
                required: true,
            },
            ArgSpec {
                name: "wait_timeout_ms",
                hint: "ms",
                required: false,
            },
        ],
    ),
    ceps_write_action(
        "ceps_call_entrypoint",
        ActionGroup::CepsShared,
        "custom entrypoint put",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional",
                required: false,
            },
            ArgSpec {
                name: "entry_point",
                hint: "name",
                required: true,
            },
            ArgSpec {
                name: "args_json",
                hint: "CL JSON array",
                required: true,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes",
                required: false,
            },
        ],
    ),
];

#[cfg(not(feature = "ceps"))]
pub const CEPS_ACTIONS: &[ActionSpec] = &[];

/// All catalog entries (base + optional CEP groups).
pub fn all_actions() -> impl Iterator<Item = &'static ActionSpec> {
    ACTIONS.iter().chain(CEPS_ACTIONS.iter())
}

pub fn find_action(id: &str) -> Option<&'static ActionSpec> {
    all_actions().find(|a| a.id == id)
}

pub fn visible_actions(enable_writes: bool, has_pem: bool) -> Vec<&'static ActionSpec> {
    visible_actions_filtered(enable_writes, has_pem, None)
}

pub fn visible_actions_filtered(
    enable_writes: bool,
    has_pem: bool,
    group_filter: Option<ActionGroup>,
) -> Vec<&'static ActionSpec> {
    all_actions()
        .filter(|a| group_filter.is_none_or(|g| a.group == g))
        .filter(|a| {
            if !a.requires_writes {
                return true;
            }
            if !enable_writes {
                return false;
            }
            if a.requires_pem && !has_pem {
                return false;
            }
            true
        })
        .collect()
}
