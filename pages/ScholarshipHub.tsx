
import React, { useState } from 'react';
import { Institution } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  Briefcase, 
  Users, 
  Search, 
  MapPin, 
  Calendar, 
  Award, 
  ArrowRight,
  BookOpen,
  MessageCircle,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

interface ScholarshipHubProps {
  institutions: Institution[];
}

const MOCK_EXTERNAL_SCHOLARSHIPS = [
  {
    id: 'ext1',
    name: 'Eswatini Government Ministry of Labour Bursary',
    provider: 'Government of Eswatini',
    type: 'Full Scholarship',
    eligibility: 'O-Level / EGCSE / IGCSE Graduates admitted to recognized local or SADC tertiary institutions.',
    deadline: '2026-06-30',
    tags: ['Local', 'Undergraduate', 'Bursary'],
    link: '#'
  },
  {
    id: 'ext2',
    name: 'Taiwan ICDF Higher Education Scholarship',
    provider: 'Taiwan ICDF',
    type: 'Fully Funded',
    eligibility: 'Swazi citizens applying for Undergraduate, Masters, or PhD programs in partner universities in Taiwan.',
    deadline: '2026-03-15',
    tags: ['International', 'All Levels'],
    link: '#'
  },
  {
    id: 'ext3',
    name: 'Limkokwing Founder\'s Scholarship',
    provider: 'Limkokwing University Eswatini',
    type: 'Tuition Waiver',
    eligibility: 'High-performing Swazi students demonstrating exceptional creativity or innovation.',
    deadline: '2026-05-20',
    tags: ['Local', 'Undergraduate', 'Creative'],
    link: '#'
  }
];

const LOCAL_UNIVERSITIES = [
  {
    id: 'uneswa',
    name: 'University of Eswatini (UNESWA)',
    programs: [
      { name: 'BSc in Computer Science', required: ['Mathematics', 'Physical Science', 'English Language'], desc: 'Software development, networking, and systems analysis.' },
      { name: 'BSc in Nursing', required: ['Biology', 'Mathematics', 'English Language'], desc: 'Core medical sciences and clinical practice.' },
      { name: 'Bachelor of Commerce', required: ['Mathematics', 'Accounting/Business Studies'], desc: 'Finance, accounting, and business management.' }
    ]
  },
  {
    id: 'limkokwing',
    name: 'Limkokwing University of Creative Technology',
    programs: [
      { name: 'BSc in Software Engineering', required: ['Mathematics', 'English Language'], desc: 'Focus on modern software engineering paradigms and app development.' },
      { name: 'BA in Graphic Design', required: ['English Language', 'Art & Design (Preferred)'], desc: 'Visual communication, branding, and multimedia.' }
    ]
  },
  {
    id: 'ecot',
    name: 'Eswatini College of Technology (ECOT)',
    programs: [
      { name: 'Diploma in Civil Engineering', required: ['Mathematics', 'Physical Science'], desc: 'Infrastructure, drawing, and construction.' },
      { name: 'Diploma in Hospitality Management', required: ['English Language', 'Food & Nutrition'], desc: 'Tourism, hotel operations, and culinary arts.' }
    ]
  }
];

const MOCK_ALUMNI = [
  { id: 1, name: 'Sibusiso Mamba', role: 'Software Engineer', company: 'FNB Eswatini', school: 'St. Mark\'s High', uni: 'UNESWA', tags: ['Tech', 'Engineering'] },
  { id: 2, name: 'Nontobeko Dlamini', role: 'Medical Student', company: 'Taipei Medical University', school: 'Waterford Kamhlaba', uni: 'Taiwan ICDF Scholar', tags: ['Medicine', 'International'] },
  { id: 3, name: 'Mzwandile Tsabedze', role: 'Architectural Designer', company: 'Eswatini Housing Board', school: 'Salesian High', uni: 'Limkokwing', tags: ['Architecture', 'Design'] },
];

const HIGH_SCHOOL_SUBJECTS = [
  'Mathematics', 'English Language', 'Physical Science', 'Biology', 
  'Accounting', 'Business Studies', 'Geography', 'History', 
  'Information Technology', 'Art & Design', 'Food & Nutrition'
];

const CareerAndScholarshipHub: React.FC<ScholarshipHubProps> = ({ institutions }) => {
  const [activeTab, setActiveTab] = useState<'scholarships' | 'pathways' | 'mentorship'>('pathways');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Pathways State
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  // Aggregate Internal Scholarships
  const internalScholarships = institutions.flatMap(inst => {
    return inst.sections.admissions.scholarships.types.map(type => ({
      id: `int-${inst.id}-${type}`,
      name: type,
      provider: inst.name,
      type: 'Institutional',
      eligibility: inst.sections.admissions.scholarships.eligibility,
      deadline: 'Varies',
      tags: ['Internal', inst.region],
      link: inst.sections.admissions.scholarshipApplicationLink || `#/school/${inst.slug}`
    }));
  });

  const allScholarships = [...MOCK_EXTERNAL_SCHOLARSHIPS, ...internalScholarships];

  const filteredScholarships = allScholarships.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.provider.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSubject = (subject: string) => {
    setSelectedSubjects(prev => 
      prev.includes(subject) ? prev.filter(s => s !== subject) : [...prev, subject]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 text-center space-y-6">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-purple-100 text-purple-700 rounded-full text-[10px] font-black uppercase tracking-widest">
            <Briefcase className="w-4 h-4" /> Career & Future Planning
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter">
            Design Your <span className="text-purple-600">Future</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Map your high school subjects to local university degrees, find scholarships, and connect with alumni mentors.
          </p>
        </header>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button 
            onClick={() => setActiveTab('pathways')}
            className={`px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-3 transition-all ${activeTab === 'pathways' ? 'bg-slate-900 text-white shadow-xl' : 'bg-white text-slate-500 hover:bg-slate-100'}`}
          >
            <MapPin className="w-4 h-4" /> Career Pathways
          </button>
          <button 
            onClick={() => setActiveTab('scholarships')}
            className={`px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-3 transition-all ${activeTab === 'scholarships' ? 'bg-purple-600 text-white shadow-xl' : 'bg-white text-slate-500 hover:bg-slate-100'}`}
          >
            <Award className="w-4 h-4" /> Live Scholarships
          </button>
          <button 
            onClick={() => setActiveTab('mentorship')}
            className={`px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-3 transition-all ${activeTab === 'mentorship' ? 'bg-blue-600 text-white shadow-xl' : 'bg-white text-slate-500 hover:bg-slate-100'}`}
          >
            <Users className="w-4 h-4" /> Alumni Mentors
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-[48px] shadow-sm border border-slate-100 p-8 md:p-14 overflow-hidden min-h-[600px]">
          
          {/* PATHWAYS TAB */}
          {activeTab === 'pathways' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-4 space-y-6">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">Subject Selector</h3>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">
                      Select the high school subjects you are taking (or plan to take) to see which local university programs you qualify for.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {HIGH_SCHOOL_SUBJECTS.map(subject => {
                      const isSelected = selectedSubjects.includes(subject);
                      return (
                        <button
                          key={subject}
                          onClick={() => toggleSubject(subject)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                            isSelected 
                              ? 'bg-purple-600 text-white border-purple-600 shadow-md' 
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-purple-300 hover:bg-purple-50'
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="w-3 h-3 inline-block mr-1" />}
                          {subject}
                        </button>
                      );
                    })}
                  </div>
                  {selectedSubjects.length > 0 && (
                    <button onClick={() => setSelectedSubjects([])} className="text-xs font-bold text-slate-400 hover:text-slate-600 underline">
                      Clear Selection
                    </button>
                  )}
                </div>

                <div className="lg:col-span-8 bg-slate-50 rounded-[40px] p-8 md:p-10 border border-slate-100">
                  <h3 className="text-xl font-black text-slate-900 mb-8 border-b border-slate-200 pb-4">
                    Recommended Programs {selectedSubjects.length > 0 ? `(${selectedSubjects.length} subjects selected)` : ''}
                  </h3>
                  
                  {selectedSubjects.length === 0 ? (
                    <div className="text-center py-20 opacity-50">
                      <GraduationCap className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                      <p className="font-bold text-slate-500 text-lg">Select subjects to see university matches</p>
                    </div>
                  ) : (
                    <div className="space-y-10">
                      {LOCAL_UNIVERSITIES.map(uni => {
                        // Find programs where user has AT LEAST ONE required subject
                        // (In a real app, you might require ALL required subjects, but for prototype we match some)
                        const matchedPrograms = uni.programs.filter(prog => 
                          prog.required.some(req => selectedSubjects.includes(req))
                        );

                        if (matchedPrograms.length === 0) return null;

                        return (
                          <div key={uni.id} className="space-y-4">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100">
                                <BookOpen className="w-5 h-5 text-purple-600" />
                              </div>
                              <h4 className="font-black text-lg text-slate-900">{uni.name}</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-14">
                              {matchedPrograms.map((prog, idx) => {
                                const matchedReqs = prog.required.filter(r => selectedSubjects.includes(r));
                                const matchPercentage = Math.round((matchedReqs.length / prog.required.length) * 100);
                                
                                return (
                                  <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-purple-300 transition-colors">
                                    <h5 className="font-bold text-slate-900 mb-2">{prog.name}</h5>
                                    <p className="text-xs text-slate-500 mb-4 line-clamp-2">{prog.desc}</p>
                                    <div className="flex items-center justify-between">
                                      <div className="flex gap-1">
                                        {matchedReqs.map(r => (
                                          <span key={r} className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded text-[9px] font-black uppercase tracking-widest">{r}</span>
                                        ))}
                                      </div>
                                      <span className={`text-xs font-black ${matchPercentage === 100 ? 'text-emerald-500' : 'text-amber-500'}`}>
                                        {matchPercentage}% Match
                                      </span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* SCHOLARSHIPS TAB */}
          {activeTab === 'scholarships' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search scholarships, bursaries, or schools..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-50 border-none rounded-2xl pl-16 pr-6 py-5 font-bold outline-none focus:ring-4 focus:ring-purple-100"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredScholarships.map((s) => (
                  <div key={s.id} className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex gap-2 flex-wrap">
                          {s.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[9px] font-black uppercase tracking-widest">
                              {tag}
                            </span>
                          ))}
                        </div>
                        {s.deadline !== 'Varies' && (
                          <div className="px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> Due {s.deadline}
                          </div>
                        )}
                      </div>
                      
                      <h3 className="text-2xl font-black text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">{s.name}</h3>
                      <p className="text-[10px] font-black text-purple-600 uppercase tracking-widest mb-4">{s.provider} • {s.type}</p>
                      
                      <div className="mb-8">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Eligibility</p>
                        <p className="text-sm text-slate-600 font-medium leading-relaxed">{s.eligibility}</p>
                      </div>
                    </div>

                    <a href={s.link} target="_blank" rel="noreferrer" className="flex items-center justify-between px-6 py-4 bg-slate-50 rounded-2xl group-hover:bg-purple-600 group-hover:text-white transition-colors">
                      <span className="text-[10px] font-black uppercase tracking-widest">View Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* MENTORSHIP TAB */}
          {activeTab === 'mentorship' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
              <div className="bg-emerald-900 text-white rounded-[40px] p-10 md:p-14 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500 rounded-full opacity-20 blur-3xl" />
                <div className="relative z-10 max-w-xl space-y-6">
                  <h3 className="text-3xl font-black tracking-tight">Connect with Alumni</h3>
                  <p className="text-emerald-100 font-medium leading-relaxed">
                    Unsure about a career path or university? Talk directly with former students who have walked the same path. They offer guidance, portfolio reviews, and university insights.
                  </p>
                </div>
                <div className="relative z-10 shrink-0">
                  <button className="bg-white text-emerald-900 px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-50 hover:scale-105 transition-all shadow-xl">
                    Register as Mentor
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {MOCK_ALUMNI.map((alumni) => (
                  <div key={alumni.id} className="p-8 bg-slate-50 border border-slate-100 rounded-[32px] space-y-6 group hover:shadow-xl hover:border-emerald-200 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xl shadow-sm font-black">
                        {alumni.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-slate-900 leading-tight">{alumni.name}</h4>
                        <p className="text-xs font-bold text-emerald-600 mt-1">{alumni.role}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3 pt-4 border-t border-slate-200/60">
                      <div className="flex items-center gap-3 text-sm text-slate-500">
                        <Briefcase className="w-4 h-4 shrink-0 text-slate-400" />
                        <span className="truncate">{alumni.company}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-500">
                        <GraduationCap className="w-4 h-4 shrink-0 text-slate-400" />
                        <span className="truncate">{alumni.uni}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-500">
                        <BookOpen className="w-4 h-4 shrink-0 text-slate-400" />
                        <span className="truncate">Prev: {alumni.school}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {alumni.tags.map(tag => (
                        <span key={tag} className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-600">{tag}</span>
                      ))}
                    </div>

                    <button className="w-full bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-emerald-600 transition-colors">
                      <MessageCircle className="w-4 h-4" /> Message Alumni
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CareerAndScholarshipHub;
