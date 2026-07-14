import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * Lead intake endpoint. Validates and returns ok.
 * TODO (owner): connect an email/CRM provider (Resend, Formspree, etc.)
 * to actually deliver these leads. For now it logs server-side.
 */
const schema = z.object({
  kind: z.enum(["contact", "soumission"]).default("contact"),
  name: z.string().min(2, "Nom requis"),
  email: z.string().email("Courriel invalide").or(z.literal("")).optional(),
  phone: z.string().min(6, "Téléphone requis"),
  message: z.string().max(4000).optional().default(""),
  meta: z.record(z.string(), z.any()).optional(),
});

export async function POST(req: Request) {
  let data: unknown;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide" }, { status: 400 });
  }

  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  // In production, forward to email/CRM here.
  console.info("[lead]", JSON.stringify(parsed.data));

  return NextResponse.json({ ok: true });
}
