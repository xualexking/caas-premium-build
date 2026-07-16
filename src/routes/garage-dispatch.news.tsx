import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Newspaper,
  Upload,
  Trash2,
  RefreshCw,
  Save,
  X,
  Plus,
  Eye,
  EyeOff,
  Calendar,
} from "lucide-react";
import {
  adminListNews,
  createNews,
  deleteNews,
  updateNews,
  NEWS_CATEGORIES,
  type NewsPost,
} from "@/lib/news";

export const Route = createFileRoute("/garage-dispatch/news")({
  component: NewsAdmin,
});

const MAX_COVER_BYTES = 3 * 1024 * 1024;

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

type FormState = {
  id?: number;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  body: string;
  cover_url: string;
  published: boolean;
};

const EMPTY_FORM: FormState = {
  title: "",
  slug: "",
  category: NEWS_CATEGORIES[0],
  excerpt: "",
  body: "",
  cover_url: "",
  published: true,
};

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

function NewsAdmin() {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const rows = await adminListNews();
      setPosts(rows as NewsPost[]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const openNew = () => {
    setForm(EMPTY_FORM);
    setError("");
    setDrawerOpen(true);
  };

  const openEdit = (p: NewsPost) => {
    setForm({
      id: p.id,
      title: p.title,
      slug: p.slug,
      category: p.category,
      excerpt: p.excerpt ?? "",
      body: p.body,
      cover_url: p.cover_url ?? "",
      published: p.published,
    });
    setError("");
    setDrawerOpen(true);
  };

  const handleFile = async (file: File) => {
    setError("");
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    if (file.size > MAX_COVER_BYTES) {
      setError("Image too large. Max 3MB.");
      return;
    }
    const dataUrl = await fileToDataUrl(file);
    setForm((f) => ({ ...f, cover_url: dataUrl }));
  };

  const handleSave = async () => {
    setError("");
    if (form.title.trim().length < 3) {
      setError("Title is required (min 3 characters).");
      return;
    }
    if (form.body.trim().length < 10) {
      setError("Article body is required (min 10 characters).");
      return;
    }
    setSaving(true);
    try {
      if (form.id) {
        await updateNews({
          data: {
            id: form.id,
            title: form.title,
            slug: form.slug || undefined,
            category: form.category,
            excerpt: form.excerpt || null,
            body: form.body,
            cover_url: form.cover_url || null,
            published: form.published,
          },
        });
      } else {
        await createNews({
          data: {
            title: form.title,
            slug: form.slug || undefined,
            category: form.category,
            excerpt: form.excerpt || null,
            body: form.body,
            cover_url: form.cover_url || null,
            published: form.published,
          },
        });
      }
      setDrawerOpen(false);
      await load();
    } catch (e: any) {
      setError(e?.message ?? "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this article? This cannot be undone.")) return;
    await deleteNews({ data: { id } });
    await load();
  };

  const publishedCount = posts.filter((p) => p.published).length;

  return (
    <div className="max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="font-heading uppercase tracking-wider text-2xl">News & Blog</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Publish short articles, updates, and news that appear on your public news feed.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={load}
            disabled={loading}
            className="flex items-center gap-2 border border-border px-4 py-2 text-sm font-heading uppercase tracking-wider hover:border-primary transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button
            onClick={openNew}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-sm font-heading uppercase tracking-wider hover:btn-glow transition-all"
          >
            <Plus className="h-4 w-4" /> New Article
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="border border-border bg-surface p-5">
          <div className="text-3xl font-display text-primary">{posts.length}</div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">Total articles</div>
        </div>
        <div className="border border-border bg-surface p-5">
          <div className="text-3xl font-display text-green-500">{publishedCount}</div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">Published (live)</div>
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : posts.length === 0 ? (
        <div className="border border-border bg-surface p-16 text-center">
          <Newspaper className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
          <div className="font-heading uppercase tracking-wider text-muted-foreground">No articles yet</div>
          <button
            onClick={openNew}
            className="mt-4 inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-sm font-heading uppercase tracking-wider hover:btn-glow"
          >
            <Plus className="h-4 w-4" /> Write your first article
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((p) => (
            <div
              key={p.id}
              className="border border-border bg-surface p-4 flex items-center gap-4 flex-wrap sm:flex-nowrap"
            >
              <div className="h-20 w-28 shrink-0 bg-background border border-border overflow-hidden relative">
                {p.cover_url ? (
                  <img src={p.cover_url} alt={p.title} className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    <Newspaper className="h-6 w-6 opacity-40" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-primary">
                  <span>{p.category}</span>
                  <span className="text-muted-foreground/60">•</span>
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(p.published_at)}
                  </span>
                  {p.published ? (
                    <span className="inline-flex items-center gap-1 text-green-500">
                      <Eye className="h-3 w-3" /> Live
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-muted-foreground">
                      <EyeOff className="h-3 w-3" /> Draft
                    </span>
                  )}
                </div>
                <div className="font-heading uppercase tracking-wider mt-1 truncate">{p.title}</div>
                {p.excerpt && (
                  <div className="text-xs text-muted-foreground truncate mt-1">{p.excerpt}</div>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => openEdit(p)}
                  className="text-xs font-heading uppercase tracking-wider border border-border px-3 py-1.5 hover:border-primary hover:text-primary transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="p-1.5 border border-border text-muted-foreground hover:border-red-500 hover:text-red-500 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
            onClick={() => !saving && setDrawerOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-2xl h-full bg-surface border-l border-border overflow-y-auto">
            <div className="sticky top-0 bg-surface/95 backdrop-blur border-b border-border px-6 py-4 flex items-center justify-between">
              <div className="font-heading uppercase tracking-wider text-sm">
                {form.id ? "Edit article" : "New article"}
              </div>
              <button
                onClick={() => !saving && setDrawerOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Cover image */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Cover image <span className="opacity-60 normal-case tracking-normal">(optional)</span>
                </label>
                <div
                  onClick={() => fileRef.current?.click()}
                  className="relative w-full aspect-[16/9] border-2 border-dashed border-border hover:border-primary bg-background cursor-pointer overflow-hidden group transition-colors"
                >
                  {form.cover_url ? (
                    <img src={form.cover_url} alt="" className="absolute inset-0 h-full w-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                      <Upload className="h-8 w-8 mb-2" />
                      <div className="text-xs uppercase tracking-wider">Click to upload</div>
                      <div className="text-[10px] mt-1">Image (max 3MB)</div>
                    </div>
                  )}
                  {form.cover_url && (
                    <div className="absolute inset-0 bg-background/0 group-hover:bg-background/60 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="text-xs font-heading uppercase tracking-wider">Replace</div>
                    </div>
                  )}
                </div>
                {form.cover_url && (
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, cover_url: "" })}
                    className="mt-2 text-[10px] uppercase tracking-wider text-muted-foreground hover:text-red-500"
                  >
                    Remove image
                  </button>
                )}
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleFile(f);
                    e.target.value = "";
                  }}
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-background border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
                  placeholder="e.g. New heavy-duty flatbed added to the fleet"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  URL slug <span className="opacity-60 normal-case tracking-normal">(auto-generated if blank)</span>
                </label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="w-full bg-background border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
                  placeholder="new-flatbed-added"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full bg-background border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
                >
                  {NEWS_CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Excerpt <span className="opacity-60 normal-case tracking-normal">(short summary, shown in list)</span>
                </label>
                <textarea
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  rows={2}
                  maxLength={400}
                  className="w-full bg-background border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-primary resize-y"
                  placeholder="One or two sentences summarising the article."
                />
                <div className="text-[10px] text-muted-foreground mt-1">{form.excerpt.length}/400</div>
              </div>

              {/* Body */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Article body
                </label>
                <textarea
                  value={form.body}
                  onChange={(e) => setForm({ ...form, body: e.target.value })}
                  rows={12}
                  className="w-full bg-background border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-primary resize-y font-mono"
                  placeholder="Write your article here. Separate paragraphs with a blank line."
                />
                <div className="text-[10px] text-muted-foreground mt-1">
                  Tip: leave a blank line between paragraphs.
                </div>
              </div>

              {/* Published toggle */}
              <label className="flex items-center gap-3 border border-border bg-background p-4 cursor-pointer hover:border-primary transition-colors">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setForm({ ...form, published: e.target.checked })}
                  className="h-4 w-4 accent-primary"
                />
                <div>
                  <div className="text-sm font-heading uppercase tracking-wider">Publish immediately</div>
                  <div className="text-xs text-muted-foreground">
                    If unchecked, saved as a draft and hidden from the public news page.
                  </div>
                </div>
              </label>

              {error && (
                <div className="text-xs text-red-500 border border-red-500/30 bg-red-500/10 px-4 py-3">
                  {error}
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-3 font-heading uppercase tracking-wider text-sm hover:btn-glow disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  {saving ? "Saving…" : form.id ? "Save changes" : "Publish article"}
                </button>
                <button
                  onClick={() => setDrawerOpen(false)}
                  disabled={saving}
                  className="border border-border px-4 py-3 text-sm font-heading uppercase tracking-wider hover:border-primary disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
