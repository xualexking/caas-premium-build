import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingCall } from "@/components/floating-call";
import { ReviewPopupTrigger } from "@/components/review-popup";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl text-primary">404</h1>
        <h2 className="mt-4 font-heading uppercase tracking-wider text-xl">Off the map</h2>
        <p className="mt-2 text-sm text-muted-foreground">The page you're looking for doesn't exist.</p>
        <Link to="/" className="mt-6 inline-flex bg-primary text-primary-foreground px-5 py-2.5 font-heading uppercase tracking-wider text-sm">Go home</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-heading uppercase tracking-wider text-xl">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong. Try again or head home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="bg-primary text-primary-foreground px-5 py-2.5 font-heading uppercase tracking-wider text-sm">Try again</button>
          <a href="/" className="border border-border px-5 py-2.5 font-heading uppercase tracking-wider text-sm hover:border-primary">Home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "CAAS Towing & Recovery — 24/7 Towing in Ghana" },
      { name: "description", content: "CAAS Towing & Recovery: 24/7 emergency towing, heavy equipment transport, vehicle recovery, flood recovery, and commercial fleet support across Ghana. Fast dispatch. Professional drivers." },
      { name: "author", content: "CAAS Towing & Recovery" },
      { name: "theme-color", content: "#0B0B0B" },
      { name: "keywords", content: "towing Ghana, tow truck Ghana, vehicle recovery Ghana, heavy equipment transport, emergency towing, roadside assistance Ghana, CAAS towing" },
      { property: "og:site_name", content: "CAAS Towing & Recovery" },
      { property: "og:title", content: "CAAS Towing & Recovery — 24/7 Towing in Ghana" },
      { property: "og:description", content: "Fast, reliable, professional towing and heavy recovery across Ghana. 24/7 emergency response." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_GH" },
      { property: "og:url", content: "https://caastowing.com" },
      { property: "og:image", content: "https://caastowing.com/og-image.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "CAAS Towing & Recovery — 24/7 Heavy Duty Towing in Ghana" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "CAAS Towing & Recovery — 24/7 Towing in Ghana" },
      { name: "twitter:description", content: "From cars to cargo — we move it all. 24/7 towing and recovery across Ghana." },
      { name: "twitter:image", content: "https://caastowing.com/og-image.jpg" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/caas.ico", type: "image/x-icon" },
      { rel: "shortcut icon", href: "/caas.ico", type: "image/x-icon" },
      { rel: "icon", href: "/caas.svg", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/caas.svg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AutomotiveBusiness",
          "@id": "https://caastowing.com/#business",
          name: "CAAS Towing & Recovery",
          url: "https://caastowing.com",
          telephone: "+233246773279",
          email: "dispatch@caastowing.com",
          image: "https://caastowing.com/og-image.jpg",
          logo: "https://caastowing.com/caas.svg",
          priceRange: "$$",
          currenciesAccepted: "GHS",
          areaServed: { "@type": "Country", name: "Ghana" },
          address: {
            "@type": "PostalAddress",
            addressCountry: "GH",
            addressRegion: "Greater Accra",
            addressLocality: "Accra",
          },
          openingHoursSpecification: [{
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
            opens: "00:00",
            closes: "23:59",
          }],
          serviceType: ["Vehicle Towing","Heavy Equipment Transport","Vehicle Recovery","Flood Recovery","Roadside Assistance","Container Hauling","Commercial Fleet Support"],
          sameAs: [],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { location } = useRouterState();
  const isAdmin = location.pathname.startsWith("/garage-dispatch");
  return (
    <QueryClientProvider client={queryClient}>
      {isAdmin ? (
        <Outlet />
      ) : (
        <div className="min-h-screen flex flex-col">
          <SiteHeader />
          <main className="flex-1">
            <Outlet />
          </main>
          <SiteFooter />
          <FloatingCall />
          <ReviewPopupTrigger />
        </div>
      )}
    </QueryClientProvider>
  );
}
