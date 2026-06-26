'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Heart, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import toast from 'react-hot-toast';
import ProductCard from '@/components/ProductCard';
import ProductQAModal from '@/components/ProductQAModal';

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${params.id}`);
      const data = await response.json();
      setProduct(data);

      if (data.sizes?.length > 0) setSelectedSize(data.sizes[0]);
      if (data.colors?.length > 0) setSelectedColor(data.colors[0]);

      // Fetch related products
      const relatedResponse = await fetch(
        `/api/products?category=${data.category}&limit=4`
      );
      const relatedData = await relatedResponse.json();
      setRelatedProducts(
        relatedData.products.filter((p: any) => p._id !== data._id).slice(0, 4)
      );
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    if (product.sizes?.length > 0 && !selectedSize) {
      toast.error('Please select a size');
      return;
    }

    if (product.colors?.length > 0 && !selectedColor) {
      toast.error('Please select a color');
      return;
    }

    addItem({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
      quantity
    });

    toast.success('Added to cart');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="animate-pulse">
              <div className="aspect-square bg-gray-200 mb-4" />
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="aspect-square bg-gray-200" />
                ))}
              </div>
            </div>
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 w-3/4" />
              <div className="h-6 bg-gray-200 w-1/4" />
              <div className="h-4 bg-gray-200 w-full" />
              <div className="h-4 bg-gray-200 w-full" />
              <div className="h-4 bg-gray-200 w-2/3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif mb-2">Product not found</h2>
          <p className="text-gray-600">The product you're looking for doesn't exist</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="aspect-square relative overflow-hidden bg-gray-100 mb-4">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square relative overflow-hidden bg-gray-100 border-2 ${
                    selectedImage === index ? 'border-black' : 'border-transparent'
                  }`}
                >
                  <Image src={image} alt={`${product.name} ${index + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                {product.category}
              </p>
              <h1 className="text-3xl font-serif mb-2">{product.name}</h1>
              <div className="flex items-center gap-3">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg ${
                        i < Math.floor(product.rating) ? 'text-[#D4AF37]' : 'text-gray-300'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  ({product.reviews?.length || 0} reviews)
                </span>
              </div>
              <p className="text-2xl font-semibold mt-4">${product.price.toFixed(2)}</p>
            </div>

            {/* Size Selection */}
            {product.sizes?.length > 0 && (
              <div>
                <label className="block text-sm font-medium mb-2">Size</label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border ${
                        selectedSize === size
                          ? 'bg-black text-white border-black'
                          : 'border-gray-300 hover:border-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors?.length > 0 && (
              <div>
                <label className="block text-sm font-medium mb-2">Color</label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color: string) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border ${
                        selectedColor === color
                          ? 'bg-black text-white border-black'
                          : 'border-gray-300 hover:border-black'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:border-black"
                >
                  <Minus size={16} />
                </button>
                <span className="text-lg font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:border-black"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-black text-white py-3 px-6 flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              <button className="w-12 h-12 border border-gray-300 flex items-center justify-center hover:border-black">
                <Heart size={20} />
              </button>
            </div>

            {/* Stock Info */}
            <div className="border-t pt-6 space-y-4">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Stock:</span> {product.stock} available
              </p>

              {/* AI Product Q&A */}
              <ProductQAModal productId={product._id} productName={product.name} />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16 border-t">
          <div className="flex gap-8 border-b">
            {['description', 'specifications', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 font-medium capitalize ${
                  activeTab === tab
                    ? 'border-b-2 border-black'
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="grid grid-cols-2 gap-4 max-w-2xl">
                <div>
                  <p className="font-medium">Category</p>
                  <p className="text-gray-600">{product.category}</p>
                </div>
                <div>
                  <p className="font-medium">Stock</p>
                  <p className="text-gray-600">{product.stock} units</p>
                </div>
                {product.sizes?.length > 0 && (
                  <div>
                    <p className="font-medium">Available Sizes</p>
                    <p className="text-gray-600">{product.sizes.join(', ')}</p>
                  </div>
                )}
                {product.colors?.length > 0 && (
                  <div>
                    <p className="font-medium">Available Colors</p>
                    <p className="text-gray-600">{product.colors.join(', ')}</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {product.reviews?.length > 0 ? (
                  product.reviews.map((review: any, index: number) => (
                    <div key={index} className="border-b pb-6">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span
                              key={i}
                              className={`${
                                i < review.rating ? 'text-[#D4AF37]' : 'text-gray-300'
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="font-medium">{review.userName}</span>
                        <span className="text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-serif mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct._id}
                  id={relatedProduct._id}
                  name={relatedProduct.name}
                  price={relatedProduct.price}
                  images={relatedProduct.images}
                  rating={relatedProduct.rating}
                  category={relatedProduct.category}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
