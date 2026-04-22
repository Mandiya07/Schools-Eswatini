
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Institution } from '../../types';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'school';
  institution?: Institution;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords = [], 
  image, 
  url, 
  type = 'website',
  institution 
}) => {
  const siteName = 'Schools Eswatini';
  const fullTitle = `${title} | ${siteName}`;
  const defaultImage = 'https://schools.sz/og-image.jpg'; // Placeholder
  const currentUrl = url || window.location.href;

  // Structured Data (JSON-LD) for Schools
  const schemaMarkup = institution ? {
    "@context": "https://schema.org",
    "@type": "School",
    "name": institution.name,
    "description": institution.seo.description,
    "url": `https://${institution.slug}.schools.sz`,
    "logo": institution.logo,
    "image": institution.coverImage,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": institution.contact.address,
      "addressLocality": institution.region,
      "addressCountry": "SZ"
    },
    "telephone": institution.contact.phone,
    "email": institution.contact.email,
    "sameAs": [
      institution.contact.facebook,
      institution.contact.twitter,
      institution.contact.linkedin
    ].filter(Boolean)
  } : null;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image || defaultImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image || defaultImage} />

      {/* Structured Data */}
      {schemaMarkup && (
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
