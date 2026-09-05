# Fashion Store — Frontend

A production-ready, scalable **Next.js frontend** for a fashion e-commerce application. Built on the App Router with a feature-based architecture, TypeScript, Tailwind CSS, shadcn/ui, Zustand, Axios, and Zod.

> This project is the frontend layer. It talks to a **separate NestJS backend** via REST — it **never** connects directly to PostgreSQL.

---

## ✨ Tech Stack

| Area        | Technology                                                                                              |
| ----------- | ------------------------------------------------------------------------------------------------------- |
| Framework   | [Next.js 16](https://nextjs.org) (App Router)                                                           |
| Language    | TypeScript (strict)                                                                                     |
| UI          | [Tailwind CSS](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) (Radix/Base UI primitives) |
| Icons       | [Lucide React](https://lucide.dev)                                                                      |
| State       | [Zustand](https://zustand-demo.pmnd.rs)                                                                 |
| HTTP        | [Axios](https://axios-http.com)                                                                         |
| Validation  | [Zod](https://zod.dev)                                                                                  |
| Forms       | React Hook Form + @hookform/resolvers                                                                   |
| Lint/Format | ESLint / Prettier                                                                                       |

---

## 📁 Folder Structure

```
frontend/
│
├── app/                      # App Router routes
│   ├── layout.tsx            # Root layout (fonts, metadata, providers)
│   ├── page.tsx              # Landing page
│   ├── globals.css           # Global / Tailwind styles
│   ├── loading.tsx           # Root loading state (skeletons)
│   ├── error.tsx             # Root error boundary
│   ├── not-found.tsx         # 404 page
│   ├── (public)/             # Public route group (shared Header/Footer)
│   ├── (auth)/               # Auth route group (login / register)
│   └── dashboard/            # Authenticated area (+ Sidebar layout)
│
├── components/
│   ├── ui/                   # shadcn/ui primitives
│   ├── common/               # App-specific reusable components
│   ├── layout/               # Header, Footer, Navbar, Sidebar
│   └── sections/             # Hero, Features, Testimonials, CTA
│
├── features/                 # Feature-based business logic
│   ├── auth/
│   ├── users/
│   ├── products/
│   └── orders/
│
├── lib/                      # Core libraries
│   ├── api.ts                # Centralized API layer
│   ├── axios.ts              # Configured Axios client + interceptors
│   ├── utils.ts              # cn() helper
│   └── constants.ts          # Shared constants
│
├── hooks/                    # Shared hooks (e.g. useAuth)
├── store/                    # Zustand global stores (auth, cart)
├── types/                    # Shared TypeScript types
├── config/                   # site / env configuration
├── public/                   # Static assets (images, icons, fonts)
│
├── .env.local                # Local env (git-ignored)
├── .env.example              # Env template
├── next.config.ts
├── tsconfig.json
├── eslint.config.mjs
├── prettier.config.js
├── components.json           # shadcn/ui config
└── package.json
```

> **Note:** There is intentionally **no `src/` folder**. All source directories live at the project root and `@/*` maps to the root.

---

## ⚙️ Environment Setup

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

- `NEXT_PUBLIC_API_URL` — base URL of the **NestJS backend API**.
- `.env.local` is git-ignored; only `.env.example` is committed.
- Only public values should use the `NEXT_PUBLIC_` prefix — never secrets.

---

## 🚀 Installation

Requires Node.js 20.9+.

```bash
npm install
```

## ▶️ Development

```bash
npm run dev
```

Visit `http://localhost:3000`.

## 🧹 Lint & Format

```bash
npm run lint        # ESLint
npm run format      # Prettier (write)
npm run format:check
```

## 🏗️ Build

```bash
npm run build
npm start           # serve production build
```

---

## 🔌 API Architecture

```
User
 │
 ▼
Next.js (this app)
 │  REST API (Axios → NEXT_PUBLIC_API_URL)
 ▼
NestJS
 │
 ▼
Prisma
 │
 ▼
PostgreSQL
```

- All requests go through `lib/axios.ts`, which attaches the bearer token and handles token refresh via interceptors.
- `lib/api.ts` wraps requests and normalizes errors.
- Components never hardcode API URLs — everything comes from `config/env.ts`.

---

## 🏛️ Architecture Overview

- **Server Components by default** — `"use client"` is used only where interactivity is required.
- **Feature-based folders** keep business logic (components/hooks/services/schemas) close to their domain.
- **Zustand** is used only for genuinely global client state (auth, cart).
- **Zod schemas** live near their feature (e.g. `features/auth/schemas`).
- **shadcn/ui** components are located in `components/ui/` and reused across the app.
- Proper **loading states**, **error boundaries**, **empty states**, and **responsive** layouts are included.
- Full **SEO metadata** (title, description, Open Graph, Twitter) is set via Next.js metadata API in `app/layout.tsx`.

---

## 🔒 Security

- No backend/database credentials are ever exposed in `NEXT_PUBLIC_*`.
- Secrets stay in server-side config / the backend.
- Tokens are managed via the Axios interceptor in `lib/axios.ts`.
