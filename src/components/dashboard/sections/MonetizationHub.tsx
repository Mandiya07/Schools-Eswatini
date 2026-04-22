
import React from 'react';
import { Institution, BillingRecord } from '../../../../types';
import { CreditCard, Zap, Shield, Star, DollarSign, Wallet, ArrowUpRight, CheckCircle, Smartphone, BarChart2, TrendingUp } from 'lucide-react';

interface MonetizationHubProps {
  institution: Institution;
  onUpdate: (updatedMonetization: Institution['monetization']) => void;
  onPlanUpdate: (plan: Institution['plan']) => void;
}

const MonetizationHub: React.FC<MonetizationHubProps> = ({ institution, onUpdate, onPlanUpdate }) => {
  const { monetization, plan, subscription } = institution;

  const updateField = (field: keyof Institution['monetization'], value: any) => {
    onUpdate({
      ...monetization,
      [field]: value
    });
  };

  const plans = [
    { name: 'Free', price: 'E0', features: ['Directory Listing', 'Basic Info', 'Public Reviews'], id: 'Free' },
    { name: 'Pro Suite', price: 'E450/mo', features: ['AI Timetabling', 'MoET Census Automation', 'Staff Management'], id: 'Pro Suite' },
    { name: 'Enterprise', price: 'E1,200/mo', features: ['QR Inventory Tracker', 'Custom Subdomain', 'Advanced Analytics'], id: 'Enterprise' }
  ];

  const recentTransactions: BillingRecord[] = subscription?.billingHistory || [
    { id: 'inv-101', date: '2026-04-01', amount: 450, description: 'Pro Suite Subscription', status: 'Paid', method: 'MoMo' },
    { id: 'inv-102', date: '2026-03-01', amount: 450, description: 'Pro Suite Subscription', status: 'Paid', method: 'MoMo' }
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-right-4">
      <header>
        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Monetization & Billing Hub</h3>
        <p className="text-sm text-slate-500 font-medium">Manage institutional revenue, SaaS subscriptions, and student payment gateways</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          {/* SaaS Plan Selector */}
          <section className="space-y-6">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Institutional SaaS Plan (Business-to-Business)</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plans.map(p => (
                <div 
                  key={p.id} 
                  onClick={() => onPlanUpdate(p.id as any)}
                  className={`p-6 rounded-[32px] border-2 cursor-pointer transition-all ${plan === p.id ? 'border-blue-600 bg-blue-50 shadow-xl' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-2 rounded-xl ${plan === p.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                      <Zap className="w-4 h-4" />
                    </div>
                    {plan === p.id && <CheckCircle className="w-4 h-4 text-blue-600" />}
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{p.name}</p>
                  <p className="text-2xl font-black text-slate-900 mt-1">{p.price}</p>
                  <ul className="mt-6 space-y-2">
                    {p.features.map(f => (
                      <li key={f} className="text-[10px] font-bold text-slate-500 flex items-center gap-2">
                        <div className="w-1 h-1 bg-slate-300 rounded-full" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Revenue Configuration */}
          <section className="space-y-8">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Revenue Streams (Consumer Monetization)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-900 rounded-[40px] p-8 text-white space-y-6">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-white/10 rounded-2xl">
                    <Smartphone className="w-6 h-6 text-amber-400" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Enabled</span>
                    <button 
                      onClick={() => updateField('feesEnabled', !monetization.feesEnabled)}
                      className={`w-10 h-5 rounded-full relative transition-all ${monetization.feesEnabled ? 'bg-amber-400' : 'bg-slate-700'}`}
                    >
                      <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${monetization.feesEnabled ? 'right-1' : 'left-1'}`} />
                    </button>
                  </div>
                </div>
                <div>
                  <h5 className="font-black text-xl leading-tight">Native MoMo Fees Gateway</h5>
                  <p className="text-slate-400 text-xs font-medium mt-2">Allow parents to pay fees via MTN MoMo with automated reconciliation.</p>
                </div>
                <div className="space-y-4">
                  <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest">Eswatini Merchant ID</label>
                  <input 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-white focus:ring-2 focus:ring-amber-400 outline-none" 
                    value={monetization.momoMerchantId || ''}
                    onChange={e => updateField('momoMerchantId', e.target.value)}
                    placeholder="e.g. SZ_MERCH_45892" 
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-6 bg-white border border-slate-100 rounded-3xl flex items-center justify-between">
                   <div className="flex gap-4 items-center">
                     <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl"><Star className="w-5 h-5" /></div>
                     <div>
                       <p className="text-sm font-black text-slate-900">Scholarship Premium</p>
                       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Student Monetization</p>
                     </div>
                   </div>
                   <button 
                    onClick={() => updateField('scholarshipPremiumEnabled', !monetization.scholarshipPremiumEnabled)}
                    className={`w-10 h-5 rounded-full relative transition-all ${monetization.scholarshipPremiumEnabled ? 'bg-indigo-600' : 'bg-slate-200'}`}
                  >
                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${monetization.scholarshipPremiumEnabled ? 'right-1' : 'left-1'}`} />
                  </button>
                </div>

                <div className="p-6 bg-white border border-slate-100 rounded-3xl flex items-center justify-between">
                   <div className="flex gap-4 items-center">
                     <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl"><Wallet className="w-5 h-5" /></div>
                     <div>
                       <p className="text-sm font-black text-slate-900">Alumni Donations</p>
                       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Community Fundraising</p>
                     </div>
                   </div>
                   <button 
                    onClick={() => updateField('alumniDonationsEnabled', !monetization.alumniDonationsEnabled)}
                    className={`w-10 h-5 rounded-full relative transition-all ${monetization.alumniDonationsEnabled ? 'bg-rose-600' : 'bg-slate-200'}`}
                  >
                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${monetization.alumniDonationsEnabled ? 'right-1' : 'left-1'}`} />
                  </button>
                </div>

                <div className="p-6 bg-white border border-slate-100 rounded-3xl flex items-center justify-between">
                   <div className="flex gap-4 items-center">
                     <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl"><BarChart2 className="w-5 h-5" /></div>
                     <div>
                       <p className="text-sm font-black text-slate-900">National Analytics Hub</p>
                       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">MoET Integration</p>
                     </div>
                   </div>
                   <span className="text-[8px] font-black px-2 py-1 bg-emerald-100 text-emerald-700 rounded uppercase">Active</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-slate-50 p-8 rounded-[48px] border border-slate-200/50 space-y-6">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Recent Invoices</h4>
            <div className="space-y-3">
              {recentTransactions.map(t => (
                <div key={t.id} className="p-4 bg-white rounded-2xl border border-slate-100 flex justify-between items-center group cursor-pointer hover:shadow-md transition-all">
                  <div>
                    <p className="text-xs font-black text-slate-900">{t.description}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{t.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black text-slate-900">E{t.amount}</p>
                    <span className="text-[8px] font-black uppercase text-emerald-500">Paid via {t.method}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-4 bg-white border-2 border-slate-200 rounded-2xl text-[10px] font-black text-slate-900 uppercase tracking-widest hover:bg-slate-100 transition-colors">Download Full History</button>
          </div>

          <div className="p-10 bg-indigo-600 rounded-[48px] text-white space-y-6 shadow-2xl shadow-indigo-200">
            <div className="flex justify-between items-start">
               <h3 className="text-[10px] font-black uppercase tracking-widest opacity-60">Revenue Projection</h3>
               <TrendingUp className="w-5 h-5" />
            </div>
            <p className="text-4xl font-black tracking-tight leading-none">E12,450</p>
            <p className="text-xs font-medium opacity-60">Projected fee collection for next 30 days via MoMo Gateway.</p>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
               <div className="w-[65%] h-full bg-white" />
            </div>
            <p className="text-[9px] font-black uppercase tracking-widest">65% of Target Reached</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonetizationHub;
