import { createFileRoute, Link } from "@tanstack/react-router";
import { Truck, Wrench, Waves, BatteryCharging, Container, Zap, Package, Building2, Anchor, ArrowRight, CheckCircle2, PhoneCall, Clock, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Towing, Recovery & Heavy Transport | CAAS" },
      { name: "description", content: "Full service list: vehicle towing, heavy equipment transport, container hauling, generator hauling, freight, recovery, roadside assistance, and off-road winch-out across Ghana." },
      { property: "og:title", content: "Services — CAAS Towing & Recovery" },
      { property: "og:description", content: "Every service CAAS Towing & Recovery offers — from vehicle towing to off-road winch-out." },
      { property: "og:url", content: "https://caastowing.com/services" },
    ],
    links: [{ rel: "canonical", href: "https://caastowing.com/services" }],
  }),
  component: Services,
});

type Service = {
  icon: typeof Truck;
  title: string;
  tagline: string;
  desc: string;
  whenToCall: string[];
  included: string[];
  benefits: string[];
};

const list: Service[] = [
  {
    icon: Truck,
    title: "Vehicle Towing",
    tagline: "Cars, SUVs, vans, trucks — moved safely, any distance.",
    desc: "We tow light-, medium-, and heavy-duty vehicles using flatbed and wheel-lift trucks. Every load is secured with commercial-grade straps and driven by insured operators. From a stalled sedan across town to a long-distance transport between cities, dispatch matches the right truck to the job.",
    whenToCall: ["Breakdowns and accidents", "Non-running vehicle relocation", "Dealer transfers and auction pickups", "Cross-country vehicle transport"],
    included: ["Flatbed or wheel-lift as needed", "Straps, wheel nets, and soft-tie options", "GPS-tracked driver with live ETA", "Standard drop-off up to agreed radius"],
    benefits: ["Damage-free loading", "Insured drivers", "Long-distance capable"],
  },
  {
    icon: Container,
    title: "Heavy Equipment Transport",
    tagline: "Excavators, loaders, forklifts — permitted and precise.",
    desc: "Lowboy and float trailers move construction and industrial machinery site to site. We handle permits for oversized loads, coordinate route surveys where required, and load with ramps or on-site cranes. Our operators are trained on rigging, tie-down patterns, and axle-weight compliance.",
    whenToCall: ["Site-to-site equipment relocation", "Machinery deliveries from suppliers", "End-of-project demobilization", "Cross-region equipment transport"],
    included: ["Lowboy / float trailer sizing", "Permits for oversized loads", "Rigging and tie-down", "Route planning and escorts if needed"],
    benefits: ["Lowboy trailers", "Permitted loads", "Cross-country routing"],
  },
  {
    icon: Package,
    title: "Container Hauling",
    tagline: "20ft and 40ft containers — port to yard, yard to site.",
    desc: "Tilt-bed and chassis units move loaded and empty containers between ports, depots, warehouses, and construction sites. We pick up from Tema and other yards, deliver to your address, and reposition empties. Same-day service is available for time-critical moves.",
    whenToCall: ["Port pickup after clearance", "Depot-to-site container delivery", "Empty container repositioning", "Storage yard consolidation"],
    included: ["20ft or 40ft chassis / tilt units", "Port and yard access coordination", "Ground-level drop where possible", "Wait-time transparency"],
    benefits: ["Tilt & chassis units", "Port pickups", "Yard-to-yard moves"],
  },
  {
    icon: Zap,
    title: "Generator Hauling",
    tagline: "Industrial generators loaded, tied down, and delivered.",
    desc: "From portable units to large industrial gensets, we handle loading with the right lifting gear, tie down for road stability, and deliver to your site. Coordination with site rigging teams is included so the unit lands where it's needed.",
    whenToCall: ["New generator delivery", "Relocation between facilities", "Rental fleet moves", "Emergency backup deployment"],
    included: ["Loading assistance with rigging", "Secure tie-down and padding", "Site delivery coordination", "Unloading support"],
    benefits: ["Any size", "Site delivery", "Rigging assistance"],
  },
  {
    icon: Truck,
    title: "Freight Services",
    tagline: "Time-critical freight with real communication.",
    desc: "Dedicated units for freight that needs to arrive on time. We provide direct driver contact, real-time status updates, and matched vehicle sizing — so your shipment moves without change-overs or shared-load delays.",
    whenToCall: ["Same-day and next-day freight", "Project-critical deliveries", "Dedicated point-to-point moves", "Sensitive or high-value cargo"],
    included: ["Dedicated vehicle assignment", "Driver contact throughout the trip", "Load securing and covers as needed", "Delivery confirmation"],
    benefits: ["Same-day options", "Dedicated units", "Real-time updates"],
  },
  {
    icon: Wrench,
    title: "Vehicle Recovery",
    tagline: "Ditch, rollover, and stuck-vehicle recovery.",
    desc: "When a vehicle is off the road, on its side, or immobilized in a difficult spot, our recovery crews bring winches, rigging, and (where needed) rotators to bring it back safely. Careful rigging protects the vehicle from further damage during recovery.",
    whenToCall: ["Ditch and embankment recoveries", "Rollovers and side-lying vehicles", "Stuck heavy vehicles", "Post-accident scene recovery"],
    included: ["Winch and rigging expertise", "Rotator support for heavy jobs", "Insurance-friendly documentation", "Onward tow to workshop if needed"],
    benefits: ["Winch & rigging expertise", "Rotator support", "Off-road capable"],
  },
  {
    icon: Waves,
    title: "Flood Recovery",
    tagline: "Rapid response to water-damaged vehicles.",
    desc: "After storms and flooding, we respond quickly to recover vehicles from water-affected areas. Careful lifting protects electronics and drivetrain. We work discreetly with insurance assessors and can move salvage to your preferred workshop or yard.",
    whenToCall: ["Vehicles submerged in floodwater", "Storm-damaged fleet recovery", "Insurance salvage moves", "Emergency after-hours recovery"],
    included: ["24/7 emergency crews", "Careful lifting to protect electronics", "Salvage handling and transport", "Assessor coordination"],
    benefits: ["24/7 emergency crews", "Salvage handling", "Insurance-friendly"],
  },
  {
    icon: BatteryCharging,
    title: "Roadside Assistance",
    tagline: "Jump-starts, tire changes, lockouts, fuel delivery.",
    desc: "Small problems that stop your day — a flat battery, a punctured tire, keys locked inside, an empty tank. Our roadside trucks carry the tools and consumables to solve most of them on the spot, at a fair flat rate with clear ETAs.",
    whenToCall: ["Dead battery / won't start", "Flat tire, no spare", "Keys locked in the vehicle", "Ran out of fuel"],
    included: ["Jump-start service", "Tire change or air top-up", "Lockout assistance", "Emergency fuel delivery"],
    benefits: ["Fast ETAs", "Fully equipped trucks", "Fair flat rates"],
  },
  {
    icon: Building2,
    title: "Commercial Fleet Support",
    tagline: "Priority dispatch and account management for fleets.",
    desc: "For logistics operators, insurers, and businesses running multiple vehicles, we set up dedicated accounts with priority dispatch, agreed SLAs, and consolidated monthly billing. One phone number, one contact — for every truck and every incident.",
    whenToCall: ["Company fleet needs 24/7 backup", "Insurance panel provider needed", "Nationwide response for a service network", "Monthly billing preferred over per-job payment"],
    included: ["Dedicated dispatch line", "Priority response over walk-ins", "Custom SLA and reporting", "Consolidated invoicing"],
    benefits: ["Priority response", "Consolidated billing", "Custom SLAs"],
  },
  {
    icon: Anchor,
    title: "Winch-Out & Off-Road Recovery",
    tagline: "Bogged, ditched, or stuck off-road — winched out.",
    desc: "For vehicles stuck in mud, sand, or off-track — where a standard tow can't reach — we bring heavy-duty winches, snatch blocks, and trained operators. We assess anchor points and pull direction to get you moving without damaging the vehicle.",
    whenToCall: ["4x4 stuck off-track", "Vehicles bogged in mud or sand", "Farm and construction site recoveries", "Beach and river-crossing incidents"],
    included: ["Heavy-duty winch equipment", "Snatch blocks and rigging", "Trained recovery operators", "Any-terrain capable trucks"],
    benefits: ["Heavy-duty winches", "Trained operators", "Any terrain"],
  },
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
            Anything with wheels, tracks, or a chassis — we move it. Here's the full menu, with what to expect from each service.
          </p>
          <div className="mt-8 flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> 24/7 dispatch</div>
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Insured drivers</div>
            <div className="flex items-center gap-2"><Truck className="h-4 w-4 text-primary" /> Nationwide coverage</div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-x space-y-8">
          {list.map((s, i) => (
            <article
              key={s.title}
              id={s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
              className="group border border-border bg-surface hover:border-primary transition-all"
            >
              <div className="grid md:grid-cols-[auto_1fr] gap-8 p-8">
                {/* Left: number + icon */}
                <div className="flex md:flex-col items-center md:items-start gap-6 md:gap-4">
                  <div className="font-display text-6xl text-primary/40 tabular-nums leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="inline-flex h-16 w-16 items-center justify-center bg-primary/10 text-primary shrink-0">
                    <s.icon className="h-8 w-8" />
                  </div>
                </div>

                {/* Right: content */}
                <div>
                  <h2 className="font-heading uppercase tracking-wider text-2xl">{s.title}</h2>
                  <p className="mt-1 text-primary text-sm font-heading uppercase tracking-wider">{s.tagline}</p>
                  <p className="mt-4 text-muted-foreground leading-relaxed">{s.desc}</p>

                  <div className="mt-6 grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="text-xs uppercase tracking-widest text-primary mb-3">When to call us</div>
                      <ul className="space-y-2">
                        {s.whenToCall.map((w) => (
                          <li key={w} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /> <span>{w}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-primary mb-3">What's included</div>
                      <ul className="space-y-2">
                        {s.included.map((w) => (
                          <li key={w} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /> <span>{w}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3 pt-6 border-t border-border">
                    <div className="flex flex-wrap gap-2 mr-auto">
                      {s.benefits.map((b) => (
                        <span key={b} className="text-[10px] uppercase tracking-widest border border-border px-2 py-1 text-muted-foreground">
                          {b}
                        </span>
                      ))}
                    </div>
                    <Link to="/request" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 font-heading uppercase tracking-wider text-sm hover:btn-glow transition-all">
                      Get Quote <ArrowRight className="h-4 w-4" />
                    </Link>
                    <a href="tel:+233246773279" className="inline-flex items-center gap-2 border border-border px-5 py-3 font-heading uppercase tracking-wider text-sm hover:border-primary hover:text-primary transition-all">
                      <PhoneCall className="h-4 w-4" /> Call
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
