/**
 * generate-llms-txt.mjs
 * Dynamically generates llms.txt following the official llmstxt.org specification.
 *
 * Format (in order):
 *   1. H1 — site/project name (required)
 *   2. Blockquote — short summary
 *   3. Free-text paragraphs — context & key differentiators
 *   4. H2-delimited file lists — [name](url): description
 *   5. Optional section — secondary links that can be skipped for shorter context
 *
 * Sources read:
 *   - client/src/lib/utahLocations.ts  → county & city names/slugs
 *   - client/src/lib/blogData.ts       → blog post slugs & titles
 *   - client/src/lib/config.ts         → solution & industry labels/hrefs/descs
 *
 * Run: node scripts/generate-llms-txt.mjs
 * Or:  pnpm llms-txt
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BASE_URL = "https://ubcunlimited.com";
const TODAY = new Date().toISOString().split("T")[0];

// ── 1. Parse utahLocations.ts ─────────────────────────────────────────────────
const locContent = fs.readFileSync(
  path.join(ROOT, "client/src/lib/utahLocations.ts"),
  "utf8"
);
const countySection = locContent.split("export const CITIES")[0];
const citySection = locContent.split("export const CITIES")[1];

// Extract county objects {name, slug}
const countyBlocks = [...countySection.matchAll(/\{[^}]+\}/g)];
const counties = countyBlocks
  .map((b) => {
    const slug = b[0].match(/slug:\s*["']([^"']+)/)?.[1];
    const name = b[0].match(/name:\s*["']([^"']+)/)?.[1];
    return slug && name ? { slug, name } : null;
  })
  .filter(Boolean);

// Extract city objects {name, slug, featured}
const cityBlocks = [...citySection.matchAll(/\{[^}]+\}/g)];
const cities = cityBlocks
  .map((b) => {
    const slug = b[0].match(/slug:\s*["']([^"']+)/)?.[1];
    const name = b[0].match(/name:\s*["']([^"']+)/)?.[1];
    const featured = /featured:\s*true/.test(b[0]);
    return slug && name ? { slug, name, featured } : null;
  })
  .filter(Boolean);

const featuredCities = cities.filter((c) => c.featured);

// ── 2. Parse blogData.ts ──────────────────────────────────────────────────────
const blogContent = fs.readFileSync(
  path.join(ROOT, "client/src/lib/blogData.ts"),
  "utf8"
);
const blogPosts = [];
const blogBlocks = blogContent.split(/\},\s*\{/);
for (const block of blogBlocks) {
  const slug = block.match(/slug:\s*["']([^"']+)/)?.[1];
  const title = block.match(/title:\s*["']([^"']+)/)?.[1];
  // Excerpts are double-quoted strings that may span multiple lines and contain apostrophes.
  // Match everything between the opening " and the closing " (which ends the line).
  const excerptRaw = block.match(/excerpt:\s*\n?\s*"([^"]+)"/s)?.[1];
  const excerpt = excerptRaw?.trim().replace(/\n\s*/g, " ").substring(0, 160);
  if (slug && title) blogPosts.push({ slug, title, excerpt: excerpt || "" });
}

// ── 3. Parse config.ts for solutions & industries ─────────────────────────────
const configContent = fs.readFileSync(
  path.join(ROOT, "client/src/lib/config.ts"),
  "utf8"
);

function parseNavItems(content, pathPrefix) {
  const items = [];
  const regex = /\{\s*label:\s*["']([^"']+)["'][^}]*href:\s*["']([^"']+)["'][^}]*desc:\s*["']([^"']+)["']/g;
  let m;
  while ((m = regex.exec(content)) !== null) {
    const [, label, href, desc] = m;
    if (href.startsWith(pathPrefix)) {
      items.push({ label, href, desc });
    }
  }
  return items;
}

const solutions = parseNavItems(configContent, "/solutions/");
const industries = parseNavItems(configContent, "/industries/");

// ── 4. Build llms.txt content ─────────────────────────────────────────────────
function link(label, path, desc) {
  const url = `${BASE_URL}${path}`;
  return desc ? `- [${label}](${url}): ${desc}` : `- [${label}](${url})`;
}

const lines = [];

// H1 — required
lines.push(`# UBC Unlimited — Utah Merchant Services`);
lines.push(``);

// Blockquote — short summary
lines.push(
  `> UBC Unlimited is a Utah-based merchant services company providing credit card processing, POS systems, ACH/eCheck, and payment solutions to businesses across all ${counties.length} Utah counties and all 50 states. The company offers local, dedicated support with competitive interchange-plus pricing, fast onboarding, and specialized solutions for both standard and high-risk industries. No long-term contracts on most solutions. Phone: (801) 462-0923.`
);
lines.push(``);

// Free-text context paragraphs
lines.push(
  `UBC Unlimited has 20+ years of merchant services experience. The team provides tailored payment processing solutions for every business type — from restaurants and retail to high-risk industries that standard processors decline. All pricing is transparent; free statement reviews are available to show businesses exactly where they can save.`
);
lines.push(``);
lines.push(
  `Key differentiators: local Utah-based dedicated rep, interchange-plus pricing, same-day to 14-day onboarding depending on solution, high-risk merchant account expertise, and SkyTab/Clover POS authorized reseller. Service area covers all ${cities.length} incorporated Utah cities and all ${counties.length} Utah counties.`
);
lines.push(``);
lines.push(`_Generated: ${TODAY}_`);
lines.push(``);

// ── Section: Core Pages ───────────────────────────────────────────────────────
lines.push(`## Core Pages`);
lines.push(``);
const corePages = [
  ["/", "Home", "Overview of services, hero consultation form, client testimonials, and service area"],
  ["/about", "About UBC Unlimited", "Company background, team, values, and why local expertise matters"],
  ["/contact", "Contact", "Contact form, phone (801) 462-0923, and email info@ubcunlimited.com"],
  ["/consultation", "Request a Consultation", "Free no-obligation consultation request form"],
  ["/statement-review", "Free Statement Review", "Submit current processing statement for a line-by-line savings analysis"],
  ["/quote", "Get a Quote", "Quick quote request form"],
  ["/faq", "FAQ", "Frequently asked questions about merchant services, pricing, and contracts"],
  ["/testimonials", "Client Testimonials", "Real client reviews and case studies"],
  ["/build-a-pos", "Build a POS System", "Interactive SkyTab POS configurator — select hardware, add-ons, and get a custom quote"],
  ["/news", "News & Updates", "Company news, product updates, and industry announcements"],
  ["/accessibility", "Accessibility Statement", "WCAG 2.1 accessibility commitment and contact for accommodations"],
];
for (const [path, label, desc] of corePages) {
  lines.push(link(label, path, desc));
}
lines.push(``);

// ── Section: Payment Solutions ────────────────────────────────────────────────
lines.push(`## Payment Solutions`);
lines.push(``);
lines.push(link("All Solutions", "/solutions", "Full overview of all payment processing solutions"));
for (const s of solutions) {
  lines.push(link(s.label, s.href, s.desc));
}
lines.push(``);

// ── Section: Industries Served ────────────────────────────────────────────────
lines.push(`## Industries Served`);
lines.push(``);
lines.push(link("All Industries", "/industries", "Full list of industries with tailored payment solutions"));
for (const ind of industries) {
  lines.push(link(ind.label, ind.href, ind.desc));
}
lines.push(``);

// ── Section: Blog & Resources ─────────────────────────────────────────────────
lines.push(`## Blog & Resources`);
lines.push(``);
lines.push(link("Blog Index", "/blog", "All articles on payment processing, POS systems, and merchant services"));
for (const post of blogPosts) {
  lines.push(link(post.title, `/blog/${post.slug}`, post.excerpt || undefined));
}
lines.push(``);

// ── Section: Utah Service Area ────────────────────────────────────────────────
lines.push(`## Utah Service Area`);
lines.push(``);
lines.push(link(`Utah Cities Index (${cities.length} cities)`, "/cities", `All ${cities.length} Utah cities served; search by city name`));
lines.push(link(`Utah Counties Index (${counties.length} counties)`, "/counties", `All ${counties.length} Utah counties served; interactive county map`));
lines.push(``);
// Featured cities
for (const city of featuredCities) {
  lines.push(link(city.name, `/cities/${city.slug}`, `Merchant services in ${city.name}, UT`));
}
lines.push(``);
// All counties
for (const county of counties) {
  lines.push(link(county.name, `/counties/${county.slug}`, `Merchant services across ${county.name}`));
}
lines.push(``);

// ── Section: Legal ────────────────────────────────────────────────────────────
lines.push(`## Legal`);
lines.push(``);
lines.push(link("Privacy Policy", "/legal/privacy-policy", "How UBC Unlimited collects, uses, and protects personal data"));
lines.push(link("Terms of Service", "/legal/terms-of-service", "Website terms and conditions of use"));
lines.push(link("Cookie Policy", "/legal/cookie-policy", "Cookie usage and consent management"));
lines.push(link("Disclaimer", "/legal/disclaimer", "Limitations of liability and informational disclaimers"));
lines.push(``);

// ── Section: Optional (skippable for shorter context) ────────────────────────
lines.push(`## Optional`);
lines.push(``);
lines.push(link("Sitemap", "/sitemap.xml", `Full XML sitemap with all indexed URLs`));
// All non-featured cities as optional bulk links
const nonFeaturedCities = cities.filter((c) => !c.featured);
for (const city of nonFeaturedCities) {
  lines.push(link(city.name, `/cities/${city.slug}`, `Merchant services in ${city.name}, UT`));
}
lines.push(``);

// ── 5. Write output ───────────────────────────────────────────────────────────
const output = lines.join("\n");
const outPath = path.join(ROOT, "client/public/llms.txt");
fs.writeFileSync(outPath, output, "utf8");

console.log(`✅ llms.txt written to ${outPath}`);
console.log(`   Core pages    : ${corePages.length}`);
console.log(`   Solutions     : ${solutions.length}`);
console.log(`   Industries    : ${industries.length}`);
console.log(`   Blog posts    : ${blogPosts.length}`);
console.log(`   Featured cities: ${featuredCities.length}`);
console.log(`   All counties  : ${counties.length}`);
console.log(`   Optional cities: ${nonFeaturedCities.length}`);
console.log(`   Total lines   : ${lines.length}`);
