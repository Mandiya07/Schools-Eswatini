
import React, { useState } from 'react';
import { Institution, InstitutionType } from '../../../../types';
import { Download, Rocket, Users, Trash2, Mail, Phone, Shield } from 'lucide-react';
import ProgramsEditor from './ProgramsEditor';

interface AcademicsEditorProps {
  institution: Institution;
  onUpdate: (updatedSections: Institution['sections']) => void;
}

import SectionBaseFields from './SectionBaseFields';
import { StudentProgressManager } from './StudentProgressManager';

const AcademicsEditor: React.FC<AcademicsEditorProps> = ({ institution, onUpdate }) => {
  const { academics } = institution.sections;
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'departments' | 'programs' | 'calendar' | 'performance' | 'students' | 'elearning' | 'portal' | 'faculty' | 'guidance' | 'research' | 'assessment' | 'support' | 'partnerships'>('overview');

  const isTertiary = institution.type.includes(InstitutionType.TERTIARY);
  const isPrimary = institution.type.includes(InstitutionType.PRIMARY);
  const isHighSchool = institution.type.includes(InstitutionType.HIGH_SCHOOL);

  const currentSubTabs = ['overview', 'departments', 'programs', 'calendar', 'assessment', 'performance', 'students', 'faculty', 'research', 'partnerships', 'support', 'elearning', 'portal'];

  const getTabLabel = (tab: string) => {
    switch(tab) {
      case 'departments': return isTertiary ? 'Faculties & Departments' : isPrimary ? 'Grades / Phases' : 'Departments';
      case 'programs': return isTertiary ? 'Degree Programs' : isPrimary ? 'Extracurriculars' : 'Programs';
      case 'performance': return 'Performance';
      case 'students': return 'Student Records';
      case 'elearning': return 'E-learning';
      case 'portal': return 'Student Portal';
      case 'guidance': return 'Career Guidance';
      case 'research': return 'Research Focus';
      case 'partnerships': return 'Collaborations';
      case 'support': return 'Academic Support';
      case 'assessment': return 'Assessment & Grading';
      case 'faculty': return 'Staff & Faculty';
      default: return tab.charAt(0).toUpperCase() + tab.slice(1);
    }
  };

  const updateField = (field: string, value: any) => {
    onUpdate({
      ...institution.sections,
      academics: {
        ...academics,
        [field]: value,
        lastUpdated: new Date().toISOString()
      }
    });
  };

  return (
    <div className="space-y-12">
      <SectionBaseFields 
        section={academics} 
        onUpdate={updateField} 
        label="Academics" 
      />

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
            <div className="space-y-12 animate-in slide-in-from-left-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Academic Headline</label>
                  <input 
                    className="w-full bg-slate-100 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 font-bold transition-all outline-none" 
                    value={(academics?.overview?.headline || '')} 
                    onChange={e => updateField('overview', { ...academics.overview, headline: e.target.value })} 
                  />
                </div>
                <div className="group">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Leadership / Dean / Principal Name</label>
                  <input 
                    className="w-full bg-slate-100 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 font-bold transition-all outline-none" 
                    value={academics.staff.head.name || ''} 
                    onChange={e => updateField('staff', { ...academics.staff, head: { ...academics.staff.head, name: e.target.value } })} 
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Academic Introduction</label>
                <textarea 
                  rows={4} 
                  className="w-full bg-slate-100 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 font-medium transition-all outline-none resize-none" 
                  value={(academics?.overview?.introduction || '')} 
                  onChange={e => updateField('overview', { ...academics.overview, introduction: e.target.value })}
                />
              </div>

              {/* Curriculum Details - NEW Section */}
              <div className="pt-10 border-t border-slate-100 space-y-8">
                <div className="flex items-center gap-4">
                   <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center font-bold italic">C</div>
                   <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Curriculum Framework</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="group">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Curriculum Structure</label>
                      <input 
                        className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 font-bold transition-all outline-none" 
                        placeholder="e.g. Traditional, Montessori, Hybrid"
                        value={academics.curriculum?.structure || ''} 
                        onChange={e => updateField('curriculum', { ...academics.curriculum, structure: e.target.value })}
                      />
                   </div>
                   <div className="group">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Primary Examination Body</label>
                      <input 
                        className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 font-bold transition-all outline-none" 
                        placeholder="e.g. ECESWA, Cambridge International"
                        value={academics.curriculum?.examinationBody || ''} 
                        onChange={e => updateField('curriculum', { ...academics.curriculum, examinationBody: e.target.value })}
                      />
                   </div>
                </div>
                <div className="group">
                   <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Curriculum Philosophy / Description</label>
                   <textarea 
                    rows={4} 
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 font-medium transition-all outline-none resize-none" 
                    placeholder="Describe how your curriculum prepares students for the future..."
                    value={academics.curriculum?.description || ''} 
                    onChange={e => updateField('curriculum', { ...academics.curriculum, description: e.target.value })}
                   />
                </div>
              </div>

              {/* Assessment & Grading removed from overview, moved to its own tab */}

              <div className="pt-10 border-t border-slate-100">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Academic Leadership Details (Head / Principal)</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="group">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Qualifications</label>
                    <input 
                      className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 font-bold transition-all outline-none" 
                      placeholder="e.g., PhD in Education, M.Ed"
                      value={academics.staff.head.qualifications || ''} 
                      onChange={e => updateField('staff', { ...academics.staff, head: { ...academics.staff.head, qualifications: e.target.value } })} 
                    />
                  </div>
                  <div className="group">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Years of Experience</label>
                    <input 
                      className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 font-bold transition-all outline-none" 
                      placeholder="e.g., 25 Years"
                      value={academics.staff.head.experience || ''} 
                      onChange={e => updateField('staff', { ...academics.staff, head: { ...academics.staff.head, experience: e.target.value } })} 
                    />
                  </div>
                </div>

                <div className="mt-8 group">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Professional Background</label>
                  <textarea 
                    rows={4} 
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 font-medium transition-all outline-none resize-none" 
                    placeholder="Briefly describe the professional journey and expertise..."
                    value={academics.staff.head.professionalBackground || ''} 
                    onChange={e => updateField('staff', { ...academics.staff, head: { ...academics.staff.head, professionalBackground: e.target.value } })}
                  />
                </div>

                <div className="mt-8 group">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Personal Message / Academic Philosophy</label>
                  <textarea 
                    rows={6} 
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 font-medium transition-all outline-none resize-none" 
                    placeholder="A personal message relating specifically to academics..."
                    value={academics.staff.head.messageFromPrincipal || ''} 
                    onChange={e => updateField('staff', { ...academics.staff, head: { ...academics.staff.head, messageFromPrincipal: e.target.value } })}
                  />
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'assessment' && (
            <div className="space-y-8 animate-in slide-in-from-left-4">
              <div className="bg-slate-50 p-10 rounded-[50px] border border-slate-100 space-y-8">
                <div className="flex items-center gap-4">
                   <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center font-bold italic">A+</div>
                   <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Assessment & Grading</h4>
                </div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Define your institution's approach to student evaluation</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="group">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Assessment Approach</label>
                      <textarea 
                        rows={5} 
                        className="w-full bg-white border-2 border-transparent focus:border-emerald-500 rounded-2xl px-6 py-4 font-medium transition-all outline-none resize-none shadow-sm" 
                        placeholder="e.g. Continuous assessment with final term examinations..."
                        value={academics.assessment?.approach || ''} 
                        onChange={e => updateField('assessment', { ...academics.assessment, approach: e.target.value })}
                      />
                   </div>
                   <div className="group">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Grading System</label>
                      <textarea 
                        rows={5} 
                        className="w-full bg-white border-2 border-transparent focus:border-emerald-500 rounded-2xl px-6 py-4 font-medium transition-all outline-none resize-none shadow-sm" 
                        placeholder="e.g. Percentage based with A-F grading scale..."
                        value={academics.assessment?.gradingSystem || ''} 
                        onChange={e => updateField('assessment', { ...academics.assessment, gradingSystem: e.target.value })}
                      />
                   </div>
                </div>
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

          {activeSubTab === 'faculty' && (
            <div className="space-y-6 animate-in slide-in-from-left-4">
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Institution Staff & Faculty</h4>
                <button 
                  onClick={() => updateField('faculty', [...(academics.faculty || []), { id: `staff-${Date.now()}`, name: 'New Staff Member', title: 'Teacher', qualifications: '', bio: '', photo: '', subjects: [], contactEmail: '', contactPhone: '' }])}
                  className="bg-blue-600 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all hover:bg-slate-900 shadow-lg"
                >
                  + Add Staff Profile
                </button>
              </div>
              <div className="space-y-6">
                {(academics.faculty || []).map((f, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-[40px] border border-slate-100 space-y-6 relative group shadow-sm hover:shadow-xl transition-all">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-3xl bg-slate-100 overflow-hidden shrink-0 border-4 border-white shadow-sm ring-1 ring-slate-100">
                          {f.photo ? (
                            <img src={f.photo} alt={f.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                              <Users className="w-8 h-8" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <input 
                            className="bg-transparent border-none font-black text-slate-900 p-0 focus:ring-0 text-2xl w-full" 
                            value={f.name}
                            onChange={e => {
                              const newFaculty = [...(academics.faculty || [])];
                              newFaculty[idx].name = e.target.value;
                              updateField('faculty', newFaculty);
                            }}
                            placeholder="Full Name"
                          />
                          <input 
                            className="bg-transparent border-none text-blue-600 font-bold p-0 focus:ring-0 text-xs uppercase tracking-widest w-full" 
                            value={f.title}
                            onChange={e => {
                              const newFaculty = [...(academics.faculty || [])];
                              newFaculty[idx].title = e.target.value;
                              updateField('faculty', newFaculty);
                            }}
                            placeholder="Role / Title (e.g. Senior Lecturer)"
                          />
                        </div>
                      </div>
                      <button 
                        onClick={() => {
                          const newFaculty = (academics.faculty || []).filter((_, i) => i !== idx);
                          updateField('faculty', newFaculty);
                        }}
                        className="p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="group">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Qualifications</label>
                        <input 
                          className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-xl px-4 py-3 text-xs font-bold transition-all outline-none" 
                          value={f.qualifications}
                          onChange={e => {
                            const newFaculty = [...(academics.faculty || [])];
                            newFaculty[idx].qualifications = e.target.value;
                            updateField('faculty', newFaculty);
                          }}
                          placeholder="e.g. B.Ed, M.Sc Mathematics"
                        />
                      </div>
                      <div className="group">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Photo URL</label>
                        <input 
                          className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-xl px-4 py-3 text-xs font-bold transition-all outline-none font-mono" 
                          value={f.photo || ''}
                          onChange={e => {
                            const newFaculty = [...(academics.faculty || [])];
                            newFaculty[idx].photo = e.target.value;
                            updateField('faculty', newFaculty);
                          }}
                          placeholder="https://images.unsplash.com/..."
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="group">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Contact Email</label>
                        <div className="relative">
                           <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                           <input 
                            className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-xl pl-12 pr-4 py-3 text-xs font-bold transition-all outline-none" 
                            value={f.contactEmail || ''}
                            onChange={e => {
                              const newFaculty = [...(academics.faculty || [])];
                              newFaculty[idx].contactEmail = e.target.value;
                              updateField('faculty', newFaculty);
                            }}
                            placeholder="staff@school.ac.sz"
                          />
                        </div>
                      </div>
                      <div className="group">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Contact Phone</label>
                        <div className="relative">
                           <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                           <input 
                            className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-xl pl-12 pr-4 py-3 text-xs font-bold transition-all outline-none" 
                            value={f.contactPhone || ''}
                            onChange={e => {
                              const newFaculty = [...(academics.faculty || [])];
                              newFaculty[idx].contactPhone = e.target.value;
                              updateField('faculty', newFaculty);
                            }}
                            placeholder="+268 7xxx xxxx"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Subjects / Areas of Expertise</label>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {(f.subjects || []).map((sub: string) => (
                          <span key={sub} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-[10px] font-black uppercase border border-blue-100 flex items-center gap-2">
                            {sub}
                            <button 
                              onClick={() => {
                                const newFaculty = [...(academics.faculty || [])];
                                newFaculty[idx].subjects = (f.subjects || []).filter((s: string) => s !== sub);
                                updateField('faculty', newFaculty);
                              }} 
                              className="hover:text-rose-500 transition-colors"
                            >
                              ✕
                            </button>
                          </span>
                        ))}
                      </div>
                      <input 
                        className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-xl px-4 py-3 text-xs font-bold outline-none"
                        placeholder="Add subject and press Enter..."
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            const val = e.currentTarget.value.trim();
                            if (val && !(f.subjects || []).includes(val)) {
                              const newFaculty = [...(academics.faculty || [])];
                              newFaculty[idx].subjects = [...(f.subjects || []), val];
                              updateField('faculty', newFaculty);
                              e.currentTarget.value = '';
                            }
                          }
                        }}
                      />
                    </div>

                    <div className="group">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Brief Bio / Academic Focus</label>
                      <textarea 
                        className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-xl px-4 py-3 text-sm font-medium transition-all outline-none resize-none" 
                        rows={3}
                        value={f.bio}
                        onChange={e => {
                          const newFaculty = [...(academics.faculty || [])];
                          newFaculty[idx].bio = e.target.value;
                          updateField('faculty', newFaculty);
                        }}
                        placeholder="Share a brief overview of professional background..."
                      />
                    </div>
                  </div>
                ))}
                {(academics.faculty || []).length === 0 && (
                  <div className="text-center py-20 bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200">
                    <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">No staff profiles added yet.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeSubTab === 'research' && (
            <div className="space-y-8 animate-in slide-in-from-left-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <header>
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Research Strategy</h4>
                    <p className="text-[10px] text-slate-500 font-bold">Define the institutional focus for academic inquiry.</p>
                  </header>
                  <textarea 
                    rows={4}
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-[32px] px-6 py-5 font-medium transition-all outline-none resize-none shadow-sm" 
                    placeholder="Describe the main research pillars..."
                    value={academics.research?.focus || ''} 
                    onChange={e => updateField('research', { ...academics.research, focus: e.target.value })} 
                  />
                </div>
                <div className="space-y-4">
                  <header>
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Research Papers & Publications</h4>
                    <p className="text-[10px] text-slate-500 font-bold">List key academic outputs.</p>
                  </header>
                  <textarea 
                    rows={4}
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-[32px] px-6 py-5 font-medium transition-all outline-none resize-none shadow-sm" 
                    placeholder="List significant publications..."
                    value={academics.research?.papers || ''} 
                    onChange={e => updateField('research', { ...academics.research, papers: e.target.value })} 
                  />
                </div>
              </div>
              <div className="bg-slate-900 p-8 rounded-[40px] shadow-xl text-white space-y-6">
                <header>
                  <h4 className="text-sm font-black text-indigo-400 uppercase tracking-widest">Global Research Partnerships</h4>
                  <p className="text-xs text-slate-400 font-medium">Link with other universities or industry bodies.</p>
                </header>
                <textarea 
                  rows={3}
                  className="w-full bg-white/5 border-2 border-transparent focus:border-indigo-500 focus:bg-white/10 rounded-[28px] px-6 py-5 font-medium transition-all outline-none resize-none" 
                  placeholder="e.g. Collaborations with UNESWA, South African Universities..."
                  value={academics.research?.partnerships || ''} 
                  onChange={e => updateField('research', { ...academics.research, partnerships: e.target.value })} 
                />
              </div>
            </div>
          )}

          {activeSubTab === 'partnerships' && (
            <div className="space-y-8 animate-in slide-in-from-left-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-4">
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Internships & Placements</h4>
                  <p className="text-[10px] text-slate-500 font-bold">Work experience opportunities for students.</p>
                  <textarea 
                    rows={4}
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-3xl px-6 py-4 text-sm font-medium outline-none resize-none"
                    placeholder="List partner companies for internships..."
                    value={academics.partnerships?.internships || ''}
                    onChange={e => updateField('partnerships', { ...academics.partnerships, internships: e.target.value })}
                  />
                </div>
                <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-4">
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Industry Collaborations</h4>
                  <p className="text-[10px] text-slate-500 font-bold">Strategic alliances with external bodies.</p>
                  <textarea 
                    rows={4}
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-3xl px-6 py-4 text-sm font-medium outline-none resize-none"
                    placeholder="Describe MoUs and joint projects..."
                    value={academics.partnerships?.collaborations || ''}
                    onChange={e => updateField('partnerships', { ...academics.partnerships, collaborations: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'support' && (
            <div className="space-y-8 animate-in slide-in-from-left-4">
              <div className="bg-blue-600 p-10 rounded-[50px] shadow-2xl text-white space-y-8">
                <div className="flex items-center gap-4">
                  <Shield  className="w-8 h-8 text-blue-200" />
                  <h4 className="text-xl font-black italic tracking-tighter uppercase">Academic Support Services</h4>
                </div>
                <div className="group">
                  <label className="block text-[10px] font-black text-blue-200 uppercase tracking-widest mb-3">General Description</label>
                  <textarea 
                    rows={4}
                    className="w-full bg-white/10 border-2 border-white/20 focus:border-white focus:bg-white/20 rounded-[32px] px-8 py-6 font-medium text-white outline-none resize-none placeholder:text-white/40"
                    placeholder="Describe your general academic support system (e.g., student wellbeing programs, accessible learning resources...)"
                    value={(academics.support?.description || '')}
                    onChange={e => updateField('support', { ...academics.support, description: e.target.value })}
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-blue-200">Available Services</p>
                      <p className="text-[8px] font-bold text-white/50 uppercase">List specific support features</p>
                    </div>
                    <button 
                      onClick={() => updateField('support', { ...academics.support, services: [...academics.support.services, ''] })}
                      className="text-[9px] font-black uppercase tracking-widest bg-white text-blue-600 px-4 py-2 rounded-xl shadow-sm hover:scale-105 transition-transform"
                    >
                      + Add Service
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {academics.support.services.map((service, i) => (
                      <div key={i} className="flex items-center gap-2 bg-white/5 rounded-xl border border-white/10 pr-2 focus-within:border-white/30 transition-colors">
                        <input 
                          className="flex-1 bg-transparent border-none text-xs font-bold text-white px-4 py-3 outline-none focus:ring-0 placeholder:text-white/30"
                          value={service}
                          placeholder="e.g. Peer Tutoring"
                          onChange={e => {
                            const newServices = [...academics.support.services];
                            newServices[i] = e.target.value;
                            updateField('support', { ...academics.support, services: newServices });
                          }}
                        />
                        <button 
                          onClick={() => {
                            const newServices = academics.support.services.filter((_, idx) => idx !== i);
                            updateField('support', { ...academics.support, services: newServices });
                          }}
                          className="p-2 text-white/40 hover:text-rose-400 hover:bg-rose-400/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    {(academics.support.services || []).length === 0 && (
                       <div className="col-span-full py-8 text-center border-2 border-dashed border-white/10 rounded-[20px]">
                          <p className="text-[10px] font-black uppercase tracking-widest text-blue-200/50">No academic support services defined</p>
                       </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'elearning' && (
            <div className="space-y-8 animate-in slide-in-from-left-4">
              <div className="bg-emerald-50 p-8 rounded-[32px] border border-emerald-100 mb-8">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white rounded-2xl shadow-sm">
                      <Rocket className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-slate-900 tracking-tight italic">E-learning System</h4>
                      <p className="text-xs text-slate-500 font-medium">Enable digital education features for students and teachers.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm border border-emerald-100">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Status:</span>
                    <button 
                      onClick={() => updateField('elearning', { ...(academics.elearning || { platform: '', onlineClassOptions: '', digitalAssignments: '', recordedLectures: '' }), enabled: !academics.elearning?.enabled })}
                      className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${academics.elearning?.enabled ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'}`}
                    >
                      {academics.elearning?.enabled ? 'Enabled' : 'Disabled'}
                    </button>
                  </div>
                </div>
              </div>

              {academics.elearning?.enabled && (
                <div className="space-y-8 animate-in fade-in">
                  <div className="group">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Learning Platform Used</label>
                    <input 
                      className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl px-6 py-4 font-bold transition-all outline-none" 
                      placeholder="e.g. Google Classroom, Moodle, Microsoft Teams"
                      value={academics.elearning.platform || ''} 
                      onChange={e => updateField('elearning', { ...academics.elearning, platform: e.target.value })} 
                    />
                  </div>
                  
                  <div className="group">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Online Class Options</label>
                    <textarea 
                      rows={4}
                      className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl px-6 py-4 font-medium transition-all outline-none resize-none" 
                      placeholder="Describe how classes are conducted online..."
                      value={academics.elearning.onlineClassOptions || ''} 
                      onChange={e => updateField('elearning', { ...academics.elearning, onlineClassOptions: e.target.value })} 
                    />
                  </div>

                  <div className="group">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Digital Assignments & Submission</label>
                    <textarea 
                      rows={4}
                      className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl px-6 py-4 font-medium transition-all outline-none resize-none" 
                      placeholder="Explain how students submit assignments digitally..."
                      value={academics.elearning.digitalAssignments || ''} 
                      onChange={e => updateField('elearning', { ...academics.elearning, digitalAssignments: e.target.value })} 
                    />
                  </div>

                  <div className="group">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Recorded Lectures & Resources</label>
                    <textarea 
                      rows={4}
                      className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl px-6 py-4 font-medium transition-all outline-none resize-none" 
                      placeholder="Detail availability of recorded content..."
                      value={academics.elearning.recordedLectures || ''} 
                      onChange={e => updateField('elearning', { ...academics.elearning, recordedLectures: e.target.value })} 
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {activeSubTab === 'portal' && (
            <div className="space-y-8 animate-in slide-in-from-left-4">
              <div className="bg-blue-50 p-8 rounded-[32px] border border-blue-100 mb-8">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white rounded-2xl shadow-sm">
                      <Rocket className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-slate-900 tracking-tight italic">Unified Student Portal</h4>
                      <p className="text-xs text-slate-500 font-medium">Link your students to their digital campus environment.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm border border-blue-100">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Status:</span>
                    <button 
                      onClick={() => updateField('studentPortal', { 
                        ...(academics.studentPortal || { url: '', features: { learningMaterials: false, assignmentSubmission: false, resultsDisplay: false } }), 
                        enabled: !academics.studentPortal?.enabled 
                      })}
                      className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${academics.studentPortal?.enabled ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}
                    >
                      {academics.studentPortal?.enabled ? 'Enabled' : 'Disabled'}
                    </button>
                  </div>
                </div>
              </div>

              {academics.studentPortal?.enabled && (
                <div className="space-y-8 animate-in fade-in">
                  <div className="group">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Portal Redirection URL</label>
                    <input 
                      className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 font-bold transition-all outline-none" 
                      placeholder="https://portal.yourinstitution.ac.sz"
                      value={academics.studentPortal.url || ''} 
                      onChange={e => updateField('studentPortal', { ...academics.studentPortal, url: e.target.value })} 
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Portal Feature Set</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                       <button 
                        onClick={() => updateField('studentPortal', { 
                          ...academics.studentPortal, 
                          features: { ...academics.studentPortal?.features, learningMaterials: !academics.studentPortal?.features.learningMaterials } 
                        })}
                        className={`p-6 rounded-3xl border-2 flex flex-col items-center gap-3 transition-all ${academics.studentPortal.features.learningMaterials ? 'bg-blue-50 border-blue-500 text-blue-900' : 'bg-white border-slate-100 text-slate-400'}`}
                       >
                          <Download className={`w-8 h-8 ${academics.studentPortal.features.learningMaterials ? 'text-blue-600' : 'text-slate-300'}`} />
                          <span className="text-[10px] font-black uppercase tracking-widest">Learning Materials</span>
                       </button>

                       <button 
                        onClick={() => updateField('studentPortal', { 
                          ...academics.studentPortal, 
                          features: { ...academics.studentPortal?.features, assignmentSubmission: !academics.studentPortal?.features.assignmentSubmission } 
                        })}
                        className={`p-6 rounded-3xl border-2 flex flex-col items-center gap-3 transition-all ${academics.studentPortal.features.assignmentSubmission ? 'bg-blue-50 border-blue-500 text-blue-900' : 'bg-white border-slate-100 text-slate-400'}`}
                       >
                          <Rocket className={`w-8 h-8 ${academics.studentPortal.features.assignmentSubmission ? 'text-blue-600' : 'text-slate-300'}`} />
                          <span className="text-[10px] font-black uppercase tracking-widest">Assignments</span>
                       </button>

                       <button 
                        onClick={() => updateField('studentPortal', { 
                          ...academics.studentPortal, 
                          features: { ...academics.studentPortal?.features, resultsDisplay: !academics.studentPortal?.features.resultsDisplay } 
                        })}
                        className={`p-6 rounded-3xl border-2 flex flex-col items-center gap-3 transition-all ${academics.studentPortal.features.resultsDisplay ? 'bg-blue-50 border-blue-500 text-blue-900' : 'bg-white border-slate-100 text-slate-400'}`}
                       >
                          <Rocket className={`w-8 h-8 ${academics.studentPortal.features.resultsDisplay ? 'text-blue-600' : 'text-slate-300'}`} />
                          <span className="text-[10px] font-black uppercase tracking-widest">Results Display</span>
                       </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeSubTab === 'programs' && (
            <ProgramsEditor 
              institution={institution}
              onUpdate={onUpdate}
            />
          )}

          {activeSubTab === 'students' && (
            <StudentProgressManager institution={institution} />
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
                <h4 className="text-2xl font-black text-slate-900 tracking-tight">{(academics?.overview?.headline || '')}</h4>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">{(academics?.overview?.introduction || '')}</p>
                
                {academics.staff.head.name && (
                  <div className="pt-6 border-t border-slate-100 space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-200">
                        <span className="text-lg font-black">{academics.staff.head.name.charAt(0)}</span>
                      </div>
                      <div>
                        <h5 className="font-black text-slate-900 leading-tight">{academics.staff.head.name}</h5>
                        <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest mt-1">Principal / Dean</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Qualifications</p>
                        <p className="text-[11px] font-bold text-slate-700 leading-tight">{academics.staff.head.qualifications || 'TBD'}</p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Experience</p>
                        <p className="text-[11px] font-bold text-slate-700 leading-tight">{academics.staff.head.experience || 'TBD'}</p>
                      </div>
                    </div>

                    {academics.staff.head.professionalBackground && (
                      <div className="space-y-1">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Background</p>
                        <p className="text-[11px] text-slate-600 font-medium leading-relaxed italic line-clamp-3">{academics.staff.head.professionalBackground}</p>
                      </div>
                    )}

                    {academics.staff.head.messageFromPrincipal && (
                      <div className="bg-blue-600 rounded-[32px] p-6 text-white shadow-xl shadow-blue-100 relative overflow-hidden group">
                        <div className="relative z-10">
                          <p className="text-[9px] font-black uppercase tracking-widest text-blue-200 mb-2">Message</p>
                          <p className="text-xs font-medium leading-relaxed line-clamp-4 italic">"{academics.staff.head.messageFromPrincipal}"</p>
                        </div>
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all"></div>
                      </div>
                    )}
                  </div>
                )}
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

              {activeSubTab === 'elearning' && academics.elearning?.enabled && (
                <div className="space-y-6 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">E-Learning Portal</p>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest">
                      Platform: {academics.elearning.platform || 'General'}
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 italic text-xs text-slate-600 leading-relaxed">
                      <p className="font-black text-slate-900 not-italic uppercase text-[10px] tracking-widest mb-2">Online Classes</p>
                      {academics.elearning.onlineClassOptions}
                    </div>
                    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 italic text-xs text-slate-600 leading-relaxed">
                      <p className="font-black text-slate-900 not-italic uppercase text-[10px] tracking-widest mb-2">Digital Assignments</p>
                      {academics.elearning.digitalAssignments}
                    </div>
                    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 italic text-xs text-slate-600 leading-relaxed">
                      <p className="font-black text-slate-900 not-italic uppercase text-[10px] tracking-widest mb-2">Recorded Content</p>
                      {academics.elearning.recordedLectures}
                    </div>
                  </div>
                </div>
              )}

              {activeSubTab === 'portal' && academics.studentPortal?.enabled && (
                <div className="space-y-6 animate-in fade-in">
                  <div className="p-8 bg-slate-900 rounded-[32px] text-white">
                    <h4 className="text-xl font-black mb-2 flex items-center gap-3">
                      <Rocket className="w-6 h-6 text-blue-400" /> Institution Portal
                    </h4>
                    <p className="text-slate-400 text-xs font-medium mb-6">Ready to redirect students to: {academics.studentPortal.url || 'Not set'}</p>
                    <div className="space-y-3">
                       {Object.entries(academics.studentPortal.features).map(([key, enabled]) => (
                         <div key={key} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">{key.replace(/([A-Z])/g, ' $1')}</span>
                            <span className={`text-[8px] font-black px-2 py-0.5 rounded ${enabled ? 'bg-blue-500 text-white' : 'bg-white/10 text-slate-500'}`}>
                              {enabled ? 'ON' : 'OFF'}
                            </span>
                         </div>
                       ))}
                    </div>
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
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSubTab === 'research' && (
                <div className="space-y-6 animate-in fade-in">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Research Strategy</p>
                   <p className="text-xs text-slate-600 font-medium italic leading-relaxed">"{academics.research?.focus || 'Our research focus spans across various academic disciplines...'}"</p>
                   {academics.research?.papers && (
                     <div className="p-5 bg-indigo-50 rounded-3xl border border-indigo-100 italic text-[11px] text-indigo-900 leading-relaxed">
                       <span className="font-black uppercase tracking-widest text-[9px] block mb-2">Publications</span>
                       {academics.research.papers}
                     </div>
                   )}
                </div>
              )}

              {activeSubTab === 'partnerships' && (
                <div className="space-y-6 animate-in fade-in">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Institutional Partnerships</p>
                   <div className="grid grid-cols-1 gap-4">
                      {academics.partnerships?.internships && (
                        <div className="p-6 bg-slate-900 rounded-[32px] text-white">
                           <span className="text-[9px] font-black uppercase text-indigo-400 block mb-2">Student Internships</span>
                           <p className="text-xs font-medium text-slate-300 leading-relaxed">{academics.partnerships.internships}</p>
                        </div>
                      )}
                      {academics.partnerships?.collaborations && (
                        <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                           <span className="text-[9px] font-black uppercase text-blue-600 block mb-2">Collaborations</span>
                           <p className="text-xs font-medium text-slate-600 leading-relaxed">{academics.partnerships.collaborations}</p>
                        </div>
                      )}
                   </div>
                </div>
              )}

              {activeSubTab === 'support' && (
                <div className="space-y-6 animate-in fade-in">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Student Support Services</p>
                   <p className="text-xs text-slate-600 font-medium leading-relaxed italic">"{(academics.support?.description || '') || 'Comprehensive support provided to all students...'}"</p>
                   <div className="flex flex-wrap gap-2 pt-2">
                      {academics.support.services.map((s, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-600 text-white rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg shadow-blue-200">
                          ✓ {s}
                        </span>
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
    </div>
  );
};

export default AcademicsEditor;
