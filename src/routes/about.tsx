import { createFileRoute } from "@tanstack/react-router";
import { Target, Eye, Award } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About CAAS Towing — Ghana's Trusted Towing & Recovery Team" },
      { name: "description", content: "The story, mission, and values behind CAAS Towing & Recovery — a professional heavy-duty towing and recovery team trusted by drivers and fleets across Ghana." },
      { property: "og:title", content: "About CAAS Towing & Recovery" },
      { property: "og:description", content: "Professional heavy-duty towing and recovery team trusted across Ghana." },
      { property: "og:url", content: "https://www.caastowing.com/about" },
      { property: "og:image", content: "https://www.caastowing.com/og-image.jpg" },
      { name: "twitter:image", content: "https://www.caastowing.com/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.caastowing.com/about" }],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="pt-40 pb-16 border-b border-border">
        <div className="container-x grid md:grid-cols-[2fr_1fr] gap-12 items-end">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">About CAAS</div>
            <h1 className="font-display text-6xl md:text-8xl leading-[0.9]">
              Ghana's Trusted <span className="text-primary">Towing</span> & Recovery Team.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              CAAS Towing &amp; Recovery is a full-service towing and heavy recovery outfit. We started with one truck and one promise — show up fast, do the job right, treat people well. That promise still runs everything we do.
            </p>
          </div>
          <img src="/caas.svg" alt="CAAS" className="h-48 w-48 justify-self-end rounded-2xl object-cover shadow-hard" />
        </div>
      </section>

      <section className="py-20">
        <div className="container-x grid md:grid-cols-3 gap-6">
          {[
            { icon: Target, title: "Mission", body: "Deliver fast, professional, and safe towing and recovery to every customer, at every hour." },
            { icon: Eye, title: "Vision", body: "Be the most trusted commercial and emergency towing partner in the regions we serve." },
            { icon: Award, title: "Values", body: "Safety first. Straight talk. Real accountability. Respect for every driver we help." },
          ].map((v) => (
            <div key={v.title} className="border border-border bg-surface p-8 hover:border-primary transition-colors">
              <v.icon className="h-8 w-8 text-primary" />
              <h3 className="mt-4 font-heading uppercase tracking-wider text-xl">{v.title}</h3>
              <p className="mt-2 text-muted-foreground">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-surface border-y border-border">
        <div className="container-x max-w-3xl">
          <h2 className="font-display text-4xl md:text-5xl">Why fleets and drivers stick with us.</h2>
          <div className="mt-8 space-y-6 text-muted-foreground text-lg leading-relaxed">
            <p>Every driver on our team is certified, insured, and trained on the heavy equipment we run. We invest in the fleet so we can say yes to the calls other companies pass on.</p>
            <p>Our commercial partners get dedicated dispatch, transparent billing, and a real person on the phone. Our roadside customers get calm, respectful help on what's usually a bad day.</p>
            <p>That's the CAAS standard. If we can't do it right, we don't do it.</p>
          </div>
        </div>
      </section>
    </>
  );
}
