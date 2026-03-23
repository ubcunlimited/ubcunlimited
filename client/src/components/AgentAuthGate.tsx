import { useEffect, useState } from "react";
import { useLocation } from "wouter";

const AGENT_SESSION_KEY = "ubc_agent_portal_auth";

interface AgentAuthGateProps {
  children: React.ReactNode;
}

/**
 * Wraps the Agent/ISO page. If the agent has not authenticated this session,
 * redirects to /agent-login. Authentication state is stored in sessionStorage
 * so it clears when the browser tab/window is closed.
 */
export default function AgentAuthGate({ children }: AgentAuthGateProps) {
  const [, navigate] = useLocation();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const isAuth = sessionStorage.getItem(AGENT_SESSION_KEY) === "true";
    if (isAuth) {
      setAuthorized(true);
    } else {
      navigate("/agent-login");
    }
  }, [navigate]);

  // Show nothing while checking auth (avoids flash of protected content)
  if (authorized === null) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-white/40">
          <div className="w-8 h-8 border-2 border-white/20 border-t-[#c9a84c] rounded-full animate-spin" />
          <span className="text-sm">Checking access…</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
