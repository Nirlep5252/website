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
        <div className="mb-12 sm:mb-16">
          <Develop className="eyebrow text-ink/70 mb-4">Process</Develop>
          <Develop delay={80}>
            <h2 className="display text-[clamp(1.9rem,4.2vw,3.4rem)] max-w-[14ch]">How it works.</h2>
          </Develop>
          <Develop delay={160}>
            <p className="lede text-ink/70 max-w-[44ch] mt-4">Four steps, in order. Simple, transparent and collaborative.</p>
          </Develop>
        </div>

        {/*
          Stepper. Desktop: a hairline runs left→right through square markers, one column per step.
          Mobile: the same line runs top→bottom down the left edge.
        */}
        <Develop
          delay={200}
          as="ol"
          className="relative grid gap-10 lg:grid-cols-4 lg:gap-8
            before:absolute before:bg-ink/20 before:content-['']
            before:left-[5px] before:top-1 before:bottom-1 before:w-px
            lg:before:left-0 lg:before:right-0 lg:before:top-[5px] lg:before:bottom-auto lg:before:h-px lg:before:w-auto"
        >
          {steps.map((s, i) => (
            <li key={s.n} className="relative pl-9 lg:pl-0 lg:pt-8">
              {/* marker: the eyebrow's square bullet, on the line */}
              <span className="absolute left-0 top-[6px] lg:left-0 lg:top-0 block h-[11px] w-[11px] bg-ink" aria-hidden />
              <span className="display block text-[2.6rem] sm:text-[3rem] leading-none text-ink">{s.n}</span>
              <span className="block text-[1.15rem] tracking-tight2 font-medium mt-4">{s.title}</span>
              <span className="block font-mono text-[12.5px] leading-[1.55] text-ink/70 mt-2 max-w-[36ch] lg:max-w-none lg:pr-4">
                {s.body}
              </span>
              {i < steps.length - 1 && (
                <span className="hidden lg:block absolute right-0 top-[1px] meta text-ink/35" aria-hidden>
                  →
                </span>
              )}
            </li>
          ))}
        </Develop>
      </div>
    </section>
  );
}
