# Repository instructions

## Working rules

- Keep prose direct and concise. Do not add comments inside code.
- Prefer the built-in browser for UI checks, Exa for search, local Docker Firecrawl for page extraction, Context7 for library documentation, and Notion for résumé sources when those tools are available and relevant.
- Prefer the GitHub plugin for repository operations, Woodpecker API for repositories using Woodpecker, and the Coolify and Hetzner plugins for their resources. This repository's CI is GitHub Actions (`.github/workflows/pages.yml`).
- Make changes in an isolated worktree on a `codex/` branch and deliver through a PR. Keep the primary `main` checkout clean; update it with `git pull --ff-only` after an authorized merge.

## Before editing

Read [README.md](README.md) for setup, routes, content ownership, validation, and deployment. Inspect `package.json` and the affected source files before choosing commands or changing behavior. Reuse existing components, helpers, and dependencies.

## Content and rendering

- Treat `src/lib/profile.ts` as the shared source for profiles, contact information, locale helpers, and project order. Update both languages together.
- Keep one matching MDX file per registered slug in each locale directory. When changing the case list, align `projectSlugs` and `scripts/check-static.mjs`; when changing headings, inspect `localeHref` in `profile.ts` and `src/lib/extract-headings.ts` for language-switch anchor mappings.
- Ground career claims in the supplied résumé and LinkedIn sources. Preserve the distinction between personal contributions, sampled test results, and later platform outcomes.
- Preserve static export, both locales, and `/cv` deployment paths. Use `assetPath` from `src/lib/site.ts` for public assets; use localized Next.js links for internal routes. Keep MDX loading at build time.

## Verification and delivery

Run the full lint, content check, production build, type check, and static-export check in the order and with the environment values documented in README. For navigation changes, also run the development-server navigation check. For visual or interaction changes, read back the affected pages in the browser across both locales and relevant screen sizes/themes.

Before an authorized merge, inspect PR reviews and required checks on the current head. Report local validation, CI, merge, deployment, and browser readback separately; claim only what the current evidence proves. `docs/` is ignored and may contain local verification artifacts; it is not a tracked documentation dependency.
