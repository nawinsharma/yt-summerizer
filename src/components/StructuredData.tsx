'use client';

interface StructuredDataProps {
  type: 'website' | 'webapplication' | 'organization';
  data?: Record<string, unknown>;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const baseUrl = 'https://sumtube.nawin.xyz';
  
  const getStructuredData = (): Record<string, unknown> => {
    switch (type) {
      case 'website':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "SumTube",
          "description": "AI-powered YouTube video summarizer that extracts key insights and saves time",
          "url": baseUrl,
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `${baseUrl}/summarize?url={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          },
          "sameAs": [
            "https://x.com/nawinscript",
            "https://github.com/nawinsharma"
          ]
        };
        
      case 'webapplication':
        return {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "SumTube",
          "description": "AI-powered YouTube video summarizer",
          "url": baseUrl,
          "applicationCategory": "ProductivityApplication",
          "operatingSystem": "Web Browser",
          "browserRequirements": "Requires JavaScript. Requires HTML5.",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "featureList": [
            "YouTube video summarization",
            "AI-powered content analysis",
            "Key points extraction",
            "Instant video insights",
            "Transcript processing"
          ],
          "screenshot": `${baseUrl}/og-image.png`,
          "softwareVersion": "1.0.0",
          "author": {
            "@type": "Organization",
            "name": "SumTube Team"
          }
        };
        
      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "SumTube",
          "description": "AI-powered YouTube video summarizer",
          "url": baseUrl,
          "logo": `${baseUrl}/favicon.svg`,
          "sameAs": [
            "https://x.com/nawinscript",
            "https://github.com/nawinsharma"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "email": "support@sumtube.nawin.xyz"
          }
        };
        
      default:
        return {};
    }
  };

  const structuredData = data || getStructuredData();

  if (!structuredData || Object.keys(structuredData).length === 0) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  );
} 