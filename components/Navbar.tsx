"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ShoppingBag, Search, User } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(0);

  const navLinks = [
    { label: "Shop", href: "#shop" },
    { label: "Bundles", href: "#bundles" },
    { label: "Science", href: "#science" },
    { label: "Reviews", href: "#reviews" },
    { label: "About", href: "#about" },
  ];

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 relative">
            <Image
              src="/logo/logo.png"
              alt="BON CHARGE"
              width={175}
              height={60}
              className="h-12 lg:h-14 w-auto transition-all duration-300"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-medium transition-colors duration-200 text-white/90 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-6">
            <button
              className="transition-colors text-white/90 hover:text-white"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            
            <button
              className="transition-colors text-white/90 hover:text-white"
              aria-label="Account"
            >
              <User className="h-5 w-5" />
            </button>

            <button
              className="relative transition-colors text-white/90 hover:text-white"
              aria-label="Shopping cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 h-4 w-4 bg-teal-600 text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <Link
              href="#shop"
              className="px-6 py-2 rounded-full font-medium transition-all duration-200 bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30"
            >
              Shop Gifts
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-4">
            <button
              className="relative transition-colors text-white"
              aria-label="Shopping cart"
            >
              <ShoppingBag className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 h-4 w-4 bg-teal-600 text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              className="transition-colors text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100/50 bg-white/95 backdrop-blur-lg">
            <div className="py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-teal-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="px-4 pt-4 border-t border-gray-100 space-y-3">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-teal-600">
                  <Search className="h-5 w-5" />
                  <span>Search</span>
                </button>
                
                <button className="flex items-center space-x-2 text-gray-700 hover:text-teal-600">
                  <User className="h-5 w-5" />
                  <span>Account</span>
                </button>
              </div>

              <div className="px-4 pt-4">
                <Link
                  href="#shop"
                  className="block w-full bg-teal-600 text-white text-center px-6 py-3 rounded-full font-medium hover:bg-teal-700 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Shop Gifts
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;