---
title: What the work costs
sidebar_position: 5
description: Why the data bill is a rounding error, what the labour actually costs, and where the margin in local SEO work really sits.
---

# What the work costs

You can do the work now. Whether it is a business depends on three numbers: what the data costs, what your time costs, and what someone will pay.

Most people entering this trade get the order of those wrong. They assume the data is the expensive part, because it is the part that arrives as an invoice from a technology company. It is not. Getting the order right protects you from two mistakes at once: building an operation optimised against the smallest line on your P&L, and quoting a price anchored to a bill that is a rounding error.

## Three cost lines, and only one is large

| Line | What it is | Order of magnitude, per managed client per month |
| --- | --- | --- |
| **Data** | Live calls to Google and to model vendors | Small — the smallest of the three, by a wide margin |
| **Labour** | Your hours, or someone's | Hundreds of dollars |
| **Fixed** | Tooling, your own site, accounting, unbilled hours | Amortised across your whole book |

**The API bill is not the cost of delivery; it is a rounding error on it** — which is why pricing off it is a trap. People who lose money doing local SEO lose it on unpriced hours, on clients who leave before onboarding is repaid, and on producing a monthly report nobody reads.

This is the single most important thing in the chapter, and it has a consequence people miss: **optimising your data costs is optimising the wrong line.** Halving a rounding error changes nothing. Halving the hours it takes to produce a monthly deliverable changes the business.

## What the data costs, in shape rather than in dollars

Google publishes current per-request prices for the place data underneath every local SEO tool, and those prices move — the platform was restructured in March 2025 and the rate card has been revised since. Any table printed here would be stale before it was useful, so this manual does not print one. Read it at source: [Google Maps Platform pricing](https://developers.google.com/maps/billing-and-pricing/pricing).

What is stable is the *shape*, and the shape is what you need in order to reason:

- **You are billed per request, by what you ask for.** A request is priced at the tier of the most expensive field in it, so two calls that look identical can cost very differently ([what the Places API will and will not give you](../05-reference/what-places-returns.md)).
- **The owner-side half is a different economic animal.** Business Profile, Search Console and PageSpeed are not billed the way place search is, so the richest data in local SEO — performance, full review history, the search terms people actually used — does not scale in cost with how often you look at it. It scales with whether the client connected their profile.
- **Cadence is a bigger lever than efficiency.** Map-pack positions drift over weeks. Scanning daily costs several times more than scanning fortnightly and tells you *less*, because the extra runs mostly measure your own noise floor ([did it work?](../02-core-practice/did-it-work.md)).
- **Model calls follow the same logic.** A monthly AI-visibility panel is a few dozen prompts, not a few thousand; the vendor's rate matters far less than how many times you decide to ask.

If you are costing a build or comparing vendors, take those four properties, put today's published rates against your own expected call volumes, and you will get a real number. It will be specific to your volumes and to this month, which is exactly why it belongs in your spreadsheet and not in a book.

## You cannot amortise the data

The obvious next thought — buy once, sell to many, accumulate a local dataset that becomes an asset — is closed to you by contract, not by cost. Google's Maps Platform terms restrict caching and storage of place content, with a narrow exception and a hard time limit; owner-side content carries its own retention cap. The verbatim clauses, with section numbers and dates, are in [storing Google data legally](../05-reference/storing-google-data-legally.md) — read it before designing any storage layer. (Our compliance material is a reading of published terms, not legal advice.)

So **there is no data moat in local SEO.** You cannot accumulate one, you cannot resell one, and anyone offering you a proprietary local dataset is describing something they are not permitted to hold. What you *can* hold is your own dated measurement history — the scans, the positions, what you changed and when — an asset precisely because it cannot be bought.

## Labour is the business

![A portfolio dashboard showing one business with summary tiles for count, average profile score, average rating and total reviews, and a card carrying a miniature nine-point rank grid and a "Connect Google for views & calls" prompt](../../static/img/screens/dashboard.png)

*This is what a book of clients looks like from above, and it is the right picture to hold while reading the numbers below. The tiles and the mini-grid cost you nothing to look at — they are stored readings. What costs is the sentence a human has to write underneath each card once a month, and the phone call that follows it.*

The hours below are an example, built from this manual's own lab times — honest for someone who has done each thing a few times. Your first month will be slower; measure your own in Lab 30.2.

| Phase | Work | Example hours |
| --- | --- | --- |
| Onboarding, one-off | Access and connection, diagnostic, baseline freeze, keyword set, competitor set, citation pass, site audit, first fixes | 6–8 |
| Monthly, recurring | Re-scan and read, reviews and replies, a post or two, competitor read, report, client conversation | 2.5–4 |
| Occasional | A suspension, a merge, a migration, a review crisis | Unbudgeted, and it will happen |

Put an example rate on it — $60 an hour; use your own. Onboarding is roughly **$400 of your time**, a steady month **$150–240**. Against those, a managed client's data bill is a small fraction of delivery cost — the exact share is one you compute in Lab 30.1 from your own volumes and today's rates, not one you take from here. Cost-plus pricing on the data bill is therefore not conservative; it is arithmetic that prices your month at nothing.

Onboarding is also front-loaded and unrecovered — a client who leaves at month three cost you more than they paid, which is what a minimum term is for. And the "occasional" row is not padding: [what you inherit with a client](./what-you-inherit-with-a-client.md) and [suspensions and reinstatement](../03-advanced/suspensions-and-reinstatement.md) exist because those events land on somebody's calendar without warning.

### What automation actually removes

Most of the monthly cycle is mechanical, and an agent can take the fetch-read-assemble spine of it ([running local SEO with an AI agent](./running-local-seo-with-an-ai-agent.md)) — perhaps half the recurring hours. What it does not remove, and you should price accordingly:

- **The judgement calls.** Whether a movement is real or noise. Whether to fight a suspension or rebuild. Which of thirty defects to do first.
- **The client conversation.** Nobody renews a retainer because the PDF arrived on time.
- **Anything written to Google in the client's name.** Reply text a human signs, photos a human took, posts a human approved. Both of the obvious shortcuts are closed by policy, not by taste. Google's Business Profile APIs policies forbid automating review replies "without the user's prior specific and express consent"; Google's business-photo guidance says a photo "should be in focus, well lit, and have no significant alterations or excessive use of filters or AI. In other words, the image should represent reality" (*Tips for business-specific photos on your Business Profile*, retrieved 2026-07-27). Those are constraints on your architecture ([reviews](../02-core-practice/reviews.md), [photos and the visual profile](../02-core-practice/photos-and-the-visual-profile.md)), not efficiencies waiting to be captured.

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

### Lab 30.1 — Cost a client-month, and find which line dominates

> **Lab** · Where: a spreadsheet, plus [what the Places API will and will not give you](../05-reference/what-places-returns.md) · Cost: **free** · Time: ~30 min
>
> You need: your tracked keyword set (Lab 8.2) and tracked competitor set (Lab 16.1), so the counts are real rather than imagined.

1. List every deliverable for one client in one month, specifically: *four weekly 5×5 grid scans*, *ten keyword positions weekly*, *review sync and replies*, *five competitor refreshes*, *ten AI prompts across three engines weekly*, *one report*.
2. Beside each, write the live requests it needs. A grid scan is one per point; a rank check is one per keyword per run; a competitor refresh is one record per competitor.
3. Price each row against Google's current published rates for the calls it needs. Sum the column.
4. Add labour — hours from the table above, at your own rate — and write the data share of delivery cost as a percentage.
5. Repeat for a *prospect audit* on a business you have no access to, then work out how many audits equal one hour of your time.

**What good looks like.** A data share that is a small fraction of delivery cost, and the name of the one deliverable that dominates it — almost always the one you run most often, not the one that looks most expensive per call.

**If it went wrong.** A total under a dollar usually means you counted a grid scan as one request rather than one per point. A data share above a quarter means you are either scanning far more often than the data moves, or you have not counted your own hours honestly.

**What you just learned.** Which line your business actually runs on. Almost everyone entering this trade optimises the data bill because it arrives as an invoice, and almost nobody optimises the hours, which is where the money goes. Cadence — how often you re-measure — moves your data cost far more than any other choice, and it is the one you can change this afternoon.

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

**Pricing as a markup on the data bill.** It feels rigorous and prices your labour at zero. When data is a few per cent of delivery cost, "50% margin on cost" is a loss dressed as discipline.

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
