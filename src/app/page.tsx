import type { Metadata } from "next";
import { ServiceGateway } from "@/components/gateway/service-gateway";

export const metadata: Metadata = {
  title: "Asphalte AAA — Pavage & Scellant d'asphalte au Québec",
  description:
    "Deux expertises, une même précision. Pavage et réparation (excavation, pose, réparation) et scellant d'asphalte localisé à Montréal, Québec et Rimouski. Soumission gratuite.",
  alternates: { canonical: "https://asphalteaaa.com" },
};

export default function GatewayPage() {
  return <ServiceGateway />;
}
