export type Product = {
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
  description?: string;
  features?: string[];
};

export const products: Product[] = [
  {
    id: "blue-light-glasses-night",
    title: "Blue Light Blocking Glasses (Night)",
    subtitle: "Optimized Sleep",
    category: "Glasses",
    tags: ["Blue Light", "Night Time", "Sleep", "For Him", "For Her"],
    price: 89,
    compareAtPrice: 119,
    rating: 4.8,
    reviewsCount: 1247,
    image: "/images/blue-light-glasses-night.svg",
    badge: "Bestseller",
    shortBenefit: "Blocks 100% of 400-550nm blue/green light for deeper rest",
    description: "Our most powerful blue light blocking glasses designed specifically for evening use. Featuring our signature amber lenses that block 100% of blue and green light wavelengths.",
    features: [
      "100% blue light blocking (400-550nm)",
      "Reduces eye strain and headaches",
      "Improves melatonin production",
      "Lightweight and comfortable design"
    ]
  },
  {
    id: "red-light-therapy-panel",
    title: "Red Light Therapy Panel",
    subtitle: "Recovery & Wellness",
    category: "Recovery",
    tags: ["Red Light", "Recovery", "Beauty", "For Him", "For Her"],
    price: 299,
    compareAtPrice: 399,
    rating: 4.9,
    reviewsCount: 892,
    image: "/images/red-light-panel.svg",
    badge: "Save",
    shortBenefit: "Clinical-grade red and near-infrared light for cellular recovery",
    description: "Professional-grade red light therapy panel with medical-grade LEDs delivering optimal wavelengths for cellular health, muscle recovery, and skin rejuvenation.",
    features: [
      "660nm red + 850nm near-infrared wavelengths",
      "High irradiance for therapeutic benefits",
      "Timer function with auto shut-off",
      "Wall-mountable or standalone"
    ]
  },
  {
    id: "blackout-sleep-mask",
    title: "Blackout Sleep Mask",
    subtitle: "Deep Sleep",
    category: "Sleep",
    tags: ["Sleep", "Blackout", "Travel", "For Him", "For Her"],
    price: 39,
    compareAtPrice: 49,
    rating: 4.7,
    reviewsCount: 2156,
    image: "/images/sleep-mask.svg",
    badge: "Staff Pick",
    shortBenefit: "100% light blocking with zero eye pressure design",
    description: "Ultra-comfortable sleep mask with complete light blocking and zero eye pressure. Perfect for deep, restorative sleep at home or while traveling.",
    features: [
      "100% light blocking design",
      "Zero eye pressure construction",
      "Adjustable strap for all head sizes",
      "Breathable, hypoallergenic materials"
    ]
  },
  {
    id: "blue-free-lamp",
    title: "Blue-Free Evening Lamp",
    subtitle: "Circadian Lighting",
    category: "Lighting",
    tags: ["Lighting", "Sleep", "Circadian", "For Kids", "For Her"],
    price: 79,
    rating: 4.6,
    reviewsCount: 567,
    image: "/images/blue-free-lamp.svg",
    shortBenefit: "Circadian-friendly lighting to wind down naturally",
    description: "Specially designed lamp that emits warm, blue-free light perfect for evening use without disrupting your natural sleep-wake cycle.",
    features: [
      "Zero blue light emission",
      "Adjustable brightness settings",
      "Energy-efficient LED technology",
      "Modern, minimalist design"
    ]
  },
  {
    id: "full-spectrum-bulb",
    title: "Full Spectrum Light Bulb",
    subtitle: "Daytime Energy",
    category: "Lighting",
    tags: ["Lighting", "Energy", "Productivity", "For Him", "For Her"],
    price: 29,
    rating: 4.5,
    reviewsCount: 893,
    image: "/images/full-spectrum-bulb.svg",
    badge: "New",
    shortBenefit: "Natural daylight spectrum for energy and focus",
    description: "Mimics natural sunlight to boost energy, mood, and productivity during daytime hours. Perfect for home offices and living spaces.",
    features: [
      "5000K color temperature",
      "High CRI for true color rendering",
      "Energy-efficient design",
      "Standard E26 base fitting"
    ]
  },
  {
    id: "emf-shielding-blanket",
    title: "EMF Shielding Blanket",
    subtitle: "Protection & Comfort",
    category: "EMF",
    tags: ["EMF", "Protection", "Sleep", "For Him", "For Her", "For Kids"],
    price: 189,
    compareAtPrice: 249,
    rating: 4.8,
    reviewsCount: 432,
    image: "/images/emf-blanket.svg",
    badge: "Save",
    shortBenefit: "Silver-lined fabric blocks 99% of EMF radiation",
    description: "Premium EMF protection blanket with silver-lined fabric that blocks harmful electromagnetic frequencies while providing cozy comfort.",
    features: [
      "99% EMF radiation blocking",
      "Silver-lined organic cotton",
      "Machine washable",
      "Multiple size options available"
    ]
  },
  {
    id: "infrared-sauna-blanket",
    title: "Infrared Sauna Blanket",
    subtitle: "Detox & Recovery",
    category: "Recovery",
    tags: ["Sauna", "Recovery", "Detox", "Beauty", "For Him", "For Her"],
    price: 499,
    compareAtPrice: 699,
    rating: 4.9,
    reviewsCount: 678,
    image: "/images/sauna-blanket.svg",
    badge: "Bestseller",
    shortBenefit: "Far-infrared heat therapy for detox and muscle recovery",
    description: "Professional-grade infrared sauna blanket for at-home heat therapy sessions. Promotes detoxification, muscle recovery, and relaxation.",
    features: [
      "Far-infrared heat technology",
      "9 temperature settings",
      "Auto shut-off timer",
      "Waterproof and easy to clean"
    ]
  },
  {
    id: "pemf-mat",
    title: "PEMF Therapy Mat",
    subtitle: "Cellular Health",
    category: "Recovery",
    tags: ["PEMF", "Recovery", "Wellness", "For Him", "For Her"],
    price: 899,
    compareAtPrice: 1199,
    rating: 4.7,
    reviewsCount: 234,
    image: "/images/pemf-mat.svg",
    badge: "Save",
    shortBenefit: "Pulsed electromagnetic field therapy for cellular regeneration",
    description: "Advanced PEMF therapy mat that uses pulsed electromagnetic fields to support cellular health, reduce inflammation, and accelerate recovery.",
    features: [
      "Multiple frequency programs",
      "Adjustable intensity levels",
      "Full-body coverage",
      "FDA registered device"
    ]
  },
  {
    id: "blue-light-glasses-day",
    title: "Computer Glasses (Daytime)",
    subtitle: "Digital Eye Strain",
    category: "Glasses",
    tags: ["Blue Light", "Computer", "Productivity", "For Him", "For Her"],
    price: 69,
    rating: 4.6,
    reviewsCount: 1893,
    image: "/images/computer-glasses.svg",
    shortBenefit: "Reduces digital eye strain without color distortion",
    description: "Clear lens computer glasses that filter harmful blue light while maintaining color accuracy for daytime screen use.",
    features: [
      "40% blue light filtering",
      "Anti-reflective coating",
      "UV protection",
      "Stylish unisex frames"
    ]
  },
  {
    id: "grounding-mat",
    title: "Grounding Mat",
    subtitle: "Earth Connection",
    category: "EMF",
    tags: ["Grounding", "EMF", "Sleep", "Wellness", "For Him", "For Her"],
    price: 89,
    compareAtPrice: 119,
    rating: 4.5,
    reviewsCount: 567,
    image: "/images/grounding-mat.svg",
    badge: "New",
    shortBenefit: "Connect to Earth's natural energy while indoors",
    description: "Conductive grounding mat that connects you to the Earth's natural electrical charge, promoting better sleep and reduced inflammation.",
    features: [
      "Conductive carbon material",
      "Includes grounding cord",
      "Multiple size options",
      "Durable and easy to clean"
    ]
  },
  {
    id: "red-light-bulb",
    title: "Red Light Therapy Bulb",
    subtitle: "Targeted Therapy",
    category: "Recovery",
    tags: ["Red Light", "Recovery", "Beauty", "Affordable"],
    price: 49,
    rating: 4.4,
    reviewsCount: 756,
    image: "/images/red-light-bulb.svg",
    shortBenefit: "Affordable red light therapy for targeted treatment",
    description: "Easy-to-use red light therapy bulb that fits standard lamps for targeted treatment of specific areas.",
    features: [
      "660nm red light wavelength",
      "Standard E26 base",
      "25,000 hour lifespan",
      "No UV or harmful wavelengths"
    ]
  },
  {
    id: "travel-sleep-kit",
    title: "Travel Sleep Kit",
    subtitle: "Sleep On-The-Go",
    category: "Sleep",
    tags: ["Sleep", "Travel", "Portable", "For Him", "For Her"],
    price: 129,
    compareAtPrice: 169,
    rating: 4.8,
    reviewsCount: 445,
    image: "/images/travel-sleep-kit.svg",
    badge: "Staff Pick",
    shortBenefit: "Complete sleep optimization kit for travelers",
    description: "Everything you need for perfect sleep while traveling, including blue light glasses, sleep mask, and travel-sized red light.",
    features: [
      "Blue light blocking glasses",
      "Premium sleep mask",
      "Portable red light device",
      "Travel carrying case"
    ]
  }
];

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductsByCategory(category: Product["category"]): Product[] {
  return products.filter(p => p.category === category);
}

export function getProductsByTag(tag: string): Product[] {
  return products.filter(p => p.tags.includes(tag));
}