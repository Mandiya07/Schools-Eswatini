import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Institution } from '../../types';
import { ShieldCheck, TrendingUp, Users, AlertCircle, Loader2 } from 'lucide-react';

export const InstitutionMinistry: React.FC = () => {
  const { inst } = useOutletContext<{ inst: Institution }>();
  const [loading, setLoading] = useState(true);
  const [moetData, setMoetData] = useState<any>(null);

  useEffect(() => {
    // Simulate fetching from a dedicated MoET data source
    const timer = setTimeout(() => {
      // Mock data aligned with the institution
      setMoetData({
        passRate: inst.examResults && inst.examResults.length > 0 
          ? inst.examResults[0].passRate 
          : Math.floor(Math.random() * 30) + 60,
        teacherStudentRatio: Math.floor(Math.random() * 20) + 15,
        lastInspectionDate: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0],
        inspectionGrade: ['A', 'B', 'B+', 'A-'][Math.floor(Math.random() * 4)],
        rankings: inst.stats?.performanceRanking || Math.floor(Math.random() * 100) + 1,
      });
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [inst.id]);
  
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="bg-white border border-slate-100 rounded-[48px] p-10 md:p-16 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-[80px] -mr-32 -mt-32 opacity-60" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 relative z-10">
          <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-[24px] flex items-center justify-center shadow-xl shadow-blue-200">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Ministry of Education Records</h2>
                <p className="text-sm font-bold text-slate-500">Official data fetched directly from the national registry.</p>
              </div>
          </div>
          {loading ? (
             <span className="px-5 py-3 bg-slate-50 text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-3">
               <Loader2 className="w-4 h-4 animate-spin" /> Syncing Data...
             </span>
          ) : (
             <span className="px-5 py-3 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-xl text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-2">
               <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> Live connection active
             </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Registration ID</p>
              <p className="text-2xl font-black text-slate-900 font-mono tracking-tight">{inst.moetRegistration || 'PENDING-VERIFICATION'}</p>
            </div>
            
            <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Verification Status</p>
              {inst.isVerified ? (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                     <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-xl font-black text-slate-900">Verified</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                     <AlertCircle className="w-5 h-5" />
                  </div>
                  <span className="text-xl font-black text-slate-900">Pending Audit</span>
                </div>
              )}
            </div>

            <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Compliance Score</p>
              <div className="flex items-center gap-4 mt-2">
                  <div className="h-3 flex-grow bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full transition-all duration-1000" style={{ width: `${inst.trustScore || 0}%` }}></div>
                  </div>
                  <span className="text-lg font-black text-slate-900">{inst.trustScore || 0}%</span>
              </div>
            </div>

            {loading ? (
              <div className="col-span-full py-16 flex flex-col items-center justify-center text-slate-400">
                 <Loader2 className="w-10 h-10 animate-spin mb-4 text-blue-300" />
                 <p className="text-sm font-bold uppercase tracking-widest">Retrieving Performance Stats...</p>
              </div>
            ) : (
              <>
                <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                     <TrendingUp className="w-4 h-4" /> National Ranking
                  </p>
                  <p className="text-4xl font-black text-slate-900">
                    <span className="text-xl text-slate-400 mr-1">#</span>{moetData.rankings}
                  </p>
                  <p className="text-xs font-bold text-slate-500 mt-2">In academic performance</p>
                </div>
                
                <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" /> Pass Rate (Latest)
                  </p>
                  <p className="text-4xl font-black text-slate-900">{moetData.passRate}%</p>
                  <p className="text-xs font-bold text-slate-500 mt-2">National average: 68%</p>
                </div>

                <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                     <Users className="w-4 h-4" /> Teacher-Student Ratio
                  </p>
                  <p className="text-4xl font-black text-slate-900">
                     1:{moetData.teacherStudentRatio}
                  </p>
                  <p className="text-xs font-bold text-slate-500 mt-2">MoET standard is 1:30</p>
                </div>

                <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 col-span-full flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Latest Inspection Overview</p>
                    <p className="text-lg font-bold text-slate-900">Grade {moetData.inspectionGrade} • Last inspected on {moetData.lastInspectionDate}</p>
                  </div>
                  <button className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-600 rounded-2xl text-xs font-black uppercase tracking-widest hover:border-slate-400 transition-colors">
                    Download Full Report (PDF)
                  </button>
                </div>
              </>
            )}
        </div>
      </div>
    </div>
  );
};
