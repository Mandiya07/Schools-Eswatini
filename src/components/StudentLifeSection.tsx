
import React from 'react';
import { motion } from 'motion/react';
import { 
  Trophy, 
  Users, 
  Palette, 
  ShieldCheck, 
  Building2, 
  HeartPulse, 
  Home, 
  Sparkles, 
  Globe, 
  Quote,
  CheckCircle2,
  ChevronRight,
  Star
} from 'lucide-react';
import { Institution } from '../../types';

interface StudentLifeSectionProps {
  life: Institution['sections']['studentLife'];
  primaryColor: string;
}

const StudentLifeSection: React.FC<StudentLifeSectionProps> = ({ life, primaryColor }) => {
  return (
    <div className="space-y-32 pb-20">
      {/* Overview Section */}
      <section className="space-y-12">
        <h2 className="text-7xl font-black text-slate-900 tracking-tighter leading-[0.9]">
          {life.overview.headline}
        </h2>
        <p className="text-2xl text-slate-500 font-medium leading-relaxed max-w-3xl">
          {life.overview.introduction}
        </p>
      </section>

      {/* Sports & Athletics */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-10">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-blue-50 rounded-3xl flex items-center justify-center">
              <Trophy className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-4xl font-black text-slate-900 tracking-tight uppercase tracking-widest">Sports & Athletics</h3>
          </div>
          <p className="text-lg text-slate-600 font-medium leading-relaxed">
            {life.sports.description}
          </p>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {life.sports.list.map((sport, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm font-bold text-slate-700">{sport}</span>
                </div>
              ))}
            </div>
            <div className="p-8 bg-slate-50 rounded-[40px] border border-slate-100 space-y-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Facilities</p>
              <div className="flex flex-wrap gap-2">
                {life.sports.facilities.map((fac, idx) => (
                  <span key={idx} className="px-4 py-2 bg-white rounded-xl text-[10px] font-bold border border-slate-200">
                    {fac}
                  </span>
                ))}
              </div>
            </div>
            {life.sports.achievements && (
              <div className="p-8 bg-blue-600 rounded-[40px] text-white space-y-4 shadow-xl shadow-blue-500/20">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Recent Achievements</p>
                <div className="space-y-3">
                  {life.sports.achievements.map((ach, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="text-sm font-bold">{ach}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="relative h-[600px] rounded-[80px] overflow-hidden shadow-3xl">
          <img 
            src="https://picsum.photos/seed/sports/800/1000" 
            alt="Sports at Institution"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
        </div>
      </section>

      {/* Clubs & Societies */}
      <section className="space-y-16">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-indigo-50 rounded-3xl flex items-center justify-center">
            <Users className="w-8 h-8 text-indigo-600" />
          </div>
          <h3 className="text-4xl font-black text-slate-900 tracking-tight uppercase tracking-widest">Clubs & Societies</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {life.clubs.map((club, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="p-12 bg-white border border-slate-100 rounded-[64px] shadow-sm hover:shadow-2xl transition-all group"
            >
              <div className="flex justify-between items-start mb-8">
                <span className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-[9px] font-black uppercase tracking-widest">
                  {club.focus}
                </span>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 transition-colors" />
              </div>
              <h4 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{club.name}</h4>
              <p className="text-slate-500 font-medium leading-relaxed">
                {club.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Arts, Culture & Leadership */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <section className="p-16 bg-slate-900 text-white rounded-[80px] space-y-10 relative overflow-hidden shadow-3xl">
          <div className="absolute top-0 right-0 p-16 opacity-10">
            <Palette className="w-48 h-48" />
          </div>
          <div className="relative z-10 space-y-8">
            <h3 className="text-4xl font-black tracking-tight uppercase tracking-widest">Arts & Culture</h3>
            <p className="text-xl text-slate-400 font-medium leading-relaxed">
              {life.arts.description}
            </p>
            <div className="space-y-4">
              {life.arts.activities.map((act, idx) => (
                <div key={idx} className="flex items-center gap-4 p-5 bg-white/5 rounded-3xl border border-white/10">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span className="text-lg font-bold">{act}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="p-16 bg-indigo-600 text-white rounded-[80px] space-y-10 relative overflow-hidden shadow-3xl">
          <div className="absolute top-0 right-0 p-16 opacity-10">
            <ShieldCheck className="w-48 h-48" />
          </div>
          <div className="relative z-10 space-y-8">
            <h3 className="text-4xl font-black tracking-tight uppercase tracking-widest">Leadership</h3>
            <p className="text-xl text-indigo-100 font-medium leading-relaxed">
              {life.leadership.roles}
            </p>
            <div className="grid grid-cols-1 gap-4">
              {life.leadership.opportunities.map((opp, idx) => (
                <div key={idx} className="flex items-center gap-4 p-5 bg-white/10 rounded-3xl border border-white/10">
                  <div className="w-2 h-2 rounded-full bg-white" />
                  <span className="text-lg font-bold">{opp}</span>
                </div>
              ))}
            </div>
            {life.leadership.development && (
              <div className="pt-8 border-t border-white/20">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Development</p>
                <p className="font-bold">{life.leadership.development}</p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Facilities & Support */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 p-14 bg-white border border-slate-100 rounded-[64px] shadow-sm space-y-12">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center">
              <Building2 className="w-8 h-8 text-slate-900" />
            </div>
            <h4 className="text-3xl font-black text-slate-900 tracking-tight uppercase tracking-widest">Campus Facilities</h4>
          </div>
          <p className="text-lg text-slate-500 font-medium leading-relaxed">
            {life.facilities.description}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {life.facilities.list.map((fac, idx) => (
              <div key={idx} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 text-center group hover:bg-white hover:shadow-xl transition-all">
                <span className="text-sm font-black text-slate-900 uppercase tracking-widest">{fac}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="p-14 bg-emerald-50 rounded-[64px] border border-emerald-100 space-y-12">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-sm">
              <HeartPulse className="w-8 h-8 text-emerald-600" />
            </div>
            <h4 className="text-3xl font-black text-slate-900 tracking-tight uppercase tracking-widest">Support</h4>
          </div>
          <div className="space-y-6">
            {life.support.services.map((svc, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                </div>
                <span className="text-sm font-bold text-slate-700">{svc}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-emerald-700 font-medium leading-relaxed pt-6 border-t border-emerald-200">
            {life.support.description}
          </p>
        </section>
      </div>

      {/* Boarding & Community */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {life.accommodation?.available && (
          <section className="p-16 bg-amber-50 rounded-[80px] border border-amber-100 space-y-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-16 opacity-10">
              <Home className="w-48 h-48 text-amber-600" />
            </div>
            <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-4">
                <span className="px-4 py-2 bg-amber-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                  {life.accommodation.type}
                </span>
              </div>
              <h3 className="text-4xl font-black text-slate-900 tracking-tight uppercase tracking-widest">Accommodation</h3>
              <p className="text-xl text-amber-900/70 font-medium leading-relaxed">
                {life.accommodation.description}
              </p>
              <div className="flex flex-wrap gap-3">
                {life.accommodation.facilities?.map((fac, idx) => (
                  <span key={idx} className="px-6 py-3 bg-white rounded-2xl text-xs font-black uppercase tracking-widest border border-amber-200 shadow-sm text-amber-900">
                    {fac}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="p-16 bg-blue-50 rounded-[80px] border border-blue-100 space-y-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-16 opacity-10">
            <Globe className="w-48 h-48 text-blue-600" />
          </div>
          <div className="relative z-10 space-y-8">
            <h3 className="text-4xl font-black text-slate-900 tracking-tight uppercase tracking-widest">Community Impact</h3>
            <p className="text-xl text-blue-900/70 font-medium leading-relaxed">
              {life.community.description}
            </p>
            <div className="space-y-4">
              {life.community.programs.map((prog, idx) => (
                <div key={idx} className="flex items-center gap-4 p-5 bg-white rounded-3xl border border-blue-200 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-blue-500" />
                  <span className="text-lg font-bold text-slate-700">{prog}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Testimonials */}
      {life.testimonials && (
        <section className="space-y-16">
          <div className="text-center space-y-4">
            <h3 className="text-4xl font-black text-slate-900 tracking-tight uppercase tracking-widest">Student Voices</h3>
            <p className="text-slate-500 font-medium">Hear from those who live the experience every day</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {life.testimonials.map((test, idx) => (
              <div key={idx} className="p-16 bg-white border border-slate-100 rounded-[80px] shadow-sm relative group hover:shadow-2xl transition-all">
                <Quote className="absolute top-12 right-12 w-16 h-16 text-slate-50 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="space-y-8 relative z-10">
                  <p className="text-2xl text-slate-700 font-medium leading-relaxed italic">
                    "{test.text}"
                  </p>
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-slate-100 rounded-full overflow-hidden">
                      <img src={`https://picsum.photos/seed/student${idx}/100/100`} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-xl font-black text-slate-900">{test.name}</p>
                      <p className="text-sm font-black text-blue-600 uppercase tracking-widest">{test.grade}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default StudentLifeSection;
