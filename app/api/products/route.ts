import { NextResponse } from 'next/server';
import { products } from '@/lib/products';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const category = searchParams.get('category');
  const tag = searchParams.get('tag');
  const sort = searchParams.get('sort');
  const maxPrice = searchParams.get('maxPrice');
  
  let filteredProducts = [...products];
  
  // Filter by category
  if (category) {
    filteredProducts = filteredProducts.filter(p => p.category === category);
  }
  
  // Filter by tag
  if (tag) {
    filteredProducts = filteredProducts.filter(p => p.tags.includes(tag));
  }
  
  // Filter by max price
  if (maxPrice) {
    const max = parseInt(maxPrice);
    filteredProducts = filteredProducts.filter(p => p.price <= max);
  }
  
  // Sort products
  if (sort) {
    switch (sort) {
      case 'price-asc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'bestsellers':
        filteredProducts.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
        break;
      default:
        // Featured/default sorting - put badges first
        filteredProducts.sort((a, b) => {
          if (a.badge && !b.badge) return -1;
          if (!a.badge && b.badge) return 1;
          return 0;
        });
    }
  }
  
  return NextResponse.json(filteredProducts);
}