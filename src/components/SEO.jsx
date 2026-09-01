import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({
  title,
  description,
  image,
  article = false,
  pathname,
  keywords = [],
  author = 'Kubernetes Daily',
}) => {
  const siteUrl = 'https://kubedaily.com';
  const defaultTitle = 'KubeDaily - Cloud Native Learning Platform';
  const defaultDescription = 'Learn Kubernetes, Cloud Native, DevOps, and Container technologies with hands-on tutorials, guides, and best practices.';
  const defaultImage = `${siteUrl}/logos/KubeDaily-3.png`;

  const seo = {
    title: title ? `${title} | ${defaultTitle}` : defaultTitle,
    description: description || defaultDescription,
    image: image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : defaultImage,
    url: `${siteUrl}${pathname || ''}`,
    keywords: [
      'kubernetes',
      'k8s',
      'cloud native',
      'devops',
      'containers',
      'docker',
      'microservices',
      'cloud computing',
      'container orchestration',
      'kubernetes tutorials',
      'kubernetes guides',
      'kubernetes best practices',
      ...keywords,
    ].join(', '),
  };

  // Schema.org structured data
  const schemaOrgWebPage = {
    '@context': 'http://schema.org',
    '@type': 'WebSite',
    url: siteUrl,
    name: defaultTitle,
    description: defaultDescription,
    publisher: {
      '@type': 'Organization',
      name: 'KubeDaily',
      logo: {
        '@type': 'ImageObject',
        url: defaultImage,
      },
    },
  };

  const schemaOrgBlogPosting = article ? {
    '@context': 'http://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': seo.url,
    },
    headline: title,
    image: seo.image,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: schemaOrgWebPage.publisher,
    datePublished: new Date().toISOString(),
    description: seo.description,
  } : null;

  return (
    <Helmet>
      {/* General tags */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta name="keywords" content={seo.keywords} />
      <link rel="canonical" href={seo.url} />

      {/* OpenGraph tags */}
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:site_name" content={defaultTitle} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      {/* Schema.org structured data */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgWebPage)}
      </script>
      {article && (
        <script type="application/ld+json">
          {JSON.stringify(schemaOrgBlogPosting)}
        </script>
      )}

      {/* Additional SEO meta tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="google" content="notranslate" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#326CE5" /> {/* Kubernetes blue */}

      {/* Mobile viewport optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

      {/* RSS Feed */}
      <link
        rel="alternate"
        type="application/rss+xml"
        title={`${defaultTitle} RSS Feed`}
        href={`${siteUrl}/rss.xml`}
      />
    </Helmet>
  );
};

export default SEO;
