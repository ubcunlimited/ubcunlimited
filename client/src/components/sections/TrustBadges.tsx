import { Shield, Clock, Users, Award, HeadphonesIcon, TrendingDown } from "lucide-react";

const badges = [
  { icon: Shield, label: "PCI Compliant", sub: "Secure & certified" },
  { icon: Clock, label: "24/7 Support", sub: "Always available" },
  { icon: TrendingDown, label: "Low Rates", sub: "Competitive pricing" },
  { icon: Users, label: "Local Experts", sub: "Utah-based team" },
  { icon: Award, label: "Top Rated", sub: "5-star service" },
  { icon: HeadphonesIcon, label: "Fast Setup", sub: "Same-day approval" },
];

interface TrustBadgesProps {
  dark?: boolean;
}

export default function TrustBadges({ dark = false }: TrustBadgesProps) {
  return (
    <div className={`py-8 border-y ${dark ? "bg-[#0a1628] border-white/10" : "bg-white border-gray-100"}`}>
      <div className="container">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
          {badges.map((badge) => (
            <div key={badge.label} className="flex flex-col items-center text-center gap-1.5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${dark ? "bg-[#169fa8]/10 text-[#169fa8]" : "bg-[#169fa8]/10 text-[#169fa8]"}`}>
                <badge.icon size={20} />
              </div>
              <div className={`text-xs font-semibold ${dark ? "text-white" : "text-[#040c1c]"}`}>{badge.label}</div>
              <div className={`text-[10px] ${dark ? "text-white/40" : "text-gray-400"}`}>{badge.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
