---
name: Financial Data Engineering
description: "Market data pipelines, financial instruments, and quantitative analysis foundations — OHLCV, order books, Investment Clock, B3 specifics. Trigger on: 'stock data', 'market data', OHLCV, candlestick, 'order book', 'bid/ask', ticker, 'B3', 'CVM', Brapi, 'real-time quotes', 'delayed quotes', 'Investment Clock', 'financial indicators', 'price history', 'moving average', RSI, MACD, 'scoring model', 'quantitative analysis', portfolio, benchmark, Ibovespa."
---

# Financial Data Engineering

Financial data has unique constraints: time-series by nature, precision matters (rounding errors compound), freshness has direct monetary value, and regulatory requirements govern storage and display.

## OHLCV

Open (first trade), High (max), Low (min), Close (last), Volume (total traded) — the fundamental market data unit.

- Timeframes: 1m, 5m, 15m, 1h, 4h, 1D, 1W, 1M. Longer aggregates shorter: Open of first candle, max of Highs, min of Lows, Close of last, sum of Volumes
- Adjusted vs unadjusted: corporate actions (splits, dividends) change historical prices. Adjusted prices correct retroactively so charts don't show false gaps. Store both; display adjusted

## Order Book

- Bids (buy) ranked descending, Asks (sell) ranked ascending. Spread = lowest ask − highest bid
- Market depth: quantity at each price level. Thin depth means large orders move price significantly
- Level 1: best bid/ask + last trade. Level 2: full depth. Level 1 sufficient for retail analytics; Level 2 for algorithmic trading

## Market Data Sources

| Tier | Delay | Cost | Use when |
|------|-------|------|---------|
| Real-time | < 1s | Expensive | Trading platforms, algorithmic execution |
| Near real-time | 15 min | Free/cheap | Analysis tools, portfolio trackers, education |
| End-of-day | After close | Free/cheap | Long-term analysis, screening, macro models |

**B3 specifics**: CVM (Comissão de Valores Mobiliários) for financial statements. B3 market data via HMB or providers: Brapi.dev, StatusInvest API, Yahoo Finance (`.SA` suffix). BCB (Banco Central) API for SELIC, IPCA, GDP.

## Technical Indicators

- **Moving Averages**: SMA (equal weight), EMA (recent-weighted). Common periods: 9, 21, 50, 200 days. Golden cross (50 > 200, bullish) / death cross (50 < 200, bearish)
- **RSI**: momentum oscillator 0–100. > 70 overbought, < 30 oversold. 14-period default
- **MACD**: MACD line = EMA(12) − EMA(26), signal = EMA(9) of MACD. Crossovers signal trend changes
- **Bollinger Bands**: SMA(20) ± 2 standard deviations. Band width measures volatility
- Calculate indicators server-side on pre-fetched data. Never recompute from raw ticks on every render — cache intermediate results

## Investment Clock

Four phases by growth + inflation direction:

| Phase | Growth | Inflation | Favors |
|-------|--------|-----------|--------|
| Recovery | ↑ | ↓ | Equities |
| Overheat | ↑ | ↑ | Commodities |
| Stagflation | ↓ | ↑ | Cash |
| Reflation | ↓ | ↓ | Bonds |

Brazilian inputs: SELIC (COPOM meetings, 8/year), IPCA (monthly), GDP (quarterly). Classify current phase from macro indicators → weight sector/asset recommendations accordingly.

## Quantitative Scoring

- **Factors**: value (P/E, P/B, EV/EBITDA), quality (ROE, debt/equity, margin stability), momentum (6–12 month returns), growth (revenue/earnings growth)
- **Normalize**: z-score or percentile rank within peer group (sector, market cap tier). Raw values across sectors aren't comparable (tech P/E ≠ utility P/E)
- **Composite**: weighted sum of factor scores. Weights are subjective — backtest against historical returns
- **Rebalance**: monthly or quarterly. More frequent = higher transaction costs; less frequent = stale signals

## Numeric Precision

- Never use `Double` for monetary values. Use `Decimal` (Swift), `BigDecimal` (Java), or integer cents
- Banker's rounding (round half to even): `2.5 → 2`, `3.5 → 4`. Prevents systematic bias
- Format with locale: Brazil `R$ 1.234,56`, US `$1,234.56`. Use `NumberFormatter` with locale, never string concatenation

## Decisions

- **Data source**: Brapi.dev for B3 (free tier, REST, historical + real-time). BCB API for macro indicators. CVM for statements. Yahoo Finance as fallback. Don't build scrapers — use APIs
- **Update frequency**: real-time (WebSocket/SSE) for quote display. 15-minute delay for analysis features. EOD for scoring models and Investment Clock
- **Storage**: TimescaleDB or partitioned PostgreSQL for OHLCV. Partition by time (monthly). Index on (ticker, timestamp). Pre-compute indicators at ingest, not query time
- **Scoring complexity**: start with 3–4 factors (value + quality + momentum). Add factors only when backtesting shows improvement. More factors = more overfitting risk

## Traps

- **Floating point money** — `Double` for currency. Errors compound across aggregations. 100 positions with rounding errors = materially wrong total
- **Survivorship bias** — backtesting on current index constituents ignores delisted companies. Use point-in-time data
- **Look-ahead bias** — using data unavailable at decision time. Q4 financial statements are published weeks after quarter end — not available December 31
- **Ignoring corporate actions** — splits and dividends break historical prices and all indicators computed from them
- **Rate limiting** — free API tiers cap requests (e.g., 15 req/min). Batch, cache aggressively, use WebSocket streams instead of polling
- **Treating indicators as truth** — RSI > 70 doesn't mean "sell." A stock can stay overbought for months. Present as data, not recommendations

## Connections

- **Data Systems** — OHLCV is time-series data (TimescaleDB/partitioned Postgres); caching strategies apply to market data; CAP theorem governs distributed quote delivery
- **Network & API Engineering** — REST for historical data, WebSocket for real-time; rate limiting and retry patterns for data providers
- **Web Platform Internals** — SSE for streaming quotes; Canvas for thousands of candles (not SVG); Server Components for server-side indicator computation
- **Economic Model Design** — Investment Clock IS economic model design; scoring models apply economic reasoning to asset selection
