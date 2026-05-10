import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Star, 
  Search, 
  Filter, 
  Calendar,
  MessageSquare,
  Award,
  Video,
  MonitorPlay,
  PenTool,
  X,
  Clock
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
    status: 'available',
    meetingType: 'Platform Virtual Classroom',
    slots: [
      { id: '1', date: new Date(Date.now() + 86400000).toISOString().split('T')[0], time: '14:00' },
      { id: '2', date: new Date(Date.now() + 86400000).toISOString().split('T')[0], time: '15:30' },
      { id: '3', date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], time: '09:00' }
    ]
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
    status: 'busy',
    meetingType: 'Platform Virtual Classroom',
    slots: [
      { id: '4', date: new Date(Date.now() + 86400000).toISOString().split('T')[0], time: '10:00' }
    ]
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
    status: 'available',
    meetingType: 'Platform Virtual Classroom',
    slots: []
  }
];

const TutoringMarketplace: React.FC = () => {
  const navigate = useNavigate();
  const [bookingTutor, setBookingTutor] = useState<typeof mockTutors[0] | null>(null);
  const [sessionDate, setSessionDate] = useState<string>('');
  const [sessionTime, setSessionTime] = useState<string>('');

  const handleBooking = () => {
    if (!sessionDate || !sessionTime || !bookingTutor) return;
    const checkoutUrl = `/payment-checkout?amount=${bookingTutor.hourlyRate}&ref=BOOK-${bookingTutor.id}-${Date.now()}&tx=TUTOR-${Date.now()}&date=${sessionDate}&time=${sessionTime}`;
    navigate(checkoutUrl);
  };

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
            Connect with Eswatini's top-rated professional educators and conduct seamless, high-quality lessons directly on our platform.
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <Link to="/classroom" className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-lg">
              <MonitorPlay className="w-5 h-5" /> Enter Virtual Classroom
            </Link>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
              Looking for free peer help? <Link to="/resources" className="text-indigo-600 hover:underline">Check out Peer Tutoring</Link>
            </p>
          </div>
        </div>

        {/* Built-in Virtual Classroom Promo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 bg-indigo-600 text-white rounded-[32px] overflow-hidden relative">
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black tracking-tight">HD Video Calling</h3>
              <p className="text-indigo-100 font-medium leading-relaxed">No external apps required. Start crystal-clear face-to-face video lessons directly from your browser.</p>
            </div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/5 rounded-full blur-[40px] pointer-events-none" />
          </div>
          <div className="p-8 bg-blue-500 text-white rounded-[32px] overflow-hidden relative">
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <PenTool className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black tracking-tight">Interactive Whiteboard</h3>
              <p className="text-blue-100 font-medium leading-relaxed">Collaborate in real-time. Draw diagrams, solve math problems, and annotate notes together instantly.</p>
            </div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/5 rounded-full blur-[40px] pointer-events-none" />
          </div>
          <div className="p-8 bg-emerald-500 text-white rounded-[32px] overflow-hidden relative">
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <MonitorPlay className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black tracking-tight">Screen Sharing</h3>
              <p className="text-emerald-100 font-medium leading-relaxed">Share presentations, documents, or your entire screen with a single click during your sessions.</p>
            </div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/5 rounded-full blur-[40px] pointer-events-none" />
          </div>
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

        {/* Professional Pivot / Tutor Monetization Promo */}
        <div className="bg-slate-900 rounded-[48px] p-10 md:p-16 text-white relative overflow-hidden group">
           <div className="relative z-10 max-w-2xl">
             <span className="px-3 py-1 bg-white/10 text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 inline-block">Educator Opportunity</span>
             <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">Are you a professional educator?</h2>
             <p className="text-slate-400 text-lg font-medium mb-8">
               Join our verified tutor network. For just <strong className="text-white">E50.00/month</strong>, you can list your services and reach thousands of students. We only take a <strong className="text-white">10-15% commission</strong> on your bookings.
             </p>
             <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-emerald-500 text-slate-900 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-white transition-all shadow-xl">Start Tutoring</button>
                <button className="px-8 py-4 bg-white/10 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-white/20 transition-all border border-white/10">Learn More</button>
             </div>
           </div>
           <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-emerald-500/20 to-transparent pointer-events-none" />
           <Award className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5 rotate-12" />
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
                    
                    <div className="space-y-4 mb-6">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Subjects</p>
                          <p className="text-sm font-bold text-slate-900">{tutor.subjects.join(', ')}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Level</p>
                          <p className="text-sm font-bold text-slate-900">{tutor.level}</p>
                        </div>
                        <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
                           <Video className="w-4 h-4 text-indigo-600" />
                           <span className="text-xs font-bold text-slate-700">{tutor.meetingType}</span>
                        </div>
                    </div>

                    <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                         <p className="text-lg font-black text-slate-900">E{tutor.hourlyRate}<span className="text-xs font-medium text-slate-400">/hr</span></p>
                         <div className="flex gap-2">
                           <Link to="/classroom" className="px-4 py-3 bg-slate-100 text-slate-700 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-colors shadow-sm flex items-center gap-1">
                             <Video className="w-4 h-4" /> Preview
                           </Link>
                           <button onClick={() => setBookingTutor(tutor)} className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-900 transition-colors shadow-lg">
                              Book
                           </button>
                         </div>
                    </div>
                </div>
             </motion.div>
           ))}
        </div>
      </div>

      {/* Booking Modal */}
      {bookingTutor && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
               <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                 <Calendar className="w-5 h-5 text-indigo-600" /> Schedule Session
               </h3>
               <button onClick={() => setBookingTutor(null)} className="text-slate-400 hover:text-slate-600">
                 <X className="w-5 h-5" />
               </button>
            </div>
            
            <div className="p-6 space-y-6">
               <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <img src={bookingTutor.image} className="w-12 h-12 rounded-full object-cover" alt="" />
                  <div>
                     <p className="text-sm font-black text-slate-900">{bookingTutor.name}</p>
                     <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-600">E{bookingTutor.hourlyRate}/Hr</p>
                  </div>
               </div>

               <div>
                 <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Select Date</label>
                 <select
                   value={sessionDate}
                   onChange={e => {
                      setSessionDate(e.target.value);
                      setSessionTime('');
                   }}
                   className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none appearance-none" 
                 >
                   <option value="" disabled>Select available date</option>
                   {Array.from(new Set(bookingTutor?.slots?.map(s => s.date))).sort().map(d => (
                     <option key={d} value={d}>{d}</option>
                   ))}
                   {(!bookingTutor?.slots || bookingTutor.slots.length === 0) && (
                     <option value="" disabled>No dates available</option>
                   )}
                 </select>
               </div>

               <div>
                 <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Select Available Slot</label>
                 <div className="relative">
                   <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                   <select 
                     value={sessionTime}
                     onChange={e => setSessionTime(e.target.value)}
                     disabled={!sessionDate}
                     className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none appearance-none disabled:opacity-50" 
                   >
                     <option value="" disabled>Select a time slot</option>
                     {bookingTutor?.slots?.filter(s => s.date === sessionDate).map(slot => (
                       <option key={slot.id} value={slot.time}>{slot.time}</option>
                     ))}
                   </select>
                 </div>
                 {sessionDate && (
                   <p className="text-[9px] text-slate-500 mt-2 font-medium">These are the available slots for the selected date.</p>
                 )}
               </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
               <button 
                 onClick={() => setBookingTutor(null)}
                 className="px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-200 transition-colors"
               >
                 Cancel
               </button>
               <button 
                 onClick={handleBooking}
                 disabled={!sessionDate || !sessionTime}
                 className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-colors shadow-lg disabled:opacity-50 flex items-center gap-2"
               >
                 Proceed to Payment
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutoringMarketplace;

