
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  Clock, 
  MapPin, 
  HeartPulse,
  Layout,
  Users2,
  AlertCircle,
  Star,
  Video as VideoIcon
} from 'lucide-react';
import { User, UserRole, InstitutionType, WellnessArticle } from '../types';
import { db, doc, getDoc, getDocWithRetry } from '../src/lib/firebase';
import { AcademicsView } from '../src/components/dashboard/StudentPortals/AcademicsView';
import { WellnessView } from '../src/components/dashboard/StudentPortals/WellnessView';
import { CareerView } from '../src/components/dashboard/StudentPortals/CareerView';
import { CampusLifeView } from '../src/components/dashboard/StudentPortals/CampusLifeView';

const WELLNESS_ARTICLES: WellnessArticle[] = [
  { id: 1, title: '5 Ways to Beat Exam Anxiety', desc: 'Practical breathing techniques and study planning to keep you centered during mocks.', readTime: '5 min' },
  { id: 2, title: 'Time Management for Form 5', desc: 'How to balance extracurriculars, study sessions, and personal rest time effectively.', readTime: '8 min' },
  { id: 3, title: 'Understanding Burnout', desc: 'Recognizing the signs of academic fatigue and knowing when it\'s time to step back.', readTime: '6 min' },
];

const LOCAL_HOTLINES = [
  { name: 'Childline Eswatini', number: '116', desc: 'Toll-free 24/7 counseling and support for children and young adults.' },
  { name: 'SWAGAA', number: '951', desc: 'Swaziland Action Group Against Abuse (Toll-free).' },
  { name: 'Emergency Police', number: '999', desc: 'Immediate emergency police response.' },
];

interface StudentDashboardProps {
  user?: User | null;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ user }) => {
  const [simulatedRole, setSimulatedRole] = useState<UserRole | null>(null);
  const [activeTab, setActiveTab] = useState<'academics' | 'wellness' | 'career' | 'campus' | 'virtual_classroom'>('academics');
  const [institutionType, setInstitutionType] = useState<InstitutionType | null>(null);

  React.useEffect(() => {
    const fetchInstitutionDetails = async () => {
      if (user?.institutionId) {
        try {
          const instDoc = await getDocWithRetry(doc(db, 'institutions', user.institutionId));
          if (instDoc && instDoc.exists()) {
            const data = instDoc.data() as any;
            if (data.type && data.type.length > 0) {
              setInstitutionType(data.type[0] as InstitutionType);
            }
          }
        } catch (error) {
          // Only log if it's not a standard offline issue that we've already tried to handle
          if (error instanceof Error && !error.message.includes('offline')) {
            console.error("Error fetching institution details:", error);
          } else {
            console.warn("Institution details fetch failed (likely offline). Using defaults.");
          }
        }
      }
    };

    fetchInstitutionDetails();
  }, [user?.institutionId]);

  const isStudent = simulatedRole === UserRole.STUDENT || user?.role === UserRole.STUDENT;

  if (!isStudent && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
         <div className="text-center space-y-8 max-w-md mx-auto p-10 bg-white rounded-[40px] shadow-xl border border-slate-100">
           <AlertCircle className="w-16 h-16 text-rose-500 mx-auto" />
           <div>
             <h2 className="text-2xl font-black text-slate-900">Access Restricted</h2>
             <p className="text-slate-500 mt-2">You must be logged in as a Student to view this portal.</p>
           </div>
           
           <div className="pt-8 border-t border-slate-100 space-y-4">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Demo Mode (Testing Only)</p>
             <button 
               onClick={() => setSimulatedRole(UserRole.STUDENT)}
               className="w-full px-6 py-3 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl font-black uppercase tracking-widest text-[10px] transition-colors"
             >
               Enter Demo as Student
             </button>
           </div>
         </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header section */}
        <header className="bg-white p-8 md:p-10 rounded-[40px] shadow-sm border border-slate-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
            <div className="flex items-center gap-6">
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                Welcome back, {user?.name || 'Sipho'}.
              </h1>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">View As:</span>
              <select 
                value={institutionType || ''}
                onChange={(e) => setInstitutionType(e.target.value as InstitutionType)}
                className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="">Default (High School)</option>
                <option value={InstitutionType.PRIMARY}>Primary School</option>
                <option value={InstitutionType.HIGH_SCHOOL}>High School</option>
                <option value={InstitutionType.TERTIARY}>Tertiary / University</option>
              </select>
            </div>
          </div>
        </header>

        {/* Global Tabs */}
        <div className="flex flex-wrap gap-4">
          <button onClick={() => setActiveTab('academics')} className={`px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-3 transition-all ${activeTab === 'academics' ? 'bg-slate-900 text-white shadow-xl' : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'}`}>
            Academics
          </button>

          <button onClick={() => setActiveTab('virtual_classroom')} className={`px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-3 transition-all ${activeTab === 'virtual_classroom' ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-500/20' : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'}`}>
            <VideoIcon className="w-4 h-4" /> Live Classroom
          </button>
          
          <button onClick={() => setActiveTab('wellness')} className={`px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-3 transition-all ${activeTab === 'wellness' ? 'bg-rose-500 text-white shadow-xl' : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'}`}>
            <HeartPulse className="w-4 h-4" /> Wellness
          </button>

          {institutionType !== InstitutionType.PRIMARY && (
            <button onClick={() => setActiveTab('career')} className={`px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-3 transition-all ${activeTab === 'career' ? 'bg-amber-500 text-white shadow-xl' : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'}`}>
              <Star className="w-4 h-4" /> Career
            </button>
          )}

          {institutionType === InstitutionType.TERTIARY && (
            <button onClick={() => setActiveTab('campus')} className={`px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-3 transition-all ${activeTab === 'campus' ? 'bg-indigo-600 text-white shadow-xl' : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'}`}>
              <Users2 className="w-4 h-4" /> Campus
            </button>
          )}
        </div>

        {/* Main Content Area */}
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
            {activeTab === 'academics' && <AcademicsView institutionType={institutionType} user={user} />}
            {activeTab === 'virtual_classroom' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-12 bg-emerald-900 rounded-[48px] text-white relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-12 opacity-10">
                      <VideoIcon className="w-48 h-48" />
                   </div>
                   <div className="relative z-10 space-y-6">
                      <span className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/30">Active Online Schooling</span>
                      <h2 className="text-5xl font-black tracking-tight leading-tight italic">Your Classroom is Live.</h2>
                      <p className="text-emerald-200/70 font-medium max-w-lg text-lg">
                        Join your teachers and classmates in the virtual environment. Remember to keep your microphone muted when entering.
                      </p>
                      <div className="flex gap-4">
                        <button 
                          onClick={() => window.open('/classroom', '_blank')}
                          className="px-10 py-5 bg-emerald-500 text-emerald-950 rounded-3xl font-black uppercase tracking-widest text-[10px] flex items-center gap-3 hover:bg-white transition-all shadow-2xl"
                        >
                           Enter Classroom
                           <Layout className="w-4 h-4" />
                        </button>
                        <button className="px-10 py-5 bg-white/10 border border-white/20 text-white rounded-3xl font-black uppercase tracking-widest text-[10px] hover:bg-white/20 transition-all">
                           View Assignments
                        </button>
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {[
                     { time: 'In Progress', subject: 'Advanced Mathematics', instructor: 'Dr. John Mamba', status: 'live' },
                     { time: '11:15 AM', subject: 'Inorganic Chemistry', instructor: 'Mrs. Thandi Kunene', status: 'next' },
                     { time: '02:30 PM', subject: 'English Literature', instructor: 'Mr. Sipho Ndlovu', status: 'later' },
                   ].map((session, idx) => (
                     <div key={idx} className="p-8 bg-white border border-slate-100 rounded-[40px] shadow-sm hover:shadow-xl transition-all group">
                        <div className="flex justify-between items-start mb-6">
                           <div className={`p-4 rounded-2xl ${session.status === 'live' ? 'bg-rose-500 text-white animate-pulse' : 'bg-slate-50 text-slate-400'}`}>
                              <Clock className="w-6 h-6" />
                           </div>
                           <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${session.status === 'live' ? 'bg-rose-500/10 text-rose-500' : 'bg-slate-100 text-slate-400'}`}>
                              {session.status === 'live' ? 'LIVE NOW' : session.status === 'next' ? 'UP NEXT' : 'TODAY'}
                           </span>
                        </div>
                        <div className="space-y-4">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{session.time}</p>
                           <h4 className="text-2xl font-black text-slate-900 tracking-tight">{session.subject}</h4>
                           <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
                              <div className="w-8 h-8 rounded-full bg-slate-200" />
                              <p className="text-sm font-bold text-slate-500 italic">{session.instructor}</p>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>
              </div>
            )}
            {activeTab === 'wellness' && <WellnessView institutionType={institutionType} wellnessArticles={WELLNESS_ARTICLES} hotlines={LOCAL_HOTLINES} />}
            {activeTab === 'career' && <CareerView />}
            {activeTab === 'campus' && institutionType === InstitutionType.TERTIARY && <CampusLifeView />}
        </motion.div>
      </div>
    </div>
  );
};

export default StudentDashboard;
