
import React, { useState, useEffect } from 'react';
import { Institution, User, Region, SubscriptionPlan, InstitutionType, GenderType } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, AreaChart, Area, Legend } from 'recharts';
import SecurityDashboard from '../components/SecurityDashboard';
import { Plus, X } from 'lucide-react';
import { MOCK_INSTITUTIONS } from '../mockData';

interface SuperAdminDashboardProps {
  institutions: Institution[];
  onUpdate: (inst: Institution) => void;
  onDelete: (id: string) => void;
  onSeed?: () => void;
  onAdd?: (inst: Institution) => void;
}

const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({ institutions, onUpdate, onDelete, onSeed, onAdd }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'institutions' | 'verification' | 'analytics' | 'security' | 'performance' | 'users' | 'moderation' | 'forecasting'>('overview');
  const [perfStats, setPerfStats] = useState<any>(null);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSchool, setNewSchool] = useState({ name: '', region: Region.HHOHHO, adminEmail: '' });

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => setPerfStats(data))
      .catch(err => console.error("Failed to fetch perf stats", err));
  }, []);

  const handleAddInstitution = () => {
    if (!onAdd || !newSchool.name) return;
    
    // Copy the structure of the first mock institution to ensure all required fields are present
    const baseInst = JSON.parse(JSON.stringify(MOCK_INSTITUTIONS[0])) as Institution;
    
    const id = `inst-${Date.now()}`;
    const newInst: Institution = {
      ...baseInst,
      id,
      name: newSchool.name,
      slug: newSchool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      region: newSchool.region,
      status: 'pending',
      plan: SubscriptionPlan.FREE,
      isVerified: false,
      isAccredited: false,
      adminId: newSchool.adminEmail, // Temporarily using adminId to store email for matching
      createdAt: new Date().toISOString(),
      logo: '',
      coverImage: ''
    };
    
    onAdd(newInst);
    setShowAddModal(false);
    setNewSchool({ name: '', region: Region.HHOHHO, adminEmail: '' });
  };

  const planData = [
    { name: 'Free', value: institutions.filter(i => i.plan === SubscriptionPlan.FREE).length, color: '#94a3b8' },
    { name: 'Premium', value: institutions.filter(i => i.plan === SubscriptionPlan.PREMIUM).length, color: '#3b82f6' },
    { name: 'Enterprise', value: institutions.filter(i => i.plan === SubscriptionPlan.ENTERPRISE).length, color: '#6366f1' },
  ];

  const mrr = institutions.reduce((acc, inst) => {
    if (inst.plan === SubscriptionPlan.PREMIUM) return acc + 2500;
    if (inst.plan === SubscriptionPlan.ENTERPRISE) return acc + 7500;
    return acc;
  }, 0);

  const securityLogs = [
    { id: '1', action: '2FA Enrollment', user: 'principal@waterford.sz', ip: '196.24.12.5', timestamp: '2023-11-23 10:12' },
    { id: '2', action: 'Plan Upgrade: Premium', user: 'admin@stmarks.sz', ip: '196.24.15.82', timestamp: '2023-11-23 11:45' },
    { id: '3', action: 'Bulk Image Upload', user: 'info@uniswa.sz', ip: '41.78.22.10', timestamp: '2023-11-23 13:02' },
  ];

  const forecastData = [
    { year: 'Year 1', 'National Utility License (MoET)': 2000000, 'Convenience Fees': 1500000, 'Marketplace Share': 200000, Total: 3700000 },
    { year: 'Year 2', 'National Utility License (MoET)': 2500000, 'Convenience Fees': 6000000, 'Marketplace Share': 800000, Total: 9300000 },
    { year: 'Year 3', 'National Utility License (MoET)': 3000000, 'Convenience Fees': 18000000, 'Marketplace Share': 2500000, Total: 23500000 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
        <div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">Global Operations</h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Infrastructure Status: Operational
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
           <div className="bg-white border p-8 rounded-[32px] shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">National Utility Grant (Monthly)</p>
              <p className="text-2xl font-black text-slate-900">SZL 166,666</p>
           </div>
           <div className="bg-white border p-8 rounded-[32px] shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Marketplace Volume (GMV)</p>
              <p className="text-2xl font-black text-amber-600">SZL 84,320</p>
              <p className="text-[8px] font-black text-slate-400 uppercase">Platform Take: SZL 16,864</p>
           </div>
        </div>
      </div>

      <div className="flex gap-4 mb-10 border-b border-slate-100 overflow-x-auto">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`pb-4 text-[10px] font-black uppercase tracking-widest transition-all border-b-2 whitespace-nowrap ${activeTab === 'overview' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400'}`}
        >
          Overview
        </button>
        <button 
          onClick={() => setActiveTab('institutions')}
          className={`pb-4 text-[10px] font-black uppercase tracking-widest transition-all border-b-2 whitespace-nowrap ${activeTab === 'institutions' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400'}`}
        >
          Institutions ({institutions.length})
        </button>
        <button 
          onClick={() => setActiveTab('verification')}
          className={`pb-4 text-[10px] font-black uppercase tracking-widest transition-all border-b-2 whitespace-nowrap ${activeTab === 'verification' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400'}`}
        >
          Verification ({institutions.filter(i => i.verificationStatus === 'pending').length})
        </button>
        <button 
          onClick={() => setActiveTab('analytics')}
          className={`pb-4 text-[10px] font-black uppercase tracking-widest transition-all border-b-2 whitespace-nowrap ${activeTab === 'analytics' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400'}`}
        >
          Analytics
        </button>
        <button 
          onClick={() => setActiveTab('security')}
          className={`pb-4 text-[10px] font-black uppercase tracking-widest transition-all border-b-2 whitespace-nowrap ${activeTab === 'security' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400'}`}
        >
          Security
        </button>
        <button 
          onClick={() => setActiveTab('performance')}
          className={`pb-4 text-[10px] font-black uppercase tracking-widest transition-all border-b-2 whitespace-nowrap ${activeTab === 'performance' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400'}`}
        >
          Performance
        </button>
        <button 
          onClick={() => setActiveTab('users')}
          className={`pb-4 text-[10px] font-black uppercase tracking-widest transition-all border-b-2 whitespace-nowrap ${activeTab === 'users' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400'}`}
        >
          Users
        </button>
        <button 
          onClick={() => setActiveTab('moderation')}
          className={`pb-4 text-[10px] font-black uppercase tracking-widest transition-all border-b-2 whitespace-nowrap ${activeTab === 'moderation' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400'}`}
        >
          Moderation
        </button>
        <button 
          onClick={() => setActiveTab('forecasting')}
          className={`pb-4 text-[10px] font-black uppercase tracking-widest transition-all border-b-2 whitespace-nowrap ${activeTab === 'forecasting' ? 'border-amber-500 text-amber-500' : 'border-transparent text-slate-400'}`}
        >
          Forecasting (Projections)
        </button>
      </div>

      {activeTab === 'overview' ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-10">
            <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm col-span-1 flex flex-col items-center">
               <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-10 text-center">Plan Distribution</h3>
               <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                     <PieChart>
                        <Pie data={planData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                           {planData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: '24px', border: 'none' }} />
                     </PieChart>
                  </ResponsiveContainer>
               </div>
               <div className="flex gap-4 mt-6">
                  {planData.map(p => (
                    <div key={p.name} className="flex items-center gap-2">
                       <div className="w-3 h-3 rounded-full" style={{backgroundColor: p.color}} />
                       <span className="text-[10px] font-black uppercase text-slate-500">{p.name}</span>
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm col-span-2 overflow-hidden">
               <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-10">Security Activity Feed</h3>
               <div className="space-y-6">
                  {securityLogs.map(log => (
                    <div key={log.id} className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl group hover:bg-slate-100 transition-colors">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-xl shadow-sm">🔒</div>
                          <div>
                             <p className="text-xs font-black text-slate-900">{log.action}</p>
                             <p className="text-[10px] text-slate-500 font-medium">{log.user}</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className="text-[10px] font-black text-slate-400">{log.ip}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">{log.timestamp}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
          
          <div className="bg-slate-900 text-white p-12 rounded-[48px] shadow-2xl flex flex-col md:flex-row justify-between items-center gap-8">
             <div className="max-w-md">
                <h3 className="text-2xl font-black mb-4 tracking-tight">Enterprise Infrastructure Support</h3>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">System backups are performed every 6 hours. Disaster recovery clusters are active in Southern Africa (JHB-1) and Europe (FRA-1).</p>
             </div>
             <div className="flex flex-col sm:flex-row gap-4">
                {onSeed && (
                  <button 
                    onClick={onSeed}
                    className="bg-amber-500 text-white px-10 py-5 rounded-[24px] font-black uppercase tracking-widest text-[10px] hover:bg-amber-600 transition-all shadow-xl shadow-amber-900/50"
                  >
                    Seed Database
                  </button>
                )}
                <button className="bg-blue-600 text-white px-10 py-5 rounded-[24px] font-black uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/50">Run System Audit</button>
             </div>
          </div>
        </>
      ) : activeTab === 'institutions' ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Institution Directory</h3>
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-200"
            >
              <Plus className="w-4 h-4" /> Add New School
            </button>
          </div>
          <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Institution</th>
                  <th className="pb-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Region</th>
                  <th className="pb-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Plan</th>
                  <th className="pb-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="pb-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {institutions.map(inst => (
                  <tr key={inst.id} className="group hover:bg-slate-50 transition-colors">
                    <td className="py-6">
                      <div className="flex items-center gap-4">
                        <img src={inst.logo || undefined} className="w-10 h-10 rounded-xl object-contain border bg-white p-1" />
                        <div>
                          <p className="text-sm font-black text-slate-900">{inst.name}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">{inst.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 text-[10px] font-black text-slate-600 uppercase tracking-widest">{inst.region}</td>
                    <td className="py-6">
                      <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${inst.plan === SubscriptionPlan.FREE ? 'bg-slate-100' : 'bg-blue-600 text-white'}`}>{inst.plan}</span>
                    </td>
                    <td className="py-6">
                      <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${inst.status === 'published' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{inst.status}</span>
                    </td>
                    <td className="py-6">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => onUpdate({ ...inst, status: inst.status === 'published' ? 'pending' : 'published' })}
                          className="p-2 bg-slate-100 rounded-xl hover:bg-blue-100 hover:text-blue-600 transition-all"
                        >
                          {inst.status === 'published' ? '⏸' : '▶️'}
                        </button>
                        <button 
                          onClick={() => onDelete(inst.id)}
                          className="p-2 bg-slate-100 rounded-xl hover:bg-rose-100 hover:text-rose-600 transition-all"
                        >
                          🗑
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      ) : activeTab === 'verification' ? (
        <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-10">Verification Requests</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {institutions.filter(i => i.verificationStatus === 'pending').map(inst => (
              <div key={inst.id} className="border border-slate-100 p-6 rounded-3xl shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <img src={inst.logo || undefined} className="w-12 h-12 rounded-xl object-contain border bg-white p-1" />
                  <div>
                    <h4 className="font-black text-slate-900">{inst.name}</h4>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500">{inst.moetRegistration}</p>
                  </div>
                </div>
                <div className="mb-6">
                  <p className="text-xs font-bold text-slate-700 mb-2">Submitted Documents:</p>
                  <ul className="space-y-2">
                    {inst.verificationDocuments?.map((doc, idx) => (
                      <li key={idx} className="text-xs text-blue-600 hover:underline cursor-pointer flex items-center gap-2">
                        📄 Document {idx + 1}
                      </li>
                    )) || <li className="text-xs text-slate-400">No documents uploaded</li>}
                  </ul>
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={() => onUpdate({ ...inst, verificationStatus: 'verified', isVerified: true, trustScore: 100 })}
                    className="flex-1 bg-emerald-500 text-white py-3 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-emerald-600 transition-all"
                  >
                    Approve
                  </button>
                  <button 
                    onClick={() => onUpdate({ ...inst, verificationStatus: 'rejected', isVerified: false, trustScore: 0 })}
                    className="flex-1 bg-rose-500 text-white py-3 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-rose-600 transition-all"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
            {institutions.filter(i => i.verificationStatus === 'pending').length === 0 && (
              <div className="col-span-full text-center py-12 text-slate-400 font-medium">
                No pending verification requests.
              </div>
            )}
          </div>
        </div>
      ) : activeTab === 'analytics' ? (
        <div className="space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-10">Regional Growth Trends</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                  <BarChart data={[
                    { name: 'Hhohho', schools: institutions.filter(i => i.region === Region.HHOHHO).length },
                    { name: 'Manzini', schools: institutions.filter(i => i.region === Region.MANZINI).length },
                    { name: 'Lubombo', schools: institutions.filter(i => i.region === Region.LUBOMBO).length },
                    { name: 'Shiselweni', schools: institutions.filter(i => i.region === Region.SHISELWENI).length },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 800 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 800 }} />
                    <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                    <Bar dataKey="schools" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-10">Application Volume (Last 6 Months)</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                  <LineChart data={[
                    { name: 'Oct', applications: 120 }, { name: 'Nov', applications: 250 },
                    { name: 'Dec', applications: 400 }, { name: 'Jan', applications: 850 },
                    { name: 'Feb', applications: 600 }, { name: 'Mar', applications: 350 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 800 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 800 }} />
                    <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                    <Line type="monotone" dataKey="applications" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-10">Most Searched Institutions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {institutions.sort((a, b) => b.stats.views - a.stats.views).slice(0, 6).map((inst, idx) => (
                <div key={inst.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-black text-slate-300">#{idx + 1}</span>
                    <div>
                      <p className="text-sm font-black text-slate-900">{inst.name}</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest">{inst.region}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-blue-600">{inst.stats.views.toLocaleString()}</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">Views</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : activeTab === 'security' ? (
        <SecurityDashboard />
      ) : activeTab === 'performance' ? (
        <div className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Avg. Response Time</p>
              <p className="text-3xl font-black text-slate-900">{perfStats?.avgResponseTime || '45ms'}</p>
            </div>
            <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">System Uptime</p>
              <p className="text-3xl font-black text-emerald-600">{perfStats?.uptime || '99.99%'}</p>
            </div>
            <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">CDN Cache Hit Rate</p>
              <p className="text-3xl font-black text-blue-600">94.2%</p>
            </div>
            <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Image Compression</p>
              <p className="text-3xl font-black text-indigo-600">65% Saved</p>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-10">Infrastructure Nodes</h3>
            <div className="space-y-4">
              {[
                { name: 'API Gateway (JHB-1)', status: 'Healthy', load: '12%', latency: '15ms' },
                { name: 'Database Cluster (Primary)', status: 'Healthy', load: '24%', latency: '8ms' },
                { name: 'CDN Edge (CPT-1)', status: 'Healthy', load: '8%', latency: '12ms' },
                { name: 'Asset Storage (S3-Compatible)', status: 'Healthy', load: '45%', latency: '22ms' },
              ].map(node => (
                <div key={node.name} className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl">
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                    <p className="text-sm font-bold text-slate-900">{node.name}</p>
                  </div>
                  <div className="flex gap-8 text-right">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Load</p>
                      <p className="text-xs font-bold text-slate-900">{node.load}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Latency</p>
                      <p className="text-xs font-bold text-slate-900">{node.latency}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : activeTab === 'users' ? (
        <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">User Management</h3>
            <button className="bg-slate-900 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest">Add New Admin</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">User</th>
                  <th className="pb-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Role</th>
                  <th className="pb-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Institution</th>
                  <th className="pb-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Active</th>
                  <th className="pb-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { name: 'Sipho Mamba', email: 'sipho@uneswa.ac.sz', role: 'Institution Admin', inst: 'University of Eswatini', lastActive: '2 mins ago', status: 'Active' },
                  { name: 'Jane Dlamini', email: 'jane@waterford.sz', role: 'Institution Admin', inst: 'Waterford Kamhlaba', lastActive: '1 hour ago', status: 'Active' },
                  { name: 'Thabo Simelane', email: 'thabo@stmarks.sz', role: 'Content Editor', inst: "St. Mark's High", lastActive: 'Yesterday', status: 'Inactive' },
                ].map((u, idx) => (
                  <tr key={idx} className="group hover:bg-slate-50 transition-colors">
                    <td className="py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-400">{u.name[0]}</div>
                        <div>
                          <p className="text-sm font-black text-slate-900">{u.name}</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 text-[10px] font-black text-slate-600 uppercase tracking-widest">{u.role}</td>
                    <td className="py-6 text-[10px] font-black text-slate-600 uppercase tracking-widest">{u.inst}</td>
                    <td className="py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">{u.lastActive}</td>
                    <td className="py-6">
                      <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${u.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{u.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : activeTab === 'moderation' ? (
        <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-10">Reports & Moderation</h3>
          <div className="space-y-6">
            {[
              { id: '1', type: 'Review', reason: 'Inappropriate Language', target: 'Waterford Kamhlaba Review #42', reporter: 'user-882', status: 'Pending' },
              { id: '2', type: 'Institution', reason: 'Misleading Information', target: 'Mock School X', reporter: 'user-112', status: 'Under Review' },
              { id: '3', type: 'Media', reason: 'Copyright Violation', target: 'UNESWA Gallery Image #12', reporter: 'user-554', status: 'Resolved' },
            ].map(report => (
              <div key={report.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${
                    report.status === 'Pending' ? 'bg-rose-100 text-rose-600' : 
                    report.status === 'Under Review' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
                  }`}>
                    {report.type === 'Review' ? '💬' : report.type === 'Institution' ? '🏛' : '🖼'}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900">{report.reason}</h4>
                    <p className="text-xs text-slate-500 font-medium">Target: {report.target} • Reporter: {report.reporter}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                    report.status === 'Pending' ? 'bg-rose-100 text-rose-700' : 
                    report.status === 'Under Review' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {report.status}
                  </span>
                  <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : activeTab === 'forecasting' ? (
        <div className="space-y-10">
          <div className="bg-slate-900 p-10 rounded-[48px] shadow-2xl relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 p-8 opacity-5 text-9xl">📈</div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
               <div>
                  <h3 className="text-3xl font-black tracking-tight mb-2">3-Year Revenue Projections</h3>
                  <p className="text-slate-400 font-medium">B2B2C and B2G ecosystem financial modeling for the Eswatini rollout.</p>
               </div>
               <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl text-right">
                  <p className="text-[10px] uppercase font-black tracking-widest text-emerald-400 mb-1">Year 3 Target ARR</p>
                  <p className="text-4xl font-black text-white">SZL 20.3M</p>
               </div>
            </div>

            <div className="h-96 w-full mt-8 bg-white/5 rounded-3xl p-6 border border-white/10">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <AreaChart data={forecastData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorMoET" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorSchools" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorEducators" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorParents" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff20" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#cbd5e1', fontWeight: 800 }} />
                  <YAxis tickFormatter={(val) => `E${(val/1000000).toFixed(1)}M`} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#cbd5e1', fontWeight: 800 }} />
                  <Tooltip 
                     contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', color: '#fff' }} 
                     itemStyle={{ color: '#e2e8f0', fontWeight: 700 }}
                     formatter={(value: number) => ['SZL ' + value.toLocaleString(), undefined]}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', fontWeight: 700, marginTop: '20px' }} />
                  <Area type="monotone" dataKey="National Utility License (MoET)" stackId="1" stroke="#3b82f6" fill="url(#colorMoET)" />
                  <Area type="monotone" dataKey="Marketplace Share" stackId="1" stroke="#f59e0b" fill="url(#colorEducators)" />
                  <Area type="monotone" dataKey="Convenience Fees" stackId="1" stroke="#6366f1" fill="url(#colorParents)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col justify-between">
                <div>
                   <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-xl mb-4">🏛</div>
                   <h4 className="font-black text-slate-900 mb-1">MoET (B2G)</h4>
                   <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Data & Verification</p>
                </div>
                <div className="mt-8">
                   <p className="text-2xl font-black text-slate-900">E800k <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">/ yr3</span></p>
                </div>
             </div>
             
             <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col justify-between">
                <div>
                   <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center text-xl mb-4">🏫</div>
                   <h4 className="font-black text-slate-900 mb-1">Schools (B2B)</h4>
                   <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">SaaS & Comm. Fees</p>
                </div>
                <div className="mt-8">
                   <p className="text-2xl font-black text-slate-900">E13.5M <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">/ yr3</span></p>
                </div>
             </div>

             <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col justify-between">
                <div>
                   <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center text-xl mb-4">👨‍🏫</div>
                   <h4 className="font-black text-slate-900 mb-1">Educators (B2C)</h4>
                   <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Marketplace Share</p>
                </div>
                <div className="mt-8">
                   <p className="text-2xl font-black text-slate-900">E2.0M <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">/ yr3</span></p>
                </div>
             </div>

             <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col justify-between">
                <div>
                   <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center text-xl mb-4">👨‍👩‍👧</div>
                   <h4 className="font-black text-slate-900 mb-1">Parents/Students</h4>
                   <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Convenience Fees</p>
                </div>
                <div className="mt-8">
                   <p className="text-2xl font-black text-slate-900">E4.0M <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">/ yr3</span></p>
                </div>
             </div>
          </div>
        </div>
      ) : null}

      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[40px] max-w-lg w-full p-10 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Add New School</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="w-10 h-10 bg-slate-100 hover:bg-rose-100 hover:text-rose-600 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">School Name</label>
                <input 
                  type="text" 
                  value={newSchool.name}
                  onChange={(e) => setNewSchool({...newSchool, name: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-bold text-slate-900 focus:ring-4 focus:ring-blue-50 focus:border-blue-200 outline-none transition-all"
                  placeholder="e.g. Mbabane Central High"
                />
              </div>
              
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Region</label>
                <select 
                  value={newSchool.region}
                  onChange={(e) => setNewSchool({...newSchool, region: e.target.value as Region})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-bold text-slate-900 focus:ring-4 focus:ring-blue-50 focus:border-blue-200 outline-none transition-all"
                >
                  {Object.values(Region).map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Administrator Email</label>
                <input 
                  type="email" 
                  value={newSchool.adminEmail}
                  onChange={(e) => setNewSchool({...newSchool, adminEmail: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-bold text-slate-900 focus:ring-4 focus:ring-blue-50 focus:border-blue-200 outline-none transition-all"
                  placeholder="admin@school.sz"
                />
                <p className="text-[10px] text-slate-500 mt-2 font-medium">This email will automatically get 'Institution Admin' access.</p>
              </div>
            </div>

            <button 
              onClick={handleAddInstitution}
              disabled={!newSchool.name || !newSchool.adminEmail}
              className="w-full mt-10 bg-blue-600 text-white p-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-blue-200"
            >
              Provision School Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminDashboard;
