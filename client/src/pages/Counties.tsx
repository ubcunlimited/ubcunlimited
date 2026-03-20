import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { MapPin, Search, ArrowRight, Phone, Users, Building2, ChevronRight } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { FEATURED_COUNTIES, COUNTIES } from "@/lib/utahLocations";
import { SITE } from "@/lib/config";
import SEO from "@/components/SEO";

export default function Counties() {
  const [search, setSearch] = useState("");

  const filtered = COUNTIES.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => b.population - a.population);

  const nonFeatured = filtered.filter((c) => !c.featured);
  const featuredFiltered = filtered.filter((c) => c.featured);

  return (
    <PageLayout>
      <SEO
        title="Merchant Services by Utah County | UBC Unlimited"
        description="UBC Unlimited provides merchant services, POS systems, and payment processing to businesses in every Utah county. Find your county and see how we can help your business save."
      />

      {/* Hero */}
      <section className="relative bg-[#080808] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#c9a84c]/8 via-transparent to-transparent" />
        <div className="container relative z-10 py-16 md:py-20 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#c9a84c] text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-5">
              <MapPin size={12} /> Serving All of Utah
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>
              Merchant Services Across<br />
              <span className="text-[#c9a84c]">Every Utah County</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8">
              UBC Unlimited provides local payment processing support to businesses in all 29 Utah counties. Find your county below to learn how we can reduce your processing costs and improve your payment experience.
            </p>
            {/* Search / finder */}
            <div className="max-w-md mx-auto relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for your county..."
                className="w-full bg-white/8 border border-white/15 rounded-xl pl-10 pr-4 py-3.5 text-sm text-white placeholder-white/35 focus:outline-none focus:border-[#c9a84c]/60 transition-colors"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats strip */}
      <div className="bg-[#c9a84c]/10 border-y border-[#c9a84c]/20">
        <div className="container py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { value: "29", label: "Utah Counties Served" },
              { value: "1,000+", label: "Utah Businesses" },
              { value: `${SITE.yearsInBusiness}+`, label: "Years of Local Experience" },
              { value: "24–48 hrs", label: "Typical Setup Time" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center gap-0.5">
                <div className="text-xl font-extrabold text-[#c9a84c]" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>{value}</div>
                <div className="text-white/50 text-xs">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured counties */}
      {(search === "" || featuredFiltered.length > 0) && (
        <section className="bg-[#080808] py-16">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>
              {search ? "Matching Featured Counties" : "Utah's Most Populated Counties"}
            </h2>
            <p className="text-white/50 mb-8">
              These counties have dedicated service pages with local industry insights, tailored solutions, and county-specific information.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {(search ? featuredFiltered : FEATURED_COUNTIES).map((county, i) => (
                <motion.div
                  key={county.slug}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <Link
                    href={`/counties/${county.slug}`}
                    className="group block bg-white/5 hover:bg-[#c9a84c]/8 border border-white/10 hover:border-[#c9a84c]/30 rounded-2xl p-5 transition-all h-full"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-9 h-9 rounded-xl bg-[#c9a84c]/15 flex items-center justify-center">
                        <MapPin size={16} className="text-[#c9a84c]" />
                      </div>
                      <span className="text-xs text-white/35 font-medium">{county.population.toLocaleString()} pop.</span>
                    </div>
                    <h3 className="text-white font-bold text-base mb-1 group-hover:text-[#c9a84c] transition-colors">{county.name}</h3>
                    <p className="text-white/45 text-xs mb-3">County seat: {county.seat}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {county.keyIndustries.slice(0, 3).map((ind) => (
                        <span key={ind} className="text-[10px] text-white/50 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">{ind}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-[#c9a84c] text-xs font-semibold">
                      View county page <ArrowRight size={11} />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All counties finder */}
      <section className="bg-[#111] py-16 border-t border-white/5">
        <div className="container">
          <h2 className="text-2xl font-extrabold text-white mb-2" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>
            {search ? `Search Results for "${search}"` : "All 29 Utah Counties"}
          </h2>
          <p className="text-white/50 mb-8 text-sm">
            {search
              ? `Showing ${filtered.length} ${filtered.length === 1 ? "county" : "counties"} matching your search.`
              : "UBC Unlimited serves businesses in every Utah county. Click any county to learn more or contact us directly."}
          </p>

          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-white/40 text-lg mb-2">No counties found for "{search}"</div>
              <p className="text-white/30 text-sm mb-6">We serve all of Utah — contact us directly and we'll help your business regardless of location.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/consultation" className="btn-gold text-sm py-2.5 px-6">
                  Request a Consultation <ArrowRight size={14} />
                </Link>
                <a href={SITE.phoneHref} className="btn-outline-white text-sm py-2.5 px-6">
                  <Phone size={13} /> {SITE.phone}
                </a>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {filtered.map((county) => (
                <Link
                  key={county.slug}
                  href={`/counties/${county.slug}`}
                  className="group flex items-center gap-2 bg-white/5 hover:bg-[#c9a84c]/10 border border-white/10 hover:border-[#c9a84c]/30 rounded-xl px-3 py-3 transition-all"
                >
                  <MapPin size={12} className="text-[#c9a84c] shrink-0" />
                  <div>
                    <div className="text-white/80 group-hover:text-white text-xs font-medium transition-colors leading-tight">{county.name}</div>
                    <div className="text-white/35 text-[10px]">{county.population.toLocaleString()}</div>
                  </div>
                  {county.featured && (
                    <ChevronRight size={11} className="text-[#c9a84c] ml-auto shrink-0" />
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#c9a84c] py-14">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#080808] mb-3" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>
            Don't See Your County Listed?
          </h2>
          <p className="text-[#080808]/70 mb-6 max-w-xl mx-auto">
            We serve businesses throughout all of Utah. Contact us directly and our local team will reach out within one business hour.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/consultation" className="bg-[#080808] text-white font-bold py-3 px-8 rounded-xl hover:bg-[#111] transition-colors inline-flex items-center gap-2">
              Request a Consultation <ArrowRight size={16} />
            </Link>
            <a href={SITE.phoneHref} className="bg-white/20 hover:bg-white/30 text-[#080808] font-bold py-3 px-8 rounded-xl transition-colors inline-flex items-center gap-2">
              <Phone size={15} /> {SITE.phone}
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
