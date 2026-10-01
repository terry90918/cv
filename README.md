# 陳天一 · Tien Yi Chen

Bilingual CV and portfolio for Applied AI Engineering, built with Next.js 16 App Router, React 19, TypeScript, and Tailwind CSS 4. The site exports static HTML for GitHub Pages; it has no application server or contact-form backend.

[Published site](https://terry90918.github.io/cv/)

## Local development

Use Node.js 22 or later and pnpm 11.19.0 (pinned in `package.json`).

```sh
pnpm install --frozen-lockfile
pnpm dev --port 3000
```

Open `http://localhost:3000`. The root renders Traditional Chinese directly. `/zh-TW/` and `/en/` are the localized home pages; each locale also has `/contact/` and `/case-study/<slug>/` routes. The six case studies are `jurislm`, `nidin`, `vclass`, `gj`, `channel-t`, and `backlight-memory`.

## Project map

| Location | Responsibility |
| --- | --- |
| `src/app/` | Routes, localized layouts, sharing image, sitemap, robots, and manifest |
| `src/lib/profile.ts` | Both profiles, contact details, locale helpers, and ordered project slugs |
| `src/content/case-studies/{zh-TW,en}/` | Paired MDX case studies and frontmatter |
| `src/lib/case-studies.ts` | Build-time MDX loading from the filesystem |
| `src/lib/metadata.ts`, `src/lib/site.ts` | Canonical URLs and base-path-aware asset URLs |
| `src/components/` | Home sections, navigation, MDX rendering, theme, and interactive 3D card |
| `public/`, `src/assets/` | Photos, models, textures, cursor images, icons, and local fonts |
| `scripts/` | Content, navigation, static-export checks, and `.nojekyll` creation |
| `.github/workflows/pages.yml` | Pull-request validation and deployment from `main` |

## Content maintenance

Edit profile copy in `src/lib/profile.ts` and case studies in both locale directories. Keep the locale structures and case-study filenames aligned. Register new cases in `projectSlugs`; update the export check's slug list when adding or removing a case. The loader follows `projectSlugs` order rather than sorting by frontmatter `order`.

Claims follow the supplied [Notion résumé](https://app.notion.com/p/c364f5ac5c2b82998f9c012ef4765fc5) and [LinkedIn profile](https://www.linkedin.com/in/%E5%A4%A9%E4%B8%80-%E9%99%B3-98812812a/). Keep personal contributions, sample retrieval measurements, and later platform outcomes distinguishable. MDX is compiled at build time and should contain trusted repository content.

## Validation and static build

Run the same checks and build order as GitHub Actions:

```sh
pnpm lint
pnpm check-content
NEXT_PUBLIC_BASE_PATH=/cv NEXT_PUBLIC_APP_URL=https://terry90918.github.io/cv pnpm build
pnpm check-types
NEXT_PUBLIC_BASE_PATH=/cv pnpm check-static
```

`NEXT_PUBLIC_BASE_PATH` defaults to an empty string and prefixes assets and routes for a subdirectory deployment. `NEXT_PUBLIC_APP_URL` defaults to `http://localhost:3000` and controls canonical, sharing, and sitemap URLs; set it to the public URL including `/cv` for a production build.

`check-content` checks locale structure, matching cases, heading anchors, language-switch links, and selected light-theme text contrast. `check-types` follows the build so generated Next.js route types are available. `check-static` reads `out/` and checks localized pages, asset paths, the sharing PNG, and the 404 page; it does not replace browser interaction checks.

For navigation changes, run `node scripts/check-navigation.mjs` while a development server is running on port 3000 with no base path. It checks the two localized home pages' section order, dock destinations, and hero contact link. Use the browser to check desktop/mobile layouts, both themes, language switching, case-study anchors, and the 3D card when changing those features.

The build writes the complete static site to `out/` and adds `.nojekyll`. Preview it with a static file server; `pnpm start` invokes `next start`, which is not the serving mode for `output: 'export'`.

## Deployment

GitHub Actions installs locked dependencies, runs the checks above, and uploads `out/` on pull requests and pushes to `main`. Only `main` builds outside pull-request events deploy to GitHub Pages. This repository uses GitHub Actions for CI; Vercel Git deployments are disabled in `vercel.json`.

## Attribution

Adapted from shadcn/studio's Zolt template at `b4a6e43fac0f034bc7d3445af6c0a35095bed7db`. Original MIT license retained in [LICENSE.md](LICENSE.md).
