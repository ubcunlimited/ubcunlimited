/**
 * SkyTabPOSBuilder — Full 4-step interactive POS configurator
 * Design: Modern Fintech Edge — dark navy/teal, Sora font, UBC Unlimited brand
 * Steps: 1. Bundle  2. Hardware  3. Accessories  4. Processing
 * Pricing matches skytabmountainwest.com configurator exactly
 */
import { useState } from "react";
import { CheckCircle, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "wouter";

// ─── CDN Image URLs ────────────────────────────────────────────────────────────
const IMG = {
  tableService: "https://d2xsxph8kpxj0f.cloudfront.net/310519663396807781/BUvnwzJnwMZHoEGpybj36j/skytab-table-service-hw_a5dafd96.webp",
  counterService: "https://d2xsxph8kpxj0f.cloudfront.net/310519663396807781/BUvnwzJnwMZHoEGpybj36j/skytab-counter-service-hw_38d22d74.webp",
  air: "https://d2xsxph8kpxj0f.cloudfront.net/310519663396807781/BUvnwzJnwMZHoEGpybj36j/skytab-air-hw_0a0ba3da.webp",
  glass: "https://d2xsxph8kpxj0f.cloudfront.net/310519663396807781/BUvnwzJnwMZHoEGpybj36j/skytab-glass-hw_953104a9.webp",
  kiosk: "https://d2xsxph8kpxj0f.cloudfront.net/310519663396807781/BUvnwzJnwMZHoEGpybj36j/skytab-kiosk-hw_7197fe7e.webp",
  thermalPrinter: "https://d2xsxph8kpxj0f.cloudfront.net/310519663396807781/BUvnwzJnwMZHoEGpybj36j/skytab-thermal-printer_65a20e41.webp",
  dotMatrix: "https://d2xsxph8kpxj0f.cloudfront.net/310519663396807781/BUvnwzJnwMZHoEGpybj36j/skytab-dot-matrix-printer_84477158.webp",
  kds: "https://d2xsxph8kpxj0f.cloudfront.net/310519663396807781/BUvnwzJnwMZHoEGpybj36j/skytab-kds_f2ce3045.webp",
  kdsBumpBar: "https://d2xsxph8kpxj0f.cloudfront.net/310519663396807781/BUvnwzJnwMZHoEGpybj36j/skytab-kds-bump-bar_88ca8f3b.webp",
  digitalScale: "https://d2xsxph8kpxj0f.cloudfront.net/310519663396807781/BUvnwzJnwMZHoEGpybj36j/skytab-digital-scale_755d852e.webp",
  callerID: "https://d2xsxph8kpxj0f.cloudfront.net/310519663396807781/BUvnwzJnwMZHoEGpybj36j/skytab-caller-id_c49bf078.webp",
};

// ─── Data ──────────────────────────────────────────────────────────────────────
const FREE_FEATURES = [
  "Online Ordering", "Loyalty Program", "Marketing Tools",
  "Reservations & Waitlist", "QR Code Solutions", "Reporting & Analytics",
  "Lighthouse Business Manager", "Local onsite installation",
  "24/7 phone & chat support", "Lifetime hardware replacements",
];

const BUNDLES = [
  {
    id: "table",
    name: "Table Service",
    price: 29.99,
    priceNote: "/month per station",
    subNote: "",
    img: IMG.tableService,
    desc: "Full-service restaurants, bars, and venues where servers take orders and payments tableside.",
    bestFor: ["Full Service Restaurants", "Bars & Nightclubs", "Fine Dining", "Breweries"],
    includes: [
      "SkyTab POS workstation (14\" HD touchscreen)",
      "Integrated card reader",
      "Stainless steel cash drawer",
      "Thermal receipt printer",
      "TP-Link router + cables",
      "SkyTab POS software",
    ],
  },
  {
    id: "counter",
    name: "Counter Service",
    price: 59.98,
    priceNote: "/month per station",
    subNote: "Includes POS + customer-facing display",
    img: IMG.counterService,
    desc: "Quick-service, fast casual, coffee shops, and any concept where guests order at the counter.",
    bestFor: ["Quick Service / Fast Casual", "Coffee Shops", "Food Trucks", "Pizza / Delivery"],
    includes: [
      "SkyTab POS workstation (14\" HD touchscreen)",
      "Interactive customer-facing display",
      "Integrated card reader",
      "Stainless steel cash drawer",
      "Thermal receipt printer",
      "TP-Link router + cables",
      "SkyTab POS software",
    ],
  },
];

interface HardwareItem {
  id: string;
  name: string;
  desc: string;
  price: number;
  img: string;
  tags: string[];
}

const HARDWARE_ITEMS: HardwareItem[] = [
  {
    id: "air",
    name: "SkyTab Air",
    desc: "Handheld tableside ordering & payments. 6.5\" touchscreen, 4G LTE + WiFi, all-day battery, integrated receipt printer.",
    price: 29.99,
    img: IMG.air,
    tags: ["6.5\" IPS Touchscreen", "4G LTE + WiFi", "All-Day Battery", "Chip/Swipe/NFC"],
  },
  {
    id: "glass",
    name: "SkyTab Glass",
    desc: "Sleek 8-inch mobile POS for upscale tableside ordering and payments at the table.",
    price: 29.99,
    img: IMG.glass,
    tags: ["8\" HD Touchscreen", "WiFi + Bluetooth", "Lightweight Design", "Chip/Swipe/NFC"],
  },
  {
    id: "kiosk",
    name: "SkyTab Kiosk",
    desc: "Self-service ordering kiosk that increases check averages 15–30% and reduces front-of-house labor.",
    price: 29.99,
    img: IMG.kiosk,
    tags: ["22\" Touchscreen", "ADA Compliant", "Custom Branding", "Integrated Payments"],
  },
];

interface AccessoryItem {
  id: string;
  name: string;
  desc: string;
  img: string;
  type: "qty" | "radio";
  options?: { id: string; label: string; price: number }[];
  price?: number;
}

const ACCESSORY_ITEMS: AccessoryItem[] = [
  {
    id: "thermal",
    name: "Remote Thermal Printer",
    desc: "High-speed 80mm direct-thermal receipt or kitchen printer for remote stations.",
    img: IMG.thermalPrinter,
    type: "qty",
    price: 9.99,
  },
  {
    id: "dotmatrix",
    name: "Remote Dot Matrix Printer",
    desc: "Durable impact printer ideal for kitchen environments with heat, moisture, and grease.",
    img: IMG.dotMatrix,
    type: "qty",
    price: 9.99,
  },
  {
    id: "kds",
    name: "Kitchen Display System",
    desc: "Commercial-grade kitchen display with real-time order routing and color-coded aging.",
    img: IMG.kds,
    type: "radio",
    options: [
      { id: "kds16", label: "16\" Screen", price: 29.99 },
      { id: "kds22", label: "22\" Screen", price: 29.99 },
    ],
  },
  {
    id: "bumpbar",
    name: "KDS Bump Bar",
    desc: "Wired bump bar for hands-free KDS ticket management — perfect for busy kitchen stations.",
    img: IMG.kdsBumpBar,
    type: "qty",
    price: 9.99,
  },
  {
    id: "scale",
    name: "Digital Scale",
    desc: "Integrated digital scale for weight-based menu items. Syncs directly with SkyTab POS for accurate pricing by pound or ounce.",
    img: IMG.digitalScale,
    type: "qty",
    price: 39.99,
  },
  {
    id: "callerid",
    name: "Caller ID",
    desc: "Automatically pull up customer profiles when they call. Choose the line capacity that fits your call volume.",
    img: IMG.callerID,
    type: "radio",
    options: [
      { id: "caller2", label: "2-Line Caller ID", price: 9.99 },
      { id: "caller4", label: "4-Line Caller ID", price: 19.99 },
    ],
  },
];

const PROCESSING_PLANS = [
  {
    id: "standard",
    icon: "💳",
    name: "Standard Pricing",
    desc: "Pay a straightforward rate on all credit card transactions. No surprises, no monthly minimums.",
    highlight: "2.75% + $0.15 per transaction",
  },
  {
    id: "advantage",
    icon: "📈",
    name: "Advantage Program",
    desc: "Offset operational costs and improve your bottom line. Choose from three compliant options to pass fees to card-paying guests.",
    highlight: "Offset your processing costs",
  },
  {
    id: "custom",
    icon: "🤝",
    name: "Custom Quote",
    desc: "Request a tailored quote based on your volume, business type, and specific processing needs.",
    highlight: "Personalized pricing",
  },
];

// ─── Types ─────────────────────────────────────────────────────────────────────
type BundleId = "table" | "counter";
type ProcessingId = "standard" | "advantage" | "custom";

interface ConfigState {
  bundle: BundleId | null;
  stations: number;
  hardware: Record<string, number>; // id -> qty
  accessories: Record<string, number>; // id -> qty
  accessoryRadio: Record<string, string>; // accessory id -> selected option id
  processing: ProcessingId | null;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────
function calcTotal(state: ConfigState): number {
  const bundle = BUNDLES.find((b) => b.id === state.bundle);
  const bundleTotal = bundle ? bundle.price * state.stations : 0;

  const hwTotal = HARDWARE_ITEMS.reduce((sum, item) => {
    return sum + item.price * (state.hardware[item.id] || 0);
  }, 0);

  const accTotal = ACCESSORY_ITEMS.reduce((sum, item) => {
    if (item.type === "qty") {
      return sum + (item.price || 0) * (state.accessories[item.id] || 0);
    } else {
      const selectedId = state.accessoryRadio[item.id];
      if (!selectedId) return sum;
      const opt = item.options?.find((o) => o.id === selectedId);
      const qty = state.accessories[item.id] || 0;
      return sum + (opt ? opt.price * qty : 0);
    }
  }, 0);

  return bundleTotal + hwTotal + accTotal;
}

// ─── Sub-components ────────────────────────────────────────────────────────────
function QtyControl({ value, onChange, min = 0, max = 20 }: { value: number; onChange: (v: number) => void; min?: number; max?: number }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-8 h-8 rounded-lg border border-gray-200 text-[#0d1b2a] font-bold hover:border-[#169fa8] hover:text-[#169fa8] transition-colors flex items-center justify-center text-lg leading-none"
      >−</button>
      <span className="w-7 text-center font-bold text-[#0d1b2a]" style={{ fontFamily: 'Sora, sans-serif' }}>{value}</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        className="w-8 h-8 rounded-lg border border-gray-200 text-[#0d1b2a] font-bold hover:border-[#169fa8] hover:text-[#169fa8] transition-colors flex items-center justify-center text-lg leading-none"
      >+</button>
    </div>
  );
}

function StepIndicator({ step, current }: { step: number; current: number }) {
  const labels = ["Bundle", "Hardware", "Accessories", "Processing"];
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {[1, 2, 3, 4].map((s, i) => (
        <div key={s} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
              s < current ? "bg-[#22c55e] text-white" :
              s === current ? "bg-[#169fa8] text-white" :
              "bg-gray-200 text-gray-400"
            }`}>
              {s < current ? <CheckCircle size={14} /> : s}
            </div>
            <span className={`text-xs mt-1 font-medium ${s === current ? "text-[#169fa8]" : "text-gray-400"}`}>{labels[i]}</span>
          </div>
          {i < 3 && (
            <div className={`w-12 sm:w-20 h-0.5 mb-5 mx-1 transition-all ${s < current ? "bg-[#22c55e]" : "bg-gray-200"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Order Summary ─────────────────────────────────────────────────────────────
function OrderSummary({ state, total }: { state: ConfigState; total: number }) {
  const bundle = BUNDLES.find((b) => b.id === state.bundle);
  const lineItems: { label: string; price: number }[] = [];

  if (bundle) {
    lineItems.push({ label: `${bundle.name} × ${state.stations}`, price: bundle.price * state.stations });
  }
  HARDWARE_ITEMS.forEach((item) => {
    const qty = state.hardware[item.id] || 0;
    if (qty > 0) lineItems.push({ label: `${item.name} × ${qty}`, price: item.price * qty });
  });
  ACCESSORY_ITEMS.forEach((item) => {
    if (item.type === "qty") {
      const qty = state.accessories[item.id] || 0;
      if (qty > 0) lineItems.push({ label: `${item.name} × ${qty}`, price: (item.price || 0) * qty });
    } else {
      const selectedId = state.accessoryRadio[item.id];
      const qty = state.accessories[item.id] || 0;
      if (selectedId && qty > 0) {
        const opt = item.options?.find((o) => o.id === selectedId);
        if (opt) lineItems.push({ label: `${item.name} (${opt.label}) × ${qty}`, price: opt.price * qty });
      }
    }
  });

  return (
    <div className="sticky top-24 bg-white rounded-2xl border border-gray-100 shadow-lg p-5">
      <div className="text-[#0d1b2a] font-bold text-sm mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>Your Order</div>
      {lineItems.length === 0 ? (
        <div className="text-center py-6 text-gray-400 text-xs">Select a bundle to see your estimate</div>
      ) : (
        <div className="space-y-1.5 mb-3">
          {lineItems.map((item, i) => (
            <div key={i} className="flex justify-between text-xs text-gray-600">
              <span className="truncate mr-2">{item.label}</span>
              <span className="shrink-0">${item.price.toFixed(2)}/mo</span>
            </div>
          ))}
        </div>
      )}
      <div className="border-t border-gray-100 pt-3 mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-gray-500">Due Today</span>
          <span className="font-bold text-[#0d1b2a] text-sm">$0.00</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">Est. Monthly</span>
          <span className="font-extrabold text-[#169fa8] text-xl">${total.toFixed(2)}</span>
        </div>
      </div>
      <div className="space-y-1.5 text-xs text-gray-400 mb-4">
        <div className="flex items-center gap-1.5"><CheckCircle size={10} className="text-[#22c55e]" /> $0 upfront cost</div>
        <div className="flex items-center gap-1.5"><CheckCircle size={10} className="text-[#22c55e]" /> Lifetime hardware warranty</div>
        <div className="flex items-center gap-1.5"><CheckCircle size={10} className="text-[#22c55e]" /> Local installation included</div>
        <div className="flex items-center gap-1.5"><CheckCircle size={10} className="text-[#22c55e]" /> 24/7 support</div>
      </div>
      <Link href="/consultation" className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#169fa8] hover:bg-[#127d85] text-white font-semibold text-sm transition-colors">
        Get a Custom Quote <ArrowRight size={14} />
      </Link>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function SkyTabPOSBuilder() {
  const [step, setStep] = useState(1);
  const [state, setState] = useState<ConfigState>({
    bundle: null,
    stations: 1,
    hardware: {},
    accessories: {},
    accessoryRadio: {},
    processing: null,
  });

  const total = calcTotal(state);
  const canContinue = step === 1 ? !!state.bundle : step === 4 ? !!state.processing : true;

  const setHwQty = (id: string, qty: number) =>
    setState((s) => ({ ...s, hardware: { ...s.hardware, [id]: qty } }));

  const setAccQty = (id: string, qty: number) =>
    setState((s) => ({ ...s, accessories: { ...s.accessories, [id]: qty } }));

  const setAccRadio = (id: string, optId: string) =>
    setState((s) => ({
      ...s,
      accessoryRadio: { ...s.accessoryRadio, [id]: optId },
      accessories: { ...s.accessories, [id]: Math.max(1, s.accessories[id] || 1) },
    }));

  return (
    <section className="py-16 bg-[#f4f7fa]">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="teal-divider mx-auto mb-4" />
          <div className="inline-flex items-center gap-2 bg-[#169fa8]/10 text-[#169fa8] text-xs font-semibold px-3 py-1.5 rounded-full mb-3 uppercase tracking-widest">
            SkyTab POS Configurator
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0d1b2a] mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
            Build Your SkyTab POS System
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
            Select a bundle, customize your hardware and accessories, and get a UBC Unlimited Solution Specialist to handle installation and onboarding.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5 mt-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5"><CheckCircle size={13} className="text-[#169fa8]" /> $0 Upfront Cost</span>
            <span className="flex items-center gap-1.5"><CheckCircle size={13} className="text-[#169fa8]" /> Local Installation</span>
            <span className="flex items-center gap-1.5"><CheckCircle size={13} className="text-[#169fa8]" /> Lifetime Hardware Warranty</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Configurator */}
          <div className="lg:col-span-2">
            <StepIndicator step={step} current={step} />

            {/* ── Step 1: Bundle ── */}
            {step === 1 && (
              <div className="space-y-5">
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <h3 className="font-bold text-[#0d1b2a] mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>Choose Your Service Type</h3>
                  <p className="text-gray-400 text-xs mb-5">Select the service style that best fits your restaurant, then set how many POS stations you need.</p>
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    {BUNDLES.map((b) => (
                      <button
                        key={b.id}
                        onClick={() => setState((s) => ({ ...s, bundle: b.id as BundleId }))}
                        className={`text-left rounded-xl border-2 overflow-hidden transition-all ${state.bundle === b.id ? "border-[#169fa8] bg-[#169fa8]/5" : "border-gray-200 hover:border-[#169fa8]/40"}`}
                      >
                        <div className="bg-[#f4f7fa] p-4 flex items-center justify-center h-36">
                          <img src={b.img} alt={b.name} className="max-h-full max-w-full object-contain" />
                        </div>
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-[#0d1b2a]" style={{ fontFamily: 'Sora, sans-serif' }}>{b.name}</span>
                            {state.bundle === b.id && <CheckCircle size={15} className="text-[#169fa8]" />}
                          </div>
                          <p className="text-gray-500 text-xs mb-3 leading-relaxed">{b.desc}</p>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {b.bestFor.map((tag) => (
                              <span key={tag} className="text-[10px] bg-[#169fa8]/10 text-[#169fa8] px-2 py-0.5 rounded-full">{tag}</span>
                            ))}
                          </div>
                          <div className="border-t border-gray-100 pt-3">
                            <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1.5 font-medium">Bundle Includes</div>
                            <div className="space-y-1">
                              {b.includes.map((item) => (
                                <div key={item} className="flex items-center gap-1.5 text-xs text-gray-600">
                                  <CheckCircle size={10} className="text-[#169fa8] shrink-0" /> {item}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <span className="text-[#169fa8] font-extrabold text-lg">${b.price}</span>
                            <span className="text-gray-400 text-xs ml-1">{b.priceNote}</span>
                            {b.subNote && <div className="text-gray-400 text-[10px] mt-0.5">{b.subNote}</div>}
                            <div className="text-[#22c55e] text-xs font-semibold mt-0.5">$0 upfront cost</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Station count */}
                  {state.bundle && (
                    <div className="border-t border-gray-100 pt-5">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="font-semibold text-[#0d1b2a] text-sm" style={{ fontFamily: 'Sora, sans-serif' }}>Number of POS Stations</div>
                          <div className="text-gray-400 text-xs">{state.stations} station{state.stations > 1 ? "s" : ""} × ${BUNDLES.find(b => b.id === state.bundle)!.price}/mo = <strong className="text-[#169fa8]">${(BUNDLES.find(b => b.id === state.bundle)!.price * state.stations).toFixed(2)}/mo</strong></div>
                        </div>
                        <QtyControl value={state.stations} onChange={(v) => setState((s) => ({ ...s, stations: v }))} min={1} max={20} />
                      </div>
                      {state.stations >= 20 && (
                        <p className="text-xs text-gray-400">Need more than 20 stations? <Link href="/consultation" className="text-[#169fa8] underline">Contact us for an enterprise quote.</Link></p>
                      )}
                    </div>
                  )}

                  {/* Free features */}
                  {state.bundle && (
                    <div className="mt-5 bg-[#0d1b2a] rounded-xl p-4">
                      <div className="text-white/50 text-[10px] uppercase tracking-widest font-medium mb-2">Included Free with Every Bundle</div>
                      <div className="grid grid-cols-2 gap-1.5">
                        {FREE_FEATURES.map((f) => (
                          <div key={f} className="flex items-center gap-1.5 text-xs text-white/70">
                            <CheckCircle size={10} className="text-[#22c55e] shrink-0" /> {f}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── Step 2: Hardware ── */}
            {step === 2 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h3 className="font-bold text-[#0d1b2a] mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>Add Hardware</h3>
                <p className="text-gray-400 text-xs mb-5">Add mobile devices and self-service kiosks to your setup. All items are billed monthly per unit with $0 upfront.</p>
                <div className="space-y-4">
                  {HARDWARE_ITEMS.map((item) => {
                    const qty = state.hardware[item.id] || 0;
                    return (
                      <div key={item.id} className={`flex gap-4 p-4 rounded-xl border-2 transition-all ${qty > 0 ? "border-[#169fa8] bg-[#169fa8]/5" : "border-gray-100 hover:border-gray-200"}`}>
                        <div className="w-20 h-20 bg-[#f4f7fa] rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                          <img src={item.img} alt={item.name} className="max-h-full max-w-full object-contain p-1" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="font-bold text-[#0d1b2a] text-sm" style={{ fontFamily: 'Sora, sans-serif' }}>{item.name}</div>
                              <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{item.desc}</p>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {item.tags.map((t) => <span key={t} className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{t}</span>)}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-[#169fa8] font-bold text-sm">${item.price.toFixed(2)}<span className="text-gray-400 font-normal text-xs">/mo each</span></span>
                            <QtyControl value={qty} onChange={(v) => setHwQty(item.id, v)} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Step 3: Accessories ── */}
            {step === 3 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h3 className="font-bold text-[#0d1b2a] mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>Back-of-House & Accessories</h3>
                <p className="text-gray-400 text-xs mb-5">Add printers, kitchen displays, and other accessories to complete your setup.</p>
                <div className="space-y-4">
                  {ACCESSORY_ITEMS.map((item) => {
                    const qty = state.accessories[item.id] || 0;
                    const selectedRadio = state.accessoryRadio[item.id];
                    const isActive = item.type === "qty" ? qty > 0 : !!selectedRadio;
                    return (
                      <div key={item.id} className={`p-4 rounded-xl border-2 transition-all ${isActive ? "border-[#169fa8] bg-[#169fa8]/5" : "border-gray-100 hover:border-gray-200"}`}>
                        <div className="flex gap-4">
                          <div className="w-16 h-16 bg-[#f4f7fa] rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                            <img src={item.img} alt={item.name} className="max-h-full max-w-full object-contain p-1" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-[#0d1b2a] text-sm" style={{ fontFamily: 'Sora, sans-serif' }}>{item.name}</div>
                            <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                        <div className="mt-3">
                          {item.type === "qty" && (
                            <div className="flex items-center justify-between">
                              <span className="text-[#169fa8] font-bold text-sm">${item.price!.toFixed(2)}<span className="text-gray-400 font-normal text-xs">/mo each</span></span>
                              <QtyControl value={qty} onChange={(v) => setAccQty(item.id, v)} />
                            </div>
                          )}
                          {item.type === "radio" && (
                            <div className="space-y-2">
                              {item.options!.map((opt) => (
                                <button
                                  key={opt.id}
                                  onClick={() => setAccRadio(item.id, opt.id)}
                                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border text-sm transition-all ${selectedRadio === opt.id ? "border-[#169fa8] bg-[#169fa8]/10 text-[#169fa8] font-semibold" : "border-gray-200 text-gray-600 hover:border-[#169fa8]/40"}`}
                                >
                                  <span>{opt.label}</span>
                                  <span className="font-bold">${opt.price.toFixed(2)}/mo each</span>
                                </button>
                              ))}
                              {selectedRadio && (
                                <div className="flex items-center justify-between pt-1">
                                  <span className="text-xs text-gray-500">Quantity</span>
                                  <QtyControl value={qty} onChange={(v) => setAccQty(item.id, v)} min={1} />
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Step 4: Processing ── */}
            {step === 4 && (
              <div className="space-y-4">
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <h3 className="font-bold text-[#0d1b2a] mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>Credit Card Processing</h3>
                  <p className="text-gray-400 text-xs mb-2">Choose how you want to handle payment processing fees. All options are fully compliant and supported by Shift4 Payments.</p>
                  <div className="flex flex-wrap gap-2 mb-5 text-xs text-gray-500">
                    {["Visa", "Mastercard", "AMEX", "Discover", "Apple Pay", "Google Pay", "Crypto"].map((c) => (
                      <span key={c} className="bg-gray-100 px-2 py-0.5 rounded">{c}</span>
                    ))}
                  </div>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {PROCESSING_PLANS.map((plan) => (
                      <button
                        key={plan.id}
                        onClick={() => setState((s) => ({ ...s, processing: plan.id as ProcessingId }))}
                        className={`text-left p-4 rounded-xl border-2 transition-all ${state.processing === plan.id ? "border-[#169fa8] bg-[#169fa8]/5" : "border-gray-200 hover:border-[#169fa8]/40"}`}
                      >
                        <div className="text-2xl mb-2">{plan.icon}</div>
                        <div className="font-bold text-[#0d1b2a] text-sm mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>{plan.name}</div>
                        <p className="text-gray-500 text-xs mb-3 leading-relaxed">{plan.desc}</p>
                        <div className="text-[#169fa8] font-semibold text-xs">{plan.highlight}</div>
                        {state.processing === plan.id && (
                          <div className="mt-2 flex items-center gap-1 text-[#169fa8] text-xs font-semibold">
                            <CheckCircle size={11} /> Selected
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {state.processing && (
                  <div className="bg-[#0d1b2a] rounded-2xl p-6 text-center">
                    <div className="text-white font-bold text-lg mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>Ready to Get Started?</div>
                    <p className="text-white/60 text-sm mb-4">A UBC Unlimited Solution Specialist will reach out within one business day to confirm your order, walk you through agreements, and schedule installation.</p>
                    <div className="flex flex-wrap gap-3 justify-center text-xs text-white/50 mb-5">
                      <span className="flex items-center gap-1.5"><CheckCircle size={11} className="text-[#22c55e]" /> No commitment required</span>
                      <span className="flex items-center gap-1.5"><CheckCircle size={11} className="text-[#22c55e]" /> Local onsite installation</span>
                      <span className="flex items-center gap-1.5"><CheckCircle size={11} className="text-[#22c55e]" /> Response within 1 business day</span>
                    </div>
                    <Link href="/consultation" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#169fa8] hover:bg-[#127d85] text-white font-semibold text-sm transition-colors">
                      Submit My Order <ArrowRight size={15} />
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-5">
              {step > 1 ? (
                <button onClick={() => setStep((s) => s - 1)} className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 text-[#0d1b2a] text-sm font-medium hover:border-[#169fa8]/40 transition-colors">
                  <ChevronLeft size={15} /> Back
                </button>
              ) : <div />}
              {step < 4 && (
                <button
                  onClick={() => canContinue && setStep((s) => s + 1)}
                  disabled={!canContinue}
                  className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${canContinue ? "bg-[#169fa8] hover:bg-[#127d85] text-white" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
                >
                  Continue <ChevronRight size={15} />
                </button>
              )}
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary state={state} total={total} />
          </div>
        </div>
      </div>
    </section>
  );
}
