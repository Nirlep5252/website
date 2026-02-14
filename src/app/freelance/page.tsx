import { FreelanceHero } from "./components/FreelanceHero";
import { ServicesSection } from "./components/ServicesSection";
import { ProcessSection } from "./components/ProcessSection";
import { PricingSection } from "./components/PricingSection";
import { CTASection } from "./components/CTASection";

export default function FreelancePage() {
  return (
    <main className="min-h-screen pb-16">
      <FreelanceHero />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 overflow-x-clip">
        <ServicesSection />
        <ProcessSection />
        <PricingSection />
        <CTASection />
      </div>
    </main>
  );
}
