# 陳天一 · Tien Yi Chen

Bilingual CV and portfolio for Applied AI Engineering. The root page displays Traditional Chinese, with English at `/en/`.

Published site: https://terry90918.github.io/cv/

## Local development

Node.js 22 or later and pnpm 11.19.0.

```
pnpm install --frozen-lockfile
pnpm dev --port 3000
```

## Static build for GitHub Pages

```
NEXT_PUBLIC_BASE_PATH=/cv NEXT_PUBLIC_APP_URL=https://terry90918.github.io/cv pnpm build
NEXT_PUBLIC_BASE_PATH=/cv pnpm check-static
```

The `out/` directory contains the complete static website, including all bilingual pages, assets, sharing image, sitemap, and 404 page. GitHub Actions checks and builds each pull request, then publishes `main` to GitHub Pages. No Node.js server is needed for the published site.

```
pnpm lint
pnpm check-types
pnpm check-content
```

Profile copy is in `src/lib/profile.ts`; case studies are in `src/content/case-studies`. Claims follow the supplied Notion résumé and LinkedIn profile. Retrieval test results and later platform outcomes are labelled.

- Résumé: https://app.notion.com/p/c364f5ac5c2b82998f9c012ef4765fc5
- LinkedIn: https://www.linkedin.com/in/%E5%A4%A9%E4%B8%80-%E9%99%B3-98812812a/

Adapted from shadcn/studio's Zolt template at `b4a6e43fac0f034bc7d3445af6c0a35095bed7db`. Original MIT license retained in `LICENSE.md`.
