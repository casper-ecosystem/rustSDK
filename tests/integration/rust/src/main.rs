#![cfg(not(test))]

pub mod config;
pub mod tests;
use config::initialize_test_config;
use config::CONFIG;
use lazy_static::lazy_static;
use tokio::sync::Mutex;

#[tokio::main]
async fn main() {
    tests::run_tests_or_examples().await;
}

lazy_static! {
    pub static ref INITIALIZED: Mutex<bool> = Mutex::new(false);
}

// Run async_main if you need to initialize config before running some specific actions that require tests config (not required for examples or basic tests)
pub async fn async_main() -> Result<(), Box<dyn std::error::Error>> {
    let mut initialized_guard = INITIALIZED.lock().await;
    if !*initialized_guard {
        let config = initialize_test_config(true).await?;
        *CONFIG.lock().await = Some(config);
        *initialized_guard = true;
    }
    Ok(())
}
