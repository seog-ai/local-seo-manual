---
title: The website half — pages, schema and Search Console
sidebar_position: 7
description: What a website contributes to local ranking and what it does not — location pages, LocalBusiness schema, and reading Search Console honestly.
---

# The website half — pages, schema and Search Console

The map pack ranks a *profile*, not a page. That is true, it is the single most useful thing a classic SEO can learn about local, and within about a week it gets over-applied into "so the website doesn't matter".

The website matters. It just does a different job than you are used to: it is the corroborating document — the business-controlled page that agrees with the profile, carries the words customers type, and gets cited by machines that answer questions without showing a map at all. This chapter is about doing that job deliberately, and about reading Search Console in a way that will not embarrass you in front of a client.

## The four jobs a local website does

**1. It corroborates the entity.** Google is deciding whether the thing at that address, with that phone number, under that name, is one real business ([the business entity](../01-foundations/the-business-entity.md)). Your site is the highest-trust source of that agreement. A footer that disagrees with the profile is not neutral — it is evidence against you.

**2. It carries relevance evidence.** Distance you cannot change and prominence moves slowly, but relevance is largely words ([the three forces](../01-foundations/relevance-distance-prominence.md)). Saying what you do and where you do it, in the title and the first heading, is the cheapest relevance work available.

**3. It is the other half of the results page.** Below the three-pack sit ordinary web results, localised. Those are pages, ranked as pages; a business that wins the pack with nothing underneath it occupies one slot on a page that offers ten.

**4. It is the document AI engines cite.** When an assistant answers "best dentist in Leeds", it reads pages, and yours is the only one where you write the sentences ([how an AI assistant answers a local question](../01-foundations/how-ai-answers-a-local-question.md)). In the readiness rubric from that chapter, 20 of the 100 points are website points — 12 for having one on the profile, 8 for being readable by an agent, which is [the next chapter](./making-the-site-readable-by-agents.md).

What it does not do: **it does not move you closer**. No on-page work changes proximity, so a site fix shows up as a change in the *shape* of a grid rather than a jump at every pin. Set that expectation before you start.

## Three layers, in order of how badly failure hurts

Local on-page work is usually taught as a checklist of equals. It is not — the failures are not the same size.

**Layer 1 — reachability.** A `noindex` directive, a plain-HTTP site, a page that times out, a homepage that is a JavaScript shell serving no text to a plain fetch. If this layer fails, everything above it is irrelevant. Rare, catastrophic, and the first thing to check on a site you inherit.

**Layer 2 — agreement.** Does the site repeat the profile's name, address and phone *identically*? A wrong phone number is worse than no phone number: absence is a gap, contradiction is a conflict. ([Citations and NAP](./citations-and-nap.md) does the off-site half.)

**Layer 3 — local relevance and legibility.** City and category in the title and H1. A tappable phone link. An embedded map on the contact page. LocalBusiness structured data. A viewport tag. The ordinary wins, worth doing once the layers below hold.

Here is the weighting one audit uses, published so you can reproduce it by hand or argue with it. It reads the homepage the profile points to, after redirects.

| Check | Weight | Layer |
| --- | --- | --- |
| LocalBusiness structured data | 16 | 3 |
| Google map integrated | 12 | 3 |
| Phone matches profile | 10 | 2 |
| Address on the site | 10 | 2 |
| City + category in title/headline | 10 | 3 |
| Served over HTTPS | 8 | 1 |
| Page is indexable | 7 | 1 |
| Business name matches | 6 | 2 |
| Mobile viewport | 6 | 3 |
| Click-to-call link | 5 | 3 |
| Language declared / favicon / social share tags | 2 each | 3 |

Two structural points. A **service-area business** — one that hides its address on Google — is not scored on the address check or the map embed at all; they are dropped, not failed, because demanding a pin for a location the business deliberately does not publish would be wrong ([service-area businesses](../03-advanced/service-area-businesses.md)). And the table is *one page*. Location pages are not audited individually, which is why the next section matters.

## Location pages

With more than one location, the correct structure is one page per location, and each location's Google profile points its website field at *its own page* — not at the shared homepage. Most implementations get this wrong in the same two ways.

**Pointing every profile at the homepage.** Then every location corroborates one document naming one address, and the corroboration is worth roughly nothing for the others. Fix it on each profile's website field.

**Doorway pages.** Somebody notices that "plumber in Croydon" is a query, generates forty city pages by find-and-replace, and ships them. Google's spam policies name this directly, under the heading *doorway abuse*: "Doorway abuse is when sites or pages are created to rank for specific, similar search queries. They lead users to intermediate pages that are not as useful as the final destination." One of its own examples is "multiple domains or pages targeted at specific regions or cities that funnel users to one page". (Google Search Essentials, spam policies; checked 2026-07.) The line is not whether the page carries a city name; it is whether the page describes something that exists: a real address, real staff, real service details, real photos, real hours. *(Inference: local practitioners report this as one of the patterns that most often draws manual action. Google publishes no enforcement rates, so treat the frequency as anecdote and the policy as fact.)* [Multi-location and franchise](../03-advanced/multi-location-and-franchise.md) does the structure at scale.

A location page that earns its place carries the NAP block matching the profile exactly, an embedded map centred on that location, the hours, the services offered *at that site*, and text a human working there could have written. A service-area business substitutes its served areas for the address.

## Structured data, without the mythology

`LocalBusiness` JSON-LD is a machine-readable restatement of who and where you are. It goes in a script block on the page and states — unambiguously — name, address, phone, coordinates, opening hours, URL, image, and `sameAs` links to your other profiles.

What it does: it removes parsing risk. Google can *usually* extract an address from a footer, and *usually* is a bad bet on the field that decides which entity you are. `sameAs` is the underrated one — pointing it at your own Google Maps URL is an explicit machine-readable statement that this site and that listing are the same business.

What it does not do: it is not a confirmed local ranking factor. Google has never said LocalBusiness markup lifts map-pack position. Sites with good schema do tend to appear in AI answers, but those sites also tend to have everything else right, which makes schema *correlated rather than demonstrated causal* — our reading, marked as inference, and anyone claiming a measured lift owes you their method. Add it because it makes you unambiguous, not because a blog post promised a boost.

Completeness is graded, not binary. Eight fields are worth having — `name`, `address`, `telephone`, `geo`, `openingHoursSpecification`, `url`, `image`, `sameAs` — and four of them is genuinely half the job. The usual mistake is pasting a snippet with name and address only, then treating the row as done.

## Two honesty rules for any site score

**Unverifiable is not failing.** If a site renders its content with JavaScript, a plain fetch sees an empty shell, and checks needing visible text — schema detection, the NAP comparison, the keyword check — cannot be answered. Drop them from the denominator: points earned over points *verifiable*, so a JavaScript-rendered site with sound fundamentals is not scored 30 for being modern. A tool that counts "could not verify" as a failure is reporting its own blind spot as your problem. Watch for it in every audit tool you use, including this one.

**There is no lab measurement for INP.** Of the three Core Web Vitals, Interaction to Next Paint can only come from real visitors — Chrome's field data, reported by PageSpeed Insights as the 75th percentile over the preceding 28 days. A lab test simulates a page load; it cannot simulate a human clicking things, and INP needs many interactions before it means anything. So a site with too few Chrome visitors to qualify legitimately has **no INP number at all**, and the honest display is a dash. A tool showing an INP figure for a site with almost no traffic did not get it from Google. (Google's own INP documentation, checked 2026-07.)

## Search Console: the only place the real queries live

Every other source in this manual reports *positions*. Search Console reports *demand* — the strings people actually typed, with impressions, clicks, click-through rate and average position, for the site rather than the profile. Free, first-party, and the strongest evidence you will get for a keyword decision. Four things to understand before you quote a number from it.

**Average position is not your rank.** It is impression-weighted across every query, device and location where you were shown, mixing surfaces. A Search Console average position of 8.4 and a map-pack rank of #2 are not in conflict; they answer different questions. Never put them in the same column of a report. [Why two tools disagree](../03-advanced/why-two-tools-disagree.md) takes this apart properly.

**The query list will never sum to the total.** Google withholds *anonymized queries* — in its own description, ones "that aren't issued by more than a few dozen users over a two-to-three month period" — to protect the privacy of the people searching. Google is explicit about the consequence: "There is no row for anonymized queries in the report table or API, so if you sum up clicks for all the rows, you'll not find the same number of clicks as the chart totals." Your top-25 list is real, and it is a subset. "We rank for 25 queries" is wrong in a way that is hard to walk back. (Google Search Central, *A deep dive into Search Console performance data filtering and limits*; checked 2026-07.)

**Choose the domain property.** A property registered for the whole domain covers every protocol and subdomain at once; a URL-prefix property covers exactly one variant, so `https://www.example.com/` misses `https://example.com/`. Before you conclude a site has no search traffic, check which property you are reading — an unverified property cannot be queried at all, and a URL-prefix property can be measuring a variant nobody visits *(inference: this is the failure we see most often on inherited accounts; we publish no count)*.

**And the reconciliation fact** — the one that ends the most corrosive argument in agency work, where the client opens Search Console, opens your report, sees different numbers, and now suspects everything you have sent.

Search Console's interface shows *fresh* data, including the most recent days. The API, asked the same question over the same dates, returns **final** data by default and silently drops those freshest days: Google's own reference says the returned data "will include only finalized data" when the freshness parameter is omitted. Same property, same range, smaller numbers, no error, no footnote. Every tool built on the API that never changed the default understates the client's own dashboard, permanently, by a couple of days' worth. The fix is one switch — ask for all data rather than final; the parameter is named in [what Google's reporting hides](../05-reference/what-googles-reporting-hides.md). (Verified against Google's Search Analytics API reference, 2026-07.) The Search performance card below already asks for all data, which is why its totals should line up.

## Labs

> **Note** · All three work by hand too — view-source plus Google's Rich Results Test, and Search Console itself. [Doing it without SEOG](../99-appendix/doing-it-without-seog.md) is the long form.

### Lab 13.1 — Run the site audit and work the failing checks

> **Lab** · Where: **Website** (`/b/{businessId}/website`) · Cost: **paid** · Time: ~15 min
>
> You need: a business added (Lab 0.3) with a website on its profile. This audit needs **no** Google Business Profile connection — it runs on the public site plus the profile facts already stored, so it works on a business you do not own.

![The Website page before any audit has run: a Connect Search Console card at the top, and below it the Website support card showing five example rows and a Check now button](../../static/img/screens/website.png)

*This is the screen before you press anything. The five ticked and crossed rows under **Website support** are the card's own **Example** — its subtitle says so — and they are placeholders, not a measurement of this site. Note the price on the **Check now** button: you see it before you spend it.*

1. Open **Website**. Before any analysis you see an **Example** card with five sample rows — an illustration, not your site.
2. There are two **Check now** buttons and they are not the same action. The one in the page header refreshes everything, including Search Console; the one inside the **Website support** card runs the site audit alone. Use the card's, and read the price on it before pressing. Search Console gets its own lab further down. If you already ran this audit in [Lab 12.2](./citations-and-nap.md), its result is stored — read the checklist for free and press **Check now** only when you want a fresh run.
3. Wait, and expect it to feel slow — a manual check forces a fresh Lighthouse run rather than re-serving a cached one, and those take tens of seconds. The checklist and the **Site health** panel arrive together when it finishes.
4. Read the **Website support** ring and its tier — **Weak**, **Fair** or **Strong**. Hover the ring: it gives points earned out of points *verifiable*.
5. Count three numbers: green rows, red rows, and rows saying **Could not verify**. That third one is what people skip.
6. Work the red rows top-down — they are ordered by weight. Where a row offers a **Ready to paste** block, copy it.

**What good looks like.** A score with a tier, a list in which every failing row names a fix, and a clear answer to what the score is *out of*.

**If it went wrong.**
- *"The site blocked our check (bot protection)"* — a firewall refused an automated fetch. Google's crawlers are usually allow-listed; third-party checkers are not.
- *"The site took longer than 10 seconds to respond"* — a finding, not a tool error.
- *A banner saying the site renders with JavaScript* — expect several **Could not verify** rows, and check those by hand in the browser.
- *No website on the profile* — fix that first.

**What you just learned.** A local site audit is a *comparison between two documents* — the site and the profile — not a generic SEO score. That is why its fixes are specific to your business, and why the NAP rows come first.

### Lab 13.2 — Ship the LocalBusiness schema

> **Lab** · Where: **Website** (`/b/{businessId}/website`) plus your site's editor · Cost: **paid** (the re-run) · Time: ~20 min
>
> You need: Lab 13.1, and edit access to the website. No site access? Do the observe-only version at the end.

1. In the check list, find **LocalBusiness structured data**. If it fails, it offers a **Ready to paste** block already filled in with your business's real name, address, phone and coordinates.
2. Copy it. Paste it into the homepage `<head>` — or anywhere in the HTML; JSON-LD is position-independent. Publish.
3. Re-run the audit from the **Website support** card. The row should now pass or go partial, and report how many of the eight key fields it found.
4. Add the missing fields by hand. `openingHoursSpecification` and `image` are the two most commonly absent. Re-run and confirm the count moved.

**What good looks like.** The row reports 6/8 or better, and you can name the fields you are still missing and why.

**If it went wrong.** If the row still fails after a correct paste: the snippet landed on a page other than the one the profile links to; the JSON has a trailing comma and does not parse (malformed blocks are skipped silently, by us and by Google); or the CMS escaped it into visible text. View source and look.

**Observe-only version.** Run the generated snippet through Google's public Rich Results Test, then view-source on two competitors from your map pack and compare their markup against the eight fields. Most local sites have none, and the ones with complete markup are usually winning at everything else — precisely the correlation problem above.

**What you just learned.** Structured data is a disambiguation device you can ship in ten minutes, and its value is proportional to how completely you fill it in.

### Lab 13.3 — Connect Search Console and reconcile the totals

> **Lab** · Where: **Website** (`/b/{businessId}/website`) · Cost: **paid** · Time: ~15 min
>
> You need: verified Search Console access to the site, with the same Google account you will connect. Observe-only readers: use any site you do control — a personal blog is fine — and do steps 5–6 inside Search Console itself, free.

1. At the top of **Website**, press **Connect with Google** on the **Connect Search Console** card. Access is read-only, and it is a separate connection from the Business Profile.
2. On return, the tool matches your site to one of your properties automatically, preferring the domain property.
3. If you get *"none of your Search Console properties match this website"*, it is nearly always one of three: a URL-prefix variant that does not match the profile's website URL, an unverified property, or the wrong Google account.
4. Once matched, the connect card disappears and a **Search performance** card takes its place. Press its **Check now** and read the four tiles — clicks, impressions, CTR, average position — over the last 16 weeks.
5. Open Search Console itself, set the same 16-week range, and compare all four numbers.
6. Switch between the **Queries** and **Pages** tabs. Count how many top queries carry the **brand** tag, and write down the branded-to-unbranded click ratio.

**What good looks like.** The four totals agree with Search Console's own, and you can state your branded share. That share is a diagnosis: mostly branded traffic means people who already know you are finding you, and the discovery half of the market is not yours.

**If it went wrong.**
- *The totals are close but one side is consistently lower* — check the date range, then reread the reconciliation section above. Fresh versus final is the usual answer.
- *No queries returned* — most often genuinely low traffic, sometimes the wrong property.
- *Average position looks nothing like your tracked rank* — correct. They measure different things.

**What you just learned.** Search Console is the demand source, not a rank tracker, and reconciling it against Google's own interface is a five-minute habit that protects every report you send. Edit your keyword list against this data rather than a guess.

## Common mistakes

**Generating city pages.** Fast, looks like progress, and among the most reliably penalised patterns in local SEO. If the page does not describe something that exists, it should not exist.

**Quoting Search Console's average position as your rank.** It mixes surfaces, devices and locations, putting a defensible-looking number next to an indefensible claim. In a client report, this is the kind of error that gets found.

**Reading a site score without asking what it is out of.** A 62 that counted unverifiable checks as failures and a 62 that excluded them describe different sites. Always ask for the denominator — including from tools you like.

## Check yourself

Answer these against your own site, not from memory.

1. **Does the phone number on your site match the profile digit for digit?** If the site shows a call-tracking number and the profile the real one, is that worth fixing?
2. **What is your website support score out of?** Not the percentage: the number of verifiable points. If you cannot answer, you do not know what the audit could and could not see.
3. **Your client's Search Console shows 1,240 clicks; your report says 1,190.** Name the most likely cause before you accuse anyone of anything.
4. **Your business has three locations.** Read the website field on all three profiles. Do they point at three different pages? What would you change first?
5. **A tool reports your INP as 210 ms and your site gets about forty visitors a week.** What do you conclude about the tool?

---

**Next:** [Making the site readable by an AI agent →](./making-the-site-readable-by-agents.md)
