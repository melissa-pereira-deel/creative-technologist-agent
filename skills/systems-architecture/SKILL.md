---
name: Systems Architecture
description: "How to structure software systems for reliability, scalability, and maintainability — the decisions that are hardest to reverse. Trigger on: 'monolith or microservices?', 'how do we scale?', 'it keeps going down', 'should we use Kafka?', 'serverless?', deployment strategy, service boundaries, API design, 'this is getting too complex to deploy', reliability, resilience, message queues, background jobs, 'how do we handle failures?', observability, infrastructure decisions."
---

# Systems Architecture

Architectural decisions are the most expensive to reverse. A wrong button color costs a PR. A wrong database choice costs a migration. A wrong architectural pattern costs a rewrite. Deliberate proportional to reversal cost.

## Monolith → Modular Monolith → Microservices

A spectrum, not a binary:
- **Monolith**: single deployable unit, simple operations, fast development for small teams
- **Modular monolith**: strong internal module boundaries, enforced interfaces, one deployment. Modularity without distributed systems complexity
- **Microservices**: independently deployable, team autonomy — but networking, observability, data consistency, and deployment orchestration all explode in complexity

Progression: start monolith → enforce module boundaries when complexity grows → extract services only when team size or scale demands it.

## Message Queues vs Event Streaming

| | Message Queues (RabbitMQ, SQS) | Event Streaming (Kafka) |
|---|---|---|
| Delivery | Point-to-point, consumed once | Ordered log, multiple consumers, replayable |
| Use for | Background jobs, task distribution, decoupling | Event sourcing, cross-system sync, audit trails, analytics |
| Retention | Message deleted after consumption | Events persist |

## API Design

- **REST**: resource-oriented, stateless, HTTP verbs, widely understood. The default
- **GraphQL**: client-specified queries, eliminates over/under-fetching. Use when clients have diverse data needs
- **gRPC**: binary (Protocol Buffers), bidirectional streaming, highest performance. Use for service-to-service where HTTP overhead matters
- **API Gateway**: single entry point for routing, auth, rate limiting, caching

## Resilience Patterns

- **Circuit breaker**: Closed (normal) → Open (reject calls when error rate exceeds threshold) → Half-open (test one request) → Closed if success. Prevents cascade failures
- **Retry with backoff**: exponential delay (1s, 2s, 4s, 8s) + jitter (randomized to prevent thundering herd)
- **Bulkhead**: isolate components — separate thread pools, databases, deployment groups — so one failure doesn't sink everything
- **Timeout**: every external call needs a timeout. 3s is usually generous. No timeout = potential thread exhaustion

## Idempotency

An operation that produces the same result regardless of repetition. Essential for payment processing, retry logic, eventual consistency. Implementation: client-generated UUID idempotency key; server deduplicates on key. If an operation isn't idempotent, retries are dangerous.

## Serverless / FaaS

Pay per invocation, auto-scaling, zero server management. Trade-offs: cold starts (100ms–5s on first invocation after idle), statelessness (no persistent connections), execution limits (15min Lambda, 30s Vercel), vendor lock-in. Good for: API endpoints, webhooks, event processing. Bad for: WebSocket, long-running processes, latency-sensitive operations.

## Containerization

Docker: reproducible environments. Kubernetes: scheduling, auto-scaling, self-healing, rolling deployments at scale. Use Docker when you need dev/staging/prod parity. Use Kubernetes when running many services with automated operations. Don't use Kubernetes when Vercel, Fly.io, or Railway handles your needs.

## Observability

- **Metrics**: request rate, error rate, latency percentiles. Prometheus, Datadog
- **Logs**: structured JSON events with context. ELK stack, Loki
- **Traces**: request flow across services. Jaeger, OpenTelemetry
- **SLI/SLO/SLA**: SLI measures it (99.2% of requests < 200ms), SLO targets it (99.5%), SLA commits contractually (99.9% uptime or credits)

## Deployment Strategies

- **Blue-green**: two identical environments; switch traffic. Instant rollback. Cost: double infrastructure during transition
- **Canary**: route 1% → 5% → 25% → 100%, monitoring at each step. Slower but safer
- **Feature flags**: deploy code without releasing features. Decouple deployment from release. Enables gradual rollouts, A/B testing, kill switches

## Decisions

- **Monolith vs services**: monolith until 3+ teams need to deploy independently, or a component needs to scale independently. Modular monolith is right for most products at most stages
- **Sync vs async**: synchronous (HTTP/gRPC) when caller needs immediate result. Asynchronous (queue/event) when operation can complete later, when decoupling is needed, or when load spikes must be absorbed
- **Serverless vs always-on**: serverless for sporadic workloads (< 1 req/s average), event-driven processing. Always-on for consistent traffic, WebSocket, cold-start-sensitive operations
- **Build vs managed**: managed (AWS RDS, Vercel, Algolia) when operational overhead exceeds engineering value. Self-hosted when cost at scale is prohibitive or the service is core competitive advantage
- **Observability investment**: every service needs request rate, error rate, latency (p50/p95/p99), and structured error logging at minimum. Add tracing when requests cross service boundaries

## Traps

- **Premature microservices** — splitting before understanding domain boundaries. You'll split wrong: distributed monolith complexity with monolith coupling
- **Resume-driven architecture** — Kafka, Kubernetes, or microservices because they look good on a resume
- **Missing idempotency** — assuming operations won't be retried. Network failures, timeouts, and user double-clicks guarantee they will
- **Observability debt** — launching without monitoring, then debugging through user reports. Add observability before launch, not after the first outage
- **Serverless everything** — Lambda for workloads that run continuously, need WebSocket, or are latency-sensitive
- **Distributed transactions** — ACID across services. Use Saga pattern (local transactions + compensating actions) or redesign boundaries so the transaction is local

## Connections

- **Constraint Propagation** — architectural choices propagate into team structure (Conway's Law), deployment complexity, testing strategy, and hiring
- **First-Principles Reduction** — before adding a message queue, question whether the components need to be separate
- **Evolutionary Design** — start monolith → modular monolith → extract services. Each step is a variation tested against reality
- **Information Entropy** — distributed systems have higher entropy: more components, more failure modes, more state to track
- **Economic Model Design** — infrastructure choices are cost structure choices: serverless has zero idle cost but higher per-request cost; always-on has constant cost
