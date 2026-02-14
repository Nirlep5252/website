# Next.js 15 → 16 Migration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Migrate nirlep.dev from Next.js 15.1.11 to Next.js 16 with React Compiler and Cache Components enabled.

**Architecture:** Automated codemod first to handle package bumps and ESLint migration, then manual config additions for React Compiler and Cache Components. Scroll behavior attribute added to preserve navigation UX.

**Tech Stack:** Next.js 16, React 19.2, TypeScript, Bun, Tailwind CSS, Turbopack

---

### Task 1: Run Next.js Upgrade Codemod

**Files:**
- Modify: `package.json`
- Modify: `eslint.config.mjs` (potentially)
- Modify: `next.config.ts` (potentially)

**Step 1: Run the codemod**

Run: `npx @next/codemod@canary upgrade latest`

This will interactively upgrade `next`, `react`, `react-dom` and migrate ESLint config. Accept all prompts.

**Step 2: Verify package.json changes**

Check that `package.json` now has:
- `next` at `^16.x` or `16.x.x`
- `react` and `react-dom` at latest
- `--turbopack` removed from dev script
- `"lint"` script changed from `"next lint"` to use eslint directly

**Step 3: Install dependencies**

Run: `bun install`

Expected: Clean install with updated lockfile.

**Step 4: Commit**

```bash
git add package.json bun.lockb eslint.config.mjs next.config.ts
git commit -m "chore: run next.js 16 upgrade codemod"
```

---

### Task 2: Update Remaining Dependencies

**Files:**
- Modify: `package.json`

**Step 1: Update @next/mdx and eslint-config-next**

Run: `bun add @next/mdx@latest && bun add -D eslint-config-next@latest`

**Step 2: Update type packages**

Run: `bun add -D @types/react@latest @types/react-dom@latest`

**Step 3: Verify versions**

Run: `cat package.json | grep -E '"next"|"react"|"@next/mdx"|"eslint-config-next"|"@types/react"'`

All should show v16.x for next-related packages and latest for types.

**Step 4: Commit**

```bash
git add package.json bun.lockb
git commit -m "chore: update remaining dependencies for next.js 16"
```

---

### Task 3: Configure React Compiler

**Files:**
- Modify: `package.json` (new devDependency)
- Modify: `next.config.ts`

**Step 1: Install React Compiler plugin**

Run: `bun add -D babel-plugin-react-compiler`

**Step 2: Enable React Compiler in next.config.ts**

Update `next.config.ts` to:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
};

export default nextConfig;
```

**Step 3: Commit**

```bash
git add package.json bun.lockb next.config.ts
git commit -m "feat: enable react compiler for automatic memoization"
```

---

### Task 4: Enable Cache Components

**Files:**
- Modify: `next.config.ts`

**Step 1: Add cacheComponents to next.config.ts**

Update `next.config.ts` to:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
};

export default nextConfig;
```

**Step 2: Commit**

```bash
git add next.config.ts
git commit -m "feat: enable cache components for partial pre-rendering"
```

---

### Task 5: Fix Scroll Behavior for Next.js 16

**Files:**
- Modify: `src/app/layout.tsx`

**Step 1: Add data-scroll-behavior attribute**

In `src/app/layout.tsx`, change:

```tsx
<html lang="en">
```

To:

```tsx
<html lang="en" data-scroll-behavior="smooth">
```

This preserves the previous Next.js behavior where smooth scrolling is temporarily overridden to `auto` during SPA navigations for snappy page transitions. Without this, your `scroll-behavior: smooth` in `globals.css` would cause slow, animated scrolls to top on every navigation.

**Step 2: Commit**

```bash
git add src/app/layout.tsx
git commit -m "fix: add data-scroll-behavior for next.js 16 navigation"
```

---

### Task 6: Verify Build and Dev Server

**Step 1: Run production build**

Run: `bun run build`

Expected: Successful build with Turbopack. No errors.

**Step 2: Start dev server**

Run: `bun run dev`

Expected: Dev server starts on localhost:3000. Visit the site and verify:
- Home page loads with animations
- Blog posts load at `/posts`
- Navigation works between pages
- CSES adventures pages load

**Step 3: Run linter**

Run: `bun run lint`

Expected: Passes (or shows only pre-existing warnings).

**Step 4: Final commit if any fixes were needed**

```bash
git add -A
git commit -m "chore: complete next.js 16 migration"
```
