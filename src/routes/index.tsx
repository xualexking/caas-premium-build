import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Truck, Wrench, Waves, BatteryCharging, Container, Zap, Package, Building2, ShieldCheck,
  Clock, Users, Gauge, DollarSign, ArrowRight, PhoneCall, Star, CheckCircle2,
} from "lucide-react";
import hero from "@/assets/hero-truck.jpg";
import logo from "@/assets/caas-logo.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CAAS Towing & Recovery — 24/7 Heavy Duty Towing & Transport" },
      { name: "description", content: "24/7 emergency towing, heavy equipment transport, vehicle recovery, and commercial fleet support. Fast dispatch. Trusted by drivers and fleets." },
      { property: "og:title", content: "CAAS Towing & Recovery — 24/7 Heavy Duty Towing" },
      { property: "og:description", content: "Fast, reliable, professional towing and heavy recovery." },
    ],
  }),
  component: Home,
});

const services = [
  { icon: Truck, title: "Vehicle Towing", desc: "Light-duty to heavy-duty towing for cars, SUVs, trucks, and vans." },
  { icon: Wrench, title: "Vehicle Recovery", desc: "Off-road, ditch, and rollover recovery with specialized equipment." },
  { icon: Waves, title: "Flood Recovery", desc: "Rapid response to water-logged vehicles and equipment." },
  { icon: BatteryCharging, title: "Roadside Assistance", desc: "Jump-starts, tire changes, lockouts and fuel delivery." },
  { icon: Container, title: "Heavy Equipment Transport", desc: "Excavators, loaders, and construction machinery hauling." },
  { icon: Package, title: "Container Transport", desc: "20ft and 40ft container pickup, delivery, and repositioning." },
  { icon: Zap, title: "Generator Hauling", desc: "Safe transport of industrial generators of any size." },
  { icon: Truck, title: "Freight Services", desc: "Reliable freight movement for time-critical shipments." },
  { icon: Building2, title: "Commercial Fleet Support", desc: "Priority dispatch and dedicated accounts for fleet operators." },
];

const perks = [
  { icon: Clock, title: "24 / 7 Response", desc: "Around the clock. Every day of the year." },
  { icon: Users, title: "Professional Drivers", desc: "Certified, insured, and highly experienced." },
  { icon: ShieldCheck, title: "Heavy Duty Equipment", desc: "Modern, well-maintained fleet built for the job." },
  { icon: Gauge, title: "Fast Dispatch", desc: "Rapid ETAs, GPS-tracked vehicles." },
  { icon: DollarSign, title: "Fair Pricing", desc: "Transparent quotes, no surprises." },
  { icon: Building2, title: "Commercial Experts", desc: "Trusted by fleets, contractors, and logistics teams." },
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

function Home() {
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
              Fast. Reliable.<br />
              <span className="text-primary">Heavy Duty</span> Towing<br />
              &amp; Recovery.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl animate-fade-in">
              24/7 emergency towing, heavy equipment transport, flood recovery, and commercial fleet support. When the road turns rough, CAAS rolls out.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/request" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-4 font-heading uppercase tracking-wider hover:btn-glow transition-all">
                Request Service <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="tel:+10000000000" className="inline-flex items-center gap-2 border border-border bg-background/40 backdrop-blur px-6 py-4 font-heading uppercase tracking-wider hover:border-primary hover:text-primary transition-all">
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

      {/* WHY */}
      <section className="py-24 relative">
        <div className="container-x">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-12 items-start">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Why Choose CAAS</div>
              <h2 className="font-display text-5xl lg:text-6xl leading-[0.95]">
                Built for the <span className="text-primary">heavy jobs</span> nobody else wants.
              </h2>
              <p className="mt-6 text-muted-foreground">
                From roadside rescues to industrial hauls, we bring the trucks, the training, and the calm professionalism that keeps your day moving.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {perks.map((p) => (
                <div key={p.title} className="group border border-border bg-surface p-6 hover:border-primary transition-all hover:-translate-y-1 duration-300">
                  <div className="inline-flex h-12 w-12 items-center justify-center bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors mb-4">
                    <p.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading uppercase tracking-wider text-lg">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                </div>
              ))}
            </div>
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s) => (
              <div key={s.title} className="group relative border border-border bg-background p-7 overflow-hidden hover:border-primary transition-all">
                <div className="absolute -top-10 -right-10 h-32 w-32 diag-stripes opacity-0 group-hover:opacity-10 transition-opacity" />
                <s.icon className="h-8 w-8 text-primary" />
                <h3 className="mt-5 font-heading uppercase tracking-wider text-lg">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                <Link to="/services" className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-wider text-primary opacity-80 group-hover:opacity-100 group-hover:gap-3 transition-all">
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

      {/* TESTIMONIALS */}
      <section className="py-24 bg-surface border-y border-border">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Testimonials</div>
            <h2 className="font-display text-5xl lg:text-6xl leading-[0.95]">Trusted on the <span className="text-primary">road.</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div key={t.name} className="border border-border bg-background p-7 hover:border-primary transition-colors">
                <div className="flex gap-1 text-primary mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-primary" />)}
                </div>
                <p className="text-foreground/90 leading-relaxed">"{t.quote}"</p>
                <div className="mt-5 pt-5 border-t border-border">
                  <div className="font-heading uppercase tracking-wider text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
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
                <a href="tel:+10000000000" className="text-center bg-primary text-primary-foreground px-6 py-5 font-heading uppercase tracking-widest hover:btn-glow transition-all">
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
