import { SitemapXml, SitemapXmlIndex } from "../src/index.mjs";

// ========== TEST 1: Generate Sitemap ==========
const sitemap = new SitemapXml();
sitemap.url("https://example.com/")
    .priority(1.0)
    .changefreq("daily")
    .lastmod(new Date("2024-02-20"));

sitemap.url("https://example.com/about")
    .priority(0.8)
    .changefreq("weekly")
    .lastmod(new Date("2024-02-18"));

const sitemapXml = sitemap.toSitemapXml({ dateFormat: "date-only" });

console.log("Generated Sitemap:");
console.log(sitemapXml);


// ========== TEST 2: Generate Sitemap Index ==========
const sitemapIndex = new SitemapXmlIndex();
sitemapIndex.sitemap("https://example.com/sitemap-main.xml")
    .lastmod(new Date("2024-02-20"));

sitemapIndex.sitemap("https://example.com/sitemap-blog.xml")
    .lastmod(new Date("2024-02-19"));

const sitemapIndexXml = sitemapIndex.toSitemapIndexXml({ dateFormat: "full" });

console.log("\nGenerated Sitemap Index:");
console.log(sitemapIndexXml);


// ========== TEST 3: Validate Expected Output ==========
const expectedSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url>
  <loc>https://example.com/</loc>
  <lastmod>2024-02-20</lastmod>
  <changefreq>daily</changefreq>
  <priority>1.0</priority>
</url>
<url>
  <loc>https://example.com/about</loc>
  <lastmod>2024-02-18</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>
</urlset>`;

const expectedSitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<sitemap>
  <loc>https://example.com/sitemap-main.xml</loc>
  <lastmod>2024-02-20T00:00:00.000Z</lastmod>
</sitemap>
<sitemap>
  <loc>https://example.com/sitemap-blog.xml</loc>
  <lastmod>2024-02-19T00:00:00.000Z</lastmod>
</sitemap>
</sitemapindex>`;

if (sitemapXml.trim() !== expectedSitemap.trim()) {
    console.error("\n❌ Lydio: SitemapXml Test Failed!");
} else {
    console.log("\n✅ Lydio: SitemapXml Test Passed!");
}

if (sitemapIndexXml.trim() !== expectedSitemapIndex.trim()) {
    console.error("\n❌ Lydio: SitemapXmlIndex Test Failed!");
} else {
    console.log("\n✅ Lydio: SitemapXmlIndex Test Passed!");
}
