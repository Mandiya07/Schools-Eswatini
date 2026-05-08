import React from 'react';
import { Institution } from '../../types';
import { Leaf, FileText, Download, ShieldCheck, ArrowRight, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface PaperlessInitiativeProps {
  institution: Institution;
}

const PaperlessInitiative: React.FC<PaperlessInitiativeProps> = ({ institution }) => {
  const hub = institution.administrativeDetails?.paperlessHub;
  
  if (!hub || !hub.enabled) return null;

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Leaf className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">Sustainability Initiative</span>
            </div>
            <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-none mb-6">
              Transitioning to a <span className="text-emerald-600 italic">Paperless</span> Campus
            </h2>
            <p className="text-xl text-slate-500 font-medium leading-relaxed">
              {institution.name} is committed to reducing our environmental footprint while improving administrative efficiency through our digital transformation initiative.
            </p>
          </div>
          <div className="bg-white p-8 rounded-[32px] shadow-xl border border-slate-100 flex flex-col items-center text-center w-full md:w-auto">
            <div className="text-4xl font-black text-emerald-600 tabular-nums">{hub.paperSavedEstimate.toLocaleString()}</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Sheets of Paper Saved</div>
            <div className="mt-4 px-4 py-1.5 bg-emerald-50 rounded-full text-emerald-700 font-black text-[9px] uppercase tracking-widest">
              Level {hub.digitalTransformationScore > 75 ? 'Advanced' : 'Pro'} 🌳
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Digital Document Library</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {hub.documents.map((doc, idx) => (
                <motion.div 
                  key={doc.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-[32px] border border-slate-100 hover:border-emerald-200 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-emerald-50 transition-colors">
                      <FileText className="w-6 h-6 text-slate-400 group-hover:text-emerald-600" />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 bg-slate-100 text-slate-500 rounded-full">
                      {doc.category}
                    </span>
                  </div>
                  <h4 className="font-black text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors">{doc.name}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Uploaded {new Date(doc.uploadedAt).toLocaleDateString()} • {doc.size}</p>
                  <a 
                    href={doc.url} 
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-700"
                  >
                    Download Digital Copy <Download className="w-3 h-3" />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Why Go Digital?</h3>
            <div className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden">
              <div className="space-y-8 relative z-10">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h5 className="font-black text-sm mb-1 uppercase tracking-tight">Instant Updates</h5>
                    <p className="text-slate-400 text-xs font-medium leading-relaxed">No more waiting for physical copies. Get the latest school updates instantly.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h5 className="font-black text-sm mb-1 uppercase tracking-tight">Verified & Secure</h5>
                    <p className="text-slate-400 text-xs font-medium leading-relaxed">Official school documents are digitally signed and verified by the Ministry.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h5 className="font-black text-sm mb-1 uppercase tracking-tight">Searchable Archive</h5>
                    <p className="text-slate-400 text-xs font-medium leading-relaxed">Search through years of newsletters and handbooks in seconds.</p>
                  </div>
                </div>
              </div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-500/10 blur-3xl rounded-full"></div>
            </div>
            
            <div className="bg-emerald-600 rounded-[40px] p-8 text-white group cursor-pointer hover:bg-emerald-700 transition-all">
              <h5 className="font-black italic text-xl mb-2">Apply Online</h5>
              <p className="text-emerald-100 text-xs font-medium mb-6">Skip the queues and paper forms. Join our next intake via our digital portal.</p>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest border-t border-emerald-500 pt-4">
                Start Digital Application <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-100/50 -skew-x-12 translate-x-20"></div>
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-emerald-400/5 blur-[120px] rounded-full"></div>
    </section>
  );
};

export default PaperlessInitiative;
