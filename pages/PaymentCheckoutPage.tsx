import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Shield, CheckCircle, CreditCard, Loader2 } from 'lucide-react';

export default function PaymentCheckoutPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tx = searchParams.get('tx');
  const amount = searchParams.get('amount');
  const ref = searchParams.get('ref');

  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!tx || !amount) {
      navigate('/');
    }
  }, [tx, amount, navigate]);

  const handlePay = async () => {
    setProcessing(true);
    // Simulate real-world network wait
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      // Let them see success then go back
      setTimeout(() => {
        // Go back to previous page or dashboard
        navigate(-1);
      }, 3000);
    }, 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-10 text-center border border-slate-100 flex flex-col items-center">
          <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Payment Successful!</h1>
          <p className="text-slate-500 font-medium mb-8">Ref: {ref}<br/>Transaction ID: {tx}</p>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
             <div className="h-full bg-emerald-500 animate-pulse w-full"></div>
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mt-4">Redirecting you back...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-10 border border-slate-100">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Secure Checkout</h1>
            <p className="text-xs font-bold text-slate-500">Local Eswatini Payment Gateway</p>
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 mb-8 space-y-4 text-center">
           <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Amount</p>
           <p className="text-5xl font-black text-slate-900 tracking-tighter">SZL {amount}</p>
           <p className="text-xs font-medium text-slate-500">Ref: {ref}</p>
        </div>

        <div className="space-y-4">
          <button 
            disabled={processing}
            onClick={handlePay}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white p-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-emerald-600/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50 mb-3"
          >
            {processing ? <Loader2 className="w-5 h-5 animate-spin" /> : <CreditCard className="w-5 h-5" />}
            {processing ? 'Processing...' : 'Instant Bank Transfer'}
          </button>

          <button 
            disabled={processing}
            onClick={handlePay}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-yellow-950 p-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-yellow-400/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {processing ? <Loader2 className="w-5 h-5 animate-spin" /> : <CreditCard className="w-5 h-5" />}
            {processing ? 'Processing...' : 'Pay with MoMo / eMali'}
          </button>
          
          <button 
             onClick={() => navigate(-1)}
             className="w-full bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-600 p-5 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all"
          >
            Cancel & Return
          </button>
        </div>
        
        <p className="text-center text-[10px] font-bold text-slate-400 mt-8 flex items-center justify-center gap-2">
           <Shield className="w-3 h-3" /> End-to-end encrypted secure transaction
        </p>
      </div>
    </div>
  );
}
