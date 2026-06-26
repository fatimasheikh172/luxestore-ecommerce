'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import toast from 'react-hot-toast';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  images: string[];
  rating: number;
  category: string;
}

export default function ProductCard({
  id,
  name,
  price,
  images,
  rating,
  category
}: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      productId: id,
      name,
      price,
      image: images[0],
      quantity: 1
    });
    toast.success('Added to cart');
  };

  return (
    <Link href={`/products/${id}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
        <Image
          src={images[0]}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <button
          onClick={handleAddToCart}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 text-sm"
        >
          <ShoppingCart size={16} />
          Add to Cart
        </button>
        <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-100">
          <Heart size={18} />
        </button>
      </div>
      <div className="space-y-1">
        <p className="text-xs text-gray-500 uppercase tracking-wide">{category}</p>
        <h3 className="font-medium text-gray-900">{name}</h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`text-sm ${
                  i < Math.floor(rating) ? 'text-[#D4AF37]' : 'text-gray-300'
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-xs text-gray-500">({rating})</span>
        </div>
        <p className="font-semibold text-gray-900">${price.toFixed(2)}</p>
      </div>
    </Link>
  );
}
