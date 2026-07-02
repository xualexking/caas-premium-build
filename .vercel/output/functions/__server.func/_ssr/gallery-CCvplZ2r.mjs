import { r as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gallery-CCvplZ2r.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var categories = [
	"All",
	"Vehicle Towing",
	"Recovery",
	"Heavy Equipment",
	"Containers",
	"Freight"
];
var items = [
	{
		cat: "Vehicle Towing",
		title: "Overnight highway tow",
		loc: "I-95 corridor",
		ratio: "aspect-[4/5]"
	},
	{
		cat: "Recovery",
		title: "Ditch recovery — cargo van",
		loc: "Rural route",
		ratio: "aspect-square"
	},
	{
		cat: "Heavy Equipment",
		title: "Excavator relocation",
		loc: "Construction site",
		ratio: "aspect-[3/4]"
	},
	{
		cat: "Containers",
		title: "40ft container drop",
		loc: "Port yard",
		ratio: "aspect-[4/3]"
	},
	{
		cat: "Freight",
		title: "Time-critical freight",
		loc: "Cross-state",
		ratio: "aspect-square"
	},
	{
		cat: "Recovery",
		title: "Flood recovery — sedan",
		loc: "Coastal district",
		ratio: "aspect-[3/4]"
	},
	{
		cat: "Heavy Equipment",
		title: "Generator hauling",
		loc: "Industrial park",
		ratio: "aspect-[4/5]"
	},
	{
		cat: "Vehicle Towing",
		title: "Fleet vehicle pickup",
		loc: "Commercial depot",
		ratio: "aspect-[4/3]"
	}
];
function Gallery() {
	const [filter, setFilter] = (0, import_react.useState)("All");
	const visible = items.filter((i) => filter === "All" || i.cat === filter);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "pt-40 pb-12 border-b border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-x",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs uppercase tracking-[0.3em] text-primary mb-4",
				children: "Gallery"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "font-display text-6xl md:text-8xl leading-[0.9]",
				children: [
					"Recent ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-primary",
						children: "jobs"
					}),
					" from the road."
				]
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-x",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2 mb-8",
				children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setFilter(c),
					className: `px-4 py-2 border font-heading uppercase tracking-wider text-xs transition-colors ${filter === c ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary hover:text-primary"}`,
					children: c
				}, c))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4",
				children: visible.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "break-inside-avoid group relative overflow-hidden border border-border bg-surface",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `${it.ratio} w-full hero-grid bg-gradient-to-br from-surface-elevated to-background flex items-center justify-center`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-6xl text-primary/20",
							children: "CAAS"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-background via-background/80 to-transparent translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs uppercase tracking-widest text-primary",
								children: it.cat
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-heading uppercase tracking-wider mt-1",
								children: it.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: it.loc
							})
						]
					})]
				}, i))
			})]
		})
	})] });
}
//#endregion
export { Gallery as component };
