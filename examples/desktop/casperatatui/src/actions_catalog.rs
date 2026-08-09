//! Static Actions catalog (RPC + helpers + write-gated).

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum ActionGroup {
    Rpc,
    Helpers,
    #[cfg(feature = "ceps")]
    Ceps,
}

impl ActionGroup {
    pub fn label(self) -> &'static str {
        match self {
            Self::Rpc => "rpc",
            Self::Helpers => "helpers",
            #[cfg(feature = "ceps")]
            Self::Ceps => "ceps",
        }
    }
}

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
const fn ceps_write_action(
    id: &'static str,
    blurb: &'static str,
    args: &'static [ArgSpec],
) -> ActionSpec {
    ActionSpec {
        id,
        group: ActionGroup::Ceps,
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
    action(
        "cep18_info",
        ActionGroup::Ceps,
        "CEP-18 client endpoints",
        &[],
    ),
    action(
        "cep18_name",
        ActionGroup::Ceps,
        "CEP-18 token name",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-… / entity-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional package",
                required: false,
            },
        ],
    ),
    action(
        "cep18_symbol",
        ActionGroup::Ceps,
        "CEP-18 token symbol",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-… / entity-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional package",
                required: false,
            },
        ],
    ),
    action(
        "cep18_decimals",
        ActionGroup::Ceps,
        "CEP-18 decimals",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-… / entity-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional package",
                required: false,
            },
        ],
    ),
    action(
        "cep18_balance_of",
        ActionGroup::Ceps,
        "CEP-18 balance_of",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-… / entity-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional package",
                required: false,
            },
            ArgSpec {
                name: "account",
                hint: "account-hash-… / hash-… / entity-…",
                required: true,
            },
        ],
    ),
    ceps_write_action(
        "cep18_install",
        "install CEP-18 from WASM path",
        &[
            ArgSpec {
                name: "name",
                hint: "token name",
                required: true,
            },
            ArgSpec {
                name: "symbol",
                hint: "default TUI",
                required: false,
            },
            ArgSpec {
                name: "decimals",
                hint: "default 9",
                required: false,
            },
            ArgSpec {
                name: "total_supply",
                hint: "default 1000",
                required: false,
            },
            ArgSpec {
                name: "wasm_path",
                hint: "or CEPS_CEP18_WASM / CEPS_WASM_PATH",
                required: false,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes (default 400000000000)",
                required: false,
            },
        ],
    ),
    action(
        "cep78_info",
        ActionGroup::Ceps,
        "CEP-78 client endpoints",
        &[],
    ),
    action(
        "cep78_name",
        ActionGroup::Ceps,
        "CEP-78 collection_name",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-… / entity-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional package",
                required: false,
            },
        ],
    ),
    action(
        "cep78_balance",
        ActionGroup::Ceps,
        "CEP-78 balance_of",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-… / entity-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional package",
                required: false,
            },
            ArgSpec {
                name: "account",
                hint: "owner key",
                required: true,
            },
        ],
    ),
    ceps_write_action(
        "cep78_install",
        "install CEP-78 from WASM path",
        &[
            ArgSpec {
                name: "collection_name",
                hint: "collection name",
                required: true,
            },
            ArgSpec {
                name: "collection_symbol",
                hint: "default T78",
                required: false,
            },
            ArgSpec {
                name: "total_token_supply",
                hint: "default 50",
                required: false,
            },
            ArgSpec {
                name: "wasm_path",
                hint: "or CEPS_CEP78_WASM / CEPS_WASM_PATH",
                required: false,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes (default 600000000000)",
                required: false,
            },
        ],
    ),
    action(
        "cep85_info",
        ActionGroup::Ceps,
        "CEP-85 client endpoints",
        &[],
    ),
    action(
        "cep85_name",
        ActionGroup::Ceps,
        "CEP-85 collection_name",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-… / entity-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional package",
                required: false,
            },
        ],
    ),
    action(
        "cep85_balance",
        ActionGroup::Ceps,
        "CEP-85 balance_of(account, id)",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-… / entity-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional package",
                required: false,
            },
            ArgSpec {
                name: "account",
                hint: "owner key",
                required: true,
            },
            ArgSpec {
                name: "id",
                hint: "token id",
                required: true,
            },
        ],
    ),
    ceps_write_action(
        "cep85_install",
        "install CEP-85 from WASM path",
        &[
            ArgSpec {
                name: "name",
                hint: "collection name",
                required: true,
            },
            ArgSpec {
                name: "uri",
                hint: "metadata URI template",
                required: false,
            },
            ArgSpec {
                name: "wasm_path",
                hint: "or CEPS_CEP85_WASM / CEPS_WASM_PATH",
                required: false,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes (default 550000000000)",
                required: false,
            },
        ],
    ),
    action(
        "cep95_info",
        ActionGroup::Ceps,
        "CEP-95 client endpoints",
        &[],
    ),
    action(
        "cep95_name",
        ActionGroup::Ceps,
        "CEP-95 name",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-… / entity-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional package",
                required: false,
            },
        ],
    ),
    action(
        "cep95_symbol",
        ActionGroup::Ceps,
        "CEP-95 symbol",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-… / entity-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional package",
                required: false,
            },
        ],
    ),
    action(
        "cep95_owner_of",
        ActionGroup::Ceps,
        "CEP-95 owner_of(token_id)",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-… / entity-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional package",
                required: false,
            },
            ArgSpec {
                name: "token_id",
                hint: "token id string",
                required: true,
            },
        ],
    ),
    action(
        "cep95_balance",
        ActionGroup::Ceps,
        "CEP-95 balance_of",
        &[
            ArgSpec {
                name: "contract_hash",
                hint: "hash-… / entity-…",
                required: true,
            },
            ArgSpec {
                name: "package_hash",
                hint: "optional package",
                required: false,
            },
            ArgSpec {
                name: "account",
                hint: "owner key",
                required: true,
            },
        ],
    ),
    ceps_write_action(
        "cep95_install",
        "install CEP-95 + bind_odra_install",
        &[
            ArgSpec {
                name: "name",
                hint: "collection name",
                required: true,
            },
            ArgSpec {
                name: "symbol",
                hint: "default T95",
                required: false,
            },
            ArgSpec {
                name: "package_key_name",
                hint: "account named key for package",
                required: true,
            },
            ArgSpec {
                name: "wasm_path",
                hint: "or CEPS_CEP95_WASM / CEPS_WASM_PATH",
                required: false,
            },
            ArgSpec {
                name: "payment_amount",
                hint: "motes (default 600000000000)",
                required: false,
            },
        ],
    ),
];

#[cfg(not(feature = "ceps"))]
pub const CEPS_ACTIONS: &[ActionSpec] = &[];

/// All catalog entries (base + optional CEP group).
pub fn all_actions() -> impl Iterator<Item = &'static ActionSpec> {
    ACTIONS.iter().chain(CEPS_ACTIONS.iter())
}

pub fn find_action(id: &str) -> Option<&'static ActionSpec> {
    all_actions().find(|a| a.id == id)
}

/// Filter catalog by write gate and loaded PEM.
pub fn visible_actions(enable_writes: bool, has_pem: bool) -> Vec<&'static ActionSpec> {
    all_actions()
        .filter(|a| {
            if a.requires_writes && !enable_writes {
                return false;
            }
            if a.requires_pem && !has_pem {
                return false;
            }
            true
        })
        .collect()
}
