
import React from 'react';
import { Institution } from '../types';

interface ComparePageProps {
  institutions: Institution[];
  compareList: string[];
  onRemove: (id: string) => void;
}

const ComparePage: React.FC<ComparePageProps> = ({ institutions, compareList, onRemove }) => {
  const selected = institutions.filter(i => compareList.includes(i.id));

  if (selected.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-slate-50">
        <div className="text-center space-y-6">
          <div className="text-6xl">⚖️</div>
          <h1 className="text-4xl font-black text-slate-900">Nothing to compare</h1>
          <p className="text-slate-500 max-w-sm mx-auto">Go back to the directory and select at least two schools to see them side-by-side.</p>
          <a href="#/browse" className="inline-block bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs">Browse Schools</a>
        </div>
      </div>
    );
  }

  const rows = [
    { label: 'Region', key: 'region' },
    { label: 'Pass Rate', key: 'passRate', path: 'sections.academics.performance.passRate' },
    { label: 'Est. Year', key: 'established', path: 'metadata.establishedYear' },
    { label: 'Student Mix', key: 'gender', path: 'metadata.gender' },
    { label: 'Boarding', key: 'boarding', path: 'metadata.isBoarding', formatter: (val: any) => val ? 'Yes' : 'No' },
    { label: 'Annual Tuition', key: 'fees', path: 'sections.admissions.tuitionFees.perYear' },
    { label: 'Capacity', key: 'students', path: 'metadata.studentCount' },
    { label: 'MoET Registered', key: 'registered', path: 'moetRegistration' },
  ];

  const getValue = (obj: any, path: string) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h1 className="text-6xl font-black text-slate-900 tracking-tighter mb-4">Comparison Matrix</h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Data-driven institutional analysis</p>
        </div>

        <div className="bg-white rounded-[56px] border border-slate-100 shadow-3xl overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-12 text-left bg-slate-50/50 w-72">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Attribute</span>
                </th>
                {selected.map(inst => (
                  <th key={inst.id} className="p-12 text-center relative group min-w-[300px]">
                    <button 
                      onClick={() => onRemove(inst.id)}
                      className="absolute top-4 right-4 text-slate-300 hover:text-rose-500 font-black text-xs transition-colors"
                    >
                      Remove ✕
                    </button>
                    <div className="w-20 h-20 bg-slate-50 rounded-3xl mx-auto mb-6 p-4 border flex items-center justify-center">
                      <img src={inst.logo || undefined} className="w-full h-full object-contain" />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">{inst.name}</h3>
                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-2">{inst.region}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={row.key} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/20'}>
                  <td className="p-10 border-r bg-slate-50/50">
                    <span className="text-sm font-black text-slate-900 uppercase tracking-widest">{row.label}</span>
                  </td>
                  {selected.map(inst => {
                    const val = row.path ? getValue(inst, row.path) : (inst as any)[row.key];
                    return (
                      <td key={inst.id} className="p-10 text-center border-r last:border-r-0">
                        <span className="text-lg font-bold text-slate-600">
                          {row.formatter ? row.formatter(val) : val}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr className="bg-slate-900 text-white">
                <td className="p-12">
                   <span className="text-sm font-black uppercase tracking-widest">Decision</span>
                </td>
                {selected.map(inst => (
                  <td key={inst.id} className="p-12 text-center">
                    <a href={`#/school/${inst.slug}`} className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-500 hover:text-white transition-all shadow-xl">
                      View Profile
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComparePage;
