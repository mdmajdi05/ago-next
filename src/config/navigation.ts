export interface NavItem {
  title: string;
  href: string;
  description?: string;
  badge?: string;
  external?: boolean;
  children?: NavItem[];
}

export interface FooterSection {
  title: string;
  items: NavItem[];
}

export interface NavigationConfig {
  mainNav: NavItem[];
  footerNav: {
    quickLinks: FooterSection;
    categories: FooterSection;
    brands: FooterSection;
    legal: FooterSection;
  };
  topBarNav: {
    email: string;
    phone: string;
  };
}

export const navigationConfig: NavigationConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Products",
      href: "/products",
      description: "Browse comprehensive inventory of gas turbine spare parts",
    },
    {
      title: "Brands",
      href: "/brands",
      description: "OEM and aftermarket turbine brands supported worldwide",
    },
    {
      title: "Turbine Parts",
      href: "/categories/turbine-parts",
      description: "Shrouds, blades, nozzles, combustion components & hot section parts",
    },
    {
      title: "Services",
      href: "/services",
      description: "Manufacturing, sourcing, inspection and precision supply services",
    },
    {
      title: "Insights",
      href: "/blog",
      description: "Technical articles, turbine maintenance guides and industry news",
    },
    {
      title: "Contact",
      href: "/contact",
      description: "Request a quote or speak with our engineering desk",
    },
  ],

  footerNav: {
    quickLinks: {
      title: "Quick Links",
      items: [
        { title: "Home", href: "/" },
        { title: "About Us", href: "/about" },
        { title: "Products Catalog", href: "/products" },
        { title: "Supported Brands", href: "/brands" },
        { title: "Services", href: "/services" },
        { title: "Insights & Blog", href: "/blog" },
        { title: "Contact Us", href: "/contact" },
      ],
    },
    categories: {
      title: "Categories",
      items: [
        { title: "Turbine Parts", href: "/categories/turbine-parts" },
        { title: "Compressors & Pumps", href: "/categories/compressor-parts" },
        { title: "Valves & Actuators", href: "/categories/valves-actuators" },
        { title: "Automation & Controls", href: "/categories/automation-controls" },
        { title: "Instrumentation", href: "/categories/instrumentation" },
        { title: "Electrical & Motors", href: "/categories/electrical-motors" },
        { title: "Mechanical Transmission", href: "/categories/mechanical-transmission-bearings" },
        { title: "Seals & Filters", href: "/categories/seals-filters" },
      ],
    },
    brands: {
      title: "Key Brands",
      items: [
        { title: "General Electric (GE)", href: "/brands/ge" },
        { title: "Siemens", href: "/brands/siemens" },
        { title: "Atlas Copco", href: "/brands/atlas-copco" },
        { title: "Bently Nevada", href: "/brands/bently-nevada" },
        { title: "Woodward", href: "/brands/woodward" },
        { title: "ABB", href: "/brands/abb" },
        { title: "Honeywell", href: "/brands/honeywell" },
        { title: "Swagelok", href: "/brands/swagelok" },
      ],
    },
    legal: {
      title: "Legal & Information",
      items: [
        { title: "Privacy Policy", href: "/privacy" },
        { title: "Terms & Conditions", href: "/terms" },
        { title: "Disclaimer Policy", href: "/disclaimer" },
        { title: "Sitemap", href: "/sitemap.xml" },
      ],
    },
  },

  topBarNav: {
    email: "sale@agoaviation.com",
    phone: "+91 7011123269",
  },
};
