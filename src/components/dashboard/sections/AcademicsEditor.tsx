
import React, { useState } from 'react';
import { Institution } from '../../../../types';
import { Download } from 'lucide-react';

interface AcademicsEditorProps {
  institution: Institution;
  onUpdate: (updatedSections: Institution['sections']) => void;
}

const AcademicsEditor: React.FC<AcademicsEditorProps> = ({ institution, onUpdate }) => {
  const { academics } = institution.sections;
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'departments' | 'programs' | 'staff'>('overview');

  const updateField = (field: string, value: any) => {
    onUpdate({
      ...institution.sections,
      academics: {
        ...academics,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Academic Portal Builder</h3>
          <p className="text-sm text-slate-500 font-medium">Manage departments, programs, and academic standards</p>
        </div>
        <div className="flex bg-slate-100 p-1.5 rounded-2xl">
          {(['overview', 'departments', 'programs', 'staff'] as const).map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveSubTab(tab)}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeSubTab === tab ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          {activeSubTab === 'overview' && (
            <div className="space-y-8 animate-in slide-in-from-left-4">
              <div className="group">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Academic Headline</label>
                <input 
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 font-bold transition-all outline-none" 
                  value={academics.overview.headline} 
                  onChange={e => updateField('overview', { ...academics.overview, headline: e.target.value })} 
                />
              </div>
              <div className="group">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Academic Introduction</label>
                <textarea 
                  rows={8} 
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 font-medium transition-all outline-none resize-none" 
                  value={academics.overview.introduction} 
                  onChange={e => updateField('overview', { ...academics.overview, introduction: e.target.value })}
                />
              </div>
            </div>
          )}

          {activeSubTab === 'departments' && (
            <div className="space-y-6 animate-in slide-in-from-left-4">
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Departments List</h4>
                <button 
                  onClick={() => updateField('departments', [...academics.departments, { id: Date.now(), name: 'New Department', head: '', overview: '', subjects: [], icon: '🎓' }])}
                  className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline"
                >
                  + Add Department
                </button>
              </div>
              <div className="space-y-4">
                {academics.departments.map((dept, idx) => (
                  <div key={dept.id} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4">
                    <div className="flex justify-between items-center">
                      <input 
                        className="bg-transparent border-none font-black text-slate-900 p-0 focus:ring-0 text-lg w-full" 
                        value={dept.name} 
                        onChange={e => {
                          const newDepts = [...academics.departments];
                          newDepts[idx].name = e.target.value;
                          updateField('departments', newDepts);
                        }}
                        placeholder="Department Name"
                      />
                      <button 
                        onClick={() => updateField('departments', academics.departments.filter((_, i) => i !== idx))}
                        className="text-rose-500 hover:text-rose-700 ml-4"
                      >
                        ✕
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Head of Department</label>
                        <input 
                          className="w-full bg-white border rounded-xl px-4 py-2 text-xs font-bold" 
                          placeholder="e.g., Dr. Jane Smith" 
                          value={dept.head || ''} 
                          onChange={e => {
                            const newDepts = [...academics.departments];
                            newDepts[idx].head = e.target.value;
                            updateField('departments', newDepts);
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Subjects (Comma Separated)</label>
                        <input 
                          className="w-full bg-white border rounded-xl px-4 py-2 text-xs font-bold" 
                          placeholder="e.g., Math, Science, English" 
                          value={dept.subjects ? dept.subjects.join(', ') : ''} 
                          onChange={e => {
                            const newDepts = [...academics.departments];
                            newDepts[idx].subjects = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                            updateField('departments', newDepts);
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Icon (Emoji)</label>
                        <input 
                          className="w-full bg-white border rounded-xl px-4 py-2 text-xs font-bold" 
                          placeholder="e.g., 🎓" 
                          value={dept.icon || ''} 
                          onChange={e => {
                            const newDepts = [...academics.departments];
                            newDepts[idx].icon = e.target.value;
                            updateField('departments', newDepts);
                          }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Department Overview</label>
                      <textarea
                        rows={3}
                        className="w-full bg-white border rounded-xl px-4 py-3 text-xs font-medium resize-none outline-none focus:border-blue-500"
                        placeholder="Provide a brief overview of the department..."
                        value={dept.overview || ''}
                        onChange={e => {
                          const newDepts = [...academics.departments];
                          newDepts[idx].overview = e.target.value;
                          updateField('departments', newDepts);
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSubTab === 'programs' && (
            <div className="space-y-6 animate-in slide-in-from-left-4">
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-blue-600">Programs & Courses</h4>
                <button 
                  onClick={() => updateField('programs', [...academics.programs, { id: Date.now().toString(), name: 'New Program', qualification: 'Undergraduate', duration: '4 Years', subjects: [], requirements: '', description: '', syllabusUrl: '' }])}
                  className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline"
                >
                  + Add Program
                </button>
              </div>
              <div className="space-y-4">
                {academics.programs.map((prog, idx) => (
                  <div key={prog.id} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4 relative group">
                    <div className="flex justify-between items-center">
                      <input 
                        className="bg-transparent border-none font-black text-slate-900 p-0 focus:ring-0 text-lg w-full" 
                        value={prog.name} 
                        onChange={e => {
                          const newProgs = [...academics.programs];
                          newProgs[idx].name = e.target.value;
                          updateField('programs', newProgs);
                        }}
                        placeholder="Program name (e.g. IB Diploma)"
                      />
                      <button 
                        onClick={() => updateField('programs', academics.programs.filter((_, i) => i !== idx))}
                        className="text-rose-500 hover:text-rose-700 ml-4"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Qualification Awarded</label>
                        <select 
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold outline-none focus:border-blue-500"
                          value={prog.qualification || 'Undergraduate'}
                          onChange={e => {
                            const newProgs = [...academics.programs];
                            newProgs[idx].qualification = e.target.value;
                            updateField('programs', newProgs);
                          }}
                        >
                          <option value="Primary">Primary</option>
                          <option value="Secondary">Secondary</option>
                          <option value="Undergraduate">Undergraduate</option>
                          <option value="Postgraduate">Postgraduate</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Duration</label>
                        <input 
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold outline-none focus:border-blue-500" 
                          placeholder="e.g. 2 Years" 
                          value={prog.duration || ''} 
                          onChange={e => {
                            const newProgs = [...academics.programs];
                            newProgs[idx].duration = e.target.value;
                            updateField('programs', newProgs);
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Subjects Offered (Comma Separated)</label>
                      <input 
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold outline-none focus:border-blue-500" 
                        placeholder="e.g., Mathematics, Physics, Chemistry" 
                        value={prog.subjects ? prog.subjects.join(', ') : ''} 
                        onChange={e => {
                          const newProgs = [...academics.programs];
                          newProgs[idx].subjects = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                          updateField('programs', newProgs);
                        }}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Entry Requirements</label>
                        <textarea 
                          rows={3}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium outline-none focus:border-blue-500 resize-none" 
                          placeholder="e.g. Pass in IGCSE with minimum 5 Cs" 
                          value={prog.requirements || ''} 
                          onChange={e => {
                            const newProgs = [...academics.programs];
                            newProgs[idx].requirements = e.target.value;
                            updateField('programs', newProgs);
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Syllabus PDF URL</label>
                        <input 
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold outline-none focus:border-blue-500" 
                          placeholder="e.g. https://example.com/syllabus.pdf" 
                          value={prog.syllabusUrl || ''} 
                          onChange={e => {
                            const newProgs = [...academics.programs];
                            newProgs[idx].syllabusUrl = e.target.value;
                            updateField('programs', newProgs);
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Short Description</label>
                      <textarea 
                        rows={3}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium outline-none focus:border-blue-500 resize-none" 
                        placeholder="Brief description of the curriculum and goals..." 
                        value={prog.description || ''} 
                        onChange={e => {
                          const newProgs = [...academics.programs];
                          newProgs[idx].description = e.target.value;
                          updateField('programs', newProgs);
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Syllabus URL</label>
                        <div className="flex items-center gap-3">
                          <input 
                            type="text" 
                            className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-medium" 
                            placeholder="URL to syllabus (or upload file)" 
                            value={prog.syllabusUrl || ''} 
                            onChange={e => {
                              const newProgs = [...academics.programs];
                              newProgs[idx].syllabusUrl = e.target.value;
                              updateField('programs', newProgs);
                            }}
                          />
                          <label className="cursor-pointer bg-blue-50 text-blue-600 hover:bg-blue-100 flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-colors">
                            Upload File
                            <input 
                              type="file" 
                              className="hidden" 
                              accept="application/pdf"
                              onChange={e => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    const newProgs = [...academics.programs];
                                    newProgs[idx].syllabusUrl = reader.result as string;
                                    updateField('programs', newProgs);
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </label>
                        </div>
                        {prog.syllabusUrl && (
                           <a href={prog.syllabusUrl} target="_blank" rel="noreferrer" className="text-[10px] font-medium text-blue-500 hover:underline">View Current Syllabus →</a>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSubTab === 'staff' && (
            <div className="space-y-6 animate-in slide-in-from-left-4">
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-blue-600">Academic Staff Profiles</h4>
                <button 
                  onClick={() => updateField('staff', {
                    ...academics.staff, 
                    profiles: [...(academics.staff.profiles || []), { id: Date.now().toString(), name: 'New Staff Member', role: 'Teacher', qualifications: '', professionalBackground: '', image: '' }]
                  })}
                  className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline"
                >
                  + Add Staff Profile
                </button>
              </div>
              <div className="space-y-4">
                {(academics.staff.profiles || []).map((profile, idx) => (
                  <div key={profile.id} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4 relative group">
                    <div className="flex justify-between items-center">
                      <input 
                        className="bg-transparent border-none font-black text-slate-900 p-0 focus:ring-0 text-lg w-full" 
                        value={profile.name} 
                        onChange={e => {
                          const newProfiles = [...(academics.staff.profiles || [])];
                          newProfiles[idx].name = e.target.value;
                          updateField('staff', { ...academics.staff, profiles: newProfiles });
                        }}
                        placeholder="Staff Name"
                      />
                      <button 
                        onClick={() => {
                          const newProfiles = (academics.staff.profiles || []).filter((_, i) => i !== idx);
                          updateField('staff', { ...academics.staff, profiles: newProfiles });
                        }}
                        className="text-rose-500 hover:text-rose-700 ml-4"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Role / Title</label>
                        <input 
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold outline-none focus:border-blue-500" 
                          placeholder="e.g. Senior Lecturer" 
                          value={profile.role || ''} 
                          onChange={e => {
                            const newProfiles = [...(academics.staff.profiles || [])];
                            newProfiles[idx].role = e.target.value;
                            updateField('staff', { ...academics.staff, profiles: newProfiles });
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Qualifications</label>
                        <input 
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold outline-none focus:border-blue-500" 
                          placeholder="e.g. Ph.D. in Biology, M.Ed." 
                          value={profile.qualifications || ''} 
                          onChange={e => {
                            const newProfiles = [...(academics.staff.profiles || [])];
                            newProfiles[idx].qualifications = e.target.value;
                            updateField('staff', { ...academics.staff, profiles: newProfiles });
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Professional Background</label>
                        <textarea 
                          rows={3}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium outline-none focus:border-blue-500 resize-none" 
                          placeholder="Brief description of experience, awards, and specialties..." 
                          value={profile.professionalBackground || ''} 
                          onChange={e => {
                            const newProfiles = [...(academics.staff.profiles || [])];
                            newProfiles[idx].professionalBackground = e.target.value;
                            updateField('staff', { ...academics.staff, profiles: newProfiles });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-8">
          <header>
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Academic Preview</h3>
          </header>
          
          <div className="sticky top-8 space-y-6">
            <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
              <div className="space-y-4">
                <h4 className="text-2xl font-black text-slate-900 tracking-tight">{academics.overview.headline}</h4>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">{academics.overview.introduction}</p>
              </div>

              {activeSubTab === 'departments' && (
                <div className="space-y-4 animate-in fade-in">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Academic Departments</p>
                  <div className="grid grid-cols-1 gap-4">
                    {academics.departments.map(dept => (
                      <div key={dept.id} className="p-5 bg-slate-50 rounded-3xl border border-slate-100 flex items-start gap-4">
                        <span className="text-2xl bg-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm shrink-0">{dept.icon}</span>
                        <div>
                          <p className="text-sm font-black text-slate-900">{dept.name}</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Head: {dept.head || 'TBD'}</p>
                          <p className="text-xs text-slate-600 mt-2 line-clamp-2">{dept.overview}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSubTab === 'programs' && (
                <div className="space-y-4 animate-in fade-in">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Available Programs</p>
                  <div className="space-y-4">
                    {academics.programs.map(prog => (
                      <div key={prog.id} className="p-6 bg-slate-50 rounded-3xl border-l-4 border-l-blue-600 space-y-3 shadow-sm transition-all hover:bg-slate-100">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-black text-slate-900">{prog.name}</h5>
                            <div className="flex gap-2 mt-1">
                               <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[8px] font-black uppercase rounded-full">{prog.qualification}</span>
                               <span className="px-2 py-0.5 bg-slate-200 text-slate-600 text-[8px] font-black uppercase rounded-full">{prog.duration}</span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                           <p className="text-xs text-slate-600 font-medium line-clamp-2 italic">"{prog.description}"</p>
                           <div className="pt-2 border-t border-slate-200">
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Entry Requirements</p>
                              <p className="text-[10px] text-slate-700 font-bold">{prog.requirements}</p>
                           </div>
                           {prog.syllabusUrl && (
                             <a 
                               href={prog.syllabusUrl} 
                               target="_blank" 
                               rel="noreferrer" 
                               className="w-full py-3 bg-blue-600 text-white rounded-2xl font-black text-[9px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-900 transition-all mt-4"
                             >
                               <Download className="w-3 h-3" /> Download Syllabus PDF
                             </a>
                           )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSubTab === 'overview' && (
                <div className="grid grid-cols-2 gap-4 animate-in fade-in">
                  {academics.departments.slice(0, 4).map(dept => (
                    <div key={dept.id} className="p-4 bg-slate-50 rounded-2xl flex items-center gap-3">
                      <span className="text-xl">{dept.icon}</span>
                      <p className="text-[10px] font-black text-slate-900 truncate">{dept.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicsEditor;
