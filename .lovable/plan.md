# Fix detail-page navigation across the site

## Root cause

All six detail routes already exist and are wired correctly:

- `careers.$slug.tsx`, `case-studies.$slug.tsx`, `industries.$slug.tsx`,
  `insights.$slug.tsx`, `services.$slug.tsx`, `team.$slug.tsx`

The listing pages all use the correct typed `<Link to="/.../$slug" params={{ slug }}>`
pattern (verified in `careers.tsx`, `case-studies.tsx`, `industries.tsx`,
`insights.tsx`, `services.tsx`, `team.tsx`, and `about.tsx`).

The reason clicks appear to "redirect to the parent page" is a runtime
error captured in the preview:

```
Failed to fetch dynamically imported module:
/@id/virtual:tanstack-start-client-entry
```

The dev server's client entry chunk is stale, so every client-side
navigation that needs to load a new route chunk silently fails and the
router stays on (or falls back to) the current/listing page. This is a
sandbox state issue, not a code bug.

## Plan

1. **Restart the dev server** so the client entry and route chunks are
   regenerated. After restart, navigate from each listing to a detail
   route in the preview (services, industries, case studies, insights,
   team, careers) to confirm `/services/strategy-consulting`,
   `/team/elena-mercado`, `/careers/senior-consultant-strategy`, etc.
   render their detail components.

2. **Enrich the thin detail pages** so the "View role / Read more / View
   case study" CTAs land on pages that clearly add information beyond
   the listing card:

   - `careers.$slug.tsx`: add a "Compensation & benefits" block and an
     "About the team" paragraph sourced from `jobs[].team`. Keep the
     existing apply form.
   - `team.$slug.tsx`: add an "Experience" list, a "Speaking & writing"
     section linking to 2–3 related insights by focus area, and related
     case studies the partner led.
   - `insights.$slug.tsx`: add an author byline card and a "Related
     reading" list (3 other insights from the same category).
   - `industries.$slug.tsx`: add a "Representative engagements" list
     (case studies filtered by `industrySlug`) and a "Services we bring
     to this industry" grid.
   - `services.$slug.tsx`: already has related case studies; add a
     "Typical engagement shape" timeline (Discover → Design → Deliver →
     Sustain) and a "Sample deliverables" list.
   - `case-studies.$slug.tsx`: already rich (KPIs + PDF). Add a "Team
     on this engagement" row showing 2–3 `team` members and a
     timeline/duration field.

3. **Data tweaks** (`src/data/`):
   - `careers.ts`: add optional `benefits: string[]` and
     `aboutTeam: string` per job.
   - `team.ts`: add optional `experience: string[]` and
     `caseStudies: string[]` (slugs) per member.
   - `caseStudies.ts`: add optional `teamSlugs: string[]` and
     `duration: string` per case study.
   - All new fields are optional so existing render paths keep working.

4. **Verify**: open each detail URL in the preview, confirm no console
   errors, and confirm the detail page shows materially more content
   than the listing card.

## Technical notes

- No router or routeTree changes required — files already register
  correctly in `src/routeTree.gen.ts`.
- No new dependencies.
- All link patterns stay `<Link to="/x/$slug" params={{ slug }}>`; no
  string interpolation.
- The restart in step 1 is the actual fix for the user-visible
  "redirects to parent" symptom; steps 2–3 address the underlying
  request that the detail pages show "more detailed information".
