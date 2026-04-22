import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { Quote, Sparkles, CheckCircle2 } from 'lucide-react';
import { CoreValue } from '../../types';

interface CoreValuesSectionProps {
  values: CoreValue[];
  primaryColor: string;
}

const CoreValuesSection: React.FC<CoreValuesSectionProps> = ({ values, primaryColor }) => {
  const getIcon = (iconName?: string) => {
    if (!iconName) return Sparkles;
    const Icon = (LucideIcons as any)[iconName];
    return Icon || Sparkles;
  };

  return (
    <div className="space-y-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {values.map((val, idx) => {
          const IconComponent = getIcon(val.icon);
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative bg-white border border-slate-100 rounded-[48px] p-12 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              {/* Background Accent */}
              <div 
                className="absolute top-0 right-0 w-64 h-64 blur-[100px] opacity-0 group-hover:opacity-10 transition-opacity duration-700 -mr-32 -mt-32"
                style={{ backgroundColor: primaryColor }}
              />

              <div className="relative z-10 space-y-8">
                <div className="flex items-center gap-6">
                  <div 
                    className="w-20 h-20 rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-lg shadow-black/5"
                    style={{ backgroundColor: `${primaryColor}10`, color: primaryColor }}
                  >
                    <IconComponent className="w-10 h-10" />
                  </div>
                  <h4 className="text-3xl font-black text-slate-900 tracking-tight uppercase">{val.name}</h4>
                </div>

                <p className="text-xl text-slate-500 font-medium leading-relaxed">
                  {val.description}
                </p>

                {val.example && (
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-3">
                    <div className="flex items-center gap-2 text-slate-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">In Action</span>
                    </div>
                    <p className="text-slate-600 font-bold italic leading-snug">
                      "{val.example}"
                    </p>
                  </div>
                )}

                {val.quote && (
                  <div className="pt-8 border-t border-slate-100 space-y-4">
                    <Quote className="w-8 h-8 opacity-20" style={{ color: primaryColor }} />
                    <p className="text-lg font-black text-slate-900 leading-tight">
                      {val.quote.text}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-slate-300" />
                      <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                        {val.quote.author}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Summary Banner */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="p-16 bg-slate-900 rounded-[64px] text-white flex flex-col md:flex-row items-center gap-12 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
        </div>
        
        <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-xl shrink-0">
          <Sparkles className="w-12 h-12 text-blue-400" />
        </div>
        
        <div className="space-y-4 text-center md:text-left">
          <h4 className="text-3xl font-black tracking-tight">Our character defines our future</h4>
          <p className="text-slate-400 text-lg font-medium max-w-2xl">
            These values are not just words on a wall; they are the living heartbeat of our campus, guiding every decision, interaction, and achievement.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default CoreValuesSection;
