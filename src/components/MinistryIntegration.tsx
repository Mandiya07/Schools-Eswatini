
import React from 'react';
import { ShieldCheck, Calendar, Award, TrendingUp, FileText, Info, AlertCircle } from 'lucide-react';
import { Institution, ExamResult, SchoolPerformance } from '../../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';

interface MinistryIntegrationProps {
  institution: Institution;
}

const MinistryIntegration: React.FC<MinistryIntegrationProps> = ({ institution }) => {
  const { accreditationStatus, lastInspectionDate, examResults, performanceHistory, moetRegistration } = institution;

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'accredited': return 'bg-emerald-500 text-white';
      case 'provisional': return 'bg-amber-500 text-white';
      case 'expired': return 'bg-rose-500 text-white';
      default: return 'bg-slate-400 text-white';
    }
  };

  return (
    <div className="space-y-12">
      {/* Official Accreditation Status */}
      <div className="bg-white rounded-3xl p-8 border-2 border-indigo-50 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <ShieldCheck className="w-40 h-40" />
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">MoET Official Verification</h3>
                <p className="text-sm text-slate-500 font-medium">Ministry of Education and Training, Eswatini</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 ${getStatusColor(accreditationStatus)}`}>
                <Award className="w-4 h-4" />
                {accreditationStatus?.replace('_', ' ') || 'Not Verified'}
              </div>
              <div className="px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Last Inspected: {lastInspectionDate || 'N/A'}
              </div>
              <div className="px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Reg No: {moetRegistration}
              </div>
            </div>
          </div>
          
          <div className="bg-indigo-50/50 rounded-2xl p-6 border border-indigo-100/50 max-w-sm">
            <div className="flex gap-4">
              <Info className="w-5 h-5 text-indigo-600 shrink-0" />
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                This institution is officially registered and monitored by the Ministry of Education and Training. 
                All data presented here is verified against the National Education Database.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* National Exam Results */}
      {examResults && examResults.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
                National Exam Performance
              </h3>
              <select className="bg-slate-50 border-none text-xs font-bold rounded-xl px-4 py-2 focus:ring-2 ring-indigo-500/20 outline-none">
                <option>2023 Results</option>
                <option>2022 Results</option>
              </select>
            </div>
            
            <div className="space-y-6">
              {examResults.map((result, idx) => (
                <div key={idx} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-black text-slate-700 uppercase tracking-wider">{result.level} Level</span>
                    <span className="text-sm font-black text-indigo-600">{result.passRate}% Pass Rate</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-600 rounded-full transition-all duration-1000 group-hover:bg-indigo-500" 
                      style={{ width: `${result.passRate}%` }} 
                    />
                  </div>
                  <div className="flex gap-6 mt-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-indigo-400" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Merits: {result.merits}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-indigo-200" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Credits: {result.credits}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-3 mb-8">
              <Award className="w-5 h-5 text-indigo-600" />
              National Ranking History
            </h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <LineChart data={performanceHistory}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                  <YAxis reversed axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ fontSize: '12px', fontWeight: 700 }}
                  />
                  <Line type="monotone" dataKey="nationalRanking" stroke="#4f46e5" strokeWidth={4} dot={{ r: 6, fill: '#4f46e5', strokeWidth: 2, stroke: '#fff' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center mt-4">
              * Lower ranking indicates higher performance
            </p>
          </div>
        </div>
      )}

      {/* Policy Compliance & Alerts */}
      <div className="bg-rose-50/50 rounded-3xl p-8 border border-rose-100/50">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center text-rose-600">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-black text-rose-900 tracking-tight uppercase text-sm">Policy Compliance Notice</h4>
            <p className="text-xs text-rose-600 font-medium">Current status of MoET policy adherence</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Safety Standards', status: 'Compliant' },
            { label: 'Curriculum Standards', status: 'Compliant' },
            { label: 'Financial Reporting', status: 'Compliant' }
          ].map((item, idx) => (
            <div key={idx} className="bg-white/80 rounded-2xl p-4 flex items-center justify-between border border-rose-100/30">
              <span className="text-xs font-bold text-slate-600">{item.label}</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MinistryIntegration;
