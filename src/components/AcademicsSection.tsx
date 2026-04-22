
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
import { Institution } from '../../types';

interface AcademicsSectionProps {
  academics: Institution['sections']['academics'];
  primaryColor: string;
}

const AcademicsSection: React.FC<AcademicsSectionProps> = ({ academics, primaryColor }) => {
  const [selectedDept, setSelectedDept] = useState<number | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

  return (
    <div className="space-y-32 pb-20">
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

      {/* 3. Departments & 4. Programs */}
      <section className="space-y-16">
        <div className="flex justify-between items-end">
          <div className="space-y-4">
            <h3 className="text-4xl font-black text-slate-900 tracking-tight">Departments & Programs</h3>
            <p className="text-slate-500 font-medium">Explore our diverse academic landscape</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Departments List */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Academic Departments</h4>
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
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Head of Department</p>
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
                              <p className="text-sm font-bold">{prog.requirements}</p>
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

      {/* 5. Academic Calendar */}
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
          <div className="p-10 bg-slate-900 text-white rounded-[48px] flex items-center gap-8">
            <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center shrink-0">
              <ClipboardCheck className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Examination Periods</p>
              <p className="text-lg font-bold">{academics.calendar.examPeriods}</p>
            </div>
          </div>
          <div className="p-10 bg-white border border-slate-200 rounded-[48px] flex items-center gap-8">
            <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center shrink-0">
              <Star className="w-8 h-8 text-amber-500" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Holiday Breaks</p>
              <p className="text-lg font-bold text-slate-900">{academics.calendar.holidays}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Assessment & 7. Support */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <section className="p-14 bg-white border border-slate-100 rounded-[64px] shadow-sm space-y-12">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-blue-50 rounded-3xl flex items-center justify-center">
              <ClipboardCheck className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">Assessment Approach</h3>
          </div>
          <div className="space-y-8">
            <div className="p-8 bg-slate-50 rounded-[40px]">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Evaluation Strategy</p>
              <p className="text-lg font-bold text-slate-700 leading-relaxed italic">"{academics.assessment.approach}"</p>
            </div>
            <div>
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">Grading System</p>
              <p className="text-2xl font-black text-slate-900 tracking-tight">{academics.assessment.gradingSystem}</p>
            </div>
          </div>
        </section>

        <section className="p-14 bg-slate-900 text-white rounded-[64px] shadow-2xl space-y-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-14 opacity-10">
            <LifeBuoy className="w-40 h-40" />
          </div>
          <div className="flex items-center gap-6 relative z-10">
            <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center">
              <LifeBuoy className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-3xl font-black tracking-tight">Academic Support</h3>
          </div>
          <div className="space-y-8 relative z-10">
            <p className="text-lg font-medium text-slate-300 leading-relaxed">{academics.support.description}</p>
            <div className="flex flex-wrap gap-3">
              {academics.support.services.map((service, idx) => (
                <span key={idx} className="px-6 py-3 bg-white/10 rounded-2xl text-xs font-black uppercase tracking-widest border border-white/10">
                  {service}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* 8. Faculty & Teaching Staff */}
      <section className="space-y-16">
        <div className="text-center space-y-4">
          <h3 className="text-4xl font-black text-slate-900 tracking-tight">Faculty & Teaching Staff</h3>
          <p className="text-slate-500 font-medium">Led by world-class educators and industry experts</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="p-12 bg-white border border-slate-100 rounded-[64px] shadow-sm space-y-10">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-slate-900 rounded-[32px] flex items-center justify-center text-3xl">👨‍🏫</div>
                <div>
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Academic Head</p>
                  <h4 className="text-3xl font-black text-slate-900 tracking-tight">{academics.staff.head.name}</h4>
                </div>
              </div>
              <div className="space-y-6">
                <div className="p-6 bg-slate-50 rounded-3xl">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Qualifications</p>
                  <p className="text-sm font-bold text-slate-800">{academics.staff.head.qualifications}</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-3xl">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Experience</p>
                  <p className="text-sm font-bold text-slate-800">{academics.staff.head.experience}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 bg-slate-50 rounded-[56px] border border-slate-100 text-center space-y-4">
              <p className="text-6xl font-black text-slate-900 tracking-tighter">{academics.staff.totalCount}</p>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Total Educators</p>
            </div>
            <div className="p-10 bg-slate-50 rounded-[56px] border border-slate-100 text-center space-y-4">
              <p className="text-6xl font-black text-slate-900 tracking-tighter">{academics.staff.avgExperience}</p>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Avg Experience</p>
            </div>
            <div className="md:col-span-2 p-10 bg-white border border-slate-100 rounded-[56px] shadow-sm space-y-8">
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest text-center">Professional Certifications</p>
              <div className="flex flex-wrap justify-center gap-4">
                {academics.staff.certifications.map((cert, idx) => (
                  <span key={idx} className="px-6 py-3 bg-slate-50 rounded-2xl text-[10px] font-black text-slate-600 uppercase tracking-widest border border-slate-100">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

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

      {/* 10. Research (Optional) */}
      {academics.research && (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="p-14 bg-white border border-slate-100 rounded-[64px] shadow-sm space-y-10">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-indigo-50 rounded-3xl flex items-center justify-center">
                <Microscope className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">Research & Innovation</h3>
            </div>
            <div className="space-y-8">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Focus Areas</p>
                <p className="text-xl font-bold text-slate-900">{academics.research.focus}</p>
              </div>
              <div className="p-6 bg-slate-50 rounded-3xl">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Published Papers</p>
                <p className="text-sm font-medium text-slate-600">{academics.research.papers}</p>
              </div>
            </div>
          </div>
          <div className="p-14 bg-indigo-900 text-white rounded-[64px] shadow-2xl space-y-10 relative overflow-hidden">
            <div className="absolute bottom-0 right-0 p-14 opacity-10">
              <Briefcase className="w-40 h-40" />
            </div>
            <div className="flex items-center gap-6 relative z-10">
              <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center">
                <Briefcase className="w-8 h-8 text-indigo-400" />
              </div>
              <h3 className="text-3xl font-black tracking-tight">Partnerships</h3>
            </div>
            <div className="space-y-6 relative z-10">
              <p className="text-lg font-medium text-indigo-100 leading-relaxed">{academics.research.partnerships}</p>
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-white/10" />
                <button className="text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:text-white transition-colors">View Repository →</button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 11. Facilities & 12. Digital */}
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

      {/* 13. Industry Partnerships */}
      <section className="p-16 md:p-24 bg-slate-900 text-white rounded-[80px] shadow-3xl relative overflow-hidden">
        <div className="absolute top-0 left-0 p-24 opacity-5 text-[15rem] leading-none select-none">🤝</div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-10">
          <div className="space-y-10">
            <h3 className="text-5xl font-black tracking-tight leading-tight">Industry & Community Partnerships</h3>
            <p className="text-xl text-slate-400 font-medium leading-relaxed">
              Bridging the gap between academic theory and real-world application through strategic collaborations.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8">
            <div className="p-10 bg-white/5 rounded-[48px] border border-white/10 backdrop-blur-md space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-black tracking-tight">Internships & Placements</h4>
              </div>
              <p className="text-slate-300 font-medium leading-relaxed">{academics.partnerships.internships}</p>
            </div>
            <div className="p-10 bg-white/5 rounded-[48px] border border-white/10 backdrop-blur-md space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-black tracking-tight">Collaborations</h4>
              </div>
              <p className="text-slate-300 font-medium leading-relaxed">{academics.partnerships.collaborations}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AcademicsSection;
