# The Local SEO Manual

**A free, hands-on manual for getting a business that serves a place found on Google — and, increasingly, recommended by AI assistants.**

📖 Read it at **[learn.seog.ai](https://learn.seog.ai)** · Licensed [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) · Corrections welcome

---

Local SEO is a different discipline from the SEO that ranks a blog post. The ranking factors are different, the results page is different, and the thing being ranked is not your website at all — it is an entity record in Google's index that you mostly do not control.

It is also unusually learnable, because the feedback is fast and the ground truth is public. Everything your competitors have done is visible. Everything you do is measurable within days.

This manual teaches it from zero, and then keeps going past where every other guide stops.

## Why this one exists

Search "local SEO guide" and you will find a hundred articles that end at "add your business to Google and get some reviews." Past that point the industry runs on folklore, because the people who know how it actually works sell that knowledge for $2,000 a month.

Two things here are not available elsewhere:

**1. A field reference built from live probes, not documentation.** Google's own deprecation page has not been updated since July 2024 and does not mention that the Q&A API was retired. The AI-generated "GBP API 2026 guide" articles currently ranking still document endpoints that have been dead for months. [Part V](https://learn.seog.ai/reference/how-to-read-this-reference) is a numbered, dated capability matrix — what works, what is gone, what never worked despite the UI offering it — with the probe that established each fact and the date it was last checked. Cite it by ID.

**2. Measurement written honestly, including where it breaks.** Geo-grid rank tracking is sold by every vendor in this category and critiqued by none of them. This manual teaches how to read a grid, and also the statistical reasons two tools disagree, and the structural reason map-pack grid tracking **cannot work at all** for service-area businesses — an enormous share of the market that is currently being sold a metric incapable of existing.

## If you build things

Local SEO is probably the most sellable skill you can bolt onto what you already know, and the least discussed among people who write code.

The market is millions of businesses that cannot do this themselves and already pay agencies monthly for work that is largely mechanical. Every part of it is reachable through an API. And it is now genuinely automatable — [Part IV](https://learn.seog.ai/operating/running-local-seo-with-an-ai-agent) covers wiring an AI agent directly to real local-SEO operations, which is a thing an agency cannot match and you can build in a weekend.

Also worth noticing: your own studio or freelance practice is a local business. "Web developer in \<your city\>" is a map-pack query.

## How the labs work

Every chapter is **theory → lab → what good looks like**. Reading that proximity dominates local rankings teaches you a sentence; watching your own business rank #2 at its front door and vanish three miles away teaches you the job.

The labs run in **[SEOG](https://seog.ai)**, a local-SEO platform with a free account. We built SEOG, and we wrote this manual — that is worth knowing up front, and it is why the labs can name the exact screen and the exact expected result instead of waving at "your rank tracker."

You are not required to use it. Every lab states the underlying concept and the raw data source, and [Doing all of this without SEOG](https://learn.seog.ai/appendix/doing-it-without-seog) covers the manual path for each one. It works. It is just slow, and it does not keep history — which matters more than it sounds, because local SEO is judged on movement over weeks and you cannot see movement you did not record.

Labs are marked **free** (reads stored data) or **paid** (fetches new data from Google). Never a hard number, because prices change and a manual should not lie to you a year from now.

## Contents

### Start here
- [About this manual](docs/00-start-here/about-this-manual.md)
- [How the labs work](docs/00-start-here/how-the-labs-work.md)
- [Set up your workbench](docs/00-start-here/set-up-your-workbench.md)

### Part I — Foundations
How local search actually works, before you change anything.
- [What local SEO actually is](docs/01-foundations/what-is-local-seo.md)
- [Google is not ranking your website](docs/01-foundations/the-business-entity.md)
- [The three forces: relevance, distance, prominence](docs/01-foundations/relevance-distance-prominence.md)
- [Rank is a map, not a number](docs/01-foundations/rank-is-a-map-not-a-number.md)
- [How an AI assistant answers a local question](docs/01-foundations/how-ai-answers-a-local-question.md)
- [What people actually search, and how to model it](docs/01-foundations/what-people-actually-search.md)

### Part II — Core practice
The working loop: measure, diagnose, fix, re-measure.
- [Diagnosing a business in thirty minutes](docs/02-core-practice/analyzing-business-visibility.md)
- [Building a tracked set that tells the truth](docs/02-core-practice/choosing-what-to-track.md)
- [The profile is the product](docs/02-core-practice/the-profile-is-the-product.md)
- [Photos, and what you cannot do with them](docs/02-core-practice/photos-and-the-visual-profile.md)
- [Reviews: getting them, and answering them](docs/02-core-practice/reviews.md)
- [Citations and NAP consistency](docs/02-core-practice/citations-and-nap.md)
- [The website half: pages, schema and Search Console](docs/02-core-practice/the-website-half.md)
- [Making the site readable by an AI agent](docs/02-core-practice/making-the-site-readable-by-agents.md)
- [Publishing to a Google Business Profile without getting rejected](docs/02-core-practice/publishing-without-getting-rejected.md) ⭐
- [Reading a competitor off their public data](docs/02-core-practice/competitors.md)
- [Did it work? Closing the loop](docs/02-core-practice/did-it-work.md)

### Part III — Measurement you can defend
- [Reading a geo-grid without fooling yourself](docs/03-advanced/reading-a-geo-grid.md) ⭐
- [Why map-pack rank tracking cannot work for service-area businesses](docs/03-advanced/service-area-businesses.md) ⭐
- [Does the AI recommend this business? A measurement method](docs/03-advanced/ai-visibility.md) ⭐
- [Changing the answer: what actually moves AI visibility](docs/03-advanced/changing-the-ai-answer.md)
- [Why two tools disagree, and which one is wrong](docs/03-advanced/why-two-tools-disagree.md)
- [Spam, fake listings and the competitive underworld](docs/03-advanced/spam-and-fake-listings.md)
- [Suspensions, restrictions and getting back](docs/03-advanced/suspensions-and-reinstatement.md)
- [Multi-location, franchise and scale](docs/03-advanced/multi-location-and-franchise.md)

### Part IV — Operating
Turning the skill into work someone pays for.
- [Reporting to someone who is paying for it](docs/04-operating/reporting-to-a-client.md)
- [The first ninety days](docs/04-operating/the-ninety-day-plan.md)
- [Running local SEO with an AI agent](docs/04-operating/running-local-seo-with-an-ai-agent.md) ⭐
- [What you inherit the moment you connect a client's profile](docs/04-operating/what-you-inherit-with-a-client.md)
- [What the work costs, and what the market charges](docs/04-operating/what-the-work-costs.md)
- [Staying current when the ground moves](docs/04-operating/staying-current.md)

### Part V — The field reference
One fact per heading, each with a verdict, the date it was last verified, and the probe that established it.
- [How to read this reference](docs/05-reference/how-to-read-this-reference.md)
- [What the Places API will and will not give you](docs/05-reference/what-places-returns.md) ⭐
- [The Google Business Profile surface: what is alive, what is dead, what never worked](docs/05-reference/gbp-capability-matrix.md) ⭐
- [Storing Google data legally](docs/05-reference/storing-google-data-legally.md) ⭐
- [Write limits and failure modes](docs/05-reference/write-limits-and-failure-modes.md)
- [What Google's own reporting hides](docs/05-reference/what-googles-reporting-hides.md)
- [AI engine probe recipes](docs/05-reference/ai-engine-probe-recipes.md)
- [The local search changelog](docs/05-reference/local-search-changelog.md)

### Appendix
- [What the labs cost](docs/99-appendix/what-things-cost.md)
- [Glossary](docs/99-appendix/glossary.md)
- [Checklists and templates](docs/99-appendix/checklists-and-templates.md)
- [The local prompt corpus](docs/99-appendix/the-local-prompt-corpus.md)
- [The AI visibility observation schema](docs/99-appendix/ai-visibility-record-schema.md)
- [Doing all of this without SEOG](docs/99-appendix/doing-it-without-seog.md)
- [Contributing, and how this manual is verified](docs/99-appendix/contributing.md)

⭐ = chapters containing material not published anywhere else.

## How this manual is verified

Claims in the field reference carry a verdict, a date and a reproducible probe. Nothing is asserted from documentation alone, because Google's documentation is measurably out of date.

The trade-off is honest: **a manual whose value is dated evidence goes stale.** Google changed the ground three times between March 2025 and July 2026. Rather than implying permanent freshness, every reference entry states when it was last checked, and each section carries a re-probe cadence. "Last verified 2026-07-13, not re-checked since" is a true statement and a useful one. A silent stale claim is neither.

Compliance material quotes the clause verbatim with its section number and document date, then interprets it separately. It is our reading of published terms, not legal advice.

## Contributing

Corrections are the most valuable contribution — especially "this endpoint behaves differently now, here is my probe." See [Contributing](docs/99-appendix/contributing.md) and [STYLE.md](STYLE.md).

Found something wrong? [Open an issue](https://github.com/seog-ai/local-seo-manual/issues). Include what you observed, when, and how to reproduce it.

## Running it locally

```bash
npm install
npm run dev      # http://localhost:3007
npm run build    # catches broken links; `dev` does not
```

## License

Two licenses, because this repository holds two different kinds of thing.

| What | License | Covers |
| --- | --- | --- |
| **The manual** | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) — [`LICENSE`](LICENSE) | `docs/`, and the images in `static/` |
| **The tooling** | MIT — [`LICENSE-CODE`](LICENSE-CODE) | `scripts/`, the Docusaurus config, theme CSS, Dockerfile |

Read it, share it, teach from it, translate it, quote it in a client deliverable. Attribution appreciated — a link to [learn.seog.ai](https://learn.seog.ai) is plenty.

The split exists because Creative Commons explicitly recommends against using CC licenses for software, and a repository that publishes a chapter on reading licenses carefully should not fumble its own.

One thing CC BY does **not** cover: the screenshots contain Google Maps and Places content, which remains subject to Google's own terms. Keep the attribution visible if you reuse them — [Storing Google data legally](docs/05-reference/storing-google-data-legally.md) explains why.
