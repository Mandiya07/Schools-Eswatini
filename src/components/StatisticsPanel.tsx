
import React from 'react';
import { motion } from 'motion/react';
import { Users, UserCheck, GraduationCap, Calendar, TrendingUp } from 'lucide-react';

interface StatisticsPanelProps {
  statistics: {
    totalStudents: number;
    totalStaff: number;
    studentTeacherRatio: string;
    yearsOfOperation: number;
    graduationRate: string;
  };
  primaryColor: string;
}

const StatisticsPanel: React.FC<StatisticsPanelProps> = ({ statistics, primaryColor }) => {
  const stats = [
    { label: 'Students', value: statistics.totalStudents, icon: Users, color: 'blue' },
    { label: 'Staff', value: statistics.totalStaff, icon: UserCheck, color: 'indigo' },
    { label: 'Graduation Rate', value: statistics.graduationRate, icon: GraduationCap, color: 'emerald' },
    { label: 'Years Active', value: statistics.yearsOfOperation, icon: Calendar, color: 'amber' },
    { label: 'S/T Ratio', value: statistics.studentTeacherRatio, icon: TrendingUp, color: 'rose' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
      {stats.map((stat, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1 }}
          className="p-8 bg-white border border-slate-100 rounded-[40px] shadow-sm hover:shadow-xl transition-all text-center group"
        >
          <div className={`w-14 h-14 mx-auto rounded-2xl bg-${stat.color}-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
            <stat.icon className={`w-7 h-7 text-${stat.color}-600`} />
          </div>
          <p className="text-3xl font-black text-slate-900 tracking-tighter mb-1">{stat.value}</p>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default StatisticsPanel;
