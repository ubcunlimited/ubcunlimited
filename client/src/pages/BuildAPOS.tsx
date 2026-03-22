import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import SkyTabConfigurator from "@/components/SkyTabConfigurator";
import SEO from "@/components/SEO";
import { CheckCircle, Monitor, Smartphone, Tv, Star, ArrowRight, Shield, Clock, Award, Zap } from "lucide-react";
import { Link } from "wouter";

const SKYTAB_HIGHLIGHTS = [
  { icon: Monitor, label: "Full Hardware Suite", desc: "Workstation, handheld, tablet, kiosk, KDS, and customer-facing display — all from one platform." },
  { icon: Shield, label: "Lifetime Warranty", desc: "Every piece of SkyTab hardware comes with a lifetime warranty. No annual replacement fees." },
  { icon: Zap, label: "$0 Upfront Hardware", desc: "Qualifying accounts receive SkyTab hardware at no upfront cost with a processing agreement." },
  { icon: Star, label: "Local Utah Support", desc: "A dedicated local rep — not a call center — handles your setup, training, and ongoing support." },
];

const SKYTAB_PRODUCTS = [
  {
    name: "SkyTab POS",
    subtitle: "14\" HD Workstation",
    desc: "The flagship SkyTab terminal — a sleek 14\" touchscreen workstation with built-in payment terminal, integrated customer-facing display, and offline mode.",
    icon: <Monitor size={32} className="text-[#c9a84c]" />,
    badge: "Most Popular",
    specs: ["14\" 1920×1080 HD display", "Built-in EMV/NFC terminal", "Integrated customer display", "Offline processing mode", "Lifetime hardware warranty"],
  },
  {
    name: "SkyTab Glass",
    subtitle: "8\" Tablet POS",
    desc: "A fully mobile 8\" tablet running the complete SkyTab software suite. Perfect for tableside ordering, counter service, or secondary stations.",
    icon: <Monitor size={32} className="text-[#c9a84c]" />,
    badge: "$29.99/mo",
    specs: ["8\" optimal screen size", "Full POS software suite", "Lightweight & portable", "Tableside ordering & payment", "Connects to all peripherals"],
  },
  {
    name: "SkyTab Air",
    subtitle: "Handheld POS Device",
    desc: "A purpose-built handheld POS with 4G + WiFi, all-day battery, and the full SkyTab feature set. Take orders and payments anywhere on the floor.",
    icon: <Smartphone size={32} className="text-[#c9a84c]" />,
    specs: ["4G + WiFi connectivity", "All-day battery life", "EMV, NFC & swipe", "Apple Pay & Google Pay", "Drop-resistant design"],
  },
  {
    name: "Kitchen Display System",
    subtitle: "16\" or 22\" Display",
    desc: "Connect front-of-house to back-of-house with a commercial-grade KDS. Available in 16\" and 22\" sizes with optional bump bar.",
    icon: <Tv size={32} className="text-[#c9a84c]" />,
    specs: ["16\" or 22\" touchscreen", "Routes POS & online orders", "Optional bump bar", "Tracks kitchen productivity", "Supports multiple stations"],
  },
];

export default function BuildAPOS() {
  return (
    <PageLayout>
      <SEO
        title="Build Your SkyTab POS System | UBC Unlimited"
        description="Configure your custom SkyTab POS system for your Utah business. Choose hardware, add-ons, and get a local quote — $0 upfront with qualifying accounts."
        canonical="/build-a-pos"
      />

      {/* ── Hero ── */}
      <section className="bg-[#080808] pt-16 pb-0 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#c9a84c]/5 via-transparent to-transparent pointer-events-none" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center pb-16">
            <div className="inline-flex items-center gap-2 bg-[#c9a84c]/15 border border-[#c9a84c]/30 rounded-full px-4 py-1.5 mb-5">
              <span className="text-[#c9a84c] text-xs font-bold uppercase tracking-widest">SkyTab POS Configurator</span>
            </div>
            <h1
              className="text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              Build Your Perfect{" "}
              <span className="text-[#c9a84c]">SkyTab POS System</span>
            </h1>
            <p className="text-white/60 text-lg mb-8 leading-relaxed">
              Select your business type, choose your hardware, and add the features you need. A local Utah SkyTab expert will reach out with a custom quote — no obligation, no pressure.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/50">
              <div className="flex items-center gap-1.5">
                <CheckCircle size={14} className="text-[#c9a84c]" />
                $0 upfront hardware (qualifying accounts)
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle size={14} className="text-[#c9a84c]" />
                Lifetime hardware warranty
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle size={14} className="text-[#c9a84c]" />
                Local Utah setup & support
              </div>
            </div>
          </div>
        </div>
        {/* Bottom gradient fade into configurator */}
        <div className="h-8 bg-gradient-to-b from-transparent to-[#0f0f0f]" />
      </section>

      {/* ── Configurator ── */}
      <section className="bg-[#0f0f0f] py-12">
        <div className="container">
          <SkyTabConfigurator compact={false} />
        </div>
      </section>

      {/* ── Product Lineup ── */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <div className="teal-divider mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-[#080808] mb-3" style={{ fontFamily: "Sora, sans-serif" }}>
              The Full SkyTab Hardware Lineup
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm">
              Every SkyTab device runs the same powerful software platform — so your entire operation stays in sync, from the workstation to the kitchen to the table.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SKYTAB_PRODUCTS.map((product) => (
              <div
                key={product.name}
                className="group relative bg-[#f8fafc] rounded-2xl border border-gray-100 p-6 hover:border-[#c9a84c]/40 hover:shadow-lg transition-all"
              >
                {product.badge && (
                  <div className="absolute top-4 right-4 bg-[#c9a84c] text-[#080808] text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {product.badge}
                  </div>
                )}
                <div className="mb-4">{product.icon}</div>
                <h3 className="font-bold text-[#080808] text-base mb-0.5" style={{ fontFamily: "Sora, sans-serif" }}>
                  {product.name}
                </h3>
                <p className="text-[#c9a84c] text-xs font-semibold mb-3">{product.subtitle}</p>
                <p className="text-gray-500 text-xs leading-relaxed mb-4">{product.desc}</p>
                <ul className="space-y-1.5">
                  {product.specs.map((spec) => (
                    <li key={spec} className="flex items-start gap-2 text-xs text-gray-600">
                      <CheckCircle size={12} className="text-[#c9a84c] mt-0.5 shrink-0" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why SkyTab via UBC ── */}
      <section className="py-16 bg-[#080808]">
        <div className="container">
          <div className="text-center mb-10">
            <div className="teal-divider mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: "Sora, sans-serif" }}>
              Why Get SkyTab Through UBC Unlimited?
            </h2>
            <p className="text-white/50 max-w-xl mx-auto text-sm">
              SkyTab is available through many resellers — but not all of them offer local Utah installation, training, and ongoing support.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SKYTAB_HIGHLIGHTS.map((item) => (
              <div key={item.label} className="bg-white/4 border border-white/8 rounded-2xl p-6">
                <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/20 flex items-center justify-center mb-4">
                  <item.icon size={20} className="text-[#c9a84c]" />
                </div>
                <h3 className="font-bold text-white text-sm mb-2" style={{ fontFamily: "Sora, sans-serif" }}>
                  {item.label}
                </h3>
                <p className="text-white/45 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-[#c9a84c]">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-[#080808] mb-4" style={{ fontFamily: "Sora, sans-serif" }}>
              Ready to See SkyTab in Action?
            </h2>
            <p className="text-[#080808]/70 mb-8 leading-relaxed">
              Use the configurator above to build your system, or call us directly. A local Utah SkyTab expert will walk you through the hardware, answer every question, and provide a transparent quote — no obligation.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href="tel:+18013096988" className="btn-dark inline-flex items-center gap-2">
                Call (801) 309-6988 <ArrowRight size={15} />
              </a>
              <Link href="/consultation" className="bg-white/20 hover:bg-white/30 text-[#080808] font-semibold px-5 py-2.5 rounded-lg transition-colors inline-flex items-center gap-2">
                Book a Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
