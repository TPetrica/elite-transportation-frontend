/* eslint-disable react/prop-types */

import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function MetaComponent({ meta }) {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
        
        {/* Keywords */}
        {meta?.keywords && <meta name="keywords" content={meta.keywords} />}
        
        {/* Robots */}
        {meta?.robots && <meta name="robots" content={meta.robots} />}
        
        {/* Canonical URL */}
        {meta?.canonical && <link rel="canonical" href={meta.canonical} />}
        
        {/* Open Graph Meta Tags */}
        {meta?.openGraph && (
          <>
            <meta property="og:title" content={meta.openGraph.title || meta.title} />
            <meta property="og:description" content={meta.openGraph.description || meta.description} />
            <meta property="og:type" content={meta.openGraph.type || "website"} />
            {meta.openGraph.url && <meta property="og:url" content={meta.openGraph.url} />}
            {meta.openGraph.images && meta.openGraph.images.map((image, index) => (
              <React.Fragment key={index}>
                <meta property="og:image" content={image.url} />
                {image.width && <meta property="og:image:width" content={image.width} />}
                {image.height && <meta property="og:image:height" content={image.height} />}
                {image.alt && <meta property="og:image:alt" content={image.alt} />}
              </React.Fragment>
            ))}
            {meta.openGraph.article && (
              <>
                {meta.openGraph.article.publishedTime && 
                  <meta property="article:published_time" content={meta.openGraph.article.publishedTime} />}
                {meta.openGraph.article.modifiedTime && 
                  <meta property="article:modified_time" content={meta.openGraph.article.modifiedTime} />}
                {meta.openGraph.article.author && 
                  <meta property="article:author" content={meta.openGraph.article.author} />}
              </>
            )}
          </>
        )}
        
        {/* Twitter Card Meta Tags */}
        {meta?.twitter && (
          <>
            <meta name="twitter:card" content={meta.twitter.card || "summary"} />
            <meta name="twitter:title" content={meta.twitter.title || meta.title} />
            <meta name="twitter:description" content={meta.twitter.description || meta.description} />
            {meta.twitter.images && meta.twitter.images.length > 0 && 
              <meta name="twitter:image" content={meta.twitter.images[0]} />}
          </>
        )}
        
        {/* Structured Data */}
        {meta?.structuredData && (
          <script type="application/ld+json">
            {JSON.stringify(meta.structuredData)}
          </script>
        )}
      </Helmet>
    </HelmetProvider>
  );
}