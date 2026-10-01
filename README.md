# 陳天一 · Tien Yi Chen

A bilingual CV and portfolio for Applied AI Engineering. Traditional Chinese is the default language.

## Local development

Use Node.js 22 or later and pnpm 11.

```
pnpm install --frozen-lockfile
pnpm dev --port 3000
```

Open http://localhost:3000/zh-TW or http://localhost:3000/en.

## Verification

```
pnpm check-content
pnpm lint
pnpm check-types
pnpm build
```

Profile copy is in `src/lib/profile.ts`. Case studies are in `src/content/case-studies/zh-TW` and `src/content/case-studies/en`. Set `NEXT_PUBLIC_APP_URL` to the final origin when preparing deployment; local development defaults to `http://localhost:3000`.

The profile and project claims use the supplied Notion résumé, refreshed on 2026-09-30, and the LinkedIn profile for the English name and introduction. Retrieval test results and later platform-level outcomes are labelled in the case studies. Uploaded portrait assets are stored locally and contain no expiring source URLs.

- Résumé: https://app.notion.com/p/c364f5ac5c2b82998f9c012ef4765fc5
- LinkedIn: https://www.linkedin.com/in/%E5%A4%A9%E4%B8%80-%E9%99%B3-98812812a/

Adapted from shadcn/studio's Zolt template at source revision `b4a6e43fac0f034bc7d3445af6c0a35095bed7db`. The original MIT license is retained in `LICENSE.md`.
