// One-off: generate raster SEO/social assets that scrapers actually render.
//   • og.png            — 1200×630 social card (SVG → PNG; SVG isn't supported by FB/X/LinkedIn)
//   • apple-touch-icon  — 180×180 iOS home-screen icon
//   • favicon-32.png    — PNG fallback for surfaces that ignore SVG favicons
//   • logo-512.png      — slim brand lockup for schema.org `logo` (the raw logo.png is ~800 KB)
// Run: node scripts/assets.mjs
import sharp from "sharp";
import { readFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pub = join(__dirname, "..", "public");
const kb = (p) => (statSync(p).size / 1024).toFixed(0);

// 1 — social card: og.svg → og.png (1200×630)
const ogSvg = readFileSync(join(pub, "og.svg"));
const ogOut = join(pub, "og.png");
await sharp(ogSvg, { density: 192 })
  .resize(1200, 630)
  .png({ compressionLevel: 9 })
  .toFile(ogOut);
console.log(`og.png (${kb(ogOut)} KB)`);

// 2 + 3 — favicons from favicon.svg (flatten so iOS corners aren't black)
const favSvg = readFileSync(join(pub, "favicon.svg"));
const apple = join(pub, "apple-touch-icon.png");
await sharp(favSvg, { density: 384 })
  .resize(180, 180)
  .flatten({ background: "#1f3d2e" })
  .png({ compressionLevel: 9 })
  .toFile(apple);
console.log(`apple-touch-icon.png (${kb(apple)} KB)`);

const fav32 = join(pub, "favicon-32.png");
await sharp(favSvg, { density: 128 })
  .resize(32, 32)
  .png({ compressionLevel: 9 })
  .toFile(fav32);
console.log(`favicon-32.png (${kb(fav32)} KB)`);

// 4 — slim schema logo from the real lockup
const logoOut = join(pub, "logo-512.png");
await sharp(join(pub, "logo.png"))
  .resize({ width: 512 })
  .png({ compressionLevel: 9, palette: true })
  .toFile(logoOut);
console.log(`logo-512.png (${kb(logoOut)} KB)`);

console.log("done");
