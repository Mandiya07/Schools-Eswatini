
import React, { useState, useRef } from 'react';
import { Institution, User, Region, SubscriptionPlan, AcademicDepartment, AcademicProgram, BannerAd as BannerAdType, BlogPost, EventItem } from '../types';
import { GoogleGenAI } from "@google/genai";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';
import SubscriptionPlans from '../src/components/SubscriptionPlans';
import { Search, Globe, Share2, Award, Zap, Shield, Star, Layout, CreditCard, Lock, CheckCircle, AlertCircle, Sparkles, TrendingUp, Image as ImageIcon, Eye, Users, FileText, ClipboardList, Package, QrCode, Trash2, Plus, Calendar, Stethoscope, GraduationCap, Send, Bus, BarChart2, Megaphone, Newspaper, MapPin, Tag, Image as GalleryIcon, DollarSign, Download, ExternalLink } from 'lucide-react';
import AIContentAssistant from '../src/components/AIContentAssistant';
import MonetizationHub from '../src/components/dashboard/sections/MonetizationHub';
import SectionManager from '../src/components/dashboard/sections/SectionManager';
import MediaManager from '../src/components/MediaManager';
import { useWorkflow } from '../src/context/WorkflowContext';

interface InstitutionAdminDashboardProps {
  user: User;
  institutions: Institution[];
  onUpdate: (inst: Institution) => void;
  onAdd: (inst: Institution) => void;
}

const InstitutionAdminDashboard: React.FC<InstitutionAdminDashboardProps> = ({ user, institutions, onUpdate, onAdd }) => {
  const inst = institutions.find(i => i.id === (user.institutionId || institutions.find(i => i.adminId === user.id)?.id));
  const { tasks, notifications, markNotificationAsRead } = useWorkflow();
  const [activeTab, setActiveTab] = useState<'identity' | 'theme' | 'sections' | 'media' | 'seo' | 'plan' | 'security' | 'analytics' | 'compliance' | 'academic' | 'finance' | 'ai' | 'workflows' | 'staff' | 'inventory' | 'timetabling' | 'health' | 'alumni' | 'logistics' | 'benchmarking' | 'marketing' | 'news' | 'monetization' | 'applications'>('identity');
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const logoInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  if (!inst) return <div className="p-24 text-center font-black text-slate-300">Portal starting...</div>;

  const handleUpdate = (updatedInst: Institution) => onUpdate(updatedInst);

  const updateSectionField = (section: keyof Institution['sections'], field: string, value: any) => {
    const updatedSections = {
      ...inst.sections,
      [section]: {
        ...inst.sections[section],
        [field]: value
      }
    };
    handleUpdate({ ...inst, sections: updatedSections });
  };

  const updateAcademicField = (field: string, value: any) => {
    const updatedAcademics = {
      ...inst.sections.academics,
      [field]: value
    };
    updateSectionField('academics', field, updatedAcademics[field]);
  };

  const updateAboutField = (field: string, value: any) => {
    const updatedAbout = {
      ...inst.sections.about,
      [field]: value
    };
    updateSectionField('about', field, updatedAbout[field]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'cover') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleUpdate({ 
          ...inst, 
          [type === 'logo' ? 'logo' : 'coverImage']: reader.result as string 
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVerificationDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleUpdate({ 
          ...inst, 
          verificationDocuments: [...(inst.verificationDocuments || []), reader.result as string],
          verificationStatus: 'pending'
        });
      };
      reader.readAsDataURL(file);
    } else if (file) {
      alert("Please upload a PDF document.");
    }
  };

  const tabs = [
    { id: 'identity', label: 'Identity', icon: '🆔' },
    { id: 'theme', label: 'Appearance', icon: '✨' },
    { id: 'sections', label: 'Site Modules', icon: '🎨' },
    { id: 'media', label: 'Media Manager', icon: <ImageIcon className="w-5 h-5" /> },
    { id: 'academic', label: 'Academic Tools', icon: '📅' },
    { id: 'timetabling', label: 'AI Timetable', icon: <Calendar className="w-5 h-5" /> },
    { id: 'staff', label: 'Staff Room', icon: <Users className="w-5 h-5" /> },
    { id: 'inventory', label: 'Inventory', icon: <Package className="w-5 h-5" /> },
    { id: 'health', label: 'Wellness Ledger', icon: <Stethoscope className="w-5 h-5" /> },
    { id: 'logistics', label: 'Trip Planner', icon: <Bus className="w-5 h-5" /> },
    { id: 'benchmarking', label: 'Peer Benchmarking', icon: <BarChart2 className="w-5 h-5" /> },
    { id: 'alumni', label: 'Alumni Portal', icon: <GraduationCap className="w-5 h-5" /> },
    { id: 'news', label: 'News & Media', icon: <Newspaper className="w-5 h-5" /> },
    { id: 'marketing', label: 'Marketing Hub', icon: <Megaphone className="w-5 h-5" /> },
    { id: 'finance', label: 'Finance Hub', icon: '💳' },
    { id: 'seo', label: 'SEO Engine', icon: <Search className="w-5 h-5" /> },
    { id: 'ai', label: 'AI Assistant', icon: <Sparkles className="w-5 h-5" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart className="w-5 h-5" /> },
    { id: 'workflows', label: 'Workflows', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'compliance', label: 'MoET Compliance', icon: <ClipboardList className="w-5 h-5" /> },
    { id: 'monetization', label: 'Revenue & Billing', icon: <DollarSign className="w-5 h-5 text-emerald-500" /> },
    { id: 'applications', label: 'Applications', icon: <FileText className="w-5 h-5" /> },
    { id: 'security', label: 'Security', icon: <Lock className="w-5 h-5" /> }
  ];


  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
         <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-3xl shadow-xl border p-2 bg-white flex items-center justify-center overflow-hidden">
               <img src={inst.logo || undefined} className="w-full h-full object-contain" />
            </div>
            <div>
               <h1 className="text-4xl font-black text-slate-900 tracking-tight">{inst.name}</h1>
               <div className="flex items-center gap-3 mt-1">
                  <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${inst.plan === SubscriptionPlan.FREE ? 'bg-slate-100' : 'bg-blue-600 text-white'}`}>{inst.plan} Plan</span>
                  <span className="px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-700">Verified</span>
               </div>
            </div>
         </div>
         <div className="flex gap-4 items-center">
           <div className="relative">
             <button onClick={() => setActiveTab('workflows')} className="w-12 h-12 bg-white rounded-full shadow-sm border border-slate-100 flex items-center justify-center text-slate-600 hover:text-indigo-600 transition-colors">
               <AlertCircle className="w-5 h-5" />
               {notifications.filter(n => !n.isRead).length > 0 && (
                 <span className="absolute top-0 right-0 w-4 h-4 bg-rose-500 text-white rounded-full text-[8px] font-black flex items-center justify-center border-2 border-white">
                   {notifications.filter(n => !n.isRead).length}
                 </span>
               )}
             </button>
           </div>
           <button 
             onClick={() => setShowPreview(true)}
             className="bg-white border px-6 py-4 rounded-3xl font-black uppercase tracking-widest text-[10px] shadow-sm flex items-center gap-2"
           >
             <Eye className="w-4 h-4" />
             Preview Page
           </button>
           <button 
             onClick={() => handleUpdate(inst)}
             className="bg-slate-900 text-white px-8 py-4 rounded-3xl font-black uppercase tracking-widest text-[10px] shadow-2xl hover:bg-blue-600 transition-all"
           >
             Publish Changes
           </button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
         <aside className="lg:col-span-1 space-y-2">
            {tabs.map(t => (
               <button 
                 key={t.id} 
                 onClick={() => setActiveTab(t.id as any)}
                 className={`w-full flex items-center p-5 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all ${activeTab === t.id ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-500 hover:bg-slate-100'}`}
               >
                  <span className="text-xl mr-4">{t.icon}</span>
                  {t.label}
               </button>
            ))}
         </aside>

         <div className="lg:col-span-3">
            {activeTab === 'identity' && (
              <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-12 animate-in fade-in">
                <section>
                  <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">🏛 Registry Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Institution Name</label>
                      <input className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 font-bold" value={inst.name} onChange={e => handleUpdate({ ...inst, name: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">MoET Registration No.</label>
                      <input className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 font-bold" value={inst.moetRegistration} onChange={e => handleUpdate({ ...inst, moetRegistration: e.target.value })} />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Custom Subdomain</label>
                      <div className="flex items-center">
                        <input 
                          className="w-full bg-slate-50 border-none rounded-l-xl px-4 py-3 font-bold" 
                          placeholder="e.g. stmarks"
                          value={inst.subdomain || ''} 
                          onChange={e => handleUpdate({ ...inst, subdomain: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })} 
                        />
                        <div className="bg-slate-200 text-slate-500 px-4 py-3 rounded-r-xl font-bold border-l border-slate-300">
                          .schoolsswz.com
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-2">Only lowercase letters, numbers, and hyphens allowed.</p>
                    </div>
                  </div>
                </section>
                
                <section>
                  <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">🌐 Social Media Links</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Facebook URL</label>
                      <input className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 font-bold" value={inst.contact.facebook || ''} onChange={e => handleUpdate({ ...inst, contact: { ...inst.contact, facebook: e.target.value } })} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Twitter/X URL</label>
                      <input className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 font-bold" value={inst.contact.twitter || ''} onChange={e => handleUpdate({ ...inst, contact: { ...inst.contact, twitter: e.target.value } })} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">LinkedIn URL</label>
                      <input className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 font-bold" value={inst.contact.linkedin || ''} onChange={e => handleUpdate({ ...inst, contact: { ...inst.contact, linkedin: e.target.value } })} />
                    </div>
                  </div>
                </section>
                
                <section>
                  <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">🖼 Brand Assets</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Official Logo (URL)</label>
                      <input className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 font-bold" value={inst.logo} onChange={e => handleUpdate({ ...inst, logo: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Cover Photo (URL)</label>
                      <input className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 font-bold" value={inst.coverImage} onChange={e => handleUpdate({ ...inst, coverImage: e.target.value })} />
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">👨‍👩‍👧‍👦 Parent/Guardian Liaison</h3>
                  <p className="text-sm text-slate-500 mb-6 font-medium leading-relaxed">Set the primary administrative contact for parent-school coordination. This person will receive automated MoET registration alerts and fee notification copies.</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Representative Name</label>
                      <input 
                        className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 font-bold" 
                        placeholder="e.g. Sipho Magagula"
                        value={inst.parentContact?.name || ''} 
                        onChange={e => handleUpdate({ ...inst, parentContact: { ...(inst.parentContact || { email: '', phone: '' }), name: e.target.value } })} 
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Official Email</label>
                      <input 
                        type="email"
                        className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 font-bold" 
                        placeholder="parents@school.ac.sz"
                        value={inst.parentContact?.email || ''} 
                        onChange={e => handleUpdate({ ...inst, parentContact: { ...(inst.parentContact || { name: '', phone: '' }), email: e.target.value } })} 
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Direct Phone</label>
                      <input 
                        className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 font-bold" 
                        placeholder="+268 7600 0000"
                        value={inst.parentContact?.phone || ''} 
                        onChange={e => handleUpdate({ ...inst, parentContact: { ...(inst.parentContact || { name: '', email: '' }), phone: e.target.value } })} 
                      />
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">📜 Verification Documents</h3>
                  <p className="text-sm text-slate-500 mb-6 font-medium leading-relaxed">Upload official MoET registration certificates, tax clearances, or compliance documents to maintain verified status. Only PDF files are supported.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div>
                       <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Upload Document (PDF)</label>
                       <div className="flex items-center gap-4">
                         <label className="bg-slate-900 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest cursor-pointer hover:bg-slate-800 transition-colors flex items-center gap-2">
                           <Shield className="w-4 h-4" />
                           Select PDF
                           <input type="file" accept="application/pdf" className="hidden" onChange={handleVerificationDocUpload} />
                         </label>
                         <span className="text-xs font-bold text-slate-400">
                           Status: <span className={inst.verificationStatus === 'verified' ? 'text-emerald-500' : inst.verificationStatus === 'rejected' ? 'text-rose-500' : 'text-amber-500'}>{inst.verificationStatus?.toUpperCase() || 'REQUIRED'}</span>
                         </span>
                       </div>
                     </div>
                     <div>
                       <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Attached Documents</label>
                       {inst.verificationDocuments && inst.verificationDocuments.length > 0 ? (
                         <div className="bg-slate-50 rounded-2xl p-4 space-y-3">
                           {inst.verificationDocuments.map((doc, idx) => (
                             <div key={idx} className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                               <div className="flex items-center gap-3">
                                 <FileText className="w-4 h-4 text-rose-500" />
                                 <span className="text-xs font-bold text-slate-700">Document_{idx+1}.pdf</span>
                               </div>
                               <button 
                                 onClick={() => {
                                   const newDocs = [...inst.verificationDocuments!];
                                   newDocs.splice(idx, 1);
                                   handleUpdate({ ...inst, verificationDocuments: newDocs });
                                 }}
                                 className="text-slate-400 hover:text-rose-500 transition-colors"
                               >
                                 <Trash2 className="w-4 h-4" />
                               </button>
                             </div>
                           ))}
                         </div>
                       ) : (
                         <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                            <Shield className="w-8 h-8 text-slate-300 mb-2" />
                            <p className="text-xs font-bold text-slate-400">No documents uploaded</p>
                         </div>
                       )}
                     </div>
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'theme' && (
              <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-12 animate-in fade-in">
                <section>
                  <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">✨ Theme Customization</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Primary Color</label>
                      <div className="flex items-center gap-4">
                        <input 
                          type="color" 
                          className="w-12 h-12 rounded-xl cursor-pointer border-none p-0" 
                          value={inst.theme.primaryColor} 
                          onChange={e => handleUpdate({ ...inst, theme: { ...inst.theme, primaryColor: e.target.value } })} 
                        />
                        <input 
                          type="text" 
                          className="flex-1 bg-slate-50 border-none rounded-xl px-4 py-3 font-bold uppercase" 
                          value={inst.theme.primaryColor} 
                          onChange={e => handleUpdate({ ...inst, theme: { ...inst.theme, primaryColor: e.target.value } })} 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Typography (Font Family)</label>
                      <select 
                        className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 font-bold appearance-none cursor-pointer"
                        value={inst.theme.fontFamily}
                        onChange={e => handleUpdate({ ...inst, theme: { ...inst.theme, fontFamily: e.target.value } })}
                      >
                        <option value="Inter">Inter (Clean & Modern)</option>
                        <option value="Playfair Display">Playfair Display (Elegant & Traditional)</option>
                        <option value="Space Grotesk">Space Grotesk (Tech & Forward-thinking)</option>
                        <option value="Outfit">Outfit (Friendly & Accessible)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Layout Style</label>
                      <select 
                        className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 font-bold appearance-none cursor-pointer"
                        value={inst.theme.layout}
                        onChange={e => handleUpdate({ ...inst, theme: { ...inst.theme, layout: e.target.value } })}
                      >
                        <option value="modern">Modern (Spacious & Clean)</option>
                        <option value="classic">Classic (Traditional & Structured)</option>
                        <option value="bold">Bold (High Contrast & Impactful)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Border Radius</label>
                      <select 
                        className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 font-bold appearance-none cursor-pointer"
                        value={inst.theme.borderRadius}
                        onChange={e => handleUpdate({ ...inst, theme: { ...inst.theme, borderRadius: e.target.value } })}
                      >
                        <option value="none">Sharp (0px)</option>
                        <option value="md">Subtle (6px)</option>
                        <option value="2xl">Rounded (16px)</option>
                        <option value="full">Pill (9999px)</option>
                      </select>
                    </div>
                  </div>
                </section>
                
                <section>
                  <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">🔄 Section Ordering</h3>
                  <p className="text-sm text-slate-500 mb-6">Drag and drop to reorder how sections appear on your institution's profile page.</p>
                  <div className="space-y-2">
                    {(inst.theme.sectionOrder || ['homepage', 'about', 'admissions', 'academics', 'news', 'studentLife', 'portal']).map((section, index, array) => (
                      <div key={section} className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-4">
                          <span className="text-slate-400 cursor-grab">⋮⋮</span>
                          <span className="font-bold text-slate-700 capitalize">{section.replace(/([A-Z])/g, ' $1').trim()}</span>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            disabled={index === 0}
                            onClick={() => {
                              const newOrder = [...array];
                              [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
                              handleUpdate({ ...inst, theme: { ...inst.theme, sectionOrder: newOrder } });
                            }}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-30"
                          >
                            ↑
                          </button>
                          <button 
                            disabled={index === array.length - 1}
                            onClick={() => {
                              const newOrder = [...array];
                              [newOrder[index + 1], newOrder[index]] = [newOrder[index], newOrder[index + 1]];
                              handleUpdate({ ...inst, theme: { ...inst.theme, sectionOrder: newOrder } });
                            }}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-30"
                          >
                            ↓
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'sections' && (
              <SectionManager 
                institution={inst} 
                onUpdate={(updatedSections) => handleUpdate({ ...inst, sections: updatedSections })} 
              />
            )}
            {activeTab === 'media' && (
              <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm animate-in fade-in">
                <MediaManager institution={inst} onUpdate={handleUpdate} />
              </div>
            )}

            {activeTab === 'academic' && (
              <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-12 animate-in fade-in">
                <section>
                  <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">📅 Academic Management Tools</h3>
                  <p className="text-sm text-slate-500 mb-8">Enable or disable advanced academic tools for your institution.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { key: 'timetableEnabled', label: 'Timetable Generator', desc: 'Automatically generate and manage class schedules.' },
                      { key: 'onlineExamsEnabled', label: 'Online Exam System', desc: 'Conduct secure online assessments and quizzes.' },
                      { key: 'digitalReportsEnabled', label: 'Digital Report Cards', desc: 'Generate and distribute student performance reports digitally.' },
                      { key: 'attendanceTrackingEnabled', label: 'Attendance Tracking', desc: 'Monitor student attendance in real-time.' },
                      { key: 'homeworkTrackerEnabled', label: 'Homework Tracker', desc: 'Assign and track student homework and assignments.' },
                      { key: 'parentTeacherBookingEnabled', label: 'Parent-Teacher Booking', desc: 'Allow parents to schedule meetings with teachers.' }
                    ].map(tool => (
                      <div key={tool.key} className="flex items-start gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                        <input 
                          type="checkbox" 
                          className="mt-1 w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                          checked={inst.academicTools?.[tool.key as keyof typeof inst.academicTools] || false}
                          onChange={e => handleUpdate({ 
                            ...inst, 
                            academicTools: { 
                              ...(inst.academicTools || {
                                timetableEnabled: false,
                                onlineExamsEnabled: false,
                                digitalReportsEnabled: false,
                                attendanceTrackingEnabled: false,
                                homeworkTrackerEnabled: false,
                                parentTeacherBookingEnabled: false
                              }), 
                              [tool.key]: e.target.checked 
                            } 
                          })}
                        />
                        <div>
                          <h4 className="font-bold text-slate-900">{tool.label}</h4>
                          <p className="text-xs text-slate-500 mt-1">{tool.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'staff' && (
              <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-12 animate-in fade-in">
                <section>
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">👩‍🏫 Digital Staff Room</h3>
                      <p className="text-sm text-slate-500 mt-1">Manage TSC-posted and private teachers, track loads and subjects.</p>
                    </div>
                    <button 
                      onClick={() => {
                        const newMember = {
                          id: `staff-${Date.now()}`,
                          name: 'New Teacher',
                          email: '',
                          type: 'Private' as const,
                          role: 'Teacher',
                          weeklyHours: 18,
                          subjects: []
                        };
                        const updatedMembers = [...(inst.administrativeDetails?.staffManagement.members || []), newMember];
                        handleUpdate({
                          ...inst,
                          administrativeDetails: {
                            ...inst.administrativeDetails!,
                            staffManagement: { members: updatedMembers }
                          }
                        });
                      }}
                      className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" /> Add Staff Member
                    </button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-slate-100">
                          <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Name & Email</th>
                          <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                          <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Load (Hrs)</th>
                          <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Subjects</th>
                          <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {(inst.administrativeDetails?.staffManagement.members || []).map((member, idx) => (
                          <tr key={member.id} className="group">
                            <td className="py-6">
                              <input 
                                className="block font-bold text-slate-900 bg-transparent border-none p-0 focus:ring-0 mb-1" 
                                value={member.name} 
                                onChange={e => {
                                  const members = [...inst.administrativeDetails!.staffManagement.members];
                                  members[idx].name = e.target.value;
                                  handleUpdate({ ...inst, administrativeDetails: { ...inst.administrativeDetails!, staffManagement: { members } } });
                                }}
                              />
                              <input 
                                className="block text-xs text-slate-500 bg-transparent border-none p-0 focus:ring-0" 
                                value={member.email} 
                                onChange={e => {
                                  const members = [...inst.administrativeDetails!.staffManagement.members];
                                  members[idx].email = e.target.value;
                                  handleUpdate({ ...inst, administrativeDetails: { ...inst.administrativeDetails!, staffManagement: { members } } });
                                }}
                                placeholder="email@example.com"
                              />
                            </td>
                            <td className="py-6">
                              <select 
                                className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-lg border-none ${member.type === 'TSC' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-700'}`}
                                value={member.type}
                                onChange={e => {
                                  const members = [...inst.administrativeDetails!.staffManagement.members];
                                  members[idx].type = e.target.value as any;
                                  handleUpdate({ ...inst, administrativeDetails: { ...inst.administrativeDetails!, staffManagement: { members } } });
                                }}
                              >
                                <option value="TSC">TSC Posted</option>
                                <option value="Private">Private</option>
                              </select>
                            </td>
                            <td className="py-6">
                              <div className="flex items-center gap-3">
                                <input 
                                  type="number" 
                                  className="w-12 bg-slate-50 border-none rounded-lg px-2 py-1 text-xs font-bold" 
                                  value={member.weeklyHours}
                                  onChange={e => {
                                    const members = [...inst.administrativeDetails!.staffManagement.members];
                                    members[idx].weeklyHours = Number(e.target.value);
                                    handleUpdate({ ...inst, administrativeDetails: { ...inst.administrativeDetails!, staffManagement: { members } } });
                                  }}
                                />
                                <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full ${member.weeklyHours > 24 ? 'bg-rose-500' : member.weeklyHours > 20 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                                    style={{ width: `${Math.min((member.weeklyHours / 30) * 100, 100)}%` }} 
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="py-6">
                              <input 
                                className="w-full text-xs text-slate-500 bg-transparent border-none p-0 focus:ring-0" 
                                value={member.subjects.join(', ')} 
                                onChange={e => {
                                  const members = [...inst.administrativeDetails!.staffManagement.members];
                                  members[idx].subjects = e.target.value.split(',').map(s => s.trim());
                                  handleUpdate({ ...inst, administrativeDetails: { ...inst.administrativeDetails!, staffManagement: { members } } });
                                }}
                                placeholder="Math, Physics..."
                              />
                            </td>
                            <td className="py-6">
                              <button 
                                onClick={() => {
                                  const members = inst.administrativeDetails!.staffManagement.members.filter(m => m.id !== member.id);
                                  handleUpdate({ ...inst, administrativeDetails: { ...inst.administrativeDetails!, staffManagement: { members } } });
                                }}
                                className="text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {(!inst.administrativeDetails?.staffManagement.members || inst.administrativeDetails.staffManagement.members.length === 0) && (
                    <div className="text-center py-12 bg-slate-50 rounded-[32px] border border-dashed border-slate-200">
                      <Users className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                      <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">No staff members recorded yet.</p>
                    </div>
                  )}
                </section>
              </div>
            )}

            {activeTab === 'inventory' && (
              <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-12 animate-in fade-in">
                <section>
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">📦 Asset & Textbook Management</h3>
                      <p className="text-sm text-slate-500 mt-1">Track textbook issuance and school physical assets.</p>
                    </div>
                    <div className="flex gap-4">
                      <button className="bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-2">
                        <QrCode className="w-4 h-4" /> Scanner Mode
                      </button>
                      <button 
                         onClick={() => {
                           const newBook = {
                             id: `book-${Date.now()}`,
                             title: 'New Textbook',
                             subject: 'General',
                             grade: 'Form 1',
                             totalStock: 50,
                             issuedCount: 0,
                             barcodeRange: '000-000'
                           };
                           const updatedBooks = [...(inst.administrativeDetails?.inventory.textbooks || []), newBook];
                           handleUpdate({
                             ...inst,
                             administrativeDetails: {
                               ...inst.administrativeDetails!,
                               inventory: {
                                 ...(inst.administrativeDetails?.inventory || { assets: [] }),
                                 textbooks: updatedBooks
                               }
                             }
                           });
                         }}
                        className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-2"
                      >
                         <Plus className="w-4 h-4" /> Add Item
                      </button>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {(inst.administrativeDetails?.inventory.textbooks || []).map((book, idx) => (
                        <div key={book.id} className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 hover:border-blue-200 transition-all group">
                          <div className="flex justify-between items-start mb-6">
                            <div>
                              <input 
                                className="block text-lg font-black text-slate-900 bg-transparent border-none p-0 focus:ring-0 mb-1" 
                                value={book.title}
                                onChange={e => {
                                  const textbooks = [...inst.administrativeDetails!.inventory.textbooks];
                                  textbooks[idx].title = e.target.value;
                                  handleUpdate({ ...inst, administrativeDetails: { ...inst.administrativeDetails!, inventory: { ...inst.administrativeDetails!.inventory, textbooks } } });
                                }}
                              />
                              <div className="flex items-center gap-3">
                                <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-lg uppercase tracking-widest">{book.subject}</span>
                                <span className="text-[10px] font-black text-slate-500 bg-slate-200 px-2 py-1 rounded-lg uppercase tracking-widest">{book.grade}</span>
                              </div>
                            </div>
                            <button 
                              onClick={() => {
                                const textbooks = inst.administrativeDetails!.inventory.textbooks.filter(b => b.id !== book.id);
                                handleUpdate({ ...inst, administrativeDetails: { ...inst.administrativeDetails!, inventory: { ...inst.administrativeDetails!.inventory, textbooks } } });
                              }}
                              className="text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
                            >
                               <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Stock Issue Rate</span>
                            <span className="text-xs font-black text-slate-900">{Math.round((book.issuedCount / book.totalStock) * 100)}%</span>
                          </div>
                          
                          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-6">
                            <div 
                              className={`h-full ${book.issuedCount > book.totalStock * 0.9 ? 'bg-rose-500' : 'bg-blue-600'}`} 
                              style={{ width: `${(book.issuedCount / book.totalStock) * 100}%` }} 
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Stock</label>
                              <input 
                                type="number"
                                className="w-full bg-white border border-slate-100 rounded-xl px-3 py-2 text-xs font-bold" 
                                value={book.totalStock}
                                onChange={e => {
                                  const textbooks = [...inst.administrativeDetails!.inventory.textbooks];
                                  textbooks[idx].totalStock = Number(e.target.value);
                                  handleUpdate({ ...inst, administrativeDetails: { ...inst.administrativeDetails!, inventory: { ...inst.administrativeDetails!.inventory, textbooks } } });
                                }}
                              />
                            </div>
                            <div>
                              <label className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Issued</label>
                              <input 
                                type="number"
                                className="w-full bg-white border border-slate-100 rounded-xl px-3 py-2 text-xs font-bold" 
                                value={book.issuedCount}
                                onChange={e => {
                                  const textbooks = [...inst.administrativeDetails!.inventory.textbooks];
                                  textbooks[idx].issuedCount = Number(e.target.value);
                                  handleUpdate({ ...inst, administrativeDetails: { ...inst.administrativeDetails!, inventory: { ...inst.administrativeDetails!.inventory, textbooks } } });
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {(!inst.administrativeDetails?.inventory.textbooks || inst.administrativeDetails.inventory.textbooks.length === 0) && (
                      <div className="text-center py-12 bg-slate-50 rounded-[32px] border border-dashed border-slate-200">
                        <Package className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">No inventory items recorded yet.</p>
                      </div>
                    )}
                  </div>
                </section>
              </div>
            )}
            {activeTab === 'finance' && (
              <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-12 animate-in fade-in">
                <section>
                  <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">💳 Payment & Finance Tools</h3>
                  
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                        <input 
                          type="checkbox" 
                          className="mt-1 w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                          checked={inst.finance?.onlinePaymentsEnabled || false}
                          onChange={e => handleUpdate({ 
                            ...inst, 
                            finance: { ...(inst.finance || { mobileMoneyEnabled: false, onlinePaymentsEnabled: false }), onlinePaymentsEnabled: e.target.checked } 
                          })}
                        />
                        <div>
                          <h4 className="font-bold text-slate-900">Enable Online Payments</h4>
                          <p className="text-xs text-slate-500 mt-1">Accept credit/debit card payments via the portal.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                        <input 
                          type="checkbox" 
                          className="mt-1 w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                          checked={inst.finance?.mobileMoneyEnabled || false}
                          onChange={e => handleUpdate({ 
                            ...inst, 
                            finance: { ...(inst.finance || { mobileMoneyEnabled: false, onlinePaymentsEnabled: false }), mobileMoneyEnabled: e.target.checked } 
                          })}
                        />
                        <div>
                          <h4 className="font-bold text-slate-900">Enable Mobile Money</h4>
                          <p className="text-xs text-slate-500 mt-1">Accept MTN MoMo and Eswatini Mobile eMali.</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Bank Details (For EFTs)</label>
                      <textarea 
                        rows={3} 
                        className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 font-medium" 
                        placeholder="e.g. Standard Bank Swaziland, Account: 123456789, Branch: Mbabane"
                        value={inst.finance?.bankDetails || ''} 
                        onChange={e => handleUpdate({ ...inst, finance: { ...(inst.finance || { mobileMoneyEnabled: false, onlinePaymentsEnabled: false }), bankDetails: e.target.value } })} 
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Application Fee (SZL)</label>
                        <input 
                          type="number" 
                          className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 font-bold" 
                          value={inst.finance?.applicationFee || ''} 
                          onChange={e => handleUpdate({ ...inst, finance: { ...(inst.finance || { mobileMoneyEnabled: false, onlinePaymentsEnabled: false }), applicationFee: Number(e.target.value) } })} 
                        />
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'seo' && (
              <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-12 animate-in fade-in">
                <section>
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">📈 SEO Optimization Engine</h3>
                    <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-2xl">
                      <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">SEO Health Score</span>
                      <span className="text-lg font-black text-blue-600">{inst.seoScore || 0}%</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Meta Title</label>
                      <input 
                        className="w-full bg-white border rounded-xl px-4 py-3 font-bold" 
                        value={inst.seo.title} 
                        onChange={e => handleUpdate({ ...inst, seo: { ...inst.seo, title: e.target.value } })} 
                      />
                      <p className="text-[10px] text-slate-400 mt-2">Recommended: 50-60 characters. Current: {inst.seo.title.length}</p>
                    </div>
                    <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Meta Description</label>
                      <textarea 
                        rows={3}
                        className="w-full bg-white border rounded-xl px-4 py-3 font-medium" 
                        value={inst.seo.description} 
                        onChange={e => handleUpdate({ ...inst, seo: { ...inst.seo, description: e.target.value } })} 
                      />
                      <p className="text-[10px] text-slate-400 mt-2">Recommended: 150-160 characters. Current: {inst.seo.description.length}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-sm font-black text-slate-900">SEO Checklist</h4>
                    <div className="space-y-4">
                      {[
                        { label: 'Custom Subdomain Configured', status: !!inst.subdomain },
                        { label: 'Meta Description Length Optimal', status: inst.seo.description.length >= 120 && inst.seo.description.length <= 160 },
                        { label: 'Keywords Defined', status: inst.seo.keywords.length >= 3 },
                        { label: 'Verified Institution Badge', status: inst.isVerified },
                        { label: 'Structured Schema Markup Active', status: true },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                          <span className="text-xs font-bold text-slate-700">{item.label}</span>
                          {item.status ? (
                            <CheckCircle className="w-5 h-5 text-emerald-500" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-amber-500" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'monetization' && (
              <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-12 animate-in fade-in">
                <MonetizationHub 
                   institution={inst} 
                   onUpdate={updatedMonetization => handleUpdate({ ...inst, monetization: updatedMonetization })}
                   onPlanUpdate={plan => handleUpdate({ ...inst, plan })}
                />
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-12 animate-in fade-in">
                <section>
                  <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">📊 Performance Analytics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Page Views</p>
                      <p className="text-3xl font-black text-slate-900">{inst.stats.views.toLocaleString()}</p>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Applications Started</p>
                      <p className="text-3xl font-black text-slate-900">{inst.stats.applications.toLocaleString()}</p>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Conversion Rate</p>
                      <p className="text-3xl font-black text-slate-900">{((inst.stats.applications / Math.max(inst.stats.views, 1)) * 100).toFixed(1)}%</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                      <h4 className="text-sm font-black text-slate-900 mb-6">Page Views (Last 7 Days)</h4>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                          <LineChart data={[
                            { name: 'Mon', views: 120 }, { name: 'Tue', views: 200 },
                            { name: 'Wed', views: 150 }, { name: 'Thu', views: 300 },
                            { name: 'Fri', views: 250 }, { name: 'Sat', views: 400 },
                            { name: 'Sun', views: 350 }
                          ]}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                            <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                            <Line type="monotone" dataKey="views" stroke="#2563eb" strokeWidth={3} dot={{ r: 4, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                      <h4 className="text-sm font-black text-slate-900 mb-6">Visitor Locations</h4>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                          <BarChart data={[
                            { name: 'Hhohho', visitors: 450 }, { name: 'Manzini', visitors: 320 },
                            { name: 'Lubombo', visitors: 150 }, { name: 'Shiselweni', visitors: 80 }
                          ]} layout="vertical" margin={{ left: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                            <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                            <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 'bold' }} />
                            <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                            <Bar dataKey="visitors" fill="#3b82f6" radius={[0, 8, 8, 0]} barSize={24} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'ai' && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <header>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">AI Content Assistant</h2>
                  <p className="text-slate-500 font-medium mt-1">Leverage Gemini AI to craft professional school content</p>
                </header>
                <AIContentAssistant institutionName={inst.name} />
              </div>
            )}

            {activeTab === 'workflows' && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <header>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Automated Workflows</h2>
                  <p className="text-slate-500 font-medium mt-1">Manage automated alerts, document reminders, and inquiry follow-ups</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { label: 'Pending Inquiries', value: '12', color: 'text-indigo-600', bg: 'bg-indigo-50' },
                    { label: 'Expiring Documents', value: '2', color: 'text-rose-600', bg: 'bg-rose-50' },
                    { label: 'Application Reviews', value: '8', color: 'text-emerald-600', bg: 'bg-emerald-50' }
                  ].map((stat, idx) => (
                    <div key={idx} className={`${stat.bg} p-8 rounded-[32px] border border-white shadow-sm`}>
                      <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">{stat.label}</p>
                      <p className={`text-4xl font-black ${stat.color}`}>{stat.value}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
                  <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">Active Workflow Tasks</h3>
                    <button className="text-xs font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-700">Refresh Tasks</button>
                  </div>
                  <div className="divide-y divide-slate-50">
                    {tasks.map((task) => (
                      <div key={task.id} className="p-8 flex items-center justify-between hover:bg-slate-50/50 transition-all group">
                        <div className="flex items-center gap-6">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${
                            task.type === 'warning' ? 'bg-rose-100 text-rose-600' : 
                            task.type === 'info' ? 'bg-indigo-100 text-indigo-600' : 'bg-emerald-100 text-emerald-600'
                          }`}>
                            {task.type === 'warning' ? '⚠️' : task.type === 'info' ? '📧' : '📋'}
                          </div>
                          <div>
                            <h4 className="font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{task.title}</h4>
                            <p className="text-sm text-slate-500 font-medium">{task.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-black text-slate-900">{task.dueDate}</p>
                          <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg mt-2 inline-block ${
                            task.status === 'New' ? 'bg-indigo-50 text-indigo-600' : 
                            task.status === 'Pending' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
                          }`}>
                            {task.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden mt-8">
                  <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">Recent Notifications</h3>
                  </div>
                  <div className="divide-y divide-slate-50">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center text-slate-500 font-medium">No new notifications.</div>
                    ) : (
                      notifications.map((notif) => (
                        <div key={notif.id} className={`p-8 flex items-center justify-between transition-all group ${!notif.isRead ? 'bg-indigo-50/30' : 'hover:bg-slate-50/50'}`}>
                          <div className="flex items-center gap-6">
                            <div className={`w-2 h-2 rounded-full ${!notif.isRead ? 'bg-indigo-600' : 'bg-transparent'}`} />
                            <div>
                              <h4 className={`font-black transition-colors ${!notif.isRead ? 'text-indigo-900' : 'text-slate-900 group-hover:text-indigo-600'}`}>{notif.title}</h4>
                              <p className="text-sm text-slate-500 font-medium">{notif.message}</p>
                            </div>
                          </div>
                          <div className="text-right flex flex-col items-end gap-2">
                            <p className="text-xs font-black text-slate-400">{new Date(notif.createdAt).toLocaleDateString()}</p>
                            {!notif.isRead && (
                              <button 
                                onClick={() => markNotificationAsRead(notif.id)}
                                className="text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-800"
                              >
                                Mark as Read
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="bg-slate-900 rounded-[40px] p-12 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-12 opacity-10 text-9xl">🔔</div>
                  <div className="relative z-10 max-w-2xl">
                    <h3 className="text-2xl font-black mb-4">Notification Settings</h3>
                    <p className="text-slate-400 text-sm font-medium mb-8 leading-relaxed">
                      Configure how you receive automated alerts. We can send notifications via email, SMS, or directly to your dashboard.
                    </p>
                    <div className="space-y-4">
                      {[
                        { label: 'Email Alerts for Inquiries', enabled: true },
                        { label: 'SMS Reminders for Deadlines', enabled: false },
                        { label: 'Weekly Performance Reports', enabled: true }
                      ].map((setting, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                          <span className="text-sm font-bold">{setting.label}</span>
                          <button className={`w-12 h-6 rounded-full transition-all relative ${setting.enabled ? 'bg-indigo-500' : 'bg-slate-700'}`}>
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${setting.enabled ? 'right-1' : 'left-1'}`} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'news' && (
              <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-12 animate-in fade-in">
                {/* Blog Posts Editor */}
                <section>
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">📝 Blog & News Articles</h3>
                      <p className="text-sm text-slate-500 mt-1">Keep your community informed with the latest stories and updates.</p>
                    </div>
                    <button 
                      onClick={() => {
                        const newPost: BlogPost = {
                          id: `post-${Date.now()}`,
                          title: 'New Story Title',
                          category: 'Announcements',
                          date: new Date().toISOString().split('T')[0],
                          excerpt: 'A short overview of what this story is about...',
                          image: 'https://picsum.photos/seed/news/800/600',
                          author: user.name
                        };
                        const updatedPosts = [newPost, ...(inst.sections.news.posts || [])];
                        updateSectionField('news', 'posts', updatedPosts);
                      }}
                      className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" /> Add Article
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(inst.sections.news.posts || []).map((post, index) => (
                      <div key={post.id} className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 space-y-4">
                        <div className="relative h-40 bg-slate-200 rounded-2xl overflow-hidden group">
                           <img src={post.image || undefined} className="w-full h-full object-cover" />
                           <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <button className="bg-white text-slate-900 p-2 rounded-xl text-[10px] font-black uppercase tracking-widest">Change Cover</button>
                           </div>
                        </div>
                        <div className="space-y-4">
                          <input 
                            className="bg-transparent border-none text-lg font-black text-slate-900 w-full focus:ring-0 p-0"
                            value={post.title}
                            onChange={(e) => {
                              const newPosts = [...inst.sections.news.posts];
                              newPosts[index] = { ...post, title: e.target.value };
                              updateSectionField('news', 'posts', newPosts);
                            }}
                            placeholder="Article Title"
                          />
                          <textarea 
                            className="bg-white border border-slate-200 rounded-xl p-4 text-xs font-medium text-slate-600 w-full focus:ring-indigo-500 h-24 resize-none"
                            value={post.excerpt}
                            onChange={(e) => {
                              const newPosts = [...inst.sections.news.posts];
                              newPosts[index] = { ...post, excerpt: e.target.value };
                              updateSectionField('news', 'posts', newPosts);
                            }}
                            placeholder="Short excerpt..."
                          />
                          <div className="flex justify-between items-center pt-2">
                             <div className="flex gap-2">
                                <span className="px-3 py-1 bg-white rounded-lg border text-[8px] font-black uppercase text-slate-400">{post.category}</span>
                             </div>
                             <button 
                               onClick={() => {
                                 const newPosts = inst.sections.news.posts.filter(p => p.id !== post.id);
                                 updateSectionField('news', 'posts', newPosts);
                               }}
                               className="text-slate-300 hover:text-rose-500 transition-colors"
                             >
                               <Trash2 className="w-4 h-4" />
                             </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <hr className="border-slate-50" />

                {/* Events Editor */}
                <section>
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">📅 School Events & Calendar</h3>
                      <p className="text-sm text-slate-500 mt-1">Manage sports days, exam periods, and cultural festivals.</p>
                    </div>
                    <button 
                      onClick={() => {
                        const newEvent: EventItem = {
                          id: `event-${Date.now()}`,
                          title: 'New Event Name',
                          type: 'Academic',
                          date: new Date().toISOString().split('T')[0],
                          time: '08:00 AM',
                          location: 'School Hall',
                          organizer: inst.name,
                          description: 'Description of the event goes here...',
                          registrationRequired: false
                        };
                        const updatedEvents = [newEvent, ...(inst.sections.news.events || [])];
                        updateSectionField('news', 'events', updatedEvents);
                      }}
                      className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-2 shadow-lg"
                    >
                      <Plus className="w-4 h-4" /> Add Event
                    </button>
                  </div>

                  <div className="space-y-4">
                    {(inst.sections.news.events || []).map((event, index) => (
                      <div key={event.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col md:flex-row gap-6 items-start md:items-center">
                        <div className="flex-1 space-y-4 w-full">
                           <div className="flex flex-col md:flex-row gap-4">
                              <input 
                                className="bg-transparent border-none text-base font-black text-slate-900 flex-1 focus:ring-0 p-0"
                                value={event.title}
                                onChange={(e) => {
                                  const newEvents = [...inst.sections.news.events];
                                  newEvents[index] = { ...event, title: e.target.value };
                                  updateSectionField('news', 'events', newEvents);
                                }}
                                placeholder="Event Title"
                              />
                              <div className="flex gap-2">
                                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
                                   <Calendar className="w-3 h-3 text-slate-400" />
                                   <input 
                                     type="date"
                                     className="bg-transparent border-none p-0 text-[10px] font-black uppercase text-slate-600 focus:ring-0"
                                     value={event.date}
                                     onChange={(e) => {
                                       const newEvents = [...inst.sections.news.events];
                                       newEvents[index] = { ...event, date: e.target.value };
                                       updateSectionField('news', 'events', newEvents);
                                     }}
                                   />
                                </div>
                                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
                                   <MapPin className="w-3 h-3 text-slate-400" />
                                   <input 
                                     className="bg-transparent border-none p-0 text-[10px] font-black uppercase text-slate-600 focus:ring-0 w-24"
                                     value={event.location}
                                     onChange={(e) => {
                                       const newEvents = [...inst.sections.news.events];
                                       newEvents[index] = { ...event, location: e.target.value };
                                       updateSectionField('news', 'events', newEvents);
                                     }}
                                     placeholder="Location"
                                   />
                                </div>
                                <select 
                                  className="bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-[10px] font-black uppercase text-slate-600 focus:ring-indigo-500"
                                  value={event.type}
                                  onChange={(e) => {
                                    const newEvents = [...inst.sections.news.events];
                                    newEvents[index] = { ...event, type: e.target.value as any };
                                    updateSectionField('news', 'events', newEvents);
                                  }}
                                >
                                  <option value="Academic">Academic</option>
                                  <option value="Sports">Sports</option>
                                  <option value="Cultural">Cultural</option>
                                  <option value="Meeting">Meeting</option>
                                </select>
                              </div>
                           </div>
                        </div>
                        <button 
                          onClick={() => {
                            const newEvents = inst.sections.news.events.filter(e => e.id !== event.id);
                            updateSectionField('news', 'events', newEvents);
                          }}
                          className="text-slate-300 hover:text-rose-500 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </section>

                <hr className="border-slate-50" />

                {/* Gallery Editor */}
                <section>
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">📸 Media Gallery</h3>
                      <p className="text-sm text-slate-500 mt-1">Showcase the vibrancy of school life with photos and videos.</p>
                    </div>
                    <button 
                      onClick={() => {
                        const newMedia = { url: 'https://picsum.photos/seed/school/800/600', caption: 'New Moment', type: 'photo' as const };
                        const updatedGallery = [...(inst.sections.news.gallery || []), newMedia];
                        updateSectionField('news', 'gallery', updatedGallery);
                      }}
                      className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-2 shadow-sm"
                    >
                      <Plus className="w-4 h-4" /> Add Image
                    </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {(inst.sections.news.gallery || []).map((item, index) => (
                      <div key={index} className="group relative aspect-square bg-slate-100 rounded-2xl overflow-hidden border border-slate-100 shadow-sm transition-all hover:shadow-md">
                        <img src={item.url || undefined} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                          <input 
                            className="bg-white/10 text-white border border-white/20 rounded-lg px-2 py-1 text-[8px] font-black uppercase w-full mb-2 text-center focus:ring-0"
                            value={item.caption}
                            onChange={(e) => {
                              const newGallery = [...inst.sections.news.gallery];
                              newGallery[index] = { ...item, caption: e.target.value };
                              updateSectionField('news', 'gallery', newGallery);
                            }}
                            placeholder="Caption..."
                          />
                          <button 
                            onClick={() => {
                              const newGallery = inst.sections.news.gallery.filter((_, i) => i !== index);
                              updateSectionField('news', 'gallery', newGallery);
                            }}
                            className="bg-rose-500 text-white p-2 rounded-xl"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                    <label className="aspect-square border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-300 hover:text-indigo-400 hover:border-indigo-200 transition-all cursor-pointer bg-slate-50/50">
                       <Plus className="w-8 h-8 mb-2" />
                       <span className="text-[8px] font-black uppercase tracking-widest">Multi-Upload</span>
                       <input type="file" multiple className="hidden" />
                    </label>
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'benchmarking' && (
              <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-12 animate-in fade-in">
                <section>
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">📊 Regional Peer-Benchmarking</h3>
                      <p className="text-sm text-slate-500 mt-1">See how your school compares to the Manzini region average.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="p-8 bg-slate-900 rounded-[40px] text-white">
                       <h4 className="text-sm font-black uppercase tracking-widest mb-8">Performance vs. Region (Hhohho)</h4>
                       <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={inst.administrativeDetails?.benchmarking?.mockExamPerformance || [
                              { subject: 'Maths', schoolAverage: 82, regionalAverage: 65 },
                              { subject: 'Science', schoolAverage: 78, regionalAverage: 68 },
                              { subject: 'English', schoolAverage: 88, regionalAverage: 72 },
                              { subject: 'Siswaati', schoolAverage: 75, regionalAverage: 70 }
                            ]}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                              <XAxis dataKey="subject" stroke="#94a3b8" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} />
                              <YAxis stroke="#94a3b8" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} />
                              <Tooltip 
                                contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '16px', fontSize: '10px' }}
                                itemStyle={{ fontWeight: 'bold' }}
                              />
                              <Bar dataKey="schoolAverage" fill="#6366f1" name="Our School" radius={[4, 4, 0, 0]} />
                              <Bar dataKey="regionalAverage" fill="#334155" name="Region Avg" radius={[4, 4, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                       </div>
                    </div>

                    <div className="space-y-6">
                       <div className="p-8 bg-indigo-50 rounded-[40px] border border-indigo-100">
                          <h4 className="text-xs font-black text-indigo-900 uppercase tracking-widest mb-4">AI Strategic Insight</h4>
                          <p className="text-sm text-indigo-700 leading-relaxed font-medium">
                            "Your school is performing <strong>26% above the regional average</strong> in English. However, your 'Siswaati' scores match the region closely. We recommend a focused review session for Form 5 Siswaati Literature before the external exams."
                          </p>
                       </div>

                       <div className="grid grid-cols-2 gap-4">
                          <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100">
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Region Rank</p>
                             <p className="text-2xl font-black text-slate-900">#4</p>
                             <p className="text-[8px] text-emerald-600 font-bold">↑ 2 places from last mock</p>
                          </div>
                          <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100">
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Top Subject</p>
                             <p className="text-2xl font-black text-slate-900">English</p>
                             <p className="text-[8px] text-slate-400 font-bold">88% Success Rate</p>
                          </div>
                       </div>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'marketing' && (
              <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-12 animate-in fade-in">
                <section>
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">📣 Marketing & PR Hub</h3>
                      <p className="text-sm text-slate-500 mt-1">Track enrollment metrics and push news to the national feed.</p>
                    </div>
                    <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-2">
                       <Megaphone className="w-4 h-4" /> Create Public Post
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 p-10 bg-slate-900 rounded-[40px] text-white relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-12 opacity-5">
                          <TrendingUp className="w-64 h-64" />
                       </div>
                       <div className="relative z-10">
                          <h4 className="text-sm font-black uppercase tracking-widest mb-10">Enrollment Clicks (30 Days)</h4>
                          <div className="grid grid-cols-3 gap-8 mb-12">
                             <div className="text-center p-6 bg-white/5 rounded-3xl border border-white/10">
                                <p className="text-4xl font-black text-indigo-400">{inst.administrativeDetails?.marketing?.enrollmentFunnel.applyClicks || 85}</p>
                                <p className="text-[10px] font-black text-white/40 uppercase mt-2">"Apply Now" Clicks</p>
                             </div>
                             <div className="text-center p-6 bg-white/5 rounded-3xl border border-white/10">
                                <p className="text-4xl font-black text-emerald-400">{inst.administrativeDetails?.marketing?.enrollmentFunnel.directoryVisits || '1.2k'}</p>
                                <p className="text-[10px] font-black text-white/40 uppercase mt-2">Profile Views</p>
                             </div>
                             <div className="text-center p-6 bg-white/5 rounded-3xl border border-white/10">
                                <p className="text-4xl font-black text-amber-400">{inst.administrativeDetails?.marketing?.enrollmentFunnel.prospectusDownloads || 42}</p>
                                <p className="text-[10px] font-black text-white/40 uppercase mt-2">Prospectus DLs</p>
                             </div>
                          </div>
                          
                          <div className="flex gap-4">
                             <button className="flex-1 py-4 bg-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg">Run Enrollment Goal Campaign</button>
                             <button className="flex-1 py-4 bg-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/10">Analyze Visitor Demographics</button>
                          </div>
                       </div>
                    </div>

                    <div className="space-y-6">
                       <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4">Latest Public News</h4>
                       <div className="space-y-4">
                          {[
                            { title: 'Regional Soccer Finals Victory!', date: '2 days ago', status: 'Published' },
                            { title: 'New Admissions for Grade 8 2025', date: '5 days ago', status: 'Published' },
                            { title: 'Science Fair Winners!', date: '1 week ago', status: 'Archived' }
                          ].map((news, i) => (
                            <div key={i} className="p-5 bg-slate-50 border border-slate-100 rounded-3xl flex justify-between items-center group cursor-pointer hover:bg-white hover:shadow-md transition-all">
                               <div>
                                  <h5 className="text-xs font-bold text-slate-900">{news.title}</h5>
                                  <p className="text-[8px] text-slate-400 font-bold uppercase mt-1">{news.date}</p>
                               </div>
                               <span className="text-[8px] font-black px-2 py-1 bg-slate-200 rounded-lg group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">{news.status}</span>
                            </div>
                          ))}
                       </div>
                       <button className="w-full border-2 border-dashed border-slate-200 rounded-3xl py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:bg-slate-50">Manage Press Releases</button>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'health' && (
              <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-12 animate-in fade-in">
                <section>
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">🏥 School Health & Wellness Clinic</h3>
                      <p className="text-sm text-slate-500 mt-1">Log visits and notify parents of medical interventions.</p>
                    </div>
                    <button 
                      onClick={() => {
                        const newRecord = {
                          id: `hlt-${Date.now()}`,
                          studentId: 'st-001',
                          studentName: 'Banele Gamedze',
                          timestamp: new Date().toISOString(),
                          symptoms: 'Mild Fever, Headache',
                          diagnosis: 'Common Cold',
                          medicationProvided: 'Panado 500mg',
                          parentNotified: true
                        };
                        const updatedRecords = [...(inst.administrativeDetails?.healthLedger?.records || []), newRecord];
                        handleUpdate({
                          ...inst,
                          administrativeDetails: {
                            ...inst.administrativeDetails!,
                            healthLedger: { records: updatedRecords }
                          }
                        });
                        alert('Log saved. Automated MoMo/Email notification sent to Parent.');
                      }}
                      className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" /> Log Clinic Visit
                    </button>
                  </div>

                  <div className="space-y-4">
                    {(inst.administrativeDetails?.healthLedger?.records || []).map((record) => (
                      <div key={record.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="flex items-center gap-5">
                          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-xl font-bold">
                            {record.studentName.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-black text-slate-900">{record.studentName}</h4>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{new Date(record.timestamp).toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 gap-8">
                          <div>
                            <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Symptoms</p>
                            <p className="text-xs font-bold text-slate-700">{record.symptoms}</p>
                          </div>
                          <div>
                            <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Diagnosis</p>
                            <p className="text-xs font-bold text-slate-700">{record.diagnosis}</p>
                          </div>
                          <div className="hidden lg:block">
                            <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Medication</p>
                            <p className="text-xs font-black text-blue-600">{record.medicationProvided}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
                          <Send className="w-3 h-3 text-emerald-600" />
                          <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Parent Notified</span>
                        </div>
                      </div>
                    ))}
                    {(!inst.administrativeDetails?.healthLedger?.records || inst.administrativeDetails.healthLedger.records.length === 0) && (
                      <div className="text-center py-12 bg-slate-50 border border-dashed border-slate-200 rounded-[32px]">
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">No clinic records for today.</p>
                      </div>
                    )}
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'applications' && (
              <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-12 animate-in fade-in">
                <section>
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">📝 Application Tracking</h3>
                      <p className="text-sm text-slate-500 mt-1">Manage student applications and update their status through the enrollment funnel.</p>
                    </div>
                    <div className="flex gap-4">
                       <button className="bg-slate-50 border border-slate-200 text-slate-600 px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-2">
                         <Download className="w-4 h-4" /> Export All
                       </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { id: 'APP-001', name: 'Nomsa Lukhele', grade: 'Form 1', date: '2026-04-10', status: 'Pending', email: 'nomsa.l@gmail.com' },
                      { id: 'APP-002', name: 'Sibusiso Dlamini', grade: 'Form 4', date: '2026-04-12', status: 'Under Review', email: 'sbu.d@yahoo.com' },
                      { id: 'APP-003', name: 'Zanele Ndlovu', grade: 'Grade 1', date: '2026-04-15', status: 'Interview Scheduled', email: 'parents.ndlovu@gmail.com' },
                      { id: 'APP-004', name: 'Thando Maseko', grade: 'Form 1', date: '2026-04-18', status: 'Accepted', email: 'maseko.family@swazibank.sz' },
                      { id: 'APP-005', name: 'Muzi Zwane', grade: 'Form 5', date: '2026-04-19', status: 'Rejected', email: 'muzi.z@gmail.com' },
                    ].map((app) => (
                      <div key={app.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group hover:bg-white hover:shadow-lg transition-all">
                        <div className="flex items-center gap-5">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold shadow-sm ${
                            app.status === 'Accepted' ? 'bg-emerald-100 text-emerald-600' :
                            app.status === 'Rejected' ? 'bg-rose-100 text-rose-600' :
                            app.status === 'Interview Scheduled' ? 'bg-amber-100 text-amber-600' :
                            'bg-slate-200 text-slate-600'
                          }`}>
                            {app.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-black text-slate-900 flex items-center gap-2">
                              {app.name}
                              <span className="text-[8px] font-black bg-slate-200 text-slate-500 px-2 py-0.5 rounded-md uppercase tracking-widest">{app.id}</span>
                            </h4>
                            <div className="flex items-center gap-3 mt-1">
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{app.grade}</p>
                              <span className="w-1 h-1 bg-slate-300 rounded-full" />
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{app.email}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex-1 flex justify-end items-center gap-8">
                           <div className="hidden lg:block text-right">
                              <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Applied On</p>
                              <p className="text-xs font-bold text-slate-700">{new Date(app.date).toLocaleDateString()}</p>
                           </div>
                           
                           <div className="relative flex items-center gap-2">
                              <label className="text-[8px] font-black text-slate-400 uppercase">Status:</label>
                              <select 
                                className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-500 appearance-none bg-white min-w-[160px] cursor-pointer ${
                                  app.status === 'Accepted' ? 'text-emerald-600 ring-emerald-200' :
                                  app.status === 'Rejected' ? 'text-rose-600 ring-rose-200' :
                                  app.status === 'Interview Scheduled' ? 'text-amber-600 ring-amber-200' :
                                  'text-slate-600 ring-slate-200'
                                }`}
                                defaultValue={app.status}
                                onChange={(e) => alert(`Status updated for ${app.name} to ${e.target.value}. Parental notification triggered.`)}
                              >
                                <option value="Pending">🕒 Pending</option>
                                <option value="Under Review">🔍 Under Review</option>
                                <option value="Interview Scheduled">📅 Interview Scheduled</option>
                                <option value="Accepted">✅ Accepted</option>
                                <option value="Rejected">❌ Rejected</option>
                              </select>
                           </div>

                           <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-indigo-600 transition-colors shadow-sm">
                             <ExternalLink className="w-4 h-4" />
                           </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <div className="p-8 bg-indigo-600 rounded-[40px] text-white shadow-xl relative overflow-hidden">
                   <div className="absolute right-0 top-0 p-12 opacity-10">
                      <TrendingUp className="w-32 h-32" />
                   </div>
                   <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                      <div>
                         <h4 className="text-sm font-black uppercase tracking-widest mb-2">Automated Notifications</h4>
                         <p className="text-sm text-indigo-100 font-medium">Any status update automatically sends a text and email notification to the parent's contact on file.</p>
                      </div>
                      <div className="flex gap-4">
                         <button className="bg-white/10 border border-white/20 px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px]">Customize Templates</button>
                         <button className="bg-indigo-400 px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px]">Notification Logs</button>
                      </div>
                   </div>
                </div>
              </div>
            )}

            {activeTab === 'alumni' && (
              <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-12 animate-in fade-in">
                <section>
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">🎓 Digital Alumni Portal</h3>
                      <p className="text-sm text-slate-500 mt-1">Manage graduates and the "Digital Eswatini Passport" network.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-black text-slate-900 uppercase">Verified Graduates</h4>
                        <div className="flex gap-2">
                           <input className="bg-slate-50 border-none rounded-xl px-4 py-2 text-xs font-bold" placeholder="Search by Year..." />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(inst.administrativeDetails?.alumniPortal?.graduates || [
                          { id: 'alm-1', name: 'Nomcebo Shongwe', graduationYear: '2023', currentIndustry: 'Medicine', passportId: 'EP-2023-8821' },
                          { id: 'alm-2', name: 'Sibusiso Mnisi', graduationYear: '2022', currentIndustry: 'FinTech', passportId: 'EP-2022-1049' }
                        ]).map(alm => (
                          <div key={alm.id} className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 relative group">
                            <div className="flex items-center gap-4 mb-4">
                              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">🎓</div>
                              <div>
                                <h5 className="font-bold text-slate-900">{alm.name}</h5>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Class of {alm.graduationYear}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 mt-4">
                               <span className="text-[8px] font-black bg-blue-50 text-blue-600 px-2 py-1 rounded-lg uppercase tracking-widest">{alm.currentIndustry}</span>
                               <span className="text-[8px] font-black bg-slate-900 text-white px-2 py-1 rounded-lg uppercase tracking-widest">Passport ID {alm.passportId}</span>
                            </div>
                            <button className="absolute right-4 top-4 p-2 opacity-0 group-hover:opacity-100 transition-all text-slate-300 hover:text-blue-600">
                               <Share2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div className="p-8 bg-blue-600 rounded-[40px] text-white shadow-xl relative overflow-hidden">
                        <div className="relative z-10">
                          <h4 className="text-sm font-black uppercase tracking-widest mb-6">Alumni Fundraising</h4>
                          <div className="space-y-6">
                            <div>
                               <div className="flex justify-between items-center mb-2">
                                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-100">Science Lab Wing</span>
                                  <span className="text-xs font-black">65%</span>
                               </div>
                               <div className="w-full h-2 bg-blue-800 rounded-full overflow-hidden">
                                  <div className="h-full bg-white shadow-[0_0_10px_white]" style={{ width: '65%' }} />
                               </div>
                               <p className="text-[10px] mt-2 text-blue-200 font-bold">Goal: SZL 500,000</p>
                            </div>
                            <button className="w-full bg-white text-blue-600 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg">Send Campaign Alert</button>
                          </div>
                        </div>
                      </div>

                      <div className="p-8 bg-slate-50 rounded-[40px] border border-slate-100">
                        <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4">Passport Stats</h4>
                        <div className="space-y-4">
                           <div className="flex justify-between items-center text-xs">
                              <span className="text-slate-500 font-bold">Active Passports</span>
                              <span className="font-black text-slate-900">420</span>
                           </div>
                           <div className="flex justify-between items-center text-xs">
                              <span className="text-slate-500 font-bold">Merits Verified</span>
                              <span className="font-black text-slate-900">1,250</span>
                           </div>
                           <div className="flex justify-between items-center text-xs">
                              <span className="text-slate-500 font-bold">Career Days Guest</span>
                              <span className="font-black text-slate-900">12</span>
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}
         </div>
      </div>

      {/* Page Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-12">
          <div className="bg-white w-full h-full rounded-[40px] overflow-hidden flex flex-col shadow-2xl">
            <div className="p-6 border-b flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 uppercase tracking-tight">Live Preview Mode</h3>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Viewing: {inst.name}</p>
                </div>
              </div>
              <button 
                onClick={() => setShowPreview(false)}
                className="w-10 h-10 rounded-full bg-white border shadow-sm flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-hidden relative">
              <iframe 
                src={`#/school/${inst.slug}?preview=true`} 
                className="w-full h-full border-none"
                title="Institution Preview"
              />
            </div>
            <div className="p-6 border-t bg-slate-50 flex justify-center gap-4">
              <button onClick={() => setShowPreview(false)} className="px-8 py-3 rounded-2xl border font-black uppercase tracking-widest text-[10px]">Close Preview</button>
              <button onClick={() => { handleUpdate(inst); setShowPreview(false); }} className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px]">Publish & Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstitutionAdminDashboard;
