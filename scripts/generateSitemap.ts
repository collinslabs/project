// scripts/generateSitemap.ts
import { SitemapStream } from 'sitemap';
import { Readable } from 'stream';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const urls = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  // Add all your website routes here
];

async function generateSitemap() {
  try {
    const stream = new SitemapStream({ hostname: 'https://sensaluxe.store' });
    
    // Create a promise to handle the stream
    const data = await new Promise<Buffer>((resolve, reject) => {
      const chunks: Buffer[] = [];
      Readable.from(urls).pipe(stream)
        .on('data', chunk => chunks.push(Buffer.from(chunk)))
        .on('error', reject)
        .on('end', () => resolve(Buffer.concat(chunks)));
    });

    // Ensure public directory exists
    const publicDir = path.resolve(__dirname, '../public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Write sitemap
    fs.writeFileSync(
      path.resolve(publicDir, 'sitemap.xml'),
      data
    );

    console.log('✅ Sitemap generated successfully!');
  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
}

generateSitemap();