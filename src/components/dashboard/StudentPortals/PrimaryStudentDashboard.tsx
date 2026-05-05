
import React from 'react';
import { Backpack, Trophy, Rocket, Sparkles, Clock, Star } from 'lucide-react';

export const PrimaryStudentDashboard = () => (
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-12">
        <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12">
            <Rocket className="w-64 h-64 text-blue-600" />
        </div>
        <div className="relative z-10">
            <h2 className="text-3xl font-black text-slate-900 mb-2 flex items-center gap-3">
            <Backpack className="w-8 h-8 text-blue-600" /> My Learning Path
            </h2>
            <p className="text-slate-500 font-medium max-w-xl">
            Look at all the fun things you're learning today! Keep going, you're doing great! 🌟
            </p>
        </div>
        </div>
    </div>

    <div className="lg:col-span-8 space-y-8">
        <div className="bg-blue-600 rounded-[40px] p-8 text-white shadow-xl shadow-blue-600/20">
        <h3 className="text-xl font-black mb-6 flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-300" /> My Fun Tasks
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/10 border border-white/20 p-6 rounded-3xl backdrop-blur-md">
            <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-white/20 rounded-full text-[9px] font-black uppercase tracking-widest">Maths</span>
                <Trophy className="w-5 h-5 text-yellow-300" />
            </div>
            <h4 className="font-black text-lg mb-1">Addition Fun!</h4>
            <p className="text-blue-100 text-xs font-medium mb-4">Practice your plus(+) signs with 10 problems.</p>
            <button className="w-full bg-white text-blue-600 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all">Start Task</button>
            </div>
            <div className="bg-white/10 border border-white/20 p-6 rounded-3xl backdrop-blur-md">
            <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-white/20 rounded-full text-[9px] font-black uppercase tracking-widest">SiSwati</span>
                <Sparkles className="w-5 h-5 text-blue-200" />
            </div>
            <h4 className="font-black text-lg mb-1">Reading Story</h4>
            <p className="text-blue-100 text-xs font-medium mb-4">Read about the adventures of Hamba the Tortoise.</p>
            <button className="w-full bg-white/20 text-white py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest border border-white/30">Already Done!</button>
            </div>
        </div>
        </div>

        <div className="bg-white rounded-[40px] p-8 border border-slate-100">
        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-500" /> My Badges & Rewards
        </h3>
        <div className="flex flex-wrap gap-6">
            {[
            { name: 'Super Reader', icon: '📖', color: 'bg-emerald-100 text-emerald-600' },
            { name: 'Math Wizard', icon: '🔢', color: 'bg-blue-100 text-blue-600' },
            { name: 'Kind Friend', icon: '🤝', color: 'bg-rose-100 text-rose-600' },
            { name: 'On Time!', icon: '⏰', color: 'bg-purple-100 text-purple-600' }
            ].map(badge => (
            <div key={badge.name} className="flex flex-col items-center gap-2">
                <div className={`w-16 h-16 ${badge.color} rounded-full flex items-center justify-center text-3xl shadow-sm`}>
                    {badge.icon}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{badge.name}</span>
            </div>
            ))}
        </div>
        </div>
    </div>

    <div className="lg:col-span-4">
        <div className="bg-slate-900 rounded-[40px] p-8 text-white h-full relative overflow-hidden">
        <div className="absolute -bottom-10 -right-10 opacity-10">
            <Clock className="w-48 h-48" />
        </div>
        <h3 className="text-xl font-black mb-6">Today's Plan</h3>
        <div className="space-y-6 relative z-10">
            {[
            { time: '08:00', task: 'Circle Time', color: 'bg-blue-500' },
            { time: '09:00', task: 'Maths Fun', color: 'bg-emerald-500' },
            { time: '10:30', task: 'Play & Snack', color: 'bg-amber-500' },
            { time: '11:00', task: 'Story Reading', color: 'bg-purple-500' }
            ].map(slot => (
            <div key={slot.time} className="flex gap-4 items-center">
                <span className="text-[10px] font-black text-slate-400 w-12">{slot.time}</span>
                <div className="flex-1 p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${slot.color}`} />
                    <span className="font-bold text-sm">{slot.task}</span>
                </div>
            </div>
            ))}
        </div>
        </div>
    </div>
  </div>
);
