import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { E as BatteryCharging, O as ArrowRight, S as Container, T as Building2, f as Package, i as Waves, o as Truck, r as Wrench, t as Zap, w as CircleCheck } from "../_libs/lucide-react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/services-OvMq_6RU.js
var import_jsx_runtime = require_jsx_runtime();
var list = [
	{
		icon: Truck,
		title: "Vehicle Towing",
		desc: "Light-, medium-, and heavy-duty towing for cars, SUVs, trucks, vans and specialty vehicles.",
		benefits: [
			"Flatbed & wheel-lift",
			"Damage-free loading",
			"Long-distance transport"
		]
	},
	{
		icon: Wrench,
		title: "Vehicle Recovery",
		desc: "Ditch pulls, rollovers, off-road recovery — brought back safely with the right rigging.",
		benefits: [
			"Winch & rigging expertise",
			"Rotator support",
			"Off-road capable"
		]
	},
	{
		icon: Waves,
		title: "Flood Recovery",
		desc: "Rapid response to water-damaged vehicles and equipment. Discreet and careful.",
		benefits: [
			"24/7 emergency crews",
			"Salvage handling",
			"Insurance-friendly"
		]
	},
	{
		icon: BatteryCharging,
		title: "Roadside Assistance",
		desc: "Jump-starts, tire changes, lockouts, and fuel delivery from friendly drivers.",
		benefits: [
			"Fast ETAs",
			"Fully equipped trucks",
			"Fair flat rates"
		]
	},
	{
		icon: Container,
		title: "Heavy Equipment Transport",
		desc: "Excavators, loaders, forklifts, and construction machinery moved with precision.",
		benefits: [
			"Lowboy trailers",
			"Permitted loads",
			"Cross-state routing"
		]
	},
	{
		icon: Package,
		title: "Container Transport",
		desc: "20ft and 40ft container pickup, delivery, and repositioning for depots and yards.",
		benefits: [
			"Tilt & chassis units",
			"Port pickups",
			"Yard-to-yard moves"
		]
	},
	{
		icon: Zap,
		title: "Generator Hauling",
		desc: "Industrial generator transport with careful loading and secure tie-downs.",
		benefits: [
			"Any size",
			"Site delivery",
			"Rigging assistance"
		]
	},
	{
		icon: Truck,
		title: "Freight Services",
		desc: "Time-critical freight moved reliably with tracking and communication.",
		benefits: [
			"Same-day options",
			"Dedicated units",
			"Real-time updates"
		]
	},
	{
		icon: Building2,
		title: "Commercial Fleet Support",
		desc: "Dedicated dispatch and account management for fleet operators.",
		benefits: [
			"Priority response",
			"Consolidated billing",
			"Custom SLAs"
		]
	}
];
function Services() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "pt-40 pb-16 border-b border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-x max-w-4xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs uppercase tracking-[0.3em] text-primary mb-4",
					children: "Services"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "font-display text-6xl md:text-8xl leading-[0.9]",
					children: [
						"Full-Service ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-primary",
							children: "Towing"
						}),
						" & Heavy Recovery."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-lg text-muted-foreground max-w-2xl",
					children: "Anything with wheels, tracks, or a chassis — we move it. Here's the full menu."
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container-x space-y-6",
			children: list.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "group grid md:grid-cols-[auto_1fr_auto] gap-8 items-center border border-border bg-surface p-8 hover:border-primary transition-all",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-5xl text-primary/40 tabular-nums w-16",
							children: String(i + 1).padStart(2, "0")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "inline-flex h-16 w-16 items-center justify-center bg-primary/10 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "h-8 w-8" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-heading uppercase tracking-wider text-2xl",
							children: s.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-muted-foreground",
							children: s.desc
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 flex flex-wrap gap-x-5 gap-y-2",
							children: s.benefits.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-2 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-primary" }),
									" ",
									b
								]
							}, b))
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/request",
						className: "justify-self-start md:justify-self-end inline-flex items-center gap-2 border border-border px-5 py-3 font-heading uppercase tracking-wider text-sm hover:border-primary hover:text-primary transition-all",
						children: ["Get Quote ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
					})
				]
			}, s.title))
		})
	})] });
}
//#endregion
export { Services as component };
