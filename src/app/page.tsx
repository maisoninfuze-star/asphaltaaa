import type { Metadata } from "next";
import { ServiceGateway } from "@/components/gateway/service-gateway";

export const metadata: Metadata = {
  title: "Asphalte AAA — Asphaltage complet & Scellant d'asphalte au Québec",
  description:
    "Deux expertises, une même précision. Asphaltage complet (excavation, pavage, réparation) et scellant d'asphalte localisé à Montréal, Québec et Rimouski. Soumission gratuite.",
  alternates: { canonical: "https://asphalteaaa.com" },
};

export default function GatewayPage() {
  return <ServiceGateway />;
}
