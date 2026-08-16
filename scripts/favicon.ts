// bun run scripts/favicon.ts [solid|wink] [auto|ink|ivory] → regenerates src/app/icon.svg (transparent, dark-mode aware)
import { writeFileSync } from "node:fs";
import { faviconSvg, type MarkVariant } from "../src/components/emulsion/CatMark";

const variant = (process.argv[2] ?? "solid") as MarkVariant;
const mode = (process.argv[3] ?? "auto") as "auto" | "ink" | "ivory";
writeFileSync("src/app/icon.svg", faviconSvg(variant, mode));
console.log(`icon.svg ← ${variant} / ${mode}`);
