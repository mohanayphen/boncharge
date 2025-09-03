'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Info } from 'lucide-react';
import { Product } from '@/lib/products';
import { formatPrice, calculateDiscount, generateBlurDataURL } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  onQuickAdd: (product: Product) => void;
  onLearnMore: (product: Product) => void;
}

export default function ProductCard({ product, onQuickAdd, onLearnMore }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const discount = product.compareAtPrice 
    ? calculateDiscount(product.price, product.compareAtPrice)
    : 0;

  // Generate placeholder image
  const placeholderImage = `data:image/svg+xml;base64,${Buffer.from(`
    <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" fill="#f3f4f6"/>
      <text x="200" y="200" font-family="system-ui" font-size="20" text-anchor="middle" fill="#9ca3af">${product.title}</text>
    </svg>
  `).toString('base64')}`;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className={cn(
        "group relative overflow-hidden transition-all duration-200",
        "hover:shadow-xl border-gray-200",
        isHovered && "border-teal-200"
      )}>
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <Badge 
              variant={product.badge === 'Save' ? 'destructive' : 'secondary'}
              className={cn(
                "font-semibold px-3 py-1",
                product.badge === 'Save' && "bg-red-500",
                product.badge === 'Bestseller' && "bg-amber-500",
                product.badge === 'New' && "bg-green-500",
                product.badge === 'Staff Pick' && "bg-purple-500"
              )}
            >
              {product.badge === 'Save' && discount > 0 ? `Save ${discount}%` : product.badge}
            </Badge>
          </div>
        )}

        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <Image
            src={imageError ? placeholderImage : product.image}
            alt={product.title}
            fill
            className={cn(
              "object-cover transition-transform duration-300",
              isHovered && "scale-110"
            )}
            placeholder="blur"
            blurDataURL={generateBlurDataURL()}
            onError={() => setImageError(true)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Title & Subtitle */}
          <div>
            <h3 className="font-semibold text-gray-900 line-clamp-1">
              {product.title}
            </h3>
            {product.subtitle && (
              <p className="text-sm text-gray-500">{product.subtitle}</p>
            )}
          </div>

          {/* Short Benefit */}
          <p className="text-sm text-gray-600 line-clamp-2">
            {product.shortBenefit}
          </p>

          {/* Rating */}
          {product.rating && product.reviewsCount && (
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-4 h-4",
                      i < Math.floor(product.rating!) 
                        ? "fill-amber-400 text-amber-400"
                        : "fill-gray-200 text-gray-200"
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {product.rating} ({product.reviewsCount})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button
              onClick={() => onQuickAdd(product)}
              className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
              data-cta={`add-to-cart-${product.id}`}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
            <Button
              onClick={() => onLearnMore(product)}
              variant="outline"
              size="icon"
              className="border-gray-300 hover:border-teal-300"
              aria-label={`Learn more about ${product.title}`}
            >
              <Info className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}