'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, Eye } from 'lucide-react';
import { Bundle, getBundleProducts } from '@/lib/bundles';
import { formatPrice, generateBlurDataURL } from '@/lib/utils';

interface BundleCardProps {
  bundle: Bundle;
  onAddBundle: (bundle: Bundle) => void;
  onViewDetails: (bundle: Bundle) => void;
}

export default function BundleCard({ bundle, onAddBundle, onViewDetails }: BundleCardProps) {
  const [imageError, setImageError] = useState(false);
  const savings = bundle.compareAtPrice - bundle.price;
  const bundleProducts = getBundleProducts(bundle);

  const placeholderImage = `data:image/svg+xml;base64,${Buffer.from(`
    <svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f0fdfa;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#e6fffa;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="600" height="400" fill="url(#bg)"/>
      <text x="300" y="200" font-family="system-ui" font-size="24" font-weight="600" text-anchor="middle" fill="#0f766e">${bundle.title}</text>
      <text x="300" y="230" font-family="system-ui" font-size="16" text-anchor="middle" fill="#14b8a6">${bundle.savingsLabel}</text>
    </svg>
  `).toString('base64')}`;

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-200 h-full flex flex-col">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-teal-50 to-blue-50">
        <Image
          src={imageError ? placeholderImage : bundle.image}
          alt={bundle.title}
          fill
          className="object-cover"
          placeholder="blur"
          blurDataURL={generateBlurDataURL()}
          onError={() => setImageError(true)}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
        />
        
        {/* Savings Badge */}
        {bundle.savingsLabel && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-red-500 text-white px-3 py-1.5 text-sm font-bold">
              {bundle.savingsLabel}
            </Badge>
          </div>
        )}

        {/* Featured Badge */}
        {bundle.featured && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-amber-500 text-white px-3 py-1.5 text-sm font-bold">
              Featured
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex-1 space-y-3">
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900">
            {bundle.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2">
            {bundle.description}
          </p>

          {/* Items Preview */}
          <div className="flex flex-wrap gap-1.5">
            {bundleProducts.slice(0, 3).map((product) => (
              product && (
                <Badge
                  key={product.id}
                  variant="secondary"
                  className="text-xs bg-gray-100"
                >
                  {product.title.split(' ').slice(0, 2).join(' ')}
                </Badge>
              )
            ))}
            {bundle.items.length > 3 && (
              <Badge variant="secondary" className="text-xs bg-gray-100">
                +{bundle.items.length - 3} more
              </Badge>
            )}
          </div>

          {/* Price */}
          <div className="space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-gray-900">
                {formatPrice(bundle.price)}
              </span>
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(bundle.compareAtPrice)}
              </span>
            </div>
            <div className="text-sm font-medium text-green-600">
              Save {formatPrice(savings)}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          <Button
            onClick={() => onAddBundle(bundle)}
            className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
            data-cta={`add-bundle-${bundle.id}`}
          >
            <Package className="w-4 h-4 mr-2" />
            Add Bundle
          </Button>
          <Button
            onClick={() => onViewDetails(bundle)}
            variant="outline"
            className="flex-1 border-gray-300 hover:border-teal-300"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
}