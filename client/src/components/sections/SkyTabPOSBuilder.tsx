/**
 * SkyTabPOSBuilder — Interactive POS configurator for restaurant pages
 * Design: Modern Fintech Edge — dark navy/teal, Sora font, UBC Unlimited brand
 * Based on the Build Your POS tool from skytabmountainwest.com
 */
import { useState } from "react";
import { CheckCircle, ArrowRight, Monitor, Tablet, Printer, Wifi, ShoppingBag, ChevronRight } from "lucide-react";
import { Link } from "wouter";

type ServiceType = "table" | "counter" | null;

const TABLE_BUNDLE = {
  name: "Table Service",
  price: 29.99,
  label: "Full-service restaurants, bars, and venues where servers take orders and payments tableside.",
  bestFor: ["Full Service Restaurants", "Bars & Nightclubs", "Fine Dining", "Breweries"],
  includes: [
    "SkyTab POS workstation (14\" HD touchscreen)",
    "Integrated card reader",
    "Stainless steel cash drawer",
    "Thermal receipt printer",
    "TP-Link router + cables",
    "SkyTab POS software",
  ],
};

const COUNTER_BUNDLE = {
  name: "Counter Service",
  price: 59.98,
  label: "Quick-service, fast casual, coffee shops, and any concept where guests order at the counter.",
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
};

const FREE_FEATURES = [
  "Online Ordering",
  "Loyalty Program",
  "Marketing Tools",
  "Reservations & Waitlist",
  "QR Code Solutions",
  "Reporting & Analytics",
  "Lighthouse Business Manager",
  "Local onsite installation",
  "24/7 phone & chat support",
  "Lifetime hardware replacements",
];

const ADDONS = [
  { id: "handheld", label: "SkyTab Air Handheld", desc: "Tableside ordering & payments", price: 15, icon: Tablet },
  { id: "kds", label: "Kitchen Display System", desc: "Real-time kitchen order display", price: 20, icon: Monitor },
  { id: "printer2", label: "Extra Receipt Printer", desc: "Additional thermal printer", price: 8, icon: Printer },
  { id: "kiosk", label: "Self-Order Kiosk", desc: "Guest-facing ordering kiosk", price: 35, icon: ShoppingBag },
  { id: "online", label: "Online Ordering Upgrade", desc: "Custom branded ordering page", price: 0, icon: Wifi },
];

export default function SkyTabPOSBuilder() {
  const [serviceType, setServiceType] = useState<ServiceType>(null);
  const [stations, setStations] = useState(1);
  const [addons, setAddons] = useState<string[]>([]);

  const bundle = serviceType === "table" ? TABLE_BUNDLE : serviceType === "counter" ? COUNTER_BUNDLE : null;
  const baseMonthly = bundle ? bundle.price * stations : 0;
  const addonMonthly = addons.reduce((sum, id) => {
    const a = ADDONS.find((x) => x.id === id);
    return sum + (a ? a.price : 0);
  }, 0);
  const totalMonthly = baseMonthly + addonMonthly;

  const toggleAddon = (id: string) => {
    setAddons((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

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
            Select your service type, customize your hardware, and get an instant monthly estimate. UBC Unlimited handles local installation and onboarding.
          </p>
          <div className="flex items-center justify-center gap-6 mt-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5"><CheckCircle size={13} className="text-[#169fa8]" /> $0 Upfront Cost</span>
            <span className="flex items-center gap-1.5"><CheckCircle size={13} className="text-[#169fa8]" /> Local Installation</span>
            <span className="flex items-center gap-1.5"><CheckCircle size={13} className="text-[#169fa8]" /> Lifetime Hardware Warranty</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Configurator */}
          <div className="lg:col-span-2 space-y-5">

            {/* Step 1: Service Type */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-full bg-[#169fa8] text-white text-xs font-bold flex items-center justify-center">1</div>
                <h3 className="font-bold text-[#0d1b2a]" style={{ fontFamily: 'Sora, sans-serif' }}>Choose Your Service Type</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Table Service */}
                <button
                  onClick={() => setServiceType("table")}
                  className={`text-left p-4 rounded-xl border-2 transition-all ${serviceType === "table" ? "border-[#169fa8] bg-[#169fa8]/5" : "border-gray-200 hover:border-[#169fa8]/40"}`}
                >
                  <div className="font-bold text-[#0d1b2a] mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>Table Service</div>
                  <p className="text-gray-500 text-xs mb-3 leading-relaxed">{TABLE_BUNDLE.label}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {TABLE_BUNDLE.bestFor.map((b) => (
                      <span key={b} className="text-[10px] bg-[#169fa8]/10 text-[#169fa8] px-2 py-0.5 rounded-full">{b}</span>
                    ))}
                  </div>
                  <div className="text-[#169fa8] font-bold text-lg">${TABLE_BUNDLE.price}<span className="text-gray-400 text-xs font-normal">/mo per station</span></div>
                  {serviceType === "table" && (
                    <div className="mt-2 flex items-center gap-1.5 text-[#169fa8] text-xs font-semibold">
                      <CheckCircle size={13} /> Selected
                    </div>
                  )}
                </button>

                {/* Counter Service */}
                <button
                  onClick={() => setServiceType("counter")}
                  className={`text-left p-4 rounded-xl border-2 transition-all ${serviceType === "counter" ? "border-[#169fa8] bg-[#169fa8]/5" : "border-gray-200 hover:border-[#169fa8]/40"}`}
                >
                  <div className="font-bold text-[#0d1b2a] mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>Counter Service</div>
                  <p className="text-gray-500 text-xs mb-3 leading-relaxed">{COUNTER_BUNDLE.label}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {COUNTER_BUNDLE.bestFor.map((b) => (
                      <span key={b} className="text-[10px] bg-[#169fa8]/10 text-[#169fa8] px-2 py-0.5 rounded-full">{b}</span>
                    ))}
                  </div>
                  <div className="text-[#169fa8] font-bold text-lg">${COUNTER_BUNDLE.price}<span className="text-gray-400 text-xs font-normal">/mo per station</span></div>
                  {serviceType === "counter" && (
                    <div className="mt-2 flex items-center gap-1.5 text-[#169fa8] text-xs font-semibold">
                      <CheckCircle size={13} /> Selected
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Step 2: Stations — only show after service type selected */}
            {serviceType && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 rounded-full bg-[#169fa8] text-white text-xs font-bold flex items-center justify-center">2</div>
                  <h3 className="font-bold text-[#0d1b2a]" style={{ fontFamily: 'Sora, sans-serif' }}>Number of POS Stations</h3>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setStations(Math.max(1, stations - 1))}
                    className="w-9 h-9 rounded-lg border border-gray-200 text-[#0d1b2a] font-bold text-lg hover:border-[#169fa8] hover:text-[#169fa8] transition-colors flex items-center justify-center"
                  >−</button>
                  <span className="text-2xl font-extrabold text-[#0d1b2a] w-8 text-center" style={{ fontFamily: 'Sora, sans-serif' }}>{stations}</span>
                  <button
                    onClick={() => setStations(Math.min(20, stations + 1))}
                    className="w-9 h-9 rounded-lg border border-gray-200 text-[#0d1b2a] font-bold text-lg hover:border-[#169fa8] hover:text-[#169fa8] transition-colors flex items-center justify-center"
                  >+</button>
                  <span className="text-sm text-gray-500">station{stations > 1 ? "s" : ""}</span>
                </div>
                <div className="mt-4 p-3 bg-[#f4f7fa] rounded-lg">
                  <div className="text-xs text-gray-500 mb-2 font-medium">Bundle includes per station:</div>
                  <div className="grid sm:grid-cols-2 gap-1">
                    {bundle!.includes.map((item) => (
                      <div key={item} className="flex items-center gap-1.5 text-xs text-gray-600">
                        <CheckCircle size={11} className="text-[#169fa8] shrink-0" /> {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Add-ons */}
            {serviceType && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 rounded-full bg-[#169fa8] text-white text-xs font-bold flex items-center justify-center">3</div>
                  <h3 className="font-bold text-[#0d1b2a]" style={{ fontFamily: 'Sora, sans-serif' }}>Optional Add-Ons</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {ADDONS.map((addon) => {
                    const selected = addons.includes(addon.id);
                    return (
                      <button
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition-all ${selected ? "border-[#169fa8] bg-[#169fa8]/5" : "border-gray-200 hover:border-[#169fa8]/40"}`}
                      >
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${selected ? "bg-[#169fa8] text-white" : "bg-gray-100 text-gray-500"}`}>
                          <addon.icon size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-[#0d1b2a] text-sm">{addon.label}</div>
                          <div className="text-gray-400 text-xs">{addon.desc}</div>
                        </div>
                        <div className="text-right shrink-0">
                          {addon.price === 0 ? (
                            <span className="text-[#169fa8] text-xs font-semibold">Free</span>
                          ) : (
                            <span className="text-[#0d1b2a] text-sm font-bold">+${addon.price}/mo</span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Free features */}
            {serviceType && (
              <div className="bg-[#0d1b2a] rounded-2xl p-6">
                <div className="text-white/50 text-xs uppercase tracking-widest font-medium mb-3">Included Free with Every Bundle</div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {FREE_FEATURES.map((f) => (
                    <div key={f} className="flex items-center gap-1.5 text-xs text-white/70">
                      <CheckCircle size={11} className="text-[#22c55e] shrink-0" /> {f}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
              <div className="text-[#0d1b2a] font-bold text-base mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Your Estimate</div>

              {!serviceType ? (
                <div className="text-center py-8 text-gray-400 text-sm">
                  Select a service type to see your estimate
                </div>
              ) : (
                <>
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>{bundle!.name} × {stations}</span>
                      <span>${(bundle!.price * stations).toFixed(2)}/mo</span>
                    </div>
                    {addons.map((id) => {
                      const a = ADDONS.find((x) => x.id === id)!;
                      return (
                        <div key={id} className="flex justify-between text-gray-600">
                          <span>{a.label}</span>
                          <span>{a.price === 0 ? "Free" : `+$${a.price}/mo`}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="border-t border-gray-100 pt-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Due Today</span>
                      <span className="font-bold text-[#0d1b2a]">$0.00</span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-sm text-gray-500">Est. Monthly</span>
                      <span className="font-extrabold text-[#169fa8] text-xl">${totalMonthly.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-gray-400 mb-5">
                    <div className="flex items-center gap-1.5"><CheckCircle size={11} className="text-[#22c55e]" /> $0 upfront cost</div>
                    <div className="flex items-center gap-1.5"><CheckCircle size={11} className="text-[#22c55e]" /> Lifetime hardware warranty</div>
                    <div className="flex items-center gap-1.5"><CheckCircle size={11} className="text-[#22c55e]" /> Local installation included</div>
                    <div className="flex items-center gap-1.5"><CheckCircle size={11} className="text-[#22c55e]" /> 24/7 support</div>
                  </div>
                </>
              )}

              <Link
                href="/consultation"
                className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-[#169fa8] hover:bg-[#127d85] text-white font-semibold text-sm transition-colors"
              >
                Get a Custom Quote <ArrowRight size={15} />
              </Link>
              <Link
                href="https://skytabmountainwest.com/build-your-pos"
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl border border-gray-200 hover:border-[#169fa8]/40 text-[#0d1b2a] text-sm mt-2 transition-colors"
              >
                Full Configurator at SkyTab MW <ChevronRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
