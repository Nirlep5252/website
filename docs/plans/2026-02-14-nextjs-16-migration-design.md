# Next.js 15 → 16 Migration Design

## Context

Migrate nirlep.dev from Next.js 15.1.11 to Next.js 16 (latest). The project is a portfolio/blog site using App Router, React 19, TypeScript, Tailwind CSS, and Bun.

## Approach

Automated codemod (`npx @next/codemod@canary upgrade latest`) followed by manual additions for React Compiler and Cache Components.

## Migration Risk: LOW

The project is already well-positioned — async params, no middleware, no deprecated APIs, modern ESLint flat config, 100% App Router.

## Changes

### 1. Run Codemod

`npx @next/codemod@canary upgrade latest` handles:
- Package version bumps (next, react, react-dom)
- ESLint migration from `next lint` to direct ESLint CLI
- Turbopack flag cleanup
- `unstable_` prefix removal if any

### 2. Update Remaining Dependencies

- `@next/mdx` → v16.x
- `eslint-config-next` → v16.x
- `@types/react`, `@types/react-dom` → latest

### 3. React Compiler

- Install `babel-plugin-react-compiler` (devDependency)
- Add `reactCompiler: true` to `next.config.ts`

### 4. Cache Components

- Add `cacheComponents: true` to `next.config.ts`

### 5. Scroll Behavior

`globals.css` sets `scroll-behavior: smooth` on `html`. Next.js 16 no longer overrides this during SPA navigations. Add `data-scroll-behavior="smooth"` to `<html>` in `src/app/layout.tsx`.

### 6. ESLint Script

Replace `"lint": "next lint"` with `"lint": "eslint ."` in package.json (codemod should handle, verify after).

### 7. Verify

- `bun run build` — confirm successful production build
- `bun run dev` — confirm dev server works

## Already Compatible (No Changes)

- All `params`/`searchParams` already use async `Promise<T>` pattern
- No `middleware.ts` to rename to `proxy.ts`
- No `cookies()`/`headers()`/`draftMode()` usage
- No `next/image` with query strings or legacy imports
- No parallel routes, AMP, or runtime config
- `next.config.ts` is minimal (no deprecated options)
