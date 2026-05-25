import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  Download, 
  Star, 
  Verified, 
  Search, 
  Filter, 
  TrendingUp,
  Award,
  Loader2
} from 'lucide-react';
import { resourceService, Resource } from '../src/services/resourceService';
import { auth } from '../src/lib/firebase';

const CATEGORIES = ["All Subjects", "Mathematics", "Science", "Languages", "Business", "Humanities", "Past Papers", "Notes"];

const EducatorMarketplace: React.FC = () => {
  const navigate = useNavigate();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState("All Subjects");

  useEffect(() => {
    fetchResources();
  }, [activeCategory]);

  const fetchResources = async () => {
    setLoading(true);
    const filters: any = {};
    if (activeCategory !== "All Subjects") {
      // Simplistic mapping for now
      if (activeCategory === "Past Papers") filters.type = "Past Paper";
      else if (activeCategory === "Notes") filters.type = "Notes";
      else filters.subject = activeCategory;
    }
    
    const data = await resourceService.getResources(filters);
    setResources(data);
    setLoading(false);
  };

  const handlePurchase = async (resource: Resource) => {
    if (!auth.currentUser) {
      alert("Please sign in to purchase resources.");
      return;
    }

    if (resource.price === 0) {
      alert("Starting download...");
      return;
    }

    try {
      // Create a pending transaction
      const txId = await resourceService.createTransaction({
        resourceId: resource.id,
        buyerId: auth.currentUser.uid,
        sellerId: resource.sellerId,
        amount: resource.price,
        paymentMethod: 'momo' // Default to momo
      });

      if (txId) {
        // Redirect to checkout
        navigate(`/payment-checkout?tx=${txId}&ref=${resource.title.substring(0, 10)}&amount=${resource.price}`);
      }
    } catch (error) {
      console.error("Purchase error:", error);
      alert("Failed to initialize purchase. Please try again.");
    }
  };

  const filteredResources = resources.filter(r => 
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.sellerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
           <div className="max-w-2xl">
             <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center shadow-inner">
                  <Award className="w-6 h-6" />
                </div>
                <span className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                   Verified Educator Marketplace
                </span>
             </div>
             <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none mb-6">
               Premium Study Materials
             </h1>
             <p className="text-xl text-slate-500 font-medium leading-relaxed">
               Buy and sell high-quality revision notes, past paper solutions, and study guides created by the top educators in Eswatini. 
             </p>
           </div>
           
           <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 flex items-center gap-6 shrink-0">
             <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Total Payouts to Teachers</p>
                <p className="text-2xl font-black text-emerald-600">E142,500+</p>
             </div>
             <button className="px-6 py-4 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-amber-500 transition-colors shadow-xl">
               Become a Seller
             </button>
           </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4">
           <div className="flex-1 relative">
             <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
             <input 
               type="text" 
               placeholder="Search by subject, level, or author..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full bg-white border border-slate-200 rounded-2xl pl-16 pr-6 py-5 text-sm font-bold shadow-sm focus:ring-2 focus:ring-amber-500 transition-all outline-none"
             />
           </div>
           <button className="px-8 py-5 bg-white border border-slate-200 rounded-2xl flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-all shadow-sm">
             <Filter className="w-4 h-4" /> Filters
           </button>
        </div>

        {/* Categories */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
           {CATEGORIES.map(cat => (
             <button 
               key={cat} 
               onClick={() => setActiveCategory(cat)}
               className={`px-6 py-3 border rounded-full text-xs font-bold transition-all whitespace-nowrap shrink-0 shadow-sm ${activeCategory === cat ? 'bg-amber-500 text-white border-amber-500' : 'bg-white text-slate-600 border-slate-100 hover:border-amber-400 hover:text-amber-600'}`}
             >
               {cat}
             </button>
           ))}
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="w-12 h-12 text-amber-500 animate-spin" />
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Curating resources...</p>
          </div>
        ) : filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredResources.map((product) => (
              <motion.div 
                 key={product.id}
                 whileHover={{ y: -8 }}
                 onClick={() => handlePurchase(product)}
                 className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden flex flex-col group cursor-pointer"
              >
                 <div className="relative h-48 bg-slate-100 overflow-hidden">
                    <img src={product.thumbnail || "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={product.title} />
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                       <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm backdrop-blur-md bg-amber-400 text-slate-900 border border-amber-300">
                          <Verified className="w-3 h-3 inline pb-0.5 mr-1" />
                          Verified
                       </span>
                    </div>
                 </div>
                 <div className="p-8 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{product.level} • {product.subject}</p>
                        <h3 className="text-lg font-black text-slate-900 leading-tight group-hover:text-amber-600 transition-colors">{product.title}</h3>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 mt-2 mb-6">
                      <div className="flex items-center text-amber-500">
                         <Star className="w-4 h-4 fill-current" />
                         <span className="text-xs font-bold ml-1 text-slate-700">4.9</span>
                      </div>
                      <span className="text-xs font-medium text-slate-400">(Verified)</span>
                    </div>

                    <div className="mt-auto pt-6 border-t border-slate-100 flex items-end justify-between">
                      <div>
                         <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">By {product.sellerName}</p>
                         <p className="text-[9px] text-slate-400">Verified Educator</p>
                      </div>
                      <div className="text-right">
                         <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Price</p>
                         <p className="text-xl font-black text-slate-900">E{product.price}</p>
                      </div>
                    </div>
                 </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[40px] p-20 text-center border border-dashed border-slate-200">
            <BookOpen className="w-16 h-16 text-slate-200 mx-auto mb-6" />
            <h3 className="text-2xl font-black text-slate-900 mb-2">No resources found</h3>
            <p className="text-slate-500 font-medium max-w-md mx-auto">We couldn't find any resources matching your current filters. Try a different category or search term.</p>
          </div>
        )}

        {/* Sell Promo Banner */}
        <div className="mt-20 bg-slate-900 rounded-[48px] p-12 lg:p-20 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden text-white">
           <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
           <div className="relative z-10 max-w-2xl space-y-6">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Are you a top educator in Eswatini?</h2>
              <p className="text-lg text-slate-400">Monetize your expertise. Choose a small monthly subscription to list as a professional, or leverage our high-traffic platform with a commission-based model. You keep up to 90% of your earnings.</p>
              <div className="flex items-center gap-6 pt-4">
                 <div className="flex items-center gap-2">
                   <TrendingUp className="w-5 h-5 text-amber-400" />
                   <span className="text-sm font-bold text-white">Passive Income</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <Verified className="w-5 h-5 text-emerald-400" />
                   <span className="text-sm font-bold text-white">Verified Platform</span>
                 </div>
              </div>
           </div>
           <button className="relative z-10 shrink-0 px-10 py-6 bg-amber-400 text-slate-900 rounded-[32px] text-xs font-black uppercase tracking-widest hover:bg-white hover:-translate-y-2 transition-all shadow-xl">
              Start Selling Today →
           </button>
        </div>

      </div>
    </div>
  );
};

export default EducatorMarketplace;
