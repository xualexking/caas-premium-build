import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { C as Clock, g as Mail, h as MapPin, p as MessageCircle, u as Phone } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-Mc10WYQR.js
var import_jsx_runtime = require_jsx_runtime();
function Contact() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "pt-40 pb-12 border-b border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-x",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs uppercase tracking-[0.3em] text-primary mb-4",
					children: "Contact"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "font-display text-6xl md:text-8xl leading-[0.9]",
					children: ["Get in ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-primary",
						children: "touch."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-muted-foreground text-lg max-w-2xl",
					children: "Dispatch is on the line 24 hours a day. Pick your channel."
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-x grid lg:grid-cols-2 gap-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid sm:grid-cols-2 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactCard, {
						icon: Phone,
						label: "Phone",
						value: "+1 (000) 000-0000",
						href: "tel:+10000000000",
						primary: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactCard, {
						icon: MessageCircle,
						label: "WhatsApp",
						value: "Chat with dispatch",
						href: "https://wa.me/10000000000"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactCard, {
						icon: Mail,
						label: "Email",
						value: "dispatch@caastowing.com",
						href: "mailto:dispatch@caastowing.com"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactCard, {
						icon: Clock,
						label: "Hours",
						value: "Open 24 / 7"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-2 border border-border bg-surface p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-xs uppercase tracking-widest text-primary mb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4" }), " Service Area"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-heading uppercase tracking-wider text-lg",
								children: "Nationwide coverage"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground mt-2",
								children: "Regional hubs with rapid response networks. Ask dispatch about your area."
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border border-border bg-surface overflow-hidden min-h-[420px]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
					title: "CAAS Towing map",
					src: "https://www.google.com/maps?q=USA&output=embed",
					className: "w-full h-full min-h-[420px] grayscale contrast-125 opacity-90",
					loading: "lazy"
				})
			})]
		})
	})] });
}
function ContactCard({ icon: Icon, label, value, href, primary }) {
	const cls = `block border p-6 transition-all ${primary ? "bg-primary text-primary-foreground border-primary hover:btn-glow" : "border-border bg-surface hover:border-primary"}`;
	const content = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `flex items-center gap-2 text-xs uppercase tracking-widest ${primary ? "text-primary-foreground/80" : "text-primary"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" }),
			" ",
			label
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `font-heading uppercase tracking-wider text-lg mt-2 ${primary ? "" : ""}`,
		children: value
	})] });
	return href ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href,
		className: cls,
		children: content
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cls,
		children: content
	});
}
//#endregion
export { Contact as component };
