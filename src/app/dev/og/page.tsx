import { notFound } from "next/navigation";
import { Ornament } from "@/components/emulsion/Ornament";
import { HERO_PARAMS } from "@/lib/emulsion/renderer";
import { SITE } from "@/lib/site";

/**
 * Dev-only OG composition. Regenerate public/og.png with a 1200×630 viewport screenshot:
 *   agent-browser set viewport 1200 630 && agent-browser open http://localhost:3000/dev/og
 *   agent-browser wait 4000 && agent-browser screenshot public/og.png
 */
export default function OgPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <div className="fixed inset-0 z-[100] surface-ink overflow-hidden" style={{ width: 1200, height: 630 }}>
      <Ornament
        className="absolute inset-0"
        seed={0.12}
        rect={[0.72, 0.22, 0.95, 0.78]}
        interactive={false}
        params={{ ...HERO_PARAMS, seed: 0.12, darkZone: [0, 0, 0.58, 0.72], darkZoneAmt: 0.7, flow: 0, ditherFps: 0 }}
      />
      <div className="absolute left-[72px] bottom-[72px] text-paper">
        <div className="eyebrow text-paper mb-6">Software engineer</div>
        <div className="display text-[128px] leading-[0.92]">Nirlep Gohil</div>
        <div className="meta text-paper/60 mt-8">{SITE.domain}</div>
      </div>
    </div>
  );
}
