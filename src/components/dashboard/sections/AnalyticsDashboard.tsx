
import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Treemap
} from 'recharts';
import { Institution, Region } from '../../../../types';
import { TrendingUp, Users, MapPin, Eye, MousePointer2, Target, Globe, Zap } from 'lucide-react';

interface AnalyticsDashboardProps {
  mode: 'institution' | 'global';
  institution?: Institution;
  institutions?: Institution[];
}

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f59e0b', '#10b981', '#06b6d4', '#3b82f6'];

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ mode, institution, institutions = [] }) => {
  // --- MOCK DATA FOR CHARTS ---
  const dailyViews = [
    { day: 'Mon', views: 420 }, { day: 'Tue', views: 580 }, { day: 'Wed', views: 510 },
    { day: 'Thu', views: 720 }, { day: 'Fri', views: 680 }, { day: 'Sat', views: 450 },
    { day: 'Sun', views: 390 }
  ];

  const conversionFunnel = [
    { name: 'Profile Visits', value: 2400 },
    { name: 'Programs Viewed', value: 1800 },
    { name: 'Apply Clicks', value: 800 },
    { name: 'Submitted', value: 450 },
  ];

  const locations = [
    { name: 'Mbabane', value: 45 }, { name: 'Manzini', value: 30 },
    { name: 'Matsapha', value: 15 }, { name: 'Siteki', value: 6 },
    { name: 'Nhlangano', value: 4 }
  ];

  const regionalGrowth = [
    { date: '2024-01', Hhohho: 120, Manzini: 90, Lubombo: 40, Shiselweni: 20 },
    { date: '2024-02', Hhohho: 150, Manzini: 110, Lubombo: 45, Shiselweni: 25 },
    { date: '2024-03', Hhohho: 190, Manzini: 140, Lubombo: 55, Shiselweni: 30 },
    { date: '2024-04', Hhohho: 240, Manzini: 180, Lubombo: 70, Shiselweni: 45 },
  ];

  const applicationVolume = [
    { subject: 'Academic', A: 120, B: 110, fullMark: 150 },
    { subject: 'Enrollment', A: 98, B: 130, fullMark: 150 },
    { subject: 'Search', A: 86, B: 130, fullMark: 150 },
    { subject: 'Conversion', A: 99, B: 100, fullMark: 150 },
    { subject: 'Retention', A: 85, B: 90, fullMark: 150 },
  ];

  const searchTrends = [
    { time: '08:00', total: 1200, schools: 800, scholarships: 400 },
    { time: '10:00', total: 2400, schools: 1500, scholarships: 900 },
    { time: '12:00', total: 3200, schools: 2100, scholarships: 1100 },
    { time: '14:00', total: 2800, schools: 1800, scholarships: 1000 },
    { time: '16:00', total: 1900, schools: 1200, scholarships: 700 },
    { time: '18:00', total: 1500, schools: 1000, scholarships: 500 },
  ];

  const renderInstitutionAnalytics = () => {
    if (!institution) return null;
    
    return (
      <div className="space-y-12 animate-in fade-in">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Platform Visibility', value: institution.stats.views.toLocaleString(), icon: <Eye className="w-5 h-5" />, trend: '+12% vs last month', color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Funnel Progress', value: institution.stats.applications.toLocaleString(), icon: <Target className="w-5 h-5" />, trend: '+5% vs last month', color: 'text-indigo-600', bg: 'bg-indigo-50' },
            { label: 'Conversion SEO', value: institution.seoScore + '%', icon: <TrendingUp className="w-5 h-5" />, trend: 'Healthy Score', color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Engagement Rate', value: institution.stats.engagementRate + '%', icon: <MousePointer2 className="w-5 h-5" />, trend: '-2% last 7 days', color: 'text-rose-600', bg: 'bg-rose-50' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
               <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6`}>
                  {stat.icon}
               </div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
               <p className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</p>
               <p className="text-[10px] font-bold text-slate-400 mt-2">{stat.trend}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Traffic Source - Area Chart */}
          <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-500" /> Traffic Pulse (7 Days)
              </h3>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase">
                  <span className="w-2 h-2 rounded-full bg-indigo-500" /> Views
                </span>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <AreaChart data={dailyViews}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 800 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 800 }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)', padding: '16px' }}
                    itemStyle={{ fontWeight: 800, fontSize: '10px', textTransform: 'uppercase' }}
                  />
                  <Area type="monotone" dataKey="views" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorViews)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Visitor Distribution - Treemap or Bar */}
          <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-10 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-500" /> Geographic Origin
            </h3>
            <div className="h-72">
               <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                  <BarChart data={locations} layout="vertical" margin={{ left: 40 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 800 }} />
                    <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '24px', border: 'none' }} />
                    <Bar dataKey="value" fill="#ec4899" radius={[0, 10, 10, 0]} barSize={24} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           {/* Application Funnel */}
           <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-10">Application Conversion Funnel</h3>
              <div className="space-y-6">
                {conversionFunnel.map((item, idx) => {
                   const percentage = (item.value / conversionFunnel[0].value) * 100;
                   return (
                      <div key={idx} className="relative">
                        <div className="flex justify-between items-center mb-2 px-1">
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.name}</span>
                           <span className="text-xs font-black text-slate-900">{item.value.toLocaleString()}</span>
                        </div>
                        <div className="h-4 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                           <div 
                              className="h-full bg-slate-900 transition-all duration-1000 ease-out" 
                              style={{ width: `${percentage}%`, opacity: 1 - (idx * 0.2) }}
                           />
                        </div>
                      </div>
                   );
                })}
              </div>
              <div className="mt-10 p-6 bg-slate-50 rounded-3xl border border-slate-100 text-center">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Final Conversion Rate</p>
                 <p className="text-3xl font-black text-indigo-600 tracking-tighter">
                   {((conversionFunnel[3].value / conversionFunnel[0].value) * 100).toFixed(1)}%
                 </p>
              </div>
           </div>

           {/* Top Content */}
           <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-10">Top Performing Programs</h3>
              <div className="space-y-4">
                 {(institution.sections.academics.programs || []).slice(0, 5).map((prog: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-3xl border border-slate-100 hover:border-indigo-200 transition-colors cursor-default">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center font-black text-[10px] text-slate-400 shadow-sm">
                             #{idx + 1}
                          </div>
                          <div>
                             <p className="text-sm font-black text-slate-900">{prog.name || 'Untitled Program'}</p>
                             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{prog.qualification || 'Certification'}</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className="text-xs font-black text-indigo-600">{(Math.random() * 500 + 100).toFixed(0)}</p>
                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">Unique Views</p>
                       </div>
                    </div>
                 ))}
                 {(!institution.sections.academics.programs || institution.sections.academics.programs.length === 0) && (
                   <div className="text-center py-20 text-slate-300 font-black uppercase tracking-widest text-xs">
                     No Academic Programs Found
                   </div>
                 )}
              </div>
           </div>
        </div>
      </div>
    );
  };

  const renderGlobalAnalytics = () => {
    return (
      <div className="space-y-12 animate-in fade-in">
        {/* Global Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           <div className="bg-slate-900 text-white p-8 rounded-[40px] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">🌍</div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">National Registry</p>
              <p className="text-4xl font-black">{institutions.length}</p>
              <p className="text-[10px] font-bold text-emerald-400 mt-2">Active Institutions</p>
           </div>
           <div className="bg-white border p-8 rounded-[40px] shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Network Searches (24h)</p>
              <p className="text-3xl font-black text-slate-900">12.5k</p>
              <p className="text-[10px] font-bold text-indigo-500 mt-2">SZ High Velocity</p>
           </div>
           <div className="bg-white border p-8 rounded-[40px] shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Application Volume</p>
              <p className="text-3xl font-black text-slate-900">3.8k</p>
              <p className="text-[10px] font-bold text-rose-500 mt-2">+15.2% WoW</p>
           </div>
           <div className="bg-white border p-8 rounded-[40px] shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Scholarship Inquiries</p>
              <p className="text-3xl font-black text-slate-900">840</p>
              <p className="text-[10px] font-bold text-amber-500 mt-2">Active Funnel</p>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Regional Growth Stacked Area */}
           <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm lg:col-span-2">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-10 flex items-center gap-2">
                 <Globe className="w-4 h-4 text-blue-500" /> Regional Institutional Growth
              </h3>
              <div className="h-80">
                 <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                    <AreaChart data={regionalGrowth}>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                       <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 800 }} />
                       <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 800 }} />
                       <Tooltip contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                       <Area type="monotone" dataKey="Hhohho" stackId="1" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} />
                       <Area type="monotone" dataKey="Manzini" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                       <Area type="monotone" dataKey="Lubombo" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
                       <Area type="monotone" dataKey="Shiselweni" stackId="1" stroke="#ec4899" fill="#ec4899" fillOpacity={0.6} />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </div>

           {/* Metrics Radar Chart */}
           <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-10">Application Velocity</h3>
              <div className="h-80">
                 <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                    <RadarChart data={applicationVolume}>
                       <PolarGrid stroke="#f1f5f9" />
                       <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#64748b', fontWeight: 800 }} />
                       <PolarRadiusAxis axisLine={false} tick={false} />
                       <Radar name="Institutions" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} />
                       <Radar name="Scholarships" dataKey="B" stroke="#ec4899" fill="#ec4899" fillOpacity={0.6} />
                       <Tooltip contentStyle={{ borderRadius: '24px', border: 'none' }} />
                    </RadarChart>
                 </ResponsiveContainer>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           {/* Search Trends Line Chart */}
           <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-10">Most Searched Keywords & Trends</h3>
              <div className="h-72">
                 <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                    <LineChart data={searchTrends}>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                       <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 800 }} />
                       <Tooltip contentStyle={{ borderRadius: '24px', border: 'none' }} />
                       <Line type="monotone" dataKey="schools" stroke="#6366f1" strokeWidth={4} dot={false} />
                       <Line type="monotone" dataKey="scholarships" stroke="#ec4899" strokeWidth={4} dot={false} />
                    </LineChart>
                 </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap gap-4 mt-8">
                 {['Waterford Kamhlaba', 'UNESWA', 'St. Marks High', 'JC Results', 'EPC Certificates'].map((kw, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest">
                       {kw}
                    </span>
                 ))}
              </div>
           </div>

           {/* Platform Heatmap Mockup */}
           <div className="bg-slate-900 p-10 rounded-[40px] shadow-2xl flex flex-col justify-between overflow-hidden relative">
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #6366f1 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }} />
              <div>
                 <div className="flex justify-between items-start mb-10 relative z-10">
                    <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                       <Zap className="w-4 h-4 text-amber-500" /> Platform Intent Heatmap
                    </h3>
                    <span className="text-[10px] font-black text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full animate-pulse">LIVE ACTIVITY</span>
                 </div>
                 
                 <div className="grid grid-cols-5 gap-3 relative z-10">
                    {Array.from({ length: 15 }).map((_, i) => {
                       const intensity = Math.random();
                       const color = intensity > 0.8 ? 'bg-amber-500' : intensity > 0.5 ? 'bg-indigo-500' : intensity > 0.3 ? 'bg-blue-500' : 'bg-slate-800';
                       return (
                          <div 
                             key={i} 
                             className={`h-16 rounded-2xl ${color} opacity-${Math.round(intensity * 100)} flex items-center justify-center border border-white/5 transition-all hover:scale-105 cursor-pointer shadow-lg`}
                             style={{ opacity: intensity * 0.8 + 0.2 }}
                          />
                       );
                    })}
                 </div>
              </div>
              <div className="mt-10 relative z-10 flex items-center justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest border-t border-white/10 pt-6">
                 <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-800" /> Low</div>
                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500" /> Mod</div>
                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" /> Peak</div>
                 </div>
                 <p>Real-time Session Density</p>
              </div>
           </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      {mode === 'institution' ? renderInstitutionAnalytics() : renderGlobalAnalytics()}
    </div>
  );
};
