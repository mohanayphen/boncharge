# BON CHARGE - Promotional Landing Page

A high-performance, fully responsive promotional landing page for BON CHARGE, featuring science-backed wellness products including blue light glasses, red light therapy devices, and curated wellness bundles.

## 🚀 Features

- **Product Gift Guide** - Filterable grid of wellness products with advanced filtering by category, price, and persona
- **Bundle Carousel** - Curated product bundles with significant savings
- **Shopping Cart** - Persistent cart with drawer UI and free shipping progress indicator
- **Responsive Design** - Mobile-first approach with breakpoints for all devices
- **Animations** - Smooth micro-interactions with reduced motion support
- **SEO Optimized** - Full meta tags, Open Graph, and structured data
- **Accessibility** - WCAG 2.2 AA compliant with keyboard navigation and screen reader support
- **Performance** - Optimized images with lazy loading and blur placeholders

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **State Management:** React Context API

## 📦 Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd boncharge
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗 Project Structure

```
/app
  page.tsx              # Main landing page
  layout.tsx           # Root layout with SEO metadata
  /api
    /products          # Products API endpoint
    /bundles           # Bundles API endpoint
/components
  Hero.tsx             # Hero section with CTAs
  GiftGrid.tsx         # Product grid with filtering
  ProductCard.tsx      # Individual product card
  BundleCarousel.tsx   # Bundle showcase carousel
  BundleCard.tsx       # Bundle card component
  Filters.tsx          # Product filtering controls
  StickyCart.tsx       # Floating cart drawer
  FAQ.tsx              # Accordion FAQ section
  Footer.tsx           # Site footer with newsletter
/lib
  products.ts          # Product data and utilities
  bundles.ts           # Bundle data and utilities
  cart-context.tsx     # Cart state management
  utils.ts             # Utility functions
```

## 📝 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript type checking
```

## 🎨 Customization

### Adding Products

Edit `/lib/products.ts` to add new products:

```typescript
export const products: Product[] = [
  {
    id: "product-id",
    title: "Product Name",
    category: "Sleep",
    price: 99,
    // ... other fields
  }
];
```

### Creating Bundles

Edit `/lib/bundles.ts` to create new bundles:

```typescript
export const bundles: Bundle[] = [
  {
    id: "bundle-id",
    title: "Bundle Name",
    items: ["product-id-1", "product-id-2"],
    price: 199,
    compareAtPrice: 299,
    // ... other fields
  }
];
```

### Modifying Colors

The color scheme uses Tailwind CSS classes. Main colors:
- Primary: `teal-600` / `teal-700`
- Secondary: `amber-500`
- Accent: `blue-600`

Update these in component files or extend in `tailwind.config.js`.

## 🧪 Testing

### Performance Testing

Run Lighthouse audit:
1. Build the production version: `npm run build`
2. Start the production server: `npm run start`
3. Open Chrome DevTools > Lighthouse
4. Run audit

Target scores:
- Performance: ≥90
- Accessibility: ≥95
- SEO: ≥95

### Device Testing

Test on these viewports:
- Mobile: iPhone 13/SE (375px)
- Tablet: iPad (768px)
- Desktop: 1440px

## 📊 API Endpoints

### GET /api/products

Query parameters:
- `category`: Filter by product category
- `tag`: Filter by product tag
- `sort`: Sort order (featured, price-asc, price-desc, rating, bestsellers)
- `maxPrice`: Maximum price filter

### GET /api/bundles

Query parameters:
- `tag`: Filter by bundle tag
- `featured`: Show only featured bundles (true/false)

## 🔧 Environment Variables

No environment variables are required for basic functionality. For production deployment:

```env
NEXT_PUBLIC_SITE_URL=https://boncharge.com
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Deploy with default settings

### Self-hosted

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm run start
```

## 📄 License

This project is proprietary to BON CHARGE.

## 🤝 Support

For support, email support@boncharge.com or call 1-800-BONCHARGE.

---

Built with ❤️ for BON CHARGE