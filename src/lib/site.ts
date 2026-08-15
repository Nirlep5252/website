export const SITE = {
  name: "Nirlep Gohil",
  domain: "nirlep.dev",
  url: "https://nirlep.dev",
  email: "hello@nirlep.dev",
  handle: "@nirlep_5252_",
  location: "India",
  links: [
    { name: "GitHub", value: "@nirlep5252", href: "https://github.com/nirlep5252" },
    { name: "Twitter", value: "@nirlep_5252_", href: "https://twitter.com/nirlep_5252_" },
    { name: "LinkedIn", value: "nirlep5252", href: "https://linkedin.com/in/nirlep5252" },
    { name: "Discord", value: "join server", href: "https://discord.com/invite/9rYbc54KtY" },
  ],
} as const;

export function formatDate(dateStr: string, style: "short" | "long" = "short") {
  const d = new Date(dateStr);
  return style === "long"
    ? d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    : d.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}
