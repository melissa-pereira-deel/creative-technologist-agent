---
name: Cryptography & Privacy Engineering
description: "Making privacy promises the architecture can keep — encryption, hashing, Keychain, Secure Enclave, data protection, threat modeling. Trigger on: 'encrypt', 'hash', 'password storage', Keychain, Secure Enclave, 'data at rest', 'data in transit', TLS, 'privacy by design', 'user data protection', 'is this secure?', HTTPS, certificate pinning, 'how to store secrets', biometric auth, 'GDPR', 'privacy policy', threat model."
---

# Cryptography & Privacy Engineering

Privacy is an architectural property. If the architecture sends user data to a server, no privacy policy changes that fact. If the architecture keeps data on-device and encrypts at rest, privacy is structural — it survives bugs, policy changes, and acquisitions.

## Hashing vs Encryption

| Operation | Algorithms | Direction | Use for |
|-----------|-----------|-----------|---------|
| Hashing | SHA-256, BLAKE3 | One-way | Password storage (+ salt + key stretching), integrity, content addressing |
| Symmetric encryption | AES-256-GCM | Same key both ways | Data at rest, local files, bulk data |
| Asymmetric encryption | RSA, Curve25519 | Public encrypts, private decrypts | Key exchange, digital signatures, TLS handshake — never bulk data |
| Key derivation | PBKDF2, Argon2 | Password → key | Slow by design (100ms+) — makes brute-force impractical |

## Apple Security Stack

- **Keychain** (`Security.framework`): encrypted storage for secrets. Hardware-backed on Apple Silicon. Per-app sandbox access, optionally biometric-gated. Use for ALL secrets — never UserDefaults, plist, or plain files
- **Secure Enclave**: hardware-isolated processor. Private keys never leave the enclave — send data in, get signatures/decryptions out. `SecKeyCreateRandomKey` with `.privateKeyUsage`. Use for biometric-gated encryption keys, hardware-bound device identity
- **CryptoKit**: Swift-native. `AES.GCM.seal()`, `SHA256.hash()`, `P256.Signing`, `HKDF`. Prefer over Security.framework's C API for new code
- **Data Protection** (`NSFileProtectionComplete`): file-level encryption tied to passcode. Four levels from `.complete` (encrypted when locked) to `.none`. Set via `FileManager` attributes

## Data at Rest

- Sensitive local data: encrypt with key stored in Keychain, optionally Secure Enclave-backed
- Database encryption: SQLCipher for SQLite, or encrypt individual sensitive fields before storage
- Temporary files: `FileManager.default.temporaryDirectory`, clean up on termination. Not safe — unencrypted unless you encrypt it
- Memory: `mlock()` prevents swapping of critical secrets. `memset_s` for optimizer-resistant zeroing after use

## Data in Transit

- **TLS 1.3**: mandatory baseline. ATS enforces this on Apple platforms. Never disable ATS globally
- **Certificate pinning**: verify server certificate against known public key, not just CA chain. Prevents MITM with compromised CAs. Implement via `URLSession` delegate or `TrustKit`. Trade-off: certificate rotation requires app update. Use backup pins (pin current + next key)
- **End-to-end encryption**: client encrypts before sending, server never sees plaintext. Once implemented, server-side search on encrypted content becomes impossible

## Privacy by Design

- **On-device processing**: strongest guarantee. Data never leaves the device → no server breach, no subpoena, no policy loophole
- **Data minimization**: collect only what's needed, retain only as long as needed
- **Purpose limitation**: data collected for one function shouldn't be repurposed without consent
- **Transparency**: tell users exactly what's collected, processed, stored, transmitted. "Nothing leaves your device" is a competitive advantage — say it clearly

## Threat Modeling

Frame every privacy decision through: **Assets** (what are you protecting?) → **Threats** (who wants it and how?) → **Mitigations** (what architecture prevents each threat?). "Privacy-first" without a threat model is marketing, not engineering.

## Decisions

- **Where to store secrets**: Keychain for passwords/tokens/API keys. Secure Enclave for keys that must never be extractable. Never UserDefaults, plist, or hardcoded strings
- **Encryption scope**: individual sensitive fields when most data is non-sensitive and queryable. Entire database when all content is sensitive. File system when you need protection from other apps
- **On-device vs cloud**: on-device when privacy is the differentiator, latency matters, or offline is required. Cloud when model is too large or cross-device sync requires server access. Hybrid: process on-device, sync encrypted blobs (server never sees plaintext)
- **Certificate pinning**: pin your own APIs where you control rotation. Don't pin third-party APIs (they rotate without notice)

## Traps

- **Rolling your own crypto** — implementing custom algorithms. Use CryptoKit or libsodium. Custom crypto is almost always broken in non-obvious ways
- **Keychain misuse** — `kSecAttrAccessibleAlways` defeats Data Protection. Use `.afterFirstUnlock` for background access, `.whenUnlockedThisDeviceOnly` for maximum protection. Don't store non-secret data in Keychain (it's slow for bulk)
- **Logging sensitive data** — `os_log` persists, is accessible via Console.app, may be included in sysdiag. Use `OSLogPrivacy`: `\(text, privacy: .private)`. Never log PII or user content
- **Encryption without key management** — hardcoded key in binary is extractable in seconds. Keys must be in Keychain or Secure Enclave
- **Privacy theater** — claiming "privacy-first" while analytics SDKs phone home. Audit every network call. Use Charles Proxy to verify

## Connections

- **macOS Platform Engineering** — Keychain and Secure Enclave are platform APIs; sandbox is a privacy boundary; notarization ensures hardened runtime (anti-injection)
- **On-Device ML Optimization** — on-device inference IS privacy engineering; running models locally is a privacy architecture decision
- **Real-Time Audio Engineering** — audio data is among the most sensitive; the pipeline must never leak recordings to disk, logs, or crash reports
- **Network & API Engineering** — TLS, certificate pinning, and auth token management connect networking to privacy; every network call is a potential privacy violation
