# CK Electric Project Memory

## Project Overview
- Next.js 16 SSR site on Vercel + WordPress headless CMS on Kinsta (DevKinsta locally)
- WordPress GraphQL endpoint: `ckelectric.kinsta.cloud/graphql` (env: `NEXT_PUBLIC_WORDPRESS_API_URL`)
- Local WP dev: `testing2.local`
- Production URL: `https://ck-electric.com`

## Architecture
- `src/lib/wordpress-ssr.ts` — server-side GraphQL fetch (Next.js `fetch` with `next: { revalidate: 300 }`). Use for all Server Components.
- `src/lib/wordpress-graphql.ts` — client-side GraphQL fetch (plain `fetch`). Use only in Client Components.
- These two functions have DIFFERENT return types: `wordpress-ssr.ts` returns `T | null` directly; `wordpress-graphql.ts` returns `{ data?: T, errors?: [...] }`.

## Key Files
- `src/app/layout.tsx` — root layout with LocalBusiness JSON-LD, Inter + Playfair Display fonts, skip link
- `src/app/page.tsx` — home page: server component fetches all 7 WP queries, passes as props
- `src/components/HomePage.tsx` — `'use client'` receives all data as props (no useEffect data fetching)
- `src/lib/wordpress-queries.ts` — all GraphQL query strings + type re-exports
- `src/lib/wordpress-types.ts` — all TypeScript interfaces for WP data

## Font Setup
- `Playfair Display` → `--font-display` (used by display classes: hero-title, section headings)
- `Inter` → `--font-inter` (used by body text classes)
- Geist/GeistMono were removed (unused)

## SEO/Performance Decisions
- `metadataBase: new URL('https://ck-electric.com')` in layout
- LocalBusiness JSON-LD schema in layout body
- Service JSON-LD on `/services/[slug]`, Article JSON-LD on `/blog/[slug]`
- `generateStaticParams` on all 4 dynamic routes (blog, services, projects, service-areas)
- `notFound()` called for missing dynamic content (returns proper 404)
- `revalidate: 300` (5 min) on all WP fetches
- Skip-to-content accessibility link in layout

## Phone Number
- Real phone: `2062956363` (used as hardcoded fallback where CMS data unavailable)
- Format in tel links: `tel:2062956363`

## Known Hardcoded Fallbacks (intentional)
- Stats section ("25+ Yrs", "<24 Hrs") — falls back to `heroFooter` WP field when available
- About section items — uses `landingPage.aboutUs.itemsList.item1/2/3` from WP with text fallbacks
- Service area cards on homepage use `contactPhone` prop passed from server

## User Preferences
- No emojis
- Concise responses
