import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Calendar as CalendarIcon, 
  MapPin, 
  FileText, 
  Download,
  Share2,
  Trophy,
  Award,
  Video,
  ChevronRight
} from 'lucide-react';

// MOCK DATA for Clubs
const MOCK_CLUBS = [
  { id: 1, name: 'National Debate Society', school: 'Waterford Kamhlaba', members: 45, nextMeeting: 'Thurs, 14:00', icon: <Users className="w-6 h-6" />, category: 'Academic' },
  { id: 2, name: 'Robotics & AI Club', school: 'Salesian High', members: 28, nextMeeting: 'Wed, 15:30', icon: <Video className="w-6 h-6" />, category: 'STEM' },
  { id: 3, name: 'Eswatini Cultural Dance', school: 'St. Mark\'s', members: 60, nextMeeting: 'Fri, 14:00', icon: <Users className="w-6 h-6" />, category: 'Arts' },
  { id: 4, name: 'Environmental Green Team', school: 'Manzini Nazarene', members: 35, nextMeeting: 'Mon, 13:00', icon: <MapPin className="w-6 h-6" />, category: 'Community' },
];

// MOCK DATA for Events
const MOCK_EVENTS = [
  { id: 1, title: 'National Science Fair 2026', date: '24 May 2026', location: 'Mavuso Exhibition Centre', host: 'Ministry of Education', type: 'Competition' },
  { id: 2, title: 'Inter-Schools Soccer Finals', date: '12 Jun 2026', location: 'Somhlolo National Stadium', host: 'ESSSA', type: 'Sports' },
  { id: 3, title: 'Regional Debate Championship', date: '05 Jul 2026', location: 'UNESWA Campus', host: 'Eswatini Debate Council', type: 'Academic' },
];

const CommunityHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'clubs' | 'events' | 'portfolio'>('clubs');
  const [selectedClubCategory, setSelectedClubCategory] = useState<string>('All');

  const filteredClubs = MOCK_CLUBS.filter(club => 
    selectedClubCategory === 'All' || club.category === selectedClubCategory
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-16 text-center space-y-6">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-rose-100 text-rose-700 rounded-full text-[10px] font-black uppercase tracking-widest">
            <Users className="w-4 h-4" /> Extracurricular & Community
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter">
            Campus <span className="text-rose-600">Life</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Discover student clubs, track inter-school events, and build your digital extracurricular portfolio.
          </p>
        </header>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button 
            onClick={() => setActiveTab('clubs')}
            className={`px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-3 transition-all ${activeTab === 'clubs' ? 'bg-slate-900 text-white shadow-xl' : 'bg-white text-slate-500 hover:bg-slate-100'}`}
          >
            <Users className="w-4 h-4" /> Clubs & Societies
          </button>
          <button 
            onClick={() => setActiveTab('events')}
            className={`px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-3 transition-all ${activeTab === 'events' ? 'bg-rose-600 text-white shadow-xl' : 'bg-white text-slate-500 hover:bg-slate-100'}`}
          >
            <CalendarIcon className="w-4 h-4" /> Inter-School Calendar
          </button>
          <button 
            onClick={() => setActiveTab('portfolio')}
            className={`px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-3 transition-all ${activeTab === 'portfolio' ? 'bg-amber-500 text-white shadow-xl' : 'bg-white text-slate-500 hover:bg-slate-100'}`}
          >
            <FileText className="w-4 h-4" /> Student Portfolio
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-[48px] shadow-sm border border-slate-100 p-8 md:p-14 overflow-hidden min-h-[600px]">
          
          {/* CLUBS TAB */}
          {activeTab === 'clubs' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
              <div className="flex justify-between items-center pb-6 border-b border-slate-100">
                <h3 className="text-2xl font-black text-slate-900">Discover Clubs</h3>
                <div className="flex gap-2 bg-slate-100 p-1 rounded-2xl">
                  {['All', 'Academic', 'STEM', 'Arts', 'Community'].map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setSelectedClubCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors ${selectedClubCategory === cat ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {filteredClubs.map(club => (
                  <div key={club.id} className="p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:border-rose-200 hover:shadow-xl transition-all group flex items-start gap-6">
                    <div className="w-16 h-16 bg-white shrink-0 rounded-2xl flex items-center justify-center text-rose-600 shadow-sm group-hover:scale-110 transition-transform">
                      {club.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-black text-slate-900 mb-1">{club.name}</h4>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{club.school}</p>
                      
                      <div className="flex items-center gap-6 text-sm text-slate-600 font-medium mb-6">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-slate-400" /> {club.members} Members
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4 text-slate-400" /> {club.nextMeeting}
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button className="flex-1 bg-slate-900 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 transition-colors">
                          Join Club
                        </button>
                        <button className="px-6 bg-white border border-slate-200 text-slate-600 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-colors">
                          Learn More
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* EVENTS TAB */}
          {activeTab === 'events' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
              <div className="bg-rose-900 text-white rounded-[40px] p-10 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="absolute right-0 top-0 w-64 h-64 bg-rose-500 rounded-full opacity-20 blur-3xl" />
                <div className="relative z-10 max-w-xl space-y-4">
                  <h3 className="text-3xl font-black tracking-tight">Inter-School Event Calendar</h3>
                  <p className="text-rose-100 font-medium leading-relaxed">
                    Don't miss out on national competitions, sports leagues, and regional fairs. Represent your school or go support your peers!
                  </p>
                </div>
                <div className="relative z-10 shrink-0">
                  <button className="bg-white text-rose-900 px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-rose-50 hover:scale-105 transition-all shadow-xl">
                    Add School Event
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {MOCK_EVENTS.map(event => (
                  <div key={event.id} className="p-6 md:p-8 bg-slate-50 border border-slate-100 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-md transition-shadow group">
                    <div className="flex items-center gap-8 w-full md:w-auto">
                      <div className="text-center shrink-0">
                        <p className="text-rose-600 font-black text-2xl">{event.date.split(' ')[0]}</p>
                        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">{event.date.split(' ')[1]}</p>
                      </div>
                      <div className="h-12 w-px bg-slate-200 hidden md:block"></div>
                      <div>
                        <span className="px-3 py-1 bg-white border border-slate-200 text-slate-500 rounded-full text-[9px] font-black uppercase tracking-widest mb-2 block w-fit">{event.type}</span>
                        <h4 className="text-lg font-black text-slate-900 mb-1">{event.title}</h4>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 font-medium">
                          <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {event.location}</span>
                          <span className="flex items-center gap-1"><Users className="w-4 h-4" /> Hosted by {event.host}</span>
                        </div>
                      </div>
                    </div>
                    <button className="w-full md:w-auto px-6 py-4 bg-white border border-slate-200 text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest group-hover:bg-rose-600 group-hover:text-white group-hover:border-rose-600 transition-colors flex items-center justify-center gap-2">
                      View Details <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* PORTFOLIO TAB */}
          {activeTab === 'portfolio' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
                <div>
                  <h3 className="text-2xl font-black text-slate-900">Student Portfolio Builder</h3>
                  <p className="text-slate-500 font-medium mt-1">Compile your achievements for university and job applications.</p>
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                  <button className="flex-1 md:flex-none px-6 py-4 bg-slate-100 text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors">
                    <Share2 className="w-4 h-4" /> Share Link
                  </button>
                  <button className="flex-1 md:flex-none px-6 py-4 bg-amber-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-amber-600 transition-colors shadow-lg shadow-amber-500/20">
                    <Download className="w-4 h-4" /> Export PDF
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Overview */}
                <div className="lg:col-span-1 space-y-6">
                  <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 text-center">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-4xl shadow-sm mx-auto mb-4 border-4 border-amber-100">
                      👨‍🎓
                    </div>
                    <h4 className="text-xl font-black text-slate-900">Sipho Dlamini</h4>
                    <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mt-1">Class of 2026</p>
                    <p className="text-sm text-slate-500 font-medium mt-4">St. Mark's High School</p>
                    <div className="mt-6 pt-6 border-t border-slate-200/60 text-left space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500 font-medium">Curriculum</span>
                        <span className="font-bold text-slate-900">EGCSE</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500 font-medium">Avg Grade</span>
                        <span className="font-bold text-slate-900">A-</span>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-amber-600 hover:border-amber-200 transition-colors">
                    + Add Summary Statement
                  </button>
                </div>

                {/* Achievements & Activities */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Extracurriculars */}
                  <div className="p-8 bg-white border border-slate-200 rounded-3xl shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                      <h5 className="font-black text-slate-900 flex items-center gap-2">
                        <Users className="w-5 h-5 text-amber-500" /> Leadership & Clubs
                      </h5>
                      <button className="text-xs font-bold text-blue-600 hover:underline">Edit</button>
                    </div>
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="w-2 h-2 mt-2 rounded-full bg-amber-500 shrink-0" />
                        <div>
                          <p className="font-bold text-slate-900">President, National Debate Society</p>
                          <p className="text-xs text-slate-500 mb-1">Jan 2025 - Present</p>
                          <p className="text-sm text-slate-600 font-medium leading-relaxed">Organized regional debate tournaments and mentored junior members in public speaking.</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-2 h-2 mt-2 rounded-full bg-slate-300 shrink-0" />
                        <div>
                          <p className="font-bold text-slate-900">Member, Environmental Green Team</p>
                          <p className="text-xs text-slate-500 mb-1">Feb 2024 - Dec 2024</p>
                          <p className="text-sm text-slate-600 font-medium leading-relaxed">Participated in community clean-up drives and school recycling initiatives.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Awards & Honors */}
                  <div className="p-8 bg-white border border-slate-200 rounded-3xl shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                      <h5 className="font-black text-slate-900 flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-amber-500" /> Awards & Honors
                      </h5>
                      <button className="text-[10px] font-black uppercase tracking-widest text-amber-600 bg-amber-50 px-4 py-2 rounded-lg hover:bg-amber-100 transition-colors">
                        + Add Award
                      </button>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                        <Award className="w-6 h-6 text-amber-500" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">1st Place - National Science Fair</p>
                        <p className="text-xs text-slate-500 font-medium">May 2025 • Ministry of Education</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CommunityHub;
