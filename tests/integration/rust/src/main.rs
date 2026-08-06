#![cfg(not(test))]
#![allow(deprecated)] // legacy Deploy / SessionStrParams coverage

pub mod config;
pub mod tests;
use config::config;
use config::initialize_test_config;
use std::sync::OnceLock;
use tokio::sync::Mutex;

#[tokio::main]
async fn main() {
    tests::run_tests_or_examples().await;
}

static INITIALIZED: OnceLock<Mutex<bool>> = OnceLock::new();

fn initialized() -> &'static Mutex<bool> {
    INITIALIZED.get_or_init(|| Mutex::new(false))
}

// Run async_main if you need to initialize config before running some specific actions that require tests config (not required for examples or basic tests)
pub async fn async_main() -> Result<(), Box<dyn std::error::Error>> {
    let mut initialized_guard = initialized().lock().await;
    if !*initialized_guard {
        let test_config = initialize_test_config(true).await?;
        *config().lock().await = Some(test_config);
        *initialized_guard = true;
    }
    Ok(())
}
