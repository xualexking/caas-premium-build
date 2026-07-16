import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

const getSitemap = createServerFn({ method: "GET" }).handler(async () => {
  const base = "https://caastowing.com";
  const now = new Date().toISOString().split("T")[0];

  const urls = [
    { loc: base, priority: "1.0", changefreq: "weekly" },
    { loc: `${base}/services`, priority: "0.9", changefreq: "monthly" },
    { loc: `${base}/about`, priority: "0.7", changefreq: "monthly" },
    { loc: `${base}/gallery`, priority: "0.7", changefreq: "weekly" },
    { loc: `${base}/contact`, priority: "0.8", changefreq: "monthly" },
    { loc: `${base}/request`, priority: "0.9", changefreq: "monthly" },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
});

export const Route = createFileRoute("/sitemap/xml")({
  loader: () => getSitemap(),
});
