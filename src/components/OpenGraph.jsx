import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

/**
 * Dynamic OpenGraph component that sets metadata for social sharing
 * 
 * @param {Object} props
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description
 * @param {string} props.image - URL to the OpenGraph image
 * @param {string} props.type - Content type (website, article, etc.)
 * @param {string} props.url - Canonical URL for the page
 * @param {string} props.siteName - Site name
 * @param {string[]} props.tags - Array of relevant keywords/tags
 */
const OpenGraph = ({
  title = "AI Data Foundation | AI Tools, Research & Resources",
  description = "A comprehensive resource for AI tools, frameworks, datasets, and methodologies. Explore the latest in machine learning, natural language processing, computer vision, and more.",
  image = "https://aidatafoundation.github.io/og-image.png",
  type = "website",
  url,
  siteName = "AI Data Foundation",
  tags = []
}) => {
  // Format tags as a comma-separated string
  const keywordsString = tags.join(', ');
  
  // Ensure URL is absolute
  const currentUrl = url || window.location.href;
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {keywordsString && <meta name="keywords" content={keywordsString} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      {siteName && <meta property="og:site_name" content={siteName} />}
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
    </Helmet>
  );
};

export default OpenGraph; 