---
title: Why two tools disagree
sidebar_position: 5
description: Two rank trackers, one business, two numbers. The seven conditions that make a rank reading mean something, and how to tell which one is wrong.
---

# Why two tools disagree

Two rank trackers, the same business, the same keyword, the same afternoon. One says #3. One says #11. A client is in the room and somebody is about to be called wrong.

Almost always, nobody is. The two tools measured different things and printed the results in the same font. This chapter is the list of things they could have measured differently, in the order they bite, plus a procedure for settling the argument — including the uncomfortable case where your own tool disagrees with itself and is right both times.

## A rank is a reading, and a reading has conditions

[Rank is a map, not a number](../01-foundations/rank-is-a-map-not-a-number.md) established that a local position is a function of the searcher's coordinate. That was the beginner's version. The full argument list is longer, and every argument you do not state is one somebody else quietly chose for you.

| Condition | The question it answers | Where you find it |
| --- | --- | --- |
| **Instrument** | What did the tool actually query? | Ask. Almost nobody publishes it. |
| **Origin** | Which coordinate did the search run from? | The location chip; blank means the business address. |
| **Radius — and its kind** | How far, and does it *weight* results or *exclude* them? | The radius chip. The kind is nearly never published. |
| **Depth** | How many results were read before "not found"? | Here, twenty. Elsewhere, ask. |
| **Language** | Which language was requested? | The language chip; blank means the provider's default. |
| **Moment** | When was the reading taken? | The "Checked …" stamp on every fetched card. |
| **Identity** | How did the tool decide a result was *you*? | Ask. Name matching is common and quietly wrong. |

A number with seven unstated arguments is not a measurement. It is a rumour with a decimal point.

## The instrument is never the surface

Start with the one nobody says out loud: **no rank tracker observes the map pack.** The pack is rendered to a human, in a browser session, in a place, with a history. A tool observes a proxy — a result page fetched with a location parameter attached, a ranked place search against Google's places data, or a third-party search API resold under another name. Different corpora, different orderings, no two agreeing about a marginal business.

SEOG's rank check and geo-grid are the second kind: a ranked place search run from an explicit coordinate. A deliberate trade — reproducible, and it takes a coordinate as a real argument rather than a hint ([what Google's APIs actually cost](../05-reference/what-googles-apis-cost.md)). It is not what a human sees, and two of its properties bite immediately.

**It ranks by prominence, and drops businesses Google's own search box still finds.** A new or thin listing can be missing from a ranked place search while remaining findable by someone typing its name into Maps. So "the tool cannot find us but Maps can" is the expected result for a low-prominence business, not a defect.

**It excludes hidden-address businesses by default.** A pure service-area business is left out unless the caller explicitly asks for it, and the rank paths do not ask. That is why map-pack rank tracking cannot work for that business model at all — [service-area businesses](./service-area-businesses.md) is the whole chapter.

So the first question when a tool disagrees with your own eyes is not "is it broken", but "what is this thing looking at, and is that what I care about".

## The origin, and the origin you did not set

The heaviest condition by far. A local rank is largely a distance calculation, so moving the origin a mile moves the number more than most of the work you will do all quarter.

An origin gets set three ways: explicit coordinates, a place name the tool geocodes, or nothing at all. The third is where tools silently diverge, because **"nothing" is not "no location".** A place search with no origin supplied falls back to the network address of whoever made the call. On a laptop at home that is roughly your city; on a hosted tool the caller is a datacenter server, whose network location is somewhere you have never been or nowhere identifiable at all. Same query, same code, different machine, different answer. Any product offering "national" rank tracking for a local query is reporting from a coordinate neither of you chose.

Here the origin is never left to that fallback: it is the keyword's own search point when you set one, the business coordinates otherwise. But note the trap. **A keyword with no location chip is not a keyword with no location.** It is measured from the business's front door — the most flattering point on the map, the one coordinate where your distance term is zero and every rival's is not. An unstated default is still a condition; write it down as if it were a setting, because it is one.

![The Rankings add-keyword form with Search from, Language and Radius all left at their defaults](../../static/img/screens/rankings-tracked.png)

*Three conditions, all unset and all still in force: **Search from** falls back to the business address, **Language** to the provider's default, **Radius** to three miles. The fields do not say "none" — they name what was chosen for you. Note the "Checked 2h ago" stamp in the corner: that is condition six.*

## Radius is two different words

Two tools both say "5 km radius" and mean opposite things.

A **bias** radius weights the search toward a circle; results outside it still appear, ranked lower. A **restriction** radius is a hard filter: nothing outside the circle exists.

The distinction is invisible in a settings panel and enormous in the output. Under a restriction, a business two miles out is deleted, promoting everyone inside the circle by one — so the same business, on the same day, from the same point, reads better under a restriction than under a bias. Both are legitimate; only one models what a searcher sees. Both appear in this app doing different jobs: rank checks and grid points use a bias circle, competitor discovery a restriction circle, so that "nearby rivals" means nearby.

And a bias radius is an input to the *ordering*, not a viewport — change only the radius and the position can move with nothing happening in the world.

### The two radii inside one tool

The uncomfortable one, and you should know it before a client finds it.

A single rank check uses the keyword's own radius — three miles by default, or whatever the radius chip says. A geo-grid scan does not use that number at all. Each grid point searches with a circle the size of the **grid's own point spacing**, which the app fixes at one mile.

So the centre pin of a grid and the "Check now" number are two readings of the same keyword, from the same coordinate, minutes apart, at different radii. They can legitimately differ, and the radius chip describes only the first. Lab 22.1 has you produce the disagreement deliberately.

A third setting exists depending on how you reach the instrument: a grid run through the agent surface defaults to tighter point spacing than the web presets, so an agent-run 5×5 covers less ground — and each point searches a smaller circle — than a Standard scan pressed by hand. Mix the two and your own history stops being comparable with itself ([running local SEO with an AI agent](../04-operating/running-local-seo-with-an-ai-agent.md)).

## Depth: every ruler stops somewhere

Both the single check and the grid read twenty results deep. Past twenty you are not ranked 21; you are **not measured**. The check says so in words — *you're not in the top N here* — and names who holds #1, so a null result still carries information.

A tool reading a hundred deep reports #34 where this one reports nothing. Neither is wrong; they are different rulers, and deeper is not automatically better, because nothing at #34 is visible to a human on any surface. Depth buys early warning — #61 to #38 is progress you cannot otherwise see — and costs you an invitation to average numbers that describe invisibility. Two tools censoring at different depths therefore cannot produce comparable "average position" ([reading a geo-grid without fooling yourself](./reading-a-geo-grid.md)).

## Language is not cosmetic

You can request results in a specific language or leave it blank and let the provider pick. Blank is not neutral; it is a default you did not choose and cannot see. Language is part of a tracked keyword's *identity* here — the same phrase in English and in Finnish is two independent rows with independent histories, because they are two different measurements.

What language certainly changes is the strings that come back. Whether it also shifts *which* businesses come back, and in what order, is a market-by-market question rather than a rule *(inference — run the two rows side by side; in a monolingual market you will usually see no difference)*. Helsinki, Montreal, Barcelona and Brussels are where two trackers disagree hardest, and language is usually why.

## The moment

Rank is a sort order over near-tied scores, and a sort is discontinuous: a hair of movement underneath swaps two businesses and moves a reported position by a whole integer. "The number changed" and "the world changed" are different claims.

**A grid scan is not an instant.** Points are measured in sequence with a deliberate pause between them, so the far corner is not read at the same moment as the centre.

**Compare stamps before numbers.** Every card showing fetched data is stamped for this reason. A day between two readings is a day in which the disagreement may be entirely real.

**Search volume stales differently, and is not local.** The monthly volume beside a keyword comes from Google's Keyword Planner data: an average over roughly the trailing twelve months, in rounded buckets rather than exact counts, requested against a *country-level* geographic target and a language, and cached for about a month. Two tools reporting 480 and 320 for one phrase can both be faithfully quoting Google, for different targets — and neither figure tells you how many people search it in your town ([what people actually search](../01-foundations/what-people-actually-search.md)).

## Identity: are you sure that result is you?

A rank check must decide whether a result *is* the business. The honest way is to match the stable place identifier — the machine key from [the business entity](../01-foundations/the-business-entity.md) — which is what happens here, on the single check and on every grid point. The convenient way is to match the name as a string.

Name matching fails both ways: false positives, where a franchise sibling three towns over is counted as you; and false negatives, where the name on Google no longer matches the name in the tool because somebody edited the profile. A tool that quietly matched a different branch will show a beautiful, entirely fictional improvement. Duplicate listings are the same problem wearing a hat — one tool tracks the record that ranks, another the record that does not, and both are "correct" ([spam and fake listings](./spam-and-fake-listings.md)).

## So which one is wrong?

Run the seven conditions. Fill in what you can and mark the rest unknown.

> **A disagreement is a defect only when two tools agree on all seven conditions and still differ.** Until then they measured different things, and arguing about which number is right is arguing about the wrong question.

Most disputes die at row two or three, and the honest verdict is *not comparable*. When two readings genuinely share all seven and still disagree, there is one tie-break: reproduce a single point by hand and see which is nearer. That hand reading is not an oracle — it has its own seven conditions, one of which is your own browsing history — but it is a third opinion from a different mechanism, which is what you need.

What you tell the client is a sentence, not a defence:

> "Those two numbers were measured from different points, at different depths, on different days. Here is what ours measures and why we chose it. To reproduce the other one I need the conditions it was taken under, and the report does not state them."

That ends the meeting. "Their tool is inaccurate" starts an argument you cannot win.

> **Without SEOG** · Every condition above can be set by hand — that is Lab 22.3 — and the record-keeping decays after about a dozen readings. [Doing all of this without SEOG](../99-appendix/doing-it-without-seog.md).

## Labs

### Lab 22.1 — Make one instrument disagree with itself

> **Lab** · Where: **Rankings** (`/b/{businessId}/rankings`) · Cost: **paid** · Time: ~10 min
>
> You need: one tracked keyword with a stored grid scan — Lab 3.1 and Lab 4.1.

1. Open **Rankings** and select the keyword. Read the chips under its name — location, language, radius. Write down whichever are **absent**, and next to each what the absence means: business address, provider default language, three miles.
2. Press **Check now** in the keyword header. Record the position, the time, and the sentence underneath — *"Checked just now — you're #N for this search"*, or *"…you're not in the top N here; X holds #1"*.
3. Scroll to **Geographic visibility**, leave the level on **Quick** (`3×3 · ~2 mi`), read the price on **Check now**, then press it.
4. On the map, find the **centre** pin — the one on the blue dot marking your business. Record its position and the time.
5. Write the two readings as a pair with their conditions: same keyword, same coordinate, minutes apart, radii of three miles and one mile.

![A completed 3x3 geo-grid scan over Helsinki, pins reading between 1 and 3](../../static/img/screens/geo-grid.png)

*A real scan: nine live searches for one keyword, one per point. The same business reads #1, #2 and #3 depending only on which coordinate the search ran from. Here the centre pin agrees with the single check at the top of the page — the outer pins are the disagreement, and they are all correct. The legend doubles as the ruler's end stop: past twenty there is no position, only "Not found".*

**What good looks like.** Two numbers you can defend individually and would never average. If they match, that is a real result too — record it and repeat on a second keyword before concluding anything.

**If it went wrong.** *The single check gives a position but every grid pin is grey* — check the business has a public address; a hidden-address listing cannot be grid-tracked. *They agree exactly on every keyword you try* — likely a market where you sit clear of the boundary, so the differing radii reorder nobody near you.

**What you just learned.** Two numbers can differ with nothing about the world differing. Before accusing an instrument of being wrong, enumerate what it did differently — starting with your own.

### Lab 22.2 — Move one condition at a time

> **Lab** · Where: **Rankings** (`/b/{businessId}/rankings`) · Cost: **paid** · Time: ~15 min
>
> You need: Lab 22.1. Check your keyword quota first — this adds two rows.

1. Type the **same keyword text** you already track into the add form, and set **Search from** to a district two or three miles away. Press **Track**. It becomes an independent row: a keyword's identity is its text, its location and its language together.
2. Add the same text a **third** time, leaving **Search from** empty but choosing a different **Language**.
3. Each add runs a first rank check automatically. Record all three positions.
4. Rewrite the three lines as conditions rather than ranks — *"`emergency plumber`, from Shoreditch, English, 3 mi, 14:20 Tuesday: #6"* — then ask the question the exercise was built for: **which of these three is "our rank"?**

**What good looks like.** Three defensible positions for one phrase, with a spread larger than most of the movement you will report in a quarter. The number you would have quoted before this lab was one arbitrary point inside it.

**If it went wrong.** *"Already tracking this keyword here."* You changed something that is not part of the row's identity: radius is a property of a keyword but not part of what makes it unique, so to vary only the radius you must remove the row and re-add it, accepting that the two readings are minutes apart. *A new row comes back "Not ranked".* Correct and interesting: visible from your own door, invisible from the next district. That is the finding.

**What you just learned.** Sensitivity analysis is cheaper than argument. Once you know how far a number moves when you move one condition, you know how much of any reported change could be instrumentation.

### Lab 22.3 — Referee a number you did not produce

> **Lab** · Where: your browser, plus **Rankings** for comparison · Cost: **free** · Time: ~20 min
>
> You need: a rank claim from elsewhere — another tool's report, a client's screenshot, a competitor's pitch deck.

1. Copy the seven-condition table into a note and fill it in from the claim alone. Do not guess; leave rows blank.
2. For every blank, write the exact question that would fill it, addressed to whoever produced the number. Most reports leave four or more blank.
3. Reproduce one point by hand. Private window, Google Maps, search the keyword, centre the map on the coordinate you believe the claim used. Map results follow the map's centre *(inference — reliably observed, not documented by Google)*. Count listings until you reach the business, or stop at twenty and record "not in twenty".
4. Write your own seven conditions for that hand reading, including the ones you did not control: your device's location, your language, whether you were signed out.
5. Deliver a verdict in exactly one of three forms: **agrees**, **disagrees under matched conditions**, or **not comparable — rows 2, 3 and 6 are unstated**.

**What good looks like.** Most claims land in *not comparable*, and you can name the missing rows rather than expressing a general suspicion.

**If it went wrong.** *You cannot separate your own location from the reading* — the honest outcome, and the chapter's point arriving in person. *The claim is a screenshot of a signed-in phone search* — not reproducible by anyone, including the person who took it. Say so plainly.

**What you just learned.** A referee is not a better tool. It is a completed conditions table, and the completing is the entire job.

## Common mistakes

**Treating a disagreement as a bug report.** Seven conditions must match before "wrong" is meaningful, and in most disputes three or more are unstated on both sides. You buy a support ticket instead of an explanation, plus a client who now believes measurement is unreliable in general.

**Quoting whichever number is kinder.** Nobody decides to do this; the flattering tool is simply the one that gets screenshotted into the deck. The cure is mechanical — pick the instrument before you look at its output, write down its seven conditions, and report from that one instrument for the whole engagement.

**Switching tools mid-engagement without dating it.** Changing instruments starts a new baseline, exactly as changing a grid preset does ([did it work?](../02-core-practice/did-it-work.md)). An undated tool change shows up as a step in the chart, and somebody will attribute it to the work.

**Comparing a tool against your own browser search.** Signed in, personalised, on your network, at your desk: a legitimate third opinion, a terrible reference standard, and the most common way a client "disproves" a report.

**Averaging across conditions.** The mean of #3 at the front door and "not in twenty" three miles out is not #11. Two facts, both belonging in the report.

## Check yourself

Answer against your own rows and notes, not in the abstract.

1. **State all seven conditions of one tracked keyword's most recent reading, without looking anything up.** Any you cannot state is one you are implicitly quoting to clients.
2. **Your grid's centre pin says #4 and this morning's single check said #2. Which is wrong?** *(Neither. Different radii, different moments — and the radius chip describes only one of them.)*
3. **A rival agency says the client ranks #14 for a keyword your tool reports as "not ranked". Most likely explanation, and is either tool faulty?** *(A deeper ruler. No.)*
4. **You are asked to reproduce a rank claim and given only the keyword and the number. Write the email.** Six lines, one per missing condition.
5. **Which condition, changed alone, would move your reported position most?** Buy the answer with a re-add in Lab 22.2 rather than reasoning about it.

---

**Next:** [Spam, fake listings, and the market you are measured against →](./spam-and-fake-listings.md)
