//! Session PEM held only in the Rust process (never sent to the webview).

use std::sync::Mutex;
use zeroize::Zeroize;

#[derive(Default)]
pub struct Session {
    inner: Mutex<Option<SessionKey>>,
}

struct SessionKey {
    pem: String,
    public_key: String,
}

impl Drop for SessionKey {
    fn drop(&mut self) {
        self.pem.zeroize();
    }
}

impl Session {
    pub fn unlock(&self, pem: String, public_key: String) {
        *self.inner.lock().expect("session lock") = Some(SessionKey { pem, public_key });
    }

    pub fn unload(&self) {
        *self.inner.lock().expect("session lock") = None;
    }

    pub fn public_key(&self) -> Option<String> {
        self.inner
            .lock()
            .expect("session lock")
            .as_ref()
            .map(|s| s.public_key.clone())
    }

    pub fn with_pem<T, F>(&self, f: F) -> Result<T, String>
    where
        F: FnOnce(&str, &str) -> Result<T, String>,
    {
        let guard = self.inner.lock().expect("session lock");
        let Some(session) = guard.as_ref() else {
            return Err("no key unlocked; unlock a PEM first".into());
        };
        f(&session.pem, &session.public_key)
    }
}
