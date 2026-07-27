---
title: Google is not ranking your website
sidebar_position: 1
description: Local ranking happens on a business entity — a record of name, place, category and reputation. Your website is one field on it, not the thing being ranked.
---

# Google is not ranking your website

Run a local search and click a result in the map pack. You do not land on a website. You land on a panel: name, stars, hours, photos, a call button, a directions button — and the website, if there is one, as a single link a few rows down.

That panel is the thing being ranked. It is a record Google holds about a place, and it exists whether or not the business has a website, has heard of SEO, or has ever logged in. Local SEO is the practice of improving that record and the evidence supporting it. Almost every beginner mistake in this field comes from not knowing that.

## The ranked object is a record, not a page

**Google's own account of local ranking names three factors:** relevance, distance and prominence — its help page opens by calling the third one "popularity" and then defines it as prominence, so you will see both words.

Look at what those are properties *of*.

| Factor | What Google says it measures | A property of |
| --- | --- | --- |
| **Relevance** | How well a Business Profile matches what someone is searching for | The profile |
| **Distance** | How far each business is from the customer searching | The business |
| **Prominence** | How well known the business is — based, Google says, on information like how many websites link to it and how many reviews it has | The business |

> **Not one of them is a property of a page.**

**The website has a role.** Google's help page carried a sentence for years saying that your position in web results is also a factor, "so SEO best practices also apply to local search optimization"; that line is not in the current text, and Google now describes prominence only in terms of links, reviews and information from across the web.

Treat "web ranking feeds prominence" as the long-standing practitioner reading rather than a current Google statement *(open question)*. Either way the direction is the same: the site is evidence about the business. It is not the thing in the ranking.

Five things feed that record, in two different ways:

| Source | How it lands | Who controls it |
| --- | --- | --- |
| Your website | Evidence | You |
| Directories and citations | Evidence | Partly you |
| Reviews and photos from customers | Evidence | Nobody |
| What you publish as the owner | Direct edits | You |
| Google's own corrections | Direct edits | Google |

All of it resolves into one record — name, place, category, hours, reputation — and that record is what the map pack, Maps and the AI answers are reading.

This is why a beautifully built site can sit invisible in the map pack while a competitor with a one-page template outranks it everywhere. They are not competing on the axis you optimised.

## The fields of the entity

An entity is a set of fields. Group them by what they *are*, because the groups behave differently — different sources, different risks, different rules about who may hold them.

| Group | Fields | Who writes it |
| --- | --- | --- |
| **Identity** | Machine identifier, name, address, coordinates, primary category | Google, from owner input plus its own corrections |
| **Contents** | Hours, attributes, description, services, photos, posts | Mostly the owner; photos also customers |
| **Reputation** | Rating, review count, individual reviews, owner replies | Customers, plus the owner's replies |
| **Links out** | Website URL, phone, booking and ordering links | The owner |

Two things about this table matter more than they look.

**First, the machine identifier.** Every place in Google's index carries a stable identifier — a **place ID**. It is not the name and not the address. It is the key, and the rest of the record hangs off it. When a tool "tracks your business", the honest description of what it stores is that key plus its own measurements.

**Second, notice how many rows are not written by you.** Customers add photos and reviews. Google edits fields from other signals it holds — which is why the warning shown before you apply a profile change says Google can reject or change an edit. Your listing is a record you contribute to, not a document you own.

## Identity and contents are different classes of thing

Here is the argument that settles it, and it does not come from a ranking study. It comes from what Google's own terms let you keep.

**For public place data the default is that you may not store it at all.** There are exactly two express permissions:

- The **place identifier**, indefinitely.
- **Coordinates**, for at most 30 consecutive calendar days, after which they must be deleted.

The same terms name copying and saving business names, addresses or user reviews as prohibited scraping. On the owner side, Business Profile content carries a 30-day storage cap of its own. (Read against the Maps terms current in June 2026 and the Business Profile API policies dated 2025-08-28.)

Read that as a description of the data model and it is unambiguous:

> **The pointer is permanent. The contents are a live reading you have to go back for.**

Google's licence treats the identity of a place as a durable key you may hold forever, and everything hanging off it as a current-state snapshot you are borrowing. That is precisely how an entity behaves. It has an identity, and it has a state, and they are not the same kind of fact.

The practical consequences are large:

- **A tool's stored copy of the contents is a photograph, not the record.** Any number you read in any local SEO product is as of the last fetch. Look for the timestamp before you quote it to anyone.
- **Anything built by mass-copying names, addresses and reviews is built on prohibited ground.** That is why nobody sells you a downloadable database of every business in your city.
- **A stored identifier can still go stale.** Place IDs are stable but not immortal — they change as Google's map database is updated, and Google recommends refreshing stored IDs older than 12 months. The refresh is free, because it touches no billable field. Almost nobody implements it, which is why an old prospecting list quietly starts reporting live businesses as "not found".

> The verbatim clauses, with their section numbers and document dates, are in [Storing Google data legally](../../05-reference/storing-google-data-legally.md). This chapter is describing the shape of the rules, not quoting them, and none of it is legal advice.


---

**Next:** [Two views of the entity, and why records disagree →](./two-views-and-disagreements.md)
