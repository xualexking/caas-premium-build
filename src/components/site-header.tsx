import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
const logoUrl = "/kobby.svg";

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/drivers", label: "Drivers" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { location } = useRouterState();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/85 backdrop-blur-lg border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logoUrl} alt="CAAS Towing & Recovery" className="h-12 w-12 rounded-md object-cover ring-1 ring-primary/30 transition-transform group-hover:scale-105" />
          <div className="hidden sm:block leading-none">
            <div className="font-display text-2xl text-primary tracking-wider">CAAS</div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Towing & Recovery</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((n) => {
            const active = location.pathname === n.to;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`relative px-4 py-2 text-sm font-medium uppercase tracking-wider transition-colors ${
                  active ? "text-primary" : "text-foreground/80 hover:text-primary"
                }`}
              >
                {n.label}
                {active && <span className="absolute inset-x-4 -bottom-0.5 h-0.5 bg-primary" />}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="tel:+233246773279"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-foreground/90 hover:text-primary transition-colors"
          >
            <Phone className="h-4 w-4" /> Call 24/7
          </a>
          <Link
            to="/request"
            className="hidden sm:inline-flex items-center bg-primary text-primary-foreground px-5 py-2.5 font-heading uppercase tracking-wider text-sm hover:bg-primary/90 transition-all hover:btn-glow"
          >
            Request Service
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-foreground"
            aria-label="Menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-lg animate-fade-in">
          <div className="container-x py-4 flex flex-col gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="px-3 py-3 font-heading uppercase tracking-wider text-sm text-foreground/90 hover:text-primary hover:bg-surface rounded-md"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/request"
              className="mt-2 text-center bg-primary text-primary-foreground px-5 py-3 font-heading uppercase tracking-wider text-sm"
            >
              Request Service
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
