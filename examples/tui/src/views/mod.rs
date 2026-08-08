//! View widgets.

mod accounts;
mod actions;
mod blocks;
mod contracts;
mod help;
mod network;
mod placeholder;
mod transactions;
mod wait;
mod writes;

pub use accounts::draw_accounts;
pub use actions::draw_actions;
pub use blocks::draw_blocks;
pub use contracts::draw_contracts;
pub use help::draw_help;
pub use network::draw_network;
pub use placeholder::draw_coming_soon;
pub use transactions::draw_transactions;
pub use wait::draw_wait;
pub use writes::draw_writes;
