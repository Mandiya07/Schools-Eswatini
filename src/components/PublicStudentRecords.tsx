import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { db, auth } from '../lib/firebase';
import { Student, StudentProgress } from '../../types';
import { Search, Loader2, GraduationCap, TrendingUp, AlertCircle, Calendar } from 'lucide-react';

interface PublicStudentRecordsProps {
  institutionId: string;
  primaryColor: string;
}

export const PublicStudentRecords: React.FC<PublicStudentRecordsProps> = ({ institutionId, primaryColor }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);
  
  const [searchId, setSearchId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [student, setStudent] = useState<Student | null>(null);
  const [progressRecords, setProgressRecords] = useState<StudentProgress[]>([]);

  const fetchRecords = async () => {
    if (!searchId.trim()) {
      setError("Please enter a valid Student ID.");
      return;
    }
    if (!user?.email) {
      setError("You must be logged in with a registered parent email.");
      return;
    }

    setLoading(true);
    setError(null);
    setStudent(null);
    setProgressRecords([]);

    try {
      // 1. Fetch Student
      const studentQuery = query(
        collection(db, 'students'),
        where('institutionId', '==', institutionId),
        where('studentId', '==', searchId.trim())
      );
      const studentSnapshot = await getDocs(studentQuery);
      
      if (studentSnapshot.empty) {
        setError("Student not found or you are not authorized to view this student.");
        setLoading(false);
        return;
      }
      
      const studentData = { id: studentSnapshot.docs[0].id, ...studentSnapshot.docs[0].data() } as Student;
      setStudent(studentData);

      // 2. Fetch Progress Records
      const progressQuery = query(
        collection(db, 'student_progress'),
        where('institutionId', '==', institutionId),
        where('studentId', '==', studentData.id)
      );
      
      const progressSnapshot = await getDocs(progressQuery);
      const records = progressSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as StudentProgress[];
      
      setProgressRecords(records.sort((a, b) => b.year - a.year || b.term.localeCompare(a.term)));

    } catch (e: any) {
      console.error(e);
      if (e.message?.includes('Missing or insufficient permissions')) {
        setError("You are not authorized to view this student's records. Make sure you are logged in with the parent email registered for this student.");
      } else {
        setError("An error occurred while fetching records.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loadingAuth) {
    return <div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-slate-400" /></div>;
  }

  if (!user) {
    return (
      <div className="bg-slate-50 p-12 rounded-[48px] text-center border border-slate-200">
        <AlertCircle className="w-16 h-16 text-slate-400 mx-auto mb-6" />
        <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Parent Login Required</h3>
        <p className="text-slate-500 max-w-lg mx-auto">
          To protect student privacy, only registered parents and guardians can view academic progress. Please log in with the email address registered with the school.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm flex flex-col md:flex-row gap-6 items-center">
        <div className="flex-1 w-full relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
          <input 
            type="text" 
            placeholder="Enter Student ID (e.g. STU-2026-001)" 
            className="w-full bg-slate-50 pl-16 pr-8 py-5 rounded-[24px] border-none text-lg font-medium text-slate-900 focus:ring-4 focus:ring-blue-500/20"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchRecords()}
          />
        </div>
        <button 
          onClick={fetchRecords}
          disabled={loading || !searchId}
          className="w-full md:w-auto whitespace-nowrap bg-blue-600 text-white px-10 py-5 rounded-[24px] font-black tracking-widest uppercase text-sm hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-3"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Look up Records'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-6 rounded-[24px] text-sm font-bold flex items-center gap-3">
          <AlertCircle className="w-6 h-6 shrink-0" />
          {error}
        </div>
      )}

      {student && (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-slate-900 text-white p-10 rounded-[48px] overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <p className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-2">Student Profile</p>
                <h2 className="text-4xl font-black mb-2">{student.name}</h2>
                <div className="flex flex-wrap items-center gap-4 text-slate-400 font-medium">
                  <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full"><GraduationCap className="w-4 h-4" /> {student.grade} - {student.class}</span>
                  <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full"><Calendar className="w-4 h-4" /> DOB: {student.dob || 'N/A'}</span>
                  <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">ID: {student.studentId}</span>
                </div>
              </div>
            </div>
            
            {student.parentEmails && student.parentEmails.length > 0 && (
              <div className="mt-8 pt-8 border-t border-white/10 relative z-10 flex flex-wrap gap-4">
                <p className="text-sm font-bold text-slate-400 mb-2 w-full">Registered Parent Emails:</p>
                {student.parentEmails.map(email => (
                   <span key={email} className="text-xs bg-emerald-500/20 text-emerald-300 px-3 py-1.5 rounded-full font-bold">{email}</span>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-8">
             <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3"><TrendingUp className="w-6 h-6 text-blue-600" /> Academic Progress</h3>
             
             {progressRecords.length === 0 ? (
               <div className="bg-slate-50 p-10 rounded-[32px] text-center border border-slate-200">
                 <p className="text-slate-500 font-medium tracking-tight">No progress records published yet for this student.</p>
               </div>
             ) : (
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 {progressRecords.map(record => (
                   <div key={record.id} className="bg-white border text-left border-slate-200 p-8 rounded-[32px] shadow-sm hover:shadow-md transition-shadow">
                     <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
                       <div>
                         <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">{record.year}</p>
                         <h4 className="text-2xl font-black text-slate-900">{record.term}</h4>
                       </div>
                       <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-xs font-bold">
                         Last Updated: {new Date(record.lastUpdated || '').toLocaleDateString()}
                       </div>
                     </div>
                     
                     <div className="space-y-8">
                       {/* Subjects */}
                       <div>
                         <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Subjects</p>
                         <div className="space-y-3">
                           {record.academics?.map((ac, idx) => (
                             <div key={idx} className="flex justify-between items-start p-4 bg-slate-50 rounded-2xl">
                               <div>
                                 <p className="font-bold text-slate-900">{ac.subject}</p>
                                 {ac.comments && <p className="text-sm text-slate-500 mt-1">{ac.comments}</p>}
                               </div>
                               <span className="font-black text-xl text-slate-900 bg-white shadow-sm w-12 h-12 flex items-center justify-center rounded-xl">{ac.grade}</span>
                             </div>
                           ))}
                           {(!record.academics || record.academics.length === 0) && <p className="text-sm text-slate-400 italic">No subject grades recorded.</p>}
                         </div>
                       </div>
                       
                       {/* Behavior & Participation */}
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                          <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Behavior</p>
                            <p className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 mb-2">{record.behavior?.rating || 'Not Rated'}</p>
                            <p className="text-sm text-slate-500 line-clamp-3">{record.behavior?.comments}</p>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Participation</p>
                            <p className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 mb-2">{record.participation?.rating || 'Not Rated'}</p>
                            <p className="text-sm text-slate-500 line-clamp-3">{record.participation?.comments}</p>
                          </div>
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
             )}
          </div>
        </div>
      )}
    </div>
  )
};
