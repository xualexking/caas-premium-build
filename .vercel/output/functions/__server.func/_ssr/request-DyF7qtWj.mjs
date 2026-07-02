import { r as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { O as ArrowRight, g as Mail, k as ArrowLeft, p as MessageCircle, w as CircleCheck } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/request-DyF7qtWj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var empty = {
	name: "",
	company: "",
	phone: "",
	email: "",
	pickup: "",
	destination: "",
	vehicleType: "",
	equipmentType: "",
	service: "",
	date: "",
	description: "",
	contactMethod: "email",
	contactValue: ""
};
var WHATSAPP_NUMBER = "10000000000";
function RequestPage() {
	const [step, setStep] = (0, import_react.useState)(0);
	const [form, setForm] = (0, import_react.useState)(empty);
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
	const set = (k, v) => setForm((f) => ({
		...f,
		[k]: v
	}));
	const steps = [
		"Contact",
		"Job Details",
		"Preferences"
	];
	const canNext = step === 0 && form.name && form.phone || step === 1 && form.service && form.pickup || step === 2;
	const submit = () => {
		const summary = `New Service Request — CAAS Towing
Name: ${form.name}
Company: ${form.company || "-"}
Phone: ${form.phone}
Email: ${form.email || "-"}
Service: ${form.service}
Pickup: ${form.pickup}
Destination: ${form.destination || "-"}
Vehicle: ${form.vehicleType || "-"}
Equipment: ${form.equipmentType || "-"}
Preferred date: ${form.date || "ASAP"}
Description: ${form.description || "-"}
Preferred contact: ${form.contactMethod} (${form.contactValue || "-"})`;
		if (form.contactMethod === "whatsapp") {
			const msg = encodeURIComponent(summary);
			window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
		} else {
			const subject = encodeURIComponent("CAAS Towing Service Request");
			const body = encodeURIComponent(summary);
			window.location.href = `mailto:dispatch@caastowing.com?subject=${subject}&body=${body}`;
		}
		setSubmitted(true);
	};
	if (submitted) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "pt-40 pb-24 min-h-screen",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-x max-w-2xl text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary mb-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-10 w-10" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-5xl md:text-6xl",
					children: "Request Sent."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-muted-foreground text-lg",
					children: [
						"A CAAS dispatcher will be in touch shortly via ",
						form.contactMethod === "whatsapp" ? "WhatsApp" : "email",
						". For emergencies, call our 24/7 line."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-wrap justify-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "tel:+10000000000",
						className: "bg-primary text-primary-foreground px-6 py-3 font-heading uppercase tracking-wider",
						children: "Call Now"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							setForm(empty);
							setStep(0);
							setSubmitted(false);
						},
						className: "border border-border px-6 py-3 font-heading uppercase tracking-wider hover:border-primary",
						children: "New Request"
					})]
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "pt-32 pb-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-x max-w-3xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs uppercase tracking-[0.3em] text-primary mb-4",
					children: "Request Service"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "font-display text-5xl md:text-7xl leading-[0.9]",
					children: [
						"Get a ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-primary",
							children: "quote"
						}),
						" in minutes."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-muted-foreground",
					children: "Tell us what you need. We'll take it from there."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 flex items-center gap-4",
					children: steps.map((label, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 flex items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `h-9 w-9 flex items-center justify-center font-heading text-sm ${i <= step ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground"}`,
								children: i + 1
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `text-xs uppercase tracking-wider hidden sm:block ${i <= step ? "text-foreground" : "text-muted-foreground"}`,
								children: label
							}),
							i < steps.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `flex-1 h-px ${i < step ? "bg-primary" : "bg-border"}` })
						]
					}, label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 border border-border bg-surface p-6 md:p-10",
					children: [
						step === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid sm:grid-cols-2 gap-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Full Name *",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										required: true,
										value: form.name,
										onChange: (e) => set("name", e.target.value),
										className: input
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Company (optional)",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: form.company,
										onChange: (e) => set("company", e.target.value),
										className: input
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Phone *",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										required: true,
										type: "tel",
										value: form.phone,
										onChange: (e) => set("phone", e.target.value),
										className: input
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Email",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "email",
										value: form.email,
										onChange: (e) => set("email", e.target.value),
										className: input
									})
								})
							]
						}),
						step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid sm:grid-cols-2 gap-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Service Needed *",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: form.service,
										onChange: (e) => set("service", e.target.value),
										className: input,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "Select service…"
										}), [
											"Vehicle Towing",
											"Vehicle Recovery",
											"Flood Recovery",
											"Roadside Assistance",
											"Heavy Equipment Transport",
											"Container Transport",
											"Generator Hauling",
											"Freight Services",
											"Commercial Fleet Support"
										].map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: o }, o))]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Preferred Date",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "date",
										value: form.date,
										onChange: (e) => set("date", e.target.value),
										className: input
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Pickup Location *",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										required: true,
										value: form.pickup,
										onChange: (e) => set("pickup", e.target.value),
										className: input
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Destination",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: form.destination,
										onChange: (e) => set("destination", e.target.value),
										className: input
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Vehicle Type",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										placeholder: "e.g. Ford F-150",
										value: form.vehicleType,
										onChange: (e) => set("vehicleType", e.target.value),
										className: input
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Equipment Type",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										placeholder: "e.g. 20ft container",
										value: form.equipmentType,
										onChange: (e) => set("equipmentType", e.target.value),
										className: input
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "sm:col-span-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Description",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											rows: 4,
											value: form.description,
											onChange: (e) => set("description", e.target.value),
											className: input
										})
									})
								})
							]
						}),
						step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm uppercase tracking-wider text-muted-foreground",
									children: "Preferred Contact Method"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid sm:grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: `cursor-pointer border p-5 flex items-start gap-3 ${form.contactMethod === "email" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "radio",
											name: "cm",
											checked: form.contactMethod === "email",
											onChange: () => set("contactMethod", "email"),
											className: "mt-1 accent-primary"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 font-heading uppercase tracking-wider text-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4" }), " Email"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs text-muted-foreground mt-1",
											children: "We'll reply to your inbox with a quote."
										})] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: `cursor-pointer border p-5 flex items-start gap-3 ${form.contactMethod === "whatsapp" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "radio",
											name: "cm",
											checked: form.contactMethod === "whatsapp",
											onChange: () => set("contactMethod", "whatsapp"),
											className: "mt-1 accent-primary"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 font-heading uppercase tracking-wider text-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4" }), " WhatsApp"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs text-muted-foreground mt-1",
											children: "Fastest — chat with dispatch directly."
										})] })]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: form.contactMethod === "email" ? "Your Email" : "Your WhatsApp Number",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: form.contactMethod === "email" ? "email" : "tel",
										value: form.contactValue,
										onChange: (e) => set("contactValue", e.target.value),
										placeholder: form.contactMethod === "email" ? "you@example.com" : "+1 555 555 5555",
										className: input
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setStep((s) => Math.max(0, s - 1)),
								disabled: step === 0,
								className: "inline-flex items-center gap-2 border border-border px-5 py-3 font-heading uppercase tracking-wider text-sm disabled:opacity-40 hover:border-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Back"]
							}), step < steps.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								disabled: !canNext,
								onClick: () => setStep((s) => s + 1),
								className: "inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 font-heading uppercase tracking-wider text-sm disabled:opacity-40 hover:btn-glow transition-all",
								children: ["Next ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: submit,
								className: "inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 font-heading uppercase tracking-wider text-sm hover:btn-glow transition-all",
								children: ["Submit Request ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
							})]
						})
					]
				})
			]
		})
	});
}
var input = "w-full bg-background border border-border px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors";
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-xs uppercase tracking-wider text-muted-foreground mb-2",
			children: label
		}), children]
	});
}
//#endregion
export { RequestPage as component };
