import { NextRequest, NextResponse } from 'next/server';
import { createChatCompletion } from '@/lib/groq';
import { connectDB } from '@/lib/mongodb';
import Product from '@/lib/models/Product';

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    await connectDB();

    // Fetch all products for context
    const products = await Product.find({}).select('name description price category').limit(50).lean();

    const productsContext = products.map((p) =>
      `${p.name} - $${p.price} - ${p.category} - ${p.description.substring(0, 100)}`
    ).join('\n');

    const systemPrompt = `You are a helpful shopping assistant for LuxeStore, a premium fashion and lifestyle store.

Your role is to:
- Help customers find products that match their needs
- Provide style advice and recommendations
- Answer questions about products, categories, and pricing
- Be friendly, professional, and concise

Available products:
${productsContext}

Categories: Men, Women, Accessories, Sale

Always be helpful and encourage customers to browse our collection. If asked about specific products not in the list, politely suggest similar items from our catalog.`;

    const messages = conversationHistory || [];
    messages.push({ role: 'user', content: message });

    const response = await createChatCompletion(messages, systemPrompt);

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}
