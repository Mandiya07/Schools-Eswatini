
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

        <div className="space-y-8">
          <div className="group">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 group-focus-within:text-blue-600 transition-colors">Institutional Overview</label>
            <textarea 
              rows={4} 
              className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 font-medium transition-all outline-none resize-none" 
              value={about.overview} 
              onChange={e => updateField('overview', e.target.value)}
              placeholder="Tell the world about your institution..."
            />
          </div>
          <div className="group">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 group-focus-within:text-blue-600 transition-colors">Founding Background</label>
            <textarea 
              rows={4} 
              className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 font-medium transition-all outline-none resize-none" 
              value={about.foundingBackground || ''} 
              onChange={e => updateField('foundingBackground', e.target.value)}
              placeholder="How did it all begin?"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 bg-blue-50 rounded-[40px] space-y-4 border border-blue-100">
              <label className="block text-[10px] font-black text-blue-900 uppercase tracking-widest">Mission Statement</label>
              <textarea 
                rows={2} 
                className="w-full bg-white border-none rounded-xl px-4 py-3 font-bold text-blue-900 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none" 
                value={about.mission.statement} 
                onChange={e => updateSubField('mission', 'statement', e.target.value)} 
              />
              <label className="block text-[10px] font-black text-blue-900 uppercase tracking-widest pt-2">Description (Optional)</label>
              <textarea 
                rows={2} 
                className="w-full bg-white border-none rounded-xl px-4 py-3 font-medium text-blue-900 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none" 
                value={about.mission.description || ''} 
                onChange={e => updateSubField('mission', 'description', e.target.value)} 
              />
            </div>
            <div className="p-8 bg-emerald-50 rounded-[40px] space-y-4 border border-emerald-100">
              <label className="block text-[10px] font-black text-emerald-900 uppercase tracking-widest">Vision Headline</label>
              <input 
                className="w-full bg-white border-none rounded-xl px-4 py-3 font-bold text-emerald-900 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all" 
                value={about.vision.headline} 
                onChange={e => updateSubField('vision', 'headline', e.target.value)} 
              />
              <label className="block text-[10px] font-black text-emerald-900 uppercase tracking-widest mt-2">Explanation (Optional)</label>
              <textarea 
                rows={2} 
                className="w-full bg-white border-none rounded-xl px-4 py-3 font-medium text-emerald-900 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none" 
                value={about.vision.explanation || ''} 
                onChange={e => updateSubField('vision', 'explanation', e.target.value)} 
              />
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
        
        <div className="sticky top-8 space-y-8">
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
