
import React from 'react';
import { Institution, QuickLink, Announcement } from '../../../../types';
import { Plus, Trash2, Link as LinkIcon, Bell, Star } from 'lucide-react';

interface HomepageEditorProps {
  institution: Institution;
  onUpdate: (updatedSections: Institution['sections']) => void;
}

const HomepageEditor: React.FC<HomepageEditorProps> = ({ institution, onUpdate }) => {
  const { homepage } = institution.sections;

  const updateField = (field: string, value: any) => {
    onUpdate({
      ...institution.sections,
      homepage: {
        ...homepage,
        [field]: value
      }
    });
  };

  const updatePrincipalField = (field: string, value: any) => {
    updateField('principalMessage', {
      ...homepage.principalMessage,
      [field]: value
    });
  };

  const addQuickLink = () => {
    const newLinks = [...(homepage.quickLinks || []), { label: 'New Link', url: '#' }];
    updateField('quickLinks', newLinks);
  };

  const removeQuickLink = (index: number) => {
    const newLinks = homepage.quickLinks.filter((_, i) => i !== index);
    updateField('quickLinks', newLinks);
  };

  const updateQuickLink = (index: number, field: keyof QuickLink, value: string) => {
    const newLinks = [...homepage.quickLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    updateField('quickLinks', newLinks);
  };

  const addAnnouncement = () => {
    const newAnn: Announcement = {
      id: `ann-${Date.now()}`,
      title: 'New Announcement',
      date: new Date().toISOString().split('T')[0],
      content: 'Important message for the community...',
      priority: 'Medium',
      isFeatured: false
    };
    updateField('announcements', [...(homepage.announcements || []), newAnn]);
  };

  const removeAnnouncement = (index: number) => {
    const newAnns = homepage.announcements.filter((_, i) => i !== index);
    updateField('announcements', newAnns);
  };

  const updateAnnouncement = (index: number, field: keyof Announcement, value: any) => {
    const newAnns = [...homepage.announcements];
    newAnns[index] = { ...newAnns[index], [field]: value };
    updateField('announcements', newAnns);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-in fade-in slide-in-from-right-4">
      <div className="space-y-10">
        <header>
          <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Homepage Configuration</h3>
          <p className="text-sm text-slate-500 font-medium tracking-tight mt-1">Manage your institution's digital front door</p>
        </header>

        <div className="space-y-12">
          {/* Header & Welcome */}
          <div className="space-y-8">
            <div className="group">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 group-focus-within:text-blue-600 transition-colors">Hero Banner Image URL</label>
              <input 
                className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 font-bold transition-all outline-none" 
                value={homepage.heroBanner} 
                onChange={e => updateField('heroBanner', e.target.value)} 
                placeholder="https://images.unsplash.com/..."
              />
            </div>

            <div className="group">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 group-focus-within:text-blue-600 transition-colors">Welcome Headline</label>
              <textarea 
                rows={2} 
                className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 font-black text-2xl transition-all outline-none resize-none" 
                value={homepage.welcomeMessage} 
                onChange={e => updateField('welcomeMessage', e.target.value)}
                placeholder="Welcome to our vibrant community..."
              />
            </div>
          </div>

          {/* Principal's Message */}
          <div className="p-8 bg-slate-50 rounded-[40px] border border-slate-100 space-y-8">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center text-[10px]">👤</span>
                Principal/Dean Module
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Name & Title</label>
                <input 
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                  value={homepage.principalMessage.name} 
                  onChange={e => updatePrincipalField('name', e.target.value)} 
                  placeholder="e.g. Dr. Phineas Dlamini"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Portrait Photo URL</label>
                <input 
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                  value={homepage.principalMessage.photo} 
                  onChange={e => updatePrincipalField('photo', e.target.value)} 
                  placeholder="https://..."
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Greeting Message</label>
              <textarea 
                rows={4} 
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-medium italic focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none" 
                value={homepage.principalMessage.text} 
                onChange={e => updatePrincipalField('text', e.target.value)} 
                placeholder="Share a vision or a welcome note..."
              />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Digital Shortcuts (Quick Links)</h4>
              <button 
                onClick={addQuickLink}
                className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-1 hover:underline"
              >
                <Plus className="w-3 h-3" /> Add Link
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {(homepage.quickLinks || []).map((link, idx) => (
                <div key={idx} className="flex gap-4 items-center bg-slate-50 p-4 rounded-2xl group border border-transparent hover:border-slate-200 transition-all">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      className="bg-white border text-xs font-bold px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                      value={link.label}
                      onChange={e => updateQuickLink(idx, 'label', e.target.value)}
                      placeholder="Label (e.g. Fees Structure)"
                    />
                    <input 
                      className="bg-white border text-xs font-medium px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                      value={link.url}
                      onChange={e => updateQuickLink(idx, 'url', e.target.value)}
                      placeholder="URL (e.g. #/admissions)"
                    />
                  </div>
                  <button 
                    onClick={() => removeQuickLink(idx)}
                    className="text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Announcements */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Featured Announcements</h4>
              <button 
                onClick={addAnnouncement}
                className="text-[10px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-1 hover:underline"
              >
                <Plus className="w-3 h-3" /> Post Update
              </button>
            </div>
            <div className="space-y-4">
              {(homepage.announcements || []).map((ann, idx) => (
                <div key={ann.id} className="p-6 bg-slate-900 rounded-[32px] text-white space-y-4 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4">
                    <button onClick={() => removeAnnouncement(idx)} className="text-slate-500 hover:text-white transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1 space-y-4">
                      <input 
                        className="bg-transparent border-none p-0 text-lg font-black text-white focus:ring-0 w-full"
                        value={ann.title}
                        onChange={e => updateAnnouncement(idx, 'title', e.target.value)}
                        placeholder="Notice Title"
                      />
                      <div className="flex gap-3">
                        <input 
                          type="date"
                          className="bg-white/10 border-none rounded-lg px-3 py-1 text-[10px] font-bold uppercase text-white focus:ring-0"
                          value={ann.date}
                          onChange={e => updateAnnouncement(idx, 'date', e.target.value)}
                        />
                        <select 
                          className="bg-white/10 border-none rounded-lg px-3 py-1 text-[10px] font-bold uppercase text-white focus:ring-0"
                          value={ann.priority}
                          onChange={e => updateAnnouncement(idx, 'priority', e.target.value as any)}
                        >
                          <option value="Low">Low Priority</option>
                          <option value="Medium">Medium Priority</option>
                          <option value="High">High Priority</option>
                        </select>
                        <button 
                          onClick={() => {
                            // When setting one as featured, we might want to unfeature others or just toggle
                            // For simplicity, let's just toggle
                            updateAnnouncement(idx, 'isFeatured', !ann.isFeatured);
                          }}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase transition-all ${ann.isFeatured ? 'bg-amber-400 text-slate-900' : 'bg-white/10 text-white hover:bg-white/20'}`}
                        >
                          <Star className={`w-3 h-3 ${ann.isFeatured ? 'fill-current' : ''}`} />
                          {ann.isFeatured ? 'Featured' : 'Mark Featured'}
                        </button>
                      </div>
                      <textarea 
                        className="bg-white/5 border-none rounded-2xl w-full p-4 text-xs font-medium text-slate-300 focus:ring-0 focus:bg-white/10 transition-all"
                        rows={3}
                        value={ann.content}
                        onChange={e => updateAnnouncement(idx, 'content', e.target.value)}
                        placeholder="Notice details..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <header>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest tracking-widest">Real-time Preview</h3>
        </header>
        
        <div className="sticky top-8 space-y-8">
          {/* Hero & Announcement Overlay Preview */}
          <div className="relative h-[400px] rounded-[48px] overflow-hidden shadow-2xl">
            <img src={homepage.heroBanner || undefined} className="w-full h-full object-cover" alt="Hero Preview" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent flex flex-col justify-end p-10">
              <div className="max-w-md">
                <h2 className="text-white font-black text-4xl leading-tight mb-6">{homepage.welcomeMessage || 'School Headline'}</h2>
                
                {/* Preview Announcements */}
                {homepage.announcements?.length > 0 && (() => {
                  const featured = homepage.announcements.find((a: Announcement) => a.isFeatured);
                  const displayAnn = featured || homepage.announcements[0];
                  
                  return (
                    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 animate-in fade-in">
                      <div className="flex items-center gap-3 mb-2">
                        {displayAnn.isFeatured ? (
                          <Star className="w-4 h-4 text-amber-400 fill-current" />
                        ) : (
                          <Bell className="w-4 h-4 text-amber-400" />
                        )}
                        <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">
                          {displayAnn.isFeatured ? 'Pinned Update' : 'Latest Update'}
                        </span>
                      </div>
                      <h5 className="text-white font-bold text-sm mb-1">{displayAnn.title}</h5>
                      <p className="text-white/60 text-xs line-clamp-2">{displayAnn.content}</p>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>

          {/* Quick Links Preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(homepage.quickLinks || []).slice(0, 4).map((link, i) => (
              <div key={i} className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <LinkIcon className="w-4 h-4" />
                </div>
                <span className="text-[9px] font-black uppercase text-slate-900 tracking-tight">{link.label}</span>
              </div>
            ))}
          </div>

          {/* Principal Preview */}
          <div className="bg-slate-50 p-10 rounded-[48px] border border-slate-200/50 flex gap-8 items-start">
            <div className="w-32 h-40 rounded-3xl overflow-hidden shrink-0 shadow-2xl rotate-2">
              <img src={homepage.principalMessage.photo || undefined} className="w-full h-full object-cover" alt="Principal" />
            </div>
            <div className="space-y-4">
              <div className="w-16 h-1.5 bg-blue-600 rounded-full" />
              <p className="text-slate-600 font-medium italic text-sm leading-relaxed">"{homepage.principalMessage.text || 'Welcome message...'}"</p>
              <div>
                <p className="text-slate-900 font-black text-xs uppercase tracking-widest">{homepage.principalMessage.name || 'Principal Name'}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Head of Institution</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageEditor;
