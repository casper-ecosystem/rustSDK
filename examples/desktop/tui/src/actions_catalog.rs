//! Static Actions catalog (RPC + helpers + write-gated).

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum ActionGroup {
    Rpc,
    Helpers,
}

impl ActionGroup {
    pub fn label(self) -> &'static str {
        match self {
            Self::Rpc => "rpc",
            Self::Helpers => "helpers",
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

pub fn find_action(id: &str) -> Option<&'static ActionSpec> {
    ACTIONS.iter().find(|a| a.id == id)
}

/// Filter catalog by write gate and loaded PEM.
pub fn visible_actions(enable_writes: bool, has_pem: bool) -> Vec<&'static ActionSpec> {
    ACTIONS
        .iter()
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
