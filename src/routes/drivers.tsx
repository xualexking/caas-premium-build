import { createFileRoute } from "@tanstack/react-router";
import { Wrench } from "lucide-react";

export const Route = createFileRoute("/drivers")({
  head: () => ({
    meta: [
      { title: "Partner Drivers Program — CAAS Towing & Recovery Ghana" },
      { name: "description", content: "Join the CAAS Towing & Recovery partner drivers program for experienced tow, recovery, and heavy transport operators in Ghana — coming soon." },
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: "Partner Drivers — CAAS Towing & Recovery" },
      { property: "og:description", content: "Partner drivers program coming soon." },
      { property: "og:url", content: "https://caastowing.com/drivers" },
    ],
    links: [{ rel: "canonical", href: "https://caastowing.com/drivers" }],
  }),
  component: Drivers,
});

function Drivers() {
  return (
    <section className="pt-40 pb-32 min-h-[70vh] flex items-center">
      <div className="container-x max-w-2xl text-center">
        <div className="inline-flex h-20 w-20 items-center justify-center bg-primary/10 text-primary mb-6">
          <Wrench className="h-10 w-10" />
        </div>
        <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Partner Drivers</div>
        <h1 className="font-display text-6xl md:text-7xl leading-[0.9]">Coming <span className="text-primary">Soon.</span></h1>
        <p className="mt-6 text-muted-foreground text-lg">
          We're building a driver partner program for experienced tow, recovery, and heavy transport operators. Check back soon or reach out via our contact page.
        </p>
      </div>
    </section>
  );
}
