import { createFileRoute, Link } from "@tanstack/react-router";
import { Truck, Wrench, Waves, BatteryCharging, Container, Zap, Package, Building2, Anchor, ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — CAAS Towing & Recovery" },
      { name: "description", content: "Full service list: vehicle towing, heavy equipment transport, container hauling, generator hauling, freight, vehicle recovery, flood recovery, roadside assistance, commercial fleet support, and winch-out & off-road recovery." },
      { property: "og:title", content: "Services — CAAS Towing & Recovery" },
      { property: "og:description", content: "Every service CAAS Towing & Recovery offers, from vehicle towing to winch-out and off-road recovery." },
    ],
  }),
  component: Services,
});

const list = [
  { icon: Truck, title: "Vehicle Towing", desc: "Light-, medium-, and heavy-duty towing for cars, SUVs, trucks, vans and specialty vehicles.", benefits: ["Flatbed & wheel-lift", "Damage-free loading", "Long-distance transport"] },
  { icon: Container, title: "Heavy Equipment Transport", desc: "Excavators, loaders, forklifts, and construction machinery moved with precision.", benefits: ["Lowboy trailers", "Permitted loads", "Cross-country routing"] },
  { icon: Package, title: "Container Hauling", desc: "20ft and 40ft container pickup, delivery, and repositioning for depots and yards.", benefits: ["Tilt & chassis units", "Port pickups", "Yard-to-yard moves"] },
  { icon: Zap, title: "Generator Hauling", desc: "Industrial generator transport with careful loading and secure tie-downs.", benefits: ["Any size", "Site delivery", "Rigging assistance"] },
  { icon: Truck, title: "Freight Services", desc: "Time-critical freight moved reliably with tracking and communication.", benefits: ["Same-day options", "Dedicated units", "Real-time updates"] },
  { icon: Wrench, title: "Vehicle Recovery", desc: "Ditch pulls, rollovers, off-road recovery — brought back safely with the right rigging.", benefits: ["Winch & rigging expertise", "Rotator support", "Off-road capable"] },
  { icon: Waves, title: "Flood Recovery", desc: "Rapid response to water-damaged vehicles and equipment. Discreet and careful.", benefits: ["24/7 emergency crews", "Salvage handling", "Insurance-friendly"] },
  { icon: BatteryCharging, title: "Roadside Assistance", desc: "Jump-starts, tire changes, lockouts, and fuel delivery from friendly drivers.", benefits: ["Fast ETAs", "Fully equipped trucks", "Fair flat rates"] },
  { icon: Building2, title: "Commercial Fleet Support", desc: "Dedicated dispatch and account management for fleet operators.", benefits: ["Priority response", "Consolidated billing", "Custom SLAs"] },
  { icon: Anchor, title: "Winch-Out & Off-Road Recovery", desc: "Bogged, ditched, or stuck off-road — we winch you out with the right gear and technique.", benefits: ["Heavy-duty winches", "Trained operators", "Any terrain"] },
];

function Services() {
  return (
    <>
      <section className="pt-40 pb-16 border-b border-border">
        <div className="container-x max-w-4xl">
          <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Services</div>
          <h1 className="font-display text-6xl md:text-8xl leading-[0.9]">
            Full-Service <span className="text-primary">Towing</span> &amp; Heavy Recovery.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            Anything with wheels, tracks, or a chassis — we move it. Here's the full menu.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-x space-y-6">
          {list.map((s, i) => (
            <div key={s.title} className="group grid md:grid-cols-[auto_1fr_auto] gap-8 items-center border border-border bg-surface p-8 hover:border-primary transition-all">
              <div className="flex items-center gap-6">
                <div className="font-display text-5xl text-primary/40 tabular-nums w-16">{String(i + 1).padStart(2, "0")}</div>
                <div className="inline-flex h-16 w-16 items-center justify-center bg-primary/10 text-primary">
                  <s.icon className="h-8 w-8" />
                </div>
              </div>
              <div>
                <h2 className="font-heading uppercase tracking-wider text-2xl">{s.title}</h2>
                <p className="mt-2 text-muted-foreground">{s.desc}</p>
                <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                  {s.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary" /> {b}
                    </li>
                  ))}
                </ul>
              </div>
              <Link to="/request" className="justify-self-start md:justify-self-end inline-flex items-center gap-2 border border-border px-5 py-3 font-heading uppercase tracking-wider text-sm hover:border-primary hover:text-primary transition-all">
                Get Quote <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
