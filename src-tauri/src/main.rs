#[tauri::command]
async fn get_weather_data(location: &str) -> Result<serde_json::Value, String> {
    println!("请求位置: {}", location); // 在终端输出日志
    // ...原有代码...
    let location_id = location_data["location"][0]["id"]
        .as_str()
        .ok_or("无效的位置数据")?;
}

fn main() {
    std::env::set_var("WINIT_UNIX_BACKEND", "x11"); // Linux专用
    tauri::Builder::default()
        .setup(|app| {
            let window = app.get_window("main").unwrap();
            // 启用垂直同步限制帧率
            window.set_vsync(true);
            Ok(())
        })
        .plugin(crate::cors::init())
        .invoke_handler(tauri::generate_handler![get_weather_data])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
} 