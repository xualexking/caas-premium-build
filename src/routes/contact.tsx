import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MessageCircle, MapPin, Clock } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact CAAS Towing — 24/7 Emergency Dispatch in Ghana" },
      { name: "description", content: "Call CAAS Towing & Recovery 24/7 for emergency towing, recovery and heavy transport in Ghana. Phone: +233 24 677 3279. Fast dispatch, real people." },
      { property: "og:title", content: "Contact CAAS Towing & Recovery — 24/7 Ghana" },
      { property: "og:description", content: "24/7 emergency dispatch. Call +233 24 677 3279 or WhatsApp for fast towing and recovery across Ghana." },
      { property: "og:url", content: "https://caastowing.com/contact" },
      { property: "og:image", content: "https://caastowing.com/og-image.jpg" },
      { name: "twitter:image", content: "https://caastowing.com/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://caastowing.com/contact" }],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <section className="pt-40 pb-12 border-b border-border">
        <div className="container-x">
          <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Contact</div>
          <h1 className="font-display text-6xl md:text-8xl leading-[0.9]">Call <span className="text-primary">Towing</span> & Recovery Dispatch.</h1>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl">Emergency towing and recovery dispatch is on the line 24 hours a day, 7 days a week.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-x grid lg:grid-cols-2 gap-8">
          <div className="grid sm:grid-cols-2 gap-4">
            <ContactCard icon={Phone} label="Phone" value="+233 24 677 3279" href="tel:+233246773279" primary />
            <ContactCard icon={MessageCircle} label="WhatsApp" value="Chat with dispatch" href="https://wa.me/233246773279" />
            <ContactCard icon={Mail} label="Email" value="dispatch@caastowing.com" href="mailto:dispatch@caastowing.com" />
            <ContactCard icon={Clock} label="Hours" value="Open 24 / 7" />
            <div className="sm:col-span-2 border border-border bg-surface p-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary mb-2">
                <MapPin className="h-4 w-4" /> Service Area
              </div>
              <div className="font-heading uppercase tracking-wider text-lg">Nationwide coverage</div>
              <p className="text-sm text-muted-foreground mt-2">Regional hubs with rapid response networks. Ask dispatch about your area.</p>
            </div>
          </div>

          <div className="border border-border bg-surface overflow-hidden min-h-[420px]">
            <iframe
              title="CAAS Towing map"
              src="https://www.google.com/maps?q=USA&output=embed"
              className="w-full h-full min-h-[420px] grayscale contrast-125 opacity-90"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  );
}

function ContactCard({ icon: Icon, label, value, href, primary }: { icon: any; label: string; value: string; href?: string; primary?: boolean }) {
  const cls = `block border p-6 transition-all ${primary ? "bg-primary text-primary-foreground border-primary hover:btn-glow" : "border-border bg-surface hover:border-primary"}`;
  const content = (
    <>
      <div className={`flex items-center gap-2 text-xs uppercase tracking-widest ${primary ? "text-primary-foreground/80" : "text-primary"}`}>
        <Icon className="h-4 w-4" /> {label}
      </div>
      <div className={`font-heading uppercase tracking-wider text-lg mt-2 ${primary ? "" : ""}`}>{value}</div>
    </>
  );
  return href ? <a href={href} className={cls}>{content}</a> : <div className={cls}>{content}</div>;
}
