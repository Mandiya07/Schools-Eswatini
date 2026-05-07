import { useState } from 'react';

interface PaymentIntent {
  amount: number;
  reference: string;
  description?: string;
  customerEmail?: string;
  customerPhone?: string;
}

export function usePayment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initializePayment = async (intent: PaymentIntent) => {
    setLoading(true);
    setError(null);
    try {
      const baseUrl =
        window.location.hostname === 'localhost'
          ? 'http://localhost:3000'
          : `https://${window.location.hostname}`;
          
      const res = await fetch(`${baseUrl}/api/payments/initialize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(intent),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to initialize payment');
      }

      if (data.paymentUrl) {
        // In a real application, you'd redirect securely. For testing, you might mock a checkout flow.
        window.location.href = data.paymentUrl;
      } else {
        throw new Error('No checkout URL returned from payment gateway');
      }
    } catch (err: any) {
      setError(err.message || 'Payment processing error');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { initializePayment, loading, error };
}
