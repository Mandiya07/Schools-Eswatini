
import React from 'react';
import { X, Check, Minus, Star, TrendingUp, Users, MapPin, Award } from 'lucide-react';
import { Institution } from '../../types';

interface SchoolComparisonProps {
  schools: Institution[];
  onRemove: (id: string) => void;
  onClose: () => void;
}

const SchoolComparison: React.FC<SchoolComparisonProps> = ({ schools, onRemove, onClose }) => {
  if (schools.length === 0) return null;

  const features = [
    { label: 'Region', key: 'region', icon: MapPin },
    { label: 'Type', key: 'type', icon: Award },
    { label: 'Gender', key: 'metadata.gender', icon: Users },
    { label: 'Boarding', key: 'metadata.isBoarding', icon: Check },
    { label: 'Student Count', key: 'metadata.studentCount', icon: Users },
    { label: 'Trust Score', key: 'trustScore', icon: Star },
    { label: 'Accreditation', key: 'accreditationStatus', icon: Award },
    { label: 'Pass Rate', key: 'academics.performance.passRate', icon: TrendingUp },
  ];

  const getValue = (school: Institution, path: string) => {
    const parts = path.split('.');
    let current: any = school;
    for (const part of parts) {
      if (current[part] === undefined) return 'N/A';
      current = current[part];
    }
    if (typeof current === 'boolean') return current ? <Check className="w-4 h-4 text-emerald-500" /> : <Minus className="w-4 h-4 text-slate-300" />;
    if (Array.isArray(current)) return current.join(', ');
    return current;
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-slate-900/40 backdrop-blur-xl flex items-center justify-center p-6 md:p-12 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-7xl h-full max-h-[90vh] rounded-[40px] shadow-2xl flex flex-col overflow-hidden border border-white/20">
        <div className="p-8 md:p-12 flex items-center justify-between border-b border-slate-100 shrink-0">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Compare Institutions</h2>
            <p className="text-slate-500 font-medium mt-1">Side-by-side analysis of your selected schools</p>
          </div>
          <button 
            onClick={onClose}
            className="w-14 h-14 bg-slate-100 text-slate-600 rounded-2xl flex items-center justify-center hover:bg-slate-200 transition-all active:scale-95"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-8 md:p-12 scrollbar-hide">
          <div className="min-w-[800px]">
            <div className="grid grid-cols-[250px_1fr] gap-8">
              {/* Feature Labels */}
              <div className="space-y-12 pt-48">
                {features.map((f, idx) => (
                  <div key={idx} className="h-16 flex items-center gap-4 group">
                    <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 transition-all group-hover:scale-110">
                      <f.icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{f.label}</span>
                  </div>
                ))}
              </div>

              {/* School Columns */}
              <div className="grid grid-cols-3 gap-8">
                {schools.map((school) => (
                  <div key={school.id} className="space-y-12 relative group">
                    {/* School Header */}
                    <div className="h-48 flex flex-col items-center text-center space-y-4">
                      <button 
                        onClick={() => onRemove(school.id)}
                        className="absolute -top-4 -right-4 w-10 h-10 bg-rose-500 text-white rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-lg shadow-rose-200 z-10"
                      >
                        <X className="w-5 h-5" />
                      </button>
                      <div className="w-24 h-24 bg-white rounded-3xl shadow-xl p-4 border border-slate-100">
                        <img src={school.logo || undefined} alt={school.name} className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <h3 className="font-black text-slate-900 text-lg leading-tight line-clamp-2">{school.name}</h3>
                        <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg mt-2 inline-block">
                          {school.region}
                        </span>
                      </div>
                    </div>

                    {/* Feature Values */}
                    {features.map((f, idx) => (
                      <div key={idx} className="h-16 bg-slate-50/50 rounded-2xl flex items-center justify-center p-4 border border-slate-100/50 transition-all hover:bg-white hover:shadow-lg hover:shadow-slate-100 hover:border-indigo-100">
                        <div className="text-sm font-bold text-slate-700 text-center">
                          {getValue(school, f.key)}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
                
                {/* Empty Placeholder */}
                {schools.length < 3 && (
                  <div className="border-2 border-dashed border-slate-200 rounded-[40px] flex flex-col items-center justify-center space-y-4 opacity-50">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                      <Users className="w-8 h-8" />
                    </div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center px-8">
                      Add another school to compare
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12 border-t border-slate-100 bg-slate-50/50 shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
              <Star className="w-5 h-5" />
            </div>
            <p className="text-xs text-slate-500 font-medium max-w-md">
              Data is sourced from official MoET records and verified institution profiles. 
              Always visit the institution for final verification.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="bg-indigo-600 text-white px-12 py-4 rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 active:scale-95"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};

export default SchoolComparison;
