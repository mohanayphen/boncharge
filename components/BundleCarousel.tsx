'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import BundleCard from './BundleCard';
import { Bundle, getBundleProducts, calculateBundleSavings } from '@/lib/bundles';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/lib/cart-context';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface BundleCarouselProps {
  bundles: Bundle[];
}

export default function BundleCarousel({ bundles }: BundleCarouselProps) {
  const { addToCart } = useCart();
  const [selectedBundle, setSelectedBundle] = useState<Bundle | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        const cardWidth = 400; // Approximate card width
        const containerWidth = carouselRef.current.offsetWidth;
        const visibleCards = Math.floor(containerWidth / cardWidth);
        setWidth(Math.max(0, (bundles.length - visibleCards) * cardWidth));
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [bundles.length]);

  const handleAddBundle = (bundle: Bundle) => {
    addToCart(bundle, 'bundle');
    toast.success(`${bundle.title} added to cart!`, {
      description: `You saved ${formatPrice(calculateBundleSavings(bundle))}!`,
      duration: 3000,
    });
  };

  const handleViewDetails = (bundle: Bundle) => {
    setSelectedBundle(bundle);
  };

  const handlePrevious = () => {
    setCurrentIndex(Math.max(0, currentIndex - 1));
  };

  const handleNext = () => {
    const maxIndex = Math.max(0, bundles.length - 3);
    setCurrentIndex(Math.min(maxIndex, currentIndex + 1));
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      handlePrevious();
    } else if (info.offset.x < -threshold) {
      handleNext();
    }
  };

  return (
    <section id="bundles" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Curated Bundles
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Save big with our expertly curated wellness bundles designed for specific health goals
          </p>
        </div>

        <div className="relative">
          {/* Previous Button */}
          <Button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 z-10",
              "bg-white/90 backdrop-blur-sm shadow-lg",
              "hover:bg-white disabled:opacity-50",
              "hidden lg:flex"
            )}
            size="icon"
            variant="outline"
            aria-label="Previous bundle"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          {/* Next Button */}
          <Button
            onClick={handleNext}
            disabled={currentIndex >= bundles.length - 3}
            className={cn(
              "absolute right-0 top-1/2 -translate-y-1/2 z-10",
              "bg-white/90 backdrop-blur-sm shadow-lg",
              "hover:bg-white disabled:opacity-50",
              "hidden lg:flex"
            )}
            size="icon"
            variant="outline"
            aria-label="Next bundle"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Carousel */}
          <div ref={carouselRef} className="overflow-hidden">
            <motion.div
              className="flex gap-6"
              drag="x"
              dragConstraints={{ left: -width, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              animate={{ x: -currentIndex * 400 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {bundles.map((bundle) => (
                <motion.div
                  key={bundle.id}
                  className="flex-shrink-0 w-full sm:w-[400px]"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <BundleCard
                    bundle={bundle}
                    onAddBundle={handleAddBundle}
                    onViewDetails={handleViewDetails}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {bundles.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-200",
                  index === currentIndex
                    ? "w-8 bg-teal-600"
                    : "bg-gray-300 hover:bg-gray-400"
                )}
                aria-label={`Go to bundle ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bundle Details Modal */}
        <Dialog open={!!selectedBundle} onOpenChange={() => setSelectedBundle(null)}>
          {selectedBundle && (
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedBundle.title}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6 mt-4">
                <p className="text-gray-700">{selectedBundle.description}</p>
                
                {/* Bundle Items */}
                <div>
                  <h3 className="font-semibold text-lg mb-4">What&apos;s Included:</h3>
                  <div className="space-y-3">
                    {getBundleProducts(selectedBundle).map((product) => (
                      product && (
                        <div key={product.id} className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
                          <div className="w-16 h-16 bg-gray-200 rounded-md flex-shrink-0" />
                          <div className="flex-1">
                            <h4 className="font-medium">{product.title}</h4>
                            <p className="text-sm text-gray-600">{product.shortBenefit}</p>
                            <span className="text-sm font-medium text-gray-900">
                              Value: {formatPrice(product.price)}
                            </span>
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                </div>
                
                {/* Value Breakdown */}
                <div className="bg-teal-50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Total Value:</span>
                    <span className="line-through text-gray-500">
                      {formatPrice(selectedBundle.compareAtPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">Bundle Price:</span>
                    <span className="font-bold text-2xl text-gray-900">
                      {formatPrice(selectedBundle.price)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-teal-200">
                    <span className="font-semibold text-green-700">You Save:</span>
                    <span className="font-bold text-green-700">
                      {formatPrice(calculateBundleSavings(selectedBundle))} ({selectedBundle.savingsLabel})
                    </span>
                  </div>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {selectedBundle.tags.map(tag => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                {/* Add to Cart */}
                <Button
                  onClick={() => {
                    handleAddBundle(selectedBundle);
                    setSelectedBundle(null);
                  }}
                  className="w-full bg-teal-600 hover:bg-teal-700"
                  size="lg"
                >
                  Add Bundle to Cart - {formatPrice(selectedBundle.price)}
                </Button>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </section>
  );
}