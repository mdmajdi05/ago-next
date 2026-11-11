import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Yantramanav } from 'next/font/google';

import { siteConfig } from '@/config/site';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { FloatBar } from '@/components/layout/floatBar';
import { WebVitalsMonitor } from '@/components/sections/web-vitals';
import { buildCatalogMenu } from '@/lib/catalog/menu';
import { organizationSchema, websiteSchema } from '@/lib/seo';

import '@/styles/globals.css';
import '@/styles/home-sections.css';

const catalogMenu = buildCatalogMenu();

const yantramanav = Yantramanav({
  subsets: ['latin'],
  variable: '--font-yantramanav',
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    template: '%s | AGO Aviation',
    default: 'AGO Aviation - Gas Turbine Parts Manufacturer & Supplier',
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords as unknown as string[],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,

  openGraph: {
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
  
    type: 'website',
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.logoAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.socials.x.handle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    other: {
      'msvalidate.01': siteConfig.bingVerification,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preload"
          href="/fonts/fa-solid-900.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="/fonts/fa-subset.css"
        />

        {/* Google Tag Manager */}
        <script
          id="gtm-head"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${siteConfig.analytics.gtmId}');`,
          }}
        />
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${siteConfig.analytics.gtmId}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
            aria-hidden="true"
          />
        </noscript>

        {/* Google Analytics (GA4) */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.analytics.gaId}`}
        />
        <script
          id="ga-init"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', '${siteConfig.analytics.gaId}', { page_path: window.location.pathname });`,
          }}
        />

        {/* Microsoft Clarity */}
        <script
          id="clarity-init"
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "${siteConfig.analytics.clarityId}");`,
          }}
        />
      </head>
      <body id="top" className={`${yantramanav.variable} font-sans home-page`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              organizationSchema,
              websiteSchema,
            ]).replace(/</g, '\\u003c'),
          }}
        />
        <Header catalogMenu={catalogMenu} />
        <div>{children}</div>
        <Footer />
        <FloatBar />
        <WebVitalsMonitor />
      </body>
    </html>
  );
}
