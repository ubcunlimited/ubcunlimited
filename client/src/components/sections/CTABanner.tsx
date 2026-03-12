import { Link } from "wouter";
import { ArrowRight, Phone } from "lucide-react";
import { SITE } from "@/lib/config";

interface CTABannerProps {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  dark?: boolean;
}

export default function CTABanner({
  title = "Ready to Start Saving on Payment Processing?",
  subtitle = "Get a free, no-obligation statement review and see exactly how much you can save with UBC Unlimited.",
  primaryLabel = "Get a Free Quote",
  primaryHref = "/consultation",
  secondaryLabel = "Call Us Now",
  secondaryHref,
  dark = true,
}: CTABannerProps) {
  return (
    <section className={`py-16 ${dark ? "bg-gradient-to-br from-[#040c1c] via-[#0a1628] to-[#0f2040]" : "bg-gradient-to-br from-[#169fa8] to-[#0f6b72]"}`}>
      <div className="container text-center">
        <div className="max-w-2xl mx-auto">
          <div className="teal-divider mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
            {title}
          </h2>
          <p className="text-white/70 text-lg mb-8">{subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={primaryHref} className="btn-gold text-base py-3 px-7 justify-center">
              {primaryLabel} <ArrowRight size={18} />
            </Link>
            <a
              href={secondaryHref || SITE.phoneHref}
              className="btn-outline-white text-base py-3 px-7 justify-center"
            >
              <Phone size={16} />
              {secondaryLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
