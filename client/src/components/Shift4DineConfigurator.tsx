import { useState } from "react";
import { CheckCircle, ChevronRight, ChevronLeft, Monitor, Tablet, Smartphone, Tv, Users, ShoppingBag, Utensils, Scissors, Wrench, Building2, ArrowRight, Phone, Package, Printer, DollarSign, Wifi, BarChart3, Star, Plus, Minus, Info } from "lucide-react";
import { Link } from "wouter";
import { trackLead } from "@/lib/pixel";
import { useRecaptcha } from "@/hooks/useRecaptcha";
import { trpc } from "@/lib/trpc";

// ─── Types ───────────────────────────────────────────────────────────────────

interface BusinessType {
  id: string;
  icon: React.ReactNode;
  label: string;
  desc: string;
  recommended: string[];
}

interface HardwareItem {
  id: string;
  name: string;
  subtitle: string;
  desc: string;
  icon: React.ReactNode;
  badge?: string;
  highlights: string[];
  imageUrl?: string;
  isRequired?: boolean;
  category: "core" | "handheld" | "display" | "kiosk";
}

interface AddOn {
  id: string;
  name: string;
  desc: string;
  icon: React.ReactNode;
  category: "hardware" | "software";
  recommendedFor?: string[];
}

// ─── Data ────────────────────────────────────────────────────────────────────

const BUSINESS_TYPES: BusinessType[] = [
  {
    id: "full-service-restaurant",
    icon: <Utensils size={22} />,
    label: "Full-Service Restaurant",
    desc: "Table service, fine dining, bistros",
    recommended: ["skytab-pos", "skytab-air", "kds", "customer-display"],
  },
  {
    id: "quick-service",
    icon: <ShoppingBag size={22} />,
    label: "Quick-Service / Fast Casual",
    desc: "Counter service, food trucks, cafés",
    recommended: ["skytab-pos", "kds", "kiosk"],
  },
  {
    id: "bar-nightclub",
    icon: <Star size={22} />,
    label: "Bar / Nightclub",
    desc: "Bars, nightclubs, taprooms, lounges",
    recommended: ["skytab-pos", "skytab-air", "customer-display"],
  },
  {
    id: "retail",
    icon: <ShoppingBag size={22} />,
    label: "Retail",
    desc: "Boutiques, shops, specialty retail",
    recommended: ["skytab-pos", "customer-display"],
  },
  {
    id: "salon-spa",
    icon: <Scissors size={22} />,
    label: "Salon / Spa",
    desc: "Hair, nails, massage, wellness",
    recommended: ["skytab-pos", "skytab-glass"],
  },
  {
    id: "professional-services",
    icon: <Building2 size={22} />,
    label: "Professional Services",
    desc: "Medical, dental, legal, accounting",
    recommended: ["skytab-pos", "skytab-glass"],
  },
  {
    id: "automotive",
    icon: <Wrench size={22} />,
    label: "Automotive",
    desc: "Auto repair, dealerships, detail shops",
    recommended: ["skytab-pos", "skytab-air"],
  },
  {
    id: "other",
    icon: <Building2 size={22} />,
    label: "Other / Not Sure",
    desc: "Tell us about your business",
    recommended: ["skytab-pos"],
  },
];

const HARDWARE_ITEMS: HardwareItem[] = [
  {
    id: "skytab-pos",
    name: "Workstation 15",
    subtitle: "14\" HD Touchscreen",
    desc: "The command center of your operation. A sleek, commercial-grade 14\" touchscreen workstation with built-in payment terminal, integrated customer-facing display, and a lifetime hardware warranty.",
    icon: <Monitor size={28} />,
    badge: "Most Popular",
    highlights: [
      "14\" 1920×1080 HD touchscreen",
      "Built-in EMV/NFC payment terminal",
      "Integrated customer-facing display",
      "Lifetime hardware warranty",
      "Offline mode — works without internet",
    ],
    imageUrl: "https://pub-8c85f0eebb874aac86f73c425d49f1d6.r2.dev/shift4dine-workstation.jpg",
    isRequired: false,
    category: "core",
  },
  {
    id: "skytab-glass",
    name: "Shift4 Glass",
    subtitle: "8\" Tablet POS",
    desc: "A fully mobile 8\" tablet POS that runs the complete Shift4Dine software suite. Perfect for table-side ordering, counter service, or as a secondary station.",
    icon: <Tablet size={28} />,
    badge: "$29.99/mo",
    highlights: [
      "8\" optimal screen size",
      "Full POS software on a tablet",
      "Lightweight and portable",
      "Ideal for table-side service",
      "Connects to all Shift4Dine peripherals",
    ],
    category: "handheld",
  },
  {
    id: "skytab-air",
    name: "Shift4 Air",
    subtitle: "Handheld POS",
    desc: "A purpose-built handheld POS device for tableside ordering and payments. 4G + WiFi connectivity, all-day battery life, and the full Shift4Dine feature set in the palm of your hand.",
    icon: <Smartphone size={28} />,
    highlights: [
      "4G + WiFi connectivity",
      "All-day battery life",
      "EMV, NFC, and swipe payments",
      "Apple Pay & Google Pay",
      "Durable drop-resistant design",
    ],
    category: "handheld",
  },
  {
    id: "kds",
    name: "Kitchen Display System",
    subtitle: "16\" or 22\" Display",
    desc: "Connect your front-of-house to your back-of-house with a commercial-grade KDS. Available in 16\" and 22\" sizes with optional bump bar for hands-free control.",
    icon: <Tv size={28} />,
    highlights: [
      "16\" or 22\" touchscreen display",
      "Routes orders from POS and online ordering",
      "Optional bump bar with scroll wheel",
      "Tracks kitchen productivity",
      "Supports multiple prep stations",
    ],
    category: "display",
  },
  {
    id: "customer-display",
    name: "Customer-Facing Display",
    subtitle: "Guest Engagement Screen",
    desc: "Engage guests at the point of sale with a dedicated customer-facing display. Shows order details, loyalty prompts, and pre-set gratuity options to increase tip rates.",
    icon: <Monitor size={28} />,
    highlights: [
      "Displays order summary for guests",
      "Built-in loyalty program prompts",
      "Pre-set gratuity options",
      "Improves order accuracy",
      "Increases tip rates",
    ],
    category: "display",
  },
  {
    id: "kiosk",
    name: "Self-Service Kiosk",
    subtitle: "Self-Service Ordering",
    desc: "Let guests order and pay at their own pace with a self-service kiosk. Reduces wait times, increases average ticket size, and frees up staff for higher-value tasks.",
    icon: <Monitor size={28} />,
    badge: "Increase Ticket Size",
    highlights: [
      "Intuitive touchscreen interface",
      "Digital receipts & SMS notifications",
      "Increases average ticket 15–30%",
      "Reduces perceived wait times",
      "Fully integrated with Shift4Dine POS",
    ],
    category: "kiosk",
  },
];

const ADD_ONS: AddOn[] = [
  {
    id: "receipt-printer",
    name: "Receipt Printer",
    desc: "High-speed thermal receipt printer. Prints customer receipts, kitchen tickets, and end-of-day reports.",
    icon: <Printer size={20} />,
    category: "hardware",
    recommendedFor: ["full-service-restaurant", "quick-service", "retail", "bar-nightclub"],
  },
  {
    id: "cash-drawer",
    name: "Cash Drawer",
    desc: "Secure, auto-open cash drawer. Integrates directly with Shift4Dine POS for automatic open on cash transactions.",
    icon: <DollarSign size={20} />,
    category: "hardware",
    recommendedFor: ["retail", "quick-service", "bar-nightclub"],
  },
  {
    id: "online-ordering",
    name: "Online Ordering",
    desc: "Commission-free online ordering integrated directly with your Shift4Dine POS. Orders flow straight to the kitchen — no manual entry.",
    icon: <Wifi size={20} />,
    category: "software",
    recommendedFor: ["full-service-restaurant", "quick-service", "bar-nightclub"],
  },
  {
    id: "loyalty-marketing",
    name: "Loyalty & Marketing",
    desc: "Built-in loyalty program, email marketing, and automated campaigns. Reward repeat customers and drive return visits.",
    icon: <Star size={20} />,
    category: "software",
    recommendedFor: ["full-service-restaurant", "quick-service", "retail", "salon-spa"],
  },
  {
    id: "labor-management",
    name: "Labor Management",
    desc: "Employee scheduling, time clock, and labor cost reporting. Manage your team from the same platform as your POS.",
    icon: <Users size={20} />,
    category: "software",
    recommendedFor: ["full-service-restaurant", "quick-service", "bar-nightclub", "retail"],
  },
  {
    id: "reporting-analytics",
    name: "Advanced Reporting & Analytics",
    desc: "Real-time sales dashboards, item performance reports, and multi-location analytics. Access from any device, anywhere.",
    icon: <BarChart3 size={20} />,
    category: "software",
    recommendedFor: ["full-service-restaurant", "quick-service", "retail", "bar-nightclub", "professional-services"],
  },
  {
    id: "gift-cards",
    name: "Gift Cards",
    desc: "Physical and digital gift cards fully integrated with your Shift4Dine POS. Track balances, redemptions, and outstanding liability.",
    icon: <Package size={20} />,
    category: "software",
    recommendedFor: ["full-service-restaurant", "retail", "salon-spa"],
  },
  {
    id: "reservations-waitlist",
    name: "Reservations & Waitlist",
    desc: "Guest reservations, waitlist management, and table status tracking — all integrated with your Shift4Dine POS floor plan.",
    icon: <Users size={20} />,
    category: "software",
    recommendedFor: ["full-service-restaurant", "bar-nightclub"],
  },
];

// ─── Step Components ──────────────────────────────────────────────────────────

function StepIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  const steps = ["Business Type", "Core Hardware", "Add-Ons", "Your Build"];
  return (
    <div className="flex items-center justify-center gap-0 mb-8 overflow-x-auto pb-1">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const isActive = stepNum === currentStep;
        const isDone = stepNum < currentStep;
        return (
          <div key={label} className="flex items-center shrink-0">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  isDone
                    ? "bg-[#c9a84c] text-[#080808]"
                    : isActive
                    ? "bg-[#c9a84c] text-[#080808] ring-4 ring-[#c9a84c]/20"
                    : "bg-white/10 text-white/70"
                }`}
              >
                {isDone ? <CheckCircle size={16} /> : stepNum}
              </div>
              <span
                className={`text-[10px] font-medium whitespace-nowrap ${
                  isActive ? "text-[#c9a84c]" : isDone ? "text-white/60" : "text-white/60"
                }`}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`w-12 sm:w-20 h-px mx-1 mt-[-14px] transition-all ${
                  stepNum < currentStep ? "bg-[#c9a84c]" : "bg-white/15"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface Shift4DineConfiguratorProps {
  compact?: boolean; // When embedded in solution page, use compact mode
}

export default function Shift4DineConfigurator({ compact = false }: Shift4DineConfiguratorProps) {
  const [step, setStep] = useState(1);
  const [selectedBusiness, setSelectedBusiness] = useState<string | null>(null);
  const [selectedHardware, setSelectedHardware] = useState<string[]>([]);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  // Form fields for quote request
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");

  const businessType = BUSINESS_TYPES.find((b) => b.id === selectedBusiness);

  // Auto-select recommended hardware when business type is chosen
  const handleSelectBusiness = (id: string) => {
    setSelectedBusiness(id);
    const biz = BUSINESS_TYPES.find((b) => b.id === id);
    if (biz) {
      setSelectedHardware(biz.recommended);
    }
  };

  const toggleHardware = (id: string) => {
    setSelectedHardware((prev) =>
      prev.includes(id) ? prev.filter((h) => h !== id) : [...prev, id]
    );
  };

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const selectedHardwareItems = HARDWARE_ITEMS.filter((h) => selectedHardware.includes(h.id));
  const selectedAddOnItems = ADD_ONS.filter((a) => selectedAddOns.includes(a.id));

  // Recommended add-ons for the selected business type
  const recommendedAddOns = ADD_ONS.filter(
    (a) => !selectedBusiness || !a.recommendedFor || a.recommendedFor.includes(selectedBusiness)
  );

  const buildSummary = () => {
    const hw = selectedHardwareItems.map((h) => h.name).join(", ");
    const ao = selectedAddOnItems.map((a) => a.name).join(", ");
    const biz = businessType?.label ?? "Not specified";
    return `Business Type: ${biz}\nHardware: ${hw || "None selected"}\nAdd-Ons: ${ao || "None selected"}`;
  };

  const { getToken } = useRecaptcha();

  const submitShift4Dine = trpc.forms.submitShift4DineConfig.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      trackLead();
      setTimeout(() => {
        window.location.href = "/thank-you";
      }, 2000);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const recaptchaToken = await getToken("submit_skytab_configurator");
    submitShift4Dine.mutate({
      firstName,
      lastName,
      phone,
      email,
      businessName,
      businessType: businessType?.label ?? "Not specified",
      selectedHardware: selectedHardwareItems.map((h) => h.name),
      selectedAddOns: selectedAddOnItems.map((a) => a.name),
      recaptchaToken,
    });
  };

  const wrapperClass = compact
    ? "bg-[#080808] rounded-3xl border border-white/10 overflow-hidden"
    : "bg-[#080808] min-h-screen";

  const innerClass = compact ? "p-6 md:p-10" : "container py-12";

  return (
    <div className={wrapperClass}>
      <div className={innerClass}>
        {/* Header */}
        <div className="text-center mb-8">
          {!compact && (
            <div className="inline-flex items-center gap-2 bg-[#c9a84c]/15 border border-[#c9a84c]/30 rounded-full px-4 py-1.5 mb-4">
              <span className="text-[#c9a84c] text-xs font-bold uppercase tracking-widest">Interactive Configurator</span>
            </div>
          )}
          <h2
            className={`font-extrabold text-white mb-2 ${compact ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl"}`}
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            Build Your{" "}
            <span className="text-[#c9a84c]">Shift4Dine POS System</span>
          </h2>
          <p className="text-white/70 text-sm max-w-xl mx-auto">
            Tell us about your business and we'll recommend the right Shift4Dine hardware and features — then connect you with a local Utah expert for a custom quote.
          </p>
        </div>

        <StepIndicator currentStep={step} totalSteps={4} />

        {/* ── Step 1: Business Type ── */}
        {step === 1 && (
          <div>
            <h3 className="text-lg font-bold text-white text-center mb-6" style={{ fontFamily: "Sora, sans-serif" }}>
              What type of business are you?
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
              {BUSINESS_TYPES.map((biz) => (
                <button
                  key={biz.id}
                  onClick={() => handleSelectBusiness(biz.id)}
                  className={`group relative p-4 rounded-2xl border text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] ${
                    selectedBusiness === biz.id
                      ? "bg-[#c9a84c]/15 border-[#c9a84c] shadow-lg shadow-[#c9a84c]/10"
                      : "bg-white/4 border-white/10 hover:bg-white/8 hover:border-white/20"
                  }`}
                >
                  {selectedBusiness === biz.id && (
                    <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#c9a84c] flex items-center justify-center">
                      <CheckCircle size={12} className="text-[#080808]" />
                    </div>
                  )}
                  <div
                    className={`mb-3 transition-colors ${
                      selectedBusiness === biz.id ? "text-[#c9a84c]" : "text-white/70 group-hover:text-white/70"
                    }`}
                  >
                    {biz.icon}
                  </div>
                  <div
                    className={`font-bold text-sm mb-1 transition-colors ${
                      selectedBusiness === biz.id ? "text-[#c9a84c]" : "text-white"
                    }`}
                    style={{ fontFamily: "Sora, sans-serif" }}
                  >
                    {biz.label}
                  </div>
                  <div className="text-white/70 text-xs leading-snug">{biz.desc}</div>
                </button>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setStep(2)}
                disabled={!selectedBusiness}
                className="btn-gold inline-flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next: Choose Hardware <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ── Step 2: Core Hardware ── */}
        {step === 2 && (
          <div>
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold text-white mb-1" style={{ fontFamily: "Sora, sans-serif" }}>
                Select your hardware
              </h3>
              <p className="text-white/70 text-sm">
                We've pre-selected the recommended setup for{" "}
                <span className="text-[#c9a84c] font-medium">{businessType?.label}</span>. Customize as needed.
              </p>
            </div>

            {/* Hardware by category */}
            {(["core", "handheld", "display", "kiosk"] as const).map((cat) => {
              const items = HARDWARE_ITEMS.filter((h) => h.category === cat);
              const catLabels: Record<string, string> = {
                core: "POS Workstation",
                handheld: "Handheld & Tablet Devices",
                display: "Display Systems",
                kiosk: "Self-Service Kiosk",
              };
              return (
                <div key={cat} className="mb-8">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-3">{catLabels[cat]}</h4>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {items.map((hw) => {
                      const isSelected = selectedHardware.includes(hw.id);
                      return (
                        <button
                          key={hw.id}
                          onClick={() => toggleHardware(hw.id)}
                          className={`group relative p-5 rounded-2xl border text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] ${
                            isSelected
                              ? "bg-[#c9a84c]/12 border-[#c9a84c] shadow-lg shadow-[#c9a84c]/8"
                              : "bg-white/4 border-white/10 hover:bg-white/8 hover:border-white/20"
                          }`}
                        >
                          {hw.badge && (
                            <div className="absolute top-3 right-3 bg-[#c9a84c] text-[#080808] text-[10px] font-bold px-2 py-0.5 rounded-full">
                              {hw.badge}
                            </div>
                          )}
                          <div className="flex items-start gap-3 mb-3">
                            <div
                              className={`p-2 rounded-xl transition-colors ${
                                isSelected ? "bg-[#c9a84c]/20 text-[#c9a84c]" : "bg-white/8 text-white/70"
                              }`}
                            >
                              {hw.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div
                                className={`font-bold text-sm leading-snug transition-colors ${
                                  isSelected ? "text-[#c9a84c]" : "text-white"
                                }`}
                                style={{ fontFamily: "Sora, sans-serif" }}
                              >
                                {hw.name}
                              </div>
                              <div className="text-white/70 text-xs mt-0.5">{hw.subtitle}</div>
                            </div>
                          </div>
                          <p className="text-white/70 text-xs leading-relaxed mb-3">{hw.desc}</p>
                          <ul className="space-y-1">
                            {hw.highlights.slice(0, 3).map((h) => (
                              <li key={h} className="flex items-start gap-1.5 text-xs text-white/70">
                                <CheckCircle size={11} className="text-[#c9a84c]/60 mt-0.5 shrink-0" />
                                {h}
                              </li>
                            ))}
                          </ul>
                          {/* Selected indicator */}
                          <div
                            className={`absolute top-3 left-3 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                              isSelected
                                ? "bg-[#c9a84c] border-[#c9a84c]"
                                : "border-white/20 bg-transparent"
                            }`}
                          >
                            {isSelected && <CheckCircle size={11} className="text-[#080808]" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            <div className="flex items-center justify-between mt-6">
              <button
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors"
              >
                <ChevronLeft size={16} /> Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="btn-gold inline-flex items-center gap-2"
              >
                Next: Add-Ons <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ── Step 3: Add-Ons ── */}
        {step === 3 && (
          <div>
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold text-white mb-1" style={{ fontFamily: "Sora, sans-serif" }}>
                Enhance your system
              </h3>
              <p className="text-white/70 text-sm">
                Optional hardware and software add-ons recommended for{" "}
                <span className="text-[#c9a84c] font-medium">{businessType?.label}</span>.
              </p>
            </div>

            {/* Hardware add-ons */}
            <div className="mb-8">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-3">Hardware Add-Ons</h4>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {ADD_ONS.filter((a) => a.category === "hardware").map((addon) => {
                  const isSelected = selectedAddOns.includes(addon.id);
                  const isRecommended = !addon.recommendedFor || addon.recommendedFor.includes(selectedBusiness ?? "");
                  return (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddOn(addon.id)}
                      className={`group relative p-4 rounded-2xl border text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] ${
                        isSelected
                          ? "bg-[#c9a84c]/12 border-[#c9a84c]"
                          : "bg-white/4 border-white/10 hover:bg-white/8 hover:border-white/20"
                      }`}
                    >
                      {isRecommended && !isSelected && (
                        <div className="absolute top-2.5 right-2.5 text-[9px] font-bold uppercase tracking-wider text-[#c9a84c]/70 bg-[#c9a84c]/10 px-1.5 py-0.5 rounded-full">
                          Recommended
                        </div>
                      )}
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-xl transition-colors shrink-0 ${
                            isSelected ? "bg-[#c9a84c]/20 text-[#c9a84c]" : "bg-white/8 text-white/70"
                          }`}
                        >
                          {addon.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div
                            className={`font-bold text-sm leading-snug mb-1 transition-colors ${
                              isSelected ? "text-[#c9a84c]" : "text-white"
                            }`}
                            style={{ fontFamily: "Sora, sans-serif" }}
                          >
                            {addon.name}
                          </div>
                          <p className="text-white/70 text-xs leading-relaxed">{addon.desc}</p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                            isSelected ? "bg-[#c9a84c] border-[#c9a84c]" : "border-white/20"
                          }`}
                        >
                          {isSelected ? (
                            <CheckCircle size={11} className="text-[#080808]" />
                          ) : (
                            <Plus size={11} className="text-white/60" />
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Software add-ons */}
            <div className="mb-8">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-3">Software & Features</h4>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {ADD_ONS.filter((a) => a.category === "software").map((addon) => {
                  const isSelected = selectedAddOns.includes(addon.id);
                  const isRecommended = !addon.recommendedFor || addon.recommendedFor.includes(selectedBusiness ?? "");
                  return (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddOn(addon.id)}
                      className={`group relative p-4 rounded-2xl border text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] ${
                        isSelected
                          ? "bg-[#c9a84c]/12 border-[#c9a84c]"
                          : "bg-white/4 border-white/10 hover:bg-white/8 hover:border-white/20"
                      }`}
                    >
                      {isRecommended && !isSelected && (
                        <div className="absolute top-2.5 right-2.5 text-[9px] font-bold uppercase tracking-wider text-[#c9a84c]/70 bg-[#c9a84c]/10 px-1.5 py-0.5 rounded-full">
                          Recommended
                        </div>
                      )}
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-xl transition-colors shrink-0 ${
                            isSelected ? "bg-[#c9a84c]/20 text-[#c9a84c]" : "bg-white/8 text-white/70"
                          }`}
                        >
                          {addon.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div
                            className={`font-bold text-sm leading-snug mb-1 transition-colors ${
                              isSelected ? "text-[#c9a84c]" : "text-white"
                            }`}
                            style={{ fontFamily: "Sora, sans-serif" }}
                          >
                            {addon.name}
                          </div>
                          <p className="text-white/70 text-xs leading-relaxed">{addon.desc}</p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                            isSelected ? "bg-[#c9a84c] border-[#c9a84c]" : "border-white/20"
                          }`}
                        >
                          {isSelected ? (
                            <CheckCircle size={11} className="text-[#080808]" />
                          ) : (
                            <Plus size={11} className="text-white/60" />
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <button
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors"
              >
                <ChevronLeft size={16} /> Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="btn-gold inline-flex items-center gap-2"
              >
                Review Your Build <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ── Step 4: Summary & Quote ── */}
        {step === 4 && (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "Sora, sans-serif" }}>
                Your Custom Shift4Dine Build
              </h3>
              <p className="text-white/70 text-sm">
                Here's what we recommend for your{" "}
                <span className="text-[#c9a84c] font-medium">{businessType?.label}</span>. Submit your details and a local Utah expert will reach out with a custom quote.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Build Summary */}
              <div className="space-y-4">
                {/* Business type */}
                <div className="bg-white/4 border border-white/10 rounded-2xl p-5">
                  <div className="text-xs font-bold uppercase tracking-widest text-white/70 mb-3">Business Type</div>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#c9a84c]/20 flex items-center justify-center text-[#c9a84c]">
                      {businessType?.icon}
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm" style={{ fontFamily: "Sora, sans-serif" }}>{businessType?.label}</div>
                      <div className="text-white/70 text-xs">{businessType?.desc}</div>
                    </div>
                  </div>
                </div>

                {/* Hardware */}
                <div className="bg-white/4 border border-white/10 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xs font-bold uppercase tracking-widest text-white/70">Hardware Selected</div>
                    <button
                      onClick={() => setStep(2)}
                      className="text-[#c9a84c] text-xs hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                  {selectedHardwareItems.length === 0 ? (
                    <p className="text-white/60 text-sm">No hardware selected</p>
                  ) : (
                    <div className="space-y-2">
                      {selectedHardwareItems.map((hw) => (
                        <div key={hw.id} className="flex items-center gap-2.5">
                          <div className="w-6 h-6 rounded-lg bg-[#c9a84c]/15 flex items-center justify-center text-[#c9a84c]">
                            <CheckCircle size={13} />
                          </div>
                          <div>
                            <span className="text-white text-sm font-medium">{hw.name}</span>
                            <span className="text-white/60 text-xs ml-2">{hw.subtitle}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Add-Ons */}
                {selectedAddOnItems.length > 0 && (
                  <div className="bg-white/4 border border-white/10 rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-xs font-bold uppercase tracking-widest text-white/70">Add-Ons Selected</div>
                      <button
                        onClick={() => setStep(3)}
                        className="text-[#c9a84c] text-xs hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="space-y-2">
                      {selectedAddOnItems.map((ao) => (
                        <div key={ao.id} className="flex items-center gap-2.5">
                          <div className="w-6 h-6 rounded-lg bg-[#c9a84c]/15 flex items-center justify-center text-[#c9a84c]">
                            <CheckCircle size={13} />
                          </div>
                          <span className="text-white text-sm font-medium">{ao.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pricing note */}
                <div className="bg-[#c9a84c]/8 border border-[#c9a84c]/20 rounded-2xl p-4 flex items-start gap-3">
                  <Info size={16} className="text-[#c9a84c] shrink-0 mt-0.5" />
                  <p className="text-white/60 text-xs leading-relaxed">
                    Shift4Dine hardware is available at <strong className="text-white">$0 upfront</strong> with qualifying payment processing accounts. A local UBC Unlimited expert will provide exact pricing based on your business volume and setup.
                  </p>
                </div>
              </div>

              {/* Quote Request Form */}
              <div className="bg-white/4 border border-white/10 rounded-2xl p-6">
                <h4 className="font-bold text-white text-base mb-1" style={{ fontFamily: "Sora, sans-serif" }}>
                  Get Your Custom Quote
                </h4>
                <p className="text-white/70 text-xs mb-5">
                  A local Utah Shift4Dine expert will reach out within 1 business day with pricing and availability.
                </p>

                {submitted ? (
                  <div role="status" aria-live="polite" aria-atomic="true" className="text-center py-8">
                    <div className="w-14 h-14 rounded-full bg-[#c9a84c]/20 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={28} className="text-[#c9a84c]" />
                    </div>
                    <p className="text-white font-bold text-lg mb-1" style={{ fontFamily: "Sora, sans-serif" }}>Build Submitted!</p>
                    <p className="text-white/70 text-sm">We'll be in touch within 1 business day.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="First Name *"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20 transition-all"
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20 transition-all"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Business Name *"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      required
                      className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20 transition-all"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number *"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20 transition-all"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20 transition-all"
                    />
                    {/* Hidden build summary */}
                    <input type="hidden" name="build_summary" value={buildSummary()} />

                    <button
                      type="submit"
                      className="btn-gold w-full justify-center mt-2"
                    >
                      Send My Build for a Quote <ArrowRight size={15} />
                    </button>
                    <p className="text-white/70 text-[11px] text-center leading-relaxed">
                      No obligation. A local Utah expert will reach out — not a call center.
                    </p>
                  </form>
                )}

                {/* Or call */}
                <div className="mt-4 pt-4 border-t border-white/8 flex items-center gap-3">
                  <Phone size={15} className="text-[#c9a84c] shrink-0" />
                  <div>
                    <p className="text-white/70 text-xs">Prefer to talk now?</p>
                    <a href="tel:+18014620923" className="text-[#c9a84c] text-sm font-semibold hover:underline">
                      (801) 462-0923
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-start mt-6">
              <button
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors"
              >
                <ChevronLeft size={16} /> Back to Add-Ons
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
