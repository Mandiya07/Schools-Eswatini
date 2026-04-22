import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { Target, CheckCircle2, BookOpen, Users, Lightbulb, Heart, ShieldCheck } from 'lucide-react';

interface MissionSectionProps {
  mission: {
    statement: string;
    description: string;
    pillars?: {
      title: string;
      description: string;
      icon?: string;
    }[];
    objectives?: string[];
  };
  primaryColor: string;
}

const MissionSection: React.FC<MissionSectionProps> = ({ mission, primaryColor }) => {
  // Safe icon mapping
  const getIcon = (iconName?: string) => {
    if (!iconName) return Target;
    const Icon = (LucideIcons as any)[iconName];
    return Icon || Target;
  };

  return (
    <div className="space-y-24">
      {/* Main Statement */}
      <div className="relative p-16 bg-blue-50/50 rounded-[64px] border border-blue-100/50 space-y-10 overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 opacity-5 text-9xl group-hover:scale-110 transition-transform duration-700">🎯</div>
        <div className="space-y-6 relative z-10">
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-blue-100 text-blue-700 rounded-full">
            <Target className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Institutional Mission</span>
          </div>
          <p className="text-4xl md:text-5xl text-blue-900 font-black leading-[1.1] tracking-tight max-w-4xl">
            {mission.statement}
          </p>
          <p className="text-blue-700/80 text-xl md:text-2xl font-medium leading-relaxed max-w-3xl">
            {mission.description}
          </p>
        </div>
      </div>

      {/* Mission Pillars */}
      {mission.pillars && mission.pillars.length > 0 && (
        <div className="space-y-12">
          <div className="space-y-4 text-center max-w-2xl mx-auto">
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Mission Pillars</h3>
            <h4 className="text-4xl font-black tracking-tighter text-slate-900">The core foundations of our daily work</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mission.pillars.map((pillar, idx) => {
              const IconComponent = getIcon(pillar.icon);
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-12 bg-white border border-slate-100 rounded-[48px] shadow-sm hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 group"
                >
                  <div 
                    className="w-20 h-20 rounded-3xl flex items-center justify-center mb-10 group-hover:rotate-6 transition-transform duration-500"
                    style={{ backgroundColor: `${primaryColor}10`, color: primaryColor }}
                  >
                    <IconComponent className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-black text-slate-900 mb-5 uppercase tracking-tight leading-none">{pillar.title}</h4>
                  <p className="text-slate-500 text-lg font-medium leading-relaxed">
                    {pillar.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Measurable Objectives */}
      {mission.objectives && mission.objectives.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="p-20 bg-slate-900 rounded-[80px] text-white space-y-16 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full -ml-48 -mb-48" />
          
          <div className="space-y-6 relative z-10">
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-full">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em]">Measurable Objectives</span>
            </div>
            <h4 className="text-5xl font-black tracking-tighter leading-none">How we track our progress</h4>
            <p className="text-slate-400 text-xl font-medium max-w-2xl">
              We hold ourselves accountable to these key performance indicators to ensure we are living our mission every day.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10 relative z-10">
            {mission.objectives.map((obj, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-start gap-8 group"
              >
                <div className="mt-1.5 p-1.5 bg-blue-500/20 rounded-xl group-hover:bg-blue-500/40 transition-all duration-300 group-hover:scale-110">
                  <CheckCircle2 className="w-6 h-6 text-blue-400" />
                </div>
                <p className="text-xl font-bold text-slate-300 leading-snug group-hover:text-white transition-colors">
                  {obj}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MissionSection;
