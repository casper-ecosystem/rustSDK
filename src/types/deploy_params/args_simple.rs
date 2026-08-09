#[cfg(feature = "js")]
use js_sys::Array;
#[cfg(feature = "js")]
use wasm_bindgen::prelude::*;

#[cfg_attr(feature = "js", wasm_bindgen)]
#[derive(Default, Debug, Clone)]
pub struct ArgsSimple {
    args: Vec<String>,
}

impl ArgsSimple {
    #[cfg(feature = "js")]
    pub fn new(args: JsValue) -> Self {
        let args: Array = args.into();
        let args: Vec<String> = args
            .iter()
            .map(|value| {
                value
                    .as_string()
                    .unwrap_or_else(|| String::from("Invalid String"))
            })
            .collect();

        ArgsSimple { args }
    }

    pub fn args(&self) -> &[String] {
        &self.args
    }
}

impl From<ArgsSimple> for Vec<String> {
    fn from(args: ArgsSimple) -> Self {
        args.args
    }
}

impl From<Vec<String>> for ArgsSimple {
    fn from(args: Vec<String>) -> Self {
        ArgsSimple { args }
    }
}

#[cfg(feature = "js")]
impl FromIterator<JsValue> for ArgsSimple {
    fn from_iter<I: IntoIterator<Item = JsValue>>(iter: I) -> Self {
        let args: Vec<String> = iter
            .into_iter()
            .map(|value| value.as_string().unwrap_or_default())
            .collect();
        ArgsSimple { args }
    }
}
