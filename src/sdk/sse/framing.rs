//! SSE byte-stream framing (`data:` / `id:` lines).

/// One SSE message extracted from the stream.
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct SSEFrame {
    pub data: String,
    pub id: Option<String>,
}

/// Extract SSE frames from a text chunk (may contain multiple events).
///
/// Compatible with Casper node `/events` framing used by the legacy watcher:
/// split on `data:`, then take payload before optional `id:`.
pub fn extract_frames(chunk: &str) -> Vec<SSEFrame> {
    let mut frames = Vec::new();
    for part in chunk.split("data:").filter(|s| !s.is_empty()) {
        let mut id = None;
        let data_part = if let Some((before, after)) = part.split_once("id:") {
            let id_val = after.lines().next().unwrap_or(after).trim();
            if !id_val.is_empty() {
                id = Some(id_val.to_string());
            }
            before
        } else {
            part
        };
        let data = data_part.trim().to_string();
        if !data.is_empty() {
            frames.push(SSEFrame { data, id });
        }
    }
    frames
}

/// Append `start_from` query param to an events URL.
#[cfg(feature = "SSE")]
pub fn url_with_start_from(events_url: &str, start_from: Option<u64>) -> String {
    match start_from {
        None => events_url.to_string(),
        Some(id) => {
            if events_url.contains('?') {
                format!("{events_url}&start_from={id}")
            } else {
                format!("{events_url}?start_from={id}")
            }
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn extract_frames_data_and_id() {
        let chunk = "data:{\"ApiVersion\":\"2.0.0\"}\nid:1\ndata:{\"BlockAdded\":{\"block_hash\":\"abc\"}}\nid:2\n";
        let frames = extract_frames(chunk);
        assert_eq!(frames.len(), 2);
        assert!(frames[0].data.contains("ApiVersion"));
        assert_eq!(frames[0].id.as_deref(), Some("1"));
        assert!(frames[1].data.contains("BlockAdded"));
        assert_eq!(frames[1].id.as_deref(), Some("2"));
    }

    #[test]
    fn legacy_split_shape() {
        let json_data = r#"data:segment1id:data:segment2id:data:segment3id:"#;
        let frames = extract_frames(json_data);
        assert_eq!(frames.len(), 3);
        assert_eq!(frames[0].data, "segment1");
        assert_eq!(frames[1].data, "segment2");
        assert_eq!(frames[2].data, "segment3");
    }

    #[cfg(feature = "SSE")]
    #[test]
    fn start_from_query() {
        assert_eq!(
            url_with_start_from("http://n:9999/events", Some(10)),
            "http://n:9999/events?start_from=10"
        );
        assert_eq!(
            url_with_start_from("http://n:9999/events?foo=1", Some(10)),
            "http://n:9999/events?foo=1&start_from=10"
        );
    }
}
