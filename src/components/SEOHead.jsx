'use client'

import Head from 'next/head'
import { getCanonicalUrl, getBaseUrl } from '@/lib/seo-utils'
import { usePathname } from 'next/navigation'

/**
 * @deprecated Use DynamicSEO for App Router or PagesSEO for Pages Router instead
 * This component is maintained for backward compatibility
 */
export default function SEOHead({ 
  title, 
  description, 
  canonical, 
  ogImage,
  noindex = false,
  keywords 
}) {
  const pathname = usePathname()
  
  // Use dynamic canonical URL if none provided
  let fullCanonical
  if (canonical?.startsWith('http')) {
    fullCanonical = canonical
  } else if (canonical) {
    fullCanonical = getCanonicalUrl(canonical)
  } else {
    // Use current pathname for dynamic canonical
    fullCanonical = getCanonicalUrl(pathname)
  }
  
  const baseUrl = getBaseUrl()
  const fullTitle = title ? `${title} | TVS Event Center` : 'TVS Event Center - Celebrate Life\'s Best Moments'
  const fullDescription = description || 'TVS Event Center is a luxurious event venue perfect for weddings, corporate events, birthdays, and celebrations. Located in Rosharon, TX with state-of-the-art facilities.'

  // Development warning about deprecated usage
  if (process.env.NODE_ENV === 'development') {
    console.warn('⚠️ SEOHead is deprecated. Use DynamicSEO for App Router or PagesSEO for Pages Router')
    console.log('SEOHead - Dynamic Canonical URL:', fullCanonical, 'for path:', pathname)
  }

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonical} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="TVS Event Center" />
      <meta property="og:locale" content="en_US" />
      {ogImage && (
        <>
          <meta property="og:image" content={ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content={fullTitle} />
        </>
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:creator" content="@tvseventcenter" />
      {ogImage && <meta name="twitter:image" content={ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`} />}
      
      {/* Robots */}
      <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
      <meta name="googlebot" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
    </Head>
  )
}