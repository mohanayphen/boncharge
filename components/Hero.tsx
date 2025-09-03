'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onShopClick: () => void;
  onBundlesClick: () => void;
}

export default function Hero({ onShopClick, onBundlesClick }: HeroProps) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
      },
    },
  };

  const floatingAnimation = shouldReduceMotion
    ? {}
    : {
        y: [-10, 10, -10],
        transition: {
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        },
      };

  return (
    <section className="relative min-h-screen h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Gradient Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #e6fffa 25%, #fef3c7 50%, #f0fdfa 75%, #fef3c7 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 15s ease infinite',
        }}
      />
      
      {/* Additional gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at top right, rgba(147, 197, 253, 0.15), transparent 50%), radial-gradient(ellipse at bottom left, rgba(167, 243, 208, 0.15), transparent 50%)',
        }}
      />
      
      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'linear-gradient(to right, #80808012 1px, transparent 1px), linear-gradient(to bottom, #80808012 1px, transparent 1px)',
          backgroundSize: '14px 24px',
        }}
      />
      
      {/* Floating Wellness Emojis */}
      <motion.div
        className="absolute top-[15%] left-[10%] text-4xl z-[5]"
        animate={shouldReduceMotion ? {} : {
          y: [-20, 20, -20],
          rotate: [0, 10, -10, 0],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        💤
      </motion.div>
      
      <motion.div
        className="absolute top-[25%] right-[15%] text-3xl z-[5]"
        animate={shouldReduceMotion ? {} : {
          y: [0, -30, 0],
          x: [0, 10, 0],
          rotate: [0, 360],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        🌙
      </motion.div>
      
      <motion.div
        className="absolute bottom-[30%] left-[5%] text-3xl z-[5]"
        animate={shouldReduceMotion ? {} : {
          scale: [1, 1.2, 1],
          rotate: [0, -15, 15, 0],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        ⚡
      </motion.div>
      
      <motion.div
        className="absolute top-[60%] right-[8%] text-4xl z-[5]"
        animate={shouldReduceMotion ? {} : {
          y: [0, 15, -15, 0],
          x: [-10, 10, -10],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        🧘‍♀️
      </motion.div>
      
      <motion.div
        className="absolute bottom-[20%] right-[20%] text-3xl z-[5]"
        animate={shouldReduceMotion ? {} : {
          scale: [1, 1.3, 1],
          y: [0, -20, 0],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        💪
      </motion.div>
      
      <motion.div
        className="absolute top-[40%] left-[12%] text-3xl z-[5]"
        animate={shouldReduceMotion ? {} : {
          rotate: [0, 15, -15, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      >
        🌟
      </motion.div>
      
      <motion.div
        className="absolute bottom-[40%] right-[25%] text-3xl z-[5]"
        animate={shouldReduceMotion ? {} : {
          y: [-15, 15, -15],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
      >
        🛡️
      </motion.div>
      
      <motion.div
        className="absolute top-[70%] left-[20%] text-3xl z-[5]"
        animate={shouldReduceMotion ? {} : {
          scale: [1, 0.8, 1.2, 1],
          x: [0, -20, 20, 0],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      >
        🔋
      </motion.div>
      
      <motion.div
        className="absolute top-[50%] right-[35%] text-2xl opacity-70 z-[5]"
        animate={shouldReduceMotion ? {} : {
          y: [0, -10, 10, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >
        ✨
      </motion.div>
      
      <motion.div
        className="absolute bottom-[15%] left-[30%] text-3xl z-[5]"
        animate={shouldReduceMotion ? {} : {
          scale: [1, 1.15, 0.95, 1],
          rotate: [0, -20, 20, 0],
        }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
      >
        🌞
      </motion.div>
      
      {/* Floating Orbs with Animation */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 rounded-full"
        style={{
          background: 'linear-gradient(135deg, rgba(94, 234, 212, 0.3), rgba(147, 197, 253, 0.3))',
          filter: 'blur(60px)',
        }}
        animate={floatingAnimation}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-40 h-40 rounded-full"
        style={{
          background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.3), rgba(251, 146, 60, 0.3))',
          filter: 'blur(60px)',
        }}
        animate={{
          ...floatingAnimation,
          x: shouldReduceMotion ? 0 : [0, 30, 0],
        }}
        transition={{ delay: 2, duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full"
        style={{
          background: 'linear-gradient(135deg, rgba(196, 181, 253, 0.3), rgba(249, 168, 212, 0.3))',
          filter: 'blur(40px)',
        }}
        animate={floatingAnimation}
        transition={{ delay: 4, duration: 7, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-28 h-28 rounded-full"
        style={{
          background: 'linear-gradient(135deg, rgba(134, 239, 172, 0.3), rgba(94, 234, 212, 0.3))',
          filter: 'blur(40px)',
        }}
        animate={{
          ...floatingAnimation,
          x: shouldReduceMotion ? 0 : [-20, 20, -20],
        }}
        transition={{ delay: 1, duration: 9, repeat: Infinity }}
      />

      {/* Main Content */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Limited Time Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-full text-sm font-medium text-amber-800 mb-8"
          whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
        >
          <motion.div
            animate={shouldReduceMotion ? {} : { rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Sparkles className="w-4 h-4" />
          </motion.div>
          <span>Save up to 25% on curated bundles</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6"
        >
          Science-Backed Gifts for
          <motion.span 
            className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 mt-2"
            animate={shouldReduceMotion ? {} : {
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            style={{ 
              backgroundSize: '200% 200%',
              backgroundImage: 'linear-gradient(to right, #0d9488, #2563eb, #0d9488)'
            }}
          >
            Better Sleep & Recovery
          </motion.span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10"
        >
          Transform your wellness routine with cutting-edge technology designed to optimize sleep, 
          accelerate recovery, and protect against modern environmental stressors.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.div
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
          >
            <Button
              size="lg"
              onClick={onShopClick}
              className="group bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              data-cta="hero-shop-guide"
            >
              Shop Gift Guide
              <motion.div
                className="inline-block ml-2"
                animate={shouldReduceMotion ? {} : { x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
          >
            <Button
              size="lg"
              variant="outline"
              onClick={onBundlesClick}
              className="group border-2 border-gray-300 hover:border-gray-400 bg-white/80 backdrop-blur-sm px-8 py-6 text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
              data-cta="hero-view-bundles"
            >
              View Bundles
              <motion.span 
                className="ml-2 text-teal-600"
                animate={shouldReduceMotion ? {} : { scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Save 25%+
              </motion.span>
            </Button>
          </motion.div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-500"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.div 
            className="flex items-center gap-2"
            variants={itemVariants}
            whileHover={shouldReduceMotion ? {} : { y: -2 }}
          >
            <motion.svg 
              className="w-5 h-5 text-green-500" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              animate={shouldReduceMotion ? {} : { scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </motion.svg>
            <span>Free Shipping Over $150</span>
          </motion.div>
          <motion.div 
            className="flex items-center gap-2"
            variants={itemVariants}
            whileHover={shouldReduceMotion ? {} : { y: -2 }}
          >
            <motion.svg 
              className="w-5 h-5 text-green-500" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              animate={shouldReduceMotion ? {} : { scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, delay: 0.5 }}
            >
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </motion.svg>
            <span>30-Day Money Back Guarantee</span>
          </motion.div>
          <motion.div 
            className="flex items-center gap-2"
            variants={itemVariants}
            whileHover={shouldReduceMotion ? {} : { y: -2 }}
          >
            <motion.svg 
              className="w-5 h-5 text-green-500" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              animate={shouldReduceMotion ? {} : { scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, delay: 0.5 }}
            >
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </motion.svg>
            <span>Science-Backed Products</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={shouldReduceMotion ? {} : { y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
}