import fs from "fs";

export class SitemapXml {
    #urls;

    constructor() {
        this.#urls = [];
    }

    url(loc) {
        const entry = new SitemapXmlUrl(loc);
        this.#urls.push(entry);
        return entry;
    }

    toSitemapXml({ dateFormat = "full", force = false } = {}) {
        if (!force && this.#urls.length === 0) {
            throw new Error("Sitemap must have at least one URL. Use `force: true` to override.");
        }

        const urlsXml = this.#urls.map(url => url.toSitemapXml({ dateFormat })).join("\n");

        return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;
    }

    writeSitemapXml(filePath, options = {}) {
        const xmlContent = this.toSitemapXml(options);
        fs.writeFileSync(filePath, xmlContent);
    }
}

export class SitemapXmlUrl {
    #loc;
    #lastmod;
    #changefreq;
    #priority;

    constructor(loc) {
        this.#loc = loc;
        this.#lastmod = null;
        this.#changefreq = null;
        this.#priority = null;
    }

    get loc() {
        return this.#loc;
    }

    lastmod(date) {
        if (!(date instanceof Date)) throw new Error("lastmod must be a Date object.");
        this.#lastmod = date;
        return this;
    }

    changefreq(freq) {
        const validFreqs = ["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"];
        if (!validFreqs.includes(freq)) throw new Error(`Invalid changefreq value: ${freq}`);
        this.#changefreq = freq;
        return this;
    }

    priority(value) {
        if (typeof value !== "number" || value < 0.0 || value > 1.0) {
            throw new Error("priority must be a number between 0.0 and 1.0.");
        }
        this.#priority = value;
        return this;
    }

    toSitemapXml({ dateFormat = "full" } = {}) {
        let xml = `<url>\n  <loc>${this.#loc}</loc>\n`;
        if (this.#lastmod) {
            const formattedDate =
                dateFormat === "date-only"
                    ? this.#lastmod.toISOString().split("T")[0]
                    : this.#lastmod.toISOString();
            xml += `  <lastmod>${formattedDate}</lastmod>\n`;
        }
        if (this.#changefreq) xml += `  <changefreq>${this.#changefreq}</changefreq>\n`;
        if (this.#priority !== null) xml += `  <priority>${this.#priority.toFixed(1)}</priority>\n`;
        xml += `</url>`;
        return xml;
    }
}

export class SitemapXmlIndex {
    #sitemaps;

    constructor() {
        this.#sitemaps = [];
    }

    sitemap(loc) {
        const entry = new SitemapXmlIndexItem(loc);
        this.#sitemaps.push(entry);
        return entry;
    }

    toSitemapIndexXml({ dateFormat = "full", force = false } = {}) {
        if (!force && this.#sitemaps.length === 0) {
            throw new Error("Sitemap index must have at least one sitemap. Use `force: true` to override.");
        }

        const sitemapsXml = this.#sitemaps.map(sitemap => sitemap.toSitemapIndexXml({ dateFormat })).join("\n");

        return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapsXml}
</sitemapindex>`;
    }

    writeSitemapIndexXml(filePath, options = {}) {
        const xmlContent = this.toSitemapIndexXml(options);
        fs.writeFileSync(filePath, xmlContent);
    }
}

export class SitemapXmlIndexItem {
    #loc;
    #lastmod;

    constructor(loc) {
        this.#loc = loc;
        this.#lastmod = null;
    }

    get loc() {
        return this.#loc;
    }

    lastmod(date) {
        if (!(date instanceof Date)) throw new Error("lastmod must be a Date object.");
        this.#lastmod = date;
        return this;
    }

    toSitemapIndexXml({ dateFormat = "full" } = {}) {
        let xml = `<sitemap>\n  <loc>${this.#loc}</loc>\n`;
        if (this.#lastmod) {
            const formattedDate =
                dateFormat === "date-only"
                    ? this.#lastmod.toISOString().split("T")[0]
                    : this.#lastmod.toISOString();
            xml += `  <lastmod>${formattedDate}</lastmod>\n`;
        }
        xml += `</sitemap>`;
        return xml;
    }
}
