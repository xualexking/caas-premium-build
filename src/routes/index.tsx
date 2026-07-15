import { createFileRoute, Link } from "@tanstack/react-router";
import Autoplay from "embla-carousel-autoplay";
import { useState, useEffect } from "react";
import {
  Truck, Wrench, Waves, BatteryCharging, Container, Zap, Package, Building2, ShieldCheck,
  Clock, Users, Gauge, DollarSign, ArrowRight, PhoneCall, Star, CheckCircle2, Anchor,
  Car, Shield, Boxes, Factory, Warehouse, HardHat, Hammer, Plug, Store, Ship, Building, Hotel, Cog,
  MessageSquarePlus,
} from "lucide-react";
import hero from "@/assets/hero-truck.jpg";
import logo from "@/assets/caas-logo.asset.json";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { getApprovedReviews, type Review } from "@/lib/reviews";
import { listGallery, type GalleryItem } from "@/lib/gallery";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CAAS Towing & Recovery — 24/7 Heavy Duty Towing & Transport in Ghana" },
      { name: "description", content: "24/7 emergency towing, heavy equipment transport, vehicle recovery, and commercial fleet support across Ghana. Fast dispatch. Trusted by drivers and fleets." },
      { property: "og:title", content: "CAAS Towing & Recovery — 24/7 Heavy Duty Towing" },
      { property: "og:description", content: "From cars to cargo — we move it all. Trusted across Ghana." },
      { property: "og:url", content: "https://caastowing.com/" },
    ],
    links: [{ rel: "canonical", href: "https://caastowing.com/" }],
  }),
  component: Home,
});

const services = [
  {
    icon: Truck,
    title: "Vehicle Towing",
    desc: "Flatbed and wheel-lift towing for cars, SUVs, vans, and trucks — damage-free loading, insured drivers, and long-distance transport across Ghana.",
    points: ["Flatbed & wheel-lift", "Damage-free loading", "Long-distance capable"],
  },
  {
    icon: Container,
    title: "Heavy Equipment & Container Transport",
    desc: "Lowboy hauling for excavators, loaders, and forklifts, plus 20ft / 40ft container pickup, delivery, and yard repositioning with permitted loads.",
    points: ["Lowboy trailers", "Permitted heavy loads", "Port & yard moves"],
  },
  {
    icon: Wrench,
    title: "Recovery & Roadside Assistance",
    desc: "Ditch pulls, rollovers, flood recovery, jump-starts, tire changes, lockouts and fuel delivery — 24/7 emergency response with the right rigging.",
    points: ["24/7 dispatch", "Winch & rigging", "Roadside fixes"],
  },
];

const steps = [
  { n: "01", title: "Request a Quote", desc: "Tell us where you are and what you need." },
  { n: "02", title: "We Contact You", desc: "Fast confirmation by phone, email or WhatsApp." },
  { n: "03", title: "Dispatch Truck", desc: "The nearest driver is on the way — GPS tracked." },
  { n: "04", title: "Service Completed", desc: "Job done safely. Follow-up support if needed." },
];

const testimonials = [
  { name: "Marcus O.", role: "Fleet Manager", quote: "CAAS pulled two of our rigs out of a bad situation overnight. Fast, professional, and no drama." },
  { name: "Angela T.", role: "Construction PM", quote: "They moved a 30-ton excavator across three sites without a single issue. Our go-to." },
  { name: "Daniel R.", role: "Business Owner", quote: "Called at 2am after a flood. They were there in under an hour and saved my van." },
];

const SEED_REVIEWS: Review[] = [
  { id: -1, name: "Marcus O.", role: "Fleet Manager", rating: 5, quote: "CAAS pulled two of our rigs out of a bad situation overnight. Fast, professional, and no drama.", status: "approved", created_at: "", reviewed_at: null },
  { id: -2, name: "Angela T.", role: "Construction PM", rating: 5, quote: "They moved a 30-ton excavator across three sites without a single issue. Our go-to.", status: "approved", created_at: "", reviewed_at: null },
  { id: -3, name: "Daniel R.", role: "Business Owner", rating: 5, quote: "Called at 2am after a flood. They were there in under an hour and saved my van.", status: "approved", created_at: "", reviewed_at: null },
];

const gallerySlides = [
  { label: "Highway Recovery", tone: "from-primary/30 to-primary/5" },
  { label: "Heavy Equipment", tone: "from-primary/10 to-primary/30" },
  { label: "Container Haul", tone: "from-primary/25 to-primary/5" },
  { label: "Generator Move", tone: "from-primary/5 to-primary/25" },
  { label: "Flood Recovery", tone: "from-primary/20 to-primary/5" },
  { label: "Roadside Assist", tone: "from-primary/10 to-primary/25" },
];

const industries = [
  { icon: Car, title: "Individual Vehicle Owners", desc: "Fast and reliable towing, recovery, roadside assistance, and long-distance vehicle transport." },
  { icon: Shield, title: "Insurance Companies", desc: "Accident recovery, breakdown assistance, vehicle transportation, and claims support." },
  { icon: Truck, title: "Logistics & Transport Companies", desc: "Recovery and transport services for trucks, trailers, commercial vehicles, and freight." },
  { icon: Building2, title: "Commercial Fleet Operators", desc: "24/7 support for company vehicles, delivery vans, trucks, and business fleets." },
  { icon: Boxes, title: "Freight & Cargo Companies", desc: "Container hauling, cargo movement, and specialized freight transport solutions." },
  { icon: HardHat, title: "Construction Companies", desc: "Transport and recovery of construction equipment, machinery, and site vehicles." },
  { icon: Cog, title: "Heavy Equipment Owners", desc: "Safe transportation of excavators, forklifts, generators, compressors, and industrial equipment." },
  { icon: Plug, title: "Generator Suppliers & Power Companies", desc: "Generator transport, relocation, loading, and delivery." },
  { icon: Warehouse, title: "Container & Warehousing Companies", desc: "Container movement, recovery, and relocation services." },
  { icon: Store, title: "Car Dealerships", desc: "Vehicle delivery, dealer transfers, auction pickups, and customer vehicle transportation." },
  { icon: Ship, title: "Vehicle Importers & Auto Traders", desc: "Transport from ports, auctions, dealerships, and storage facilities." },
  { icon: Factory, title: "Manufacturing & Industrial Companies", desc: "Movement of machinery, industrial equipment, and production assets." },
  { icon: Building, title: "Government & Public Institutions", desc: "Emergency recovery, fleet transport, and specialized transport support." },
  { icon: Hotel, title: "Hotels, Hospitals & Corporate Organizations", desc: "Reliable transport support for company fleets, utility vehicles, and equipment." },
  { icon: Hammer, title: "Equipment Rental Companies", desc: "Transportation and recovery of rented construction and industrial equipment." },
];

function Home() {
  const [reviews, setReviews] = useState<Review[]>(SEED_REVIEWS);
  const [landingGallery, setLandingGallery] = useState<GalleryItem[]>([]);

  useEffect(() => {
    getApprovedReviews().then((rows) => {
      if (rows.length > 0) setReviews(rows);
    }).catch(() => {/* keep seed reviews on error */});
    listGallery({ data: { landingOnly: true } })
      .then((rows) => setLandingGallery(rows as GalleryItem[]))
      .catch(() => {/* fallback to hardcoded slides */});
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[100vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={hero} alt="Heavy duty tow truck on highway at night" className="h-full w-full object-cover" width={1920} height={1280} />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
          <div className="absolute inset-0 hero-grid opacity-30" />
        </div>

        <div className="container-x relative z-10 pt-32 pb-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs uppercase tracking-[0.25em] text-primary mb-6 animate-fade-in">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              24 / 7 Emergency Dispatch
            </div>
            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl leading-[0.9] text-foreground animate-fade-in">
              From Cars<br />
              To <span className="text-primary">Cargo</span> —<br />
              We Move It All.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl animate-fade-in">
              24/7 emergency towing, heavy equipment transport, flood recovery, and commercial fleet support. When the road turns rough, CAAS rolls out.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/request" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-4 font-heading uppercase tracking-wider hover:btn-glow transition-all">
                Request Service <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="tel:+233246773279" className="inline-flex items-center gap-2 border border-border bg-background/40 backdrop-blur px-6 py-4 font-heading uppercase tracking-wider hover:border-primary hover:text-primary transition-all">
                <PhoneCall className="h-4 w-4" /> Call Now
              </a>
            </div>

            <div className="mt-14 grid grid-cols-3 gap-6 max-w-lg">
              {[
                { k: "24/7", v: "Dispatch" },
                { k: "15+", v: "Years Experience" },
                { k: "5k+", v: "Jobs Completed" },
              ].map((s) => (
                <div key={s.v} className="border-l-2 border-primary pl-4">
                  <div className="font-display text-3xl text-foreground">{s.k}</div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden lg:block absolute right-8 bottom-8 z-10">
          <img src={logo.url} alt="" className="h-32 w-32 rounded-xl object-cover opacity-90 shadow-hard" />
        </div>
      </section>

      {/* MARQUEE STRIP */}
      <div className="border-y border-border bg-primary text-primary-foreground overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee py-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 pr-12 font-heading uppercase tracking-[0.3em] text-sm">
              <span>✦ 24/7 Response</span><span>✦ Heavy Duty</span><span>✦ Nationwide</span>
              <span>✦ Insured Drivers</span><span>✦ Commercial Fleets</span><span>✦ Fast Dispatch</span>
              <span>✦ Recovery Specialists</span><span>✦ Since 2010</span>
            </div>
          ))}
        </div>
      </div>

      {/* WHY CHOOSE CAAS */}
      <section className="py-24 relative">
        <div className="container-x">
          <div className="max-w-3xl">
            <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Why Choose CAAS</div>
            <h2 className="font-display text-5xl lg:text-7xl leading-[0.95]">
              From Cars To <span className="text-primary">Cargo.</span><br />
              We Move It All.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              Trusted for vehicle towing, recovery, roadside assistance, freight, container hauling, generator transport, and heavy equipment movement across Ghana.
            </p>
          </div>

          <div className="mt-12">
            <Carousel plugins={[Autoplay({ delay: 4000, stopOnInteraction: false })]} opts={{ loop: true, align: "start" }} className="w-full">
              <CarouselContent className="-ml-4">
                {landingGallery.length > 0
                  ? landingGallery.map((g) => (
                      <CarouselItem key={g.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                        <div className={`relative ${g.layout} w-full overflow-hidden border border-border bg-background flex items-end`}>
                          {g.media_type === "video" ? (
                            <video
                              src={g.media_url}
                              className="absolute inset-0 h-full w-full object-cover"
                              autoPlay
                              muted
                              loop
                              playsInline
                              preload="metadata"
                            />
                          ) : (
                            <img src={g.media_url} alt={g.title} className="absolute inset-0 h-full w-full object-cover" />
                          )}
                          <div className="relative w-full p-5 bg-gradient-to-t from-background via-background/70 to-transparent">
                            <div className="text-xs uppercase tracking-widest text-primary">{g.category}</div>
                            <div className="font-heading uppercase tracking-wider mt-1">{g.title}</div>
                          </div>
                        </div>
                      </CarouselItem>
                    ))
                  : gallerySlides.map((g) => (
                      <CarouselItem key={g.label} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                        <div className={`relative aspect-[4/3] w-full overflow-hidden border border-border bg-gradient-to-br ${g.tone} hero-grid flex items-end`}>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="font-display text-6xl text-primary/30">CAAS</div>
                          </div>
                          <div className="relative w-full p-5 bg-gradient-to-t from-background via-background/70 to-transparent">
                            <div className="text-xs uppercase tracking-widest text-primary">On the Job</div>
                            <div className="font-heading uppercase tracking-wider mt-1">{g.label}</div>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 bg-surface border-y border-border">
        <div className="container-x">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Our Services</div>
              <h2 className="font-display text-5xl lg:text-6xl leading-[0.95]">Every Job. <span className="text-primary">Handled.</span></h2>
            </div>
            <Link to="/services" className="inline-flex items-center gap-2 font-heading uppercase tracking-wider text-sm text-primary hover:gap-3 transition-all">
              View all services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {services.map((s) => (
              <div key={s.title} className="group relative border border-border bg-background p-8 overflow-hidden hover:border-primary transition-all flex flex-col">
                <div className="absolute -top-10 -right-10 h-32 w-32 diag-stripes opacity-0 group-hover:opacity-10 transition-opacity" />
                <s.icon className="h-10 w-10 text-primary" />
                <h3 className="mt-6 font-heading uppercase tracking-wider text-xl">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                <ul className="mt-5 space-y-2">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> {p}
                    </li>
                  ))}
                </ul>
                <Link to="/services" className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-wider text-primary opacity-80 group-hover:opacity-100 group-hover:gap-3 transition-all">
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">How It Works</div>
            <h2 className="font-display text-5xl lg:text-6xl leading-[0.95]">From call to <span className="text-primary">completed</span>.</h2>
          </div>
          <div className="relative grid md:grid-cols-4 gap-6">
            <div className="hidden md:block absolute top-6 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
            {steps.map((s) => (
              <div key={s.n} className="relative text-center">
                <div className="relative inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground font-display text-lg mb-5">
                  {s.n}
                </div>
                <h3 className="font-heading uppercase tracking-wider text-lg">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-[220px] mx-auto">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES SERVED */}
      <section className="py-24 bg-surface border-y border-border">
        <div className="container-x">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Industries We Serve</div>
              <h2 className="font-display text-5xl lg:text-6xl leading-[0.95]">
                Built for <span className="text-primary">every sector.</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                From individual drivers to national fleets — CAAS moves the people, vehicles, and equipment that keep Ghana running.
              </p>
            </div>
          </div>

          <Carousel plugins={[Autoplay({ delay: 4000, stopOnInteraction: false })]} opts={{ loop: true, align: "start" }} className="w-full">
            <CarouselContent className="-ml-4">
              {industries.map((ind) => (
                <CarouselItem key={ind.title} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <div className="h-full group border border-border bg-background p-6 hover:border-primary transition-all">
                    <div className="inline-flex h-12 w-12 items-center justify-center bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors mb-4">
                      <ind.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-heading uppercase tracking-wider text-base leading-snug">{ind.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{ind.desc}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24">
        <div className="container-x">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12">
            <div className="text-center sm:text-left max-w-2xl">
              <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Testimonials</div>
              <h2 className="font-display text-5xl lg:text-6xl leading-[0.95]">Trusted on the <span className="text-primary">road.</span></h2>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {reviews.map((t) => (
              <div key={t.id} className="border border-border bg-surface p-7 hover:border-primary transition-colors">
                <div className="flex gap-1 text-primary mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < t.rating ? "fill-primary" : "fill-transparent"}`} />
                  ))}
                </div>
                <p className="text-foreground/90 leading-relaxed">"{t.quote}"</p>
                <div className="mt-5 pt-5 border-t border-border">
                  <div className="font-heading uppercase tracking-wider text-sm">{t.name}</div>
                  {t.role && <div className="text-xs text-muted-foreground">{t.role}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-surface border-t border-border">
        <div className="container-x">
          <div className="relative overflow-hidden border border-primary/30 bg-gradient-to-br from-surface to-background p-10 md:p-16">
            <div className="absolute top-0 right-0 h-full w-1/2 diag-stripes opacity-[0.06]" />
            <div className="relative grid md:grid-cols-[2fr_1fr] gap-10 items-center">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Need Immediate Help?</div>
                <h2 className="font-display text-5xl md:text-6xl leading-[0.95]">
                  Stuck? Stranded?<br /><span className="text-primary">We're rolling.</span>
                </h2>
                <p className="mt-4 text-muted-foreground max-w-md">
                  Talk to a real dispatcher within minutes. Any vehicle, any equipment, any hour.
                </p>
                <ul className="mt-6 grid sm:grid-cols-2 gap-2 text-sm">
                  {["No dispatch delays", "Transparent pricing", "Fully insured", "Nationwide network"].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-foreground/80">
                      <CheckCircle2 className="h-4 w-4 text-primary" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-3">
                <a href="tel:+233246773279" className="text-center bg-primary text-primary-foreground px-6 py-5 font-heading uppercase tracking-widest hover:btn-glow transition-all">
                  <PhoneCall className="inline h-4 w-4 mr-2" /> Call 24/7
                </a>
                <Link to="/request" className="text-center border border-border bg-background/60 px-6 py-5 font-heading uppercase tracking-widest hover:border-primary hover:text-primary transition-all">
                  Request Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
