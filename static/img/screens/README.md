# Screenshot manifest

Every image here was captured from a **real, running** SEOG instance against **real Google data** by `scripts/capture.mjs`. None is a mockup. Re-run the script to refresh them when the UI changes.

## The two example businesses

The manual runs on two deliberately different profiles, because they teach different things.

| | **Public view** (no prefix) | **Owner view** (`owner-` prefix) |
| --- | --- | --- |
| Business | Kaffa Roastery, Helsinki | AIEmployees |
| Google Business Profile connected | No | Yes |
| Profile score | 91% (healthy) | 36% (in red) |
| Reviews | 572, rated 4.7 | 3, rated 5.0 |
| Teaches | What a strong profile looks like; everything a reader without owner access can do | Diagnosis — a real action plan with impact points and fixable problems |

A healthy profile shows the destination. A broken one shows the work. Most "what good looks like" panels want the first; most diagnostic chapters want the second.

## Rules for using these images

1. **Never present sample data as measurement.** Two screens ship illustrative placeholder data, clearly labelled in the UI itself:
   - `rankings-empty.png` — the keyword rows are captioned *"Example of how tracked keywords appear"*. They are not real positions.
   - Any search-volume panel carrying a **"Test data"** badge — no volume provider is configured in the capture environment. Do not caption those numbers as real.

   `geo-grid.png` is a **real** scan: the capture script presses **Check now** and waits for the nine live searches, because the grid that renders on first view is an *"Example scan"*.

2. **Keep Google's attribution in frame.** Any screenshot showing Places or Maps content must retain the visible "Map data ©2026 Google" / Google logo. Do not crop it out. This is a licence requirement, and the manual has a chapter about it.

3. **Caption what the reader should look at.** A screenshot with no caption is decoration. Say what to notice.

## Inventory

### Signup and setup
| File | Shows |
| --- | --- |
| `onboarding-step1.png` | Onboarding step 1 of 3 — role picker |
| `onboarding-step2.png` | Onboarding step 2 — goals |
| `onboarding-step3.png` | Onboarding step 3 — attribution, finish/skip |
| `add-business-empty.png` | **Add a business**, empty. Note the price on the button and the service-area import path below it |
| `add-business-typed.png` | Query typed, Search button now enabled |
| `add-business-results.png` | Google Places results to pick from |
| `businesses.png` | The **My Businesses** portfolio |
| `billing.png` | Billing / plan page |

### Public view — Kaffa Roastery
| File | Shows |
| --- | --- |
| `overview.png` | Business overview. The "Connect to unlock your owner data" panel, profile score 91%, rating 4.7 / 572 reviews, action plan |
| `overview-full.png` | Same, whole page |
| `rankings-empty.png` | Rankings before anything is tracked. **Sample rows — not real positions** |
| `rankings-typed.png` | A keyword typed, with the price on the Track button |
| `rankings-tracked.png` | A **real** tracked keyword after its first live check |
| `rankings-tracked-full.png` | Same, whole page |
| `keyword-detail.png` | Keyword detail panel — position, competitors beating you, history |
| `geo-grid.png` | **Real 3×3 grid scan.** Top 3 across 100% of the area, top 20 at 9 of 9 points, averaging #2.4, on a real Helsinki map with rank-coloured pins |
| `reviews.png`, `reviews-full.png` | Reviews list, public view (recent sample only) |
| `competitors.png` | Competitors page |
| `ai-visibility.png`, `ai-visibility-full.png` | AI visibility page |
| `website.png` | Website analysis page |
| `posts.png` | Posts page, not owner-connected |
| `profile.png`, `profile-full.png` | Profile page, public view |

### Owner view — AIEmployees (Google Business Profile connected)
| File | Shows |
| --- | --- |
| `owner-overview.png` | **Profile score 36% in red**, and a 7-step action plan with per-step impact ("+10 pts", "High impact") and a "show me how to do it manually" option |
| `owner-overview-full.png` | Same, whole page |
| `owner-reviews.png`, `owner-reviews-full.png` | Reviews with owner capabilities |
| `owner-posts.png` | Posts page with an owner connection |
| `owner-profile.png`, `owner-profile-full.png` | Profile page, editable |
| `owner-website.png` | Website page |
| `owner-ai-visibility.png`, `owner-ai-visibility-full.png` | AI visibility page |

## Regenerating

```bash
# public-view set
MANUAL_BUSINESS_ID=<id> node scripts/capture.mjs

# owner-connected set
MANUAL_PREFIX=owner- MANUAL_EMAIL=<owner> MANUAL_PASSWORD=<pw> \
  MANUAL_BUSINESS_ID=<id> node scripts/capture.mjs overview reviews posts profile website aivisibility
```

Then resize to 1440px wide and quantise — full-resolution captures are roughly 3× the byte weight for no visible gain at the manual's content width.
