# Lydio: SitemapXml

Lydio: SitemapXml is a structured generator for `sitemap.xml` files in JavaScript, providing a fluent and efficient way to define sitemaps programmatically. It ensures compliance with the Sitemap protocol while maintaining an expressive and minimal API.

## Features
- **Fluent API** for defining URLs and sitemaps.
- **Supports multiple URLs with metadata (`lastmod`, `changefreq`, `priority`).**
- **Supports sitemap index files for large-scale sites.**
- **No dependencies, minimalistic and unopinionated.**

## Installation
```sh
npm install @lydio/sitemapxml
```

## Usage
```js
import { SitemapXml } from "@lydio/sitemapxml";

const sitemap = new SitemapXml();
sitemap.url("https://example.com/").priority(1.0).changefreq("daily").lastmod(new Date("2024-02-20"));
sitemap.url("https://example.com/about").lastmod(new Date("2024-02-21"));

console.log(sitemap.toSitemapXml());
/* Output:
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url>
  <loc>https://example.com/</loc>
  <lastmod>2024-02-20</lastmod>
  <changefreq>daily</changefreq>
  <priority>1.0</priority>
</url>
<url>
  <loc>https://example.com/about</loc>
  <lastmod>2024-02-21</lastmod>
</url>
</urlset>
*/
```

## API

### Creating a SitemapXml Object
```js
const sitemap = new SitemapXml();
```

### Defining URLs
- `.url(loc)`: Creates a new URL entry (returns a `SitemapXmlUrl` instance).

Example:
```js
sitemap.url("https://example.com").priority(1.0);
```

### Setting Metadata for URLs
- `.lastmod(date)`: Sets the last modified date.
- `.changefreq(freq)`: Sets the change frequency (`always`, `hourly`, `daily`, `weekly`, `monthly`, `yearly`, `never`).
- `.priority(value)`: Sets the priority (0.0 to 1.0).

Example:
```js
sitemap.url("https://example.com/blog").lastmod(new Date()).changefreq("weekly").priority(0.8);
```

### Generating the Sitemap XML Output
- `.toSitemapXml(options = {})`: Converts the object to a valid `sitemap.xml` string.
    - `{ dateFormat: "date-only" }` – Formats lastmod as `YYYY-MM-DD`.
    - `{ force: true }` – Prevents errors if no URLs are defined.

Example:
```js
console.log(sitemap.toSitemapXml());
```

### Writing Directly to File
- `.writeSitemapXml(filePath, options = {})`: Saves the `sitemap.xml` file.

Example:
```js
sitemap.writeSitemapXml("./sitemap.xml");
```

## Sitemap Index Support
```js
import { SitemapXmlIndex } from "@lydio/sitemapxml";

const sitemapIndex = new SitemapXmlIndex();
sitemapIndex.sitemap("https://example.com/sitemap-main.xml").lastmod(new Date("2024-02-20"));
sitemapIndex.sitemap("https://example.com/sitemap-blog.xml").lastmod(new Date("2024-02-21"));

console.log(sitemapIndex.toSitemapIndexXml());
/* Output:
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<sitemap>
  <loc>https://example.com/sitemap-main.xml</loc>
  <lastmod>2024-02-20</lastmod>
</sitemap>
<sitemap>
  <loc>https://example.com/sitemap-blog.xml</loc>
  <lastmod>2024-02-21</lastmod>
</sitemap>
</sitemapindex>
*/
```

### Writing Sitemap Index to File
```js
sitemapIndex.writeSitemapIndexXml("./sitemap-index.xml");
```

## License
MIT

## Branding & Authenticity
**Lydio is a project by Alex Stevovich.** The Lydio name, branding, and identity belong to its creator.