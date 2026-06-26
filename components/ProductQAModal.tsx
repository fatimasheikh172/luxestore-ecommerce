'use client';

import { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

interface ProductQAModalProps {
  productId: string;
  productName: string;
}

export default function ProductQAModal({ productId, productName }: ProductQAModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
    if (!question.trim() || loading) return;

    setLoading(true);
    setAnswer('');

    try {
      const response = await fetch('/api/ai/product-qa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          question: question.trim()
        })
      });

      const data = await response.json();

      if (response.ok) {
        setAnswer(data.answer);
      } else {
        setAnswer('Sorry, I could not generate an answer. Please try again.');
      }
    } catch (error) {
      setAnswer('Sorry, I encountered an error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      askQuestion();
    }
  };

  const suggestedQuestions = [
    'What material is this made of?',
    'How does this fit?',
    'Is this suitable for formal occasions?',
    'How should I care for this product?'
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 border-2 border-[#D4AF37] text-[#D4AF37] px-6 py-2 hover:bg-[#D4AF37] hover:text-white transition-colors"
      >
        <MessageSquare size={20} />
        Ask AI about this product
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            {/* Header */}
            <div className="p-6 border-b flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-serif mb-2">Ask AI</h2>
                <p className="text-gray-600 text-sm">Ask anything about {productName}</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Question Input */}
              <div>
                <label className="block text-sm font-medium mb-2">Your Question</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="e.g., What's the fabric composition?"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                    disabled={loading}
                  />
                  <button
                    onClick={askQuestion}
                    disabled={loading || !question.trim()}
                    className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Send size={18} />
                    Ask
                  </button>
                </div>
              </div>

              {/* Suggested Questions */}
              {!answer && !loading && (
                <div>
                  <p className="text-sm font-medium mb-2">Suggested questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.map((q, index) => (
                      <button
                        key={index}
                        onClick={() => setQuestion(q)}
                        className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Loading */}
              {loading && (
                <div className="flex items-center justify-center py-8">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-[#D4AF37] rounded-full animate-bounce" />
                    <div className="w-3 h-3 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-3 h-3 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              )}

              {/* Answer */}
              {answer && !loading && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-sm font-medium mb-2 text-[#D4AF37]">AI Answer:</p>
                  <p className="text-gray-900 leading-relaxed">{answer}</p>
                  <button
                    onClick={() => {
                      setQuestion('');
                      setAnswer('');
                    }}
                    className="mt-4 text-sm text-gray-600 hover:text-black underline"
                  >
                    Ask another question
                  </button>
                </div>
              )}

              <div className="text-xs text-gray-500 bg-blue-50 p-3 rounded">
                <p>💡 This AI assistant uses product information to answer your questions. Responses are AI-generated and should be verified for critical decisions.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
