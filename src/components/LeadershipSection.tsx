import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Award, 
  BookOpen, 
  Clock, 
  Video, 
  FileText, 
  Quote, 
  CheckCircle2, 
  ChevronRight,
  Shield
} from 'lucide-react';
import { LeadershipMember } from '../../types';

interface LeadershipSectionProps {
  leadership: {
    principal: LeadershipMember;
    seniorTeam: LeadershipMember[];
    boardMembers?: LeadershipMember[];
    messageFromPrincipal?: {
      title: string;
      content: string;
      visionForYear?: string;
      commitmentToStudents?: string;
    };
  };
  primaryColor: string;
}

const LeadershipSection: React.FC<LeadershipSectionProps> = ({ leadership, primaryColor }) => {
  const { principal, seniorTeam, boardMembers, messageFromPrincipal } = leadership;

  return (
    <div className="space-y-32">
      {/* Principal's Featured Profile */}
      <div className="relative">
        <div className="absolute inset-0 bg-slate-50 rounded-[80px] -z-10" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 p-12 md:p-20 items-center">
          {/* Photo & Quick Info */}
          <div className="lg:col-span-5 space-y-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-[4/5] rounded-[64px] overflow-hidden shadow-2xl shadow-black/10"
            >
              <img src={principal.photo || `https://picsum.photos/seed/${principal.name || undefined}/800/1000`} 
                alt={principal.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 right-10 text-white">
                <h3 className="text-3xl font-black tracking-tight">{principal.name}</h3>
                <p className="text-white/80 font-bold uppercase tracking-widest text-xs mt-2">{principal.title}</p>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-3 mb-2 text-slate-400">
                  <Clock className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Experience</span>
                </div>
                <p className="text-lg font-black text-slate-900">{principal.experience || '20+ Years'}</p>
              </div>
              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-3 mb-2 text-slate-400">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Qualifications</span>
                </div>
                <p className="text-sm font-bold text-slate-900 line-clamp-2">{principal.qualifications || 'M.Ed, PhD'}</p>
              </div>
            </div>
          </div>

          {/* Detailed Info */}
          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-blue-100 text-blue-700 rounded-full">
                <Shield className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Executive Leadership</span>
              </div>
              <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">
                Leading with Vision & Purpose
              </h2>
              <p className="text-xl text-slate-500 font-medium leading-relaxed">
                {principal.description}
              </p>
            </div>

            {principal.philosophy && (
              <div className="p-10 bg-white border border-slate-100 rounded-[48px] shadow-sm relative">
                <Quote className="absolute top-8 right-8 w-12 h-12 text-slate-100" />
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Leadership Philosophy</h4>
                <p className="text-2xl font-black text-slate-900 leading-tight italic">
                  "{principal.philosophy}"
                </p>
              </div>
            )}

            {principal.achievements && principal.achievements.length > 0 && (
              <div className="space-y-6">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Key Achievements</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {principal.achievements.map((ach, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl">
                      <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center shrink-0">
                        <Award className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-bold text-slate-700">{ach}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-4 pt-6">
              {principal.cvUrl && (
                <a href={principal.cvUrl} className="inline-flex items-center gap-3 px-8 py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl hover:bg-slate-50 transition-colors font-bold">
                  <FileText className="w-5 h-5" />
                  Download CV
                </a>
              )}
              {principal.videoUrl && (
                <button className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-colors font-bold">
                  <Video className="w-5 h-5" />
                  Watch Video Message
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Message from the Principal */}
      {messageFromPrincipal && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-16 md:p-24 bg-slate-900 rounded-[80px] text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full -mr-48 -mt-48" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 relative z-10">
            <div className="lg:col-span-7 space-y-10">
              <div className="space-y-6">
                <h3 className="text-blue-400 font-black uppercase tracking-[0.3em] text-xs">{messageFromPrincipal.title}</h3>
                <h4 className="text-5xl font-black tracking-tighter leading-none">A Word from our Principal</h4>
                <div className="prose prose-invert prose-lg max-w-none">
                  <p className="text-slate-300 font-medium leading-relaxed whitespace-pre-line">
                    {messageFromPrincipal.content}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {messageFromPrincipal.visionForYear && (
                  <div className="space-y-4">
                    <h5 className="text-blue-400 font-black uppercase tracking-widest text-[10px]">Vision for the Year</h5>
                    <p className="text-slate-200 font-bold leading-relaxed">
                      {messageFromPrincipal.visionForYear}
                    </p>
                  </div>
                )}
                {messageFromPrincipal.commitmentToStudents && (
                  <div className="space-y-4">
                    <h5 className="text-blue-400 font-black uppercase tracking-widest text-[10px]">Commitment to Students</h5>
                    <p className="text-slate-200 font-bold leading-relaxed">
                      {messageFromPrincipal.commitmentToStudents}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-end items-center lg:items-end space-y-8">
              <div className="text-right">
                <p className="text-4xl font-black tracking-tight">{principal.name}</p>
                <p className="text-blue-400 font-bold uppercase tracking-widest text-xs mt-2">{principal.title}</p>
              </div>
              <div className="w-48 h-px bg-white/20" />
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <Quote className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Executive Team */}
      <div className="space-y-16">
        <div className="space-y-4 text-center max-w-2xl mx-auto">
          <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Executive Team</h3>
          <h4 className="text-4xl font-black tracking-tighter text-slate-900">The minds behind our success</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {seniorTeam.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white border border-slate-200 rounded-[40px] p-8 hover:shadow-xl transition-all duration-300 flex flex-col gap-6"
            >
              <div className="flex items-center gap-6">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                  <img src={member.photo || `https://picsum.photos/seed/${member.name || undefined}/200/200`} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h5 className="text-lg font-black text-slate-900 tracking-tight">{member.name}</h5>
                  <p className="text-blue-600 font-bold uppercase tracking-widest text-[9px] mt-0.5">{member.title}</p>
                </div>
              </div>
              
              <div className="space-y-4 flex-1">
                <p className="text-slate-600 font-medium text-sm leading-relaxed line-clamp-3">
                  {member.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {member.qualifications && (
                    <div className="text-[9px] font-black uppercase tracking-tight text-slate-900 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                      {member.qualifications}
                    </div>
                  )}
                  {member.experience && (
                    <div className="text-[9px] font-black uppercase tracking-tight text-blue-900 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100">
                      {member.experience}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors flex items-center gap-1">
                  View Profile <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Board of Governors (Optional) */}
      {boardMembers && boardMembers.length > 0 && (
        <div className="p-16 bg-slate-50 rounded-[64px] space-y-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-2">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Governance</h3>
              <h4 className="text-3xl font-black tracking-tight text-slate-900">Board of Governors</h4>
            </div>
            <p className="text-slate-500 font-medium max-w-md">
              Our board provides strategic oversight and ensures the institution remains true to its mission and values.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {boardMembers.map((board, idx) => (
              <div key={idx} className="p-6 bg-white rounded-3xl border border-slate-100 text-center space-y-2">
                <p className="text-lg font-black text-slate-900 leading-tight">{board.name}</p>
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{board.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadershipSection;
