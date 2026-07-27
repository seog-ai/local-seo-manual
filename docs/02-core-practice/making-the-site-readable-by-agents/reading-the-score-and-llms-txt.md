---
title: Reading the score, and whether llms.txt is worth it
sidebar_position: 2
description: Why Agentic Browsing reports a fraction rather than a score, what it never checks, and the honest case for publishing an llms.txt on a local business site.
---

# Reading the score, and whether llms.txt is worth it

Six checks, then, and a report that summarises them. The summary is where the trouble starts.

## The number is not the verdict

**Start with what Google deliberately did *not* ship.** Agentic Browsing has no weighted 0–100 score like Performance or SEO. Google's reasoning, in its own words: because "the standards for the agentic web are still emerging, the current focus is to gather data and provide actionable signals rather than a definitive ranking".

What the Lighthouse report shows instead is **a fraction** — how many of the applicable checks passed. A site with no `llms.txt`, no WebMCP registration, a clean accessibility tree and stable layout comes back green at **2 of 2**.

**Read that fraction again.** Four of the six questions were never asked, and a green 2/2 reads on a dashboard exactly like a site that answered all six.

Tools that render the fraction as a percentage — SEOG's card among them, which shows the figure out of 100 when the API supplies one — make the illusion worse, because 100 looks like a verdict and 2/2 at least shows its denominator. *(Inference: Google documents the fraction and the not-applicable status, but does not spell out the arithmetic; the excluded-from-the-denominator behaviour is what the reports show.)*

That is why the discipline in this chapter is to read the *checks*, never the number.

> **A dash is not a pass.** A dash is an unasked question, and the only person who can decide whether it matters is you.

**A corollary catches people out**, and it is the most useful sentence in the chapter: **answering an unasked question badly is worse than leaving it unasked.**

Publish a malformed `llms.txt` and you convert a dash into a failure — the audit now applies, so it enters the denominator, and it fails. You go from 2/2 to 2/3 because you did something. This is not a bug; it is what "not applicable" means.

## Where this shows up elsewhere in the work

The stored agent-readiness score feeds one factor of the AI-readiness rubric on the **AI visibility** page — "AI-agent-ready website", worth 8 of 100 points, passing at 90 or above. The full rubric and its weights are in [diagnosing a business in thirty minutes](../analyzing-business-visibility/index.md).

**Eight points is the honest size of this lever.** Review volume is worth 22 and rating 18 in the same rubric. If you have one afternoon and a business with fourteen reviews, this chapter is not where you spend it.

Read that as calibration, not as a reason to skip the work: the accessibility fixes are cheap, they are permanent, and they pay in three currencies at once.

Two mechanical notes on that factor:

- **It reads whatever was *last stored*.** Nothing measures your site on page load, so it only learns about a fix when you re-run the website audit.
- **It needs a figure to compare against 90.** If the category was not served on the run that produced your stored audit, the factor cannot pass, which reads as a gap you cannot close until a later run returns one.

## What the score does not check

Three real gaps, none of them Google's fault — they are simply outside what this category measures.

**Whether you allow AI crawlers at all.** The category audits the page it was served. It does not read your `robots.txt`, and it does not know that someone disallowed the assistants' user agents six months ago after reading a blog post about protecting content.

You can score 100 here while being invisible to the engines you are trying to reach. Go and read your own `robots.txt`, then decide deliberately.

**Whether there is anything worth reading.** A three-sentence homepage with perfect semantics scores the same as a genuinely useful services page. Machine readability is a floor, not content.

**Whether the facts are right.** Nothing here compares the phone number on your site to the one on your Google profile. That is the NAP check from the [previous chapter](../the-website-half/index.md) and the subject of [citations and NAP consistency](../citations-and-nap/index.md), and it matters more than any of this.

## Is llms.txt worth doing?

Honestly: yes, but not for the reason it is usually sold.

An `llms.txt` is a small Markdown file at your site root that states, in plain language, what the business is and where the important pages are. The proposal came out of the documentation world and its examples are all software libraries, which is why almost every local-business version you will see is a mangled software template.

### The retrieval evidence

**As a *retrieval* signal the evidence is not thin so much as negative.** Google's John Mueller: "AFAIK none of the AI services have said they're using LLMs.TXT (and you can tell when you look at your server logs that they don't even check for it)."

Ahrefs published a log study of roughly 137,000 domains in 2026 and reported that 97% of `llms.txt` files received no requests at all during the month measured. No AI vendor has committed publicly to reading the file in production, and no controlled test has shown a local business gaining an AI recommendation from adding one.

Our own AI-visibility weighting treats it as a non-signal for exactly that reason. [Changing the AI answer](../../03-advanced/changing-the-ai-answer/index.md) sets out what the evidence does and does not support. Anybody telling you `llms.txt` moves AI visibility is ahead of the data — and, on the log evidence, ahead of anything reading the file.

### The case for writing one anyway

**It is narrower than the pitch, and defensible:**

- it is now scored by a first-party Google audit;
- it takes about twenty minutes;
- the act of writing it forces you to state your services, service area and hours in one place in plain sentences — which is the same content work that helps everywhere else.

Do it, then stop thinking about it.

A shape that suits a local business, rather than a software library:

```markdown
# Northgate Plumbing

> Emergency and scheduled plumbing across Leeds. Gas Safe registered, trading since 2009,
> 24/7 emergency call-out.

- Address: 14 Northgate, Leeds LS2 8AB
- Phone: +44 113 496 0000
- Hours: Mon–Fri 08:00–18:00, Sat 09:00–13:00; emergency call-out 24/7
- Service area: Leeds city centre, Headingley, Horsforth, Pudsey

## Services

- [Emergency leak repair](https://example.com/emergency): same-day response in central Leeds, fixed call-out fee.
- [Boiler installation and servicing](https://example.com/boilers): installation, annual service, landlord certificates.
- [Bathroom fitting](https://example.com/bathrooms): full fit including tiling and waste rerouting.

## About

- [Accreditations](https://example.com/accreditations): Gas Safe registered, CIPHE member.
- [Service area](https://example.com/areas)
- [Contact and booking](https://example.com/contact)
```

*(Illustrative example — the business, the numbers and the accreditations are invented.)*

**Rules that matter:**

- one H1 with the business name;
- a one-paragraph summary;
- real links with a short description each;
- nothing in it that contradicts your Google profile.

Keep it short. A file that restates your whole site is a file nobody maintains.

---

**Next:** [Labs: score agent readiness and ship one fix →](./agent-readiness-labs.md)
