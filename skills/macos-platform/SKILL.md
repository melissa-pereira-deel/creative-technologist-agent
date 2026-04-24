---
name: macOS Platform Engineering
description: "Building native macOS apps that feel like they belong — sandboxing, notarization, XPC, menu bar patterns, accessibility, distribution. Trigger on: 'macOS app', sandbox entitlements, notarization, 'App Store vs direct', XPC service, menu bar app, NSStatusItem, 'background execution', 'accessibility API', AXUIElement, Sparkle updates, 'hardened runtime', codesigning, 'how to distribute macOS app', UserDefaults, LaunchAgent, 'system extension'."
---

# macOS Platform Engineering

macOS gives you power that iOS withholds — background execution, XPC services, accessibility APIs, system extensions, direct distribution. Mac users notice when an app doesn't feel native.

## App Sandbox

- Restricts file system, network, and hardware access (each requires entitlement)
- Required for Mac App Store. Recommended for direct distribution
- `com.apple.security.files.user-selected.read-write`: access files user explicitly opens (Open dialog, drag-and-drop)
- `com.apple.security.temporary-exception.*`: escape hatches. Use sparingly — Apple reviews these
- **Security-scoped bookmarks**: persist access to user-selected files across launches. Without them, file access is lost on restart

## Notarization & Hardened Runtime

- Hardened runtime: disables dynamic code injection, restricts debugging, enforces library validation. Required for notarization
- Without notarization: "app cannot be opened because the developer cannot be verified" on first launch
- Process: archive → `notarytool submit` → wait for ticket (< 5min) → `stapler staple`. Automate in CI
- Entitlements that relax hardened runtime require justification and slow review

## XPC Services

- Child processes with their own sandbox and crash domain. Main app survives XPC crashes
- Use for: privileged operations, crash isolation (audio/ML processing), memory isolation
- `NSXPCConnection` with `@objc protocol` interface — type-safe remote calls
- Bundled XPC: auto-managed by launchd (launched on demand, terminated when idle)

## Menu Bar Apps

- `NSStatusItem` + `NSPopover` or `NSMenu`
- No dock icon: `LSUIElement = YES` in Info.plist
- Use case patterns: popover for rich UI, menu for quick actions
- Background execution: runs continuously. Don't poll — use `NSEvent.addGlobalMonitorForEvents` or notification observers instead of timers
- Global hotkeys: `NSEvent.addGlobalMonitorForEvents(matching: .keyDown)` or `MASShortcut` for user-configurable shortcuts
- Always-listening apps: manage energy carefully. Active inference or capture loops need `ProcessInfo.beginActivity()`

## Background Execution

- No iOS-style background mode restrictions. Apps run indefinitely unless App Nap suspends them
- **App Nap**: macOS suspends invisible apps. Prevent with `ProcessInfo.processInfo.beginActivity(options: .userInitiated, reason:)` during active work
- **LaunchAgents**: plist in `~/Library/LaunchAgents/` — launchd starts helper at login. More reliable than login items for always-running services
- **Login items**: `SMAppService.register()` — simpler, less control

## Accessibility APIs

- `AXUIElement`: query any app's UI hierarchy, read values, trigger actions. Requires Accessibility permission (System Settings → Privacy → Accessibility)
- `CGEvent` / `CGEventTap`: intercept and modify system-wide input events. Also requires Accessibility permission
- Design for graceful degradation when permission is denied

## Distribution Models

| Model | Access | Revenue | Best for |
|-------|--------|---------|---------|
| Mac App Store | Sandboxed, Apple-reviewed | 70% | Consumer apps, discoverability |
| Direct distribution | Full system access, your update mechanism | 100% | Developer tools, pro apps, subscription control |
| Sparkle (direct) | — | — | Standard open-source update framework for non-App Store apps |
| Both | App Store subset + full direct | Split | Possible but complex; some apps maintain two feature sets |

## macOS UI Conventions

- Settings via `⌘,` opening a Settings window (not a tab or modal)
- Standard menu order: File, Edit, View, Window, Help. App menus between View and Window
- Keyboard shortcuts for all primary actions — Mac users are keyboard-driven
- Native controls (`NSTextField`, `NSButton`, `NSTableView`) — custom controls feel foreign
- Drag-and-drop: `NSItemProvider` / `UTType` for file-oriented operations

## Decisions

- **App Store vs direct**: App Store for general consumers. Direct when you need unsandboxed capabilities, your own licensing, or > 70% revenue
- **Sandbox vs unsandboxed**: sandbox when possible — limits blast radius. Unsandboxed when entitlements can't cover needs (system-wide accessibility, kernel extensions)
- **XPC vs in-process**: XPC when crash isolation matters or privilege separation is needed. In-process for simplicity when crash risk is low
- **Menu bar vs dock app**: menu bar for always-present, glanceable tools. Dock app for document-oriented or session-based work. Hybrid: `NSApp.setActivationPolicy` shows dock icon only when window is open

## Traps

- **Ignoring sandbox early** — building features that require unsandboxed access, then discovering App Store is blocked. Design for sandbox from day one
- **Blocking main thread with XPC** — `NSXPCConnection` is async by design. Synchronous wrappers (`semaphore.wait()` on main thread) freeze the UI
- **App Nap killing background work** — continuous processing stops because macOS suspended the app. Use `ProcessInfo.beginActivity()`. Don't abuse it — constant declarations waste battery
- **Missing keyboard shortcuts** — an app without `⌘,`, `⌘W`, and app-specific shortcuts feels like a ported iOS app
- **Hardcoding file paths** — use `FileManager.default.urls(for:in:)`, not `~/Library/...` strings. Paths vary by sandbox, migration, and Rosetta

## Connections

- **Real-Time Audio Engineering** — XPC isolation for audio pipeline; background execution entitlements for continuous capture
- **Cryptography & Privacy Engineering** — Keychain for secrets, Secure Enclave for biometric auth, sandbox as privacy boundary, Accessibility permission as trust gate
- **Performance Measurement** — Energy Log in Instruments profiles background energy; App Nap interactions require measurement to tune activity declarations
- **Concurrency & Parallelism** — XPC is IPC-level concurrency; NSXPCConnection callbacks arrive on arbitrary threads; AppKit enforces main thread discipline
