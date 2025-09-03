# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BON CHARGE promotional landing page - a science-backed wellness brand specializing in blue light glasses, red light therapy, sleep products, EMF shielding, and wellness technology. Currently in pre-development phase with comprehensive specifications.

## Technology Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS + CSS variables (utility-first approach)
- **UI Components**: shadcn/ui primitives, Lucide React icons
- **State Management**: Lightweight (useState/useReducer)
- **Images**: Next/Image with responsive loading, LQIP blurDataURL
- **Animations**: Framer Motion (sparingly, with reduced-motion support)

## Development Commands

```bash
# Initial setup (when starting implementation)
npx create-next-app@latest boncharge --typescript --tailwind --app --eslint
cd boncharge
npm install lucide-react framer-motion

# Development
npm run dev        # Start development server on localhost:3000
npm run build      # Production build
npm run start      # Start production server
npm run lint       # Run ESLint
npm run typecheck  # TypeScript type checking
```

## Project Structure

```
/app
  page.tsx                    # Main landing page
  /api/products/route.ts      # Products API endpoint
  /api/bundles/route.ts       # Bundles API endpoint
/components
  GiftGrid.tsx               # Product grid with filtering
  ProductCard.tsx            # Individual product display
  BundleCarousel.tsx         # Bundle showcase carousel
  BundleCard.tsx             # Bundle item display
  Filters.tsx                # Category/price filters
  Hero.tsx                   # Landing hero section
  StickyCart.tsx             # Floating cart drawer
  FAQ.tsx                    # Accordion FAQ section
  Footer.tsx                 # Site footer
/lib
  products.ts                # Product data model & seeds
  bundles.ts                 # Bundle data model & seeds
  utils.ts                   # Utility functions
```

## Key Implementation Requirements

### Performance Targets
- Lighthouse scores: Performance ≥90, Accessibility ≥95, SEO ≥95
- Responsive images with proper sizing per breakpoint
- Lazy loading with LQIP placeholders
- No layout shift on image load

### Accessibility (WCAG 2.2 AA)
- Semantic HTML with proper landmarks
- Focus management and visible focus rings
- Keyboard navigation support
- Screen reader announcements for cart updates
- prefers-reduced-motion support

### Data Models

```typescript
// Product structure
type Product = {
  id: string;
  title: string;
  subtitle?: string;
  category: "Sleep" | "Recovery" | "Beauty" | "Lighting" | "EMF" | "Glasses";
  tags: string[];
  price: number;
  compareAtPrice?: number;
  rating?: number;
  reviewsCount?: number;
  image: string;
  badge?: "Save" | "Bestseller" | "New" | "Staff Pick";
  shortBenefit: string;
};

// Bundle structure
type Bundle = {
  id: string;
  title: string;
  description: string;
  items: string[];  // product ids
  price: number;
  compareAtPrice: number;
  savingsLabel?: string;
  image: string;
  tags: string[];
};
```

### Core Features

1. **Gift Guide Grid**
   - 8-16 products with responsive layout
   - Filtering by category, tags, price, persona (Him/Her/Kids)
   - Sorting by featured, price, bestsellers
   - Quick add to cart with animations

2. **Bundle Carousel**
   - 4-8 curated bundles with savings display
   - Draggable/swipeable with keyboard support
   - Bundle customization in modal

3. **Sticky Cart Drawer**
   - Floating bottom-right button
   - Item management with quantity controls
   - Free shipping progress indicator
   - Real-time savings calculations

4. **Interactions**
   - Add to cart "fly" animation
   - Toast notifications
   - Scroll-based reveals (10-20% viewport)
   - Hover states with gentle scale/shadow

### SEO & Analytics
- Open Graph + Twitter meta tags
- JSON-LD Product and Offer schema
- Data attributes for A/B testing (e.g., `data-cta="bundle-primary"`)
- Semantic heading hierarchy

## Testing Checklist

Before marking any feature complete:
- Mobile responsiveness (iPhone 13/SE, Pixel 7, iPad)
- Desktop breakpoints (1440px primary)
- Keyboard navigation through all interactive elements
- Screen reader compatibility
- Bundle math accuracy (compareAt = sum of items)
- Modal focus trapping with ESC to close
- Cart animations and state updates
- Filter/sort functionality
- Lighthouse performance metrics

## Brand Guidelines

- **Tone**: Scientific, helpful, confident (not hype)
- **Visual**: Quiet luxury wellness aesthetic
- **Colors**: Neutral dark text, off-white backgrounds, wellness accents (deep teal/amber)
- **Typography**: Modern geometric sans for headings, high-readability sans for body
- **Motion**: 150-250ms micro-interactions, respect prefers-reduced-motion

## Product Categories

- Blue Light Glasses (blocks 400-550nm)
- Red Light Therapy devices
- Sleep products (masks, blue-free lighting)
- EMF Shielding accessories
- Sauna Blanket & Dome
- PEMF Mats
- Full Spectrum Lighting

## Development Notes

- Use in-memory seed data initially (can swap to CMS later)
- Keep components modular and documented with JSDoc
- Apply data attributes for analytics tracking
- Implement proper error states and loading indicators
- Ensure all images have descriptive alt text
- Validate form inputs with clear error messages