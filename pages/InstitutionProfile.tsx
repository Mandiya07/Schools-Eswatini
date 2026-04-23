
import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Institution, InstitutionType } from '../types';
import { ReviewsSection, AlumniSection, InquiryForm } from '../components/EngagementFeatures';
import { getOptimizedImageUrl } from '../src/services/performanceService';
import SEO from '../src/components/SEO';
import MinistryIntegration from '../src/components/MinistryIntegration';
import HistorySection from '../src/components/HistorySection';
import VisionSection from '../src/components/VisionSection';
import MissionSection from '../src/components/MissionSection';
import CoreValuesSection from '../src/components/CoreValuesSection';
import LeadershipSection from '../src/components/LeadershipSection';
import AccreditationSection from '../src/components/AccreditationSection';
import StatisticsPanel from '../src/components/StatisticsPanel';
import CampusOverview from '../src/components/CampusOverview';
import CommunityImpact from '../src/components/CommunityImpact';
import DownloadCenter from '../src/components/DownloadCenter';
import AdmissionsSection from '../src/components/AdmissionsSection';
import AcademicsSection from '../src/components/AcademicsSection';
import PortalSection from '../src/components/PortalSection';
import NewsEventsSection from '../src/components/NewsEventsSection';
import StudentLifeSection from '../src/components/StudentLifeSection';
import ContactSection from '../src/components/ContactSection';

interface InstitutionProfileProps {
  institutions: Institution[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  lang: 'en' | 'ss';
}

const InstitutionProfile: React.FC<InstitutionProfileProps> = ({ institutions, favorites, onToggleFavorite, lang }) => {
  const { slug } = useParams<{ slug: string }>();
  const inst = institutions.find(i => i.slug === slug);
  const [activeSection, setActiveSection] = useState<string>('homepage');
  const [selectedDept, setSelectedDept] = useState<number | null>(null);

  if (!inst) return <Navigate to="/browse" />;

  const isTertiary = inst.type && inst.type.includes(InstitutionType.TERTIARY);

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
    return {
      id,
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
  }).filter(Boolean) as { id: string, label: string }[];

  // Ensure contact is always present if not in order
  if (!orderedSections.find(s => s.id === 'contact')) {
    orderedSections.push({ id: 'contact', label: labels.contact });
  }

  // Ensure ministry information is always present
  if (!orderedSections.find(s => s.id === 'ministry')) {
    // Insert just before contact or at the end
    const contactIndex = orderedSections.findIndex(s => s.id === 'contact');
    if (contactIndex !== -1) {
       orderedSections.splice(contactIndex, 0, { id: 'ministry', label: 'Ministry Info' });
    } else {
       orderedSections.push({ id: 'ministry', label: 'Ministry Info' });
    }
  }

  const sections = orderedSections;

  const acad = inst.sections.academics;
  const about = inst.sections.about;
  const admin = inst.sections.admissions;
  const news = inst.sections.news;
  const life = inst.sections.studentLife;

  return (
    <div className="min-h-screen bg-white pb-20" style={themeStyle}>
      <SEO 
        title={inst.name} 
        description={inst.seo.description} 
        institution={inst} 
      />
      {/* Hero Header */}
      <div className="relative h-[500px] md:h-[750px] overflow-hidden">
        <img src={getOptimizedImageUrl(inst.sections.homepage.heroBanner || inst.coverImage, 1920, 1080) || undefined} className="w-full h-full object-cover scale-105" loading="lazy" />
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
               <p className="text-2xl md:text-3xl font-medium text-slate-300 max-w-3xl leading-snug">{acad.overview.headline}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Navigation */}
      <div className="bg-white/80 backdrop-blur-xl border-b sticky top-0 z-50 shadow-sm overflow-x-auto scrollbar-hide">
        <div className="max-w-7xl mx-auto px-8 md:px-20 flex space-x-12 h-28 items-center">
           <div className="w-48 shrink-0 hidden md:block" />
           {sections.map(s => (
             <button 
               key={s.id} 
               onClick={() => setActiveSection(s.id)} 
               className={`text-[11px] font-black uppercase tracking-[0.2em] border-b-4 h-full flex items-center px-2 transition-all whitespace-nowrap ${activeSection === s.id ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'}`} 
               style={{ borderBottomColor: activeSection === s.id ? inst.theme.primaryColor : 'transparent' }}
             >
               {s.label}
             </button>
           ))}
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 lg:px-20 py-12 md:py-24">
         {/* Ministry Integration Section (Authoritative) */}
         <div className="mb-16 md:mb-24">
           <MinistryIntegration institution={inst} />
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-9 space-y-20 md:space-y-32">
               
               {/* --- HOMEPAGE SECTION --- */}
               {activeSection === 'homepage' && (
                 <div className="space-y-32 animate-in fade-in slide-in-from-bottom-8 duration-700">
                   {/* 1. Statistics Grid Strip */}
                   <section className="grid grid-cols-2 md:grid-cols-4 gap-8">
                      <div className="p-10 bg-slate-50 rounded-[48px] text-center border border-slate-100 group hover:bg-white hover:shadow-xl transition-all">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Pass Rate</p>
                         <p className="text-4xl font-black text-blue-600 tracking-tight">{acad.performance.passRate}</p>
                      </div>
                      <div className="p-10 bg-slate-50 rounded-[48px] text-center border border-slate-100 group hover:bg-white hover:shadow-xl transition-all">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Enrollment</p>
                         <p className="text-4xl font-black text-slate-900 tracking-tight">{inst.metadata.studentCount}</p>
                      </div>
                      <div className="p-10 bg-slate-50 rounded-[48px] text-center border border-slate-100 group hover:bg-white hover:shadow-xl transition-all">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Staff</p>
                         <p className="text-4xl font-black text-slate-900 tracking-tight">{acad.staff.totalCount}</p>
                      </div>
                      <div className="p-10 bg-slate-50 rounded-[48px] text-center border border-slate-100 group hover:bg-white hover:shadow-xl transition-all">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Est. Year</p>
                         <p className="text-4xl font-black text-slate-900 tracking-tight">{inst.metadata.establishedYear}</p>
                      </div>
                   </section>

                   {/* 2. Welcome Message */}
                   <section className="space-y-16">
                      <div className="flex items-center gap-6">
                         <span className="h-[2px] w-16 bg-blue-600 rounded-full" />
                         <h2 className="text-[11px] font-black text-blue-600 uppercase tracking-[0.3em]">{labels.welcome}</h2>
                      </div>
                      <p className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.05]">{inst.sections.homepage.welcomeMessage}</p>
                      
                      <div className="bg-white p-14 rounded-[64px] border border-slate-100 flex flex-col lg:flex-row gap-16 items-center shadow-sm relative overflow-hidden">
                         <div className="absolute top-0 right-0 p-12 opacity-5 text-[10rem] font-black">"</div>
                         <div className="w-56 h-72 shrink-0 overflow-hidden rounded-[40px] bg-slate-100 shadow-2xl z-10">
                            <img src={getOptimizedImageUrl(inst.sections.homepage.principalMessage.photo, 400, 600) || undefined} className="w-full h-full object-cover" loading="lazy" />
                         </div>
                         <div className="relative z-10">
                            <blockquote className="text-3xl font-medium text-slate-600 italic leading-relaxed mb-10">"{inst.sections.homepage.principalMessage.text}"</blockquote>
                            <div className="flex items-center gap-6">
                               <div className="w-12 h-1 bg-blue-600" />
                               <div>
                                  <p className="text-lg font-black text-slate-900 uppercase tracking-widest">{inst.sections.homepage.principalMessage.name}</p>
                                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Head of Institution</p>
                               </div>
                            </div>
                         </div>
                      </div>
                   </section>

                   {/* 3. Quick Actions Grid */}
                   <section className="space-y-12">
                      <h3 className="text-2xl font-black text-slate-900 uppercase tracking-widest">{labels.quickTitle}</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                         <button onClick={() => setActiveSection('admissions')} className="group p-6 md:p-10 bg-blue-600 text-white rounded-[48px] shadow-2xl shadow-blue-200 flex flex-col items-center text-center transition-all hover:-translate-y-3">
                            <span className="text-4xl mb-6 group-hover:scale-125 transition-transform duration-500">📄</span>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Apply Now</span>
                         </button>
                         <button onClick={() => setActiveSection('admissions')} className="group p-10 bg-white border border-slate-100 rounded-[48px] shadow-sm flex flex-col items-center text-center transition-all hover:-translate-y-3">
                            <span className="text-4xl mb-6 group-hover:scale-125 transition-transform duration-500">🎓</span>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">Scholarships</span>
                         </button>
                         <a href={inst.sections.portal.url} target="_blank" rel="noreferrer" className="group p-10 bg-white border border-slate-100 rounded-[48px] shadow-sm flex flex-col items-center text-center transition-all hover:-translate-y-3">
                            <span className="text-4xl mb-6 group-hover:scale-125 transition-transform duration-500">🔑</span>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">Portal</span>
                         </a>
                         <button onClick={() => setActiveSection('contact')} className="group p-6 md:p-10 bg-slate-900 text-white rounded-[48px] shadow-2xl flex flex-col items-center text-center transition-all hover:-translate-y-3">
                            <span className="text-4xl mb-6 group-hover:scale-125 transition-transform duration-500">📞</span>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Contact</span>
                         </button>
                      </div>
                   </section>

                   {/* 4. News Carousel Teaser */}
                   <section className="space-y-16">
                      <div className="flex justify-between items-end">
                         <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Latest Announcements</h3>
                         <button onClick={() => setActiveSection('news')} className="text-[10px] font-black uppercase tracking-widest text-blue-600 border-b-2 border-blue-600 pb-1">Read All News</button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                         {[...(inst.sections.homepage.announcements || [])]
                           .sort((a, b) => {
                             if (a.isFeatured && !b.isFeatured) return -1;
                             if (!a.isFeatured && b.isFeatured) return 1;
                             return new Date(b.date).getTime() - new Date(a.date).getTime();
                           })
                           .slice(0, 2).map(ann => (
                           <div key={ann.id} className={`p-12 border rounded-[56px] relative overflow-hidden group transition-all ${ann.isFeatured ? 'bg-slate-900 text-white border-transparent' : 'bg-white border-slate-100 hover:border-blue-500'}`}>
                              <div className="absolute -top-10 -right-10 p-12 opacity-[0.03] text-9xl group-hover:opacity-[0.06] transition-opacity">
                                 {ann.isFeatured ? '⭐️' : '📢'}
                              </div>
                              <div className="flex gap-4 items-center mb-6">
                                 <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${ann.isFeatured ? 'bg-white text-slate-900' : 'bg-blue-50 text-blue-600'}`}>{ann.date}</span>
                                 {ann.isFeatured && (
                                    <span className="px-3 py-1 bg-amber-400 text-slate-900 rounded-full text-[8px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-lg">
                                       <span className="inline-block animate-pulse">★</span> Featured Notice
                                    </span>
                                 )}
                              </div>
                              <h4 className={`text-3xl font-black mb-6 leading-tight transition-colors ${ann.isFeatured ? 'text-white' : 'text-slate-900 group-hover:text-blue-600'}`}>{ann.title}</h4>
                              <p className={`text-lg font-medium leading-relaxed mb-10 ${ann.isFeatured ? 'text-slate-400' : 'text-slate-500'}`}>{ann.content}</p>
                              <button className={`text-[10px] font-black uppercase tracking-widest group-hover:translate-x-2 transition-transform ${ann.isFeatured ? 'text-white' : 'text-slate-900'}`}>Read Full Post →</button>
                           </div>
                         ))}
                      </div>
                   </section>

                   {/* 5. PREMIUM FEATURES: Virtual Tour & Enhanced Lead Generation */}
                   {(inst.plan === 'Premium' || inst.plan === 'Pro Suite' || inst.plan === 'Enterprise') && (
                     <section className="space-y-16 py-12 px-8 md:px-16 bg-slate-900 rounded-[64px] text-white overflow-hidden relative mt-16">
                        <div className="absolute -top-32 -right-32 w-96 h-96 bg-fuchsia-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 relative z-10">
                           <div className="flex items-center gap-6">
                              <span className="h-[2px] w-16 bg-fuchsia-500 rounded-full" />
                              <h2 className="text-[11px] font-black text-fuchsia-400 uppercase tracking-[0.3em]">Premium Experience</h2>
                           </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
                           <div className="space-y-8">
                             <h3 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.1]">Take a Virtual Tour of Our Campus</h3>
                             <p className="text-lg text-slate-400">Can't visit in person? Explore our state-of-the-art facilities, classrooms, and grounds from the comfort of your home.</p>
                             <div className="relative rounded-[40px] overflow-hidden aspect-video bg-slate-800 shadow-2xl flex items-center justify-center group cursor-pointer border border-slate-700">
                               <img src={getOptimizedImageUrl(inst.coverImage, 800, 450) || undefined} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" alt="Virtual Tour Thumbnail" />
                               <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="w-20 h-20 bg-white text-slate-900 rounded-full flex items-center justify-center shadow-xl shadow-fuchsia-500/20 group-hover:scale-110 transition-transform">
                                    <span className="text-3xl ml-2">▶</span>
                                  </div>
                               </div>
                               <div className="absolute top-6 left-6 px-4 py-2 bg-fuchsia-600 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg">
                                  360° Virtual Tour
                               </div>
                             </div>
                           </div>

                           <div className="bg-slate-800/80 backdrop-blur-xl p-10 rounded-[48px] border border-slate-700 shadow-2xl">
                              <div className="flex items-center justify-between mb-4">
                                <h4 className="text-2xl font-black">Request Admission Info</h4>
                                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-500/20">Fast Track</span>
                              </div>
                              <p className="text-sm font-medium text-slate-400 mb-8">Beat the queues. Our admissions team prioritizes premium portal inquiries.</p>
                              
                              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Lead sent to school CRM! (Mock revenue for platform)'); }}>
                                <div className="space-y-4">
                                  <input type="text" placeholder="Parent or Guardian Name" className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-fuchsia-500 outline-none text-white placeholder-slate-500 transition-all" required />
                                  <input type="email" placeholder="Email Address" className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-fuchsia-500 outline-none text-white placeholder-slate-500 transition-all" required />
                                  <div className="flex gap-4">
                                     <input type="tel" placeholder="Phone Number" className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-fuchsia-500 outline-none text-white placeholder-slate-500 transition-all" required />
                                     <select className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-fuchsia-500 outline-none text-white transition-all text-slate-300">
                                       <option value="">Year</option>
                                       <option value="2024">2024</option>
                                       <option value="2025">2025</option>
                                       <option value="2026">2026</option>
                                     </select>
                                  </div>
                                </div>
                                <button type="submit" className="w-full py-5 bg-fuchsia-600 hover:bg-fuchsia-500 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all shadow-lg shadow-fuchsia-600/30">
                                   Request Callback
                                </button>
                                <div className="flex items-center justify-center gap-2 mt-4">
                                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                   <p className="text-[9px] text-slate-400 uppercase tracking-widest">Powered by Schools Eswatini Network</p>
                                </div>
                              </form>
                           </div>
                        </div>
                     </section>
                   )}
                 </div>
               )}

               {/* --- ABOUT SECTION --- */}
               {activeSection === 'about' && (
                 <div className="space-y-32 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <section className="space-y-10">
                       <h2 className="text-7xl font-black text-slate-900 tracking-tighter">Our Legacy</h2>
                       <p className="text-2xl text-slate-500 font-medium leading-relaxed max-w-3xl">{about.overview}</p>
                    </section>

                     <section className="space-y-16">
                        <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Our Mission</h3>
                        <MissionSection mission={about.mission} primaryColor={inst.theme.primaryColor} />
                     </section>

                     <section className="space-y-16">
                        <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">The Vision</h3>
                        <VisionSection vision={about.vision} primaryColor={inst.theme.primaryColor} />
                     </section>

                     <section className="space-y-16">
                        <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Core Values</h3>
                        <CoreValuesSection values={about.coreValues} primaryColor={inst.theme.primaryColor} />
                     </section>

                     <section className="space-y-16">
                        <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Leadership Profile</h3>
                        <LeadershipSection leadership={about.leadership} primaryColor={inst.theme.primaryColor} />
                     </section>

                     <section className="space-y-16">
                        <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Accreditation & Compliance</h3>
                        <AccreditationSection accreditation={about.accreditation} primaryColor={inst.theme.primaryColor} />
                     </section>

                     <section className="space-y-16">
                        <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Institutional Statistics</h3>
                        <StatisticsPanel statistics={about.statistics} primaryColor={inst.theme.primaryColor} />
                     </section>

                     <section className="space-y-16">
                        <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Campus Overview</h3>
                        <CampusOverview facilities={about.facilities} primaryColor={inst.theme.primaryColor} />
                     </section>

                     <section className="space-y-16">
                        <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Community Impact</h3>
                        <CommunityImpact community={about.community} primaryColor={inst.theme.primaryColor} />
                     </section>

                     <section className="space-y-16">
                        <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Download Center</h3>
                        <DownloadCenter downloads={about.downloads} primaryColor={inst.theme.primaryColor} />
                     </section>

                    <section className="space-y-16">
                       <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Our Journey</h3>
                       <HistorySection history={about.history} primaryColor={inst.theme.primaryColor} />
                    </section>
                 </div>
               )}

               {/* --- ADMISSIONS SECTION --- */}
               {activeSection === 'admissions' && (
                 <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <AdmissionsSection admissions={admin} primaryColor={inst.theme.primaryColor} />
                 </div>
               )}

               {/* --- ACADEMICS SECTION --- */}
               {activeSection === 'academics' && (
                 <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <AcademicsSection academics={acad} primaryColor={inst.theme.primaryColor} />
                 </div>
               )}

               {/* --- NEWS & MEDIA SECTION --- */}
               {activeSection === 'news' && (
                 <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <NewsEventsSection news={inst.sections.news} primaryColor={inst.theme.primaryColor} />
                 </div>
               )}

               {/* --- STUDENT LIFE SECTION --- */}
               {activeSection === 'studentLife' && (
                 <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <StudentLifeSection life={inst.sections.studentLife} primaryColor={inst.theme.primaryColor} />
                 </div>
               )}

               {/* --- REVIEWS SECTION --- */}
               {activeSection === 'reviews' && (
                 <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                   <ReviewsSection institution={inst} lang={lang} />
                 </div>
               )}

               {/* --- ALUMNI SECTION --- */}
               {activeSection === 'alumni' && (
                 <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                   <AlumniSection institution={inst} lang={lang} />
                 </div>
               )}

               {/* --- PORTAL SECTION --- */}
               {activeSection === 'portal' && (
                 <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <PortalSection portal={inst.sections.portal} primaryColor={inst.theme.primaryColor} />
                 </div>
               )}

               {/* --- MINISTRY INFORMATION SECTION --- */}
               {activeSection === 'ministry' && (
                 <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 bg-white border border-slate-100 rounded-[48px] p-10 md:p-16 shadow-sm">
                    <div className="flex items-center gap-4 mb-10">
                       <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center text-3xl shadow-sm">🏛</div>
                       <div>
                          <h2 className="text-3xl font-black tracking-tight mb-1">Ministry Diagnostics</h2>
                          <p className="text-xs uppercase font-black tracking-widest text-slate-400">Official Record & Standing</p>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="p-8 bg-slate-50 rounded-[32px]">
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Registration ID</p>
                          <p className="text-xl font-black text-slate-900 font-mono">{inst.moetRegistration || 'PENDING-VERIFICATION'}</p>
                       </div>
                       <div className="p-8 bg-slate-50 rounded-[32px]">
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">National Standing</p>
                           <p className="text-xl font-black text-slate-900">
                             {inst.stats?.performanceRanking ? `Ranked #${inst.stats.performanceRanking} Nationally` : 'Unranked'}
                           </p>
                       </div>
                       <div className="p-8 bg-slate-50 rounded-[32px]">
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Verification Status</p>
                          {inst.isVerified ? (
                            <span className="px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-xl text-sm font-black uppercase tracking-widest inline-flex items-center gap-2">
                               <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> Verified
                            </span>
                          ) : (
                            <span className="px-4 py-1.5 bg-amber-100 text-amber-700 rounded-xl text-sm font-black uppercase tracking-widest inline-flex items-center gap-2">
                               <span className="w-2 h-2 bg-amber-500 rounded-full" /> Pending Audit
                            </span>
                          )}
                       </div>
                       <div className="p-8 bg-slate-50 rounded-[32px]">
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Compliance Score</p>
                          <div className="flex items-center gap-4">
                             <div className="h-4 flex-grow bg-slate-200 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-600 rounded-full" style={{ width: `${inst.trustScore || 0}%` }}></div>
                             </div>
                             <span className="text-sm font-black text-slate-900">{inst.trustScore || 0}%</span>
                          </div>
                       </div>
                    </div>
                 </div>
               )}

               {/* --- CONTACT SECTION --- */}
               {activeSection === 'contact' && (
                 <div className="space-y-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
                   <ContactSection institution={inst} primaryColor={inst.theme.primaryColor} lang={lang} />
                 </div>
               )}

            </div>

            {/* Sticky Sidebar Profile Context */}
            <aside className="lg:col-span-3 space-y-6 md:space-y-8 lg:sticky lg:top-36 self-start max-h-[calc(100vh-9rem)] overflow-y-auto scrollbar-hide pb-10">
               <div className="p-6 md:p-10 bg-white border border-slate-100 shadow-3xl overflow-hidden relative" style={{borderRadius: themeStyle['--radius' as any]}}>
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
                           <p className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter">Est. {inst.metadata.establishedYear}</p>
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1 md:mb-2">Capacity</p>
                           <p className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter">{inst.metadata.studentCount} Pupils</p>
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
                        <span className="text-xs font-bold text-slate-900">{inst.metadata.gender}</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-xs font-medium text-slate-500">Boarding</span>
                        <span className="text-xs font-bold text-slate-900">{inst.metadata.isBoarding ? 'Yes' : 'No'}</span>
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
                  <button onClick={() => setActiveSection('contact')} className="w-full py-4 bg-white text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-colors">
                     Send Message
                  </button>
               </div>
            </aside>
         </div>
      </div>
    </div>
  );
};

export default InstitutionProfile;
