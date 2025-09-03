# Prompt: BON CHARGE Promotional Landing Page (Gift Guide + Bundles)

You are a senior front-end engineer and UX/UI designer. Build a **production-ready**, **fully responsive**, **high-performance** promotional landing page for **BON CHARGE** (science-backed wellness brand: blue light glasses, red light therapy, sleep, EMF, sauna blankets, PEMF, lighting). The page must feel **sleek, modern, and premium**, optimized for conversions, and delightful enough that visitors want to return often.

> Brand context to reflect (tone & taxonomy): Science-backed wellness; categories include **Blue Light Glasses**, **Red Light Therapy**, **Sleep (masks, blue-free lighting)**, **EMF Shielding**, **Sauna Blanket & Dome**, **PEMF Mats**, **Lighting**. Use clean, confident copy and calm wellness aesthetics. citeturn0search2turn0search1turn0search6

---

## Tech & Project Setup

- **Framework:** Next.js 14 (App Router) + TypeScript  
- **Styling:** Tailwind CSS + CSS variables; prefer utility-first, minimal custom CSS  
- **UI Kit:** shadcn/ui for primitives; lucide-react for icons  
- **State:** Lightweight (useState/useReducer); no heavy global store needed  
- **Images:** Next/Image; responsive, lazy-loaded; LQIP blurDataURL  
- **Analytics Hooks:** data-attributes for A/B tests and click tracking (e.g., `data-cta="bundle-primary"`)  
- **Accessibility:** WCAG 2.2 AA; semantic HTML; focus states; reduced-motion support  

Deliver as a runnable Next.js project with clear file structure and seed data.

```
/app
  /page.tsx
  /api/products/route.ts
  /api/bundles/route.ts
/components
  GiftGrid.tsx
  ProductCard.tsx
  BundleCarousel.tsx
  BundleCard.tsx
  Filters.tsx
  Hero.tsx
  StickyCart.tsx
  FAQ.tsx
  Footer.tsx
/lib
  products.ts
  bundles.ts
  utils.ts
/public
  /images/... (placeholders)
```

---

## Page Structure & Behaviors

### 1) Hero (above the fold)
- Headline: “Science-Backed Gifts for Better Sleep & Recovery”
- Subheadline: short benefit statement (sleep, recovery, circadian-friendly lighting).
- Primary CTA: “Shop Gift Guide”, Secondary CTA: “View Bundles”
- Visual: subtle parallax or depth motion; supports **prefers-reduced-motion**.
- Option: background gradient + floating, low-opacity product silhouettes.
- Microcopy area for limited-time deal (e.g., “Save up to 25% on curated bundles”).

### 2) Gift Guide (core grid)
- **Responsive grid** of 8–16 products.
- Card includes image, name, 1-line benefit, price, quick actions:
  - “Add to Cart” (fires animation + toast)
  - “Learn More” (opens side panel with details and cross-sells)
- **Hover/tap affordances:** gentle scale, soft shadow, image swap on hover.
- **Filters/Toggles:** “Sleep”, “Recovery”, “Beauty”, price caps (“Under $100”), “For Him / For Her / For Kids”.
- **Sorting:** Featured, Price Low→High, Bestsellers.
- **Badges:** “Save 20%”, “Bestseller”, “Staff Pick”.

### 3) Bundles (value-focused)
- **Carousel** (drag + arrows + dots) with 4–8 curated bundles.
- Each **BundleCard**: cover image, contents preview (chips), original vs discounted price, **clear savings** label, CTA “Add Bundle”.
- On click “View Details”: modal with:
  - Items list with thumbnails
  - Value math (MSRP total vs bundle price)
  - Benefits grouped (sleep, recovery, EMF, beauty)
  - “Add Bundle” + “Customize” (toggle swap items of same category)

### 4) Social Proof & Education (trust)
- Compact **Review ribbon** (stars + count) and **“Why it works”** explainer blocks (short, scannable).
- Optional **mini-FAQ** accordion (shipping, returns, warranties).

### 5) Sticky Cart / Drawer
- Floating cart button bottom-right (hide on checkout).
- Drawer shows items, quantity controls, applied savings, progress bar (“$X to free shipping”) and primary CTA “Checkout”.

### 6) Footer
- Quick links (Shop, Contact, Privacy, Returns)
- Newsletter subscribe (with success/error states)
- Social icons

---

## Visual & Motion Direction

- **Look:** Quiet luxury wellness—ample whitespace, soft shadows, rounded-xl corners, subtle glassmorphism accents.
- **Palette:** Neutral dark text, off-white backgrounds, wellness accent (deep teal/blue-green or warm amber). Maintain AA contrast.
- **Typography:** Modern geometric sans for headings; high-readability sans for body; tight control of leading/tracking.
- **Motion:** Micro-interactions at 150–250ms; reduce on `prefers-reduced-motion`. Use `framer-motion` sparingly.

---

## SEO & Performance

- Semantic landmarks, descriptive `alt`, logical heading hierarchy.
- Open Graph + Twitter meta, JSON-LD **Product** and **Offer** schema for product and bundle cards.
- Preload hero image; responsive image sizes per breakpoint.
- Lighthouse targets: **Perf ≥ 90, Acc ≥ 95, SEO ≥ 95**.

---

## Data Model (seeded, file + API)

Create **in-memory seed** and simple API routes to simulate CMS data. Keep fields aligned to BON CHARGE categories and value props.

```ts
// /lib/products.ts
export type Product = {
  id: string;
  title: string;
  subtitle?: string;        // e.g., "Optimized Sleep"
  category: "Sleep" | "Recovery" | "Beauty" | "Lighting" | "EMF" | "Glasses";
  tags: string[];           // e.g., ["Blue Light", "Night Time"]
  price: number;            // current price
  compareAtPrice?: number;  // to show savings
  rating?: number;          // 0-5
  reviewsCount?: number;
  image: string;            // /public/images/...
  badge?: "Save" | "Bestseller" | "New" | "Staff Pick";
  shortBenefit: string;     // one-liner conversion copy
};

// /lib/bundles.ts
export type Bundle = {
  id: string;
  title: string;            // e.g., "New Mom Sleep Bundle"
  description: string;      // value proposition
  items: string[];          // product ids
  price: number;
  compareAtPrice: number;   // sum of MSRP
  savingsLabel?: string;    // "Save 25%"
  image: string;
  tags: string[];           // ["Sleep", "Gifting"]
};
```

Include representative seed items for:
- **Blue Light Blocking Glasses (Night)** with “blocks 100% of 400–550nm blue/green light” claim in copy block.  
- **Red Light Therapy** device, **Blackout Sleep Mask**, **Blue-free Lamp**, **Full Spectrum Bulb**, **EMF Shielding** accessory, **Sauna Blanket**, **PEMF Mat** (benefit blurbs consistent with brand categories).  
- At least one curated **“New Mom Sleep Bundle”** style example with visible savings.  

---

## Components (specs)

### `<ProductCard />`
- Props: `Product`, `onQuickAdd`, `onLearnMore`
- Shows image, title, shortBenefit, price (and compareAt), rating summary
- Badge chip (Save/Bestseller/New)
- Hover: image zoom, elevate shadow
- Buttons: “Add”, “Learn More”

### `<GiftGrid />`
- Props: `products: Product[]`
- Contains `<Filters />` with category, tags, price slider, personas (Him/Her/Kids)
- Sort dropdown
- Empty state with reset

### `<BundleCard />`
- Props: `bundle: Bundle`
- Displays savings math (compareAt vs price)
- Chips for 3–4 key items
- CTA: “Add Bundle”, “View Details”
- Details modal exposes item list, swap UI for compatible items

### `<BundleCarousel />`
- Keyboard accessible, draggable, snap alignment
- Auto-pause on hover; reduced motion friendly

### `<StickyCart />`
- Mini list with qty controls, subtotal, savings, free shipping progress, checkout CTA
- Announce updates for screen readers

### `<Hero />`, `<FAQ />`, `<Footer />`
- Keep copy succinct; ensure link focus states

---

## Interaction & Delight

- **Add to Cart animation:** product image “flies” to cart; toast confirms.
- **Dynamic savings meter** in bundle modal recalculates when swapping items.
- **“For Him/Her/Kids”** toggles change product recommendations (filter + animated resort).
- **Scroll-based reveals** (fade/slide at 10–20% viewport), disabled when `prefers-reduced-motion`.

---

## Content & Copy (placeholders ok)

- Maintain **scientific, helpful** tone. Short benefit statements, not hype.
- Examples:
  - “Block sleep-disrupting blue & green light (400–550nm) for deeper rest.”
  - “Circadian-friendly lighting to wind down naturally.”

---

## QA Checklist (must pass)

- Mobile first; test iPhone 13/SE, Pixel 7, iPad, desktop 1440px
- Keyboard navigable, visible focus rings
- No layout shift on image load (set width/height)
- Lighthouse thresholds met
- Bundle math accurate (compareAt = sum of items)
- All CTAs have `aria-label`s; modals trap focus; ESC closes

---

## Deliverables

1. Complete Next.js project with components, pages, seed data, and minimal API routes.  
2. Example screenshots (desktop + mobile) generated via Playwright or Storybook screenshots (optional).  
3. Clear **README**: install, run, build, how to edit seed data, how to create new bundles/gifts.

---

**Notes for Claude Code**
- Generate high-quality placeholder imagery and copy; keep components generic so content can be swapped from a CMS later.
- Keep code **clean, modular, documented** with JSDoc on component props.
- Avoid overengineering—prioritize UX polish, performance, and maintainability.

---
