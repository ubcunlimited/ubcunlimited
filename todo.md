
- [x] Remove Active Agents stat from AgentISO page
- [x] Replace all "free" references site-wide with "Request a Consultation" / "Get Started"
- [x] Move homepage hero form to right column; condense stats into left column
- [x] Rebuild Industries page with solution-driven, in-depth content per industry
- [x] Add depth to SolutionDetail template: stats bar, how-it-works steps, pull quote, process timeline, richer hero
- [x] Add depth to IndustryDetail template: stats bar, pain-point callouts, process steps, testimonial, richer hero with two-column layout
- [x] Home page hero: show contact form at all screen sizes (remove hidden lg:block, stack below headline on mobile)\n
- [x] Fix mobile: announcement bar hidden behind fixed nav — add correct top offset to hero section
- [x] Add "Call Now" tap-to-call button to mobile nav bar alongside hamburger menu
- [x] Add sticky bottom call bar on mobile (fixed, always visible, tap-to-call + Get Started CTA)
- [x] Animate mobile call bar: slide in after user scrolls past hero section
- [x] Build Utah county data (all 29 counties, featured top 8 by population)
- [x] Build CountyDetail page template with local SEO content
- [x] Build Counties index page with featured county cards + county finder/search
- [x] Build Utah city data (featured top ~20 cities + all cities list)
- [x] Build CityDetail page template with local SEO content
- [x] Build Cities index page with featured city cards + city finder + unlisted-city form
- [x] Add /counties and /cities routes to App.tsx
- [x] Add counties/cities links to nav and homepage service area section
- [x] Add clickable SVG map of Utah counties to the Counties service area page
- [x] Rebuild Utah county SVG map with accurate GeoJSON-derived paths from US Census TIGER data
- [x] Fix nested <a> inside <a> error in Home.tsx service area section (county cards have child Link elements)
- [x] Add unified search bar to Counties and Cities pages with live dropdown results
- [x] Build challenge-solution proof-of-concept page (Restaurants industry) and present to user for feedback
- [x] Roll out Option B paired card layout to all 21 IndustryDetail pages with expanded challenge-solution data
- [x] Roll out Option B paired card layout to all 11 SolutionDetail pages with expanded challenge-solution data
- [x] Add 4 more challenge-solution pairs to Restaurants, Retail, Auto Repair, and Medical in industryPairs.ts
- [x] Add 4-5 more challenge-solution pairs to Bars & Nightclubs, Salons & Spas, and Professional Services in industryPairs.ts
- [x] Expand remaining 14 industry pages to 8-10 challenge-solution pairs each in industryPairs.ts
- [x] Make solution tag badges on challenge-solution cards clickable links to corresponding solution pages
- [x] Rebuild Blog.tsx with two-column layout: sidebar with categories, archive by month/year, sort control (Newest/Oldest)
- [x] Make solution tag badges on challenge-solution cards clickable links to corresponding solution pages (IndustryDetail + SolutionDetail)
- [x] Audit and rewrite all site content for originality: blog excerpts, industry/solution page copy, challenge-solution pairs, homepage, county/city templates
- [x] Restore removed third-party statistics with proper inline citations and clickable source links; add Sources section to each blog post
- [x] Write new blog post: "How Interchange Rates Work" with cited industry data
- [x] Add email capture form to blog sidebar: name + email, stored in DB, owner notification on submission
- [x] Remove partner network disclosures from About page
- [x] Remove non-equipment brand names from solution/industry pages; keep only SkyTab, PAX, Clover (hardware/POS brands)
- [x] Create Privacy Policy page (/privacy-policy)
- [x] Create Terms of Service page (/terms-of-service)
- [x] Add acceptance checkbox with inline links to all lead capture and consultation forms
- [x] Add Privacy Policy and Terms of Service links to site footer
- [x] SEO audit and optimization: meta tags, schema markup, sitemap, robots.txt, heading structure, canonical URLs, internal linking, image alt text
- [x] Build testimonials page at /testimonials: hero + stat bar, featured result cards, pill filter tabs, dark card grid, CTA banner
- [x] Add testimonial submission form to Testimonials page with DB storage, admin review queue, approve/reject controls, and owner notifications
- [x] Replace Amber L. (Provo Salon & Spa) testimonial with JoAnn G. (Owner / 6 Salons) real testimonial; add truncated version with "Read full" link on homepage
- [x] Add Cory D. (Night Club & Bar Owner) real testimonial — full version on /testimonials page, truncated preview with "Read full" link on homepage
- [x] Add Dan C. (CFO, Medical Supply Company) real testimonial — full version on /testimonials, shortened homepage card preview
- [x] Add Jess W. (Accountant, Firearms Store, Wasatch Front) real testimonial — full version on /testimonials, shortened homepage card preview
- [x] Add real client testimonials as pull quotes on matching industry pages (JoAnn → Salons, Cory → Bars, Dan → Medical, Jess → Retail+Firearms)
- [x] Update homepage hero stat bar: changed to "All 50 States Served"
- [x] Remove "Book a Consultation" and "See Industries We Serve" buttons from homepage hero
- [x] Update hero badge text to "Local Expertise · Nationwide Reach"
- [x] Update top announcement bar to "Local Expertise · Nationwide Reach — 20+ Years in Business"
- [x] Update hero headline to "Your Local Merchant Services Expert" with matching subheading (Option 4)
- [x] Add asterisk to all "no contract" mentions site-wide and add footnote: certain platforms require a contract, disclosed prior to agreement
- [x] Add asterisk to all "no contract" mentions site-wide and add footnote: certain platforms require a contract, disclosed prior to agreement
- [x] Rename "Dual Pricing" / "Cash Discount" to "Cash Discount & Surcharging" site-wide
- [x] Remove Josh Cornia name references — replace with "UBC Unlimited Team" or similar
- [x] Update Fast Onboarding copy: businesses can be up and processing as fast as same day depending on solution and individual needs
- [x] Update Book a Consultation copy to "Schedule an in-depth, no-pressure conversation..." with full new text
- [x] Add pricing asterisk: rates reflect low-risk merchants; medium/high-risk may differ
- [x] Add month-to-month agreement note: certain solutions require an agreement
- [x] Rename "Cash Discount & Surcharging" and "Cash Discounting" to "Surcharging & Cash Discount Solutions" site-wide
- [x] Fix doubled "Surcharging & Cash Discount Solutions & Cash Discount" label — change to "Surcharge & Cash Discount Solutions" site-wide
- [x] Audit and update all URL slugs, nav labels, and page descriptions for clarity and brand consistency
- [x] Fix /solutions/credit-card-processing page: rename $0 Gateway Fees, update activation label, remove problem item 2, add flexible terms asterisk, fix surcharge redundancy in pricing model and FAQ, rename dual pricing FAQ question
- [x] Fix /solutions/ach-echeck-processing: update NSF stat, add rate comparison highlight, remove clearing time refs, update settlement timeframe to 3-5 days, replace Features item 5
- [x] Fix ACH page stat label: "NSF Risk w/ Verification" → "NSF Risk w/ Guarantee"
- [x] Fix ACH page cost comparison: $40–$60 → $20–$40
- [x] Add low-risk merchant disclaimer to "24–48h Avg. Activation" stat on credit card processing page
- [x] POS Systems page: change "24–48h Installation" stat to "14-Day Launch / From Approval" and add matching disclaimer
- [x] POS page: update "On-Site Installation" How It Works step to reference 14-day go-live target
- [x] POS page: update "Ready to go in 24–48 hours" impact line in challenge-solution pairs to 14-day language
- [x] POS page: update hero points to reflect 14-day go-live target from approval
- [x] POS page: update meta description to include 14-day launch timeline
- [x] POS page: add "Local install, training & support" back as fifth hero bullet
- [x] POS page: add "Lifetime hardware warranty included" as sixth hero bullet
- [x] Quick-stat widget: show "24–48h / Launch" on all non-POS solution pages (currently shows 14-Day)
- [x] Fraud FAQ: add 3D Secure availability to the "How do you handle fraud" answer
- [x] Solutions page: add blurb and bullets to Gift Cards & Loyalty card
- [x] Solutions page: add blurb and bullets to Surcharge & Cash Discount Solutions card
- [x] Solutions page: add blurb and bullets to High-Risk Processing card
- [x] Quick-stat widget: update non-POS sub-label to "Launch (Most Low Risk Businesses)"
- [x] Virtual Terminals page: replace "$0 Gateway Fees" stat with a more compelling differentiator
- [x] Virtual Terminals page: remove "Are there gateway fees for using a virtual terminal?" FAQ entry
- [x] Replace inaccurate clickable county map with accurate SVG Utah county map
- [x] Invoicing page: remove "Are there gateway fees for invoicing?" FAQ entry
- [x] Invoicing page: generate branded invoice mockup and add to hero section
- [x] Surcharge & Cash Discount page: update hero title to "Surcharge & Cash Discount Solutions"
- [x] Surcharge & Cash Discount page: fix program names and rephrase description to emphasize offsetting costs and maximizing customer savings
- [x] Surcharge & Cash Discount page: update description with user-provided exact copy
- [x] Surcharge & Cash Discount page: fix challenge #3 compliance text
- [x] Surcharge & Cash Discount page: rename feature #3 to "Dual Pricing"
- [x] Surcharge & Cash Discount page: update feature #6 label and body to reference Dual Pricing
- [x] Surcharge & Cash Discount page: update feature #7 description to reference "Dual Pricing & Cash Discount solutions"
- [x] Surcharge & Cash Discount page: update FAQ "What is the difference" question and answer with user-provided copy
- [x] Surcharge & Cash Discount page: rename Utah FAQ to "Is Cash Discount compliant in Utah?"
- [x] Surcharge & Cash Discount page: rewrite equipment FAQ to emphasize case-by-case compliance assessment
- [x] High-Risk Processing page: remove 24-72h approval time references and replace with accurate underwriting timeline messaging
- [x] About page: add asterisk and footnote to month-to-month agreements reference
- [x] Cities page: show all Utah cities in search results; non-featured cities link to consultation request page
- [x] Homepage: update service area stat to "134+ cities across all 29 counties"
- [x] CityDetail page: pre-fill city name in consultation form for non-featured cities
- [x] Build SkyTab POS Configurator component (multi-step: business type → core hardware → add-ons → summary/quote)
- [x] Create /build-a-pos page with SkyTab POS Configurator
- [x] Add SkyTab POS Configurator section to /solutions/pos-systems page
- [x] Add /build-a-pos route to App.tsx and nav links
- [x] Replace SkyTabConfigurator on /build-a-pos and /solutions/pos-systems with the existing configurator from /industries/bars-nightclubs
- [x] Remove Agent / ISO Program link from all nav menus and footer
- [x] Add noindex/nofollow meta tags to the Agent / ISO Program page
- [x] Add Disallow /agent-iso rule to robots.txt
- [x] Add AGENT_PORTAL_PASSWORD secret for agent portal auth
- [x] Build /agent-login page (private branded landing page)
- [x] Build AgentAuthGate component to protect /agent-iso
- [x] Add tRPC procedure to verify agent portal password server-side
- [x] Wire /agent-login and /agent-iso routes in App.tsx
- [x] Fix /news: Update SkyTab installation article to reflect 14-day lead time after approval
- [x] Fix /news: Replace Utah Retail Merchants Association partnership article with new content
- [x] Fix /news: Correct FTC typo "solutionss" -> "solutions"
- [x] Audit all blog posts and site pages for inaccurate SkyTab/POS installation timeline language and update to 14-day standard
- [x] Payment trends blog: rename surcharge section heading to "Cash Discounting & Surcharging Are Going Mainstream"
- [x] Payment trends blog: add paragraph on importance of proper implementation (risks, fines, confusion)
- [x] Lower CC fees blog: remove all Stax references
- [x] Lower CC fees blog: remove "Eliminate junk fees" section/bullet
- [x] how-interchange-rates-work blog: add official interchange rate schedule links for all card brands (Visa, Mastercard, Discover, Amex) opening in new tab
- [x] Add David N. PhD testimonial with short preview card + expandable full version
- [x] Site-wide: replace all "Surcharge & Cash Discount" variations with "Cash Discount & Dual Pricing"
- [x] high-risk-industries-dropped-by-stripe blog: replace "pre-dunning" with "pre-billing"
- [x] Wire all site forms to LeadConnector webhook (consultation, statement review, contact, SkyTab configurator quote)
- [x] Verify server CORS configuration allows frontend to reach tRPC API and webhook calls are server-side only
- [x] Counties page map: only highlight/list the most populated counties (not all 29)
- [x] Webhook: restructure payload so firstName/lastName/phone/email are top-level; all other vars go in "notes" JSON object
- [x] Cities page: show only top 10 highest-populated non-featured cities + search bar for all remaining cities
- [x] skytab-pos-review-utah page: remove interchange-plus pricing sentence
- [x] merchant-service-utah-county blog: add "But" to business base sentence and rephrase interchange-plus pricing line
- [x] P1 perf: compress and re-upload homepage images as WebP (team-consultation, hero-main, logo)
- [x] P1 perf: add fetchpriority="high" to hero LCP image
- [x] P1 perf: add explicit width/height to logo image
- [x] P1 perf: add preconnect hints for analytics domains
- [x] Compress and convert all images on About, Solutions, and Industry pages to WebP
- [x] Perf: defer third-party scripts (analytics, chat, CRM) to not block TBT
- [x] Perf: add responsive srcset to hero and key images for mobile scaling
- [x] Perf: CLS from cookie banner already handled (fixed bottom overlay, 1.2s delay, no layout shift)
- [x] Perf: configure Vite build with manual chunk splitting for vendor code
- [x] Perf: add Cache-Control headers for static assets via Express
- [x] Perf: React.lazy code splitting for all non-critical routes (reduces initial bundle)
- [x] Perf: responsive hero image srcset (480w/768w/1024w/1440w) with imagesrcset preload hint
- [x] Add floating ADA accessibility widget above chat bubble (font size, contrast, dyslexia font, reduce motion, focus highlights)
- [x] Fix BackToTop button position so it doesn't overlap the ADA accessibility widget
- [x] Reduce space between hero content and navigation bar
- [x] Further reduce gap between hero content and navigation bar
- [x] Identify and fix all current project errors (blank screen on live site caused by manual chunk splitting race condition — removed manualChunks, kept content-hash filenames)
- [x] Fix viewport meta: remove maximum-scale=1 (accessibility: allows user zoom)
- [x] Add preconnect for plausible.io with crossorigin attribute
- [x] Plausible analytics script already has defer — no change needed
- [x] Fix footer touch targets: add py-2 px-1 min-h-[44px] to Privacy Policy / Disclaimer links
- [x] Fix logo image: add srcset (160w/320w), correct width/height attrs, sizes=160px
- [x] Fix consultation image: tighten sizes attribute to match actual display dimensions
- [x] Make Google Fonts non-render-blocking via rel=preload + onload swap trick
- [x] Fix Google Fonts render-blocking: switched to media="print" onload="this.media='all'" pattern
- [x] Re-compress logo images at quality=60/70 (logo_320w: 17 KiB → 12 KiB, logo_160w: 6.5 KiB → 5 KiB)
- [x] Re-compress hero images at quality=72 (768w: 29 KiB → 20 KiB, 1440w: 54 KiB → 41 KiB)
- [x] Add 600w consultation image to srcset (browser picks 600w instead of 768w for 587px display)
- [x] Re-compress consultation 768w at quality=72 (41 KiB → 29 KiB)
- [x] Upgrade Vite build target to ES2020 to reduce legacy JS polyfills (~8 KiB savings)
- [x] Update all image srcsets and preload hints to reference new re-compressed CDN URLs
- [x] Perf: Convert hero background from img tag to CSS background-image (h1 headline is now LCP element)
- [x] Perf: Self-host Google Fonts via CDN — eliminates Google Fonts DNS lookup + render-blocking CSS chain
- [x] Perf: Old logo src fallback already using re-compressed versions; stale cache will clear on next publish
- [x] Perf: Removed unused HERO_SRCSET, ABSTRACT_IMG, ABSTRACT_SRCSET constants from Home.tsx bundle
- [x] Increase logo height to h-24 in Header (nav bar adjusted to h-28, PageLayout pt updated to 160px)
- [x] Replace logo with new horizontallogo1.png (WebP srcset 240w/480w/759w, CDN upload)
- [x] Update logo to new version (v2) and set height to h-20 desktop / h-12 scrolled
- [x] Update footer logo to match new horizontal header logo (h-12, max-width 280px, same v2 srcset)
- [x] Add new horizontal logo to top of mobile menu drawer (h-10, centered, with gold divider below)
- [x] Resize mobile menu logo to h-6 / 140px max-width, left-aligned with nav links
- [x] Use horizontallogo2.png for mobile menu drawer logo (h-8, 190px max-width)
- [x] Use circular logo for mobile menu drawer instead of horizontal (h-10 w-10 square)
- [x] Reduce horizontal logo on mobile header to h-2 (lg:h-20 desktop unchanged)
- [x] Change mobile header logo to horizontallogo2 at h-6 (desktop still uses full logo_v2 at h-20/h-12)
- [x] Adjust mobile header logo from h-6 to h-8
- [x] Revert mobile header logo back to h-6
- [x] Set desktop header logo to horizontallogo1 at h-20 (h-12 scrolled, max-width 380px)
- [x] Reduce mobile header logo (horizontallogo2) to 1/3 size: h-6 (24px) → h-2 (8px), max-width ~63px

## Mobile Optimization Pass
- [x] Home: hero section — reduce py on mobile, ensure form stacks below headline properly
- [x] Home: hero bottom phone strip — stack vertically on small screens
- [x] Home: solutions grid — already grid-cols-2, reduce card padding on mobile
- [x] Home: "Why Choose Us" — floating badge overflows on mobile, fix positioning
- [x] Home: how-it-works — single column on mobile with better spacing
- [x] Home: blog preview — single column on mobile (already grid-cols-1 md:grid-cols-3)
- [x] Home: service area cards — full width on mobile (already grid md:grid-cols-2)
- [x] SolutionDetail: hero — reduce py-20 to py-10 on mobile, fix h1 text-4xl on mobile
- [x] SolutionDetail: features grid — ensure single column on mobile
- [x] IndustryDetail: hero — reduce padding on mobile, fix h1 text-4xl on mobile
- [x] IndustryDetail: challenges/solutions — already stacks on mobile via border-b
- [x] Footer: CTA strip buttons — already flex-col sm:flex-row, verify on mobile
- [x] CTABanner: subtitle text-lg — reduce to text-base on mobile
- [x] PricingTransparency: comparison table — ensure overflow-x-auto works on mobile
- [x] StatementReview: form grid-cols-2 — stack to single column on mobile
- [x] Global: section vertical padding — reduce py-16/py-20 to py-10/py-12 on mobile throughout
- [x] Global: h1/h2 font sizes — ensure proper scaling on mobile

## Mobile Testimonial Fix
- [x] Fix testimonial cards being clipped/cut off at top of mobile viewport (overflow-hidden on parent)
- [x] Add bottom padding to testimonial section to prevent sticky bar overlap on last card
- [x] Ensure testimonial grid has no overflow:hidden that clips card tops

## Floating Widget Launcher
- [x] Build FloatingLauncher component: single chat bubble icon that expands to show chat, ADA widget, and back-to-top actions
- [x] Remove standalone BackToTop, AccessibilityWidget trigger button, and LiveChat trigger from their individual components
- [x] Wire FloatingLauncher into App.tsx, remove old individual floating components

## FloatingLauncher Fixes
- [x] Fix fan-out buttons stacking on top of each other — use proper bottom offset per button instead of mb- hack
- [x] Assign distinct colors: Chat=indigo, Accessibility=sky-blue, BackToTop=emerald-green
- [x] Remove rogue hidden arrow/minimized chat pill that appears while scrolling
- [x] Fix all spacing so buttons are clearly separated and don't overlap (60px STEP between each)

## FloatingLauncher Color Update
- [x] Chat button: dark charcoal (#1a1a1a) with gold border/icon to match site palette
- [x] ADA button: ISA handicap blue (#0057B8)
- [x] Back to Top button: dark charcoal (#1a1a1a) with gold icon to match site palette

## Sticky Scroll CTA Fix
- [x] Removed duplicate sticky mobile CTA bar from Home.tsx — MobileCallBar in PageLayout already handles this globally

## Mobile Header & Launcher Cleanup
- [x] Hide "Call Now" button in mobile header (keep on desktop)
- [x] Hide FloatingLauncher widget bubble on mobile (show only on desktop)

## Comprehensive Accessibility Panel
- [x] Vision: font size increase/decrease (3 levels), line height adjustment
- [x] Vision: high contrast mode (dark/light/yellow-black)
- [x] Vision: grayscale mode, invert colors mode
- [x] Vision: highlight links, highlight headings
- [x] Motor: large cursor mode, keyboard navigation focus indicator
- [x] Cognitive: reading guide (horizontal line follows cursor), dyslexia-friendly font (Lexend)
- [x] Cognitive: reduce animations/motion (prefers-reduced-motion override)
- [x] Cognitive: reading mask (dim everything except hovered paragraph)
- [x] Color: color blind modes (protanopia, deuteranopia, tritanopia SVG filters)
- [x] Persist all settings to localStorage, apply via injected <style> tag
- [x] Add reset all button (appears only when settings are modified)

## Crash Fix
- [x] Fix React runtime crash: confirmed old deployed version had AccessibilityWidget still in App.tsx; latest code is clean with only FloatingLauncher — publish latest checkpoint to fix

## Accessibility Enhancements
- [x] Add Alt+A keyboard shortcut to FloatingLauncher to open accessibility panel
- [x] Updated /accessibility statement page with built-in tools section and Alt+A reference
- [x] /accessibility already linked from footer (existing)
- [x] /accessibility route already registered in App.tsx (existing)

## Cookie Banner Enhancement
- [x] Add "Accessibility" button to cookie banner that opens the accessibility panel (dispatches ubc:open-accessibility event, works on both mobile and desktop)

## Blog Content Edit
- [x] Remove liquor law line from bar/restaurant blog post

## Dual Pricing Blog Updates
- [x] Update dual pricing blog post to reflect legal in all 50 states
- [x] Fix comparison matrix: first 3 dual pricing items now match cash discount (Legal=Yes, Debit=No, Registration=No)

## Mobile Payments Blog Updates
- [x] Emphasize Square's lack of real 1-on-1 personal service in mobile payments blog post
- [x] Add section on surcharging and cash discounting setup, pricing, and compliance in mobile payments blog post

## Header Scroll Shrink
- [x] Header shrinks smoothly on scroll on every page (height, logo size, padding all reduce)

## Mobile Header Logo Overlap Fix
- [x] Fix mobile logo overflowing header and overlapping the announcement top bar

## Mobile Blog: Terminology & Surcharging Compliance Update
- [x] Fix intro sentence: replace "surcharging and cash discounting" with "dual pricing and cash discounting"
- [x] Update section heading to: "Cash Discounting and Dual Pricing Or Surcharging Solutions for Mobile Business"
- [x] Add surcharging compliance blurb explaining compliant rules/requirements

## Mobile Blog: Surcharging Blurb Corrections
- [x] Update prohibited states to: California, Connecticut, Maine, and Massachusetts
- [x] Add note that some states regulate the 3% cap to a lower rate

## Mobile Blog: Remove Surcharging Section, Add Dual Pricing Section
- [x] Remove "How Surcharging Works" subsection from mobile payments blog
- [x] Add "How Dual Pricing Works" section with full description and info

## Adult Entertainment Industry Page
- [x] Add adult entertainment to high-risk overview on Industries page
- [x] Create dedicated /industries/adult-entertainment page
- [x] Wire up route in App.tsx

## High-Risk Industry Page Updates
- [x] Add Firearms to high-risk grid (highRisk: true) and move near top of NAV_INDUSTRIES
- [x] Add 5-7 business day approval language to all high-risk industry page descriptions
- [x] Remove all specific business count references from all industry pages (use experience language instead)
- [x] Replace 'worked with hundreds of Utah [industry] businesses' with experience-based language on all industry pages
- [x] Replace squirt gun emoji with proper SVG firearm icon on all industry pages
- [x] Switch Firearms icon from custom SVG back to 🎯 target emoji in all locations
- [x] Rewrite local support messaging to remove after-hours availability implication
- [x] Replace 'Competitive interchange-plus pricing' with 'Pricing tailored for your business' on Industries page
- [x] Replace Vagaro with Mangomint in booking software integration line on Industries page
- [x] Remove POS reference from Firearms industry tagline
- [x] Remove interchange-plus pricing references from all high-risk industry pages
- [x] Replace Firearms In-Store POS card with In-Store Payment Terminals on Industries page
- [x] Remove In-Store POS card from Vape/E-Cig industry section

## Business Count Language Cleanup (Round 2)
- [x] Replace "hundreds of Utah businesses" in About.tsx body paragraph
- [x] Replace "Join hundreds of Utah businesses" in About.tsx CTA banner
- [x] Replace "hundreds of Utah restaurants" in blogData.ts excerpt
- [x] Replace "hundreds of Utah restaurants" in BlogPost.tsx restaurant POS intro
- [x] Remove FFL compliance/age verification challenge-solution pair from Firearms industry page
- [x] Replace 24-48h activation stat with 5-7 Days on all high-risk industry pages (CBD, Firearms, etc.)
- [x] Replace all 24-48h activation/approval references on all high-risk industry pages with 5-7 business day language (non-guaranteed)
- [x] Remove age verification challenge-solution pair from Vape/E-Cig industry page
- [x] Remove loyalty program pair from Vape/E-Cig industry page
- [x] Remove vape FAQ entry about in-store POS and age verification
- [x] Install Google Analytics gtag G-MBY1WMZHL2 in index.html
- [x] Generate comprehensive sitemap.xml with all current routes and correct lastmod dates
- [x] Update robots.txt to use www canonical domain for sitemap URL
- [x] Create branded OG image matching site dark/gold aesthetic and update meta tags
- [x] Create OG meta card with actual UBC logo on dark branded background
- [x] Install Meta Pixel (ID: 1304934438209527) in index.html
- [x] Add fbq('track', 'Lead') Meta Pixel event on successful consultation form submission
- [x] Add fbq('track', 'Contact') Meta Pixel event on phone number link clicks
- [x] Consolidate all @ubcunlimited.com emails to info@ubcunlimited.com
- [x] Add Google reCAPTCHA v3 to all forms and CTAs with server-side verification
- [x] Create /recaptcha-docs page detailing full reCAPTCHA v3 implementation
- [x] Password-protect /recaptcha-docs page with a dedicated server-side password
- [x] Move reCAPTCHA badge to bottom-left
- [x] Hide reCAPTCHA badge on non-production domains
- [x] Reduce reCAPTCHA badge to half size
- [x] Fix reCAPTCHA slide-out badge: replaced native .grecaptcha-badge (hidden via CSS) with custom RecaptchaBadge component that collapses to tab-only by default and expands on hover/focus
- [x] Accessibility panel: make options exclusive (radio-style) — selecting one closes/deactivates all others, no toggle-off on same option
- [x] Fix ADA accessibility button visibility on mobile/responsive viewports

## Mobile Accessibility UX Improvements
- [x] Add first-visit tooltip label on mobile accessibility button (shows "Accessibility" for 2s on first visit)
- [ ] Add max-height: 80vh + overflow-y: auto to AccessibilityPanel for small screen scroll support
- [x] Add first-visit tooltip label on mobile accessibility button
- [x] Add max-height 80vh + overflow-y auto to AccessibilityPanel for small screens (already implemented)
- [x] Add subtle first-load animation to accessibility icon button (desktop + mobile)
- [x] Add keyboard focus ring to mobile accessibility button (:focus-visible)
