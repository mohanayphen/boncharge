import { getProductById } from './products';

export type Bundle = {
  id: string;
  title: string;
  description: string;
  items: string[];
  price: number;
  compareAtPrice: number;
  savingsLabel?: string;
  image: string;
  tags: string[];
  featured?: boolean;
};

export const bundles: Bundle[] = [
  {
    id: "ultimate-sleep-bundle",
    title: "Ultimate Sleep Bundle",
    description: "Everything you need for the perfect night's sleep. Optimize your evening routine and wake up refreshed.",
    items: ["blue-light-glasses-night", "blackout-sleep-mask", "blue-free-lamp", "grounding-mat"],
    price: 199,
    compareAtPrice: 276,
    savingsLabel: "Save 28%",
    image: "/images/sleep-bundle.svg",
    tags: ["Sleep", "Bestseller", "Gift"],
    featured: true
  },
  {
    id: "new-mom-sleep-bundle",
    title: "New Mom Sleep Bundle",
    description: "Designed specifically for new mothers to maximize precious sleep time and recovery.",
    items: ["blackout-sleep-mask", "blue-light-glasses-night", "red-light-bulb"],
    price: 149,
    compareAtPrice: 207,
    savingsLabel: "Save 28%",
    image: "/images/new-mom-bundle.svg",
    tags: ["Sleep", "Recovery", "For Her", "Gift"]
  },
  {
    id: "biohacker-starter-kit",
    title: "Biohacker Starter Kit",
    description: "Essential tools for optimizing your health and performance through science-backed wellness technology.",
    items: ["red-light-therapy-panel", "pemf-mat", "blue-light-glasses-night", "grounding-mat"],
    price: 1199,
    compareAtPrice: 1576,
    savingsLabel: "Save 24%",
    image: "/images/biohacker-bundle.svg",
    tags: ["Recovery", "Performance", "For Him", "Premium"],
    featured: true
  },
  {
    id: "work-from-home-wellness",
    title: "Work From Home Wellness",
    description: "Protect your eyes and energy while working from home with our complete digital wellness solution.",
    items: ["blue-light-glasses-day", "full-spectrum-bulb", "grounding-mat", "red-light-bulb"],
    price: 189,
    compareAtPrice: 256,
    savingsLabel: "Save 26%",
    image: "/images/wfh-bundle.svg",
    tags: ["Productivity", "Wellness", "For Him", "For Her"]
  },
  {
    id: "recovery-pro-bundle",
    title: "Recovery Pro Bundle",
    description: "Professional-grade recovery tools used by athletes and wellness professionals worldwide.",
    items: ["infrared-sauna-blanket", "red-light-therapy-panel", "pemf-mat"],
    price: 1499,
    compareAtPrice: 2097,
    savingsLabel: "Save 29%",
    image: "/images/recovery-pro-bundle.svg",
    tags: ["Recovery", "Performance", "Premium", "For Him"],
    featured: true
  },
  {
    id: "emf-protection-essentials",
    title: "EMF Protection Essentials",
    description: "Complete electromagnetic protection for your home and family.",
    items: ["emf-shielding-blanket", "grounding-mat", "blue-light-glasses-night"],
    price: 299,
    compareAtPrice: 397,
    savingsLabel: "Save 25%",
    image: "/images/emf-bundle.svg",
    tags: ["EMF", "Protection", "Family", "For Kids"]
  },
  {
    id: "beauty-wellness-collection",
    title: "Beauty & Wellness Collection",
    description: "Science-backed tools for natural beauty and cellular rejuvenation.",
    items: ["red-light-therapy-panel", "infrared-sauna-blanket", "blackout-sleep-mask"],
    price: 749,
    compareAtPrice: 997,
    savingsLabel: "Save 25%",
    image: "/images/beauty-bundle.svg",
    tags: ["Beauty", "Recovery", "For Her", "Premium"]
  },
  {
    id: "travel-wellness-pack",
    title: "Travel Wellness Pack",
    description: "Stay optimized on the go with our portable wellness essentials.",
    items: ["travel-sleep-kit", "blue-light-glasses-day", "red-light-bulb"],
    price: 219,
    compareAtPrice: 297,
    savingsLabel: "Save 26%",
    image: "/images/travel-bundle.svg",
    tags: ["Travel", "Portable", "Sleep", "Gift"]
  }
];

export function getBundleById(id: string): Bundle | undefined {
  return bundles.find(b => b.id === id);
}

export function calculateBundleSavings(bundle: Bundle): number {
  return bundle.compareAtPrice - bundle.price;
}

export function getBundleProducts(bundle: Bundle) {
  return bundle.items.map(itemId => getProductById(itemId)).filter(Boolean);
}

export function getFeaturedBundles(): Bundle[] {
  return bundles.filter(b => b.featured);
}