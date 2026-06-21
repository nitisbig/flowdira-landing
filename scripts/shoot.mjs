// One-off: capture above-the-fold hero crops of the live work sites.
// Run: node scripts/shoot.mjs
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = join(__dirname, "..", "public", "work");
mkdirSync(out, { recursive: true });

const shots = [
  ["portfolio", "https://portfolio-site-three-coral.vercel.app/"],
  ["maintenance", "https://themaintenanceman.vercel.app/"],
  ["appointment", "https://appointment-system-vert-five.vercel.app/"],
  ["takeaway", "https://takeaway-weld.vercel.app/"],
  ["claude-guide", "https://claude-code-guide-eosin-delta.vercel.app/"],
  ["explorative", "https://explorative-giants.vercel.app/"],
  ["interstellar", "https://interstellar-phi-eosin.vercel.app/"],
];

// 16:10 hero crop, retina for crispness.
const width = 1440;
const height = 900;

const browser = await chromium.launch();
for (const [name, url] of shots) {
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: 2,
  });
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  } catch {
    // some animated pages never go fully idle — fall back to domcontentloaded
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  }
  // let fonts, hero animations and canvas settle
  await page.waitForTimeout(3500);
  const file = join(out, `${name}.png`);
  await page.screenshot({ path: file }); // viewport-only = above-the-fold
  console.log("captured", name);
  await page.close();
}
await browser.close();
console.log("done");
