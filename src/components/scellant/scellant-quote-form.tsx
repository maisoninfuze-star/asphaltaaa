"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Field, Input, Textarea } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { getLeadContext } from "@/lib/lead-context";
import type { ScellantLocation } from "@/lib/content/scellant-locations";

const clientTypes = ["Résidentiel", "Commercial"] as const;
const surfaces = ["Entrée de cour", "Stationnement", "Allée / trottoir", "Autre"] as const;
const conditions = [
  "Terni / décoloré",
  "Fissures légères",
  "Taches ou saletés",
  "Récemment installé",
  "Dommages importants",
  "Je ne suis pas certain",
] as const;
const wanted = ["Scellant d'asphalte", "Réparation de fissures", "Réparation de trous", "Je ne suis pas certain"] as const;
const timelines = ["Dès que possible", "Cette saison", "L'an prochain", "Je m'informe"] as const;

const schema = z.object({
  clientType: z.enum(clientTypes, { message: "Choisissez un type" }),
  surface: z.enum(surfaces, { message: "Choisissez une surface" }),
  dimensions: z.string().optional(),
  condition: z.enum(conditions, { message: "Choisissez l'état" }),
  service: z.enum(wanted, { message: "Choisissez un service" }),
  timeline: z.enum(timelines).optional(),
  address: z.string().min(2, "Indiquez votre adresse / secteur"),
  name: z.string().min(2, "Entrez votre nom"),
  phone: z.string().min(6, "Entrez un téléphone valide"),
  email: z.string().email("Courriel invalide").or(z.literal("")),
  message: z.string().max(2000).optional(),
  consent: z.boolean().refine((v) => v === true, "Veuillez cocher cette autorisation."),
});
type Values = z.infer<typeof schema>;

const steps = [
  { id: "type", label: "Type", fields: ["clientType"] as const },
  { id: "surface", label: "Surface", fields: ["surface", "dimensions"] as const },
  { id: "etat", label: "État", fields: ["condition", "service"] as const },
  { id: "contact", label: "Coordonnées", fields: ["address", "name", "phone", "email"] as const },
];

export function ScellantQuoteForm({ location }: { location: ScellantLocation }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [dir, setDir] = useState(1);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { dimensions: "", message: "", consent: false },
    mode: "onTouched",
  });

  const clientType = watch("clientType");
  const surface = watch("surface");
  const condition = watch("condition");
  const service = watch("service");
  const timeline = watch("timeline");
  const majorDamage = condition === "Dommages importants";

  const go = async (next: number) => {
    if (next > step) {
      const ok = await trigger(steps[step].fields as unknown as (keyof Values)[]);
      if (!ok) return;
    }
    setDir(next > step ? 1 : -1);
    setStep(Math.max(0, Math.min(steps.length - 1, next)));
  };

  async function onSubmit(values: Values) {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kind: "soumission",
        name: values.name,
        phone: values.phone,
        email: values.email,
        message: values.message,
        division: "scellant",
        region: location.name,
        consent: values.consent,
        sourcePage: typeof window !== "undefined" ? window.location.pathname : "",
        meta: {
          locationSlug: location.slug,
          ghlLocationTag: location.ghlRouting.locationTag,
          clientType: values.clientType,
          surface: values.surface,
          dimensions: values.dimensions,
          condition: values.condition,
          service: values.service,
          timeline: values.timeline,
          address: values.address,
          ...getLeadContext(),
        },
      }),
    });
    if (res.ok) setDone(true);
  }

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-hivis/40 bg-asphalt-2 p-10 text-center lg:p-16"
      >
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-hivis text-2xl text-asphalt">✓</div>
        <h3 className="display text-2xl text-warm">Demande envoyée !</h3>
        <p className="mx-auto mt-3 max-w-md text-concrete-light">
          Merci — on revient vers vous rapidement avec une soumission pour votre projet de scellant à {location.name}.
        </p>
      </motion.div>
    );
  }

  const pct = ((step + 1) / (steps.length + 1)) * 100;

  return (
    <div className="border border-warm/15 bg-asphalt-2">
      <div className="border-b border-warm/10 p-6 lg:p-8">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-mono text-xs text-hivis">Étape {step + 1} / {steps.length}</span>
          <span className="label-mono">{steps[step].label} · {location.name}</span>
        </div>
        <div className="h-[3px] w-full bg-warm/10">
          <motion.div className="h-full bg-hivis" animate={{ width: `${pct}%` }} transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }} />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6 lg:p-10" noValidate>
        <div className="relative min-h-[22rem]">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={step}
              initial={{ opacity: 0, x: dir * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -40 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {step === 0 && (
                <Choice label="Type de projet" options={clientTypes} value={clientType} onSelect={(v) => setValue("clientType", v, { shouldValidate: true })} error={errors.clientType?.message} />
              )}

              {step === 1 && (
                <div className="space-y-8">
                  <Choice label="Type de surface" options={surfaces} value={surface} onSelect={(v) => setValue("surface", v, { shouldValidate: true })} error={errors.surface?.message} />
                  <Field label="Dimensions approximatives (optionnel)">
                    <Input placeholder="Ex. : 100 m² ou 6 m × 15 m" {...register("dimensions")} />
                  </Field>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8">
                  <Choice label="État actuel de la surface" options={conditions} value={condition} onSelect={(v) => setValue("condition", v, { shouldValidate: true })} error={errors.condition?.message} />
                  {majorDamage && (
                    <div className="border border-hivis/40 bg-hivis/[0.06] p-5">
                      <p className="text-sm text-warm">
                        Des dommages importants peuvent nécessiter un pavage plutôt qu&apos;un scellant.
                      </p>
                      <Link href="/asphalte/soumission" className="mt-3 inline-flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-hivis hover:underline">
                        Voir la soumission de pavage →
                      </Link>
                    </div>
                  )}
                  <Choice label="Service souhaité" options={wanted} value={service} onSelect={(v) => setValue("service", v, { shouldValidate: true })} error={errors.service?.message} />
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <Field label="Adresse / secteur" error={errors.address?.message}>
                    <Input placeholder={`Votre adresse à ${location.name}`} {...register("address")} />
                  </Field>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field label="Nom" error={errors.name?.message}>
                      <Input placeholder="Votre nom" {...register("name")} />
                    </Field>
                    <Field label="Téléphone" error={errors.phone?.message}>
                      <Input placeholder="(000) 000-0000" inputMode="tel" {...register("phone")} />
                    </Field>
                  </div>
                  <Field label="Courriel (optionnel)" error={errors.email?.message}>
                    <Input placeholder="vous@exemple.com" inputMode="email" {...register("email")} />
                  </Field>
                  <Field label="Échéancier (optionnel)">
                    <div className="flex flex-wrap gap-2">
                      {timelines.map((t) => (
                        <button type="button" key={t} onClick={() => setValue("timeline", t)} className={cn("border px-4 py-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] transition-colors", timeline === t ? "border-hivis bg-hivis text-asphalt" : "border-warm/20 text-warm/70 hover:border-warm/50")}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </Field>
                  <Field label="Message (optionnel)">
                    <Textarea rows={3} placeholder="Détails utiles, photos à suivre par courriel, etc." {...register("message")} />
                  </Field>
                  <label className="flex items-start gap-3 text-sm text-concrete-light">
                    <input type="checkbox" {...register("consent")} className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-hivis)]" />
                    <span>J&apos;autorise Asphalte AAA à communiquer avec moi au sujet de ma demande.</span>
                  </label>
                  {errors.consent && <p className="font-mono text-xs text-red-400">{errors.consent.message}</p>}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-warm/10 pt-6">
          {step > 0 ? (
            <button type="button" onClick={() => go(step - 1)} className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-warm/60 hover:text-warm">
              ← Retour
            </button>
          ) : <span />}
          {step < steps.length - 1 ? (
            <button type="button" onClick={() => go(step + 1)} className="inline-flex items-center gap-2 bg-hivis px-7 py-4 font-mono text-xs uppercase tracking-[0.16em] text-asphalt transition-colors hover:bg-warm">
              Continuer →
            </button>
          ) : (
            <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 bg-hivis px-7 py-4 font-mono text-xs uppercase tracking-[0.16em] text-asphalt transition-colors hover:bg-warm disabled:opacity-60">
              {isSubmitting ? "Envoi…" : "Envoyer ma demande"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

function Choice<T extends string>({
  label,
  options,
  value,
  onSelect,
  error,
}: {
  label: string;
  options: readonly T[];
  value?: T;
  onSelect: (v: T) => void;
  error?: string;
}) {
  return (
    <div>
      <p className="display mb-6 text-2xl text-warm sm:text-3xl">{label}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((o) => (
          <button
            type="button"
            key={o}
            onClick={() => onSelect(o)}
            aria-pressed={value === o}
            className={cn(
              "flex items-center justify-between border px-5 py-5 text-left font-display text-lg uppercase tracking-tight transition-colors",
              value === o ? "border-hivis bg-hivis/[0.06] text-hivis" : "border-warm/15 text-warm hover:border-warm/40"
            )}
          >
            {o}
            <span className={cn("h-2.5 w-2.5 rounded-full border", value === o ? "border-hivis bg-hivis" : "border-warm/40")} />
          </button>
        ))}
      </div>
      {error && <p className="mt-3 font-mono text-xs text-red-400">{error}</p>}
    </div>
  );
}
