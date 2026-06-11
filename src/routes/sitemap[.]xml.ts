import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { services } from "@/data/services";
import { industries } from "@/data/industries";
import { caseStudies } from "@/data/caseStudies";
import { team } from "@/data/team";
import { insights } from "@/data/insights";
import { jobs } from "@/data/careers";

// TODO: replace with your project URL once a project name or custom domain is set.
const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const paths: string[] = [
          "/", "/about", "/services", "/industries", "/case-studies",
          "/team", "/insights", "/careers", "/contact", "/resources",
          "/book-consultation", "/our-process", "/faq",
          "/privacy", "/terms", "/cookie-policy", "/accessibility",
          ...services.map((s) => `/services/${s.slug}`),
          ...industries.map((i) => `/industries/${i.slug}`),
          ...caseStudies.map((c) => `/case-studies/${c.slug}`),
          ...team.map((t) => `/team/${t.slug}`),
          ...insights.map((i) => `/insights/${i.slug}`),
          ...jobs.map((j) => `/careers/${j.slug}`),
        ];
        const urls = paths.map((p) =>
          `  <url><loc>${BASE_URL}${p}</loc><changefreq>weekly</changefreq></url>`,
        ).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
