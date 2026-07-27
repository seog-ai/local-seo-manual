---
title: What the work costs
sidebar_position: 5
description: What local search data costs at wholesale from Google's published prices, what the labour costs, and where the margin in this work actually sits.
---

# What the work costs

You can do the work now. Whether it is a business depends on three numbers: what the data costs, what your time costs, and what someone will pay. Only the first is knowable to the cent — Google publishes it — and it is the one almost nobody in this industry can quote.

Knowing the real figure protects you from two mistakes at once: paying ten times what a deliverable needs to cost, and quoting a price anchored to a bill that is a rounding error.

## Three cost lines, and only one is large

| Line | What it is | Order of magnitude, per managed client per month |
| --- | --- | --- |
| **Data** | Live calls to Google and to model vendors | Single-digit dollars |
| **Labour** | Your hours, or someone's | Hundreds of dollars |
| **Fixed** | Tooling, your own site, accounting, unbilled hours | Amortised across your whole book |

**The API bill is not the cost of delivery; it is a rounding error on it** — which is why pricing off it is a trap. People who lose money doing local SEO lose it on unpriced hours, on clients who leave before onboarding is repaid, and on producing a monthly report nobody reads.

## What the data costs at wholesale

Google publishes per-request prices for the place data underneath every local SEO tool. Below are list prices at the most expensive volume tier — the first 0–100,000 requests a month, discounted above that — from Google's pricing page as last updated **2026-06-29**, audited **2026-07-03**.

| What you are buying, one request at a time | Per request | Per 1,000 |
| --- | --- | --- |
| A ranked list of businesses for a query at a point, **with** rating, review count and phone on every row | $0.035 | $35 |
| The same ranked list, **identities only** | $0 | $0 |
| One business's public record — contact details, hours, rating | $0.020 | $20 |
| The same record **plus** its attribute set and editorial summaries | $0.025 | $25 |
| A sample of one business's public reviews | $0.025 | $25 |
| One resolved photo URL | $0.007 | $7 |
| One interactive map render | $0.007 | $7 (first 10,000 a month free) |
| One typeahead suggestion request | $0.00283 | $2.83 |

Three rules govern that table, and they are the whole game.

**A request is priced by the most expensive thing in it.** Ask a search for names and coordinates and you are in a free or near-free tier. Ask for the rating as well and the *entire request* re-prices upward — not the extra field, the request. That is how two tools running what looks like the same search differ a hundredfold in cost. The tiers and the mapping: [what Google's APIs cost](../05-reference/what-googles-apis-cost.md).

**The free tier is real and useful.** A search returning only the identities of the businesses ranked at a point is billed at zero — and that is enough to compute a position, which is the entire content of a rank check.

**The free monthly allowance is real but unstable.** Google grants some free volume per product each month; its size and rules have changed more than once, so read the current page before budgeting on it.

Some local data is not for sale at any price — a profile's own view and call counts, the terms that produced its impressions, a competitor's internals: [what Google's reporting hides](../05-reference/what-googles-reporting-hides.md).

### A prospect audit costs less than a stamp

To produce the diagnostic in [Diagnosing a business in thirty minutes](../02-core-practice/analyzing-business-visibility.md) on a business you have no access to, you need one search to find it, one rich profile record, one review sample, up to ten photo URLs, and a handful of competitor records: **about twenty-five cents**. Whatever is stopping you from auditing fifty prospects this month, it is not the data bill.

## The free half nobody prices in

Here is the fact that reorganises the economics: **once a business connects its Google Business Profile to you, the data is free.**

Google charges nothing to call the owner-side interfaces. Reviews and their full history, publishing replies, performance metrics and the search terms people used, posts, photo uploads, edits to fields and attributes — none of it is metered. Neither is keyword volume from an Ads account, nor Search Console, nor PageSpeed.

So your billable data cost sits almost entirely where you *lack* access:

| Work | Who is observed | Data cost |
| --- | --- | --- |
| Prospecting and audits | A business you do not manage | Paid, per business |
| Competitor tracking | Businesses nobody gives you access to | Paid, per competitor, per refresh |
| Public rank and grid measurement | The search result, not the profile | Paid or free, by how the request is built |
| Everything on a connected client's own profile | Your client | Free to call |

Three consequences. **Connect the profile in week one** — cost is the least of the reasons, since connected access also converts a pile of *unknowns* into facts. **Your data bill scales with businesses you do not manage**: twenty connected clients tracking five competitors each cost more in competitor snapshots than everything else combined. And **free of money is not free of limits** — the owner interfaces carry write limits, silent partial failures and content rejections that have nothing to do with billing ([write limits and failure modes](../05-reference/write-limits-and-failure-modes.md)).

## The model is the cheap part

The instinct that AI features are the expensive line is wrong by an order of magnitude. Generated text is nearly free; **the lookups behind it are the cost.**

At list prices audited 2026-07-03, a small fast model runs around $0.30 per million input tokens and $2.50 per million output, so a review-reply draft — a few hundred tokens each way — costs about **a fifth of a cent**. A *grounded* answer, where the model runs a live search before replying, is charged separately, and that charge dominates:

| Vendor-published charge, 2026-07 | Price |
| --- | --- |
| Grounding with Google Search | $35 per 1,000 grounded prompts, past a free daily quota |
| Server-side web search on the two other major assistant APIs | $10 per 1,000 searches |
| Frontier reasoning model tokens | ~$5 per million in, ~$25 per million out |
| Small fast model tokens | ~$0.25 per million in, ~$2 per million out |

One probe — a prompt asked of three engines, each answer judged for whether the business was named — works out at **around ten to fifteen cents**, nearly all of it the grounded searches. That is arithmetic from the rates above, not a quoted price. At the cadence [AI visibility](../03-advanced/ai-visibility.md) argues for, since one run is a sample and not a measurement:

```
10 prompts × 4 runs a month  = 40 prompt-runs
40 × ~$0.13 per prompt across three engines
≈ $5.20 per client per month
```

Two things fall out. The choice of *writing* model barely matters; the choice of *grounded* engine matters enormously — a frontier model making three web searches per answer costs roughly four times a small model making one. And the wholesale input to an AI-visibility deliverable is a few dollars a month, so the build-or-buy question is what the interpretation is worth, not what the lookups cost.

## Two builds of the same deliverable, 250× apart

A geo-grid scan is one search per grid point — nine, twenty-five or forty-nine of them ([reading a geo-grid](../03-advanced/reading-a-geo-grid.md)).

Build it the obvious way, asking each point for ranked businesses with ratings and phone numbers attached, and a 7×7 scan buys 49 requests at the top rate: **$1.72 a scan**. Ask each point only who ranked where — all a heatmap contains — and those 49 requests bill at zero. You pay for the one map render the result is drawn on, and the first ten thousand of those each month are free.

Twenty clients, scanned weekly:

| Build | Monthly data cost |
| --- | --- |
| Rich rows at every grid point | ~$137 |
| Identities only | ~$0.56, often $0 |

Same picture on screen, same numbers under it, a roughly 250× difference in cost of goods — produced entirely by which fields the request asked for. If you came to this from engineering, that is where your advantage in this market is: not ranking better than an agency, but delivering the same artefact at a cost structure they cannot see.

Cadence is the second lever and free to pull. Map-pack positions drift over weeks; scanning daily costs seven times as much and tells you less, because the extra runs mostly measure your own noise floor ([did it work?](../02-core-practice/did-it-work.md)).

## You cannot amortise the data

The obvious next thought — buy once, sell to many, accumulate a local dataset that becomes an asset — is closed to you by contract, not by cost. Google's Maps Platform terms restrict caching and storage of place content, with a narrow exception and a hard time limit; owner-side content carries its own retention cap. The verbatim clauses, with section numbers and dates, are in [storing Google data legally](../05-reference/storing-google-data-legally.md) — read it before designing any storage layer. (Our compliance material is a reading of published terms, not legal advice.)

So **there is no data moat in local SEO.** You cannot accumulate one, you cannot resell one, and anyone offering you a proprietary local dataset is describing something they are not permitted to hold. What you *can* hold is your own dated measurement history — the scans, the positions, what you changed and when — an asset precisely because it cannot be bought.

## Labour is the business

The hours below are an example, built from this manual's own lab times — honest for someone who has done each thing a few times. Your first month will be slower; measure your own in Lab 30.2.

| Phase | Work | Example hours |
| --- | --- | --- |
| Onboarding, one-off | Access and connection, diagnostic, baseline freeze, keyword set, competitor set, citation pass, site audit, first fixes | 6–8 |
| Monthly, recurring | Re-scan and read, reviews and replies, a post or two, competitor read, report, client conversation | 2.5–4 |
| Occasional | A suspension, a merge, a migration, a review crisis | Unbudgeted, and it will happen |

Put an example rate on it — $60 an hour; use your own. Onboarding is roughly **$400 of your time**, a steady month **$150–240**. Against those, a managed client's data bill is under ten dollars: **data is around 3–5% of delivery cost.** Cost-plus pricing on the data bill is therefore not conservative, it is arithmetic that prices your month at nothing.

Onboarding is also front-loaded and unrecovered — a client who leaves at month three cost you more than they paid, which is what a minimum term is for. And the "occasional" row is not padding: [what you inherit with a client](./what-you-inherit-with-a-client.md) and [suspensions and reinstatement](../03-advanced/suspensions-and-reinstatement.md) exist because those events land on somebody's calendar without warning.

### What automation actually removes

Most of the monthly cycle is mechanical, and an agent can take the fetch-read-assemble spine of it ([running local SEO with an AI agent](./running-local-seo-with-an-ai-agent.md)) — perhaps half the recurring hours. What it does not remove, and you should price accordingly:

- **The judgement calls.** Whether a movement is real or noise. Whether to fight a suspension or rebuild. Which of thirty defects to do first.
- **The client conversation.** Nobody renews a retainer because the PDF arrived on time.
- **Anything written to Google in the client's name.** Reply text a human signs, photos a human took, posts a human approved. Automated review replies breach Google's review policy and AI-generated imagery breaches its photo policy — constraints on your architecture ([reviews](../02-core-practice/reviews.md), [photos and the visual profile](../02-core-practice/photos-and-the-visual-profile.md)), not efficiencies waiting to be captured.

So the agent is a labour lever, not a data one: more clients per hour, same judgement per client.

## How the work gets sold

Four shapes, and they price your *risk* as much as your work.

| Shape | What the client buys | Where the risk sits |
| --- | --- | --- |
| **Monthly retainer, per location** | The ongoing cycle | Yours, if onboarding is heavy and the term is short |
| **Fixed-price project** | An audit, a fix sprint, a reinstatement, a cleanup | Yours, if the scope was written loosely |
| **Per deliverable** | A grid scan, an AI-visibility report, a citation pass | Low risk, low margin, no compounding relationship |
| **Software resale or white-label** | Tooling with your name on it | Yours: support and churn arrive without a matching hour |

This manual will not quote you an average retainer. Published pricing surveys are self-selected samples with undisclosed methodology, and repeating one hands you a number you cannot defend when a client pushes back. Build your own price book — Lab 30.3 — from prices you can point at.

## Where the margin actually is

Four levers, in descending order of how much they move:

1. **Access.** A connected client's data is free; an unconnected book of business is the expensive way to run this.
2. **Hours per client.** Automate assembly, standardise the cycle, refuse bespoke report formats. The most room is here.
3. **Retention.** Onboarding repays around month three, which makes month-four churn the most expensive event in your accounts.
4. **Request discipline and cadence.** Small in dollars for one client, structural across a hundred.

And the honest conclusion, which is not a lever at all: **the margin is not in reselling data.** The data is cents, and any tool the client buys draws the same map you would show them. What they cannot do is decide what the map means, choose the three things worth doing next, and stand behind that choice in writing next month. That is what a retainer buys, and why [reporting to a client](./reporting-to-a-client.md) is an operating chapter rather than a formatting one.

So price from the client's side with a floor on your own. The floor is delivery cost plus a margin you can survive. The ceiling is what the outcome is worth to them, computable from numbers *they already have*: average job value, close rate on inbound calls, and what a lead costs them in paid channels. If a plumber's average job is $400 at a 30% close rate (an example — use their real figures), each extra call is worth about $120, so ten a month is a $1,200 ceiling. Quote inside that band and the conversation is about evidence rather than price.

## Labs

### Lab 30.1 — Cost a client-month at wholesale

> **Lab** · Where: a spreadsheet, plus [what Google's APIs cost](../05-reference/what-googles-apis-cost.md) · Cost: **free** · Time: ~30 min
>
> You need: your tracked keyword set (Lab 8.2) and tracked competitor set (Lab 16.1), so the counts are real rather than imagined.

1. List every deliverable for one client in one month, specifically: *four weekly 5×5 grid scans*, *ten keyword positions weekly*, *review sync and replies*, *five competitor refreshes*, *ten AI prompts across three engines weekly*, *one report*.
2. Beside each, write the live requests it needs. A grid scan is one per point; a rank check is one per keyword per run; a competitor refresh is one record per competitor.
3. Price every row twice: once assuming each request asks for the rich fields, once assuming it asks the minimum that answers the question. Sum both columns; write the ratio at the bottom.
4. Add labour — hours from the table above, at your own rate — and write the data share of delivery cost as a percentage.
5. Repeat for a *prospect audit* on a business you have no access to, then work out how many audits equal one hour of your time.

**What good looks like.** Two totals differing by more than 10×, and a data share in the low single digits. You can name the deliverable that dominates your data bill.

**If it went wrong.** A rich-fields total under a dollar means you counted a grid scan as one request rather than one per point. Two identical columns mean you have not found the cheap path for anything — usually every row priced at the top tier out of habit.

**What you just learned.** Cost of goods here is a design decision, not a fact handed to you — and a computed number is the only defence against both overpaying for tooling and underpricing your month.

### Lab 30.2 — Time the cycle, not the tooling

> **Lab** · Where: **Overview**, **Rankings**, **Reviews**, **Competitors** (`/b/{businessId}/…`) · Cost: **free** · Time: ~45 min
>
> You need: [Lab 17.3](../02-core-practice/did-it-work.md), so you have assembled a report once and know the steps.

1. Start a timer. Everything here reads stored data — press no refresh button. Note elapsed minutes at the end of every step.
2. **Overview**: read the profile score, the action plan and the review momentum card.
3. **Rankings**: read current positions and the latest grid snapshot, then write the one-sentence movement verdict you would put in a report.
4. **Reviews**: read every review since the last cycle and draft — in a text file, not in the app — the replies you would sign. This block will be the largest, and that is the finding.
5. **Competitors**: read the comparison, note what changed, then write the report paragraph you would send.
6. Total the blocks and multiply by your hourly rate. Then check the credit balance at the bottom of the sidebar: unchanged, because reading stored data is free ([how the labs work](../00-start-here/how-the-labs-work.md)).

**What good looks like.** A per-client-month hours figure with your name on it, broken into blocks, where the largest block is human writing rather than machine fetching.

**If it went wrong.** You finished in fifteen minutes — you skimmed instead of producing what a client would receive. The number is only useful if the output is one you would actually send.

**What you just learned.** Delivery cost is dominated by the blocks a machine cannot finish for you. Which is also the honest answer to "can this be fully automated": the assembly, yes; the sentences a client pays for, no.

### Lab 30.3 — Build a price book you can defend

> **Lab** · Where: your browser and a spreadsheet · Cost: **free** · Time: ~45 min
>
> You need: Labs 30.1 and 30.2, so you know your floor.

1. Open the published pricing pages of six things you might resell or depend on: rank tracking, a citation service, a review-request tool, a reporting tool, hosting, one paid directory listing. Record price, unit (per location? per user? per month?), date checked, and URL.
2. Find three agencies in your own market that publish prices. Many will not — record that, because opacity is the norm and it is why buyers cannot compare.
3. Ask one business owner what they pay for anything marketing-adjacent and what they think they get. One real answer beats an industry average.
4. Build three columns for one deliverable — say a managed month for one location: **floor** (data plus labour from Labs 30.1 and 30.2, plus a share of fixed costs), **market** (what you could find published), **ceiling** (the client-side arithmetic at the end of this chapter, with a real business's numbers).
5. Write your price, and beneath it the sentence you will say when someone asks why it is not cheaper. Then compute break-even: fixed monthly costs divided by margin per client, and how many months at your realistic sales rate that takes.

**What good looks like.** A dated table where every number has a source you could show a client, and a break-even count that is a target rather than a hope. "Most of this market does not publish prices" is a legitimate row.

**If it went wrong.** Your floor is above your ceiling — a genuine result, meaning the segment is too small, your hours per client are too high, or you are selling something nobody values. Better discovered in a spreadsheet than in month four.

**What you just learned.** A defensible price is assembled from three independent numbers, not copied from a competitor — and the ceiling always comes from the client's economics, never from yours.

## Common mistakes

**Pricing as a markup on the data bill.** It feels rigorous and prices your labour at zero. When data is 3–5% of delivery cost, "50% margin on cost" is a loss dressed as discipline.

**Buying a fetch that stored data already answers.** The most common way a beginner spends many times what a competent operator spends for the same insight. Read the timestamp on the card before pressing anything.

**Quoting a retainer with no minimum term.** Onboarding repays around month three; a client who leaves at month two was a loss however well you served them, and the fix is contractual, not operational.

**Treating free owner data as free work.** The connection costs nothing to call and is worth more than everything else combined. Never obtaining it because "the owner will get to it" is the expensive scenario — not the API bill.

## Check yourself

Answer with your own spreadsheets open, not in the abstract.

1. **What does one month of your standard deliverable cost in data, to the nearest dollar, and which line dominates it?** If it is not a number you computed in Lab 30.1, you are guessing.
2. **A competitor charges half your price. Name two cost structures that let them do that profitably, and one that does not.** (Fewer hours through automation; a cheaper request design. Not: buying the same data more cheaply — the list price is the list price.)
3. **Which of your deliverables survive a 10× rise in Google's data prices?** Anything on the free tier and on owner access barely notices; anything built on rich rows at every grid point becomes a different business.
4. **A client asks why they should pay you rather than buy the tool themselves. Answer without mentioning data access**, because they can buy that. What is left is the honest product.
5. **What is your break-even client count, and how many months does it take at your current sales rate?** If you cannot answer, you do not yet know whether this is a business or a hobby with invoices.

---

**Next:** [Staying current →](./staying-current.md)
