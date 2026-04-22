
import React from 'react';
import { motion } from 'motion/react';
import { Heart, HandHelping, Users2, Sparkles } from 'lucide-react';

interface CommunityImpactProps {
  community: {
    outreach: string;
    partnerships: string;
    socialResponsibility: string;
  };
  primaryColor: string;
}

const CommunityImpact: React.FC<CommunityImpactProps> = ({ community, primaryColor }) => {
  const items = [
    { title: 'Outreach Programs', content: community.outreach, icon: HandHelping, color: 'rose' },
    { title: 'Partnerships', content: community.partnerships, icon: Users2, color: 'blue' },
    { title: 'Social Responsibility', content: community.socialResponsibility, icon: Heart, color: 'emerald' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1 }}
          className="p-12 bg-white border border-slate-100 rounded-[64px] shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden"
        >
          <div className={`absolute top-0 right-0 p-12 opacity-[0.03] text-9xl group-hover:opacity-[0.06] transition-opacity`}>
            <item.icon className="w-32 h-32" />
          </div>
          
          <div className={`w-16 h-16 rounded-3xl bg-${item.color}-50 flex items-center justify-center mb-10 group-hover:bg-${item.color}-600 transition-colors`}>
            <item.icon className={`w-8 h-8 text-${item.color}-600 group-hover:text-white transition-colors`} />
          </div>
          
          <h4 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">{item.title}</h4>
          <p className="text-slate-500 font-medium leading-relaxed">
            {item.content}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default CommunityImpact;
