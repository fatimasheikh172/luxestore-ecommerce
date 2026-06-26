import mongoose from 'mongoose';
import Product from '../lib/models/Product';
import { connectDB } from '../lib/mongodb';

const products = [
  // Men's Category
  {
    name: 'Classic Oxford Shirt',
    description: 'Premium cotton Oxford shirt with a timeless design. Features a button-down collar and chest pocket. Perfect for both formal and casual occasions.',
    price: 89.99,
    category: 'Men',
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800',
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Light Blue', 'Navy'],
    stock: 45,
    rating: 4.7,
    reviews: [
      {
        userId: 'user1',
        userName: 'Michael Chen',
        rating: 5,
        comment: 'Exceptional quality. The fabric feels luxurious and the fit is perfect.',
        createdAt: new Date('2024-05-15')
      },
      {
        userId: 'user2',
        userName: 'David Rodriguez',
        rating: 4,
        comment: 'Great shirt, runs slightly large but very comfortable.',
        createdAt: new Date('2024-06-01')
      }
    ]
  },
  {
    name: 'Tailored Wool Blazer',
    description: 'Sophisticated wool-blend blazer with a modern slim fit. Features notch lapels, two-button closure, and interior pockets. A versatile piece for any wardrobe.',
    price: 299.00,
    category: 'Men',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800',
      'https://images.unsplash.com/photo-1593030668969-d0c4e23f4f47?w=800'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Charcoal', 'Navy', 'Black'],
    stock: 28,
    rating: 4.9,
    reviews: [
      {
        userId: 'user3',
        userName: 'James Wilson',
        rating: 5,
        comment: 'Best blazer I\'ve ever owned. Tailoring is impeccable.',
        createdAt: new Date('2024-05-20')
      }
    ]
  },
  {
    name: 'Premium Denim Jeans',
    description: 'Selvedge denim jeans crafted from Japanese fabric. Features a comfortable slim fit, five-pocket styling, and premium hardware.',
    price: 145.00,
    category: 'Men',
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800',
      'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=800'
    ],
    sizes: ['30', '32', '34', '36', '38'],
    colors: ['Indigo', 'Black', 'Light Wash'],
    stock: 52,
    rating: 4.6,
    reviews: []
  },
  {
    name: 'Cashmere V-Neck Sweater',
    description: '100% pure cashmere sweater with a classic V-neck design. Incredibly soft and warm, perfect for layering or wearing alone.',
    price: 189.00,
    category: 'Men',
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Camel', 'Navy', 'Grey', 'Black'],
    stock: 35,
    rating: 4.8,
    reviews: []
  },
  {
    name: 'Leather Chelsea Boots',
    description: 'Handcrafted leather Chelsea boots with elastic side panels and pull tabs. Goodyear welted construction ensures durability and comfort.',
    price: 275.00,
    category: 'Men',
    images: [
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800'
    ],
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Tan', 'Black', 'Burgundy'],
    stock: 30,
    rating: 4.9,
    reviews: [
      {
        userId: 'user4',
        userName: 'Robert Kim',
        rating: 5,
        comment: 'These boots are incredible. Worth every penny.',
        createdAt: new Date('2024-06-10')
      }
    ]
  },

  // Women's Category
  {
    name: 'Silk Wrap Dress',
    description: 'Elegant silk wrap dress with a flattering V-neckline and tie waist. Falls just below the knee for a sophisticated silhouette.',
    price: 195.00,
    category: 'Women',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Burgundy', 'Emerald'],
    stock: 40,
    rating: 4.7,
    reviews: [
      {
        userId: 'user5',
        userName: 'Emma Thompson',
        rating: 5,
        comment: 'Absolutely beautiful dress. The silk quality is outstanding.',
        createdAt: new Date('2024-05-25')
      }
    ]
  },
  {
    name: 'Merino Wool Turtleneck',
    description: 'Luxurious merino wool turtleneck with a relaxed fit. Soft, breathable, and naturally temperature-regulating.',
    price: 125.00,
    category: 'Women',
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Cream', 'Black', 'Camel', 'Grey'],
    stock: 48,
    rating: 4.6,
    reviews: []
  },
  {
    name: 'Wide-Leg Trousers',
    description: 'High-waisted wide-leg trousers in premium wool blend. Features side pockets and a concealed zip closure.',
    price: 155.00,
    category: 'Women',
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Beige'],
    stock: 38,
    rating: 4.8,
    reviews: [
      {
        userId: 'user6',
        userName: 'Sophie Martinez',
        rating: 5,
        comment: 'Perfect fit and beautiful drape. Very flattering!',
        createdAt: new Date('2024-06-05')
      }
    ]
  },
  {
    name: 'Cashmere Blend Coat',
    description: 'Timeless double-breasted coat in a luxurious cashmere blend. Features peak lapels, side pockets, and a belted waist.',
    price: 425.00,
    category: 'Women',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Camel', 'Black', 'Grey'],
    stock: 22,
    rating: 4.9,
    reviews: []
  },
  {
    name: 'Leather Ankle Boots',
    description: 'Sleek leather ankle boots with a block heel. Features a side zip closure and almond toe shape.',
    price: 245.00,
    category: 'Women',
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800'
    ],
    sizes: ['5', '6', '7', '8', '9', '10'],
    colors: ['Black', 'Tan', 'Burgundy'],
    stock: 42,
    rating: 4.7,
    reviews: []
  },

  // Accessories Category
  {
    name: 'Italian Leather Tote',
    description: 'Spacious tote bag crafted from vegetable-tanned Italian leather. Features interior pockets and comfortable shoulder straps.',
    price: 285.00,
    category: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800'
    ],
    sizes: ['One Size'],
    colors: ['Tan', 'Black', 'Cognac'],
    stock: 35,
    rating: 4.8,
    reviews: [
      {
        userId: 'user7',
        userName: 'Isabella Anderson',
        rating: 5,
        comment: 'Beautiful craftsmanship. This bag is a work of art.',
        createdAt: new Date('2024-06-12')
      }
    ]
  },
  {
    name: 'Cashmere Scarf',
    description: 'Ultra-soft cashmere scarf with a generous size. Perfect for adding a touch of luxury to any outfit.',
    price: 125.00,
    category: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800'
    ],
    sizes: ['One Size'],
    colors: ['Camel', 'Grey', 'Navy', 'Burgundy'],
    stock: 55,
    rating: 4.7,
    reviews: []
  },
  {
    name: 'Minimalist Watch',
    description: 'Swiss-made automatic watch with a minimalist design. Features a sapphire crystal and genuine leather strap.',
    price: 395.00,
    category: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800'
    ],
    sizes: ['One Size'],
    colors: ['Silver/Black', 'Gold/Brown', 'Rose Gold/Navy'],
    stock: 28,
    rating: 4.9,
    reviews: [
      {
        userId: 'user8',
        userName: 'Alexander Lee',
        rating: 5,
        comment: 'Elegant and timeless. Keeps perfect time.',
        createdAt: new Date('2024-05-30')
      }
    ]
  },
  {
    name: 'Leather Belt',
    description: 'Full-grain leather belt with a brushed metal buckle. Handcrafted with attention to detail.',
    price: 75.00,
    category: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1624222247344-550fb60583c1?w=800'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Brown', 'Tan'],
    stock: 60,
    rating: 4.6,
    reviews: []
  },
  {
    name: 'Sunglasses - Aviator',
    description: 'Classic aviator sunglasses with polarized lenses and metal frames. Includes premium case and cleaning cloth.',
    price: 165.00,
    category: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800'
    ],
    sizes: ['One Size'],
    colors: ['Gold/Green', 'Silver/Grey', 'Black/Black'],
    stock: 45,
    rating: 4.7,
    reviews: []
  },

  // Sale Category
  {
    name: 'Cotton Chinos',
    description: 'Classic chino pants in premium cotton twill. Features a tailored fit and versatile styling options.',
    price: 49.99,
    category: 'Sale',
    images: [
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800'
    ],
    sizes: ['30', '32', '34', '36', '38'],
    colors: ['Khaki', 'Navy', 'Olive'],
    stock: 70,
    rating: 4.4,
    reviews: []
  },
  {
    name: 'Linen Shirt',
    description: 'Lightweight linen shirt perfect for warm weather. Breathable and comfortable with a relaxed fit.',
    price: 39.99,
    category: 'Sale',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Light Blue', 'Sage'],
    stock: 55,
    rating: 4.5,
    reviews: []
  },
  {
    name: 'Knit Cardigan',
    description: 'Cozy knit cardigan with button closure. Perfect for layering during transitional seasons.',
    price: 59.99,
    category: 'Sale',
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Beige', 'Grey', 'Navy'],
    stock: 42,
    rating: 4.3,
    reviews: []
  },
  {
    name: 'Canvas Sneakers',
    description: 'Classic canvas sneakers with rubber soles. Timeless design that pairs with everything.',
    price: 45.00,
    category: 'Sale',
    images: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800'
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ['White', 'Black', 'Navy'],
    stock: 65,
    rating: 4.6,
    reviews: [
      {
        userId: 'user9',
        userName: 'Chris Taylor',
        rating: 5,
        comment: 'Great quality for the price. Very comfortable!',
        createdAt: new Date('2024-06-08')
      }
    ]
  },
  {
    name: 'Crossbody Bag',
    description: 'Compact crossbody bag in genuine leather. Features an adjustable strap and multiple compartments.',
    price: 79.99,
    category: 'Sale',
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800'
    ],
    sizes: ['One Size'],
    colors: ['Black', 'Tan', 'Burgundy'],
    stock: 38,
    rating: 4.5,
    reviews: []
  }
];

async function seed() {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    const insertedProducts = await Product.insertMany(products);
    console.log(`Successfully seeded ${insertedProducts.length} products`);

    console.log('\nProducts by category:');
    const categories = ['Men', 'Women', 'Accessories', 'Sale'];
    for (const category of categories) {
      const count = insertedProducts.filter(p => p.category === category).length;
      console.log(`  ${category}: ${count} products`);
    }

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
