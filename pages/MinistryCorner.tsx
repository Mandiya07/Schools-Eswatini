import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, FileText, Bell, AlertTriangle, TrendingUp, BarChart3, GraduationCap } from 'lucide-react';
import { ExamResult, SchoolPerformance, PolicyAnnouncement } from '../types';

const MinistryCorner: React.FC = () => {
  const announcements: PolicyAnnouncement[] = [
    { id: '1', title: "Revised Competency-Based Education (CBE) Framework", content: "The Ministry of Education and Training has finalized the rollout of the new CBE framework for Junior Secondary Schools, starting in January 2026.", category: 'curriculum', date: "2025-10-12", isUrgent: false },
    { id: '2', title: "National Digital Learning Initative Fund", content: "Schools can now apply for the SZL 50M digital learning grant to equip classrooms with smartboards and high-speed internet.", category: 'finance', date: "2025-09-28", isUrgent: false },
    { id: '3', title: "School Fees Standardization Act", content: "A cap on top-up fees for OVCs has been strictly enforced.", category: 'finance', date: "2025-08-15", isUrgent: false },
    { id: '4', title: "Emergency Health Directive: Measles Outbreak", content: "All schools must verify immunization records for forms 1 and 2 students urgently.", category: 'safety', date: "2025-07-02", isUrgent: true }
  ];

  const examResults: ExamResult[] = [
    { year: 2025, level: 'SGCSE', passRate: 88.5, merits: 450, credits: 1200 },
    { year: 2024, level: 'SGCSE', passRate: 86.2, merits: 410, credits: 1150 }
  ];

  const performanceStats: SchoolPerformance[] = [
    { year: 2025, nationalRanking: 5, regionalRanking: 1, valueAddedScore: 8.5, studentGrowth: 15 },
    { year: 2024, nationalRanking: 8, regionalRanking: 2, valueAddedScore: 7.9, studentGrowth: 12 }
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
            Central hub for policy, exam results, performance statistics, and announcements.
          </p>
        </div>

        <div className="space-y-16">
          {/* Announcements */}
          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
              <Bell className="text-amber-500" /> MoET Announcements & Policy Updates
            </h2>
            <div className="space-y-6">
              {announcements.map((ann, idx) => (
                <motion.div key={ann.id} className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
                  <div className="flex gap-6 items-start">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${ann.isUrgent ? 'bg-rose-100' : 'bg-slate-100'}`}>
                      {ann.isUrgent ? <AlertTriangle className="text-rose-600" /> : <FileText className="text-slate-600" />}
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-900 mb-1">{ann.title}</h3>
                      <p className="text-xs font-bold text-slate-400 mb-3">{ann.date} • {ann.category.toUpperCase()}</p>
                      <p className="text-slate-600 text-sm leading-relaxed">{ann.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Exam Results & Stats */}
          <div className="grid md:grid-cols-2 gap-8">
            <section>
              <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <GraduationCap className="text-blue-500" /> National Exam Results
              </h2>
              <div className="space-y-4">
                {examResults.map(er => (
                  <div key={er.year} className="bg-blue-600 text-white rounded-3xl p-6">
                    <div className="text-3xl font-black">{er.level} {er.year}</div>
                    <div className="text-lg font-bold opacity-80 mb-2">Pass Rate: {er.passRate}%</div>
                    <div className="flex gap-4 text-xs font-bold">
                      <span>Merits: {er.merits}</span>
                      <span>Credits: {er.credits}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <TrendingUp className="text-emerald-500" /> School Performance
              </h2>
              <div className="space-y-4">
                 {performanceStats.map(ps => (
                  <div key={ps.year} className="bg-white rounded-3xl p-6 border border-slate-100">
                    <div className="text-lg font-black mb-2">{ps.year} Performance</div>
                    <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-500">
                      <div>Rank: {ps.nationalRanking} (Nat)</div>
                      <div>Growth: {ps.studentGrowth}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinistryCorner;
