import type { Metadata } from "next";
import { Cormorant_Garamond, Hind_Siliguri, Open_Sans } from "next/font/google";
import { siteConfig } from "@/config/site";
import "@/app/globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hindi",
  weight: ["400", "500", "600", "700"],
  subsets: ["bengali"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      className={`${openSans.variable} ${cormorantGaramond.variable} ${hindSiliguri.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
