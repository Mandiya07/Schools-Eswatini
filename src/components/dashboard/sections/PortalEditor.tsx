
import React from 'react';
import { Institution } from '../../../../types';
import { Globe, Shield, UserCheck, Smartphone, HelpCircle, Layout, ExternalLink, Plus, Trash2, Eye, Clock } from 'lucide-react';
import SectionBaseFields from './SectionBaseFields';

interface PortalEditorProps {
  institution: Institution;
  onUpdate: (updatedSections: Institution['sections']) => void;
}

const PortalFeaturesEditor = ({ features, onChange }: { features: any, onChange: (f: any) => void }) => {
  const categories = [
    { key: 'dashboard', label: 'Dashboard & Interface', icon: Layout },
    { key: 'learning', label: 'E-Learning & Content', icon: Globe },
    { key: 'assessments', label: 'Exams & Grading', icon: UserCheck },
    { key: 'records', label: 'Academic Records', icon: Shield },
    { key: 'scheduling', label: 'Scheduling & Calendar', icon: Clock },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      {categories.map((cat) => (
        <div key={cat.key} className="p-8 bg-white rounded-[40px] border border-slate-100 shadow-sm space-y-6">
          <header className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
              <cat.icon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">{cat.label}</h4>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Manage {cat.key} capabilities</p>
            </div>
          </header>
          
          <div className="space-y-4">
            <textarea 
              className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 text-xs font-medium"
              placeholder="Description of these features..."
              value={features[cat.key]?.description || features[cat.key]?.accessLevel || ''}
              onChange={e => {
                const val = e.target.value;
                onChange({
                  ...features,
                  [cat.key]: {
                    ...features[cat.key],
                    [cat.key === 'records' ? 'accessLevel' : 'description']: val
                  }
                });
              }}
            />
            <div className="space-y-2">
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Active Feature List (Comma Separated)</p>
              <input 
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-2 text-xs font-bold"
                placeholder="e.g. Real-time grades, PDF Exports, Study Plans"
                value={(features[cat.key]?.list || []).join(', ')}
                onChange={e => {
                  const list = e.target.value.split(',').map((s: string) => s.trim()).filter((s: string) => s !== '');
                  onChange({
                    ...features,
                    [cat.key]: {
                      ...features[cat.key],
                      list
                    }
                  });
                }}
              />
            </div>
          </div>
        </div>
      ))}

      <div className="p-8 bg-blue-900 rounded-[40px] text-white space-y-6 shadow-2xl">
         <header className="flex justify-between items-center">
            <div className="space-y-1">
               <h4 className="text-xs font-black uppercase tracking-tight">Parental Access & Control</h4>
               <p className="text-[10px] text-blue-400 font-bold uppercase leading-none">Enable 3rd party observer accounts</p>
            </div>
            <button 
              onClick={() => onChange({ ...features, parentAccess: { ...features.parentAccess, enabled: !features.parentAccess?.enabled } })}
              className={`w-12 h-6 rounded-full transition-all relative ${features.parentAccess?.enabled ? 'bg-blue-500' : 'bg-white/10'}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all ${features.parentAccess?.enabled ? 'right-0.5' : 'left-0.5'}`} />
            </button>
         </header>
         {features.parentAccess?.enabled && (
           <div className="space-y-4 animate-in zoom-in-95 duration-300">
              <p className="text-[8px] font-black text-blue-300 uppercase tracking-widest">Parent-Specific Features</p>
              <input 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-white/20"
                placeholder="e.g. Fee Statements, Attendance Alerts, Teacher Chat"
                value={(features.parentAccess?.features || []).join(', ')}
                onChange={e => {
                  const f = e.target.value.split(',').map((s: string) => s.trim()).filter((s: string) => s !== '');
                  onChange({ ...features, parentAccess: { ...features.parentAccess, features: f } });
                }}
              />
           </div>
         )}
      </div>
    </div>
  );
};

const PortalEditor: React.FC<PortalEditorProps> = ({ institution, onUpdate }) => {
  const { portal } = institution.sections;
  const [activeTab, setActiveTab] = React.useState<'config' | 'features' | 'support'>('config');

  const updateField = (field: string, value: any) => {
    onUpdate({
      ...institution.sections,
      portal: {
        ...portal,
        [field]: value,
        lastUpdated: new Date().toISOString()
      }
    });
  };

  return (
    <div className="space-y-12">
      <SectionBaseFields 
        section={portal as any} 
        onUpdate={updateField} 
        label="Portal" 
      />

      <div className="flex gap-1 p-1 bg-slate-100 rounded-2xl w-fit mb-8">
        {(['config', 'features', 'support'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTab === tab 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-in fade-in slide-in-from-right-4">
        <div className="space-y-10 pb-20">
          {activeTab === 'config' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4">
              <header>
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Access & Connectivity</h3>
                    <p className="text-xs text-slate-500 font-medium">Core authentication and gateway settings</p>
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

                <div className="grid grid-cols-1 gap-6">
                  <div className="group">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Layout className="w-3 h-3" /> Portal Display Name
                    </label>
                    <input 
                      className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 font-bold transition-all outline-none" 
                      value={portal.name} 
                      onChange={e => updateField('name', e.target.value)} 
                      placeholder="e.g. Waterford Digital Hub"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Portal URL (Login Entry)</label>
                    <div className="flex bg-slate-50 border-2 border-transparent focus-within:border-blue-500 focus-within:bg-white rounded-2xl transition-all">
                      <span className="pl-6 py-4 text-slate-400"><Globe className="w-4 h-4" /></span>
                      <input 
                        className="w-full bg-transparent border-none px-3 py-4 font-bold outline-none focus:ring-0 text-sm" 
                        value={portal.url} 
                        onChange={e => updateField('url', e.target.value)} 
                        placeholder="https://portal.yourschool.ac.sz"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Account Creation Guidance</label>
                    <textarea 
                      className="w-full bg-slate-50 border-none rounded-[32px] p-6 text-xs font-medium min-h-[120px]"
                      placeholder="Explain how students get their credentials..."
                      value={portal.accountCreationProcess || ''}
                      onChange={e => updateField('accountCreationProcess', e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div className="group">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Shield className="w-3 h-3" /> Login Requirements
                      </label>
                      <div className="space-y-3">
                        {(portal.loginRequirements || []).map((req: string, idx: number) => (
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
                            <button onClick={() => updateField('loginRequirements', portal.loginRequirements.filter((_: string, i: number) => i !== idx))} className="text-slate-300 hover:text-rose-500"><Trash2 className="w-3 h-3" /></button>
                          </div>
                        ))}
                        <button onClick={() => updateField('loginRequirements', [...portal.loginRequirements, 'New Requirement'])} className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-[8px] font-black uppercase text-slate-400 tracking-widest">+</button>
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <UserCheck className="w-3 h-3" /> Roles Supported
                      </label>
                      <div className="space-y-3">
                        {(portal.rolesSupported || []).map((role: string, idx: number) => (
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
                            <button onClick={() => updateField('rolesSupported', portal.rolesSupported.filter((_: string, i: number) => i !== idx))} className="text-slate-300 hover:text-rose-500"><Trash2 className="w-3 h-3" /></button>
                          </div>
                        ))}
                        <button onClick={() => updateField('rolesSupported', [...portal.rolesSupported, 'Role Name'])} className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-[8px] font-black uppercase text-slate-400 tracking-widest">+</button>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 bg-slate-900 rounded-[40px] text-white space-y-6">
                    <header>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Security & Compliance</h4>
                      <p className="text-[8px] text-slate-500 font-bold uppercase">Define encryption and access policies</p>
                    </header>
                    <input 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white"
                      placeholder="e.g. SSL Encryption, Two-Factor Authentication"
                      value={(portal.security || []).join(', ')}
                      onChange={e => updateField('security', e.target.value.split(',').map((s: string) => s.trim()).filter((s: string) => s !== ''))}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <PortalFeaturesEditor 
              features={portal.features} 
              onChange={(f) => updateField('features', f)} 
            />
          )}

          {activeTab === 'support' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4">
              <div className="p-10 bg-indigo-50 rounded-[56px] border border-indigo-100 space-y-8">
                 <header>
                    <h4 className="text-sm font-black text-indigo-900 uppercase tracking-tight">Academic Tools & Tech</h4>
                    <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-widest">Third-party integrations and platforms</p>
                 </header>
                 <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-2">
                       <p className="text-[8px] font-black text-indigo-400 uppercase tracking-widest">Tools Inventory</p>
                       <input 
                         className="w-full bg-white border-none rounded-2xl px-6 py-4 text-xs font-bold text-slate-700" 
                         placeholder="e.g. Google Workspace, Microsoft Teams, Zoom"
                         value={(portal.tools?.list || []).join(', ')}
                         onChange={e => updateField('tools', { ...portal.tools, list: e.target.value.split(',').map((s: string) => s.trim()) })}
                       />
                    </div>
                    <div className="space-y-2">
                       <p className="text-[8px] font-black text-indigo-400 uppercase tracking-widest">Supported Platforms</p>
                       <input 
                         className="w-full bg-white border-none rounded-2xl px-6 py-4 text-xs font-bold text-slate-700" 
                         placeholder="e.g. Web, iOS, Android, Desktop"
                         value={(portal.tools?.platforms || []).join(', ')}
                         onChange={e => updateField('tools', { ...portal.tools, platforms: e.target.value.split(',').map((s: string) => s.trim()) })}
                       />
                    </div>
                 </div>
              </div>

              <div className="space-y-6">
                 <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Technical Support Desk</h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-6 bg-slate-50 rounded-3xl space-y-3">
                       <p className="text-[8px] font-black text-slate-400 uppercase">Support Email</p>
                       <input 
                         className="w-full bg-transparent border-none p-0 text-xs font-black text-slate-900 focus:ring-0" 
                         value={portal.support?.email || ''} 
                         onChange={e => updateField('support', { ...portal.support, email: e.target.value })}
                       />
                    </div>
                    <div className="p-6 bg-slate-50 rounded-3xl space-y-3">
                       <p className="text-[8px] font-black text-slate-400 uppercase">Support Phone</p>
                       <input 
                         className="w-full bg-transparent border-none p-0 text-xs font-black text-slate-900 focus:ring-0" 
                         value={portal.support?.phone || ''} 
                         onChange={e => updateField('support', { ...portal.support, phone: e.target.value })}
                       />
                    </div>
                 </div>
              </div>

              <div className="p-8 bg-slate-50 rounded-[40px] border border-slate-100 space-y-4">
                 <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Portal Usage Policies</h4>
                 <textarea 
                   className="w-full bg-white border-none rounded-2xl p-6 text-xs font-medium"
                   placeholder="Enter code of conduct for digital platforms..."
                   value={portal.usageGuidelines?.policy || ''}
                   onChange={e => updateField('usageGuidelines', { ...portal.usageGuidelines, policy: e.target.value })}
                   rows={4}
                 />
              </div>
            </div>
          )}
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
    </div>
  );
};

export default PortalEditor;

