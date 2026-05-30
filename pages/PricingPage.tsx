import React from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import SubscriptionPlans from '../src/components/SubscriptionPlans';
import { SubscriptionPlan, User, UserRole } from '../types';
import { ShieldAlert, LogIn, ChevronRight, LayoutDashboard } from 'lucide-react';

interface PricingPageProps {
  user: User | null;
}

const PricingPage: React.FC<PricingPageProps> = ({ user }) => {
  const navigate = useNavigate();

  const handleSelectPlan = (planId: SubscriptionPlan) => {
    if (user) {
      if (user.role === UserRole.INSTITUTION_ADMIN) {
        navigate(`/dashboard`);
      } else {
        // If they are another role, navigating to dashboard will show their current dashboard.
        // It might be useful to show a message or just let them go to dashboard.
        navigate(`/dashboard`);
      }
    } else {
      navigate(`/auth?tab=register&plan=${planId}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header section */}
      <div className="bg-slate-900 py-24 text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-900 to-slate-900"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
              Transparent Pricing
            </span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6 leading-tight"
          >
            Empower Your Institution with <span className="text-blue-400">Schools Eswatini</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 font-medium max-w-2xl mx-auto mb-10"
          >
            Choose the right subscription plan to digitize operations, boost visibility, and manage admissions efficiently across Eswatini.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="#plans" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95 flex items-center gap-2">
              View Plans <ChevronRight className="w-5 h-5" />
            </a>
            {!user ? (
              <Link to="/auth" className="bg-white/10 hover:bg-white/20 text-white backdrop-blur border border-white/10 px-8 py-4 rounded-xl font-bold transition-all active:scale-95 flex items-center gap-2">
                <LogIn className="w-5 h-5" /> Sign In
              </Link>
            ) : (
              <Link to="/dashboard" className="bg-white/10 hover:bg-white/20 text-white backdrop-blur border border-white/10 px-8 py-4 rounded-xl font-bold transition-all active:scale-95 flex items-center gap-2">
                <LayoutDashboard className="w-5 h-5" /> Go to Dashboard
              </Link>
            )}
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 pb-24" id="plans">
        <SubscriptionPlans onSelect={handleSelectPlan} />
        
        <div className="mt-16 bg-white border border-slate-200 rounded-[32px] p-8 md:p-12 shadow-sm text-center max-w-4xl mx-auto">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-4">
            How to Purchase
          </h2>
          <p className="text-slate-600 font-medium text-base md:text-lg mb-8 max-w-2xl mx-auto">
            Ready to upgrade? Select your preferred plan above. You will be redirected to the secure registration portal. Once registered, navigate to the Institution Admin Dashboard where you can finalize your subscription via our MoMo integration or request an invoice for manual bank transfers.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="text-blue-600 font-black text-xl mb-2">1. Select</div>
              <p className="text-sm text-slate-600 font-medium">Choose a plan that fits your institution's needs by clicking 'Select Plan'.</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="text-blue-600 font-black text-xl mb-2">2. Register</div>
              <p className="text-sm text-slate-600 font-medium">Create your institution administrator account through the portal.</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="text-blue-600 font-black text-xl mb-2">3. Purchase</div>
              <p className="text-sm text-slate-600 font-medium">Activate via dashboard using MTN Mobile Money or direct EFT request.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
