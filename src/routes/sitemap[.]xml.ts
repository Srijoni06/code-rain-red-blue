import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://code-rain-red-blue.lovable.app";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const entries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/hackathon", changefreq: "weekly", priority: "0.9" },
  { path: "/hackathon/register", changefreq: "weekly", priority: "0.8" },
  { path: "/showcase", changefreq: "weekly", priority: "0.8" },
  { path: "/showcase/register", changefreq: "weekly", priority: "0.7" },
  { path: "/project-exhibition", changefreq: "weekly", priority: "0.8" },
  { path: "/project-exhibition/register", changefreq: "weekly", priority: "0.7" },
  { path: "/workshops", changefreq: "weekly", priority: "0.7" },
  { path: "/schedule", changefreq: "weekly", priority: "0.7" },
  { path: "/speakers", changefreq: "weekly", priority: "0.7" },
  { path: "/venue", changefreq: "monthly", priority: "0.6" },
  { path: "/sponsors", changefreq: "monthly", priority: "0.6" },
  { path: "/highlights", changefreq: "monthly", priority: "0.5" },
  { path: "/contact", changefreq: "monthly", priority: "0.5" },
  { path: "/mascot", changefreq: "monthly", priority: "0.4" },
  { path: "/n30", changefreq: "monthly", priority: "0.4" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
