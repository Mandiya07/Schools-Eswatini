
import React from 'react';
import { Clock, MapPin, TrendingUp, BookOpen, GraduationCap, FileText, Calendar as CalendarIcon, CheckCircle2, Bell, Rocket } from 'lucide-react';
import { motion } from 'motion/react';

const MOCK_TIMETABLE = [
  { id: 1, time: '08:00 AM', subject: 'Mathematics Core', teacher: 'Mr. Dlamini', room: 'Block A, Rm 12', status: 'completed' },
  { id: 2, time: '09:30 AM', subject: 'Physical Science', teacher: 'Mrs. Simelane', room: 'Science Lab 3', status: 'current' },
  { id: 3, time: '11:00 AM', subject: 'English Language', teacher: 'Ms. Mamba', room: 'Block B, Rm 4', status: 'upcoming' },
  { id: 4, time: '12:30 PM', subject: 'Lunch Break', teacher: '', room: 'Cafeteria', status: 'upcoming' },
  { id: 5, time: '01:30 PM', subject: 'Geography', teacher: 'Mr. Zwane', room: 'Block C, Rm 2', status: 'upcoming' },
];

const MOCK_GRADES = [
  { subject: 'Mathematics Core', currentGrade: 'A-', score: 88, maxScore: 100, trend: '+2%', color: 'bg-emerald-500' },
  { subject: 'Physical Science', currentGrade: 'B+', score: 78, maxScore: 100, trend: '-1%', color: 'bg-blue-500' },
  { subject: 'English Language', currentGrade: 'A', score: 92, maxScore: 100, trend: '+5%', color: 'bg-purple-500' },
  { subject: 'Geography', currentGrade: 'B', score: 74, maxScore: 100, trend: 'Same', color: 'bg-amber-500' },
  { subject: 'Accounting', currentGrade: 'A+', score: 96, maxScore: 100, trend: '+1%', color: 'bg-rose-500' },
];

const MOCK_ASSIGNMENTS = [
  { id: 1, title: 'Algebra Worksheet 4', subject: 'Mathematics', dueDate: 'Tomorrow, 08:00 AM', status: 'pending' },
  { id: 2, title: 'Lab Report: Titration', subject: 'Physical Science', dueDate: 'Wed, 14 May', status: 'submitted' },
  { id: 3, title: 'Essay: Things Fall Apart', subject: 'English Language', dueDate: 'Fri, 16 May', status: 'pending' },
];

const MOCK_EXAMS = [
  { id: 1, subject: 'Physical Science Paper 1', date: '2026-05-20', daysLeft: 8, type: 'EGCSE Mock' },
  { id: 2, subject: 'Mathematics Core Paper 2', date: '2026-05-24', daysLeft: 12, type: 'EGCSE Mock' },
];

export const HighSchoolStudentDashboard = () => (
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* LEFT COLUMN: LIVE TIMETABLE */}
      <div className="lg:col-span-4 space-y-6">
        <div className="flex justify-between items-center px-2">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" /> Today's Schedule
          </h2>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tue, 12 May</span>
        </div>
        
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 relative">
          <div className="absolute left-[39px] top-10 bottom-10 w-0.5 bg-slate-100 rounded-full" />
          
          <div className="space-y-8 relative z-10">
            {MOCK_TIMETABLE.map((slot) => {
              const isCurrent = slot.status === 'current';
              const isCompleted = slot.status === 'completed';
              
              return (
                <motion.div 
                  key={slot.id} 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex gap-6 items-start ${isCompleted ? 'opacity-50' : 'opacity-100'}`}
                >
                  <div className="w-16 shrink-0 text-right pt-1">
                    <span className="text-[10px] font-black text-slate-500">{slot.time}</span>
                  </div>
                  
                  <div className="relative">
                    <div className={`w-4 h-4 rounded-full mt-1.5 ring-4 ${
                      isCurrent ? 'bg-blue-600 ring-blue-100 animate-pulse' : 
                      isCompleted ? 'bg-slate-300 ring-white border-2 border-slate-100' : 
                      'bg-white border-2 border-slate-300 ring-white'
                    }`} />
                  </div>
                  
                  <div className={`flex-1 p-5 rounded-2xl border transition-all ${
                    isCurrent 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 border-blue-600 scale-[1.02]' 
                      : isCompleted 
                        ? 'bg-slate-50 border-slate-100 text-slate-500' 
                        : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300'
                  }`}>
                    <h4 className="font-bold text-sm mb-1">{slot.subject}</h4>
                    {slot.teacher && (
                      <div className={`flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest ${isCurrent ? 'text-blue-200' : 'text-slate-400'}`}>
                        <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {slot.teacher}</span>
                      </div>
                    )}
                    <div className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest mt-2 ${isCurrent ? 'text-blue-100' : 'text-slate-500'}`}>
                      <MapPin className="w-3 h-3" /> {slot.room}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: GRADES, TASKS, EXAMS */}
      <div className="lg:col-span-8 space-y-8">
        
        {/* EXAM COUNTDOWNS */}
        {MOCK_EXAMS.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_EXAMS.map(exam => (
              <div key={exam.id} className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 rounded-3xl text-white shadow-lg shadow-amber-500/20 flex items-center justify-between">
                <div>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-[9px] font-black uppercase tracking-widest mb-3 inline-block">
                    {exam.type}
                  </span>
                  <h4 className="font-black text-lg">{exam.subject}</h4>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-4xl font-black">{exam.daysLeft}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-amber-100">Days Left</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* GRADE TRACKING */}
        <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 p-8 md:p-10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" /> Syllabus & Grade Tracking
            </h2>
            <button className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-xl transition-colors">
              View Full Report Card
            </button>
          </div>

          <div className="space-y-6">
            {MOCK_GRADES.map(grade => (
              <div key={grade.subject} className="group">
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">{grade.subject}</h4>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${grade.trend.includes('+') ? 'text-emerald-500' : grade.trend.includes('-') ? 'text-rose-500' : 'text-slate-400'}`}>
                      {grade.trend} vs last term
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-slate-900">{grade.currentGrade}</span>
                    <span className="text-xs text-slate-400 font-bold ml-2">({grade.score}%)</span>
                  </div>
                </div>
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${grade.score}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className={`h-full ${grade.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SCHOLARSHIPS & CAREER GUIDANCE (High School Only) */}
        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-[40px] shadow-sm p-8 md:p-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-10">
              <GraduationCap className="w-64 h-64" />
            </div>
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h2 className="text-2xl font-black flex items-center gap-3">
                    <Rocket className="w-6 h-6 text-indigo-400" /> Career & scholarship Guidance
                  </h2>
                  <p className="text-indigo-200/60 font-medium mt-1">Planning for your future at UNESWA or abroad</p>
                </div>
                <button className="bg-indigo-500 text-white px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-indigo-400 transition-all">
                  Book Counselor Session
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors">
                  <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-2">Upcoming Deadline</p>
                  <h4 className="font-bold text-lg mb-1 whitespace-nowrap overflow-hidden text-ellipsis">Eswatini Gov Scholarship</h4>
                  <p className="text-indigo-200/50 text-[10px] uppercase font-black">Due: 30 June 2026</p>
                </div>
                <div className="p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors">
                  <p className="text-[10px] font-black text-emerald-300 uppercase tracking-widest mb-2">Matched Opportunity</p>
                  <h4 className="font-bold text-lg mb-1 whitespace-nowrap overflow-hidden text-ellipsis">Vodacom Tech Bursary</h4>
                  <p className="text-emerald-200/50 text-[10px] uppercase font-black">Eligibility: 95% Matched</p>
                </div>
                <div className="p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors">
                  <p className="text-[10px] font-black text-amber-300 uppercase tracking-widest mb-2">Career Roadmap</p>
                  <h4 className="font-bold text-lg mb-1 whitespace-nowrap overflow-hidden text-ellipsis">Software Engineering</h4>
                  <p className="text-amber-200/50 text-[10px] uppercase font-black">Next: Physics IGCSE</p>
                </div>
              </div>
            </div>
        </div>

        {/* PAST PAPERS & RESOURCES */}
        <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 p-8 md:p-10">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-600" /> Exam Resources & Past Papers
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { subject: 'Mathematics Core', year: '2023-2025', papers: 6 },
                { subject: 'Physical Science', year: '2022-2024', papers: 4 },
                { subject: 'English Language', year: '2023-2025', papers: 5 },
                { subject: 'Geography', year: '2024 Mock', papers: 2 }
              ].map(res => (
                  <button key={res.subject} className="p-5 bg-slate-50 border border-slate-100 rounded-2xl flex justify-between items-center hover:border-indigo-300 hover:bg-slate-100 transition-all group text-left">
                    <div>
                        <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors uppercase text-xs">{res.subject}</h4>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">{res.year} Archive</p>
                    </div>
                    <div className="flex items-center gap-2 text-indigo-600 font-black text-xs">
                        {res.papers} Papers <FileText className="w-4 h-4" />
                    </div>
                  </button>
              ))}
            </div>
        </div>

        {/* UPCOMING ASSIGNMENTS */}
        <div className="bg-slate-900 rounded-[40px] shadow-sm border border-slate-800 p-8 md:p-10 text-white">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-black flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-500" /> Action Items
            </h2>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <Bell className="w-4 h-4 text-white" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {MOCK_ASSIGNMENTS.map(task => (
              <div key={task.id} className={`p-6 rounded-3xl border transition-colors ${task.status === 'submitted' ? 'bg-white/5 border-white/10' : 'bg-blue-600/20 border-blue-500/30 hover:border-blue-500/50'}`}>
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-white/10 rounded-full text-[9px] font-black uppercase tracking-widest">
                    {task.subject}
                  </span>
                  {task.status === 'submitted' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                </div>
                <h4 className="font-bold text-sm mb-2">{task.title}</h4>
                <p className={`text-xs font-medium flex items-center gap-1 ${task.status === 'submitted' ? 'text-slate-400' : 'text-amber-400'}`}>
                  <CalendarIcon className="w-3 h-3" /> Due {task.dueDate}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
  </div>
);
