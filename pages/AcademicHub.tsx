import React, { useState } from 'react';
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
  UploadCloud
} from 'lucide-react';

const MOCK_FILES = [
  { id: 1, title: 'EGCSE Mathematics Paper 1', year: 2023, subject: 'Math', level: 'EGCSE', type: 'Past Paper', size: '2.4 MB', price: 0 },
  { id: 2, title: 'EGCSE Science Marking Scheme', year: 2023, subject: 'Science', level: 'EGCSE', type: 'Marking Scheme', size: '1.1 MB', price: 0 },
  { id: 3, title: 'IGCSE Geography Syllabus Breakdown', year: 2024, subject: 'Geography', level: 'IGCSE', type: 'Study Guide', size: '5.2 MB', price: 0 },
  { id: 4, title: 'AS-Level Physics Paper 2', year: 2022, subject: 'Physics', level: 'AS/A-Level', type: 'Past Paper', size: '3.1 MB', price: 0 },
  { id: 5, title: 'Form 5 Biology Comprehensive Revision Pack', year: 2024, subject: 'Biology', level: 'EGCSE', type: 'Study Guide', size: '12.4 MB', price: 120 },
];

const MOCK_TUTORS = [
  { id: 1, name: 'Sipho Dlamini', subjects: ['Mathematics', 'Physics'], grade: 'Form 5', rating: 4.8, schools: 'St. Mark\'s High School' },
  { id: 2, name: 'Nothando Maseko', subjects: ['English Language', 'History'], grade: 'Form 4', rating: 4.9, schools: 'Salesian High School' },
  { id: 3, name: 'Sanele Zwane', subjects: ['Biology', 'Chemistry'], grade: 'A-Level', rating: 5.0, schools: 'Waterford Kamhlaba' },
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
        </header>

        {/* Global Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <button 
            onClick={() => setActiveTab('papers')}
            className={`px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-3 transition-all ${activeTab === 'papers' ? 'bg-slate-900 text-white shadow-xl' : 'bg-white text-slate-500 hover:bg-slate-100'}`}
          >
            <FileText className="w-4 h-4" /> Past Papers & Guides
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
          
          {/* PAST PAPERS TAB */}
          {activeTab === 'papers' && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 space-y-10">
              <div className="flex flex-col md:flex-row justify-between gap-6 pb-10 border-b border-slate-100">
                <div className="relative flex-1">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="Search by subject, year, or paper code..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border-none rounded-2xl pl-16 pr-6 py-5 font-bold outline-none focus:ring-4 focus:ring-blue-100"
                  />
                </div>
                <div className="flex gap-4">
                  <select 
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="bg-slate-50 border-none rounded-2xl px-6 py-5 font-bold outline-none cursor-pointer"
                  >
                    <option value="All">All Levels</option>
                    <option value="EGCSE">EGCSE</option>
                    <option value="IGCSE">IGCSE</option>
                    <option value="AS/A-Level">AS/A-Level</option>
                  </select>
                  <button className="bg-blue-600 text-white px-8 rounded-2xl text-[10px] uppercase tracking-widest font-black shrink-0 hover:bg-slate-900 transition-colors flex items-center gap-2">
                    <UploadCloud className="w-4 h-4" /> Contribute
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredFiles.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-blue-500 hover:bg-blue-50/50 transition-all cursor-pointer">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">{file.title}</h4>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white px-3 py-1 rounded-full">{file.level}</span>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{file.type} • {file.year}</span>
                          {file.price > 0 && <span className="text-[10px] font-black text-emerald-600 uppercase bg-emerald-50 px-3 py-1 rounded-full">SZL {file.price}</span>}
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        if (file.price > 0) {
                          alert(`Redirecting to Secure MoMo Gateway for SZL ${file.price}...`);
                        } else {
                          alert('Download started...');
                        }
                      }}
                      className="flex items-center gap-3 px-6 py-3 bg-white rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm border border-slate-100 group-hover:border-blue-500"
                    >
                      <Download className="w-4 h-4" />
                      {file.price > 0 ? 'Purchase' : 'Download'}
                    </button>
                  </div>
                ))}
                {filteredFiles.length === 0 && (
                  <div className="col-span-2 py-12 text-center">
                    <p className="text-slate-500 font-medium">No resources found matching your criteria.</p>
                  </div>
                )}
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
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Available Tutors</h3>
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-slate-400" />
                    <span className="text-xs font-bold text-slate-500">Filter</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {MOCK_TUTORS.map((tutor) => (
                    <div key={tutor.id} className="p-8 bg-slate-50 border border-slate-100 rounded-[32px] text-center space-y-6 group hover:shadow-xl hover:border-blue-200 transition-all">
                      <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-full mx-auto flex items-center justify-center text-3xl shadow-sm overflow-hidden font-black">
                        {tutor.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-xl font-black text-slate-900">{tutor.name}</h4>
                        <p className="text-sm font-medium text-slate-500 mt-1">{tutor.schools}</p>
                      </div>
                      
                      <div className="flex flex-wrap justify-center gap-2">
                        {tutor.subjects.map(s => (
                          <span key={s} className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-600">{s}</span>
                        ))}
                      </div>

                      <div className="flex items-center justify-center gap-2 text-amber-500 font-bold">
                        <Star className="w-5 h-5 fill-current" />
                        <span>{tutor.rating}</span>
                      </div>

                      <button className="w-full bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-blue-600 transition-colors">
                        <MessageCircle className="w-4 h-4" /> Message Tutor
                      </button>
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
