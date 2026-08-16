import { Develop } from "@/components/emulsion/Develop";

const steps = [
  {
    n: "01",
    title: "Discovery",
    body: "Tell me about your project — what you need, your timeline and your budget. A quick call or a thread over email.",
  },
  {
    n: "02",
    title: "Proposal",
    body: "A clear scope, timeline and quote. No surprises — you know exactly what you are getting.",
  },
  {
    n: "03",
    title: "Build",
    body: "I get to work. Regular updates, and room for feedback along the way.",
  },
  {
    n: "04",
    title: "Deliver",
    body: "Final product, deployed and handed off. I make sure everything runs smoothly.",
  },
];

export function ProcessSection() {
  return (
    <section className="surface-paper border-t hairline" id="process">
      <div className="mx-auto max-w-[1120px] px-5 sm:px-8 py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <Develop className="eyebrow text-ink/70 mb-4">Process</Develop>
            <Develop delay={80}>
              <h2 className="display text-[clamp(1.9rem,4.2vw,3.4rem)] max-w-[14ch]">How it works.</h2>
            </Develop>
            <Develop delay={160}>
              <p className="lede text-ink/70 max-w-[40ch] mt-4">Four steps, in order. Simple, transparent and collaborative.</p>
            </Develop>
          </div>

          {/* Vertical stepper: a spine runs top→bottom through square markers; one big numeral per step. */}
          <Develop
            delay={200}
            as="ol"
            className="relative before:absolute before:content-[''] before:left-[5px] before:top-2 before:bottom-2 before:w-px before:bg-ink/20"
          >
            {steps.map((s, i) => (
              <li key={s.n} className={`relative pl-10 sm:pl-12 ${i < steps.length - 1 ? "pb-10" : ""}`}>
                <span className="absolute left-0 top-[9px] block h-[11px] w-[11px] bg-ink" aria-hidden />
                <div className="grid sm:grid-cols-[4.5rem_1fr] gap-x-6 gap-y-2 items-start">
                  <span className="display block text-[2.4rem] leading-[0.9] text-ink">{s.n}</span>
                  <span className="pt-1">
                    <span className="block text-[1.15rem] tracking-tight2 font-medium">{s.title}</span>
                    <span className="block font-mono text-[12.5px] leading-[1.55] text-ink/70 mt-1.5 max-w-[48ch]">{s.body}</span>
                  </span>
                </div>
              </li>
            ))}
          </Develop>
        </div>
      </div>
    </section>
  );
}
