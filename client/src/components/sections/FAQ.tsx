import { useState } from "react";
import type React from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
  dark?: boolean;
}

export default function FAQ({ items, title = "Frequently Asked Questions", subtitle, dark = false }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className={`py-16 ${dark ? "bg-[#080808]" : "bg-[#f8fafc]"}`}>
      <div className="container">
        <div className="max-w-3xl mx-auto">
          {title && (
            <div className="text-center mb-10">
              <div className="teal-divider mx-auto mb-4" />
              <h2 className={`text-3xl font-bold mb-3 ${dark ? "text-white" : "text-[#080808]"}`} style={{ fontFamily: 'Sora, sans-serif' }}>
                {title}
              </h2>
              {subtitle && <p className={`text-base ${dark ? "text-white/60" : "text-gray-600"}`}>{subtitle}</p>}
            </div>
          )}
          <div className="space-y-3">
            {items.map((item, i) => (
              <div
                key={i}
                className={`rounded-xl border transition-all ${
                  dark
                    ? `border-white/10 ${openIndex === i ? "bg-white/5" : "bg-white/[0.02] hover:bg-white/5"}`
                    : `border-gray-200 ${openIndex === i ? "bg-white shadow-md" : "bg-white hover:shadow-sm"}`
                }`}
              >
                <button
                  className={`w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-sm ${dark ? "text-white" : "text-[#080808]"}`}
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 ml-4 transition-transform text-[#c9a84c] ${openIndex === i ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className={`px-5 pb-4 text-sm leading-relaxed ${dark ? "text-white/60" : "text-gray-600"}`}>
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
