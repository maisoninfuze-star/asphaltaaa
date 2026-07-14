"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Field, Input, Textarea } from "@/components/ui/field";
import { ButtonEl } from "@/components/ui/button";

const schema = z.object({
  name: z.string().min(2, "Entrez votre nom"),
  phone: z.string().min(6, "Entrez un téléphone valide"),
  email: z.string().email("Courriel invalide").or(z.literal("")),
  message: z.string().min(4, "Décrivez brièvement votre besoin"),
});
type Values = z.infer<typeof schema>;

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  async function onSubmit(values: Values) {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind: "contact", ...values }),
    });
    if (res.ok) setSent(true);
  }

  if (sent) {
    return (
      <div className="border border-hivis/40 bg-asphalt-2 p-8">
        <p className="eyebrow mb-3">Message reçu</p>
        <h3 className="display text-2xl text-warm">Merci — on vous revient vite.</h3>
        <p className="mt-3 text-concrete-light">
          On répond rapidement, souvent la journée même.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
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
      <Field label="Votre projet" error={errors.message?.message}>
        <Textarea placeholder="Décrivez votre besoin, la surface approximative et le secteur." {...register("message")} />
      </Field>
      <ButtonEl type="submit" disabled={isSubmitting} className="self-start">
        {isSubmitting ? "Envoi…" : "Envoyer le message"}
      </ButtonEl>
    </form>
  );
}
