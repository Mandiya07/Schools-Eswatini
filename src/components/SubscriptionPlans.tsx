
import React from 'react';
import { SubscriptionPlan } from '../../types';
import { Check, Star, Zap, Shield, Layout } from 'lucide-react';

interface Plan {
  id: SubscriptionPlan;
  name: string;
  price: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  color: string;
  popular?: boolean;
}

const plans: Plan[] = [
  {
    id: SubscriptionPlan.FREE,
    name: 'Free Listing',
    price: 'SZL 0',
    description: 'Basic visibility for your institution.',
    features: [
      'Basic profile listing',
      'Contact information',
      'Up to 5 photos',
      'Standard search ranking'
    ],
    icon: <Layout className="w-6 h-6" />,
    color: 'bg-slate-100 text-slate-600'
  },
  {
    id: SubscriptionPlan.PREMIUM,
    name: 'Premium Listing',
    price: 'SZL 2,500/yr',
    description: 'Stand out from the crowd with featured placement.',
    features: [
      'Featured placement in search',
      'Verified badge',
      'Unlimited photos & videos',
      'Priority support',
      'Homepage spotlight rotation'
    ],
    icon: <Star className="w-6 h-6" />,
    color: 'bg-blue-100 text-blue-600',
    popular: true
  },
  {
    id: SubscriptionPlan.ANALYTICS,
    name: 'Advanced Analytics',
    price: 'SZL 4,500/yr',
    description: 'Data-driven insights to grow your enrollment.',
    features: [
      'Everything in Premium',
      'Detailed visitor demographics',
      'Competitor benchmarking',
      'Conversion tracking',
      'Monthly performance reports'
    ],
    icon: <Zap className="w-6 h-6" />,
    color: 'bg-indigo-100 text-indigo-600'
  },
  {
    id: SubscriptionPlan.BRANDING,
    name: 'Custom Branding',
    price: 'SZL 7,500/yr',
    description: 'A fully branded experience for your school.',
    features: [
      'Everything in Analytics',
      'Custom subdomain (school.schools.sz)',
      'Custom colors & fonts',
      'White-label profile',
      'Ad-free experience'
    ],
    icon: <Shield className="w-6 h-6" />,
    color: 'bg-emerald-100 text-emerald-600'
  }
];

interface SubscriptionPlansProps {
  currentPlan?: SubscriptionPlan;
  onSelect: (plan: SubscriptionPlan) => void;
}

const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({ currentPlan, onSelect }) => {
  return (
    <div className="py-12">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">Choose Your Growth Plan</h2>
        <p className="text-slate-500 max-w-2xl mx-auto font-medium">
          Whether you're a small primary school or a large university, we have a plan to help you reach more students and parents across Eswatini.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {plans.map((plan) => (
          <div 
            key={plan.id}
            className={`relative flex flex-col p-8 rounded-[48px] border transition-all duration-300 ${
              plan.popular 
                ? 'border-blue-600 shadow-2xl shadow-blue-100 scale-105 z-10' 
                : 'border-slate-100 bg-white hover:border-blue-200 hover:shadow-xl'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                Most Popular
              </div>
            )}

            <div className={`w-12 h-12 rounded-2xl ${plan.color} flex items-center justify-center mb-6`}>
              {plan.icon}
            </div>

            <h3 className="text-xl font-black text-slate-900 mb-1">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-3xl font-black text-slate-900">{plan.price}</span>
            </div>
            <p className="text-sm text-slate-500 font-medium mb-8 leading-relaxed">
              {plan.description}
            </p>

            <ul className="space-y-4 mb-10 flex-grow">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs font-bold text-slate-600">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => onSelect(plan.id)}
              disabled={currentPlan === plan.id}
              className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all ${
                currentPlan === plan.id
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : plan.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              {currentPlan === plan.id ? 'Current Plan' : 'Select Plan'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlans;
