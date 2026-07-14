"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { services } from "@/lib/site";
import { site } from "@/lib/site";
import { Field, Input, Textarea } from "@/components/ui/field";
import { cn } from "@/lib/utils";

const projectTypes = ["Résidentiel", "Commercial", "Municipal", "Autre"] as const;
const timelines = ["Dès que possible", "Cette saison", "L'an prochain", "Je m'informe"] as const;

const schema = z.object({
  projectType: z.enum(projectTypes, { message: "Choisissez un type" }),
  services: z.array(z.string()).min(1, "Sélectionnez au moins un service"),
  surface: z.string().optional(),
  timeline: z.enum(timelines).optional(),
  location: z.string().min(2, "Indiquez votre ville / secteur"),
  name: z.string().min(2, "Entrez votre nom"),
  phone: z.string().min(6, "Entrez un téléphone valide"),
  email: z.string().email("Courriel invalide").or(z.literal("")),
  message: z.string().max(2000).optional(),
});
type Values = z.infer<typeof schema>;

const steps = [
  { id: "type", label: "Projet", fields: ["projectType"] as const },
  { id: "services", label: "Services", fields: ["services"] as const },
  { id: "details", label: "Détails", fields: ["surface", "timeline", "location"] as const },
  { id: "contact", label: "Coordonnées", fields: ["name", "phone", "email"] as const },
];

export function QuoteForm() {
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
    defaultValues: { services: [], projectType: undefined, surface: "", message: "" },
    mode: "onTouched",
  });

  const selectedServices = watch("services") || [];
  const projectType = watch("projectType");
  const timeline = watch("timeline");

  const go = async (nextStep: number) => {
    if (nextStep > step) {
      const ok = await trigger(steps[step].fields as unknown as (keyof Values)[]);
      if (!ok) return;
    }
    setDir(nextStep > step ? 1 : -1);
    setStep(nextStep);
  };

  const toggleService = (title: string) => {
    const set = new Set(selectedServices);
    set.has(title) ? set.delete(title) : set.add(title);
    setValue("services", Array.from(set), { shouldValidate: true });
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
        meta: {
          projectType: values.projectType,
          services: values.services,
          surface: values.surface,
          timeline: values.timeline,
          location: values.location,
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
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-hivis text-2xl text-asphalt">
          ✓
        </div>
        <h2 className="display text-3xl text-warm lg:text-4xl">
          Demande envoyée.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-concrete-light">
          Merci ! On étudie votre projet et on vous revient rapidement — souvent
          la journée même. Pour une urgence, appelez-nous directement.
        </p>
        <a
          href={site.phoneHref}
          className="mt-8 inline-block bg-hivis px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] text-asphalt transition-colors hover:bg-warm"
        >
          {site.phone}
        </a>
      </motion.div>
    );
  }

  const pct = ((step + 1) / (steps.length + 1)) * 100;

  return (
    <div className="border border-warm/15 bg-asphalt-2">
      {/* Progress */}
      <div className="border-b border-warm/10 p-6 lg:p-8">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-mono text-xs text-hivis">
            Étape {step + 1} / {steps.length}
          </span>
          <span className="label-mono">{steps[step].label}</span>
        </div>
        <div className="h-[3px] w-full bg-warm/10">
          <motion.div
            className="h-full bg-hivis"
            animate={{ width: `${pct}%` }}
            transition={{ ease: [0.16, 1, 0.3, 1] as const, duration: 0.5 }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6 lg:p-10" noValidate>
        <div className="relative min-h-[22rem]">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={step}
              custom={dir}
              initial={{ opacity: 0, x: dir * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -40 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
            >
              {step === 0 && (
                <fieldset>
                  <legend className="display mb-6 text-2xl text-warm">
                    Quel type de projet ?
                  </legend>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {projectTypes.map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setValue("projectType", t, { shouldValidate: true })}
                        className={cn(
                          "border px-5 py-6 text-left font-display text-lg uppercase tracking-tight transition-colors",
                          projectType === t
                            ? "border-hivis bg-hivis/10 text-hivis"
                            : "border-warm/20 text-warm hover:border-warm/50"
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  {errors.projectType && (
                    <p className="mt-3 font-mono text-[0.7rem] text-hivis">
                      {errors.projectType.message}
                    </p>
                  )}
                </fieldset>
              )}

              {step === 1 && (
                <fieldset>
                  <legend className="display mb-2 text-2xl text-warm">
                    De quels services avez-vous besoin ?
                  </legend>
                  <p className="mb-6 text-sm text-concrete">
                    Sélectionnez tout ce qui s&apos;applique.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {services.map((s) => {
                      const active = selectedServices.includes(s.title);
                      return (
                        <button
                          type="button"
                          key={s.slug}
                          onClick={() => toggleService(s.title)}
                          className={cn(
                            "border px-4 py-3 font-mono text-xs uppercase tracking-[0.12em] transition-colors",
                            active
                              ? "border-hivis bg-hivis text-asphalt"
                              : "border-warm/20 text-warm/80 hover:border-warm/50"
                          )}
                        >
                          {s.title}
                        </button>
                      );
                    })}
                  </div>
                  {errors.services && (
                    <p className="mt-4 font-mono text-[0.7rem] text-hivis">
                      {errors.services.message}
                    </p>
                  )}
                </fieldset>
              )}

              {step === 2 && (
                <fieldset className="flex flex-col gap-6">
                  <legend className="display mb-2 text-2xl text-warm">
                    Quelques détails
                  </legend>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Surface approximative">
                      <Input placeholder="ex. 200 m² ou 2 voitures" {...register("surface")} />
                    </Field>
                    <Field label="Ville / secteur" error={errors.location?.message}>
                      <Input placeholder="ex. Brossard" {...register("location")} />
                    </Field>
                  </div>
                  <div>
                    <span className="label-mono">Échéancier</span>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {timelines.map((t) => (
                        <button
                          type="button"
                          key={t}
                          onClick={() => setValue("timeline", t)}
                          className={cn(
                            "border px-4 py-3 font-mono text-xs uppercase tracking-[0.12em] transition-colors",
                            timeline === t
                              ? "border-hivis bg-hivis/10 text-hivis"
                              : "border-warm/20 text-warm/80 hover:border-warm/50"
                          )}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </fieldset>
              )}

              {step === 3 && (
                <fieldset className="flex flex-col gap-5">
                  <legend className="display mb-2 text-2xl text-warm">
                    Où peut-on vous joindre ?
                  </legend>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Nom" error={errors.name?.message}>
                      <Input placeholder="Votre nom" autoComplete="name" {...register("name")} />
                    </Field>
                    <Field label="Téléphone" error={errors.phone?.message}>
                      <Input placeholder="(000) 000-0000" inputMode="tel" autoComplete="tel" {...register("phone")} />
                    </Field>
                  </div>
                  <Field label="Courriel (optionnel)" error={errors.email?.message}>
                    <Input placeholder="vous@exemple.com" inputMode="email" autoComplete="email" {...register("email")} />
                  </Field>
                  <Field label="Message (optionnel)">
                    <Textarea placeholder="Détails additionnels, accès au site, photos disponibles…" {...register("message")} />
                  </Field>
                </fieldset>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Nav */}
        <div className="mt-8 flex items-center justify-between border-t border-warm/10 pt-6">
          <button
            type="button"
            onClick={() => go(step - 1)}
            disabled={step === 0}
            className="font-mono text-xs uppercase tracking-[0.18em] text-warm/60 transition-colors hover:text-warm disabled:opacity-0"
          >
            ← Retour
          </button>

          {step < steps.length - 1 ? (
            <button
              type="button"
              onClick={() => go(step + 1)}
              className="group inline-flex items-center gap-2 bg-hivis px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] text-asphalt transition-colors hover:bg-warm"
            >
              Continuer
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 bg-hivis px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] text-asphalt transition-colors hover:bg-warm disabled:opacity-60"
            >
              {isSubmitting ? "Envoi…" : "Envoyer ma demande"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
