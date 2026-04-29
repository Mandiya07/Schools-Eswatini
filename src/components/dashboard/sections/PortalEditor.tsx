
import React from 'react';
import { Institution } from '../../../../types';
import { Globe, Shield, UserCheck, Smartphone, HelpCircle, Layout, ExternalLink, Plus, Trash2, Eye } from 'lucide-react';

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

  const updateDeepField = (category: string, field: string, value: any) => {
    onUpdate({
      ...institution.sections,
      portal: {
        ...portal,
        [category]: {
          ...(portal as any)[category],
          [field]: value
        }
      }
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-in fade-in slide-in-from-right-4">
      <div className="space-y-10">
        <header>
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Student Portal Config</h3>
              <p className="text-xs text-slate-500 font-medium">Manage access to your institution's digital learning hub</p>
            </div>
          </div>
        </header>

        <div className="space-y-8">
          {/* Status Toggle */}
          <div className="flex items-center justify-between p-6 bg-slate-900 rounded-[32px] text-white shadow-xl">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${portal.enabled ? 'bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 'bg-white/10 text-slate-400'}`}>
                {portal.enabled ? <Shield className="w-6 h-6" /> : <Shield className="w-6 h-6 opacity-30" />}
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
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${portal.enabled ? 'right-1 shadow-[-2px_0_5px_rgba(0,0,0,0.1)]' : 'left-1 shadow-[2px_0_5px_rgba(0,0,0,0.1)]'}`} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="group col-span-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Layout className="w-3 h-3" /> Portal Interface Name
              </label>
              <input 
                className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 font-bold transition-all outline-none" 
                value={portal.name} 
                onChange={e => updateField('name', e.target.value)} 
                placeholder="e.g. Waterford Digital Hub"
              />
            </div>

            <div className="group">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Public Headline</label>
              <input 
                className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 font-bold transition-all outline-none text-xs" 
                value={portal.headline} 
                onChange={e => updateField('headline', e.target.value)} 
                placeholder="Welcome to Your Learning"
              />
            </div>

            <div className="group">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Launch Description</label>
              <input 
                className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 font-bold transition-all outline-none text-xs" 
                value={portal.description} 
                onChange={e => updateField('description', e.target.value)} 
                placeholder="Access grades, assignments..."
              />
            </div>
          </div>

          <div className="group p-8 bg-blue-50 rounded-[40px] border border-blue-100">
            <label className="block text-[10px] font-black text-blue-600 uppercase tracking-widest mb-3 flex items-center gap-2">
              <ExternalLink className="w-3 h-3" /> External Student Portal URL
            </label>
            <p className="text-[10px] text-blue-500 mb-4 font-medium">If you use a 3rd-party LMS (Fedena, Moodle, custom), enter the login URL here. Users will be redirected from the public portal page.</p>
            <input 
              className="w-full bg-white border-2 border-transparent focus:border-blue-500 rounded-2xl px-6 py-4 font-bold transition-all outline-none" 
              value={portal.url} 
              onChange={e => updateField('url', e.target.value)} 
              placeholder="https://portal.yourschool.ac.sz/login"
            />
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="group">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Shield className="w-3 h-3" /> Login Requirements
              </label>
              <div className="space-y-3">
                {portal.loginRequirements.map((req, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100 group/item">
                    <input 
                      className="flex-1 bg-transparent border-none font-bold text-slate-700 focus:ring-0 p-0 text-xs" 
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
                      className="text-slate-300 hover:text-rose-500 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <button 
                  onClick={() => updateField('loginRequirements', [...portal.loginRequirements, 'New Requirement'])}
                  className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:bg-white hover:border-blue-400 transition-all"
                >
                  + Add Requirement
                </button>
              </div>
            </div>

            <div className="group">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <UserCheck className="w-3 h-3" /> Roles Supported
              </label>
              <div className="space-y-3">
                {portal.rolesSupported.map((role, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100 group/item">
                    <input 
                      className="flex-1 bg-transparent border-none font-bold text-slate-700 focus:ring-0 p-0 text-xs" 
                      value={role} 
                      onChange={e => {
                        const newRoles = [...portal.rolesSupported];
                        newRoles[idx] = e.target.value;
                        updateField('rolesSupported', newRoles);
                      }} 
                    />
                    <button 
                      onClick={() => {
                        const newRoles = portal.rolesSupported.filter((_, i) => i !== idx);
                        updateField('rolesSupported', newRoles);
                      }}
                      className="text-slate-300 hover:text-rose-500 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <button 
                  onClick={() => updateField('rolesSupported', [...portal.rolesSupported, 'e.g. Parents'])}
                  className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:bg-white hover:border-blue-400 transition-all"
                >
                  + Add Role
                </button>
              </div>
            </div>
          </div>

          <div className="p-8 bg-slate-50 rounded-[40px] border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-900">Mobile App Sync</h5>
                <p className="text-[8px] text-slate-500 font-bold uppercase">Sync content with native mobile app</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-emerald-200 text-emerald-700 rounded-lg text-[8px] font-black uppercase tracking-widest">Active</span>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <header className="flex justify-between items-center">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Eye className="w-3 h-3" /> Live Preview
          </h3>
          <span className="text-[10px] font-black text-emerald-500 uppercase flex items-center gap-1">
             <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
             Real-time Sync
          </span>
        </header>
        
        <div className="sticky top-8">
          <div className="bg-slate-900 p-12 rounded-[56px] text-white space-y-10 relative overflow-hidden shadow-2xl border border-slate-800">
            <div className="absolute top-0 right-0 p-24 opacity-10 text-[12rem] leading-none select-none">💻</div>
            <div className="relative z-10 space-y-8">
              <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-4xl shadow-2xl shadow-blue-600/30">
                🚀
              </div>
              <div className="space-y-4">
                <h4 className="text-4xl font-black tracking-tighter leading-tight">{portal.name || 'Student Portal'}</h4>
                <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-sm">{portal.headline || 'Welcome to your digital campus.'}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-8 pt-4">
                <div className="space-y-3">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Requirements</p>
                  <div className="space-y-2">
                    {portal.loginRequirements.slice(0, 3).map((req, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[10px] font-bold text-slate-300">
                        <UserCheck className="w-3 h-3 text-emerald-400" /> {req}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Access</p>
                  <div className="space-y-2">
                    {portal.rolesSupported.slice(0, 3).map((role, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[10px] font-bold text-slate-300">
                        <Shield className="w-3 h-3 text-blue-400" /> {role}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-8 flex flex-col gap-4">
                <a 
                  href={portal.url || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-blue-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                >
                  Launch Student Portal
                  <ExternalLink className="w-4 h-4" />
                </a>
                <p className="text-center text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                  Secure SSO Tunneling Enabled
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-8 border-2 border-dashed border-slate-200 rounded-[40px] flex items-center gap-6">
             <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-slate-400" />
             </div>
             <div>
                <h6 className="text-xs font-black text-slate-900 uppercase">Need technical help?</h6>
                <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Contact the MoET IT Liaison for SSO integration.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortalEditor;

