---
title: Making the site readable by an AI agent
sidebar_position: 8
description: Whether an AI agent can read, understand and operate your website — llms.txt, the accessibility tree, layout stability, and how to score it instead of arguing about it.
---

# Making the site readable by an AI agent

For twenty-five years the only non-human visitor your website had to satisfy was a crawler, and a crawler only reads. You now have a second kind of visitor, and it clicks. It arrives holding somebody's actual intent — book a table, get a quote, check whether you open on Sunday — and it either finishes that job on your site or gives up and finishes it on a competitor's.

Being *indexable* and being *operable* are different engineering problems. Since Lighthouse 13.3, Google ships a score for the second one, and almost nobody in local SEO has looked at it.

## Three questions an agent asks

An agent handling a local task works through your site in three stages, and it can fail at any of them.

**Can I fetch it?** Robots policy, redirects, login walls, aggressive bot blocking. An agent that is refused at the door never reaches the other two questions.

**Can I parse it?** Not "is the HTML valid" — can it build a structured model of the page. Where are the headings, what is a navigation region, what is that thing that looks like a button, and what is it called.

**Can I act?** Fill a form, press the right control, and have the page stay still long enough for the press to land on what it aimed at.

The previous chapter, [the website half](./the-website-half.md), covered the fetch layer as a ranking concern: indexable, HTTPS, mobile viewport, a `tel:` link, name and address that match the profile. This chapter is about the other two.

## An agent reads the accessibility tree, not the page

This is the fact that reframes the whole subject, and it is why the work is less exotic than it sounds.

A browsing agent does not look at your site the way you do. Screenshots are expensive, slow and ambiguous, so the practical approach — the one the current generation of browser-driving tools takes — is to read the **accessibility tree**: the structured model the browser already builds for screen readers. Roles, names, states, hierarchy. "Button, named 'Book appointment'." "Textbox, named 'Your email', required." *(Inference — no vendor publishes a spec for how its browsing mode reads a page, but the mainstream browser-driving libraries all expose an accessibility snapshot as the primary page representation.)*

Two consequences follow, and both are good news.

First, **agent readability is accessibility work under a different name.** A `<div onclick>` styled to look like a button has no role and no accessible name. A human sees a button. A screen reader announces nothing useful. An agent sees an unlabelled generic node it cannot safely press. The same fix serves all three, and unlike most SEO work it has an independent justification you can defend to a client who does not care about AI at all.

Second, **spraying ARIA attributes over the markup makes it worse.** `role="button"` on a div that does not take keyboard focus produces a control an agent will try to operate and fail. The fix is nearly always the boring one: use the element that already means what you mean, give every control a real label, and give every form field a real `<label>`.

## Layout stability is an agent problem, not just a comfort problem

Cumulative Layout Shift has been on performance checklists for years as a user-experience metric. It is now also a correctness metric.

An agent snapshots the page, decides the thing at a given position is the control it wants, and clicks. If a late banner, a cookie bar or a web font pushes the layout down in between, it presses whatever moved into that spot. It does not notice. It reports success.

You know this failure: it is why you have tapped the wrong link on a phone. The difference is that you noticed and went back. An agent frequently does not.

## What Lighthouse actually scores

The category is called **Agentic Browsing** and it currently carries six checks. In SEOG they appear on the **Website** page as an **AI agent readiness** card with a score out of 100, below the PageSpeed card. *(Verified 2026-07-21 against Lighthouse 13.4.)*

| Check | What it asks | Who else benefits |
| --- | --- | --- |
| **llms.txt** | Is there a plain-language summary file at your site root, and does it follow the recommended shape | Nobody yet |
| **Accessibility tree** | Can a machine name every control and region on the page | Screen-reader users, your own automated tests |
| **Cumulative Layout Shift** | Does the page stop moving | Every human on a phone |
| **WebMCP — registered tools** | Does the page declare callable actions to an agent | Nobody yet |
| **WebMCP — form coverage** | Are the site's forms covered by those declarations | — |
| **WebMCP — schema validity** | Are the declarations well-formed | — |

Each check is pass, fail, or **not applicable**. Passing is Lighthouse's own green line — a score of 90 or better on that audit.

**WebMCP** is the newest and least settled of these: an emerging proposal in which a page declares named actions an agent can call — "check availability", "request a quote" — instead of the agent reverse-engineering your form. It is a draft, the details are in flux, and for a five-page plumbing site it is not this quarter's work. Being told so plainly is more useful than being sold a fix.

## The number is not the verdict

Here is the thing the category does not tell you and this manual will: **not-applicable checks are excluded from the score, not counted against it.**

So a site with no `llms.txt`, no WebMCP declarations, a clean accessibility tree and stable layout scores **100 out of 100** — on a denominator of two. Four of the six questions were never asked, and the green number reads exactly like a site that answered all six.

That is why the discipline in this chapter is to read the *checks*, never the score. A dash is not a pass. A dash is an unasked question, and the only person who can decide whether it matters is you.

A corollary catches people out, and it is the most useful sentence in the chapter: **answering an unasked question badly is worse than leaving it unasked.** Publish a malformed `llms.txt` and you convert a dash into a failure — the audit now applies, so it enters the denominator, and it fails. Your score goes *down* because you did something. This is not a bug; it is what "not applicable" means.

## Where this shows up elsewhere in the work

The stored agent-readiness score feeds one factor of the AI-readiness rubric on the **AI visibility** page — "AI-agent-ready website", worth 8 of 100 points, passing at 90 or above. The full rubric and its weights are in [diagnosing a business in thirty minutes](./analyzing-business-visibility.md).

Eight points is the honest size of this lever. Review volume is worth 22 and rating 18 in the same rubric. If you have one afternoon and a business with fourteen reviews, this chapter is not where you spend it. Read that as calibration, not as a reason to skip the work: the accessibility fixes are cheap, they are permanent, and they pay in three currencies at once.

Note also that the factor reads whatever was *last stored*: nothing measures your site on page load, so the readiness score only learns about a fix when you re-run the website audit.

## What the score does not check

Three real gaps, none of them Google's fault — they are simply outside what this category measures.

**Whether you allow AI crawlers at all.** The category audits the page it was served. It does not read your `robots.txt`, and it does not know that someone disallowed the assistants' user agents six months ago after reading a blog post about protecting content. You can score 100 here while being invisible to the engines you are trying to reach. Go and read your own `robots.txt`, then decide deliberately.

**Whether there is anything worth reading.** A three-sentence homepage with perfect semantics scores the same as a genuinely useful services page. Machine readability is a floor, not content.

**Whether the facts are right.** Nothing here compares the phone number on your site to the one on your Google profile. That is the NAP check from the [previous chapter](./the-website-half.md) and the subject of [citations and NAP consistency](./citations-and-nap.md), and it matters more than any of this.

## Is llms.txt worth doing?

Honestly: yes, but not for the reason it is usually sold.

An `llms.txt` is a small Markdown file at your site root that states, in plain language, what the business is and where the important pages are. The proposal came out of the documentation world and its examples are all software libraries, which is why almost every local-business version you will see is a mangled software template.

As a *retrieval* signal the evidence is thin. No controlled test has shown a local business gaining an AI recommendation from adding one, and our own AI-visibility weighting treats it as a non-signal for exactly that reason. [Changing the AI answer](../03-advanced/changing-the-ai-answer.md) sets out what the evidence does and does not support. Anybody telling you `llms.txt` moves AI visibility is ahead of the data.

The case for writing one anyway is narrower and defensible: it is now scored by a first-party Google audit, it takes about twenty minutes, and the act of writing it forces you to state your services, service area and hours in one place in plain sentences — which is the same content work that helps everywhere else. Do it, then stop thinking about it.

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

Rules that matter: one H1 with the business name, a one-paragraph summary, real links with a short description each, and nothing in it that contradicts your Google profile. Keep it short. A file that restates your whole site is a file nobody maintains.

## Labs

The website audit needs no Google connection — it runs against your public site and the profile facts already stored. Working read-only on a business you do not own, Labs 14.1 and 14.2 work as written; 14.3 needs publish access and has an alternative below.

### Lab 14.1 — Score it

> **Lab** · Where: **Website** (`/b/{businessId}/website`) · Cost: **paid** · Time: ~5 min
>
> You need: a business added (Lab 0.3) with a website on its Google profile. No owner access required.

1. Open `/b/{businessId}/website`.
2. Press **Check now**. The top-right button refreshes the whole page (site audit plus Search Console performance); the **Check now** on the **Website support** card lower down re-runs the site audit only. Either produces the agent-readiness data, and both show their price before you confirm.
3. Wait for the run to finish, then scroll to the **AI agent readiness** card, directly below the PageSpeed card.
4. Write down the score out of 100 **and** the status of all six checks — tick, cross, or dash.

**What good looks like.** A card headed **AI agent readiness** with a score and six named rows. On a typical small-business site most rows are dashes and the score is high.

**If it went wrong.**
- *No card at all.* Google marks this category still under development, and the check is not always served. The rest of the audit still ran. SEOG shows nothing rather than inventing a score — try again in a few days.
- *"No website on the Google profile."* The profile has no site attached. Add one there first; the website field is one of the safe fields to edit (see [the profile is the product](./the-profile-is-the-product.md)).
- *A warning that the site renders with JavaScript.* Some checks could not be verified and are excluded from the **Website support** score. Unverifiable is not failing.

**What you just learned.** The score is computed over the checks that applied. Until you know which ones applied, the number means nothing.

### Lab 14.2 — Treat "not applicable" as work

> **Lab** · Where: **Website** (`/b/{businessId}/website`) · Cost: **free** · Time: ~10 min
>
> You need: Lab 14.1.

1. List every check showing a dash.
2. Beside each, write the single condition that would make it apply — for `llms.txt`, "a valid file exists at the root"; for the WebMCP rows, "the site declares agent-callable actions".
3. Classify each as **do now**, **do later**, or **not for this business**, with one clause of justification. "Not for this business" is a legitimate answer; expect to use it three times.
4. Open `https://yoursite.com/robots.txt` in a browser and record whether AI crawler user agents are allowed. This card does not check it and cannot tell you.

**What good looks like.** A short table where every row carries a decision, at most two rows say *do now*, and you know your own robots policy.

**If it went wrong.** If every row reads *do now*, you have made a checklist rather than a plan. Rank by what a customer would notice.

**What you just learned.** A silent pass and a green dash look identical on a dashboard and mean opposite things. This is the general skill: any audit that hides its denominator is telling you less than it appears to.

### Lab 14.3 — Ship one fix and re-score

> **Lab** · Where: your web host, then **Website** (`/b/{businessId}/website`) · Cost: **paid** (the re-run) · Time: ~30 min
>
> You need: Lab 14.2, and the ability to publish a file at your site root.

1. Write an `llms.txt` using the shape above. Business name as the H1, one summary paragraph, the NAP and service area as plain lines, then your real service pages as links with one clause of description each.
2. Check every fact in it against the Google profile. A contradiction here is worse than no file.
3. Publish it at exactly `https://yoursite.com/llms.txt` and open that URL in a browser to confirm it loads as plain text.
4. Back on **Website**, press **Check now** on the **Website support** card — the site audit only, which is the cheaper of the two buttons. A manual re-check fetches fresh rather than re-serving the stored result.
5. Re-read the **AI agent readiness** card. The `llms.txt` row should have moved off the dash.

**What good looks like.** The `llms.txt` row now shows a tick. The category score may have moved in *either* direction, and you can explain why.

**If it went wrong.**
- *Still a dash.* The file is not where you think. Common causes: it is one directory down, the host serves a styled 404 page with a success status, or a redirect rewrites the path. Load the exact URL yourself.
- *It now shows a cross.* The file is found but does not follow the recommended shape. The card's hint says what is missing — usually the heading, the summary, or any links at all.
- *The score fell.* Correct behaviour. You added an applicable check and it failed, so the denominator grew. Fix the file rather than deleting it.

**Observe-only alternative.** Write the file anyway — it is the artefact you would hand a client — and get the score another way: Lighthouse ships this category in the tool itself, so you can run it locally against any URL for free (Chrome DevTools or the Lighthouse CLI, 13.3 or newer; an older Chrome will not show the category). The data source behind it is free to query — see [what Google's APIs actually cost](../05-reference/what-googles-apis-cost.md).

**What you just learned.** Not-applicable is a question you have not answered yet, and answering it badly costs you more than silence did.

## Common mistakes

**Reporting the score instead of the checks.** "Agent readiness: 100" in a client report, on a site with no `llms.txt` and no declarations, is a true number and a false impression. Report the six rows, or report nothing.

**Selling `llms.txt` as a ranking factor.** It is cheap, it is scored by Google's own audit, and the evidence that it changes retrieval is weak. All three are true at once, and the practitioner who says all three is worth more than the one who picks the flattering subset.

**Fixing the accessibility tree with ARIA.** Adding `role` and `aria-label` to non-semantic markup usually produces a control that announces well and behaves badly — which an agent will try to use, and fail. Reach for the real element first.

**Building WebMCP declarations for a brochure site.** A draft standard, no measured local benefit, and a maintenance burden on every form you change. Revisit it when you sell something bookable online and are willing to be early on purpose.

**Blocking the audience you are optimising for.** A copied-in `robots.txt` that disallows AI user agents, added by a previous developer with good intentions, is invisible on every dashboard in this chapter. Check it before you buy anything else.

## Check yourself

1. Your card shows 100 out of 100 and you have no `llms.txt`. Explain how both statements are true, in one sentence, without using the word "bug".
2. Which of the six checks improve the experience of a human customer, and which serve only machines? Justify the split from your own card.
3. You publish an `llms.txt` and the category score drops. What happened, mechanically?
4. Name one way an agent could be completely blocked from your site while this category still scores it as perfect.
5. Your business has 14 reviews and a 4.0 rating. Agent readiness is worth 8 readiness points; review volume 22 and rating 18. What is this month's order of work, and what do you say to the client who read an article about `llms.txt` and wants it first?

---

One durability note, because this is the newest material in the manual: Google marks the Agentic Browsing category **still under development**. The checks can change and the category can stop being served, so build your reporting such that its absence reads as *unknown*, never as *failing*.

The mirror image of this chapter — pointing an agent at a live business listing rather than at a website, where the safety questions invert — is [running local SEO with an AI agent](../04-operating/running-local-seo-with-an-ai-agent.md) in Part IV. And doing this chapter without SEOG is unusually easy: run Lighthouse yourself ([doing it without SEOG](../99-appendix/doing-it-without-seog.md)).

---

**Next:** [Publishing to a Google Business Profile without getting rejected →](./publishing-without-getting-rejected.md)
