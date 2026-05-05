
import React from 'react';
import { Rocket, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

export const CampusLifeView = () => (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
            <div className="bg-indigo-900 rounded-[40px] p-10 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -mr-20 -mt-20" />
                <div className="relative z-10">
                    <h2 className="text-3xl font-black mb-2">Campus Societies & Clubs</h2>
                    <p className="text-indigo-200 font-medium max-w-xl mb-10">Explore student-led organizations, professional committees, and recreational societies.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                        { name: 'Computer Science Society', icon: '💻', count: 156, status: 'Member' },
                        { name: 'University Debate Union', icon: '📢', count: 84, status: 'Join' },
                        { name: 'Eswatini Cultural Group', icon: '🇿🇼', count: 120, status: 'Member' },
                        { name: 'Green Campus Initiative', icon: '🌱', count: 68, status: 'Join' }
                        ].map(club => (
                        <div key={club.name} className="p-6 bg-white/10 border border-white/10 rounded-3xl backdrop-blur-sm flex justify-between items-center group hover:bg-white/20 transition-all cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="text-2xl">{club.icon}</div>
                                <div>
                                    <h4 className="font-bold text-sm">{club.name}</h4>
                                    <p className="text-[10px] text-indigo-300 font-bold uppercase tracking-widest">{club.count} Members</p>
                                </div>
                            </div>
                            <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${club.status === 'Member' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-indigo-500 text-white'}`}>
                                {club.status}
                            </span>
                        </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm">
                <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                    <Rocket className="w-6 h-6 text-indigo-600" /> Upcoming Campus Events
                </h3>
                <div className="space-y-6">
                    {[
                    { title: 'Annual Tech Symposium', date: '15 June', location: 'Main Hall', theme: 'AI in Agriculture' },
                    { title: 'Inter-Collegiate Sports Day', date: '22 June', location: 'University Stadium', theme: 'Unity in Diversity' }
                    ].map(event => (
                    <div key={event.title} className="flex gap-6 items-start">
                        <div className="w-16 shrink-0 bg-slate-50 border border-slate-100 rounded-2xl p-3 text-center">
                            <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{event.date.split(' ')[1]}</p>
                            <p className="text-xl font-black text-slate-900">{event.date.split(' ')[0]}</p>
                        </div>
                        <div className="flex-1 pb-6 border-b border-slate-100">
                            <h4 className="font-black text-slate-900 mb-1">{event.title}</h4>
                            <p className="text-slate-500 text-sm font-medium mb-3">{event.theme}</p>
                            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {event.location}</span>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
            </div>

            <div className="lg:col-span-4 space-y-8">
            <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm h-full">
                <h3 className="text-xl font-black text-slate-900 mb-6">Student Union Board</h3>
                <div className="space-y-6">
                    <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-3xl">
                        <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2">Announcement</p>
                        <p className="text-slate-700 text-sm font-bold mb-4">Ballot for the upcoming Student Representative Council (SRC) elections is now live.</p>
                        <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-indigo-600/20">Vote via Portal</button>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Campus Facilities</h4>
                        {[
                        { name: 'Study Room 4', status: 'Available', color: 'text-emerald-500' },
                        { name: 'Lab 2 (Mac)', status: 'Currently Full', color: 'text-amber-500' },
                        { name: 'Gymnasium', status: 'Open', color: 'text-emerald-500' }
                        ].map(facility => (
                        <div key={facility.name} className="flex justify-between items-center text-sm">
                            <span className="font-bold text-slate-700">{facility.name}</span>
                            <span className={`text-[10px] font-black uppercase tracking-widest ${facility.color}`}>{facility.status}</span>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
            </div>
        </div>
    </motion.div>
);
