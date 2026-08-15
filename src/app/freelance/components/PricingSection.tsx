import { Develop } from "@/components/emulsion/Develop";

const tiers = [
  {
    name: "Landing Page",
    price: 200,
    description: "Perfect for product launches and marketing campaigns.",
    features: [
      "Single page design & development",
      "Mobile responsive",
      "Contact form or CTA integration",
      "Fast turnaround (~1 week)",
    ],
  },
  {
    name: "Static Website",
    price: 500,
    description: "For businesses that need a complete web presence.",
    features: [
      "Multi-page site (up to 5 pages)",
      "Mobile responsive",
      "SEO basics",
      "CMS integration optional",
      "Delivery in ~2 weeks",
    ],
  },
  {
    name: "Full-Stack App",
    price: 1500,
    description: "Custom web applications with full backend support.",
    popular: true,
    features: [
      "Custom web application",
      "Auth/database/APIs",
      "Admin dashboard",
      "Deployment & hosting setup",
      "Delivery in ~4–6 weeks",
    ],
  },
  {
    name: "Enterprise / Custom",
    price: 3000,
    description: "Complex projects requiring scalable solutions.",
    features: [
      "SaaS/complex apps/custom tools",
      "Scalable architecture",
      "Third-party integrations",
      "Ongoing support available",
      "Timeline scoped per project",
    ],
  },
];

export function PricingSection() {
  return (
    <section className="surface-paper border-t hairline" id="pricing">
      <div className="mx-auto max-w-[1120px] px-5 sm:px-8 py-20 sm:py-28">
        <div className="mb-10">
          <Develop className="eyebrow text-ink/70 mb-4">Pricing</Develop>
          <Develop delay={80}>
            <h2 className="display text-[clamp(1.9rem,4.2vw,3.4rem)] max-w-[20ch]">Transparent pricing.</h2>
          </Develop>
          <Develop delay={160}>
            <p className="lede text-ink/70 max-w-[52ch] mt-4">
              No hidden fees. Every project includes source code and deployment.
            </p>
          </Develop>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((t, i) => (
            <Develop key={t.name} delay={i * 60}>
              <div className={`card p-6 h-full flex flex-col ${t.popular ? "border-ink" : ""}`}>
                <div className="meta text-ink/55 flex justify-between gap-3 mb-5">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {t.popular ? <span className="text-ink">Popular</span> : null}
                </div>

                <h3 className="text-[1.15rem] tracking-tight2 font-medium">{t.name}</h3>
                <p className="font-mono text-[12.5px] leading-[1.55] text-ink/70 mt-1.5 mb-6">{t.description}</p>

                <div className="mb-1">
                  <span className="display text-[2.4rem]">${t.price.toLocaleString("en-US")}</span>
                </div>
                <div className="meta text-ink/45 mb-6">Starting</div>

                <ul className="font-mono text-[12.5px] leading-[1.55] text-ink/70 space-y-2 mb-8 flex-1">
                  {t.features.map((f) => (
                    <li key={f} className="grid grid-cols-[1.25rem_1fr]">
                      <span className="text-ink/45">—</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <a href="#contact" className={`${t.popular ? "btn-ink" : "btn-outline"} justify-center`}>
                  Get started →
                </a>
              </div>
            </Develop>
          ))}
        </div>
      </div>
    </section>
  );
}
