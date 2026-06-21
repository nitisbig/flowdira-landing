// One-off: shrink the raw retina PNGs into web-sized WebP, then drop the PNGs.
// Run: node scripts/optimize.mjs
import sharp from "sharp";
import { readdirSync, unlinkSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dir = join(__dirname, "..", "public", "work");

const pngs = readdirSync(dir).filter((f) => f.endsWith(".png"));
for (const f of pngs) {
  const src = join(dir, f);
  const dest = join(dir, f.replace(/\.png$/, ".webp"));
  await sharp(src).resize({ width: 1280 }).webp({ quality: 80 }).toFile(dest);
  const kb = (statSync(dest).size / 1024).toFixed(0);
  unlinkSync(src);
  console.log(`${f} -> ${f.replace(/\.png$/, ".webp")} (${kb} KB)`);
}
console.log("done");
