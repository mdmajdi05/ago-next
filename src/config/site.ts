export const siteConfig = {
  name: "AGO Aviation",
  legalName: "WS Turbomar Private Limited",
  brandName: "AGO Aviation",
  tagline: "Gas Turbine Parts Manufacturer & Supplier Worldwide",
  description:
    "AGO Aviation manufactures and supplies precision gas turbine parts and spares for power plants, oil & gas facilities, EPC contractors, and industrial operators worldwide.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.agoaviation.com",
  ogImage: "https://www.agoaviation.com/images/engine-portfolio-banner.webp",
  logo: "https://www.agoaviation.com/images/LOGO.png",
  logoAlt: "AGO Aviation Gas Turbine Parts Logo",

  phone: "+91 7011123269",
  phoneRaw: "+917011123269",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917011123269",

  email: {
    sales: "sale@agoaviation.com",
    contact: "contactus@agoaviation.com",
    support: "support@agoaviation.com",
  },

  address: {
    street: "A-24/5, 3rd Floor, NH-19, Mohan Cooperative Industrial Estate",
    city: "New Delhi",
    state: "Delhi",
    postalCode: "110044",
    country: "India",
    countryCode: "IN",
    formatted:
      "A-24/5, 3rd Floor, NH-19, Mohan Cooperative Industrial Estate, New Delhi, Delhi 110044",
  },

  socials: {
    facebook: {
      name: "Facebook",
      url: "https://www.facebook.com/profile.php?id=61575802176032",
      handle: "agoaviation",
    },
    x: {
      name: "X (Twitter)",
      url: "https://x.com/agoaviation",
      handle: "@agoaviation",
    },
    linkedin: {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/agoaviation-pvtltd-15b997363/",
      handle: "agoaviation-pvtltd-15b997363",
    },
    instagram: {
      name: "Instagram",
      url: "https://www.instagram.com/agoaviation1/",
      handle: "@agoaviation1",
    },
    pinterest: {
      name: "Pinterest",
      url: "https://www.pinterest.com/agoaviation/",
      handle: "agoaviation",
    },
    whatsapp: {
      name: "WhatsApp",
      url: "https://wa.me/917011123269",
      handle: "+91 7011123269",
    },
  },

  analytics: {
    gaId: process.env.NEXT_PUBLIC_GA_ID || "G-78KJF6NWPV",
    gtmId: process.env.NEXT_PUBLIC_GTM_ID || "GTM-W7CKR2ZB",
    clarityId: process.env.NEXT_PUBLIC_CLARITY_ID || "zbusbk30cg",
  },

  // Bing Webmaster Tools site verification.
  bingVerification: "49F1D9786DD0EE7E989DEA3F617D7A53",

  businessHours: {
    days: "Monday - Saturday",
    hours: "09:00 AM - 06:00 PM IST",
  },

  keywords: [
    "gas turbine parts manufacturer and supplier",
    "gas turbine parts",
    "gas turbine spares",
    "turbine shrouds",
    "buckets and blades",
    "nozzles and vanes",
    "combustion components",
    "hot gas path parts",
    "gas turbine components",
    "Ago Aviation",
    "WS Turbomar Private Limited",
    "GE gas turbine parts",
    "Siemens turbine spares",
    "Solar Turbines parts",
    "Rolls-Royce turbine parts",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
