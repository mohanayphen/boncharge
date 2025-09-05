'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard';
import Filters, { FilterOptions } from './Filters';
import { Product } from '@/lib/products';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/lib/cart-context';
import { toast } from 'sonner';

interface GiftGridProps {
  products: Product[];
}

export default function GiftGrid({ products: initialProducts }: GiftGridProps) {
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    tags: [],
    personas: [],
    priceRange: [0, 1000],
    sort: 'featured',
  });

  const filteredProducts = useMemo(() => {
    let filtered = [...initialProducts];

    // Filter by categories
    if (filters.categories.length > 0) {
      filtered = filtered.filter(p => filters.categories.includes(p.category));
    }

    // Filter by personas (tags)
    if (filters.personas.length > 0) {
      filtered = filtered.filter(p => 
        filters.personas.some(persona => p.tags.includes(persona))
      );
    }

    // Filter by price range
    filtered = filtered.filter(p => 
      p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Sort products
    switch (filters.sort) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'bestsellers':
        filtered.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
        break;
      default:
        // Featured/default sorting - badges first
        filtered.sort((a, b) => {
          if (a.badge && !b.badge) return -1;
          if (!a.badge && b.badge) return 1;
          return 0;
        });
    }

    return filtered;
  }, [initialProducts, filters]);

  const handleQuickAdd = (product: Product) => {
    addToCart(product, 'product');
    
    // Animate product flying to cart
    const productElement = document.querySelector(`[data-cta="add-to-cart-${product.id}"]`);
    const cartButton = document.querySelector('[data-cart-button]');
    
    if (productElement && cartButton) {
      const productRect = productElement.getBoundingClientRect();
      const cartRect = cartButton.getBoundingClientRect();
      
      const flyingProduct = document.createElement('div');
      flyingProduct.className = 'fixed pointer-events-none z-50 w-16 h-16 bg-teal-600 rounded-lg opacity-80';
      flyingProduct.style.left = `${productRect.left}px`;
      flyingProduct.style.top = `${productRect.top}px`;
      document.body.appendChild(flyingProduct);
      
      flyingProduct.animate([
        { 
          transform: 'translate(0, 0) scale(1)',
          opacity: 1
        },
        { 
          transform: `translate(${cartRect.left - productRect.left}px, ${cartRect.top - productRect.top}px) scale(0.1)`,
          opacity: 0
        }
      ], {
        duration: 600,
        easing: 'ease-in-out'
      }).onfinish = () => flyingProduct.remove();
    }
    
    toast.success(`${product.title} added to cart!`, {
      duration: 2000,
    });
  };

  const handleLearnMore = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleReset = () => {
    setFilters({
      categories: [],
      tags: [],
      personas: [],
      priceRange: [0, 1000],
      sort: 'featured',
    });
  };

  return (
    <section id="gift-guide" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Gift Guide
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover science-backed wellness gifts perfect for everyone on your list
          </p>
        </div>
      </div>

      {/* Horizontal Filters - Full Width */}
      <div className="mb-8">
        <Filters
          activeFilters={filters}
          onFilterChange={setFilters}
          onReset={handleReset}
          productCount={filteredProducts.length}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Product Grid - 4 columns */}
        {filteredProducts.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <ProductCard
                    product={product}
                    onQuickAdd={handleQuickAdd}
                    onLearnMore={handleLearnMore}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No products match your filters</p>
            <Button onClick={handleReset} variant="outline">
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        {selectedProduct && (
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedProduct.title}</DialogTitle>
              {selectedProduct.subtitle && (
                <DialogDescription className="text-lg">
                  {selectedProduct.subtitle}
                </DialogDescription>
              )}
            </DialogHeader>
            
            <div className="space-y-6 mt-4">
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">Product Image</span>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-700">{selectedProduct.description}</p>
                
                {selectedProduct.features && (
                  <div>
                    <h4 className="font-semibold mb-2">Key Features:</h4>
                    <ul className="space-y-2">
                      {selectedProduct.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-teal-600 mr-2">✓</span>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold">
                    {formatPrice(selectedProduct.price)}
                  </span>
                  {selectedProduct.compareAtPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(selectedProduct.compareAtPrice)}
                    </span>
                  )}
                </div>
                
                <div className="flex gap-2">
                  {selectedProduct.tags.map(tag => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <Button
                  onClick={() => {
                    handleQuickAdd(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="w-full bg-teal-600 hover:bg-teal-700"
                  size="lg"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}