
import React, { useState, useEffect } from 'react';
import { Institution, User, Region, SubscriptionPlan, InstitutionType, GenderType, UserRole } from '../types';
import InstitutionAdminDashboard from './InstitutionAdminDashboard';
import { hasPermission } from '../src/lib/permissions';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, AreaChart, Area, Legend } from 'recharts';
import SecurityDashboard from '../components/SecurityDashboard';
import { AnalyticsDashboard } from '../src/components/dashboard/sections/AnalyticsDashboard';
import { Plus, X, ArrowLeft, Layout, CheckSquare, AlertCircle, Map as MapIcon, ShieldCheck as ShieldCheckIcon, Globe as GlobeIcon, Users as UsersIcon, Send as SendIcon } from 'lucide-react';
import RegionalSchoolMap from '../src/components/RegionalSchoolMap';
import { MOCK_INSTITUTIONS } from '../mockData';
import { db, doc, setDoc, collection, getDocs, query, where, getDocsWithRetry, handleFirestoreError, OperationType } from '../src/lib/firebase';
import { updateDoc, addDoc } from 'firebase/firestore';

interface SuperAdminDashboardProps {
  user: User;
  institutions: Institution[];
  onUpdate: (inst: Institution) => void;
  onDelete: (id: string) => void;
  onSeed?: () => void;
  onAdd?: (inst: Institution) => void;
}

const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({ user, institutions, onUpdate, onDelete, onSeed, onAdd }) => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [adminProxy, setAdminProxy] = useState<User | null>(null);
  const [perfStats, setPerfStats] = useState<any>(null);
  const [diagnostics, setDiagnostics] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [claims, setClaims] = useState<any[]>([]);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [newSchool, setNewSchool] = useState({ name: '', region: Region.HHOHHO, adminEmail: '' });
  const [certificateFile, setCertificateFile] = useState<File | null>(null);
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', role: 'Institution Admin' as any, inst: '' });

  const [users, setUsers] = useState([
    { name: 'Sipho Mamba', email: 'sipho@uneswa.ac.sz', role: 'Institution Admin', inst: 'University of Eswatini', lastActive: '2 mins ago', status: 'Active' },
    { name: 'Jane Dlamini', email: 'jane@waterford.sz', role: 'Institution Admin', inst: 'Waterford Kamhlaba', lastActive: '1 hour ago', status: 'Active' },
    { name: 'Thabo Simelane', email: 'thabo@stmarks.sz', role: 'Content Editor', inst: "St. Mark's High", lastActive: 'Yesterday', status: 'Inactive' },
  ]);

  const handleAddAdmin = () => {
    if (!newAdmin.name || !newAdmin.email) return;
    setUsers([
      { ...newAdmin, lastActive: 'Never', status: 'Active' },
      ...users
    ]);
    setShowAddAdminModal(false);
    setNewAdmin({ name: '', email: '', role: 'Institution Admin', inst: '' });
  };

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => setPerfStats(data))
      .catch(err => console.error("Failed to fetch perf stats", err));
    
    fetch('/api/diagnostics')
      .then(res => res.json())
      .then(data => setDiagnostics(data))
      .catch(err => console.error("Failed to fetch diagnostics", err));
    
    // Fetch applications
    const fetchApplications = async () => {
      try {
        const q = query(collection(db, 'school_applications'), where('status', '==', 'pending'));
        const querySnapshot = await getDocsWithRetry(q);
        const apps = querySnapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as object) }));
        setApplications(apps);
      } catch (error: any) {
        if (error instanceof Error && !error.message.includes('offline')) {
          console.warn("Firestore Error (school_applications):", error.message);
          setApplications([]);
        }
      }
    };
    
    // Fetch claims
    const fetchClaims = async () => {
      try {
        const q = query(collection(db, 'school_claims'), where('status', '==', 'pending'));
        const querySnapshot = await getDocsWithRetry(q);
        const fClaims = querySnapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as object) }));
        setClaims(fClaims);
      } catch (error: any) {
        if (error instanceof Error && !error.message.includes('offline')) {
          console.warn("Firestore Error (school_claims):", error.message);
          setClaims([]);
        }
      }
    };

    fetchApplications();
    fetchClaims();
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
      status: 'published',
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
    { name: 'Standard', value: institutions.filter(i => i.plan === SubscriptionPlan.STANDARD_B2B).length, color: '#3b82f6' },
    { name: 'Premium', value: institutions.filter(i => i.plan === SubscriptionPlan.PREMIUM_B2B).length, color: '#6366f1' },
    { name: 'Enterprise', value: institutions.filter(i => i.plan === SubscriptionPlan.ENTERPRISE_B2B).length, color: '#10b981' },
  ];

  const mrr = institutions.reduce((acc, inst) => {
    if (inst.plan === SubscriptionPlan.STANDARD_B2B) return acc + 350;
    if (inst.plan === SubscriptionPlan.PREMIUM_B2B) return acc + 500;
    if (inst.plan === SubscriptionPlan.ENTERPRISE_B2B) return acc + 800;
    return acc;
  }, 0);

  const adRevenue = 15000; // Mock current monthly ad revenue
  const b2cSubscriptionRevenue = 25000; // Mock current monthly AI + Tutor subs

  const revenueData6Months = [
    { month: 'Nov', mrr: mrr * 0.7, ad: adRevenue * 0.6, b2c: b2cSubscriptionRevenue * 0.5 },
    { month: 'Dec', mrr: mrr * 0.8, ad: adRevenue * 0.7, b2c: b2cSubscriptionRevenue * 0.6 },
    { month: 'Jan', mrr: mrr * 0.85, ad: adRevenue * 0.8, b2c: b2cSubscriptionRevenue * 0.7 },
    { month: 'Feb', mrr: mrr * 0.9, ad: adRevenue * 0.85, b2c: b2cSubscriptionRevenue * 0.8 },
    { month: 'Mar', mrr: mrr * 0.95, ad: adRevenue * 0.9, b2c: b2cSubscriptionRevenue * 0.9 },
    { month: 'Apr', mrr: mrr, ad: adRevenue, b2c: b2cSubscriptionRevenue },
  ];

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

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'institutions', label: `Institutions (${institutions.length})` },
    { id: 'verification', label: `Verification (${institutions.filter(i => i.verificationStatus === 'pending').length})` },
    { id: 'analytics', label: 'Analytics' },
    { id: 'security', label: 'Security' },
    { id: 'monetization', label: 'Revenue & Ads' },
    { id: 'infrastructure', label: 'Infrastructure' },
    { id: 'users', label: 'Users' },
    { id: 'moderation', label: 'Moderation' },
    { id: 'forecasting', label: 'Forecasting (Projections)' }
  ];

  const filteredTabs = tabs.filter(tab => {
    if (user.role === UserRole.SUPER_ADMIN) return true;
    
    switch (tab.id) {
      case 'overview': return true;
      case 'institutions': return true; // MoET can view directory
      case 'verification': return hasPermission(user, 'canManageVerification');
      case 'analytics': return hasPermission(user, 'canViewAnalytics');
      case 'security': return hasPermission(user, 'canViewSecurityLogs');
      case 'monetization': return hasPermission(user, 'canManageFinance');
      case 'users': return hasPermission(user, 'canManageUsers');
      case 'moderation': return hasPermission(user, 'canManageContent');
      case 'forecasting': return hasPermission(user, 'canViewAnalytics');
      default: return false;
    }
  });

  useEffect(() => {
    if (!filteredTabs.find(t => t.id === activeTab)) {
      setActiveTab(filteredTabs[0]?.id || 'overview');
    }
  }, [filteredTabs, activeTab]);

  if (adminProxy) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <button 
          onClick={() => setAdminProxy(null)}
          className="mb-8 flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Global Operations
        </button>
        <InstitutionAdminDashboard 
          user={adminProxy} 
          institutions={institutions} 
          onUpdate={onUpdate} 
          onAdd={onAdd || (() => {})} 
        />
      </div>
    );
  }

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
        {filteredTabs.map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-4 text-[10px] font-black uppercase tracking-widest transition-all border-b-2 whitespace-nowrap ${activeTab === tab.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' ? (
        <>
          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Institutions</p>
              <p className="text-3xl font-black text-slate-900">{institutions.length}</p>
            </div>
            <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Pending Verifications</p>
              <p className="text-3xl font-black text-amber-600">{institutions.filter(i => i.verificationStatus === 'pending').length}</p>
            </div>
            <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Current MRR</p>
              <p className="text-3xl font-black text-emerald-600">E{mrr.toLocaleString()}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
             {/* Regional Distribution Map */}
             <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                    <MapIcon className="w-4 h-4" /> National School Distribution
                  </h3>
                  <div className="flex gap-2">
                    <span className="flex items-center gap-1 text-[9px] font-black uppercase text-slate-400">
                      <div className="w-2 h-2 bg-blue-600 rounded-full" /> Mapped: {institutions.filter(i => i.contact?.latitude).length}
                    </span>
                  </div>
                </div>
                <RegionalSchoolMap institutions={institutions} height="480px" />
             </div>

             {/* Production Readiness Checklist */}
             <div className="bg-[#0f172a] text-white p-10 rounded-[48px] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                   <ShieldCheckIcon className="w-48 h-48" />
                </div>
                <h3 className="text-xl font-black mb-8 relative z-10">Production Launch Checklist</h3>
                <div className="space-y-6 relative z-10">
                  {[
                    { label: 'Cloud Database Connected', status: 'done', desc: 'Firestore persistence active' },
                    { label: 'Security Rules Deployed', status: 'done', desc: 'ABAC compliant rules live' },
                    { label: 'MoET Official Onboarding', status: 'pending', desc: 'Verifying 4/12 regional officers' },
                    { label: 'Payment Gateway (MoMo)', status: 'warning', desc: 'Mode: Test (Pending MoET Approval)' },
                    { label: 'Data Privacy Audit', status: 'done', desc: 'SGCSE result encryption verified' },
                    { label: 'Paperless Docs Migration', status: 'pending', desc: '85% institutions digitized' }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className={`mt-1 w-5 h-5 rounded-lg flex items-center justify-center shrink-0 ${
                        item.status === 'done' ? 'bg-emerald-500 text-white' : 
                        item.status === 'warning' ? 'bg-amber-500 text-white' : 'bg-slate-800 text-slate-500'
                      }`}>
                        {item.status === 'done' ? <CheckSquare className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                      </div>
                      <div>
                        <p className={`text-xs font-black ${item.status === 'done' ? 'text-white' : 'text-slate-400'}`}>{item.label}</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => alert("Generating full readiness report...")}
                  className="w-full mt-10 py-5 bg-blue-600 hover:bg-blue-500 rounded-3xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-3"
                >
                  Download Readiness Report
                </button>
             </div>
          </div>

          {/* Key Performance Indicators */}
          <div className="mb-10">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">Key Performance Indicators</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm flex flex-col items-center">
                 <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-10 text-center">Plan Distribution</h4>
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

              <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm">
                 <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-10 text-center">Monthly Revenue (6 Months)</h4>
                 <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                      <LineChart data={revenueData6Months} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <Line type="monotone" dataKey="mrr" name="MRR" stroke="#8884d8" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                        <Line type="monotone" dataKey="ad" name="Ad Revenue" stroke="#82ca9d" strokeWidth={3} />
                        <Line type="monotone" dataKey="b2c" name="B2C Subs" stroke="#ffc658" strokeWidth={3} />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" vertical={false} />
                        <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} />
                        <YAxis tickFormatter={(val) => `E${val / 1000}k`} tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} />
                        <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} cursor={{ strokeDasharray: '3 3' }} />
                        <Legend wrapperStyle={{ fontSize: '10px', fontWeight: 700, marginTop: '20px' }} />
                      </LineChart>
                    </ResponsiveContainer>
                 </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm mb-10 overflow-hidden">
             <div className="flex items-center justify-between mb-10">
               <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Security Activity Feed</h3>
               <button onClick={() => window.location.href = '/security'} className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2 rounded-xl font-black uppercase tracking-widest transition-colors">
                 View All Logs
               </button>
             </div>
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
            <div className="flex gap-2">
              <label 
                className="bg-slate-100 text-slate-700 px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-200 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Plus className="w-4 h-4" /> Import MoET CSV
                <input type="file" accept=".csv" className="hidden" onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    alert('CSV Import feature is ready to be connected to the MoET parser!');
                  }
                }} />
              </label>
              <button 
                onClick={() => setShowAddModal(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-200"
              >
                <Plus className="w-4 h-4" /> Add New School
              </button>
            </div>
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
                          onClick={() => setAdminProxy({ id: 'super-admin-proxy', role: UserRole.INSTITUTION_ADMIN, institutionId: inst.id, email: 'proxy@admin.sz', name: 'Proxy Admin', isVerified: true, twoFactorEnabled: false })}
                          className="p-2 bg-slate-100 rounded-xl hover:bg-indigo-100 hover:text-indigo-600 transition-all"
                          title="Switch to Dashboard"
                        >
                          <Layout className="w-4 h-4" />
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
            {applications.map(app => (
              <div key={app.id} className="border border-slate-100 p-6 rounded-3xl shadow-sm">
                <div className="mb-4">
                  <h4 className="font-black text-slate-900">{app.institutionName}</h4>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500">{app.email}</p>
                </div>
                <div className="mb-6">
                  <p className="text-xs font-bold text-slate-700 mb-2">Submitted Documents:</p>
                  <ul className="space-y-2">
                    {app.documentUrls?.map((url: string, idx: number) => (
                      <li key={idx} className="text-xs text-blue-600 hover:underline cursor-pointer flex items-center gap-2">
                        📄 <a href={url} target="_blank" rel="noreferrer">Document {idx + 1}</a>
                      </li>
                    )) || <li className="text-xs text-slate-400">No documents uploaded</li>}
                  </ul>
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={async () => {
                      try {
                        const baseInst = JSON.parse(JSON.stringify(MOCK_INSTITUTIONS[0])) as Institution;
                        const instId = `inst-${Date.now()}`;
                        const approvedInst: Institution = {
                          ...baseInst,
                          id: instId,
                          name: app.institutionName,
                          slug: app.institutionName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                          status: 'published',
                          isVerified: true,
                          region: Region.HHOHHO,
                          adminId: app.email,
                          createdAt: new Date().toISOString(),
                          logo: `https://picsum.photos/seed/${instId}/200/200`,
                          coverImage: baseInst.coverImage || ''
                        };
                        
                        await setDoc(doc(db, 'institutions', instId), approvedInst);
                        await updateDoc(doc(db, 'school_applications', app.id), { status: 'approved' });
                        setApplications(applications.filter(a => a.id !== app.id));
                        alert(`Application for "${app.institutionName}" approved and published successfully!`);
                      } catch (err: any) {
                        console.error("Error approving school application:", err);
                        alert(`Failed to approve: ${err.message}`);
                      }
                    }}
                    className="flex-1 bg-emerald-500 text-white py-3 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-emerald-600 transition-all"
                  >
                    Approve
                  </button>
                  <button 
                    onClick={async () => {
                      await updateDoc(doc(db, 'school_applications', app.id), { status: 'rejected' });
                      setApplications(applications.filter(a => a.id !== app.id));
                    }}
                    className="flex-1 bg-rose-500 text-white py-3 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-rose-600 transition-all"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
            {applications.length === 0 && (
              <div className="col-span-full text-center py-12 text-slate-400 font-medium">
                No pending verification requests.
              </div>
            )}
          </div>

          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-10 mt-16 border-t pt-10">School Admin Claims</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {claims.map(claim => (
              <div key={claim.id} className="border border-slate-100 p-8 rounded-3xl shadow-sm bg-slate-50/50">
                <div className="mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[8px] font-black uppercase tracking-widest mb-2 inline-block">Pending Review</span>
                  <h4 className="font-black text-slate-900 text-lg leading-tight">{claim.institutionName}</h4>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-1">Claimer: {claim.userName} ({claim.userEmail})</p>
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Phone: {claim.phone}</p>
                </div>
                <div className="mb-6 bg-white border p-4 rounded-2xl">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Claim Justification:</p>
                  <p className="text-xs text-slate-700 font-medium whitespace-pre-wrap leading-relaxed">{claim.justification}</p>
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={async () => {
                      try {
                        // 1. Update claim status to approved
                        await updateDoc(doc(db, 'school_claims', claim.id), { 
                          status: 'approved',
                          decidedAt: new Date().toISOString()
                        });
                        
                        // 2. Assign adminId on the matching institution
                        await updateDoc(doc(db, 'institutions', claim.institutionId), {
                          adminId: claim.userId,
                          isVerified: true
                        });

                        // 3. Make sure user is tagged as institution admin
                        await updateDoc(doc(db, 'users', claim.userId), {
                          role: UserRole.INSTITUTION_ADMIN,
                          institutionId: claim.institutionId
                        });

                        setClaims(claims.filter(c => c.id !== claim.id));
                        alert(`Claim request for "${claim.institutionName}" approved successfully! ${claim.userName} is now the verified administrator.`);
                      } catch (err: any) {
                        console.error("Error approving school claim:", err);
                        alert(`Failed to approve: ${err.message}`);
                      }
                    }}
                    className="flex-1 bg-emerald-500 text-white py-3 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-emerald-600 transition-all shadow-md shadow-emerald-100"
                  >
                    Approve Claim
                  </button>
                  <button 
                    onClick={async () => {
                      const reason = prompt("Describe the reason for rejection:", "Authority could not be verified.");
                      if (reason === null) return;
                      try {
                        await updateDoc(doc(db, 'school_claims', claim.id), { 
                          status: 'rejected',
                          decisionReason: reason,
                          decidedAt: new Date().toISOString()
                        });
                        setClaims(claims.filter(c => c.id !== claim.id));
                        alert('Claim request rejected.');
                      } catch (err: any) {
                        console.error("Error rejecting claim:", err);
                        alert(`Failed to reject: ${err.message}`);
                      }
                    }}
                    className="flex-1 bg-rose-500 text-white py-3 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-rose-600 transition-all shadow-md shadow-rose-100"
                  >
                    Reject Claim
                  </button>
                </div>
              </div>
            ))}
            {claims.length === 0 && (
              <div className="col-span-full text-center py-12 text-slate-400 font-medium bg-slate-50/50 rounded-3xl border border-dashed">
                No pending administrative claims.
              </div>
            )}
          </div>
        </div>
      ) : activeTab === 'analytics' ? (
        <div className="space-y-12">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Platform Analytics</h3>
            <div className="flex items-center gap-4">
               <button className="bg-white border px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all">Download Report</button>
               <div className="flex items-center gap-2 bg-emerald-100 px-4 py-2 rounded-2xl">
                 <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                 <span className="text-[10px] font-black uppercase text-emerald-600 tracking-widest">Global Live</span>
               </div>
            </div>
          </div>
          <AnalyticsDashboard mode="global" institutions={institutions} />
        </div>
      ) : activeTab === 'security' ? (
        <SecurityDashboard />
      ) : activeTab === 'monetization' ? (
        <div className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">B2B SaaS (MRR)</p>
                <p className="text-3xl font-black text-slate-900">E{mrr.toLocaleString()}</p>
                <p className="text-[10px] font-bold text-emerald-500 mt-2">↑ 12% vs last month</p>
            </div>
            <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">B2C Subscriptions</p>
                <p className="text-3xl font-black text-blue-600">E{b2cSubscriptionRevenue.toLocaleString()}</p>
                <p className="text-[10px] font-bold text-slate-400 mt-2">AI + Tutor Premium Fees</p>
            </div>
            <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Ad Revenue</p>
                <p className="text-3xl font-black text-amber-600">E{adRevenue.toLocaleString()}</p>
                <p className="text-[10px] font-bold text-slate-400 mt-2">Banner & Sponsored</p>
            </div>
            <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm text-white bg-slate-900">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Total Yield</p>
                <p className="text-3xl font-black">E{(mrr + b2cSubscriptionRevenue + adRevenue).toLocaleString()}</p>
                <p className="text-[10px] font-bold text-emerald-400 mt-2">Direct Monetization Pivot</p>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Active Ad Campaigns</h3>
              <button className="bg-amber-500 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest">New Insertion Order</button>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Standard Bank Eswatini', type: 'Hero Banner', range: 'E2,500/mo', status: 'Active', impressions: '145k' },
                { name: 'MTN FinTech', type: 'Sidebar Widget', range: 'E1,200/mo', status: 'Active', impressions: '82k' },
                { name: 'UNESWA Admissions', type: 'Search Featured', range: 'E1,000/mo', status: 'Processing', impressions: '0' },
              ].map((ad, idx) => (
                <div key={idx} className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-xl shadow-sm">📢</div>
                    <div>
                      <h4 className="font-black text-slate-900">{ad.name}</h4>
                      <p className="text-[10px] text-slate-500 font-bold uppercase">{ad.type} • {ad.range}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black text-slate-900">{ad.impressions} Views</p>
                    <span className={`px-2 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${ad.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{ad.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : activeTab === 'infrastructure' ? (
        <div className="space-y-10">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Infrastructure & Services</h3>
            <div className="flex items-center gap-2 bg-emerald-100 px-4 py-2 rounded-2xl">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase text-emerald-600 tracking-widest">Systems Connected</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Email Service */}
            <div className={`p-8 rounded-[40px] border shadow-sm transition-all ${diagnostics?.email?.configured ? 'bg-white border-slate-100' : 'bg-rose-50 border-rose-100'}`}>
               <div className="flex justify-between items-start mb-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${diagnostics?.email?.configured ? 'bg-indigo-100 text-indigo-600' : 'bg-rose-100 text-rose-600'}`}>
                    📧
                  </div>
                  <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-lg ${diagnostics?.email?.configured ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                    {diagnostics?.email?.configured ? 'Active' : 'Offline / Mock'}
                  </span>
               </div>
               <h4 className="font-black text-slate-900 mb-1">Email Service (SMTP)</h4>
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-6">Nodemailer Gateway</p>
               
               <div className="space-y-3">
                  <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-slate-400">Host:</span>
                    <span className="text-slate-900">{diagnostics?.email?.host}</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-slate-400">Sender:</span>
                    <span className="text-slate-900">{diagnostics?.email?.from}</span>
                  </div>
               </div>

               {!diagnostics?.email?.configured && (
                 <div className="mt-8 p-4 bg-rose-100/50 rounded-2xl">
                    <p className="text-[9px] font-black text-rose-600 uppercase tracking-widest leading-relaxed">
                      Missing SMTP_HOST, SMTP_USER, or SMTP_PASS in .env
                    </p>
                 </div>
               )}
            </div>

            {/* SMS Gateway */}
            <div className={`p-8 rounded-[40px] border shadow-sm transition-all ${diagnostics?.sms?.mode !== 'Mock Mode' ? 'bg-white border-slate-100' : 'bg-amber-50 border-amber-100'}`}>
               <div className="flex justify-between items-start mb-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${diagnostics?.sms?.mode !== 'Mock Mode' ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'}`}>
                    📱
                  </div>
                  <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-lg ${diagnostics?.sms?.mode !== 'Mock Mode' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                    {diagnostics?.sms?.mode}
                  </span>
               </div>
               <h4 className="font-black text-slate-900 mb-1">SMS Gateway</h4>
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-6">Twilio / Local Aggregator</p>
               
               <div className="space-y-3">
                  <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-slate-400">Twilio Config:</span>
                    <span className={diagnostics?.sms?.twilio ? 'text-emerald-600' : 'text-slate-400'}>{diagnostics?.sms?.twilio ? '✓ Found' : '× Missing'}</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-slate-400">Local Aggregator:</span>
                    <span className={diagnostics?.sms?.localAggregator ? 'text-emerald-600' : 'text-slate-400'}>{diagnostics?.sms?.localAggregator ? '✓ Found' : '× Missing'}</span>
                  </div>
               </div>

               {diagnostics?.sms?.mode === 'Mock Mode' && (
                 <div className="mt-8 p-4 bg-amber-100/50 rounded-2xl">
                    <p className="text-[9px] font-black text-amber-600 uppercase tracking-widest leading-relaxed">
                      Logs only. Add TWILIO_* or LOCAL_SMS_* vars to activate.
                    </p>
                 </div>
               )}
            </div>

            {/* Payment Systems */}
            <div className="p-8 bg-white rounded-[40px] border border-slate-100 shadow-sm">
               <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-xl">
                    💰
                  </div>
                  <span className="text-[8px] font-black uppercase px-2 py-1 rounded-lg bg-emerald-100 text-emerald-600">
                    {diagnostics?.payments?.environment}
                  </span>
               </div>
               <h4 className="font-black text-slate-900 mb-1">Payment Gateways</h4>
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-6">MTN MoMo & eMali</p>
               
               <div className="space-y-3">
                  <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-slate-400">MTN MoMo API:</span>
                    <span className={diagnostics?.payments?.momo ? 'text-emerald-600' : 'text-amber-600'}>{diagnostics?.payments?.momo ? '✓ Online' : '⚠️ Using Defaults'}</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-slate-400">eMali (Eswatini Mobile):</span>
                    <span className="text-blue-600">{diagnostics?.payments?.emali}</span>
                  </div>
               </div>
            </div>
          </div>

          <div className="bg-slate-900 p-10 rounded-[48px] text-white shadow-2xl overflow-hidden relative">
             <div className="absolute top-0 right-0 p-12 opacity-5 text-8xl">⚙️</div>
             <h4 className="text-sm font-black uppercase tracking-widest mb-10">System Node Health</h4>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Node Version</p>
                   <p className="text-xl font-black">{diagnostics?.system?.nodeVersion}</p>
                </div>
                <div>
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">OS Platform</p>
                   <p className="text-xl font-black uppercase">{diagnostics?.system?.platform}</p>
                </div>
                <div>
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Process Uptime</p>
                   <p className="text-xl font-black">{(diagnostics?.system?.uptime / 3600).toFixed(1)} hrs</p>
                </div>
                <div>
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Memory Usage</p>
                   <p className="text-xl font-black">~245MB</p>
                </div>
             </div>
          </div>
        </div>
      ) : activeTab === 'users' ? (
        <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">User Management</h3>
            <button 
              onClick={() => setShowAddAdminModal(true)}
              className="bg-slate-900 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Add New Admin
            </button>
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
                {users.map((u, idx) => (
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

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Registration Certificate (PDF)</label>
                <input 
                  type="file" 
                  accept=".pdf,image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setCertificateFile(e.target.files[0]);
                    }
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-bold text-slate-900 focus:ring-4 focus:ring-blue-50 focus:border-blue-200 outline-none transition-all"
                />
                <p className="text-[10px] text-slate-500 mt-2 font-medium">Required for verification. Super Admins will review this document.</p>
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

      {showAddAdminModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[40px] max-w-lg w-full p-10 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Add New Administrator</h3>
              <button 
                onClick={() => setShowAddAdminModal(false)}
                className="w-10 h-10 bg-slate-100 hover:bg-rose-100 hover:text-rose-600 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Full Name</label>
                <input 
                  type="text" 
                  value={newAdmin.name}
                  onChange={(e) => setNewAdmin({...newAdmin, name: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-bold text-slate-900 focus:ring-4 focus:ring-blue-50 focus:border-blue-200 outline-none transition-all"
                  placeholder="e.g. John Dlamini"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Email Address</label>
                <input 
                  type="email" 
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({...newAdmin, email: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-bold text-slate-900 focus:ring-4 focus:ring-blue-50 focus:border-blue-200 outline-none transition-all"
                  placeholder="admin@school.sz"
                />
              </div>
              
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Role</label>
                <select 
                  value={newAdmin.role}
                  onChange={(e) => setNewAdmin({...newAdmin, role: e.target.value as any})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-bold text-slate-900 focus:ring-4 focus:ring-blue-50 focus:border-blue-200 outline-none transition-all"
                >
                  <option value="Institution Admin">Institution Admin</option>
                  <option value="Super Admin">Super Admin</option>
                  <option value="Content Editor">Content Editor</option>
                  <option value="Regional Moderator">Regional Moderator</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Institution (Optional)</label>
                <input 
                  type="text" 
                  value={newAdmin.inst}
                  onChange={(e) => setNewAdmin({...newAdmin, inst: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-bold text-slate-900 focus:ring-4 focus:ring-blue-50 focus:border-blue-200 outline-none transition-all"
                  placeholder="e.g. Waterford Kamhlaba"
                />
              </div>

              <button 
                onClick={handleAddAdmin}
                disabled={!newAdmin.name || !newAdmin.email}
                className="w-full bg-slate-900 text-white rounded-2xl py-5 font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-slate-200 hover:-translate-y-1 hover:shadow-2xl transition-all disabled:opacity-50"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminDashboard;
