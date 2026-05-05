
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
  Star
} from 'lucide-react';
import { User, UserRole, InstitutionType, WellnessArticle } from '../types';
import { db, doc, getDoc } from '../src/lib/firebase';
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
  const [activeTab, setActiveTab] = useState<'academics' | 'wellness' | 'career' | 'campus'>('academics');
  const [institutionType, setInstitutionType] = useState<InstitutionType | null>(null);

  React.useEffect(() => {
    const fetchInstitutionDetails = async () => {
      if (user?.institutionId) {
        try {
          const instDoc = await getDoc(doc(db, 'institutions', user.institutionId));
          if (instDoc.exists()) {
            const data = instDoc.data();
            if (data.type && data.type.length > 0) {
              setInstitutionType(data.type[0] as InstitutionType);
            }
          }
        } catch (error) {
          console.error("Error fetching institution details:", error);
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
            {activeTab === 'academics' && <AcademicsView institutionType={institutionType} />}
            {activeTab === 'wellness' && <WellnessView institutionType={institutionType} wellnessArticles={WELLNESS_ARTICLES} hotlines={LOCAL_HOTLINES} />}
            {activeTab === 'career' && <CareerView />}
            {activeTab === 'campus' && institutionType === InstitutionType.TERTIARY && <CampusLifeView />}
        </motion.div>
      </div>
    </div>
  );
};

export default StudentDashboard;
