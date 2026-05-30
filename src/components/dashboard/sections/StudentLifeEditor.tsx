
import React from 'react';
import { Institution } from '../../../../types';
import { Trash2, Users, Trophy } from 'lucide-react';

interface StudentLifeEditorProps {
  institution: Institution;
  onUpdate: (updatedSections: Institution['sections']) => void;
}

import SectionBaseFields from './SectionBaseFields';

const StudentLifeEditor: React.FC<StudentLifeEditorProps> = ({ institution, onUpdate }) => {
  const { studentLife } = institution.sections;

  const updateField = (field: string, value: any) => {
    onUpdate({
      ...institution.sections,
      studentLife: {
        ...studentLife,
        [field]: value,
        lastUpdated: new Date().toISOString()
      }
    });
  };

  const addClub = () => {
    const newClub = { 
      id: Date.now(), 
      name: 'New Club', 
      focus: '', 
      description: '', 
      icon: '🌟', 
      category: 'Academic' 
    };
    updateField('clubs', [...(studentLife.clubs || []), newClub]);
  };

  const addSport = () => {
    const newList = [...(studentLife.sports?.list || []), 'New Sport'];
    updateField('sports', { ...studentLife.sports, list: newList });
  };

  const addTestimonial = () => {
    const newTestimonial = { name: 'Student Name', grade: 'Grade 12', text: 'My experience here...' };
    updateField('testimonials', [...(studentLife.testimonials || []), newTestimonial]);
  };

  return (
    <div className="space-y-12">
      <SectionBaseFields 
        section={studentLife} 
        onUpdate={updateField} 
        label="Student Life" 
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-in fade-in slide-in-from-right-4">
        <div className="space-y-10 pb-24">
          <header>
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Student Life Experience</h3>
            <p className="text-sm text-slate-500 font-medium">Define the vibrant culture that makes your institution unique</p>
          </header>

          <div className="space-y-12">
            {/* Overview */}
            <div className="space-y-6">
              <div className="group">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Section Headline</label>
                <input 
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 font-bold transition-all outline-none" 
                  value={studentLife.overview.headline} 
                  onChange={e => updateField('overview', { ...studentLife.overview, headline: e.target.value })} 
                />
              </div>
              <div className="group">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Introduction</label>
                <textarea 
                  rows={3} 
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 font-medium transition-all outline-none resize-none" 
                  value={studentLife.overview.introduction} 
                  onChange={e => updateField('overview', { ...studentLife.overview, introduction: e.target.value })}
                />
              </div>
            </div>

            {/* Sports & Athletics */}
            <div className="p-8 bg-emerald-50/50 rounded-[40px] border border-emerald-100/50 space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">🏆 Sports & Athletics</h4>
                <button 
                  onClick={addSport}
                  className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:underline"
                >
                  + Add Sport
                </button>
              </div>
              <div className="space-y-4">
                <textarea 
                  placeholder="Overview of sports programs..."
                  className="w-full bg-white border-none rounded-2xl px-4 py-3 text-xs font-medium"
                  value={studentLife.sports?.description || ''}
                  onChange={e => updateField('sports', { ...studentLife.sports, description: e.target.value })}
                />
                <div className="flex flex-wrap gap-2">
                  {studentLife.sports.list.map((sport, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-emerald-100 text-[10px] font-bold text-emerald-700">
                      <input 
                        className="bg-transparent border-none p-0 focus:ring-0 min-w-[60px]"
                        value={sport}
                        onChange={e => {
                          const newList = [...studentLife.sports.list];
                          newList[idx] = e.target.value;
                          updateField('sports', { ...studentLife.sports, list: newList });
                        }}
                      />
                      <button onClick={() => updateField('sports', { ...studentLife.sports, list: studentLife.sports.list.filter((_, i) => i !== idx) })} className="opacity-40 hover:opacity-100">✕</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Clubs & Societies */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Clubs & Societies</h4>
                <button 
                  onClick={addClub}
                  className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline"
                >
                  + Add Club
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {studentLife.clubs.map((club, idx) => (
                  <div key={club.id || idx} className="bg-slate-50 p-6 rounded-[32px] border border-slate-100 space-y-4 group">
                    <div className="flex justify-between items-center">
                      <div className="flex-1 flex gap-3">
                        <input 
                          className="w-10 bg-white border rounded-xl text-center text-lg"
                          value={club.icon}
                          onChange={e => {
                            const newClubs = [...studentLife.clubs];
                            newClubs[idx].icon = e.target.value;
                            updateField('clubs', newClubs);
                          }}
                        />
                        <input 
                          className="bg-transparent border-none font-black text-slate-900 focus:ring-0" 
                          value={club.name} 
                          placeholder="Club Name"
                          onChange={e => {
                            const newClubs = [...studentLife.clubs];
                            newClubs[idx].name = e.target.value;
                            updateField('clubs', newClubs);
                          }}
                        />
                      </div>
                      <button 
                        onClick={() => updateField('clubs', studentLife.clubs.filter((_, i) => i !== idx))}
                        className="text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <textarea 
                      className="w-full bg-white border-none rounded-2xl px-4 py-3 text-[11px] font-medium"
                      placeholder="Goal or focus of this club..."
                      value={club.focus || club.description}
                      onChange={e => {
                        const newClubs = [...studentLife.clubs];
                        newClubs[idx].focus = e.target.value;
                        newClubs[idx].description = e.target.value;
                        updateField('clubs', newClubs);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Accommodation */}
            <div className="p-8 bg-blue-50/50 rounded-[40px] border border-blue-100/50 space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest">🏠 Accommodation & Boarding</h4>
              </div>
              <div className="flex items-center gap-4 bg-white/60 p-4 rounded-2xl border border-blue-100">
                <div className="flex-1">
                  <p className="text-[10px] font-black text-blue-900 uppercase tracking-widest">Boarding Facilities Available</p>
                </div>
                <button 
                  onClick={() => updateField('accommodation', { ...(studentLife.accommodation || {}), available: !studentLife.accommodation?.available })}
                  className={`w-12 h-6 rounded-full transition-all relative ${studentLife.accommodation?.available ? 'bg-blue-600' : 'bg-slate-300'}`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${studentLife.accommodation?.available ? 'right-0.5 shadow-sm' : 'left-0.5'}`} />
                </button>
              </div>
              {studentLife.accommodation?.available && (
                <textarea 
                  placeholder="Describe the boarding facilities, supervision, and environment..."
                  className="w-full bg-white border-none rounded-2xl px-4 py-3 text-xs font-medium"
                  value={(studentLife.accommodation?.description || '') || ''}
                  onChange={e => updateField('accommodation', { ...studentLife.accommodation, description: e.target.value })}
                />
              )}
            </div>

            {/* Facilities */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Campus Facilities</h4>
                <button 
                  onClick={() => updateField('facilities', [...(studentLife.facilities || []), { name: 'New Facility', category: 'Academic', description: '', photo: '' }])}
                  className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline"
                >
                  + Add Facility
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {(studentLife.facilities || []).map((fac: any, idx: number) => (
                  <div key={idx} className="bg-white p-6 rounded-[32px] border border-slate-100 space-y-4 group">
                    <div className="flex justify-between items-center">
                      <input 
                        className="bg-transparent border-none font-black text-slate-900 p-0 text-sm focus:ring-0 flex-1" 
                        value={fac.name} 
                        onChange={e => {
                          const nf = [...studentLife.facilities];
                          nf[idx].name = e.target.value;
                          updateField('facilities', nf);
                        }}
                        placeholder="Facility Name"
                      />
                      <button onClick={() => updateField('facilities', studentLife.facilities.filter((_: any, i: number) => i !== idx))} className="text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <input 
                         className="bg-slate-50 border-none rounded-xl px-4 py-2 text-[10px] font-bold" 
                         value={fac.category} 
                         onChange={e => {
                           const nf = [...studentLife.facilities];
                           nf[idx].category = e.target.value;
                           updateField('facilities', nf);
                         }}
                         placeholder="Category"
                       />
                       <input 
                         className="bg-slate-50 border-none rounded-xl px-4 py-2 text-[10px] font-bold" 
                         value={fac.photo || ''} 
                         onChange={e => {
                           const nf = [...studentLife.facilities];
                           nf[idx].photo = e.target.value;
                           updateField('facilities', nf);
                         }}
                         placeholder="Photo URL"
                       />
                    </div>
                    <textarea 
                      className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-[11px] font-medium"
                      placeholder="Description..."
                      value={fac.description}
                      onChange={e => {
                        const nf = [...studentLife.facilities];
                        nf[idx].description = e.target.value;
                        updateField('facilities', nf);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Support Services & Student Council */}
            <div className="space-y-8">
               <div className="p-8 bg-blue-900 rounded-[40px] text-white space-y-6 shadow-2xl">
                  <header>
                    <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Student Support Services</h4>
                    <p className="text-xs text-slate-400 font-medium">Define counselling, career guidance, and wellness services.</p>
                  </header>
                  <div className="space-y-4">
                     {(studentLife.supportServices || []).map((s: any, idx: number) => (
                       <div key={idx} className="bg-white/10 rounded-2xl p-4 border border-white/10 group">
                          <div className="flex justify-between items-center mb-2">
                             <input className="bg-transparent border-none p-0 text-xs font-black text-white focus:ring-0 w-full" value={s.name} onChange={e => {
                               const ns = [...studentLife.supportServices];
                               ns[idx].name = e.target.value;
                               updateField('supportServices', ns);
                             }} />
                             <button onClick={() => updateField('supportServices', studentLife.supportServices.filter((_: any, i: number) => i !== idx))} className="text-white/40 hover:text-white">✕</button>
                          </div>
                          <textarea className="w-full bg-white/5 border-none rounded-xl p-3 text-[10px] text-white/70" rows={2} value={s.description} onChange={e => {
                            const ns = [...studentLife.supportServices];
                            ns[idx].description = e.target.value;
                            updateField('supportServices', ns);
                          }} />
                       </div>
                     ))}
                     <button 
                       onClick={() => updateField('supportServices', [...(studentLife.supportServices || []), { name: 'Support Service', description: '' }])}
                       className="w-full py-3 border-2 border-dashed border-white/20 rounded-2xl text-[10px] font-black text-blue-300 uppercase tracking-widest"
                     >
                       + Add Support Service
                     </button>
                  </div>
               </div>

               <div className="p-8 bg-white rounded-[40px] border border-slate-200 space-y-6 shadow-sm">
                  <header>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Student Council / Government</h4>
                    <p className="text-xs text-slate-500 font-medium">Describe the student governance structure.</p>
                  </header>
                  <div className="space-y-4">
                    <input 
                      placeholder="e.g. Student Representative Council (SRC)"
                      className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-slate-900" 
                      value={studentLife.studentCouncil?.name || ''}
                      onChange={e => updateField('studentCouncil', { ...studentLife.studentCouncil, name: e.target.value })}
                    />
                    <textarea 
                      placeholder="Roles, responsibilities, and influence of the council..."
                      className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 text-xs font-medium"
                      rows={4}
                      value={studentLife.studentCouncil?.description || ''}
                      onChange={e => updateField('studentCouncil', { ...studentLife.studentCouncil, description: e.target.value })}
                    />
                  </div>
               </div>
            </div>

            {/* Arts & leadership */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">🎭 Arts & Culture</label>
                <textarea 
                  className="w-full bg-slate-50 border-none rounded-2xl p-4 text-xs font-medium"
                  placeholder="Musical, theater, and arts activities..."
                  value={studentLife.arts?.description || ''}
                  onChange={e => updateField('arts', { ...studentLife.arts, description: e.target.value })}
                />
              </div>
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">🌟 Leadership & Development</label>
                <textarea 
                  className="w-full bg-slate-50 border-none rounded-2xl p-4 text-xs font-medium"
                  placeholder="Prefect roles, student council, leadership training..."
                  value={studentLife.leadership?.roles || ''}
                  onChange={e => updateField('leadership', { ...studentLife.leadership, roles: e.target.value })}
                />
              </div>
            </div>

            {/* Testimonials */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Voices of the Campus</h4>
                <button 
                  onClick={addTestimonial}
                  className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline"
                >
                  + Add Testimonial
                </button>
              </div>
              <div className="space-y-4">
                {(studentLife.testimonials || []).map((t, idx) => (
                  <div key={idx} className="p-6 bg-white rounded-[32px] border border-slate-100 shadow-sm space-y-4">
                    <div className="flex justify-between gap-4">
                      <div className="flex-1 grid grid-cols-2 gap-4">
                        <input 
                          className="bg-slate-50 border-none rounded-xl px-4 py-2 text-[10px] font-black uppercase text-slate-900" 
                          placeholder="Name" 
                          value={t.name}
                          onChange={e => {
                            const nt = [...studentLife.testimonials];
                            nt[idx].name = e.target.value;
                            updateField('testimonials', nt);
                          }}
                        />
                        <input 
                          className="bg-slate-50 border-none rounded-xl px-4 py-2 text-[10px] font-bold text-slate-500" 
                          placeholder="Grade/Role" 
                          value={t.grade}
                          onChange={e => {
                            const nt = [...studentLife.testimonials];
                            nt[idx].grade = e.target.value;
                            updateField('testimonials', nt);
                          }}
                        />
                      </div>
                      <button onClick={() => updateField('testimonials', studentLife.testimonials.filter((_, i) => i !== idx))} className="text-rose-500">✕</button>
                    </div>
                    <textarea 
                      className="w-full bg-slate-50 border-none rounded-2xl p-4 text-xs font-medium italic"
                      placeholder="What does a student say about life here?"
                      value={t.text}
                      onChange={e => {
                        const nt = [...studentLife.testimonials];
                        nt[idx].text = e.target.value;
                        updateField('testimonials', nt);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-8">
        <header>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Student Life Preview</h3>
        </header>

        <div className="sticky top-8 space-y-6">
          <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
            <div className="space-y-4">
              <h4 className="text-2xl font-black text-slate-900 tracking-tight">{studentLife.overview.headline}</h4>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">{studentLife.overview.introduction}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {studentLife.clubs.slice(0, 4).map((club: any) => (
                <div key={club.id} className="p-6 bg-slate-50 rounded-3xl flex flex-col items-center text-center gap-3 group hover:bg-blue-50 transition-colors cursor-pointer">
                  <span className="text-3xl group-hover:scale-125 transition-transform duration-500">{club.icon}</span>
                  <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{club.name}</p>
                </div>
              ))}
            </div>
            
            <div className="space-y-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Campus Facilities</p>
              {studentLife.facilities.slice(0, 3).map((fac: any, idx: number) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-2xl">
                  <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{fac.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLifeEditor;
