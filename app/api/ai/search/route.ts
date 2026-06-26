import { NextRequest, NextResponse } from 'next/server';
import { createChatCompletion } from '@/lib/groq';
import { connectDB } from '@/lib/mongodb';
import Product from '@/lib/models/Product';

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    await connectDB();

    // Get all products for AI to understand
    const allProducts = await Product.find({}).lean();

    const productsContext = allProducts.map((p) =>
      JSON.stringify({
        id: p._id,
        name: p.name,
        price: p.price,
        category: p.category,
        description: p.description.substring(0, 150),
        colors: p.colors,
        sizes: p.sizes
      })
    ).join('\n');

    const systemPrompt = `You are an intelligent search assistant for LuxeStore. Parse natural language queries and return relevant product IDs.

Available products (JSON format):
${productsContext}

Parse the user's query and return ONLY a JSON array of product IDs that match. Consider:
- Price ranges (e.g., "under $50", "between $100 and $200")
- Colors mentioned
- Categories (Men, Women, Accessories, Sale)
- Product types (shirts, dresses, bags, etc.)
- Style descriptors (casual, formal, elegant, etc.)

Return format: {"productIds": ["id1", "id2", "id3"]}

If no products match, return {"productIds": []}`;

    const response = await createChatCompletion(
      [{ role: 'user', content: query }],
      systemPrompt
    );

    // Parse the AI response to extract product IDs
    let productIds: string[] = [];
    try {
      const parsed = JSON.parse(response);
      productIds = parsed.productIds || [];
    } catch (e) {
      // If parsing fails, return all products as fallback
      console.error('Failed to parse AI response:', response);
    }

    // Fetch the actual products
    const products = productIds.length > 0
      ? await Product.find({ _id: { $in: productIds } }).lean()
      : await Product.find({
          $or: [
            { name: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } }
          ]
        }).limit(8).lean();

    return NextResponse.json({ products, interpretation: response });
  } catch (error) {
    console.error('Smart search error:', error);
    return NextResponse.json(
      { error: 'Failed to process search' },
      { status: 500 }
    );
  }
}
