'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Truck, RotateCcw, HeadphonesIcon, Shield } from 'lucide-react';
import ProductCard from '@/components/ProductCard';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch('/api/products?limit=8&sortBy=rating');
      const data = await response.json();
      setFeaturedProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching featured products:', error);
      setFeaturedProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for subscribing with ${email}`);
    setEmail('');
  };

  const categories = [
    {
      name: 'Men',
      image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800',
      href: '/products?category=Men'
    },
    {
      name: 'Women',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800',
      href: '/products?category=Women'
    },
    {
      name: 'Accessories',
      image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800',
      href: '/products?category=Accessories'
    },
    {
      name: 'Sale',
      image: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=800',
      href: '/products?category=Sale'
    }
  ];

  const benefits = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'On orders over $50'
    },
    {
      icon: RotateCcw,
      title: 'Easy Returns',
      description: '30-day return policy'
    },
    {
      icon: HeadphonesIcon,
      title: '24/7 Support',
      description: 'Dedicated customer service'
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      description: 'Protected by Stripe'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-gray-900">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600"
            alt="Hero"
            fill
            sizes="100vw"
            className="object-cover opacity-40"
            priority
          />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif mb-6">
            Elevate Your Style
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Discover our curated collection of premium fashion and lifestyle products
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 text-lg hover:bg-gray-100 transition-colors"
          >
            Shop Now
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-serif text-center mb-12">Shop by Category</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative aspect-[3/4] overflow-hidden"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-2xl font-serif">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif mb-4">Featured Products</h2>
            <p className="text-gray-600">Handpicked selections from our latest collection</p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[3/4] bg-gray-200 mb-4" />
                  <div className="h-4 bg-gray-200 mb-2 w-3/4" />
                  <div className="h-4 bg-gray-200 mb-2 w-1/2" />
                  <div className="h-4 bg-gray-200 w-1/4" />
                </div>
              ))}
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  id={product._id}
                  name={product.name}
                  price={product.price}
                  images={product.images}
                  rating={product.rating}
                  category={product.category}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">Unable to load products. Please check your database connection.</p>
              <button
                onClick={fetchFeaturedProducts}
                className="text-[#D4AF37] hover:underline"
              >
                Try Again
              </button>
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-block border-2 border-black px-8 py-3 hover:bg-black hover:text-white transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif text-center mb-12">Why Choose LuxeStore</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#D4AF37] bg-opacity-10 rounded-full mb-4">
                    <Icon className="text-[#D4AF37]" size={32} />
                  </div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-black text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif mb-4">Join Our Community</h2>
          <p className="text-gray-300 mb-8">
            Subscribe to receive exclusive offers, style tips, and updates on new arrivals
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            />
            <button
              type="submit"
              className="bg-[#D4AF37] text-black px-8 py-3 hover:bg-[#c19d2f] transition-colors font-medium"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
