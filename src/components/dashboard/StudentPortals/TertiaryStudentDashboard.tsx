
import React from 'react';
import { Library, BookOpen, FileBadge, FileText, Layout, ChevronRight, MapPin, Clock, Rocket } from 'lucide-react';
import { motion } from 'motion/react';

export const TertiaryStudentDashboard = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* TERTIARY: COMPLEX REGISTRY & TRANSCRIPTS */}
        <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                        <Library className="w-7 h-7 text-indigo-600" /> Academic Progress & Registry
                        </h2>
                        <p className="text-slate-500 font-medium mt-1">Bachelor of Science in Computer Science • Year 3 Semester 1</p>
                    </div>
                    <button className="bg-indigo-50 text-indigo-600 px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-indigo-600 hover:text-white transition-all">
                        Request Official Transcript
                    </button>
                </div>

                <div className="space-y-6">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <BookOpen className="w-4 h-4" /> Current Module Registration
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                        {[
                        { code: 'CSC301', title: 'Advanced Algorithms', credits: 12, marks: '78%', status: 'In Progress' },
                        { code: 'CSC305', title: 'Network Security', credits: 12, marks: '82%', status: 'In Progress' },
                        { code: 'CSC312', title: 'Distributed Systems', credits: 12, marks: '65%', status: 'At Risk' },
                        { code: 'ENG301', title: 'Engineering Ethics', credits: 8, marks: '90%', status: 'Excel' }
                        ].map(mod => (
                        <div key={mod.code} className="p-6 bg-slate-50 border border-slate-100 rounded-3xl flex justify-between items-center group hover:border-indigo-200 transition-all">
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <span className="text-xs font-black text-indigo-600">{mod.code}</span>
                                    <h4 className="font-bold text-slate-900">{mod.title}</h4>
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{mod.credits} Credits • {mod.status}</span>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-black text-slate-900">{mod.marks}</p>
                                <span className="text-[9px] font-black uppercase text-indigo-400">Current Weight</span>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-slate-900 rounded-[40px] p-10 text-white shadow-xl">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-black flex items-center gap-3">
                        <FileBadge className="w-6 h-6 text-indigo-400" /> Research & Dissertation Track
                    </h3>
                    <span className="px-4 py-2 bg-indigo-500/20 text-indigo-300 rounded-full text-[10px] font-black uppercase tracking-widest">Undergraduate Thesis</span>
                </div>
                
                <div className="relative p-8 border border-white/10 rounded-3xl bg-white/5">
                    <div className="flex items-start gap-6">
                        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
                            <FileText className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-lg mb-2">Impact of FinTech on Eswatini's Rural Economy</h4>
                            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                            Current Status: Chapter 3 (Data Analysis) in review by supervisor Dr. Mhlongo.
                            </p>
                            <div className="space-y-4">
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-indigo-300">
                                <span>Thesis Completion</span>
                                <span>65%</span>
                            </div>
                            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full w-[65%] bg-indigo-500 rounded-full" />
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
            <div className="bg-indigo-600 rounded-[40px] p-8 text-white">
                <h3 className="text-xl font-black mb-6">Exam & Assessment Hub</h3>
                <div className="space-y-4">
                    {[
                    { title: 'Mid-term Exam', mod: 'CSC301', date: '24 May', type: 'Physical' },
                    { title: 'Project Submission', mod: 'CSC305', date: '02 June', type: 'Online' }
                    ].map(exam => (
                    <div key={exam.title} className="p-4 bg-white/10 border border-white/20 rounded-2xl">
                        <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest mb-1">{exam.mod}</p>
                        <h4 className="font-bold text-sm mb-3">{exam.title}</h4>
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {exam.date}</span>
                            <span className="px-2 py-1 bg-white/10 rounded-lg">{exam.type}</span>
                        </div>
                    </div>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm">
                <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                    <Layout className="w-6 h-6 text-indigo-600" /> Quick Links
                </h3>
                <div className="grid grid-cols-1 gap-3">
                    {['Module Registration', 'Exam Timetable', 'Financial Statement', 'E-Library Access', 'Hostel Portal'].map(link => (
                    <button key={link} className="w-full text-left p-4 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all text-sm font-bold text-slate-600 flex justify-between items-center group">
                        {link}
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                    </button>
                    ))}
                </div>
            </div>
        </div>
    </div>
);
