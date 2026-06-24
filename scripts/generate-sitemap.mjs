/**
 * generate-sitemap.mjs
 * Dynamically generates sitemap.xml from all app route sources.
 * Run: node scripts/generate-sitemap.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BASE_URL = "https://ubcunlimited.com";
const TODAY = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

// ── 1. Read utahLocations.ts to extract county & city slugs ──────────────────
const locationsContent = fs.readFileSync(
  path.join(ROOT, "client/src/lib/utahLocations.ts"),
  "utf8"
);
const countySection = locationsContent.split("export const CITIES")[0];
const citySection = locationsContent.split("export const CITIES")[1];
const countySlugs = [...countySection.matchAll(/slug:\s*["']([^"']+)["']/g)].map((m) => m[1]);
const citySlugs = [...citySection.matchAll(/slug:\s*["']([^"']+)["']/g)].map((m) => m[1]);

// ── 2. Read blogData.ts to extract blog slugs & lastmod dates ────────────────
const blogContent = fs.readFileSync(
  path.join(ROOT, "client/src/lib/blogData.ts"),
  "utf8"
);
// Extract slug + date pairs
const blogEntries = [];
const blogBlocks = blogContent.split(/\{\s*\n/);
for (const block of blogBlocks) {
  const slugMatch = block.match(/slug:\s*["']([^"']+)["']/);
  const dateMatch = block.match(/date:\s*["']([^"']+)["']/);
  if (slugMatch && dateMatch) {
    // Normalise date to YYYY-MM-DD
    const rawDate = dateMatch[1]; // e.g. "January 15, 2025" or "2025-01-15"
    let isoDate = TODAY;
    try {
      const parsed = new Date(rawDate);
      if (!isNaN(parsed.getTime())) {
        isoDate = parsed.toISOString().split("T")[0];
      }
    } catch (_) {}
    blogEntries.push({ slug: slugMatch[1], date: isoDate });
  }
}

// ── 3. Static pages with priorities & change frequencies ────────────────────
const staticPages = [
  // Core
  { url: "/",                       changefreq: "weekly",  priority: "1.0" },
  { url: "/about",                  changefreq: "monthly", priority: "0.8" },
  { url: "/contact",                changefreq: "monthly", priority: "0.8" },
  { url: "/consultation",           changefreq: "monthly", priority: "0.9" },
  { url: "/statement-review",       changefreq: "monthly", priority: "0.9" },
  { url: "/quote",                  changefreq: "monthly", priority: "0.8" },
  { url: "/faq",                    changefreq: "monthly", priority: "0.7" },
  { url: "/testimonials",           changefreq: "monthly", priority: "0.7" },
  { url: "/build-a-pos",            changefreq: "monthly", priority: "0.7" },
  { url: "/news",                   changefreq: "weekly",  priority: "0.6" },
  // Solutions hub
  { url: "/solutions",              changefreq: "monthly", priority: "0.9" },
  { url: "/solutions/credit-card-processing",  changefreq: "monthly", priority: "0.8" },
  { url: "/solutions/surcharge-cash-discount", changefreq: "monthly", priority: "0.8" },
  { url: "/solutions/pos-systems",             changefreq: "monthly", priority: "0.8" },
  { url: "/solutions/high-risk-processing",    changefreq: "monthly", priority: "0.8" },
  { url: "/solutions/ach-echeck-processing",   changefreq: "monthly", priority: "0.7" },
  { url: "/solutions/ecommerce-payments",      changefreq: "monthly", priority: "0.7" },
  { url: "/solutions/mobile-processing",       changefreq: "monthly", priority: "0.7" },
  { url: "/solutions/virtual-terminals",       changefreq: "monthly", priority: "0.7" },
  { url: "/solutions/invoicing",               changefreq: "monthly", priority: "0.7" },
  { url: "/solutions/gift-loyalty",            changefreq: "monthly", priority: "0.6" },
  { url: "/solutions/check-guarantee",         changefreq: "monthly", priority: "0.6" },
  { url: "/solutions/dual-pricing",            changefreq: "monthly", priority: "0.6" },
  // Industries hub
  { url: "/industries",                        changefreq: "monthly", priority: "0.9" },
  { url: "/industries/restaurants",            changefreq: "monthly", priority: "0.8" },
  { url: "/industries/retail",                 changefreq: "monthly", priority: "0.8" },
  { url: "/industries/medical",                changefreq: "monthly", priority: "0.8" },
  { url: "/industries/ecommerce",              changefreq: "monthly", priority: "0.8" },
  { url: "/industries/bars-nightclubs",        changefreq: "monthly", priority: "0.7" },
  { url: "/industries/automotive",             changefreq: "monthly", priority: "0.7" },
  { url: "/industries/professional-services",  changefreq: "monthly", priority: "0.7" },
  { url: "/industries/salons-spas",            changefreq: "monthly", priority: "0.7" },
  { url: "/industries/property-management",    changefreq: "monthly", priority: "0.7" },
  { url: "/industries/non-profit",             changefreq: "monthly", priority: "0.7" },
  { url: "/industries/travel",                 changefreq: "monthly", priority: "0.7" },
  { url: "/industries/firearms",               changefreq: "monthly", priority: "0.7" },
  { url: "/industries/cbd-hemp",               changefreq: "monthly", priority: "0.7" },
  { url: "/industries/nutraceuticals",         changefreq: "monthly", priority: "0.7" },
  { url: "/industries/vape-ecig",              changefreq: "monthly", priority: "0.7" },
  { url: "/industries/adult-entertainment",    changefreq: "monthly", priority: "0.6" },
  { url: "/industries/online-gaming",          changefreq: "monthly", priority: "0.6" },
  { url: "/industries/telemarketing",          changefreq: "monthly", priority: "0.6" },
  { url: "/industries/credit-repair",          changefreq: "monthly", priority: "0.6" },
  { url: "/industries/subscription-continuity",changefreq: "monthly", priority: "0.6" },
  { url: "/industries/online-pharmacy",        changefreq: "monthly", priority: "0.6" },
  { url: "/industries/cryptocurrency",         changefreq: "monthly", priority: "0.6" },
  // Location hubs
  { url: "/cities",                            changefreq: "monthly", priority: "0.8" },
  { url: "/counties",                          changefreq: "monthly", priority: "0.8" },
  // Blog hub
  { url: "/blog",                              changefreq: "weekly",  priority: "0.8" },
  // Legal / accessibility
  { url: "/accessibility",                     changefreq: "yearly",  priority: "0.3" },
  { url: "/legal/privacy-policy",              changefreq: "yearly",  priority: "0.3" },
  { url: "/legal/terms-of-service",            changefreq: "yearly",  priority: "0.3" },
  { url: "/legal/cookie-policy",               changefreq: "yearly",  priority: "0.3" },
  { url: "/legal/disclaimer",                  changefreq: "yearly",  priority: "0.3" },
];

// ── 4. Build XML ─────────────────────────────────────────────────────────────
function urlEntry({ loc, lastmod, changefreq, priority }) {
  return [
    "  <url>",
    `    <loc>${loc}</loc>`,
    lastmod   ? `    <lastmod>${lastmod}</lastmod>` : null,
    changefreq ? `    <changefreq>${changefreq}</changefreq>` : null,
    priority   ? `    <priority>${priority}</priority>` : null,
    "  </url>",
  ]
    .filter(Boolean)
    .join("\n");
}

const entries = [];

// Static pages
for (const p of staticPages) {
  entries.push(urlEntry({ loc: `${BASE_URL}${p.url}`, lastmod: TODAY, changefreq: p.changefreq, priority: p.priority }));
}

// Blog posts
for (const b of blogEntries) {
  entries.push(urlEntry({ loc: `${BASE_URL}/blog/${b.slug}`, lastmod: b.date, changefreq: "monthly", priority: "0.7" }));
}

// Counties
for (const slug of countySlugs) {
  entries.push(urlEntry({ loc: `${BASE_URL}/counties/${slug}`, lastmod: TODAY, changefreq: "monthly", priority: "0.6" }));
}

// Cities
for (const slug of citySlugs) {
  entries.push(urlEntry({ loc: `${BASE_URL}/cities/${slug}`, lastmod: TODAY, changefreq: "monthly", priority: "0.5" }));
}

const totalUrls = entries.length;

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!--
  UBC Unlimited — Merchant Services Utah
  Sitemap generated: ${TODAY}
  Total URLs: ${totalUrls}
  Base URL: ${BASE_URL}
  Generated by: scripts/generate-sitemap.mjs
-->
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
    http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

${entries.join("\n\n")}

</urlset>
`;

// ── 5. Write output ──────────────────────────────────────────────────────────
const outPath = path.join(ROOT, "client/public/sitemap.xml");
fs.writeFileSync(outPath, xml, "utf8");

console.log(`✅ Sitemap written to ${outPath}`);
console.log(`   Static pages : ${staticPages.length}`);
console.log(`   Blog posts   : ${blogEntries.length}`);
console.log(`   Counties     : ${countySlugs.length}`);
console.log(`   Cities       : ${citySlugs.length}`);
console.log(`   Total URLs   : ${totalUrls}`);
