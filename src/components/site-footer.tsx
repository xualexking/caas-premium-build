import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from "lucide-react";
import logo from "@/assets/caas-logo.asset.json";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-x py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={logo.url} alt="CAAS Towing & Recovery" className="h-14 w-14 rounded-md object-cover" />
            <div>
              <div className="font-display text-2xl text-primary tracking-wider">CAAS</div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Towing & Recovery</div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            Fast, reliable, professional towing and heavy recovery. On the road when you need us — 24 hours a day, 7 days a week.
          </p>
          <div className="mt-5 flex gap-3">
            <a href="#" className="p-2 border border-border hover:border-primary hover:text-primary transition"><Facebook className="h-4 w-4" /></a>
            <a href="#" className="p-2 border border-border hover:border-primary hover:text-primary transition"><Instagram className="h-4 w-4" /></a>
          </div>
        </div>

        <div>
          <h4 className="font-heading uppercase tracking-wider text-sm mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/services" className="hover:text-primary">Services</Link></li>
            <li><Link to="/gallery" className="hover:text-primary">Gallery</Link></li>
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/drivers" className="hover:text-primary">Partner Drivers</Link></li>
            <li><Link to="/request" className="hover:text-primary">Request Quote</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading uppercase tracking-wider text-sm mb-4">Services</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Vehicle Towing</li>
            <li>Heavy Equipment Transport</li>
            <li>Flood Recovery</li>
            <li>Container Transport</li>
            <li>Fleet Support</li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading uppercase tracking-wider text-sm mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2"><Phone className="h-4 w-4 text-primary shrink-0 mt-0.5" /><a href="tel:+10000000000" className="hover:text-primary">+1 (000) 000-0000</a></li>
            <li className="flex gap-2"><Mail className="h-4 w-4 text-primary shrink-0 mt-0.5" /><a href="mailto:dispatch@caastowing.com" className="hover:text-primary">dispatch@caastowing.com</a></li>
            <li className="flex gap-2"><MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />Service area nationwide</li>
            <li className="flex gap-2"><Clock className="h-4 w-4 text-primary shrink-0 mt-0.5" />Open 24 / 7</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-x py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} CAAS Towing & Recovery. All rights reserved.</div>
          <div className="uppercase tracking-widest">caastowing.com</div>
        </div>
      </div>
    </footer>
  );
}
