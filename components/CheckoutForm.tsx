'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { useCartStore } from '@/lib/store/cart';
import toast from 'react-hot-toast';

interface CheckoutFormProps {
  clientSecret: string;
  shippingInfo: any;
  items: any[];
  total: number;
  onSuccess: () => void;
}

export default function CheckoutForm({
  clientSecret,
  shippingInfo,
  items,
  total,
  onSuccess
}: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success`,
        },
        redirect: 'if_required'
      });

      if (error) {
        toast.error(error.message || 'Payment failed');
        setIsProcessing(false);
        return;
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Create order in database
        await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items,
            total,
            shippingInfo,
            stripePaymentId: paymentIntent.id
          })
        });

        clearCart();
        toast.success('Payment successful!');
        onSuccess();
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('An error occurred during payment');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />

      <div className="bg-blue-50 p-4 rounded text-sm">
        <p className="font-medium mb-2">Test Card Details:</p>
        <p className="text-gray-700">Card Number: 4242 4242 4242 4242</p>
        <p className="text-gray-700">Expiry: Any future date</p>
        <p className="text-gray-700">CVC: Any 3 digits</p>
      </div>

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-black text-white py-3 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
      </button>

      <p className="text-xs text-gray-500 text-center">
        Your payment information is secure and encrypted
      </p>
    </form>
  );
}
