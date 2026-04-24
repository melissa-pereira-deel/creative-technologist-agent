---
name: Network & API Engineering
description: "How data moves between machines — HTTP, WebSocket, REST, caching, auth, DNS, resilience at the protocol level. Trigger on: 'API design', REST, GraphQL, HTTP status codes, 'caching headers', ETag, 'Cache-Control', WebSocket, 'real-time updates', SSE, OAuth, JWT, 'API key', 'rate limiting', 'CORS error', DNS, 'request failed', 'timeout', 'retry logic', pagination, 'API versioning', webhook."
---

# Network & API Engineering

Every network call is a contract between two machines that might fail. The network is not reliable, not fast, not ordered, and not secure by default.

## HTTP Lifecycle

DNS resolution (~60s cache) → TCP handshake (1 RTT) → TLS handshake (1–2 RTT) → request → server processing → response. Connection reuse (`keep-alive`, HTTP/2 multiplexing) amortizes handshake cost across requests.

- **HTTP/2**: multiplexed streams, header compression (HPACK), no HTTP-level head-of-line blocking
- **HTTP/3**: QUIC (UDP-based), 0-RTT resumption, connection migration. Emerging standard

## REST Design

- Resources are nouns: `/users`, `/transcriptions`. Not verbs: not `/getUser`
- Verbs: GET (cacheable, idempotent), POST (create), PUT (replace, idempotent), PATCH (partial update), DELETE (idempotent)
- Status codes: 200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 429 Rate Limited, 500 Server Error
- Pagination: cursor-based (`?cursor=abc123`) for large/changing datasets (stable). Offset-based (`?page=2&limit=20`) for simple cases (can skip items if data changes)

## Caching Headers

| Header | Behavior | Use for |
|--------|----------|---------|
| `Cache-Control: max-age=3600` | Fresh for 1 hour | Slowly changing API responses |
| `Cache-Control: no-cache` | Revalidate with server each time | Content that may change |
| `Cache-Control: no-store` | Don't store at all | Sensitive data (financial, PII) |
| `Cache-Control: immutable` | Never revalidate | Versioned static assets (hashed JS/CSS) |
| `ETag` + `If-None-Match` | 304 Not Modified if unchanged | Unpredictably changing resources |
| `stale-while-revalidate` | Serve stale immediately, fetch fresh in background | Best of latency + freshness |

## Real-Time Communication

| Protocol | Direction | Use when |
|----------|-----------|---------|
| **WebSocket** | Full-duplex | Chat, collaboration, gaming, very high frequency (< 100ms between messages) |
| **SSE** | Server → client | Live feeds, streaming AI responses, notifications. Auto-reconnect, HTTP-compatible, works through CDNs |
| **Polling** | Client pulls | Infrastructure doesn't support push, or update frequency < 1 req/min |

Prefer SSE unless bidirectional communication is required.

## Authentication & Authorization

- **OAuth 2.0**: Authorization Code flow for web (server-side), PKCE for native/SPA (no client secret). Produces short-lived access tokens + long-lived refresh tokens
- **JWT**: self-contained claims (user ID, roles, expiry). Stateless — no DB lookup to verify. Can't revoke individual JWTs before expiry; use short-lived tokens + refresh
- **API keys**: server-to-server. Header only (`Authorization: Bearer key`) — never in URL (URLs are logged). Rotate regularly, scope narrowly
- **Session cookies**: `HttpOnly` (no JS access), `Secure` (HTTPS only), `SameSite=Strict` (CSRF protection)

## Error Handling & Resilience

- **Retry with exponential backoff**: delay = base × 2^attempt + jitter. Prevents thundering herd (all clients retrying simultaneously)
- **Idempotency key**: client-generated UUID sent with mutating requests. Server deduplicates: same key → return previous result. Essential for safe POST/PUT retries
- **Timeout tiers**: connect 3–5s, read 10–30s, total 30–60s. No timeout = blocked thread forever
- **Circuit breaker**: track error rate → open (reject immediately) → wait → half-open (test one request) → close if success. Prevents cascade failures

## CORS

- Same-origin policy: browser blocks `app.com` → `api.other.com` unless server explicitly allows it
- Preflight: OPTIONS request for non-simple methods. Server responds with `Access-Control-Allow-Origin`, `Allow-Methods`, `Allow-Headers`
- `Access-Control-Allow-Origin: *` with credentials doesn't work — browser rejects. Specific origin required when sending credentials
- CORS is browser-only. Server-to-server and native apps are unaffected

## Decisions

- **REST vs GraphQL**: REST for CRUD, public APIs, caching-heavy workloads (each URL independently cacheable). GraphQL for complex data needs across clients, over/under-fetching is a real problem
- **WebSocket vs SSE**: SSE for server → client streams. WebSocket for bidirectional. SSE works through CDNs and proxies more reliably
- **JWT vs sessions**: JWT for stateless APIs, microservices (no shared session store). Sessions for traditional web apps (simpler, revocable)
- **Caching strategy**: `immutable` + content hash for static assets. `max-age` + `stale-while-revalidate` for slowly changing API responses. `no-store` for user-specific sensitive data

## Traps

- **No timeout** — `fetch()` or `URLSession` without timeout. Server hangs = app hangs. Every external call needs a timeout
- **Retrying non-idempotent requests** — retrying POST without idempotency key. Timeout ≠ failure. The request may have succeeded and the response was lost. Retry = double charge
- **CORS misconfiguration** — `Allow-Origin: *` with credentials. Test CORS in browser (Postman doesn't enforce it)
- **Caching authenticated responses** — `Cache-Control: max-age=3600` on user-specific data. CDNs serve User A's data to User B. Use `private, max-age=3600` or `no-store`
- **Polling when push exists** — each poll is DNS + TCP + TLS + HTTP. SSE keeps one connection open with near-zero idle overhead

## Connections

- **Systems Architecture** — API design is the interface layer; resilience patterns (circuit breaker, retry, timeout) apply at both system and network level
- **Cryptography & Privacy Engineering** — TLS is transport encryption; OAuth/JWT are auth primitives; CORS prevents unauthorized cross-origin data access
- **Web Platform Internals** — fetch API, CORS, and caching headers are browser-level networking; SSE/WebSocket connect to the event loop model
- **Data Systems** — caching headers implement a distributed cache with TTL/invalidation; REST resources map to database entities
