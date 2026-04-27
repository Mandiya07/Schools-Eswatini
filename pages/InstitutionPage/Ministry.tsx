import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Institution } from '../../types';

export const InstitutionMinistry: React.FC = () => {
  const { inst } = useOutletContext<{ inst: Institution }>();
  
  return (
    <div className="space-y-32">
      <div className="bg-white border border-slate-100 rounded-[48px] p-10 md:p-16 shadow-sm">
        <div className="flex items-center gap-4 mb-10">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center text-3xl shadow-sm">🏛</div>
            <div>
              <h2 className="text-3xl font-black tracking-tight mb-1">Ministry Diagnostics</h2>
              <p className="text-xs uppercase font-black tracking-widest text-slate-400">Official Record & Standing</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-slate-50 rounded-[32px]">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Registration ID</p>
              <p className="text-xl font-black text-slate-900 font-mono">{inst.moetRegistration || 'PENDING-VERIFICATION'}</p>
            </div>
            <div className="p-8 bg-slate-50 rounded-[32px]">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">National Standing</p>
                <p className="text-xl font-black text-slate-900">
                  {inst.stats?.performanceRanking ? `Ranked #${inst.stats.performanceRanking} Nationally` : 'Unranked'}
                </p>
            </div>
            <div className="p-8 bg-slate-50 rounded-[32px]">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Verification Status</p>
              {inst.isVerified ? (
                <span className="px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-xl text-sm font-black uppercase tracking-widest inline-flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> Verified
                </span>
              ) : (
                <span className="px-4 py-1.5 bg-amber-100 text-amber-700 rounded-xl text-sm font-black uppercase tracking-widest inline-flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-500 rounded-full" /> Pending Audit
                </span>
              )}
            </div>
            <div className="p-8 bg-slate-50 rounded-[32px]">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Compliance Score</p>
              <div className="flex items-center gap-4">
                  <div className="h-4 flex-grow bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${inst.trustScore || 0}%` }}></div>
                  </div>
                  <span className="text-sm font-black text-slate-900">{inst.trustScore || 0}%</span>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};
