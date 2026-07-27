---
title: Doing all of this without SEOG
sidebar_position: 6
description: Every lab in this manual done by hand — the free tool for each job, what each one costs you in time, and the three things that are genuinely hard without software.
---

# Doing all of this without SEOG

Every practical chapter in this manual ends with a note saying the lab works by hand and pointing here. This is the long version: for each family of lab, the manual method, what it costs in time, and what you give up.

Nothing in local SEO is locked behind a tool. The data comes from Google, and almost all of the useful half is free to anyone with owner access to the profile. What software buys you is not access — it is **history you did not have to remember, conditions you did not have to reproduce, and breadth across a portfolio**. Those three things are worth naming precisely, because they are the only honest argument for tooling, and two of them are the reason hand-run local SEO usually fails in month four rather than week one.

If you read only one section, read [The three things that are genuinely hard](#the-three-things-that-are-genuinely-hard). If you are here to build rather than to click, skip to [If you would rather build it than click it](#if-you-would-rather-build-it-than-click-it).

## The short answer

| Job | By hand | Verdict |
| --- | --- | --- |
| Reading a search result page | Browser, private window | **Easy.** The labs already do this; no tool involved. |
| Checking a rank from one point | Maps centred on a coordinate | **Easy once.** Painful the twentieth time, and the twentieth time is the point. |
| Running a geo-grid | The above, repeated per point | **Slow but exact.** An afternoon per 25-point scan. |
| Auditing a profile | Business Profile dashboard + a rubric you write | **Easy.** An hour, and better than a score because you wrote the checks. |
| Editing the profile | Google's own editor | **Easy, and often better.** More fields than any API exposes. |
| Reviews and replies | Business Profile dashboard | **Easy.** One extra step: verify the reply published. |
| Posts | Business Profile composer | **Easy, and more capable.** Video and product posts exist here and nowhere else. |
| Citations | Site-by-site search, by hand | **Slow.** About an hour per business, no cheap re-check. |
| Website audit | Lighthouse, Rich Results Test, Search Console | **Easy and free.** Genuinely no reason to pay for this. |
| Competitor tracking | Maps + a spreadsheet | **Easy per reading, hard per quarter.** |
| AI visibility | Ask the assistants yourself, record every answer | **Easy per run, brutal at matrix scale.** |
| Proving a change worked | Your own baseline, change log and re-reading | **This is where hand-run programmes die.** |
| Running twenty businesses | All of the above, twenty times | **Not viable past about five.** *(Our estimate, from doing it.)* |

Two patterns run through that table. **Everything that happens once is easy.** **Everything that has to happen identically, repeatedly, with a date attached is where a tool earns its price** — and where an unsupported human loses, not for want of skill but for want of a filing habit that survives a busy Tuesday.

## The free toolkit

Every tool below is free. Several are better than their paid equivalents, and a couple have no paid equivalent at all.

| Tool | What it is for | Notes |
| --- | --- | --- |
| **Google Maps**, private window | Pack order, competitor fields, rank readings from a chosen point | Centre the map before you search |
| **Google Business Profile** (owner) | Every profile field, reviews, replies, posts, photos, performance | Requires owner or manager access |
| **Google's Place ID Finder** | The stable identifier for a listing | `developers.google.com/maps/documentation/places/web-service/place-id` |
| **Chrome DevTools → Sensors** | Location override for sites that use the Geolocation API | See the caveat below |
| **Google Search Console** | The queries the *website* was shown for, 16 months | Free, first-party, and the only source of real query strings |
| **PageSpeed Insights** / **Lighthouse** | Site speed, Core Web Vitals, agent-readiness | Lighthouse locally gives you the newest categories first |
| **Rich Results Test**, **Schema Markup Validator** | Structured-data validation | `search.google.com/test/rich-results`, `validator.schema.org` |
| **Google Keyword Planner** | Search volume | Needs an Ads account; volumes arrive as ranges without active spend |
| **Google Trends** | Relative interest and seasonality | Relative, never absolute |
| **ChatGPT / Gemini / Perplexity / Claude** | AI visibility probes | Free tiers are enough; use a temporary chat |
| **Business Redressal Complaint Form** | Spam reporting, the heavy path | `support.google.com/business/contact/business_redressal_form` |
| **Bing Places**, **Apple Business Connect** | Two structured listings that are free to claim and own | Neither is Google; both are retrievable records about your business that assistants can reach *(inference)* |
| **A spreadsheet and a dated folder** | Everything else | The actual product of this chapter |

That last row is not a joke. The spreadsheet is the instrument. A specification for it is at the end.

## Lab by lab, by hand

### Measuring where you rank — Labs 3.1, 4.1–4.3, 18.1–18.3, 22.1–22.3

**The reading.** Open a private window. Go to Google Maps and centre it on the coordinate you want to measure from — the URL takes the coordinates directly, in the form `/maps/@60.1699,24.9384,14z`. Search your keyword. Count listings from the top until you reach the business; if you pass twenty without finding it, record "not in twenty" rather than a blank. Write down, in the same row: the keyword, the coordinate, the date and time, the language, and whether you were signed out. Map results follow the map's centre *(inference — reliably observed, not documented by Google; the observation is that moving the centre and re-running the identical query reorders the list)*.

**The DevTools route, and its caveat.** Chrome's Sensors panel lets you override the browser's reported location with an arbitrary latitude and longitude. This works cleanly for anything that asks the Geolocation API — Maps does. Google web search is a murkier case: it derives location from several signals and does not always use the browser API, so an override may change nothing on the web results page while changing everything on Maps. Test both on your own machine before trusting either. There is also a widely circulated URL parameter for forcing a search location; it is undocumented, unsupported, has broken before and will break again. Do not put a client report on top of it.

**A grid.** A grid is the above, repeated. Pick a centre, pick a spacing, lay out an odd-sided lattice so the business sits on a point, and run every point. Twenty-five points is an afternoon done properly — the discipline is that every point must be run under the *same* conditions, which means one sitting, one browser profile, one language, one signed-out session. Record one row per point: coordinate, position, timestamp. Reading the result is arithmetic you do yourself, and [Reading a geo-grid](../03-advanced/reading-a-geo-grid.md) is the arithmetic.

**What you lose.** Not accuracy — a careful hand reading is as good as any API reading, and better than a careless one. You lose the ability to run the *same* grid again in six weeks under matched conditions, which is the only form in which a grid means anything. The second scan is the one that matters and the second scan is the one nobody runs.

**If you would rather script it**, the search half of a grid is free at Google's list price: an IDs-only field mask on Text Search bills at $0.00, and rank is the array index — [LSM-PLACES-04 and LSM-PLACES-06 in *What Google's APIs cost*](../05-reference/what-googles-apis-cost.md). Resolving *who* the businesses above you are is billed, and is a separate purchase you should make rarely.

### Auditing a profile — Labs 1.2, 7.1–7.3

**The reading.** Two passes. First from outside: open the business on Google Maps in a private window and record every field a searcher can see — name, category, address, hours, phone, website, photo count, rating, review count, attributes. Then from inside, if you have access: open the Business Profile dashboard and record the fields the public record does not carry, the owner-written description first among them.

**The rubric.** Do not look for a score; write the checks. Twenty rows in a spreadsheet, each a yes/no with a weight you chose and can defend. The two rubrics in [Diagnosing a business in thirty minutes](../02-core-practice/analyzing-business-visibility.md) are published with every check, threshold and weight precisely so you can copy them into a sheet and disagree with them. A rubric you wrote is more useful than a score you were handed, because you know what it does not measure.

**The one discipline that matters.** Three states, not two: present, absent, and *not observable from here*. Without owner access the description, the full review history and every performance number are **unknown**, not missing. Writing "unknown" in a client-facing audit is the single clearest signal that the audit was done rather than generated.

**Freezing it.** Save the sheet with the date in the filename and never edit that copy again. Screenshot the profile as it stands. This takes ten minutes and is the difference between a programme you can report on and one you cannot.

**Time:** about an hour for a first full audit, twenty minutes for a re-audit against your own sheet.

### Choosing what to track — Labs 6.1–6.3, 8.1–8.3

**With owner access**, the terms people actually used to reach the profile are in the Business Profile dashboard's performance section, free, and there is no substitute for them anywhere. Read them with the caveats in [What Google's own reporting hides](../05-reference/what-googles-reporting-hides.md): the list is a top-N rather than everything, low-volume terms arrive as a privacy threshold rather than a count — "fewer than N", which a naive reading turns into N — and the window rolls, so **export or screenshot every month or you lose the tail permanently**.

**Without owner access**, type your category into the Google search box and read the autocomplete; repeat with each letter of the alphabet appended. That gives you what people search in your category, never what they searched to find this business, and the difference is the whole reason the owner report is worth having.

**Volume** comes from Keyword Planner, which needs a Google Ads account. Without active spend the numbers arrive as wide ranges. Google Trends gives you shape and seasonality but never absolute figures. Both are free; neither is precise, and any tool quoting exact monthly volumes for a small-town service term is quoting a model, not a measurement.

**The tracked set itself** is a spreadsheet tab: one row per keyword, with columns for the intent class it covers and the date you added it. The work is not collecting terms — it is pruning to a set that spans the intents and stays small enough that you will actually re-read it.

### Editing the profile — Labs 9.1–9.3, 2.1–2.3

Google's own editor is the reference implementation, and for a single location it is a perfectly reasonable place to work. It exposes fields no API does, and it will tell you when an edit needs re-verification.

Google has been moving single-location management out of the standalone manager and into Search and Maps themselves; if one entry point bounces you, try the other — search your business name while signed in as the owner and the edit panel appears in the results. *(Behaviour observed 2026-07; Google has moved this more than once.)*

Three things to carry over from the API side of the manual, because they bite in the interface too:

- **A saved edit is not a published edit.** Google accepts, then reviews. Re-read the field on the public profile in a private window a day later — [LSM-GBP-07 in *Write limits and failure modes*](../05-reference/write-limits-and-failure-modes.md).
- **Name, category and address edits can force re-verification**, which can take the listing off search while it runs. Do them deliberately, never on a Friday.
- **There is a rate cap on profile edits.** It is generous enough that a human clicking cannot normally reach it, and easy to reach if you queue thirty changes and paste them all at once. Spread bulk work out.

**What you lose by hand:** the log. No record of what changed and when, no baseline to undo to, and no answer three months later to "what did we change in March?" The substitute is a change-log tab with four columns — date, field, old value, new value — filled in *before* you press save. It works, and it is the first habit to lapse.

### Photos — Labs 10.1–10.3

Upload through the dashboard. Everything the manual says about photos holds identically: uploads are reviewed before they appear, you can delete photos you uploaded and not photos customers uploaded, and there is no reorder.

The policy constraint is not a tooling question and does not change by working manually. Google's media guidelines require profile media to represent reality; AI-generated and stock imagery is out of policy, and no tool, workflow or prompt makes it compliant — [LSM-POLICY-01 in *Write limits and failure modes*](../05-reference/write-limits-and-failure-modes.md) carries the text. Take the photographs.

### Reviews and replies — Labs 11.1–11.4

The dashboard shows every review and lets you reply to each. That is the whole job, and it is free.

Two things a dashboard will not do for you.

**Verify the reply is public.** The interface shows your reply because it wrote it. Owner replies are moderated and can be rejected, and a published reply can later disappear — [LSM-REVIEWS-04 in *Write limits and failure modes*](../05-reference/write-limits-and-failure-modes.md). The manual method is one extra click: open the business profile in a private, signed-out window and read the reply on the public listing. Do it for every reply that matters, a day after posting.

**Give you history.** Review counts and ratings move slowly and the dashboard shows today. One row per month in a spreadsheet — date, review count, rating, replies outstanding — is thirty seconds a month and is the only way you will ever draw the curve.

And the constraint that no tool changes: **automating review replies is prohibited without the user's prior specific and express consent**, and replying on a client's behalf requires their authorisation. Google's *Business Profile APIs policies* (developers.google.com/my-business/content/policies, last updated 2025-08-28), under abusive behaviours:

> "You may not use the Business Profile APIs to engage in abusive behaviors, which includes but isn't limited to fraudulent, abusive, or otherwise invalid activity. For example, you must not automate or trigger review replies, Q&As, listing creations, listing edits, or other actions without the user's prior specific and express consent."

This is our reading of published terms, not legal advice. A human writing and approving each reply is fine and is what every review lab in this manual does. Working by hand does not exempt you from the authorisation half — get the client's approval in writing before you reply as them.

### Posts — Labs 15.1–15.4

Compose posts in Google's own interface. It is **more** capable than the API, not less: video, product posts and editing a published post's photo all exist there and are impossible through the API — [the Local Posts section of *Write limits and failure modes*](../05-reference/write-limits-and-failure-modes.md) is the inventory of what the API cannot do.

What you give up is validation and memory. The undocumented limits — the character caps, the event-title cap, the CTA rules — are enforced by rejection rather than by warning, and a rejected or policy-blocked post is not always loud about it. The manual substitute is a posts tab: date, topic type, the text you published, the CTA, and a column for "confirmed live", filled in by looking at the public profile.

### Citations and NAP — Labs 12.1–12.4

Search `"Business Name" "phone number"` and `"Business Name" "street address"` in quotes and open every result. Then search the business name directly on each platform that matters in your category. Record four verdicts per platform and keep them distinct: **consistent**, **mismatch** (with both values), **not found**, and **can't verify**. Collapsing the last two is how people create duplicate listings on platforms that already had one.

Claiming is manual everywhere, in every tool. There is no button on any platform that gets you listed on Yelp; you go to Yelp.

**Time:** about an hour per business for the first pass. No cheap re-check — which is the real cost, because citations decay after a move or a rebrand and you will not notice without a re-run.

**Work the gap, not the list.** The generic 300-directory list is the same for every business in every market. The version worth doing joins two things you can observe yourself: the domains assistants actually cite when answering your keywords (next section), and the listings you verified exist. Fix the intersection.

### The website half — Labs 13.1–13.3, 14.1–14.3

This is the easiest section to do without any tool, and one where paying for tooling is hard to justify.

- **Speed and Core Web Vitals:** PageSpeed Insights, free, unlimited. Interaction to Next Paint comes only from real visitors, so a low-traffic site legitimately has no INP figure — a dash is the honest display, and any tool showing you a number there invented it.
- **Agent-readiness:** run Lighthouse locally, from Chrome DevTools or the CLI. The Agentic Browsing category needs Lighthouse 13.3 or newer; an older Chrome will not show it. Whether the hosted PageSpeed Insights carries the newest category depends on the Lighthouse version it is running — the report stamps the version, so check it rather than assuming.
- **Structured data:** view-source, then Google's Rich Results Test and the Schema Markup Validator. Both free, both authoritative.
- **Query data:** Search Console. Sixteen months, first-party, free, and there is no substitute. One reconciliation trap worth knowing even by hand: the interface shows fresh data including the last few days, while the API defaults to *final* data and silently drops them. If a report built on the API disagrees with the client's own dashboard by a couple of days' worth, that is why — [LSM-MEASURE-12 in *What Google's reporting hides*](../05-reference/what-googles-reporting-hides.md).

**What you lose:** nothing much. Do this half by hand indefinitely.

### Competitors — Labs 16.1–16.4, 23.1–23.4, 25.1–25.3

**Who is above you** comes from running the search and writing down the pack in order, with the date and the coordinate. That is the same reading as a rank check and should live in the same sheet.

**What they look like** comes from opening each rival on Maps: category, rating, review count, photo count, attributes, hours, whether the name contains keywords that are not on their storefront. One row per rival, one column per field, one sheet per date.

**The spam scan** needs eyes rather than software. The families and the tests are in [Spam and fake listings](../03-advanced/spam-and-fake-listings.md); the reporting paths — *Suggest an edit* in Maps for the light cases, the Business Redressal Complaint Form for documented or networked ones — are free and are the only paths that exist. Time-box it. The form's own text says you will not be told what happened.

**The slope is the finding**, and the slope needs the same sheet on two dates. A rival gaining forty reviews a quarter while you gain four is a strategic fact; either quarter alone is a photograph.

**What you lose:** the recording, again. Four rivals × eight fields × monthly is not hard; it is just the thing that stops happening in March.

### AI visibility — Labs 1.3, 5.1–5.3, 20.1–20.3, 21.1–21.3

Ask the assistants yourself. This is the one family where the manual method and the tooled method run the identical procedure, because there is no privileged access to buy.

**The procedure.** Write the prompt as a person would ask another person, with the location in the text — an assistant API has no location parameter, so the coordinate or neighbourhood goes in the words ([LSM-AI-11 in *AI engine probe recipes*](../05-reference/ai-engine-probe-recipes.md)). Never name your own business in the prompt; a named business begs the answer. Demand named businesses and sources, or neither axis is measurable.

**The sampling.** One run is a sample, not a measurement. Fix the number of runs per cell before you start — the same number for every cell — and never compare a keyword you ran five times with one you ran twice. Use a temporary or incognito chat: assistant memory and chat history will quietly personalise the answer, which is the manual equivalent of checking your own rank while signed in at your own desk.

**Recording.** Mention and citation are independent axes; record them separately. Store the **answer text verbatim**, not a boolean — a yes/no cannot be re-audited when you later realise your matching rule was wrong, and it will be. A schema for the record is in [the AI visibility record schema](./ai-visibility-record-schema.md), and a starting prompt set is in [the local prompt corpus](./the-local-prompt-corpus.md).

**Refusals leave the denominator.** When an engine declines, answers generically, or tells you to check a directory, that is a null, not a miss. Counting punts as misses makes your rate a measure of how often the engine was chatty.

**The cost is multiplication.** Keywords × engines × runs, and it is your afternoon rather than your budget. Five keywords × three engines × five runs is seventy-five conversations. That is the honest reason AI visibility is measured by tools: not access, arithmetic.

**If you script it:** grounding a Gemini answer in Google Search is billed per grounded prompt, and the assistant vendors bill server-side web search per search rather than per token — the rates are in [*What Google's APIs cost*](../05-reference/what-googles-apis-cost.md). Two implementation traps that will silently ruin a hand-built harness are worth knowing before you write a line: demanding JSON-only output from a grounded model stops its search tool engaging, so it answers from memory and reports nothing found; and a too-small output-token budget returns zero grounding metadata rather than an error. Both are in [*AI engine probe recipes*](../05-reference/ai-engine-probe-recipes.md).

### Proving it worked — Labs 17.1–17.4, 26.1–26.3, 27.1–27.3, 31.1–31.3

**Performance numbers** are in the Business Profile dashboard, free, for the owner. Read them with the caveats in [What Google's own reporting hides](../05-reference/what-googles-reporting-hides.md): there is no "profile views" metric — you sum four impression counts, and you must say so in the report, because a client comparing your one number against Google's four will find the discrepancy. An impression is one unique user per day per metric. The most recent days can be missing and can still change. The dashboard's own window is shorter than the API's, so **export before it rolls off**.

**The change log** is the whole exercise and it is a text file. One line per change, dated, including changes you did not make: a Google update, a competitor's suspension, a rival's removal, the day the client turned the phones off for a fortnight. Removals and reinstatements move your rank with no action from you, and that is the most common false positive in this discipline.

**The re-reading** must match the baseline reading in every condition you controlled: same coordinate, same keyword text, same language, same signed-out browser, and ideally the same time of day. Write the conditions in the column header, not in your memory.

**The report** is a document you write, and the layer that persuades was always prose. Evidence layers under it: your dated sheet, your screenshots, the dashboard's own numbers. Nothing here needs software.

**Staying current** is a folder and a habit: snapshot the pages whose rules you depend on, diff them quarterly, and date every entry in your own change log. A tool buys you the snapshot taken automatically with a date you did not have to remember. [Staying current](../04-operating/staying-current.md) is the method.

### Suspensions, service-area businesses, inheritance — Labs 19.1–19.3, 24.1–24.3, 29.1–29.3

**Suspension triage** is a browser and the owner dashboard. The dashboard tells you whether the listing is suspended; a private-window search tells you whether it is merely ranking badly. Only one of those is an emergency, and confusing them in front of a client is expensive.

**The identity pack** — registration documents, utility bills, signage photographs, the dated record of the profile as it was — is a folder. It has to exist *before* the suspension, and the photograph you will be asked for is of the sign that came down last month.

**Service-area businesses** are the one category where the tool question is moot in the other direction: Google deliberately keeps pure service-area businesses out of public search results, so no search-based instrument can find them. Owner access is not a convenience here, it is the only path. The performance series and the search terms are free in Google's own interface.

**Client inheritance and the exit** are an inventory and a handover folder. Who owns the domain, the DNS, the CMS, the Search Console property, the Business Profile itself, and which of those you could not confirm. "Unknown" is a legitimate row and also a task.

### Costing the work — Labs 30.1–30.3

Wholesale cost is arithmetic over published rates, and the rates are published. Google charges nothing per call for the entire owner surface — profile fields, reviews and replies, performance, search keywords, posts, photo uploads — nor for Search Console, PageSpeed, or Ads keyword metrics. What is billed is Places, and there the field mask decides the tier. [What Google's APIs cost](../05-reference/what-googles-apis-cost.md) has the rate table; [what things cost](./what-things-cost.md) has the practitioner version.

The number that surprises people is not the Google bill. It is your hours. Time the cycle, not the tooling.

## If you would rather build it than click it

The APIs are open to anyone who applies. If you are a developer reading this as a build specification, three things take the effort, and none of them is the part you are expecting.

**OAuth and its refresh.** Getting a token is an afternoon. Keeping a portfolio of tokens alive, handling revocation, and storing them encrypted at rest with a revoke-then-delete path is the ongoing work. Business Profile API access is application-gated — you request it, and quota starts at zero until approved.

**The write surface.** Documented capability and actual capability differ enough that this manual carries two whole reference chapters about the gap: [the GBP capability matrix](../05-reference/gbp-capability-matrix.md) for what exists, and [write limits and failure modes](../05-reference/write-limits-and-failure-modes.md) for how it fails. Representative examples, so you can calibrate how large the gap is: posts live only on a legacy v4 surface; video on a post returns HTTP 500 rather than a 400; attributes are a separate resource that `locations.patch` cannot write; a bare `locations/{id}` resource name 404s every v4 call because v4 needs the account segment; and a 2xx on a review-reply PUT is not proof the reply is public.

**The storage rules, which are the part people skip.** Two regimes, and they do not transfer. Business Profile API content is capped at 30 calendar days and "cannot be manipulated or aggregated". Places content has no general caching allowance at all — place IDs are exempt and may be stored indefinitely, latitude and longitude may be cached for 30 consecutive days, and that is the extent of it. [Storing Google data legally](../05-reference/storing-google-data-legally.md) quotes every clause with its section number and date, and marks the genuinely open questions as open.

**What this manual will not give you, and will not link to, is a scraper.** Google's Maps Platform terms name copying and saving business names, addresses and user reviews as prohibited scraping. Building a redistributable local dataset is the thing that clause exists to prevent, and doing it slowly, by hand, in a spreadsheet does not change what it is. There is a real and unsettled boundary between a practitioner writing five competitor names into a notebook — plainly normal professional work, and not what the clause addresses — and a systematic harvest of a city. We are not going to pretend we can draw that line precisely for you. We can tell you which side each activity in this manual sits on: measuring one business and its immediate competitive set, repeatedly, is the whole of it.

## The three things that are genuinely hard

Everything above is doable. These three are where hand-run programmes fail, and it is worth being specific about *why*, because two of the three are habits rather than capabilities.

**1. History.** You cannot see movement you did not record, and local SEO is judged entirely on movement over weeks. Today's rank is nearly worthless; the pair of readings six weeks apart is the entire product. Recording is trivial per reading and unforgiving in aggregate — miss the March column and the Q1 report has a hole in it that no amount of later work fills. This is the failure mode, and it does not feel like a failure while it is happening. It feels like a busy Tuesday.

**2. Comparable conditions.** A rank reading is only meaningful against another reading taken under the same conditions: same coordinate, same query text, same language, same signed-out state, ideally the same time of day. Reproducing seven conditions by hand, six weeks later, from notes you wrote quickly, is harder than it sounds — and the failure is silent. You get two numbers that look comparable and are not, and the difference between them gets reported as a result. [Why two tools disagree](../03-advanced/why-two-tools-disagree.md) is the anatomy of this, and it applies to *you* disagreeing with *yourself* just as much as to two vendors.

**3. Read-back.** Google accepts writes it has not published. A profile edit, a review reply, a post — each can return success in the interface and never appear publicly, or appear and later vanish. Verifying every write against the public listing in a signed-out window is the correct procedure and nobody does it consistently by hand for long. This is the least glamorous item on the list and the one that causes the most "we definitely did that" arguments.

A fourth, honestly: **breadth**. One business by hand is comfortable. Five is a full week. Twenty is not a thing a person does — not because any single step is hard, but because twenty portfolios of the above is twenty times a discipline that already decays at one. *(Our estimate, from running it both ways.)*

## What is genuinely easy without any tool

Say this out loud, because the industry has an interest in you not hearing it:

- **The whole website half.** Lighthouse, PageSpeed Insights, Rich Results Test, Search Console. Free, authoritative, no substitute worth paying for.
- **Every profile write.** Google's editor is the reference implementation and exposes more than any API.
- **Posts and photos.** More capable in Google's own interface than through any API.
- **Reading a search result page.** No tool has ever done this better than a private window.
- **AI visibility probing.** The identical procedure. Only the arithmetic scales badly.
- **Spam reporting.** Google's forms are the only path that exists, for everyone.
- **The report itself.** Prose, written by you. The layer that persuades was never a chart.

If your budget is zero, do all of that, keep the spreadsheet, and you will out-work most funded competitors — because most funded competitors are buying a dashboard and not keeping a change log.

## A minimum viable manual workbench

One spreadsheet, one folder per business, eight tabs. This is the actual deliverable of this chapter.

| Tab | One row per | Columns |
| --- | --- | --- |
| **Baseline** | Field | Field, value on day one, source, observable yes/no, date |
| **Rank** | Reading | Date, keyword, coordinate, language, signed-out, position, notes |
| **Grid** | Point × scan | Scan date, keyword, centre, spacing, point coordinate, position |
| **Reviews** | Month | Date, review count, rating, replies outstanding, reply verified |
| **Competitors** | Rival × date | Date, name, place ID, category, rating, reviews, photos, flags |
| **Citations** | Platform | Platform, verdict, name/address/phone as published, date checked |
| **AI probes** | Run | Date, engine, prompt, run number, mentioned, cited, answer text |
| **Change log** | Event | Date, what changed, who did it, evidence link |

Four rules make it work, and each one is the fix for a specific way these sheets rot.

1. **Every row carries a date.** No exceptions, including the rows you are sure you will remember.
2. **Conditions live in the row, not in your head.** The coordinate, the language, the signed-out state. A rank without its conditions is not data.
3. **Never overwrite.** Add a row. The value of the sheet is the columns you can no longer reproduce.
4. **Store answer text, not verdicts.** For AI probes especially — your matching rule will be wrong, and the raw text is what lets you fix the history rather than restart it.

The folder beside it holds the dated screenshots, the exported CSVs and the identity pack. Name everything `business-thing-YYYY-MM-DD`. It is not elegant and it will still be readable in three years, which is more than most dashboards manage.

Templates for the tabs are in [checklists and templates](./checklists-and-templates.md).

## What no tool buys you

Two things, and they are the two that decide whether the engagement works.

**Access.** Owner data — the full review history, the owner-written description, the performance series, the search terms people actually used — is available to the owner and to nobody else, in any tool, at any price. Half the frustration in this industry is people trying to buy their way past that boundary. You cannot. Ask the client for manager access; it takes them two minutes.

**Judgement.** No instrument tells you that a rank move from 7 to 4 was two scans from different points on different days. No instrument decides whether a fifty-row citation report contains two rows worth an afternoon. No instrument writes the sentence that makes a client understand why the slow work started first. That stays yours, and this manual is about that half — which is also why every lab in it names the concept before it names the button.

---

**Next:** [Contributing →](./contributing.md)
