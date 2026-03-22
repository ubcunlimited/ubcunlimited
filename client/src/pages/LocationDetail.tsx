import { useParams, Link } from "wouter";
import { MapPin, ArrowRight, CheckCircle, Phone, Star } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import CTABanner from "@/components/sections/CTABanner";
import FAQ from "@/components/sections/FAQ";
import { getLocationBySlug, UTAH_LOCATIONS } from "@/lib/locations";
import { SITE } from "@/lib/config";
import SEO from "@/components/SEO";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663396807781/BUvnwzJnwMZHoEGpybj36j/hero-main_d2cdb0e3.jpg";

const services = [
  { icon: "💳", title: "Credit Card Processing", desc: "Competitive rates with transparent pricing. No hidden fees, no surprises." },
  { icon: "🏦", title: "ACH / eCheck Processing", desc: "Accept bank transfers and electronic checks at a fraction of card processing costs." },
  { icon: "🖥️", title: "POS Systems", desc: "SkyTab, Clover, and more — tailored to your industry and workflow." },
  { icon: "🛒", title: "eCommerce Payments", desc: "Integrated online checkout solutions that work with your existing website." },
  { icon: "📱", title: "Mobile Processing", desc: "Accept payments anywhere with mobile readers and contactless solutions." },
  { icon: "📄", title: "Invoicing & Virtual Terminals", desc: "Send invoices and accept payments remotely without a physical terminal." },
];

export default function LocationDetail() {
  const params = useParams<{ slug: string }>();
  const location = getLocationBySlug(params.slug || "");

  if (!location) {
    return (
      <PageLayout>
        <div className="container py-20 text-center">
          <h1 className="text-3xl font-bold text-[#080808] mb-4">Location Not Found</h1>
          <p className="text-gray-500 mb-6">We couldn't find that location page.</p>
          <Link href="/locations" className="btn-teal py-3 px-6">View All Locations</Link>
        </div>
      </PageLayout>
    );
  }

  const nearbyLocations = UTAH_LOCATIONS.filter(
    (l) => l.county === location.county && l.slug !== location.slug
  ).slice(0, 4);

  const locationFaqs = [
    {
      question: `Does UBC Unlimited serve businesses in ${location.city}, Utah?`,
      answer: `Yes — UBC Unlimited provides full merchant services support to businesses throughout ${location.city} and ${location.county} County. We offer on-site consultations, local support, and fast onboarding for businesses of all sizes.`,
    },
    {
      question: `What payment solutions are available for ${location.city} businesses?`,
      answer: `We offer credit card processing, ACH/eCheck, POS systems (including SkyTab and Clover), eCommerce payments, mobile processing, virtual terminals, and invoicing — all tailored to your specific business type and volume.`,
    },
    {
      question: `How quickly can a ${location.city} business get set up?`,
      answer: `Depending on the solution, businesses in ${location.city} can be up and processing as fast as same day. We handle the setup, training, and onboarding so you can focus on running your business.`,
    },
    {
      question: `Do you offer consultations for ${location.city} businesses?`,
      answer: `Absolutely. We offer a no-obligation consultation for any business in ${location.city} or the surrounding ${location.county} County area. We'll review your current processing costs and recommend the best solution for your needs.`,
    },
  ];

  return (
    <PageLayout>
      <SEO
        title={`Merchant Services in ${location.city}, Utah | UBC Unlimited`}
        description={`UBC Unlimited provides credit card processing, POS systems, ACH payments, and merchant services to businesses in ${location.city}, ${location.county} County, Utah. Free consultation available.`}
        canonical={`/locations/${location.slug}`}
        schema={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "UBC Unlimited",
          "description": `Merchant services provider serving ${location.city}, Utah`,
          "url": `https://ubcunlimited.com/locations/${location.slug}`,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": location.city,
            "addressRegion": "UT",
            "addressCountry": "US"
          },
          "areaServed": {
            "@type": "City",
            "name": location.city
          }
        }}
      />
      {/* Hero */}
      <section className="relative py-20 bg-[#080808] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/90 to-[#080808]/60" />
        <div className="container relative z-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Link href="/locations" className="text-white/40 text-sm hover:text-white/70 transition-colors">Locations</Link>
              <span className="text-white/30">/</span>
              <span className="text-white/60 text-sm">{location.city}, UT</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={16} className="text-[#c9a84c]" />
              <span className="text-[#c9a84c] text-sm font-medium">{location.county} County, Utah</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
              Merchant Services in<br />
              <span className="gradient-text">{location.city}, Utah</span>
            </h1>
            <p className="text-white/65 text-lg leading-relaxed mb-8">
              UBC Unlimited provides local merchant services support to {location.city} businesses — credit card processing, POS systems, ACH payments, and more. {location.description}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/consultation" className="btn-gold py-3 px-6">
                Book a Consultation <ArrowRight size={16} />
              </Link>
              <a href={SITE.phoneHref} className="btn-outline-white py-3 px-6">
                <Phone size={15} /> {SITE.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <div className="bg-[#111111] border-y border-white/5 py-5">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-6 text-center">
            {[
              { v: SITE.yearsInBusiness, l: "Years in Business" },
              { v: "1000+", l: "Utah Businesses Served" },
              { v: "24–48hr", l: "Average Onboarding" },
              { v: "Local", l: "Utah-Based Support" },
            ].map((s) => (
              <div key={s.l} className="px-4">
                <div className="text-2xl font-extrabold text-[#c9a84c]" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>{s.v}</div>
                <div className="text-white/45 text-xs mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-10">
            <div className="teal-divider mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-[#080808] mb-3" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
              Payment Solutions for {location.city} Businesses
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">
              From restaurants and retail to medical offices and automotive shops — we have the right payment solution for every {location.city} business.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s) => (
              <div key={s.title} className="bg-[#f7f3ec] rounded-xl p-5 border border-gray-100 hover:border-[#c9a84c]/20 hover:shadow-md transition-all">
                <div className="text-2xl mb-3">{s.icon}</div>
                <h3 className="font-bold text-[#080808] mb-1.5">{s.title}</h3>
                <p className="text-gray-500 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-12 bg-[#f7f3ec]">
        <div className="container">
          <h2 className="text-2xl font-bold text-[#080808] mb-6 text-center" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
            Industries We Serve in {location.city}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {location.industries.map((ind) => (
              <div key={ind} className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 hover:border-[#c9a84c]/30 transition-colors">
                <CheckCircle size={14} className="text-[#c9a84c]" />
                <span className="text-[#080808] text-sm font-medium">{ind}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Local */}
      <section className="py-16 bg-[#080808]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="teal-divider mb-5" />
              <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
                Why {location.city} Businesses Choose UBC Unlimited
              </h2>
              <p className="text-white/60 mb-6 text-sm leading-relaxed">
                Unlike national processors who treat you like an account number, UBC Unlimited is a local Utah company that takes the time to understand your business before recommending anything.
              </p>
              <div className="space-y-3">
                {[
                  `Local {location.city} support — we're in your community`,
                  "Industry-specific solutions tailored to your business type",
                  "Transparent pricing with no hidden fees",
                  "Fast onboarding — as fast as same day, depending on the solution",
                  "Authorized SkyTab reseller serving all of Utah",
                  "Free statement review — see exactly where you can save",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle size={15} className="text-[#c9a84c] mt-0.5 shrink-0" />
                    <span className="text-white/70 text-sm">{item.replace("{location.city}", location.city)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card rounded-2xl p-8">
              <div className="flex items-center gap-1 mb-4">
                {[1,2,3,4,5].map(i => <Star key={i} size={16} className="text-[#c9a84c] fill-[#c9a84c]" />)}
              </div>
              <blockquote className="text-white/80 text-sm leading-relaxed mb-4 italic">
                "UBC Unlimited helped us switch processors and saved our restaurant over $400 a month. The setup was fast and {SITE.founder} was available every step of the way. I recommend them to every business owner I know."
              </blockquote>
              <div className="text-white/50 text-xs">— Local Utah Restaurant Owner</div>
              <div className="mt-6 pt-6 border-t border-white/10">
                <Link href="/consultation" className="btn-gold w-full justify-center py-3 text-sm">
                  Book a Consultation <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ
        title={`Merchant Services FAQ — ${location.city}, Utah`}
        items={locationFaqs}
      />

      {/* Nearby Cities */}
      {nearbyLocations.length > 0 && (
        <section className="py-12 bg-[#f7f3ec]">
          <div className="container">
            <h2 className="text-xl font-bold text-[#080808] mb-5" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
              Also Serving Nearby {location.county} County Cities
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {nearbyLocations.map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/locations/${loc.slug}`}
                  className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-3 hover:border-[#c9a84c]/30 hover:shadow-sm transition-all group"
                >
                  <MapPin size={14} className="text-[#c9a84c] shrink-0" />
                  <span className="text-[#080808] text-sm font-medium group-hover:text-[#c9a84c] transition-colors">{loc.city}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner
        title={`Ready to Get Started in ${location.city}?`}
        subtitle={`Book a no-obligation consultation with our local Utah team. We'll review your current setup and show you exactly how we can help your ${location.city} business save money and process payments more efficiently.`}
      />
    </PageLayout>
  );
}
