'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-6xl font-serif text-gray-900 mb-4">Oops!</h1>
        <h2 className="text-2xl font-serif mb-4">Something went wrong</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          We encountered an unexpected error. Please try again.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="border-2 border-black px-6 py-3 hover:bg-black hover:text-white transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
