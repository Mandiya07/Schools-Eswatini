
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  GraduationCap, 
  Users, 
  Calendar, 
  ClipboardCheck, 
  LifeBuoy, 
  Trophy, 
  Microscope, 
  Monitor, 
  Briefcase,
  ChevronDown,
  ChevronRight,
  Download,
  Award,
  Star,
  Search,
  CheckCircle2
} from 'lucide-react';
import { Institution, InstitutionType } from '../../types';

interface AcademicsSectionProps {
  academics: Institution['sections']['academics'];
  primaryColor: string;
  institutionType: Institution['type'];
}

const AcademicsSection: React.FC<AcademicsSectionProps> = ({ academics, primaryColor, institutionType }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'staff' | 'departments' | 'performance' | 'faculty'>('overview');
  const [selectedDept, setSelectedDept] = useState<number | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

  const isTertiary = Array.isArray(institutionType) ? institutionType.includes(InstitutionType.TERTIARY) : institutionType === InstitutionType.TERTIARY;
  const isPrimary = Array.isArray(institutionType) ? institutionType.includes(InstitutionType.PRIMARY) : institutionType === InstitutionType.PRIMARY;

  const getTabLabel = (id: string, defaultLabel: string) => {
    if (id === 'departments') {
      return isTertiary ? 'Faculties' : isPrimary ? 'Grades & Phases' : 'Departments';
    }
    if (id === 'staff') {
      return isTertiary ? 'Faculty' : isPrimary ? 'Teachers' : 'Staff';
    }
    if (id === 'faculty') {
      return 'Faculty Experts';
    }
    return defaultLabel;
  };

  const tabs = [
    { id: 'overview', label: 'Overview & Curriculum', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'departments', label: `${getTabLabel('departments', 'Departments')} & Programs`, icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'staff', label: `${getTabLabel('staff', 'Staff')} Profiles`, icon: <Users className="w-4 h-4" /> },
    { id: 'faculty', label: getTabLabel('faculty', 'Faculty'), icon: <Users className="w-4 h-4" /> },
    { id: 'performance', label: 'Performance & Tools', icon: <Award className="w-4 h-4" /> },
  ] as const;

  return (
    <div className="space-y-16 pb-20">
      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-2 p-2 bg-slate-100 rounded-[32px] max-w-fit mx-auto sticky top-24 z-30 shadow-sm border border-white/50 backdrop-blur-md">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-3 px-8 py-4 rounded-[24px] text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTab === tab.id
                ? 'bg-white text-blue-600 shadow-md scale-105'
                : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "circOut" }}
          className="space-y-24"
        >
          {activeTab === 'overview' && (
            <>
              {/* 1. Academic Overview */}
              <section className="relative">
                <div className="max-w-4xl space-y-8">
                  <div className="flex items-center gap-4">
                    <span className="h-px w-12 bg-blue-600" />
                    <h2 className="text-[11px] font-black text-blue-600 uppercase tracking-[0.3em]">Academic Excellence</h2>
                  </div>
                  <h3 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9]">
                    {academics.overview.headline}
                  </h3>
                  <p className="text-2xl text-slate-500 font-medium leading-relaxed">
                    {academics.overview.introduction}
                  </p>
                </div>
              </section>

              {/* 2. Curriculum Structure */}
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-5 space-y-10">
                  <div className="p-12 bg-slate-900 text-white rounded-[64px] shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-10">
                      <BookOpen className="w-40 h-40" />
                    </div>
                    <div className="relative z-10 space-y-8">
                      <h4 className="text-3xl font-black tracking-tight">Curriculum Framework</h4>
                      <div className="space-y-6">
                        <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                          <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2">Structure</p>
                          <p className="text-lg font-bold text-slate-100">{academics.curriculum.structure}</p>
                        </div>
                        <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                          <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2">Examination Body</p>
                          <p className="text-lg font-bold text-slate-100">{academics.curriculum.examinationBody}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-7 flex flex-col justify-center">
                  <div className="p-12 bg-slate-50 rounded-[64px] border border-slate-100 italic">
                    <p className="text-2xl text-slate-600 font-medium leading-relaxed">
                      "{academics.curriculum.description}"
                    </p>
                  </div>
                </div>
              </section>

              {academics.tuitionFees && (academics.tuitionFees.perTerm || academics.tuitionFees.perYear) && (
                <section className="bg-slate-50 p-12 md:p-16 rounded-[64px] border border-slate-100 space-y-10 relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px]" />
                   <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8 mb-4">
                      <div>
                         <h3 className="text-3xl font-black text-slate-900 tracking-tight">Tuition & Fees</h3>
                         <p className="text-slate-500 font-medium mt-2">Estimated cost of attendance for the academic year</p>
                      </div>
                      <div className="px-6 py-3 bg-white border border-slate-200 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Subject to Change
                      </div>
                   </div>

                   <div className="relative z-10 bg-white p-8 md:p-12 rounded-[40px] shadow-xl shadow-slate-200/20 border border-slate-100">
                      <ul className="space-y-6 list-disc pl-6 marker:text-emerald-500">
                         {academics.tuitionFees.perTerm && (
                           <li>
                             <span className="font-bold text-slate-600 mr-2 text-lg">Per Term:</span>
                             <span className="font-black text-slate-900 text-xl">{academics.tuitionFees.perTerm}</span>
                           </li>
                         )}
                         {academics.tuitionFees.perYear && (
                           <li>
                             <span className="font-bold text-slate-600 mr-2 text-lg">Per Year:</span>
                             <span className="font-black text-slate-900 text-xl">{academics.tuitionFees.perYear}</span>
                           </li>
                         )}
                         {academics.tuitionFees.additionalFees && academics.tuitionFees.additionalFees.length > 0 && (
                           <li>
                             <span className="font-bold text-slate-600 text-lg">Additional Fees:</span>
                             <ul className="mt-4 space-y-3 list-[circle] pl-6 marker:text-slate-300">
                               {academics.tuitionFees.additionalFees.map((fee, idx) => (
                                 <li key={idx}>
                                   <span className="font-bold text-slate-500">{fee.label}: </span>
                                   <span className="font-black text-slate-800">{fee.amount}</span>
                                 </li>
                               ))}
                             </ul>
                           </li>
                         )}
                      </ul>
                   </div>
                </section>
              )}
            </>
          )}

          {activeTab === 'departments' && (
            <section className="space-y-16 animate-in fade-in transition-all duration-700">
              <div className="flex justify-between items-end">
                <div className="space-y-4">
                  <h3 className="text-4xl font-black text-slate-900 tracking-tight">
                    {isTertiary ? 'Faculties & Degree Programs' : isPrimary ? 'Grades, Phases & Activities' : 'Departments & Programs'}
                  </h3>
                  <p className="text-slate-500 font-medium">Explore our diverse academic landscape</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Departments List */}
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">
                    {getTabLabel('departments', 'Academic Departments')}
                  </h4>
                  {academics.departments.map((dept, idx) => (
                    <motion.div
                      key={idx}
                      className={`p-10 rounded-[48px] border transition-all cursor-pointer group ${selectedDept === idx ? 'bg-white border-blue-500 shadow-2xl' : 'bg-slate-50 border-slate-100 hover:bg-white hover:border-slate-200'}`}
                      onClick={() => setSelectedDept(idx === selectedDept ? null : idx)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-6">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${selectedDept === idx ? 'bg-blue-600 text-white' : 'bg-white text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600'}`}>
                            {dept.icon ? <span className="text-2xl">{dept.icon}</span> : <BookOpen className="w-6 h-6" />}
                          </div>
                          <div>
                            <h5 className="text-xl font-black text-slate-900 tracking-tight">{dept.name}</h5>
                            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-1">
                              {dept.subjects && dept.subjects.length > 0 ? `${dept.subjects.length} Subjects` : 'Explore Programs'}
                            </p>
                          </div>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-slate-300 transition-transform duration-500 ${selectedDept === idx ? 'rotate-180 text-blue-600' : ''}`} />
                      </div>

                      <AnimatePresence>
                        {selectedDept === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-8 mt-8 border-t border-slate-100 space-y-6">
                              {dept.overview && (
                                <div className="space-y-3">
                                  <h6 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Overview</h6>
                                  <p className="text-slate-500 font-medium leading-relaxed">{dept.overview}</p>
                                </div>
                              )}
                              
                              <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl space-y-6">
                                <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                                    <Users className="w-5 h-5 text-slate-400" />
                                  </div>
                                  <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                      {isPrimary ? 'Lead Teacher' : isTertiary ? 'Dean of Faculty' : 'Head of Department'}
                                    </p>
                                    <p className="text-sm font-bold text-slate-900">{dept.head || 'To be announced'}</p>
                                  </div>
                                </div>

                                {dept.subjects && dept.subjects.length > 0 && (
                                  <div className="space-y-3 pt-6 border-t border-slate-200/60">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Subjects Taught</p>
                                    <div className="flex flex-wrap gap-2">
                                      {dept.subjects.map((s, i) => (
                                        <span key={i} className="px-4 py-2 bg-white rounded-xl text-[10px] font-black text-slate-600 uppercase tracking-widest shadow-sm border border-slate-100">{s}</span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>

                {/* Programs List */}
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Featured Programs</h4>
                  <div className="grid grid-cols-1 gap-6">
                    {academics.programs.map((prog) => (
                      <motion.div
                        key={prog.id}
                        className={`p-10 rounded-[48px] border transition-all cursor-pointer group ${selectedProgram === prog.id ? 'bg-slate-900 text-white border-slate-800 shadow-2xl' : 'bg-white border-slate-100 hover:border-blue-500 hover:shadow-xl'}`}
                        onClick={() => setSelectedProgram(prog.id === selectedProgram ? null : prog.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${selectedProgram === prog.id ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'}`}>
                              {prog.qualification}
                            </span>
                            <h5 className="text-2xl font-black tracking-tight">{prog.name}</h5>
                          </div>
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${selectedProgram === prog.id ? 'bg-white/10' : 'bg-slate-50'}`}>
                            <GraduationCap className={`w-6 h-6 ${selectedProgram === prog.id ? 'text-blue-400' : 'text-slate-400'}`} />
                          </div>
                        </div>

                        <AnimatePresence>
                          {selectedProgram === prog.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="pt-8 mt-8 border-t border-white/10 space-y-8">
                                <p className="text-slate-400 font-medium leading-relaxed">{prog.description}</p>
                                <div className="grid grid-cols-2 gap-6">
                                  <div>
                                    <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-1">Duration</p>
                                    <p className="text-sm font-bold">{prog.duration}</p>
                                  </div>
                                  <div>
                                    <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-1">Requirements</p>
                                    {typeof prog.requirements === 'string' ? (
                                      <p className="text-sm font-bold">{prog.requirements}</p>
                                    ) : (
                                      <ul className="list-disc pl-5 text-sm font-bold space-y-1">
                                        {(prog.requirements?.academic || []).map((req, i) => <li key={`ac-${i}`}>{req}</li>)}
                                        {(prog.requirements?.documents || []).length > 0 && 
                                          <li className="list-none text-[9px] font-black text-blue-400 uppercase mt-4 -ml-5">Documents Required:</li>
                                        }
                                        {(prog.requirements?.documents || []).map((req, i) => <li key={`doc-${i}`}>{req}</li>)}
                                        {(prog.requirements?.additional || []).length > 0 && 
                                          <li className="list-none text-[9px] font-black text-blue-400 uppercase mt-4 -ml-5">Additional Requirements:</li>
                                        }
                                        {(prog.requirements?.additional || []).map((req, i) => <li key={`add-${i}`}>{req}</li>)}
                                      </ul>
                                    )}
                                  </div>
                                </div>
                                {prog.syllabusUrl && (
                                  <a href={prog.syllabusUrl} target="_blank" rel="noreferrer" download className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-900 transition-all">
                                    <Download className="w-4 h-4" /> Download Syllabus
                                  </a>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'staff' && (
            <section className="space-y-16 animate-in fade-in transition-all duration-700">
              <div className="text-center space-y-4">
                <h3 className="text-5xl font-black text-slate-900 tracking-tight">
                  {isTertiary ? 'Our Distinguished Faculty' : isPrimary ? 'Our Dedicated Teachers' : 'Our Academic Staff'}
                </h3>
                <p className="text-xl text-slate-500 font-medium max-w-3xl mx-auto">
                  Meet the world-class educators and subject matter experts who lead our academic community and inspire our students to excel.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-5">
                  <div className="p-12 bg-white border border-slate-100 rounded-[64px] shadow-sm space-y-10 sticky top-48">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 bg-slate-900 rounded-[32px] flex items-center justify-center text-3xl shadow-xl shadow-slate-200">👨‍🏫</div>
                      <div>
                        <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Academic Leadership</p>
                        <h4 className="text-3xl font-black text-slate-900 tracking-tight">{academics.staff.head.name}</h4>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 shadow-inner">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Qualifications</p>
                        <p className="text-lg font-bold text-slate-800 leading-tight">{academics.staff.head.qualifications}</p>
                      </div>
                      <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 shadow-inner">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Academic Experience</p>
                        <p className="text-lg font-bold text-slate-800">{academics.staff.head.experience}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-12 bg-blue-600 rounded-[64px] text-center space-y-2 shadow-2xl shadow-blue-200">
                    <p className="text-7xl font-black text-white tracking-tighter">{academics.staff.totalCount}</p>
                    <p className="text-[11px] font-black text-blue-100 uppercase tracking-[0.3em]">Total Educators</p>
                  </div>
                  <div className="p-12 bg-slate-900 rounded-[64px] text-center space-y-2 shadow-2xl shadow-slate-200">
                    <p className="text-7xl font-black text-white tracking-tighter">{academics.staff.avgExperience}</p>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Avg Experience</p>
                  </div>
                  <div className="md:col-span-2 p-12 bg-white border border-slate-100 rounded-[64px] shadow-sm space-y-10">
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] text-center">Faculty Certifications & Expertise</p>
                    <div className="flex flex-wrap justify-center gap-4">
                      {academics.staff.certifications.map((cert, idx) => (
                        <span key={idx} className="px-8 py-4 bg-slate-50 rounded-[20px] text-[10px] font-black text-slate-600 uppercase tracking-widest border border-slate-100 transition-colors hover:bg-blue-50 hover:text-blue-600">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Staff Profiles Card Grid */}
              {academics.staff.profiles && academics.staff.profiles.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                  {academics.staff.profiles.map((profile) => (
                    <motion.div 
                      key={profile.id} 
                      whileHover={{ y: -10 }}
                      className="bg-white rounded-[48px] border border-slate-100 shadow-sm overflow-hidden group hover:shadow-2xl hover:border-blue-500 transition-all duration-500"
                    >
                      <div className="h-64 overflow-hidden bg-slate-100 relative">
                        {profile.image ? (
                          <img src={profile.image} alt={profile.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-300">
                            <Users className="w-20 h-20" />
                          </div>
                        )}
                        <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                           <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                            {profile.role}
                          </span>
                        </div>
                      </div>
                      <div className="p-10 space-y-6">
                        <div>
                          <h5 className="text-2xl font-black text-slate-900 tracking-tight">{profile.name}</h5>
                          <p className="text-xs font-bold text-blue-600 mt-2 uppercase tracking-widest">{profile.qualifications || 'Qualifications not specified'}</p>
                        </div>
                        <div className="pt-6 border-t border-slate-50">
                          <p className="text-sm font-medium text-slate-500 leading-relaxed line-clamp-4">
                            {profile.professionalBackground || 'Biography not provided.'}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </section>
          )}

          {activeTab === 'faculty' && (
            <section className="space-y-16 animate-in fade-in transition-all duration-700">
              <div className="text-center space-y-4">
                <h3 className="text-5xl font-black text-slate-900 tracking-tight">Faculty Experts</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(academics.faculty || []).map((f, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                    {f.photo && <img src={f.photo} alt={f.name} className="w-24 h-24 rounded-full object-cover" />}
                    <h4 className="text-xl font-black text-slate-900">{f.name}</h4>
                    <p className="text-sm font-bold text-blue-600 uppercase tracking-widest">{f.title}</p>
                    <p className="text-xs font-bold text-slate-500">{f.qualifications}</p>
                    <p className="text-sm text-slate-600">{f.bio}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === 'performance' && (
            <div className="space-y-24 animate-in fade-in transition-all duration-700">
              {/* 9. Performance & Achievements */}
              <section className="p-16 md:p-24 bg-blue-600 text-white rounded-[100px] shadow-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-24 opacity-10 text-[20rem] leading-none select-none">🏆</div>
                <div className="relative z-10 space-y-20">
                  <div className="text-center space-y-4">
                    <h3 className="text-5xl font-black tracking-tight">Academic Performance</h3>
                    <p className="text-blue-100 font-medium text-xl">Measurable outcomes of our dedication to excellence</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="text-center space-y-4">
                      <p className="text-8xl font-black tracking-tighter">{academics.performance.passRate}</p>
                      <p className="text-[11px] font-black text-blue-200 uppercase tracking-[0.4em]">Pass Rate</p>
                    </div>
                    <div className="text-center space-y-4">
                      <p className="text-8xl font-black tracking-tighter">{academics.performance.ranking}</p>
                      <p className="text-[11px] font-black text-blue-200 uppercase tracking-[0.4em]">Regional Rank</p>
                    </div>
                    <div className="text-center space-y-4">
                      <p className="text-8xl font-black tracking-tighter">{academics.performance.distinctions}</p>
                      <p className="text-[11px] font-black text-blue-200 uppercase tracking-[0.4em]">Avg Distinctions</p>
                    </div>
                  </div>

                  <div className="pt-20 border-t border-white/10">
                    <div className="flex flex-wrap justify-center gap-6">
                      {academics.performance.awards.map((award, idx) => (
                        <div key={idx} className="flex items-center gap-4 px-8 py-5 bg-white/10 rounded-[32px] border border-white/10 backdrop-blur-md">
                          <Award className="w-6 h-6 text-blue-300" />
                          <span className="text-sm font-black uppercase tracking-widest">{award}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Academic Tools Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <section className="p-14 bg-slate-50 rounded-[64px] border border-slate-100 space-y-12">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-sm">
                      <Microscope className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">Academic Facilities</h3>
                  </div>
                  <div className="space-y-8">
                    <p className="text-lg font-medium text-slate-500 leading-relaxed italic">"{academics.facilities.description}"</p>
                    <div className="grid grid-cols-2 gap-4">
                      {academics.facilities.list.map((fac, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100">
                          <CheckCircle2 className="w-4 h-4 text-blue-500" />
                          <span className="text-sm font-bold text-slate-700">{fac}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <section className="p-14 bg-white border border-slate-100 rounded-[64px] shadow-sm space-y-12">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-slate-900 text-white rounded-3xl flex items-center justify-center">
                      <Monitor className="w-8 h-8" />
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">Digital Learning</h3>
                  </div>
                  <div className="space-y-8">
                    <div className="p-6 bg-slate-900 text-white rounded-3xl">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Primary Platform</p>
                      <p className="text-xl font-black tracking-tight">{academics.digital.platform}</p>
                    </div>
                    <div className="space-y-4">
                      <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Digital Features</p>
                      <div className="flex flex-wrap gap-3">
                        {academics.digital.features.map((feat, idx) => (
                          <span key={idx} className="px-5 py-3 bg-slate-50 rounded-2xl text-[10px] font-black text-slate-600 uppercase tracking-widest border border-slate-100">
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Persistence and Footer Section */}
      <section className="p-16 md:p-24 bg-slate-50 rounded-[80px] border border-slate-100 space-y-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-4xl font-black text-slate-900 tracking-tight">Academic Calendar</h3>
            <p className="text-slate-500 font-medium">Stay updated with key terms and examination periods</p>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-slate-200 text-center px-12 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Year Starts</p>
            <p className="text-xl font-black text-slate-900">{academics.calendar.startDate}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {academics.calendar.terms.map((term, idx) => (
            <div key={idx} className="p-10 bg-white rounded-[48px] border border-slate-100 shadow-sm space-y-6 group hover:border-blue-500 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                <Calendar className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" />
              </div>
              <div>
                <h5 className="text-2xl font-black text-slate-900 mb-2">{term.name}</h5>
                <p className="text-slate-500 font-medium">{term.info}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-10 bg-slate-900 text-white rounded-[48px] flex items-center gap-8 group hover:shadow-2xl transition-all">
            <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center shrink-0">
              <ClipboardCheck className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Examination Periods</p>
              <p className="text-lg font-bold">{academics.calendar.examPeriods || 'To be announced'}</p>
            </div>
          </div>
          <div className="p-10 bg-white border border-slate-200 rounded-[48px] flex items-center gap-8 group hover:shadow-xl hover:border-amber-200 transition-all">
            <div className="w-16 h-16 bg-amber-50 rounded-3xl flex items-center justify-center shrink-0">
              <Star className="w-8 h-8 text-amber-500" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Holiday Breaks</p>
              <p className="text-lg font-bold text-slate-900">{academics.calendar.holidays || 'Refer to term schedule'}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AcademicsSection;
