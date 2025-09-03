'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, X, Plus, Minus, Truck, ArrowRight } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/utils';

const FREE_SHIPPING_THRESHOLD = 150;

export default function StickyCart() {
  const { state, toggleCart, removeFromCart, updateQuantity, getCartTotal, getCartCount, getSavingsTotal } = useCart();
  const [isVisible, setIsVisible] = useState(false);
  
  const cartTotal = getCartTotal();
  const cartCount = getCartCount();
  const totalSavings = getSavingsTotal();
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotal);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Floating Cart Button */}
      <AnimatePresence>
        {isVisible && cartCount > 0 && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleCart}
            className="fixed bottom-6 right-6 z-40 bg-teal-600 text-white rounded-full p-4 shadow-lg hover:bg-teal-700 transition-colors"
            data-cart-button
            aria-label={`Open cart with ${cartCount} items`}
          >
            <div className="relative">
              <ShoppingCart className="w-6 h-6" />
              <Badge className="absolute -top-2 -right-2 bg-red-500 text-white px-1.5 py-0.5 text-xs">
                {cartCount}
              </Badge>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {state.isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={toggleCart}
              className="fixed inset-0 bg-black z-40"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Your Cart ({cartCount})</h2>
                <Button
                  onClick={toggleCart}
                  size="icon"
                  variant="ghost"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4">
                {state.items.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">Your cart is empty</p>
                    <Button
                      onClick={toggleCart}
                      variant="outline"
                      className="mt-4"
                    >
                      Continue Shopping
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {state.items.map((item) => {
                      const product = item.type === 'product' ? item.product : null;
                      const bundle = item.type === 'bundle' ? item.bundle : null;
                      const itemData = product || bundle;

                      if (!itemData) return null;

                      return (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          className="bg-gray-50 rounded-lg p-3"
                        >
                          <div className="flex gap-3">
                            <div className="w-16 h-16 bg-gray-200 rounded-md flex-shrink-0" />
                            <div className="flex-1">
                              <h3 className="font-medium text-sm line-clamp-1">
                                {itemData.title}
                              </h3>
                              {item.type === 'bundle' && (
                                <Badge variant="secondary" className="text-xs mt-1">
                                  Bundle
                                </Badge>
                              )}
                              <div className="flex items-center gap-2 mt-2">
                                <div className="flex items-center border rounded-md">
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="p-1 hover:bg-gray-100"
                                    aria-label="Decrease quantity"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="px-3 text-sm">{item.quantity}</span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="p-1 hover:bg-gray-100"
                                    aria-label="Increase quantity"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>
                                <span className="text-sm font-semibold">
                                  {formatPrice(itemData.price * item.quantity)}
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-400 hover:text-gray-600"
                              aria-label={`Remove ${itemData.title} from cart`}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Footer */}
              {state.items.length > 0 && (
                <div className="border-t p-4 space-y-4">
                  {/* Free Shipping Progress */}
                  {remainingForFreeShipping > 0 ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">
                          Add {formatPrice(remainingForFreeShipping)} for free shipping
                        </span>
                        <Truck className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(cartTotal / FREE_SHIPPING_THRESHOLD) * 100}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-green-600 text-sm">
                      <Truck className="w-4 h-4" />
                      <span className="font-medium">You qualify for free shipping!</span>
                    </div>
                  )}

                  {/* Totals */}
                  <div className="space-y-2">
                    {totalSavings > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-green-600">Total Savings</span>
                        <span className="font-medium text-green-600">
                          -{formatPrice(totalSavings)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Subtotal</span>
                      <span>{formatPrice(cartTotal)}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Button
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                    size="lg"
                    onClick={() => {
                      // Handle checkout
                      console.log('Proceeding to checkout...');
                    }}
                  >
                    Checkout
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  <Button
                    onClick={toggleCart}
                    variant="outline"
                    className="w-full"
                  >
                    Continue Shopping
                  </Button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}