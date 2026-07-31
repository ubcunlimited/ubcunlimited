/**
 * RecaptchaDoc — Internal documentation page for the reCAPTCHA v3 implementation
 * Route: /recaptcha-docs
 */
import { useState } from "react";
import { Shield, CheckCircle, AlertTriangle, Code, Server, Globe, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";

// ── Types ─────────────────────────────────────────────────────────────────────

interface FormEntry {
  form: string;
  file: string;
  action: string;
  serverVerified: boolean;
  mechanism: string;
  notes?: string;
}

interface CodeBlockProps {
  title: string;
  language?: string;
  code: string;
}

interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

// ── Data ──────────────────────────────────────────────────────────────────────

const FORM_ENTRIES: FormEntry[] = [
  {
    form: "Homepage Hero",
    file: "client/src/pages/Home.tsx",
    action: "submit_hero_lead",
    serverVerified: true,
    mechanism: "tRPC mutation → submitHeroLead",
  },
  {
    form: "Contact — Consultation Tab",
    file: "client/src/pages/Contact.tsx",
    action: "submit_consultation",
    serverVerified: true,
    mechanism: "tRPC mutation → submitConsultation",
  },
  {
    form: "Contact — Quote Tab",
    file: "client/src/pages/Contact.tsx",
    action: "submit_quote",
    serverVerified: true,
    mechanism: "tRPC mutation → submitQuote",
  },
  {
    form: "Contact — Statement Review Tab",
    file: "client/src/pages/Contact.tsx",
    action: "submit_statement_review",
    serverVerified: true,
    mechanism: "tRPC mutation → submitStatementReview",
  },
  {
    form: "Standalone Consultation Page",
    file: "client/src/pages/Consultation.tsx",
    action: "submit_consultation",
    serverVerified: true,
    mechanism: "tRPC mutation → submitConsultation",
    notes: "Page wraps a GHL embed; token is generated on the surrounding page submit handler.",
  },
  {
    form: "Agent / ISO Partner Form",
    file: "client/src/pages/AgentISO.tsx",
    action: "submit_agent_lead",
    serverVerified: true,
    mechanism: "tRPC mutation → submitAgentLead",
  },
  {
    form: "CityDetail — Unlisted City Form",
    file: "client/src/pages/CityDetail.tsx",
    action: "submit_hero_lead",
    serverVerified: true,
    mechanism: "tRPC mutation → submitHeroLead",
  },
  {
    form: "Cities — Unlisted City Form",
    file: "client/src/pages/Cities.tsx",
    action: "submit_hero_lead",
    serverVerified: true,
    mechanism: "tRPC mutation → submitHeroLead",
  },
  {
    form: "Blog Lead Capture",
    file: "client/src/components/BlogLeadCapture.tsx",
    action: "submit_blog_lead",
    serverVerified: true,
    mechanism: "tRPC mutation → submitBlogLead",
  },
  {
    form: "Testimonial Submission Form",
    file: "client/src/components/TestimonialSubmissionForm.tsx",
    action: "submit_testimonial",
    serverVerified: true,
    mechanism: "tRPC mutation → submitTestimonial",
  },
  {
    form: "Shift4Dine POS Builder",
    file: "client/src/components/sections/Shift4DinePOSBuilder.tsx",
    action: "submit_skytab_order",
    serverVerified: false,
    mechanism: "mailto: redirect (no backend call)",
    notes: "Token is generated and scored by Google but not verified server-side. The form opens a pre-filled mailto: link rather than posting to the API.",
  },
  {
    form: "Shift4Dine Configurator",
    file: "client/src/components/Shift4DineConfigurator.tsx",
    action: "submit_skytab_configurator",
    serverVerified: false,
    mechanism: "Local state only (no backend call)",
    notes: "Token is generated for scoring purposes. Submission sets local state and redirects to /thank-you without a server round-trip.",
  },
  {
    form: "Inline Lead Capture Form",
    file: "client/src/components/sections/LeadCaptureForm.tsx",
    action: "submit_lead_capture",
    serverVerified: false,
    mechanism: "Local state only (no backend call)",
    notes: "Reusable component embedded on solution/industry pages. Sets local submitted state only; no tRPC mutation is called.",
  },
];

const HOOK_CODE = `// client/src/hooks/useRecaptcha.ts
import { useCallback } from "react";

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string;

export function useRecaptcha() {
  const getToken = useCallback(
    async (action: string): Promise<string> => {
      if (!SITE_KEY || typeof window === "undefined" || !window.grecaptcha) {
        console.warn("[reCAPTCHA] grecaptcha not loaded — skipping token");
        return "";
      }
      return new Promise<string>((resolve) => {
        window.grecaptcha.ready(async () => {
          try {
            const token = await window.grecaptcha.execute(SITE_KEY, { action });
            resolve(token);
          } catch (err) {
            console.error("[reCAPTCHA] execute failed:", err);
            resolve("");
          }
        });
      });
    },
    []
  );
  return { getToken };
}`;

const SERVER_CODE = `// server/recaptcha.ts
import { ENV } from "./_core/env";

const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

export async function verifyRecaptcha(
  token: string,
  action?: string,
  minScore = 0.5          // ← Adjust this threshold after reviewing live data
): Promise<{ success: boolean; score?: number; error?: string }> {
  if (!ENV.recaptchaSecretKey) {
    console.warn("[reCAPTCHA] RECAPTCHA_SECRET_KEY not set — skipping");
    return { success: true };   // Passes through in local dev without a key
  }

  const params = new URLSearchParams({
    secret: ENV.recaptchaSecretKey,
    response: token,
  });

  const res = await fetch(\`\${RECAPTCHA_VERIFY_URL}?\${params.toString()}\`, {
    method: "POST",
  });
  const data = await res.json();

  if (!data.success)
    return { success: false, error: data["error-codes"]?.join(", ") ?? "invalid-token" };

  if (action && data.action !== action)
    return { success: false, error: \`action-mismatch: expected \${action}, got \${data.action}\` };

  if (data.score < minScore)
    return { success: false, score: data.score, error: \`score-too-low: \${data.score}\` };

  return { success: true, score: data.score };
}`;

const USAGE_CODE = `// Example: wiring useRecaptcha into a tRPC mutation
import { useRecaptcha } from "@/hooks/useRecaptcha";

function MyForm() {
  const { getToken } = useRecaptcha();
  const mutation = trpc.forms.submitConsultation.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const recaptchaToken = await getToken("submit_consultation");
    mutation.mutate({ ...formData, recaptchaToken });
  };
}`;

const ROUTER_CODE = `// server/routers/forms.ts — pattern used in every protected procedure
import { verifyRecaptcha } from "../recaptcha";

submitConsultation: publicProcedure
  .input(z.object({
    // ... form fields ...
    recaptchaToken: z.string().optional(),
  }))
  .mutation(async ({ input }) => {
    if (input.recaptchaToken) {
      const rc = await verifyRecaptcha(input.recaptchaToken, "submit_consultation");
      if (!rc.success)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "reCAPTCHA verification failed. Please try again.",
        });
    }
    // ... proceed with form logic ...
  }),`;

// ── Sub-components ────────────────────────────────────────────────────────────

function CodeBlock({ title, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 my-4">
      <div className="flex items-center justify-between px-4 py-2 bg-[#0f172a] border-b border-gray-700">
        <span className="text-xs font-mono text-gray-600">{title}</span>
        <button
          onClick={handleCopy}
          className="text-xs text-gray-600 hover:text-white transition-colors px-2 py-1 rounded hover:bg-white/10"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="bg-[#0f172a] text-[#e2e8f0] text-xs font-mono p-5 overflow-x-auto leading-relaxed whitespace-pre">
        {code}
      </pre>
    </div>
  );
}

function Collapsible({ title, children, defaultOpen = false }: CollapsibleProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden mb-4">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
      >
        <span className="font-semibold text-[#080808] text-sm">{title}</span>
        {open ? <ChevronUp size={16} className="text-gray-600 shrink-0" /> : <ChevronDown size={16} className="text-gray-600 shrink-0" />}
      </button>
      {open && <div className="px-5 py-4 bg-white">{children}</div>}
    </div>
  );
}

function StatusBadge({ verified }: { verified: boolean }) {
  return verified ? (
    <span className="inline-flex items-center gap-1 text-xs font-medium bg-green-50 text-green-700 border border-green-200 rounded-full px-2.5 py-0.5">
      <CheckCircle size={11} /> Server-verified
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-2.5 py-0.5">
      <AlertTriangle size={11} /> Client-only
    </span>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function RecaptchaDoc() {
  const serverVerifiedCount = FORM_ENTRIES.filter((f) => f.serverVerified).length;
  const clientOnlyCount = FORM_ENTRIES.filter((f) => !f.serverVerified).length;

  return (
    <PageLayout>
      {/* Header */}
      <section className="bg-[#080808] text-white py-16">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/20 flex items-center justify-center">
              <Shield size={20} className="text-[#c9a84c]" />
            </div>
            <span className="text-sm font-medium text-[#c9a84c] uppercase tracking-widest">Internal Documentation</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "Sora, sans-serif" }}>
            reCAPTCHA v3 Implementation
          </h1>
          <p className="text-white/60 text-lg max-w-2xl">
            Full technical reference for the Google reCAPTCHA v3 integration across the UBC Unlimited website — covering architecture, all 13 form entry points, server-side verification, and threshold tuning guidance.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <span className="bg-white/10 text-white/80 text-xs font-mono px-3 py-1.5 rounded-full">Pixel ID: 6LefoJosAAAAANdy7GKMIHuTculGJPbr-xHpgIrc</span>
            <span className="bg-white/10 text-white/80 text-xs font-mono px-3 py-1.5 rounded-full">Score threshold: 0.5 (default)</span>
            <span className="bg-white/10 text-white/80 text-xs font-mono px-3 py-1.5 rounded-full">Version: reCAPTCHA v3</span>
          </div>
        </div>
      </section>

      {/* Summary cards */}
      <section className="py-10 bg-gray-50 border-b border-gray-200">
        <div className="container max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total Form Entry Points", value: FORM_ENTRIES.length, icon: Globe, color: "text-[#c9a84c]" },
              { label: "Server-Verified Forms", value: serverVerifiedCount, icon: Server, color: "text-green-600" },
              { label: "Client-Only Forms", value: clientOnlyCount, icon: Code, color: "text-amber-600" },
              { label: "Score Threshold", value: "0.5", icon: Shield, color: "text-blue-600" },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="bg-white rounded-xl border border-gray-200 p-5 text-center">
                <Icon size={20} className={`${color} mx-auto mb-2`} />
                <div className={`text-2xl font-bold ${color}`}>{value}</div>
                <div className="text-xs text-gray-600 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-12">
        <div className="container max-w-4xl space-y-12">

          {/* Architecture overview */}
          <div>
            <h2 className="text-xl font-bold text-[#080808] mb-2" style={{ fontFamily: "Sora, sans-serif" }}>Architecture Overview</h2>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              The integration uses a three-layer architecture: a CDN-loaded script that registers the reCAPTCHA runtime in the browser, a shared React hook that generates scored tokens on demand, and a server-side utility that validates each token against Google's verification API before any form data is processed.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  step: "1",
                  title: "Script Load",
                  icon: Globe,
                  color: "bg-blue-50 text-blue-600 border-blue-200",
                  desc: "client/index.html loads api.js?render={SITE_KEY} asynchronously. The site key is injected at build time via VITE_RECAPTCHA_SITE_KEY.",
                },
                {
                  step: "2",
                  title: "Token Generation",
                  icon: Code,
                  color: "bg-amber-50 text-amber-600 border-amber-200",
                  desc: "useRecaptcha() hook calls grecaptcha.execute(siteKey, { action }) just before submission. Each action name is unique per form for granular analytics.",
                },
                {
                  step: "3",
                  title: "Server Verification",
                  icon: Server,
                  color: "bg-green-50 text-green-600 border-green-200",
                  desc: "verifyRecaptcha() POSTs the token to Google's siteverify endpoint, checks the score ≥ 0.5, and validates the action name matches. Failures throw a BAD_REQUEST tRPC error.",
                },
              ].map(({ step, title, icon: Icon, color, desc }) => (
                <div key={step} className={`rounded-xl border p-5 ${color.split(" ").slice(0, 2).join(" ")} border-${color.split(" ")[2]}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mb-3 ${color}`}>
                    {step}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon size={14} />
                    <span className="font-semibold text-sm">{title}</span>
                  </div>
                  <p className="text-xs leading-relaxed opacity-80">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Environment variables */}
          <div>
            <h2 className="text-xl font-bold text-[#080808] mb-2" style={{ fontFamily: "Sora, sans-serif" }}>Environment Variables</h2>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              Both keys are stored as managed secrets and injected automatically at runtime. Never commit these values to source control.
            </p>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 text-xs uppercase tracking-wide">Variable</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 text-xs uppercase tracking-wide">Used In</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 text-xs uppercase tracking-wide">Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3 font-mono text-xs text-blue-700 bg-blue-50/30">VITE_RECAPTCHA_SITE_KEY</td>
                    <td className="px-4 py-3 text-xs text-gray-600">Frontend (browser)</td>
                    <td className="px-4 py-3 text-xs text-gray-600">Passed to grecaptcha.execute() and rendered into the api.js script URL in index.html</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs text-green-700 bg-green-50/30">RECAPTCHA_SECRET_KEY</td>
                    <td className="px-4 py-3 text-xs text-gray-600">Server only</td>
                    <td className="px-4 py-3 text-xs text-gray-600">Sent to Google's siteverify API to validate tokens. Never exposed to the client.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Form entry points */}
          <div>
            <h2 className="text-xl font-bold text-[#080808] mb-2" style={{ fontFamily: "Sora, sans-serif" }}>Form Entry Points</h2>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              All 13 form entry points generate a reCAPTCHA v3 token on submission. Forms backed by a tRPC mutation also verify the token server-side before processing any data. Client-only forms (those using mailto: or local state) generate a token for Google's scoring model but do not perform a server-side verification step.
            </p>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 text-xs uppercase tracking-wide">Form</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 text-xs uppercase tracking-wide">Action Name</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 text-xs uppercase tracking-wide">Mechanism</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 text-xs uppercase tracking-wide">Verification</th>
                  </tr>
                </thead>
                <tbody>
                  {FORM_ENTRIES.map((entry, i) => (
                    <tr key={entry.form} className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/40"}`}>
                      <td className="px-4 py-3">
                        <div className="font-medium text-[#080808] text-xs">{entry.form}</div>
                        <div className="font-mono text-[10px] text-gray-600 mt-0.5">{entry.file}</div>
                        {entry.notes && (
                          <div className="text-[10px] text-amber-600 mt-1 leading-relaxed max-w-xs">{entry.notes}</div>
                        )}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-purple-700">{entry.action}</td>
                      <td className="px-4 py-3 text-xs text-gray-600">{entry.mechanism}</td>
                      <td className="px-4 py-3"><StatusBadge verified={entry.serverVerified} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Code samples */}
          <div>
            <h2 className="text-xl font-bold text-[#080808] mb-2" style={{ fontFamily: "Sora, sans-serif" }}>Code Reference</h2>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              The following samples reflect the exact production code. Use these as reference when adding reCAPTCHA to new forms in the future.
            </p>
            <Collapsible title="useRecaptcha hook — client/src/hooks/useRecaptcha.ts" defaultOpen>
              <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                Shared React hook that wraps <code className="bg-gray-100 px-1 rounded">grecaptcha.execute()</code>. Call <code className="bg-gray-100 px-1 rounded">getToken(action)</code> just before calling a mutation. Returns an empty string and logs a warning if the script has not loaded, allowing the form to proceed gracefully.
              </p>
              <CodeBlock title="useRecaptcha.ts" code={HOOK_CODE} />
            </Collapsible>

            <Collapsible title="verifyRecaptcha utility — server/recaptcha.ts">
              <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                Server-side verification utility. Calls Google's <code className="bg-gray-100 px-1 rounded">siteverify</code> endpoint, validates the score against <code className="bg-gray-100 px-1 rounded">minScore</code> (default 0.5), and optionally checks that the action name matches what the client declared. If <code className="bg-gray-100 px-1 rounded">RECAPTCHA_SECRET_KEY</code> is not set (local dev), verification is skipped and the request passes through.
              </p>
              <CodeBlock title="recaptcha.ts" code={SERVER_CODE} />
            </Collapsible>

            <Collapsible title="Frontend usage pattern — wiring into a tRPC mutation">
              <CodeBlock title="Usage example" code={USAGE_CODE} />
            </Collapsible>

            <Collapsible title="Server router pattern — verifying token in a tRPC procedure">
              <CodeBlock title="server/routers/forms.ts (excerpt)" code={ROUTER_CODE} />
            </Collapsible>
          </div>

          {/* Threshold tuning */}
          <div>
            <h2 className="text-xl font-bold text-[#080808] mb-2" style={{ fontFamily: "Sora, sans-serif" }}>Threshold Tuning Guide</h2>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              The current minimum score is <strong>0.5</strong>, which is Google's recommended starting point. After accumulating 7–14 days of live traffic, review the score distribution in the reCAPTCHA Admin Console and adjust accordingly.
            </p>
            <div className="overflow-x-auto rounded-xl border border-gray-200 mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 text-xs uppercase tracking-wide">Score Range</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 text-xs uppercase tracking-wide">Interpretation</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 text-xs uppercase tracking-wide">Recommended Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { range: "0.9 – 1.0", interp: "Very likely human", action: "Allow — no friction needed" },
                    { range: "0.7 – 0.9", interp: "Probably human", action: "Allow — normal traffic" },
                    { range: "0.5 – 0.7", interp: "Uncertain — current threshold boundary", action: "Allow at 0.5; tighten to 0.7 if bot activity is observed" },
                    { range: "0.3 – 0.5", interp: "Likely automated", action: "Block at current threshold; investigate if legitimate users report failures" },
                    { range: "0.0 – 0.3", interp: "Almost certainly a bot", action: "Block — do not process submission" },
                  ].map(({ range, interp, action }, i) => (
                    <tr key={range} className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/40"}`}>
                      <td className="px-4 py-3 font-mono text-xs font-semibold text-[#080808]">{range}</td>
                      <td className="px-4 py-3 text-xs text-gray-600">{interp}</td>
                      <td className="px-4 py-3 text-xs text-gray-600">{action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
              <div className="flex gap-3">
                <AlertTriangle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-amber-800 mb-1">To adjust the threshold</p>
                  <p className="text-xs text-amber-700 leading-relaxed">
                    Edit the <code className="bg-amber-100 px-1 rounded">minScore</code> default parameter in <code className="bg-amber-100 px-1 rounded">server/recaptcha.ts</code> (line 14). The change applies globally to all server-verified forms. For per-form overrides, pass a custom value as the third argument: <code className="bg-amber-100 px-1 rounded">verifyRecaptcha(token, "action_name", 0.7)</code>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Client-only forms note */}
          <div>
            <h2 className="text-xl font-bold text-[#080808] mb-2" style={{ fontFamily: "Sora, sans-serif" }}>Client-Only Forms — Limitations & Options</h2>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              Three forms — Shift4Dine POS Builder, Shift4Dine Configurator, and the inline Lead Capture Form — do not make a server-side API call on submission. reCAPTCHA tokens are generated for these forms (which contributes to Google's scoring model for the site), but the tokens are not verified server-side because there is no backend round-trip to attach verification to.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-4">
              <div className="flex gap-3">
                <Shield size={16} className="text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-blue-800 mb-1">Options for full server-side protection on these forms</p>
                  <ul className="text-xs text-blue-700 leading-relaxed space-y-1.5 list-disc list-outside ml-4">
                    <li><strong>Shift4Dine POS Builder:</strong> Replace the mailto: redirect with a tRPC mutation that emails the order summary server-side. This enables full token verification and removes the dependency on the user's email client.</li>
                    <li><strong>Shift4Dine Configurator:</strong> Add a tRPC mutation to persist the quote request to the database and trigger an owner notification. The reCAPTCHA token can then be verified in that procedure.</li>
                    <li><strong>Inline Lead Capture Form:</strong> Wire it to an existing tRPC procedure (e.g., <code className="bg-blue-100 px-1 rounded">submitHeroLead</code>) and pass the recaptchaToken. The component currently has no backend call by design for reusability.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* External links */}
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-bold text-[#080808] mb-4" style={{ fontFamily: "Sora, sans-serif" }}>External Resources</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: "reCAPTCHA Admin Console", url: "https://www.google.com/recaptcha/admin", desc: "View score distributions, traffic stats, and manage site keys" },
                { label: "Google reCAPTCHA v3 Docs", url: "https://developers.google.com/recaptcha/docs/v3", desc: "Official integration guide and API reference" },
                { label: "siteverify API Reference", url: "https://developers.google.com/recaptcha/docs/verify", desc: "Server-side token verification endpoint documentation" },
                { label: "Score Interpretation Guide", url: "https://developers.google.com/recaptcha/docs/v3#interpreting_the_score", desc: "Google's guidance on reading and acting on v3 scores" },
              ].map(({ label, url, desc }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 hover:border-[#c9a84c] hover:bg-[#c9a84c]/5 transition-all group"
                >
                  <ExternalLink size={14} className="text-gray-600 group-hover:text-[#c9a84c] shrink-0 mt-0.5 transition-colors" />
                  <div>
                    <div className="text-sm font-semibold text-[#080808] group-hover:text-[#c9a84c] transition-colors">{label}</div>
                    <div className="text-xs text-gray-600 mt-0.5">{desc}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

        </div>
      </section>
    </PageLayout>
  );
}
