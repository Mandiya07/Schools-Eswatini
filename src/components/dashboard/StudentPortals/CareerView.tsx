
import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'motion/react';

export const CareerView = () => (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-10">
        <div className="bg-slate-900 rounded-[48px] p-16 text-center relative overflow-hidden flex flex-col items-center">
            <div className="absolute top-0 right-0 p-20 opacity-10">
                <Star className="w-64 h-64 text-amber-400" />
            </div>
            <div className="relative z-10 max-w-2xl">
                <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-8 shadow-2xl">🎓</div>
                <h2 className="text-4xl font-black text-white tracking-tight mb-6">Premium Scholarship Matcher</h2>
                <p className="text-slate-400 font-medium leading-relaxed mb-10">
                Get matched with international and local Eswatini scholarships based on your unique academic performance and extracurricular merits.
                </p>
                
                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl mb-10 text-left">
                    <h4 className="text-amber-400 font-black uppercase text-[10px] tracking-widest mb-4">Matches Available (Locked)</h4>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center blur-sm grayscale opacity-50">
                        <span className="text-white font-bold">In-Region Tertiary Grant</span>
                        <span className="text-emerald-400 font-black">100% COVER</span>
                        </div>
                        <div className="flex justify-between items-center blur-sm grayscale opacity-50">
                        <span className="text-white font-bold">Commonwealth Merit Award</span>
                        <span className="text-emerald-400 font-black">75% COVER</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 justify-center">
                    <button className="bg-amber-500 text-black px-10 py-5 rounded-[24px] font-black uppercase tracking-widest text-[10px] shadow-xl hover:scale-105 transition-all">Unlock Premium Passport (E99 / Term)</button>
                    <button className="bg-white/10 text-white px-10 py-5 rounded-[24px] font-black uppercase tracking-widest text-[10px] border border-white/20">View Partner Sponsors</button>
                </div>
            </div>
        </div>
    </motion.div>
);
