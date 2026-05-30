
import React from 'react';
import { Institution } from '../../../../types';

interface AboutEditorProps {
  institution: Institution;
  onUpdate: (updatedSections: Institution['sections']) => void;
}

import SectionBaseFields from './SectionBaseFields';

const AboutEditor: React.FC<AboutEditorProps> = ({ institution, onUpdate }) => {
  const { about } = institution.sections;

  const updateField = (field: string, value: any) => {
    onUpdate({
      ...institution.sections,
      about: {
        ...about,
        [field]: value,
        lastUpdated: new Date().toISOString()
      }
    });
  };

  const updateSubField = (parent: string, field: string, value: any) => {
    updateField(parent, {
      ...(about as any)[parent],
      [field]: value
    });
  };

  return (
    <div className="space-y-12">
      <SectionBaseFields 
        section={about} 
        onUpdate={updateField} 
        label="About US" 
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-in fade-in slide-in-from-right-4">
        {/* The rest of the original AboutEditor UI */}
      <div className="space-y-10">
        <header>
          <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">About Module Editor</h3>
          <p className="text-sm text-slate-500 font-medium">Define your institution's identity, mission, and history</p>
        </header>

        <div className="space-y-12">
          {/* Institutional Overview */}
          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold">01</div>
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Institutional Overview</h4>
            </div>
            <textarea 
              rows={4} 
              className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 font-medium transition-all outline-none resize-none" 
              value={typeof about.overview === 'object' && about.overview !== null ? (about.overview as any).description || (about.overview as any).title || '' : about.overview || ''} 
              onChange={e => updateField('overview', e.target.value)}
              placeholder="Tell the world about your institution..."
            />
          </div>

          {/* Founding Background */}
          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center font-bold">02</div>
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Founding Background</h4>
            </div>
            <textarea 
              rows={4} 
              className="w-full bg-slate-50 border-2 border-transparent focus:border-amber-500 focus:bg-white rounded-2xl px-6 py-4 font-medium transition-all outline-none resize-none" 
              value={about.foundingBackground || ''} 
              onChange={e => updateField('foundingBackground', e.target.value)}
              placeholder="How did the institution start? Share your origin story..."
            />
          </div>

          {/* Strategic Narrative (Vision & Mission) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 p-8 rounded-[40px] border border-blue-100 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white text-blue-600 rounded-xl flex items-center justify-center font-bold shadow-sm">03</div>
                <h4 className="text-sm font-black text-blue-900 uppercase tracking-widest">Mission</h4>
              </div>
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-blue-800 uppercase tracking-widest">Mission Statement</label>
                <textarea 
                  rows={3} 
                  className="w-full bg-white border-2 border-transparent focus:border-blue-500 rounded-2xl px-5 py-3 font-bold text-blue-900 text-sm outline-none transition-all resize-none" 
                  value={about.mission.statement} 
                  onChange={e => updateSubField('mission', 'statement', e.target.value)} 
                  placeholder="What is your primary purpose?"
                />
                <label className="block text-[10px] font-black text-blue-800 uppercase tracking-widest">Detailed Description</label>
                <textarea 
                  rows={3} 
                  className="w-full bg-white border-2 border-transparent focus:border-blue-500 rounded-2xl px-5 py-3 font-medium text-blue-900 text-sm outline-none transition-all resize-none" 
                  value={about.mission?.description || ''} 
                  onChange={e => updateSubField('mission', 'description', e.target.value)} 
                  placeholder="Expand on how you achieve your mission..."
                />
              </div>
            </div>

            <div className="bg-emerald-50 p-8 rounded-[40px] border border-emerald-100 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white text-emerald-600 rounded-xl flex items-center justify-center font-bold shadow-sm">04</div>
                <h4 className="text-sm font-black text-emerald-900 uppercase tracking-widest">Vision</h4>
              </div>
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-emerald-800 uppercase tracking-widest">Vision Headline</label>
                <input 
                  className="w-full bg-white border-2 border-transparent focus:border-emerald-500 rounded-2xl px-5 py-3 font-bold text-emerald-900 text-sm outline-none transition-all" 
                  value={about.vision.headline} 
                  onChange={e => updateSubField('vision', 'headline', e.target.value)} 
                  placeholder="Your future aspiration..."
                />
                <label className="block text-[10px] font-black text-emerald-800 uppercase tracking-widest">Vision Supporting Paragraph</label>
                <textarea 
                  rows={3} 
                  className="w-full bg-white border-2 border-transparent focus:border-emerald-500 rounded-2xl px-5 py-3 font-medium text-emerald-900 text-sm outline-none transition-all resize-none" 
                  value={about.vision.supportingParagraph || ''} 
                  onChange={e => updateSubField('vision', 'supportingParagraph', e.target.value)} 
                  placeholder="A concise vision statement..."
                />
                <label className="block text-[10px] font-black text-emerald-800 uppercase tracking-widest">National Alignment</label>
                <input 
                  className="w-full bg-white border-2 border-transparent focus:border-emerald-500 rounded-2xl px-5 py-3 font-medium text-emerald-900 text-sm outline-none transition-all" 
                  value={about.vision.nationalAlignment || ''} 
                  onChange={e => updateSubField('vision', 'nationalAlignment', e.target.value)} 
                  placeholder="e.g. Aligned with His Majesty's Vision 2022..."
                />
                <label className="block text-[10px] font-black text-emerald-800 uppercase tracking-widest">Vision Explanation</label>
                <textarea 
                  rows={3} 
                  className="w-full bg-white border-2 border-transparent focus:border-emerald-500 rounded-2xl px-5 py-3 font-medium text-emerald-900 text-sm outline-none transition-all resize-none" 
                  value={about.vision.explanation || ''} 
                  onChange={e => updateSubField('vision', 'explanation', e.target.value)} 
                  placeholder="Explain the deeper meaning of your vision..."
                />
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-8 rounded-[40px] border border-blue-100 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white text-blue-600 rounded-xl flex items-center justify-center font-bold shadow-sm">05</div>
                <h4 className="text-sm font-black text-blue-900 uppercase tracking-widest">Mission Pillars & Objectives</h4>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => updateSubField('mission', 'pillars', [...(about.mission.pillars || []), { title: '', description: '' }])}
                  className="px-3 py-1 bg-white text-blue-600 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-sm"
                >
                  + Add Pillar
                </button>
                <button 
                  onClick={() => updateSubField('mission', 'objectives', [...(about.mission.objectives || []), ''])}
                  className="px-3 py-1 bg-white text-blue-600 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-sm"
                >
                  + Add Objective
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-blue-800 uppercase tracking-widest">Core Pillars</label>
                <div className="space-y-3">
                  {(about.mission.pillars || []).map((p, i) => (
                    <div key={i} className="p-4 bg-white rounded-2xl border border-blue-100 space-y-2 relative group">
                      <button 
                        onClick={() => updateSubField('mission', 'pillars', about.mission.pillars?.filter((_, idx) => idx !== i))}
                        className="absolute top-2 right-2 text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ✕
                      </button>
                      <input 
                        className="w-full bg-slate-50 border-none rounded-lg px-3 py-1.5 text-xs font-bold text-blue-900 focus:ring-1 focus:ring-blue-500 outline-none"
                        value={p.title}
                        onChange={e => {
                          const newPillars = [...(about.mission.pillars || [])];
                          newPillars[i].title = e.target.value;
                          updateSubField('mission', 'pillars', newPillars);
                        }}
                        placeholder="Pillar Title (e.g. Excellence)"
                      />
                      <textarea 
                        className="w-full bg-slate-50 border-none rounded-lg px-3 py-1.5 text-[10px] font-medium text-blue-700 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                        value={p.description}
                        onChange={e => {
                          const newPillars = [...(about.mission.pillars || [])];
                          newPillars[i].description = e.target.value;
                          updateSubField('mission', 'pillars', newPillars);
                        }}
                        placeholder="Brief description..."
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-blue-800 uppercase tracking-widest">Strategic Objectives</label>
                <div className="space-y-2">
                  {(about.mission.objectives || []).map((obj, i) => (
                    <div key={i} className="flex gap-2">
                      <input 
                        className="flex-1 bg-white border border-blue-100 rounded-xl px-4 py-2 text-xs font-medium text-blue-900 outline-none focus:ring-1 focus:ring-blue-500"
                        value={obj}
                        onChange={e => {
                          const newObjs = [...(about.mission.objectives || [])];
                          newObjs[i] = e.target.value;
                          updateSubField('mission', 'objectives', newObjs);
                        }}
                        placeholder="e.g. Enhance STEM facilities by 20%"
                      />
                      <button onClick={() => updateSubField('mission', 'objectives', about.mission.objectives?.filter((_, idx) => idx !== i))} className="text-rose-500">✕</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Principal's Message - NEW/REFINED Section */}
          <div className="bg-slate-900 p-8 rounded-[40px] shadow-xl space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-bold">06</div>
              <h4 className="text-sm font-black text-white uppercase tracking-widest">Principal's Formal Message</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-indigo-400 uppercase tracking-widest">Message Title</label>
                <input 
                  className="w-full bg-slate-800 border-2 border-transparent focus:border-indigo-500 rounded-2xl px-5 py-3 font-bold text-white text-sm outline-none transition-all" 
                  value={about.leadership.messageFromPrincipal?.title || ''} 
                  onChange={e => updateSubField('leadership', 'messageFromPrincipal', { ...about.leadership.messageFromPrincipal, title: e.target.value })} 
                  placeholder="e.g. Welcome to our 2026 Academic Year"
                />
                <label className="block text-[10px] font-black text-indigo-400 uppercase tracking-widest">Main Message Content</label>
                <textarea 
                  rows={8} 
                  className="w-full bg-slate-800 border-2 border-transparent focus:border-indigo-500 rounded-2xl px-5 py-3 font-medium text-slate-300 text-sm outline-none transition-all resize-none" 
                  value={about.leadership.messageFromPrincipal?.content || ''} 
                  onChange={e => updateSubField('leadership', 'messageFromPrincipal', { ...about.leadership.messageFromPrincipal, content: e.target.value })} 
                  placeholder="Write the full message from the head of institution..."
                />
              </div>
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-indigo-400 uppercase tracking-widest">Vision for the Year</label>
                <textarea 
                  rows={4} 
                  className="w-full bg-slate-800 border-2 border-transparent focus:border-indigo-500 rounded-2xl px-5 py-3 font-medium text-slate-300 text-sm outline-none transition-all resize-none" 
                  value={about.leadership.messageFromPrincipal?.visionForYear || ''} 
                  onChange={e => updateSubField('leadership', 'messageFromPrincipal', { ...about.leadership.messageFromPrincipal, visionForYear: e.target.value })} 
                  placeholder="What is the key goal for this session?"
                />
                <label className="block text-[10px] font-black text-indigo-400 uppercase tracking-widest">Commitment to Students</label>
                <textarea 
                  rows={4} 
                  className="w-full bg-slate-800 border-2 border-transparent focus:border-indigo-500 rounded-2xl px-5 py-3 font-medium text-slate-300 text-sm outline-none transition-all resize-none" 
                  value={about.leadership.messageFromPrincipal?.commitmentToStudents || ''} 
                  onChange={e => updateSubField('leadership', 'messageFromPrincipal', { ...about.leadership.messageFromPrincipal, commitmentToStudents: e.target.value })} 
                  placeholder="Reassurance of support and student focus..."
                />
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-fuchsia-50 text-fuchsia-600 rounded-xl flex items-center justify-center font-bold">07</div>
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Core Values Management</h4>
              </div>
              <button 
                className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                onClick={() => updateField('coreValues', [...about.coreValues, { title: '', name: '', description: '' }])}
              >
                + Add Value
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {about.coreValues.map((val, idx) => (
                <div key={idx} className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 group relative">
                  <button 
                    className="absolute top-4 right-4 text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => {
                      const newValues = about.coreValues.filter((_, i) => i !== idx);
                      updateField('coreValues', newValues);
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                      <label className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2">Value Title / Name</label>
                      <input 
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                        value={val.name || (val as any).title} 
                        onChange={e => {
                          const newValues = [...about.coreValues];
                          newValues[idx].name = e.target.value;
                          updateField('coreValues', newValues);
                        }} 
                        placeholder="e.g. Integrity" 
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2">Detailed Description</label>
                      <input 
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 font-medium text-slate-600 outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                        value={val.description} 
                        onChange={e => {
                          const newValues = [...about.coreValues];
                          newValues[idx].description = e.target.value;
                          updateField('coreValues', newValues);
                        }} 
                        placeholder="How is this value practiced?" 
                      />
                    </div>
                  </div>
                </div>
              ))}
              {about.coreValues.length === 0 && (
                <div className="py-12 text-center bg-slate-50 rounded-[32px] border border-dashed border-slate-200">
                  <p className="text-sm font-bold text-slate-400">No core values defined yet.</p>
                </div>
              )}
            </div>
          </div>

          {/* Accreditation & Compliance - NEW Section */}
          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center font-bold">08</div>
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Accreditation & Quality Assurance</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Authorized By / Registered With</label>
                <input 
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-amber-500 rounded-2xl px-5 py-3 font-bold text-slate-900 text-sm outline-none transition-all" 
                  value={about.accreditation?.registeredWith || ''} 
                  onChange={e => updateSubField('accreditation', 'registeredWith', e.target.value)} 
                  placeholder="e.g. Ministry of Education & Training"
                />
              </div>
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Registration / License Number</label>
                <input 
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-amber-500 rounded-2xl px-5 py-3 font-bold text-slate-900 text-sm outline-none transition-all" 
                  value={about.accreditation?.registrationNumber || ''} 
                  onChange={e => updateSubField('accreditation', 'registrationNumber', e.target.value)} 
                  placeholder="e.g. MOE/REG/2026/S-88"
                />
              </div>
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Primary Examination Body</label>
                <input 
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-amber-500 rounded-2xl px-5 py-3 font-bold text-slate-900 text-sm outline-none transition-all" 
                  value={about.accreditation?.examinationBody || ''} 
                  onChange={e => updateSubField('accreditation', 'examinationBody', e.target.value)} 
                  placeholder="e.g. ECESWA, Cambridge"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Affiliations</label>
                  <button 
                    onClick={() => updateSubField('accreditation', 'affiliations', [...(about.accreditation?.affiliations || []), ''])}
                    className="text-[9px] font-black text-blue-600 uppercase tracking-widest"
                  >
                    + Add
                  </button>
                </div>
                <div className="space-y-2">
                  {(about.accreditation?.affiliations || []).map((aff, i) => (
                    <div key={i} className="flex gap-2">
                      <input 
                        className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-xs font-bold" 
                        value={aff}
                        onChange={e => {
                          const newAffs = [...(about.accreditation?.affiliations || [])];
                          newAffs[i] = e.target.value;
                          updateSubField('accreditation', 'affiliations', newAffs);
                        }}
                      />
                      <button onClick={() => updateSubField('accreditation', 'affiliations', about.accreditation.affiliations.filter((_, idx) => idx !== i))} className="text-rose-500">✕</button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Certifications & Awards</label>
                  <button 
                    onClick={() => updateSubField('accreditation', 'awards', [...(about.accreditation?.awards || []), ''])}
                    className="text-[9px] font-black text-blue-600 uppercase tracking-widest"
                  >
                    + Add
                  </button>
                </div>
                <div className="space-y-2">
                  {(about.accreditation?.awards || []).map((awd, i) => (
                    <div key={i} className="flex gap-2">
                      <input 
                        className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-xs font-bold" 
                        value={awd}
                        onChange={e => {
                          const newAwds = [...(about.accreditation?.awards || [])];
                          newAwds[i] = e.target.value;
                          updateSubField('accreditation', 'awards', newAwds);
                        }}
                      />
                      <button onClick={() => updateSubField('accreditation', 'awards', about.accreditation.awards.filter((_, idx) => idx !== i))} className="text-rose-500">✕</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Simulated Document Uploads for Accreditation */}
            <div className="pt-8 border-t border-slate-100 space-y-6">
              <h5 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Accreditation Document Repositories</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 bg-slate-50 rounded-[32px] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center group hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                  </div>
                  <p className="text-sm font-black text-slate-900 uppercase tracking-tight">Upload Registration Certificate</p>
                  <p className="text-[10px] text-slate-400 font-bold mt-1">PDF, JPG or PNG (Max 5MB)</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-[32px] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center group hover:border-emerald-400 hover:bg-emerald-50 transition-all cursor-pointer">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                  </div>
                  <p className="text-sm font-black text-slate-900 uppercase tracking-tight">Upload Compliance Audit</p>
                  <p className="text-[10px] text-slate-400 font-bold mt-1">Proof of latest inspection</p>
                </div>
              </div>
              <div className="space-y-3">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Accreditation Documents</label>
                {(about.downloads || []).filter(d => d.label.toLowerCase().includes('accreditation') || d.label.toLowerCase().includes('certificate')).map((doc, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold italic">PDF</div>
                      <div>
                        <p className="text-xs font-black text-slate-900">{doc.label}</p>
                        <p className="text-[9px] text-slate-400 font-medium">{doc.url}</p>
                      </div>
                    </div>
                    <button onClick={() => updateField('downloads', about.downloads.filter((_, idx) => idx !== about.downloads.indexOf(doc)))} className="text-rose-500 text-xs font-black uppercase tracking-widest">Remove</button>
                  </div>
                ))}
                <div className="flex gap-4">
                   <button 
                    onClick={() => updateField('downloads', [...(about.downloads || []), { label: 'Registration Certificate 2026.pdf', url: '/simulated/docs/cert-2026.pdf' }])}
                    className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline"
                   >
                     + Add Download Asset
                   </button>
                </div>
              </div>
            </div>
          </div>

          {/* Executive Leadership */}
          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold">09</div>
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Executive Leadership</h4>
              </div>
              <div className="flex gap-2">
                <button 
                  className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all shadow-sm"
                  onClick={() => updateField('leadership', {
                    ...about.leadership,
                    boardMembers: [...(about.leadership.boardMembers || []), { name: '', title: '', description: '', photo: '' }]
                  })}
                >
                  + Add Board Member
                </button>
                <button 
                  className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                  onClick={() => updateField('leadership', {
                    ...about.leadership,
                    seniorTeam: [...about.leadership.seniorTeam, { name: '', title: '', description: '', photo: '' }]
                  })}
                >
                  + Add SMT Leader
                </button>
              </div>
            </div>
            
            {/* Principal / Headmaster */}
            <div className="p-8 bg-slate-900 rounded-[40px] text-white space-y-6">
              <h5 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Principal / Head of Institution</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2">Name</label>
                  <input 
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm font-bold text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                    value={about.leadership.principal.name} 
                    onChange={e => {
                      const newPrincipal = { ...about.leadership.principal, name: e.target.value };
                      updateSubField('leadership', 'principal', newPrincipal);
                      
                      // Auto-sync to homepage if it has a principal message
                      if (institution.sections.homepage?.principalMessage) {
                        onUpdate({
                          ...institution.sections,
                          about: { ...about, leadership: { ...about.leadership, principal: newPrincipal } },
                          homepage: {
                            ...institution.sections.homepage,
                            principalMessage: {
                              ...institution.sections.homepage.principalMessage,
                              name: e.target.value
                            }
                          }
                        });
                      }
                    }} 
                  />
                </div>
                <div>
                  <label className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2">Title</label>
                  <input 
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm font-bold text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                    value={about.leadership.principal.title} 
                    onChange={e => updateSubField('leadership', 'principal', { ...about.leadership.principal, title: e.target.value })} 
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2">Photo URL</label>
                  <input 
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                    value={about.leadership.principal.photo || ''} 
                    onChange={e => {
                      const newPrincipal = { ...about.leadership.principal, photo: e.target.value };
                      updateSubField('leadership', 'principal', newPrincipal);
                      
                      // Auto-sync photo to homepage principal message
                      if (institution.sections.homepage?.principalMessage) {
                        onUpdate({
                          ...institution.sections,
                          about: { ...about, leadership: { ...about.leadership, principal: newPrincipal } },
                          homepage: {
                            ...institution.sections.homepage,
                            principalMessage: {
                              ...institution.sections.homepage.principalMessage,
                              photo: e.target.value
                            }
                          }
                        });
                      }
                    }} 
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2">Qualifications</label>
                  <input 
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                    value={about.leadership.principal.qualifications || ''} 
                    onChange={e => updateSubField('leadership', 'principal', { ...about.leadership.principal, qualifications: e.target.value })} 
                    placeholder="e.g. PhD in Education"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2">Leadership Philosophy / Description</label>
                  <textarea 
                    rows={2}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm font-medium text-slate-300 outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none" 
                    value={(about.leadership.principal as any)?.philosophy || about.leadership.principal?.description || ''} 
                    onChange={e => updateSubField('leadership', 'principal', { ...about.leadership.principal, description: e.target.value })} 
                  />
                </div>
              </div>
            </div>

            {/* Senior Team */}
            <div className="space-y-4">
              {about.leadership.seniorTeam.map((member, idx) => (
                <div key={idx} className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 group relative">
                  <button 
                    className="absolute top-4 right-4 text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => {
                      const newTeam = about.leadership.seniorTeam.filter((_, i) => i !== idx);
                      updateSubField('leadership', 'seniorTeam', newTeam);
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Name</label>
                      <input 
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500" 
                        value={member.name} 
                        onChange={e => {
                          const newTeam = [...about.leadership.seniorTeam];
                          newTeam[idx].name = e.target.value;
                          updateSubField('leadership', 'seniorTeam', newTeam);
                        }} 
                      />
                    </div>
                    <div>
                      <label className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Position</label>
                      <input 
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500" 
                        value={member.title} 
                        onChange={e => {
                          const newTeam = [...about.leadership.seniorTeam];
                          newTeam[idx].title = e.target.value;
                          updateSubField('leadership', 'seniorTeam', newTeam);
                        }} 
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Photo URL</label>
                      <input 
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-medium text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500" 
                        value={member.photo || ''} 
                        onChange={e => {
                          const newTeam = [...about.leadership.seniorTeam];
                          newTeam[idx].photo = e.target.value;
                          updateSubField('leadership', 'seniorTeam', newTeam);
                        }} 
                        placeholder="https://example.com/photo.jpg"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Qualifications</label>
                      <input 
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-medium text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500" 
                        value={member.qualifications || ''} 
                        onChange={e => {
                          const newTeam = [...about.leadership.seniorTeam];
                          newTeam[idx].qualifications = e.target.value;
                          updateSubField('leadership', 'seniorTeam', newTeam);
                        }} 
                        placeholder="e.g. M.Ed"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Brief Bio / Description</label>
                      <textarea 
                        rows={2}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-medium text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500 resize-none" 
                        value={member.description || ''} 
                        onChange={e => {
                          const newTeam = [...about.leadership.seniorTeam];
                          newTeam[idx].description = e.target.value;
                          updateSubField('leadership', 'seniorTeam', newTeam);
                        }} 
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Board Members */}
            {(about.leadership.boardMembers || []).length > 0 && (
              <div className="space-y-6 pt-10 border-t border-slate-100">
                <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Board of Governors / Management</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {about.leadership.boardMembers?.map((member, idx) => (
                    <div key={idx} className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 relative group">
                       <button 
                        onClick={() => updateSubField('leadership', 'boardMembers', about.leadership.boardMembers?.filter((_, i) => i !== idx))}
                        className="absolute top-4 right-4 text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ✕
                      </button>
                      <input 
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-black text-slate-900 outline-none focus:ring-1 focus:ring-blue-500 mb-2" 
                        value={member.name}
                        onChange={e => {
                          const newBoard = [...(about.leadership.boardMembers || [])];
                          newBoard[idx].name = e.target.value;
                          updateSubField('leadership', 'boardMembers', newBoard);
                        }}
                        placeholder="Member Name"
                      />
                      <input 
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-[10px] font-bold text-slate-500 outline-none focus:ring-1 focus:ring-blue-500" 
                        value={member.title}
                        onChange={e => {
                          const newBoard = [...(about.leadership.boardMembers || [])];
                          newBoard[idx].title = e.target.value;
                          updateSubField('leadership', 'boardMembers', newBoard);
                        }}
                        placeholder="e.g. Board Chairperson"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Institutional Growth & Stats */}
          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold">10</div>
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Growth Analytics & Transformation</h4>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 space-y-4">
                 <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Core Statistics</h5>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Students</label>
                      <input 
                        type="number"
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-sm font-bold text-slate-900" 
                        value={about.statistics?.totalStudents || 0}
                        onChange={e => updateField('statistics', { ...about.statistics, totalStudents: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div>
                      <label className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Staff</label>
                      <input 
                        type="number"
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-sm font-bold text-slate-900" 
                        value={about.statistics?.totalStaff || 0}
                        onChange={e => updateField('statistics', { ...about.statistics, totalStaff: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Graduation Rate</label>
                      <input 
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-sm font-bold text-slate-900" 
                        value={about.statistics?.graduationRate || ''}
                        onChange={e => updateField('statistics', { ...about.statistics, graduationRate: e.target.value })}
                        placeholder="e.g. 98%"
                      />
                    </div>
                 </div>
              </div>

              <div className="lg:col-span-2 space-y-6">
                <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Digital & Community Transformation</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest">Adaptation to Change</label>
                    <textarea 
                      rows={3}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-xs font-medium text-slate-600 outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
                      value={about.history.transformationNarrative?.adaptationToChange || ''}
                      onChange={e => updateSubField('history', 'transformationNarrative', { ...about.history.transformationNarrative, adaptationToChange: e.target.value })}
                      placeholder="How has the school evolved over time?"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest">Technological Upgrades</label>
                    <textarea 
                      rows={3}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-xs font-medium text-slate-600 outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
                      value={about.history.transformationNarrative?.technologicalUpgrades || ''}
                      onChange={e => updateSubField('history', 'transformationNarrative', { ...about.history.transformationNarrative, technologicalUpgrades: e.target.value })}
                      placeholder="ICT, E-learning and infrastructure enhancements..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest">Community Impact</label>
                    <textarea 
                      rows={3}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-xs font-medium text-slate-600 outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
                      value={about.history.transformationNarrative?.communityImpact || ''}
                      onChange={e => updateSubField('history', 'transformationNarrative', { ...about.history.transformationNarrative, communityImpact: e.target.value })}
                      placeholder="Contribution to the local Shiselweni/Hhohho community..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest">Alumni Influence</label>
                    <textarea 
                      rows={3}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-xs font-medium text-slate-600 outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
                      value={about.history.transformationNarrative?.alumniInfluence || ''}
                      onChange={e => updateSubField('history', 'transformationNarrative', { ...about.history.transformationNarrative, alumniInfluence: e.target.value })}
                      placeholder="How do graduates impact the world?"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Facilities & Outreach */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold">11</div>
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Estate & Facilities</h4>
                </div>
              </div>
              <textarea 
                rows={3} 
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 font-medium text-slate-600 text-sm outline-none" 
                value={about.facilities?.overview || ''}
                onChange={e => updateField('facilities', { ...about.facilities, overview: e.target.value })}
                placeholder="Overview of the physical environment..."
              />
              <div className="space-y-3">
                 <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black text-slate-400 ml-1">KEY AMENITIES</label>
                    <button className="text-[9px] font-black text-blue-600" onClick={() => updateField('facilities', { ...about.facilities, list: [...(about.facilities?.list || []), ''] })}>+ Add</button>
                 </div>
                 <div className="grid grid-cols-1 gap-2">
                    {(about.facilities?.list || []).map((ext, i) => (
                      <div key={i} className="flex gap-2">
                        <input 
                          className="flex-1 bg-slate-50 border-none rounded-xl px-4 py-2 text-xs font-bold text-slate-700"
                          value={ext}
                          onChange={e => {
                            const newList = [...(about.facilities?.list || [])];
                            newList[i] = e.target.value;
                            updateField('facilities', { ...about.facilities, list: newList });
                          }}
                        />
                        <button onClick={() => updateField('facilities', { ...about.facilities, list: about.facilities.list.filter((_, idx) => idx !== i) })} className="text-rose-500">✕</button>
                      </div>
                    ))}
                 </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center font-bold">12</div>
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Community Engagement</h4>
              </div>
              <div className="space-y-4">
                 <div>
                    <label className="block text-[8px] font-black text-slate-400 uppercase mb-2">Outreach Programs</label>
                    <textarea 
                      rows={2} 
                      className="w-full bg-slate-50 border-none rounded-2xl px-4 py-2 text-xs font-medium text-slate-600"
                      value={about.community?.outreach || ''}
                      onChange={e => updateField('community', { ...about.community, outreach: e.target.value })}
                    />
                 </div>
                 <div>
                    <label className="block text-[8px] font-black text-slate-400 uppercase mb-2">Institutional Partnerships</label>
                    <textarea 
                      rows={2} 
                      className="w-full bg-slate-100 border-none rounded-2xl px-4 py-2 text-xs font-medium text-slate-600"
                      value={about.community?.partnerships || ''}
                      onChange={e => updateField('community', { ...about.community, partnerships: e.target.value })}
                    />
                 </div>
              </div>
            </div>
          </div>

          <div className="space-y-8 pt-10 border-t border-slate-100">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Legacy, Milestones & Growth</h4>
            <div className="bg-slate-50 p-8 rounded-[40px] space-y-6">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Growth Summary</label>
              <textarea
                rows={3}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                value={about.history.growthSummary || ''}
                onChange={e => updateSubField('history', 'growthSummary', e.target.value)}
              />
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mt-4">Milestones</label>
              {about.history.milestones.map((m, idx) => (
                <div key={idx} className="flex gap-2">
                  <input className="w-1/4 bg-white border border-slate-200 rounded-xl px-4 py-2 font-bold" value={m.year} onChange={e => {
                    const newMilestones = [...about.history.milestones];
                    newMilestones[idx].year = e.target.value;
                    updateSubField('history', 'milestones', newMilestones);
                  }} />
                  <input className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 font-bold" value={m.event} onChange={e => {
                    const newMilestones = [...about.history.milestones];
                    newMilestones[idx].event = e.target.value;
                    updateSubField('history', 'milestones', newMilestones);
                  }} />
                </div>
              ))}
              <button className="text-[10px] font-bold text-blue-600 hover:text-blue-800" onClick={() => updateSubField('history', 'milestones', [...about.history.milestones, { year: '', event: '' }])}>+ Add Milestone</button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <header>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Section Preview</h3>
        </header>
        
        <div className="space-y-8">
          <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
            <div className="space-y-4">
              <div className="w-12 h-1.5 bg-blue-600 rounded-full" />
              <h4 className="text-2xl font-black text-slate-900 tracking-tight">Our Mission</h4>
              <p className="text-slate-600 font-medium leading-relaxed">{about.mission.statement || 'Your mission statement will appear here...'}</p>
            </div>

            <div className="p-8 bg-slate-900 rounded-[32px] text-white space-y-4">
              <h4 className="text-xl font-black tracking-tight">{about.vision.headline || 'Vision Headline'}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{about.vision.supportingParagraph || 'Vision supporting paragraph...'}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-slate-50 rounded-3xl text-center">
                <p className="text-2xl font-black text-slate-900">{about.history.foundingStory.yearEstablished || '—'}</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Established</p>
              </div>
              <div className="p-6 bg-slate-50 rounded-3xl text-center">
                <p className="text-2xl font-black text-slate-900">{about.history.foundingStory.initialStudentPopulation || '—'}</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Starting Class</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default AboutEditor;
