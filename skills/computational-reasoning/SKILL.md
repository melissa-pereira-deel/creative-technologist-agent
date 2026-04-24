---
name: Computational Reasoning
description: "Algorithmic and numerical thinking that changes engineering decisions — complexity trade-offs, data structure selection, graph patterns, numerical discipline, optimization intuition. Trigger on: 'which data structure?', 'is O(n²) a problem here?', 'hash map or tree?', 'this is slow at scale', 'floating point error', 'wrong by a penny', topological sort, 'memoize', 'dynamic programming', 'greedy', 'binary search', 'how to scale this', 'sort algorithm', 'graph traversal', amortized complexity."
---

# Computational Reasoning

## Complexity as Engineering Judgment

Context determines whether Big-O matters:
- **n bounded and small** (menu items, form fields, config entries): any algorithm works. Readability wins
- **n grows with data** (user records, log entries, search results): O(n²) on 100K items = 10B ops = seconds. Complexity matters
- **n grows with time** (event streams, logs, message history): today's n=1000 is next year's n=1M. Critical

**Amortized analysis**: hash map insert is O(1) amortized, O(n) worst-case (resize). Dynamic array append is the same. Doubling (not incrementing) the backing array amortizes resize cost across all operations.

**Space trade-offs**: caching trades memory for time. Indexes trade write speed for read speed. Denormalization trades storage for join elimination.

**Cache effects**: a cache-friendly O(n²) scan can beat cache-hostile O(n log n) tree traversal for n < ~10K because cache misses (~100ns each) dominate algorithmic constants. Measure before choosing based on Big-O alone.

## Data Structure Selection

Choose by access pattern, not by familiarity:

| Need | Structure | Cost | Watch out for |
|------|-----------|------|---------------|
| Key→value lookup | Hash map | O(1) avg, O(n) worst | Hash collisions, resize cost, unordered |
| Ordered iteration | Sorted array | O(log n) search, O(n) insert | Insertion cost if frequent |
| Min/max extraction | Heap | O(1) peek, O(log n) insert/extract | No efficient search by value |
| Prefix matching | Trie | O(k) where k=key length | Memory overhead per node |
| Relationship traversal | Graph (adjacency list) | O(1) neighbor access | No efficient "find all with property X" |
| Membership testing | Set (hash-backed) | O(1) avg | Same caveats as hash map |
| FIFO/LIFO processing | Queue / Stack | O(1) push/pop | Not for random access |

**Default**: array for ordered collections, hash map for lookups, set for membership. These three cover ~90% of production needs. Reach for trees, heaps, tries, and graphs only when the access pattern demands them.

**Array-backed alternatives**: before using a linked list, tree, or graph, ask if a flat array with index-based references works. Array-backed structures are cache-friendly. A "tree" as a sorted array with binary search has the same O(log n) lookup with far better cache behavior.

## Graph Algorithms in Production

Match problem shape to algorithm:
- **Dependency resolution** (packages, build systems, task scheduling) → **topological sort**. O(V+E). Sort failure = cycle — report it
- **Shortest path** (routing, cheapest cost) → **BFS** (unweighted, O(V+E)) or **Dijkstra** (non-negative weights, O(V log V + E)). BFS when all edges cost the same
- **Reachability** (access control, impact analysis) → **DFS/BFS** from source. O(V+E)
- **Connected components** (clustering, grouping) → **Union-Find** for incremental grouping. O(α(n)) ≈ O(1) per operation
- **Cycle detection** → DFS with back-edge tracking (directed) or Union-Find (undirected)

**Recognition**: "what order?", "what's reachable?", "what's connected?", "shortest path?" → model as graph, then pick the algorithm.

## Numerical Discipline

- **IEEE 754**: `0.1 + 0.2 ≠ 0.3` — 0.1 has no exact binary representation. Expected behavior, not a bug
- **Money**: always `Decimal` (Swift), `BigDecimal` (Java), or integer cents. Never `Double` for currency — rounding errors compound across aggregations
- **Catastrophic cancellation**: subtracting nearly equal numbers destroys precision. `(1.0 + 1e-15) - 1.0` gives `1.1102e-15` instead of `1e-15`. Rearrange formulas to avoid subtracting close values
- **Accumulation order**: summing 1M floats smallest-to-largest is more accurate than largest-to-smallest. Kahan summation is the rigorous fix
- **Comparison**: never `a == b` for floats. Use `abs(a - b) < epsilon` where epsilon is relative to the magnitude of the values

FP32→FP16→INT8 quantization is numerical precision trade-off — the same discipline applied to ML.

## Dynamic Programming & Memoization

DP applies when a problem has **optimal substructure** (optimal solution contains optimal sub-solutions) AND **overlapping subproblems** (same sub-problems solved repeatedly).

**Recognition signals**: recursive solution with repeated calls for same inputs, "minimum cost to...", "number of ways to...", "longest/shortest sequence that..."

| Approach | When to use | Trade-off |
|----------|-------------|-----------|
| **Memoization** (top-down) | Subproblem space is sparse | Natural to implement; recursion overhead |
| **Tabulation** (bottom-up) | All subproblems contribute | No recursion overhead; can optimize space to last row/column |

**Production applications**: text diff (LCS), resource allocation (knapsack), string matching (edit distance), optimal chunking, path finding with accumulated costs.

**When NOT DP**: no overlapping subproblems → plain recursion or divide-and-conquer. Greedy gives optimal results → DP is overkill.

## Optimization & Search Patterns

**Greedy**: locally optimal choice at each step. Correct only when local optimum provably leads to global optimum. Works for: interval scheduling (earliest deadline first), Huffman coding, Dijkstra, minimum spanning tree. Fails for: knapsack, TSP, most "maximize X subject to Y" problems.

**Binary search**: O(log n) on sorted data. Applies to any monotonic function — not just arrays. "What's the smallest buffer size that avoids dropout?" → binary search the parameter space.

**Gradient descent**: step in the direction of steepest descent, repeat. Learning rate = step size (too large → overshoot; too small → slow). Non-convex functions risk local minima. ML training: loss function = landscape, model weights = position.

**Divide-and-conquer**: split in half, solve independently, combine. Merge sort, FFT, binary search. Naturally parallelizable.

## Decisions

- **"Is O(n²) a problem?"**: n < 100 → no. n < 10K → probably no. n > 100K → yes. n grows with time → definitely yes
- **Hash map vs sorted structure**: hash map for lookup/insert/delete only. Sorted array or tree for range queries, ordered iteration, or min/max
- **Greedy vs DP**: if you can prove greedy works (exchange argument, matroid structure), use it — simpler and faster. If unsure, DP is always safe
- **Exact vs approximate**: exact when correctness matters (financial, transactional). Approximate when speed matters and error is acceptable (recommendations, ranking, analytics)

## Traps

- **Complexity worship** — choosing O(n log n) over O(n²) for n=20. Constant factors and cache behavior matter more at small n. Simpler code that's fast enough beats theoretically optimal
- **Wrong data structure inertia** — arrays for everything out of familiarity. A hash set turns O(n) membership checks into O(1)
- **Floating point equality** — `if price == 0.0` fails when price is `1e-15` from accumulated rounding. Use epsilon comparison or Decimal types
- **Greedy assumption** — assuming greedy works without proof. Verify with small counterexamples
- **Ignoring space complexity** — memoizing 10M subproblems uses 10M entries of memory. Check space requirements alongside time

## Connections

- **Performance Measurement** — complexity analysis predicts scaling behavior; measurement verifies it. "This is O(n²)" is a hypothesis until profiled
- **Data Systems** — database index selection IS data structure selection (B-tree for range queries, hash index for equality). Query optimization is algorithm selection
- **Hardware-Aware Computing** — cache effects override algorithmic complexity at practical data sizes; memory-bound vs compute-bound determines whether a better algorithm helps
- **Financial Data Engineering** — numerical discipline (Decimal, banker's rounding, accumulation order) prevents the most common financial computation bugs
- **On-Device ML Optimization** — quantization is numerical precision trade-off; gradient descent is the optimization pattern behind every trained model
- **Systems Architecture** — graph algorithms (topological sort, cycle detection) solve dependency resolution in build systems, deployment ordering, and service startup
