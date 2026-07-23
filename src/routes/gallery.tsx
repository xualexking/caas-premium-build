import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { listGallery, type GalleryItem } from "@/lib/gallery";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Towing & Recovery Gallery — CAAS Jobs Across Ghana" },
      { name: "description", content: "See CAAS Towing & Recovery in action — vehicle recoveries, heavy equipment transport, container moves, flood recovery, and commercial fleet support across Ghana." },
      { property: "og:title", content: "Towing & Recovery Gallery — CAAS Ghana" },
      { property: "og:description", content: "Recent towing, recovery, and heavy transport jobs by CAAS across Ghana." },
      { property: "og:url", content: "https://www.caastowing.com/gallery" },
      { property: "og:image", content: "https://www.caastowing.com/og-image.jpg" },
      { name: "twitter:image", content: "https://www.caastowing.com/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.caastowing.com/gallery" }],
  }),
  component: Gallery,
});

const FALLBACK: GalleryItem[] = [
  { id: -1, category: "Vehicle Towing", title: "Overnight highway tow", location: "I-95 corridor", layout: "aspect-[4/5]", media_url: "", media_type: "image", on_landing: false, display_order: 0, created_at: "" },
  { id: -2, category: "Recovery", title: "Ditch recovery — cargo van", location: "Rural route", layout: "aspect-square", media_url: "", media_type: "image", on_landing: false, display_order: 0, created_at: "" },
  { id: -3, category: "Heavy Equipment", title: "Excavator relocation", location: "Construction site", layout: "aspect-[3/4]", media_url: "", media_type: "image", on_landing: false, display_order: 0, created_at: "" },
  { id: -4, category: "Containers", title: "40ft container drop", location: "Port yard", layout: "aspect-[4/3]", media_url: "", media_type: "image", on_landing: false, display_order: 0, created_at: "" },
  { id: -5, category: "Freight", title: "Time-critical freight", location: "Cross-state", layout: "aspect-square", media_url: "", media_type: "image", on_landing: false, display_order: 0, created_at: "" },
  { id: -6, category: "Recovery", title: "Flood recovery — sedan", location: "Coastal district", layout: "aspect-[3/4]", media_url: "", media_type: "image", on_landing: false, display_order: 0, created_at: "" },
];


function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [filter, setFilter] = useState<string>("All");

  useEffect(() => {
    listGallery({ data: { landingOnly: false } })
      .then((rows) => setItems(rows as GalleryItem[]))
      .catch(() => setItems([]))
      .finally(() => setLoaded(true));
  }, []);

  const source = loaded && items.length > 0 ? items : FALLBACK;

  const categories = useMemo(() => {
    const set = new Set<string>();
    source.forEach((i) => set.add(i.category));
    return ["All", ...Array.from(set)];
  }, [source]);

  const visible = source.filter((i) => filter === "All" || i.category === filter);

  return (
    <>
      <section className="pt-40 pb-12 border-b border-border">
        <div className="container-x">
          <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Gallery</div>
          <h1 className="font-display text-6xl md:text-8xl leading-[0.9]">
            Towing & Recovery <span className="text-primary">Jobs</span> Across Ghana.
          </h1>
        </div>
      </section>

      <section className="py-12">
        <div className="container-x">
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-2 border font-heading uppercase tracking-wider text-xs transition-colors ${
                  filter === c ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary hover:text-primary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {visible.length === 0 ? (
            <div className="border border-border bg-surface p-16 text-center text-muted-foreground font-heading uppercase tracking-wider text-sm">
              No items yet
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {visible.map((it) => (
                <div key={it.id} className="break-inside-avoid group relative overflow-hidden border border-border bg-surface">
                  <div className={`${it.layout} w-full relative bg-gradient-to-br from-surface-elevated to-background flex items-center justify-center`}>
                    {it.media_url ? (
                      it.media_type === "video" ? (
                        <video
                          src={it.media_url}
                          className="absolute inset-0 h-full w-full object-cover"
                          controls
                          playsInline
                          preload="metadata"
                        />
                      ) : (
                        <img src={it.media_url} alt={it.title} className="absolute inset-0 h-full w-full object-cover" />
                      )
                    ) : (
                      <div className="hero-grid absolute inset-0 flex items-center justify-center">
                        <div className="font-display text-6xl text-primary/20">CAAS</div>
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-background via-background/80 to-transparent translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                    <div className="text-xs uppercase tracking-widest text-primary">{it.category}</div>
                    <div className="font-heading uppercase tracking-wider mt-1">{it.title}</div>
                    {it.location && <div className="text-xs text-muted-foreground">{it.location}</div>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

