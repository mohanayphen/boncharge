import { NextResponse } from 'next/server';
import { bundles } from '@/lib/bundles';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const tag = searchParams.get('tag');
  const featured = searchParams.get('featured');
  
  let filteredBundles = [...bundles];
  
  // Filter by tag
  if (tag) {
    filteredBundles = filteredBundles.filter(b => b.tags.includes(tag));
  }
  
  // Filter by featured
  if (featured === 'true') {
    filteredBundles = filteredBundles.filter(b => b.featured);
  }
  
  return NextResponse.json(filteredBundles);
}