import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { MapPin, Search, ArrowRight, Phone, CheckCircle, Building2 } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { FEATURED_CITIES, CITIES } from "@/lib/utahLocations";
import { SITE } from "@/lib/config";
import SEO from "@/components/SEO";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Cities() {
  const [search, setSearch] = useState("");
  const [showUnlistedForm, setShowUnlistedForm] = useState(false);

  const featuredFiltered = FEATURED_CITIES.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const allFiltered = CITIES.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => b.population - a.population);

  const nonFeaturedFiltered = allFiltered.filter((c) => !c.featured);

  // Determine if search term doesn't match any city at all
  const noResults = allFiltered.length === 0 && search.length > 0;

  return (
    <PageLayout>
      <SEO
        title="Merchant Services by Utah City | UBC Unlimited"
        description="UBC Unlimited provides merchant services, POS systems, and payment processing to businesses in cities throughout Utah. Find your city or request a consultation."
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
              <span className="text-[#c9a84c]">Every Utah City</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8">
              UBC Unlimited provides local payment processing support to businesses in cities throughout Utah. Find your city below, or let us know where you're located and we'll reach out.
            </p>
            {/* Search / finder */}
            <div className="max-w-md mx-auto relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShowUnlistedForm(false);
                }}
                placeholder="Search for your city..."
                className="w-full bg-white/8 border border-white/15 rounded-xl pl-10 pr-4 py-3.5 text-sm text-white placeholder-white/35 focus:outline-none focus:border-[#c9a84c]/60 transition-colors"
              />
            </div>
            {/* No results prompt */}
            {noResults && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 max-w-md mx-auto bg-[#c9a84c]/10 border border-[#c9a84c]/30 rounded-2xl p-5 text-left"
              >
                <p className="text-white/80 text-sm mb-3">
                  We didn't find <strong className="text-white">"{search}"</strong> in our featured cities list — but we service <strong className="text-white">all of Utah</strong>. Let us know your city and we'll reach out.
                </p>
                {!showUnlistedForm ? (
                  <button
                    onClick={() => setShowUnlistedForm(true)}
                    className="btn-gold text-sm py-2 px-5"
                  >
                    Request a Consultation for {search} <ArrowRight size={13} />
                  </button>
                ) : (
                  <UnlistedCityForm cityName={search} />
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Stats strip */}
      <div className="bg-[#c9a84c]/10 border-y border-[#c9a84c]/20">
        <div className="container py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { value: "20+", label: "Featured Utah Cities" },
              { value: "All 29", label: "Counties Covered" },
              { value: "1,000+", label: "Utah Businesses Served" },
              { value: `${SITE.yearsInBusiness}+`, label: "Years of Local Experience" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center gap-0.5">
                <div className="text-xl font-extrabold text-[#c9a84c]" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>{value}</div>
                <div className="text-white/50 text-xs">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured cities grid */}
      {!noResults && (search === "" || featuredFiltered.length > 0) && (
        <section className="bg-[#080808] py-16">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>
              {search ? "Matching Featured Cities" : "Utah's Most Populated Cities"}
            </h2>
            <p className="text-white/50 mb-8">
              These cities have dedicated service pages with local industry insights, tailored solutions, and city-specific information.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {(search ? featuredFiltered : FEATURED_CITIES).map((city, i) => (
                <motion.div
                  key={city.slug}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                >
                  <Link
                    href={`/cities/${city.slug}`}
                    className="group block bg-white/5 hover:bg-[#c9a84c]/8 border border-white/10 hover:border-[#c9a84c]/30 rounded-2xl p-5 transition-all h-full"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-9 h-9 rounded-xl bg-[#c9a84c]/15 flex items-center justify-center">
                        <MapPin size={16} className="text-[#c9a84c]" />
                      </div>
                      <span className="text-xs text-white/35 font-medium">{city.population.toLocaleString()}</span>
                    </div>
                    <h3 className="text-white font-bold text-base mb-1 group-hover:text-[#c9a84c] transition-colors">{city.name}</h3>
                    <p className="text-white/45 text-xs mb-3">{city.county.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())} County</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {city.keyIndustries.slice(0, 3).map((ind) => (
                        <span key={ind} className="text-[10px] text-white/50 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">{ind}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-[#c9a84c] text-xs font-semibold">
                      View city page <ArrowRight size={11} />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Non-featured cities */}
      {!noResults && nonFeaturedFiltered.length > 0 && (
        <section className="bg-[#111] py-12 border-t border-white/5">
          <div className="container">
            <h2 className="text-xl font-extrabold text-white mb-2" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>
              {search ? `More Results for "${search}"` : "More Utah Cities We Serve"}
            </h2>
            <p className="text-white/50 mb-6 text-sm">
              We service businesses in these cities too. Click any city to request a consultation, or call us directly.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {nonFeaturedFiltered.map((city) => (
                <Link
                  key={city.slug}
                  href={`/cities/${city.slug}`}
                  className="group flex items-center gap-2 bg-white/5 hover:bg-[#c9a84c]/10 border border-white/10 hover:border-[#c9a84c]/30 rounded-xl px-3 py-3 transition-all"
                >
                  <MapPin size={12} className="text-[#c9a84c] shrink-0" />
                  <div>
                    <div className="text-white/80 group-hover:text-white text-xs font-medium transition-colors leading-tight">{city.name}</div>
                    <div className="text-white/35 text-[10px]">{city.county.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())} Co.</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* "We serve all of Utah" CTA with inline form */}
      <section className="bg-[#080808] py-16 border-t border-white/5">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>
                Don't See Your City?<br />
                <span className="text-[#c9a84c]">We Service All of Utah.</span>
              </h2>
              <p className="text-white/60 mb-6 leading-relaxed">
                UBC Unlimited provides merchant services to businesses in every city and town across Utah — from the Wasatch Front to rural communities. If your city isn't featured, it just means we haven't built a dedicated page yet. Our service area is statewide.
              </p>
              <div className="space-y-3 mb-6">
                {[
                  "No travel fees — we come to you",
                  "Same competitive rates regardless of location",
                  "Local Utah team with statewide coverage",
                  "Remote setup available for rural businesses",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle size={15} className="text-[#c9a84c] mt-0.5 shrink-0" />
                    <span className="text-white/70 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <a href={SITE.phoneHref} className="btn-outline-white text-sm py-2.5 px-6 inline-flex">
                <Phone size={14} /> Call {SITE.phone}
              </a>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-white font-bold text-lg mb-1">Request a Consultation</h3>
              <p className="text-white/50 text-sm mb-5">Tell us about your business and we'll reach out with a tailored solution — no obligation.</p>
              <UnlistedCityForm cityName="" />
            </div>
          </div>
        </div>
      </section>

      {/* Browse by county */}
      <section className="bg-[#111] py-12 border-t border-white/5">
        <div className="container text-center">
          <p className="text-white/50 text-sm mb-4">Prefer to browse by county?</p>
          <Link href="/counties" className="btn-gold text-sm py-2.5 px-6 inline-flex">
            View All Utah Counties <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}

// ─── Unlisted city form ───────────────────────────────────────────────────────

function UnlistedCityForm({ cityName }: { cityName: string }) {
  const [form, setForm] = useState({ name: "", phone: "", businessType: "", city: cityName });
  const [submitted, setSubmitted] = useState(false);

  const submit = trpc.forms.submitHeroLead.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Request received! We'll reach out within one business hour.");
    },
    onError: () => {
      toast.error("Something went wrong. Please call us directly at " + SITE.phone);
    },
  });

  if (submitted) {
    return (
      <div className="text-center py-6">
        <CheckCircle size={32} className="text-[#c9a84c] mx-auto mb-3" />
        <div className="text-white font-bold text-base mb-1">Request Received!</div>
        <div className="text-white/55 text-sm">Our team will reach out within one business hour.</div>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit.mutate({
          name: form.name,
          phone: form.phone,
          businessType: (form.businessType || "Not specified") + (form.city ? ` — City: ${form.city}` : ""),
        });
      }}
      className="space-y-3"
    >
      <input
        type="text"
        required
        placeholder="Your Name"
        value={form.name}
        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/35 focus:outline-none focus:border-[#c9a84c]/60 transition-colors"
      />
      <input
        type="tel"
        required
        placeholder="Phone Number"
        value={form.phone}
        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
        className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/35 focus:outline-none focus:border-[#c9a84c]/60 transition-colors"
      />
      <input
        type="text"
        placeholder="Your City"
        value={form.city}
        onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
        className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/35 focus:outline-none focus:border-[#c9a84c]/60 transition-colors"
      />
      <input
        type="text"
        placeholder="Business Type (e.g. Restaurant, Retail)"
        value={form.businessType}
        onChange={(e) => setForm((f) => ({ ...f, businessType: e.target.value }))}
        className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/35 focus:outline-none focus:border-[#c9a84c]/60 transition-colors"
      />
      <button
        type="submit"
        disabled={submit.isPending}
        className="w-full bg-[#c9a84c] hover:bg-[#e2c97e] text-[#080808] font-bold py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {submit.isPending ? "Sending..." : <>Request a Consultation <ArrowRight size={14} /></>}
      </button>
    </form>
  );
}
