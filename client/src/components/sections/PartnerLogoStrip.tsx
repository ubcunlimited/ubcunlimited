// PartnerLogoStrip — UBC Unlimited
// Displays a grid or scrolling strip of partner/integration logos.
// Usage: <PartnerLogoStrip logos={[...]} scrolling title="Integrated with Trusted Providers" />

interface Logo {
  name: string;
  /** CDN URL for the logo image */
  src: string;
  /** Optional link */
  href?: string;
}

interface PartnerLogoStripProps {
  logos: Logo[];
  title?: string;
  subtitle?: string;
  /** Scrolling marquee mode vs. static grid */
  scrolling?: boolean;
  dark?: boolean;
}

export default function PartnerLogoStrip({
  logos,
  title = "Integrated with Trusted Providers",
  subtitle,
  scrolling = false,
  dark = false,
}: PartnerLogoStripProps) {
  const doubled = [...logos, ...logos];

  return (
    <section className={`py-12 ${dark ? "bg-[#111111]" : "bg-[#f8fafc]"}`}>
      <div className="container">
        {(title || subtitle) && (
          <div className="text-center mb-8">
            {title && (
              <p
                className={`text-xs font-semibold tracking-widest uppercase mb-2 ${
                  dark ? "text-[#c9a84c]" : "text-[#c9a84c]"
                }`}
              >
                {title}
              </p>
            )}
            {subtitle && (
              <p className={`text-sm ${dark ? "text-white/70" : "text-gray-600"}`}>{subtitle}</p>
            )}
          </div>
        )}

        {scrolling ? (
          <div className="overflow-hidden" aria-label={title}>
            <div
              className="flex items-center gap-8"
              style={{ animation: "logo-scroll 30s linear infinite" }}
            >
              {doubled.map((logo, i) => (
                <LogoItem key={`${logo.name}-${i}`} logo={logo} dark={dark} />
              ))}
            </div>
            <style>{`
              @keyframes logo-scroll {
                0%   { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
            `}</style>
          </div>
        ) : (
          <div
            className="flex flex-wrap items-center justify-center gap-6"
            aria-label={title}
          >
            {logos.map((logo) => (
              <LogoItem key={logo.name} logo={logo} dark={dark} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function LogoItem({ logo, dark }: { logo: { name: string; src: string; href?: string }; dark: boolean }) {
  const img = (
    <img
      src={logo.src}
      alt={`${logo.name} — payment integration partner`}
      className={`h-8 w-auto object-contain transition-opacity ${
        dark ? "opacity-50 hover:opacity-90 brightness-0 invert" : "opacity-60 hover:opacity-100"
      }`}
      loading="lazy"
    />
  );

  if (logo.href) {
    return (
      <a
        href={logo.href}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0"
        aria-label={logo.name}
      >
        {img}
      </a>
    );
  }

  return <div className="shrink-0">{img}</div>;
}
