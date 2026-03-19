import { Link } from "wouter";
import { MapPin, ArrowRight, CheckCircle } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import SEO from "@/components/SEO";
import CTABanner from "@/components/sections/CTABanner";
import { UTAH_LOCATIONS } from "@/lib/locations";
import { SITE } from "@/lib/config";

// Group by county
const byCounty = UTAH_LOCATIONS.reduce<Record<string, typeof UTAH_LOCATIONS>>((acc, loc) => {
  if (!acc[loc.county]) acc[loc.county] = [];
  acc[loc.county].push(loc);
  return acc;
}, {});

const countyOrder = ["Salt Lake", "Utah", "Davis", "Weber", "Summit", "Wasatch"];

export default function Locations() {
  return (
    <PageLayout>
      <SEO
        title="Utah Merchant Services Locations — UBC Unlimited"
        description="UBC Unlimited serves businesses across Utah including Salt Lake City, Provo, Ogden, St. George, Logan, and all surrounding communities. Local payment processing experts."
        canonical="/locations"
      />
      {/* Hero */}
      <section className="bg-[#080808] py-16">
        <div className="container">
          <div className="max-w-2xl">
            <div className="stat-badge mb-4">Service Area</div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-5" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
              Proudly Serving Utah Businesses<br />
              <span className="gradient-text">Statewide</span>
            </h1>
            <p className="text-white/65 text-lg leading-relaxed mb-4">
              UBC Unlimited is happy to serve Utah businesses all across the state — not just those listed in our locations below. Whether you're in Salt Lake City, St. George, Cedar City, or anywhere in between, we will work with you.
            </p>
            <p className="text-white/50 text-base leading-relaxed mb-8">
              Our team is based along the Wasatch Front, but we provide remote setup, support, and consultation to businesses throughout all of Utah. If you're outside our listed areas, reach out — we'd love to help.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/consultation" className="btn-gold py-3 px-6">
                Book a Consultation <ArrowRight size={16} />
              </Link>
              <a href={SITE.phoneHref} className="btn-outline-white py-3 px-6">
                Call {SITE.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Local Matters */}
      <section className="py-12 bg-[#f7f3ec]">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "📍", title: "Local Support", desc: "When you call, you reach a Utah-based expert who knows your market — not a national call center." },
              { icon: "🤝", title: "Community Investment", desc: "We live and work in Utah. Your success is our success, and we're invested in the communities we serve." },
              { icon: "⚡", title: "Fast Response", desc: "Local presence means faster onboarding, faster support, and faster resolution when issues arise." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 border border-gray-100 text-center">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-[#080808] mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities by County */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-10">
            <div className="teal-divider mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-[#080808] mb-3" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
              Cities We Serve
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">
              UBC Unlimited provides on-site and remote merchant services support to businesses across these Utah communities.
            </p>
          </div>

          <div className="space-y-10">
            {countyOrder.filter(c => byCounty[c]).map((county) => (
              <div key={county}>
                <div className="flex items-center gap-3 mb-5">
                  <MapPin size={18} className="text-[#c9a84c]" />
                  <h3 className="text-xl font-bold text-[#080808]" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
                    {county} County
                  </h3>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {byCounty[county].map((loc) => (
                    <Link
                      key={loc.slug}
                      href={`/locations/${loc.slug}`}
                      className="group bg-[#f7f3ec] hover:bg-white border border-transparent hover:border-[#c9a84c]/20 rounded-xl p-5 transition-all hover:shadow-md"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-bold text-[#080808] group-hover:text-[#c9a84c] transition-colors">
                          {loc.city}, UT
                        </h4>
                        <ArrowRight size={15} className="text-gray-300 group-hover:text-[#c9a84c] transition-colors mt-0.5" />
                      </div>
                      <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">{loc.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {loc.industries.slice(0, 3).map((ind) => (
                          <span key={ind} className="text-[10px] bg-[#c9a84c]/8 text-[#c9a84c] px-2 py-0.5 rounded-full font-medium">{ind}</span>
                        ))}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Counties */}
      <section className="py-12 bg-[#080808]">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
              We Serve All of Utah
            </h2>
            <p className="text-white/60 text-base max-w-2xl mx-auto">
              Don't see your city listed? No problem. We are happy to work with businesses all across Utah — from the Wasatch Front to Southern Utah and everywhere in between. Remote consultation, setup, and support are available statewide.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {["Box Elder County", "Cache County", "Sanpete County", "Iron County", "Washington County", "Tooele County", "Juab County", "Millard County"].map((county) => (
              <div key={county} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
                <CheckCircle size={13} className="text-[#c9a84c]" />
                <span className="text-white/70 text-sm">{county}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/contact" className="btn-gold py-3 px-8">
              Check Your Area <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <CTABanner />
    </PageLayout>
  );
}
