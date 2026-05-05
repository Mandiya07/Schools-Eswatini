
import React, { useState } from 'react';
import { Send, Shield, Phone, BookHeart, CheckCircle2 } from 'lucide-react';
import { WellnessArticle, InstitutionType } from '../../../../types';

interface WellnessViewProps {
  institutionType: InstitutionType | null;
  wellnessArticles: WellnessArticle[];
  hotlines: { name: string; number: string; desc: string }[];
}

export const WellnessView: React.FC<WellnessViewProps> = ({ institutionType, wellnessArticles, hotlines }) => {
  const [reportType, setReportType] = useState('counselor');
  const [reportMessage, setReportMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [reportStatus, setReportStatus] = useState<'idle' | 'submitted'>('idle');

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReportStatus('submitted');
    setTimeout(() => {
      setReportMessage('');
      setReportStatus('idle');
    }, 4000);
  };

  return (
    <div className="space-y-8">
      {/* EMERGENCY STRIP */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {hotlines.map(hotline => (
          <div key={hotline.number} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-black text-slate-900">{hotline.name}</h4>
              <p className="text-xl font-black text-rose-600">{hotline.number}</p>
              <p className="text-xs text-slate-500 font-medium mt-1">{hotline.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ANONYMOUS REPORT SYSTEM */}
        <div className="lg:col-span-5 relative">
          {reportStatus === 'submitted' ? (
            <div className="bg-emerald-50 rounded-[40px] border border-emerald-100 p-10 h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 bg-emerald-200 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-slate-900">Message Delivered</h3>
              <p className="text-emerald-700 font-medium leading-relaxed">
                Your message has been securely and {isAnonymous ? 'anonymously ' : ''}sent to the school counselor. They will review it shortly.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-[40px] shadow-sm border border-slate-200 p-8 md:p-10">
              <div className="flex items-center gap-4 mb-6 pt-2">
                <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Support Desk</h2>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Safe • Secure • Secret</p>
                </div>
              </div>
              
              <p className="text-slate-600 text-sm font-medium leading-relaxed mb-8">
                {institutionType === InstitutionType.PRIMARY 
                  ? 'Feeling sad or have a secret to share with a teacher? We are here to help you feel happy and safe at school!' 
                  : 'Need someone to talk to? Experiencing bullying? Use this secure channel to request a meeting with the counselor or leave an anonymous report.'}
              </p>

              <form onSubmit={handleReportSubmit} className="space-y-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">I need to...</label>
                  <select 
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 font-bold text-slate-900 focus:ring-4 focus:ring-rose-100 outline-none"
                  >
                    <option value="counselor">Request a meeting with a Counselor</option>
                    <option value="bullying">{institutionType === InstitutionType.PRIMARY ? "I am being treated unkindly" : "Report Bullying securely"}</option>
                    <option value="academic_stress">Report extreme academic stress</option>
                    <option value="other">Other well-being concern</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">Message Details</label>
                  <textarea 
                    required
                    rows={4}
                    value={reportMessage}
                    onChange={(e) => setReportMessage(e.target.value)}
                    placeholder={institutionType === InstitutionType.PRIMARY ? "Write your message here..." : "Please provide details (location, names involved, or how you're feeling). We are here to help."}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 font-medium text-sm text-slate-600 focus:ring-4 focus:ring-rose-100 outline-none resize-none"
                  />
                </div>

                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <input 
                    type="checkbox" 
                    id="anon" 
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="w-5 h-5 rounded text-rose-500 focus:ring-rose-500"
                  />
                  <label htmlFor="anon" className="text-sm font-bold text-slate-700 cursor-pointer">
                    Keep this completely anonymous
                  </label>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-slate-900 text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-rose-600 transition-all shadow-xl"
                >
                  <Send className="w-4 h-4" /> Securely Send Message
                </button>
              </form>
            </div>
          )}
        </div>

        {/* WELLNESS GUIDES */}
        <div className="lg:col-span-7">
          <div className="bg-slate-900 rounded-[40px] shadow-sm p-8 md:p-10 text-white min-h-full">
            <div className="flex items-center gap-3 mb-8">
              <BookHeart className="w-6 h-6 text-rose-400" />
              <h2 className="text-2xl font-black tracking-tight">{institutionType === InstitutionType.PRIMARY ? "Helpful Stories" : "Wellness Resources"}</h2>
            </div>

            <div className="space-y-4">
              {wellnessArticles.map(article => (
                <div key={article.id} className="p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-lg text-rose-100 group-hover:text-white transition-colors">
                      {institutionType === InstitutionType.PRIMARY ? article.title.replace('Exam Anxiety', 'School Stress').replace('Form 5', 'Big Classes') : article.title}
                    </h4>
                    <span className="px-3 py-1 bg-white/10 text-white rounded-full text-[9px] font-black uppercase tracking-widest shrink-0">
                      {article.readTime}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed">{article.desc}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/10">
              <button className="text-[10px] font-black text-rose-300 uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2">
                  Explore full wellness library →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
