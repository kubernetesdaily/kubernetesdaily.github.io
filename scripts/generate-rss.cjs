const fs = require('fs');
const path = require('path');
const glob = require('glob');
const matter = require('gray-matter');

const SITE_URL = 'https://kubernetesdaily.github.io';
const SITE_TITLE = 'Kubernetes Daily';
const SITE_DESCRIPTION = 'Learn Kubernetes, Cloud Native, DevOps, and Container technologies with hands-on tutorials, guides, and best practices.';

function generateRSSFeed() {
  // Get all markdown files
  const blogPosts = glob.sync('public/blog/**/*.md');
  const labPosts = glob.sync('public/labs/**/*.md');
  
  const today = new Date().toISOString();
  
  // RSS feed header
  let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_TITLE}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>en</language>
    <lastBuildDate>${today}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
`;

  // Process all posts
  const allPosts = [...blogPosts, ...labPosts].map(filePath => {
    const content = fs.readFileSync(filePath, 'utf8');
    const { data, excerpt } = matter(content, { excerpt: true });
    const slug = filePath
      .replace('public/', '')
      .replace('.md', '');
    
    return {
      ...data,
      date: data.date || today,
      slug,
      excerpt: excerpt || '',
      type: filePath.includes('/blog/') ? 'blog' : 'labs'
    };
  });

  // Sort posts by date
  allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Add items to RSS feed
  allPosts.forEach(post => {
    const postUrl = `${SITE_URL}/${post.type}/${post.slug}`;
    const description = post.excerpt
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    rss += `
    <item>
      <title>${post.title}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${description}]]></description>
      ${post.tags ? post.tags.map(tag => `<category>${tag}</category>`).join('\n      ') : ''}
    </item>`;
  });

  // Close RSS feed
  rss += '\n  </channel>\n</rss>';

  // Write RSS file
  fs.writeFileSync('public/rss.xml', rss);
  console.log('RSS feed generated successfully!');
}

generateRSSFeed(); 