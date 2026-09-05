export const siteConfig: {
  name: string;
  description: string;
  url: string;
  keywords: string[];
  author: string;
  ogImage: string;
  links: { twitter: string; github: string };
} = {
  name: "Fashion Store",
  description:
    "A modern fashion e-commerce storefront built with Next.js, Tailwind CSS, and shadcn/ui.",
  url: "https://example.com",
  keywords: ["fashion", "clothing", "e-commerce", "store", "online shopping"],
  author: "Fashion Store",
  ogImage: "/images/og.png",
  links: {
    twitter: "https://twitter.com/example",
    github: "https://github.com/example",
  },
};

export type SiteConfig = typeof siteConfig;
