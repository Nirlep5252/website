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
              <p className="lede text-ink/70 max-w-[40ch] mt-4">Simple, transparent and collaborative.</p>
            </Develop>
          </div>

          <Develop delay={200} as="ol" className="border-t hairline">
            {steps.map((s) => (
              <li key={s.n} className="grid grid-cols-[3rem_1fr] gap-4 py-5 border-b hairline">
                <span className="meta text-ink/45 pt-1.5">{s.n}</span>
                <span>
                  <span className="block text-[1.15rem] tracking-tight2 font-medium">{s.title}</span>
                  <span className="block font-mono text-[12.5px] leading-[1.55] text-ink/70 mt-1 max-w-[52ch]">
                    {s.body}
                  </span>
                </span>
              </li>
            ))}
          </Develop>
        </div>
      </div>
    </section>
  );
}
