
import React from 'react';
import { motion } from 'motion/react';
import { Shield, Award, CheckCircle2, Globe } from 'lucide-react';

interface AccreditationSectionProps {
  accreditation: {
    registeredWith: string;
    registrationNumber: string;
    examinationBody: string;
    affiliations: string[];
    awards: string[];
  };
  primaryColor: string;
}

const AccreditationSection: React.FC<AccreditationSectionProps> = ({ accreditation, primaryColor }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="p-10 bg-white border border-slate-100 rounded-[48px] shadow-sm space-y-8"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
            <Shield className="w-6 h-6 text-blue-600" />
          </div>
          <h4 className="text-xl font-black text-slate-900 tracking-tight">Government Recognition</h4>
        </div>
        
        <div className="space-y-6">
          <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Ministry Registration</p>
            <p className="text-lg font-bold text-slate-900">{accreditation.registeredWith}</p>
            <p className="text-sm font-medium text-blue-600 mt-1">Reg No: {accreditation.registrationNumber}</p>
          </div>
          
          <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Examination Body</p>
            <p className="text-lg font-bold text-slate-900">{accreditation.examinationBody}</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="p-10 bg-slate-900 text-white rounded-[48px] shadow-2xl space-y-8 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-10 opacity-10">
          <Award className="w-32 h-32" />
        </div>
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
            <Globe className="w-6 h-6 text-blue-400" />
          </div>
          <h4 className="text-xl font-black tracking-tight">Affiliations & Awards</h4>
        </div>

        <div className="space-y-6 relative z-10">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Global Affiliations</p>
            <div className="flex flex-wrap gap-3">
              {accreditation.affiliations.map((aff, idx) => (
                <span key={idx} className="px-4 py-2 bg-white/10 rounded-xl text-xs font-bold border border-white/10">{aff}</span>
              ))}
            </div>
          </div>
          
          <div>
            <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4">Quality Certifications</p>
            <div className="space-y-3">
              {accreditation.awards.map((award, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-medium text-slate-200">{award}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AccreditationSection;
