import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, FileText, Bell, AlertTriangle } from 'lucide-react';

const MinistryCorner: React.FC = () => {
  const policies = [
    {
      id: 1,
      title: "Revised Competency-Based Education (CBE) Framework",
      date: "October 12, 2025",
      type: "Policy Update",
      icon: <BookOpen className="w-5 h-5 text-blue-600" />,
      content: "The Ministry of Education and Training has finalized the rollout of the new CBE framework for Junior Secondary Schools, starting in January 2026. All schools must ensure their curriculum aligns with the updated continuous assessment guidelines.",
      status: "Mandatory"
    },
    {
      id: 2,
      title: "National Digital Learning Initative Fund",
      date: "September 28, 2025",
      type: "Announcement",
      icon: <Bell className="w-5 h-5 text-amber-600" />,
      content: "Schools can now apply for the SZL 50M digital learning grant to equip classrooms with smartboards and high-speed internet. Applications close on November 30.",
      status: "Active"
    },
    {
      id: 3,
      title: "School Fees Standardization Act",
      date: "August 15, 2025",
      type: "Regulation",
      icon: <FileText className="w-5 h-5 text-emerald-600" />,
      content: "A cap on top-up fees for OVCs (Orphaned and Vulnerable Children) has been strictly enforced. Schools found charging exorbitant non-tuition fees will face immediate disciplinary committees.",
      status: "Enforced"
    },
    {
      id: 4,
      title: "Emergency Health Directive: Measles Outbreak",
      date: "July 02, 2025",
      type: "Alert",
      icon: <AlertTriangle className="w-5 h-5 text-rose-600" />,
      content: "Following the recent regional outbreak, all schools must verify immunization records for forms 1 and 2 students within the next 14 days. Regional health officers will conduct spot visits.",
      status: "Urgent"
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-blue-600 font-bold uppercase tracking-widest text-[10px] mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            Official MoET Communications
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-4">
            Ministry Corner
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl">
            Stay up to date with the latest policy changes, official announcements, and urgent directives from the Ministry of Education and Training.
          </p>
        </div>

        <div className="space-y-6">
          {policies.map((policy, idx) => (
            <motion.div 
              key={policy.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-shadow group"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {policy.icon}
                </div>
                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-black text-slate-900 tracking-tight">{policy.title}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs font-bold text-slate-400">{policy.date}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{policy.type}</span>
                      </div>
                    </div>
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex-shrink-0 text-center ${
                      policy.status === 'Mandatory' ? 'bg-blue-100 text-blue-700' :
                      policy.status === 'Active' ? 'bg-amber-100 text-amber-700' :
                      policy.status === 'Enforced' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-rose-100 text-rose-700'
                    }`}>
                      {policy.status}
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    {policy.content}
                  </p>
                  <div className="mt-6">
                    <button className="text-blue-600 font-bold text-xs uppercase tracking-widest hover:text-blue-800 transition-colors flex items-center gap-2">
                       Read Full Directive &rarr;
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MinistryCorner;
