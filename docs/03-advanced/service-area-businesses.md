---
title: Why map-pack rank tracking cannot work for service-area businesses
sidebar_position: 2
description: A hidden-address business has no public coordinate, so a rank map cannot be measured for it — in this tool or any other. What to measure instead.
draft: true
---

# Why map-pack rank tracking cannot work for service-area businesses

> **Unpublished draft.** This chapter names a defect in SEOG's own screens: on a hidden-address business a geo-grid scan returns an all-grey map, and the app then advises growing reviews — advice that cannot help, because the absence is structural rather than competitive. It does not publish until the product says so on screen. It sits in the repository meanwhile so the argument is readable and arguable while that is fixed.

A plumber with no shopfront can sit in the map pack all day and be permanently invisible to the instruments that measure the map pack. Not ranking badly — unmeasurable. Every grid you run for that business comes back the same colour whatever you do to the profile, and the two numbers underneath it are arithmetic on an empty set.

This is the manual's cleanest example of a measurement that produces output and means nothing. The previous chapter taught you to audit a grid you can trust; this one teaches you to spot the case no careful reading rescues.

## Three shapes of business, and only one is the problem

Google's owner-side record holds an address and a service area as two independent things. Their combination is the classification — and the classification, not the industry, decides whether any of this applies.

| Shape | Address on Google | Service area | Public coordinate | Rank tracking |
| --- | --- | --- | --- | --- |
| **Storefront** | Published | None | Yes | Works normally |
| **Hybrid** | Published | Declared | Yes | Works normally |
| **Pure service-area** | Hidden | Declared | **No** | Structurally impossible |

A hybrid — a tyre shop that also comes to you, a bakery that also caters — publishes a street address, so it has a public pin and Part II applies to it unchanged. Do not let a client's *self-description* decide this: "we're mobile" is said by plenty of businesses that publish an address. Classify by what Google shows, which is Lab 19.1.

Google's guidelines require a business that does not serve customers at its address to hide that address. The pure case — a service-area business, SAB for short — is therefore not an exotic misconfiguration. It is the compliant state for a mobile locksmith, a house cleaner, an emergency plumber, and in several trades it is the majority.

## What a rank check is actually doing

Strip the map off and the mechanism is four steps.

1. Choose a coordinate.
2. Ask Google's place data for the ranked local results there.
3. Look for your business's identifier in the returned list.
4. Your rank is the index where you found it. A grid repeats this over a lattice.

Two hard requirements, then: an identifier that *appears in the results*, and a defensible centre for the lattice. A pure service-area business fails both, independently. Either failure alone would be fatal.

## The first wall: the public record does not contain the business

Google's public place search leaves pure service-area businesses out of its results by default. A request option exists to include them, and the rank paths do not use it — deliberately, because of the second half of the same rule: even when they *are* included, Google returns them without an address and without coordinates. The record that comes back is not a place; it is a business that declines to be one. (The option and the withheld fields are named and dated in [the GBP capability matrix](../05-reference/gbp-capability-matrix.md). Verified 2026-07-27.)

So step 3 never succeeds. The identifier is not in the list at any coordinate, ever, for any query. Twenty-five points, twenty-five misses, twenty-five grey pins.

Read what that does to the two summary figures from [the previous chapter](./reading-a-geo-grid.md). Average rank is computed over the points where you appeared — there are none, so the figure is undefined and the app prints a dash. Top-3 coverage counts every point in its denominator, so it prints a confident **0%**. Same empty measurement, two very different-looking outputs, one of which reads as a devastating result rather than as no result.

The trap is that this looks exactly like a genuinely uncompetitive storefront: a new coffee shop with four reviews also produces twenty-five grey pins. No statistic computed from the grid separates the two cases. Only the classification does — which is why Lab 19.1 comes before every other measurement decision for this kind of client.

And the cruellest part: the business is not invisible to *customers*. A hidden-address plumber appears in the pack on a phone, gets called, takes the job. The absence is in the data layer rank tools read, not in the result the searcher sees. You are watching a real business win real work through an instrument that reports nothing.

## The second wall: there is no centre to draw from

Suppose the first wall vanished tomorrow and Google returned these businesses in ranked results, coordinates and all. The grid would still not mean what a grid means.

A rank map's whole content is *rank as a function of searcher location*. The gradient is the finding: green near the pin, fading outward, because [proximity dominates at short range](../01-foundations/relevance-distance-prominence.md). For a storefront the centre is not an arbitrary choice — it is the building, the same point Google measures distance to.

A pure service-area business has no such point, so a centre has to be manufactured. SEOG manufactures one: with no usable coordinate on the profile it takes the first declared service area and uses that place's own point — a town or district centroid. That anchor is honest engineering, and it is what makes competitor discovery and AI probes work at all here. It is not a location of the business, and a gradient drawn from it answers "how does my rank vary with distance from the middle of Austin" — a question nobody asked.

Worse, nobody outside Google knows what Google substitutes for distance when ranking a business with no point. Whether the declared service area acts as a boundary, a weight, or nothing is undocumented. *(Inference from absence: Google's local ranking guidance describes distance in terms of a business location and says nothing about the case where there is none.)* Even a perfect rank-versus-location measurement here would measure a mechanism you cannot name.

[The centre is not a neutral place to stand](./reading-a-geo-grid.md) is true of every grid. For this one it is not even a place.

## This is our defect too, and here is exactly where

A chapter that says "no tool can do this" while its own tool silently pretends otherwise is worthless. So, precisely:

**SEOG will run a grid scan on a pure service-area business and charge you for it.** Nothing on the Rankings screen warns you first. You get grey pins, an avg rank of `—` and top-3 coverage of `0%`.

**The summary above the map then gives advice that cannot work.** On an all-grey scan it says the business did not appear in the top 20 at any point checked, and that growing reviews and putting the term in the profile can help it start showing up. For an uncompetitive storefront that is good advice. For a hidden-address business it is false: no quantity of reviews puts a record into a result set it is excluded from.

**Competitor discovery makes a stronger false claim.** Its list is headed by a sentence saying you did not appear in the top 20, so every result below outranks you. The first clause is right for the wrong reason and the second does not follow. You were not outranked; you were not in the population.

**The audits are fine, one by luck and one by design.** None of the profile audit's eleven checks demands an address. The website audit is deliberately correct: it drops the address and map-embed checks for this business type rather than failing them ([the website half](../02-core-practice/the-website-half.md)).

**The add-business path already says this out loud.** Search cannot find a hidden-address profile, so importing one is refused, pointing you at *Import from your Google account*. A useful side effect: **every pure service-area business in SEOG is owner-connected by construction** — so the one family of measurement that does work is always available.

The gap is on Rankings and Competitors. It is a disclosure gap rather than a data gap, and until it closes this chapter stays a draft.

## What other tools do about it

Two mechanisms, both described in [why two tools disagree](./why-two-tools-disagree.md). A tool built on **ranked place data** — SEOG's family — hits the first wall and produces no number. A tool that **renders consumer search pages from a spoofed location** can see a hidden-address business, because the pack a human sees contains it, so it does produce one. It still hits the second wall: it has to invent a centre, and its gradient is uninterpretable for the same reason ours would be.

So the accurate claim is not "no tool returns a figure". It is: **for a pure service-area business a map-pack rank is either unmeasurable or uninterpretable, and no tool manages the third thing.**

## What to measure instead

The good news is unusually good: what survives is closer to money than a rank ever was.

| Measurement | Works for a pure SAB? | Where | Cost |
| --- | --- | --- | --- |
| Profile views, calls, website clicks, messages, bookings | **Yes** — owner data, no coordinate involved | Overview → performance panel | paid |
| Direction requests | Technically yes, practically near zero — no address to navigate to | same | — |
| The search terms people actually used | **Yes** | Overview → search-keywords card | paid |
| Reviews: volume, rating, recency, reply rate | **Yes** | Reviews | free to read |
| AI visibility across engines | **Yes** — and no coordinate problem | AI Visibility | paid per check |
| Citation and NAP consistency | Partly — name and phone only; there is no address to compare | AI Visibility → Citations | paid |
| Website audit | **Yes**, with address and map-embed checks dropped | Website | paid to refresh |
| Competitor set and the bar it sets | Yes, from a typed area — but your own row is absent | Competitors | paid |
| Map-pack position, geo-grid | **No** | — | — |

Three deserve a sentence each.

**Owner performance is the spine** — profile views split across Search and Maps, calls, clicks and messages, as daily history running back about eighteen months. That is outcome rather than position: a promotion, not a consolation prize. Its limit must be stated in every report: Google publishes **no geographic breakdown**, so "calls went up 40%" can never be attributed to a town ([what Google's reporting hides](../05-reference/what-googles-reporting-hides.md)).

**The search-terms report is the closest thing to a keyword measurement you get.** Two caveats govern its use: it counts impressions, not positions, so a term you appear for often may be a term you appear for badly; and low-volume terms come back as a privacy threshold rather than a count, rendered as `<15`. You cannot sum a column containing those and present the total as a number.

**AI visibility is the one surface where a service-area business is not disadvantaged.** An assistant asked "who's the best emergency plumber near Kilburn" consults no coordinate index; it answers from text. The town-centroid anchor that is meaningless as a grid centre is exactly right as a probe location, because the probe asks about the town. Run it as a rate over repeated runs across engines — the method in [measuring AI visibility](./ai-visibility.md).

None of this needs a tool. The performance series and the search terms are in Google's own Business Profile interface, free, for anyone with owner access; the AI probes are a browser and a fixed prompt list. [Doing it without SEOG](../99-appendix/doing-it-without-seog.md) has the manual version.

## What you promise a service-area client

Rewrite the engagement before you sign it, not after the first report. Do not promise a rank. Promise profile completeness, a review programme with a stated inflow target, the published search terms each month, calls and clicks against a dated baseline, and an AI-visibility rate across a fixed prompt set. All measurable, all defensible, none requiring a coordinate. If you inherit an account whose old reports carried a grid, explain the mechanism and stop producing the picture — you are replacing a coloured map with call volume ([what you inherit with a client](../04-operating/what-you-inherit-with-a-client.md)).

One temptation to kill now: **do not add a street address to make the business trackable.** Publishing an address at which you do not serve customers — a home, a mailbox, a co-working desk — breaks Google's guidelines and is a standard route to a hard suspension, which costs the client every review and ranking they had ([suspensions and reinstatement](./suspensions-and-reinstatement.md)).

## Labs

### Lab 19.1 — Classify before you measure

> **Lab** · Where: **Overview** and **Profile** (`/b/{businessId}/overview`, `/b/{businessId}/profile`) plus Google Maps in a browser · Cost: **free** · Time: ~10 min
>
> You need: your practice business added ([Lab 0.3](../00-start-here/set-up-your-workbench.md)).

1. Open the business overview. Read the line under the business name in the page header. A street address looks like one; a service-area business shows a place name, often with a `+N more` suffix — a list of declared service areas, not an address.
2. Open **Profile** and follow the **View on Google Maps** link in the contact rows.
3. On the Google listing, look for either a street-address row with a pin, or a line stating the areas served and no address at all.
4. Classify, and write the verdict at the top of your notes for this account: *storefront* (address, no service area), *hybrid* (address **and** areas served), *pure service-area* (areas served, no address).
5. If it is pure service-area, add one line: **"map-pack rank is not measurable for this business"** — and from here on treat every rank figure you meet for it as an artefact.

![The overview header for Kaffa Roastery, with the street address Pursimiehenkatu 29, 00150 Helsinki, Finland printed directly under the business name](../../static/img/screens/overview.png)

*Step 1, on a storefront: the street address printed under the business name is the whole classification, and Part II applies to this business unchanged. A pure service-area business shows a place name on that line instead — often with a `+N more` — and no street address anywhere on the page. Which of the two you are reading decides which measurements exist for the account.*

**What good looks like.** A one-word classification you could defend by pointing at the owner's own Google listing, in a note that survives to the moment somebody asks for a ranking report.

**If it went wrong.** The overview header shows only a city: the business came in through the owner connection and Google has no public record matched to it — itself strong evidence of the pure case. There is a street address on Maps but the owner insists they are mobile: they are a hybrid. Believe Google, not the self-description.

**What you just learned.** Classification is a *measurement decision*, not a profile detail. Get it wrong and every number downstream is either the wrong number or no number, and you cannot tell which.

### Lab 19.2 — Buy the proof once

> **Lab** · Where: **Rankings** (`/b/{businessId}/rankings`) · Cost: **paid** · Time: ~5 min
>
> You need: Lab 19.1, with a verdict of **pure service-area**. If your practice business is a storefront or a hybrid, do not run this — read *What good looks like* below and move to Lab 19.3.

This lab spends money to produce nothing, deliberately and exactly once. The alternative is producing nothing accidentally, every month, on a client's budget.

1. Track one keyword the business genuinely competes for — a service plus nothing else. Adding a keyword runs a first rank check, so a position appears immediately.
2. Read that position. It is `—`.
3. Select the keyword to open **Geographic visibility**. Choose the **Quick** preset (3×3, 9 searches — the smallest) and press **Check now**.
4. Read the finished scan whole: the nine pins, both summary sentences, **Avg rank**, **Top-3 coverage**.
5. Write the detail sentence down verbatim, and underneath it why its advice cannot work here.
6. Do not run a Standard or Detailed scan. A larger lattice of the same nothing costs more and teaches less.

**What good looks like.** Nine grey pins. Headline: *Not visible across this area yet*. Avg rank `—`, Top-3 coverage `0%`. And a detail sentence recommending reviews and profile keywords, which you have written out and refuted.

**If it went wrong.** Some pins carry numbers: the business is a hybrid, not a pure service-area business — redo Lab 19.1, and note that the rest of this chapter does not apply. Nothing seems to change after the scan: check the timestamp beside the map, because you may be looking at an earlier cached scan.

**What you just learned.** An all-grey grid has two causes that look identical — uncompetitive, or unmeasurable — and no statistic computed from the grid separates them. Only the classification does, which is why it came first.

### Lab 19.3 — Build the scoreboard that works

> **Lab** · Where: **Overview** (`/b/{businessId}/overview`) · Cost: **paid** · Time: ~15 min
>
> You need: Lab 19.1, and a business connected to its Google Business Profile — a pure service-area business always is, because that is the only way it could have been added.

1. On the overview, find the performance panel and press **Load performance data**. The price is on the button. One charged click buys the full history; switching periods afterwards is free.
2. Read the metric tiles: profile views, website clicks, calls, direction requests, messages, bookings. Note which are zero and say why — direction requests near zero is the correct result for a business with no address.
3. Switch the period to 12 months and read the shape of the trend, not the last week.
4. Find the search-keywords card — the terms people typed to reach the profile. Press **Load trend** to buy the month-by-month history.
5. Mark every value rendered as `<N`. Those are Google's privacy thresholds, not counts. Write the rule: thresholded rows are reported as thresholded, never summed into a headline figure.
6. Write a dated baseline of six lines containing **no rank**: date, profile views, calls, website clicks, review count, rating. Save it beside the frozen baseline from [Lab 7.3](../02-core-practice/analyzing-business-visibility.md).

**What good looks like.** A dated six-line baseline with no position in it, the top search terms with thresholded rows flagged, and one sentence stating what this data cannot tell you — where any of it happened.

**If it went wrong.** The panel offers to link a location instead of loading: the profile is not connected, which on a pure service-area business should be impossible — check which business you are on. The keyword table shows one total column and no monthly trend: Google returned a trailing aggregate rather than a per-month series, and the app correctly declines to invent months from it. Everything reads zero: a quiet profile is a finding, not a failure.

**What you just learned.** Losing rank as a metric costs less than it feels like, because what replaces it is closer to the outcome the client is buying. What you lose irreplaceably is *geography*: no dataset available to you says where the calls came from.

## Common mistakes

**Reading an all-grey grid as bad performance.** It is not a position. Telling a hidden-address client "we're not ranking anywhere" is a factual error, and the correction — that the number never existed — is a far worse conversation six months in than on day one.

**Selling map-pack rank to a service-area client.** The commonest version is unexamined rather than dishonest: the proposal template has a rank section, the trade happens to be a hidden-address one, nobody classified it. That is what Lab 19.1 is for.

**Adding a street address so the tools work.** Guideline violation, standard suspension cause, and it can destroy the listing you were hired to grow.

**"Add more service areas and we'll rank in more towns."** Google publishes no mechanism by which a declared service area changes ranking, and this manual has verified none. Treat it as unproven in both directions — and note that claiming an area you do not serve breaks the guidelines anyway.

**Comparing a service-area business to storefront rivals on rank.** The competitor list is real — those businesses genuinely rank there — but your client has no row in it. Use it to read the bar (ratings, review counts, who holds the top three), never to imply a position relative to it.

## Check yourself

Answer against your own practice business, or a service-area business you can look up.

1. **Which of the three shapes is it, and what did you look at to decide?** "The owner told me" is not an answer. Google's listing is.
2. **A grid comes back entirely grey. Name the two causes and the one piece of information that distinguishes them.** If your answer involves the grid itself, re-read the first wall.
3. **Someone shows you a rank map for a hidden-address plumber. What do you say?** At minimum: which family of tool produced it, and why the gradient has no defensible interpretation even if the pins are real.
4. **Your service-area client asks "are we ranking better than last quarter?" Give the honest answer and the three numbers you offer instead.**
5. **Profile views are up 30% quarter on quarter. What can you not say about that number?** At minimum: nothing about which town it happened in, and nothing about position.

---

**Next:** [Measuring AI visibility →](./ai-visibility.md)
