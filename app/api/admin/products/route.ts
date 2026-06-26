import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Product from '@/lib/models/Product';

export async function POST(request: NextRequest) {
  try {
    const productData = await request.json();

    const { name, description, price, category, images, sizes, colors, stock } = productData;

    if (!name || !description || !price || !category || !images || images.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectDB();

    const product = await Product.create({
      name,
      description,
      price: parseFloat(price),
      category,
      images,
      sizes: sizes || [],
      colors: colors || [],
      stock: parseInt(stock) || 0,
      rating: 0,
      reviews: []
    });

    return NextResponse.json({
      message: 'Product created successfully',
      product
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
