// src/generateSitemap.ts
import fs from 'fs';
import path from 'path';

const generateSitemap = () => {
    const urls = [
        { loc: '/', lastmod: new Date().toISOString() },
        { loc: '/about', lastmod: new Date().toISOString() },
        // Add more URLs as needed
    ];

    const sitemapXml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap-image/1.1">
        ${urls.map(url => `
            <url>
                <loc>${url.loc}</loc>
                <lastmod>${url.lastmod}</lastmod>
            </url>
        `).join('')}
    </urlset>
    `.trim();

    fs.writeFileSync(path.join(__dirname, '../dist/sitemap.xml'), sitemapXml);
};

generateSitemap();