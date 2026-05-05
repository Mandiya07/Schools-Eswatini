import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Clock, 
  MapPin, 
  TrendingUp, 
  Calendar as CalendarIcon, 
  Bell, 
  CheckCircle2, 
  FileText,
  AlertCircle,
  HeartPulse,
  Shield,
  Phone,
  BookHeart,
  Send,
  Star,
  Layout,
  Trophy,
  Rocket,
  Backpack,
  GraduationCap,
  Library,
  Users2,
  FileBadge,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { User, UserRole, InstitutionType } from '../types';
import { db, doc, getDoc, OperationType, handleFirestoreError } from '../src/lib/firebase';

interface StudentDashboardProps {
  user?: User | null;
}

const MOCK_TIMETABLE = [
  { id: 1, time: '08:00 AM', subject: 'Mathematics Core', teacher: 'Mr. Dlamini', room: 'Block A, Rm 12', status: 'completed' },
  { id: 2, time: '09:30 AM', subject: 'Physical Science', teacher: 'Mrs. Simelane', room: 'Science Lab 3', status: 'current' },
  { id: 3, time: '11:00 AM', subject: 'English Language', teacher: 'Ms. Mamba', room: 'Block B, Rm 4', status: 'upcoming' },
  { id: 4, time: '12:30 PM', subject: 'Lunch Break', teacher: '', room: 'Cafeteria', status: 'upcoming' },
  { id: 5, time: '01:30 PM', subject: 'Geography', teacher: 'Mr. Zwane', room: 'Block C, Rm 2', status: 'upcoming' },
];

const MOCK_GRADES = [
  { subject: 'Mathematics Core', currentGrade: 'A-', score: 88, maxScore: 100, trend: '+2%', color: 'bg-emerald-500' },
  { subject: 'Physical Science', currentGrade: 'B+', score: 78, maxScore: 100, trend: '-1%', color: 'bg-blue-500' },
  { subject: 'English Language', currentGrade: 'A', score: 92, maxScore: 100, trend: '+5%', color: 'bg-purple-500' },
  { subject: 'Geography', currentGrade: 'B', score: 74, maxScore: 100, trend: 'Same', color: 'bg-amber-500' },
  { subject: 'Accounting', currentGrade: 'A+', score: 96, maxScore: 100, trend: '+1%', color: 'bg-rose-500' },
];

const MOCK_ASSIGNMENTS = [
  { id: 1, title: 'Algebra Worksheet 4', subject: 'Mathematics', dueDate: 'Tomorrow, 08:00 AM', status: 'pending' },
  { id: 2, title: 'Lab Report: Titration', subject: 'Physical Science', dueDate: 'Wed, 14 May', status: 'submitted' },
  { id: 3, title: 'Essay: Things Fall Apart', subject: 'English Language', dueDate: 'Fri, 16 May', status: 'pending' },
];

const MOCK_EXAMS = [
  { id: 1, subject: 'Physical Science Paper 1', date: '2026-05-20', daysLeft: 8, type: 'EGCSE Mock' },
  { id: 2, subject: 'Mathematics Core Paper 2', date: '2026-05-24', daysLeft: 12, type: 'EGCSE Mock' },
];

const WELLNESS_ARTICLES = [
  { id: 1, title: '5 Ways to Beat Exam Anxiety', desc: 'Practical breathing techniques and study planning to keep you centered during mocks.', readTime: '5 min' },
  { id: 2, title: 'Time Management for Form 5', desc: 'How to balance extracurriculars, study sessions, and personal rest time effectively.', readTime: '8 min' },
  { id: 3, title: 'Understanding Burnout', desc: 'Recognizing the signs of academic fatigue and knowing when it\'s time to step back.', readTime: '6 min' },
];

const LOCAL_HOTLINES = [
  { name: 'Childline Eswatini', number: '116', desc: 'Toll-free 24/7 counseling and support for children and young adults.' },
  { name: 'SWAGAA', number: '951', desc: 'Swaziland Action Group Against Abuse (Toll-free).' },
  { name: 'Emergency Police', number: '999', desc: 'Immediate emergency police response.' },
];

const StudentDashboard: React.FC<StudentDashboardProps> = ({ user }) => {
  const [simulatedRole, setSimulatedRole] = useState<UserRole | null>(null);
  const [activeTab, setActiveTab] = useState<'academics' | 'wellness' | 'career' | 'campus'>('academics');
  const [institutionType, setInstitutionType] = useState<InstitutionType | null>(null);
  
  // Wellness Form State
  const [reportType, setReportType] = useState('counselor');
  const [reportMessage, setReportMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [reportStatus, setReportStatus] = useState<'idle' | 'submitted'>('idle');

  const isStudent = simulatedRole === UserRole.STUDENT || user?.role === UserRole.STUDENT;

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

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReportStatus('submitted');
    setTimeout(() => {
      setReportMessage('');
      setReportStatus('idle');
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header section */}
        <header className="bg-white p-8 md:p-10 rounded-[40px] shadow-sm border border-slate-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center text-4xl shadow-inner border border-slate-200">
                {institutionType === InstitutionType.PRIMARY ? '🎒' : institutionType === InstitutionType.TERTIARY ? '🏛️' : '👋'}
              </div>
              <div>
                <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-1">Student Portal</p>
                <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                  Welcome back, {user?.name || 'Sipho'}.
                </h1>
                <p className="text-slate-500 font-medium mt-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> 
                  {institutionType === InstitutionType.TERTIARY ? 'University of Eswatini' : institutionType === InstitutionType.PRIMARY ? 'Eswatini Primary' : "St. Mark's High School"} 
                  • {institutionType === InstitutionType.TERTIARY ? 'Year 3' : institutionType === InstitutionType.PRIMARY ? 'Grade 4' : 'Form 5'}
                </p>
              </div>
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
          
          <div className="flex gap-4 w-full md:w-auto">
            <div className="flex-1 md:flex-none px-6 py-3 bg-emerald-50 rounded-2xl border border-emerald-100 text-center">
              <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                {institutionType === InstitutionType.PRIMARY ? 'Stars/Badges' : institutionType === InstitutionType.TERTIARY ? 'GPA' : 'Avg Grade'}
              </p>
              <p className="text-2xl font-black text-slate-900 mt-1">
                {institutionType === InstitutionType.PRIMARY ? '⭐⭐⭐⭐' : institutionType === InstitutionType.TERTIARY ? '3.8' : 'A-'}
              </p>
            </div>
            <div className="flex-1 md:flex-none px-6 py-3 bg-blue-50 rounded-2xl border border-blue-100 text-center">
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Attendance</p>
              <p className="text-2xl font-black text-slate-900 mt-1">98%</p>
            </div>
            {institutionType !== InstitutionType.TERTIARY && (
              <div className="flex-1 md:flex-none px-6 py-3 bg-amber-50 rounded-2xl border border-amber-100 text-center">
                <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Sponsorship</p>
                <p className="text-[10px] font-black text-amber-800 uppercase mt-1 px-3 py-1 bg-amber-200/50 rounded-full">Matched: MTN</p>
              </div>
            )}
            {institutionType === InstitutionType.TERTIARY && (
               <div className="flex-1 md:flex-none px-6 py-3 bg-purple-50 rounded-2xl border border-purple-100 text-center">
                  <p className="text-[10px] font-black text-purple-600 uppercase tracking-widest">Credits</p>
                  <p className="text-2xl font-black text-slate-900 mt-1">120/144</p>
               </div>
            )}
          </div>
        </header>

        {/* Global Tabs (Desktop) */}
        <div className="hidden md:flex flex-wrap gap-4">
          <button 
            onClick={() => setActiveTab('academics')}
            className={`px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-3 transition-all ${activeTab === 'academics' ? 'bg-slate-900 text-white shadow-xl' : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'}`}
          >
            {institutionType === InstitutionType.TERTIARY ? <Library className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
            {institutionType === InstitutionType.PRIMARY ? 'My Homework' : institutionType === InstitutionType.TERTIARY ? 'Registry & Transcripts' : 'Academics & Schedule'}
          </button>
          
          <button 
            onClick={() => setActiveTab('wellness')}
            className={`px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-3 transition-all ${activeTab === 'wellness' ? 'bg-rose-500 text-white shadow-xl shadow-rose-500/20' : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'}`}
          >
            <HeartPulse className="w-4 h-4" /> {institutionType === InstitutionType.PRIMARY ? 'Feeling Happy?' : 'Mental Health & Wellbeing'}
          </button>

          {institutionType !== InstitutionType.PRIMARY && (
            <button 
              onClick={() => setActiveTab('career')}
              className={`px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-3 transition-all ${activeTab === 'career' ? 'bg-amber-500 text-white shadow-xl shadow-amber-500/20' : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'}`}
            >
              <Star className="w-4 h-4" /> {institutionType === InstitutionType.TERTIARY ? 'Research & Career' : 'Scholarship & Career Match'}
            </button>
          )}

          {institutionType === InstitutionType.TERTIARY && (
            <button 
              onClick={() => setActiveTab('campus')}
              className={`px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-3 transition-all ${activeTab === 'campus' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'}`}
            >
              <Users2 className="w-4 h-4" /> Campus Life & Societies
            </button>
          )}
        </div>

        {/* Mobile App-like Bottom Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-50 flex justify-around pb-safe pt-2 px-2 pb-4 rounded-t-3xl backdrop-blur-xl bg-white/90">
          <button 
            onClick={() => setActiveTab('academics')}
            className={`flex flex-col items-center p-3 transition-all ${activeTab === 'academics' ? 'text-slate-900 scale-110' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <BookOpen className="w-6 h-6 mb-1" />
            <span className="text-[9px] font-black uppercase tracking-widest">Plan</span>
          </button>
          <button 
            onClick={() => setActiveTab('wellness')}
            className={`flex flex-col items-center p-3 transition-all ${activeTab === 'wellness' ? 'text-rose-500 scale-110' : 'text-slate-400 hover:text-rose-400'}`}
          >
            <HeartPulse className="w-6 h-6 mb-1" />
            <span className="text-[9px] font-black uppercase tracking-widest">Wellness</span>
          </button>
        </div>

        {/* CAREER & SCHOLARSHIP VIEW */}
        {activeTab === 'career' && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-10">
            <div className="bg-slate-900 rounded-[48px] p-16 text-center relative overflow-hidden flex flex-col items-center">
               <div className="absolute top-0 right-0 p-20 opacity-10">
                  <Star className="w-64 h-64 text-amber-400" />
               </div>
               <div className="relative z-10 max-w-2xl">
                  <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-8 shadow-2xl">🎓</div>
                  <h2 className="text-4xl font-black text-white tracking-tight mb-6">Premium Scholarship Matcher</h2>
                  <p className="text-slate-400 font-medium leading-relaxed mb-10">
                    Get matched with international and local Eswatini scholarships based on your unique academic performance and extracurricular merits.
                  </p>
                  
                  <div className="bg-white/5 border border-white/10 p-8 rounded-3xl mb-10 text-left">
                     <h4 className="text-amber-400 font-black uppercase text-[10px] tracking-widest mb-4">Matches Available (Locked)</h4>
                     <div className="space-y-4">
                        <div className="flex justify-between items-center blur-sm grayscale opacity-50">
                           <span className="text-white font-bold">In-Region Tertiary Grant</span>
                           <span className="text-emerald-400 font-black">100% COVER</span>
                        </div>
                        <div className="flex justify-between items-center blur-sm grayscale opacity-50">
                           <span className="text-white font-bold">Commonwealth Merit Award</span>
                           <span className="text-emerald-400 font-black">75% COVER</span>
                        </div>
                     </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-6 justify-center">
                     <button className="bg-amber-500 text-black px-10 py-5 rounded-[24px] font-black uppercase tracking-widest text-[10px] shadow-xl hover:scale-105 transition-all">Unlock Premium Passport (E99 / Term)</button>
                     <button className="bg-white/10 text-white px-10 py-5 rounded-[24px] font-black uppercase tracking-widest text-[10px] border border-white/20">View Partner Sponsors</button>
                  </div>
               </div>
            </div>
          </motion.div>
        )}
        {activeTab === 'academics' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            {institutionType === InstitutionType.PRIMARY ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* PRIMARY: VISUAL HOMEWORK & SCHEDULE */}
                <div className="lg:col-span-12">
                   <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12">
                         <Rocket className="w-64 h-64 text-blue-600" />
                      </div>
                      <div className="relative z-10">
                         <h2 className="text-3xl font-black text-slate-900 mb-2 flex items-center gap-3">
                            <Backpack className="w-8 h-8 text-blue-600" /> My Learning Path
                         </h2>
                         <p className="text-slate-500 font-medium max-w-xl">
                            Look at all the fun things you're learning today! Keep going, you're doing great! 🌟
                         </p>
                      </div>
                   </div>
                </div>

                <div className="lg:col-span-8 space-y-8">
                   <div className="bg-blue-600 rounded-[40px] p-8 text-white shadow-xl shadow-blue-600/20">
                      <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                         <Star className="w-6 h-6 text-yellow-300" /> My Fun Tasks
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div className="bg-white/10 border border-white/20 p-6 rounded-3xl backdrop-blur-md">
                            <div className="flex justify-between items-start mb-4">
                               <span className="px-3 py-1 bg-white/20 rounded-full text-[9px] font-black uppercase tracking-widest">Maths</span>
                               <Trophy className="w-5 h-5 text-yellow-300" />
                            </div>
                            <h4 className="font-black text-lg mb-1">Addition Fun!</h4>
                            <p className="text-blue-100 text-xs font-medium mb-4">Practice your plus(+) signs with 10 problems.</p>
                            <button className="w-full bg-white text-blue-600 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all">Start Task</button>
                         </div>
                         <div className="bg-white/10 border border-white/20 p-6 rounded-3xl backdrop-blur-md">
                            <div className="flex justify-between items-start mb-4">
                               <span className="px-3 py-1 bg-white/20 rounded-full text-[9px] font-black uppercase tracking-widest">SiSwati</span>
                               <Sparkles className="w-5 h-5 text-blue-200" />
                            </div>
                            <h4 className="font-black text-lg mb-1">Reading Story</h4>
                            <p className="text-blue-100 text-xs font-medium mb-4">Read about the adventures of Hamba the Tortoise.</p>
                            <button className="w-full bg-white/20 text-white py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest border border-white/30">Already Done!</button>
                         </div>
                      </div>
                   </div>

                   <div className="bg-white rounded-[40px] p-8 border border-slate-100">
                      <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                         <Trophy className="w-6 h-6 text-amber-500" /> My Badges & Rewards
                      </h3>
                      <div className="flex flex-wrap gap-6">
                         {[
                           { name: 'Super Reader', icon: '📖', color: 'bg-emerald-100 text-emerald-600' },
                           { name: 'Math Wizard', icon: '🔢', color: 'bg-blue-100 text-blue-600' },
                           { name: 'Kind Friend', icon: '🤝', color: 'bg-rose-100 text-rose-600' },
                           { name: 'On Time!', icon: '⏰', color: 'bg-purple-100 text-purple-600' }
                         ].map(badge => (
                           <div key={badge.name} className="flex flex-col items-center gap-2">
                              <div className={`w-16 h-16 ${badge.color} rounded-full flex items-center justify-center text-3xl shadow-sm`}>
                                 {badge.icon}
                              </div>
                              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{badge.name}</span>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>

                <div className="lg:col-span-4">
                   <div className="bg-slate-900 rounded-[40px] p-8 text-white h-full relative overflow-hidden">
                      <div className="absolute -bottom-10 -right-10 opacity-10">
                         <Clock className="w-48 h-48" />
                      </div>
                      <h3 className="text-xl font-black mb-6">Today's Plan</h3>
                      <div className="space-y-6 relative z-10">
                         {[
                           { time: '08:00', task: 'Circle Time', color: 'bg-blue-500' },
                           { time: '09:00', task: 'Maths Fun', color: 'bg-emerald-500' },
                           { time: '10:30', task: 'Play & Snack', color: 'bg-amber-500' },
                           { time: '11:00', task: 'Story Reading', color: 'bg-purple-500' }
                         ].map(slot => (
                           <div key={slot.time} className="flex gap-4 items-center">
                              <span className="text-[10px] font-black text-slate-400 w-12">{slot.time}</span>
                              <div className="flex-1 p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3">
                                 <div className={`w-2 h-2 rounded-full ${slot.color}`} />
                                 <span className="font-bold text-sm">{slot.task}</span>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
              </div>
            ) : institutionType === InstitutionType.TERTIARY ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* TERTIARY: COMPLEX REGISTRY & TRANSCRIPTS */}
                <div className="lg:col-span-8 space-y-8">
                   <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm">
                      <div className="flex justify-between items-center mb-8">
                         <div>
                            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                               <Library className="w-7 h-7 text-indigo-600" /> Academic Progress & Registry
                            </h2>
                            <p className="text-slate-500 font-medium mt-1">Bachelor of Science in Computer Science • Year 3 Semester 1</p>
                         </div>
                         <button className="bg-indigo-50 text-indigo-600 px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-indigo-600 hover:text-white transition-all">
                            Request Official Transcript
                         </button>
                      </div>

                      <div className="space-y-6">
                         <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <BookOpen className="w-4 h-4" /> Current Module Registration
                         </h3>
                         <div className="grid grid-cols-1 gap-4">
                            {[
                              { code: 'CSC301', title: 'Advanced Algorithms', credits: 12, marks: '78%', status: 'In Progress' },
                              { code: 'CSC305', title: 'Network Security', credits: 12, marks: '82%', status: 'In Progress' },
                              { code: 'CSC312', title: 'Distributed Systems', credits: 12, marks: '65%', status: 'At Risk' },
                              { code: 'ENG301', title: 'Engineering Ethics', credits: 8, marks: '90%', status: 'Excel' }
                            ].map(mod => (
                              <div key={mod.code} className="p-6 bg-slate-50 border border-slate-100 rounded-3xl flex justify-between items-center group hover:border-indigo-200 transition-all">
                                 <div>
                                    <div className="flex items-center gap-3 mb-1">
                                       <span className="text-xs font-black text-indigo-600">{mod.code}</span>
                                       <h4 className="font-bold text-slate-900">{mod.title}</h4>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{mod.credits} Credits • {mod.status}</span>
                                 </div>
                                 <div className="text-right">
                                    <p className="text-lg font-black text-slate-900">{mod.marks}</p>
                                    <span className="text-[9px] font-black uppercase text-indigo-400">Current Weight</span>
                                 </div>
                              </div>
                            ))}
                         </div>
                      </div>
                   </div>

                   <div className="bg-slate-900 rounded-[40px] p-10 text-white shadow-xl">
                      <div className="flex justify-between items-center mb-8">
                         <h3 className="text-xl font-black flex items-center gap-3">
                            <FileBadge className="w-6 h-6 text-indigo-400" /> Research & Dissertation Track
                         </h3>
                         <span className="px-4 py-2 bg-indigo-500/20 text-indigo-300 rounded-full text-[10px] font-black uppercase tracking-widest">Undergraduate Thesis</span>
                      </div>
                      
                      <div className="relative p-8 border border-white/10 rounded-3xl bg-white/5">
                         <div className="flex items-start gap-6">
                            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
                               <FileText className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                               <h4 className="font-bold text-lg mb-2">Impact of FinTech on Eswatini's Rural Economy</h4>
                               <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                                  Current Status: Chapter 3 (Data Analysis) in review by supervisor Dr. Mhlongo.
                               </p>
                               <div className="space-y-4">
                                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-indigo-300">
                                     <span>Thesis Completion</span>
                                     <span>65%</span>
                                  </div>
                                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                     <div className="h-full w-[65%] bg-indigo-500 rounded-full" />
                                  </div>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="lg:col-span-4 space-y-8">
                   <div className="bg-indigo-600 rounded-[40px] p-8 text-white">
                      <h3 className="text-xl font-black mb-6">Exam & Assessment Hub</h3>
                      <div className="space-y-4">
                         {[
                           { title: 'Mid-term Exam', mod: 'CSC301', date: '24 May', type: 'Physical' },
                           { title: 'Project Submission', mod: 'CSC305', date: '02 June', type: 'Online' }
                         ].map(exam => (
                           <div key={exam.title} className="p-4 bg-white/10 border border-white/20 rounded-2xl">
                              <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest mb-1">{exam.mod}</p>
                              <h4 className="font-bold text-sm mb-3">{exam.title}</h4>
                              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                 <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {exam.date}</span>
                                 <span className="px-2 py-1 bg-white/10 rounded-lg">{exam.type}</span>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>

                   <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm">
                      <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                         <Layout className="w-6 h-6 text-indigo-600" /> Quick Links
                      </h3>
                      <div className="grid grid-cols-1 gap-3">
                         {['Module Registration', 'Exam Timetable', 'Financial Statement', 'E-Library Access', 'Hostel Portal'].map(link => (
                           <button key={link} className="w-full text-left p-4 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all text-sm font-bold text-slate-600 flex justify-between items-center group">
                              {link}
                              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                           </button>
                         ))}
                      </div>
                   </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT COLUMN: LIVE TIMETABLE */}
            <div className="lg:col-span-4 space-y-6">
              <div className="flex justify-between items-center px-2">
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" /> Today's Schedule
                </h2>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tue, 12 May</span>
              </div>
              
              <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 relative">
                {/* Timeline line */}
                <div className="absolute left-[39px] top-10 bottom-10 w-0.5 bg-slate-100 rounded-full" />
                
                <div className="space-y-8 relative z-10">
                  {MOCK_TIMETABLE.map((slot) => {
                    const isCurrent = slot.status === 'current';
                    const isCompleted = slot.status === 'completed';
                    
                    return (
                      <motion.div 
                        key={slot.id} 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`flex gap-6 items-start ${isCompleted ? 'opacity-50' : 'opacity-100'}`}
                      >
                        <div className="w-16 shrink-0 text-right pt-1">
                          <span className="text-[10px] font-black text-slate-500">{slot.time}</span>
                        </div>
                        
                        <div className="relative">
                          <div className={`w-4 h-4 rounded-full mt-1.5 ring-4 ${
                            isCurrent ? 'bg-blue-600 ring-blue-100 animate-pulse' : 
                            isCompleted ? 'bg-slate-300 ring-white border-2 border-slate-100' : 
                            'bg-white border-2 border-slate-300 ring-white'
                          }`} />
                        </div>
                        
                        <div className={`flex-1 p-5 rounded-2xl border transition-all ${
                          isCurrent 
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 border-blue-600 scale-[1.02]' 
                            : isCompleted 
                              ? 'bg-slate-50 border-slate-100 text-slate-500' 
                              : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300'
                        }`}>
                          <h4 className="font-bold text-sm mb-1">{slot.subject}</h4>
                          {slot.teacher && (
                            <div className={`flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest ${isCurrent ? 'text-blue-200' : 'text-slate-400'}`}>
                              <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {slot.teacher}</span>
                            </div>
                          )}
                          <div className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest mt-2 ${isCurrent ? 'text-blue-100' : 'text-slate-500'}`}>
                            <MapPin className="w-3 h-3" /> {slot.room}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: GRADES, TASKS, EXAMS */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* EXAM COUNTDOWNS */}
              {MOCK_EXAMS.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {MOCK_EXAMS.map(exam => (
                    <div key={exam.id} className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 rounded-3xl text-white shadow-lg shadow-amber-500/20 flex items-center justify-between">
                      <div>
                        <span className="px-3 py-1 bg-white/20 rounded-full text-[9px] font-black uppercase tracking-widest mb-3 inline-block">
                          {exam.type}
                        </span>
                        <h4 className="font-black text-lg">{exam.subject}</h4>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-4xl font-black">{exam.daysLeft}</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-amber-100">Days Left</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* GRADE TRACKING */}
              <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 p-8 md:p-10">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-600" /> Syllabus & Grade Tracking
                  </h2>
                  <button className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-xl transition-colors">
                    View Full Report Card
                  </button>
                </div>

                <div className="space-y-6">
                  {MOCK_GRADES.map(grade => (
                    <div key={grade.subject} className="group">
                      <div className="flex justify-between items-end mb-2">
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">{grade.subject}</h4>
                          <span className={`text-[10px] font-black uppercase tracking-widest ${grade.trend.includes('+') ? 'text-emerald-500' : grade.trend.includes('-') ? 'text-rose-500' : 'text-slate-400'}`}>
                            {grade.trend} vs last term
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-black text-slate-900">{grade.currentGrade}</span>
                          <span className="text-xs text-slate-400 font-bold ml-2">({grade.score}%)</span>
                        </div>
                      </div>
                      {/* Progress Bar Container */}
                      <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${grade.score}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className={`h-full ${grade.color} rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SCHOLARSHIPS & CAREER GUIDANCE (High School Only) */}
              {institutionType === InstitutionType.HIGH_SCHOOL && (
               <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-[40px] shadow-sm p-8 md:p-10 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-12 opacity-10">
                    <GraduationCap className="w-64 h-64" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex justify-between items-center mb-10">
                      <div>
                        <h2 className="text-2xl font-black flex items-center gap-3">
                          <Rocket className="w-6 h-6 text-indigo-400" /> Career & scholarship Guidance
                        </h2>
                        <p className="text-indigo-200/60 font-medium mt-1">Planning for your future at UNESWA or abroad</p>
                      </div>
                      <button className="bg-indigo-500 text-white px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-indigo-400 transition-all">
                        Book Counselor Session
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors">
                        <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-2">Upcoming Deadline</p>
                        <h4 className="font-bold text-lg mb-1 whitespace-nowrap overflow-hidden text-ellipsis">Eswatini Gov Scholarship</h4>
                        <p className="text-indigo-200/50 text-[10px] uppercase font-black">Due: 30 June 2026</p>
                      </div>
                      <div className="p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors">
                        <p className="text-[10px] font-black text-emerald-300 uppercase tracking-widest mb-2">Matched Opportunity</p>
                        <h4 className="font-bold text-lg mb-1 whitespace-nowrap overflow-hidden text-ellipsis">Vodacom Tech Bursary</h4>
                        <p className="text-emerald-200/50 text-[10px] uppercase font-black">Eligibility: 95% Matched</p>
                      </div>
                      <div className="p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors">
                        <p className="text-[10px] font-black text-amber-300 uppercase tracking-widest mb-2">Career Roadmap</p>
                        <h4 className="font-bold text-lg mb-1 whitespace-nowrap overflow-hidden text-ellipsis">Software Engineering</h4>
                        <p className="text-amber-200/50 text-[10px] uppercase font-black">Next: Physics IGCSE</p>
                      </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/10 flex flex-wrap gap-4">
                      {['University of Eswatini (UNESWA)', 'Limkokwing University', 'Botho University', 'ECC', 'Waterford Kamhlaba'].map(u => (
                        <span key={u} className="px-4 py-2 bg-white/5 rounded-xl text-[9px] font-black uppercase tracking-widest text-indigo-300 border border-white/5">{u}</span>
                      ))}
                    </div>
                  </div>
               </div>
              )}

              {/* PAST PAPERS & RESOURCES */}
              <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 p-8 md:p-10">
                 <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                       <Library className="w-5 h-5 text-indigo-600" /> Exam Resources & Past Papers
                    </h2>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { subject: 'Mathematics Core', year: '2023-2025', papers: 6 },
                      { subject: 'Physical Science', year: '2022-2024', papers: 4 },
                      { subject: 'English Language', year: '2023-2025', papers: 5 },
                      { subject: 'Geography', year: '2024 Mock', papers: 2 }
                    ].map(res => (
                       <button key={res.subject} className="p-5 bg-slate-50 border border-slate-100 rounded-2xl flex justify-between items-center hover:border-indigo-300 hover:bg-slate-100 transition-all group text-left">
                          <div>
                             <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors uppercase text-xs">{res.subject}</h4>
                             <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">{res.year} Archive</p>
                          </div>
                          <div className="flex items-center gap-2 text-indigo-600 font-black text-xs">
                             {res.papers} Papers <FileText className="w-4 h-4" />
                          </div>
                       </button>
                    ))}
                 </div>
              </div>

              {/* UPCOMING ASSIGNMENTS */}
              <div className="bg-slate-900 rounded-[40px] shadow-sm border border-slate-800 p-8 md:p-10 text-white">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-black flex items-center gap-2">
                    <FileText className="w-5 h-5 text-amber-500" /> Action Items
                  </h2>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <Bell className="w-4 h-4 text-white" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {MOCK_ASSIGNMENTS.map(task => (
                    <div key={task.id} className={`p-6 rounded-3xl border transition-colors ${task.status === 'submitted' ? 'bg-white/5 border-white/10' : 'bg-blue-600/20 border-blue-500/30 hover:border-blue-500/50'}`}>
                      <div className="flex justify-between items-start mb-4">
                        <span className="px-3 py-1 bg-white/10 rounded-full text-[9px] font-black uppercase tracking-widest">
                          {task.subject}
                        </span>
                        {task.status === 'submitted' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      </div>
                      <h4 className="font-bold text-sm mb-2">{task.title}</h4>
                      <p className={`text-xs font-medium flex items-center gap-1 ${task.status === 'submitted' ? 'text-slate-400' : 'text-amber-400'}`}>
                        <CalendarIcon className="w-3 h-3" /> Due {task.dueDate}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    )}

        {/* WELLNESS VIEW */}
        {activeTab === 'wellness' && (
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
            
            {/* EMERGENCY STRIP */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {LOCAL_HOTLINES.map(hotline => (
                <div key={hotline.number} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900">{hotline.name}</h4>
                    <p className="text-xl font-black text-rose-600">{hotline.number}</p>
                    <p className="text-xs text-slate-500 font-medium mt-1">{hotline.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* ANONYMOUS REPORT SYSTEM */}
              <div className="lg:col-span-5 relative">
                {reportStatus === 'submitted' ? (
                  <div className="bg-emerald-50 rounded-[40px] border border-emerald-100 p-10 h-full flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-20 h-20 bg-emerald-200 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900">Message Delivered</h3>
                    <p className="text-emerald-700 font-medium leading-relaxed">
                      Your message has been securely and {isAnonymous ? 'anonymously ' : ''}sent to the school counselor. They will review it shortly.
                    </p>
                  </div>
                ) : (
                  <div className="bg-white rounded-[40px] shadow-sm border border-slate-200 p-8 md:p-10">
                    <div className="flex items-center gap-4 mb-6 pt-2">
                      <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center">
                        <Shield className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Support Desk</h2>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Safe • Secure • Secret</p>
                      </div>
                    </div>
                    
                    <p className="text-slate-600 text-sm font-medium leading-relaxed mb-8">
                      {institutionType === InstitutionType.PRIMARY 
                        ? 'Feeling sad or have a secret to share with a teacher? We are here to help you feel happy and safe at school!' 
                        : 'Need someone to talk to? Experiencing bullying? Use this secure channel to request a meeting with the counselor or leave an anonymous report.'}
                    </p>

                    <form onSubmit={handleReportSubmit} className="space-y-6">
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">I need to...</label>
                        <select 
                          value={reportType}
                          onChange={(e) => setReportType(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 font-bold text-slate-900 focus:ring-4 focus:ring-rose-100 outline-none"
                        >
                          <option value="counselor">Request a meeting with a Counselor</option>
                          <option value="bullying">{institutionType === InstitutionType.PRIMARY ? "I am being treated unkindly" : "Report Bullying securely"}</option>
                          <option value="academic_stress">Report extreme academic stress</option>
                          <option value="other">Other well-being concern</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">Message Details</label>
                        <textarea 
                          required
                          rows={4}
                          value={reportMessage}
                          onChange={(e) => setReportMessage(e.target.value)}
                          placeholder={institutionType === InstitutionType.PRIMARY ? "Write your message here..." : "Please provide details (location, names involved, or how you're feeling). We are here to help."}
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 font-medium text-sm text-slate-600 focus:ring-4 focus:ring-rose-100 outline-none resize-none"
                        />
                      </div>

                      <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                        <input 
                          type="checkbox" 
                          id="anon" 
                          checked={isAnonymous}
                          onChange={(e) => setIsAnonymous(e.target.checked)}
                          className="w-5 h-5 rounded text-rose-500 focus:ring-rose-500"
                        />
                        <label htmlFor="anon" className="text-sm font-bold text-slate-700 cursor-pointer">
                          Keep this completely anonymous
                        </label>
                      </div>

                      <button 
                        type="submit"
                        className="w-full bg-slate-900 text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-rose-600 transition-all shadow-xl"
                      >
                        <Send className="w-4 h-4" /> Securely Send Message
                      </button>
                    </form>
                  </div>
                )}
              </div>

              {/* WELLNESS GUIDES */}
              <div className="lg:col-span-7">
                <div className="bg-slate-900 rounded-[40px] shadow-sm p-8 md:p-10 text-white min-h-full">
                  <div className="flex items-center gap-3 mb-8">
                    <BookHeart className="w-6 h-6 text-rose-400" />
                    <h2 className="text-2xl font-black tracking-tight">{institutionType === InstitutionType.PRIMARY ? "Helpful Stories" : "Wellness Resources"}</h2>
                  </div>

                  <div className="space-y-4">
                    {WELLNESS_ARTICLES.map(article => (
                      <div key={article.id} className="p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors cursor-pointer group">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-bold text-lg text-rose-100 group-hover:text-white transition-colors">
                            {institutionType === InstitutionType.PRIMARY ? article.title.replace('Exam Anxiety', 'School Stress').replace('Form 5', 'Big Classes') : article.title}
                          </h4>
                          <span className="px-3 py-1 bg-white/10 text-white rounded-full text-[9px] font-black uppercase tracking-widest shrink-0">
                            {article.readTime}
                          </span>
                        </div>
                        <p className="text-slate-400 text-sm font-medium leading-relaxed">{article.desc}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 pt-8 border-t border-white/10">
                    <button className="text-[10px] font-black text-rose-300 uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2">
                       Explore full wellness library →
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* CAMPUS LIFE VIEW (Tertiary Only) */}
        {activeTab === 'campus' && institutionType === InstitutionType.TERTIARY && (
           <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                 <div className="lg:col-span-8 space-y-8">
                    <div className="bg-indigo-900 rounded-[40px] p-10 text-white shadow-xl relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -mr-20 -mt-20" />
                       <div className="relative z-10">
                          <h2 className="text-3xl font-black mb-2">Campus Societies & Clubs</h2>
                          <p className="text-indigo-200 font-medium max-w-xl mb-10">Explore student-led organizations, professional committees, and recreational societies.</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             {[
                               { name: 'Computer Science Society', icon: '💻', count: 156, status: 'Member' },
                               { name: 'University Debate Union', icon: '📢', count: 84, status: 'Join' },
                               { name: 'Eswatini Cultural Group', icon: '🇿🇼', count: 120, status: 'Member' },
                               { name: 'Green Campus Initiative', icon: '🌱', count: 68, status: 'Join' }
                             ].map(club => (
                               <div key={club.name} className="p-6 bg-white/10 border border-white/10 rounded-3xl backdrop-blur-sm flex justify-between items-center group hover:bg-white/20 transition-all cursor-pointer">
                                  <div className="flex items-center gap-4">
                                     <div className="text-2xl">{club.icon}</div>
                                     <div>
                                        <h4 className="font-bold text-sm">{club.name}</h4>
                                        <p className="text-[10px] text-indigo-300 font-bold uppercase tracking-widest">{club.count} Members</p>
                                     </div>
                                  </div>
                                  <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${club.status === 'Member' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-indigo-500 text-white'}`}>
                                     {club.status}
                                  </span>
                               </div>
                             ))}
                          </div>
                       </div>
                    </div>

                    <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm">
                       <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                          <Rocket className="w-6 h-6 text-indigo-600" /> Upcoming Campus Events
                       </h3>
                       <div className="space-y-6">
                          {[
                            { title: 'Annual Tech Symposium', date: '15 June', location: 'Main Hall', theme: 'AI in Agriculture' },
                            { title: 'Inter-Collegiate Sports Day', date: '22 June', location: 'University Stadium', theme: 'Unity in Diversity' }
                          ].map(event => (
                            <div key={event.title} className="flex gap-6 items-start">
                               <div className="w-16 shrink-0 bg-slate-50 border border-slate-100 rounded-2xl p-3 text-center">
                                  <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{event.date.split(' ')[1]}</p>
                                  <p className="text-xl font-black text-slate-900">{event.date.split(' ')[0]}</p>
                               </div>
                               <div className="flex-1 pb-6 border-b border-slate-100">
                                  <h4 className="font-black text-slate-900 mb-1">{event.title}</h4>
                                  <p className="text-slate-500 text-sm font-medium mb-3">{event.theme}</p>
                                  <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                     <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {event.location}</span>
                                  </div>
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>
                 </div>

                 <div className="lg:col-span-4 space-y-8">
                    <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm h-full">
                       <h3 className="text-xl font-black text-slate-900 mb-6">Student Union Board</h3>
                       <div className="space-y-6">
                          <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-3xl">
                             <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2">Announcement</p>
                             <p className="text-slate-700 text-sm font-bold mb-4">Ballot for the upcoming Student Representative Council (SRC) elections is now live.</p>
                             <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-indigo-600/20">Vote via Portal</button>
                          </div>
                          <div className="space-y-4">
                             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Campus Facilities</h4>
                             {[
                               { name: 'Study Room 4', status: 'Available', color: 'text-emerald-500' },
                               { name: 'Lab 2 (Mac)', status: 'Currently Full', color: 'text-amber-500' },
                               { name: 'Gymnasium', status: 'Open', color: 'text-emerald-500' }
                             ].map(facility => (
                               <div key={facility.name} className="flex justify-between items-center text-sm">
                                  <span className="font-bold text-slate-700">{facility.name}</span>
                                  <span className={`text-[10px] font-black uppercase tracking-widest ${facility.color}`}>{facility.status}</span>
                               </div>
                             ))}
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </motion.div>
        )}

      </div>
    </div>
  );
};

export default StudentDashboard;
