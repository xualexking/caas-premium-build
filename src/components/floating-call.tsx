import { Phone } from "lucide-react";

export function FloatingCall() {
  return (
    <a
      href="tel:+10000000000"
      aria-label="Emergency call"
      className="fixed bottom-6 right-6 z-40 group"
    >
      <span className="absolute inset-0 rounded-full pulse-ring" />
      <span className="relative inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-hard hover:scale-110 transition-transform">
        <Phone className="h-6 w-6" />
      </span>
    </a>
  );
}
