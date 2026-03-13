# CK Electric

Website for **CK Electric**, a licensed electrical contractor serving the Puget Sound region of Washington State — from Tacoma to Skagit Valley.

Live: [ck-electric.com](https://ck-electric.com)

---

## Architecture

This project uses a **headless WordPress** architecture. WordPress runs as a pure content backend and is never visited directly by users. The Next.js frontend fetches all content at build/request time via GraphQL and handles all rendering.

```
WordPress (Kinsta)
       │
  GraphQL API
  (WPGraphQL)
       │
  Next.js App
   (Netlify)
       │
     Users
```

---

## Frontend (`/client`)

### Stack

| | |
|---|---|
| **Framework** | Next.js 15 — App Router, SSR, Static Generation |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 + MUI (Material UI) |
| **Fonts** | Inter + Playfair Display (Google Fonts) |
| **Forms** | Netlify Forms |
| **Deployment** | Netlify (`@netlify/plugin-nextjs`) |

### Pages

| Route | Description |
|---|---|
| `/` | Landing page |
| `/services` | Electrical services listing |
| `/services/[slug]` | Individual service detail |
| `/projects` | Completed projects portfolio |
| `/projects/[slug]` | Individual project detail |
| `/blog` | Blog article listing |
| `/blog/[slug]` | Individual blog article |
| `/contact` | Contact page with form |
| `/request-estimate` | Free estimate request form |
| `/service-areas/[slug]` | Location-specific pages (Seattle, Tacoma, etc.) |

Detail pages (`/services/[slug]`, `/projects/[slug]`, `/blog/[slug]`, `/service-areas/[slug]`) are statically pre-rendered at build time via `generateStaticParams()`.

### Project Structure

```
client/
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── layout.tsx              # Root layout, global metadata, LocalBusiness schema
│   │   ├── page.tsx                # Home page
│   │   ├── blog/
│   │   ├── services/
│   │   ├── projects/
│   │   ├── contact/
│   │   ├── request-estimate/
│   │   └── service-areas/[slug]/
│   ├── components/                 # Reusable React components
│   └── lib/
│       ├── wordpress-queries.ts    # All GraphQL query definitions + SEO_FIELDS fragment
│       ├── wordpress-types.ts      # TypeScript interfaces for WordPress data
│       ├── wordpress-ssr.ts        # GraphQL fetch utility (server-side)
│       └── seo-utils.ts            # Shared SEO metadata builder (buildMetadata)
├── public/
│   ├── contact-form.html           # Netlify Forms static detection file
│   └── estimate-form.html          # Netlify Forms static detection file
└── netlify.toml                    # Netlify build config + Next.js runtime plugin
```

### Local Development

```bash
cd client
npm install
cp .env.example .env.local
# Fill in .env.local with your local WordPress URL
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_WORDPRESS_URL` | WordPress site URL (production: Kinsta) |
| `NEXT_PUBLIC_WORDPRESS_API_URL` | GraphQL endpoint (`/graphql`) |
| `NEXT_PUBLIC_WORDPRESS_REST_URL` | REST API base (`/wp-json/wp/v2`) |
| `EMAIL_TO` | Recipient address for form notification emails |

### Available Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run start        # Start production server
npm run type-check   # TypeScript check
npm run lint         # ESLint
```

---

## Backend — WordPress (Kinsta)

The WordPress installation is **not part of this repository**. It runs on [Kinsta](https://kinsta.com) and acts exclusively as a headless CMS — no PHP theme is ever rendered to users.

### Key Plugins

- **[WPGraphQL](https://www.wpgraphql.com/)** — Exposes all WordPress content as a GraphQL API at `/graphql`
- **[Yoast SEO](https://yoast.com/wordpress/plugins/seo/) + WPGraphQL Yoast SEO** — Surfaces SEO metadata (title, description, Open Graph, canonical, robots) through the GraphQL API
- **Custom CK Electric Plugin** — A bespoke plugin that registers all the custom post types and Advanced Custom Fields (ACF) field groups used by this project

### Custom Post Types

Registered by the custom plugin:

| Post Type | Purpose |
|---|---|
| `services` | Electrical service pages (panel upgrades, EV chargers, etc.) |
| `projects` | Completed project portfolio entries |
| `blogs` | Blog articles with author, categories, and CTA section |
| `service-areas` | Location-specific landing pages |
| `owners` | Company owner profiles (Rob & Matt) |
| `testimonials` | Client testimonials |
| `clients` | Client logos and references |

---

## Data Fetching with GraphQL

All data is fetched server-side using `fetchWordPressGraphQL()` from `src/lib/wordpress-ssr.ts`. There are no client-side API calls for content.

### GraphQL Queries

All queries are defined as template literal strings in `src/lib/wordpress-queries.ts`. A shared `SEO_FIELDS` constant is interpolated into every query's `seo {}` block to guarantee consistent SEO data across all pages:

```graphql
seo {
  title
  metaDesc
  metaKeywords
  canonical
  metaRobotsNoindex
  metaRobotsNofollow
  opengraphTitle
  opengraphDescription
  opengraphImage { mediaItemUrl }
  opengraphUrl
  opengraphType
  opengraphSiteName
  opengraphPublishedTime
  opengraphModifiedTime
}
```

### Example

```ts
const data = await fetchWordPressGraphQL<ServiceDetailResponse>(
  GET_SERVICE_BY_SLUG,
  { slug }
);
```

---

## SEO

SEO is centralized in `src/lib/seo-utils.ts`. The `buildMetadata()` function maps WordPress Yoast SEO fields to a Next.js `Metadata` object, with robust fallbacks for every field.

```ts
export function buildMetadata(
  seo: WpSeo | null | undefined,
  fallbacks: SeoFallbacks,
): Metadata
```

Every page's `generateMetadata()` calls `buildMetadata()`. A marketer can fill in any Yoast field on the WordPress side and it automatically surfaces on the frontend — no code changes needed.

**Fields handled automatically:**

- Page title and meta description
- Canonical URL
- Robots (index/follow) directives from Yoast
- Open Graph (title, description, image, type, site name, published/modified time)
- Twitter cards (falls back to Open Graph values when Twitter-specific fields are empty)

---

## Forms

Contact (`/contact`) and estimate request (`/request-estimate`) forms submit to **Netlify Forms**. Because Next.js renders forms client-side, static HTML detection files in `public/` register the forms with Netlify at build time. Email notifications are configured in the Netlify dashboard under **Forms → Notifications**.

Form names: `contact`, `estimate`, `estimate-request`

---

## Deployment

| Layer | Platform | Trigger |
|---|---|---|
| Frontend | Netlify | Auto-deploy on push to `main` |
| CMS | Kinsta (WordPress) | Manual via WordPress admin |

**Netlify build settings:**
- Base directory: `client`
- Build command: `npm run build`
- Publish directory: `client/.next`
- Plugin: `@netlify/plugin-nextjs`

---

## License

MIT © [Erika Aquino](https://github.com/erikaaquino)
