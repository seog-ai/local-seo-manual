// Panel crops from the stored screenshots.
//
// Some screens are only meaningful whole (an overview page, a settings screen) and some
// labs need one panel out of a screen that is 2,700 px tall. Inlined at the manual's
// content width a full-page capture renders as a 1,000 px strip of unreadable UI, so the
// lab that most needs the evidence is the one that cannot show it.
//
// This crops named regions out of captures that capture.mjs already produced. It touches
// no app and no network — the inputs are files in this repo — so it is re-runnable at any
// time, and `npm run build` is the only thing that has to pass afterwards.
//
//   node scripts/crop.mjs            # all
//   node scripts/crop.mjs grid-panel # one
//
// When the UI moves: re-run capture.mjs first, then re-run this and CHECK EACH OUTPUT.
// A box is pixels, not a selector — it does not know that a card grew a row.

import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const HERE = dirname(fileURLToPath(import.meta.url));
const DIR = join(HERE, '..', 'static', 'img', 'screens');

// from: source capture · box: [left, top, width, height] in the source's own pixels
const CROPS = {
  // Lab 18.1 counts pins by colour band, so the crop has to keep the legend under the map.
  'grid-panel': {
    from: 'keyword-detail.png',
    box: [470, 1300, 940, 1180],
    shows: 'the Geographic visibility card: presets, coverage trend, the map, and the band legend',
  },
  // Lab 18.2 reads the compare strip; the counts above the map are the whole point.
  'grid-compare-panel': {
    from: 'geo-grid-compare.png',
    box: [490, 1730, 950, 720],
    shows: 'compare mode: the "vs scan from …" strip, movement-coloured pins, and the Improved / Dropped legend',
  },
};

const wanted = process.argv.slice(2);
let failed = 0;

for (const [name, spec] of Object.entries(CROPS)) {
  if (wanted.length && !wanted.includes(name)) continue;
  const src = join(DIR, spec.from);
  if (!existsSync(src)) {
    console.log(`  x ${name}: missing source ${spec.from} — run capture.mjs first`);
    failed++;
    continue;
  }
  const [left, top, width, height] = spec.box;
  const meta = await sharp(src).metadata();
  if (left + width > meta.width || top + height > meta.height) {
    console.log(`  x ${name}: box runs past ${spec.from} (${meta.width}x${meta.height}) — the capture moved`);
    failed++;
    continue;
  }
  await sharp(src).extract({ left, top, width, height }).toFile(join(DIR, `${name}.png`));
  console.log(`  v ${name}.png  ${width}x${height}  from ${spec.from}`);
}

process.exit(failed ? 1 : 0);
