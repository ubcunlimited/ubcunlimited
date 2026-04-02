import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";
import { Eye, EyeOff, Lock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const DOCS_SESSION_KEY = "ubc_docs_auth";

interface DocsAuthGateProps {
  children: React.ReactNode;
}

/**
 * Wraps internal documentation pages.
 * Renders an inline password prompt until the correct password is entered.
 * Authentication state is stored in sessionStorage — clears when the tab closes.
 * Reuses the same server-side password as the agent portal (AGENT_PORTAL_PASSWORD).
 */
export default function DocsAuthGate({ children }: DocsAuthGateProps) {
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Check sessionStorage on mount
  useEffect(() => {
    const isAuth = sessionStorage.getItem(DOCS_SESSION_KEY) === "true";
    setAuthorized(isAuth);
  }, []);

  const verify = trpc.agent.verifyPassword.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        sessionStorage.setItem(DOCS_SESSION_KEY, "true");
        setAuthorized(true);
      } else {
        setError("Incorrect password. Contact your UBC administrator for access.");
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
      setError("Please enter the access password.");
      return;
    }
    verify.mutate({ password });
  };

  // Still checking sessionStorage
  if (authorized === null) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-[#c9a84c] rounded-full animate-spin" />
      </div>
    );
  }

  // Authorized — render the protected content
  if (authorized) {
    return <>{children}</>;
  }

  // Not authorized — show inline password gate
  return (
    <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center px-4">
      {/* Card */}
      <div className="w-full max-w-sm bg-[#111] border border-white/10 rounded-2xl p-8 shadow-2xl">
        {/* Icon */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#c9a84c]/10 border border-[#c9a84c]/20 flex items-center justify-center">
            <Shield size={24} className="text-[#c9a84c]" />
          </div>
        </div>

        {/* Heading */}
        <h1
          className="text-xl font-bold text-white text-center mb-1"
          style={{ fontFamily: "Sora, sans-serif" }}
        >
          Internal Documentation
        </h1>
        <p className="text-white/70 text-sm text-center mb-6">
          This page is restricted to UBC Unlimited administrators. Enter the access password to continue.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Lock
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none"
            />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Access password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-9 pr-10 bg-white/5 border-white/10 text-white placeholder:text-white/60 focus:border-[#c9a84c]/50 focus:ring-[#c9a84c]/20"
              autoFocus
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white/60 transition-colors"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>

          {error && (
            <p className="text-red-400 text-xs text-center">{error}</p>
          )}

          <Button
            type="submit"
            className="w-full bg-[#c9a84c] hover:bg-[#b8963e] text-[#080808] font-semibold"
            disabled={verify.isPending}
          >
            {verify.isPending ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-[#080808]/30 border-t-[#080808] rounded-full animate-spin" />
                Verifying…
              </span>
            ) : (
              "Access Documentation"
            )}
          </Button>
        </form>
      </div>

      {/* Back link */}
      <a
        href="/"
        className="mt-6 text-xs text-white/60 hover:text-white/60 transition-colors"
      >
        ← Back to ubcunlimited.com
      </a>
    </div>
  );
}
