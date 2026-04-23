
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, UserRole, StudentProgress, AcademicResource } from '../types';
import { db, collection, query, where, getDocs, setDoc, doc, OperationType, handleFirestoreError } from '../src/lib/firebase';
import { BookOpen, Activity, Users, Save, Edit2, CheckCircle, GraduationCap, ClipboardList, TrendingUp, Search, Plus, X, FolderOpen, FileText, Download, UploadCloud, FileArchive, Lightbulb, Star, Bot, Sparkles, Loader2, CalendarCheck, BellRing, UserCheck, UserX, Award, ShieldAlert, MessageSquare, Briefcase, ChevronRight } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface TeacherDashboardProps {
  user: User;
}

const MOCK_RESOURCES: any[] = [
  { id: '1', type: 'syllabus', title: 'EGCSE Mathematics Syllabus 2026-2028', subject: 'Mathematics', level: 'EGCSE', author: 'MoET Official', size: '2.4 MB', downloads: 1250, date: '2025-10-12', rating: 5.0, price: 0 },
  { id: '2', type: 'past_paper', title: 'Nov 2025 Physical Science Paper 1', subject: 'Science', level: 'EGCSE', author: 'Exams Council', size: '1.1 MB', downloads: 3420, date: '2026-01-05', rating: 5.0, price: 0 },
  { id: '3', type: 'past_paper', title: 'Nov 2025 Physical Science Mark Scheme', subject: 'Science', level: 'EGCSE', author: 'Exams Council', size: '0.8 MB', downloads: 3100, date: '2026-01-05', rating: 5.0, price: 0 },
  { id: '4', type: 'lesson_plan', title: 'Covalent & Ionic Bonding Visual Guide', subject: 'Chemistry', level: 'Form 4', author: 'Mrs. Simelane (Mbabane)', size: '5.6 MB', downloads: 342, date: '2026-03-15', rating: 4.8, price: 45 },
  { id: '5', type: 'lesson_plan', title: 'Siswati Poetry Analysis Framework', subject: 'SiSwati', level: 'Form 5', author: 'Mr. Zwane (Manzini)', size: '1.2 MB', downloads: 89, date: '2026-04-10', rating: 4.9, price: 60 },
  { id: '6', type: 'syllabus', title: 'Junior Certificate (JC) Agriculture', subject: 'Agriculture', level: 'Form 1-3', author: 'MoET Official', size: '1.9 MB', downloads: 856, date: '2025-08-20', rating: 5.0, price: 0 },
];

const MOCK_STUDENTS = [
  { id: 's1', name: 'Sipho Dlamini', status: 'present', merits: 12, demerits: 0 },
  { id: 's2', name: 'Thando Lukhele', status: 'absent', merits: 5, demerits: 2 },
  { id: 's3', name: 'Nomsa Mamba', status: 'present', merits: 24, demerits: 0 },
  { id: 's4', name: 'Lwandle Ndlovu', status: 'late', merits: 8, demerits: 1 },
  { id: 's5', name: 'Ncamiso Zwane', status: 'present', merits: 3, demerits: 0 },
];

const MOCK_FORUMS = [
  { id: 'f1', title: 'Integration vs Differentiation: Teaching Approaches', author: 'Mr. Dlamini', replies: 24, topic: 'Mathematics', active: '2h ago' },
  { id: 'f2', title: 'New MoET changes regarding Continuous Assessment', author: 'Mrs. Shongwe', replies: 56, topic: 'General Policy', active: '10m ago' },
  { id: 'f3', title: 'Handling disruptive behavior in large Form 2 classes', author: 'Ms. Gamedze', replies: 12, topic: 'Classroom Management', active: '1d ago' },
];

const MOCK_VACANCIES = [
  { id: 'v1', role: 'Senior Science Teacher (Physical)', school: 'St. Marks High School', location: 'Mbabane', type: 'Permanent', deadline: '2026-05-15' },
  { id: 'v2', role: 'Substitute Mathematics Teacher', school: 'Salesian High', location: 'Manzini', type: 'Contract (3 Months)', deadline: '2026-04-30' },
];

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'classroom' | 'resources' | 'ai_assistant' | 'management' | 'cpd' | 'marketplace'>('classroom');
  const [resourceFilter, setResourceFilter] = useState('all');
  const [cpdFilter, setCpdFilter] = useState<'forums' | 'vacancies'>('forums');

  // Attendance states for mockup
  const [attendanceList, setAttendanceList] = useState(MOCK_STUDENTS);
  const [alertToast, setAlertToast] = useState<{message: string, type: 'merit' | 'alert' | null}>({message: '', type: null});

  // AI Assistant States
  const [aiMode, setAiMode] = useState<'quiz' | 'rubric'>('quiz');
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResult, setAiResult] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');

  const [progressData, setProgressData] = useState<StudentProgress[]>([]);
  const [institutionTeachers, setInstitutionTeachers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<StudentProgress>>({});
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  // Resource Upload States
  const [isUploading, setIsUploading] = useState(false);
  const [uploadForm, setUploadForm] = useState<Partial<AcademicResource>>({
    type: 'past_paper',
    title: '',
    subject: '',
    level: 'EGCSE',
    price: 0
  });
  const [resources, setResources] = useState<any[]>(MOCK_RESOURCES);
  const [isEditingTutorProfile, setIsEditingTutorProfile] = useState(false);
  const [tutorProfileForm, setTutorProfileForm] = useState<User['tutorProfile']>(user.tutorProfile || {
    isEnabled: false,
    subjects: [],
    bio: '',
    availability: {
      days: [],
      timeRange: '08:00 - 17:00',
      status: 'available'
    },
    hourlyRate: 150
  });

  const handleUpdateTutorProfile = async () => {
    setSaveStatus('saving');
    try {
      await setDoc(doc(db, 'users', user.id), { tutorProfile: tutorProfileForm }, { merge: true });
      setSaveStatus('success');
      setIsEditingTutorProfile(false);
      setTimeout(() => setSaveStatus('idle'), 3000);
      triggerAlert('merit', 'Tutoring profile updated successfully!');
    } catch (error) {
      setSaveStatus('error');
      handleFirestoreError(error, OperationType.UPDATE, `users/${user.id}/tutorProfile`);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newResource = {
      ...uploadForm,
      id: `res_${Date.now()}`,
      authorName: user.name,
      authorId: user.id,
      size: '1.2 MB',
      downloads: 0,
      rating: 0,
      date: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    };
    setResources([newResource, ...resources]);
    setIsUploading(false);
    setUploadForm({ type: 'past_paper', title: '', subject: '', level: 'EGCSE', price: 0 });
    triggerAlert('merit', 'Resource uploaded successfully!');
  };

  useEffect(() => {
    const fetchProgress = async () => {
      setLoading(true);
      try {
        // Fetch all teachers in same institution for assignment feature
        if (user.institutionId) {
          const teachersQ = query(collection(db, 'users'), 
            where('institutionId', '==', user.institutionId),
            where('role', '==', UserRole.TEACHER)
          );
          const teachersSnapshot = await getDocs(teachersQ);
          setInstitutionTeachers(teachersSnapshot.docs.map(doc => doc.data() as User));
        }

        // FILTER BY INSTITUTION as requested
        const q = user.institutionId 
          ? query(collection(db, 'student_progress'), where('institutionId', '==', user.institutionId))
          : query(collection(db, 'student_progress'), where('teacherId', '==', user.id));
          
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => doc.data() as StudentProgress);
        
        // Mock data injection if empty for demo purposes
        if (data.length === 0) {
          const mockData: StudentProgress[] = [
            {
              id: 'prog_teacher_1',
              studentId: 'stu_1',
              studentName: 'Sipho Dlamini',
              institutionId: user.institutionId || 'inst_1',
              teacherId: user.id,
              parentId: 'parent_123',
              term: 'Term 1',
              year: 2026,
              academics: [
                { subject: 'Mathematics', grade: 'A', comments: 'Excellent problem-solving skills.' },
                { subject: 'Science', grade: 'B+', comments: 'Good understanding of concepts.' },
                { subject: 'English', grade: 'A-', comments: 'Strong reading comprehension.' }
              ],
              behavior: {
                rating: 'Excellent',
                comments: 'Very respectful and attentive in class.'
              },
              participation: {
                rating: 'High',
                activities: ['Debate', 'Robotics'],
                comments: 'Actively engages in all classroom discussions.'
              },
              lastUpdated: new Date().toISOString()
            },
            {
              id: 'prog_teacher_2',
              studentId: 'stu_2',
              studentName: 'Thando Lukhele',
              institutionId: user.institutionId || 'inst_1',
              teacherId: user.id,
              parentId: 'parent_456',
              term: 'Term 1',
              year: 2026,
              academics: [
                { subject: 'Mathematics', grade: 'C', comments: 'Needs more practice with algebra.' },
                { subject: 'Science', grade: 'B', comments: 'Showing steady improvement.' },
                { subject: 'English', grade: 'B+', comments: 'Great essay writing.' }
              ],
              behavior: {
                rating: 'Good',
                comments: 'A bit talkative but stays on task.'
              },
              participation: {
                rating: 'Medium',
                activities: ['Basketball'],
                comments: 'Prefers physical activities over classroom discussion.'
              },
              lastUpdated: new Date().toISOString()
            }
          ];
          setProgressData(mockData);
        } else {
          setProgressData(data);
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.LIST, 'student_progress');
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [user.id, user.institutionId]);

  const handleEditClick = (progress: StudentProgress) => {
    setEditingId(progress.id);
    setEditForm(JSON.parse(JSON.stringify(progress)));
  };

  const handleSave = async () => {
    if (!editForm.id && !isCreating) return;
    
    setSaveStatus('saving');
    try {
      const id = editForm.id || `prog_${Date.now()}`;
      const updatedProgress = { 
        ...editForm, 
        id,
        institutionId: user.institutionId || 'inst_1',
        teacherId: editForm.teacherId || user.id,
        lastUpdated: new Date().toISOString() 
      } as StudentProgress;
      
      await setDoc(doc(db, 'student_progress', id), updatedProgress);
      
      if (isCreating) {
        setProgressData(prev => [updatedProgress, ...prev]);
        setIsCreating(false);
      } else {
        setProgressData(prev => prev.map(p => p.id === id ? updatedProgress : p));
        setEditingId(null);
      }
      
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      setSaveStatus('error');
      handleFirestoreError(error, OperationType.UPDATE, `student_progress/${editForm.id || 'new'}`);
    }
  };

  const startCreate = () => {
    const newReport: Partial<StudentProgress> = {
      studentName: '',
      teacherId: user.id,
      term: 'Term 1',
      year: 2026,
      academics: [{ subject: '', grade: '', comments: '' }],
      behavior: { rating: 'Good', comments: '' },
      participation: { rating: 'Medium', activities: [], comments: '' }
    };
    setEditForm(newReport);
    setIsCreating(true);
  };

  const filteredData = progressData.filter(p => 
    p.studentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAcademicChange = (index: number, field: string, value: string) => {
    const newAcademics = [...(editForm.academics || [])];
    newAcademics[index] = { ...newAcademics[index], [field]: value };
    setEditForm({ ...editForm, academics: newAcademics });
  };

  const handleGenerateAI = async () => {
    if (!aiPrompt.trim()) return;
    setIsAiLoading(true);
    setAiError('');
    setAiResult('');
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      // Constructing prompt based on teacher context
      const systemContext = `You are a professional, helpful AI Co-Teacher Assistant for an educator in Eswatini. 
      The teacher is using a regional Eswatini Education Portal. Provide accurate, formatted responses suitable for a school environment. `;
      
      const specificPrompt = aiMode === 'quiz' 
        ? `${systemContext}\nTask: Generate a quiz based on: "${aiPrompt}". Provide 10 questions with multiple choices and an Answer Key at the very end.`
        : `${systemContext}\nTask: Generate a detailed grading rubric based on: "${aiPrompt}". Use a table format if possible, or clear headers.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro',
        contents: specificPrompt
      });
      
      setAiResult(response.text || 'No response generated. Please try again.');
    } catch (err: any) {
      console.error("AI Generation Error:", err);
      setAiError(err.message || 'Error communicating with AI Assistant.');
    } finally {
      setIsAiLoading(false);
    }
  };

  const [isGeneratingComment, setIsGeneratingComment] = useState<number | null>(null);

  const handleAutoComment = async (index: number, subject: string, grade: string) => {
    if (!subject || !grade) return;
    setIsGeneratingComment(index);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `As a teacher, write a professional, encouraging, 2-sentence end-of-term progress comment for a student who received a grade of '${grade}' in '${subject}'. Keep it constructive.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash',
        contents: prompt
      });
      
      if (response.text) {
        handleAcademicChange(index, 'comments', response.text.trim());
      }
    } catch (err) {
      console.error("Auto comment failed", err);
    } finally {
      setIsGeneratingComment(null);
    }
  };

  const triggerAlert = (type: 'merit' | 'alert', message: string) => {
    setAlertToast({message, type});
    setTimeout(() => setAlertToast({message: '', type: null}), 3000);
  };

  const handleAttendanceChange = (id: string, status: string) => {
    setAttendanceList(prev => prev.map(s => s.id === id ? { ...s, status } : s));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 relative">
      <header className="mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-widest">
                Authorized Workspace
              </span>
              <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
                {user.name}
              </span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Teacher Dashboard</h1>
            <p className="text-slate-500 font-medium mt-2">Manage academic progress, administrative tasks, and professional development.</p>
          </div>
          
          {activeTab === 'classroom' && (
            <div className="flex gap-4 w-full md:w-auto">
               <div className="relative flex-grow md:flex-grow-0">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                 <input 
                  className="w-full md:w-64 bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold focus:ring-4 focus:ring-blue-50 focus:border-blue-200 transition-all"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                 />
               </div>
               <button 
                onClick={startCreate}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
               >
                 <Plus className="w-4 h-4" />
                 New Report
               </button>
            </div>
          )}
        </div>

        {saveStatus === 'success' && (
          <div className="mt-8 flex items-center gap-2 text-emerald-600 bg-emerald-50 px-6 py-4 rounded-3xl font-black text-xs uppercase tracking-widest shadow-sm animate-in fade-in slide-in-from-top-2">
            <CheckCircle className="w-5 h-5" />
            Changes Processed Successfully
          </div>
        )}
      </header>

      {/* Global Tabs */}
      <div className="flex flex-wrap gap-4 mb-8">
        {user.institutionId && (
          <>
            <button 
              onClick={() => setActiveTab('classroom')}
              className={`px-6 py-4 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-3 transition-all ${activeTab === 'classroom' ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'}`}
            >
              <BookOpen className="w-4 h-4" /> Reports
            </button>
            <button 
              onClick={() => setActiveTab('management')}
              className={`px-6 py-4 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-3 transition-all ${activeTab === 'management' ? 'bg-rose-600 text-white shadow-xl shadow-rose-600/20' : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'}`}
            >
              <Users className="w-4 h-4" /> Classroom Management
            </button>
          </>
        )}
        <button 
          onClick={() => setActiveTab('resources')}
          className={`px-6 py-4 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-3 transition-all ${activeTab === 'resources' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'}`}
        >
          <FolderOpen className="w-4 h-4" /> Resource Exchange
        </button>
        <button 
          onClick={() => setActiveTab('ai_assistant')}
          className={`px-6 py-4 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-3 transition-all ${activeTab === 'ai_assistant' ? 'bg-fuchsia-600 text-white shadow-xl shadow-fuchsia-600/20' : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'}`}
        >
          <Bot className="w-4 h-4" /> AI Co-Teacher
        </button>
        <button 
          onClick={() => setActiveTab('cpd')}
          className={`px-6 py-4 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-3 transition-all ${activeTab === 'cpd' ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-600/20' : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'}`}
        >
          <Award className="w-4 h-4" /> Professional Dev (CPD)
        </button>
        <button 
          onClick={() => setActiveTab('marketplace')}
          className={`px-6 py-4 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-3 transition-all ${activeTab === 'marketplace' ? 'bg-amber-600 text-white shadow-xl shadow-amber-600/20' : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'}`}
        >
          <Briefcase className="w-4 h-4" /> Marketplace
        </button>
      </div>

      {/* Independent Teacher Notice */}
      {!user.institutionId && (
        <div className="mb-8 p-6 bg-amber-50 border border-amber-100 rounded-3xl flex items-center gap-6">
          <div className="w-12 h-12 bg-amber-400 text-white rounded-2xl flex items-center justify-center shrink-0">
             <Star className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-black text-amber-900 uppercase tracking-widest">Independent Educator Account</h4>
            <p className="text-xs text-amber-700 font-medium">You are currently using the platform as an independent educator. Connect to a school to access internal classroom management and reporting tools.</p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Syncing Data...</p>
        </div>
      ) : (
        <>
          {activeTab === 'marketplace' && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-12 mb-20">
               <div className="bg-amber-900 rounded-[48px] p-16 text-white relative overflow-hidden flex flex-col md:flex-row items-center gap-12 border border-amber-800/50">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400 opacity-5 blur-[100px]" />
                  <div className="relative z-10 space-y-6 flex-1">
                     <span className="px-4 py-2 bg-amber-500/20 text-amber-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-500/30">Educator Creator Economy</span>
                     <h2 className="text-4xl font-black tracking-tight leading-tight">Your Expertise is Valuable.</h2>
                     <p className="text-amber-200/70 font-medium max-w-sm">
                        Turn your lesson plans and study guides into a sustainable income stream while helping students across the nation.
                     </p>
                     <div className="flex flex-wrap gap-4">
                        <button className="bg-amber-500 text-amber-950 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-amber-500/20">Upload New Resource</button>
                        <button 
                          onClick={() => setIsEditingTutorProfile(true)}
                          className="bg-white/10 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] border border-white/10 hover:bg-white/20 transition-all"
                        >
                          {tutorProfileForm?.isEnabled ? 'Edit Tutor Profile' : 'Setup Tutor Profile'}
                        </button>
                     </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 w-full relative z-10">
                     <div className="bg-white/5 p-8 rounded-[32px] border border-white/10">
                        <p className="text-[10px] font-black text-amber-400 uppercase tracking-widest mb-4">Total Revenue (All Time)</p>
                        <p className="text-4xl font-black text-white">SZL 2,450.00</p>
                        <div className="flex justify-between items-center mt-6 text-[10px] font-black uppercase tracking-widest">
                           <span className="text-slate-400">Platform Share (20%)</span>
                           <span className="text-rose-400">- SZL 490.00</span>
                        </div>
                     </div>
                     <div className="bg-white/5 p-8 rounded-[32px] border border-white/10">
                        <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-4">Status & Reach</p>
                        <div className="space-y-4">
                           <div className="flex justify-between items-center">
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tutoring</span>
                              <span className={`px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest ${tutorProfileForm?.isEnabled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                                 {tutorProfileForm?.isEnabled ? 'Online' : 'Offline'}
                              </span>
                           </div>
                           <div className="flex justify-between items-center">
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Connections</span>
                              <span className="text-xl font-black text-white">12 Pupils</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {isEditingTutorProfile && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[48px] border border-slate-100 shadow-xl p-10 md:p-14 space-y-12"
                  >
                     <div className="flex justify-between items-center">
                        <div>
                           <h3 className="text-2xl font-black text-slate-900 tracking-tight">Tutor Profile Settings</h3>
                           <p className="text-slate-500 font-medium">Define your subjects, availability, and tuition rates.</p>
                        </div>
                        <button onClick={() => setIsEditingTutorProfile(false)} className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:text-rose-500 transition-all">
                           <X className="w-6 h-6" />
                        </button>
                     </div>

                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="space-y-8">
                           <div className="flex items-center justify-between p-6 bg-slate-900 rounded-[32px] text-white">
                              <div className="flex items-center gap-4">
                                 <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${tutorProfileForm?.isEnabled ? 'bg-emerald-500' : 'bg-white/10'}`}>
                                    <CheckCircle className="w-6 h-6" />
                                 </div>
                                 <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Visibility</p>
                                    <p className="font-bold">{tutorProfileForm?.isEnabled ? 'Visible in Marketplace' : 'Hidden from Students'}</p>
                                 </div>
                              </div>
                              <button 
                                onClick={() => setTutorProfileForm(prev => ({ ...prev!, isEnabled: !prev!.isEnabled }))}
                                className={`w-14 h-8 rounded-full transition-all relative ${tutorProfileForm?.isEnabled ? 'bg-emerald-500' : 'bg-slate-700'}`}
                              >
                                 <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${tutorProfileForm?.isEnabled ? 'right-1' : 'left-1'}`} />
                              </button>
                           </div>

                           <div className="space-y-4">
                              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Tutoring Subjects</label>
                              <div className="flex flex-wrap gap-2">
                                 {['Mathematics', 'Physics', 'SiSwati', 'English', 'Biology', 'Chemistry', 'Geography', 'History'].map(sub => (
                                    <button
                                      key={sub}
                                      onClick={() => {
                                        const subjects = tutorProfileForm!.subjects.includes(sub)
                                          ? tutorProfileForm!.subjects.filter(s => s !== sub)
                                          : [...tutorProfileForm!.subjects, sub];
                                        setTutorProfileForm(prev => ({ ...prev!, subjects }));
                                      }}
                                      className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${tutorProfileForm!.subjects.includes(sub) ? 'bg-amber-600 text-white border-amber-600 shadow-lg shadow-amber-600/20' : 'bg-white text-slate-500 border-slate-200'}`}
                                    >
                                       {sub}
                                    </button>
                                 ))}
                              </div>
                           </div>

                           <div className="space-y-4">
                              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Bio / Introduction</label>
                              <textarea 
                                className="w-full bg-slate-50 border border-slate-100 rounded-[32px] p-6 font-medium text-slate-600 h-32 resize-none focus:bg-white focus:border-amber-400 transition-all outline-none"
                                placeholder="Describe your teaching style and experience..."
                                value={tutorProfileForm?.bio}
                                onChange={(e) => setTutorProfileForm(prev => ({ ...prev!, bio: e.target.value }))}
                              />
                           </div>
                        </div>

                        <div className="space-y-8">
                           <div className="space-y-4">
                              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Weekly Availability</label>
                              <div className="grid grid-cols-7 gap-2">
                                 {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => {
                                    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                                    const isSelected = tutorProfileForm!.availability.days.includes(dayNames[i]);
                                    return (
                                       <button
                                         key={i}
                                         onClick={() => {
                                           const days = isSelected
                                             ? tutorProfileForm!.availability.days.filter(d => d !== dayNames[i])
                                             : [...tutorProfileForm!.availability.days, dayNames[i]];
                                           setTutorProfileForm(prev => ({ ...prev!, availability: { ...prev!.availability, days } }));
                                         }}
                                         className={`h-12 rounded-xl flex items-center justify-center text-[10px] font-black border transition-all ${isSelected ? 'bg-slate-900 text-white border-slate-900 shadow-lg' : 'bg-slate-50 text-slate-400 border-slate-100'}`}
                                       >
                                          {day}
                                       </button>
                                    )
                                 })}
                              </div>
                           </div>

                           <div className="grid grid-cols-2 gap-6">
                              <div className="space-y-4">
                                 <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest uppercase">Preferred Time Slot</label>
                                 <input 
                                   className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold text-slate-900 outline-none"
                                   placeholder="e.g. 16:00 - 18:00"
                                   value={tutorProfileForm?.availability.timeRange}
                                   onChange={(e) => setTutorProfileForm(prev => ({ ...prev!, availability: { ...prev!.availability, timeRange: e.target.value } }))}
                                 />
                              </div>
                              <div className="space-y-4">
                                 <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest uppercase tracking-widest">Rate (SZL / Hr)</label>
                                 <input 
                                   type="number"
                                   className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold text-slate-900 outline-none"
                                   value={tutorProfileForm?.hourlyRate}
                                   onChange={(e) => setTutorProfileForm(prev => ({ ...prev!, hourlyRate: parseInt(e.target.value) }))}
                                 />
                              </div>
                           </div>

                           <div className="p-8 bg-amber-50 rounded-[32px] border border-amber-100 space-y-4">
                              <div className="flex items-center gap-3">
                                 <Sparkles className="text-amber-500 w-5 h-5" />
                                 <h4 className="text-sm font-black text-amber-900 uppercase tracking-widest">Pro Tip</h4>
                              </div>
                              <p className="text-xs text-amber-700 font-medium leading-relaxed">
                                 Detailed bios and specific availability slots increase student connection rates by up to 40%. Listing your primary institution also builds trust.
                              </p>
                           </div>
                        </div>
                     </div>

                     <div className="flex justify-end gap-4 pt-12 border-t border-slate-100">
                        <button 
                          onClick={() => setIsEditingTutorProfile(false)}
                          className="px-8 py-4 bg-slate-50 text-slate-400 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-100 transition-all"
                        >
                           Discard Changes
                        </button>
                        <button 
                          onClick={handleUpdateTutorProfile}
                          disabled={saveStatus === 'saving'}
                          className="px-12 py-4 bg-amber-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-amber-600/20 hover:bg-amber-700 transition-all flex items-center gap-3"
                        >
                           {saveStatus === 'saving' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                           Save Tutor Profile
                        </button>
                     </div>
                  </motion.div>
               )}

               <div>
                  <div className="flex items-center justify-between mb-8">
                     <h3 className="text-2xl font-black text-slate-900 tracking-tight">My Published Products</h3>
                     <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-amber-600" />
                        <span className="text-xs font-bold text-slate-500">Live Sales Data</span>
                     </div>
                  </div>
                  
                  <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
                     <table className="w-full text-left border-collapse">
                        <thead>
                           <tr className="bg-slate-50 border-b border-slate-100">
                              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Resource Details</th>
                              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Price</th>
                              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Sales</th>
                              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Revenue (Net)</th>
                              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Action</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 italic">
                           {[
                              { title: 'Full Form 5 Maths Revision Pack', type: 'Study Pack', price: 150, sales: 12, net: 1440 },
                              { title: 'Biology Lab Report Templates', type: 'Templates', price: 45, sales: 8, net: 288 },
                              { title: 'EGCSE English Essay Guide', type: 'Guide', price: 75, sales: 4, net: 240 }
                           ].map((item, i) => (
                              <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                                 <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                       <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 font-bold">
                                          {item.title[0]}
                                       </div>
                                       <div>
                                          <p className="font-black text-slate-900">{item.title}</p>
                                          <p className="text-[10px] font-black uppercase text-slate-400">{item.type}</p>
                                       </div>
                                    </div>
                                 </td>
                                 <td className="px-8 py-6 font-bold text-slate-600 italic">SZL {item.price}</td>
                                 <td className="px-8 py-6 font-bold text-slate-900">{item.sales} units</td>
                                 <td className="px-8 py-6">
                                    <p className="font-black text-emerald-600">SZL {item.net}</p>
                                    <p className="text-[9px] font-black text-slate-400 uppercase">After 20% commission</p>
                                 </td>
                                 <td className="px-8 py-6 text-right">
                                    <button className="p-3 bg-slate-100 text-slate-400 rounded-xl hover:bg-slate-900 hover:text-white transition-all">
                                       <Edit2 className="w-4 h-4" />
                                    </button>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
          )}
          {activeTab === 'classroom' && (
            <div className="grid grid-cols-1 gap-8 animate-in fade-in duration-300">
              {/* Create Form Section */}
              {isCreating && (
            <div className="bg-white rounded-[40px] border-4 border-dashed border-blue-200 p-10 animate-in zoom-in-95 duration-300">
               <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-black text-slate-900">Create New Progress Report</h2>
                  <button onClick={() => setIsCreating(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                    <X className="w-6 h-6" />
                  </button>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Student Name</label>
                    <input 
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 font-bold text-slate-900"
                      value={editForm.studentName}
                      onChange={(e) => setEditForm({...editForm, studentName: e.target.value})}
                      placeholder="Enter Full Name"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Assigned Teacher</label>
                    <select 
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 font-bold text-slate-900"
                      value={editForm.teacherId}
                      onChange={(e) => setEditForm({...editForm, teacherId: e.target.value})}
                    >
                      <option value={user.id}>{user.name} (You)</option>
                      {institutionTeachers.filter(t => t.id !== user.id).map(t => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Term</label>
                      <select 
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 font-bold text-slate-900"
                        value={editForm.term}
                        onChange={(e) => setEditForm({...editForm, term: e.target.value})}
                      >
                        <option>Term 1</option>
                        <option>Term 2</option>
                        <option>Term 3</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Year</label>
                      <input 
                        type="number"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 font-bold text-slate-900"
                        value={editForm.year}
                        onChange={(e) => setEditForm({...editForm, year: parseInt(e.target.value)})}
                      />
                    </div>
                  </div>
               </div>

               <div className="flex justify-end gap-3 pt-8 border-t">
                  <button 
                    onClick={() => setIsCreating(false)}
                    className="px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black uppercase tracking-widest text-[10px]"
                  >
                    Discard Draft
                  </button>
                  <button 
                    onClick={handleSave}
                    disabled={!editForm.studentName || saveStatus === 'saving'}
                    className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg disabled:opacity-50"
                  >
                    {saveStatus === 'saving' ? 'Creating...' : 'Finalize & Create Report'}
                  </button>
               </div>
            </div>
          )}

          {filteredData.length === 0 && !isCreating ? (
            <div className="text-center py-32 bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200">
               <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <Users className="w-8 h-8 text-slate-300" />
               </div>
               <h3 className="text-xl font-black text-slate-900">No students found</h3>
               <p className="text-slate-400 font-medium mt-2">Adjust your search or create a new student report.</p>
               <button onClick={startCreate} className="mt-8 text-blue-600 font-black uppercase tracking-widest text-[10px] hover:underline underline-offset-8">
                 + Create your first report
               </button>
            </div>
          ) : (
            filteredData.map(progress => {
              const isEditing = editingId === progress.id;
              const data = isEditing ? editForm as StudentProgress : progress;

              return (
                <div key={progress.id} className={`transition-all duration-500 bg-white rounded-[40px] border shadow-sm overflow-hidden ${isEditing ? 'border-blue-200 ring-4 ring-blue-50' : 'border-slate-100 hover:shadow-md'}`}>
                  {/* Header Card */}
                  <div className={`p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b transition-colors ${isEditing ? 'bg-blue-600 border-blue-700 text-white' : 'bg-slate-50 border-slate-100 text-slate-900'}`}>
                    <div className="flex items-center gap-6">
                      <div className={`w-16 h-16 rounded-3xl flex items-center justify-center text-2xl shadow-inner ${isEditing ? 'bg-white/20' : 'bg-white border border-slate-200 text-blue-600'}`}>
                        {data.studentName.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                           <h2 className="text-2xl font-black tracking-tight">{data.studentName}</h2>
                           {!isEditing && <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-[8px] font-black uppercase tracking-widest">Active</span>}
                        </div>
                        <div className="flex items-center gap-4 mt-1 opacity-70">
                          <span className="text-xs font-bold">{data.term} {data.year}</span>
                          <div className="w-1 h-1 rounded-full bg-current" />
                          <span className="text-xs font-bold lowercase italic">Teacher: {institutionTeachers.find(t => t.id === data.teacherId)?.name || 'Assigned'}</span>
                          <div className="w-1 h-1 rounded-full bg-current" />
                          <span className="text-xs font-bold lowercase italic">last updated {new Date(data.lastUpdated).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 w-full md:w-auto">
                      {isEditing ? (
                        <>
                          <button 
                            onClick={() => setEditingId(null)}
                            className="flex-1 md:flex-none px-6 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all"
                          >
                            Cancel
                          </button>
                          <button 
                            onClick={handleSave}
                            disabled={saveStatus === 'saving'}
                            className="flex-1 md:flex-none px-8 py-4 bg-white text-blue-600 hover:bg-slate-50 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg transition-all flex items-center justify-center gap-2"
                          >
                            <Save className="w-4 h-4" />
                            {saveStatus === 'saving' ? 'Saving...' : 'Save Report'}
                          </button>
                        </>
                      ) : (
                        <button 
                          onClick={() => handleEditClick(progress)}
                          className="w-full md:w-auto px-8 py-4 bg-slate-900 hover:bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2 shadow-xl"
                        >
                          <Edit2 className="w-4 h-4" />
                          Edit Progress
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="p-8 md:p-10">
                    {isEditing && (
                      <div className="mb-8 p-6 bg-blue-50 rounded-3xl border border-blue-100">
                        <label className="block text-[10px] font-black text-blue-400 uppercase tracking-widest mb-3">Reassign Academic Oversight</label>
                        <div className="flex flex-wrap gap-3">
                          <button 
                            onClick={() => setEditForm({...editForm, teacherId: user.id})}
                            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${editForm.teacherId === user.id ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border border-blue-200'}`}
                          >
                            Assign to Me
                          </button>
                          {institutionTeachers.filter(t => t.id !== user.id).map(t => (
                            <button 
                              key={t.id}
                              onClick={() => setEditForm({...editForm, teacherId: t.id})}
                              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${editForm.teacherId === t.id ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border border-blue-200'}`}
                            >
                              {t.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                      {/* Academic Performance */}
                      <div className="lg:col-span-12">
                         <div className="flex items-center gap-3 mb-8">
                            <BookOpen className="w-5 h-5 text-blue-600" />
                            <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase tracking-widest text-xs">Unit Performance</h3>
                         </div>
                         
                         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {data.academics.map((acad, idx) => (
                              <div key={idx} className="group p-8 bg-slate-50 rounded-[32px] border border-slate-100 relative transition-all hover:bg-white hover:border-blue-200 hover:shadow-xl">
                                {isEditing ? (
                                  <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                      <input 
                                        className="bg-transparent border-none p-0 font-black text-slate-900 focus:ring-0 w-full"
                                        value={acad.subject}
                                        onChange={(e) => handleAcademicChange(idx, 'subject', e.target.value)}
                                        placeholder="Subject Name"
                                      />
                                      <button 
                                        onClick={() => {
                                          const newAcademics = [...(editForm.academics || [])];
                                          newAcademics.splice(idx, 1);
                                          setEditForm({ ...editForm, academics: newAcademics });
                                        }}
                                        className="text-rose-400 hover:text-rose-600 p-1"
                                      >
                                        ✕
                                      </button>
                                    </div>
                                    <input 
                                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-black text-blue-600 text-xl"
                                      value={acad.grade}
                                      onChange={(e) => handleAcademicChange(idx, 'grade', e.target.value)}
                                      placeholder="A+"
                                    />
                                    <div className="relative">
                                      <textarea 
                                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-medium text-sm text-slate-500 h-24 resize-none pr-10"
                                        value={acad.comments}
                                        onChange={(e) => handleAcademicChange(idx, 'comments', e.target.value)}
                                        placeholder="Teacher comments..."
                                      />
                                      <button
                                        onClick={() => handleAutoComment(idx, acad.subject, acad.grade)}
                                        disabled={!acad.subject || !acad.grade || isGeneratingComment === idx}
                                        className="absolute top-2 right-2 p-2 bg-fuchsia-100 text-fuchsia-600 hover:bg-fuchsia-200 rounded-lg transition-colors shadow-sm disabled:opacity-50"
                                        title="Auto-Generate Comment"
                                      >
                                        {isGeneratingComment === idx ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <div className="flex justify-between items-start mb-6">
                                      <h4 className="text-slate-400 font-black uppercase tracking-widest text-[10px]">{acad.subject}</h4>
                                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-xl font-black text-blue-600 shadow-sm">
                                        {acad.grade}
                                      </div>
                                    </div>
                                    <p className="text-slate-600 font-medium text-sm leading-relaxed">{acad.comments}</p>
                                  </>
                                )}
                              </div>
                            ))}
                            {isEditing && (
                              <button 
                                onClick={() => {
                                  setEditForm({
                                    ...editForm,
                                    academics: [...(editForm.academics || []), { subject: '', grade: '', comments: '' }]
                                  });
                                }}
                                className="p-8 border-4 border-dashed border-slate-100 rounded-[32px] flex flex-col items-center justify-center gap-4 text-slate-300 hover:text-blue-400 hover:border-blue-100 hover:bg-blue-50/30 transition-all min-h-[250px]"
                              >
                                <div className="w-16 h-16 rounded-full border-4 border-current flex items-center justify-center text-4xl font-light">+</div>
                                <span className="font-black uppercase tracking-widest text-[10px]">Add Evaluation Subject</span>
                              </button>
                            )}
                         </div>
                      </div>

                      {/* Conduct & Participation */}
                      <div className="lg:col-span-6">
                        <div className="flex items-center gap-3 mb-8">
                            <Activity className="w-5 h-5 text-emerald-600" />
                            <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase tracking-widest text-xs">Behavioral Conduct</h3>
                        </div>
                        <div className="bg-slate-50 rounded-[32px] p-8 border border-slate-100 h-full">
                          {isEditing ? (
                            <div className="space-y-6">
                               <div>
                                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Rating</label>
                                  <div className="grid grid-cols-2 gap-3">
                                    {['Excellent', 'Good', 'Needs Improvement', 'Poor'].map((r) => (
                                      <button
                                        key={r}
                                        onClick={() => setEditForm({...editForm, behavior: { ...editForm.behavior!, rating: r as any }})}
                                        className={`px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${data.behavior.rating === r ? 'bg-slate-900 text-white border-slate-900 shadow-lg' : 'bg-white text-slate-500 border-slate-200'}`}
                                      >
                                        {r}
                                      </button>
                                    ))}
                                  </div>
                               </div>
                               <div>
                                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Detailed Observations</label>
                                  <textarea 
                                    className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 font-medium text-slate-600 h-32 resize-none"
                                    value={data.behavior.comments}
                                    onChange={(e) => setEditForm({...editForm, behavior: { ...editForm.behavior!, comments: e.target.value }})}
                                    placeholder="Observations about discipline..."
                                  />
                               </div>
                            </div>
                          ) : (
                            <div className="flex flex-col gap-6">
                              <div className="flex items-center justify-between">
                                 <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm ${
                                    data.behavior.rating === 'Excellent' ? 'bg-emerald-500 text-white' : 
                                    data.behavior.rating === 'Good' ? 'bg-blue-500 text-white' : 'bg-rose-500 text-white'
                                 }`}>
                                    {data.behavior.rating} Status
                                 </div>
                                 <ClipboardList className="w-5 h-5 text-slate-300" />
                              </div>
                              <p className="text-slate-600 font-medium leading-relaxed italic border-l-4 border-slate-200 pl-6 py-2">
                                "{data.behavior.comments}"
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="lg:col-span-6">
                        <div className="flex items-center gap-3 mb-8">
                            <Users className="w-5 h-5 text-purple-600" />
                            <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase tracking-widest text-xs">Engagement Level</h3>
                        </div>
                        <div className="bg-slate-50 rounded-[32px] p-8 border border-slate-100 h-full">
                           {isEditing ? (
                             <div className="space-y-6">
                                <div>
                                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Participation Level</label>
                                  <div className="grid grid-cols-3 gap-3">
                                    {['High', 'Medium', 'Low'].map((r) => (
                                      <button
                                        key={r}
                                        onClick={() => setEditForm({...editForm, participation: { ...editForm.participation!, rating: r as any }})}
                                        className={`px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${data.participation.rating === r ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-500 border-slate-200'}`}
                                      >
                                        {r}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Extra-Curricular Activities</label>
                                  <input 
                                    className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 font-bold text-slate-900"
                                    value={data.participation.activities.join(', ')}
                                    onChange={(e) => setEditForm({
                                      ...editForm, 
                                      participation: { ...editForm.participation!, activities: e.target.value.split(',').map(s => s.trim()).filter(s => s !== '') }
                                    })}
                                    placeholder="e.g. Debate, Swimming, Coding"
                                  />
                                </div>
                             </div>
                           ) : (
                             <div className="space-y-6">
                               <div className="flex items-center gap-3">
                                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active In:</span>
                                  <div className="flex flex-wrap gap-2">
                                    {data.participation.activities.map((act, i) => (
                                      <span key={i} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-black text-slate-600 uppercase tracking-widest shadow-sm">
                                        {act}
                                      </span>
                                    ))}
                                    {data.participation.activities.length === 0 && <span className="text-slate-400 text-xs italic">No activities listed</span>}
                                  </div>
                               </div>
                               <p className="text-slate-600 font-medium leading-relaxed bg-white/50 p-6 rounded-2xl border border-white">
                                  {data.participation.comments || "No participation comments recorded."}
                               </p>
                             </div>
                           )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        )}

        {/* Resources Exchange Tab */}
        {activeTab === 'resources' && (
          <div className="animate-in fade-in duration-300">
            {/* Header / Info Panel */}
            <div className="bg-slate-900 rounded-[40px] text-white p-10 mb-8 border border-slate-800 shadow-xl overflow-hidden relative">
               <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px]" />
               <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                 <div className="md:w-2/3">
                   <div className="flex items-center gap-3 mb-4">
                     <FolderOpen className="w-8 h-8 text-indigo-400" />
                     <h2 className="text-3xl font-black text-white tracking-tight">National Resource Exchange</h2>
                   </div>
                   <p className="text-slate-300 font-medium leading-relaxed max-w-xl">
                     Access certified MoET syllabi, crowdsource EGCSE past papers, and download lesson plans uploaded directly by educators across Eswatini.
                   </p>
                 </div>
                 <div className="w-full md:w-auto">
                   <button 
                     onClick={() => setIsUploading(true)}
                     className="w-full md:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-indigo-900/50 flex items-center justify-center gap-3"
                   >
                     <UploadCloud className="w-4 h-4" /> Upload Material
                   </button>
                 </div>
               </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-8">
               <button 
                 onClick={() => setResourceFilter('all')}
                 className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${resourceFilter === 'all' ? 'bg-slate-900 text-white border-slate-900 shadow-lg' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
               >
                 All Resources
               </button>
               <button 
                 onClick={() => setResourceFilter('syllabus')}
                 className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${resourceFilter === 'syllabus' ? 'bg-blue-600 text-white border-blue-600 shadow-lg' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
               >
                 Syllabi & Guides
               </button>
               <button 
                 onClick={() => setResourceFilter('past_paper')}
                 className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${resourceFilter === 'past_paper' ? 'bg-amber-500 text-white border-amber-500 shadow-lg' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
               >
                 Past Papers
               </button>
               <button 
                 onClick={() => setResourceFilter('lesson_plan')}
                 className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${resourceFilter === 'lesson_plan' ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
               >
                 Lesson Plans
               </button>
            </div>

            {/* Resource Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {resources.filter(r => resourceFilter === 'all' || r.type === resourceFilter).map(resource => (
                 <div key={resource.id} className="bg-white rounded-[32px] border border-slate-100 p-8 hover:shadow-2xl hover:border-indigo-100 transition-all group flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${
                        resource.type === 'syllabus' ? 'bg-blue-500 shadow-blue-500/20' : 
                        resource.type === 'past_paper' ? 'bg-amber-500 shadow-amber-500/20' : 
                        'bg-emerald-500 shadow-emerald-500/20'
                      }`}>
                        {resource.type === 'syllabus' && <FileText className="w-6 h-6" />}
                        {resource.type === 'past_paper' && <FileArchive className="w-6 h-6" />}
                        {resource.type === 'lesson_plan' && <Lightbulb className="w-6 h-6" />}
                      </div>
                      <div className="flex flex-col items-end gap-1">
                         <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{resource.size}</span>
                         {resource.rating > 0 && (
                           <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2 py-1 rounded-md">
                             <Star className="w-3 h-3 fill-amber-500" />
                             <span className="text-[10px] font-bold">{resource.rating}</span>
                           </div>
                         )}
                      </div>
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex gap-2 mb-3">
                         <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-[9px] font-black uppercase tracking-widest">{resource.subject}</span>
                         <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-[9px] font-black uppercase tracking-widest">{resource.level}</span>
                      </div>
                      <h3 className="text-xl font-black text-slate-900 leading-tight mb-2 group-hover:text-indigo-600 transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-sm font-medium text-slate-500 tracking-tight">By {resource.authorName || resource.author}</p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                       <div className="flex flex-col">
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                           {resource.downloads.toLocaleString()} Downloads
                         </span>
                         {resource.price > 0 ? (
                           <span className="text-xs font-black text-emerald-600">SZL {resource.price}</span>
                         ) : (
                           <span className="text-[10px] font-black text-blue-600 uppercase">Free Community Resource</span>
                         )}
                       </div>
                       <button className="flex items-center gap-2 text-indigo-600 bg-indigo-50 hover:bg-indigo-600 hover:text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors">
                         <Download className="w-4 h-4" /> {resource.price > 0 ? 'Buy' : 'Get'}
                       </button>
                    </div>
                 </div>
               ))}
            </div>

            {/* Upload Modal */}
            {isUploading && (
              <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
                  onClick={() => setIsUploading(false)}
                />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="bg-white rounded-[40px] w-full max-w-xl p-10 relative z-10 shadow-2xl overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl -mr-16 -mt-16" />
                  
                  <div className="flex justify-between items-center mb-8 relative">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Upload Academic Material</h3>
                    <button onClick={() => setIsUploading(false)} className="text-slate-400 hover:text-slate-600">
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <form onSubmit={handleUploadSubmit} className="space-y-6 relative">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Type</label>
                        <select 
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-bold text-sm"
                          value={uploadForm.type}
                          onChange={e => setUploadForm({...uploadForm, type: e.target.value as any})}
                        >
                          <option value="past_paper">Past Paper</option>
                          <option value="lesson_plan">Lesson Plan</option>
                          <option value="guide">Revision Guide</option>
                          <option value="syllabus">Syllabus Breakdown</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Level</label>
                        <select 
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-bold text-sm"
                          value={uploadForm.level}
                          onChange={e => setUploadForm({...uploadForm, level: e.target.value})}
                        >
                          <option value="EPC">EPC (Primary)</option>
                          <option value="JC">JC (Junior)</option>
                          <option value="EGCSE">EGCSE</option>
                          <option value="IGCSE">IGCSE</option>
                          <option value="Pre-Voc">Pre-Voc</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Resource Title</label>
                      <input 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-bold"
                        placeholder="e.g. Nov 2023 Math Paper 2"
                        value={uploadForm.title}
                        onChange={e => setUploadForm({...uploadForm, title: e.target.value})}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Subject</label>
                        <input 
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-bold"
                          placeholder="e.g. Mathematics"
                          value={uploadForm.subject}
                          onChange={e => setUploadForm({...uploadForm, subject: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Price (SZL)</label>
                        <input 
                          type="number"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-bold"
                          placeholder="0 for Free"
                          value={uploadForm.price}
                          onChange={e => setUploadForm({...uploadForm, price: parseFloat(e.target.value) || 0})}
                        />
                        <p className="text-[9px] text-slate-400 font-medium mt-1">Leave 0 to share for free.</p>
                      </div>
                    </div>

                    <div className="p-8 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center bg-slate-50 group hover:border-indigo-400 transition-colors">
                      <UploadCloud className="w-10 h-10 text-slate-300 mb-2 group-hover:text-indigo-500 transition-colors" />
                      <p className="text-[10px] font-black text-slate-400 uppercase">Select File (PDF, DOCX)</p>
                    </div>

                    <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-indigo-700 transition-all">
                      Finalize & Publish
                    </button>
                  </form>
                </motion.div>
              </div>
            )}
            
            {MOCK_RESOURCES.filter(r => resourceFilter === 'all' || r.type === resourceFilter).length === 0 && (
              <div className="text-center py-20 bg-white rounded-[40px] border border-slate-100">
                 <FolderOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                 <h3 className="text-xl font-black text-slate-400">No resources found</h3>
              </div>
            )}
          </div>
        )}

        {/* AI Co-Teacher Tab */}
        {activeTab === 'ai_assistant' && (
          <div className="animate-in fade-in duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
               
               {/* Left Column: AI Tools Panel */}
               <div className="lg:col-span-4 space-y-6">
                 <div className="bg-fuchsia-900 rounded-[32px] p-8 shadow-xl relative overflow-hidden text-white">
                   <div className="absolute -top-10 -right-10 w-40 h-40 bg-fuchsia-500 rounded-full blur-[50px] opacity-30" />
                   <div className="relative z-10">
                     <Bot className="w-10 h-10 text-fuchsia-300 mb-6" />
                     <h2 className="text-2xl font-black mb-2">AI Co-Teacher</h2>
                     <p className="text-fuchsia-200 text-sm font-medium leading-relaxed">
                       Generate lesson quizzes, grading rubrics, and automated student progress comments in seconds.
                     </p>
                   </div>
                 </div>

                 {/* Tool Selectors */}
                 <div className="space-y-3">
                   <button 
                     onClick={() => setAiMode('quiz')}
                     className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all border ${aiMode === 'quiz' ? 'bg-fuchsia-50 border-fuchsia-200 shadow-sm' : 'bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50'}`}
                   >
                     <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${aiMode === 'quiz' ? 'bg-fuchsia-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                       <FileText className="w-5 h-5" />
                     </div>
                     <div className="text-left">
                       <h4 className={`font-black text-sm ${aiMode === 'quiz' ? 'text-fuchsia-900' : 'text-slate-600'}`}>Quiz Generator</h4>
                       <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Multiple Choice & Keys</p>
                     </div>
                   </button>
                   <button 
                     onClick={() => setAiMode('rubric')}
                     className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all border ${aiMode === 'rubric' ? 'bg-fuchsia-50 border-fuchsia-200 shadow-sm' : 'bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50'}`}
                   >
                     <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${aiMode === 'rubric' ? 'bg-fuchsia-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                       <ClipboardList className="w-5 h-5" />
                     </div>
                     <div className="text-left">
                       <h4 className={`font-black text-sm ${aiMode === 'rubric' ? 'text-fuchsia-900' : 'text-slate-600'}`}>Rubric Builder</h4>
                       <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Grading frameworks</p>
                     </div>
                   </button>
                 </div>
               </div>

               {/* Right Column: Interaction Window */}
               <div className="lg:col-span-8 flex flex-col gap-6">
                 {/* Input Area */}
                 <div className="bg-white rounded-[32px] border border-slate-200 p-8 shadow-sm">
                   <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                     {aiMode === 'quiz' ? 'Topic & Grade Level' : 'Assignment Type & Criteria'}
                   </label>
                   <textarea 
                     className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-6 font-medium text-slate-900 focus:ring-4 focus:ring-fuchsia-50 focus:border-fuchsia-200 transition-all min-h-[120px] resize-none"
                     placeholder={
                       aiMode === 'quiz' 
                         ? "e.g. Generate a 10-question multiple-choice quiz on Swazi History (King Sobhuza II) for Form 4s." 
                         : "e.g. Generate a detailed grading rubric for a Form 5 Physical Science laboratory report on Titration."
                     }
                     value={aiPrompt}
                     onChange={(e) => setAiPrompt(e.target.value)}
                   />
                   <div className="flex justify-between items-center mt-6">
                     <p className="text-slate-400 text-xs font-medium">Powered by Gemini</p>
                     <button 
                       onClick={handleGenerateAI}
                       disabled={isAiLoading || !aiPrompt.trim()}
                       className="px-8 py-4 bg-fuchsia-600 hover:bg-fuchsia-700 disabled:bg-slate-300 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-fuchsia-200 transition-all flex items-center gap-2"
                     >
                       {isAiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                       {isAiLoading ? 'Generating...' : 'Generate Content'}
                     </button>
                   </div>
                 </div>

                 {/* Output Area */}
                 {(aiResult || isAiLoading || aiError) && (
                   <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                     <div className="bg-slate-50 border-b border-slate-100 px-8 py-4 flex justify-between items-center">
                       <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Generation Result</h3>
                       {aiResult && (
                         <button className="text-indigo-600 hover:text-indigo-700 text-[10px] font-black flex items-center gap-1 uppercase tracking-widest">
                           <Save className="w-3 h-3" /> Save to Drive
                         </button>
                       )}
                     </div>
                     <div className="p-8">
                       {isAiLoading ? (
                         <div className="flex flex-col items-center justify-center py-12 text-fuchsia-500">
                           <Loader2 className="w-8 h-8 animate-spin mb-4" />
                           <p className="font-bold text-[10px] uppercase tracking-widest animate-pulse">Consulting Gemini Engine...</p>
                         </div>
                       ) : aiError ? (
                         <div className="bg-rose-50 text-rose-600 p-6 rounded-2xl text-sm font-medium border border-rose-100">
                           {aiError}
                         </div>
                       ) : (
                         <div className="prose prose-slate max-w-none text-sm font-medium whitespace-pre-wrap">
                           {aiResult}
                         </div>
                       )}
                     </div>
                   </div>
                 )}
               </div>
            </div>
          </div>
        )}

        {/* Classroom Management Tab */}
        {activeTab === 'management' && (
          <div className="animate-in fade-in duration-300">
             <div className="bg-rose-900 rounded-[40px] text-white p-10 mb-8 border border-rose-800 shadow-xl overflow-hidden relative">
               <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/20 rounded-full blur-[100px]" />
               <div className="relative z-10">
                 <div className="flex items-center gap-3 mb-4">
                   <CalendarCheck className="w-8 h-8 text-rose-300" />
                   <h2 className="text-3xl font-black tracking-tight">Daily Roll Call & Ledger</h2>
                 </div>
                 <p className="text-rose-200 font-medium leading-relaxed max-w-xl">
                   Mark attendance and issue fast behavioral alerts that trigger immediate push notifications to connected parent guardians.
                 </p>
               </div>
             </div>

             <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                  {/* Left Column: Ledger Form */}
                  <div className="md:col-span-5 p-8 border-b md:border-b-0 md:border-r border-slate-100 bg-slate-50/50">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Quick Issue Ledger</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Student Name</label>
                        <select className="w-full bg-white border border-slate-200 rounded-xl p-4 font-bold text-slate-900 focus:ring-2 focus:ring-rose-100 outline-none">
                          <option value="">Select Student...</option>
                          {attendanceList.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Notice Type</label>
                        <div className="grid grid-cols-2 gap-3">
                          <button onClick={() => triggerAlert('merit', 'Merit Logged & Parent Notified')} className="p-4 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-100 transition-colors">
                             <Award className="w-4 h-4" /> Issue Merit
                          </button>
                          <button onClick={() => triggerAlert('alert', 'Discipline Alert Sent Home')} className="p-4 bg-rose-50 text-rose-700 border border-rose-200 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-rose-100 transition-colors">
                             <ShieldAlert className="w-4 h-4" /> Log Demerit
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Brief Incident description</label>
                        <textarea className="w-full bg-white border border-slate-200 rounded-xl p-4 font-medium text-sm resize-none h-24" placeholder="Type here..."></textarea>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Attendance */}
                  <div className="md:col-span-7 pb-4">
                    <div className="px-8 py-6 border-b border-slate-100">
                       <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Today's Attendance</h3>
                    </div>
                    <div className="divide-y divide-slate-100">
                      {attendanceList.map(student => (
                        <div key={student.id} className="p-4 px-8 flex items-center justify-between hover:bg-slate-50 transition-colors">
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-900">{student.name}</span>
                            <div className="flex gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                               <span className="text-emerald-500">{student.merits} Merits</span>
                               <span className="text-rose-500">{student.demerits} Demerits</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                             <button
                               onClick={() => handleAttendanceChange(student.id, 'present')}
                               className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${student.status === 'present' ? 'bg-emerald-500 text-white shadow-md' : 'bg-slate-100 text-slate-400 hover:bg-emerald-50 hover:text-emerald-500'}`}
                             >
                                <UserCheck className="w-4 h-4" />
                             </button>
                             <button
                               onClick={() => handleAttendanceChange(student.id, 'late')}
                               className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm transition-all ${student.status === 'late' ? 'bg-amber-500 text-white shadow-md' : 'bg-slate-100 text-slate-400 hover:bg-amber-50 hover:text-amber-500'}`}
                             >
                                L
                             </button>
                             <button
                               onClick={() => {
                                 handleAttendanceChange(student.id, 'absent');
                                 if (student.status !== 'absent') {
                                   triggerAlert('alert', `Absence Notice triggered for ${student.name}'s parents`);
                                 }
                               }}
                               className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${student.status === 'absent' ? 'bg-rose-500 text-white shadow-md' : 'bg-slate-100 text-slate-400 hover:bg-rose-50 hover:text-rose-500'}`}
                             >
                                <UserX className="w-4 h-4" />
                             </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
             </div>
          </div>
        )}

        {/* CPD Tab */}
        {activeTab === 'cpd' && (
          <div className="animate-in fade-in duration-300">
            <div className="bg-emerald-900 rounded-[40px] text-white p-10 mb-8 border border-emerald-800 shadow-xl overflow-hidden relative">
               <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-[100px]" />
               <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                 <div className="md:w-2/3">
                   <div className="flex items-center gap-3 mb-4">
                     <Award className="w-8 h-8 text-emerald-300" />
                     <h2 className="text-3xl font-black text-white tracking-tight">Professional Development Forum</h2>
                   </div>
                   <p className="text-emerald-200 font-medium leading-relaxed max-w-xl">
                     Connect securely with educators across Eswatini. View official TSC transfer requests, job vacancies, and subject-specific teaching forums.
                   </p>
                 </div>
               </div>
            </div>

            <div className="flex gap-4 mb-8">
               <button 
                 onClick={() => setCpdFilter('forums')}
                 className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${cpdFilter === 'forums' ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
               >
                 Educator Forums
               </button>
               <button 
                 onClick={() => setCpdFilter('vacancies')}
                 className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${cpdFilter === 'vacancies' ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
               >
                 Vacancies & Transfers
               </button>
            </div>

            {cpdFilter === 'forums' ? (
              <div className="space-y-4">
                 {MOCK_FORUMS.map(forum => (
                   <div key={forum.id} className="bg-white border border-slate-100 rounded-3xl p-6 hover:shadow-lg transition-all group cursor-pointer flex justify-between items-center">
                      <div className="flex gap-6 items-center">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                           <MessageSquare className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex gap-2 mb-1">
                             <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[9px] font-black uppercase tracking-widest">{forum.topic}</span>
                             <span className="text-slate-400 text-[10px] font-bold">— Active {forum.active}</span>
                          </div>
                          <h3 className="text-lg font-black text-slate-900 group-hover:text-emerald-700 transition-colors">{forum.title}</h3>
                          <p className="text-sm font-medium text-slate-500">Started by {forum.author}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-emerald-600">
                         <div className="text-right hidden sm:block">
                            <span className="block text-2xl font-black">{forum.replies}</span>
                            <span className="block text-[9px] font-bold uppercase tracking-widest opacity-60 mt-[-4px]">Replies</span>
                         </div>
                         <ChevronRight className="w-6 h-6 opacity-30 group-hover:opacity-100 transition-opacity" />
                      </div>
                   </div>
                 ))}
                 <button className="w-full py-6 border-2 border-dashed border-slate-200 text-slate-400 font-black uppercase tracking-widest text-[10px] rounded-3xl hover:border-emerald-500 hover:text-emerald-600 transition-all flex items-center justify-center gap-2">
                    <Plus className="w-4 h-4" /> Start New Discussion
                 </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {MOCK_VACANCIES.map(vac => (
                   <div key={vac.id} className="bg-white border border-slate-100 rounded-[32px] p-8 hover:shadow-xl hover:border-slate-300 transition-all">
                      <div className="flex justify-between items-start mb-6">
                         <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-lg">
                           <Briefcase className="w-5 h-5" />
                         </div>
                         <span className="px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg text-[10px] font-black uppercase tracking-widest">
                           {vac.type}
                         </span>
                      </div>
                      <h3 className="text-xl font-black text-slate-900 leading-tight mb-2">{vac.role}</h3>
                      <p className="text-sm font-bold text-slate-500 mb-6">{vac.school} • {vac.location}</p>
                      
                      <div className="pt-6 border-t border-slate-100 border-dashed flex justify-between items-center">
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                           Closes: {new Date(vac.deadline).toLocaleDateString()}
                         </span>
                         <button className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md transition-colors">
                           View Details
                         </button>
                      </div>
                   </div>
                 ))}
              </div>
            )}
          </div>
        )}
        </>
      )}

      {/* Floating Alert Toast */}
      {alertToast.message && (
         <div className="fixed bottom-8 right-8 z-50 animate-in slide-in-from-bottom-8 fade-in">
           <div className={`px-6 py-4 rounded-2xl flex items-center gap-3 shadow-2xl border ${
             alertToast.type === 'merit' ? 'bg-emerald-600 text-white border-emerald-700' : 'bg-rose-600 text-white border-rose-700'
           }`}>
             <BellRing className="w-5 h-5 animate-pulse" />
             <span className="font-black text-sm tracking-wide">{alertToast.message}</span>
           </div>
         </div>
      )}
      
      {/* Help Footer */}
      <footer className="mt-20 pt-12 border-t border-slate-200 text-center">
         <div className="max-w-xl mx-auto">
            <GraduationCap className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <h4 className="text-slate-900 font-black uppercase tracking-widest text-[10px] mb-2">Authorized Teacher Access Only</h4>
            <p className="text-slate-400 text-sm font-medium">
              You are currently managing records for {user.institutionId ? "your assigned institution" : "students assigned directly to you"}. 
              All data is transmitted securely and synced in real-time with the parent portal.
            </p>
         </div>
      </footer>
    </div>
  );
};

export default TeacherDashboard;
