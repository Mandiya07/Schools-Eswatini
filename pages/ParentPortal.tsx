import React, { useState, useEffect } from 'react';
import { User, UserRole, StudentProgress } from '../types';
import { db, collection, query, where, getDocs, setDoc, doc, OperationType, handleFirestoreError } from '../src/lib/firebase';
import { BookOpen, Activity, Users, Save, Edit2, CheckCircle, AlertCircle, Bot, Sparkles, Loader2, Wallet, CreditCard, Receipt, GraduationCap, Building, ChevronRight, FileText, Download, ShieldCheck, BusFront, MapPin, Vote, FileSignature, Clock, ClipboardCheck, ThumbsUp, XCircle } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface ParentPortalProps {
  user: User;
}

const MOCK_FINANCES = {
  totalOwed: 2500,
  termlyFee: 4500,
  paidToDate: 2000,
  nextDeadline: '2026-05-01',
  transactions: [
    { id: '1', date: '2026-01-15', amount: 1500, type: 'Tuition Deposit', ref: 'MOMO-9482X' },
    { id: '2', date: '2026-02-28', amount: 500, type: 'Building Fund', ref: 'MOMO-7711Y' },
  ]
};

const MOCK_CONSENT_FORMS = [
  { id: 'c1', title: 'Biology Field Trip: Hlane Royal National Park', date: '2026-05-12', cost: 'E150 (Covered by MoMo)', deadline: '2026-04-30', requiresPin: true },
  { id: 'c2', title: 'Inter-School Athletics Day (Manzini)', date: '2026-06-05', cost: 'Free', deadline: '2026-05-20', requiresPin: false }
];

const MOCK_PTA_POLLS = [
  { id: 'p1', question: 'Should we increase the termly sports fee by E50 to fund a new bus?', options: ['Yes, we need transport', 'No, fees are too high', 'Undecided'], deadline: '2026-04-28' },
  { id: 'p2', question: 'Preferred start time for the Annual General Meeting (AGM)?', options: ['Saturday 9:00 AM', 'Saturday 2:00 PM', 'Sunday 2:00 PM'], deadline: '2026-05-02' }
];

const MOCK_GATE_LOGS = [
  { id: 'g1', student: 'Sipho Dlamini', time: '07:22 AM', date: 'Today', status: 'Arrived (On Time)', type: 'entry' },
  { id: 'g2', student: 'Sipho Dlamini', time: '04:15 PM', date: 'Yesterday', status: 'Departed', type: 'exit' },
  { id: 'g3', student: 'Sipho Dlamini', time: '07:28 AM', date: 'Yesterday', status: 'Arrived (On Time)', type: 'entry' }
];

const MOCK_BOARDING_PASSES = [
  { id: 'b1', student: 'Sipho Dlamini', reason: 'Family Event (Wedding)', leaveDate: '2026-04-24 14:00', returnDate: '2026-04-26 17:00', status: 'pending' }
];

const ParentPortal: React.FC<ParentPortalProps> = ({ user }) => {
  const [progressData, setProgressData] = useState<StudentProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<StudentProgress>>({});
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  const [activeView, setActiveView] = useState<'academic' | 'finance' | 'safety' | 'pta'>('academic');

  const [simulatedRole, setSimulatedRole] = useState<UserRole | null>(null);

  // Parent Interactive States
  const [signedConsents, setSignedConsents] = useState<string[]>([]);
  const [castVotes, setCastVotes] = useState<Record<string, string>>({});
  const [approvedPasses, setApprovedPasses] = useState<Record<string, 'approved' | 'denied'>>({});
  const [showPinModal, setShowPinModal] = useState<string | null>(null);
  const [pinInput, setPinInput] = useState('');

  // AI Translation States
  const [aiTranslatingId, setAiTranslatingId] = useState<string | null>(null);
  const [aiTranslations, setAiTranslations] = useState<{ [key: string]: string }>({});

  const isTeacher = simulatedRole === UserRole.TEACHER || user.role === UserRole.TEACHER;
  const isParent = simulatedRole === UserRole.PARENT || user.role === UserRole.PARENT;

  useEffect(() => {
    const fetchProgress = async () => {
      setLoading(true);
      try {
        const q = isTeacher 
          ? query(collection(db, 'student_progress'), where('teacherId', '==', user.id))
          : query(collection(db, 'student_progress'), where('parentId', '==', user.id));
        
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => doc.data() as StudentProgress);
        
        // If no data and we are testing, let's inject some mock data
        if (data.length === 0) {
          const mockData: StudentProgress[] = [
            {
              id: 'prog_1',
              studentId: 'stu_1',
              studentName: 'Sipho Dlamini',
              institutionId: 'inst_1',
              teacherId: isTeacher ? user.id : 'teacher_123',
              parentId: isParent ? user.id : 'parent_123',
              term: 'Term 1',
              year: 2026,
              academics: [
                { subject: 'Mathematics', grade: 'A', comments: 'Excellent problem-solving skills.' },
                { subject: 'Science', grade: 'B+', comments: 'Good understanding of concepts, needs to participate more in labs.' },
                { subject: 'English', grade: 'A-', comments: 'Strong reading comprehension.' }
              ],
              behavior: {
                rating: 'Excellent',
                comments: 'Sipho is a well-behaved student who respects peers and teachers.'
              },
              participation: {
                rating: 'High',
                activities: ['Debate Club', 'Science Fair'],
                comments: 'Very active in extracurriculars.'
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
  }, [user.id, isTeacher, isParent]);

  const handleEditClick = (progress: StudentProgress) => {
    setEditingId(progress.id);
    setEditForm(JSON.parse(JSON.stringify(progress))); // Deep copy
  };

  const handleSave = async () => {
    if (!editForm.id) return;
    setSaveStatus('saving');
    try {
      const updatedProgress = { ...editForm, lastUpdated: new Date().toISOString() } as StudentProgress;
      await setDoc(doc(db, 'student_progress', editForm.id), updatedProgress);
      
      setProgressData(prev => prev.map(p => p.id === editForm.id ? updatedProgress : p));
      setEditingId(null);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      setSaveStatus('error');
      handleFirestoreError(error, OperationType.UPDATE, `student_progress/${editForm.id}`);
    }
  };

  const handleAcademicChange = (index: number, field: string, value: string) => {
    const newAcademics = [...(editForm.academics || [])];
    newAcademics[index] = { ...newAcademics[index], [field]: value };
    setEditForm({ ...editForm, academics: newAcademics });
  };

  const handleTranslateReport = async (progressId: string, progressRecord: StudentProgress) => {
    setAiTranslatingId(progressId);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const recordSummary = `
        Student: ${progressRecord.studentName}
        Academics: ${progressRecord.academics.map(a => `${a.subject} (${a.grade}): ${a.comments}`).join('; ')}
        Behavior: ${progressRecord.behavior.rating}. ${progressRecord.behavior.comments}
      `;
      
      const prompt = `You are a helpful education liaison in Eswatini. 
      Read this teacher's report card:
      ${recordSummary}
      
      Task: Provide a "Plain-Language Translation" for the parent. 
      1. Summarize the academic standing simply. If possible, add a touch of SiSwati to make it welcoming (e.g., "Sawubona Mzali, Sipho is doing well...").
      2. Provide "Actionable Home Advice" (3 steps) on how the parent can help the student improve based on the teacher's feedback. Keep it practical and cheap (no expensive tutoring).
      Format nicely with markdown.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro',
        contents: prompt
      });
      
      if (response.text) {
        setAiTranslations(prev => ({...prev, [progressId]: response.text}));
      }
    } catch (err) {
      console.error("Translation Failed:", err);
      setAiTranslations(prev => ({...prev, [progressId]: "Failed to generate translation. Please try again."}));
    } finally {
      setAiTranslatingId(null);
    }
  };

  if (!isTeacher && !isParent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-8 max-w-md mx-auto p-10 bg-white rounded-[40px] shadow-xl border border-slate-100">
          <AlertCircle className="w-16 h-16 text-rose-500 mx-auto" />
          <div>
            <h2 className="text-2xl font-black text-slate-900">Access Restricted</h2>
            <p className="text-slate-500 mt-2">You must be a Parent or Teacher to view this portal.</p>
          </div>
          
          <div className="pt-8 border-t border-slate-100 space-y-4">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Demo Mode (Testing Only)</p>
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => setSimulatedRole(UserRole.TEACHER)}
                className="px-6 py-3 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl font-black uppercase tracking-widest text-[10px] transition-colors"
              >
                Simulate Teacher
              </button>
              <button 
                onClick={() => setSimulatedRole(UserRole.PARENT)}
                className="px-6 py-3 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-xl font-black uppercase tracking-widest text-[10px] transition-colors"
              >
                Simulate Parent
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            {isTeacher ? 'Teacher Portal' : 'Parent Portal'}
          </h1>
          <p className="text-slate-500 font-medium mt-2">
            {isTeacher ? 'Update student progress and performance.' : 'View your child\'s academic progress and behavior.'}
          </p>
        </div>
        {saveStatus === 'success' && (
          <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full font-bold text-sm animate-in fade-in">
            <CheckCircle className="w-4 h-4" />
            Changes Saved
          </div>
        )}
      </div>

      {!isTeacher && (
        <div className="flex flex-wrap gap-4 mb-8">
           <button 
             onClick={() => setActiveView('academic')}
             className={`px-6 py-4 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-3 transition-all ${activeView === 'academic' ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20' : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'}`}
           >
             <GraduationCap className="w-4 h-4" /> Academic Records
           </button>
           <button 
             onClick={() => setActiveView('finance')}
             className={`px-6 py-4 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-3 transition-all ${activeView === 'finance' ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-600/20' : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'}`}
           >
             <Wallet className="w-4 h-4" /> Financial Ledger
           </button>
           <button 
             onClick={() => setActiveView('safety')}
             className={`px-6 py-4 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-3 transition-all ${activeView === 'safety' ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'}`}
           >
             <ShieldCheck className="w-4 h-4" /> Safety & Boarding
           </button>
           <button 
             onClick={() => setActiveView('pta')}
             className={`px-6 py-4 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-3 transition-all ${activeView === 'pta' ? 'bg-purple-600 text-white shadow-xl shadow-purple-600/20' : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'}`}
           >
             <Vote className="w-4 h-4" /> PTA & Consent
           </button>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : progressData.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-slate-500 font-medium">No student progress records found.</p>
        </div>
      ) : (
        <div className="space-y-12">
          {(activeView === 'academic' || isTeacher) && progressData.map(progress => {
            const isEditing = editingId === progress.id;
            const data = isEditing ? editForm as StudentProgress : progress;

            return (
              <div key={progress.id} className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
                <div className="bg-slate-900 p-8 md:p-10 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div>
                    <h2 className="text-3xl font-black tracking-tight">{data.studentName}</h2>
                    <div className="flex items-center gap-4 mt-3">
                      <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest">
                        {data.term} {data.year}
                      </span>
                      <span className="text-slate-400 text-sm font-medium">
                        Last updated: {new Date(data.lastUpdated).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  {isTeacher && !isEditing && (
                    <button 
                      onClick={() => handleEditClick(progress)}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black uppercase tracking-widest text-[10px] transition-colors flex items-center gap-2"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit Progress
                    </button>
                  )}
                  {isTeacher && isEditing && (
                    <div className="flex gap-3">
                      <button 
                        onClick={() => setEditingId(null)}
                        className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-black uppercase tracking-widest text-[10px] transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={handleSave}
                        disabled={saveStatus === 'saving'}
                        className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-black uppercase tracking-widest text-[10px] transition-colors flex items-center gap-2 disabled:opacity-50"
                      >
                        <Save className="w-4 h-4" />
                        {saveStatus === 'saving' ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  )}
                </div>

                <div className="p-8 md:p-10 space-y-12">
                  {/* Academics Section */}
                  <section>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight">Academic Performance</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {data.academics.map((acad, idx) => (
                        <div key={idx} className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                          {isEditing ? (
                            <div className="space-y-4 relative">
                              <button 
                                onClick={() => {
                                  const newAcademics = [...(editForm.academics || [])];
                                  newAcademics.splice(idx, 1);
                                  setEditForm({ ...editForm, academics: newAcademics });
                                }}
                                className="absolute -top-2 -right-2 w-6 h-6 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center text-xs font-bold hover:bg-rose-500 hover:text-white transition-colors"
                              >
                                ✕
                              </button>
                              <input 
                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 font-bold text-slate-900"
                                value={acad.subject}
                                onChange={(e) => handleAcademicChange(idx, 'subject', e.target.value)}
                                placeholder="Subject"
                              />
                              <input 
                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 font-bold text-blue-600"
                                value={acad.grade}
                                onChange={(e) => handleAcademicChange(idx, 'grade', e.target.value)}
                                placeholder="Grade"
                              />
                              <textarea 
                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 font-medium text-sm text-slate-600"
                                rows={3}
                                value={acad.comments}
                                onChange={(e) => handleAcademicChange(idx, 'comments', e.target.value)}
                                placeholder="Comments"
                              />
                            </div>
                          ) : (
                            <>
                              <div className="flex justify-between items-start mb-4">
                                <h4 className="font-black text-slate-900">{acad.subject}</h4>
                                <span className="text-2xl font-black text-blue-600">{acad.grade}</span>
                              </div>
                              <p className="text-sm text-slate-600 font-medium leading-relaxed">{acad.comments}</p>
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
                          className="p-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-colors min-h-[200px]"
                        >
                          <span className="text-4xl mb-2">+</span>
                          <span className="text-[10px] font-black uppercase tracking-widest">Add Subject</span>
                        </button>
                      )}
                    </div>
                  </section>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Behavior Section */}
                    <section>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
                          <Activity className="w-6 h-6 text-emerald-600" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight">Behavior</h3>
                      </div>
                      <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm">
                        {isEditing ? (
                          <div className="space-y-4">
                            <select 
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900"
                              value={data.behavior.rating}
                              onChange={(e) => setEditForm({
                                ...editForm, 
                                behavior: { ...editForm.behavior!, rating: e.target.value as any }
                              })}
                            >
                              <option value="Excellent">Excellent</option>
                              <option value="Good">Good</option>
                              <option value="Needs Improvement">Needs Improvement</option>
                              <option value="Poor">Poor</option>
                            </select>
                            <textarea 
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium text-slate-600"
                              rows={4}
                              value={data.behavior.comments}
                              onChange={(e) => setEditForm({
                                ...editForm, 
                                behavior: { ...editForm.behavior!, comments: e.target.value }
                              })}
                              placeholder="Behavior comments..."
                            />
                          </div>
                        ) : (
                          <>
                            <div className="inline-block px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl font-black uppercase tracking-widest text-xs mb-4">
                              {data.behavior.rating}
                            </div>
                            <p className="text-slate-600 font-medium leading-relaxed">{data.behavior.comments}</p>
                          </>
                        )}
                      </div>
                    </section>

                    {/* Participation Section */}
                    <section>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center">
                          <Users className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight">Participation</h3>
                      </div>
                      <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm">
                        {isEditing ? (
                          <div className="space-y-4">
                            <select 
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900"
                              value={data.participation.rating}
                              onChange={(e) => setEditForm({
                                ...editForm, 
                                participation: { ...editForm.participation!, rating: e.target.value as any }
                              })}
                            >
                              <option value="High">High</option>
                              <option value="Medium">Medium</option>
                              <option value="Low">Low</option>
                            </select>
                            <input 
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium text-slate-600"
                              value={data.participation.activities.join(', ')}
                              onChange={(e) => setEditForm({
                                ...editForm, 
                                participation: { ...editForm.participation!, activities: e.target.value.split(',').map(s => s.trim()) }
                              })}
                              placeholder="Activities (comma separated)"
                            />
                            <textarea 
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium text-slate-600"
                              rows={3}
                              value={data.participation.comments}
                              onChange={(e) => setEditForm({
                                ...editForm, 
                                participation: { ...editForm.participation!, comments: e.target.value }
                              })}
                              placeholder="Participation comments..."
                            />
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center gap-4 mb-4">
                              <div className="inline-block px-4 py-2 bg-purple-50 text-purple-700 rounded-xl font-black uppercase tracking-widest text-xs">
                                {data.participation.rating} Involvement
                              </div>
                            </div>
                            <div className="mb-4">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Activities</p>
                              <div className="flex flex-wrap gap-2">
                                {data.participation.activities.map((act, idx) => (
                                  <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold">
                                    {act}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <p className="text-slate-600 font-medium leading-relaxed">{data.participation.comments}</p>
                          </>
                        )}
                      </div>
                    </section>
                  </div>

                  {!isEditing && isParent && (
                    <div className="pt-8 border-t border-slate-100 mt-12">
                      {aiTranslations[progress.id] ? (
                        <div className="bg-fuchsia-50 rounded-[32px] p-8 border border-fuchsia-100">
                          <div className="flex items-center gap-3 mb-6">
                            <Bot className="w-8 h-8 text-fuchsia-600" />
                            <h3 className="text-xl font-black text-fuchsia-900">AI Report Translator</h3>
                          </div>
                          <div className="prose prose-fuchsia max-w-none text-fuchsia-900 font-medium whitespace-pre-wrap leading-relaxed">
                            {aiTranslations[progress.id]}
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleTranslateReport(progress.id, progress)}
                          disabled={aiTranslatingId === progress.id}
                          className="w-full py-6 rounded-3xl bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-colors disabled:opacity-50"
                        >
                          {aiTranslatingId === progress.id ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" /> Translating...
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-5 h-5 text-fuchsia-400" /> Explain this Report & Give Home Advice
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Financial Ledger Tab */}
      {!loading && activeView === 'finance' && !isTeacher && (
        <div className="animate-in fade-in duration-300">
           <div className="bg-emerald-900 rounded-[40px] text-white p-10 mb-8 border border-emerald-800 shadow-xl overflow-hidden relative">
             <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/20 rounded-full blur-[100px]" />
             
             <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
               <div>
                 <div className="flex items-center gap-3 mb-4">
                   <Wallet className="w-8 h-8 text-emerald-300" />
                   <h2 className="text-3xl font-black tracking-tight">Financial Ledger</h2>
                 </div>
                 <p className="text-emerald-200 font-medium leading-relaxed mb-8">
                   Manage your child's school fees instantly. Pay using MTN Mobile Money or eMali directly from your phone.
                 </p>
                 
                 <div className="flex flex-col gap-4">
                    <div className="bg-white/10 p-6 rounded-3xl border border-white/10">
                       <label className="block text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-2">Custom Amount (SZL)</label>
                       <div className="flex gap-2">
                          <input 
                            type="number" 
                            className="flex-1 bg-white/10 border-none rounded-xl px-4 py-3 font-black text-white focus:ring-2 focus:ring-yellow-400" 
                            placeholder="e.g. 100"
                          />
                          <button className="px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-emerald-900 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-yellow-400/20 transition-all flex items-center gap-3">
                            Pay via MoMo
                          </button>
                       </div>
                       <p className="text-[10px] text-emerald-400 mt-3 font-bold">+ SZL 5.00 Convenience Fee (Saves you a trip to the bank!)</p>
                    </div>
                 </div>
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                 <div className="bg-emerald-800/50 rounded-3xl p-6 border border-emerald-700/50">
                    <span className="block text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-2">Total Outstanding</span>
                    <span className="text-3xl font-black text-white">E{MOCK_FINANCES.totalOwed}</span>
                 </div>
                 <div className="bg-emerald-800/50 rounded-3xl p-6 border border-emerald-700/50">
                    <span className="block text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-2">Next Deadline</span>
                    <span className="text-xl font-black text-white mt-1 block">{new Date(MOCK_FINANCES.nextDeadline).toLocaleDateString()}</span>
                 </div>
               </div>
             </div>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <div className="lg:col-span-2 bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Transaction History</h3>
                  <button className="text-blue-600 hover:text-blue-700 font-bold text-xs flex items-center gap-2">
                    <Download className="w-4 h-4" /> Download Statement
                  </button>
                </div>
                <div className="divide-y divide-slate-100">
                  {MOCK_FINANCES.transactions.map((tx) => (
                    <div key={tx.id} className="p-6 px-8 flex justify-between items-center hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                          <Receipt className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-black text-slate-900">{tx.type}</h4>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Ref: {tx.ref} • {new Date(tx.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-right flex items-center gap-4">
                         <span className="text-xl font-black text-emerald-600">+ E{tx.amount}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-8">
                 <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 px-2">Quick Item Payments</h3>
                 <div className="space-y-3">
                    {[
                      { item: 'Biology Field Trip', cost: 150 },
                      { item: 'New School Tracksuit', cost: 450 },
                      { item: 'PTA Contribution', cost: 50 },
                      { item: 'End-of-Term Party', cost: 80 }
                    ].map((thing, i) => (
                      <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center hover:bg-blue-50 hover:border-blue-100 transition-all cursor-pointer group">
                        <div>
                           <p className="text-xs font-black text-slate-900">{thing.item}</p>
                           <p className="text-[10px] font-bold text-blue-600">SZL {thing.cost}</p>
                        </div>
                        <button className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                           <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Safety & Boarding Tab */}
      {!loading && activeView === 'safety' && !isTeacher && (
        <div className="animate-in fade-in duration-300 space-y-12">
           <div className="bg-blue-900 rounded-[40px] text-white p-10 border border-blue-800 shadow-xl overflow-hidden relative">
             <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/20 rounded-full blur-[100px]" />
             <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
               <div>
                 <div className="flex items-center gap-3 mb-4">
                   <ShieldCheck className="w-8 h-8 text-cyan-300" />
                   <h2 className="text-3xl font-black tracking-tight">Safety & Boarding</h2>
                 </div>
                 <p className="text-blue-200 font-medium leading-relaxed mb-6">
                   Monitor your child's real-time campus attendance and digitally authorize weekend boarding passes instantly.
                 </p>
               </div>
             </div>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Daily Gate & Attendance Logs */}
              <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                 <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Real-Time Gate & Attendance</h3>
                    </div>
                 </div>
                 <div className="p-8 flex-1">
                   <div className="relative border-l-2 border-slate-100 ml-4 space-y-8">
                     {MOCK_GATE_LOGS.map((log, idx) => (
                       <div key={log.id} className="relative pl-8">
                         <div className={`absolute -left-[11px] top-0 w-5 h-5 rounded-full border-4 border-white ${log.type === 'entry' ? 'bg-emerald-500' : 'bg-slate-400'}`}></div>
                         <div className="flex justify-between items-start">
                           <div>
                             <h4 className="font-black text-slate-900">{log.status}</h4>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{log.student}</p>
                           </div>
                           <div className="text-right">
                             <span className="block text-sm font-bold text-slate-900">{log.time}</span>
                             <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">{log.date}</span>
                           </div>
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
              </div>

              {/* Boarding Passes */}
              <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                 <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                    <div className="flex items-center gap-2">
                      <BusFront className="w-4 h-4 text-slate-400" />
                      <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Boarding Weekend Passes</h3>
                    </div>
                 </div>
                 <div className="p-8 space-y-4">
                    {MOCK_BOARDING_PASSES.map(pass => (
                      <div key={pass.id} className="border border-slate-100 rounded-3xl p-6 relative overflow-hidden group hover:border-blue-200 transition-colors">
                        {approvedPasses[pass.id] === 'approved' && <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />}
                        {approvedPasses[pass.id] === 'denied' && <div className="absolute top-0 left-0 w-full h-1 bg-rose-500" />}
                        
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-black text-slate-900 text-lg mb-1">{pass.reason}</h4>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{pass.student}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                            approvedPasses[pass.id] === 'approved' ? 'bg-emerald-50 text-emerald-600' :
                            approvedPasses[pass.id] === 'denied' ? 'bg-rose-50 text-rose-600' :
                            'bg-amber-50 text-amber-600'
                          }`}>
                            {approvedPasses[pass.id] || 'Action Required'}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6 pt-4 border-t border-slate-50">
                           <div>
                             <span className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Departure</span>
                             <span className="text-sm font-bold text-slate-700">{pass.leaveDate}</span>
                           </div>
                           <div>
                             <span className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Return</span>
                             <span className="text-sm font-bold text-slate-700">{pass.returnDate}</span>
                           </div>
                        </div>

                        {!approvedPasses[pass.id] && (
                          <div className="flex gap-3">
                             <button 
                               onClick={() => setApprovedPasses(prev => ({...prev, [pass.id]: 'approved'}))}
                               className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest text-[10px] rounded-xl flex items-center justify-center gap-2 transition-colors"
                             >
                               <CheckCircle className="w-4 h-4" /> Approve Exeat
                             </button>
                             <button 
                               onClick={() => setApprovedPasses(prev => ({...prev, [pass.id]: 'denied'}))}
                               className="flex-1 py-3 bg-rose-50 hover:bg-rose-100 text-rose-600 font-black uppercase tracking-widest text-[10px] rounded-xl flex items-center justify-center gap-2 transition-colors"
                             >
                               <XCircle className="w-4 h-4" /> Deny
                             </button>
                          </div>
                        )}
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* PTA & Consent Tab */}
      {!loading && activeView === 'pta' && !isTeacher && (
        <div className="animate-in fade-in duration-300 space-y-12">
           <div className="bg-purple-900 rounded-[40px] text-white p-10 border border-purple-800 shadow-xl overflow-hidden relative">
             <div className="absolute top-0 right-0 w-96 h-96 bg-fuchsia-400/20 rounded-full blur-[100px]" />
             <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
               <div>
                 <div className="flex items-center gap-3 mb-4">
                   <Vote className="w-8 h-8 text-fuchsia-300" />
                   <h2 className="text-3xl font-black tracking-tight">Digital PTA & Consent</h2>
                 </div>
                 <p className="text-purple-200 font-medium leading-relaxed mb-6">
                   Sign permission slips digitally without relying on paper, and securely vote on critical PTA matters regardless of your location.
                 </p>
               </div>
             </div>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Permission Slips */}
              <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                 <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                    <div className="flex items-center gap-2">
                      <FileSignature className="w-4 h-4 text-slate-400" />
                      <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Active Permission Slips</h3>
                    </div>
                 </div>
                 <div className="p-8 space-y-4">
                    {MOCK_CONSENT_FORMS.map(form => (
                      <div key={form.id} className="border border-slate-100 p-6 rounded-3xl group hover:border-purple-200 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-black text-slate-900 pr-4">{form.title}</h4>
                          {signedConsents.includes(form.id) ? (
                            <span className="shrink-0 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" /> Signed
                            </span>
                          ) : (
                            <span className="shrink-0 px-3 py-1 bg-rose-50 text-rose-600 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> Pending
                            </span>
                          )}
                        </div>
                        <div className="flex gap-4 mb-6">
                           <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded-md">
                              <MapPin className="w-3 h-3 text-slate-400" /> {new Date(form.date).toLocaleDateString()}
                           </div>
                           <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded-md">
                              <Wallet className="w-3 h-3 text-slate-400" /> {form.cost}
                           </div>
                        </div>

                        {!signedConsents.includes(form.id) && (
                          <button 
                            onClick={() => form.requiresPin ? setShowPinModal(form.id) : setSignedConsents(prev => [...prev, form.id])}
                            className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-black uppercase tracking-widest text-[10px] rounded-xl flex items-center justify-center gap-2 shadow-md shadow-purple-600/20 transition-colors"
                          >
                            <ClipboardCheck className="w-4 h-4" /> Sign Digitally
                          </button>
                        )}
                      </div>
                    ))}
                 </div>
              </div>

              {/* PTA Polling Board */}
              <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                 <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                    <div className="flex items-center gap-2">
                      <ThumbsUp className="w-4 h-4 text-slate-400" />
                      <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">PTA Polling Board</h3>
                    </div>
                 </div>
                 <div className="p-8 space-y-6">
                    {MOCK_PTA_POLLS.map(poll => (
                      <div key={poll.id} className="border border-slate-100 p-6 rounded-3xl">
                        <h4 className="font-black text-slate-900 mb-4">{poll.question}</h4>
                        
                        {castVotes[poll.id] ? (
                           <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-center">
                             <CheckCircle className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                             <p className="text-sm font-bold text-slate-700">You voted: {castVotes[poll.id]}</p>
                           </div>
                        ) : (
                          <div className="space-y-2">
                            {poll.options.map((opt, idx) => (
                              <button 
                                key={idx}
                                onClick={() => setCastVotes(prev => ({...prev, [poll.id]: opt}))}
                                className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-purple-400 hover:bg-purple-50 font-bold text-sm text-slate-700 transition-all flex items-center gap-3"
                              >
                                <div className="w-4 h-4 rounded-full border-2 border-slate-300"></div>
                                {opt}
                              </button>
                            ))}
                          </div>
                        )}
                        <p className="text-right text-[10px] font-black uppercase tracking-widest text-slate-400 mt-4">
                          Closes: {new Date(poll.deadline).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* PIN Verification Modal */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
           <div className="bg-white rounded-[32px] shadow-2xl p-8 max-w-sm w-full animate-in zoom-in-95">
              <h3 className="text-xl font-black text-slate-900 mb-2">Signature Required</h3>
              <p className="text-sm font-medium text-slate-500 mb-6">Please enter your 4-digit Parent PIN to securely sign this consent form.</p>
              
              <input 
                type="password" 
                maxLength={4}
                className="w-full text-center text-3xl font-black tracking-[1em] bg-slate-50 border border-slate-200 rounded-2xl py-4 mb-6 focus:ring-4 focus:ring-purple-100 outline-none"
                value={pinInput}
                onChange={e => setPinInput(e.target.value)}
                placeholder="••••"
              />
              
              <div className="flex gap-3">
                 <button 
                   onClick={() => { setShowPinModal(null); setPinInput(''); }}
                   className="flex-1 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-black uppercase tracking-widest text-[10px] rounded-xl transition-colors"
                 >
                   Cancel
                 </button>
                 <button 
                   disabled={pinInput.length !== 4}
                   onClick={() => {
                     setSignedConsents(prev => [...prev, showPinModal]);
                     setShowPinModal(null);
                     setPinInput('');
                   }}
                   className="flex-1 py-4 bg-purple-600 hover:bg-purple-700 text-white font-black uppercase tracking-widest text-[10px] rounded-xl transition-colors disabled:opacity-50"
                 >
                   Verify & Sign
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ParentPortal;
