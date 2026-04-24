---
name: Data Systems
description: "How to store, query, and model data — choosing the right paradigm for the right problem. Trigger on: 'which database?', 'SQL vs NoSQL', schema design, data modeling, 'it's too slow' (queries), caching strategy, 'how do we scale the data layer?', search implementation, 'should we denormalize?', event sourcing, real-time data, vector search, 'where does this data live?', migration planning, any architectural decision about persistence."
---

# Data Systems

## Database Paradigms

| Paradigm | Examples | Use when |
|----------|---------|---------|
| **Relational** | PostgreSQL, MySQL | Relationships between entities, ACID required, varied query patterns. PostgreSQL adds JSON, full-text, geospatial (PostGIS), vectors (pgvector) — start here |
| **Document** | MongoDB, Firestore | Hierarchical data, fixed query patterns, schema flexibility > referential integrity |
| **Key-Value** | Redis, DynamoDB | O(1) lookup by key. Redis extends with sorted sets, streams, pub/sub. Performance layer, not primary database |
| **Graph** | Neo4j, Neptune | Relationship traversal is the primary operation: social networks, recommendations, fraud detection. 10 SQL JOINs = single graph traversal |
| **Time-Series** | TimescaleDB, InfluxDB | Timestamped metrics, sensor readings, logs. Auto-downsampling, retention policies, efficient range queries |
| **Search** | Elasticsearch, Algolia | Full-text search, fuzzy matching, faceted filtering. Inverted index: O(1) vs LIKE's O(n) scan |
| **Vector** | pgvector, Pinecone | Semantic search, RAG pipelines, similarity recommendations. Start with pgvector |

## Caching

- Strategies: cache-aside (app checks cache, falls back to DB), read-through (cache fetches on miss), write-through (writes go to cache + DB), write-behind (writes to cache, async to DB)
- TTL: how long cached data is considered fresh
- Cache invalidation is the hard part — "two hard things in CS: cache invalidation and naming things"

## Event Sourcing

Store events (what happened) not state. Current state is derived by replaying events. Enables: complete audit trails, temporal queries ("what was the state on March 15?"), event-driven architectures. Combined with CQRS (separate read/write models). Trade-offs: eventual consistency, replay complexity, storage growth.

## CAP Theorem

In distributed systems: pick two of Consistency (every read returns latest write), Availability (every request gets a response), Partition tolerance (works despite network failures). Partitions are unavoidable, so the real choice: **CP** (banking: prefer consistency, reject during partitions) vs **AP** (social: prefer availability, tolerate stale data).

## Decisions

- **Default to PostgreSQL** unless a specific access pattern proves it's the bottleneck. It handles relational, JSON, full-text, vectors, and time-series. Add specialized databases after Postgres is proven insufficient — not preemptively
- **Relational vs Document**: relational when entities have relationships, transactions are needed, query patterns vary. Document when data is hierarchical, query patterns are fixed, schema flexibility > integrity
- **When to add caching**: same query runs repeatedly, database is the bottleneck, response exceeds performance budget. Don't cache prematurely — it adds a consistency problem. Cache reads, not writes
- **When to add search**: users need full-text, fuzzy, or faceted filtering. `LIKE '%term%'` is a sign you need search. For < 10K documents, PostgreSQL built-in full-text may suffice
- **When to add vector**: building RAG, semantic search, or similarity recommendations. Start with pgvector. Move to dedicated vector DB when query volume or index size exceeds Postgres capacity
- **Event sourcing vs CRUD**: event sourcing when audit trail is mandatory (finance, healthcare, legal), temporal queries needed, or multiple consumers need different views. CRUD for everything else

## Traps

- **Premature specialization** — choosing MongoDB or DynamoDB before understanding access patterns. Start with Postgres; specialize when the bottleneck is proven
- **Join phobia** — avoiding relational design because "joins are slow." Joins are fast on indexed foreign keys. Denormalization creates consistency problems harder to fix than slow joins
- **Cache-first architecture** — caching before building a system that works without it. A system that breaks when the cache is cold is fragile
- **Schema-later** — "we'll figure out the data model when we know more." Schema design IS understanding the domain. Bad schema forces bad code everywhere data is touched
- **Polyglot overkill** — five databases "because each is best at its job." Each adds operational complexity: monitoring, backups, migrations, team expertise

## Connections

- **Constraint Propagation** — database choice propagates into API design, query patterns, scaling strategy, cost structure
- **Information Entropy** — normalization is entropy management: reducing redundancy at the cost of query complexity. Denormalization increases entropy
- **First-Principles Reduction** — before adding caching or a new database, question whether the access pattern itself should change
- **Economic Model Design** — database costs (storage, compute, egress) are P&L items; data architecture constrains the business model
- **Performance as Experience** — query latency determines whether a feature feels instant; caching crosses perceptual thresholds
