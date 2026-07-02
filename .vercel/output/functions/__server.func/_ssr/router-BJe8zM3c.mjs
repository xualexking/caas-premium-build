import { r as __toESM } from "../_runtime.mjs";
import { t as caas_logo_asset_default } from "./caas-logo.asset-Dzj53U_Y.mjs";
import { n as require_react, r as require_jsx_runtime, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { C as Clock, _ as Instagram, g as Mail, h as MapPin, m as Menu, n as X, u as Phone, y as Facebook } from "../_libs/lucide-react.mjs";
import { _ as useRouter, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, l as useRouterState, m as createFileRoute, p as lazyRouteComponent, s as Scripts } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BJe8zM3c.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-CU3LfxuS.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
var logoUrl = "/kobby.svg";
var nav = [
	{
		to: "/",
		label: "Home"
	},
	{
		to: "/services",
		label: "Services"
	},
	{
		to: "/gallery",
		label: "Gallery"
	},
	{
		to: "/about",
		label: "About"
	},
	{
		to: "/drivers",
		label: "Drivers"
	},
	{
		to: "/contact",
		label: "Contact"
	}
];
function SiteHeader() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const { location } = useRouterState();
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 20);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	(0, import_react.useEffect)(() => {
		setOpen(false);
	}, [location.pathname]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: `fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/85 backdrop-blur-lg border-b border-border" : "bg-transparent"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-x flex h-20 items-center justify-between",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-3 group",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: logoUrl,
						alt: "CAAS Towing & Recovery",
						className: "h-12 w-12 rounded-md object-cover ring-1 ring-primary/30 transition-transform group-hover:scale-105"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden sm:block leading-none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-2xl text-primary tracking-wider",
							children: "CAAS"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] uppercase tracking-[0.25em] text-muted-foreground",
							children: "Towing & Recovery"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden lg:flex items-center gap-1",
					children: nav.map((n) => {
						const active = location.pathname === n.to;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: n.to,
							className: `relative px-4 py-2 text-sm font-medium uppercase tracking-wider transition-colors ${active ? "text-primary" : "text-foreground/80 hover:text-primary"}`,
							children: [n.label, active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-x-4 -bottom-0.5 h-0.5 bg-primary" })]
						}, n.to);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "tel:+10000000000",
							className: "hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-foreground/90 hover:text-primary transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4" }), " Call 24/7"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/request",
							className: "hidden sm:inline-flex items-center bg-primary text-primary-foreground px-5 py-2.5 font-heading uppercase tracking-wider text-sm hover:bg-primary/90 transition-all hover:btn-glow",
							children: "Request Service"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setOpen(!open),
							className: "lg:hidden p-2 text-foreground",
							"aria-label": "Menu",
							children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-6 w-6" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-6 w-6" })
						})
					]
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "lg:hidden border-t border-border bg-background/95 backdrop-blur-lg animate-fade-in",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-x py-4 flex flex-col gap-1",
				children: [nav.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: n.to,
					className: "px-3 py-3 font-heading uppercase tracking-wider text-sm text-foreground/90 hover:text-primary hover:bg-surface rounded-md",
					children: n.label
				}, n.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/request",
					className: "mt-2 text-center bg-primary text-primary-foreground px-5 py-3 font-heading uppercase tracking-wider text-sm",
					children: "Request Service"
				})]
			})
		})]
	});
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "border-t border-border bg-surface",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-x py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: caas_logo_asset_default.url,
							alt: "CAAS Towing & Recovery",
							className: "h-14 w-14 rounded-md object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-2xl text-primary tracking-wider",
							children: "CAAS"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] uppercase tracking-[0.25em] text-muted-foreground",
							children: "Towing & Recovery"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground max-w-xs",
						children: "Fast, reliable, professional towing and heavy recovery. On the road when you need us — 24 hours a day, 7 days a week."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "p-2 border border-border hover:border-primary hover:text-primary transition",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Facebook, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "p-2 border border-border hover:border-primary hover:text-primary transition",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "h-4 w-4" })
						})]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "font-heading uppercase tracking-wider text-sm mb-4",
					children: "Quick Links"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-2 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/services",
							className: "hover:text-primary",
							children: "Services"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/gallery",
							className: "hover:text-primary",
							children: "Gallery"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/about",
							className: "hover:text-primary",
							children: "About"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/drivers",
							className: "hover:text-primary",
							children: "Partner Drivers"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/request",
							className: "hover:text-primary",
							children: "Request Quote"
						}) })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "font-heading uppercase tracking-wider text-sm mb-4",
					children: "Services"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-2 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Vehicle Towing" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Heavy Equipment Transport" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Flood Recovery" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Container Transport" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Fleet Support" })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "font-heading uppercase tracking-wider text-sm mb-4",
					children: "Contact"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-3 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4 text-primary shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "tel:+10000000000",
								className: "hover:text-primary",
								children: "+1 (000) 000-0000"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4 text-primary shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "mailto:dispatch@caastowing.com",
								className: "hover:text-primary",
								children: "dispatch@caastowing.com"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-primary shrink-0 mt-0.5" }), "Service area nationwide"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4 text-primary shrink-0 mt-0.5" }), "Open 24 / 7"]
						})
					]
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-x py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" CAAS Towing & Recovery. All rights reserved."
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "uppercase tracking-widest",
					children: "caastowing.com"
				})]
			})
		})]
	});
}
function FloatingCall() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href: "tel:+10000000000",
		"aria-label": "Emergency call",
		className: "fixed bottom-6 right-6 z-40 group",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 rounded-full pulse-ring" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "relative inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-hard hover:scale-110 transition-transform",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-6 w-6" })
		})]
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-8xl text-primary",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 font-heading uppercase tracking-wider text-xl",
					children: "Off the map"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mt-6 inline-flex bg-primary text-primary-foreground px-5 py-2.5 font-heading uppercase tracking-wider text-sm",
					children: "Go home"
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-heading uppercase tracking-wider text-xl",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong. Try again or head home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "bg-primary text-primary-foreground px-5 py-2.5 font-heading uppercase tracking-wider text-sm",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "border border-border px-5 py-2.5 font-heading uppercase tracking-wider text-sm hover:border-primary",
						children: "Home"
					})]
				})
			]
		})
	});
}
var Route$7 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "CAAS Towing & Recovery — 24/7 Heavy Duty Towing" },
			{
				name: "description",
				content: "CAAS Towing & Recovery: 24/7 emergency towing, heavy equipment transport, vehicle recovery, flood recovery, and commercial fleet support. Fast dispatch. Professional drivers."
			},
			{
				name: "author",
				content: "CAAS Towing & Recovery"
			},
			{
				name: "theme-color",
				content: "#0B0B0B"
			},
			{
				property: "og:title",
				content: "CAAS Towing & Recovery — 24/7 Heavy Duty Towing"
			},
			{
				property: "og:description",
				content: "Fast, reliable, professional towing and heavy recovery. 24/7 emergency response."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/kobby.ico",
				type: "image/x-icon"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$7.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-h-screen flex flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingCall, {})
			]
		})
	});
}
var $$splitComponentImporter$6 = () => import("./services-OvMq_6RU.mjs");
var Route$6 = createFileRoute("/services")({
	head: () => ({ meta: [
		{ title: "Services — CAAS Towing & Recovery" },
		{
			name: "description",
			content: "Full service list: vehicle towing, heavy equipment transport, flood recovery, roadside assistance, container transport, generator hauling, freight, and commercial fleet support."
		},
		{
			property: "og:title",
			content: "Services — CAAS Towing & Recovery"
		},
		{
			property: "og:description",
			content: "Every service CAAS Towing & Recovery offers, from roadside assistance to heavy equipment hauling."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./request-DyF7qtWj.mjs");
var Route$5 = createFileRoute("/request")({
	head: () => ({ meta: [
		{ title: "Request Service — CAAS Towing & Recovery" },
		{
			name: "description",
			content: "Request a towing, recovery, or transport quote from CAAS. Get a fast response by email or WhatsApp."
		},
		{
			property: "og:title",
			content: "Request Service — CAAS Towing & Recovery"
		},
		{
			property: "og:description",
			content: "Get a fast quote by email or WhatsApp."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./gallery-CCvplZ2r.mjs");
var Route$4 = createFileRoute("/gallery")({
	head: () => ({ meta: [
		{ title: "Gallery — CAAS Towing & Recovery" },
		{
			name: "description",
			content: "Recent CAAS Towing & Recovery jobs: vehicle recoveries, heavy equipment transports, container moves, and commercial fleet support."
		},
		{
			property: "og:title",
			content: "Gallery — CAAS Towing & Recovery"
		},
		{
			property: "og:description",
			content: "Recent recovery, transport, and towing work."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./drivers-Bszesktj.mjs");
var Route$3 = createFileRoute("/drivers")({
	head: () => ({ meta: [
		{ title: "Partner Drivers — CAAS Towing & Recovery" },
		{
			name: "description",
			content: "CAAS Towing & Recovery partner drivers program — coming soon."
		},
		{
			property: "og:title",
			content: "Partner Drivers — CAAS Towing & Recovery"
		},
		{
			property: "og:description",
			content: "Partner drivers program coming soon."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./contact-Mc10WYQR.mjs");
var Route$2 = createFileRoute("/contact")({
	head: () => ({ meta: [
		{ title: "Contact — CAAS Towing & Recovery" },
		{
			name: "description",
			content: "Reach CAAS Towing & Recovery 24/7 by phone, email, or WhatsApp. Emergency dispatch always on."
		},
		{
			property: "og:title",
			content: "Contact CAAS Towing & Recovery"
		},
		{
			property: "og:description",
			content: "Reach dispatch 24/7."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./about-C2kKBasD.mjs");
var Route$1 = createFileRoute("/about")({
	head: () => ({ meta: [
		{ title: "About — CAAS Towing & Recovery" },
		{
			name: "description",
			content: "The story, mission, and values behind CAAS Towing & Recovery — a professional heavy-duty towing and recovery team trusted by drivers and fleets."
		},
		{
			property: "og:title",
			content: "About CAAS Towing & Recovery"
		},
		{
			property: "og:description",
			content: "Our story, mission, and values."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./routes-D0XPLHJ8.mjs");
var Route = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "CAAS Towing & Recovery — 24/7 Heavy Duty Towing & Transport" },
		{
			name: "description",
			content: "24/7 emergency towing, heavy equipment transport, vehicle recovery, and commercial fleet support. Fast dispatch. Trusted by drivers and fleets."
		},
		{
			property: "og:title",
			content: "CAAS Towing & Recovery — 24/7 Heavy Duty Towing"
		},
		{
			property: "og:description",
			content: "Fast, reliable, professional towing and heavy recovery."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var ServicesRoute = Route$6.update({
	id: "/services",
	path: "/services",
	getParentRoute: () => Route$7
});
var RequestRoute = Route$5.update({
	id: "/request",
	path: "/request",
	getParentRoute: () => Route$7
});
var GalleryRoute = Route$4.update({
	id: "/gallery",
	path: "/gallery",
	getParentRoute: () => Route$7
});
var DriversRoute = Route$3.update({
	id: "/drivers",
	path: "/drivers",
	getParentRoute: () => Route$7
});
var ContactRoute = Route$2.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$7
});
var AboutRoute = Route$1.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$7
});
var rootRouteChildren = {
	IndexRoute: Route.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$7
	}),
	AboutRoute,
	ContactRoute,
	DriversRoute,
	GalleryRoute,
	RequestRoute,
	ServicesRoute
};
var routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
