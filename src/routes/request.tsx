import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ArrowLeft, CheckCircle2, MessageCircle, Mail, Info, Upload, X } from "lucide-react";

export const Route = createFileRoute("/request")({
  head: () => ({
    meta: [
      { title: "Request Towing or Recovery in Ghana | CAAS" },
      { name: "description", content: "Request a towing, recovery, or heavy transport quote from CAAS. 24/7 dispatch across Ghana — fast response by WhatsApp or email. Get a quote in minutes." },
      { property: "og:title", content: "Request Towing or Recovery — CAAS Ghana" },
      { property: "og:description", content: "Get a fast towing or recovery quote — 24/7 dispatch across Ghana by WhatsApp or email." },
      { property: "og:url", content: "https://caastowing.com/request" },
      { property: "og:image", content: "https://caastowing.com/og-image.jpg" },
      { name: "twitter:image", content: "https://caastowing.com/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://caastowing.com/request" }],
  }),
  component: RequestPage,
});

type Category = "vehicle" | "cargo" | "generic";

const SERVICES: { name: string; category: Category }[] = [
  { name: "Vehicle Towing", category: "vehicle" },
  { name: "Vehicle Recovery", category: "vehicle" },
  { name: "Flood Recovery", category: "vehicle" },
  { name: "Roadside Assistance", category: "vehicle" },
  { name: "Heavy Equipment Transport", category: "cargo" },
  { name: "Container Transport", category: "cargo" },
  { name: "Generator Hauling", category: "cargo" },
  { name: "Freight Services", category: "cargo" },
  { name: "Commercial Fleet Support", category: "generic" },
];

type Form = {
  name: string; company: string; phone: string; email: string;
  pickup: string; destination: string;
  service: string; date: string; description: string;
  // vehicle
  vehicleMake: string; vehicleModel: string; vehicleYear: string; vehiclePlate: string; vehicleCondition: string;
  // cargo/heavy
  cargoType: string; cargoWeight: string; cargoDimensions: string; loadingAvailable: string;
  contactMethod: "email" | "whatsapp"; contactValue: string;
  agreed: boolean;
};

const empty: Form = {
  name: "", company: "", phone: "", email: "",
  pickup: "", destination: "",
  service: "", date: "", description: "",
  vehicleMake: "", vehicleModel: "", vehicleYear: "", vehiclePlate: "", vehicleCondition: "",
  cargoType: "", cargoWeight: "", cargoDimensions: "", loadingAvailable: "",
  contactMethod: "email", contactValue: "",
  agreed: false,
};

const WHATSAPP_NUMBER = "233246773279";

function categoryOf(service: string): Category {
  return SERVICES.find((s) => s.name === service)?.category ?? "generic";
}

function RequestPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(empty);
  const [photos, setPhotos] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));

  const steps = ["Contact", "Job Details", "Preferences"];
  const cat = categoryOf(form.service);

  const canNext =
    (step === 0 && form.name && form.phone) ||
    (step === 1 && form.service && form.pickup) ||
    step === 2;

  const canSubmit = step === 2 && form.agreed && form.contactValue;

  const onPhotos = (files: FileList | null) => {
    if (!files) return;
    const next = [...photos, ...Array.from(files)].slice(0, 6);
    setPhotos(next);
  };

  const submit = () => {
    const details: string[] = [
      `New Service Request — CAAS Towing`,
      `Name: ${form.name}`,
      `Company: ${form.company || "-"}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email || "-"}`,
      `Service: ${form.service}`,
      `Pickup: ${form.pickup}`,
      `Destination: ${form.destination || "-"}`,
      `Preferred date: ${form.date || "ASAP"}`,
    ];
    if (cat === "vehicle") {
      details.push(
        `Vehicle Make: ${form.vehicleMake || "-"}`,
        `Vehicle Model: ${form.vehicleModel || "-"}`,
        `Year: ${form.vehicleYear || "-"}`,
        `Plate: ${form.vehiclePlate || "-"}`,
        `Condition: ${form.vehicleCondition || "-"}`,
      );
    } else if (cat === "cargo") {
      details.push(
        `Cargo/Equipment: ${form.cargoType || "-"}`,
        `Weight: ${form.cargoWeight || "-"}`,
        `Dimensions: ${form.cargoDimensions || "-"}`,
        `Loading available at site: ${form.loadingAvailable || "-"}`,
      );
    }
    details.push(
      `Description: ${form.description || "-"}`,
      `Photos attached: ${photos.length}`,
      `Preferred contact: ${form.contactMethod} (${form.contactValue || "-"})`,
      ``,
      `Agreed to CAAS Dispatch Policy: yes (GH₵200 booking fee)`,
    );
    const summary = details.join("\n");

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
            A CAAS dispatcher will be in touch shortly via {form.contactMethod === "whatsapp" ? "WhatsApp" : "email"} with payment instructions for the GH₵200 booking fee.
            For emergencies, call our 24/7 line.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="tel:+233246773279" className="bg-primary text-primary-foreground px-6 py-3 font-heading uppercase tracking-wider">Call Now</a>
            <button onClick={() => { setForm(empty); setPhotos([]); setStep(0); setSubmitted(false); }} className="border border-border px-6 py-3 font-heading uppercase tracking-wider hover:border-primary">New Request</button>
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
                  {SERVICES.map((o) => <option key={o.name}>{o.name}</option>)}
                </select>
              </Field>
              <Field label="Preferred Date"><input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} className={input} /></Field>
              <Field label="Pickup Location *"><input required value={form.pickup} onChange={(e) => set("pickup", e.target.value)} className={input} /></Field>
              <Field label="Destination"><input value={form.destination} onChange={(e) => set("destination", e.target.value)} className={input} /></Field>

              {/* Dynamic fields */}
              {cat === "vehicle" && (
                <>
                  <div className="sm:col-span-2 -mb-1 mt-2 text-xs uppercase tracking-[0.25em] text-primary">Vehicle Details</div>
                  <Field label="Make"><input placeholder="e.g. Toyota" value={form.vehicleMake} onChange={(e) => set("vehicleMake", e.target.value)} className={input} /></Field>
                  <Field label="Model"><input placeholder="e.g. Hilux" value={form.vehicleModel} onChange={(e) => set("vehicleModel", e.target.value)} className={input} /></Field>
                  <Field label="Year"><input placeholder="e.g. 2018" value={form.vehicleYear} onChange={(e) => set("vehicleYear", e.target.value)} className={input} /></Field>
                  <Field label="License Plate"><input value={form.vehiclePlate} onChange={(e) => set("vehiclePlate", e.target.value)} className={input} /></Field>
                  <div className="sm:col-span-2">
                    <Field label="Vehicle Condition">
                      <select value={form.vehicleCondition} onChange={(e) => set("vehicleCondition", e.target.value)} className={input}>
                        <option value="">Select condition…</option>
                        {["Runs & drives","Won't start","Flat tire","Accident damage","Rolled over","Submerged / flooded","In a ditch"].map((o) => <option key={o}>{o}</option>)}
                      </select>
                    </Field>
                  </div>
                </>
              )}

              {cat === "cargo" && (
                <>
                  <div className="sm:col-span-2 -mb-1 mt-2 text-xs uppercase tracking-[0.25em] text-primary">Cargo / Equipment Details</div>
                  <Field label="Type"><input placeholder="e.g. 40ft container, excavator, generator" value={form.cargoType} onChange={(e) => set("cargoType", e.target.value)} className={input} /></Field>
                  <Field label="Approx. Weight"><input placeholder="e.g. 12 tons" value={form.cargoWeight} onChange={(e) => set("cargoWeight", e.target.value)} className={input} /></Field>
                  <Field label="Dimensions (L × W × H)"><input placeholder="e.g. 40 × 8 × 8 ft" value={form.cargoDimensions} onChange={(e) => set("cargoDimensions", e.target.value)} className={input} /></Field>
                  <Field label="Loading Equipment On Site?">
                    <select value={form.loadingAvailable} onChange={(e) => set("loadingAvailable", e.target.value)} className={input}>
                      <option value="">Select…</option>
                      {["Yes — crane/forklift available","No — CAAS must provide","Not sure"].map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </Field>
                </>
              )}

              <div className="sm:col-span-2">
                <Field label="Description">
                  <textarea rows={4} value={form.description} onChange={(e) => set("description", e.target.value)} className={input} placeholder="Any extra details we should know…" />
                </Field>
              </div>

              {/* Photo upload */}
              <div className="sm:col-span-2">
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Upload Photos of the Unit (optional, up to 6)</div>
                <label className="flex items-center justify-center gap-2 border border-dashed border-border hover:border-primary bg-background px-4 py-6 cursor-pointer transition-colors">
                  <Upload className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Click to add photos</span>
                  <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => onPhotos(e.target.files)} />
                </label>
                {photos.length > 0 && (
                  <div className="mt-3 grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {photos.map((f, i) => (
                      <div key={i} className="relative group aspect-square border border-border overflow-hidden bg-background">
                        <img src={URL.createObjectURL(f)} alt={f.name} className="h-full w-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setPhotos((p) => p.filter((_, j) => j !== i))}
                          className="absolute top-1 right-1 h-6 w-6 bg-background/80 backdrop-blur border border-border grid place-content-center opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label="Remove photo"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <p className="mt-2 text-[11px] text-muted-foreground">Photos will be attached to your message when submitting via email. For WhatsApp, please send photos directly in the chat.</p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              {/* Dispatch Policy */}
              <div className="border border-primary/40 bg-primary/5 p-5">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="font-heading uppercase tracking-wider text-sm text-primary">CAAS Dispatch Policy</div>
                    <p className="mt-2 text-sm text-foreground/90 leading-relaxed">
                      A <strong>GH₵200 booking fee</strong> is required before dispatch. Once the driver arrives and the vehicle/unit is available for pickup, the fee is <strong>refunded or deducted from the final cost</strong>. If cancelled after dispatch, the fee becomes <strong>non-refundable</strong>.
                    </p>
                  </div>
                </div>
              </div>

              <label className="flex items-start gap-3 cursor-pointer border border-border p-4 hover:border-primary transition-colors">
                <input
                  type="checkbox"
                  checked={form.agreed}
                  onChange={(e) => set("agreed", e.target.checked)}
                  className="mt-1 h-4 w-4 accent-primary cursor-pointer"
                />
                <span className="text-sm text-foreground">
                  I understand and agree to CAAS dispatch policy.
                </span>
              </label>

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
              <Field label={form.contactMethod === "email" ? "Your Email *" : "Your WhatsApp Number *"}>
                <input
                  type={form.contactMethod === "email" ? "email" : "tel"}
                  value={form.contactValue}
                  onChange={(e) => set("contactValue", e.target.value)}
                  placeholder={form.contactMethod === "email" ? "you@example.com" : "+233 55 555 5555"}
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
                disabled={!canSubmit}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 font-heading uppercase tracking-wider text-sm disabled:opacity-40 hover:btn-glow transition-all"
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
