import { NextRequest, NextResponse } from 'next/server';
import { createChatCompletion } from '@/lib/groq';
import { connectDB } from '@/lib/mongodb';
import Product from '@/lib/models/Product';

export async function POST(request: NextRequest) {
  try {
    const { productId, question } = await request.json();

    if (!productId || !question) {
      return NextResponse.json(
        { error: 'Product ID and question are required' },
        { status: 400 }
      );
    }

    await connectDB();

    const product = await Product.findById(productId).lean();

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const systemPrompt = `You are a product specialist for LuxeStore. Answer customer questions about the following product:

Product: ${product.name}
Price: $${product.price}
Category: ${product.category}
Description: ${product.description}
Available Sizes: ${product.sizes?.join(', ') || 'N/A'}
Available Colors: ${product.colors?.join(', ') || 'N/A'}
Stock: ${product.stock} units
Rating: ${product.rating}/5 stars

Provide helpful, accurate answers based on the product information. If you don't have specific information, be honest about it. Keep responses concise and friendly.`;

    const response = await createChatCompletion(
      [{ role: 'user', content: question }],
      systemPrompt
    );

    return NextResponse.json({ answer: response });
  } catch (error) {
    console.error('Product Q&A error:', error);
    return NextResponse.json(
      { error: 'Failed to generate answer' },
      { status: 500 }
    );
  }
}
