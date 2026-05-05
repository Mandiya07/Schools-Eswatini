
import React, { useState } from 'react';
import { Institution, InstitutionType } from '../../../../types';
import { Download } from 'lucide-react';

interface AcademicsEditorProps {
  institution: Institution;
  onUpdate: (updatedSections: Institution['sections']) => void;
}

const AcademicsEditor: React.FC<AcademicsEditorProps> = ({ institution, onUpdate }) => {
  const { academics } = institution.sections;
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'departments' | 'programs' | 'calendar' | 'performance'>('overview');

  const isTertiary = institution.type === InstitutionType.TERTIARY;
  const isPrimary = institution.type === InstitutionType.PRIMARY;
  const isHighSchool = institution.type === InstitutionType.HIGH_SCHOOL;

  const subTabs = ['overview', 'departments', 'programs', 'calendar', 'performance'] as const;
  const currentSubTabs = isHighSchool ? [...subTabs, 'guidance'] : subTabs;

  const getTabLabel = (tab: string) => {
    switch(tab) {
      case 'departments': return isTertiary ? 'Faculties & Departments' : isPrimary ? 'Grades / Phases' : 'Departments';
      case 'programs': return isTertiary ? 'Degree Programs' : isPrimary ? 'Extracurriculars' : 'Programs';
      case 'performance': return 'Performance';
      case 'guidance': return 'Career & University Help';
      default: return tab.charAt(0).toUpperCase() + tab.slice(1); // overview, calendar
    }
  };

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
          <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">
            {isTertiary ? 'Institutional Academic Builder' : isPrimary ? 'Foundation Phase Builder' : 'Academic Portal Builder'}
          </h3>
          <p className="text-sm text-slate-500 font-medium">
            {isTertiary ? 'Manage faculties, degrees, and faculty research settings.' : isPrimary ? 'Manage grades, learning areas, and simple schedules.' : 'Manage departments, programs, and academic standards'}
          </p>
        </div>
        <div className="flex bg-slate-100 p-1.5 rounded-2xl overflow-x-auto no-scrollbar">
          {currentSubTabs.map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveSubTab(tab as any)}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeSubTab === tab ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {getTabLabel(tab)}
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

          {activeSubTab === 'performance' && (
            <div className="space-y-8 animate-in slide-in-from-left-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Overall Pass Rate</label>
                  <input 
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 font-bold transition-all outline-none" 
                    placeholder="e.g., 98%"
                    value={academics.performance.passRate} 
                    onChange={e => updateField('performance', { ...academics.performance, passRate: e.target.value })} 
                  />
                </div>
                <div className="group">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Ranking / Standing</label>
                  <input 
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 font-bold transition-all outline-none" 
                    placeholder="e.g., Top 5 in Manzini"
                    value={academics.performance.ranking} 
                    onChange={e => updateField('performance', { ...academics.performance, ranking: e.target.value })} 
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Notable Distinctions</label>
                <textarea 
                  rows={4}
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 font-medium transition-all outline-none resize-none" 
                  placeholder="Summarize key academic achievements..."
                  value={academics.performance.distinctions} 
                  onChange={e => updateField('performance', { ...academics.performance, distinctions: e.target.value })} 
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Academic Awards</h4>
                  <button 
                    onClick={() => updateField('performance', {
                      ...academics.performance,
                      awards: [...academics.performance.awards, '']
                    })}
                    className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline"
                  >
                    + Add Award
                  </button>
                </div>
                <div className="space-y-3">
                  {academics.performance.awards.map((award, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <input 
                        className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold outline-none focus:border-blue-500" 
                        placeholder="e.g., Science Fair Gold Medal 2023"
                        value={award} 
                        onChange={e => {
                          const newAwards = [...academics.performance.awards];
                          newAwards[idx] = e.target.value;
                          updateField('performance', { ...academics.performance, awards: newAwards });
                        }}
                      />
                      <button 
                        onClick={() => {
                          const newAwards = academics.performance.awards.filter((_, i) => i !== idx);
                          updateField('performance', { ...academics.performance, awards: newAwards });
                        }}
                        className="text-rose-500 hover:text-rose-700 font-bold"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'departments' && (
            <div className="space-y-6 animate-in slide-in-from-left-4">
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {isTertiary ? 'Faculty List' : isPrimary ? 'Grades & Phases' : 'Departments List'}
                </h4>
                <button 
                  onClick={() => updateField('departments', [...academics.departments, { id: Date.now(), name: isTertiary ? 'New Faculty' : isPrimary ? 'New Grade/Phase' : 'New Department', head: '', overview: '', subjects: [], icon: '🎓' }])}
                  className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline"
                >
                  + Add {isTertiary ? 'Faculty' : isPrimary ? 'Grade/Phase' : 'Department'}
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
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                          {isTertiary ? 'Dean / Head of Faculty' : 'Head of Department'}
                        </label>
                        <input 
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold outline-none focus:border-blue-500" 
                          placeholder={isTertiary ? "e.g., Prof. Jane Smith" : "e.g., Dr. Jane Smith"} 
                          value={dept.head || ''} 
                          onChange={e => {
                            const newDepts = [...academics.departments];
                            newDepts[idx].head = e.target.value;
                            updateField('departments', newDepts);
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Icon (Emoji)</label>
                        <input 
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold outline-none focus:border-blue-500" 
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
                      <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Subjects Offered</label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {(dept.subjects || []).map(sub => (
                          <span key={sub} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold border border-slate-200 flex items-center gap-2">
                            {sub}
                            <button 
                              onClick={() => {
                                const newDepts = [...academics.departments];
                                newDepts[idx].subjects = (dept.subjects || []).filter(s => s !== sub);
                                updateField('departments', newDepts);
                              }} 
                              className="hover:text-rose-500 transition-colors"
                            >
                              ✕
                            </button>
                          </span>
                        ))}
                      </div>
                      <input 
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold outline-none focus:border-blue-500"
                        placeholder="Type a subject and press Enter (e.g. Mathematics)"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            const input = e.currentTarget;
                            const val = input.value.trim();
                            if (val && !(dept.subjects || []).includes(val)) {
                              const newDepts = [...academics.departments];
                              newDepts[idx].subjects = [...(dept.subjects || []), val];
                              updateField('departments', newDepts);
                              input.value = '';
                            }
                          }
                        }}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Department Overview</label>
                      <textarea
                        rows={4}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium resize-none outline-none focus:border-blue-500"
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
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-blue-600">
                  {isTertiary ? 'Degree Programs' : isPrimary ? 'Extracurriculars' : 'Programs & Courses'}
                </h4>
                <button 
                  onClick={() => updateField('programs', [...academics.programs, { id: Date.now().toString(), name: isTertiary ? 'New Degree Program' : isPrimary ? 'New Extracurricular' : 'New Program', qualification: isTertiary ? 'Undergraduate' : isPrimary ? 'Primary' : 'Secondary', duration: isTertiary ? '4 Years' : '1 Year', subjects: [], requirements: { academic: [], documents: [], additional: [] }, description: '', syllabusUrl: '' }])}
                  className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline"
                >
                  + Add {isTertiary ? 'Program' : isPrimary ? 'Activity' : 'Program'}
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
                      <div className="md:col-span-2">
                        <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Entry Requirements</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-[9px] font-bold text-slate-500 mb-1">Academic (One per line)</label>
                            <textarea 
                              rows={3}
                              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium outline-none focus:border-blue-500 resize-none" 
                              placeholder="e.g. Pass in IGCSE with minimum 5 Cs" 
                              value={typeof prog.requirements === 'string' ? prog.requirements : (prog.requirements?.academic || []).join('\n')} 
                              onChange={e => {
                                const newProgs = [...academics.programs];
                                const req = typeof newProgs[idx].requirements === 'string' ? { academic: [], documents: [], additional: [] } : (newProgs[idx].requirements || { academic: [], documents: [], additional: [] });
                                req.academic = e.target.value.split('\n').filter(s => s.trim() !== '');
                                newProgs[idx].requirements = req;
                                updateField('programs', newProgs);
                              }}
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] font-bold text-slate-500 mb-1">Required Documents</label>
                            <textarea 
                              rows={3}
                              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium outline-none focus:border-blue-500 resize-none" 
                              placeholder="e.g. Birth certificate, Past reports" 
                              value={typeof prog.requirements === 'string' ? '' : (prog.requirements?.documents || []).join('\n')} 
                              onChange={e => {
                                const newProgs = [...academics.programs];
                                const req = typeof newProgs[idx].requirements === 'string' ? { academic: [newProgs[idx].requirements as string], documents: [], additional: [] } : (newProgs[idx].requirements || { academic: [], documents: [], additional: [] });
                                req.documents = e.target.value.split('\n').filter(s => s.trim() !== '');
                                newProgs[idx].requirements = req;
                                updateField('programs', newProgs);
                              }}
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] font-bold text-slate-500 mb-1">Additional Requirements</label>
                            <textarea 
                              rows={3}
                              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium outline-none focus:border-blue-500 resize-none" 
                              placeholder="e.g. Entrance exam, Interview" 
                              value={typeof prog.requirements === 'string' ? '' : (prog.requirements?.additional || []).join('\n')} 
                              onChange={e => {
                                const newProgs = [...academics.programs];
                                const req = typeof newProgs[idx].requirements === 'string' ? { academic: [newProgs[idx].requirements as string], documents: [], additional: [] } : (newProgs[idx].requirements || { academic: [], documents: [], additional: [] });
                                req.additional = e.target.value.split('\n').filter(s => s.trim() !== '');
                                newProgs[idx].requirements = req;
                                updateField('programs', newProgs);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 md:col-span-2">
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
                          <label className="cursor-pointer bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-200 flex-shrink-0 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-sm flex items-center gap-2">
                            <span className="text-blue-500">📄</span> Upload PDF
                            <input 
                              type="file" 
                              className="hidden" 
                              accept="application/pdf"
                              onChange={e => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  // Since we don't have a real storage backend, we simulate an upload
                                  // For a real app, this would upload to Firebase Storage and return the download URL
                                  const fakeUrl = `https://storage.schools.sz/pdf/${encodeURIComponent(file.name.replace(/\s+/g, '-'))}`;
                                  const newProgs = [...academics.programs];
                                  newProgs[idx].syllabusUrl = fakeUrl;
                                  updateField('programs', newProgs);
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
                  </div>
                ))}
              </div>
            </div>
          )}



          {activeSubTab === 'calendar' && (
            <div className="space-y-8 animate-in slide-in-from-left-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Academic Year Start Date</label>
                  <input 
                    type="text"
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 font-bold transition-all outline-none" 
                    placeholder="e.g., January 15th"
                    value={academics.calendar.startDate} 
                    onChange={e => updateField('calendar', { ...academics.calendar, startDate: e.target.value })} 
                  />
                </div>
                <div className="group">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Calendar PDF URL (Optional)</label>
                  <input 
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 font-bold transition-all outline-none" 
                    placeholder="Link to full academic calendar"
                    value={academics.calendar.url || ''} 
                    onChange={e => updateField('calendar', { ...academics.calendar, url: e.target.value })} 
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Term/Semester Breakdown</h4>
                  <button 
                    onClick={() => updateField('calendar', {
                      ...academics.calendar,
                      terms: [...academics.calendar.terms, { name: `Term ${academics.calendar.terms.length + 1}`, info: '' }]
                    })}
                    className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline"
                  >
                    + Add Term
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {academics.calendar.terms.map((term, idx) => (
                    <div key={idx} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex items-start gap-6">
                      <div className="flex-1 space-y-4">
                        <input 
                          className="bg-transparent border-none font-black text-slate-900 p-0 focus:ring-0 text-sm w-full" 
                          value={term.name} 
                          onChange={e => {
                            const newTerms = [...academics.calendar.terms];
                            newTerms[idx].name = e.target.value;
                            updateField('calendar', { ...academics.calendar, terms: newTerms });
                          }}
                          placeholder="Term Name"
                        />
                        <input 
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-medium outline-none focus:border-blue-500" 
                          placeholder="e.g., Starts Sept 4 - Ends Dec 12"
                          value={term.info} 
                          onChange={e => {
                            const newTerms = [...academics.calendar.terms];
                            newTerms[idx].info = e.target.value;
                            updateField('calendar', { ...academics.calendar, terms: newTerms });
                          }}
                        />
                      </div>
                      <button 
                        onClick={() => {
                          const newTerms = academics.calendar.terms.filter((_, i) => i !== idx);
                          updateField('calendar', { ...academics.calendar, terms: newTerms });
                        }}
                        className="text-rose-500 hover:text-rose-700 mt-1"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Examination Periods</label>
                  <textarea 
                    rows={4}
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 font-medium transition-all outline-none resize-none" 
                    placeholder="e.g., Mid-year exams in June, Final exams in November"
                    value={academics.calendar.examPeriods} 
                    onChange={e => updateField('calendar', { ...academics.calendar, examPeriods: e.target.value })} 
                  />
                </div>
                <div className="group">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Holiday Breaks</label>
                  <textarea 
                    rows={4}
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 font-medium transition-all outline-none resize-none" 
                    placeholder="e.g., 1-week break in April, 3-week break in August"
                    value={academics.calendar.holidays} 
                    onChange={e => updateField('calendar', { ...academics.calendar, holidays: e.target.value })} 
                  />
                </div>
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

              {activeSubTab === 'performance' && (
                <div className="space-y-4 animate-in fade-in py-4 border-t border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Performance Metrics</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Pass Rate</p>
                       <p className="text-lg font-black text-slate-900">{academics.performance.passRate || '--'}</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Ranking</p>
                       <p className="text-lg font-black text-slate-900 truncate">{academics.performance.ranking || '--'}</p>
                    </div>
                  </div>
                  <div className="pt-4 space-y-4">
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Distinctions</p>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed italic">"{academics.performance.distinctions || 'No distinctions recorded.'}"</p>
                    </div>
                    {academics.performance.awards.length > 0 && (
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Recent Awards</p>
                        <div className="flex flex-wrap gap-2">
                          {academics.performance.awards.map((award, i) => (
                             <span key={i} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[9px] font-black uppercase tracking-widest">
                               🏆 {award}
                             </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}



              {activeSubTab === 'departments' && (
                <div className="space-y-4 animate-in fade-in">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {isTertiary ? 'Academic Faculties' : isPrimary ? 'Grades & Phases' : 'Academic Departments'}
                  </p>
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
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {isTertiary ? 'Degree Programs' : isPrimary ? 'Extracurriculars' : 'Available Programs'}
                  </p>
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
                              {typeof prog.requirements === 'string' ? (
                                <p className="text-[10px] text-slate-700 font-bold">{prog.requirements}</p>
                              ) : (
                                <ul className="list-disc pl-4 text-[10px] text-slate-700 font-bold">
                                  {(prog.requirements?.academic || []).map((req, i) => <li key={`ac-${i}`}>{req}</li>)}
                                  {(prog.requirements?.documents || []).length > 0 && 
                                    <span className="text-[9px] text-slate-400 uppercase">Documents:</span>
                                  }
                                  {(prog.requirements?.documents || []).map((req, i) => <li key={`doc-${i}`}>{req}</li>)}
                                  {(prog.requirements?.additional || []).length > 0 && 
                                    <span className="text-[9px] text-slate-400 uppercase">Additional:</span>
                                  }
                                  {(prog.requirements?.additional || []).map((req, i) => <li key={`add-${i}`}>{req}</li>)}
                                </ul>
                              )}
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

              {activeSubTab === 'calendar' && (
                <div className="space-y-6 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Academic Calendar</p>
                    {academics.calendar.startDate && (
                      <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest">
                        Starts: {academics.calendar.startDate}
                      </span>
                    )}
                  </div>
                  <div className="space-y-4">
                    {academics.calendar.terms.map((term, idx) => (
                      <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <p className="text-xs font-black text-slate-900">{term.name}</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">{term.info || 'No details provided'}</p>
                      </div>
                    ))}
                    <div className="grid grid-cols-1 gap-4 pt-4 border-t border-slate-100">
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Exams</p>
                        <p className="text-[11px] text-slate-800 font-medium leading-relaxed">{academics.calendar.examPeriods || 'TBD'}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Holidays</p>
                        <p className="text-[11px] text-slate-800 font-medium leading-relaxed">{academics.calendar.holidays || 'TBD'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSubTab === 'guidance' && isHighSchool && (
                <div className="space-y-8 animate-in slide-in-from-left-4">
                  <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100 flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                      <Rocket className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900">Career Guidance Hub</h4>
                      <p className="text-xs text-slate-500 font-medium">Manage scholarship alerts and university links.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    <div className="group">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Featured Scholarship</label>
                      <input 
                        className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl px-6 py-4 font-bold transition-all outline-none" 
                        placeholder="e.g., Eswatini Government Open Scholarship 2026"
                      />
                    </div>
                    <div className="group">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Partner Universities</label>
                      <textarea 
                        rows={5}
                        className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl px-6 py-4 font-medium text-sm transition-all outline-none resize-none" 
                        placeholder="- University of Eswatini (UNESWA)&#10;- Limkokwing University"
                      />
                    </div>
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
