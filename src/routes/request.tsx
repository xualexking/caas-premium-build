import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ArrowLeft, CheckCircle2, MessageCircle, Mail } from "lucide-react";

export const Route = createFileRoute("/request")({
  head: () => ({
    meta: [
      { title: "Request Service — CAAS Towing & Recovery" },
      { name: "description", content: "Request a towing, recovery, or transport quote from CAAS. Get a fast response by email or WhatsApp." },
      { property: "og:title", content: "Request Service — CAAS Towing & Recovery" },
      { property: "og:description", content: "Get a fast quote by email or WhatsApp." },
    ],
  }),
  component: RequestPage,
});

type Form = {
  name: string; company: string; phone: string; email: string;
  pickup: string; destination: string; vehicleType: string; equipmentType: string;
  service: string; date: string; description: string;
  contactMethod: "email" | "whatsapp"; contactValue: string;
};

const empty: Form = {
  name: "", company: "", phone: "", email: "",
  pickup: "", destination: "", vehicleType: "", equipmentType: "",
  service: "", date: "", description: "",
  contactMethod: "email", contactValue: "",
};

const WHATSAPP_NUMBER = "10000000000"; // TODO: replace with real number

function RequestPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(empty);
  const [submitted, setSubmitted] = useState(false);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));

  const steps = ["Contact", "Job Details", "Preferences"];

  const canNext =
    (step === 0 && form.name && form.phone) ||
    (step === 1 && form.service && form.pickup) ||
    step === 2;

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

  if (submitted) {
    return (
      <section className="pt-40 pb-24 min-h-screen">
        <div className="container-x max-w-2xl text-center">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h1 className="font-display text-5xl md:text-6xl">Request Sent.</h1>
          <p className="mt-4 text-muted-foreground text-lg">
            A CAAS dispatcher will be in touch shortly via {form.contactMethod === "whatsapp" ? "WhatsApp" : "email"}.
            For emergencies, call our 24/7 line.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="tel:+10000000000" className="bg-primary text-primary-foreground px-6 py-3 font-heading uppercase tracking-wider">Call Now</a>
            <button onClick={() => { setForm(empty); setStep(0); setSubmitted(false); }} className="border border-border px-6 py-3 font-heading uppercase tracking-wider hover:border-primary">New Request</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-32 pb-24">
      <div className="container-x max-w-3xl">
        <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Request Service</div>
        <h1 className="font-display text-5xl md:text-7xl leading-[0.9]">
          Get a <span className="text-primary">quote</span> in minutes.
        </h1>
        <p className="mt-4 text-muted-foreground">Tell us what you need. We'll take it from there.</p>

        {/* Progress */}
        <div className="mt-10 flex items-center gap-4">
          {steps.map((label, i) => (
            <div key={label} className="flex-1 flex items-center gap-3">
              <div className={`h-9 w-9 flex items-center justify-center font-heading text-sm ${i <= step ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground"}`}>
                {i + 1}
              </div>
              <div className={`text-xs uppercase tracking-wider hidden sm:block ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>{label}</div>
              {i < steps.length - 1 && <div className={`flex-1 h-px ${i < step ? "bg-primary" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        <div className="mt-8 border border-border bg-surface p-6 md:p-10">
          {step === 0 && (
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Full Name *"><input required value={form.name} onChange={(e) => set("name", e.target.value)} className={input} /></Field>
              <Field label="Company (optional)"><input value={form.company} onChange={(e) => set("company", e.target.value)} className={input} /></Field>
              <Field label="Phone *"><input required type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} className={input} /></Field>
              <Field label="Email"><input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} className={input} /></Field>
            </div>
          )}

          {step === 1 && (
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Service Needed *">
                <select value={form.service} onChange={(e) => set("service", e.target.value)} className={input}>
                  <option value="">Select service…</option>
                  {["Vehicle Towing","Vehicle Recovery","Flood Recovery","Roadside Assistance","Heavy Equipment Transport","Container Transport","Generator Hauling","Freight Services","Commercial Fleet Support"].map(o => <option key={o}>{o}</option>)}
                </select>
              </Field>
              <Field label="Preferred Date"><input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} className={input} /></Field>
              <Field label="Pickup Location *"><input required value={form.pickup} onChange={(e) => set("pickup", e.target.value)} className={input} /></Field>
              <Field label="Destination"><input value={form.destination} onChange={(e) => set("destination", e.target.value)} className={input} /></Field>
              <Field label="Vehicle Type"><input placeholder="e.g. Ford F-150" value={form.vehicleType} onChange={(e) => set("vehicleType", e.target.value)} className={input} /></Field>
              <Field label="Equipment Type"><input placeholder="e.g. 20ft container" value={form.equipmentType} onChange={(e) => set("equipmentType", e.target.value)} className={input} /></Field>
              <div className="sm:col-span-2">
                <Field label="Description"><textarea rows={4} value={form.description} onChange={(e) => set("description", e.target.value)} className={input} /></Field>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div className="text-sm uppercase tracking-wider text-muted-foreground">Preferred Contact Method</div>
              <div className="grid sm:grid-cols-2 gap-3">
                <label className={`cursor-pointer border p-5 flex items-start gap-3 ${form.contactMethod === "email" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
                  <input type="radio" name="cm" checked={form.contactMethod === "email"} onChange={() => set("contactMethod", "email")} className="mt-1 accent-primary" />
                  <div>
                    <div className="flex items-center gap-2 font-heading uppercase tracking-wider text-sm"><Mail className="h-4 w-4" /> Email</div>
                    <div className="text-xs text-muted-foreground mt-1">We'll reply to your inbox with a quote.</div>
                  </div>
                </label>
                <label className={`cursor-pointer border p-5 flex items-start gap-3 ${form.contactMethod === "whatsapp" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
                  <input type="radio" name="cm" checked={form.contactMethod === "whatsapp"} onChange={() => set("contactMethod", "whatsapp")} className="mt-1 accent-primary" />
                  <div>
                    <div className="flex items-center gap-2 font-heading uppercase tracking-wider text-sm"><MessageCircle className="h-4 w-4" /> WhatsApp</div>
                    <div className="text-xs text-muted-foreground mt-1">Fastest — chat with dispatch directly.</div>
                  </div>
                </label>
              </div>
              <Field label={form.contactMethod === "email" ? "Your Email" : "Your WhatsApp Number"}>
                <input
                  type={form.contactMethod === "email" ? "email" : "tel"}
                  value={form.contactValue}
                  onChange={(e) => set("contactValue", e.target.value)}
                  placeholder={form.contactMethod === "email" ? "you@example.com" : "+1 555 555 5555"}
                  className={input}
                />
              </Field>
            </div>
          )}

          <div className="mt-8 flex justify-between gap-3">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="inline-flex items-center gap-2 border border-border px-5 py-3 font-heading uppercase tracking-wider text-sm disabled:opacity-40 hover:border-primary"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            {step < steps.length - 1 ? (
              <button
                type="button"
                disabled={!canNext}
                onClick={() => setStep((s) => s + 1)}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 font-heading uppercase tracking-wider text-sm disabled:opacity-40 hover:btn-glow transition-all"
              >
                Next <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={submit}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 font-heading uppercase tracking-wider text-sm hover:btn-glow transition-all"
              >
                Submit Request <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const input = "w-full bg-background border border-border px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">{label}</div>
      {children}
    </label>
  );
}
