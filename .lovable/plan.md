
# Summit Advisory Group — Corporate Website (revised)

Production-style consulting firm site on the existing TanStack Start + Tailwind v4 + shadcn/ui stack. All content mock; forms, newsletter, cookie prefs, downloads, and bookings persist to LocalStorage. No backend.

## Design system

- Tokens in `src/styles.css` via `@theme inline` + `:root`: `--navy`, `--navy-deep`, `--blue`, `--gold`, `--bg`, `--surface`, `--muted`, `--foreground`, `--border`; mapped to shadcn semantic vars.
- Type: serif display (Fraunces) for headlines, Inter for body, loaded via `<link>` in `__root.tsx`.
- Spacious sections, restrained Framer Motion (respects `prefers-reduced-motion`).

## Routes (`src/routes/`)

```
__root.tsx                  shell: header, footer, cookie banner, sitewide meta, Organization JSON-LD
index.tsx                   Home
about.tsx
services.tsx
services.$slug.tsx
industries.tsx
industries.$slug.tsx
case-studies.tsx            filter / search / pagination
case-studies.$slug.tsx      detail w/ KPI cards + download
team.tsx
team.$slug.tsx
insights.tsx
insights.$slug.tsx
careers.tsx
careers.$slug.tsx
contact.tsx
resources.tsx
book-consultation.tsx       NEW: dedicated booking flow
our-process.tsx             NEW: methodology page
faq.tsx                     NEW
search.tsx
privacy.tsx, terms.tsx, cookie-policy.tsx, accessibility.tsx
sitemap[.]xml.ts
```

Each leaf route owns `head()` with title, description, og:title/description, og:url, canonical. Article / case-study / service / FAQ routes emit JSON-LD (`Article`, `Service`, `FAQPage`, `BreadcrumbList`). Root emits `Organization` only (no canonical, no og:image).

## Mock data (`src/data/`, typed TS modules)

- `company.ts`, `services.ts`, `industries.ts`, `team.ts`, `insights.ts`, `testimonials.ts`, `careers.ts`, `resources.ts`, `faqs.ts` (grouped: engagement, consultation, industries, timelines, pricing).
- `caseStudies.ts` — each entry adds a `metrics` block:
  ```ts
  metrics: {
    revenueGrowth?: string;     // "+38%"
    costReduction?: string;     // "-22%"
    processEfficiency?: string; // "+45%"
    customerSatisfaction?: string; // "94 NPS"
    timeSaved?: string;         // "1,200 hrs/qtr"
  }
  ```
- `trust.ts` — `clientLogos[]`, `certifications[]` (ISO, SOC2, etc.), `awards[]`, `memberships[]` (e.g. ICMCI, AICPA). Each row has name + logo URL.
- `images.ts` — central registry of all Unsplash URLs.

## Shared components (`src/components/`)

- Layout: `SiteHeader` (sticky, search dialog, "Book Consultation" CTA), `SiteFooter`, `MobileStickyCTA` (links to `/book-consultation`).
- Sections: `SectionHeader`, `Stat`, `CTASection`, `Breadcrumbs` (+ schema).
- Trust band (home): `ClientLogoWall`, `CertificationsRow`, `AwardsRow`, `MembershipsRow`.
- Case studies: `CaseStudyCard`, `CaseStudyFilters`, `KpiCard`, `KpiGrid` (renders the 5 metrics with icons + animated count-up), `CaseStudyDownloadButton` (generates a mock PDF client-side via `jsPDF` and triggers download; also logs the request to `sag:downloads`).
- Forms (react-hook-form + zod, persist to LocalStorage):
  - `NewsletterForm` → `sag:newsletter`
  - `ContactForm` → `sag:contact`
  - `ConsultationForm` (inline, on services/home) → `sag:consultations`
  - `BookingForm` (full page) → `sag:bookings`
  - `ApplicationForm` → `sag:applications`
  - `ResourceDownloadForm` → `sag:downloads`
- States: `LoadingSkeleton`, `EmptyState`, `FormSuccess`, `NotFound`, error boundaries.
- Compliance: `CookieBanner`, `CookiePreferencesModal` → `sag:cookies`.

## New page details

### `/book-consultation`
Two-column layout: left = value-prop + what-to-expect bullets + testimonial; right = `BookingForm` with fields **Name, Company, Email, Service interest (select from `services.ts`), Preferred date (shadcn Calendar in popover), Preferred time (select, 30-min slots 9:00–17:00), Notes (textarea)**. Zod-validated. On submit → push to `sag:bookings`, show success state with reference ID, "Add to calendar" stub (download `.ics`).

### `/our-process`
Five numbered stages with icon + description + deliverables list: **Discovery, Analysis, Strategy, Implementation, Optimization**. Sticky side-rail with anchor nav on desktop; vertical timeline on mobile. CTA at bottom → `/book-consultation`.

### `/faq`
Sections: Engagement process, Consultation process, Industries served, Project timelines, Pricing approach. Uses shadcn `Accordion`. Emits `FAQPage` JSON-LD built from the same `faqs.ts` source.

### Case study detail enhancements
- KPI grid (5 cards) at top under hero, animated count-up on viewport enter.
- Sticky "Download Full Case Study (PDF)" button → `jsPDF` builds a branded 2-page PDF (cover + content) from the case study data and downloads it; logs to `sag:downloads`.

### Home — trust block
New section between testimonials and insights:
1. Client logo wall (grayscale, hover color) — 8 logos.
2. Certifications row (4 badges).
3. Awards row (3–4 awards with year).
4. Professional memberships row.

## Header / footer updates

- Primary nav: About, Services, Industries, Case Studies, Our Process, Insights, Careers, Contact. "FAQ" lives in footer + linked from Contact and Booking pages.
- Header CTA changes from "Schedule Consultation" → "Book Consultation" linking to `/book-consultation`.
- Footer "Company" column adds Our Process, FAQ.

## SEO / a11y / perf

- Per-route `head()` + canonical on leaves; JSON-LD per schema picker; `FAQPage` on `/faq`; `BreadcrumbList` on all detail routes.
- `public/robots.txt` (Allow all). `src/routes/sitemap[.]xml.ts` enumerating static routes + dynamic slugs (services, industries, case studies, team, insights, careers).
- Single `<main>`, skip link, semantic headings (one H1/page), labeled icon buttons, focus rings via tokens, AA contrast verified on navy/gold, `h-dvh` for mobile hero, `prefers-reduced-motion` honored.
- Unsplash URLs sized via `?w=` query, `width`/`height` set, `loading="lazy"` (hero eager + preloaded), `aspect-*` wrappers to prevent CLS.
- Route-level code splitting (TanStack default); jsPDF dynamically imported only inside `CaseStudyDownloadButton`.

## Final QA checklist (run before close-out)

1. Click every header + footer nav link → 200 / correct route.
2. Click every CTA across all pages → correct destination, no dead buttons.
3. Visit every dynamic slug (services, industries, case studies, team, insights, careers) → renders with data; non-existent slug → `notFoundComponent`.
4. Submit every form → success state shown, entry appears in matching `localStorage` key.
5. Resize 320 / 375 / 768 / 1024 / 1440 → no horizontal scroll, no overlap, no clipped text, tap targets ≥ 44px.
6. Inspect each page → exactly one `<main>`, one H1, all `<img>` have alt, all icon-only buttons have `aria-label`.
7. DevTools console clean on every page (load + interactions).
8. `bun run build` succeeds; no TS errors.
9. Cookie banner → Accept / Reject / Customize all persist correctly to `sag:cookies`.
10. Case study PDF downloads on desktop + mobile; booking `.ics` downloads and opens in calendar apps.

## Out of scope

- Real auth, payments, email sending.
- Real map (placeholder image in `/contact`).
- MDX article compilation (articles are structured JSX from data).

## Build order

1. Tokens, fonts, `__root` shell, cookie banner, sitewide meta.
2. Data modules (incl. `trust.ts`, `faqs.ts`, `caseStudies.ts` w/ metrics).
3. Shared components + forms + KPI grid + PDF generator + booking form.
4. Home (with trust block) → About → Services / Industries (+ detail).
5. Case Studies (+ detail w/ KPIs + PDF) → Team (+ detail) → Insights (+ detail).
6. Our Process → FAQ → Book Consultation → Careers → Contact → Resources → Search.
7. Legal pages, sitemap, robots, JSON-LD sweep.
8. Final QA pass per checklist above.
