import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, FileText, Bell, AlertTriangle, TrendingUp, BarChart3, GraduationCap, Download, Filter, Search, ChevronRight, ExternalLink, Calendar, MapPin, Award } from 'lucide-react';
import { ExamResult, SchoolPerformance, PolicyAnnouncement } from '../types';

const MinistryCorner: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const announcements: PolicyAnnouncement[] = [
    { 
      id: 'p1', 
      title: '2025 Calendar Adjustments for Winter Terms', 
      content: 'All schools are advised of a one-week extension for the second term to accommodate curriculum recovery from regional climate disruptions.', 
      category: 'policy', 
      date: '2025-05-10', 
      isUrgent: true,
      author: 'Principal Secretary, MoET' 
    },
    { 
      id: 'p2', 
      title: 'Mandatory Digital Literacy Integration', 
      content: 'New guidelines requiring at least 2 hours per week of integrated ICT learning for Grades 4 through 7 will take effect starting January 2026.', 
      category: 'curriculum', 
      date: '2025-04-22', 
      isUrgent: false,
      author: 'Director of Education' 
    },
    { 
      id: 'p3', 
      title: 'MoET Grant Portal Open for Registered Institutions', 
      content: 'Registered private and mission schools can now apply for the 2025/26 infrastructure improvement grants via the portal.', 
      category: 'finance', 
      date: '2025-05-01', 
      isUrgent: true,
      author: 'Finance Department' 
    },
    { 
      id: 'p4', 
      title: 'National School Sports Qualifiers Schedule', 
      content: 'The regional qualifiers for the National School Athletics reach will commence on June 15th across all four regions.', 
      category: 'general', 
      date: '2025-05-15', 
      isUrgent: false,
      author: 'School Inspectorate' 
    },
    { 
      id: 'p5', 
      title: 'Revised Competency-Based Education (CBE) Framework', 
      content: 'The Ministry of Education and Training has finalized the rollout of the new CBE framework for Junior Secondary Schools, prioritizing skills acquisition over rote memorization.', 
      category: 'curriculum', 
      date: '2025-10-12', 
      isUrgent: false 
    }
  ];

  const examResults: ExamResult[] = [
    { 
      id: 'e1',
      level: 'EGCSE', 
      year: 2024, 
      passRate: 91.4, 
      topStudent: 'Sibusiso Mabuza (St. Marks)', 
      averageScore: 78.5, 
      merits: 450, 
      credits: 1200, 
      topPerformers: [{ name: "Sarah Dlamini", position: 1 }, { name: "Musa Mamba", position: 2 }],
      regionalPerformance: [
        { region: 'Hhohho', average: 82.1 },
        { region: 'Manzini', average: 80.4 },
        { region: 'Lubombo', average: 75.8 },
        { region: 'Shiselweni', average: 74.2 }
      ]
    },
    { 
      id: 'e2',
      level: 'EPC', 
      year: 2024, 
      passRate: 94.2, 
      topStudent: 'Lindiwe Dlamini (Ka-Schiele)', 
      averageScore: 82.1, 
      merits: 800, 
      credits: 2100,
      regionalPerformance: [
        { region: 'Hhohho', average: 85.5 },
        { region: 'Manzini', average: 84.1 },
        { region: 'Lubombo', average: 79.2 },
        { region: 'Shiselweni', average: 78.0 }
      ]
    }
  ];

  const performanceStats: SchoolPerformance[] = [
    { 
      id: 's1',
      institutionId: 'inst-1',
      nationalRanking: 5, 
      regionalRanking: 1, 
      valueAddedScore: 8.5, 
      studentGrowth: 15,
      academicGrowth: 12.5,
      teacherStudentRatio: '1:24',
      infrastructureRating: 8.5,
      extracurricularBreadth: 7.8,
      complianceScore: 98,
      category: 'High School',
      year: 2025
    },
    { 
      id: 's2',
      institutionId: 'inst-2',
      nationalRanking: 2, 
      regionalRanking: 2, 
      valueAddedScore: 9.2, 
      studentGrowth: 18,
      academicGrowth: 8.2,
      teacherStudentRatio: '1:18',
      infrastructureRating: 9.2,
      extracurricularBreadth: 9.5,
      complianceScore: 100,
      category: 'Primary School',
      year: 2025
    }
  ];

  const filteredAnnouncements = activeCategory === 'all' 
    ? announcements 
    : announcements.filter(a => a.category === activeCategory);

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Section */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Coat_of_arms_of_Eswatini.svg/1024px-Coat_of_arms_of_Eswatini.svg.png" className="w-6 h-6 object-contain brightness-0 invert" alt="Eswatini Coat of Arms" />
            </div>
            <span className="text-blue-600 font-black uppercase tracking-widest text-[10px]">Ministry of Education & Training</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter mb-6">
            Ministry <span className="text-blue-600">Corner</span>
          </h1>
          <p className="text-slate-500 text-xl max-w-3xl leading-relaxed font-medium">
            The official central repository for Eswatini's educational policies, national performance benchmarks, and urgent governmental directives.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Area: Announcements & Policy */}
          <div className="lg:col-span-2 space-y-12">
            <section id="announcements">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                  <Bell className="text-amber-500 w-8 h-8" /> Announcements
                </h2>
                <div className="flex bg-white rounded-full p-1 border border-slate-200 shadow-sm overflow-x-auto scrollbar-hide max-w-full">
                  {['all', 'curriculum', 'finance', 'safety', 'general'].map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                {filteredAnnouncements.map((ann, idx) => (
                  <motion.div 
                    key={ann.id} 
                    className={`bg-white rounded-[40px] p-8 border ${ann.isUrgent ? 'border-rose-100 bg-rose-50/10' : 'border-slate-100'} shadow-sm relative overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
                    initial={{ opacity: 0, y: 30 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: idx * 0.1 }}
                  >
                    {ann.isUrgent && (
                      <div className="absolute top-0 right-0 bg-rose-500 text-white px-6 py-2 rounded-bl-3xl text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                        <AlertTriangle className="w-3 h-3" /> Urgent Directive
                      </div>
                    )}
                    <div className="flex gap-8 items-start">
                      <div className={`w-16 h-16 rounded-3xl flex items-center justify-center flex-shrink-0 shadow-inner ${ann.isUrgent ? 'bg-rose-100 text-rose-600' : 'bg-slate-50 text-slate-400'}`}>
                        {ann.category === 'curriculum' && <BookOpen className="w-8 h-8" />}
                        {ann.category === 'finance' && <BarChart3 className="w-8 h-8" />}
                        {ann.category === 'safety' && <AlertTriangle className="w-8 h-8" />}
                        {ann.category === 'general' && <FileText className="w-8 h-8" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${ann.isUrgent ? 'bg-rose-100 text-rose-600' : 'bg-blue-50 text-blue-600'}`}>
                            {ann.category}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {new Date(ann.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{ann.title}</h3>
                        <p className="text-slate-600 text-base leading-relaxed font-medium mb-6">
                          {ann.content}
                        </p>
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-900 bg-slate-50 hover:bg-slate-100 px-5 py-3 rounded-2xl transition-all">
                            <Download className="w-4 h-4" /> Download Full PDF
                          </button>
                          <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-600 hover:translate-x-1 transition-all">
                            Read Online <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Policy Updates Section */}
            <section id="policies">
              <div className="bg-slate-900 rounded-[50px] p-12 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20 -mr-32 -mt-32"></div>
                <div className="relative z-10">
                  <h2 className="text-3xl font-black mb-4 flex items-center gap-3">
                    <FileText className="text-blue-400 w-8 h-8" /> National Policy Updates 2025
                  </h2>
                  <p className="text-slate-400 text-lg mb-10 max-w-xl">
                    Long-term strategic changes to Eswatini's educational ecosystem.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { icon: <Award />, title: "Vocational Focus", desc: "Shifting 30% of high school curricula toward technical and vocational training." },
                      { icon: <MapPin />, title: "Rural Redistribution", desc: "New incentives for TSC teachers posted to remote areas in Shiselweni." },
                      { icon: <TrendingUp />, title: "E-Exam Pilot", desc: "Form 5 mock exams in IT-ready centers to be conducted digitally." },
                      { icon: <GraduationCap />, title: "OVC Support", desc: "Introduction of direct-to-school digital vouchers for uniform and books." }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4 p-6 bg-white/5 border border-white/10 rounded-[32px] hover:bg-white/10 transition-all">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-blue-400 flex-shrink-0">
                          {React.cloneElement(item.icon as React.ReactElement, { className: "w-6 h-6" })}
                        </div>
                        <div>
                          <h4 className="font-bold text-base mb-1">{item.title}</h4>
                          <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar Area: Results & Performance Stats */}
          <div className="space-y-12">
            {/* National Exam Results */}
            <section id="results">
              <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <GraduationCap className="text-blue-600 w-7 h-7" /> Exam Results
              </h2>
              <div className="space-y-4">
                {examResults.map((er, idx) => (
                  <div key={idx} className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm hover:shadow-md transition-all text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
                    <div className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-4">{er.level} National Census</div>
                    <div className="text-5xl font-black text-slate-900 mb-2 tracking-tighter">{er.passRate}%</div>
                    <div className="text-xs font-bold text-slate-400 mb-8 uppercase tracking-widest">Aggregate Pass Rate {er.year}</div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="p-4 bg-slate-50 rounded-3xl">
                        <div className="text-xl font-black text-slate-900">{er.merits}</div>
                        <div className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Merits</div>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-3xl">
                        <div className="text-xl font-black text-slate-900">{er.credits}</div>
                        <div className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Credits</div>
                      </div>
                    </div>

                    {er.topPerformers && (
                      <div className="text-left bg-blue-50/50 p-6 rounded-3xl border border-blue-100/50">
                        <h4 className="text-[10px] font-black text-blue-700 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <Award className="w-4 h-4" /> Top National Performers
                        </h4>
                        <div className="space-y-3">
                          {er.topPerformers.map((p, i) => (
                            <div key={i} className="flex items-center justify-between">
                              <span className="text-xs font-bold text-slate-700">{p.name}</span>
                              <span className="text-[10px] font-black text-blue-600">RANK #{p.position}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* School Performance Statistics */}
            <section id="statistics">
              <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <BarChart3 className="text-emerald-500 w-7 h-7" /> Performance Stats
              </h2>
              <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm">
                <div className="space-y-8">
                  {performanceStats.map((ps, idx) => (
                    <div key={idx} className="relative pl-6 border-l-2 border-slate-100 group">
                      <div className="absolute top-0 left-[-5px] w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-emerald-50 group-hover:scale-150 transition-all"></div>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="text-lg font-black text-slate-900">{ps.year} Academic Cycle</div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Growth Index: +{ps.studentGrowth}%</div>
                        </div>
                        <div className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-3 py-1 rounded-lg">VERIFIED</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                          <span className="text-[9px] font-black text-slate-400 uppercase">National Rank</span>
                          <span className="text-xl font-black text-slate-900">#{ps.nationalRanking}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[9px] font-black text-slate-400 uppercase">Regional Rank</span>
                          <span className="text-xl font-black text-slate-900">#{ps.regionalRanking}</span>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-slate-50">
                        <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-2">
                          <span>Value Added Score</span>
                          <span>{ps.valueAddedScore}/10</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-emerald-500" 
                            initial={{ width: 0 }} 
                            animate={{ width: `${(ps.valueAddedScore / 10) * 100}%` }} 
                            transition={{ duration: 1, delay: idx * 0.2 }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className="w-full mt-10 p-5 rounded-[24px] border-2 border-dashed border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" /> Download 2025 Annual Census
                </button>
              </div>
            </section>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-32 bg-blue-600 rounded-[60px] p-16 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl font-black mb-6 tracking-tighter">Stay Connected with MoET</h2>
            <p className="text-blue-100 text-lg mb-10 font-medium">
              Join 50,000+ educators and parents receiving real-time policy alerts and exam result notifications directly.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <input 
                type="email" 
                placeholder="official@school.ac.sz" 
                className="w-full md:w-80 px-8 py-5 rounded-[24px] bg-white text-slate-900 font-bold border-none focus:ring-4 focus:ring-blue-400 outline-none" 
              />
              <button className="w-full md:w-auto bg-slate-900 px-12 py-5 rounded-[24px] font-black uppercase tracking-widest text-xs hover:bg-slate-800 transition-all shadow-xl">
                Subscribe Now
              </button>
            </div>
            <p className="mt-6 text-sm text-blue-200 opacity-60">© 2025 Ministry of Education & Training, Kingdom of Eswatini</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinistryCorner;
