import React from 'react';
import { Outlet, useParams, NavLink, Navigate } from 'react-router-dom';
import { Institution, InstitutionType } from '../../types';
import { getOptimizedImageUrl } from '../../src/services/performanceService';
import SEO from '../../src/components/SEO';

interface InstitutionLayoutProps {
  institutions: Institution[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  lang: 'en' | 'ss';
  loading?: boolean;
}

export const InstitutionLayout: React.FC<InstitutionLayoutProps> = ({ institutions, favorites, onToggleFavorite, lang, loading }) => {
  const { slug } = useParams<{ slug: string }>();
  const inst = institutions.find(i => i.slug === slug);

  if (loading && !inst) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Loading Institution...</p>
        </div>
      </div>
    );
  }

  if (!inst) return <Navigate to="/browse" />;

  const themeStyle = {
    '--primary': inst.theme.primaryColor,
    '--radius': inst.theme.borderRadius === 'none' ? '0' : inst.theme.borderRadius === 'md' ? '12px' : inst.theme.borderRadius === '2xl' ? '40px' : '9999px',
    'fontFamily': inst.theme.fontFamily === 'Inter' ? 'Inter, sans-serif' : 
                  inst.theme.fontFamily === 'Playfair Display' ? '"Playfair Display", serif' : 
                  inst.theme.fontFamily === 'Space Grotesk' ? '"Space Grotesk", sans-serif' : 
                  inst.theme.fontFamily === 'Outfit' ? 'Outfit, sans-serif' : 'Inter, sans-serif'
  } as React.CSSProperties;

  const labels = {
    en: { 
      welcome: inst.type.includes(InstitutionType.ASSOCIATION) ? 'Leadership Message' : 'Principal\'s Welcome', 
      acad: inst.type.includes(InstitutionType.ASSOCIATION) ? 'Professional Development' : 'Academics', 
      news: 'News & Media', 
      life: inst.type.includes(InstitutionType.ASSOCIATION) ? 'Member Life' : 'Student Life', 
      contact: 'Contact Us',
      about: 'About Us',
      admissions: inst.type.includes(InstitutionType.ASSOCIATION) ? 'Membership' : 'Admissions',
      reviews: 'Reviews & Ratings',
      alumni: 'Alumni Network',
      portal: inst.type.includes(InstitutionType.ASSOCIATION) ? 'Member Portal' : 'Student Portal',
      quickTitle: 'Quick Actions',
      upcoming: 'What\'s Happening'
    },
    ss: { 
      welcome: inst.type.includes(InstitutionType.ASSOCIATION) ? 'Siyakwemukela' : 'Umlayeto wePrincipal', 
      acad: inst.type.includes(InstitutionType.ASSOCIATION) ? 'Tebucwepheshe' : 'Imfundvo', 
      news: 'Tindzaba', 
      life: inst.type.includes(InstitutionType.ASSOCIATION) ? 'Imphilo yeMalunga' : 'Imphilo yeSikolwa', 
      contact: 'Tsintsana Natsi',
      about: 'Mayelana Natsi',
      admissions: inst.type.includes(InstitutionType.ASSOCIATION) ? 'Bulunga' : 'Kungeniswa',
      reviews: 'Kubuyeketa',
      alumni: 'Inkhundla ye-Alumni',
      portal: inst.type.includes(InstitutionType.ASSOCIATION) ? 'Iphothali yeSikolwa' : 'Iphothali yeSikolwa',
      quickTitle: 'Tento Letisheshako',
      upcoming: 'Lokwentekako'
    }
  }[lang];

  const defaultOrder = ['homepage', 'about', 'admissions', 'academics', 'news', 'studentLife', 'portal', 'reviews', 'alumni', 'contact'];
  const orderedSections = (inst.theme.sectionOrder || defaultOrder).map(id => {
    // Check if section is enabled
    const section = (inst.sections as any)?.[id];
    if (section && section.enabled === false) return null;

    return {
      id,
      path: id === 'homepage' ? '.' : id,
      label: id === 'homepage' ? 'Home' : 
             id === 'about' ? labels.about : 
             id === 'admissions' ? labels.admissions : 
             id === 'academics' ? labels.acad : 
             id === 'news' ? labels.news : 
             id === 'studentLife' ? labels.life : 
             id === 'portal' ? labels.portal :
             id === 'reviews' ? labels.reviews :
             id === 'alumni' ? labels.alumni :
             id === 'contact' ? labels.contact : id
    };
  }).filter(Boolean) as { id: string, path: string, label: string }[];

  if (!orderedSections.find(s => s.id === 'contact')) {
    orderedSections.push({ id: 'contact', path: 'contact', label: labels.contact });
  }

  if (!orderedSections.find(s => s.id === 'ministry')) {
    const contactIndex = orderedSections.findIndex(s => s.id === 'contact');
    if (contactIndex !== -1) {
       orderedSections.splice(contactIndex, 0, { id: 'ministry', path: 'ministry', label: 'Ministry Info' });
    } else {
       orderedSections.push({ id: 'ministry', path: 'ministry', label: 'Ministry Info' });
    }
  }

  const sections = orderedSections;
  const acad = inst.sections?.academics;

  return (
    <div className="min-h-screen bg-white pb-20" style={themeStyle}>
      <SEO 
        title={inst.name} 
        description={inst.seo.description} 
        institution={inst} 
      />
      {/* Hero Header */}
      <div className="relative h-[500px] md:h-[750px] overflow-hidden">
        <img src={getOptimizedImageUrl(inst.sections?.homepage?.heroBanner || inst.coverImage, 1920, 1080) || undefined} className="w-full h-full object-cover scale-105" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-20">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end gap-12">
            <div className="w-48 h-48 bg-white p-6 shadow-2xl shrink-0 mb-[-120px] md:mb-[-180px] z-10 overflow-hidden" style={{ borderRadius: themeStyle['--radius' as any] }}>
              <img src={getOptimizedImageUrl(inst.logo, 400, 400) || undefined} className="w-full h-full object-contain" loading="lazy" />
            </div>
            <div className="flex-1 pb-6 text-white space-y-6">
               <div className="flex flex-wrap items-center gap-4">
                  {inst.isVerified && (
                    <span className="px-4 py-1.5 bg-emerald-500 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2">
                       Verified Institution
                    </span>
                  )}
                  {inst.type.includes(InstitutionType.PUBLIC) && (
                    <span className="px-4 py-1.5 bg-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2">
                       MoET Digital Utility Partner
                    </span>
                  )}
                  <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest">{inst.region} Region</span>
               </div>
               <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-none">{inst.name}</h1>
               <p className="text-2xl md:text-3xl font-medium text-slate-300 max-w-3xl leading-snug">{acad?.overview?.headline}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Navigation */}
      <div className="bg-white/80 backdrop-blur-xl border-b sticky top-0 z-50 shadow-sm overflow-x-auto scrollbar-hide">
        <div className="max-w-7xl mx-auto px-4 md:px-10 flex space-x-3.5 h-16 items-center">
           <div className="w-48 shrink-0 hidden md:block" />
           {sections.map(s => (
             <NavLink 
               key={s.id} 
               to={s.path}
               end={s.path === '.'}
               className={({ isActive }) => `text-[9px] font-black uppercase tracking-[0.1em] border-b-2 h-full flex items-center px-0.5 transition-all whitespace-nowrap ${isActive ? 'text-slate-900 font-black border-slate-900 border-b-[3px]' : 'text-slate-400 hover:text-slate-600 border-transparent'} `} 
               style={({ isActive }) => ({ borderBottomColor: isActive ? inst.theme.primaryColor : 'transparent' })}
             >
               {s.label}
             </NavLink>
           ))}
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 md:px-12 lg:px-20 py-12 md:py-24">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-8 flex flex-col gap-12">
               {/* Main route content goes here */}
               <Outlet context={{ inst, lang }} />
            </div>

            {/* Sticky Sidebar Profile Context */}
            <aside className="lg:col-span-4 space-y-6 md:space-y-8 self-start pb-10 sticky top-32">
               <div className="p-6 md:p-10 bg-white border border-slate-100 shadow-3xl relative" style={{borderRadius: themeStyle['--radius' as any]}}>
                  <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-50 rounded-full blur-[80px] opacity-40" />
                  <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-6 md:mb-8 relative z-10">Institutional Profile</h3>
                  <div className="space-y-6 md:space-y-8 relative z-10">
                     <div className="grid grid-cols-1 gap-6 md:gap-8">
                        <div className="group">
                           <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1 md:mb-2">Registry Status</p>
                           <p className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors">{inst.moetRegistration}</p>
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1 md:mb-2">History</p>
                           <p className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter">Est. {inst.metadata?.establishedYear || 'N/A'}</p>
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1 md:mb-2">Capacity</p>
                           <p className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter">{inst.metadata?.studentCount || 'N/A'} Pupils</p>
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1 md:mb-2">Region</p>
                           <p className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter">{inst.region}</p>
                        </div>
                     </div>
                     <div className="pt-6 md:pt-8 border-t border-slate-100">
                        <button onClick={() => onToggleFavorite(inst.id)} className={`w-full py-4 md:py-5 font-black uppercase tracking-[0.2em] text-[9px] rounded-[24px] transition-all shadow-xl ${favorites.includes(inst.id) ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-slate-900 text-white hover:bg-blue-600 hover:scale-[1.02]'}`}>
                           {favorites.includes(inst.id) ? '♥ Saved in Directory' : 'Save to Favorites'}
                        </button>
                     </div>
                     
                     {/* Social Media Links */}
                     {(inst.contact.facebook || inst.contact.twitter || inst.contact.linkedin) && (
                        <div className="pt-6 border-t border-slate-100 flex justify-center gap-4">
                           {inst.contact.facebook && (
                              <a href={inst.contact.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                              </a>
                           )}
                           {inst.contact.twitter && (
                              <a href={inst.contact.twitter} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-sky-500 hover:bg-sky-50 transition-colors">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                              </a>
                           )}
                           {inst.contact.linkedin && (
                              <a href={inst.contact.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-blue-700 hover:bg-blue-100 transition-colors">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                              </a>
                           )}
                        </div>
                     )}
                  </div>
               </div>

               {/* Quick Info Card */}
               <div className="p-8 md:p-10 bg-slate-50 rounded-[40px] border border-slate-100 space-y-6">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Quick Facts</h4>
                  <div className="space-y-4">
                     <div className="flex justify-between items-center">
                        <span className="text-xs font-medium text-slate-500">Ownership</span>
                        <span className="text-xs font-bold text-slate-900">{inst.type.join(', ')}</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-xs font-medium text-slate-500">Gender</span>
                        <span className="text-xs font-bold text-slate-900">{inst.metadata?.gender || 'N/A'}</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-xs font-medium text-slate-500">Boarding</span>
                        <span className="text-xs font-bold text-slate-900">{inst.metadata?.isBoarding ? 'Yes' : 'No'}</span>
                     </div>
                  </div>
               </div>

               {/* Quick Map Link */}
               <div className="p-8 md:p-12 bg-slate-900 text-white rounded-[48px] md:rounded-[64px] shadow-3xl group cursor-pointer overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-8 md:p-12 opacity-5 text-7xl md:text-9xl">🗺</div>
                  <div className="flex justify-between items-start mb-6 md:mb-8">
                     <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50">Navigation</h3>
                     <span className="w-8 h-8 md:w-10 md:h-10 bg-white/10 rounded-xl md:rounded-2xl flex items-center justify-center text-lg md:text-xl group-hover:bg-blue-500 transition-colors">📍</span>
                  </div>
                  <p className="text-base md:text-lg font-bold mb-8 md:mb-10 leading-snug">Get direct route to {inst.name} campus.</p>
                  <a href={inst.contact.googleMapsUrl} target="_blank" rel="noreferrer" className="text-[9px] font-black uppercase tracking-[0.3em] underline decoration-[2px] md:decoration-[3px] underline-offset-8 decoration-blue-500">Launch Google Maps</a>
               </div>

               {/* Inquiry Teaser */}
               <div className="p-8 md:p-10 bg-blue-600 text-white rounded-[40px] shadow-2xl shadow-blue-200">
                  <h4 className="text-[10px] font-black uppercase tracking-widest mb-4">Have Questions?</h4>
                  <p className="text-sm font-medium mb-6 opacity-90">Send a direct inquiry to the admissions office.</p>
                  <NavLink to="contact" className="w-full py-4 text-center block bg-white text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-colors">
                     Send Message
                  </NavLink>
               </div>
            </aside>
         </div>
      </div>
    </div>
  );
};

