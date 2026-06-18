# SEMrush Round 9 Findings

These findings were extracted from the uploaded screenshots on Jun 18, 2026.

| Screenshot | Issue category | Key pages shown |
|---|---|---|
| `13.38.25` | **225 pages have low text-to-HTML ratio** | `/`, `/about`, `/accessibility`, `/blog`, multiple blog posts |
| `13.38.35` | **Low text-to-HTML ratio** | `/cities`, `/cities/alpine`, `/cities/american-fork`, `/cities/beaver`, `/cities/bicknell`, `/cities/big-water` |
| `13.38.44` | **Low text-to-HTML ratio** | more city pages including `/cities/blanding`, `/cities/bluffdale`, `/cities/boulder`, `/cities/bountiful`, `/cities/brigham-city`, `/cities/clearfield`, `/cities/clinton` |
| `13.38.52` | **Low text-to-HTML ratio** | more city pages including `/cities/delta`, `/cities/draper`, `/cities/duchesne`, `/cities/eagle-mountain`, `/cities/farmington`, `/cities/fillmore` |
| `13.39.00` | **Low text-to-HTML ratio** | more city pages including `/cities/garden-city`, `/cities/grantsville`, `/cities/heber-city`, `/cities/holladay`, `/cities/hurricane`, `/cities/hyde-park` |
| `13.40.47` | **Low text-to-HTML ratio** | industry pages such as `/industries/credit-repair`, `/industries/cryptocurrency`, `/industries/ecommerce`, `/industries/firearms`, `/industries/medical`, `/industries/non-profit`, `/industries/nutraceuticals`, `/industries/online-gaming`, `/industries/online-pharmacy` |
| `13.40.57` | **Low text-to-HTML ratio** | solution pages including `/solutions/high-risk-processing`, `/solutions/invoicing`, `/solutions/mobile-processing`, `/solutions/pos-systems`, `/solutions/surcharge-cash-discount`, `/solutions/virtual-terminals`, plus `/statement-review` and `/testimonials` |
| `13.41.24` | **21 pages do not have an H1 heading** | county pages such as `/counties/beaver`, `/counties/box-elder`, `/counties/carbon`, `/counties/daggett`, `/counties/duchesne`, `/counties/emery`, `/counties/garfield`, `/counties/grand`, `/counties/iron`, `/counties/juab`, `/counties/kane`, `/counties/millard` |
| `13.41.32` | **21 pages do not have an H1 heading** | remaining county pages such as `/counties/morgan`, `/counties/piute`, `/counties/rich`, `/counties/san-juan`, `/counties/sanpete`, `/counties/sevier`, `/counties/uintah`, `/counties/wasatch`, `/counties/wayne` |
| `13.42.04` | **4 pages have too much text within the title tags** | `/blog/cash-discounting-surcharging-utah`, `/blog/high-risk-industries-dropped-by-stripe`, `/cities/cottonwood-heights`, `/cities/washington-terrace` |

## Initial hypotheses

1. **Low text-to-HTML ratio** is likely dominated by SPA delivery and JavaScript-heavy HTML, not only by weak page copy. The affected set spans home, blog, city, county, industry, solution, and testimonial pages, which suggests a template-level cause rather than isolated content issues.
2. **Missing H1** appears concentrated on county pages and likely comes from `CountyDetail.tsx` using styled headings without a literal `<h1>` element in one branch.
3. **Too much text in title tags** appears to be limited to 4 pages and is likely caused by overly long custom title strings and/or duplicate brand suffixes in older route templates.

Next step: inspect the relevant templates (`CountyDetail.tsx`, city/blog title generation, SEO component, and the HTML delivered to crawlers) before implementing fixes.
'}
