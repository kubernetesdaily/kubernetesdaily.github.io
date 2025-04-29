const fs = require('fs');
const path = require('path');
const glob = require('glob');

const SITE_URL = 'https://kubernetesdaily.github.io'; // Update with your domain

function generateSitemap() {
  // Get all markdown files
  const blogPosts = glob.sync('public/blog/**/*.md');
  const labPosts = glob.sync('public/labs/**/*.md');
  
  const today = new Date().toISOString();
  
  // XML sitemap header
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Main pages -->
  <url>
    <loc>${SITE_URL}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}/blog</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${SITE_URL}/labs</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
`;

  // Add blog posts
  blogPosts.forEach(post => {
    const slug = post
      .replace('public/blog/', '')
      .replace('.md', '');
    
    sitemap += `
  <url>
    <loc>${SITE_URL}/blog/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  // Add lab posts
  labPosts.forEach(post => {
    const slug = post
      .replace('public/labs/', '')
      .replace('.md', '');
    
    sitemap += `
  <url>
    <loc>${SITE_URL}/labs/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  // Close sitemap
  sitemap += '\n</urlset>';

  // Write sitemap file
  fs.writeFileSync('public/sitemap.xml', sitemap);
  console.log('Sitemap generated successfully!');
}

generateSitemap(); 