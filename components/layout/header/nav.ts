import type { CategorySlug } from "@/features/shop/categories";
import {
  Baby,
  Shirt,
  User,
  Watch,
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
    slug: "women",
    href: "/products/women",
    icon: Shirt,
    gradient: "from-pink-500 to-rose-500",
    descKey: "megaMenu.desc.women",
    groups: [
      {
        labelKey: "megaMenu.groups.women.kurtis",
        links: [
          { labelKey: "megaMenu.links.floralCottonKurti", href: "/products/women/floral-cotton-kurti" },
          { labelKey: "megaMenu.links.salwarKameez", href: "/products/women/designer-salwar-kameez" },
          { labelKey: "megaMenu.links.printedLawnKurti", href: "/products/women/printed-lawn-kurti" },
          { labelKey: "megaMenu.links.chiffonPartyKurti", href: "/products/women/chiffon-party-kurti" },
        ],
      },
      {
        labelKey: "megaMenu.groups.women.sharees",
        links: [
          { labelKey: "megaMenu.links.muslinSharee", href: "/products/women/party-wear-muslin-sharee" },
          { labelKey: "megaMenu.links.silkOrganzaSharee", href: "/products/women/silk-organza-sharee" },
          { labelKey: "megaMenu.links.anarkaliGown", href: "/products/women/elegant-anarkali-gown" },
        ],
      },
      {
        labelKey: "megaMenu.groups.women.dresses",
        links: [
          { labelKey: "megaMenu.links.summerMaxiDress", href: "/products/women/summer-maxi-dress" },
          { labelKey: "megaMenu.links.tunicDress", href: "/products/women/tunic-dress" },
          { labelKey: "megaMenu.links.hijabCollection", href: "/products/women/premium-chiffon-hijab" },
        ],
      },
    ],
  },
  {
    slug: "men",
    href: "/products/men",
    icon: User,
    gradient: "from-secondary to-primary",
    descKey: "megaMenu.desc.men",
    groups: [
      {
        labelKey: "megaMenu.groups.men.panjabi",
        links: [
          { labelKey: "megaMenu.links.cottonPanjabi", href: "/products/men/classic-cotton-panjabi" },
          { labelKey: "megaMenu.links.jacquardPanjabi", href: "/products/men/jacquard-panjabi" },
        ],
      },
      {
        labelKey: "megaMenu.groups.men.shirts",
        links: [
          { labelKey: "megaMenu.links.poloShirt", href: "/products/men/premium-polo-shirt" },
          { labelKey: "megaMenu.links.cottonFatua", href: "/products/men/casual-cotton-fatua" },
          { labelKey: "megaMenu.links.denimJeans", href: "/products/men/slim-fit-denim-jeans" },
        ],
      },
      {
        labelKey: "megaMenu.groups.men.ethnic",
        links: [
          { labelKey: "megaMenu.links.waistcoatSet", href: "/products/men/heritage-waistcoat-set" },
          { labelKey: "megaMenu.links.cottonLungi", href: "/products/men/cotton-lungi" },
          { labelKey: "megaMenu.links.towelFabric", href: "/products/men/turkish-towel-fabric-sets" },
        ],
      },
    ],
  },
  {
    slug: "kids",
    href: "/products/kids",
    icon: Baby,
    gradient: "from-sky-500 to-cyan-500",
    descKey: "megaMenu.desc.kids",
    groups: [
      {
        labelKey: "megaMenu.groups.kids.kurta",
        links: [
          { labelKey: "megaMenu.links.kurtaPajama", href: "/products/kids/kids-kurta-pajama-set" },
          { labelKey: "megaMenu.links.festiveKurta", href: "/products/kids/kids-festive-kurta-set" },
        ],
      },
      {
        labelKey: "megaMenu.groups.kids.wear",
        links: [
          { labelKey: "megaMenu.links.printedTShirt", href: "/products/kids/kids-printed-t-shirt" },
          { labelKey: "megaMenu.links.denimJacket", href: "/products/kids/kids-denim-jacket" },
          { labelKey: "megaMenu.links.cottonPajama", href: "/products/kids/kids-cotton-pajama" },
        ],
      },
      {
        labelKey: "megaMenu.groups.kids.footwear",
        links: [
          { labelKey: "megaMenu.links.canvasSandals", href: "/products/kids/kids-canvas-sandals" },
        ],
      },
    ],
  },
  {
    slug: "accessories",
    href: "/products/accessories",
    icon: Watch,
    gradient: "from-amber-500 to-orange-500",
    descKey: "megaMenu.desc.accessories",
    groups: [
      {
        labelKey: "megaMenu.groups.accessories.bags",
        links: [
          { labelKey: "megaMenu.links.leatherBag", href: "/products/accessories/leather-messenger-bag" },
        ],
      },
      {
        labelKey: "megaMenu.groups.accessories.watches",
        links: [
          { labelKey: "megaMenu.links.analogWatch", href: "/products/accessories/analog-wrist-watch" },
        ],
      },
      {
        labelKey: "megaMenu.groups.accessories.eyewear",
        links: [
          { labelKey: "megaMenu.links.aviatorSunglasses", href: "/products/accessories/aviator-sunglasses" },
        ],
      },
      {
        labelKey: "megaMenu.groups.accessories.personal",
        links: [
          { labelKey: "megaMenu.links.silkScarf", href: "/products/accessories/silk-scarf" },
          { labelKey: "megaMenu.links.leatherBelt", href: "/products/accessories/leather-belt" },
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
