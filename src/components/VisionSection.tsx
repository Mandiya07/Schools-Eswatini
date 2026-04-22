import React from 'react';
import { motion } from 'framer-motion';
import { Target, Lightbulb, Shield, TrendingUp, Zap } from 'lucide-react';

interface VisionSectionProps {
  vision: {
    headline: string;
    supportingParagraph: string;
    nationalAlignment?: string;
    keywords?: string[];
    visualRepresentation?: string;
  };
  primaryColor: string;
}

const VisionSection: React.FC<VisionSectionProps> = ({ vision, primaryColor }) => {
  return (
    <div className="space-y-12">
      <div className="relative overflow-hidden rounded-[40px] bg-slate-900 text-white min-h-[400px] flex items-center">
        {vision.visualRepresentation && (
          <div className="absolute inset-0 z-0">
            <img src={vision.visualRepresentation || undefined} 
              alt="Vision" 
              className="w-full h-full object-cover opacity-40"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
          </div>
        )}
        
        <div className="relative z-10 p-12 md:p-20 max-w-3xl space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
          >
            <Target className="w-4 h-4 text-white" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Our Vision</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.95]"
          >
            {vision.headline}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-300 font-medium leading-relaxed max-w-2xl"
          >
            {vision.supportingParagraph}
          </motion.p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {vision.keywords && vision.keywords.length > 0 && (
          <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {vision.keywords.map((keyword, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-all group text-center"
              >
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  {idx % 4 === 0 && <Lightbulb className="w-6 h-6 text-amber-500" />}
                  {idx % 4 === 1 && <Zap className="w-6 h-6 text-blue-500" />}
                  {idx % 4 === 2 && <Shield className="w-6 h-6 text-emerald-500" />}
                  {idx % 4 === 3 && <TrendingUp className="w-6 h-6 text-indigo-500" />}
                </div>
                <span className="text-sm font-black text-slate-900 uppercase tracking-widest">{keyword}</span>
              </motion.div>
            ))}
          </div>
        )}

        {vision.nationalAlignment && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 bg-blue-50 rounded-[40px] border border-blue-100 space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-xs font-black text-blue-900 uppercase tracking-widest">National Alignment</h4>
            </div>
            <p className="text-sm text-blue-800 font-bold leading-relaxed italic">
              "{vision.nationalAlignment}"
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default VisionSection;
