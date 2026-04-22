
import React from 'react';
import { Institution } from '../../../../types';

interface PortalEditorProps {
  institution: Institution;
  onUpdate: (updatedSections: Institution['sections']) => void;
}

const PortalEditor: React.FC<PortalEditorProps> = ({ institution, onUpdate }) => {
  const { portal } = institution.sections;

  const updateField = (field: string, value: any) => {
    onUpdate({
      ...institution.sections,
      portal: {
        ...portal,
        [field]: value
      }
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-in fade-in slide-in-from-right-4">
      <div className="space-y-10">
        <header>
          <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Student Portal Config</h3>
          <p className="text-sm text-slate-500 font-medium">Manage access to your institution's digital learning hub</p>
        </header>

        <div className="space-y-8">
          <div className="flex items-center justify-between p-6 bg-slate-900 rounded-[32px] text-white shadow-xl">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${portal.enabled ? 'bg-emerald-500 text-white' : 'bg-white/10 text-slate-400'}`}>
                {portal.enabled ? '✅' : '🔒'}
              </div>
              <div>
                <h4 className="font-black text-sm uppercase tracking-widest">Portal Status</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase">{portal.enabled ? 'Active & Accessible' : 'Disabled / Maintenance'}</p>
              </div>
            </div>
            <button 
              onClick={() => updateField('enabled', !portal.enabled)}
              className={`w-14 h-8 rounded-full transition-all relative ${portal.enabled ? 'bg-emerald-500' : 'bg-slate-700'}`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${portal.enabled ? 'right-1' : 'left-1'}`} />
            </button>
          </div>

          <div className="group">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Portal Name</label>
            <input 
              className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 font-bold transition-all outline-none" 
              value={portal.name} 
              onChange={e => updateField('name', e.target.value)} 
            />
          </div>

          <div className="group">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">External Portal URL (Optional)</label>
            <p className="text-[10px] text-slate-500 mb-2">If your school uses an external student management system (e.g., Fedena, TSAM, or custom), enter the login URL here.</p>
            <input 
              className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 font-bold transition-all outline-none" 
              value={portal.url} 
              onChange={e => updateField('url', e.target.value)} 
              placeholder="https://portal.yourschool.ac.sz/login"
            />
          </div>

          <div className="group">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Login Requirements</label>
            <div className="space-y-3">
              {portal.loginRequirements.map((req, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <input 
                    className="flex-1 bg-transparent border-none font-bold text-slate-700 focus:ring-0 p-0" 
                    value={req} 
                    onChange={e => {
                      const newReqs = [...portal.loginRequirements];
                      newReqs[idx] = e.target.value;
                      updateField('loginRequirements', newReqs);
                    }} 
                  />
                  <button 
                    onClick={() => {
                      const newReqs = portal.loginRequirements.filter((_, i) => i !== idx);
                      updateField('loginRequirements', newReqs);
                    }}
                    className="text-rose-500 hover:text-rose-700 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button 
                onClick={() => updateField('loginRequirements', [...portal.loginRequirements, 'New Requirement'])}
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
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Portal Preview</h3>
        </header>
        
        <div className="sticky top-8">
          <div className="bg-slate-900 p-10 rounded-[40px] text-white space-y-8 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-12 opacity-10 text-9xl">🌐</div>
            <div className="relative z-10 space-y-6">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl">🚀</div>
              <div className="space-y-2">
                <h4 className="text-2xl font-black tracking-tight">{portal.name || 'Student Portal'}</h4>
                <p className="text-slate-400 text-sm font-medium">Access your learning anytime, anywhere.</p>
              </div>
              
              <div className="space-y-4 pt-4">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Login Requirements</p>
                <div className="flex flex-wrap gap-2">
                  {portal.loginRequirements.map((req, idx) => (
                    <span key={idx} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold">{req}</span>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <a 
                  href={portal.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 bg-white text-slate-900 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:scale-105 transition-transform"
                >
                  Launch Portal
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortalEditor;
