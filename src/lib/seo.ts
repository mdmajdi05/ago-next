import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

/** Absolute URL for any internal path or already-absolute URL. */
export function absoluteUrl(path: string): string {
  if (!path) return siteConfig.url;
  if (/^https?:\/\//i.test(path)) return path;
  return `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`;
}

export interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
  robots?: Metadata['robots'];
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  noIndex?: boolean;
}

/**
 * One consistent metadata builder for every route. Guarantees a canonical URL,
 * English hreflang, large image previews, Open Graph and Twitter cards.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
  image,
  imageAlt,
  type = 'website',
  robots,
  publishedTime,
  modifiedTime,
  authors,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = image ? absoluteUrl(image) : siteConfig.ogImage;
  const alt = imageAlt || siteConfig.logoAlt;
  const ogTitle = title.includes(siteConfig.name)
    ? title
    : `${title} | ${siteConfig.name}`;

  const resolvedRobots: Metadata['robots'] =
    robots ??
    (noIndex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        });

  return {
    title,
    description,
    ...(keywords && keywords.length > 0 ? { keywords } : {}),
    alternates: {
      canonical: url,
      languages: { en: url },
    },
    robots: resolvedRobots,
    openGraph: {
      title: ogTitle,
      description,
      url,
      siteName: siteConfig.name,
      type,
      images: [{ url: imageUrl, width: 1200, height: 630, alt }],
      ...(type === 'article'
        ? {
            publishedTime,
            modifiedTime: modifiedTime || publishedTime,
            authors,
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
      images: [imageUrl],
      creator: siteConfig.socials.x.handle,
    },
  };
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  url: siteConfig.url,
  logo: {
    '@type': 'ImageObject',
    url: siteConfig.logo,
    caption: siteConfig.logoAlt,
  },
  image: siteConfig.ogImage,
  description: siteConfig.description,
  email: siteConfig.email.sales,
  telephone: siteConfig.phoneRaw,
  foundingLocation: {
    '@type': 'Place',
    name: siteConfig.address.city,
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.state,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.countryCode,
  },
  areaServed: {
    '@type': 'Place',
    name: 'Worldwide',
  },
  knowsAbout: [
    'Gas turbine spare parts',
    'Gas turbine hot gas path components',
    'Combustion liners and transition pieces',
    'Turbine blades, nozzles and shrouds',
    'Industrial automation and control systems',
    'Valves, actuators and instrumentation',
    'Electrical motors and power transmission',
    'Obsolescence and legacy part sourcing',
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: siteConfig.phoneRaw,
      contactType: 'sales',
      email: siteConfig.email.sales,
      areaServed: 'Worldwide',
      availableLanguage: ['English'],
    },
    {
      '@type': 'ContactPoint',
      telephone: siteConfig.phoneRaw,
      contactType: 'customer support',
      email: siteConfig.email.support,
      areaServed: 'Worldwide',
      availableLanguage: ['English'],
    },
  ],
  sameAs: Object.values(siteConfig.socials)
    .map((social) => social.url)
    .filter(Boolean),
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteConfig.url}/#website`,
  url: siteConfig.url,
  name: siteConfig.name,
  description: siteConfig.description,
  publisher: { '@id': `${siteConfig.url}/#organization` },
  inLanguage: 'en',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteConfig.url}/products?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function faqSchema(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export interface ProductSchemaInput {
  name: string;
  description: string;
  url: string;
  image: string;
  brand: string;
  sku: string;
  category: string;
  type: string;
  condition?: string;
  relatedUrls?: string[];
}

export function productSchema({
  name,
  description,
  url,
  image,
  brand,
  sku,
  category,
  type,
  condition = 'New or refurbished on request',
  relatedUrls = [],
}: ProductSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    image: absoluteUrl(image),
    description,
    url: absoluteUrl(url),
    sku,
    mpn: sku,
    category,
    brand: {
      '@type': 'Brand',
      name: brand,
    },
    manufacturer: {
      '@type': 'Organization',
      name: brand,
    },
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Part number', value: sku },
      { '@type': 'PropertyValue', name: 'Component type', value: type },
      { '@type': 'PropertyValue', name: 'Condition', value: condition },
      {
        '@type': 'PropertyValue',
        name: 'Availability',
        value: 'Available on request',
      },
    ],
    offers: {
      '@type': 'Offer',
      url: absoluteUrl(url),
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@id': `${siteConfig.url}/#organization` },
    },
    ...(relatedUrls.length > 0
      ? { isSimilarTo: relatedUrls.map((related) => absoluteUrl(related)) }
      : {}),
  };
}

export interface CollectionItem {
  name: string;
  url: string;
}

export function collectionPageSchema({
  name,
  description,
  path,
  items = [],
}: {
  name: string;
  description: string;
  path: string;
  items?: CollectionItem[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: { '@id': `${siteConfig.url}/#website` },
    about: { '@id': `${siteConfig.url}/#organization` },
    ...(items.length > 0
      ? {
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: items.length,
            itemListElement: items.map((item, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: item.name,
              url: absoluteUrl(item.url),
            })),
          },
        }
      : {}),
  };
}

export interface ArticleSchemaInput {
  headline: string;
  description: string;
  path: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author?: string;
  keywords?: string[];
}

export function articleSchema({
  headline,
  description,
  path,
  image,
  datePublished,
  dateModified,
  author = siteConfig.name,
  keywords = [],
}: ArticleSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline,
    description,
    image: [absoluteUrl(image)],
    url: absoluteUrl(path),
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(path) },
    datePublished,
    dateModified,
    author: {
      '@type': 'Organization',
      name: author,
      url: siteConfig.url,
    },
    publisher: { '@id': `${siteConfig.url}/#organization` },
    ...(keywords.length > 0 ? { keywords: keywords.join(', ') } : {}),
    inLanguage: 'en',
  };
}

export const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${siteConfig.url}/#service`,
  name: 'Gas Turbine and Industrial Spare Parts Sourcing',
  serviceType:
    'Gas turbine parts manufacturing, spare parts sourcing and obsolescence support',
  provider: { '@id': `${siteConfig.url}/#organization` },
  areaServed: {
    '@type': 'Place',
    name: 'Worldwide',
  },
  audience: {
    '@type': 'BusinessAudience',
    audienceType:
      'Power plants, oil and gas facilities, EPC contractors and industrial operators',
  },
  description:
    'AGO Aviation supplies and manufactures gas turbine, compressor, valve, automation, instrumentation, electrical and mechanical spare parts with part-number verification and worldwide delivery.',
};
