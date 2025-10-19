import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/logo-web.png" />
        <link rel="shortcut icon" href="/logo-web.png" />

        {/* Primary Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Sri Balaji Offset — expert in invitation, visiting card, and brochure printing. Located in Kilvelur, Tamil Nadu. High-quality printing with quick delivery." />
        <meta name="robots" content="index, follow" />
        <meta name="google-site-verification" content="-qyij4vJIZJRY52vM0rzARPwlZP3tMcEaiFDDa1f4Ao" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Sri Balaji Offset | Professional Offset Printing in Kilvelur" />
        <meta property="og:description" content="Expert in invitation, visiting card, and brochure printing. High-quality printing with quick delivery in Kilvelur, Tamil Nadu." />
        <meta property="og:url" content="https://sribalajioffsetkvl.vercel.app/" />
        <meta property="og:image" content="https://sribalajioffsetkvl.vercel.app/google-icon-image.jpg" /> {/* Optimized for search/social */}

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sri Balaji Offset | Professional Offset Printing in Kilvelur" />
        <meta name="twitter:description" content="Expert in invitation, visiting card, and brochure printing. High-quality printing with quick delivery in Kilvelur, Tamil Nadu." />
        <meta name="twitter:image" content="https://sribalajioffsetkvl.vercel.app/google-icon-image.jpg" />

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Poppins:wght@400;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Stylesheet */}
        <link rel="stylesheet" href="/styles.css" />

        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Sri Balaji Offset",
              "url": "https://sribalajioffsetkvl.vercel.app/",
              "logo": "https://sribalajioffsetkvl.vercel.app/logo-web.png",
              "image": "https://sribalajioffsetkvl.vercel.app/google-icon-image.jpg", // Optimized image
              "description": "Sri Balaji Offset — expert in invitation, visiting card, and brochure printing. Located in Kilvelur, Tamil Nadu. High-quality printing with quick delivery.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "No 16, Main Road",
                "addressLocality": "Kilvelur",
                "addressRegion": "Tamil Nadu",
                "addressCountry": "India"
              },
              "telephone": "+919442846115",
              "sameAs": [
                "https://www.facebook.com/sribalajioffsetkvl",
                "https://www.instagram.com/sribalajioffsetkvl",
                "https://www.linkedin.com/company/sribalajioffsetkvl"
              ]
            })
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
