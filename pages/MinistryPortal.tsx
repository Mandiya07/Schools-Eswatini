import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import { 
  Users, BookOpen, AlertTriangle, TrendingUp, FileText, 
  Plus, Search, Filter, ShieldCheck, Globe, Download, 
  Calendar, ChevronRight, Info, AlertCircle, Bell, Loader2, Send, CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PolicyAnnouncement, Region, User, Institution, UserRole } from '../types';
import { db, collection, addDoc } from '../src/lib/firebase';

const mockRegionalData = [
  { name: 'Hhohho', passRate: 82, engagement: 85, schools: 142 },
  { name: 'Manzini', passRate: 78, engagement: 92, schools: 168 },
  { name: 'Lubombo', passRate: 65, engagement: 60, schools: 94 },
  { name: 'Shiselweni', passRate: 68, engagement: 65, schools: 112 },
];

const mockSubjectTrouble = [
  { subject: 'Math', difficulty: 95, enrollment: 25000 },
  { subject: 'Physics', difficulty: 88, enrollment: 12000 },
  { subject: 'Biology', difficulty: 75, enrollment: 18000 },
  { subject: 'English', difficulty: 55, enrollment: 42000 },
  { subject: 'SiSwati', difficulty: 45, enrollment: 42500 },
];

const nationalTrends = [
  { year: '2019', jc: 72, sgcse: 68 },
  { year: '2020', jc: 65, sgcse: 62 },
  { year: '2021', jc: 74, sgcse: 70 },
  { year: '2022', jc: 79, sgcse: 75 },
  { year: '2023', jc: 81, sgcse: 78 },
];

const mockPolicyAnnouncements: PolicyAnnouncement[] = [
  {
    id: 'pa-1',
    title: 'National Digital Literacy Standards 2024',
    content: 'The Ministry of Education and Training is introducing new digital literacy standards for all primary schools starting January 2024. This initiative aims to equip students with essential coding and data management skills from an early age.',
    category: 'policy',
    date: '2023-11-20',
    isUrgent: true,
    author: 'Director of Education'
  },
  {
    id: 'pa-2',
    title: 'School Safety Protocol Update (Version 3.2)',
    content: 'Following recent weather-related incidents, all regional officers are required to ensure schools have updated emergency evacuation plans. Training sessions for headteachers start next week.',
    category: 'safety',
    date: '2023-11-15',
    isUrgent: false,
    author: 'Quality Assurance Department'
  },
  {
    id: 'pa-3',
    title: 'Grant Disbursement Schedule for Q1 2024',
    content: 'The 2024 Quarter 1 grant disbursement for OVC support and operational costs will commence on December 1st. Institutions must ensure their census data is fully up to date on the portal.',
    category: 'finance',
    date: '2023-11-10',
    isUrgent: true,
    author: 'Principal Secretary'
  },
  {
    id: 'pa-4',
    title: 'Curriculum Review: Siswati Literature',
    content: 'A comprehensive review of secondary Siswati literature texts is underway. Stakeholders are invited to submit feedback via the portal before year-end.',
    category: 'curriculum',
    date: '2023-10-25',
    isUrgent: false,
    author: 'NCC Team'
  }
];

const COLORS = ['#2563eb', '#c026d3', '#f59e0b', '#10b981', '#6366f1'];

interface MinistryPortalProps {
  user: User | null;
  institutions: Institution[];
}

const MinistryPortal: React.FC<MinistryPortalProps> = ({ user, institutions }) => {
  const [activeView, setActiveView] = useState<'analytics' | 'policies' | 'records'>('analytics');
  const [searchQuery, setSearchQuery] = useState('');
  const [policies, setPolicies] = useState<PolicyAnnouncement[]>(mockPolicyAnnouncements);
  const [showAddPolicy, setShowAddPolicy] = useState(false);
  const [showAddSchool, setShowAddSchool] = useState(false);
  const [newPolicy, setNewPolicy] = useState<Partial<PolicyAnnouncement>>({
    title: '',
    content: '',
    category: 'general',
    isUrgent: false,
    author: 'MOET Official'
  });
  const [newSchool, setNewSchool] = useState({ name: '', slug: '', region: Region.HHOHHO, moetRegistration: '' });
  const [submittingSchool, setSubmittingSchool] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const isMinistryUser = user && (user.role === UserRole.MOET_OFFICIAL || user.role === UserRole.SUPER_ADMIN);

  const filteredPolicies = policies.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddPolicy = () => {
    if (!newPolicy.title || !newPolicy.content) return;
    
    const policy: PolicyAnnouncement = {
      id: `pa-${Date.now()}`,
      title: newPolicy.title || '',
      content: newPolicy.content || '',
      category: (newPolicy.category as any) || 'general',
      date: new Date().toISOString().split('T')[0],
      isUrgent: !!newPolicy.isUrgent,
      author: newPolicy.author || 'MOET Official'
    };

    setPolicies([policy, ...policies]);
    setShowAddPolicy(false);
    setNewPolicy({ title: '', content: '', category: 'general', isUrgent: false, author: 'MOET Official' });
  };

  const handleAddSchool = async () => {
    if (!newSchool.name || !newSchool.slug || !newSchool.moetRegistration) return;
    setSubmittingSchool(true);
    try {
      await addDoc(collection(db, 'institutions'), {
        ...newSchool,
        status: 'pending',
        createdAt: new Date().toISOString(),
        logo: '',
        coverImage: '',
        type: [],
        isVerified: false,
        isAccredited: false,
        isFeatured: false,
        isSpotlight: false,
        trustScore: 0,
        seoScore: 0,
        plan: 'Free',
      });
      setShowAddSchool(false);
      setSubmitSuccess(true);
      setNewSchool({ name: '', slug: '', region: Region.HHOHHO, moetRegistration: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmittingSchool(false);
    }
  };

  if (!isMinistryUser) {
    return (
      <div className="min-h-screen bg-[#f8fafc] pt-32 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-10 rounded-[48px] shadow-2xl border border-slate-100 flex flex-col relative overflow-hidden">
            {submitSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-6"
              >
                <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Application Submitted</h2>
                <p className="text-slate-500 font-medium">
                  Your school registration request has been successfully submitted to the Ministry. 
                  A MoET representative will review the details and contact you shortly.
                </p>
                <button 
                  onClick={() => setSubmitSuccess(false)}
                  className="mt-8 px-8 py-4 bg-slate-100 text-slate-600 font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-slate-200 transition-all"
                >
                  Submit Another
                </button>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-4 bg-indigo-600 text-white rounded-3xl shadow-lg shadow-indigo-200">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">School Registration</h2>
                    <p className="text-slate-500 font-medium mt-1">Submit your institution to the national directory.</p>
                  </div>
                </div>

                <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl space-y-6 text-sm">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Institution Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-white border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 rounded-2xl px-6 py-4 font-bold outline-none transition-all"
                      placeholder="e.g. Mater Dolorosa High"
                      value={newSchool.name}
                      onChange={e => setNewSchool({...newSchool, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Slug (URL identifier)</label>
                    <input 
                      type="text" 
                      className="w-full bg-white border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 rounded-2xl px-6 py-4 font-bold outline-none transition-all"
                      placeholder="e.g. mater-dolorosa"
                      value={newSchool.slug}
                      onChange={e => setNewSchool({...newSchool, slug: e.target.value})}
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">MoET Registration Number</label>
                    <input 
                      type="text" 
                      className="w-full bg-white border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 rounded-2xl px-6 py-4 font-bold outline-none transition-all"
                      placeholder="e.g. ESW-12345"
                      value={newSchool.moetRegistration}
                      onChange={e => setNewSchool({...newSchool, moetRegistration: e.target.value})}
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Region</label>
                    <select 
                      className="w-full bg-white border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 rounded-2xl px-6 py-4 font-bold outline-none transition-all appearance-none"
                      value={newSchool.region}
                      onChange={e => setNewSchool({...newSchool, region: e.target.value as Region})}
                    >
                      {Object.values(Region).map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <button 
                    onClick={handleAddSchool}
                    disabled={submittingSchool || !newSchool.name || !newSchool.slug || !newSchool.moetRegistration}
                    className="w-full py-5 bg-indigo-600 text-white rounded-[24px] font-black uppercase tracking-widest text-xs shadow-xl shadow-indigo-200 hover:bg-indigo-700 disabled:opacity-50 transition-all flex items-center justify-center gap-3 mt-4"
                  >
                    {submittingSchool ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    Submit Application
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-200">
                <Globe className="w-6 h-6" />
              </div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">Ministry Portal</h1>
            </div>
            <p className="text-slate-500 font-medium max-w-xl">
              National Education Management & Information System (EMIS). Monitoring the heartbeat of Eswatini's classrooms.
            </p>
          </div>
          
          <div className="flex items-center gap-2 p-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <button 
              onClick={() => setActiveView('analytics')}
              className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeView === 'analytics' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Analytics
            </button>
            <button 
              onClick={() => setActiveView('policies')}
              className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeView === 'policies' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Policies
            </button>
            <button 
              onClick={() => setActiveView('records')}
              className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeView === 'records' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Records
            </button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeView === 'analytics' && (
            <motion.div 
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Active Learners', value: '42,500', sub: 'Across 4 regions', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
                  { label: 'Teaching Force', value: '3,842', sub: '92% TSC Registered', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                  { label: 'Y/Y Pass Increase', value: '+14.2%', sub: 'SGCSE performance', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
                  { label: 'Critical Alerts', value: '28', sub: 'Requiring attention', icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
                ].map((kpi, i) => (
                  <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                    <div className={`p-4 ${kpi.bg} ${kpi.color} rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform`}>
                      <kpi.icon className="w-6 h-6" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{kpi.label}</p>
                    <p className="text-3xl font-black text-slate-900 mb-2">{kpi.value}</p>
                    <p className="text-xs font-bold text-slate-400">{kpi.sub}</p>
                  </div>
                ))}
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Secondary Pass Trends */}
                <div className="lg:col-span-2 bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm">
                  <div className="flex items-center justify-between mb-10">
                    <div>
                      <h3 className="text-xl font-black text-slate-900 tracking-tight">National Examination Trends</h3>
                      <p className="text-sm text-slate-500 mt-1">Average pass rates for JC and SGCSE (2019 - 2023)</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                        <span className="text-[10px] font-black uppercase text-slate-500">JC</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-fuchsia-600 rounded-full"></div>
                        <span className="text-[10px] font-black uppercase text-slate-500">SGCSE</span>
                      </div>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={350}>
                    <AreaChart data={nationalTrends}>
                      <defs>
                        <linearGradient id="colorJc" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorSgcse" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#c026d3" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#c026d3" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} dx={-10} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '20px' }}
                      />
                      <Area type="monotone" dataKey="jc" stroke="#2563eb" strokeWidth={4} fillOpacity={1} fill="url(#colorJc)" />
                      <Area type="monotone" dataKey="sgcse" stroke="#c026d3" strokeWidth={4} fillOpacity={1} fill="url(#colorSgcse)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Regional Stats */}
                <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm">
                  <h3 className="text-lg font-black text-slate-900 mb-8">Pass Rate by Region</h3>
                  <div className="space-y-8">
                    {mockRegionalData.map((reg, i) => (
                      <div key={i} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-black text-slate-700">{reg.name}</p>
                          <p className="text-sm font-black text-blue-600">{reg.passRate}%</p>
                        </div>
                        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${reg.passRate}%` }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                            className={`h-full rounded-full ${i === 0 ? 'bg-blue-600' : i === 1 ? 'bg-emerald-500' : i === 2 ? 'bg-amber-500' : 'bg-rose-500'}`}
                          ></motion.div>
                        </div>
                        <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {reg.schools} Schools</span>
                          <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" /> {reg.engagement}% Engagement</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-12 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-amber-100 text-amber-600 rounded-xl">
                        <AlertTriangle className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Efficiency Alert</h4>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                      Lubombo region shows a 12% decline in digital resource engagement compared to Q3 2023. Regional intervention recommended.
                    </p>
                  </div>
                </div>

                {/* Subject Difficulty Index */}
                <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm lg:col-span-2">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-xl font-black text-slate-900 tracking-tight">Challenge Index</h3>
                      <p className="text-sm text-slate-500 mt-1">Based on nationwide internal assessment failures and query volume.</p>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={mockSubjectTrouble} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                      <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                      <YAxis dataKey="subject" type="category" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 12, fontWeight: 900}} width={80} />
                      <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                      <Bar dataKey="difficulty" fill="#f59e0b" radius={[0, 10, 10, 0]} barSize={32}>
                        {mockSubjectTrouble.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.difficulty > 80 ? '#ef4444' : entry.difficulty > 60 ? '#f59e0b' : '#3b82f6'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Distribution Pie */}
                <div className="bg-slate-900 p-10 rounded-[40px] shadow-2xl text-white overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <ShieldCheck className="w-48 h-48 rotate-12" />
                  </div>
                  <h3 className="text-lg font-black mb-8 relative z-10">System Compliance</h3>
                  <div className="flex flex-col items-center">
                    <ResponsiveContainer width="100%" height={240}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Compliant', value: 342 },
                            { name: 'Pending', value: 84 },
                            { name: 'Non-Compliant', value: 12 },
                          ]}
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          <Cell fill="#10b981" />
                          <Cell fill="#6366f1" />
                          <Cell fill="#f43f5e" />
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="mt-6 flex flex-wrap justify-center gap-6">
                      {[
                        { label: 'Compliant', color: 'bg-emerald-500' },
                        { label: 'Pending', color: 'bg-indigo-500' },
                        { label: 'Warning', color: 'bg-rose-500' },
                      ].map(item => (
                        <div key={item.label} className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeView === 'policies' && (
            <motion.div 
              key="policies"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-12"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-black text-slate-900">National Policy Repository</h3>
                  <p className="text-slate-500 mt-1">Manage and publish official MoET announcements and curriculum updates.</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="text"
                      placeholder="Search policies..."
                      className="pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-64 shadow-sm"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <button 
                    onClick={() => setShowAddPolicy(true)}
                    className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-2 group"
                  >
                    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                    <span className="text-xs font-black uppercase tracking-widest px-2">New Announcement</span>
                  </button>
                </div>
              </div>

              {/* Add Policy Modal */}
              <AnimatePresence>
                {showAddPolicy && (
                  <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      exit={{ opacity: 0 }}
                      onClick={() => setShowAddPolicy(false)}
                      className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                    />
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 20 }}
                      className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-3xl overflow-hidden"
                    >
                      <div className="p-10 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight text-blue-600">Draft Official Announcement</h3>
                        <button onClick={() => setShowAddPolicy(false)} className="text-slate-400 hover:text-slate-900">✕</button>
                      </div>
                      <div className="p-10 space-y-8">
                        <div className="space-y-4">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Announcement Title</label>
                          <input 
                            type="text" 
                            className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 font-bold outline-none transition-all"
                            placeholder="e.g. National Curriculum Review 2024"
                            value={newPolicy.title}
                            onChange={e => setNewPolicy({...newPolicy, title: e.target.value})}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                           <div className="space-y-4">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Category</label>
                              <select 
                                className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 font-bold outline-none transition-all appearance-none"
                                value={newPolicy.category}
                                onChange={e => setNewPolicy({...newPolicy, category: e.target.value as any})}
                              >
                                <option value="policy">Policy</option>
                                <option value="curriculum">Curriculum</option>
                                <option value="safety">Safety</option>
                                <option value="finance">Finance</option>
                                <option value="general">General</option>
                              </select>
                           </div>
                           <div className="space-y-4">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Author / Department</label>
                              <input 
                                type="text" 
                                className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 font-bold outline-none transition-all"
                                placeholder="e.g. Director of Education"
                                value={newPolicy.author}
                                onChange={e => setNewPolicy({...newPolicy, author: e.target.value})}
                              />
                           </div>
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Main Content</label>
                          <textarea 
                            rows={6}
                            className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 font-medium outline-none transition-all resize-none"
                            placeholder="Provide full details of the announcement..."
                            value={newPolicy.content}
                            onChange={e => setNewPolicy({...newPolicy, content: e.target.value})}
                          />
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-rose-50 rounded-2xl border border-rose-100">
                           <input 
                             type="checkbox" 
                             id="isUrgent"
                             checked={newPolicy.isUrgent}
                             onChange={e => setNewPolicy({...newPolicy, isUrgent: e.target.checked})}
                             className="w-5 h-5 rounded border-rose-300 text-rose-600 focus:ring-rose-500"
                           />
                           <label htmlFor="isUrgent" className="text-sm font-black text-rose-600 uppercase tracking-widest cursor-pointer">Mark as Urgent (Broadcast to all Institutions)</label>
                        </div>
                        <button 
                          onClick={handleAddPolicy}
                          className="w-full py-5 bg-blue-600 text-white rounded-[24px] font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all"
                        >
                          Publish Announcement
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPolicies.map((policy) => (
                  <div key={policy.id} className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all group flex flex-col h-full">
                    <div className="flex items-start justify-between mb-8">
                      <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        policy.category === 'safety' ? 'bg-rose-50 text-rose-600' :
                        policy.category === 'finance' ? 'bg-emerald-50 text-emerald-600' :
                        policy.category === 'policy' ? 'bg-blue-50 text-blue-600' :
                        'bg-slate-50 text-slate-600'
                      }`}>
                        {policy.category}
                      </div>
                      {policy.isUrgent && (
                        <div className="flex items-center gap-2 text-rose-600 animate-pulse">
                          <Bell className="w-4 h-4" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Urgent</span>
                        </div>
                      )}
                    </div>
                    
                    <h4 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors mb-4">{policy.title}</h4>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 flex-grow">
                      {policy.content}
                    </p>
                    
                    <div className="pt-8 border-t border-slate-50 flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                          <Users className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-900 uppercase">{policy.author}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">{policy.date}</p>
                        </div>
                      </div>
                      <button className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredPolicies.length === 0 && (
                <div className="bg-white p-20 rounded-[48px] border-2 border-dashed border-slate-100 text-center space-y-4">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                    <Search className="w-8 h-8 text-slate-300" />
                  </div>
                  <h4 className="text-xl font-black text-slate-900">No matching policies found</h4>
                  <p className="text-slate-500 max-w-md mx-auto">Try adjusting your search filters or create a new announcement.</p>
                </div>
              )}
            </motion.div>
          )}

          {activeView === 'records' && (
            <motion.div 
              key="records"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-[48px] border border-slate-100 shadow-sm overflow-hidden"
            >
              <div className="p-10 border-b border-slate-50 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Institutional Compliance Matrix</h3>
                  <p className="text-sm text-slate-500 mt-1">Live oversight of registered schools in Eswatini.</p>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setShowAddSchool(true)}
                    className="px-6 py-3 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center gap-3 shadow-lg shadow-blue-200"
                  >
                    <Plus className="w-4 h-4" />
                    Register Institution
                  </button>
                  <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-3">
                    <Filter className="w-4 h-4" />
                    Filters
                  </button>
                  <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-slate-200">
                    <Download className="w-4 h-4" />
                    Export CSV
                  </button>
                </div>
              </div>

              {/* Add Institution Modal */}
              <AnimatePresence>
                {showAddSchool && (
                  <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      exit={{ opacity: 0 }}
                      onClick={() => setShowAddSchool(false)}
                      className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                    />
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 20 }}
                      className="relative w-full max-w-lg bg-white rounded-[40px] shadow-3xl overflow-hidden"
                    >
                      <div className="p-10 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight">Register New Institution</h3>
                        <button onClick={() => setShowAddSchool(false)} className="text-slate-400 hover:text-slate-900">✕</button>
                      </div>
                      <div className="p-10 space-y-8">
                        <div className="space-y-4">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Institution Name</label>
                          <input 
                            type="text" 
                            className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 font-bold outline-none transition-all"
                            placeholder="e.g. Mater Dolorosa High"
                            value={newSchool.name}
                            onChange={e => setNewSchool({...newSchool, name: e.target.value})}
                          />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Slug (URL identifier)</label>
                          <input 
                            type="text" 
                            className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 font-bold outline-none transition-all"
                            placeholder="e.g. mater-dolorosa"
                            value={newSchool.slug}
                            onChange={e => setNewSchool({...newSchool, slug: e.target.value})}
                          />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">MoET Registration Number</label>
                          <input 
                            type="text" 
                            className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 font-bold outline-none transition-all"
                            placeholder="e.g. ESW-12345"
                            value={newSchool.moetRegistration}
                            onChange={e => setNewSchool({...newSchool, moetRegistration: e.target.value})}
                          />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Region</label>
                          <select 
                            className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 font-bold outline-none transition-all appearance-none"
                            value={newSchool.region}
                            onChange={e => setNewSchool({...newSchool, region: e.target.value as Region})}
                          >
                            {Object.values(Region).map(r => <option key={r} value={r}>{r}</option>)}
                          </select>
                        </div>
                        <button 
                          onClick={handleAddSchool}
                          disabled={submittingSchool}
                          className="w-full py-5 bg-blue-600 text-white rounded-[24px] font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-3"
                        >
                          {submittingSchool ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                          Register Institution
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">
                      <th className="px-10 py-6">Institution</th>
                      <th className="px-10 py-6">Region</th>
                      <th className="px-10 py-6">Registration ID</th>
                      <th className="px-10 py-6">Performance</th>
                      <th className="px-10 py-6">Status</th>
                      <th className="px-10 py-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {institutions.map((school) => {
                      const passRate = school.examResults?.[0]?.passRate || Math.floor(Math.random() * 30) + 60; // Mock pass rate if none exists
                      const statusLabel = school.status === 'pending' ? 'Pending' : (school.isVerified ? 'Verified' : 'Unverified');
                      
                      return (
                      <tr key={school.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                        <td className="px-10 py-6 whitespace-nowrap">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-black text-sm">
                              {school.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-black text-slate-900">{school.name}</p>
                              <p className="text-[10px] font-bold text-slate-400 mt-0.5">{school.type?.[0] || 'Institution'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-10 py-6 whitespace-nowrap">
                          <span className="text-xs font-bold text-slate-600">{school.region}</span>
                        </td>
                        <td className="px-10 py-6 whitespace-nowrap font-mono text-[11px] text-slate-500 font-bold">
                          {school.moetRegistration || 'UNREGISTERED'}
                        </td>
                        <td className="px-10 py-6 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="flex-1 h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500 rounded-full" style={{ width: `${passRate}%` }}></div>
                            </div>
                            <span className="text-xs font-black text-blue-600">{passRate}%</span>
                          </div>
                        </td>
                        <td className="px-10 py-6 whitespace-nowrap">
                          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                            statusLabel === 'Verified' ? 'bg-emerald-50 text-emerald-600' :
                            statusLabel === 'Pending' ? 'bg-amber-50 text-amber-600' :
                            'bg-rose-50 text-rose-600'
                          }`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${
                              statusLabel === 'Verified' ? 'bg-emerald-500' :
                              statusLabel === 'Pending' ? 'bg-amber-500' :
                              'bg-rose-500'
                            }`}></div>
                            {statusLabel}
                          </div>
                        </td>
                        <td className="px-10 py-6 whitespace-nowrap text-center">
                          <button className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    )})}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Helper */}
        <div className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest pt-12 border-t border-slate-200">
          <p>© 2024 MOET ESWATINI EMIS UNIT</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-blue-600">Privacy Protocol</a>
            <a href="#" className="hover:text-blue-600">Support Desk</a>
            <a href="#" className="hover:text-blue-600">System Logs</a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MinistryPortal;
