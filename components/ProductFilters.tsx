'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface ProductFiltersProps {
  onFilterChange: (filters: any) => void;
}

export default function ProductFilters({ onFilterChange }: ProductFiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);

  const categories = ['All', 'Men', 'Women', 'Accessories', 'Sale'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['Black', 'White', 'Navy', 'Grey', 'Beige', 'Burgundy'];

  const handleApplyFilters = () => {
    onFilterChange({
      category: selectedCategory !== 'All' ? selectedCategory : null,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      size: selectedSize || null,
      color: selectedColor || null,
      minRating: selectedRating || null
    });
  };

  return (
    <div className="w-full lg:w-64 space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Category</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  onFilterChange({ ...getFilters(), category: e.target.value !== 'All' ? e.target.value : null });
                }}
                className="w-4 h-4 accent-black"
              />
              <span className="text-sm">{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Price Range</h3>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="500"
            value={priceRange[1]}
            onChange={(e) => {
              const newRange = [priceRange[0], parseInt(e.target.value)];
              setPriceRange(newRange);
              onFilterChange({ ...getFilters(), minPrice: newRange[0], maxPrice: newRange[1] });
            }}
            className="w-full accent-black"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Size</h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => {
                const newSize = selectedSize === size ? '' : size;
                setSelectedSize(newSize);
                onFilterChange({ ...getFilters(), size: newSize || null });
              }}
              className={`px-3 py-1 border text-sm ${
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

      <div>
        <h3 className="font-semibold mb-4">Color</h3>
        <div className="space-y-2">
          {colors.map((color) => (
            <label key={color} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedColor === color}
                onChange={() => {
                  const newColor = selectedColor === color ? '' : color;
                  setSelectedColor(newColor);
                  onFilterChange({ ...getFilters(), color: newColor || null });
                }}
                className="w-4 h-4 accent-black"
              />
              <span className="text-sm">{color}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="rating"
                value={rating}
                checked={selectedRating === rating}
                onChange={() => {
                  const newRating = selectedRating === rating ? 0 : rating;
                  setSelectedRating(newRating);
                  onFilterChange({ ...getFilters(), minRating: newRating || null });
                }}
                className="w-4 h-4 accent-black"
              />
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`text-sm ${
                      i < rating ? 'text-[#D4AF37]' : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
                <span className="text-sm ml-1">& up</span>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  function getFilters() {
    return {
      category: selectedCategory !== 'All' ? selectedCategory : null,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      size: selectedSize || null,
      color: selectedColor || null,
      minRating: selectedRating || null
    };
  }
}
