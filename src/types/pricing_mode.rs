use casper_types::PricingMode as _PricingMode;
use wasm_bindgen::prelude::*;

#[derive(Copy, Clone, Default, Debug, PartialEq, Eq)]
#[wasm_bindgen]
pub enum PricingMode {
    #[default]
    Fixed,
    Classic,
    Reserved,
}

impl PricingMode {
    pub const FIXED: &'static str = "fixed";
    pub const CLASSIC: &'static str = "classic";
    pub const RESERVED: &'static str = "reserved";
}

// impl From<PricingMode> for _PricingMode {
//     fn from(pricing_mode: PricingMode) -> Self {
//         match pricing_mode {
//             PricingMode::Fixed => _PricingMode::Fixed,
//             PricingMode::Classic => _PricingMode::Classic,
//             PricingMode::Reserved => _PricingMode::Reserved,
//         }
//     }
// }

impl From<_PricingMode> for PricingMode {
    fn from(pricing_mode: _PricingMode) -> Self {
        match pricing_mode {
            _PricingMode::Fixed {
                additional_computation_factor: _,
                gas_price_tolerance: _,
            } => PricingMode::Fixed,
            _PricingMode::Classic {
                payment_amount: _,
                gas_price_tolerance: _,
                standard_payment: _,
            } => PricingMode::Classic,
            _PricingMode::Reserved { receipt: _ } => PricingMode::Reserved,
        }
    }
}
