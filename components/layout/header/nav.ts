import type { CategorySlug } from "@/features/shop/categories";
import {
  Asterisk,
  BellRing,
  CircleDashed,
  Crown,
  Diamond,
  Gem,
  Sparkles,
  Star,
  type LucideIcon,
} from "lucide-react";

export interface MegaMenuGroup {
  labelKey: string;
  links: { labelKey: string; href: string }[];
}

export interface MegaMenuCategory {
  slug: CategorySlug;
  href: string;
  icon: LucideIcon;
  gradient: string;
  descKey: string;
  groups: MegaMenuGroup[];
}

export const MEGA_MENU_CATEGORIES: MegaMenuCategory[] = [
  {
    slug: "necklace",
    href: "/shop/necklace",
    icon: Gem,
    gradient: "from-amber-400 to-yellow-600",
    descKey: "megaMenu.desc.necklace",
    groups: [
      {
        labelKey: "megaMenu.groups.necklace.gold",
        links: [
          { labelKey: "megaMenu.links.goldChainNecklace", href: "/shop/necklace/21k-gold-chain-necklace" },
          { labelKey: "megaMenu.links.goldCubicNecklace", href: "/shop/necklace/18k-gold-cubic-necklace" },
        ],
      },
      {
        labelKey: "megaMenu.groups.necklace.signature",
        links: [
          { labelKey: "megaMenu.links.layeredGoldNecklace", href: "/shop/necklace/layered-gold-necklace" },
          { labelKey: "megaMenu.links.pearlDiamondNecklace", href: "/shop/necklace/pearl-diamond-necklace" },
        ],
      },
    ],
  },
  {
    slug: "bracelet",
    href: "/shop/bracelet",
    icon: Crown,
    gradient: "from-orange-400 to-amber-600",
    descKey: "megaMenu.desc.bracelet",
    groups: [
      {
        labelKey: "megaMenu.groups.bracelet.bracelets",
        links: [
          { labelKey: "megaMenu.links.goldCubicBracelet", href: "/shop/bracelet/21k-gold-cubic-bracelet" },
          { labelKey: "megaMenu.links.goldBangle", href: "/shop/bracelet/18k-gold-bangle" },
          { labelKey: "megaMenu.links.goldChainBracelet", href: "/shop/bracelet/gold-chain-bracelet" },
        ],
      },
    ],
  },
  {
    slug: "ring",
    href: "/shop/ring",
    icon: Diamond,
    gradient: "from-yellow-500 to-orange-600",
    descKey: "megaMenu.desc.ring",
    groups: [
      {
        labelKey: "megaMenu.groups.ring.rings",
        links: [
          { labelKey: "megaMenu.links.zirconiaStatementRing", href: "/shop/ring/21k-zirconia-statement-ring" },
          { labelKey: "megaMenu.links.emeraldStatementRing", href: "/shop/ring/emerald-statement-ring" },
          { labelKey: "megaMenu.links.goldCoilRing", href: "/shop/ring/gold-coil-ring" },
        ],
      },
    ],
  },
  {
    slug: "earrings",
    href: "/shop/earrings",
    icon: Sparkles,
    gradient: "from-amber-500 to-rose-500",
    descKey: "megaMenu.desc.earrings",
    groups: [
      {
        labelKey: "megaMenu.groups.earrings.earrings",
        links: [
          { labelKey: "megaMenu.links.goldTeardropEarrings", href: "/shop/earrings/gold-teardrop-earrings" },
          { labelKey: "megaMenu.links.pearlStudEarrings", href: "/shop/earrings/pearl-stud-earrings" },
          { labelKey: "megaMenu.links.cubicZirconiaEarrings", href: "/shop/earrings/cubic-zirconia-earrings" },
        ],
      },
    ],
  },
  {
    slug: "pendant",
    href: "/shop/pendant",
    icon: Star,
    gradient: "from-yellow-600 to-amber-700",
    descKey: "megaMenu.desc.pendant",
    groups: [
      {
        labelKey: "megaMenu.groups.pendant.pendants",
        links: [
          { labelKey: "megaMenu.links.goldSunburstPendant", href: "/shop/pendant/gold-sunburst-pendant" },
          { labelKey: "megaMenu.links.goldDiamondPendant", href: "/shop/pendant/gold-diamond-pendant" },
        ],
      },
    ],
  },
  {
    slug: "bangle",
    href: "/shop/bangle",
    icon: CircleDashed,
    gradient: "from-amber-300 to-yellow-600",
    descKey: "megaMenu.desc.bangle",
    groups: [
      {
        labelKey: "megaMenu.groups.bangle.bangles",
        links: [
          { labelKey: "megaMenu.links.nakshiBangle", href: "/shop/bangle/22k-gold-nakshi-bangle" },
          { labelKey: "megaMenu.links.doubleBangleSet", href: "/shop/bangle/gold-double-bangle-set" },
        ],
      },
    ],
  },
  {
    slug: "nosepin",
    href: "/shop/nosepin",
    icon: Asterisk,
    gradient: "from-rose-400 to-pink-600",
    descKey: "megaMenu.desc.nosepin",
    groups: [
      {
        labelKey: "megaMenu.groups.nosepin.nosePins",
        links: [
          { labelKey: "megaMenu.links.pearlNosePin", href: "/shop/nosepin/gold-nose-pin-with-pearl" },
          { labelKey: "megaMenu.links.kundanNosePin", href: "/shop/nosepin/kundan-nose-pin" },
        ],
      },
    ],
  },
  {
    slug: "jhumka",
    href: "/shop/jhumka",
    icon: BellRing,
    gradient: "from-red-400 to-rose-600",
    descKey: "megaMenu.desc.jhumka",
    groups: [
      {
        labelKey: "megaMenu.groups.jhumka.jhumkas",
        links: [
          { labelKey: "megaMenu.links.goldJhumka", href: "/shop/jhumka/gold-jhumka-earrings" },
          { labelKey: "megaMenu.links.chandbaliJhumka", href: "/shop/jhumka/chandbali-jhumka" },
        ],
      },
    ],
  },
];

export const NORMAL_LINKS = [
  { key: "home", href: "/" },
  { key: "shop", href: "/shop" },
  { key: "about", href: "/about" },
  { key: "blog", href: "/blog" },
  { key: "gallery", href: "/gallery" },
  { key: "contact", href: "/contact" },
] as const;