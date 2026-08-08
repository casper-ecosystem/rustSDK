mod commands;
mod menu;
mod message;
mod policy;
mod presets;
mod state;
mod tx;

use state::Session;
use tauri::Manager;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .manage(Session::default())
        .setup(|app| {
            let menu = menu::build_menu(app.handle())?;
            app.set_menu(menu)?;
            app.on_menu_event(menu::on_menu_event);
            // Close the window = exit the process (no orphan after make/vite dies).
            if let Some(win) = app.get_webview_window("main") {
                let app_handle = app.handle().clone();
                win.on_window_event(move |event| {
                    if let tauri::WindowEvent::CloseRequested { .. } = event {
                        app_handle.exit(0);
                    }
                });
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            commands::session_status,
            commands::session_unload,
            commands::session_unlock,
            commands::keygen_and_save,
            commands::message_sign,
            commands::message_verify,
            commands::tx_make_transfer,
            commands::tx_make_stake,
            commands::tx_sign_add_approval,
            commands::tx_verify,
            commands::tx_approvals,
            commands::tx_put,
            commands::tx_wait,
            commands::tx_get,
            commands::presets,
            commands::tx_open_json,
            commands::tx_save_json,
            commands::pick_policy_path,
            commands::default_policy,
        ])
        .run(tauri::generate_context!())
        .expect("error while running casper-signing-desk");
}
