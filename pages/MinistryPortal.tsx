import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, BookOpen, AlertTriangle, TrendingUp } from 'lucide-react';

const mockRegionalData = [
  { name: 'Hhohho', passRate: 82, engagement: 85 },
  { name: 'Manzini', passRate: 78, engagement: 92 },
  { name: 'Lubombo', passRate: 65, engagement: 60 },
  { name: 'Shiselweni', passRate: 68, engagement: 65 },
];

const mockSubjectTrouble = [
  { subject: 'Math', difficulty: 95 },
  { subject: 'Physics', difficulty: 88 },
  { subject: 'Biology', difficulty: 75 },
  { subject: 'SiSwati', difficulty: 45 },
];

const MinistryPortal: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">National EdTech Insights</h1>
          <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2">
            MoET Admin Mode ● Active
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Active Students', value: '42,500', icon: Users, color: 'text-blue-600' },
            { label: 'Verified Materials', value: '1,280', icon: BookOpen, color: 'text-fuchsia-600' },
            { label: 'High Difficulty Alerts', value: '14', icon: AlertTriangle, color: 'text-amber-500' },
            { label: 'Y/Y Engagement Gain', value: '+24%', icon: TrendingUp, color: 'text-emerald-600' },
          ].map((kpi, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <kpi.icon className={`w-6 h-6 mb-4 ${kpi.color}`} />
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{kpi.label}</p>
              <p className="text-3xl font-black text-slate-900">{kpi.value}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-sm font-black text-slate-900 uppercase mb-8">Pass Rate vs Engagement by Region</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockRegionalData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="passRate" fill="#2563eb" radius={[10, 10, 0, 0]} />
                <Bar dataKey="engagement" fill="#c026d3" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-sm font-black text-slate-900 uppercase mb-8">Subject Difficulty Index</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockSubjectTrouble}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="difficulty" stroke="#f59e0b" strokeWidth={4} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinistryPortal;
