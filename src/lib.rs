pub mod helpers;
pub mod types;

pub(crate) mod sdk;
pub use sdk::*;

#[cfg(feature = "js")]
pub(crate) mod js;
#[cfg(feature = "js")]
pub use js::externs as debug;

/// Native log/error when the `js` feature (and `js::externs`) is off.
#[cfg(not(feature = "js"))]
pub(crate) mod debug {
    pub fn log(s: &str) {
        println!("log wasm {s}");
    }

    pub fn error(s: &str) {
        println!("error wasm {s}");
    }
}
