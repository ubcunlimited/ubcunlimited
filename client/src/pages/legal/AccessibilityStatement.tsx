// ADA Accessibility Statement — UBC Unlimited
// Design: deep navy hero / white content / Sora headings / copper accent
import PageLayout from "@/components/layout/PageLayout";
import SEO from "@/components/SEO";
import { Link } from "wouter";

export default function AccessibilityStatement() {
  return (
    <PageLayout>
      <SEO
        title="ADA Accessibility Statement | UBC Unlimited"
        description="UBC Unlimited is committed to digital accessibility for people with disabilities. Learn about our WCAG 2.1 conformance efforts, known limitations, and how to request accommodations."
        canonical="/accessibility"
      />

      {/* Hero */}
      <section className="bg-[#080808] py-14">
        <div className="container">
          <p className="text-[#c9a84c] text-xs font-semibold tracking-widest uppercase mb-3">Legal</p>
          <h1
            className="text-3xl md:text-4xl font-extrabold text-white mb-2 leading-tight"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            Accessibility Statement
          </h1>
          <p className="text-white/50 text-sm">Last updated: March 19, 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white">
        <div className="container max-w-3xl">
          <div className="prose-legal space-y-8 text-gray-600 text-sm leading-relaxed">

            {/* Commitment */}
            <div>
              <h2
                className="text-lg font-bold text-[#080808] mb-3"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                1. Our Commitment to Accessibility
              </h2>
              <p>
                UBC Unlimited is committed to ensuring that our website,{" "}
                <a
                  href="https://www.ubcunlimited.com"
                  className="text-[#c9a84c] hover:underline"
                >
                  www.ubcunlimited.com
                </a>
                , is accessible to all users, including individuals with disabilities. We
                believe that every person — regardless of ability — has the right to access
                information about merchant services, payment processing, and the resources we
                provide to Utah businesses.
              </p>
              <p className="mt-3">
                We are actively working to increase the accessibility and usability of our
                website in conformance with the Americans with Disabilities Act (ADA), Section
                508 of the Rehabilitation Act, and the Web Content Accessibility Guidelines
                (WCAG) 2.1, Level AA, published by the World Wide Web Consortium (W3C).
              </p>
            </div>

            {/* Standards */}
            <div>
              <h2
                className="text-lg font-bold text-[#080808] mb-3"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                2. Applicable Standards
              </h2>
              <p>
                Our accessibility efforts are guided by the following standards and legal
                frameworks:
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#080808] text-white">
                      <th className="text-left px-4 py-2.5 font-semibold rounded-tl-lg">Standard</th>
                      <th className="text-left px-4 py-2.5 font-semibold">Level / Scope</th>
                      <th className="text-left px-4 py-2.5 font-semibold rounded-tr-lg">Applicability</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["WCAG 2.1", "Level AA", "Primary conformance target for all web content"],
                      ["Americans with Disabilities Act (ADA)", "Title III", "Public-facing website accessibility"],
                      ["Section 508, Rehabilitation Act", "Federal standard", "Electronic and information technology"],
                      ["WCAG 2.2", "Level AA (aspirational)", "Enhanced guidance adopted where feasible"],
                    ].map(([std, level, scope], i) => (
                      <tr
                        key={i}
                        className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="px-4 py-2.5 font-medium text-[#080808]">{std}</td>
                        <td className="px-4 py-2.5">{level}</td>
                        <td className="px-4 py-2.5">{scope}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Measures */}
            <div>
              <h2
                className="text-lg font-bold text-[#080808] mb-3"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                3. Measures We Have Taken
              </h2>
              <p>
                To support accessibility, UBC Unlimited has implemented the following measures
                across our website:
              </p>
              <ul className="mt-3 space-y-2 list-none pl-0">
                {[
                  "Semantic HTML5 landmarks (header, nav, main, footer, aside) to support screen reader navigation.",
                  "Descriptive alt text on all informational images; decorative images are marked with empty alt attributes (alt=\"\").",
                  "Sufficient color contrast ratios meeting WCAG 2.1 AA minimums (4.5:1 for normal text, 3:1 for large text).",
                  "Keyboard-navigable interface — all interactive elements are reachable and operable via keyboard alone.",
                  "Visible focus indicators on all focusable elements, including navigation links, buttons, and form fields.",
                  "ARIA labels and roles applied to interactive components where native HTML semantics are insufficient.",
                  "Logical heading hierarchy (H1 → H2 → H3) maintained throughout all pages.",
                  "Form fields include associated <label> elements and descriptive error messages.",
                  "No content flashes more than three times per second, reducing seizure risk.",
                  "Text can be resized up to 200% without loss of content or functionality.",
                  "Links include descriptive text that conveys purpose without relying solely on surrounding context.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="mt-0.5 w-4 h-4 rounded-full bg-[#c9a84c]/15 flex items-center justify-center flex-shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] block" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Known Limitations */}
            <div>
              <h2
                className="text-lg font-bold text-[#080808] mb-3"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                4. Known Limitations
              </h2>
              <p>
                While we strive for full WCAG 2.1 AA conformance, we acknowledge that some
                areas of our website may not yet fully meet all accessibility guidelines. Known
                limitations include:
              </p>
              <ul className="mt-3 space-y-2 list-none pl-0">
                {[
                  "Certain third-party embedded tools (including live chat and analytics widgets) may not fully conform to WCAG 2.1 AA. We are working with our vendors to address these gaps.",
                  "Some older PDF documents linked from our site may not be fully accessible. We are in the process of remediating these files.",
                  "Video content may not include captions or audio descriptions in all cases. We are working to add these where missing.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="mt-0.5 w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 block" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3">
                We are committed to resolving these limitations as quickly as practicable. If
                you encounter a specific barrier, please contact us using the information below
                and we will prioritize a resolution.
              </p>
            </div>

            {/* Assistive Technologies */}
            <div>
              <h2
                className="text-lg font-bold text-[#080808] mb-3"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                5. Assistive Technology Compatibility
              </h2>
              <p>
                Our website is designed to be compatible with the following assistive
                technologies and browser combinations:
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#080808] text-white">
                      <th className="text-left px-4 py-2.5 font-semibold rounded-tl-lg">Assistive Technology</th>
                      <th className="text-left px-4 py-2.5 font-semibold rounded-tr-lg">Supported Browsers</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["NVDA (Windows)", "Chrome, Firefox, Edge"],
                      ["JAWS (Windows)", "Chrome, Edge, Internet Explorer 11"],
                      ["VoiceOver (macOS / iOS)", "Safari, Chrome"],
                      ["TalkBack (Android)", "Chrome"],
                      ["Windows Narrator", "Edge"],
                    ].map(([at, browsers], i) => (
                      <tr
                        key={i}
                        className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="px-4 py-2.5 font-medium text-[#080808]">{at}</td>
                        <td className="px-4 py-2.5">{browsers}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Feedback */}
            <div>
              <h2
                className="text-lg font-bold text-[#080808] mb-3"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                6. Feedback and Contact Information
              </h2>
              <p>
                We welcome your feedback on the accessibility of our website. If you
                experience any barriers to access, or if you require information in an
                alternative format, please contact us using any of the following methods:
              </p>
              <div className="mt-4 bg-[#f8fafc] rounded-xl border border-gray-100 p-5 space-y-2.5">
                <div className="flex items-start gap-3">
                  <span className="text-[#c9a84c] font-semibold w-20 flex-shrink-0">Email:</span>
                  <a href="mailto:accessibility@ubcunlimited.com" className="text-[#c9a84c] hover:underline break-all">
                    accessibility@ubcunlimited.com
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#c9a84c] font-semibold w-20 flex-shrink-0">Phone:</span>
                  <a href="tel:+18013096988" className="text-[#c9a84c] hover:underline">
                    (801) 309-6988
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#c9a84c] font-semibold w-20 flex-shrink-0">Mail:</span>
                  <address className="not-italic text-gray-600">
                    UBC Unlimited<br />
                    Attn: Accessibility Coordinator<br />
                    Utah, United States
                  </address>
                </div>
              </div>
              <p className="mt-4">
                We aim to respond to accessibility feedback within <strong className="text-[#080808]">2 business days</strong> and to
                provide a substantive response or resolution within <strong className="text-[#080808]">10 business days</strong>.
              </p>
            </div>

            {/* Formal Complaints */}
            <div>
              <h2
                className="text-lg font-bold text-[#080808] mb-3"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                7. Formal Complaints and Enforcement
              </h2>
              <p>
                If you are not satisfied with our response to your accessibility concern, you
                have the right to file a complaint with the U.S. Department of Justice (DOJ)
                Civil Rights Division, which enforces Title III of the ADA as it applies to
                places of public accommodation, including websites. You may also contact the
                U.S. Access Board, which provides technical guidance on accessibility
                standards.
              </p>
              <p className="mt-3">
                <strong className="text-[#080808]">U.S. Department of Justice, Civil Rights Division:</strong>{" "}
                <a
                  href="https://www.ada.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#c9a84c] hover:underline"
                >
                  www.ada.gov
                </a>{" "}
                | 1-800-514-0301 (voice) | 1-800-514-0383 (TTY)
              </p>
            </div>

            {/* Ongoing Efforts */}
            <div>
              <h2
                className="text-lg font-bold text-[#080808] mb-3"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                8. Ongoing Accessibility Efforts
              </h2>
              <p>
                Accessibility is an ongoing commitment, not a one-time project. UBC Unlimited
                conducts periodic accessibility reviews of our website and incorporates
                accessibility requirements into our web development and content creation
                processes. We train our team on accessibility best practices and evaluate new
                features and content updates for conformance before publication.
              </p>
              <p className="mt-3">
                This Accessibility Statement will be reviewed and updated at least annually, or
                sooner when significant changes are made to our website.
              </p>
            </div>

            {/* Related Policies */}
            <div className="border-t border-gray-100 pt-6">
              <h2
                className="text-lg font-bold text-[#080808] mb-3"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                Related Policies
              </h2>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: "Privacy Policy", href: "/privacy-policy" },
                  { label: "Terms of Service", href: "/terms-of-service" },
                  { label: "Cookie Policy", href: "/cookie-policy" },
                  { label: "Disclaimer", href: "/disclaimer" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-xs text-[#c9a84c] border border-[#c9a84c]/30 rounded-full px-3 py-1 hover:bg-[#c9a84c]/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </PageLayout>
  );
}
