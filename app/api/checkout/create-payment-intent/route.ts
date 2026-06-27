import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-06-24.dahlia'
});

export async function POST(request: NextRequest) {
  try {
    const { amount, shippingInfo } = await request.json();

    if (!amount || amount < 50) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        shippingName: shippingInfo.name,
        shippingEmail: shippingInfo.email,
        shippingAddress: shippingInfo.address,
        shippingCity: shippingInfo.city,
        shippingCountry: shippingInfo.country,
        shippingZipCode: shippingInfo.zipCode
      }
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret
    });
  } catch (error: any) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}
