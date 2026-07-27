---
title: Schema, honest scores and Search Console
sidebar_position: 2
description: What LocalBusiness structured data does and does not do, why an unverifiable check is not a failure, and how to read Search Console without misquoting it.
---

# Schema, honest scores and Search Console

Layer 3 is where the ordinary wins sit, and two of them are worth their own treatment: the markup that makes a site unambiguous to a machine, and the one report that tells you what people actually typed.

## Structured data, without the mythology

`LocalBusiness` JSON-LD is a machine-readable restatement of who and where you are. It goes in a script block on the page and states — unambiguously — name, address, phone, coordinates, opening hours, URL, image, and `sameAs` links to your other profiles.

**What it does: it removes parsing risk.** Google can *usually* extract an address from a footer, and *usually* is a bad bet on the field that decides which entity you are.

`sameAs` is the underrated one — pointing it at your own Google Maps URL is an explicit machine-readable statement that this site and that listing are the same business.

**What it does not do: it is not a confirmed local ranking factor.** Google has never said LocalBusiness markup lifts map-pack position.

Sites with good schema do tend to appear in AI answers, but those sites also tend to have everything else right, which makes schema *correlated rather than demonstrated causal* — our reading, marked as inference, and anyone claiming a measured lift owes you their method. Add it because it makes you unambiguous, not because a blog post promised a boost.

**Completeness is graded, not binary.** Eight fields are worth having — `name`, `address`, `telephone`, `geo`, `openingHoursSpecification`, `url`, `image`, `sameAs` — and four of them is genuinely half the job. The usual mistake is pasting a snippet with name and address only, then treating the row as done.

## Two honesty rules for any site score

**Unverifiable is not failing.** If a site renders its content with JavaScript, a plain fetch sees an empty shell, and checks needing visible text — schema detection, the NAP comparison, the keyword check — cannot be answered.

Drop them from the denominator: points earned over points *verifiable*, so a JavaScript-rendered site with sound fundamentals is not scored 30 for being modern. A tool that counts "could not verify" as a failure is reporting its own blind spot as your problem. Watch for it in every audit tool you use, including this one.

**There is no lab measurement for INP.** Of the three Core Web Vitals, Interaction to Next Paint can only come from real visitors — Chrome's field data, reported by PageSpeed Insights as the 75th percentile over the preceding 28 days.

A lab test simulates a page load; it cannot simulate a human clicking things, and INP needs many interactions before it means anything.

So a site with too few Chrome visitors to qualify legitimately has **no INP number at all**, and the honest display is a dash. A tool showing an INP figure for a site with almost no traffic did not get it from Google. (Google's own INP documentation, checked 2026-07.)

## Search Console: the only place the real queries live

Every other source in this manual reports *positions*. Search Console reports *demand* — the strings people actually typed, with impressions, clicks, click-through rate and average position, for the site rather than the profile.

Free, first-party, and the strongest evidence you will get for a keyword decision. Four things to understand before you quote a number from it.

**Average position is not your rank.** It is impression-weighted across every query, device and location where you were shown, mixing surfaces.

A Search Console average position of 8.4 and a map-pack rank of #2 are not in conflict; they answer different questions. Never put them in the same column of a report. [Why two tools disagree](../../03-advanced/why-two-tools-disagree/index.md) takes this apart properly.

**The query list will never sum to the total.** Google withholds *anonymized queries* — in its own description, ones "that aren't issued by more than a few dozen users over a two-to-three month period" — to protect the privacy of the people searching.

Google is explicit about the consequence: "There is no row for anonymized queries in the report table or API, so if you sum up clicks for all the rows, you'll not find the same number of clicks as the chart totals." (Google Search Central, *A deep dive into Search Console performance data filtering and limits*; checked 2026-07.)

Your top-25 list is real, and it is a subset. "We rank for 25 queries" is wrong in a way that is hard to walk back.

**Choose the domain property.** A property registered for the whole domain covers every protocol and subdomain at once; a URL-prefix property covers exactly one variant, so `https://www.example.com/` misses `https://example.com/`.

Before you conclude a site has no search traffic, check which property you are reading — an unverified property cannot be queried at all, and a URL-prefix property can be measuring a variant nobody visits *(inference: this is the failure we see most often on inherited accounts; we publish no count)*.

### The reconciliation fact

**And the reconciliation fact** — the one that ends the most corrosive argument in agency work, where the client opens Search Console, opens your report, sees different numbers, and now suspects everything you have sent.

Search Console's interface shows *fresh* data, including the most recent days. The API, asked the same question over the same dates, returns **final** data by default and silently drops those freshest days: Google's own reference says the returned data "will include only finalized data" when the freshness parameter is omitted.

> **Same property, same range, smaller numbers, no error, no footnote.**

Every tool built on the API that never changed the default understates the client's own dashboard, permanently, by a couple of days' worth.

The fix is one switch — ask for all data rather than final; the parameter is named in [what Google's reporting hides](../../05-reference/what-googles-reporting-hides.md). (Verified against Google's Search Analytics API reference, 2026-07.) The Search performance card below already asks for all data, which is why its totals should line up.

---

**Next:** [Labs: audit the site, ship schema and reconcile Search Console →](./site-audit-labs.md)
