'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Heart, Menu, X, User } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const getTotalItems = useCartStore((state) => state.getTotalItems);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = mounted ? getTotalItems() : 0;

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-serif">
            LuxeStore
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="text-sm hover:text-gray-600 transition-colors">
              Shop All
            </Link>
            <Link href="/products?category=Men" className="text-sm hover:text-gray-600 transition-colors">
              Men
            </Link>
            <Link href="/products?category=Women" className="text-sm hover:text-gray-600 transition-colors">
              Women
            </Link>
            <Link href="/products?category=Accessories" className="text-sm hover:text-gray-600 transition-colors">
              Accessories
            </Link>
            <Link href="/products?category=Sale" className="text-sm text-[#D4AF37] hover:opacity-80 transition-opacity">
              Sale
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Link href="/profile" className="hover:text-gray-600 transition-colors">
              <User size={20} />
            </Link>
            <Link href="/wishlist" className="hover:text-gray-600 transition-colors">
              <Heart size={20} />
            </Link>
            <Link href="/cart" className="relative hover:text-gray-600 transition-colors">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden hover:text-gray-600 transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t">
            <Link
              href="/products"
              className="block py-2 text-sm hover:text-gray-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop All
            </Link>
            <Link
              href="/products?category=Men"
              className="block py-2 text-sm hover:text-gray-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Men
            </Link>
            <Link
              href="/products?category=Women"
              className="block py-2 text-sm hover:text-gray-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Women
            </Link>
            <Link
              href="/products?category=Accessories"
              className="block py-2 text-sm hover:text-gray-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Accessories
            </Link>
            <Link
              href="/products?category=Sale"
              className="block py-2 text-sm text-[#D4AF37] hover:opacity-80 transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sale
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
