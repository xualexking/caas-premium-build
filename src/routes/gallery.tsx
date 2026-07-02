import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — CAAS Towing & Recovery" },
      { name: "description", content: "Recent CAAS Towing & Recovery jobs: vehicle recoveries, heavy equipment transports, container moves, and commercial fleet support." },
      { property: "og:title", content: "Gallery — CAAS Towing & Recovery" },
      { property: "og:description", content: "Recent recovery, transport, and towing work." },
    ],
  }),
  component: Gallery,
});

const categories = ["All", "Vehicle Towing", "Recovery", "Heavy Equipment", "Containers", "Freight"] as const;

const items = [
  { cat: "Vehicle Towing", title: "Overnight highway tow", loc: "I-95 corridor", ratio: "aspect-[4/5]" },
  { cat: "Recovery", title: "Ditch recovery — cargo van", loc: "Rural route", ratio: "aspect-square" },
  { cat: "Heavy Equipment", title: "Excavator relocation", loc: "Construction site", ratio: "aspect-[3/4]" },
  { cat: "Containers", title: "40ft container drop", loc: "Port yard", ratio: "aspect-[4/3]" },
  { cat: "Freight", title: "Time-critical freight", loc: "Cross-state", ratio: "aspect-square" },
  { cat: "Recovery", title: "Flood recovery — sedan", loc: "Coastal district", ratio: "aspect-[3/4]" },
  { cat: "Heavy Equipment", title: "Generator hauling", loc: "Industrial park", ratio: "aspect-[4/5]" },
  { cat: "Vehicle Towing", title: "Fleet vehicle pickup", loc: "Commercial depot", ratio: "aspect-[4/3]" },
];

function Gallery() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const visible = items.filter((i) => filter === "All" || i.cat === filter);

  return (
    <>
      <section className="pt-40 pb-12 border-b border-border">
        <div className="container-x">
          <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Gallery</div>
          <h1 className="font-display text-6xl md:text-8xl leading-[0.9]">
            Recent <span className="text-primary">jobs</span> from the road.
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

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {visible.map((it, i) => (
              <div key={i} className="break-inside-avoid group relative overflow-hidden border border-border bg-surface">
                <div className={`${it.ratio} w-full hero-grid bg-gradient-to-br from-surface-elevated to-background flex items-center justify-center`}>
                  <div className="font-display text-6xl text-primary/20">CAAS</div>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-background via-background/80 to-transparent translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                  <div className="text-xs uppercase tracking-widest text-primary">{it.cat}</div>
                  <div className="font-heading uppercase tracking-wider mt-1">{it.title}</div>
                  <div className="text-xs text-muted-foreground">{it.loc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
