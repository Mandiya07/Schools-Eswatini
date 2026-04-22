import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  Library, 
  Users, 
  Download, 
  Search, 
  Filter, 
  FileText, 
  GraduationCap, 
  Star, 
  MessageCircle,
  ExternalLink,
  UploadCloud,
  Briefcase,
  Bot,
  ChevronRight
} from 'lucide-react';

const MOCK_FILES = [
  { id: 1, title: 'EGCSE Mathematics Paper 1', year: 2023, subject: 'Math', level: 'EGCSE', type: 'Past Paper', size: '2.4 MB', price: 0 },
  { id: 2, title: 'EGCSE Science Marking Scheme', year: 2023, subject: 'Science', level: 'EGCSE', type: 'Marking Scheme', size: '1.1 MB', price: 0 },
  { id: 3, title: 'IGCSE Geography Syllabus Breakdown', year: 2024, subject: 'Geography', level: 'IGCSE', type: 'Study Guide', size: '5.2 MB', price: 0 },
  { id: 4, title: 'AS-Level Physics Paper 2', year: 2022, subject: 'Physics', level: 'AS/A-Level', type: 'Past Paper', size: '3.1 MB', price: 0 },
  { id: 5, title: 'Form 5 Biology Comprehensive Revision Pack', year: 2024, subject: 'Biology', level: 'EGCSE', type: 'Study Guide', size: '12.4 MB', price: 120 },
];

const MOCK_TUTORS = [
  { 
    id: 1, 
    name: 'Sipho Dlamini', 
    subjects: ['Mathematics', 'Physics'], 
    grade: 'Form 5', 
    rating: 4.8, 
    schools: 'St. Mark\'s High School',
    bio: 'Passionate STEM educator with 10+ years experience in EGCSE and IGCSE curricula.',
    availability: { days: ['Mon', 'Wed', 'Fri'], timeRange: '16:00 - 18:00', status: 'available' },
    hourlyRate: 150,
    connections: 24
  },
  { 
    id: 2, 
    name: 'Nothando Maseko', 
    subjects: ['English Language', 'History'], 
    grade: 'Form 4', 
    rating: 4.9, 
    schools: 'Salesian High School',
    bio: 'Expert in linguistics and humanities, focusing on essay structure and critical analysis.',
    availability: { days: ['Tue', 'Thu'], timeRange: '15:00 - 17:00', status: 'available' },
    hourlyRate: 120,
    connections: 18
  },
  { 
    id: 3, 
    name: 'Sanele Zwane', 
    subjects: ['Biology', 'Chemistry'], 
    grade: 'A-Level', 
    rating: 5.0, 
    schools: 'Waterford Kamhlaba',
    bio: 'IB/A-Level specialist helping students navigate complex science concepts with ease.',
    availability: { days: ['Sat', 'Sun'], timeRange: '10:00 - 14:00', status: 'busy' },
    hourlyRate: 200,
    connections: 45
  },
];

const LIBRARIES = [
  { id: 1, name: 'Eswatini National Library Archive', desc: 'Digital public domain books and historical texts.', icon: <Library className="text-emerald-500 w-8 h-8" />, url: '#' },
  { id: 2, name: 'OpenStax Free Textbooks', desc: 'Peer-reviewed, openly licensed textbooks.', icon: <BookOpen className="text-blue-500 w-8 h-8" />, url: '#' },
  { id: 3, name: 'Khan Academy Eswatini', desc: 'Video tutorials tailored to southern African curricula.', icon: <GraduationCap className="text-purple-500 w-8 h-8" />, url: '#' },
];

const AcademicHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'papers' | 'tutoring' | 'library'>('papers');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');

  const filteredFiles = MOCK_FILES.filter(file => 
    (selectedLevel === 'All' || file.level === selectedLevel) &&
    file.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="container mx-auto px-8 max-w-7xl">
        {/* Header */}
        <header className="mb-16 text-center space-y-6">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-blue-100 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-widest">
            <BookOpen className="w-4 h-4" /> Academic Resources & Study Hub
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter">
            Elevate Your <span className="text-blue-600">Learning</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Access past papers, connect with peer tutors, and browse digital libraries tailored for students in Eswatini.
          </p>

          {/* AI Tutor Promo */}
          <Link to="/ai-tutor" className="block max-w-4xl mx-auto mt-12 bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-fuchsia-200 transition-all group">
             <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-left">
                <div className="flex items-center gap-6">
                   <div className="w-16 h-16 bg-fuchsia-600 rounded-3xl flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-xl shadow-fuchsia-600/20">
                      <Bot className="w-8 h-8" />
                   </div>
                   <div>
                      <h3 className="text-2xl font-black text-slate-900 group-hover:text-fuchsia-600 transition-colors">Meet your new AI Study Assistant</h3>
                      <p className="text-sm text-slate-500 font-medium mt-1">Stuck on a topic? Get instant explanations grounded in our verified educator marketplace materials.</p>
                   </div>
                </div>
                <div className="flex items-center gap-4 bg-fuchsia-100 px-6 py-4 rounded-2xl">
                   <span className="text-xs font-black text-fuchsia-700 uppercase tracking-widest">Try AI Tutor</span>
                   <ChevronRight className="w-5 h-5 text-fuchsia-700 group-hover:translate-x-1 transition-transform" />
                </div>
             </div>
          </Link>
        </header>

        {/* Global Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <button 
            onClick={() => setActiveTab('papers')}
            className={`px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-3 transition-all ${activeTab === 'papers' ? 'bg-amber-600 text-white shadow-xl' : 'bg-white text-slate-500 hover:bg-slate-100'}`}
          >
            <Briefcase className="w-4 h-4" /> Resource Marketplace
          </button>
          <button 
            onClick={() => setActiveTab('tutoring')}
            className={`px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-3 transition-all ${activeTab === 'tutoring' ? 'bg-blue-600 text-white shadow-xl' : 'bg-white text-slate-500 hover:bg-slate-100'}`}
          >
            <Users className="w-4 h-4" /> Peer Tutoring
          </button>
          <button 
            onClick={() => setActiveTab('library')}
            className={`px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-3 transition-all ${activeTab === 'library' ? 'bg-emerald-600 text-white shadow-xl' : 'bg-white text-slate-500 hover:bg-slate-100'}`}
          >
            <Library className="w-4 h-4" /> Digital Library
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-[48px] shadow-sm border border-slate-100 p-8 md:p-14 overflow-hidden">
          
          {/* MARKETPLACE TAB */}
          {activeTab === 'papers' && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 space-y-12">
              {/* Marketplace Hero */}
              <div className="bg-amber-50 rounded-[40px] p-10 flex flex-col md:flex-row items-center gap-10 border border-amber-100">
                <div className="flex-1 space-y-4">
                  <span className="px-3 py-1 bg-amber-200 text-amber-700 rounded-full text-[9px] font-black uppercase tracking-widest">Support Local Educators</span>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">The Teacher Marketplace</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    Access premium study packs, revision notes, and past papers curated by verified Eswatini top-performing teachers. 
                    <span className="font-bold text-amber-700"> Every purchase directly supports local educators.</span>
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="text-center p-6 bg-white rounded-3xl shadow-sm border border-amber-100">
                    <p className="text-2xl font-black text-amber-600">500+</p>
                    <p className="text-[9px] font-black uppercase text-slate-400">Active Sellers</p>
                  </div>
                  <div className="text-center p-6 bg-white rounded-3xl shadow-sm border border-amber-100">
                    <p className="text-2xl font-black text-amber-600">E150k</p>
                    <p className="text-[9px] font-black uppercase text-slate-400">Paid to Teachers</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between gap-6 pb-10 border-b border-slate-100">
                <div className="relative flex-1">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="Search by subject, teacher name, or level..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border-none rounded-2xl pl-16 pr-6 py-5 font-bold outline-none focus:ring-4 focus:ring-amber-100"
                  />
                </div>
                <div className="flex gap-4">
                  <select 
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="bg-slate-50 border-none rounded-2xl px-6 py-5 font-bold outline-none cursor-pointer"
                  >
                    <option value="All">All Curricula</option>
                    <option value="EGCSE">EGCSE</option>
                    <option value="IGCSE">IGCSE</option>
                    <option value="AS/A-Level">AS/A-Level</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredFiles.map((file) => (
                  <div key={file.id} className="p-8 bg-white rounded-[40px] border border-slate-100 group hover:border-amber-500 hover:shadow-2xl transition-all relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute top-0 right-0 p-6">
                       {file.price > 0 ? (
                         <div className="px-4 py-2 bg-amber-600 text-white rounded-2xl text-xs font-black shadow-lg">SZL {file.price}</div>
                       ) : (
                         <div className="px-4 py-2 bg-slate-100 text-slate-400 rounded-2xl text-xs font-black uppercase tracking-widest">Free Resource</div>
                       )}
                    </div>
                    <div className="space-y-6">
                      <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
                        <FileText className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="text-xl font-black text-slate-900 group-hover:text-amber-600 transition-colors">{file.title}</h4>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full">{file.level}</span>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{file.type}</span>
                        </div>
                      </div>
                      <p className="text-sm text-slate-500 font-medium">Curated by <span className="font-black text-slate-700">Verified Educator</span> • {file.size}</p>
                    </div>
                    <button 
                      onClick={() => {
                        if (file.price > 0) {
                          alert(`Redirecting to Secure MTN MoMo Gateway for SZL ${file.price}...`);
                        } else {
                          alert('Download started...');
                        }
                      }}
                      className="mt-8 w-full py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-amber-600 transition-all flex items-center justify-center gap-3"
                    >
                      {file.price > 0 ? (
                        <>Purchase via MoMo / eMali <ExternalLink className="w-4 h-4" /></>
                      ) : (
                        <>Free Download <Download className="w-4 h-4" /></>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TUTORING TAB */}
          {activeTab === 'tutoring' && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 space-y-12">
              <div className="bg-blue-900 text-white rounded-[40px] p-10 md:p-14 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500 rounded-full opacity-20 blur-3xl" />
                <div className="relative z-10 max-w-2xl space-y-6">
                  <h3 className="text-3xl font-black tracking-tight">Become a Peer Tutor</h3>
                  <p className="text-blue-100 font-medium leading-relaxed">
                    Excel in your subjects? Volunteer to help your peers and earn verifiable community service hours towards your portfolio. A fantastic addition to your university applications!
                  </p>
                  <button className="bg-white text-blue-900 px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-50 hover:scale-105 transition-all shadow-xl">
                    Apply as a Tutor
                  </button>
                </div>
              </div>

              <div>
                <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Verified Expert Tutors</h3>
                    <p className="text-slate-500 font-medium">Connect with top-performing teachers for 1-on-1 support.</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="relative group">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <input 
                        className="bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 py-3 text-xs font-bold focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                        placeholder="Search subjects..."
                      />
                    </div>
                    <button className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:text-blue-600 transition-all">
                      <Filter className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {MOCK_TUTORS.map((tutor) => (
                    <div key={tutor.id} className="p-8 bg-white border border-slate-100 rounded-[40px] flex flex-col group hover:shadow-2xl hover:border-blue-400 transition-all">
                      <div className="flex items-start justify-between mb-6">
                        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl shadow-sm font-black ring-4 ring-blue-50">
                          {tutor.name.charAt(0)}
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-amber-500 font-black">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-sm">{tutor.rating}</span>
                          </div>
                          <p className="text-[10px] font-black text-slate-400 mt-1 uppercase tracking-widest">{tutor.connections} Pupils</p>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className="text-xl font-black text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">{tutor.name}</h4>
                        <p className="text-xs font-bold text-slate-500 mt-1 mb-3">{tutor.schools}</p>
                        <p className="text-xs text-slate-500 line-clamp-2 font-medium leading-relaxed">{tutor.bio}</p>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {tutor.subjects.map(s => (
                          <span key={s} className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-600">{s}</span>
                        ))}
                      </div>

                      <div className="mt-auto space-y-6">
                        <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                           <div className="flex justify-between items-center">
                              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Availability</span>
                              <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${tutor.availability.status === 'available' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-slate-300 text-white'}`}>
                                 {tutor.availability.status === 'available' ? 'Open for Bookings' : 'Waitlist Only'}
                              </span>
                           </div>
                           <div className="space-y-2">
                              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                                 <div className="flex flex-wrap gap-1">
                                    {tutor.availability.days.map(d => <span key={d} className="opacity-60">{d}</span>)}
                                 </div>
                                 <span className="text-blue-600 italic">{tutor.availability.timeRange}</span>
                              </div>
                           </div>
                           <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
                              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Rate</span>
                              <span className="text-sm font-black text-slate-900">SZL {tutor.hourlyRate}<span className="text-[10px] font-medium text-slate-400">/hr</span></span>
                           </div>
                        </div>

                        <button 
                          onClick={() => alert(`Requesting connection with ${tutor.name}... Our AI will match your schedule with theirs.`)}
                          className="w-full bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-blue-600 transition-all shadow-xl"
                        >
                          <MessageCircle className="w-4 h-4" /> Request Session
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* LIBRARY TAB */}
          {activeTab === 'library' && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {LIBRARIES.map((lib) => (
                  <a key={lib.id} href={lib.url} target="_blank" rel="noreferrer" className="block p-10 bg-slate-50 border border-slate-100 rounded-[40px] group hover:bg-emerald-50 hover:border-emerald-200 transition-all">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform">
                      {lib.icon}
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-3">{lib.name}</h3>
                    <p className="text-slate-500 font-medium leading-relaxed mb-8">{lib.desc}</p>
                    
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-600">
                      Explore Library <ExternalLink className="w-4 h-4" />
                    </div>
                  </a>
                ))}
              </div>

              <div className="p-12 border-2 border-dashed border-slate-200 rounded-[40px] text-center space-y-6 flex flex-col items-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                  <Library className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-xl font-black text-slate-900">Is your school's digital library not listed?</h4>
                  <p className="text-slate-500 font-medium max-w-md mx-auto mt-2">Ask your school administrator to integrate your institution's e-library platform with Schools Eswatini.</p>
                </div>
                <button className="bg-slate-900 text-white px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest">
                  Request Integration
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AcademicHub;
