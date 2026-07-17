import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Upload, Trash2, RefreshCw, Save, X, Wrench, Image as ImageIcon } from "lucide-react";
import {
  getServiceCovers,
  upsertServiceCover,
  deleteServiceCover,
  SERVICE_LIST,
} from "@/lib/services";

export const Route = createFileRoute("/garage-dispatch/services")({
  component: ServicesAdmin,
});

const MAX_IMAGE_BYTES = 3 * 1024 * 1024; // 3MB

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

function ServicesAdmin() {
  const [covers, setCovers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [drawerSlug, setDrawerSlug] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const map = await getServiceCovers();
      setCovers(map);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const openDrawer = (slug: string) => {
    setDrawerSlug(slug);
    setPreviewUrl(covers[slug] ?? "");
    setError("");
  };

  const handleFile = async (file: File) => {
    setError("");
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setError("Image too large. Max 3MB.");
      return;
    }
    const dataUrl = await fileToDataUrl(file);
    setPreviewUrl(dataUrl);
  };

  const handleSave = async () => {
    if (!drawerSlug || !previewUrl) return;
    setSaving(true);
    setError("");
    try {
      await upsertServiceCover({ data: { slug: drawerSlug, cover_url: previewUrl } });
      setCovers((prev) => ({ ...prev, [drawerSlug]: previewUrl }));
      setDrawerSlug(null);
    } catch (e: any) {
      setError(e?.message ?? "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("Remove this cover image?")) return;
    await deleteServiceCover({ data: { slug } });
    setCovers((prev) => { const n = { ...prev }; delete n[slug]; return n; });
  };

  const drawerService = SERVICE_LIST.find((s) => s.slug === drawerSlug);
  const covered = SERVICE_LIST.filter((s) => covers[s.slug]).length;

  return (
    <div className="max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="font-heading uppercase tracking-wider text-2xl">Services</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage cover images for each service. Images appear on the services page.
          </p>
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
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="border border-border bg-surface p-5">
          <div className="text-3xl font-display text-primary">{SERVICE_LIST.length}</div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">Total services</div>
        </div>
        <div className="border border-border bg-surface p-5">
          <div className="text-3xl font-display text-green-500">{covered}</div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">Have cover images</div>
        </div>
      </div>

      {/* Services grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICE_LIST.map((svc, i) => {
            const cover = covers[svc.slug];
            return (
              <div key={svc.slug} className="border border-border bg-surface overflow-hidden group">
                {/* Cover image / placeholder */}
                <div className="aspect-[16/9] relative bg-background overflow-hidden">
                  {cover ? (
                    <img
                      src={cover}
                      alt={svc.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 hero-grid flex flex-col items-center justify-center text-muted-foreground gap-2">
                      <ImageIcon className="h-8 w-8 opacity-30" />
                      <div className="text-[10px] uppercase tracking-widest opacity-50">No cover</div>
                    </div>
                  )}
                  <div className="absolute top-2 left-2 bg-background/80 text-foreground text-[10px] font-heading uppercase tracking-wider px-2 py-1">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start gap-2">
                    <Wrench className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <div className="font-heading uppercase tracking-wider text-sm leading-snug">{svc.title}</div>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={() => openDrawer(svc.slug)}
                      className="flex-1 text-xs font-heading uppercase tracking-wider border border-border px-2 py-1.5 hover:border-primary hover:text-primary transition-colors"
                    >
                      {cover ? "Replace" : "Add Cover"}
                    </button>
                    {cover && (
                      <button
                        onClick={() => handleDelete(svc.slug)}
                        className="p-1.5 border border-border text-muted-foreground hover:border-red-500 hover:text-red-500 transition-colors"
                        title="Remove cover"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Drawer */}
      {drawerSlug && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
            onClick={() => !saving && setDrawerSlug(null)}
          />
          <div className="relative ml-auto w-full max-w-lg h-full bg-surface border-l border-border overflow-y-auto">
            <div className="sticky top-0 bg-surface/95 backdrop-blur border-b border-border px-6 py-4 flex items-center justify-between">
              <div className="font-heading uppercase tracking-wider text-sm">
                {drawerService?.title} — Cover Image
              </div>
              <button
                onClick={() => !saving && setDrawerSlug(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Upload area */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Cover Image <span className="normal-case opacity-60">(max 3MB, JPG/PNG/WebP)</span>
                </label>
                <div
                  onClick={() => fileRef.current?.click()}
                  className="relative w-full aspect-[16/9] border-2 border-dashed border-border hover:border-primary bg-background cursor-pointer overflow-hidden group transition-colors"
                >
                  {previewUrl ? (
                    <img src={previewUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                      <Upload className="h-8 w-8 mb-2" />
                      <div className="text-xs uppercase tracking-wider">Click to upload</div>
                      <div className="text-[10px] mt-1">JPG, PNG or WebP · Max 3MB</div>
                    </div>
                  )}
                  {previewUrl && (
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

              {error && (
                <div className="text-xs text-red-500 border border-red-500/30 bg-red-500/10 px-4 py-3">
                  {error}
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleSave}
                  disabled={saving || !previewUrl}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-3 font-heading uppercase tracking-wider text-sm hover:btn-glow disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  {saving ? "Saving…" : "Save Cover"}
                </button>
                <button
                  onClick={() => setDrawerSlug(null)}
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
