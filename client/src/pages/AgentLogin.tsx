import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Eye, EyeOff, Lock, Shield, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SEO from "@/components/SEO";

const AGENT_SESSION_KEY = "ubc_agent_portal_auth";

export default function AgentLogin() {
  const [, navigate] = useLocation();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // If already authenticated, redirect immediately
  useEffect(() => {
    if (sessionStorage.getItem(AGENT_SESSION_KEY) === "true") {
      navigate("/agent-iso");
    }
  }, [navigate]);

  const verify = trpc.agent.verifyPassword.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        sessionStorage.setItem(AGENT_SESSION_KEY, "true");
        navigate("/agent-iso");
      } else {
        setError("Incorrect password. Please try again or contact your UBC representative.");
      }
    },
    onError: () => {
      setError("Something went wrong. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!password.trim()) {
      setError("Please enter the portal password.");
      return;
    }
    verify.mutate({ password });
  };

  return (
    <>
      <SEO
        title="Agent & ISO Partner Portal"
        description="Secure login for UBC Unlimited Agent and ISO partners."
        noIndex={true}
      />

      <div className="min-h-screen bg-[#080808] flex flex-col">
        {/* Header */}
        <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 group">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663396807781/BUvnwzJnwMZHoEGpybj36j/ubc-logo-gold_1c9c9d5b.png"
              alt="UBC Unlimited"
              className="h-10 w-auto"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <span
              className="text-white font-bold text-lg tracking-tight hidden sm:block"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              UBC Unlimited
            </span>
          </a>
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <Shield size={14} className="text-[#c9a84c]" />
            <span>Secure Partner Portal</span>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="w-full max-w-md">
            {/* Card */}
            <div className="bg-[#111111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              {/* Card header band */}
              <div className="bg-gradient-to-r from-[#c9a84c]/20 via-[#c9a84c]/10 to-transparent border-b border-[#c9a84c]/20 px-8 py-6">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-9 h-9 rounded-lg bg-[#c9a84c]/15 border border-[#c9a84c]/30 flex items-center justify-center">
                    <Lock size={16} className="text-[#c9a84c]" />
                  </div>
                  <div>
                    <p className="text-[#c9a84c] text-xs font-bold uppercase tracking-widest">
                      Partner Access
                    </p>
                    <h1
                      className="text-white text-xl font-bold leading-tight"
                      style={{ fontFamily: "Sora, sans-serif" }}
                    >
                      Agent & ISO Portal
                    </h1>
                  </div>
                </div>
              </div>

              {/* Card body */}
              <div className="px-8 py-8">
                <p className="text-white/70 text-sm mb-6 leading-relaxed">
                  This portal is for authorized UBC Unlimited agents and ISO partners only. Enter your portal password to continue.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter portal password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                      }}
                      className="bg-white/5 border-white/15 text-white placeholder:text-white/60 focus:border-[#c9a84c]/60 focus:ring-[#c9a84c]/20 pr-11 h-11"
                      autoComplete="current-password"
                      disabled={verify.isPending}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white/60 transition-colors"
                      tabIndex={-1}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>

                  {error && (
                    <p className="text-red-400 text-sm flex items-start gap-2">
                      <span className="mt-0.5 shrink-0">⚠</span>
                      {error}
                    </p>
                  )}

                  <Button
                    type="submit"
                    disabled={verify.isPending || !password.trim()}
                    className="w-full bg-[#c9a84c] hover:bg-[#b8963e] text-[#080808] font-bold h-11 text-sm gap-2"
                  >
                    {verify.isPending ? (
                      <>
                        <span className="animate-spin inline-block w-4 h-4 border-2 border-[#080808]/30 border-t-[#080808] rounded-full" />
                        Verifying…
                      </>
                    ) : (
                      <>
                        Access Partner Portal
                        <ArrowRight size={15} />
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-white/60 text-xs text-center">
                    Don't have access?{" "}
                    <a
                      href="mailto:info@ubcunlimited.com"
                      className="text-[#c9a84c] hover:underline"
                    >
                      Contact your UBC representative
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Trust signals */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-5 text-white/60 text-xs">
              <div className="flex items-center gap-1.5">
                <CheckCircle size={12} className="text-[#c9a84c]/60" />
                Password verified server-side
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle size={12} className="text-[#c9a84c]/60" />
                Session-only access
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle size={12} className="text-[#c9a84c]/60" />
                Not publicly indexed
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/10 px-6 py-4 text-center text-white/70 text-xs">
          © {new Date().getFullYear()} UBC Unlimited. All rights reserved. · This page is not publicly accessible.
        </footer>
      </div>
    </>
  );
}
