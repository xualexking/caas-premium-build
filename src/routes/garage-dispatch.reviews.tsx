import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { Star, Check, X, Trash2, RefreshCw, Clock, ThumbsUp, ThumbsDown } from "lucide-react";
import {
  getAdminReviews,
  approveReview,
  rejectReview,
  deleteReview,
  getReviewCounts,
  type Review,
} from "@/lib/reviews";

export const Route = createFileRoute("/garage-dispatch/reviews")({
  component: ReviewsAdmin,
});

type Tab = "pending" | "approved" | "rejected";

function ReviewsAdmin() {
  const [tab, setTab] = useState<Tab>("pending");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [counts, setCounts] = useState({ pending: 0, approved: 0, rejected: 0 });
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [rows, c] = await Promise.all([
        getAdminReviews({ data: { status: tab } }),
        getReviewCounts(),
      ]);
      setReviews(rows);
      setCounts(c);
    } finally {
      setLoading(false);
    }
  }, [tab]);

  useEffect(() => { load(); }, [load]);

  const handleApprove = async (id: number) => {
    setActionLoading(id);
    await approveReview({ data: { id } });
    await load();
    setActionLoading(null);
  };

  const handleReject = async (id: number) => {
    setActionLoading(id);
    await rejectReview({ data: { id } });
    await load();
    setActionLoading(null);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Permanently delete this review?")) return;
    setActionLoading(id);
    await deleteReview({ data: { id } });
    await load();
    setActionLoading(null);
  };

  const tabs: { key: Tab; label: string; count: number; color: string }[] = [
    { key: "pending", label: "Pending", count: counts.pending, color: "text-yellow-500" },
    { key: "approved", label: "Approved", count: counts.approved, color: "text-green-500" },
    { key: "rejected", label: "Rejected", count: counts.rejected, color: "text-red-500" },
  ];

  return (
    <div className="max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading uppercase tracking-wider text-2xl">Reviews</h1>
          <p className="text-sm text-muted-foreground mt-1">Moderate customer testimonials before they go live.</p>
        </div>
        <button
          onClick={load}
          disabled={loading}
          className="flex items-center gap-2 border border-border px-4 py-2 text-sm font-heading uppercase tracking-wider hover:border-primary transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {tabs.map((t) => (
          <div key={t.key} className="border border-border bg-surface p-5">
            <div className={`text-3xl font-display ${t.color}`}>{t.count}</div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{t.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border mb-6">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-5 py-2.5 text-sm font-heading uppercase tracking-wider border-b-2 -mb-px transition-colors
              ${tab === t.key
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
          >
            {t.label}
            {t.count > 0 && (
              <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${tab === t.key ? "bg-primary text-primary-foreground" : "bg-border text-muted-foreground"}`}>
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Reviews list */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : reviews.length === 0 ? (
        <div className="border border-border bg-surface p-16 text-center">
          <div className="font-heading uppercase tracking-wider text-muted-foreground">No {tab} reviews</div>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border border-border bg-surface p-6 group">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? "fill-primary text-primary" : "text-border"}`}
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-foreground/90 leading-relaxed mb-4">"{review.quote}"</p>

                  {/* Author */}
                  <div className="flex items-center gap-3 text-sm">
                    <span className="font-heading uppercase tracking-wider">{review.name}</span>
                    {review.role && (
                      <span className="text-muted-foreground">· {review.role}</span>
                    )}
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {new Date(review.created_at).toLocaleDateString("en-GB", {
                      day: "numeric", month: "short", year: "numeric",
                    })}
                    <span className="text-border">·</span>
                    ID #{review.id}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {tab === "pending" && (
                    <>
                      <button
                        onClick={() => handleApprove(review.id)}
                        disabled={actionLoading === review.id}
                        className="flex items-center gap-1.5 bg-green-500/10 text-green-500 border border-green-500/30 px-3 py-2 text-xs font-heading uppercase tracking-wider hover:bg-green-500 hover:text-white transition-colors disabled:opacity-50"
                      >
                        <Check className="h-3.5 w-3.5" /> Approve
                      </button>
                      <button
                        onClick={() => handleReject(review.id)}
                        disabled={actionLoading === review.id}
                        className="flex items-center gap-1.5 bg-red-500/10 text-red-500 border border-red-500/30 px-3 py-2 text-xs font-heading uppercase tracking-wider hover:bg-red-500 hover:text-white transition-colors disabled:opacity-50"
                      >
                        <X className="h-3.5 w-3.5" /> Reject
                      </button>
                    </>
                  )}
                  {tab === "approved" && (
                    <button
                      onClick={() => handleReject(review.id)}
                      disabled={actionLoading === review.id}
                      className="flex items-center gap-1.5 text-muted-foreground border border-border px-3 py-2 text-xs font-heading uppercase tracking-wider hover:border-red-500 hover:text-red-500 transition-colors disabled:opacity-50"
                    >
                      <ThumbsDown className="h-3.5 w-3.5" /> Unpublish
                    </button>
                  )}
                  {tab === "rejected" && (
                    <button
                      onClick={() => handleApprove(review.id)}
                      disabled={actionLoading === review.id}
                      className="flex items-center gap-1.5 text-muted-foreground border border-border px-3 py-2 text-xs font-heading uppercase tracking-wider hover:border-green-500 hover:text-green-500 transition-colors disabled:opacity-50"
                    >
                      <ThumbsUp className="h-3.5 w-3.5" /> Re-approve
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(review.id)}
                    disabled={actionLoading === review.id}
                    className="p-2 text-muted-foreground border border-border hover:border-red-500 hover:text-red-500 transition-colors disabled:opacity-50"
                    title="Delete permanently"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
