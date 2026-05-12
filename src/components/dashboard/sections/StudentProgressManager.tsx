import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, setDoc, deleteDoc, updateDoc, addDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType, getDocsWithRetry } from '../../../lib/firebase';
import { Institution, Student, StudentProgress } from '../../../../types';
import { 
  Loader2, 
  Plus, 
  Trash2, 
  Edit2, 
  Save, 
  X, 
  Mail, 
  Search, 
  TrendingUp, 
  BookOpen, 
  User, 
  ChevronRight, 
  ChevronDown,
  History,
  AlertCircle
} from 'lucide-react';

interface StudentProgressManagerProps {
  institution: Institution;
}

export const StudentProgressManager: React.FC<StudentProgressManagerProps> = ({ institution }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [progressRecords, setProgressRecords] = useState<StudentProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  
  // Student CRUD state
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null);
  const [studentForm, setStudentForm] = useState<Partial<Student>>({});

  // Progress Record CRUD state
  const [isAddingProgress, setIsAddingProgress] = useState(false);
  const [editingProgressId, setEditingProgressId] = useState<string | null>(null);
  const [progressForm, setProgressForm] = useState<Partial<StudentProgress>>({});

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, [institution.id]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch students
      const studentsQ = query(collection(db, 'students'), where('institutionId', '==', institution.id));
      const studentsSnapshot = await getDocsWithRetry(studentsQ);
      const studentsData = studentsSnapshot.docs.map(doc => ({ ...doc.data() as Student, id: doc.id }));
      setStudents(studentsData);

      // Fetch progress records
      const progressQ = query(collection(db, 'student_progress'), where('institutionId', '==', institution.id));
      const progressSnapshot = await getDocsWithRetry(progressQ);
      const progressData = progressSnapshot.docs.map(doc => ({ ...doc.data() as StudentProgress, id: doc.id }));
      setProgressRecords(progressData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Student CRUD functions
  const handleSaveStudent = async () => {
    if (!studentForm.name || !studentForm.studentId || !studentForm.grade) {
      alert("Please fill in Name, Student ID, and Grade.");
      return;
    }

    try {
      const studentData = {
        ...studentForm,
        institutionId: institution.id,
        parentEmails: studentForm.parentEmails || [],
        createdAt: studentForm.createdAt || new Date().toISOString()
      };

      if (editingStudentId) {
        await updateDoc(doc(db, 'students', editingStudentId), studentData);
        setStudents(prev => prev.map(s => s.id === editingStudentId ? { ...s, ...studentData } : s));
      } else {
        const docRef = await addDoc(collection(db, 'students'), studentData);
        setStudents(prev => [...prev, { ...studentData, id: docRef.id } as Student]);
      }

      setIsAddingStudent(false);
      setEditingStudentId(null);
      setStudentForm({});
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'students');
    }
  };

  const handleDeleteStudent = async (id: string) => {
    if (!window.confirm("Are you sure? This will delete the student and their associated progress records.")) return;

    try {
      await deleteDoc(doc(db, 'students', id));
      setStudents(prev => prev.filter(s => s.id !== id));
      
      // Also delete associated progress records
      const associatedProgress = progressRecords.filter(p => p.studentId === id);
      for (const p of associatedProgress) {
        await deleteDoc(doc(db, 'student_progress', p.id));
      }
      setProgressRecords(prev => prev.filter(p => p.studentId !== id));
      
      if (selectedStudentId === id) setSelectedStudentId(null);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, 'students');
    }
  };

  // Progress Record CRUD functions
  const handleSaveProgress = async () => {
    if (!selectedStudentId) return;
    const student = students.find(s => s.id === selectedStudentId);
    if (!student) return;

    if (!progressForm.term || !progressForm.year) {
      alert("Please select Term and Year.");
      return;
    }

    try {
      const progressData = {
        ...progressForm,
        studentId: student.id,
        studentName: student.name,
        institutionId: institution.id,
        lastUpdated: new Date().toISOString(),
        academics: progressForm.academics || [],
        behavior: progressForm.behavior || { rating: 'Good', comments: '' },
        participation: progressForm.participation || { rating: 'Medium', activities: [], comments: '' }
      } as StudentProgress;

      if (editingProgressId) {
        await updateDoc(doc(db, 'student_progress', editingProgressId), progressData);
        setProgressRecords(prev => prev.map(p => p.id === editingProgressId ? { ...p, ...progressData } : p));
      } else {
        const docRef = await addDoc(collection(db, 'student_progress'), progressData);
        setProgressRecords(prev => [...prev, { ...progressData, id: docRef.id }]);
      }

      setIsAddingProgress(false);
      setEditingProgressId(null);
      setProgressForm({});
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'student_progress');
    }
  };

  const handleDeleteProgress = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this progress record?")) return;

    try {
      await deleteDoc(doc(db, 'student_progress', id));
      setProgressRecords(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, 'student_progress');
    }
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.studentId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedStudent = students.find(s => s.id === selectedStudentId);
  const studentHistory = progressRecords.filter(p => p.studentId === selectedStudentId)
    .sort((a, b) => (b.year * 10 + (b.term.includes('3') ? 3 : b.term.includes('2') ? 2 : 1)) - (a.year * 10 + (a.term.includes('3') ? 3 : a.term.includes('2') ? 2 : 1)));

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-24 bg-white rounded-[40px] border border-slate-100 shadow-sm">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
        <p className="text-slate-500 font-black uppercase tracking-widest text-xs">Loading academic records...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-4">
            <TrendingUp className="w-10 h-10 text-blue-600" />
            Academic Progress Registry
          </h2>
          <p className="text-slate-500 font-medium mt-1">Manage official student records and performance history.</p>
        </div>
        {!isAddingStudent && !editingStudentId && (
          <button 
            onClick={() => {
              setIsAddingStudent(true);
              setStudentForm({ parentEmails: [] });
            }}
            className="px-8 py-4 bg-slate-900 text-white rounded-[24px] font-black uppercase tracking-widest text-[10px] flex items-center gap-3 hover:bg-blue-600 transition-all shadow-xl shadow-slate-200"
          >
            <Plus className="w-5 h-5" /> Enroll New Student
          </button>
        )}
      </div>

      {(isAddingStudent || editingStudentId) ? (
        <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-8 animate-in zoom-in-95 duration-300">
          <div className="flex justify-between items-center pb-6 border-b border-slate-50">
            <h3 className="text-xl font-black text-slate-900">{editingStudentId ? 'Edit Student Record' : 'Enroll New Student'}</h3>
            <button onClick={() => { setIsAddingStudent(false); setEditingStudentId(null); setStudentForm({}); }} className="text-slate-400 hover:text-slate-600">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Legal Name</label>
              <input 
                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold text-slate-900 focus:ring-2 focus:ring-blue-500"
                value={studentForm.name || ''}
                onChange={e => setStudentForm({ ...studentForm, name: e.target.value })}
                placeholder="Student Name"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">School ID / Admission Number</label>
              <input 
                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold text-slate-900 focus:ring-2 focus:ring-blue-500"
                value={studentForm.studentId || ''}
                onChange={e => setStudentForm({ ...studentForm, studentId: e.target.value })}
                placeholder="e.g. ST-2026-001"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Grade / Form / Year</label>
              <input 
                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold text-slate-900 focus:ring-2 focus:ring-blue-500"
                value={studentForm.grade || ''}
                onChange={e => setStudentForm({ ...studentForm, grade: e.target.value })}
                placeholder="e.g. Form 1"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Class / Stream</label>
              <input 
                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold text-slate-900 focus:ring-2 focus:ring-blue-500"
                value={studentForm.class || ''}
                onChange={e => setStudentForm({ ...studentForm, class: e.target.value })}
                placeholder="e.g. A"
              />
            </div>
            <div className="space-y-4 md:col-span-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Parent / Guardian Emails (Comma separated)</label>
              <textarea 
                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold text-slate-900 focus:ring-2 focus:ring-blue-500"
                rows={2}
                value={(studentForm.parentEmails || []).join(', ')}
                onChange={e => setStudentForm({ ...studentForm, parentEmails: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                placeholder="parent@example.com, guardian@example.com"
              />
            </div>
          </div>

          <div className="pt-8 flex justify-end gap-4">
            <button 
              onClick={() => { setIsAddingStudent(false); setEditingStudentId(null); setStudentForm({}); }}
              className="px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black uppercase tracking-widest text-[10px]"
            >
              Cancel
            </button>
            <button 
              onClick={handleSaveStudent}
              className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-2 hover:bg-blue-500 transition-all shadow-lg shadow-blue-200"
            >
              <Save className="w-5 h-5" />
              Save Record
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Student List */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                className="w-full bg-white border border-slate-100 rounded-3xl pl-14 pr-6 py-5 font-bold text-slate-900 shadow-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Search students by name or ID..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden min-h-[500px]">
              <div className="divide-y divide-slate-50">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map(student => (
                    <button 
                      key={student.id}
                      onClick={() => setSelectedStudentId(student.id)}
                      className={`w-full p-6 flex items-center justify-between transition-all text-left ${selectedStudentId === student.id ? 'bg-blue-50/50 border-l-4 border-l-blue-600' : 'hover:bg-slate-50'}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black ${selectedStudentId === student.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                          {student.name[0]}
                        </div>
                        <div>
                          <h4 className="font-black text-slate-900">{student.name}</h4>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{student.grade} {student.class ? `• ${student.class}` : ''}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="text-[9px] font-black bg-slate-100 px-2 py-1 rounded text-slate-500 uppercase tracking-widest">ID: {student.studentId}</span>
                        <div className="flex gap-2">
                          <button 
                            onClick={(e) => { e.stopPropagation(); setEditingStudentId(student.id); setStudentForm(student); }}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleDeleteStudent(student.id); }}
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="text-center py-24 px-8">
                    <User className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                    <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">No students found.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Progress Details */}
          <div className="lg:col-span-7">
            {selectedStudent ? (
              <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                <div className="bg-blue-900 rounded-[40px] p-10 text-white shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-12 opacity-10 text-9xl">🎓</div>
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <h3 className="text-3xl font-black tracking-tight">{selectedStudent.name}</h3>
                        <p className="text-blue-200 font-bold uppercase tracking-widest text-xs mt-2">
                          Official Record • {selectedStudent.grade} {selectedStudent.class}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="bg-white/10 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border border-white/20">
                          ID: {selectedStudent.studentId}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10">
                      <div>
                        <p className="text-blue-300 font-black uppercase tracking-widest text-[9px] mb-1">Status</p>
                        <p className="text-sm font-bold">Active</p>
                      </div>
                      <div>
                        <p className="text-blue-300 font-black uppercase tracking-widest text-[9px] mb-1">Parents</p>
                        <p className="text-sm font-bold truncate">{(selectedStudent.parentEmails || []).length} Linked</p>
                      </div>
                      <div>
                        <p className="text-blue-300 font-black uppercase tracking-widest text-[9px] mb-1">Reports</p>
                        <p className="text-sm font-bold">{studentHistory.length} Recorded</p>
                      </div>
                      <div>
                        <p className="text-blue-300 font-black uppercase tracking-widest text-[9px] mb-1">Latest GPA</p>
                        <p className="text-sm font-bold">---</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
                  <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Academic History</h4>
                    {!isAddingProgress && !editingProgressId && (
                      <button 
                        onClick={() => {
                          setIsAddingProgress(true);
                          setProgressForm({ 
                            year: new Date().getFullYear(),
                            term: 'Term 1',
                            academics: [],
                            behavior: { rating: 'Good', comments: '' },
                            participation: { rating: 'Medium', activities: [], comments: '' }
                          });
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-xl font-black uppercase tracking-widest text-[8px] flex items-center gap-2 hover:bg-blue-500"
                      >
                        <Plus className="w-3 h-3" /> Add Progress Report
                      </button>
                    )}
                  </div>

                  {(isAddingProgress || editingProgressId) ? (
                    <div className="p-8 space-y-8 animate-in slide-in-from-top-4 duration-300">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Term / Semester</label>
                          <select 
                            className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 font-bold"
                            value={progressForm.term}
                            onChange={e => setProgressForm({ ...progressForm, term: e.target.value })}
                          >
                            <option value="Term 1">Term 1</option>
                            <option value="Term 2">Term 2</option>
                            <option value="Term 3">Term 3</option>
                            <option value="Semester 1">Semester 1</option>
                            <option value="Semester 2">Semester 2</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Year</label>
                          <input 
                            type="number"
                            className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 font-bold"
                            value={progressForm.year}
                            onChange={e => setProgressForm({ ...progressForm, year: parseInt(e.target.value) })}
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Academic Performance</label>
                          <button 
                            onClick={() => {
                              const newAcademics = [...(progressForm.academics || []), { subject: '', grade: '', comments: '' }];
                              setProgressForm({ ...progressForm, academics: newAcademics });
                            }}
                            className="text-[8px] font-black text-blue-600 uppercase tracking-widest hover:underline"
                          >
                            + Add Subject
                          </button>
                        </div>
                        
                        <div className="space-y-4">
                          {(progressForm.academics || []).map((acad, idx) => (
                            <div key={idx} className="p-4 bg-slate-50 rounded-2xl space-y-3 relative">
                              <button onClick={() => {
                                const newAcads = [...progressForm.academics!];
                                newAcads.splice(idx, 1);
                                setProgressForm({ ...progressForm, academics: newAcads });
                              }} className="absolute top-2 right-2 text-rose-500 hover:text-rose-700">
                                <Trash2 className="w-4 h-4" />
                              </button>
                              <div className="grid grid-cols-2 gap-3">
                                <input 
                                  placeholder="Subject"
                                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 font-bold text-xs"
                                  value={acad.subject}
                                  onChange={e => {
                                    const newAcads = [...progressForm.academics!];
                                    newAcads[idx] = { ...acad, subject: e.target.value };
                                    setProgressForm({ ...progressForm, academics: newAcads });
                                  }}
                                />
                                <input 
                                  placeholder="Grade (e.g. A, 85%)"
                                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 font-bold text-xs text-blue-600"
                                  value={acad.grade}
                                  onChange={e => {
                                    const newAcads = [...progressForm.academics!];
                                    newAcads[idx] = { ...acad, grade: e.target.value };
                                    setProgressForm({ ...progressForm, academics: newAcads });
                                  }}
                                />
                              </div>
                              <textarea 
                                placeholder="Teacher Comments"
                                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs h-16"
                                value={acad.comments}
                                onChange={e => {
                                  const newAcads = [...progressForm.academics!];
                                  newAcads[idx] = { ...acad, comments: e.target.value };
                                  setProgressForm({ ...progressForm, academics: newAcads });
                                }}
                              />
                            </div>
                          ))}
                          {(progressForm.academics || []).length === 0 && (
                            <p className="text-center py-8 text-xs text-slate-400 font-medium italic bg-slate-50 rounded-2xl">
                              No academic results entered yet.
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="pt-8 border-t border-slate-50 flex justify-end gap-3">
                        <button 
                          onClick={() => { setIsAddingProgress(false); setEditingProgressId(null); setProgressForm({}); }}
                          className="px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-black uppercase tracking-widest text-[9px]"
                        >
                          Cancel
                        </button>
                        <button 
                          onClick={handleSaveProgress}
                          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-black uppercase tracking-widest text-[9px] flex items-center gap-2"
                        >
                          <Save className="w-4 h-4" /> Save Report
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-50">
                      {studentHistory.length > 0 ? (
                        studentHistory.map(record => (
                          <div key={record.id} className="p-8 hover:bg-slate-50 transition-all group">
                            <div className="flex justify-between items-start mb-6">
                              <div>
                                <div className="flex items-center gap-3">
                                  <h5 className="font-black text-slate-900">{record.term} {record.year}</h5>
                                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-[8px] font-black uppercase tracking-widest border border-emerald-100">Official</span>
                                </div>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Updated {new Date(record.lastUpdated).toLocaleDateString()}</p>
                              </div>
                              <div className="flex gap-2">
                                <button 
                                  onClick={() => { setEditingProgressId(record.id); setProgressForm(record); }}
                                  className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                >
                                  <Edit2 className="w-3 h-3" />
                                </button>
                                <button 
                                  onClick={() => handleDeleteProgress(record.id)}
                                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                              {record.academics.map((acad, idx) => (
                                <div key={idx} className="p-4 bg-slate-50 rounded-2xl">
                                  <div className="flex justify-between items-start mb-1">
                                    <span className="text-[10px] font-black text-slate-900 truncate max-w-[80px]">{acad.subject}</span>
                                    <span className="text-xs font-black text-blue-600">{acad.grade}</span>
                                  </div>
                                  <p className="text-[9px] text-slate-500 line-clamp-1 italic">"{acad.comments}"</p>
                                </div>
                              ))}
                              {record.academics.length === 0 && (
                                <div className="col-span-full py-4 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest italic border border-dashed border-slate-200 rounded-2xl">
                                  No subjects recorded for this period
                                </div>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-24 bg-white">
                          <History className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                          <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">No historical records found for this student.</p>
                          <button 
                            onClick={() => {
                              setIsAddingProgress(true);
                              setProgressForm({ 
                                year: new Date().getFullYear(),
                                term: 'Term 1',
                                academics: [],
                                behavior: { rating: 'Good', comments: '' },
                                participation: { rating: 'Medium', activities: [], comments: '' }
                              });
                            }}
                            className="mt-4 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline"
                          >
                            Create First Report
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="bg-amber-50 rounded-[40px] p-8 border border-amber-100 flex items-start gap-6">
                  <div className="w-12 h-12 bg-amber-400 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-amber-200">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-amber-900 text-sm mb-1 uppercase tracking-tight">Parent Information Sync</h4>
                    <p className="text-amber-800 text-xs font-medium leading-relaxed opacity-80">
                      These academic records are automatically reconciled with parent portal accounts using the linked emails: {(selectedStudent.parentEmails || []).join(', ') || 'No emails linked'}. Ensure emails match exactly for parents to view these reports.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[600px] flex flex-col items-center justify-center bg-white rounded-[40px] border border-dashed border-slate-200 text-center p-12">
                <BookOpen className="w-20 h-20 text-slate-100 mb-6" />
                <h3 className="text-xl font-black text-slate-300">Select a student record to manage progress and history</h3>
                <p className="text-slate-400 text-sm mt-2 max-w-sm">Use the directory on the left to browse and select students by name or school identification number.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
