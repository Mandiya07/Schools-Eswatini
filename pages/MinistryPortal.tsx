
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Users, 
  GraduationCap, 
  TrendingUp, 
  Bus, 
  ShieldCheck, 
  FileCheck, 
  MapPin, 
  Search, 
  Filter,
  BarChart3,
  PieChart as PieChartIcon,
  Download,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Cell,
  Pie
} from 'recharts';

const PERFORMANCE_DATA = [
  { region: 'Hhohho', passRate: 82, attendance: 91, funding: 85 },
  { region: 'Manzini', passRate: 79, attendance: 88, funding: 92 },
  { region: 'Lubombo', passRate: 68, attendance: 82, funding: 78 },
  { region: 'Shiselweni', passRate: 71, attendance: 84, funding: 80 },
];

const SUBJECT_TRENDS = [
  { month: 'Jan', math: 65, science: 68, english: 72 },
  { month: 'Feb', math: 68, science: 70, english: 74 },
  { month: 'Mar', math: 62, science: 71, english: 70 },
  { month: 'Apr', math: 70, science: 75, english: 78 },
];

const ENROLLMENT_BY_LEVEL = [
  { name: 'Primary', value: 245000, color: '#3b82f6' },
  { name: 'Secondary', value: 120000, color: '#10b981' },
  { name: 'High School', value: 85000, color: '#f59e0b' },
  { name: 'Tertiary', value: 35000, color: '#8b5cf6' },
];

const INFRASTRUCTURE_HEALTH = [
  { category: 'Sanitation', status: 75 },
  { category: 'Electricity', status: 88 },
  { category: 'Digital Labs', status: 42 },
  { category: 'Classroom Quality', status: 68 },
];

const MinistryPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'regions' | 'resources' | 'policies' | 'insights'>('overview');

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">
              <Building2 className="w-4 h-4" /> Ministry of Education & Training
            </div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter">
              National <span className="text-blue-600">Education</span> Dashboard
            </h1>
            <p className="text-slate-500 font-medium max-w-xl">
              Strategic oversight and real-time data management for Eswatini's national educational landscape.
            </p>
          </div>
          <div className="flex gap-4">
            <button className="bg-white border text-slate-600 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2">
              <Download className="w-4 h-4" /> Export Report
            </button>
            <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-blue-700 transition-all hover:scale-105">
              Submit Policy Update
            </button>
          </div>
        </header>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { label: 'Total Institutions', value: '1,142', trend: '+12 this year', icon: <Building2 />, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Active Students', value: '485,200', trend: '2.4% Growth', icon: <Users />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Avg Pass Rate', value: '75.2%', trend: '+3.1% YoY', icon: <GraduationCap />, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Teacher Vacancies', value: '142', trend: 'Target: < 50', icon: <AlertTriangle />, color: 'text-rose-600', bg: 'bg-rose-50' },
          ].map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 bg-white rounded-[40px] border border-slate-100 shadow-sm relative overflow-hidden group"
            >
              <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black text-slate-900">{stat.value}</h3>
              <p className="text-xs font-bold text-slate-500 mt-2">{stat.trend}</p>
            </motion.div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-white p-2 rounded-[32px] border border-slate-100 shadow-sm w-fit mx-auto md:mx-0">
          {[
            { id: 'overview', label: 'Performance', icon: <TrendingUp className="w-4 h-4" /> },
            { id: 'regions', label: 'Regional Analysis', icon: <MapPin className="w-4 h-4" /> },
            { id: 'resources', label: 'Resource Exchange', icon: <FileCheck className="w-4 h-4" /> },
            { id: 'policies', label: 'Compliance', icon: <ShieldCheck className="w-4 h-4" /> },
            { id: 'insights', label: 'Premium Insights', icon: '💎' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-3 px-8 py-4 rounded-3xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        {activeTab === 'insights' ? (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="bg-slate-900 rounded-[48px] p-20 text-center relative overflow-hidden flex flex-col items-center border border-white/10 shadow-3xl">
               <div className="absolute top-0 right-0 p-20 opacity-5">
                  <BarChart3 className="w-96 h-96 text-white" />
               </div>
               <div className="relative z-10 max-w-2xl">
                  <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-3xl mx-auto mb-8 shadow-2xl">💎</div>
                  <h2 className="text-4xl font-black text-white tracking-tight mb-6">National Predictive Insights Portal</h2>
                  <p className="text-slate-400 font-medium leading-relaxed mb-12">
                    Access advanced national-level educational forecasting, artificial intelligence census reports, and performance modeling based on multi-year national exam data.
                  </p>
                  <div className="flex flex-col md:flex-row gap-6 justify-center">
                     <button className="bg-blue-600 text-white px-10 py-5 rounded-[24px] font-black uppercase tracking-widest text-[10px] shadow-xl hover:scale-105 transition-all">Subscribe (E15,000 / Year)</button>
                     <button className="bg-white/10 text-white px-10 py-5 rounded-[24px] font-black uppercase tracking-widest text-[10px] border border-white/20">Request Free Demo for MoET Officials</button>
                  </div>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-12">Authorized by MoET ICT Directorate</p>
               </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Charts Column */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* National Performance vs Funding Chart */}
            <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm space-y-8">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-black text-slate-900">Regional Performance Impact</h3>
                  <p className="text-sm text-slate-500 font-medium">Correlation between funding allocation and national pass rates.</p>
                </div>
                <div className="flex gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-blue-500 rounded-full" />
                    <span className="text-[10px] font-black text-slate-400 uppercase">Pass Rate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-emerald-500 rounded-full" />
                    <span className="text-[10px] font-black text-slate-400 uppercase">Funding %</span>
                  </div>
                </div>
              </div>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={PERFORMANCE_DATA}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="region" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 'bold', fill: '#64748b' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 'bold', fill: '#64748b' }} />
                    <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} />
                    <Bar dataKey="passRate" fill="#3b82f6" radius={[8, 8, 0, 0]} barSize={40} />
                    <Bar dataKey="funding" fill="#10b981" radius={[8, 8, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Subject Trends */}
            <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm space-y-8">
              <h3 className="text-xl font-black text-slate-900">Core Subject Proficiency Over Time</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={SUBJECT_TRENDS}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 'bold', fill: '#64748b' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 'bold', fill: '#64748b' }} />
                    <Tooltip contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} />
                    <Line type="monotone" dataKey="math" stroke="#3b82f6" strokeWidth={4} dot={{ r: 6, fill: '#3b82f6', strokeWidth: 4, stroke: '#fff' }} />
                    <Line type="monotone" dataKey="science" stroke="#10b981" strokeWidth={4} dot={{ r: 6, fill: '#10b981', strokeWidth: 4, stroke: '#fff' }} />
                    <Line type="monotone" dataKey="english" stroke="#f59e0b" strokeWidth={4} dot={{ r: 6, fill: '#f59e0b', strokeWidth: 4, stroke: '#fff' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-12">
            
            {/* Enrollment Distribution */}
            <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm space-y-8">
              <h3 className="text-xl font-black text-slate-900">Enrollment by Level</h3>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ENROLLMENT_BY_LEVEL}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {ENROLLMENT_BY_LEVEL.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {ENROLLMENT_BY_LEVEL.map((lvl) => (
                  <div key={lvl.name} className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: lvl.color }} />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lvl.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Infrastructure Health */}
            <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm space-y-8">
              <h3 className="text-xl font-black text-slate-900">Infrastructure Health</h3>
              <div className="space-y-6">
                {INFRASTRUCTURE_HEALTH.map((item) => (
                  <div key={item.category} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black text-slate-700 uppercase tracking-wide">{item.category}</span>
                      <span className="text-xs font-black text-slate-900">{item.status}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${item.status}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className={`h-full rounded-full ${item.status < 50 ? 'bg-rose-500' : item.status < 80 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full bg-slate-50 text-slate-600 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all">
                Full Infrastructure Inventory
              </button>
            </div>

            {/* AI Strategic Insights */}
            <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 p-10 rounded-[48px] shadow-2xl space-y-6 text-white relative overflow-hidden">
               <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500 rounded-full opacity-20 blur-3xl" />
               <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-3">
                    <Lightbulb className="text-amber-400 w-6 h-6" />
                    <h3 className="text-xl font-black tracking-tight">AI Strategic Insights</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-white/10 rounded-2xl border border-white/10 text-xs font-medium leading-relaxed">
                      "Lubombo region shows a 15% drop in Science participation. We recommend redirecting 5% of the National STEM fund to the Sitobela cluster for mobile labs."
                    </div>
                    <div className="p-4 bg-white/10 rounded-2xl border border-white/10 text-xs font-medium leading-relaxed">
                      "Projected teacher retirement in 24 months: 420. Recruitment drive for the William Pitcher College should be accelerated by Q3."
                    </div>
                  </div>
                  <button className="w-full bg-white text-blue-900 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 transition-all">
                    Generate Full Policy Strategy
                  </button>
               </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default MinistryPortal;
