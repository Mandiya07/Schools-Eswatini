
import React from 'react';
import { Institution } from '../../../../types';

interface AdmissionsEditorProps {
  institution: Institution;
  onUpdate: (updatedSections: Institution['sections']) => void;
}

const AdmissionsEditor: React.FC<AdmissionsEditorProps> = ({ institution, onUpdate }) => {
  const { admissions } = institution.sections;

  const updateField = (field: string, value: any) => {
    onUpdate({
      ...institution.sections,
      admissions: {
        ...admissions,
        [field]: value
      }
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-in fade-in slide-in-from-right-4">
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
              onChange={e => updateField('headline', e.target.value)} 
            />
          </div>

          <div className="group">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 group-focus-within:text-blue-600 transition-colors">Introduction Message</label>
            <textarea 
              rows={4} 
              className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 font-medium transition-all outline-none resize-none" 
              value={admissions.introduction} 
              onChange={e => updateField('introduction', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 group-focus-within:text-blue-600 transition-colors">Online Application URL</label>
              <input 
                className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 font-bold transition-all outline-none" 
                placeholder="https://..."
                value={admissions.onlineApplicationUrl || ''} 
                onChange={e => updateField('onlineApplicationUrl', e.target.value)} 
              />
            </div>
            <div className="group">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 group-focus-within:text-blue-600 transition-colors">Scholarship Link</label>
              <input 
                className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 font-bold transition-all outline-none" 
                placeholder="https://..."
                value={admissions.scholarshipApplicationLink || ''} 
                onChange={e => updateField('scholarshipApplicationLink', e.target.value)} 
              />
            </div>
          </div>

          <div className="flex items-center gap-4 bg-blue-50 p-6 rounded-3xl border border-blue-100">
            <div className="flex-1">
              <h4 className="text-sm font-black text-blue-900 mb-1">Enable Online Portal Redirection</h4>
              <p className="text-xs text-blue-700 font-medium font-sans">Checking this will show the 'Apply Online Now' button on your profile using the URL provided above.</p>
            </div>
            <button 
              onClick={() => updateField('allowOnlineApplications', !admissions.allowOnlineApplications)}
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
                      updateField('requirements', { ...admissions.requirements, academic: newReqs });
                    }} 
                  />
                  <button 
                    onClick={() => {
                      const newReqs = admissions.requirements.academic.filter((_, i) => i !== idx);
                      updateField('requirements', { ...admissions.requirements, academic: newReqs });
                    }}
                    className="text-rose-500 hover:text-rose-700 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button 
                onClick={() => updateField('requirements', { ...admissions.requirements, academic: [...admissions.requirements.academic, 'New Requirement'] })}
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
  );
};

export default AdmissionsEditor;
