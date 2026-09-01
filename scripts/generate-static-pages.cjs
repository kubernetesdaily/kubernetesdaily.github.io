const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");

const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const PUBLIC = path.join(ROOT, "public");
const SITE_URL = "https://kubedaily.com";
const SITE_NAME = "KubeDaily";
const SOCIAL_IMAGE = `${SITE_URL}/logos/KubeDaily-3.png`;
const DEFAULT_DESCRIPTION =
  "Practical Kubernetes, Docker, and cloud-native learning resources, tools, labs, and container image intelligence.";

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const escapeXml = escapeHtml;

const plainMarkdown = (value = "") =>
  value
    .replace(/^---[\s\S]*?---/m, "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/^[#>*+-]+\s*/gm, "")
    .replace(/[`_*~|]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const readJson = (relativePath) =>
  JSON.parse(fs.readFileSync(path.join(PUBLIC, relativePath), "utf8"));

const readPublic = (relativePath) => {
  const fullPath = path.join(PUBLIC, relativePath.replace(/^\//, ""));
  return fs.existsSync(fullPath) ? fs.readFileSync(fullPath, "utf8") : "";
};

const pagePath = (route) =>
  route === "/" ? path.join(DIST, "index.html") : path.join(DIST, route.slice(1), "index.html");

const canonicalUrl = (route) => `${SITE_URL}${route === "/" ? "/" : route}`;

const staticShell = (eyebrow, title, description, content = "") => `
  <main style="max-width:1120px;margin:0 auto;padding:7rem 1.5rem 4rem;color:#e5e7eb;font-family:system-ui,sans-serif">
    <p style="color:#38bdf8;font-weight:700;letter-spacing:.12em;text-transform:uppercase">${escapeHtml(eyebrow)}</p>
    <h1 style="font-size:clamp(2.5rem,6vw,5rem);line-height:1.02;margin:.5rem 0 1rem;color:#fff">${escapeHtml(title)}</h1>
    <p style="max-width:760px;font-size:1.25rem;line-height:1.7;color:#cbd5e1">${escapeHtml(description)}</p>
    ${content}
  </main>`;

const list = (items) =>
  `<section style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1rem;margin-top:3rem">${items.join("")}</section>`;

const card = (title, description, href, meta = "") => `
  <article style="padding:1.25rem;border:1px solid #334155;border-radius:1rem;background:#0f172a">
    ${meta ? `<small style="color:#38bdf8">${escapeHtml(meta)}</small>` : ""}
    <h2 style="font-size:1.15rem;margin:.5rem 0"><a style="color:#fff" href="${escapeHtml(href)}">${escapeHtml(title)}</a></h2>
    <p style="color:#cbd5e1;line-height:1.6">${escapeHtml(description)}</p>
  </article>`;

const seoMeta = ({ route, title, description, type = "website", schema }) => {
  const url = canonicalUrl(route);
  const data = schema || {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
  };

  return `
  <title>${escapeHtml(title)}</title>
  <meta name="title" content="${escapeHtml(title)}">
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="keywords" content="Kubernetes, Docker, containers, cloud native, DevOps, orchestration, Helm, CNCF">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <link rel="canonical" href="${escapeHtml(url)}">
  <meta property="og:site_name" content="${SITE_NAME}">
  <meta property="og:type" content="${type}">
  <meta property="og:url" content="${escapeHtml(url)}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:image" content="${SOCIAL_IMAGE}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${SOCIAL_IMAGE}">
  <script type="application/ld+json">${JSON.stringify(data).replaceAll("<", "\\u003c")}</script>`;
};

const renderPage = (source, page) => {
  const html = source
    .replace("<!-- SEO_META -->", seoMeta(page))
    .replace('<div id="root"></div>', `<div id="root">${page.content}</div>`);

  const destination = pagePath(page.route);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, html);
};

async function build() {
  const source = fs.readFileSync(path.join(DIST, "index.html"), "utf8");
  const blogs = readJson("data/blog.json").blogs;
  const labs = readJson("data/labs.json").labs;
  const { entries } = await import(pathToFileURL(path.join(ROOT, "src/data/entries.js")).href);
  const dockerRows = readPublic("data/most-popular-dockerhub-images.csv")
    .split(/\r?\n/)
    .slice(1)
    .filter(Boolean)
    .map((row) => {
      const [name, pulls, stars, categories] = row.split(",");
      return { name, pulls, stars, categories: (categories || "Other").replaceAll(";", ", ") };
    });

  const pages = [
    {
      route: "/",
      title: "KubeDaily | Kubernetes, Docker, and cloud-native learning",
      description: DEFAULT_DESCRIPTION,
      schema: {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: `${SITE_URL}/`,
        description: DEFAULT_DESCRIPTION,
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
          logo: SOCIAL_IMAGE,
          sameAs: ["https://github.com/kubernetesdaily"],
        },
      },
      content: staticShell(
        "KubeDaily · Container intelligence",
        "Demystifying containers and orchestration.",
        DEFAULT_DESCRIPTION,
        list([
          card("Kubernetes tools", `${entries.length} curated cloud-native tools.`, "/tools"),
          card("Docker images", `${dockerRows.length} popular container images with pull data.`, "/docker-images"),
          card("Hands-on labs", "Practical Docker, Kubernetes, Helm, and containerd learning.", "/labs"),
        ])
      ),
    },
    {
      route: "/about",
      title: "About KubeDaily",
      description: "How KubeDaily makes container and orchestration knowledge practical, accessible, and open.",
      content: staticShell("About KubeDaily", "Cloud-native knowledge should be practical and open.", "KubeDaily helps developers and operators learn Kubernetes and container technologies through curated tools, field-tested articles, and hands-on labs."),
    },
    {
      route: "/tools",
      title: "Kubernetes Tools Catalog | KubeDaily",
      description: `Browse ${entries.length} curated Kubernetes, Docker, DevOps, and cloud-native tools.`,
      content: staticShell("Kubernetes tools", "Tools catalog.", `Discover ${entries.length} source-curated tools for Kubernetes and the container ecosystem.`, list(entries.map((tool) => card(tool.title, tool.description || "Kubernetes ecosystem tool", tool.link, tool.tag)))),
    },
    {
      route: "/docker-images",
      title: "Popular Docker Images | KubeDaily",
      description: `Explore ${dockerRows.length} popular Docker images with pull counts, stars, categories, and ready-to-copy commands.`,
      content: staticShell("Docker image intelligence", "Popular Docker images.", `Search ${dockerRows.length} container images maintained in KubeDaily's dataset.`, list(dockerRows.map((image) => card(image.name, `${image.pulls} pulls · ${image.stars} stars`, `https://hub.docker.com/r/${image.name}`, image.categories)))),
    },
    {
      route: "/blog",
      title: "Kubernetes and cloud-native blog | KubeDaily",
      description: "KubeDaily articles, tutorials, and operational lessons for Kubernetes, Docker, and cloud-native teams.",
      content: staticShell("KubeDaily blog", "Cloud-native field notes.", "Articles, tutorials, and operational lessons from the container ecosystem.", list(blogs.map((post) => card(post.title, post.excerpt, `/blog/${post.id}`, `${post.category} · ${post.date}`)))),
    },
    {
      route: "/labs",
      title: "Hands-on Kubernetes Labs | KubeDaily",
      description: "Build practical Kubernetes, Docker, Helm, and containerd skills with KubeDaily's hands-on labs.",
      content: staticShell("KubeDaily labs", "Learn by building.", "Hands-on curricula for Kubernetes and the container ecosystem.", list(labs.map((lab) => card(lab.title, lab.description, `/labs/${lab.id}`, lab.category)))),
    },
  ];

  for (const post of blogs) {
    const body = plainMarkdown(readPublic(post.file)).slice(0, 12_000);
    pages.push({
      route: `/blog/${post.id}`,
      title: `${post.title} | KubeDaily`,
      description: post.excerpt,
      type: "article",
      schema: {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        url: canonicalUrl(`/blog/${post.id}`),
        author: { "@type": "Person", name: post.author },
        publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL, logo: SOCIAL_IMAGE },
        articleSection: post.category,
        keywords: post.tags.join(", "),
      },
      content: staticShell(post.category, post.title, post.excerpt, `<article style="margin-top:3rem;line-height:1.8;color:#cbd5e1"><p>${escapeHtml(body)}</p></article>`),
    });
  }

  for (const lab of labs) {
    const body = plainMarkdown(readPublic(lab.path)).slice(0, 12_000);
    pages.push({
      route: `/labs/${lab.id}`,
      title: `${lab.title} | KubeDaily Lab`,
      description: lab.description,
      schema: {
        "@context": "https://schema.org",
        "@type": "LearningResource",
        name: lab.title,
        description: lab.description,
        url: canonicalUrl(`/labs/${lab.id}`),
        educationalLevel: lab.category,
        keywords: lab.tags.join(", "),
        publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL, logo: SOCIAL_IMAGE },
      },
      content: staticShell(`${lab.category} lab`, lab.title, lab.description, `<article style="margin-top:3rem;line-height:1.8;color:#cbd5e1"><p>${escapeHtml(body)}</p></article>`),
    });
  }

  pages.forEach((page) => renderPage(source, page));

  const today = new Date().toISOString().slice(0, 10);
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages
    .map((page) => `  <url><loc>${escapeXml(canonicalUrl(page.route))}</loc><lastmod>${today}</lastmod></url>`)
    .join("\n")}\n</urlset>\n`;
  fs.writeFileSync(path.join(DIST, "sitemap.xml"), sitemap);
  fs.writeFileSync(path.join(DIST, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
  fs.writeFileSync(path.join(DIST, "CNAME"), "kubedaily.com\n");
  fs.writeFileSync(path.join(DIST, ".nojekyll"), "");

  const rssItems = blogs
    .map((post) => `    <item><title>${escapeXml(post.title)}</title><link>${escapeXml(canonicalUrl(`/blog/${post.id}`))}</link><guid>${escapeXml(canonicalUrl(`/blog/${post.id}`))}</guid><description>${escapeXml(post.excerpt)}</description></item>`)
    .join("\n");
  fs.writeFileSync(path.join(DIST, "rss.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel><title>${SITE_NAME}</title><link>${SITE_URL}</link><description>${escapeXml(DEFAULT_DESCRIPTION)}</description>\n${rssItems}\n</channel></rss>\n`);

  const notFound = source
    .replace("<!-- SEO_META -->", '<title>Page not found · KubeDaily</title><meta name="robots" content="noindex">')
    .replace('<div id="root"></div>', `<div id="root">${staticShell("404", "Page not found.", "The page you requested is not available.")}</div>`);
  fs.writeFileSync(path.join(DIST, "404.html"), notFound);

  console.log(`Generated ${pages.length} indexable pages, sitemap.xml, robots.txt, and rss.xml.`);
}

build().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
