import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * Lead intake endpoint. Validates, normalizes, tags, and (if configured)
 * forwards to GoHighLevel via a server-side webhook. No keys are ever exposed
 * to the client — set GHL_WEBHOOK_URL in the environment to enable delivery.
 * Until then it logs server-side so nothing is lost.
 */
const schema = z.object({
  kind: z.enum(["contact", "soumission"]).default("contact"),
  division: z.enum(["asphalte", "scellant"]).optional(),
  region: z.string().optional(),
  consent: z.boolean().optional(),
  sourcePage: z.string().optional(),
  name: z.string().min(2, "Nom requis"),
  email: z.string().email("Courriel invalide").or(z.literal("")).optional(),
  phone: z.string().min(6, "Téléphone requis"),
  message: z.string().max(4000).optional().default(""),
  meta: z.record(z.string(), z.any()).optional(),
});

function buildTags(d: z.infer<typeof schema>): string[] {
  const tags = ["Website Lead"];
  if (d.division === "asphalte") tags.push("Pavage");
  if (d.division === "scellant") {
    tags.push("Scellant");
    const loc = d.meta?.ghlLocationTag as string | undefined;
    if (loc) tags.push(loc);
    else if (d.region) tags.push(`Scellant ${d.region}`);
  }
  const client = (d.meta?.clientType || d.meta?.projectType) as string | undefined;
  if (client === "Résidentiel") tags.push("Residential");
  if (client === "Commercial") tags.push("Commercial");
  if (d.meta?.photoUploaded) tags.push("Photo Uploaded");
  if (d.meta?.smsConsent === true) tags.push("SMS Opt-In");
  const t = (d.meta?.timeline as string | undefined) ?? "";
  if (t === "Dès que possible") tags.push("High Intent");
  if (d.meta?.condition === "Dommages importants") tags.push("Possible Pavage");
  return tags;
}

export async function POST(req: Request) {
  let data: unknown;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide" }, { status: 400 });
  }

  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 422 });
  }

  const lead = parsed.data;
  const tags = buildTags(lead);
  const m = lead.meta ?? {};
  const nameParts = lead.name.trim().split(/\s+/);
  const firstName = nameParts[0] ?? lead.name;
  const lastName = nameParts.slice(1).join(" ");
  // Flat, GoHighLevel-friendly payload: top-level string fields map cleanly to
  // contact fields and are easy to reference in workflow actions.
  const payload = {
    // Contact core
    name: lead.name,
    firstName,
    lastName,
    email: lead.email ?? "",
    phone: lead.phone,
    // Lead context
    kind: lead.kind,
    division: lead.division ?? "",
    region: lead.region ?? "",
    sourcePage: lead.sourcePage ?? "",
    consent: lead.consent ?? false,
    smsConsent: m.smsConsent === true,
    message: lead.message ?? "",
    // Tags (array for GHL "Add tags"; CSV string as a fallback reference)
    tags,
    tagsCsv: tags.join(", "),
    // Flattened context / attribution
    clientType: (m.clientType || m.projectType || "") as string,
    timeline: (m.timeline || "") as string,
    condition: (m.condition || "") as string,
    surface: (m.surface || "") as string,
    address: (m.address || "") as string,
    utmSource: (m.utm_source || "") as string,
    utmMedium: (m.utm_medium || "") as string,
    utmCampaign: (m.utm_campaign || "") as string,
    landingPage: (m.landing_page || "") as string,
    referrer: (m.referrer || "") as string,
    receivedAt: new Date().toISOString(),
  };

  // Forward to GoHighLevel (or any CRM) if a webhook is configured.
  const webhook = process.env.GHL_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("[lead] webhook forward failed", err);
      // Still return ok to the visitor; the lead is logged below.
    }
  }

  console.info("[lead]", JSON.stringify(payload));
  return NextResponse.json({ ok: true });
}
