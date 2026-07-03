import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "10000000000"; // TODO: replace with real number
const INTRO = "Hello CAAS, I need towing assistance.";

export function FloatingCall() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(INTRO)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp Now"
      className="fixed bottom-6 right-6 z-40 group flex items-center gap-3"
    >
      <span className="hidden sm:inline-block bg-background/90 backdrop-blur border border-border px-4 py-2 font-heading uppercase tracking-wider text-xs text-foreground group-hover:border-primary transition-colors">
        WhatsApp Now
      </span>
      <span className="relative inline-flex items-center justify-center h-14 w-14 rounded-full shadow-hard hover:scale-110 transition-transform" style={{ backgroundColor: "#25D366", color: "#fff" }}>
        <span className="absolute inset-0 rounded-full pulse-ring" />
        <MessageCircle className="h-6 w-6 relative" />
      </span>
    </a>
  );
}
