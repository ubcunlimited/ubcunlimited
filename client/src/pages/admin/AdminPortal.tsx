import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  LayoutDashboard,
  Inbox,
  TrendingUp,
  Search,
  Star,
  LogOut,
  RefreshCw,
  Download,
  ChevronUp,
  ChevronDown,
  AlertTriangle,
  CheckCircle,
  Info,
  Zap,
  Link2,
  Key,
  Users,
  Phone,
  Mail,
  Building2,
  Calendar,
  ArrowUpRight,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = "overview" | "leads" | "seo" | "seofix" | "testimonials";

const FORM_TYPE_LABELS: Record<string, string> = {
  consultation: "Consultation",
  quote_request: "Quote Request",
  statement_review: "Statement Review",
  hero_lead: "Homepage Lead",
  lead_capture: "Lead Capture",
  blog_lead: "Blog Lead",
  agent_lead: "Agent Lead",
  skytab_config: "Shift4Dine Config",
  skytab_order: "Shift4Dine Order",
  testimonial: "Testimonial",
};

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  contacted: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  qualified: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  closed: "bg-green-500/20 text-green-300 border-green-500/30",
  lost: "bg-red-500/20 text-red-300 border-red-500/30",
};

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar({ active, setActive, logout }: { active: Tab; setActive: (t: Tab) => void; logout: () => void }) {
  const navItems: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard size={16} /> },
    { id: "leads", label: "Lead Inbox", icon: <Inbox size={16} /> },
    { id: "seo", label: "SEO Analytics", icon: <TrendingUp size={16} /> },
    { id: "seofix", label: "AI SEO Fix", icon: <Zap size={16} /> },
    { id: "testimonials", label: "Testimonials", icon: <Star size={16} /> },
  ];
  return (
    <aside className="w-56 shrink-0 bg-zinc-900 border-r border-zinc-800 flex flex-col h-screen sticky top-0">
      <div className="px-5 py-5 border-b border-zinc-800">
        <div className="text-xs font-bold tracking-widest text-zinc-500 uppercase mb-1">UBC Unlimited</div>
        <div className="text-sm font-semibold text-white">Admin Portal</div>
      </div>
      <nav className="flex-1 p-3 space-y-0.5">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors text-left ${
              active === item.id
                ? "bg-blue-600 text-white font-medium"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>
      <div className="p-3 border-t border-zinc-800">
        <button
          onClick={logout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}

// ─── Overview Tab ─────────────────────────────────────────────────────────────

function OverviewTab() {
  const { data: stats } = trpc.admin.getLeadStats.useQuery();
  const { data: semrushKey } = trpc.admin.checkSemrushKey.useQuery();
  const { data: domainData } = trpc.admin.getDomainOverview.useQuery();

  const kpis = [
    { label: "Total Leads", value: stats?.total ?? "—", icon: <Users size={18} />, color: "text-blue-400" },
    { label: "This Week", value: stats?.thisWeek ?? "—", icon: <Calendar size={18} />, color: "text-green-400" },
    {
      label: "Top Form",
      value: stats?.byFormType?.[0] ? FORM_TYPE_LABELS[stats.byFormType[0].formType] ?? stats.byFormType[0].formType : "—",
      icon: <Inbox size={18} />,
      color: "text-purple-400",
    },
    {
      label: "Domain Score",
      value: domainData?.success && domainData.data ? domainData.data["Rk"] ?? "—" : semrushKey?.configured ? "Loading…" : "No API Key",
      icon: <TrendingUp size={18} />,
      color: "text-yellow-400",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Overview</h1>
        <p className="text-zinc-400 text-sm mt-1">Site performance at a glance</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map(kpi => (
          <Card key={kpi.label} className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-5">
              <div className={`mb-3 ${kpi.color}`}>{kpi.icon}</div>
              <div className="text-2xl font-bold text-white">{String(kpi.value)}</div>
              <div className="text-xs text-zinc-500 mt-1">{kpi.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Lead breakdown by form type */}
      {stats?.byFormType && stats.byFormType.length > 0 && (
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-zinc-300">Leads by Form Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {stats.byFormType.map(row => {
                const pct = stats.total > 0 ? Math.round((row.count / stats.total) * 100) : 0;
                return (
                  <div key={row.formType} className="flex items-center gap-3">
                    <div className="w-32 text-xs text-zinc-400 truncate">{FORM_TYPE_LABELS[row.formType] ?? row.formType}</div>
                    <div className="flex-1 bg-zinc-800 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="text-xs text-zinc-300 w-8 text-right">{row.count}</div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Status breakdown */}
      {stats?.byStatus && stats.byStatus.length > 0 && (
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-zinc-300">Pipeline Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {stats.byStatus.map(row => (
                <div key={row.status} className={`px-3 py-1.5 rounded-full text-xs font-medium border ${STATUS_COLORS[row.status] ?? "bg-zinc-700 text-zinc-300"}`}>
                  {row.status}: {row.count}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {!semrushKey?.configured && (
        <Card className="bg-amber-950/30 border-amber-800/40">
          <CardContent className="p-4 flex items-start gap-3">
            <Key size={16} className="text-amber-400 mt-0.5 shrink-0" />
            <div>
              <div className="text-sm font-medium text-amber-300">SEMrush API Key Not Configured</div>
              <div className="text-xs text-amber-400/80 mt-1">Add your SEMRUSH_API_KEY to unlock SEO Analytics, keyword rankings, and backlink data.</div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ─── Lead Inbox Tab ───────────────────────────────────────────────────────────

function LeadsTab() {
  const [formType, setFormType] = useState("all");
  const [status, setStatus] = useState("all");
  const [offset, setOffset] = useState(0);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [editingStatus, setEditingStatus] = useState<{ id: number; status: string; notes: string } | null>(null);
  const limit = 25;

  const { data, refetch } = trpc.admin.getLeads.useQuery({ formType, status, limit, offset });
  const updateStatus = trpc.admin.updateLeadStatus.useMutation({ onSuccess: () => refetch() });

  const exportCsv = () => {
    if (!data?.rows) return;
    const headers = ["ID", "Form Type", "First Name", "Last Name", "Email", "Phone", "Business", "Status", "Date"];
    const rows = data.rows.map(r => [
      r.id, r.formType, r.firstName, r.lastName, r.email, r.phone,
      r.businessName ?? "", r.status, new Date(r.createdAt).toLocaleDateString(),
    ]);
    const csv = [headers, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `leads-${new Date().toISOString().split("T")[0]}.csv`;
    a.click(); URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Lead Inbox</h1>
          <p className="text-zinc-400 text-sm mt-1">{data?.total ?? 0} total leads</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => refetch()} className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
            <RefreshCw size={14} className="mr-1.5" /> Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={exportCsv} className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
            <Download size={14} className="mr-1.5" /> Export CSV
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <Select value={formType} onValueChange={v => { setFormType(v); setOffset(0); }}>
          <SelectTrigger className="w-44 bg-zinc-900 border-zinc-700 text-zinc-300 text-sm">
            <SelectValue placeholder="All Form Types" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-700">
            <SelectItem value="all">All Form Types</SelectItem>
            {Object.entries(FORM_TYPE_LABELS).map(([k, v]) => (
              <SelectItem key={k} value={k}>{v}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={v => { setStatus(v); setOffset(0); }}>
          <SelectTrigger className="w-36 bg-zinc-900 border-zinc-700 text-zinc-300 text-sm">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-700">
            <SelectItem value="all">All Statuses</SelectItem>
            {["new", "contacted", "qualified", "closed", "lost"].map(s => (
              <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Lead Table */}
      <div className="rounded-lg border border-zinc-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-zinc-900 border-b border-zinc-800">
              <th className="text-left px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide">Contact</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide">Form</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide hidden md:table-cell">Business</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide">Status</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide hidden lg:table-cell">Date</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {data?.rows?.map(lead => (
              <>
                <tr key={lead.id} className="bg-zinc-950 hover:bg-zinc-900/60 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-medium text-white">{lead.firstName} {lead.lastName}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      {lead.email && <span className="text-xs text-zinc-500 flex items-center gap-1"><Mail size={10} />{lead.email}</span>}
                    </div>
                    {lead.phone && <div className="text-xs text-zinc-500 flex items-center gap-1 mt-0.5"><Phone size={10} />{lead.phone}</div>}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded">
                      {FORM_TYPE_LABELS[lead.formType] ?? lead.formType}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    {lead.businessName && (
                      <div className="flex items-center gap-1 text-xs text-zinc-400">
                        <Building2 size={10} /> {lead.businessName}
                      </div>
                    )}
                    {lead.businessType && <div className="text-xs text-zinc-600 mt-0.5">{lead.businessType}</div>}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full border capitalize ${STATUS_COLORS[lead.status] ?? ""}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-xs text-zinc-500">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setExpandedId(expandedId === lead.id ? null : lead.id)}
                      className="text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                      {expandedId === lead.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </td>
                </tr>
                {expandedId === lead.id && (
                  <tr key={`${lead.id}-expanded`} className="bg-zinc-900/40">
                    <td colSpan={6} className="px-4 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs font-medium text-zinc-500 uppercase mb-2">Contact Details</div>
                          <div className="space-y-1 text-sm text-zinc-300">
                            <div><span className="text-zinc-500">Email:</span> {lead.email || "—"}</div>
                            <div><span className="text-zinc-500">Phone:</span> {lead.phone || "—"}</div>
                            <div><span className="text-zinc-500">Business:</span> {lead.businessName || "—"}</div>
                            <div><span className="text-zinc-500">Type:</span> {lead.businessType || "—"}</div>
                            <div><span className="text-zinc-500">Volume:</span> {lead.monthlyVolume || "—"}</div>
                            {lead.sourcePage && <div><span className="text-zinc-500">Source:</span> {lead.sourcePage}</div>}
                          </div>
                          {lead.notes && (
                            <div className="mt-3">
                              <div className="text-xs font-medium text-zinc-500 uppercase mb-1">Notes</div>
                              <pre className="text-xs text-zinc-400 bg-zinc-800 rounded p-2 overflow-auto max-h-32">
                                {JSON.stringify(JSON.parse(lead.notes), null, 2)}
                              </pre>
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="text-xs font-medium text-zinc-500 uppercase mb-2">Update Status</div>
                          {editingStatus?.id === lead.id ? (
                            <div className="space-y-2">
                              <Select
                                value={editingStatus.status}
                                onValueChange={v => setEditingStatus({ ...editingStatus, status: v })}
                              >
                                <SelectTrigger className="bg-zinc-800 border-zinc-700 text-zinc-300 text-sm">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-900 border-zinc-700">
                                  {["new", "contacted", "qualified", "closed", "lost"].map(s => (
                                    <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Textarea
                                placeholder="Admin notes (optional)"
                                value={editingStatus.notes}
                                onChange={e => setEditingStatus({ ...editingStatus, notes: e.target.value })}
                                className="bg-zinc-800 border-zinc-700 text-zinc-300 text-sm resize-none h-20"
                              />
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    updateStatus.mutate({
                                      id: lead.id,
                                      status: editingStatus.status as "new" | "contacted" | "qualified" | "closed" | "lost",
                                      adminNotes: editingStatus.notes,
                                    });
                                    setEditingStatus(null);
                                  }}
                                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs"
                                >
                                  Save
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setEditingStatus(null)}
                                  className="border-zinc-700 text-zinc-400 text-xs"
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div>
                              {lead.adminNotes && (
                                <div className="text-xs text-zinc-400 bg-zinc-800 rounded p-2 mb-2">{lead.adminNotes}</div>
                              )}
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setEditingStatus({ id: lead.id, status: lead.status, notes: lead.adminNotes ?? "" })}
                                className="border-zinc-700 text-zinc-300 text-xs hover:bg-zinc-800"
                              >
                                Edit Status
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
            {(!data?.rows || data.rows.length === 0) && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-zinc-500 text-sm">
                  No leads found. Submit a form on the site to see it appear here.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {data && data.total > limit && (
        <div className="flex items-center justify-between text-sm text-zinc-400">
          <span>Showing {offset + 1}–{Math.min(offset + limit, data.total)} of {data.total}</span>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setOffset(Math.max(0, offset - limit))} disabled={offset === 0} className="border-zinc-700 text-zinc-400">
              Previous
            </Button>
            <Button size="sm" variant="outline" onClick={() => setOffset(offset + limit)} disabled={offset + limit >= data.total} className="border-zinc-700 text-zinc-400">
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── SEO Analytics Tab ────────────────────────────────────────────────────────

function SeoAnalyticsTab() {
  const { data: keyCheck } = trpc.admin.checkSemrushKey.useQuery();
  const { data: domainData, isLoading: domainLoading } = trpc.admin.getDomainOverview.useQuery(undefined, { enabled: keyCheck?.configured });
  const { data: kwData, isLoading: kwLoading } = trpc.admin.getOrganicKeywords.useQuery({ limit: 25 }, { enabled: keyCheck?.configured });
  const { data: blData, isLoading: blLoading } = trpc.admin.getBacklinksOverview.useQuery(undefined, { enabled: keyCheck?.configured });
  const { data: topBl, isLoading: topBlLoading } = trpc.admin.getTopBacklinks.useQuery({ limit: 15 }, { enabled: keyCheck?.configured });
  const { data: rankings, isLoading: rankLoading } = trpc.admin.getKeywordRankings.useQuery({ limit: 20 }, { enabled: keyCheck?.configured });

  if (!keyCheck?.configured) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-white">SEO Analytics</h1>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-8 text-center">
            <Key size={32} className="text-zinc-600 mx-auto mb-4" />
            <div className="text-white font-semibold mb-2">SEMrush API Key Required</div>
            <p className="text-zinc-400 text-sm max-w-md mx-auto">
              To pull live SEO data, add your SEMrush API key as the <code className="bg-zinc-800 px-1 rounded text-xs">SEMRUSH_API_KEY</code> environment variable.
              You can find your API key in SEMrush under Profile → API.
            </p>
            <p className="text-zinc-500 text-xs mt-3">Note: SEMrush API requires a Business plan ($549/mo) or API add-on.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const domain = domainData?.data;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">SEO Analytics</h1>
      <p className="text-zinc-400 text-sm -mt-4">Live data from SEMrush for ubcunlimited.com</p>

      {/* Domain Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Authority Score", value: domainLoading ? "…" : domain?.["Rk"] ?? "N/A", icon: <TrendingUp size={16} />, color: "text-blue-400" },
          { label: "Organic Keywords", value: domainLoading ? "…" : Number(domain?.["Or"] ?? 0).toLocaleString(), icon: <Search size={16} />, color: "text-green-400" },
          { label: "Organic Traffic", value: domainLoading ? "…" : Number(domain?.["Ot"] ?? 0).toLocaleString(), icon: <ArrowUpRight size={16} />, color: "text-purple-400" },
          { label: "Backlinks", value: blLoading ? "…" : Number(blData?.data?.["total"] ?? 0).toLocaleString(), icon: <Link2 size={16} />, color: "text-yellow-400" },
        ].map(kpi => (
          <Card key={kpi.label} className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-4">
              <div className={`mb-2 ${kpi.color}`}>{kpi.icon}</div>
              <div className="text-xl font-bold text-white">{String(kpi.value)}</div>
              <div className="text-xs text-zinc-500 mt-0.5">{kpi.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Top Ranking Keywords */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
            <Search size={14} /> Top 20 Ranking Keywords (Positions 1–20)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {rankLoading ? (
            <div className="text-zinc-500 text-sm">Loading keyword data…</div>
          ) : rankings?.success && rankings.data.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="text-left py-2 text-zinc-500 font-medium">Keyword</th>
                    <th className="text-right py-2 text-zinc-500 font-medium w-16">Pos.</th>
                    <th className="text-right py-2 text-zinc-500 font-medium w-20">Volume</th>
                    <th className="text-right py-2 text-zinc-500 font-medium w-16">Traffic</th>
                    <th className="text-left py-2 text-zinc-500 font-medium pl-4">URL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50">
                  {rankings.data.map((row, i) => (
                    <tr key={i} className="hover:bg-zinc-800/30">
                      <td className="py-2 text-zinc-300 font-medium">{row["Ph"]}</td>
                      <td className="py-2 text-right">
                        <span className={`px-1.5 py-0.5 rounded text-xs font-bold ${
                          Number(row["Po"]) <= 3 ? "bg-green-500/20 text-green-300" :
                          Number(row["Po"]) <= 10 ? "bg-blue-500/20 text-blue-300" :
                          "bg-zinc-700 text-zinc-300"
                        }`}>{row["Po"]}</span>
                      </td>
                      <td className="py-2 text-right text-zinc-400">{Number(row["Nq"] ?? 0).toLocaleString()}</td>
                      <td className="py-2 text-right text-zinc-400">{Number(row["Tr"] ?? 0).toLocaleString()}</td>
                      <td className="py-2 pl-4 text-zinc-500 truncate max-w-[200px]">{row["Ur"]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-zinc-500 text-sm">{rankings?.error ?? "No ranking data available."}</div>
          )}
        </CardContent>
      </Card>

      {/* All Organic Keywords */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
            <TrendingUp size={14} /> Top 25 Organic Keywords by Traffic
          </CardTitle>
        </CardHeader>
        <CardContent>
          {kwLoading ? (
            <div className="text-zinc-500 text-sm">Loading…</div>
          ) : kwData?.success && kwData.data.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="text-left py-2 text-zinc-500 font-medium">Keyword</th>
                    <th className="text-right py-2 text-zinc-500 font-medium w-16">Pos.</th>
                    <th className="text-right py-2 text-zinc-500 font-medium w-20">Volume</th>
                    <th className="text-right py-2 text-zinc-500 font-medium w-16">CPC</th>
                    <th className="text-right py-2 text-zinc-500 font-medium w-16">Traffic</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50">
                  {kwData.data.map((row, i) => (
                    <tr key={i} className="hover:bg-zinc-800/30">
                      <td className="py-2 text-zinc-300">{row["Ph"]}</td>
                      <td className="py-2 text-right">
                        <span className={`px-1.5 py-0.5 rounded text-xs font-bold ${
                          Number(row["Po"]) <= 3 ? "bg-green-500/20 text-green-300" :
                          Number(row["Po"]) <= 10 ? "bg-blue-500/20 text-blue-300" :
                          "bg-zinc-700 text-zinc-300"
                        }`}>{row["Po"]}</span>
                      </td>
                      <td className="py-2 text-right text-zinc-400">{Number(row["Nq"] ?? 0).toLocaleString()}</td>
                      <td className="py-2 text-right text-zinc-400">${row["Cp"] ?? "0"}</td>
                      <td className="py-2 text-right text-zinc-400">{Number(row["Tr"] ?? 0).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-zinc-500 text-sm">{kwData?.error ?? "No keyword data available."}</div>
          )}
        </CardContent>
      </Card>

      {/* Backlinks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
              <Link2 size={14} /> Backlink Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            {blLoading ? <div className="text-zinc-500 text-sm">Loading…</div> :
              blData?.success && blData.data ? (
                <div className="space-y-2 text-sm">
                  {[
                    ["Total Backlinks", Number(blData.data["total"] ?? 0).toLocaleString()],
                    ["Referring Domains", Number(blData.data["domains_num"] ?? 0).toLocaleString()],
                    ["Referring IPs", Number(blData.data["ips_num"] ?? 0).toLocaleString()],
                    ["Follow Links", Number(blData.data["follows_num"] ?? 0).toLocaleString()],
                    ["Nofollow Links", Number(blData.data["nofollows_num"] ?? 0).toLocaleString()],
                    ["Text Links", Number(blData.data["texts_num"] ?? 0).toLocaleString()],
                    ["Image Links", Number(blData.data["images_num"] ?? 0).toLocaleString()],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between">
                      <span className="text-zinc-500">{label}</span>
                      <span className="text-zinc-300 font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              ) : <div className="text-zinc-500 text-sm">{blData?.error ?? "No data."}</div>
            }
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
              <Link2 size={14} /> Top Referring Domains
            </CardTitle>
          </CardHeader>
          <CardContent>
            {topBlLoading ? <div className="text-zinc-500 text-sm">Loading…</div> :
              topBl?.success && topBl.data.length > 0 ? (
                <div className="space-y-2">
                  {topBl.data.slice(0, 8).map((row, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-zinc-600 w-4">{i + 1}</span>
                        <span className="text-zinc-300 truncate">{row["source_url"]?.replace(/^https?:\/\//, "").split("/")[0]}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-zinc-500">AS {row["page_ascore"]}</span>
                        <span className={`px-1.5 py-0.5 rounded text-xs ${row["type"] === "dofollow" ? "bg-green-500/20 text-green-300" : "bg-zinc-700 text-zinc-500"}`}>
                          {row["type"]}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : <div className="text-zinc-500 text-sm">{topBl?.error ?? "No backlink data."}</div>
            }
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ─── AI SEO Fix Tab ───────────────────────────────────────────────────────────

function SeoFixTab() {
  const { data: keyCheck } = trpc.admin.checkSemrushKey.useQuery();
  const { data: kwData } = trpc.admin.getOrganicKeywords.useQuery({ limit: 25 }, { enabled: keyCheck?.configured });
  const { data: blData } = trpc.admin.getBacklinksOverview.useQuery(undefined, { enabled: keyCheck?.configured });
  const { data: rankings } = trpc.admin.getKeywordRankings.useQuery({ limit: 20 }, { enabled: keyCheck?.configured });

  const analyzeMutation = trpc.admin.analyzeSeoIssues.useMutation();
  const [analysisType, setAnalysisType] = useState<"keywords" | "backlinks" | "content" | "technical">("keywords");
  const [customContext, setCustomContext] = useState("");
  const [result, setResult] = useState<{
    summary: string;
    issues: { severity: string; title: string; description: string; fix: string; affectedPages: string[] }[];
    quickWins: string[];
  } | null>(null);

  const buildContext = () => {
    if (customContext.trim()) return customContext;
    if (analysisType === "keywords" && kwData?.success) {
      return `Top organic keywords:\n${kwData.data.slice(0, 15).map(r => `${r["Ph"]} | Pos: ${r["Po"]} | Volume: ${r["Nq"]} | Traffic: ${r["Tr"]}`).join("\n")}`;
    }
    if (analysisType === "backlinks" && blData?.success) {
      return `Backlink overview:\n${JSON.stringify(blData.data, null, 2)}`;
    }
    if (analysisType === "content" && rankings?.success) {
      return `Ranking keywords:\n${rankings.data.map(r => `${r["Ph"]} | Pos: ${r["Po"]} | URL: ${r["Ur"]}`).join("\n")}`;
    }
    return "No SEMrush data available. Please add your API key or paste custom context below.";
  };

  const handleAnalyze = async () => {
    const context = buildContext();
    const res = await analyzeMutation.mutateAsync({ issueType: analysisType, context });
    if (res.success && res.analysis) {
      setResult(res.analysis as typeof result);
    }
  };

  const severityIcon = (s: string) => {
    if (s === "high") return <AlertTriangle size={14} className="text-red-400" />;
    if (s === "medium") return <Info size={14} className="text-yellow-400" />;
    return <CheckCircle size={14} className="text-green-400" />;
  };

  const severityBg = (s: string) => {
    if (s === "high") return "border-red-800/40 bg-red-950/20";
    if (s === "medium") return "border-yellow-800/40 bg-yellow-950/20";
    return "border-green-800/40 bg-green-950/20";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">AI SEO Fix Engine</h1>
        <p className="text-zinc-400 text-sm mt-1">Analyze SEMrush data with AI to get specific, actionable fixes for ubcunlimited.com</p>
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-5 space-y-4">
          <div>
            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-2 block">Analysis Type</label>
            <div className="flex gap-2 flex-wrap">
              {(["keywords", "backlinks", "content", "technical"] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setAnalysisType(t)}
                  className={`px-3 py-1.5 rounded text-sm capitalize transition-colors ${
                    analysisType === t ? "bg-blue-600 text-white" : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-2 block">
              Custom Context (optional — paste SEMrush data or describe issues)
            </label>
            <Textarea
              placeholder="Paste SEMrush export data, site audit issues, or describe what you want analyzed..."
              value={customContext}
              onChange={e => setCustomContext(e.target.value)}
              className="bg-zinc-800 border-zinc-700 text-zinc-300 text-sm resize-none h-28"
            />
          </div>

          <Button
            onClick={handleAnalyze}
            disabled={analyzeMutation.isPending}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {analyzeMutation.isPending ? (
              <><RefreshCw size={14} className="mr-2 animate-spin" /> Analyzing…</>
            ) : (
              <><Zap size={14} className="mr-2" /> Run AI Analysis</>
            )}
          </Button>

          {analyzeMutation.data && !analyzeMutation.data.success && (
            <div className="text-red-400 text-sm bg-red-950/30 border border-red-800/40 rounded p-3">
              Error: {analyzeMutation.data.error}
            </div>
          )}
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-4">
          {/* Summary */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-5">
              <div className="text-xs font-medium text-zinc-500 uppercase mb-2">Summary</div>
              <p className="text-zinc-300 text-sm leading-relaxed">{result.summary}</p>
            </CardContent>
          </Card>

          {/* Quick Wins */}
          {result.quickWins.length > 0 && (
            <Card className="bg-green-950/20 border-green-800/40">
              <CardContent className="p-5">
                <div className="text-xs font-medium text-green-400 uppercase mb-3 flex items-center gap-1.5">
                  <Zap size={12} /> Quick Wins
                </div>
                <ul className="space-y-1.5">
                  {result.quickWins.map((win, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-green-300">
                      <CheckCircle size={14} className="mt-0.5 shrink-0 text-green-400" />
                      {win}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Issues */}
          <div className="space-y-3">
            <div className="text-xs font-medium text-zinc-500 uppercase">
              {result.issues.length} Issue{result.issues.length !== 1 ? "s" : ""} Found
            </div>
            {result.issues.map((issue, i) => (
              <Card key={i} className={`border ${severityBg(issue.severity)}`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-2 mb-2">
                    {severityIcon(issue.severity)}
                    <div className="flex-1">
                      <div className="font-medium text-white text-sm">{issue.title}</div>
                      <Badge variant="outline" className={`text-xs mt-1 ${
                        issue.severity === "high" ? "border-red-700 text-red-400" :
                        issue.severity === "medium" ? "border-yellow-700 text-yellow-400" :
                        "border-green-700 text-green-400"
                      }`}>
                        {issue.severity}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-zinc-400 text-sm mb-3">{issue.description}</p>
                  <div className="bg-zinc-800/60 rounded p-3">
                    <div className="text-xs font-medium text-zinc-500 uppercase mb-1">Recommended Fix</div>
                    <p className="text-zinc-300 text-sm">{issue.fix}</p>
                  </div>
                  {issue.affectedPages.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {issue.affectedPages.map((page, j) => (
                        <span key={j} className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded">{page}</span>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Testimonials Tab (redirect to existing page) ─────────────────────────────

function TestimonialsTab() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-white">Testimonials</h1>
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-6">
          <p className="text-zinc-400 text-sm mb-4">
            The testimonial moderation queue is available at the dedicated admin page.
          </p>
          <a
            href="/admin/testimonials"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded transition-colors"
          >
            <Star size={14} /> Open Testimonials Queue <ArrowUpRight size={14} />
          </a>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Main Admin Portal ────────────────────────────────────────────────────────

export default function AdminPortal() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-zinc-400 text-sm">Loading…</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Card className="bg-zinc-900 border-zinc-800 w-80">
          <CardContent className="p-8 text-center">
            <LayoutDashboard size={32} className="text-zinc-600 mx-auto mb-4" />
            <div className="text-white font-semibold mb-2">Admin Access Required</div>
            <p className="text-zinc-400 text-sm mb-4">Sign in with your Manus account to access the admin portal.</p>
            <Button
              onClick={() => { window.location.href = getLoginUrl(); }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Card className="bg-zinc-900 border-zinc-800 w-80">
          <CardContent className="p-8 text-center">
            <AlertTriangle size={32} className="text-red-500 mx-auto mb-4" />
            <div className="text-white font-semibold mb-2">Access Denied</div>
            <p className="text-zinc-400 text-sm mb-4">Your account does not have admin privileges.</p>
            <Button variant="outline" onClick={logout} className="border-zinc-700 text-zinc-300">
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex">
      <Sidebar active={activeTab} setActive={setActiveTab} logout={logout} />
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {activeTab === "overview" && <OverviewTab />}
          {activeTab === "leads" && <LeadsTab />}
          {activeTab === "seo" && <SeoAnalyticsTab />}
          {activeTab === "seofix" && <SeoFixTab />}
          {activeTab === "testimonials" && <TestimonialsTab />}
        </div>
      </main>
    </div>
  );
}
