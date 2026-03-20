import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import {
  CheckCircle,
  XCircle,
  Clock,
  Star,
  RefreshCw,
  Loader2,
  ShieldAlert,
  Filter,
} from "lucide-react";

type StatusFilter = "all" | "pending" | "approved" | "rejected";

function StarDisplay({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={12}
          className={s <= rating ? "text-[#c9a84c] fill-[#c9a84c]" : "text-gray-600"}
        />
      ))}
    </span>
  );
}

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  approved: "bg-green-500/15 text-green-400 border-green-500/30",
  rejected: "bg-red-500/15 text-red-400 border-red-500/30",
};

const STATUS_ICONS: Record<string, React.ElementType> = {
  pending: Clock,
  approved: CheckCircle,
  rejected: XCircle,
};

export default function AdminTestimonials() {
  const { user, loading } = useAuth();
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("pending");
  const [reviewingId, setReviewingId] = useState<number | null>(null);
  const [adminNotes, setAdminNotes] = useState<Record<number, string>>({});

  const utils = trpc.useUtils();

  const { data: submissions, isLoading, refetch } = trpc.testimonials.adminList.useQuery(
    { status: statusFilter },
    { enabled: !!user && user.role === "admin" }
  );

  const reviewMutation = trpc.testimonials.review.useMutation({
    onSuccess: () => {
      setReviewingId(null);
      utils.testimonials.adminList.invalidate();
    },
  });

  const handleReview = (id: number, status: "approved" | "rejected") => {
    setReviewingId(id);
    reviewMutation.mutate({ id, status, adminNotes: adminNotes[id] });
  };

  // Auth guard
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <Loader2 size={32} className="text-[#c9a84c] animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center gap-4 text-center px-4">
        <ShieldAlert size={40} className="text-[#c9a84c]" />
        <h1 className="text-white text-xl font-bold">Sign In Required</h1>
        <p className="text-gray-400 text-sm">You must be signed in to access this page.</p>
        <a
          href={getLoginUrl()}
          className="bg-[#c9a84c] hover:bg-[#b8963e] text-black font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors"
        >
          Sign In
        </a>
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center gap-4 text-center px-4">
        <ShieldAlert size={40} className="text-red-400" />
        <h1 className="text-white text-xl font-bold">Access Denied</h1>
        <p className="text-gray-400 text-sm">This page is restricted to administrators.</p>
      </div>
    );
  }

  const counts = {
    all: submissions?.length ?? 0,
    pending: submissions?.filter((s) => s.status === "pending").length ?? 0,
    approved: submissions?.filter((s) => s.status === "approved").length ?? 0,
    rejected: submissions?.filter((s) => s.status === "rejected").length ?? 0,
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="bg-[#111111] border-b border-white/10 px-6 py-5">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div>
            <h1
              className="text-xl font-bold text-white"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              Testimonial Review
            </h1>
            <p className="text-gray-400 text-sm mt-0.5">
              Approve or reject client testimonial submissions before they go live.
            </p>
          </div>
          <button
            onClick={() => refetch()}
            className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
          >
            <RefreshCw size={14} />
            Refresh
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Status filter tabs */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <Filter size={14} className="text-gray-500 mr-1" />
          {(["pending", "approved", "rejected", "all"] as StatusFilter[]).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all capitalize ${
                statusFilter === s
                  ? "bg-[#c9a84c] text-black border-[#c9a84c]"
                  : "bg-transparent text-gray-400 border-white/15 hover:border-[#c9a84c]/40 hover:text-white"
              }`}
            >
              {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center py-20">
            <Loader2 size={28} className="text-[#c9a84c] animate-spin" />
          </div>
        )}

        {/* Empty state */}
        {!isLoading && (!submissions || submissions.length === 0) && (
          <div className="text-center py-20 text-gray-500">
            <Clock size={36} className="mx-auto mb-3 opacity-40" />
            <p className="text-base">No submissions with status "{statusFilter}".</p>
          </div>
        )}

        {/* Submission cards */}
        {!isLoading && submissions && submissions.length > 0 && (
          <div className="flex flex-col gap-5">
            {submissions.map((sub) => {
              const StatusIcon = STATUS_ICONS[sub.status] ?? Clock;
              const isPending = sub.status === "pending";
              const isProcessing = reviewingId === sub.id && reviewMutation.isPending;

              return (
                <div
                  key={sub.id}
                  className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6 flex flex-col gap-4"
                >
                  {/* Top row: name + status badge */}
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-white font-semibold">{sub.name}</span>
                        <span className="text-gray-500 text-xs">·</span>
                        <span className="text-[#c9a84c] text-sm">{sub.businessName}</span>
                        <span className="text-gray-500 text-xs">·</span>
                        <span className="text-gray-400 text-xs">{sub.location}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-1.5">
                        <StarDisplay rating={sub.rating} />
                        <span className="text-xs bg-white/5 border border-white/10 rounded-full px-2.5 py-0.5 text-gray-300">
                          {sub.industry}
                        </span>
                        {sub.email && (
                          <span className="text-gray-500 text-xs">{sub.email}</span>
                        )}
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border capitalize ${STATUS_COLORS[sub.status]}`}
                    >
                      <StatusIcon size={11} />
                      {sub.status}
                    </span>
                  </div>

                  {/* Quote */}
                  <blockquote className="text-white/75 text-sm leading-relaxed border-l-2 border-[#c9a84c]/40 pl-4 italic">
                    "{sub.quote}"
                  </blockquote>

                  {/* Meta */}
                  <p className="text-gray-600 text-xs">
                    Submitted {new Date(sub.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    {sub.reviewedAt && (
                      <> · Reviewed {new Date(sub.reviewedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}</>
                    )}
                  </p>

                  {/* Admin notes + action buttons (only for pending) */}
                  {isPending && (
                    <div className="flex flex-col gap-3 pt-2 border-t border-white/10">
                      <textarea
                        rows={2}
                        placeholder="Optional admin notes (not shown publicly)…"
                        value={adminNotes[sub.id] ?? ""}
                        onChange={(e) =>
                          setAdminNotes((prev) => ({ ...prev, [sub.id]: e.target.value }))
                        }
                        className="w-full bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/40 resize-none"
                      />
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleReview(sub.id, "approved")}
                          disabled={isProcessing}
                          className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold text-sm rounded-lg py-2.5 transition-colors disabled:opacity-50"
                        >
                          {isProcessing ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : (
                            <CheckCircle size={14} />
                          )}
                          Approve
                        </button>
                        <button
                          onClick={() => handleReview(sub.id, "rejected")}
                          disabled={isProcessing}
                          className="flex-1 flex items-center justify-center gap-2 bg-red-700 hover:bg-red-600 text-white font-semibold text-sm rounded-lg py-2.5 transition-colors disabled:opacity-50"
                        >
                          {isProcessing ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : (
                            <XCircle size={14} />
                          )}
                          Reject
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Show admin notes if already reviewed */}
                  {!isPending && sub.adminNotes && (
                    <div className="pt-2 border-t border-white/10">
                      <p className="text-gray-500 text-xs">
                        <span className="font-semibold text-gray-400">Admin notes:</span>{" "}
                        {sub.adminNotes}
                      </p>
                    </div>
                  )}

                  {/* Re-review option for already-reviewed items */}
                  {!isPending && (
                    <div className="flex gap-3 pt-1">
                      {sub.status === "rejected" && (
                        <button
                          onClick={() => handleReview(sub.id, "approved")}
                          disabled={reviewingId === sub.id && reviewMutation.isPending}
                          className="flex items-center gap-1.5 text-green-400 hover:text-green-300 text-xs font-medium transition-colors"
                        >
                          <CheckCircle size={12} />
                          Approve anyway
                        </button>
                      )}
                      {sub.status === "approved" && (
                        <button
                          onClick={() => handleReview(sub.id, "rejected")}
                          disabled={reviewingId === sub.id && reviewMutation.isPending}
                          className="flex items-center gap-1.5 text-red-400 hover:text-red-300 text-xs font-medium transition-colors"
                        >
                          <XCircle size={12} />
                          Revoke approval
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
