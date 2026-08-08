//! Native application menu (OpenTrading / Electron-style chrome).

use tauri::menu::{Menu, MenuItemBuilder, PredefinedMenuItem, SubmenuBuilder};
use tauri::{AppHandle, Emitter, Manager};

const MENU_ACTION_EVENT: &str = "menu-action";

fn focused_webview(app: &AppHandle) -> Option<tauri::WebviewWindow> {
    app.webview_windows()
        .into_values()
        .find(|w| w.is_focused().unwrap_or(false))
}

fn emit_action(app: &AppHandle, action: &str) {
    let _ = app.emit(MENU_ACTION_EVENT, serde_json::json!({ "action": action }));
}

fn handle_menu_id(app: &AppHandle, id: &str) {
    match id {
        "quit" => app.exit(0),
        "reload" => {
            if let Some(win) = focused_webview(app) {
                let _ = win.eval("window.location.reload()");
            }
        }
        "forceReload" => {
            if let Some(win) = focused_webview(app) {
                let _ = win.eval("window.location.reload()");
            }
        }
        "toggleDevtools" =>
        {
            #[cfg(debug_assertions)]
            if let Some(win) = focused_webview(app) {
                if win.is_devtools_open() {
                    win.close_devtools();
                } else {
                    win.open_devtools();
                }
            }
        }
        "resetZoom" => {
            if let Some(win) = focused_webview(app) {
                let _ = win.eval("document.body.style.zoom='1'");
            }
        }
        "zoomIn" => {
            if let Some(win) = focused_webview(app) {
                let _ = win.eval(
                    "document.body.style.zoom=String((parseFloat(document.body.style.zoom||'1')||1)+0.1)",
                );
            }
        }
        "zoomOut" => {
            if let Some(win) = focused_webview(app) {
                let _ = win.eval(
                    "document.body.style.zoom=String(Math.max(0.5,(parseFloat(document.body.style.zoom||'1')||1)-0.1))",
                );
            }
        }
        "about" | "openTx" | "saveTx" | "unlock" | "unload" => emit_action(app, id),
        _ => {}
    }
}

pub fn build_menu(app: &AppHandle) -> tauri::Result<Menu<tauri::Wry>> {
    let quit = MenuItemBuilder::with_id("quit", "Quit")
        .accelerator("CmdOrCtrl+Q")
        .build(app)?;
    let open_tx = MenuItemBuilder::with_id("openTx", "Open Transaction JSON…")
        .accelerator("CmdOrCtrl+O")
        .build(app)?;
    let save_tx = MenuItemBuilder::with_id("saveTx", "Save Transaction JSON…")
        .accelerator("CmdOrCtrl+S")
        .build(app)?;
    let unlock = MenuItemBuilder::with_id("unlock", "Unlock PEM…")
        .accelerator("CmdOrCtrl+U")
        .build(app)?;
    let unload = MenuItemBuilder::with_id("unload", "Unload Session Key").build(app)?;

    let file = SubmenuBuilder::new(app, "File")
        .item(&open_tx)
        .item(&save_tx)
        .separator()
        .item(&unlock)
        .item(&unload)
        .separator()
        .item(&quit)
        .build()?;

    let reload = MenuItemBuilder::with_id("reload", "Reload")
        .accelerator("CmdOrCtrl+R")
        .build(app)?;
    let force = MenuItemBuilder::with_id("forceReload", "Force Reload")
        .accelerator("CmdOrCtrl+Shift+R")
        .build(app)?;
    let devtools = MenuItemBuilder::with_id("toggleDevtools", "Toggle Developer Tools")
        .accelerator("CmdOrCtrl+Shift+I")
        .build(app)?;
    let zoom_in = MenuItemBuilder::with_id("zoomIn", "Zoom In")
        .accelerator("CmdOrCtrl+Plus")
        .build(app)?;
    let zoom_out = MenuItemBuilder::with_id("zoomOut", "Zoom Out")
        .accelerator("CmdOrCtrl+-")
        .build(app)?;
    let zoom_reset = MenuItemBuilder::with_id("resetZoom", "Actual Size")
        .accelerator("CmdOrCtrl+0")
        .build(app)?;

    let view = SubmenuBuilder::new(app, "View")
        .item(&reload)
        .item(&force)
        .separator()
        .item(&zoom_reset)
        .item(&zoom_in)
        .item(&zoom_out)
        .separator()
        .item(&devtools)
        .build()?;

    let about = MenuItemBuilder::with_id("about", "About Casper Signing Desk").build(app)?;
    let help = SubmenuBuilder::new(app, "Help").item(&about).build()?;

    let edit = SubmenuBuilder::new(app, "Edit")
        .item(&PredefinedMenuItem::undo(app, None)?)
        .item(&PredefinedMenuItem::redo(app, None)?)
        .separator()
        .item(&PredefinedMenuItem::cut(app, None)?)
        .item(&PredefinedMenuItem::copy(app, None)?)
        .item(&PredefinedMenuItem::paste(app, None)?)
        .item(&PredefinedMenuItem::select_all(app, None)?)
        .build()?;

    Menu::with_items(app, &[&file, &edit, &view, &help])
}

pub fn on_menu_event(app: &AppHandle, event: tauri::menu::MenuEvent) {
    handle_menu_id(app, event.id().as_ref());
}
