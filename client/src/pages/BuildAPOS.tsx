import PageLayout from "@/components/layout/PageLayout";
import SkyTabPOSBuilder from "@/components/sections/SkyTabPOSBuilder";
import SEO from "@/components/SEO";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "wouter";

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
              Select your bundle, choose your hardware, and add the features you need. A local Utah SkyTab expert will reach out with a custom quote — no obligation, no pressure.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/70">
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
                Local Utah setup &amp; support
              </div>
            </div>
          </div>
        </div>
        <div className="h-8 bg-gradient-to-b from-transparent to-[#f7f3ec]" />
      </section>

      {/* ── Configurator ── */}
      <SkyTabPOSBuilder />

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
