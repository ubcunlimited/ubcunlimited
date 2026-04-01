/**
 * SkyTabPOSBuilder — Full 4-step interactive POS configurator
 * Design: Modern Fintech Edge — dark navy/teal, Sora font, UBC Unlimited brand
 * Steps: 1. Bundle  2. Hardware  3. Accessories  4. Processing + Order Form
 * All product images sourced directly from skytabmountainwest.com / skytab.com
 */
import { useState } from "react";
import { CheckCircle, ArrowRight, ChevronLeft, ChevronRight, Send } from "lucide-react";
import { trackLead } from "@/lib/pixel";
import { useRecaptcha } from "@/hooks/useRecaptcha";

// ─── CDN Image URLs (correct sources from skytabmountainwest.com) ──────────────
const IMG = {
  tableService: "https://d2xsxph8kpxj0f.cloudfront.net/310519663396807781/BUvnwzJnwMZHoEGpybj36j/st-table-service_78712795.webp",
  counterService: "https://d2xsxph8kpxj0f.cloudfront.net/310519663396807781/BUvnwzJnwMZHoEGpybj36j/st-counter-service_47ad432d.webp",
  air: "https://d2xsxph8kpxj0f.cloudfront.net/310519663396807781/BUvnwzJnwMZHoEGpybj36j/st-air_24cf047b.webp",
  glass: "https://d2xsxph8kpxj0f.cloudfront.net/310519663396807781/BUvnwzJnwMZHoEGpybj36j/st-glass_087fe917.webp",
  kiosk: "https://d2xsxph8kpxj0f.cloudfront.net/310519663396807781/BUvnwzJnwMZHoEGpybj36j/st-kiosk_86132708.webp",
  thermalPrinter: "https://d2xsxph8kpxj0f.cloudfront.net/310519663396807781/BUvnwzJnwMZHoEGpybj36j/st-thermal-printer_dc8f7da3.webp",
  dotMatrix: "https://d2xsxph8kpxj0f.cloudfront.net/310519663396807781/BUvnwzJnwMZHoEGpybj36j/st-dot-matrix_c9dd8b23.webp",
  kds: "https://d2xsxph8kpxj0f.cloudfront.net/310519663396807781/BUvnwzJnwMZHoEGpybj36j/st-kds_06721bca.webp",
  kdsBumpBar: "https://d2xsxph8kpxj0f.cloudfront.net/310519663396807781/BUvnwzJnwMZHoEGpybj36j/st-bump-bar_27f738b6.webp",
  digitalScale: "https://d2xsxph8kpxj0f.cloudfront.net/310519663396807781/BUvnwzJnwMZHoEGpybj36j/st-scale_6f31b37c.webp",
  callerID: "https://d2xsxph8kpxj0f.cloudfront.net/310519663396807781/BUvnwzJnwMZHoEGpybj36j/st-caller-id_02cee2cf.webp",
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

const BUSINESS_TYPES = [
  "Full-Service Restaurant", "Quick-Service / Fast Casual", "Bar / Nightclub",
  "Coffee Shop", "Food Truck", "Pizza / Delivery", "Brewery / Taproom",
  "Fine Dining", "Catering", "Other",
];

const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
  "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire",
  "New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio",
  "Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota",
  "Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia",
  "Wisconsin","Wyoming",
];

// ─── Types ─────────────────────────────────────────────────────────────────────
type BundleId = "table" | "counter";
type ProcessingId = "standard" | "advantage" | "custom";

interface ConfigState {
  bundle: BundleId | null;
  stations: number;
  hardware: Record<string, number>;
  accessories: Record<string, number>;
  accessoryRadio: Record<string, string>;
  processing: ProcessingId | null;
}

interface FormState {
  firstName: string;
  lastName: string;
  businessName: string;
  phone: string;
  email: string;
  businessType: string;
  state: string;
  city: string;
  currentPOS: string;
  notes: string;
  consent: boolean;
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

function buildOrderSummaryText(state: ConfigState, total: number): string {
  const bundle = BUNDLES.find((b) => b.id === state.bundle);
  const lines: string[] = [];
  if (bundle) lines.push(`${bundle.name} × ${state.stations} station(s): $${(bundle.price * state.stations).toFixed(2)}/mo`);
  HARDWARE_ITEMS.forEach((item) => {
    const qty = state.hardware[item.id] || 0;
    if (qty > 0) lines.push(`${item.name} × ${qty}: $${(item.price * qty).toFixed(2)}/mo`);
  });
  ACCESSORY_ITEMS.forEach((item) => {
    if (item.type === "qty") {
      const qty = state.accessories[item.id] || 0;
      if (qty > 0) lines.push(`${item.name} × ${qty}: $${((item.price || 0) * qty).toFixed(2)}/mo`);
    } else {
      const selectedId = state.accessoryRadio[item.id];
      const qty = state.accessories[item.id] || 0;
      if (selectedId && qty > 0) {
        const opt = item.options?.find((o) => o.id === selectedId);
        if (opt) lines.push(`${item.name} (${opt.label}) × ${qty}: $${(opt.price * qty).toFixed(2)}/mo`);
      }
    }
  });
  const proc = PROCESSING_PLANS.find((p) => p.id === state.processing);
  if (proc) lines.push(`Processing: ${proc.name}`);
  lines.push(`Est. Monthly Total: $${total.toFixed(2)}/mo`);
  return lines.join("\n");
}

// ─── Sub-components ────────────────────────────────────────────────────────────
function QtyControl({ value, onChange, min = 0, max = 20 }: { value: number; onChange: (v: number) => void; min?: number; max?: number }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-8 h-8 rounded-lg border border-gray-200 text-[#080808] font-bold hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors flex items-center justify-center text-lg leading-none"
      >−</button>
      <span className="w-7 text-center font-bold text-[#080808]" style={{ fontFamily: 'Sora, sans-serif' }}>{value}</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        className="w-8 h-8 rounded-lg border border-gray-200 text-[#080808] font-bold hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors flex items-center justify-center text-lg leading-none"
      >+</button>
    </div>
  );
}

function StepIndicator({ current }: { current: number }) {
  const labels = ["Bundle", "Hardware", "Accessories", "Processing"];
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {[1, 2, 3, 4].map((s, i) => (
        <div key={s} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
              s < current ? "bg-[#22c55e] text-white" :
              s === current ? "bg-[#c9a84c] text-white" :
              "bg-gray-200 text-gray-400"
            }`}>
              {s < current ? <CheckCircle size={14} /> : s}
            </div>
            <span className={`text-xs mt-1 font-medium ${s === current ? "text-[#c9a84c]" : "text-gray-400"}`}>{labels[i]}</span>
          </div>
          {i < 3 && (
            <div className={`w-12 sm:w-20 h-0.5 mb-5 mx-1 transition-all ${s < current ? "bg-[#22c55e]" : "bg-gray-200"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

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
      <div className="text-[#080808] font-bold text-sm mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>Your Order</div>
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
          <span className="font-bold text-[#080808] text-sm">$0.00</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">Est. Monthly</span>
          <span className="font-extrabold text-[#c9a84c] text-xl">${total.toFixed(2)}</span>
        </div>
      </div>
      <div className="space-y-1.5 text-xs text-gray-400">
        <div className="flex items-center gap-1.5"><CheckCircle size={10} className="text-[#22c55e]" /> $0 upfront cost</div>
        <div className="flex items-center gap-1.5"><CheckCircle size={10} className="text-[#22c55e]" /> Lifetime hardware warranty</div>
        <div className="flex items-center gap-1.5"><CheckCircle size={10} className="text-[#22c55e]" /> Local installation included</div>
        <div className="flex items-center gap-1.5"><CheckCircle size={10} className="text-[#22c55e]" /> 24/7 support</div>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function SkyTabPOSBuilder() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [config, setConfig] = useState<ConfigState>({
    bundle: null,
    stations: 1,
    hardware: {},
    accessories: {},
    accessoryRadio: {},
    processing: null,
  });

  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    businessName: "",
    phone: "",
    email: "",
    businessType: "",
    state: "",
    city: "",
    currentPOS: "",
    notes: "",
    consent: false,
  });

  const total = calcTotal(config);
  const canContinue = step === 1 ? !!config.bundle : step === 4 ? !!config.processing : true;

  const setHwQty = (id: string, qty: number) =>
    setConfig((s) => ({ ...s, hardware: { ...s.hardware, [id]: qty } }));

  const setAccQty = (id: string, qty: number) =>
    setConfig((s) => ({ ...s, accessories: { ...s.accessories, [id]: qty } }));

  const setAccRadio = (id: string, optId: string) =>
    setConfig((s) => ({
      ...s,
      accessoryRadio: { ...s.accessoryRadio, [id]: optId },
      accessories: { ...s.accessories, [id]: Math.max(1, s.accessories[id] || 1) },
    }));

  const updateForm = (field: keyof FormState, value: string | boolean) =>
    setForm((f) => ({ ...f, [field]: value }));

  const isFormValid = form.firstName && form.lastName && form.businessName &&
    form.phone && form.email && form.businessType && form.state && form.city && form.consent;

  const { getToken } = useRecaptcha();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setSubmitting(true);
    await getToken("submit_skytab_order");

    const orderSummary = buildOrderSummaryText(config, total);
    const proc = PROCESSING_PLANS.find((p) => p.id === config.processing);

    // Build mailto body as fallback (no backend needed)
    const subject = encodeURIComponent(`SkyTab POS Order — ${form.businessName}`);
    const body = encodeURIComponent(
      `NEW SKYTAB POS ORDER\n\n` +
      `Name: ${form.firstName} ${form.lastName}\n` +
      `Business: ${form.businessName}\n` +
      `Phone: ${form.phone}\n` +
      `Email: ${form.email}\n` +
      `Business Type: ${form.businessType}\n` +
      `Location: ${form.city}, ${form.state}\n` +
      `Current POS: ${form.currentPOS || "None"}\n\n` +
      `--- ORDER SUMMARY ---\n${orderSummary}\n\n` +
      `Processing Plan: ${proc?.name || ""}\n\n` +
      `Additional Notes:\n${form.notes || "None"}`
    );

    // Simulate a brief submission delay for UX
    await new Promise((r) => setTimeout(r, 800));
    // Open mailto for the order details, then redirect to thank-you
    window.open(`mailto:info@ubcunlimited.com?subject=${subject}&body=${body}`, "_blank");
    setSubmitting(false);
    setSubmitted(true);
    trackLead();
    setTimeout(() => { window.location.href = "/thank-you"; }, 1500);
  };

  if (submitted) {
    return (
      <section className="py-16 bg-[#f7f3ec]">
        <div className="container max-w-2xl text-center">
          <div role="status" aria-live="polite" aria-atomic="true" className="bg-white rounded-2xl border border-gray-100 shadow-lg p-12">
            <div className="w-16 h-16 bg-[#22c55e]/10 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle size={32} className="text-[#22c55e]" />
            </div>
            <h3 className="text-2xl font-extrabold text-[#080808] mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>Order Submitted!</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Thank you, <strong>{form.firstName}</strong>! A UBC Unlimited Solution Specialist will reach out within one business day to confirm your order, walk you through agreements, and schedule your local installation.
            </p>
            <div className="bg-[#f7f3ec] rounded-xl p-4 text-left text-xs text-gray-500 space-y-1 mb-6">
              <div className="font-semibold text-[#080808] mb-2">Your Configuration</div>
              {buildOrderSummaryText(config, total).split("\n").map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
            <button
              onClick={() => { setSubmitted(false); setStep(1); setConfig({ bundle: null, stations: 1, hardware: {}, accessories: {}, accessoryRadio: {}, processing: null }); setForm({ firstName: "", lastName: "", businessName: "", phone: "", email: "", businessType: "", state: "", city: "", currentPOS: "", notes: "", consent: false }); }}
              className="text-[#c9a84c] text-sm font-semibold hover:underline"
            >
              Start a new configuration
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-[#f7f3ec]">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 text-[#c9a84c] text-xs font-semibold px-3 py-1.5 rounded-full mb-3 uppercase tracking-widest">
            SkyTab POS Configurator
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#080808] mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
            Build Your SkyTab POS System
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
            Select a bundle, customize your hardware and accessories, and get a UBC Unlimited Solution Specialist to handle installation and onboarding.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5 mt-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5"><CheckCircle size={13} className="text-[#c9a84c]" /> $0 Upfront Cost</span>
            <span className="flex items-center gap-1.5"><CheckCircle size={13} className="text-[#c9a84c]" /> Local Installation</span>
            <span className="flex items-center gap-1.5"><CheckCircle size={13} className="text-[#c9a84c]" /> Lifetime Hardware Warranty</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Configurator */}
          <div className="lg:col-span-2">
            <StepIndicator current={step} />

            {/* ── Step 1: Bundle ── */}
            {step === 1 && (
              <div className="space-y-5">
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <h3 className="font-bold text-[#080808] mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>Choose Your Service Type</h3>
                  <p className="text-gray-400 text-xs mb-5">Select the service style that best fits your restaurant, then set how many POS stations you need.</p>
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    {BUNDLES.map((b) => (
                      <button
                        key={b.id}
                        onClick={() => setConfig((s) => ({ ...s, bundle: b.id as BundleId }))}
                        className={`text-left rounded-xl border-2 overflow-hidden transition-all ${config.bundle === b.id ? "border-[#c9a84c] bg-[#c9a84c]/5" : "border-gray-200 hover:border-[#c9a84c]/40"}`}
                      >
                        <div className="bg-[#f7f3ec] p-4 flex items-center justify-center h-40">
                          <img src={b.img} alt={b.name} className="max-h-full max-w-full object-contain" />
                        </div>
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-[#080808]" style={{ fontFamily: 'Sora, sans-serif' }}>{b.name}</span>
                            {config.bundle === b.id && <CheckCircle size={15} className="text-[#c9a84c]" />}
                          </div>
                          <p className="text-gray-500 text-xs mb-3 leading-relaxed">{b.desc}</p>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {b.bestFor.map((tag) => (
                              <span key={tag} className="text-[10px] bg-[#c9a84c]/10 text-[#c9a84c] px-2 py-0.5 rounded-full">{tag}</span>
                            ))}
                          </div>
                          <div className="border-t border-gray-100 pt-3">
                            <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1.5 font-medium">Bundle Includes</div>
                            <div className="space-y-1">
                              {b.includes.map((item) => (
                                <div key={item} className="flex items-center gap-1.5 text-xs text-gray-600">
                                  <CheckCircle size={10} className="text-[#c9a84c] shrink-0" /> {item}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <span className="text-[#c9a84c] font-extrabold text-lg">${b.price}</span>
                            <span className="text-gray-400 text-xs ml-1">{b.priceNote}</span>
                            {b.subNote && <div className="text-gray-400 text-[10px] mt-0.5">{b.subNote}</div>}
                            <div className="text-[#22c55e] text-xs font-semibold mt-0.5">$0 upfront cost</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {config.bundle && (
                    <div className="border-t border-gray-100 pt-5">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="font-semibold text-[#080808] text-sm" style={{ fontFamily: 'Sora, sans-serif' }}>Number of POS Stations</div>
                          <div className="text-gray-400 text-xs">{config.stations} station{config.stations > 1 ? "s" : ""} × ${BUNDLES.find(b => b.id === config.bundle)!.price}/mo = <strong className="text-[#c9a84c]">${(BUNDLES.find(b => b.id === config.bundle)!.price * config.stations).toFixed(2)}/mo</strong></div>
                        </div>
                        <QtyControl value={config.stations} onChange={(v) => setConfig((s) => ({ ...s, stations: v }))} min={1} max={20} />
                      </div>
                      {config.stations >= 20 && (
                        <p className="text-xs text-gray-400">Need more than 20 stations? <a href="/contact" className="text-[#c9a84c] underline">Contact us for an enterprise quote.</a></p>
                      )}
                    </div>
                  )}

                  {config.bundle && (
                    <div className="mt-5 bg-[#080808] rounded-xl p-4">
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
                <h3 className="font-bold text-[#080808] mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>Add Hardware</h3>
                <p className="text-gray-400 text-xs mb-5">Add mobile devices and self-service kiosks to your setup. All items are billed monthly per unit with $0 upfront.</p>
                <div className="space-y-4">
                  {HARDWARE_ITEMS.map((item) => {
                    const qty = config.hardware[item.id] || 0;
                    return (
                      <div key={item.id} className={`flex gap-4 p-4 rounded-xl border-2 transition-all ${qty > 0 ? "border-[#c9a84c] bg-[#c9a84c]/5" : "border-gray-100 hover:border-gray-200"}`}>
                        <div className="w-20 h-20 bg-[#f7f3ec] rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                          <img src={item.img} alt={item.name} className="max-h-full max-w-full object-contain p-1" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-[#080808] text-sm" style={{ fontFamily: 'Sora, sans-serif' }}>{item.name}</div>
                          <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{item.desc}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {item.tags.map((t) => <span key={t} className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{t}</span>)}
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-[#c9a84c] font-bold text-sm">${item.price.toFixed(2)}<span className="text-gray-400 font-normal text-xs">/mo each</span></span>
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
                <h3 className="font-bold text-[#080808] mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>Back-of-House & Accessories</h3>
                <p className="text-gray-400 text-xs mb-5">Add printers, kitchen displays, and other accessories to complete your setup.</p>
                <div className="space-y-4">
                  {ACCESSORY_ITEMS.map((item) => {
                    const qty = config.accessories[item.id] || 0;
                    const selectedRadio = config.accessoryRadio[item.id];
                    const isActive = item.type === "qty" ? qty > 0 : !!selectedRadio;
                    return (
                      <div key={item.id} className={`p-4 rounded-xl border-2 transition-all ${isActive ? "border-[#c9a84c] bg-[#c9a84c]/5" : "border-gray-100 hover:border-gray-200"}`}>
                        <div className="flex gap-4">
                          <div className="w-16 h-16 bg-[#f7f3ec] rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                            <img src={item.img} alt={item.name} className="max-h-full max-w-full object-contain p-1" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-[#080808] text-sm" style={{ fontFamily: 'Sora, sans-serif' }}>{item.name}</div>
                            <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                        <div className="mt-3">
                          {item.type === "qty" && (
                            <div className="flex items-center justify-between">
                              <span className="text-[#c9a84c] font-bold text-sm">${item.price!.toFixed(2)}<span className="text-gray-400 font-normal text-xs">/mo each</span></span>
                              <QtyControl value={qty} onChange={(v) => setAccQty(item.id, v)} />
                            </div>
                          )}
                          {item.type === "radio" && (
                            <div className="space-y-2">
                              {item.options!.map((opt) => (
                                <button
                                  key={opt.id}
                                  onClick={() => setAccRadio(item.id, opt.id)}
                                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border text-sm transition-all ${selectedRadio === opt.id ? "border-[#c9a84c] bg-[#c9a84c]/10 text-[#c9a84c] font-semibold" : "border-gray-200 text-gray-600 hover:border-[#c9a84c]/40"}`}
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

            {/* ── Step 4: Processing + Order Form ── */}
            {step === 4 && (
              <div className="space-y-5">
                {/* Processing selection */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <h3 className="font-bold text-[#080808] mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>Credit Card Processing</h3>
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
                        onClick={() => setConfig((s) => ({ ...s, processing: plan.id as ProcessingId }))}
                        className={`text-left p-4 rounded-xl border-2 transition-all ${config.processing === plan.id ? "border-[#c9a84c] bg-[#c9a84c]/5" : "border-gray-200 hover:border-[#c9a84c]/40"}`}
                      >
                        <div className="text-2xl mb-2">{plan.icon}</div>
                        <div className="font-bold text-[#080808] text-sm mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>{plan.name}</div>
                        <p className="text-gray-500 text-xs mb-3 leading-relaxed">{plan.desc}</p>
                        <div className="text-[#c9a84c] font-semibold text-xs">{plan.highlight}</div>
                        {config.processing === plan.id && (
                          <div className="mt-2 flex items-center gap-1 text-[#c9a84c] text-xs font-semibold">
                            <CheckCircle size={11} /> Selected
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Order form — shown once processing is selected */}
                {config.processing && (
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                    <h3 className="font-bold text-[#080808] mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>Complete Your Order</h3>
                    <p className="text-gray-400 text-xs mb-5">A UBC Unlimited Solution Specialist will reach out within one business day to confirm your order, walk you through agreements, and schedule installation.</p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#080808] mb-1 uppercase tracking-wider">First Name <span className="text-red-400">*</span></label>
                          <input
                            type="text"
                            required
                            placeholder="Jane"
                            value={form.firstName}
                            onChange={(e) => updateForm("firstName", e.target.value)}
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-[#080808] focus:outline-none focus:border-[#c9a84c] transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#080808] mb-1 uppercase tracking-wider">Last Name <span className="text-red-400">*</span></label>
                          <input
                            type="text"
                            required
                            placeholder="Smith"
                            value={form.lastName}
                            onChange={(e) => updateForm("lastName", e.target.value)}
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-[#080808] focus:outline-none focus:border-[#c9a84c] transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#080808] mb-1 uppercase tracking-wider">Restaurant / Business Name <span className="text-red-400">*</span></label>
                        <input
                          type="text"
                          required
                          placeholder="The Mountain Grill"
                          value={form.businessName}
                          onChange={(e) => updateForm("businessName", e.target.value)}
                          className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-[#080808] focus:outline-none focus:border-[#c9a84c] transition-colors"
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#080808] mb-1 uppercase tracking-wider">Phone <span className="text-red-400">*</span></label>
                          <input
                            type="tel"
                            required
                            placeholder="(801) 555-0100"
                            value={form.phone}
                            onChange={(e) => updateForm("phone", e.target.value)}
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-[#080808] focus:outline-none focus:border-[#c9a84c] transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#080808] mb-1 uppercase tracking-wider">Email <span className="text-red-400">*</span></label>
                          <input
                            type="email"
                            required
                            placeholder="jane@yourrestaurant.com"
                            value={form.email}
                            onChange={(e) => updateForm("email", e.target.value)}
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-[#080808] focus:outline-none focus:border-[#c9a84c] transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#080808] mb-1 uppercase tracking-wider">Business Type <span className="text-red-400">*</span></label>
                          <select
                            required
                            value={form.businessType}
                            onChange={(e) => updateForm("businessType", e.target.value)}
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-[#080808] focus:outline-none focus:border-[#c9a84c] transition-colors bg-white"
                          >
                            <option value="">Select type...</option>
                            {BUSINESS_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#080808] mb-1 uppercase tracking-wider">State <span className="text-red-400">*</span></label>
                          <select
                            required
                            value={form.state}
                            onChange={(e) => updateForm("state", e.target.value)}
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-[#080808] focus:outline-none focus:border-[#c9a84c] transition-colors bg-white"
                          >
                            <option value="">Select state...</option>
                            {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#080808] mb-1 uppercase tracking-wider">City <span className="text-red-400">*</span></label>
                          <input
                            type="text"
                            required
                            placeholder="Salt Lake City"
                            value={form.city}
                            onChange={(e) => updateForm("city", e.target.value)}
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-[#080808] focus:outline-none focus:border-[#c9a84c] transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#080808] mb-1 uppercase tracking-wider">Current POS System</label>
                          <input
                            type="text"
                            placeholder="Toast, Square, Clover, None..."
                            value={form.currentPOS}
                            onChange={(e) => updateForm("currentPOS", e.target.value)}
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-[#080808] focus:outline-none focus:border-[#c9a84c] transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#080808] mb-1 uppercase tracking-wider">Additional Notes</label>
                        <textarea
                          rows={3}
                          placeholder="Any specific requirements, questions, or details about your setup..."
                          value={form.notes}
                          onChange={(e) => updateForm("notes", e.target.value)}
                          className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-[#080808] focus:outline-none focus:border-[#c9a84c] transition-colors resize-none"
                        />
                      </div>

                      {/* Consent */}
                      <div className={`p-4 rounded-xl border-2 transition-all ${form.consent ? "border-[#c9a84c] bg-[#c9a84c]/5" : "border-gray-200"}`}>
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={form.consent}
                            onChange={(e) => updateForm("consent", e.target.checked)}
                            className="mt-0.5 w-4 h-4 accent-[#c9a84c] shrink-0"
                          />
                          <span className="text-xs text-gray-600 leading-relaxed">
                            I Accept — By submitting this form, I agree that I have read and understand the{" "}
                            <a href="/legal/privacy-policy" className="text-[#c9a84c] underline">Privacy Policy</a>{" "}
                            and give my consent to UBC Unlimited to collect and process the personal information I provide. A{" "}
                            <a href="https://skytabmountainwest.com/merchant-processing-agreement.pdf" target="_blank" rel="noopener noreferrer" className="text-[#c9a84c] underline">Merchant Processing Agreement</a>{" "}
                            and{" "}
                            <a href="https://skytabmountainwest.com/pos-service-agreement.pdf" target="_blank" rel="noopener noreferrer" className="text-[#c9a84c] underline">POS Service Agreement</a>{" "}
                            are required to take advantage of the $0 upfront cost for SkyTab equipment and any free services included in this package.
                          </span>
                        </label>
                      </div>

                      <div className="flex flex-wrap gap-4 items-center justify-between pt-2">
                        <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                          <span className="flex items-center gap-1.5"><CheckCircle size={11} className="text-[#22c55e]" /> No commitment required</span>
                          <span className="flex items-center gap-1.5"><CheckCircle size={11} className="text-[#22c55e]" /> Local onsite installation</span>
                          <span className="flex items-center gap-1.5"><CheckCircle size={11} className="text-[#22c55e]" /> Response within 1 business day</span>
                        </div>
                        <button
                          type="submit"
                          disabled={!isFormValid || submitting}
                          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-colors ${isFormValid && !submitting ? "bg-[#c9a84c] hover:bg-[#127d85] text-white" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
                        >
                          {submitting ? "Submitting..." : <><Send size={14} /> Submit My Order</>}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-5">
              {step > 1 ? (
                <button onClick={() => setStep((s) => s - 1)} className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 text-[#080808] text-sm font-medium hover:border-[#c9a84c]/40 transition-colors">
                  <ChevronLeft size={15} /> Back
                </button>
              ) : <div />}
              {step < 4 && (
                <button
                  onClick={() => canContinue && setStep((s) => s + 1)}
                  disabled={!canContinue}
                  className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${canContinue ? "bg-[#c9a84c] hover:bg-[#127d85] text-white" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
                >
                  Continue <ChevronRight size={15} />
                </button>
              )}
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary state={config} total={total} />
          </div>
        </div>
      </div>
    </section>
  );
}
