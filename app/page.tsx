'use client';

import { useRef } from 'react';
import Hero from '@/components/Hero';
import GiftGrid from '@/components/GiftGrid';
import BundleCarousel from '@/components/BundleCarousel';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import StickyCart from '@/components/StickyCart';
import { CartProvider } from '@/lib/cart-context';
import { products } from '@/lib/products';
import { bundles } from '@/lib/bundles';
import { Toaster } from 'sonner';

export default function Home() {
  const giftGuideRef = useRef<HTMLDivElement>(null);
  const bundlesRef = useRef<HTMLDivElement>(null);

  const scrollToGiftGuide = () => {
    giftGuideRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBundles = () => {
    bundlesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <Hero 
          onShopClick={scrollToGiftGuide}
          onBundlesClick={scrollToBundles}
        />

        {/* Gift Guide Section */}
        <div ref={giftGuideRef}>
          <GiftGrid products={products} />
        </div>

        {/* Social Proof Section */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-teal-600 mb-2">50,000+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-teal-600 mb-2">4.8/5</div>
                <div className="text-gray-600">Average Rating</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-teal-600 mb-2">30-Day</div>
                <div className="text-gray-600">Money Back Guarantee</div>
              </div>
            </div>
          </div>
        </section>

        {/* Bundles Section */}
        <div ref={bundlesRef}>
          <BundleCarousel bundles={bundles} />
        </div>

        {/* Why It Works Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why BON CHARGE Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our products are designed based on scientific research to optimize your body&apos;s natural processes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Science-Backed</h3>
              <p className="text-gray-600">
                Every product is developed using peer-reviewed research and clinical studies
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Circadian Optimized</h3>
              <p className="text-gray-600">
                Designed to work with your body&apos;s natural rhythms for maximum effectiveness
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Lab Tested</h3>
              <p className="text-gray-600">
                Rigorous quality control and third-party testing ensure safety and efficacy
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQ />

        {/* Footer */}
        <Footer />

        {/* Sticky Cart */}
        <StickyCart />

        {/* Toast Notifications */}
        <Toaster 
          position="top-center"
          toastOptions={{
            style: {
              background: '#fff',
              color: '#111827',
              border: '1px solid #e5e7eb',
            },
          }}
        />
      </div>
    </CartProvider>
  );
}
