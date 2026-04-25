import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Star, 
  Search, 
  Filter, 
  Calendar,
  MessageSquare,
  Award,
  Verified
} from 'lucide-react';

const mockTutors = [
  {
    id: 'tutor-1',
    name: 'Mrs. N. Dlamini',
    role: 'Biology Specialist',
    rating: 4.9,
    reviews: 124,
    subjects: ['Biology', 'Chemistry'],
    level: 'Form 5 / EGCSE',
    hourlyRate: 150,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    status: 'available'
  },
  {
    id: 'tutor-2',
    name: 'Mr. S. Mthethwa',
    role: 'Mathematics Expert',
    rating: 4.8,
    reviews: 89,
    subjects: ['Mathematics', 'Physics'],
    level: 'Form 5 / IGCSE',
    hourlyRate: 200,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    status: 'busy'
  },
  {
    id: 'tutor-3',
    name: 'Dr. Z. Zwane',
    role: 'Languages & Linguistics',
    rating: 4.7,
    reviews: 56,
    subjects: ['SiSwati', 'English'],
    level: 'Form 3-5',
    hourlyRate: 180,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    status: 'available'
  }
];

const TutoringMarketplace: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header Section */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center shadow-inner">
              <MessageSquare className="w-6 h-6" />
            </div>
            <span className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
               Verified Tutor Marketplace
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none mb-6">
            Find Your Expert Tutor
          </h1>
          <p className="text-xl text-slate-500 font-medium leading-relaxed mb-6">
            Connect with Eswatini's top-rated professional educators for personalized, one-on-one tutoring sessions.
          </p>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
            Looking for free peer help? <Link to="/resources" className="text-indigo-600 hover:underline">Check out Peer Tutoring</Link>
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4">
           <div className="flex-1 relative">
             <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
             <input 
               type="text" 
               placeholder="Search by subject, level, or name..." 
               className="w-full bg-white border border-slate-200 rounded-2xl pl-16 pr-6 py-5 text-sm font-bold shadow-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
             />
           </div>
           <button className="px-8 py-5 bg-white border border-slate-200 rounded-2xl flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-all shadow-sm">
             <Filter className="w-4 h-4" /> Filters
           </button>
        </div>

        {/* Tutor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {mockTutors.map((tutor) => (
             <motion.div 
                key={tutor.id}
                whileHover={{ y: -8 }}
                className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden flex flex-col group"
             >
                <div className="p-8 flex items-center gap-6">
                    <img src={tutor.image} className="w-20 h-20 rounded-full object-cover" alt={tutor.name} />
                    <div>
                        <h3 className="text-lg font-black text-slate-900">{tutor.name}</h3>
                        <p className="text-[10px] font-black uppercase tracking-widest text-indigo-600">{tutor.role}</p>
                    </div>
                </div>
                <div className="px-8 pb-8 flex-1 flex flex-col">
                    <div className="flex justify-between mb-4">
                         <div className="flex items-center text-amber-500">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-xs font-bold ml-1 text-slate-700">{tutor.rating}</span>
                            <span className="text-xs font-medium text-slate-400 ml-1">({tutor.reviews} reviews)</span>
                         </div>
                         <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${tutor.status === 'available' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                            {tutor.status}
                         </span>
                    </div>
                    
                    <div className="space-y-2 mb-6">
                        <p className="text-xs font-bold text-slate-500">Subjects: <span className="text-slate-900">{tutor.subjects.join(', ')}</span></p>
                        <p className="text-xs font-bold text-slate-500">Level: <span className="text-slate-900">{tutor.level}</span></p>
                    </div>

                    <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                         <p className="text-lg font-black text-slate-900">E{tutor.hourlyRate}<span className="text-xs font-medium text-slate-400">/hr</span></p>
                         <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-900 transition-colors shadow-lg">
                            Book Session
                         </button>
                    </div>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default TutoringMarketplace;
