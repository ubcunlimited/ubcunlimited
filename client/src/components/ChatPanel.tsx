/**
 * ChatPanel — Chat window panel, used inside FloatingLauncher
 * Extracted from LiveChat.tsx; no floating trigger button here.
 */

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Phone, Mail, ChevronRight, Minimize2 } from "lucide-react";
import { motion } from "framer-motion";

interface Message {
  id: number;
  from: "bot" | "user";
  text: string;
  links?: { label: string; href: string }[];
  timestamp: Date;
}

const LOGO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663396807781/BUvnwzJnwMZHoEGpybj36j/shieldubclogotransparent3_6c0e0b4a.png";

// ── Smart response engine ──────────────────────────────────────────────────
function getResponse(input: string): { text: string; links?: { label: string; href: string }[] } {
  const q = input.toLowerCase();

  if (/^(hi|hello|hey|howdy|good\s*(morning|afternoon|evening)|sup|yo)\b/.test(q)) {
    return { text: "Hi there! 👋 Welcome to UBC Unlimited — Utah's local merchant services experts. How can I help you today? You can ask me about our processing solutions, pricing, high-risk accounts, POS systems, or anything else." };
  }
  if (/cash\s*discount|cash\s*back|zero.?fee|no.?fee\s*processing|eliminate.*fee/.test(q)) {
    return { text: "Our **Cash Discount Program** allows you to eliminate credit card processing fees entirely by offering a small discount to customers who pay with cash. Most businesses see their effective processing cost drop to near zero.", links: [{ label: "Learn about Cash Discount & Dual Pricing", href: "/solutions/surcharge-cash-discount" }, { label: "Request a Quote", href: "/consultation" }] };
  }
  if (/surcharg|credit.*surcharge|pass.*fee.*customer|customer.*pay.*fee/.test(q)) {
    return { text: "**Credit Card Surcharging** lets you pass your processing fees directly to customers who pay by credit card, while debit card and cash transactions remain fee-free.", links: [{ label: "Cash Discount & Dual Pricing", href: "/solutions/surcharge-cash-discount" }, { label: "Book a Consultation", href: "/consultation" }] };
  }
  if (/dual.?pric/.test(q)) {
    return { text: "**Cash Discount & Dual Pricing** displays two prices at the point of sale — a cash price and a card price — so customers can choose how they want to pay.", links: [{ label: "Cash Discount & Dual Pricing Details", href: "/solutions/surcharge-cash-discount" }] };
  }
  if (/high.?risk|high risk|cbd|hemp|cannabis|adult|firearm|gun|travel\s*agency|nutra|supplement|vape|crypto|gaming|match\s*list|terminated|declined/.test(q)) {
    return { text: "We specialize in **high-risk merchant accounts** for businesses that have been declined or terminated by standard processors.", links: [{ label: "High-Risk Processing", href: "/solutions/high-risk-processing" }, { label: "Get a High-Risk Quote", href: "/consultation" }] };
  }
  if (/pos|point.?of.?sale|skytab|terminal|register|restaurant.*system|retail.*system/.test(q)) {
    return { text: "We offer the **SkyTab POS system** — one of the top-rated restaurant and retail POS platforms — along with countertop terminals, wireless terminals, and mobile card readers.", links: [{ label: "POS Systems", href: "/solutions/pos-systems" }, { label: "Build Your SkyTab Setup", href: "/solutions/pos-systems" }] };
  }
  if (/ecommerce|e-commerce|online.*payment|website.*payment|shopify|woocommerce|payment\s*gateway|online\s*store/.test(q)) {
    return { text: "We provide **eCommerce payment solutions** that integrate with Shopify, WooCommerce, Magento, and 350+ other platforms.", links: [{ label: "eCommerce Payments", href: "/solutions/ecommerce-payments" }] };
  }
  if (/ach|echeck|e-check|bank\s*transfer|bank\s*draft|check\s*processing/.test(q)) {
    return { text: "Our **ACH & eCheck processing** lets you accept bank-to-bank payments at a fraction of the cost of credit cards.", links: [{ label: "ACH & eCheck Processing", href: "/solutions/ach-echeck-processing" }] };
  }
  if (/rate|fee|cost|pric|how much|interchange|flat.?rate|tiered/.test(q)) {
    return { text: "Processing is priced based on your industry, monthly volume, card mix, and the pricing model that fits your business best.", links: [{ label: "Statement Review", href: "/statement-review" }, { label: "Get a Quote", href: "/consultation" }] };
  }
  if (/statement|review.*statement|analyze.*statement|current.*processor|switch/.test(q)) {
    return { text: "Our **free merchant statement review** is the fastest way to see if you're overpaying. Submit your most recent processing statement and we'll provide a line-by-line analysis.", links: [{ label: "Submit a Statement for Review", href: "/statement-review" }] };
  }
  if (/chargeback|dispute|fraud|friendly\s*fraud/.test(q)) {
    return { text: "We provide **real-time chargeback monitoring**, dispute response tools, and proactive fraud prevention.", links: [{ label: "High-Risk Processing", href: "/solutions/high-risk-processing" }] };
  }
  if (/utah|salt\s*lake|provo|ogden|st\s*george|logan|location|local|office/.test(q)) {
    return { text: "UBC Unlimited is Utah's local merchant services company. We serve businesses across the entire state.", links: [{ label: "Our Utah Locations", href: "/locations" }] };
  }
  if (/contact|phone|call|email|reach|speak|talk|human|person|agent|representative/.test(q)) {
    return { text: "You can reach our team directly:\n\n📞 **(801) 462-0923** — call or text anytime\n✉️ **info@ubcunlimited.com**", links: [{ label: "Book a Consultation", href: "/consultation" }, { label: "Contact Us", href: "/contact" }] };
  }
  if (/who\s*(are|is)\s*(you|ubc)|about\s*ubc|about\s*you|company|background|experience|years/.test(q)) {
    return { text: "**UBC Unlimited** is a Utah-based merchant services company with 20+ years of experience.", links: [{ label: "About UBC Unlimited", href: "/about" }] };
  }
  if (/thank|thanks|bye|goodbye|that.?s\s*(all|it)|no\s*(more|other)\s*question/.test(q)) {
    return { text: "You're welcome! If you have more questions later, don't hesitate to reach out. You can also call us at **(801) 462-0923** anytime. Have a great day! 🙌" };
  }
  return { text: "That's a great question! For the most accurate answer, I'd recommend speaking directly with one of our Utah-based merchant services specialists.", links: [{ label: "Book a Consultation", href: "/consultation" }, { label: "Contact Us", href: "/contact" }] };
}

function renderText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold text-[#c9a84c]">{part.slice(2, -2)}</strong>;
    }
    return part.split("\n").map((line, j, arr) => (
      <span key={`${i}-${j}`}>{line}{j < arr.length - 1 && <br />}</span>
    ));
  });
}

interface ChatPanelProps {
  onClose: () => void;
  bottomClass: string;
  bottomPx?: number;
}

export default function ChatPanel({ onClose, bottomClass, bottomPx }: ChatPanelProps) {
  const [minimized, setMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([{
    id: 0,
    from: "bot",
    text: "Hi! 👋 I'm the UBC Unlimited virtual assistant. Ask me about cash discount & dual pricing, surcharging, high-risk processing, POS systems, rates, or anything else — or type **contact** to reach our team directly.",
    timestamp: new Date(),
  }]);
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const msgId = useRef(1);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (!minimized) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [minimized, messages, scrollToBottom]);

  const sendMessage = useCallback((text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: msgId.current++, from: "user", text: text.trim(), timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const { text: responseText, links } = getResponse(text.trim());
      setMessages((prev) => [...prev, { id: msgId.current++, from: "bot", text: responseText, links, timestamp: new Date() }]);
      setTyping(false);
    }, 900 + Math.random() * 600);
  }, []);

  const formatTime = (d: Date) => d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // When minimized, close the panel entirely (user can reopen from launcher)
  useEffect(() => {
    if (minimized) onClose();
  }, [minimized, onClose]);

  return (
    <motion.div
      role="dialog"
      aria-label="UBC Unlimited live chat"
      aria-modal="false"
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      className={`fixed right-6 z-[49] w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl overflow-hidden shadow-2xl flex flex-col`}
      style={{ height: "520px", bottom: bottomPx !== undefined ? `${bottomPx}px` : undefined, boxShadow: "0 8px 40px rgba(0,0,0,0.55)" }}
    >
      {/* Header */}
      <div className="bg-[#080808] px-4 py-3 flex items-center gap-3 border-b border-white/10 shrink-0">
        <img src={LOGO_URL} alt="UBC Unlimited" className="h-8 w-auto" />
        <div className="flex-1 min-w-0">
          <div className="text-white font-semibold text-sm leading-tight" style={{ fontFamily: "Sora, sans-serif" }}>UBC Unlimited</div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white/70 text-xs">Typically replies in minutes</span>
          </div>
        </div>
        <button onClick={() => setMinimized(true)} aria-label="Minimize chat" className="text-white/70 hover:text-white transition-colors p-1"><Minimize2 size={16} /></button>
        <button onClick={onClose} aria-label="Close chat" className="text-white/70 hover:text-white transition-colors p-1"><X size={16} /></button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-[#111111] px-4 py-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[82%] ${msg.from === "user" ? "" : "flex gap-2.5"}`}>
              {msg.from === "bot" && (
                <div className="w-7 h-7 rounded-full bg-[#c9a84c]/20 border border-[#c9a84c]/30 flex items-center justify-center shrink-0 mt-0.5">
                  <MessageCircle size={13} className="text-[#c9a84c]" />
                </div>
              )}
              <div>
                <div className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${msg.from === "user" ? "bg-[#c9a84c] text-[#080808] font-medium rounded-br-sm" : "bg-[#1a1a1a] text-white/85 rounded-bl-sm border border-white/5"}`}>
                  {renderText(msg.text)}
                </div>
                {msg.links && msg.links.length > 0 && (
                  <div className="mt-2 flex flex-col gap-1.5">
                    {msg.links.map((link) => (
                      <a key={link.href} href={link.href} className="flex items-center gap-1.5 text-xs text-[#c9a84c] hover:text-[#e2c97e] transition-colors font-medium">
                        <ChevronRight size={12} /> {link.label}
                      </a>
                    ))}
                  </div>
                )}
                <div className="text-white/70 text-[10px] mt-1 px-1">{formatTime(msg.timestamp)}</div>
              </div>
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="flex gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#c9a84c]/20 border border-[#c9a84c]/30 flex items-center justify-center shrink-0">
                <MessageCircle size={13} className="text-[#c9a84c]" />
              </div>
              <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick chips */}
      <div className="bg-[#0d0d0d] px-3 py-2 flex gap-2 overflow-x-auto scrollbar-hide border-t border-white/5 shrink-0">
        {["Cash discounting", "Rates & fees", "High-risk account", "Contact team"].map((chip) => (
          <button key={chip} onClick={() => sendMessage(chip)} className="shrink-0 text-xs px-3 py-1.5 rounded-full border border-[#c9a84c]/30 text-[#c9a84c] hover:bg-[#c9a84c]/10 transition-colors whitespace-nowrap">
            {chip}
          </button>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="bg-[#080808] px-3 py-3 flex gap-2 border-t border-white/10 shrink-0">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message…"
          aria-label="Chat message input"
          className="flex-1 bg-[#1a1a1a] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#c9a84c]/50 transition-colors"
        />
        <button type="submit" disabled={!input.trim()} aria-label="Send message" className="w-9 h-9 rounded-xl bg-[#c9a84c] hover:bg-[#b8972a] disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center shrink-0">
          <Send size={15} className="text-[#080808]" />
        </button>
      </form>

      {/* Footer contact */}
      <div className="bg-[#080808] px-4 py-2 flex items-center justify-center gap-4 border-t border-white/5 shrink-0">
        <a href="tel:+18014620923" className="flex items-center gap-1.5 text-white/60 hover:text-[#c9a84c] transition-colors text-xs"><Phone size={11} /> (801) 462-0923</a>
        <span className="text-white/60">·</span>
        <a href="mailto:info@ubcunlimited.com" className="flex items-center gap-1.5 text-white/60 hover:text-[#c9a84c] transition-colors text-xs"><Mail size={11} /> info@ubcunlimited.com</a>
      </div>
    </motion.div>
  );
}
