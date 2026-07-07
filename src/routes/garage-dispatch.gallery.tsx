import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Image as ImageIcon,
  Upload,
  Star,
  StarOff,
  Trash2,
  RefreshCw,
  Save,
  X,
  Plus,
} from "lucide-react";
import {
  adminListGallery,
  createGalleryItem,
  deleteGalleryItem,
  toggleLanding,
  updateGalleryItem,
  LAYOUT_OPTIONS,
  CATEGORY_OPTIONS,
  type GalleryItem,
} from "@/lib/gallery";

export const Route = createFileRoute("/garage-dispatch/gallery")({
  component: GalleryAdmin,
});

const MAX_FILE_BYTES = 3 * 1024 * 1024; // 3MB source

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
  category: string;
  location: string;
  layout: string;
  media_url: string;
  on_landing: boolean;
};

const EMPTY_FORM: FormState = {
  title: "",
  category: CATEGORY_OPTIONS[0],
  location: "",
  layout: LAYOUT_OPTIONS[0].value,
  media_url: "",
  on_landing: false,
};

function GalleryAdmin() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const rows = await adminListGallery();
      setItems(rows as GalleryItem[]);
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

  const openEdit = (item: GalleryItem) => {
    setForm({
      id: item.id,
      title: item.title,
      category: item.category,
      location: item.location ?? "",
      layout: item.layout,
      media_url: item.media_url,
      on_landing: item.on_landing,
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
    if (file.size > MAX_FILE_BYTES) {
      setError("Image too large. Max 3MB.");
      return;
    }
    const dataUrl = await fileToDataUrl(file);
    setForm((f) => ({ ...f, media_url: dataUrl }));
  };

  const handleSave = async () => {
    setError("");
    if (!form.title.trim() || form.title.trim().length < 2) {
      setError("Title is required.");
      return;
    }
    if (!form.media_url) {
      setError("Please upload an image.");
      return;
    }
    setSaving(true);
    try {
      if (form.id) {
        await updateGalleryItem({
          data: {
            id: form.id,
            title: form.title,
            category: form.category,
            location: form.location || null,
            layout: form.layout,
            media_url: form.media_url,
            on_landing: form.on_landing,
          },
        });
      } else {
        await createGalleryItem({
          data: {
            title: form.title,
            category: form.category,
            location: form.location || null,
            layout: form.layout,
            media_url: form.media_url,
            on_landing: form.on_landing,
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
    if (!confirm("Delete this gallery item?")) return;
    await deleteGalleryItem({ data: { id } });
    await load();
  };

  const handleToggleLanding = async (item: GalleryItem) => {
    await toggleLanding({ data: { id: item.id, on_landing: !item.on_landing } });
    await load();
  };

  const landingCount = items.filter((i) => i.on_landing).length;

  return (
    <div className="max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="font-heading uppercase tracking-wider text-2xl">Gallery</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage gallery media, choose layouts, and pick what appears on the landing page.
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
            <Plus className="h-4 w-4" /> Add Media
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="border border-border bg-surface p-5">
          <div className="text-3xl font-display text-primary">{items.length}</div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">Total items</div>
        </div>
        <div className="border border-border bg-surface p-5">
          <div className="text-3xl font-display text-green-500">{landingCount}</div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">On landing page</div>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="border border-border bg-surface p-16 text-center">
          <ImageIcon className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
          <div className="font-heading uppercase tracking-wider text-muted-foreground">No gallery items yet</div>
          <button
            onClick={openNew}
            className="mt-4 inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-sm font-heading uppercase tracking-wider hover:btn-glow"
          >
            <Plus className="h-4 w-4" /> Add your first item
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((it) => (
            <div key={it.id} className="border border-border bg-surface overflow-hidden group">
              <div className={`${it.layout} w-full bg-background relative overflow-hidden`}>
                <img
                  src={it.media_url}
                  alt={it.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                {it.on_landing && (
                  <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-heading uppercase tracking-wider px-2 py-1 flex items-center gap-1">
                    <Star className="h-3 w-3 fill-current" /> Landing
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="text-[10px] uppercase tracking-widest text-primary">{it.category}</div>
                <div className="font-heading uppercase tracking-wider mt-1 truncate">{it.title}</div>
                {it.location && (
                  <div className="text-xs text-muted-foreground truncate">{it.location}</div>
                )}
                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={() => openEdit(it)}
                    className="flex-1 text-xs font-heading uppercase tracking-wider border border-border px-2 py-1.5 hover:border-primary hover:text-primary transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleToggleLanding(it)}
                    title={it.on_landing ? "Remove from landing" : "Feature on landing"}
                    className={`p-1.5 border transition-colors ${
                      it.on_landing
                        ? "border-primary text-primary bg-primary/10"
                        : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                    }`}
                  >
                    {it.on_landing ? <Star className="h-3.5 w-3.5 fill-current" /> : <StarOff className="h-3.5 w-3.5" />}
                  </button>
                  <button
                    onClick={() => handleDelete(it.id)}
                    className="p-1.5 border border-border text-muted-foreground hover:border-red-500 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
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
          <div className="relative ml-auto w-full max-w-lg h-full bg-surface border-l border-border overflow-y-auto">
            <div className="sticky top-0 bg-surface/95 backdrop-blur border-b border-border px-6 py-4 flex items-center justify-between">
              <div className="font-heading uppercase tracking-wider text-sm">
                {form.id ? "Edit media" : "Add media"}
              </div>
              <button
                onClick={() => !saving && setDrawerOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Uploader */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Media
                </label>
                <div
                  onClick={() => fileRef.current?.click()}
                  className={`relative w-full ${form.layout} border-2 border-dashed border-border hover:border-primary bg-background cursor-pointer overflow-hidden group transition-colors`}
                >
                  {form.media_url ? (
                    <img src={form.media_url} alt="" className="absolute inset-0 h-full w-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                      <Upload className="h-8 w-8 mb-2" />
                      <div className="text-xs uppercase tracking-wider">Click to upload</div>
                      <div className="text-[10px] mt-1">PNG · JPG · WEBP · max 3MB</div>
                    </div>
                  )}
                  {form.media_url && (
                    <div className="absolute inset-0 bg-background/0 group-hover:bg-background/60 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="text-xs font-heading uppercase tracking-wider text-foreground">Replace</div>
                    </div>
                  )}
                </div>
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
                  placeholder="e.g. Overnight highway tow"
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
                  {CATEGORY_OPTIONS.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Location <span className="opacity-60 normal-case tracking-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full bg-background border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
                  placeholder="e.g. I-95 corridor"
                />
              </div>

              {/* Layout */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Layout / Aspect ratio
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {LAYOUT_OPTIONS.map((l) => (
                    <button
                      key={l.value}
                      type="button"
                      onClick={() => setForm({ ...form, layout: l.value })}
                      className={`border p-2 text-xs font-heading uppercase tracking-wider transition-colors ${
                        form.layout === l.value
                          ? "border-primary text-primary bg-primary/10"
                          : "border-border text-muted-foreground hover:border-primary hover:text-foreground"
                      }`}
                    >
                      <div className={`${l.value} w-full bg-background border border-border mb-2`} />
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Landing toggle */}
              <label className="flex items-center gap-3 border border-border bg-background p-4 cursor-pointer hover:border-primary transition-colors">
                <input
                  type="checkbox"
                  checked={form.on_landing}
                  onChange={(e) => setForm({ ...form, on_landing: e.target.checked })}
                  className="h-4 w-4 accent-primary"
                />
                <div>
                  <div className="text-sm font-heading uppercase tracking-wider">Feature on landing page</div>
                  <div className="text-xs text-muted-foreground">Appears in the homepage gallery carousel.</div>
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
                  {saving ? "Saving…" : form.id ? "Save changes" : "Add to gallery"}
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
