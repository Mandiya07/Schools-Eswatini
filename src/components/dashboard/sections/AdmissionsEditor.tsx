
import React, { useState } from 'react';
import { Institution } from '../../../../types';
import { Users, Settings, Plus, Trash2, Link as LinkIcon, Mail, Phone, User as UserIcon, Sparkles } from 'lucide-react';

interface AdmissionsEditorProps {
  institution: Institution;
  onUpdate: (updatedInst: Institution) => void;
}

const AdmissionsEditor: React.FC<AdmissionsEditorProps> = ({ institution, onUpdate }) => {
  const { admissions } = institution.sections;
  const [activeSubTab, setActiveSubTab] = useState<'settings' | 'profiles'>('settings');

  const updateAdmissionsField = (field: string, value: any) => {
    onUpdate({
      ...institution,
      sections: {
        ...institution.sections,
        admissions: {
          ...admissions,
          [field]: value
        }
      }
    });
  };

  const handleUpdateStudents = (students: any[]) => {
    onUpdate({
      ...institution,
      metadata: {
        ...institution.metadata,
        students
      }
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
      {/* Sub Tab Navigation */}
      <div className="flex gap-4 border-b border-slate-100 pb-4">
        <button 
          onClick={() => setActiveSubTab('settings')}
          className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all ${activeSubTab === 'settings' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
        >
          <Settings className="w-4 h-4" /> Admissions Settings
        </button>
        <button 
          onClick={() => setActiveSubTab('profiles')}
          className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all ${activeSubTab === 'profiles' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
        >
          <Users className="w-4 h-4" /> Student & Parent Profiles
        </button>
      </div>

      {activeSubTab === 'settings' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-10">
            <header>
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Admissions Portal Editor</h3>
              <p className="text-sm text-slate-500 font-medium">Manage how prospective students apply to your institution</p>
            </header>

            <div className="space-y-8">
              <div className="group">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 group-focus-within:text-blue-600 transition-colors">Admissions Headline</label>
                <input 
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 font-bold transition-all outline-none" 
                  value={admissions.headline} 
                  onChange={e => updateAdmissionsField('headline', e.target.value)} 
                />
              </div>

              <div className="group">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 group-focus-within:text-blue-600 transition-colors">Introduction Message</label>
                <textarea 
                  rows={4} 
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 font-medium transition-all outline-none resize-none" 
                  value={admissions.introduction} 
                  onChange={e => updateAdmissionsField('introduction', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 group-focus-within:text-blue-600 transition-colors">Online Application URL</label>
                  <input 
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 font-bold transition-all outline-none" 
                    placeholder="https://..."
                    value={admissions.onlineApplicationUrl || ''} 
                    onChange={e => updateAdmissionsField('onlineApplicationUrl', e.target.value)} 
                  />
                </div>
                <div className="group">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 group-focus-within:text-blue-600 transition-colors">Scholarship Link</label>
                  <input 
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 font-bold transition-all outline-none" 
                    placeholder="https://..."
                    value={admissions.scholarshipApplicationLink || ''} 
                    onChange={e => updateAdmissionsField('scholarshipApplicationLink', e.target.value)} 
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 bg-blue-50 p-6 rounded-3xl border border-blue-100">
                <div className="flex-1">
                  <h4 className="text-sm font-black text-blue-900 mb-1">Enable Online Portal Redirection</h4>
                  <p className="text-xs text-blue-700 font-medium font-sans">Checking this will show the 'Apply Online Now' button on your profile using the URL provided above.</p>
                </div>
                <button 
                  onClick={() => updateAdmissionsField('allowOnlineApplications', !admissions.allowOnlineApplications)}
                  className={`w-14 h-8 rounded-full transition-all relative ${admissions.allowOnlineApplications ? 'bg-blue-600' : 'bg-slate-300'}`}
                >
                  <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${admissions.allowOnlineApplications ? 'right-1' : 'left-1 shadow-sm'}`} />
                </button>
              </div>

              <div className="p-8 bg-slate-50 rounded-[40px] border border-slate-100 space-y-6">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Entry Requirements (Academic)</h4>
                <div className="space-y-3">
                  {admissions.requirements.academic.map((req, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-100">
                      <span className="text-blue-600 font-black text-xs">0{idx + 1}</span>
                      <input 
                        className="flex-1 border-none font-bold text-slate-700 focus:ring-0 p-0" 
                        value={req} 
                        onChange={e => {
                          const newReqs = [...admissions.requirements.academic];
                          newReqs[idx] = e.target.value;
                          updateAdmissionsField('requirements', { ...admissions.requirements, academic: newReqs });
                        }} 
                      />
                      <button 
                        onClick={() => {
                          const newReqs = admissions.requirements.academic.filter((_, i) => i !== idx);
                          updateAdmissionsField('requirements', { ...admissions.requirements, academic: newReqs });
                        }}
                        className="text-rose-500 hover:text-rose-700 transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button 
                    onClick={() => updateAdmissionsField('requirements', { ...admissions.requirements, academic: [...admissions.requirements.academic, 'New Requirement'] })}
                    className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:bg-slate-100 transition-all"
                  >
                    + Add Requirement
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <header>
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Admissions Preview</h3>
            </header>
            
            <div className="sticky top-8">
              <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
                <div className="space-y-4">
                  <h4 className="text-2xl font-black text-slate-900 tracking-tight">{admissions.headline || 'Join Our Community'}</h4>
                  <p className="text-slate-500 font-medium text-sm leading-relaxed">{admissions.introduction || 'Application process details...'}</p>
                </div>

                <div className="space-y-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Academic Requirements</p>
                  <div className="space-y-3">
                    {admissions.requirements.academic.map((req, idx) => (
                      <div key={idx} className="flex items-center gap-4 group">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-[10px] font-black">✓</div>
                        <p className="text-slate-700 font-bold text-sm">{req}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 space-y-4">
                  {admissions.onlineApplicationUrl && (
                    <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl">
                      Go to Online Application
                    </button>
                  )}
                  {admissions.scholarshipApplicationLink && (
                    <button className="w-full py-4 bg-white border-2 border-slate-900 text-slate-900 rounded-2xl font-black uppercase tracking-widest text-[10px]">
                      Scholarship Info
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-in slide-in-from-left-4">
          <div className="flex justify-between items-center bg-indigo-50 p-8 rounded-[40px] border border-indigo-100">
            <div>
              <h3 className="text-xl font-black text-indigo-900 tracking-tight">Student & Parent Profiles</h3>
              <p className="text-sm text-indigo-700 font-medium">Manage detailed profiles and link parents to their children's records.</p>
            </div>
            <button 
              onClick={() => {
                const newStudent = {
                  id: `stu_${Date.now()}`,
                  institutionId: institution.id,
                  name: 'New Admitted Student',
                  studentId: `S-${Math.floor(1000 + Math.random() * 9000)}`,
                  grade: 'Grade 1',
                  class: 'A',
                  dob: '',
                  parentName: '',
                  parentRelationship: 'Parent',
                  parentPhone: '',
                  parentEmails: [],
                  createdAt: new Date().toISOString()
                };
                handleUpdateStudents([...(institution.metadata?.students || []), newStudent]);
              }}
              className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-indigo-200 flex items-center gap-3"
            >
              <Plus className="w-4 h-4" /> Add Admitted Student
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {(institution.metadata?.students || []).map((student: any, idx: number) => (
              <div key={student.id} className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden group">
                <div className="bg-slate-900 p-6 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white font-black">
                      {student.name.charAt(0)}
                    </div>
                    <input 
                      className="bg-transparent border-none text-white font-black text-lg p-0 focus:ring-0 w-max" 
                      value={student.name}
                      onChange={e => {
                        const students = [...institution.metadata!.students];
                        students[idx].name = e.target.value;
                        handleUpdateStudents(students);
                      }}
                    />
                  </div>
                  <button 
                    onClick={() => {
                      const students = institution.metadata!.students.filter((s: any) => s.id !== student.id);
                      handleUpdateStudents(students);
                    }}
                    className="text-slate-400 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                       <UserIcon className="w-3 h-3" /> Student Particulars
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[8px] font-bold text-slate-400 uppercase">Grade</label>
                        <input className="w-full bg-slate-50 border-none rounded-lg px-3 py-2 text-xs font-bold" value={student.grade} onChange={e => {
                          const students = [...institution.metadata!.students];
                          students[idx].grade = e.target.value;
                          handleUpdateStudents(students);
                        }} />
                      </div>
                      <div>
                        <label className="text-[8px] font-bold text-slate-400 uppercase">Class</label>
                        <input className="w-full bg-slate-50 border-none rounded-lg px-3 py-2 text-xs font-bold" value={student.class} onChange={e => {
                          const students = [...institution.metadata!.students];
                          students[idx].class = e.target.value;
                          handleUpdateStudents(students);
                        }} />
                      </div>
                    </div>
                    <div>
                      <label className="text-[8px] font-bold text-slate-400 uppercase">Student ID</label>
                      <input className="w-full bg-slate-50 border-none rounded-lg px-3 py-2 text-xs font-black text-indigo-600" value={student.studentId} onChange={e => {
                        const students = [...institution.metadata!.students];
                        students[idx].studentId = e.target.value;
                        handleUpdateStudents(students);
                      }} />
                    </div>
                  </div>

                  {/* Parent Info */}
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                       <UserIcon className="w-3 h-3" /> Parent / Guardian
                    </h4>
                    <div>
                      <label className="text-[8px] font-bold text-slate-400 uppercase">Guardian Name</label>
                      <input className="w-full bg-slate-50 border-none rounded-lg px-3 py-2 text-xs font-bold" value={student.parentName || ''} onChange={e => {
                        const students = [...institution.metadata!.students];
                        students[idx].parentName = e.target.value;
                        handleUpdateStudents(students);
                      }} />
                    </div>
                    <div>
                      <label className="text-[8px] font-bold text-slate-400 uppercase">Relationship</label>
                      <select className="w-full bg-slate-50 border-none rounded-lg px-3 py-2 text-xs font-bold" value={student.parentRelationship || 'Parent'} onChange={e => {
                        const students = [...institution.metadata!.students];
                        students[idx].parentRelationship = e.target.value;
                        handleUpdateStudents(students);
                      }} >
                        <option value="Father">Father</option>
                        <option value="Mother">Mother</option>
                        <option value="Guardian">Guardian</option>
                        <option value="Sibling">Sibling</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[8px] font-bold text-slate-400 uppercase flex items-center gap-1">
                        <Phone className="w-2 h-2" /> Phone
                      </label>
                      <input className="w-full bg-slate-50 border-none rounded-lg px-3 py-2 text-xs font-bold" value={student.parentPhone || ''} onChange={e => {
                        const students = [...institution.metadata!.students];
                        students[idx].parentPhone = e.target.value;
                        handleUpdateStudents(students);
                      }} />
                    </div>
                  </div>

                  {/* Account Linkage */}
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                       <LinkIcon className="w-3 h-3" /> Account Reconciliation
                    </h4>
                    <div>
                      <label className="text-[8px] font-bold text-slate-400 uppercase flex items-center gap-1">
                        <Mail className="w-2 h-2" /> Linked Parent Emails
                      </label>
                      <textarea 
                        className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-xs font-medium resize-none" 
                        rows={3}
                        placeholder="Enter email addresses (one per line)..."
                        value={student.parentEmails?.join('\n')}
                        onChange={e => {
                          const students = [...institution.metadata!.students];
                          students[idx].parentEmails = e.target.value.split('\n').map(s => s.trim()).filter(s => s !== '');
                          handleUpdateStudents(students);
                        }}
                      />
                      <p className="text-[9px] text-slate-400 mt-2 italic flex items-center gap-2">
                        <Sparkles className="w-3 h-3 text-amber-500" />
                        Parents with these emails will automatically see this student profile in their portal.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {(!institution.metadata?.students || institution.metadata.students.length === 0) && (
              <div className="text-center py-20 bg-slate-50 rounded-[40px] border border-dashed border-slate-200">
                <Users className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                <p className="text-slate-400 font-black uppercase tracking-widest text-xs">No Admitted Student Profiles Records</p>
                <p className="text-slate-400 text-xs mt-2">Start by adding students who have completed the admissions process.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdmissionsEditor;
