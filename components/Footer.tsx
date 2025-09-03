'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { toast } from 'sonner';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubscribing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Successfully subscribed to newsletter!', {
      description: 'Check your email for a welcome message.',
    });
    
    setEmail('');
    setIsSubscribing(false);
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Join the Wellness Revolution
            </h3>
            <p className="text-gray-400 mb-6">
              Get exclusive offers, wellness tips, and be first to know about new products
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                disabled={isSubscribing}
              />
              <Button
                type="submit"
                disabled={isSubscribing}
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h4 className="text-lg font-bold mb-4">BON CHARGE</h4>
            <p className="text-gray-400 mb-4">
              Science-backed wellness products for optimal health and performance.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com/boncharge"
                aria-label="Facebook"
                className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/boncharge"
                aria-label="Instagram"
                className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com/boncharge"
                aria-label="Twitter"
                className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com/boncharge"
                aria-label="YouTube"
                className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <a href="/shop/blue-light-glasses" className="text-gray-400 hover:text-white transition-colors">
                  Blue Light Glasses
                </a>
              </li>
              <li>
                <a href="/shop/red-light-therapy" className="text-gray-400 hover:text-white transition-colors">
                  Red Light Therapy
                </a>
              </li>
              <li>
                <a href="/shop/sleep" className="text-gray-400 hover:text-white transition-colors">
                  Sleep Products
                </a>
              </li>
              <li>
                <a href="/shop/bundles" className="text-gray-400 hover:text-white transition-colors">
                  Bundle Deals
                </a>
              </li>
              <li>
                <a href="/gift-cards" className="text-gray-400 hover:text-white transition-colors">
                  Gift Cards
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/shipping" className="text-gray-400 hover:text-white transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="/returns" className="text-gray-400 hover:text-white transition-colors">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="/warranty" className="text-gray-400 hover:text-white transition-colors">
                  Warranty
                </a>
              </li>
              <li>
                <a href="/faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <a href="mailto:support@boncharge.com" className="text-gray-400 hover:text-white transition-colors">
                    support@boncharge.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <a href="tel:1-800-266-2427" className="text-gray-400 hover:text-white transition-colors">
                    1-800-BON-CHAR
                  </a>
                  <p className="text-sm text-gray-500">Mon-Fri 9AM-5PM EST</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="text-gray-400">
                  <p>123 Wellness Way</p>
                  <p>Health City, HC 12345</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} BON CHARGE. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="/accessibility" className="text-gray-400 hover:text-white transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}