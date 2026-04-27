
import React from 'react';
import { Institution } from '../../../../types';

interface AboutEditorProps {
  institution: Institution;
  onUpdate: (updatedSections: Institution['sections']) => void;
}

const AboutEditor: React.FC<AboutEditorProps> = ({ institution, onUpdate }) => {
  const { about } = institution.sections;

  const updateField = (field: string, value: any) => {
    onUpdate({
      ...institution.sections,
      about: {
        ...about,
        [field]: value
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-in fade-in slide-in-from-right-4">
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
              value={about.overview} 
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
                  value={about.mission.description || ''} 
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
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-fuchsia-50 text-fuchsia-600 rounded-xl flex items-center justify-center font-bold">05</div>
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Core Values</h4>
              </div>
              <button 
                className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                onClick={() => updateField('coreValues', [...about.coreValues, { title: '', description: '' }])}
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
                      <label className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2">Value Title</label>
                      <input 
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                        value={val.title} 
                        onChange={e => {
                          const newValues = [...about.coreValues];
                          newValues[idx].title = e.target.value;
                          updateField('coreValues', newValues);
                        }} 
                        placeholder="e.g. Integrity" 
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2">Description</label>
                      <input 
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 font-medium text-slate-600 outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                        value={val.description} 
                        onChange={e => {
                          const newValues = [...about.coreValues];
                          newValues[idx].description = e.target.value;
                          updateField('coreValues', newValues);
                        }} 
                        placeholder="What does this value mean to your school?" 
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

          {/* Executive Leadership */}
          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold">06</div>
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Executive Leadership</h4>
              </div>
              <button 
                className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                onClick={() => updateField('leadership', {
                  ...about.leadership,
                  seniorTeam: [...about.leadership.seniorTeam, { name: '', title: '', description: '', photo: '' }]
                })}
              >
                + Add Leader
              </button>
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
                    onChange={e => updateSubField('leadership', 'principal', { ...about.leadership.principal, name: e.target.value })} 
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
                  <label className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2">Leadership Philosophy</label>
                  <textarea 
                    rows={2}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm font-medium text-slate-300 outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none" 
                    value={about.leadership.principal.philosophy || ''} 
                    onChange={e => updateSubField('leadership', 'principal', { ...about.leadership.principal, philosophy: e.target.value })} 
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
                  </div>
                </div>
              ))}
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
  );
};

export default AboutEditor;
