import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType, getDocsWithRetry } from '../../../lib/firebase';
import { Institution, Student } from '../../../../types';
import { Loader2, Plus, Trash2, Edit2, Save, X, Mail, Download as DownloadIcon } from 'lucide-react';

interface StudentsManagerProps {
  institution: Institution;
  isTertiary: boolean;
  isPrimary: boolean;
}

export const StudentsManager: React.FC<StudentsManagerProps> = ({ institution, isTertiary, isPrimary }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Student>>({});
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, [institution.id]);

  const fetchStudents = async () => {
    setLoading(true);
    const pathForGetDocs = 'students';
    try {
      const q = query(collection(db, pathForGetDocs), where('institutionId', '==', institution.id));
      const snapshot = await getDocsWithRetry(q);
      const data = snapshot.docs.map(doc => doc.data() as Student);
      setStudents(data);
    } catch (error) {
      if (error instanceof Error && !error.message.includes('offline')) {
        handleFirestoreError(error, OperationType.GET, pathForGetDocs);
      } else {
        console.warn("Offline: Using fallback/cache for students registry.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!editForm.name || !editForm.studentId || !editForm.grade || !editForm.class || !editForm.dob) {
      alert("Please fill all required fields.");
      return;
    }
    
    const pathForWrite = 'students';
    try {
      const newStudent: Student = {
        id: `stu_${Date.now()}`,
        institutionId: institution.id,
        name: editForm.name || '',
        grade: editForm.grade || '',
        class: editForm.class || '',
        studentId: editForm.studentId || '',
        dob: editForm.dob || '',
        parentEmails: editForm.parentEmails || [],
        createdAt: new Date().toISOString()
      };
      
      await setDoc(doc(db, pathForWrite, newStudent.id), newStudent);
      setStudents([...students, newStudent]);
      setIsAdding(false);
      setEditForm({});
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, pathForWrite);
      alert("Error adding student. Check console.");
      console.error(error);
    }
  };

  const handleUpdate = async (id: string) => {
    const pathForWrite = 'students';
    try {
      const updateData = {
        name: editForm.name,
        grade: editForm.grade,
        class: editForm.class,
        studentId: editForm.studentId,
        dob: editForm.dob,
        parentEmails: editForm.parentEmails
      };
      await updateDoc(doc(db, pathForWrite, id), updateData);
      setStudents(students.map(s => s.id === id ? { ...s, ...updateData } : s as Student));
      setEditingId(null);
      setEditForm({});
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, pathForWrite);
      alert("Error updating student. Check console.");
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this student record?")) return;
    const pathForWrite = 'students';
    try {
      await deleteDoc(doc(db, pathForWrite, id));
      setStudents(students.filter(s => s.id !== id));
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, pathForWrite);
      alert("Error deleting student. Check console.");
      console.error(error);
    }
  };

  const handleExport = () => {
    if (students.length === 0) {
      alert("No student records to export.");
      return;
    }

    const headers = ['Name', 'Student ID', 'DOB', 'Grade', 'Class', 'Parent Emails', 'Registration Date'];
    const csvContent = [
      headers.join(','),
      ...students.map(s => [
        `"${s.name.replace(/"/g, '""')}"`,
        `"${s.studentId.replace(/"/g, '""')}"`,
        `"${s.dob}"`,
        `"${s.grade.replace(/"/g, '""')}"`,
        `"${s.class.replace(/"/g, '""')}"`,
        `"${s.parentEmails.join('; ').replace(/"/g, '""')}"`,
        `"${s.createdAt}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `students_${institution.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const startEdit = (student: Student) => {
    setEditingId(student.id);
    setEditForm(student);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsAdding(false);
    setEditForm({});
  };

  if (loading) {
    return (
      <div className="flex justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
            👥 {isTertiary ? 'Student Enrollment & Records' : isPrimary ? 'Pupil Registry' : 'Student Management'}
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            {isTertiary ? 'Oversee academic transcripts, module registrations, and official student files.' : isPrimary ? 'Manage young learner profiles, parent connections, and foundation phase records.' : 'Manage official student records and link parent accounts.'}
          </p>
        </div>
        <div className="flex items-center gap-4">
          {!isAdding && (
            <button 
              onClick={handleExport}
              className="px-6 py-3 bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center gap-2 hover:bg-slate-800 transition-colors"
            >
              <DownloadIcon className="w-4 h-4" /> Export records
            </button>
          )}
          {!isAdding && (
            <button 
              onClick={() => {
                setIsAdding(true);
                setEditForm({ parentEmails: [] });
              }}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Student
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest w-1/4">Full Name</th>
              <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">ID / DOB</th>
              <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">{isTertiary ? 'Faculty & Year' : 'Grade & Class'}</th>
              <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Parent / Guardian Emails</th>
              <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isAdding && (
              <tr className="border-b border-slate-50 bg-slate-50/50">
                <td className="py-4 px-2">
                  <input className="w-full bg-white border-none rounded-lg px-3 py-2 text-sm font-bold" placeholder="Student Name" value={editForm.name || ''} onChange={e => setEditForm({...editForm, name: e.target.value})} />
                </td>
                <td className="py-4 px-2 space-y-2">
                  <input className="w-full bg-white border-none rounded-lg px-3 py-2 text-xs font-bold" placeholder="Student ID" value={editForm.studentId || ''} onChange={e => setEditForm({...editForm, studentId: e.target.value})} />
                  <input type="date" className="w-full bg-white border-none rounded-lg px-3 py-2 text-xs font-bold" value={editForm.dob || ''} onChange={e => setEditForm({...editForm, dob: e.target.value})} />
                </td>
                <td className="py-4 px-2 space-y-2">
                  <input className="w-full bg-white border-none rounded-lg px-3 py-2 text-xs font-bold" placeholder="Grade/Year" value={editForm.grade || ''} onChange={e => setEditForm({...editForm, grade: e.target.value})} />
                  <input className="w-full bg-white border-none rounded-lg px-3 py-2 text-xs font-bold" placeholder="Class/Stream" value={editForm.class || ''} onChange={e => setEditForm({...editForm, class: e.target.value})} />
                </td>
                <td className="py-4 px-2">
                  <textarea className="w-full bg-white border-none rounded-lg px-3 py-2 text-xs" rows={2} placeholder="Emails (comma separated)" value={(editForm.parentEmails || []).join(', ')} onChange={e => setEditForm({...editForm, parentEmails: e.target.value.split(',').map(email => email.trim()).filter(Boolean)})} />
                </td>
                <td className="py-4 px-2 text-right space-x-2 whitespace-nowrap">
                  <button onClick={handleAdd} className="p-2 bg-emerald-100 text-emerald-600 rounded-lg hover:bg-emerald-200"><Save className="w-4 h-4" /></button>
                  <button onClick={cancelEdit} className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200"><X className="w-4 h-4" /></button>
                </td>
              </tr>
            )}

            {students.map((student) => (
              editingId === student.id ? (
                <tr key={student.id} className="border-b border-slate-50 bg-slate-50/50">
                  <td className="py-4 px-2">
                    <input className="w-full bg-white border-none rounded-lg px-3 py-2 text-sm font-bold" value={editForm.name || ''} onChange={e => setEditForm({...editForm, name: e.target.value})} />
                  </td>
                  <td className="py-4 px-2 space-y-2">
                    <input className="w-full bg-white border-none rounded-lg px-3 py-2 text-xs font-bold" placeholder="Student ID" value={editForm.studentId || ''} onChange={e => setEditForm({...editForm, studentId: e.target.value})} />
                    <input type="date" className="w-full bg-white border-none rounded-lg px-3 py-2 text-xs font-bold" value={editForm.dob || ''} onChange={e => setEditForm({...editForm, dob: e.target.value})} />
                  </td>
                  <td className="py-4 px-2 space-y-2">
                    <input className="w-full bg-white border-none rounded-lg px-3 py-2 text-xs font-bold" placeholder="Grade" value={editForm.grade || ''} onChange={e => setEditForm({...editForm, grade: e.target.value})} />
                    <input className="w-full bg-white border-none rounded-lg px-3 py-2 text-xs font-bold" placeholder="Class" value={editForm.class || ''} onChange={e => setEditForm({...editForm, class: e.target.value})} />
                  </td>
                  <td className="py-4 px-2">
                    <textarea className="w-full bg-white border-none rounded-lg px-3 py-2 text-xs" rows={2} value={(editForm.parentEmails || []).join(', ')} onChange={e => setEditForm({...editForm, parentEmails: e.target.value.split(',').map(email => email.trim()).filter(Boolean)})} />
                  </td>
                  <td className="py-4 px-2 text-right space-x-2 whitespace-nowrap">
                    <button onClick={() => handleUpdate(student.id)} className="p-2 bg-emerald-100 text-emerald-600 rounded-lg hover:bg-emerald-200"><Save className="w-4 h-4" /></button>
                    <button onClick={cancelEdit} className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200"><X className="w-4 h-4" /></button>
                  </td>
                </tr>
              ) : (
                <tr key={student.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-2">
                    <div className="font-bold text-slate-800 text-sm">{student.name}</div>
                  </td>
                  <td className="py-4 px-2">
                    <div className="text-xs font-bold text-slate-600">{student.studentId}</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">{student.dob}</div>
                  </td>
                  <td className="py-4 px-2">
                    <div className="text-xs font-bold text-indigo-600 bg-indigo-50 inline-block px-2 py-1 rounded-md mb-1">{student.grade}</div>
                    <div className="text-xs text-slate-500">{student.class}</div>
                  </td>
                  <td className="py-4 px-2">
                    {student.parentEmails && student.parentEmails.length > 0 ? (
                      <div className="space-y-1">
                        {student.parentEmails.map((email, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-xs text-slate-500">
                            <Mail className="w-3 h-3" />
                            <span>{email}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-[10px] text-slate-400 italic">No emails</span>
                    )}
                  </td>
                  <td className="py-4 px-2 text-right space-x-2 whitespace-nowrap">
                    <button onClick={() => startEdit(student)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(student.id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
        
        {students.length === 0 && !isAdding && (
          <div className="text-center py-12">
            <p className="text-slate-500 text-sm font-medium">No students registered yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};
