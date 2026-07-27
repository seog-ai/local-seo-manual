#!/usr/bin/env python3
"""
Illustration generator for The Local SEO Manual (Nano Banana 2 / gemini-3-pro-image
on Vertex AI).

Deliberately narrow in scope. The manual's credibility rests on real screenshots and
precise diagrams, not on decoration — generated art is used only where a real capture
is impossible: the shareable social card, the site/repo hero, and one opener per part.
Everything explanatory is a screenshot (scripts/capture.mjs) or a Mermaid diagram.

Every prompt forbids text. Models render lettering unreliably, and a cover with
misspelled words undoes exactly the credibility the manual is trying to buy — so all
real typography is composited afterwards by scripts/social-card.mjs.

Auth: a Vertex service account with Vertex AI access.
    export GOOGLE_APPLICATION_CREDENTIALS=/path/to/sa.json
    python3 scripts/illustrate.py [name ...]

NOTE: gemini-3-pro-image is served from the `global` Vertex location. Regional
endpoints (us-central1) return 404 NOT_FOUND for it.
"""
import json
import os
import sys
from pathlib import Path

from google import genai
from google.genai import types

MODEL = "gemini-3-pro-image"
LOCATION = "global"
OUT = Path(__file__).resolve().parent.parent / "static" / "img" / "art"

# Shared style contract. Keep every image in one visual family: the manual should
# look like one book, not a folder of stock art.
STYLE = (
    "Flat editorial vector illustration for a technical engineering manual. "
    "Deep blue #004ac6 with a second darker navy and an off-white background. "
    "Generous negative space, precise geometry, calm and diagrammatic. "
    "Absolutely no text, no words, no letters, no numbers, no labels, no watermarks."
)

IMAGES = {
    "hero": (
        "An abstract city map seen from above, rendered as clean geometry, with a regular "
        "grid of small circular measurement points overlaid across it. One point at the "
        "centre is highlighted and connected by thin lines to a few landmarks. 16:9."
    ),
    "og-background": (
        "A wide, very sparse abstract composition: a faint regular grid of small circular "
        "measurement points over an off-white field, denser toward the left edge, almost "
        "empty on the right so text can sit there. Extremely minimal. 16:9."
    ),
    "part-foundations": (
        "A single large circle being triangulated by three thin converging lines from three "
        "small anchor shapes, on an open field. Suggests relevance, distance and prominence. 16:9."
    ),
    "part-practice": (
        "A repeating loop of four arrows forming a cycle, with a small map fragment inside it. "
        "Suggests measure, diagnose, fix, re-measure. 16:9."
    ),
    "part-measurement": (
        "A grid of small circles where each circle has a slightly different size, forming a "
        "soft gradient of density across the field — a heatmap rendered as pure geometry. 16:9."
    ),
    "part-operating": (
        "A simple flow of three stacked horizontal bands connected by thin vertical lines, "
        "like a report or a plan laid out on a page. 16:9."
    ),
    "part-reference": (
        "An orderly array of small identical rectangles in neat rows, like index cards in a "
        "catalogue, one card lifted slightly out of the array. 16:9."
    ),
}


def main() -> int:
    sa = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS")
    if not sa or not Path(sa).exists():
        print("set GOOGLE_APPLICATION_CREDENTIALS to a Vertex service-account json")
        return 1
    project = json.load(open(sa))["project_id"]
    client = genai.Client(vertexai=True, project=project, location=LOCATION)

    OUT.mkdir(parents=True, exist_ok=True)
    wanted = sys.argv[1:] or list(IMAGES)

    for name in wanted:
        if name not in IMAGES:
            print(f"  ? unknown image: {name}")
            continue
        dest = OUT / f"{name}.png"
        try:
            resp = client.models.generate_content(
                model=MODEL,
                contents=f"{IMAGES[name]} {STYLE}",
                config=types.GenerateContentConfig(response_modalities=["TEXT", "IMAGE"]),
            )
        except Exception as exc:  # noqa: BLE001 - report and continue to the next image
            print(f"  x {name}: {type(exc).__name__}: {str(exc)[:160]}")
            continue

        wrote = 0
        for cand in resp.candidates or []:
            for part in cand.content.parts or []:
                blob = getattr(part, "inline_data", None)
                if blob and blob.data:
                    dest.write_bytes(blob.data)
                    wrote += 1
                    break
        print(f"  {'v' if wrote else 'x'} {name}.png")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
