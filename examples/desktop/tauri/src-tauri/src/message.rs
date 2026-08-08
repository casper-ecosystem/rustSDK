//! Message sign/verify (casper-sign-verify parity).

use casper_types::bytesrepr::{FromBytes, ToBytes};
use casper_types::crypto::{sign, verify};
use casper_types::{AsymmetricType, PublicKey, SecretKey};
use hex::{decode as hex_decode, encode as hex_encode};

const ED25519_TAG: u8 = 1;
const SECP256K1_TAG: u8 = 2;

pub fn format_public_key_hex(public_key: &PublicKey) -> Result<String, String> {
    match public_key {
        PublicKey::System => Err("system key cannot be hex-formatted".into()),
        PublicKey::Ed25519(_) | PublicKey::Secp256k1(_) => {
            let key_bytes = public_key
                .to_bytes()
                .map_err(|e| format!("public key bytes: {e:?}"))?;
            Ok(hex_encode(key_bytes))
        }
        _ => Err("unsupported public key type".into()),
    }
}

pub fn parse_public_key_hex(hex_str: &str) -> Result<PublicKey, String> {
    let bytes = hex_decode(hex_str.trim()).map_err(|_| "invalid hex for public key".to_string())?;
    if bytes.is_empty() {
        return Err("public key hex is empty".into());
    }
    let tag = bytes[0];
    let key_bytes = &bytes[1..];
    match tag {
        ED25519_TAG => {
            if key_bytes.len() != 32 {
                return Err("invalid length for Ed25519 public key".into());
            }
            PublicKey::ed25519_from_bytes(key_bytes)
                .map_err(|e| format!("parse Ed25519 public key: {e:?}"))
        }
        SECP256K1_TAG => {
            if key_bytes.len() != 33 {
                return Err("invalid length for Secp256k1 public key".into());
            }
            PublicKey::secp256k1_from_bytes(key_bytes)
                .map_err(|e| format!("parse Secp256k1 public key: {e:?}"))
        }
        _ => Err(format!("unknown algorithm tag: {tag}")),
    }
}

pub fn sign_message(pem: &str, message: &str) -> Result<(String, String), String> {
    if message.is_empty() {
        return Err("message can't be empty".into());
    }
    let secret_key =
        SecretKey::from_pem(pem).map_err(|e| format!("parse secret key PEM: {e:?}"))?;
    let public_key = PublicKey::from(&secret_key);
    let public_key_hex = format_public_key_hex(&public_key)?;
    let signature = sign(message.as_bytes(), &secret_key, &public_key);
    let signature_bytes = signature
        .to_bytes()
        .map_err(|e| format!("serialize signature: {e:?}"))?;
    let raw_hex = if signature_bytes.len() == 65
        && (signature_bytes[0] == ED25519_TAG || signature_bytes[0] == SECP256K1_TAG)
    {
        hex_encode(&signature_bytes[1..])
    } else {
        hex_encode(&signature_bytes)
    };
    Ok((public_key_hex, raw_hex))
}

pub fn verify_message(
    message: &str,
    signature_hex: &str,
    public_key_hex: &str,
) -> Result<bool, String> {
    if message.is_empty() || signature_hex.is_empty() {
        return Err("message and signature are required".into());
    }
    let public_key = parse_public_key_hex(public_key_hex)?;
    let signature_bytes =
        hex_decode(signature_hex.trim()).map_err(|_| "invalid hex for signature".to_string())?;
    let signature = if signature_bytes.len() == 64 {
        let tag = match &public_key {
            PublicKey::Ed25519(_) => ED25519_TAG,
            PublicKey::Secp256k1(_) => SECP256K1_TAG,
            PublicKey::System => return Err("cannot verify with system key".into()),
            _ => return Err("unsupported public key type".into()),
        };
        let mut bytes = vec![tag];
        bytes.extend_from_slice(&signature_bytes);
        FromBytes::from_bytes(&bytes)
            .map_err(|e| format!("parse signature: {e:?}"))?
            .0
    } else if signature_bytes.len() == 65
        && (signature_bytes[0] == ED25519_TAG || signature_bytes[0] == SECP256K1_TAG)
    {
        FromBytes::from_bytes(&signature_bytes)
            .map_err(|e| format!("parse signature: {e:?}"))?
            .0
    } else {
        return Err(format!(
            "invalid signature length: expected 64 or 65 bytes, got {}",
            signature_bytes.len()
        ));
    };
    Ok(verify(message.as_bytes(), &signature, &public_key).is_ok())
}

#[cfg(test)]
mod tests {
    use super::*;
    use casper_types::SecretKey;

    #[test]
    fn sign_verify_roundtrip_ed25519() {
        let sk = SecretKey::generate_ed25519().expect("gen");
        let pem = sk.to_pem().expect("pem");
        let msg = "validator@example.com";
        let (pk, sig) = sign_message(&pem, msg).expect("sign");
        assert!(verify_message(msg, &sig, &pk).expect("verify"));
        assert!(!verify_message("other", &sig, &pk).expect("verify fail"));
    }
}
