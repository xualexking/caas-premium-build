import { t as caas_logo_asset_default } from "./caas-logo.asset-Dzj53U_Y.mjs";
import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { D as Award, b as Eye, s as Target } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-C2kKBasD.js
var import_jsx_runtime = require_jsx_runtime();
function About() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "pt-40 pb-16 border-b border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-x grid md:grid-cols-[2fr_1fr] gap-12 items-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs uppercase tracking-[0.3em] text-primary mb-4",
						children: "About CAAS"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "font-display text-6xl md:text-8xl leading-[0.9]",
						children: [
							"Built on ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-primary",
								children: "grit"
							}),
							". Run on ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-primary",
								children: "trust"
							}),
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-lg text-muted-foreground max-w-2xl",
						children: "CAAS Towing & Recovery is a full-service towing and heavy recovery outfit. We started with one truck and one promise — show up fast, do the job right, treat people well. That promise still runs everything we do."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: caas_logo_asset_default.url,
					alt: "CAAS",
					className: "h-48 w-48 justify-self-end rounded-2xl object-cover shadow-hard"
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "container-x grid md:grid-cols-3 gap-6",
				children: [
					{
						icon: Target,
						title: "Mission",
						body: "Deliver fast, professional, and safe towing and recovery to every customer, at every hour."
					},
					{
						icon: Eye,
						title: "Vision",
						body: "Be the most trusted commercial and emergency towing partner in the regions we serve."
					},
					{
						icon: Award,
						title: "Values",
						body: "Safety first. Straight talk. Real accountability. Respect for every driver we help."
					}
				].map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border border-border bg-surface p-8 hover:border-primary transition-colors",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(v.icon, { className: "h-8 w-8 text-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-4 font-heading uppercase tracking-wider text-xl",
							children: v.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-muted-foreground",
							children: v.body
						})
					]
				}, v.title))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "py-20 bg-surface border-y border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-x max-w-3xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-4xl md:text-5xl",
					children: "Why fleets and drivers stick with us."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 space-y-6 text-muted-foreground text-lg leading-relaxed",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Every driver on our team is certified, insured, and trained on the heavy equipment we run. We invest in the fleet so we can say yes to the calls other companies pass on." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Our commercial partners get dedicated dispatch, transparent billing, and a real person on the phone. Our roadside customers get calm, respectful help on what's usually a bad day." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "That's the CAAS standard. If we can't do it right, we don't do it." })
					]
				})]
			})
		})
	] });
}
//#endregion
export { About as component };
