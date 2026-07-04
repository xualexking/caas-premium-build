import { useState } from "react";
import { Star, X, CheckCircle2, MessageSquarePlus } from "lucide-react";
import { submitReview } from "@/lib/reviews";

export function ReviewPopupTrigger() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-24 right-6 z-40 hidden sm:flex items-center gap-2 bg-surface border border-border px-4 py-2.5 text-xs font-heading uppercase tracking-wider text-foreground hover:border-primary hover:text-primary transition-colors shadow-hard"
        aria-label="Leave a review"
      >
        <MessageSquarePlus className="h-4 w-4" />
        Leave a Review
      </button>
      {open && <ReviewModal onClose={() => setOpen(false)} />}
    </>
  );
}

function ReviewModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [rating, setRating] = useState(5);
  const [quote, setQuote] = useState("");
  const [hovered, setHovered] = useState(0);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !quote.trim()) return;
    setLoading(true);
    setError("");
    try {
      await submitReview({ data: { name: name.trim(), role: role.trim() || undefined, rating, quote: quote.trim() } });
      setDone(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Submit a review">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-surface border border-border shadow-hard animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div>
            <div className="font-heading uppercase tracking-wider text-base">Share Your Experience</div>
            <div className="text-xs text-muted-foreground mt-0.5">Your review goes live after approval.</div>
          </div>
          <button onClick={onClose} className="p-1.5 text-muted-foreground hover:text-foreground transition-colors" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {done ? (
            <div className="text-center py-8">
              <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-4" />
              <div className="font-heading uppercase tracking-wider text-lg mb-2">Thanks for the review!</div>
              <p className="text-sm text-muted-foreground">It's been submitted and will go live once approved.</p>
              <button
                onClick={onClose}
                className="mt-6 bg-primary text-primary-foreground px-6 py-2.5 font-heading uppercase tracking-wider text-sm hover:btn-glow transition-all"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Star rating */}
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Rating *</div>
                <div className="flex gap-1" role="radiogroup" aria-label="Star rating">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRating(s)}
                      onMouseEnter={() => setHovered(s)}
                      onMouseLeave={() => setHovered(0)}
                      aria-label={`${s} star${s > 1 ? "s" : ""}`}
                      aria-pressed={rating === s}
                      className="p-0.5 transition-transform hover:scale-110"
                    >
                      <Star
                        className={`h-7 w-7 transition-colors ${
                          s <= (hovered || rating) ? "fill-primary text-primary" : "text-border"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Name + Role */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    maxLength={120}
                    placeholder="e.g. Marcus O."
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                    Role / Company
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    maxLength={120}
                    placeholder="e.g. Fleet Manager"
                    className={inputCls}
                  />
                </div>
              </div>

              {/* Quote */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Your Review * <span className="normal-case text-muted-foreground/60">({quote.length}/1000)</span>
                </label>
                <textarea
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  required
                  minLength={10}
                  maxLength={1000}
                  rows={4}
                  placeholder="Tell us about your experience with CAAS Towing & Recovery…"
                  className={inputCls}
                />
              </div>

              {error && (
                <div className="text-xs text-red-500 border border-red-500/30 bg-red-500/10 px-4 py-3">
                  {error}
                </div>
              )}

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 border border-border py-3 font-heading uppercase tracking-wider text-sm hover:border-primary transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !name.trim() || !quote.trim()}
                  className="flex-1 bg-primary text-primary-foreground py-3 font-heading uppercase tracking-wider text-sm hover:btn-glow transition-all disabled:opacity-50"
                >
                  {loading ? "Submitting…" : "Submit Review"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

const inputCls = "w-full bg-background border border-border px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors resize-none";
