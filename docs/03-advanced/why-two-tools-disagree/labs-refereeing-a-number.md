---
title: "Labs: refereeing a rank number"
sidebar_position: 3
description: Three labs that make one instrument disagree with itself, move a single condition at a time, and referee a rank claim somebody else produced.
---

# Labs: refereeing a rank number

The conditions bite hardest when you produce the disagreement yourself: first inside one instrument, then one condition at a time, then against a number you did not produce.

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

![A completed 3x3 geo-grid scan over Helsinki, its nine pins carrying different positions](../../../static/img/screens/geo-grid.png)

*A real scan: nine live searches for one keyword, one per point. The same business reads a different position depending only on which coordinate the search ran from — one keyword, one minute, several answers, none of them wrong. One detail in the legend is worth knowing before a client asks: it offers a **20+** band, and that band can never fill. The scan reads twenty deep, so a point either has a position of twenty or better or it is **Not found**. A colour with nothing that can land in it is the ruler's end stop, drawn.*

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

**If it went wrong.** *"Already tracking this keyword here."* You changed something that is not part of the row's identity: radius is a property of a keyword but not part of what makes it unique, so to vary only the radius you must remove the row and re-add it, accepting that the two readings are minutes apart.

*A new row comes back "Not ranked".* Correct and interesting: visible from your own door, invisible from the next district. That is the finding.

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

**Switching tools mid-engagement without dating it.** Changing instruments starts a new baseline, exactly as changing a grid preset does ([did it work?](../../02-core-practice/did-it-work/index.md)). An undated tool change shows up as a step in the chart, and somebody will attribute it to the work.

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

**Next:** [Spam, fake listings, and the market you are measured against →](../spam-and-fake-listings/index.md)
