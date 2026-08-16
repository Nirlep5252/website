import type { Metadata } from "next";
import { FreelanceHero } from "./components/FreelanceHero";
import { ServicesSection } from "./components/ServicesSection";
import { ProcessSection } from "./components/ProcessSection";
import { PricingSection } from "./components/PricingSection";
import { CTASection } from "./components/CTASection";

export const metadata: Metadata = {
  title: "Freelance — Nirlep Gohil",
  description:
    "Full-stack developer for hire. Landing pages, static sites, SaaS and custom tools — scoped clearly, built carefully, delivered on time.",
};

export default function FreelancePage() {
  return (
    <main>
      <FreelanceHero />
      <ServicesSection />
      <ProcessSection />
      <PricingSection />
      <CTASection />
    </main>
  );
}
