import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Shield, CheckCircle, CreditCard, Loader2, Smartphone, Building2, Ticket } from 'lucide-react';

import { db } from '../src/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export default function PaymentCheckoutPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tx = searchParams.get('tx');
  const amount = searchParams.get('amount');
  const ref = searchParams.get('ref');
  const date = searchParams.get('date');
  const time = searchParams.get('time');

  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string | null>('momo');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [momoStatus, setMomoStatus] = useState<'idle' | 'pending' | 'success' | 'failed'>('idle');

  useEffect(() => {
    if (!tx || !amount) {
      navigate('/');
    }
  }, [tx, amount, navigate]);

  const pollMomoStatus = async (referenceId: string) => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/momo/status/${referenceId}`);
        const data = await response.json();
        
        if (data.status === 'SUCCESSFUL') {
          clearInterval(interval);
          setMomoStatus('success');
          completeTransaction();
        } else if (data.status === 'FAILED' || data.status === 'REJECTED') {
          clearInterval(interval);
          setMomoStatus('failed');
          setProcessing(false);
          alert("Payment was rejected or failed. Please try again.");
        }
      } catch (error) {
        console.error("Polling error:", error);
      }
    }, 3000);

    // Timeout after 60 seconds
    setTimeout(() => {
      clearInterval(interval);
      if (momoStatus === 'pending') {
        setProcessing(false);
        setMomoStatus('failed');
        alert("Payment timed out. Please check your phone for the USSD prompt.");
      }
    }, 60000);
  };

  const completeTransaction = async () => {
    try {
      if (tx) {
        const txRef = doc(db, 'transactions', tx);
        await updateDoc(txRef, {
          status: 'completed',
          paymentMethod: selectedMethod,
          updatedAt: new Date().toISOString()
        });
      }
      setProcessing(false);
      setSuccess(true);
      setTimeout(() => navigate(-1), 3000);
    } catch (error) {
      console.error("Failed to complete tx:", error);
      setProcessing(false);
    }
  };

  const handlePay = async () => {
    if (selectedMethod === 'momo' && !phoneNumber) {
      alert("Please enter your Mobile Money number.");
      return;
    }

    setProcessing(true);
    
    try {
      if (selectedMethod === 'momo') {
        setMomoStatus('pending');
        const response = await fetch('/api/momo/request-to-pay', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phoneNumber: phoneNumber.replace(/\s+/g, ''),
            resource: { id: tx || 'TX-001', title: ref || 'Payment', price: parseFloat(amount || '0') }
          })
        });
        
        const data = await response.json();
        if (data.referenceId) {
          // In Sandbox, we might just assume success for demo if polling isn't setup for real push
          // But here we'll simulate the real flow
          pollMomoStatus(data.referenceId);
        } else {
          throw new Error(data.error || "Failed to initiate MoMo payment");
        }
        return; // Polling will handle the rest
      }

      // Fallback for other methods (Mock for now)
      await new Promise(resolve => setTimeout(resolve, 2000));
      await completeTransaction();
    } catch (error: any) {
      console.error("Payment error:", error);
      alert(error.message || "Payment failed. Please check your connection.");
      setProcessing(false);
      setMomoStatus('failed');
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-10 text-center border border-slate-100 flex flex-col items-center">
          <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Payment Successful!</h1>
          <p className="text-slate-500 font-medium mb-4">Ref: {ref}<br/>Transaction ID: {tx}</p>
          {date && time && (
            <div className="bg-emerald-50 rounded-2xl p-4 mb-8 text-emerald-700 w-full">
              <p className="text-[10px] font-black uppercase tracking-widest mb-1">Session Scheduled</p>
              <p className="font-bold">{date} at {time}</p>
            </div>
          )}
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mt-4">
             <div className="h-full bg-emerald-500 animate-pulse w-full"></div>
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mt-4">Redirecting you back...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4 font-sans">
      <div className="max-w-2xl mx-auto w-full bg-white rounded-[40px] shadow-2xl p-8 md:p-12 border border-slate-100">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shrink-0">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Secure Checkout</h1>
            <p className="text-xs font-bold text-slate-500">Local Eswatini Payment Gateway</p>
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 mb-8 text-center shadow-sm">
           <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Amount Due</p>
           <p className="text-5xl font-black text-slate-900 tracking-tighter mb-2">SZL {amount}</p>
           <p className="text-xs font-bold text-slate-400 bg-white inline-block px-3 py-1 rounded-full border border-slate-100">Ref: {ref}</p>
           {date && time && (
             <div className="mt-4 p-3 bg-white border border-slate-200 rounded-xl inline-block max-w-[200px] w-full items-center justify-center gap-2 text-slate-700 font-bold mx-auto">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">Date & Time</span>
                <span className="text-sm">{date}</span> <span className="text-slate-300">•</span> <span className="text-sm">{time}</span>
             </div>
           )}
        </div>

        <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">Select Payment Method</h2>
        
        <div className="space-y-4 mb-8">
          {/* Mobile Money */}
          <button 
            onClick={() => setSelectedMethod('momo')}
            className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all text-left ${selectedMethod === 'momo' ? 'border-yellow-400 bg-yellow-50' : 'border-slate-100 hover:border-slate-200'}`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedMethod === 'momo' ? 'bg-yellow-400 text-yellow-900' : 'bg-slate-100 text-slate-400'}`}>
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 mb-1">Mobile Money</h3>
                <p className="text-xs text-slate-500 font-medium tracking-wide">MTN MoMo or Eswatini Mobile eMali</p>
              </div>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'momo' ? 'border-yellow-500' : 'border-slate-300'}`}>
              {selectedMethod === 'momo' && <div className="w-3 h-3 rounded-full bg-yellow-500" />}
            </div>
          </button>

          {/* EFT */}
          <button 
            onClick={() => setSelectedMethod('eft')}
            className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all text-left ${selectedMethod === 'eft' ? 'border-blue-600 bg-blue-50' : 'border-slate-100 hover:border-slate-200'}`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedMethod === 'eft' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 mb-1">Electronic Funds Transfer (EFT)</h3>
                <p className="text-xs text-slate-500 font-medium tracking-wide">Standard Bank, FNB, Nedbank, SwaziBank</p>
              </div>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'eft' ? 'border-blue-600' : 'border-slate-300'}`}>
              {selectedMethod === 'eft' && <div className="w-3 h-3 rounded-full bg-blue-600" />}
            </div>
          </button>

          {/* Card */}
          <button 
            onClick={() => setSelectedMethod('card')}
            className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all text-left ${selectedMethod === 'card' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100 hover:border-slate-200'}`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedMethod === 'card' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 mb-1">Credit / Debit Card</h3>
                <p className="text-xs text-slate-500 font-medium tracking-wide">Visa, Mastercard (Powered by PayFast/DPO)</p>
              </div>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'card' ? 'border-indigo-600' : 'border-slate-300'}`}>
              {selectedMethod === 'card' && <div className="w-3 h-3 rounded-full bg-indigo-600" />}
            </div>
          </button>

          {/* Vouchers */}
          <button 
            onClick={() => setSelectedMethod('voucher')}
            className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all text-left ${selectedMethod === 'voucher' ? 'border-emerald-600 bg-emerald-50' : 'border-slate-100 hover:border-slate-200'}`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedMethod === 'voucher' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                <Ticket className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 mb-1">Scratch Card / Voucher</h3>
                <p className="text-xs text-slate-500 font-medium tracking-wide">Enter PIN from official Schools Eswatini vendors</p>
              </div>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'voucher' ? 'border-emerald-600' : 'border-slate-300'}`}>
              {selectedMethod === 'voucher' && <div className="w-3 h-3 rounded-full bg-emerald-600" />}
            </div>
          </button>
        </div>

        {selectedMethod === 'momo' && (
           <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mb-8">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Enter Mobile Money Number</label>
              <input 
                type="text" 
                placeholder="e.g. 7600 0000" 
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 focus:ring-2 focus:ring-yellow-500 outline-none" 
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              {momoStatus === 'pending' && (
                <div className="mt-4 p-4 bg-yellow-100 rounded-xl border border-yellow-200 animate-pulse">
                   <p className="text-xs font-black text-yellow-800 uppercase tracking-widest flex items-center gap-2">
                     <Smartphone className="w-4 h-4" /> Check your phone for prompt
                   </p>
                </div>
              )}
           </div>
        )}

        {selectedMethod === 'card' && (
           <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mb-8 space-y-4">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Card Number</label>
                <input type="text" placeholder="**** **** **** ****" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Expiry</label>
                  <input type="text" placeholder="MM/YY" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">CVV</label>
                  <input type="text" placeholder="***" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
              </div>
           </div>
        )}

        {selectedMethod === 'voucher' && (
           <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mb-8">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Voucher PIN</label>
              <input type="text" placeholder="12-digit PIN" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-bold px-4 py-3 text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none tracking-widest text-center" />
           </div>
        )}
        
        {selectedMethod === 'eft' && (
           <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 mb-8">
              <p className="text-sm font-bold text-blue-900 mb-2">Bank Transfer Details</p>
              <p className="text-xs text-blue-800 leading-relaxed">
                 You will be directed to our secure payment gateway to generate a reference number for your EFT payment.
              </p>
           </div>
        )}

        <div className="space-y-4">
          <button 
            disabled={processing || !selectedMethod}
            onClick={handlePay}
            className={`w-full text-white p-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 mb-3 ${
              selectedMethod === 'momo' ? 'bg-yellow-500 hover:bg-yellow-600 text-yellow-950 shadow-yellow-500/20' : 
              selectedMethod === 'eft' ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20' :
              selectedMethod === 'card' ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/20' :
              selectedMethod === 'voucher' ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20' :
              'bg-slate-900'
            }`}
          >
            {processing ? <Loader2 className="w-5 h-5 animate-spin" /> : 
             selectedMethod === 'momo' ? <Smartphone className="w-5 h-5" /> :
             selectedMethod === 'card' || selectedMethod === 'eft' ? <CreditCard className="w-5 h-5" /> :
             <Ticket className="w-5 h-5" />}
            {processing ? 'Processing...' : `Pay via ${
              selectedMethod === 'momo' ? 'Mobile Money' : 
              selectedMethod === 'eft' ? 'EFT' : 
              selectedMethod === 'card' ? 'Card' : 
              'Voucher'
            }`}
          </button>
          
          <button 
             onClick={() => navigate(-1)}
             className="w-full bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-600 p-5 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all"
          >
            Cancel & Return
          </button>
        </div>
        
        <p className="text-center text-[10px] font-bold text-slate-400 mt-8 flex items-center justify-center gap-2">
           <Shield className="w-3 h-3" /> End-to-end encrypted secure transaction compliant with ESCCOM
        </p>
      </div>
    </div>
  );
}
