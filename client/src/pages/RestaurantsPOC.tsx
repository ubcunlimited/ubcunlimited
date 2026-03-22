import { useState } from "react";
import { Link } from "wouter";
import { ChevronDown, ChevronRight, ArrowRight, CheckCircle, AlertCircle, Zap, X } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import SEO from "@/components/SEO";

// ─── Restaurant challenge-solution data (expanded for POC) ───────────────────
const PAIRS = [
  {
    challenge: "High transaction volume during lunch and dinner rushes",
    challengeDetail: "Slow payment processing creates lines, frustrated customers, and lost table turns — especially during peak hours when every second counts.",
    solution: "SkyTab POS with tableside ordering",
    solutionDetail: "SkyTab's tableside handheld terminals let servers take orders and process payments at the table — no waiting for a terminal to free up. Average transaction time drops from 3–4 minutes to under 60 seconds, increasing table turns by up to 20%.",
    solutionTag: "POS Systems",
    impact: "Up to 20% more table turns",
  },
  {
    challenge: "Tip management complexity and end-of-day reconciliation",
    challengeDetail: "Manual tip entry, tip pooling disputes, and payroll reconciliation eat up hours every week and create compliance risk.",
    solution: "Automated tip management & reporting",
    solutionDetail: "Tip prompts on customer-facing screens, configurable tip pooling rules, and automatic end-of-day tip reports that integrate directly with your payroll system. No manual entry, no disputes, no compliance gaps.",
    solutionTag: "POS Systems",
    impact: "Hours saved per week",
  },
  {
    challenge: "Table management and splitting checks",
    challengeDetail: "Juggling table assignments, course timing, and split checks manually leads to server errors, comped meals, and unhappy guests.",
    solution: "Visual floor plan & split-check tools",
    solutionDetail: "SkyTab's visual floor plan shows real-time table status, server assignments, and course timing. Split checks by seat, item, or percentage — in seconds, not minutes. Fewer comps, happier guests, higher tips.",
    solutionTag: "POS Systems",
    impact: "Fewer comps & errors",
  },
  {
    challenge: "Online ordering integration with third-party platforms",
    challengeDetail: "Managing separate tablets for DoorDash, Uber Eats, and your own website creates order chaos, missed tickets, and inventory discrepancies.",
    solution: "Unified online ordering integration",
    solutionDetail: "All online orders — from your own website, DoorDash, Uber Eats, and more — flow directly into your kitchen display system as a single ticket stream. No separate tablets, no missed orders, no manual re-entry.",
    solutionTag: "Online Ordering",
    impact: "Zero missed online orders",
  },
  {
    challenge: "High credit card processing fees eating into thin margins",
    challengeDetail: "Restaurant margins average 3–9%. Credit card fees of 2.5–3.5% per transaction can represent 30–40% of your net profit.",
    solution: "Cash Discount & Surcharging / Cash Discount Program",
    solutionDetail: "Display a cash price and a card price at the point of sale. Customers who pay by card cover the processing cost — effectively eliminating your fees. Fully compliant with card network rules, legal in all 50 states, with all required signage included.",
    solutionTag: "Cash Discount & Surcharging",
    impact: "Up to 100% fee elimination",
  },
  {
    challenge: "Building customer loyalty and driving repeat visits",
    challengeDetail: "Without a loyalty program, you have no way to identify your best customers, reward them, or bring them back when business is slow.",
    solution: "Integrated gift cards & loyalty program",
    solutionDetail: "Branded physical and digital gift cards plus a points-based loyalty program that runs automatically at the POS. Build a customer database for targeted email and SMS campaigns. Gift card recipients frequently spend more than the card's face value when they redeem it.",
    solutionTag: "Gift & Loyalty",
    impact: "Higher spend per gift card visit",
  },
];

// ─── Option A: Table Layout ──────────────────────────────────────────────────
function TableLayout() {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="text-center mb-10">
          <span className="inline-block bg-gray-100 text-gray-500 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">Option A</span>
          <h2 className="text-2xl font-bold text-[#080808] mb-2" style={{ fontFamily: "Sora, sans-serif" }}>
            Challenge → Solution Table
          </h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto">Compact, scannable. Best for decision-makers who want a quick overview. Less room for detail.</p>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#080808] text-white">
                <th className="text-left px-6 py-4 font-semibold w-1/2">
                  <div className="flex items-center gap-2">
                    <AlertCircle size={14} className="text-red-400" />
                    Challenge
                  </div>
                </th>
                <th className="text-left px-6 py-4 font-semibold w-1/2">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-[#c9a84c]" />
                    UBC Unlimited Solution
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {PAIRS.map((p, i) => (
                <tr key={i} className={`border-t border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/60"}`}>
                  <td className="px-6 py-4 align-top">
                    <div className="font-semibold text-[#080808] mb-1">{p.challenge}</div>
                    <div className="text-gray-500 text-xs leading-relaxed">{p.challengeDetail}</div>
                  </td>
                  <td className="px-6 py-4 align-top">
                    <div className="flex items-start gap-2 mb-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] mt-1.5 shrink-0" />
                      <span className="font-bold text-[#080808]">{p.solution}</span>
                    </div>
                    <div className="text-gray-500 text-xs leading-relaxed pl-3.5">{p.solutionDetail}</div>
                    <div className="mt-2 pl-3.5">
                      <span className="inline-block bg-[#c9a84c]/10 text-[#c9a84c] text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border border-[#c9a84c]/20">
                        {p.impact}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ─── Option B: Paired Card Rows (Recommended) ────────────────────────────────
function PairedCardRows() {
  return (
    <section className="py-16 bg-[#f8fafc]">
      <div className="container">
        <div className="text-center mb-10">
          <span className="inline-block bg-[#c9a84c]/10 text-[#c9a84c] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 border border-[#c9a84c]/20">Option B — Recommended</span>
          <h2 className="text-2xl font-bold text-[#080808] mb-2" style={{ fontFamily: "Sora, sans-serif" }}>
            Paired Challenge → Solution Cards
          </h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto">Each challenge is visually connected to its solution with an arrow. More descriptive, more persuasive, and easier to skim on mobile.</p>
        </div>

        {/* Column headers */}
        <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] gap-4 mb-4 px-1">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-500">
            <AlertCircle size={12} /> The Challenge
          </div>
          <div className="w-8" />
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#c9a84c]">
            <CheckCircle size={12} /> Our Solution
          </div>
        </div>

        <div className="space-y-4">
          {PAIRS.map((p, i) => (
            <div key={i} className="grid md:grid-cols-[1fr_auto_1fr] gap-0 md:gap-4 items-stretch">
              {/* Challenge */}
              <div className="bg-white rounded-2xl md:rounded-r-none p-5 border border-red-100 border-b-0 md:border-b md:border-r-0 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
                    <X size={13} className="text-red-400" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-[#080808] mb-1" style={{ fontFamily: "Sora, sans-serif" }}>{p.challenge}</div>
                    <p className="text-gray-500 text-xs leading-relaxed">{p.challengeDetail}</p>
                  </div>
                </div>
              </div>

              {/* Arrow connector */}
              <div className="hidden md:flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-[#c9a84c] flex items-center justify-center shadow-md">
                  <ArrowRight size={14} className="text-white" />
                </div>
              </div>
              {/* Mobile arrow */}
              <div className="flex md:hidden items-center justify-center bg-[#c9a84c]/10 border-x border-[#c9a84c]/20 py-2">
                <ChevronDown size={16} className="text-[#c9a84c]" />
              </div>

              {/* Solution */}
              <div className="bg-[#080808] rounded-2xl md:rounded-l-none p-5 border border-[#c9a84c]/20 border-t-0 md:border-t md:border-l-0 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#c9a84c]/15 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle size={13} className="text-[#c9a84c]" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-bold text-sm text-white" style={{ fontFamily: "Sora, sans-serif" }}>{p.solution}</span>
                      <span className="text-[10px] font-bold text-[#c9a84c] bg-[#c9a84c]/10 border border-[#c9a84c]/25 px-2 py-0.5 rounded-full">{p.solutionTag}</span>
                    </div>
                    <p className="text-white/60 text-xs leading-relaxed">{p.solutionDetail}</p>
                    <div className="mt-2.5 flex items-center gap-1.5">
                      <Zap size={11} className="text-[#c9a84c]" />
                      <span className="text-[#c9a84c] text-xs font-semibold">{p.impact}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Option C: Accordion / Expandable Rows ───────────────────────────────────
function AccordionLayout() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="text-center mb-10">
          <span className="inline-block bg-gray-100 text-gray-500 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">Option C</span>
          <h2 className="text-2xl font-bold text-[#080808] mb-2" style={{ fontFamily: "Sora, sans-serif" }}>
            Expandable Challenge → Solution Rows
          </h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto">Compact by default — click any challenge to reveal the full solution. Keeps the page clean while hiding depth behind interaction.</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-2">
          {PAIRS.map((p, i) => (
            <div
              key={i}
              className={`rounded-2xl border transition-all overflow-hidden ${
                openIndex === i
                  ? "border-[#c9a84c]/40 shadow-lg"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {/* Header row — always visible */}
              <button
                className="w-full flex items-center gap-4 px-5 py-4 text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                  openIndex === i ? "bg-[#c9a84c] text-white" : "bg-red-50 text-red-400"
                }`}>
                  {openIndex === i ? <CheckCircle size={13} /> : <AlertCircle size={13} />}
                </div>
                <span className={`font-semibold text-sm flex-1 text-left transition-colors ${
                  openIndex === i ? "text-[#c9a84c]" : "text-[#080808]"
                }`} style={{ fontFamily: "Sora, sans-serif" }}>
                  {p.challenge}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-gray-400 transition-transform shrink-0 ${openIndex === i ? "rotate-180 text-[#c9a84c]" : ""}`}
                />
              </button>

              {/* Expanded solution */}
              {openIndex === i && (
                <div className="px-5 pb-5 border-t border-[#c9a84c]/15">
                  <div className="grid md:grid-cols-2 gap-4 pt-4">
                    {/* Challenge detail */}
                    <div className="bg-red-50/60 rounded-xl p-4 border border-red-100">
                      <div className="text-xs font-bold uppercase tracking-widest text-red-400 mb-2">The Problem</div>
                      <p className="text-gray-600 text-sm leading-relaxed">{p.challengeDetail}</p>
                    </div>
                    {/* Solution */}
                    <div className="bg-[#080808] rounded-xl p-4 border border-[#c9a84c]/20">
                      <div className="text-xs font-bold uppercase tracking-widest text-[#c9a84c] mb-2">Our Solution</div>
                      <div className="text-white font-bold text-sm mb-1">{p.solution}</div>
                      <p className="text-white/60 text-xs leading-relaxed">{p.solutionDetail}</p>
                      <div className="mt-3 flex items-center gap-1.5">
                        <Zap size={11} className="text-[#c9a84c]" />
                        <span className="text-[#c9a84c] text-xs font-semibold">{p.impact}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Full POC Page ────────────────────────────────────────────────────────────
export default function RestaurantsPOC() {
  return (
    <PageLayout>
      <SEO
        title="Restaurants — Challenge/Solution Layout POC | UBC Unlimited"
        description="Proof-of-concept page showing three layout options for presenting challenges and solutions."
      />

      {/* Page header */}
      <section className="bg-[#080808] py-14 border-b border-white/8">
        <div className="container text-center">
          <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#c9a84c] text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-5">
            🍽️ Proof of Concept
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>
            Challenge → Solution Layout Options
          </h1>
          <p className="text-white/55 max-w-2xl mx-auto text-base mb-6">
            Three different ways to present the same challenge-solution data for the Restaurants industry page. Review each option and let us know which direction to take — we'll then apply it to all industry and solution pages.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
            <a href="#option-a" className="bg-white/8 hover:bg-white/12 border border-white/15 text-white px-4 py-2 rounded-full transition-colors">Option A: Table</a>
            <a href="#option-b" className="bg-[#c9a84c]/15 hover:bg-[#c9a84c]/25 border border-[#c9a84c]/30 text-[#c9a84c] px-4 py-2 rounded-full transition-colors font-semibold">Option B: Paired Cards ★ Recommended</a>
            <a href="#option-c" className="bg-white/8 hover:bg-white/12 border border-white/15 text-white px-4 py-2 rounded-full transition-colors">Option C: Accordion</a>
          </div>
        </div>
      </section>

      {/* Option A */}
      <div id="option-a">
        <TableLayout />
      </div>

      {/* Divider */}
      <div className="bg-[#c9a84c]/10 border-y border-[#c9a84c]/20 py-3 text-center">
        <span className="text-[#c9a84c] text-xs font-bold uppercase tracking-widest">↓ Option B below — Recommended</span>
      </div>

      {/* Option B */}
      <div id="option-b">
        <PairedCardRows />
      </div>

      {/* Divider */}
      <div className="bg-gray-100 border-y border-gray-200 py-3 text-center">
        <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">↓ Option C below</span>
      </div>

      {/* Option C */}
      <div id="option-c">
        <AccordionLayout />
      </div>

      {/* Decision CTA */}
      <section className="py-12 bg-[#080808] border-t border-white/8">
        <div className="container text-center">
          <h2 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>
            Which layout works best?
          </h2>
          <p className="text-white/50 text-sm mb-6 max-w-md mx-auto">
            Once you choose a direction, we'll update the data structure for all industry and solution pages and roll it out consistently across the site.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/industries/restaurants" className="bg-white/8 hover:bg-white/12 border border-white/15 text-white text-sm px-5 py-2.5 rounded-full transition-colors">
              View current Restaurants page →
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
