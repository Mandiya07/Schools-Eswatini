
import React from 'react';
import { motion } from 'motion/react';
import { 
  Megaphone, 
  Target, 
  BarChart3, 
  Users, 
  Eye, 
  MousePointer2, 
  CheckCircle2, 
  Star,
  MapPin,
  TrendingUp
} from 'lucide-react';

const AdvertisingPage: React.FC = () => {
  const adPlacements = [
    {
      title: "Homepage Hero Banner",
      description: "Maximum visibility on the main entry point for all users.",
      price: "E2,500 / month",
      reach: "50,000+ views",
      features: ["Full width display", "Interactive CTA", "Animated transitions"]
    },
    {
      title: "Regional Search Results",
      description: "Target parents searching for schools in specific regions.",
      price: "E1,500 / month",
      reach: "25,000+ targeted views",
      features: ["Region-specific targeting", "Sidebar placement", "Search keyword triggering"]
    },
    {
      title: "Institution Sidebar Ads",
      description: "Place your brand alongside specific educational categories.",
      price: "E1,000 / month",
      reach: "15,000+ niche views",
      features: ["Category-based targeting", "Static sidebar widget", "High intent traffic"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8 overflow-hidden bg-slate-900 text-white">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                <Megaphone className="w-5 h-5 text-white" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Advertise with Schools Eswatini</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-8"
            >
              Reach the Heart of <span className="text-blue-500">Education</span> in Eswatini.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-400 font-medium leading-relaxed mb-10 max-w-2xl"
            >
              Connect your brand with thousands of parents, students, and educators daily. Targeted regional placement for uniform suppliers, bookstores, and financial institutions.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <button className="px-8 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/40">
                View Media Kit
              </button>
              <button className="px-8 py-5 bg-white/10 text-white border border-white/20 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-white/20 transition-all">
                Contact Ad Sales
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 lg:px-8 border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { label: "Active Monthly Users", val: "150K+", icon: Users },
              { label: "Daily Page Views", val: "450K+", icon: Eye },
              { label: "CTR for Relevant Ads", val: "3.2%", icon: MousePointer2 },
              { label: "Verified Institutions", val: "850+", icon: CheckCircle2 },
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <stat.icon className="w-6 h-6 text-blue-600 mb-4" />
                <p className="text-4xl font-black text-slate-900">{stat.val}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Placement Options */}
      <section className="py-32 px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">Targeted Ad Placements</h2>
            <p className="text-slate-500 font-medium max-w-2xl mx-auto">Choose where your brand appears based on user intent and regional relevance.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {adPlacements.map((ad, i) => (
              <div key={i} className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white mb-8 group-hover:bg-blue-600 transition-colors">
                  <Star className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4">{ad.title}</h3>
                <p className="text-sm text-slate-500 font-medium mb-8 leading-relaxed">{ad.description}</p>
                
                <div className="space-y-4 mb-10 pt-6 border-t border-slate-50">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Starting Price</span>
                    <span className="text-lg font-black text-blue-600">{ad.price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Est. Reach</span>
                    <span className="text-sm font-bold text-slate-700">{ad.reach}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-10">
                  {ad.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-[10px] font-bold text-slate-600 uppercase tracking-wide">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button className="w-full py-4 bg-slate-50 text-slate-900 rounded-2xl font-black uppercase tracking-widest text-[10px] border border-slate-200 hover:bg-blue-600 hover:text-white transition-all">
                  Book This Placement
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Schools Eswatini */}
      <section className="py-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">Why local businesses trust <span className="text-blue-500">Schools Eswatini</span>.</h2>
              <p className="text-xl text-slate-500 font-medium leading-relaxed">
                We are more than just a directory; we are the primary resource for every major educational decision in Eswatini. 
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Regional Precision", desc: "Target Hhohho, Manzini, Lubombo or Shiselweni specifically.", icon: MapPin },
                  { title: "User Context", desc: "Display ads to users who are currently looking for books, uniforms, or loans.", icon: Target },
                  { title: "Real-time Metrics", desc: "Access a live dashboard to track clicks and impressions for your campaign.", icon: BarChart3 },
                  { title: "High Conversion", desc: "Our users are in 'decision-making mode', leading to higher intent interactions.", icon: TrendingUp },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 border border-blue-100">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 rounded-[64px] p-12 lg:p-20 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full filter blur-3xl" />
               <h3 className="text-3xl font-black mb-8 leading-tight">Ready to boost your local business?</h3>
               <p className="text-slate-400 font-medium leading-relaxed mb-10">
                 Join over 50 local suppliers and financial institutions who are reaching their target audience directly through our platform.
               </p>
               
               <form className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Company Name" 
                    className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-sm font-bold text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <input 
                    type="email" 
                    placeholder="Business Email" 
                    className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-sm font-bold text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <select className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-sm font-bold text-white/50 focus:ring-2 focus:ring-blue-500 outline-none appearance-none">
                    <option value="">Interested Placement</option>
                    <option value="hero">Hero Banner</option>
                    <option value="search">Search Results</option>
                    <option value="sidebar">Sidebar Widget</option>
                  </select>
                  <button className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-xl hover:bg-blue-700 transition-all pt-10">
                    Submit RFP
                  </button>
               </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdvertisingPage;
