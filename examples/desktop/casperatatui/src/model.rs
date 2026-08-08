//! Application state and view modes.

use crate::account_view::EntityOverview;
use crate::actions_catalog::{find_action, visible_actions, ActionSpec};
use crate::auction_view::{
    DelegationRow, SelfStakeRow, UndelegationRow, ValidatorDetail, ValidatorRow,
};
use crate::block_view::{BlockRow, TransferRow};
use crate::command::CommandPalette;
use crate::contract_view::ContractOverview;
use crate::network_data::NetworkSnapshot;
use crate::policy::WritePolicy;
use crate::text_input::TextInput;
use crate::write_flow::{
    extract_tx_hash, load_pem_file, WriteKind, WriteStage, DEFAULT_PAYMENT_MOTES,
    DEFAULT_TRANSFER_MOTES,
};
use serde_json::Value;
use std::collections::HashMap;
use std::time::{Duration, Instant};

/// Top-level screens (digits + Tab).
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum ViewMode {
    Network,
    Blocks,
    Transactions,
    Accounts,
    Validators,
    Contracts,
    Actions,
    Writes,
    Wait,
    Help,
}

impl ViewMode {
    pub const ALL: [ViewMode; 10] = [
        Self::Network,
        Self::Blocks,
        Self::Transactions,
        Self::Accounts,
        Self::Validators,
        Self::Contracts,
        Self::Actions,
        Self::Writes,
        Self::Wait,
        Self::Help,
    ];

    pub fn title(self) -> &'static str {
        match self {
            Self::Network => "Network",
            Self::Blocks => "Blocks",
            Self::Transactions => "Txs",
            Self::Accounts => "Accounts",
            Self::Validators => "Validators",
            Self::Contracts => "Contracts",
            Self::Actions => "Actions",
            Self::Writes => "Writes",
            Self::Wait => "Wait",
            Self::Help => "Help",
        }
    }

    pub fn digit(self) -> Option<char> {
        match self {
            Self::Network => Some('1'),
            Self::Blocks => Some('2'),
            Self::Transactions => Some('3'),
            Self::Accounts => Some('4'),
            Self::Validators => Some('5'),
            Self::Contracts => Some('6'),
            Self::Actions => Some('7'),
            Self::Writes => Some('8'),
            Self::Wait => Some('9'),
            Self::Help => None,
        }
    }

    pub fn from_digit(c: char) -> Option<Self> {
        match c {
            '1' => Some(Self::Network),
            '2' => Some(Self::Blocks),
            '3' => Some(Self::Transactions),
            '4' => Some(Self::Accounts),
            '5' => Some(Self::Validators),
            '6' => Some(Self::Contracts),
            '7' => Some(Self::Actions),
            '8' => Some(Self::Writes),
            '9' => Some(Self::Wait),
            _ => None,
        }
    }

    pub fn next(self) -> Self {
        let idx = Self::ALL.iter().position(|v| *v == self).unwrap_or(0);
        Self::ALL[(idx + 1) % Self::ALL.len()]
    }

    pub fn prev(self) -> Self {
        let idx = Self::ALL.iter().position(|v| *v == self).unwrap_or(0);
        let len = Self::ALL.len();
        Self::ALL[(idx + len - 1) % len]
    }
}

/// Async work delivered on the UI thread.
#[derive(Debug)]
pub enum RpcEvent {
    Network(NetworkSnapshot),
    Action {
        method: String,
        result: Result<Value, String>,
    },
    LatestBlocks(Result<Vec<BlockRow>, String>),
    BlockDetail {
        block: Result<Value, String>,
        transfers: Result<Value, String>,
    },
    Transaction(Result<Value, String>),
    Account(AccountLoadResult),
    Reward(Result<Value, String>),
    ValidatorsAuction(Result<Value, String>),
    Contract(Result<ContractLoadResult, String>),
    ContractQuery(Result<Value, String>),
    WriteBuild(Result<Value, String>),
    WriteSign(Result<Value, String>),
    WritePut(Result<Value, String>),
    WaitDone(Result<Value, String>),
    SseCollect(Result<Value, String>),
}

/// Parallel account load payloads (entity + balances + auction).
#[derive(Debug)]
pub struct AccountLoadResult {
    pub identity: String,
    pub entity: Result<Value, String>,
    pub balance: Result<Value, String>,
    pub balance_details: Result<Value, String>,
    pub auction: Result<Value, String>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum InputMode {
    Normal,
    Command,
    EditRpc,
    ActionForm,
    BlockLookup,
    TxLookup,
    AccountLookup,
    AccountReward,
    ValidatorFilter,
    ContractLookup,
    ContractQueryKey,
    ContractQueryDict,
    WriteForm,
    LoadPem,
    WaitForm,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum AccountsSection {
    Overview,
    NamedKeys,
    Delegations,
    Undelegations,
    Rewards,
}

impl AccountsSection {
    pub const ALL: [AccountsSection; 5] = [
        Self::Overview,
        Self::NamedKeys,
        Self::Delegations,
        Self::Undelegations,
        Self::Rewards,
    ];

    pub fn title(self) -> &'static str {
        match self {
            Self::Overview => "Overview",
            Self::NamedKeys => "Named keys",
            Self::Delegations => "Delegations",
            Self::Undelegations => "Undelegations",
            Self::Rewards => "Rewards",
        }
    }

    pub fn next(self) -> Self {
        let idx = Self::ALL.iter().position(|s| *s == self).unwrap_or(0);
        Self::ALL[(idx + 1) % Self::ALL.len()]
    }

    pub fn prev(self) -> Self {
        let idx = Self::ALL.iter().position(|s| *s == self).unwrap_or(0);
        let len = Self::ALL.len();
        Self::ALL[(idx + len - 1) % len]
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum ContractsSection {
    Overview,
    NamedKeys,
    EntryPoints,
    QueryKey,
    QueryDict,
    Writes,
}

impl ContractsSection {
    pub fn visible(enable_writes: bool) -> Vec<Self> {
        let mut v = vec![
            Self::Overview,
            Self::NamedKeys,
            Self::EntryPoints,
            Self::QueryKey,
            Self::QueryDict,
        ];
        if enable_writes {
            v.push(Self::Writes);
        }
        v
    }

    pub fn title(self) -> &'static str {
        match self {
            Self::Overview => "Overview",
            Self::NamedKeys => "Named keys",
            Self::EntryPoints => "Entry points",
            Self::QueryKey => "Query key",
            Self::QueryDict => "Query dict",
            Self::Writes => "Writes",
        }
    }

    pub fn next(self, enable_writes: bool) -> Self {
        let list = Self::visible(enable_writes);
        let idx = list.iter().position(|s| *s == self).unwrap_or(0);
        list[(idx + 1) % list.len()]
    }

    pub fn prev(self, enable_writes: bool) -> Self {
        let list = Self::visible(enable_writes);
        let idx = list.iter().position(|s| *s == self).unwrap_or(0);
        let len = list.len();
        list[(idx + len - 1) % len]
    }
}

/// Result of loading a contract via query_global_state.
#[derive(Debug)]
pub struct ContractLoadResult {
    pub key: String,
    pub raw: Value,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum ActionsPane {
    List,
    Form,
    Result,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum BlocksPane {
    List,
    Detail,
}

/// Blocks screen state.
pub struct BlocksState {
    pub pane: BlocksPane,
    pub rows: Vec<BlockRow>,
    pub selected: usize,
    pub lookup: TextInput,
    pub detail_json: Option<Value>,
    pub detail_row: Option<BlockRow>,
    pub transfers: Vec<TransferRow>,
    pub tx_selected: usize,
    pub scroll: u16,
    pub latest_count: u32,
}

impl BlocksState {
    pub fn new() -> Self {
        Self {
            pane: BlocksPane::List,
            rows: Vec::new(),
            selected: 0,
            lookup: TextInput::new(),
            detail_json: None,
            detail_row: None,
            transfers: Vec::new(),
            tx_selected: 0,
            scroll: 0,
            latest_count: 10,
        }
    }

    pub fn selected_tx_hash(&self) -> Option<String> {
        let row = self.detail_row.as_ref()?;
        row.tx_hashes.get(self.tx_selected).cloned()
    }
}

impl Default for BlocksState {
    fn default() -> Self {
        Self::new()
    }
}

/// Transactions screen state.
pub struct TransactionsState {
    pub hash_input: TextInput,
    pub result: Option<Value>,
    pub result_text: Option<String>,
    pub scroll: u16,
}

impl TransactionsState {
    pub fn new() -> Self {
        Self {
            hash_input: TextInput::new(),
            result: None,
            result_text: None,
            scroll: 0,
        }
    }
}

impl Default for TransactionsState {
    fn default() -> Self {
        Self::new()
    }
}

/// Accounts screen state.
pub struct AccountsState {
    pub section: AccountsSection,
    pub identity: TextInput,
    pub loaded_identity: Option<String>,
    pub overview: Option<EntityOverview>,
    pub balance_motes: Option<String>,
    pub total_balance: Option<String>,
    pub available_balance: Option<String>,
    pub self_stake: Option<SelfStakeRow>,
    pub delegations: Vec<DelegationRow>,
    pub undelegations: Vec<UndelegationRow>,
    pub list_selected: usize,
    pub reward_validator: TextInput,
    pub reward_era: TextInput,
    pub reward_delegator: TextInput,
    pub reward_field: usize,
    pub reward_result: Option<Value>,
    pub reward_text: Option<String>,
    pub scroll: u16,
    pub partial_errors: Vec<String>,
}

impl AccountsState {
    pub fn new() -> Self {
        Self {
            section: AccountsSection::Overview,
            identity: TextInput::new(),
            loaded_identity: None,
            overview: None,
            balance_motes: None,
            total_balance: None,
            available_balance: None,
            self_stake: None,
            delegations: Vec::new(),
            undelegations: Vec::new(),
            list_selected: 0,
            reward_validator: TextInput::new(),
            reward_era: TextInput::new(),
            reward_delegator: TextInput::new(),
            reward_field: 0,
            reward_result: None,
            reward_text: None,
            scroll: 0,
            partial_errors: Vec::new(),
        }
    }

    pub fn cycle_section(&mut self, forward: bool) {
        self.section = if forward {
            self.section.next()
        } else {
            self.section.prev()
        };
        self.list_selected = 0;
        self.scroll = 0;
    }

    pub fn list_len(&self) -> usize {
        match self.section {
            AccountsSection::NamedKeys => self
                .overview
                .as_ref()
                .map(|o| o.named_keys.len())
                .unwrap_or(0),
            AccountsSection::Delegations => {
                let extra = usize::from(self.self_stake.is_some());
                self.delegations.len() + extra
            }
            AccountsSection::Undelegations => self.undelegations.len(),
            AccountsSection::Overview | AccountsSection::Rewards => 0,
        }
    }

    pub fn reward_field_mut(&mut self) -> &mut TextInput {
        match self.reward_field % 3 {
            0 => &mut self.reward_validator,
            1 => &mut self.reward_era,
            _ => &mut self.reward_delegator,
        }
    }
}

impl Default for AccountsState {
    fn default() -> Self {
        Self::new()
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum ValidatorsSection {
    Validators,
    Bidders,
    Detail,
    Rewards,
}

impl ValidatorsSection {
    pub const ALL: [ValidatorsSection; 4] = [
        Self::Validators,
        Self::Bidders,
        Self::Detail,
        Self::Rewards,
    ];

    pub fn title(self) -> &'static str {
        match self {
            Self::Validators => "Validators",
            Self::Bidders => "Bidders",
            Self::Detail => "Detail",
            Self::Rewards => "Rewards",
        }
    }

    pub fn next(self) -> Self {
        let idx = Self::ALL.iter().position(|s| *s == self).unwrap_or(0);
        Self::ALL[(idx + 1) % Self::ALL.len()]
    }

    pub fn prev(self) -> Self {
        let idx = Self::ALL.iter().position(|s| *s == self).unwrap_or(0);
        let len = Self::ALL.len();
        Self::ALL[(idx + len - 1) % len]
    }
}

/// Validators / Bidders screen state.
pub struct ValidatorsState {
    pub section: ValidatorsSection,
    pub filter: TextInput,
    pub validators: Vec<ValidatorRow>,
    pub bidders: Vec<ValidatorRow>,
    pub raw_auction: Option<Value>,
    pub list_selected: usize,
    pub detail: Option<ValidatorDetail>,
    pub del_selected: usize,
    pub reward_validator: TextInput,
    pub reward_era: TextInput,
    pub reward_delegator: TextInput,
    pub reward_field: usize,
    pub reward_result: Option<Value>,
    pub reward_text: Option<String>,
    pub scroll: u16,
    pub error: Option<String>,
}

impl ValidatorsState {
    pub fn new() -> Self {
        Self {
            section: ValidatorsSection::Validators,
            filter: TextInput::new(),
            validators: Vec::new(),
            bidders: Vec::new(),
            raw_auction: None,
            list_selected: 0,
            detail: None,
            del_selected: 0,
            reward_validator: TextInput::new(),
            reward_era: TextInput::new(),
            reward_delegator: TextInput::new(),
            reward_field: 0,
            reward_result: None,
            reward_text: None,
            scroll: 0,
            error: None,
        }
    }

    pub fn cycle_section(&mut self, forward: bool) {
        self.section = if forward {
            self.section.next()
        } else {
            self.section.prev()
        };
        self.list_selected = 0;
        self.del_selected = 0;
        self.scroll = 0;
    }

    pub fn filtered_validators(&self) -> Vec<&ValidatorRow> {
        filter_rows(&self.validators, self.filter.buffer.trim())
    }

    pub fn filtered_bidders(&self) -> Vec<&ValidatorRow> {
        filter_rows(&self.bidders, self.filter.buffer.trim())
    }

    pub fn list_len(&self) -> usize {
        match self.section {
            ValidatorsSection::Validators => self.filtered_validators().len(),
            ValidatorsSection::Bidders => self.filtered_bidders().len(),
            ValidatorsSection::Detail => self
                .detail
                .as_ref()
                .map(|d| d.delegators.len())
                .unwrap_or(0),
            ValidatorsSection::Rewards => 0,
        }
    }

    pub fn reward_field_mut(&mut self) -> &mut TextInput {
        match self.reward_field % 3 {
            0 => &mut self.reward_validator,
            1 => &mut self.reward_era,
            _ => &mut self.reward_delegator,
        }
    }

    pub fn apply_auction(&mut self, auction: Value) {
        use crate::auction_view::{list_bidders, list_validators};
        self.validators = list_validators(&auction);
        self.bidders = list_bidders(&auction);
        if let Some(detail) = &self.detail {
            let pk = detail.validator.public_key.clone();
            self.detail = crate::auction_view::get_validator(&auction, &pk);
        }
        self.raw_auction = Some(auction);
        self.error = None;
        self.list_selected = 0;
        self.del_selected = 0;
    }
}

impl Default for ValidatorsState {
    fn default() -> Self {
        Self::new()
    }
}

fn filter_rows<'a>(rows: &'a [ValidatorRow], needle: &str) -> Vec<&'a ValidatorRow> {
    if needle.is_empty() {
        return rows.iter().collect();
    }
    let n = needle.to_ascii_lowercase();
    rows.iter()
        .filter(|r| r.public_key.to_ascii_lowercase().contains(&n))
        .collect()
}

/// Contracts screen state.
pub struct ContractsState {
    pub section: ContractsSection,
    pub lookup: TextInput,
    pub loaded_key: Option<String>,
    pub overview: Option<ContractOverview>,
    pub list_selected: usize,
    pub query_path: TextInput,
    pub dict_seed: TextInput,
    pub dict_item: TextInput,
    pub dict_srh: TextInput,
    pub dict_field: usize,
    pub query_result: Option<Value>,
    pub query_result_text: Option<String>,
    pub scroll: u16,
}

impl ContractsState {
    pub fn new() -> Self {
        Self {
            section: ContractsSection::Overview,
            lookup: TextInput::new(),
            loaded_key: None,
            overview: None,
            list_selected: 0,
            query_path: TextInput::new(),
            dict_seed: TextInput::new(),
            dict_item: TextInput::new(),
            dict_srh: TextInput::new(),
            dict_field: 0,
            query_result: None,
            query_result_text: None,
            scroll: 0,
        }
    }

    pub fn cycle_section(&mut self, forward: bool, enable_writes: bool) {
        self.section = if forward {
            self.section.next(enable_writes)
        } else {
            self.section.prev(enable_writes)
        };
        self.list_selected = 0;
        self.scroll = 0;
    }

    pub fn list_len(&self) -> usize {
        match self.section {
            ContractsSection::NamedKeys => self
                .overview
                .as_ref()
                .map(|o| o.named_keys.len())
                .unwrap_or(0),
            ContractsSection::EntryPoints => self
                .overview
                .as_ref()
                .map(|o| o.entry_points.len())
                .unwrap_or(0),
            _ => 0,
        }
    }

    pub fn dict_field_mut(&mut self) -> &mut TextInput {
        match self.dict_field % 3 {
            0 => &mut self.dict_seed,
            1 => &mut self.dict_item,
            _ => &mut self.dict_srh,
        }
    }
}

impl Default for ContractsState {
    fn default() -> Self {
        Self::new()
    }
}

/// Actions screen state.
pub struct ActionsState {
    pub selected: usize,
    pub pane: ActionsPane,
    pub form_method: Option<&'static str>,
    pub form_fields: Vec<TextInput>,
    pub form_field_idx: usize,
    pub last_result: Option<Value>,
    pub last_result_text: Option<String>,
    pub last_method: Option<String>,
    pub result_scroll: u16,
}

impl ActionsState {
    pub fn new() -> Self {
        Self {
            selected: 0,
            pane: ActionsPane::List,
            form_method: None,
            form_fields: Vec::new(),
            form_field_idx: 0,
            last_result: None,
            last_result_text: None,
            last_method: None,
            result_scroll: 0,
        }
    }

    pub fn clamp_selected(&mut self, enable_writes: bool, has_pem: bool) {
        let n = visible_actions(enable_writes, has_pem).len();
        if n == 0 {
            self.selected = 0;
        } else if self.selected >= n {
            self.selected = n - 1;
        }
    }

    pub fn selected_spec(&self, enable_writes: bool, has_pem: bool) -> &'static ActionSpec {
        let visible = visible_actions(enable_writes, has_pem);
        if visible.is_empty() {
            &crate::actions_catalog::ACTIONS[0]
        } else {
            visible[self.selected.min(visible.len() - 1)]
        }
    }

    pub fn open_or_run_selected(&mut self, enable_writes: bool, has_pem: bool) -> ActionLaunch {
        let spec = self.selected_spec(enable_writes, has_pem);
        if spec.args.is_empty() {
            ActionLaunch::Run {
                method: spec.id,
                args: HashMap::new(),
            }
        } else {
            self.form_method = Some(spec.id);
            self.form_fields = spec.args.iter().map(|_| TextInput::new()).collect();
            self.form_field_idx = 0;
            self.pane = ActionsPane::Form;
            ActionLaunch::NeedForm
        }
    }

    pub fn collect_form_args(&self) -> Option<(&'static str, HashMap<String, String>)> {
        let method = self.form_method?;
        let spec = find_action(method)?;
        let mut args = HashMap::new();
        for (i, arg) in spec.args.iter().enumerate() {
            let val = self
                .form_fields
                .get(i)
                .map(|f| f.buffer.trim().to_string())
                .unwrap_or_default();
            if arg.required && val.is_empty() {
                return None;
            }
            if !val.is_empty() {
                args.insert(arg.name.to_string(), val);
            }
        }
        Some((method, args))
    }

    pub fn close_form(&mut self) {
        self.pane = ActionsPane::List;
        self.form_method = None;
        self.form_fields.clear();
        self.form_field_idx = 0;
    }
}

impl Default for ActionsState {
    fn default() -> Self {
        Self::new()
    }
}

pub enum ActionLaunch {
    NeedForm,
    Run {
        method: &'static str,
        args: HashMap<String, String>,
    },
}

/// Writes screen: Transfer / stake form + Build → Sign → Put.
pub struct WritesState {
    pub kind: WriteKind,
    pub stage: WriteStage,
    pub target: TextInput,
    pub amount: TextInput,
    pub payment: TextInput,
    pub validator: TextInput,
    pub new_validator: TextInput,
    pub field_idx: usize,
    pub unsigned: Option<Value>,
    pub signed: Option<Value>,
    pub put_result: Option<Value>,
    pub preview_text: Option<String>,
    pub last_tx_hash: Option<String>,
    pub scroll: u16,
}

impl WritesState {
    pub fn new() -> Self {
        Self {
            kind: WriteKind::Transfer,
            stage: WriteStage::Form,
            target: TextInput::new(),
            amount: TextInput::from_string(DEFAULT_TRANSFER_MOTES),
            payment: TextInput::from_string(DEFAULT_PAYMENT_MOTES),
            validator: TextInput::new(),
            new_validator: TextInput::new(),
            field_idx: 0,
            unsigned: None,
            signed: None,
            put_result: None,
            preview_text: None,
            last_tx_hash: None,
            scroll: 0,
        }
    }

    pub fn field_labels(&self) -> Vec<&'static str> {
        match self.kind {
            WriteKind::Transfer => vec!["target", "amount", "payment"],
            WriteKind::Delegate | WriteKind::Undelegate => {
                vec!["validator", "amount", "payment"]
            }
            WriteKind::Redelegate => {
                vec!["validator", "new_validator", "amount", "payment"]
            }
        }
    }

    pub fn field_count(&self) -> usize {
        self.field_labels().len()
    }

    pub fn field_at(&self, i: usize) -> &TextInput {
        match self.kind {
            WriteKind::Transfer => match i {
                0 => &self.target,
                1 => &self.amount,
                _ => &self.payment,
            },
            WriteKind::Delegate | WriteKind::Undelegate => match i {
                0 => &self.validator,
                1 => &self.amount,
                _ => &self.payment,
            },
            WriteKind::Redelegate => match i {
                0 => &self.validator,
                1 => &self.new_validator,
                2 => &self.amount,
                _ => &self.payment,
            },
        }
    }

    pub fn field_at_mut(&mut self, i: usize) -> &mut TextInput {
        match self.kind {
            WriteKind::Transfer => match i {
                0 => &mut self.target,
                1 => &mut self.amount,
                _ => &mut self.payment,
            },
            WriteKind::Delegate | WriteKind::Undelegate => match i {
                0 => &mut self.validator,
                1 => &mut self.amount,
                _ => &mut self.payment,
            },
            WriteKind::Redelegate => match i {
                0 => &mut self.validator,
                1 => &mut self.new_validator,
                2 => &mut self.amount,
                _ => &mut self.payment,
            },
        }
    }

    pub fn cycle_kind(&mut self, forward: bool) {
        self.kind = if forward {
            self.kind.next()
        } else {
            self.kind.prev()
        };
        self.field_idx = 0;
        self.stage = WriteStage::Form;
        self.unsigned = None;
        self.signed = None;
        self.put_result = None;
        self.preview_text = None;
        self.scroll = 0;
    }

    pub fn set_preview(&mut self, value: &Value) {
        self.preview_text =
            Some(serde_json::to_string_pretty(value).unwrap_or_else(|_| value.to_string()));
        self.scroll = 0;
    }
}

impl Default for WritesState {
    fn default() -> Self {
        Self::new()
    }
}

/// Wait screen pane: inclusion wait vs bounded SSE collect.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum WaitPane {
    WaitTx,
    SseCollect,
}

impl WaitPane {
    pub const ALL: [WaitPane; 2] = [Self::WaitTx, Self::SseCollect];

    pub fn title(self) -> &'static str {
        match self {
            Self::WaitTx => "Wait tx",
            Self::SseCollect => "SSE collect",
        }
    }

    pub fn next(self) -> Self {
        match self {
            Self::WaitTx => Self::SseCollect,
            Self::SseCollect => Self::WaitTx,
        }
    }
}

/// Default SSE event-name toggles (label, enabled).
fn default_event_names() -> Vec<(String, bool)> {
    vec![
        ("BlockAdded".into(), true),
        ("TransactionAccepted".into(), true),
        ("TransactionProcessed".into(), true),
        ("TransactionExpired".into(), false),
        ("FinalitySignature".into(), false),
        ("Step".into(), false),
        ("Fault".into(), false),
    ]
}

/// Wait / SSE collect session state.
pub struct WaitState {
    pub pane: WaitPane,
    pub hash: TextInput,
    pub events_url: TextInput,
    pub timeout_ms: TextInput,
    pub max_events: TextInput,
    pub field_idx: usize,
    pub name_idx: usize,
    pub event_names: Vec<(String, bool)>,
    pub waiting: bool,
    pub result_text: Option<String>,
    pub scroll: u16,
}

impl WaitState {
    pub fn new(events_url: &str) -> Self {
        Self {
            pane: WaitPane::WaitTx,
            hash: TextInput::new(),
            events_url: TextInput::from_string(events_url),
            timeout_ms: TextInput::from_string("60000"),
            max_events: TextInput::from_string("10"),
            field_idx: 0,
            name_idx: 0,
            event_names: default_event_names(),
            waiting: false,
            result_text: None,
            scroll: 0,
        }
    }

    pub fn field_count(&self) -> usize {
        3
    }

    pub fn field_at_mut(&mut self, i: usize) -> &mut TextInput {
        match self.pane {
            WaitPane::WaitTx => match i {
                0 => &mut self.hash,
                1 => &mut self.events_url,
                _ => &mut self.timeout_ms,
            },
            WaitPane::SseCollect => match i {
                0 => &mut self.events_url,
                1 => &mut self.max_events,
                _ => &mut self.timeout_ms,
            },
        }
    }

    pub fn selected_event_names(&self) -> Vec<String> {
        self.event_names
            .iter()
            .filter(|(_, on)| *on)
            .map(|(n, _)| n.clone())
            .collect()
    }

    pub fn toggle_selected_name(&mut self) {
        if let Some((_, on)) = self.event_names.get_mut(self.name_idx) {
            *on = !*on;
        }
    }

    pub fn set_result(&mut self, value: &Value) {
        self.result_text =
            Some(serde_json::to_string_pretty(value).unwrap_or_else(|_| value.to_string()));
        self.scroll = 0;
        self.waiting = false;
    }
}

impl Default for WaitState {
    fn default() -> Self {
        Self::new("")
    }
}

/// Mutable UI + session state.
pub struct AppModel {
    pub view: ViewMode,
    pub input_mode: InputMode,
    pub status: String,
    pub error: Option<String>,
    pub rpc_url: String,
    pub events_url: String,
    pub preset_label: String,
    pub network: Option<NetworkSnapshot>,
    pub body_scroll: u16,
    pub pending: bool,
    pub last_refresh: Option<Instant>,
    pub min_refresh: Duration,
    pub palette: CommandPalette,
    pub rpc_edit: TextInput,
    pub pem_path_input: TextInput,
    pub actions: ActionsState,
    pub blocks: BlocksState,
    pub transactions: TransactionsState,
    pub accounts: AccountsState,
    pub validators: ValidatorsState,
    pub contracts: ContractsState,
    pub writes: WritesState,
    pub wait: WaitState,
    pub enable_writes: bool,
    pub secret_key_pem: Option<String>,
    pub public_key: String,
    pub policy: WritePolicy,
    pub chain_name: String,
    pub tick: u64,
    pub tip_index: usize,
}

impl AppModel {
    pub fn new(
        rpc_url: String,
        events_url: String,
        preset_label: String,
        enable_writes: bool,
        policy: WritePolicy,
        chain_name: String,
    ) -> Self {
        Self {
            view: ViewMode::Network,
            input_mode: InputMode::Normal,
            status: format!(
                "ready | {} | press r to wake the network spirits",
                preset_label
            ),
            error: None,
            rpc_url,
            events_url: events_url.clone(),
            preset_label,
            network: None,
            body_scroll: 0,
            pending: false,
            last_refresh: None,
            min_refresh: Duration::from_millis(400),
            palette: CommandPalette::new(),
            rpc_edit: TextInput::new(),
            pem_path_input: TextInput::new(),
            actions: ActionsState::new(),
            blocks: BlocksState::new(),
            transactions: TransactionsState::new(),
            accounts: AccountsState::new(),
            validators: ValidatorsState::new(),
            contracts: ContractsState::new(),
            writes: WritesState::new(),
            wait: WaitState::new(&events_url),
            enable_writes,
            secret_key_pem: None,
            public_key: String::new(),
            policy,
            chain_name,
            tick: 0,
            tip_index: 0,
        }
    }

    /// Prefill Wait hash from last put and open Wait form.
    pub fn open_wait_with_last_hash(&mut self) {
        if let Some(hash) = self.writes.last_tx_hash.clone() {
            self.wait.hash.set(hash);
        }
        self.view = ViewMode::Wait;
        self.wait.pane = WaitPane::WaitTx;
        self.open_wait_form();
    }

    pub fn open_wait_form(&mut self) {
        self.view = ViewMode::Wait;
        self.input_mode = InputMode::WaitForm;
        self.wait.field_idx = 0;
        self.set_status("wait form | Tab fields | Enter leave | w start");
    }

    pub fn has_pem(&self) -> bool {
        self.secret_key_pem
            .as_ref()
            .map(|p| !p.trim().is_empty())
            .unwrap_or(false)
    }

    pub fn load_pem_from_path(&mut self, path: &str) -> Result<(), String> {
        let (pem, public_key) = load_pem_file(path)?;
        self.secret_key_pem = Some(pem);
        self.public_key = public_key;
        self.clear_error();
        Ok(())
    }

    pub fn unload_pem(&mut self) {
        self.secret_key_pem = None;
        self.public_key.clear();
        self.actions.clamp_selected(self.enable_writes, false);
    }

    pub fn open_load_pem(&mut self) {
        if !self.enable_writes {
            self.set_error("writes disabled | restart with --enable-writes");
            return;
        }
        self.view = ViewMode::Writes;
        self.input_mode = InputMode::LoadPem;
        self.set_status("PEM path | Enter load | Esc cancel");
    }

    pub fn open_write_form(&mut self) {
        if !self.enable_writes {
            self.set_error("writes disabled | restart with --enable-writes");
            return;
        }
        self.view = ViewMode::Writes;
        self.input_mode = InputMode::WriteForm;
        self.writes.field_idx = 0;
        self.set_status("write form | Tab fields | Esc leave");
    }

    pub fn begin_write_job(&mut self, msg: impl Into<String>) {
        self.pending = true;
        self.last_refresh = Some(Instant::now());
        self.clear_error();
        self.set_status(msg);
    }

    pub fn set_status(&mut self, msg: impl Into<String>) {
        self.status = msg.into();
    }

    pub fn set_error(&mut self, msg: impl Into<String>) {
        self.error = Some(msg.into());
    }

    pub fn clear_error(&mut self) {
        self.error = None;
    }

    pub fn can_refresh(&self) -> bool {
        !self.pending
            && self
                .last_refresh
                .map(|t| t.elapsed() >= self.min_refresh)
                .unwrap_or(true)
    }

    pub fn begin_network_refresh(&mut self) {
        self.pending = true;
        self.last_refresh = Some(Instant::now());
        self.clear_error();
        self.set_status("rattling five chains in parallel... Network seance");
    }

    pub fn begin_action(&mut self, method: &str) {
        self.pending = true;
        self.clear_error();
        self.set_status(format!("casting {method}... don't cross the streams"));
    }

    pub fn begin_blocks_job(&mut self, msg: impl Into<String>) {
        self.pending = true;
        self.last_refresh = Some(Instant::now());
        self.clear_error();
        self.set_status(msg);
    }

    pub fn apply_rpc(&mut self, event: RpcEvent) {
        self.pending = false;
        match event {
            RpcEvent::Network(snap) => {
                let had_errs = !snap.partial_errors.is_empty();
                self.network = Some(snap);
                self.body_scroll = 0;
                if had_errs {
                    self.set_status("network mostly haunted | see partial errors in table");
                } else {
                    self.set_status("network snapshot loaded | the ghost is home");
                    self.clear_error();
                }
            }
            RpcEvent::Action { method, result } => match result {
                Ok(value) => {
                    let text =
                        serde_json::to_string_pretty(&value).unwrap_or_else(|_| value.to_string());
                    self.actions.last_result = Some(value);
                    self.actions.last_result_text = Some(text);
                    self.actions.last_method = Some(method.clone());
                    self.actions.result_scroll = 0;
                    self.actions.close_form();
                    self.actions.pane = ActionsPane::Result;
                    self.view = ViewMode::Actions;
                    self.set_status(format!("{method} ok | scroll the ectoplasm with j/k"));
                    self.clear_error();
                }
                Err(err) => {
                    self.set_error(err);
                    self.set_status(format!("{method} failed | last good result kept"));
                    self.view = ViewMode::Actions;
                }
            },
            RpcEvent::LatestBlocks(Ok(rows)) => {
                let n = rows.len();
                self.blocks.rows = rows;
                self.blocks.selected = 0;
                self.blocks.pane = BlocksPane::List;
                self.blocks.scroll = 0;
                self.view = ViewMode::Blocks;
                self.set_status(format!("latest {n} blocks stacked | Enter opens a brick"));
                self.clear_error();
            }
            RpcEvent::LatestBlocks(Err(err)) => {
                self.set_error(err);
                self.set_status("latest blocks failed | the masonry collapsed");
                self.view = ViewMode::Blocks;
            }
            RpcEvent::BlockDetail { block, transfers } => {
                match block {
                    Ok(value) => {
                        match crate::block_view::block_row_from_value(&value) {
                            Ok(row) => {
                                self.blocks.detail_row = Some(row);
                            }
                            Err(err) => self.set_error(format!("parse block: {err}")),
                        }
                        self.blocks.detail_json = Some(value);
                        self.blocks.tx_selected = 0;
                        self.blocks.pane = BlocksPane::Detail;
                        self.blocks.scroll = 0;
                        self.view = ViewMode::Blocks;
                        self.set_status("block detail | Enter a tx hash jumps to Txs");
                        self.clear_error();
                    }
                    Err(err) => {
                        self.set_error(err);
                        self.set_status("block lookup failed");
                        self.view = ViewMode::Blocks;
                    }
                }
                match transfers {
                    Ok(value) => {
                        self.blocks.transfers = crate::block_view::transfers_from_value(&value);
                    }
                    Err(err) => {
                        // Non-fatal: transfers optional.
                        self.blocks.transfers.clear();
                        if self.error.is_none() {
                            self.set_status(format!("block ok | transfers shy ({err})"));
                        }
                    }
                }
            }
            RpcEvent::Transaction(Ok(value)) => {
                let text =
                    serde_json::to_string_pretty(&value).unwrap_or_else(|_| value.to_string());
                self.transactions.result = Some(value);
                self.transactions.result_text = Some(text);
                self.transactions.scroll = 0;
                self.view = ViewMode::Transactions;
                self.set_status("transaction loaded | scroll with j/k");
                self.clear_error();
            }
            RpcEvent::Transaction(Err(err)) => {
                self.set_error(err);
                self.set_status("transaction lookup failed");
                self.view = ViewMode::Transactions;
            }
            RpcEvent::Account(load) => {
                self.apply_account_load(load);
            }
            RpcEvent::ValidatorsAuction(Ok(value)) => {
                self.validators.apply_auction(value);
                self.pending = false;
                self.set_status(format!(
                    "validators {} | bidders {} | Tab sections | / filter | Enter detail",
                    self.validators.validators.len(),
                    self.validators.bidders.len()
                ));
                self.clear_error();
            }
            RpcEvent::ValidatorsAuction(Err(err)) => {
                self.pending = false;
                self.validators.error = Some(err.clone());
                self.set_error(err);
                self.set_status("auction load failed");
            }
            RpcEvent::Reward(Ok(value)) => {
                let text =
                    serde_json::to_string_pretty(&value).unwrap_or_else(|_| value.to_string());
                if self.view == ViewMode::Validators {
                    self.validators.reward_result = Some(value);
                    self.validators.reward_text = Some(text);
                    self.validators.scroll = 0;
                    self.validators.section = ValidatorsSection::Rewards;
                } else {
                    self.accounts.reward_result = Some(value);
                    self.accounts.reward_text = Some(text);
                    self.accounts.scroll = 0;
                    self.accounts.section = AccountsSection::Rewards;
                    self.view = ViewMode::Accounts;
                }
                self.set_status("reward loaded | scroll with j/k");
                self.clear_error();
            }
            RpcEvent::Reward(Err(err)) => {
                self.set_error(err);
                self.set_status("reward lookup failed | era ghosts withhold");
                if self.view == ViewMode::Validators {
                    self.validators.section = ValidatorsSection::Rewards;
                } else {
                    self.view = ViewMode::Accounts;
                    self.accounts.section = AccountsSection::Rewards;
                }
            }
            RpcEvent::Contract(Ok(load)) => {
                match crate::contract_view::parse_contract_overview(&load.key, &load.raw) {
                    Ok(overview) => {
                        let n_ep = overview.entry_points.len();
                        let n_nk = overview.named_keys.len();
                        self.contracts.overview = Some(overview);
                        self.contracts.loaded_key = Some(load.key);
                        self.contracts.list_selected = 0;
                        self.contracts.scroll = 0;
                        self.contracts.section = ContractsSection::Overview;
                        self.view = ViewMode::Contracts;
                        self.set_status(format!(
                            "contract loaded | {n_ep} entry points, {n_nk} named keys"
                        ));
                        self.clear_error();
                    }
                    Err(err) => {
                        self.set_error(err);
                        self.set_status("contract parse failed");
                        self.view = ViewMode::Contracts;
                    }
                }
            }
            RpcEvent::Contract(Err(err)) => {
                self.set_error(err);
                self.set_status("contract lookup failed");
                self.view = ViewMode::Contracts;
            }
            RpcEvent::ContractQuery(Ok(value)) => {
                let text =
                    serde_json::to_string_pretty(&value).unwrap_or_else(|_| value.to_string());
                self.contracts.query_result = Some(value);
                self.contracts.query_result_text = Some(text);
                self.contracts.scroll = 0;
                self.view = ViewMode::Contracts;
                self.set_status("contract query ok | scroll with j/k");
                self.clear_error();
            }
            RpcEvent::ContractQuery(Err(err)) => {
                self.set_error(err);
                self.set_status("contract query failed");
                self.view = ViewMode::Contracts;
            }
            RpcEvent::WriteBuild(result) => self.apply_write_build(result),
            RpcEvent::WriteSign(result) => self.apply_write_sign(result),
            RpcEvent::WritePut(result) => self.apply_write_put(result),
            RpcEvent::WaitDone(result) => self.apply_wait_done(result),
            RpcEvent::SseCollect(result) => self.apply_sse_collect(result),
        }
    }

    fn apply_wait_done(&mut self, result: Result<Value, String>) {
        self.view = ViewMode::Wait;
        self.wait.waiting = false;
        match result {
            Ok(value) => {
                self.wait.set_result(&value);
                self.set_status("wait done | inclusion confirmed");
                self.clear_error();
            }
            Err(err) => {
                self.set_error(err);
                self.set_status("wait failed");
            }
        }
    }

    fn apply_sse_collect(&mut self, result: Result<Value, String>) {
        self.view = ViewMode::Wait;
        self.wait.waiting = false;
        match result {
            Ok(value) => {
                self.wait.set_result(&value);
                let n = value.as_array().map(|a| a.len()).unwrap_or(0);
                self.set_status(format!("SSE collect ok | {n} event(s)"));
                self.clear_error();
            }
            Err(err) => {
                self.set_error(err);
                self.set_status("SSE collect failed");
            }
        }
    }

    fn apply_write_build(&mut self, result: Result<Value, String>) {
        self.view = ViewMode::Writes;
        match result {
            Ok(value) => {
                self.writes.set_preview(&value);
                self.writes.unsigned = Some(value);
                self.writes.signed = None;
                self.writes.put_result = None;
                self.writes.last_tx_hash = None;
                self.writes.stage = WriteStage::Preview;
                self.set_status("unsigned built | press s to sign (PEM required)");
                self.clear_error();
            }
            Err(err) => {
                self.set_error(err);
                self.set_status("build failed");
            }
        }
    }

    fn apply_write_sign(&mut self, result: Result<Value, String>) {
        self.view = ViewMode::Writes;
        match result {
            Ok(value) => {
                self.writes.set_preview(&value);
                self.writes.signed = Some(value);
                self.writes.stage = WriteStage::Signed;
                self.set_status("signed | press p to put (policy checked)");
                self.clear_error();
            }
            Err(err) => {
                self.set_error(err);
                self.set_status("sign failed");
            }
        }
    }

    fn apply_write_put(&mut self, result: Result<Value, String>) {
        self.view = ViewMode::Writes;
        match result {
            Ok(value) => {
                self.writes.last_tx_hash = extract_tx_hash(&value);
                self.writes.set_preview(&value);
                self.writes.put_result = Some(value);
                self.writes.stage = WriteStage::Result;
                let hash = self
                    .writes
                    .last_tx_hash
                    .as_deref()
                    .unwrap_or("(no hash in result)");
                self.set_status(format!("put ok | hash {hash} | press 9 then w to wait"));
                self.clear_error();
                if let Some(h) = self.writes.last_tx_hash.clone() {
                    self.wait.hash.set(h);
                }
            }
            Err(err) => {
                self.set_error(err);
                self.set_status("put failed");
            }
        }
    }

    fn apply_account_load(&mut self, load: AccountLoadResult) {
        use crate::account_view::{
            parse_balance_details, parse_balance_motes, parse_entity_overview,
        };
        use crate::auction_view::{filter_account_stakes, AccountMatchKeys};

        self.view = ViewMode::Accounts;
        self.accounts.loaded_identity = Some(load.identity.clone());
        self.accounts.partial_errors.clear();
        self.accounts.scroll = 0;
        self.accounts.list_selected = 0;
        self.accounts.overview = None;
        self.accounts.balance_motes = None;
        self.accounts.total_balance = None;
        self.accounts.available_balance = None;
        self.accounts.self_stake = None;
        self.accounts.delegations.clear();
        self.accounts.undelegations.clear();

        let mut match_keys = AccountMatchKeys::from_identity(&load.identity);

        match load.entity {
            Ok(value) => match parse_entity_overview(&value) {
                Ok(overview) => {
                    match_keys = match_keys.with_entity_fields(
                        overview.account_hash.clone(),
                        overview.main_purse.clone(),
                    );
                    self.accounts.overview = Some(overview);
                }
                Err(err) => self
                    .accounts
                    .partial_errors
                    .push(format!("entity parse: {err}")),
            },
            Err(err) => self.accounts.partial_errors.push(format!("entity: {err}")),
        }

        match load.balance {
            Ok(value) => self.accounts.balance_motes = parse_balance_motes(&value),
            Err(err) => self.accounts.partial_errors.push(format!("balance: {err}")),
        }

        match load.balance_details {
            Ok(value) => {
                let (total, available) = parse_balance_details(&value);
                self.accounts.total_balance = total;
                self.accounts.available_balance = available;
            }
            Err(err) => self
                .accounts
                .partial_errors
                .push(format!("balance_details: {err}")),
        }

        match load.auction {
            Ok(value) => {
                let (self_stake, dels, undels) = filter_account_stakes(&value, &match_keys);
                self.accounts.self_stake = self_stake;
                self.accounts.delegations = dels;
                self.accounts.undelegations = undels;
            }
            Err(err) => self.accounts.partial_errors.push(format!("auction: {err}")),
        }

        if self.accounts.overview.is_none() && self.accounts.balance_motes.is_none() {
            self.set_error("account load found neither entity nor balance");
            self.set_status("account load failed | check the identity hex");
        } else if self.accounts.partial_errors.is_empty() {
            self.set_status("account loaded | Tab cycles Overview/Keys/Dels/Rewards");
            self.clear_error();
        } else {
            self.set_status("account mostly loaded | see partial errors in Overview");
        }
    }

    pub fn open_command(&mut self) {
        self.input_mode = InputMode::Command;
        self.palette.open();
    }

    pub fn close_command(&mut self) {
        self.input_mode = InputMode::Normal;
        self.palette.close();
    }

    pub fn open_rpc_edit(&mut self) {
        self.input_mode = InputMode::EditRpc;
        self.rpc_edit.set(self.rpc_url.clone());
        self.set_status("edit RPC URL | Enter apply | Esc cancel");
    }

    pub fn close_rpc_edit(&mut self) {
        self.input_mode = InputMode::Normal;
        self.rpc_edit.clear();
    }

    pub fn open_block_lookup(&mut self) {
        self.view = ViewMode::Blocks;
        self.input_mode = InputMode::BlockLookup;
        self.set_status("lookup block height/hash | Enter fetch | Esc cancel");
    }

    pub fn open_tx_lookup(&mut self) {
        self.view = ViewMode::Transactions;
        self.input_mode = InputMode::TxLookup;
        self.set_status("paste a transaction hash | Enter fetch | Esc cancel");
    }

    pub fn open_account_lookup(&mut self) {
        self.view = ViewMode::Accounts;
        self.input_mode = InputMode::AccountLookup;
        self.set_status("paste pubkey / account-hash / entity | Enter load | Esc cancel");
    }

    pub fn open_account_reward_form(&mut self) {
        self.view = ViewMode::Accounts;
        self.accounts.section = AccountsSection::Rewards;
        self.input_mode = InputMode::AccountReward;
        self.accounts.reward_field = 0;
        self.set_status("reward form | Tab fields | Enter fetch | Esc cancel");
    }

    pub fn open_validator_filter(&mut self) {
        self.view = ViewMode::Validators;
        self.input_mode = InputMode::ValidatorFilter;
        self.set_status("filter public key substring | Enter apply | Esc cancel");
    }

    pub fn open_validator_reward_form(&mut self) {
        self.view = ViewMode::Validators;
        self.validators.section = ValidatorsSection::Rewards;
        if self.validators.reward_validator.buffer.trim().is_empty() {
            if let Some(d) = &self.validators.detail {
                self.validators
                    .reward_validator
                    .set(d.validator.public_key.clone());
            }
        }
        self.input_mode = InputMode::AccountReward;
        self.validators.reward_field = 0;
        self.set_status("validator reward | Tab fields | Enter fetch | Esc cancel");
    }

    pub fn begin_validators_job(&mut self, msg: impl Into<String>) {
        self.pending = true;
        self.last_refresh = Some(Instant::now());
        self.clear_error();
        self.set_status(msg);
    }

    pub fn begin_account_job(&mut self, msg: impl Into<String>) {
        self.pending = true;
        self.last_refresh = Some(Instant::now());
        self.clear_error();
        self.set_status(msg);
    }

    pub fn open_contract_lookup(&mut self) {
        self.view = ViewMode::Contracts;
        self.input_mode = InputMode::ContractLookup;
        self.set_status("paste hash-/package-/auction|mint | Enter load | Esc cancel");
    }

    pub fn open_contract_query_key(&mut self) {
        self.view = ViewMode::Contracts;
        self.contracts.section = ContractsSection::QueryKey;
        self.input_mode = InputMode::ContractQueryKey;
        if self.contracts.query_path.buffer.is_empty() {
            self.contracts.query_path.set("era_id");
        }
        self.set_status("query path | Enter submit | Esc cancel");
    }

    pub fn open_contract_query_dict(&mut self) {
        self.view = ViewMode::Contracts;
        self.contracts.section = ContractsSection::QueryDict;
        self.input_mode = InputMode::ContractQueryDict;
        self.contracts.dict_field = 0;
        self.set_status("dict form | Tab fields | Enter submit | Esc cancel");
    }

    pub fn begin_contract_job(&mut self, msg: impl Into<String>) {
        self.pending = true;
        self.last_refresh = Some(Instant::now());
        self.clear_error();
        self.set_status(msg);
    }
}

/// Rotating status-bar tips (idle chrome).
pub const TIPS: &[&str] = &[
    "tip: r runs a five-RPC Network seance in parallel",
    "tip: e edits the RPC URL without restarting the seance",
    "tip: 7 Actions | Enter a spell | Tab fields | boom JSON",
    "tip: mouse select+copy works (no mouse capture)",
    "tip: Up/Down in : recalls past spells",
    "tip: Tab completes commands, views, and ~/paths",
    "tip: q restores your shell like a polite ghost",
    "tip: NCTL asleep? even Casper cannot haunt empty ports",
    "tip: 4 Accounts | / paste faucet pubkey | Enter wakes the wallet",
    "tip: Accounts Tab cycles Overview / Named keys / Dels / Rewards",
    "tip: 6 Contracts | / auction then Enter | Tab to Entry points",
    "tip: --enable-writes then o loads a PEM; 8 Writes | b/s/p or t",
];
