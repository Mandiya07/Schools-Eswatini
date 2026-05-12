import React, { useState } from 'react';
import { Teacher } from '../../types';
import { Plus, Trash2, Edit2, Save, X } from 'lucide-react';

interface TeacherManagementTabProps {
  institution: any;
  onUpdate: (data: any) => void;
}

export const TeacherManagementTab: React.FC<TeacherManagementTabProps> = ({ institution, onUpdate }) => {
  const [teachers, setTeachers] = useState<Teacher[]>(institution.staffManagement?.members || []);
  const [subjects, setSubjects] = useState<string[]>(institution.subjects || []);
  const [newSubject, setNewSubject] = useState('');
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

  const saveToInstitution = (updatedTeachers: Teacher[], updatedSubjects: string[]) => {
    onUpdate({
        ...institution,
        staffManagement: { ...institution.staffManagement, members: updatedTeachers },
        subjects: updatedSubjects
    });
  };

  const addSubject = () => {
    if (newSubject && !subjects.includes(newSubject)) {
      const updatedSubjects = [...subjects, newSubject];
      setSubjects(updatedSubjects);
      setNewSubject('');
      saveToInstitution(teachers, updatedSubjects);
    }
  };

  const removeSubject = (subject: string) => {
    const updatedSubjects = subjects.filter(s => s !== subject);
    setSubjects(updatedSubjects);
    saveToInstitution(teachers, updatedSubjects);
  };

  const saveTeacher = (teacher: Teacher) => {
    let updatedTeachers: Teacher[];
    if (teachers.find(t => t.id === teacher.id)) {
      updatedTeachers = teachers.map(t => t.id === teacher.id ? teacher : t);
    } else {
      updatedTeachers = [...teachers, teacher];
    }
    setTeachers(updatedTeachers);
    setEditingTeacher(null);
    saveToInstitution(updatedTeachers, subjects);
  };

  const removeTeacher = (id: string) => {
    const updatedTeachers = teachers.filter(t => t.id !== id);
    setTeachers(updatedTeachers);
    saveToInstitution(updatedTeachers, subjects);
  };

  return (
    <div className="space-y-8 animate-in fade-in">
        {/* Subject Management */}
        <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 mb-6">Manage Subjects</h3>
            <div className="flex gap-2 mb-4">
                <input 
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-4 font-bold text-slate-900"
                    placeholder="New Subject"
                />
                <button onClick={addSubject} className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-black uppercase text-[10px]">Add Subject</button>
            </div>
            <div className="flex flex-wrap gap-2">
                {subjects.map(s => (
                    <div key={s} className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2">
                        {s} <button onClick={() => removeSubject(s)}><X className="w-3 h-3" /></button>
                    </div>
                ))}
            </div>
        </div>

        {/* Teacher Management */}
        <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-black text-slate-900">Manage Teachers</h3>
                <button onClick={() => setEditingTeacher({ id: `teacher-${Date.now()}`, name: '', email: '', subjects: [], createdAt: new Date().toISOString() })} className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-black uppercase text-[10px] flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add Teacher
                </button>
            </div>
            <div className="space-y-4">
                {teachers.map(teacher => (
                    <div key={teacher.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                        <div>
                            <p className="font-bold">{teacher.name}</p>
                            <p className="text-xs text-slate-500">{teacher.email || 'No email'} | {teacher.subjects.join(', ')}</p>
                        </div>
                        <div className='flex gap-2'>
                            <button onClick={() => setEditingTeacher(teacher)} className="text-blue-500"><Edit2 className="w-4 h-4" /></button>
                            <button onClick={() => removeTeacher(teacher.id)} className="text-rose-500"><Trash2 className="w-4 h-4" /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Edit Modal */}
        {editingTeacher && (
           <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-[100]">
             <div className="bg-white p-8 rounded-3xl w-full max-w-md space-y-4">
                <h4 className='font-black'>Edit Teacher</h4>
                <input value={editingTeacher.name} onChange={e => setEditingTeacher({...editingTeacher, name: e.target.value})} className='w-full p-3 border rounded-xl' placeholder='Name' />
                <input value={editingTeacher.email} onChange={e => setEditingTeacher({...editingTeacher, email: e.target.value})} className='w-full p-3 border rounded-xl' placeholder='Email' />
                <div className='grid grid-cols-2 gap-2'>
                    {subjects.map(s => (
                        <label key={s} className='flex gap-2 items-center text-xs'>
                            <input 
                              type='checkbox' 
                              checked={editingTeacher.subjects.includes(s)}
                              onChange={e => {
                                const newSubjects = e.target.checked 
                                  ? [...editingTeacher.subjects, s]
                                  : editingTeacher.subjects.filter(sub => sub !== s);
                                setEditingTeacher({...editingTeacher, subjects: newSubjects});
                              }}
                            />
                            {s}
                        </label>
                    ))}
                </div>
                <div className='flex justify-end gap-2'>
                    <button onClick={() => setEditingTeacher(null)} className='text-xs font-bold'>Cancel</button>
                    <button onClick={() => saveTeacher(editingTeacher)} className='bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-black'>Save</button>
                </div>
             </div>
           </div>
        )}
    </div>
  );
};
