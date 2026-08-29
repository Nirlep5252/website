import Link from "next/link";
import { Develop } from "@/components/emulsion/Develop";
import { Collage, type CollagePhoto } from "@/components/emulsion/Collage";
import { ProjectMention } from "@/components/ProjectMention";

/** The studio assistant, in reading order across the pile. */
const PHOTOS: CollagePhoto[] = [
  { src: "/cat/bed.jpg", focus: [0.45, 0.45], alt: "An orange kitten in a cat bed with its toys" },
  { src: "/cat/keys.jpg", focus: [0.3, 0.35], alt: "An orange kitten resting its chin on a keyboard" },
  { src: "/cat/stand.jpg", focus: [0.45, 0.45], alt: "An orange kitten standing on a mousepad in front of a laptop" },
  { src: "/cat/hand.jpg", focus: [0.4, 0.4], alt: "A hand petting an orange kitten next to a keyboard" },
  { src: "/cat/sleep.jpg", focus: [0.4, 0.35], alt: "An orange kitten asleep on a mechanical keyboard" },
  { src: "/cat/desk.jpg", focus: [0.28, 0.5], alt: "An orange kitten sitting on a desk in front of two screens of code" },
];

/** Exposure of the prints: full-resolution shader pixels, 24 levels of the warm ramp. */
const TONE = {
  chunk: 1,
  levels: 24,
  ditherAmt: 0.45,
  objAmt: 0.92,
  contrast: 1.15,
  gamma: 0.95,
  lift: 0.04,
  cool: 0,
} as const;

export function AboutSection() {
  return (
    <section className="surface-paper" id="about">
      <div className="mx-auto max-w-[1120px] px-5 sm:px-8 py-20 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 items-start">
          <div>
            <Develop className="eyebrow text-ink/70 mb-6">About</Develop>
            <Develop delay={80}>
              <p className="display text-[clamp(1.5rem,2.9vw,2.2rem)] !leading-[1.12] max-w-[26ch]">
                Software engineer in India. I build things I want to exist, then keep the ones that hold up.
              </p>
            </Develop>
            <Develop delay={160}>
              {/* divs, not p: the project mention's hover card contains block elements */}
              <div className="lede text-ink/70 max-w-[54ch] mt-7">
                A few of those grew into products, like <ProjectMention name="Bond" /> and{" "}
                <ProjectMention name="Formality" />. Some stayed small tools I still use every day, like{" "}
                <ProjectMention name="CodexBar for Windows">CodexBar</ProjectMention>. The rest is on the{" "}
                <Link href="/projects" className="link">
                  projects page
                </Link>
                .
              </div>
              <div className="lede text-ink/70 max-w-[54ch] mt-4">
                I use AI agents all day. I write when something is worth remembering, and I solve competitive
                programming problems on purpose. Freelance work is open.
              </div>
            </Develop>
          </div>

          <Develop delay={200} className="w-full lg:justify-self-end lg:mt-2 max-w-[440px]">
            <Collage photos={PHOTOS} caption="Studio assistant. Sleeps on the keyboard. Orange fluff." tone={TONE} />
          </Develop>
        </div>
      </div>
    </section>
  );
}
