<div align="center">

<img src="public/images/unimart/logo/logo.webp" alt="Jewellery Store Logo" width="110" />

# ✨ Sha Jalal Jewellery Storefront ✨

_A premium, bilingual (EN/BN) e‑commerce frontend crafted with Next.js — where every pixel sparkles like a diamond._

<br/>

![Next.js](https://img.shields.io/badge/Next.js%2016-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![React](https://img.shields.io/badge/React%2019-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Zustand](https://img.shields.io/badge/Zustand-764ABC?style=for-the-badge&logo=zustand&logoColor=white)
![next-intl](https://img.shields.io/badge/next--intl-4.x-0288D1?style=for-the-badge)

</div>

---

```
╔══════════════════════════════════════════════════════════════════════╗
║    ✦   A stunning, fully-responsive jewellery store experience   ✦   ║
╚══════════════════════════════════════════════════════════════════════╝
```

## 💎 Features

| 🌟 Preview | 🛍️ Shopping | 🇧🇩 Localised |
| --- | --- | --- |
| Elegant hero with product banners | `Shop by Category` megamenu | English & বাংলা switching |
| Popular-By-Categories grid | Product quick-view & gallery | Locale-aware routes `(/en / /bn)` |
| Best Items, Discover & Promo sections | Wishlist ❤️ + Cart (Zustand) | Right-to-left friendly layout |
| Video showcase & blog preview | Premium 3-column checkout | Formatted prices & dates |
| Trust badges & newsletter | **bKash / Nagad / Rocket / Visa / Mastercard / COD** | Designed for the BD market |

## 🖼️ A Glimpse

<div align="center">

| | |
| --- | --- |
| <img src="public/images/unimart/product-banner/product-banner-jwellerry-a-1.webp" width="290" alt="Banner" /> | <img src="public/images/unimart/product-img/jwellery/jw-a-01.webp" width="290" alt="Ring" /> |
| <img src="public/images/unimart/product-img/jwellery/jw-a-07.webp" width="290" alt="Necklace" /> | <img src="public/images/unimart/product-img/jwellery/jw-a-11.webp" width="290" alt="Earrings" /> |

</div>

## 🧰 Tech Stack

| Area | Technology |
| --- | --- |
| Framework | **Next.js 16** (App Router, Server Components) |
| Language | TypeScript *(strict)* |
| Styling | Tailwind CSS + shadcn/ui (Base UI / Radix primitives) |
| Icons | Lucide React |
| i18n | next-intl (en + bn) |
| State | Zustand (cart, wishlist persistence) |
| Forms/Validation | React Hook Form + Zod 4 |
| HTTP | Axios |
| QR | qrcode.react (invoice receipts) |

## 📁 Structure

```
frontend/
├── app/
│   └── [locale]/
│       ├── (public)/              # Public shell (Header/Footer)
│       │   ├── shop/[category]    # Category listing
│       │   ├── shop/[category]/[slug]  # Product detail
│       │   ├── cart               # Shopping cart
│       │   └── checkout           # Address → Delivery → Payment
│       └── page.tsx               # Landing page
├── components/
│   ├── common/  ui/  layout/  sections/
│   ├── checkout/                  # OrderSummary, ThankYouView, InvoiceView…
│   ├── shop/                      # ProductCard, ProductGallery, ShopCatalog…
│   └── product-single/            # Premium product detail blocks
├── features/                      # shop, search, home, checkout logic
├── store/                         # Zustand stores (cart, wishlist)
├── messages/                      # en.json, bn.json
├── public/images/unimart/  payments/ …
└── [locale] root layout, next.config.ts, tsconfig.json
```

## 🚀 Quick Start

```bash
npm install
npm run dev        # → http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run lint` | ESLint |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run format` | Prettier (write) |

## 💳 Payments We Accept

| bKash | Nagad | Rocket | Visa | Mastercard | COD |
| --- | --- | --- | --- | --- | --- |
| <img src="public/images/payments/bkash.svg" width="64" alt="bKash" /> | <img src="public/images/payments/nagad.png" width="76" alt="Nagad" /> | <img src="public/images/payments/rocket.svg" width="64" alt="Rocket" /> | <img src="public/images/payments/visa.svg" width="56" alt="Visa" /> | <img src="public/images/payments/mastercard.svg" width="48" alt="Mastercard" /> | 💵 Cash on Delivery |

---

## 👑 Presented By

<div align="center">

```
 █████    ██   ██    █████                  ██    █████    ██         █████    ██
██   ██   ██   ██   ██   ██                 ██   ██   ██   ██        ██   ██   ██
██        ███████   ██   ██                 ██   ██   ██   ██        ██   ██   ██
 █████    ██   ██   ███████                 ██   ███████   ██        ███████   ██
     ██   ██   ██   ██   ██            ██   ██   ██   ██   ██        ██   ██   ██
██   ██   ██   ██   ██   ██            ██   ██   ██   ██   ██        ██   ██   ██
 █████    ██   ██   ██   ██             █████    ██   ██   ███████   ██   ██   ███████
```

**`✦ Design & Development By Shajalal ✦`**

_Crafted with 💛 & meticulous attention to detail_

</div>

<div align="center">

<br/>

**© 2026 · Sha Jalal Jewellery Storefront** · All rights reserved

</div>