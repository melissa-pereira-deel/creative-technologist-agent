---
name: Game Structure
description: "Recognize the type of game your product creates — positive-sum, zero-sum, or negative-sum determines everything downstream. Trigger on: marketplace design, 'is this fair to users?', 'engagement is up but satisfaction is down', 'our platform takes a cut', incentive alignment, gamification decisions, ethical product questions."
---

# Game Structure

Every product creates a game. People interact within rules, pursuing their interests. The most important question about any game: **what is its sum?**

- **Positive-sum** — all players can win; cooperation creates new value (trade, collaboration, platforms where user success = platform success)
- **Zero-sum** — one player's gain is another's loss; pie is fixed (rankings where only one can be #1)
- **Negative-sum** — the game destroys value for everyone; arms races, engagement optimization that makes everyone worse off

You choose which game your product creates through design decisions. Positive-sum games expand. Zero-sum games create arms races. Negative-sum games self-destruct.

## Model

**Prisoner's Dilemma and Cooperation** — two agents would both be better off cooperating, but the individually rational choice is to defect. Mechanism design solves this: design rules that make cooperation the individually rational choice. Reputation systems make cheating irrational by destroying future opportunities.

**Repeated Games vs. One-Shot** — in a one-shot game there's no consequence for defection. In a repeated game, reputation matters and cooperation emerges naturally. Products creating repeated interactions (subscriptions, communities) naturally encourage cooperation.

**Asymmetric Games** — players with different roles, information, or power. Critical: ensure the game is positive-sum for ALL roles, not just the powerful one. Misaligned asymmetric games create predatory dynamics.

**Infinite vs. Finite Games** — finite games have clear endpoints and winners. Most products should be infinite games — the goal is to keep the ecosystem healthy and growing, not to "win" against users. Companies playing finite games against customers eventually lose the long game.

**Common Pool Resources** — when multiple agents share a resource (attention, storage, bandwidth), each has incentive to over-consume. Tragedy of the Commons. Design rules that prevent over-consumption without destroying the commons.

## Apply

**Game Type Audit** — for any product or system:
1. Who are the players? (All roles and agents)
2. What is each player trying to maximize?
3. Positive-sum, zero-sum, or negative-sum?
4. Repeated game or one-shot? (Reputation matters in repeated games)
5. Symmetric or asymmetric? (Equal power and information?)
6. Finite or infinite? (Is there an endpoint or does play continue?)
7. What common resources are shared? (Do they degrade under load?)

**Positive-Sum Conversion** — when you identify zero-sum or negative-sum dynamics:
- Can you expand the pie? (Create new value instead of redistributing existing value)
- Can you change the scoring? (Personal-best tracking is positive-sum; pure rankings are zero-sum)
- Can you make it repeated? (Add reputation, history, relationships that make cooperation rational)
- Can you align incentives? (Make each player's self-interest serve the collective good)

**Extraction Test** — for any business model:
- Does it extract more value than it creates?
- Would users participate if they fully understood the mechanism?
- Is the platform's success dependent on user success? (If yes: aligned. If no: potential negative-sum.)

**Long Game Check:**
- Are you playing an infinite game? Goal: keep the ecosystem alive and growing.
- Project trust forward 5 years under current mechanisms.
- Are you building switching costs through value or through lock-in? Value-based retention is positive-sum; lock-in-based is zero-sum.

## Anti-Patterns

**Zero-sum competition dressed as "community"** — leaderboards where only rankings matter create sabotage incentives.

**Engagement optimization creating negative-sum attention wars** — metric goes up, user satisfaction goes down.

**Platform economics that extract more than they create** — the platform succeeds while users fail.

**Dark patterns** — mechanisms designed so the platform wins and the user loses.

**Finite games with customers** — maximizing this quarter's extraction at the expense of long-term trust.

**Assuming users are irrational when they resist** — usually they've recognized the game structure and chosen not to play. Fix the game, not your read of the users.

## Connections

- **Mechanism Design** — how you implement the game structure you want to create
- **Trust Architecture** — positive-sum games build trust; negative-sum games destroy it
- **Network Dynamics** — networks are positive-sum up to critical mass, then can become negative-sum (congestion, noise)
- **Economic Model Design** — business model determines whether your platform's game with users is positive-sum or extractive
- **Evolutionary Design** — games evolve as players learn and adapt; the game you designed may not be the game being played
