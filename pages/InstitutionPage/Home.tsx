import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Institution, InstitutionType } from '../../types';
import { getOptimizedImageUrl } from '../../src/services/performanceService';
import { InquiryForm } from '../../components/EngagementFeatures';

export const InstitutionHome: React.FC = () => {
  const { inst, lang } = useOutletContext<{ inst: Institution, lang: 'en' | 'ss' }>();
  
  // Safe access to sections with defaults
  const sections = (inst.sections || {}) as Partial<Institution['sections']>;
  const acad = sections.academics || {
    overview: { headline: '', introduction: '' },
    performance: { passRate: 'N/A' },
    staff: { totalCount: 'N/A' }
  };
  const homepage = sections.homepage || {
    welcomeMessage: 'Welcome to our institution.',
    principalMessage: { text: 'We are committed to excellence.', name: '', photo: '' },
    announcements: []
  };
  const about = sections.about || {
    leadership: { principal: { name: '', photo: '', title: '' } }
  };

  const labels = {
    en: { 
      welcome: inst.type.includes(InstitutionType.ASSOCIATION) ? 'Leadership Message' : 'Principal\'s Welcome', 
      quickTitle: 'Quick Actions',
    },
    ss: { 
      welcome: inst.type.includes(InstitutionType.ASSOCIATION) ? 'Siyakwemukela' : 'Umlayeto wePrincipal', 
      quickTitle: 'Tento Letisheshako',
    }
  }[lang];

  return (
    <div className="space-y-32">
      {/* 1. Statistics Grid Strip */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="p-10 bg-slate-50 rounded-[48px] text-center border border-slate-100 group hover:bg-white hover:shadow-xl transition-all">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Pass Rate</p>
            <p className="text-4xl font-black text-blue-600 tracking-tight">{acad?.performance?.passRate || 'N/A'}</p>
        </div>
        <div className="p-10 bg-slate-50 rounded-[48px] text-center border border-slate-100 group hover:bg-white hover:shadow-xl transition-all">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Enrollment</p>
            <p className="text-4xl font-black text-slate-900 tracking-tight">{inst.metadata?.studentCount || 'N/A'}</p>
        </div>
        <div className="p-10 bg-slate-50 rounded-[48px] text-center border border-slate-100 group hover:bg-white hover:shadow-xl transition-all">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Staff</p>
            <p className="text-4xl font-black text-slate-900 tracking-tight">{acad?.staff?.totalCount || 'N/A'}</p>
        </div>
        <div className="p-10 bg-slate-50 rounded-[48px] text-center border border-slate-100 group hover:bg-white hover:shadow-xl transition-all">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Est. Year</p>
            <p className="text-4xl font-black text-slate-900 tracking-tight">{inst.metadata?.establishedYear || 'N/A'}</p>
        </div>
      </section>

      {/* 2. Welcome Message */}
      <section className="space-y-16">
        <div className="flex items-center gap-6">
            <span className="h-[2px] w-16 bg-blue-600 rounded-full" />
            <h2 className="text-[11px] font-black text-blue-600 uppercase tracking-[0.3em]">{labels.welcome}</h2>
        </div>
        <p className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.05]">{homepage.welcomeMessage}</p>
        
        <div className="bg-white p-14 rounded-[64px] border border-slate-100 flex flex-col lg:flex-row gap-16 items-center shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5 text-[10rem] font-black">"</div>
            <div className="w-56 h-72 shrink-0 overflow-hidden rounded-[40px] bg-slate-100 shadow-2xl z-10">
              <img src={getOptimizedImageUrl(homepage.principalMessage?.photo || about.leadership?.principal?.photo || '', 400, 600) || undefined} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="relative z-10">
              <blockquote className="text-3xl font-medium text-slate-600 italic leading-relaxed mb-10">"{homepage.principalMessage?.text || 'Our mission is to empower every student to reach their full potential.'}"</blockquote>
              <div className="flex items-center gap-6">
                  <div className="w-12 h-1 bg-blue-600" />
                  <div>
                    <p className="text-lg font-black text-slate-900 uppercase tracking-widest">{homepage.principalMessage?.name || about.leadership?.principal?.name || 'Head of Institution'}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">{about.leadership?.principal?.title || 'Principal'}</p>
                  </div>
              </div>
            </div>
        </div>
      </section>

      {/* 3. Quick Actions Grid */}
      <section className="space-y-12">
        <h3 className="text-2xl font-black text-slate-900 uppercase tracking-widest">{labels.quickTitle}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {sections.admissions?.enabled !== false && (
              <button className="group p-6 md:p-10 bg-blue-600 text-white rounded-[48px] shadow-2xl shadow-blue-200 flex flex-col items-center text-center transition-all hover:-translate-y-3">
                <span className="text-4xl mb-6 group-hover:scale-125 transition-transform duration-500">📄</span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Apply Now</span>
              </button>
            )}
            {sections.admissions?.enabled !== false && (
              <button className="group p-10 bg-white border border-slate-100 rounded-[48px] shadow-sm flex flex-col items-center text-center transition-all hover:-translate-y-3">
                <span className="text-4xl mb-6 group-hover:scale-125 transition-transform duration-500">🎓</span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">Scholarships</span>
              </button>
            )}
            {sections.portal?.enabled !== false && (
              <a href={sections.portal?.url || '#'} target="_blank" rel="noreferrer" className="group p-10 bg-white border border-slate-100 rounded-[48px] shadow-sm flex flex-col items-center text-center transition-all hover:-translate-y-3">
                <span className="text-4xl mb-6 group-hover:scale-125 transition-transform duration-500">🔑</span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">Portal</span>
              </a>
            )}
            <button className="group p-6 md:p-10 bg-slate-900 text-white rounded-[48px] shadow-2xl flex flex-col items-center text-center transition-all hover:-translate-y-3">
              <span className="text-4xl mb-6 group-hover:scale-125 transition-transform duration-500">📞</span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Contact</span>
            </button>
        </div>
      </section>

      {/* 4. News Carousel Teaser */}
      {sections.news?.enabled !== false && (
        <section className="space-y-16">
          <div className="flex justify-between items-end">
              <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Latest Announcements</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {[...(homepage.announcements || [])]
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
      )}

      {/* 5. PREMIUM FEATURES: Virtual Tour */}
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
                
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Lead sent to school CRM!'); }}>
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
                </form>
              </div>
          </div>
        </section>
      )}
      {/* 6. Direct Inquiry */}
      <section className="mt-24">
         <InquiryForm institution={inst} lang={lang} />
      </section>
    </div>
  );
};
