
import React from 'react';
import { motion } from 'motion/react';
import { Building2, Book, FlaskConical, Trophy, Wifi, Coffee } from 'lucide-react';

interface CampusOverviewProps {
  facilities: {
    overview: string;
    list: string[];
  };
  primaryColor: string;
}

const CampusOverview: React.FC<CampusOverviewProps> = ({ facilities, primaryColor }) => {
  const getIcon = (name: string) => {
    const n = (name || '').toLowerCase();
    if (n.includes('library')) return Book;
    if (n.includes('lab')) return FlaskConical;
    if (n.includes('pool') || n.includes('sport') || n.includes('gym')) return Trophy;
    if (n.includes('wifi') || n.includes('ict') || n.includes('tech')) return Wifi;
    if (n.includes('cafe') || n.includes('dining') || n.includes('hostel')) return Coffee;
    return Building2;
  };

  return (
    <div className="space-y-12">
      <div className="p-12 bg-slate-50 rounded-[56px] border border-slate-100">
        <p className="text-xl font-medium text-slate-600 leading-relaxed italic">
          "{facilities.overview}"
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {facilities.list.map((facility, idx) => {
          const Icon = getIcon(facility);
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="flex items-center gap-6 p-6 bg-white border border-slate-100 rounded-3xl hover:border-blue-500 transition-colors group"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                <Icon className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" />
              </div>
              <span className="text-sm font-black text-slate-900 uppercase tracking-tight">{facility}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CampusOverview;
