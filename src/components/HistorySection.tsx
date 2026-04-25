import React from 'react';
import { motion } from 'framer-motion';
import { Milestone } from '../../types';
import { Calendar, Users, MapPin, Award, Zap, TrendingUp, Image as ImageIcon, Clock } from 'lucide-react';

interface HistorySectionProps {
  foundingBackground?: string;
  history: {
    foundingStory: {
      yearEstablished: number;
      founders: string[];
      originalPurpose: string;
      initialStudentPopulation: string;
      firstCampusLocation: string;
    };
    milestones: Milestone[];
    transformationNarrative: {
      adaptationToChange: string;
      technologicalUpgrades: string;
      communityImpact: string;
      alumniInfluence: string;
    };
    archiveGallery?: string[];
    thenVsNow?: {
      thenImage: string;
      nowImage: string;
      description: string;
    }[];
    anniversaryHighlights?: string[];
  };
  primaryColor: string;
}

const HistorySection: React.FC<HistorySectionProps> = ({ foundingBackground, history, primaryColor }) => {
  return (
    <div className="space-y-32">
      {/* Founding Background Overview */}
      {foundingBackground && (
        <section className="space-y-10">
          <div className="flex items-center gap-6">
            <Clock className="w-6 h-6" style={{ color: primaryColor }} />
            <h2 className="text-[11px] font-black uppercase tracking-[0.3em]" style={{ color: primaryColor }}>Historical Background</h2>
          </div>
          <p className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight max-w-4xl">
            {foundingBackground}
          </p>
        </section>
      )}

      {/* Founding Story */}
      <section className="space-y-16">
        <div className="flex items-center gap-6">
          <span className="h-[2px] w-16 bg-blue-600 rounded-full" style={{ backgroundColor: primaryColor }} />
          <h2 className="text-[11px] font-black uppercase tracking-[0.3em]" style={{ color: primaryColor }}>Founding Story</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <h3 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none">
              Established in {history.foundingStory.yearEstablished}
            </h3>
            <p className="text-2xl text-slate-500 font-medium leading-relaxed">
              {history.foundingStory.originalPurpose}
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div className="p-8 bg-slate-50 rounded-[40px] border border-slate-100">
                <Users className="w-8 h-8 text-slate-400 mb-4" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Initial Population</p>
                <p className="text-2xl font-black text-slate-900">{history.foundingStory.initialStudentPopulation}</p>
              </div>
              <div className="p-8 bg-slate-50 rounded-[40px] border border-slate-100">
                <MapPin className="w-8 h-8 text-slate-400 mb-4" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">First Location</p>
                <p className="text-2xl font-black text-slate-900">{history.foundingStory.firstCampusLocation}</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-100 rounded-[64px] aspect-square relative overflow-hidden shadow-2xl">
             <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                <ImageIcon className="w-24 h-24" />
             </div>
             {/* Placeholder for founders image or first campus */}
             <div className="absolute bottom-0 left-0 w-full p-12 bg-gradient-to-t from-slate-900/80 to-transparent text-white">
                <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-60">Founding Visionaries</p>
                <p className="text-2xl font-black">{history.foundingStory.founders.join(', ')}</p>
             </div>
          </div>
        </div>
      </section>

      {/* Timeline Milestones */}
      <section className="space-y-16">
        <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Growth Milestones</h3>
        <div className="relative">
          <div className="absolute left-[23px] top-0 bottom-0 w-[2px] bg-slate-100" />
          <div className="space-y-16">
            {history.milestones.map((m, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative pl-24 group"
              >
                <div 
                  className="absolute left-0 top-1.5 w-12 h-12 rounded-full bg-white border-4 z-10 group-hover:scale-125 transition-transform shadow-sm flex items-center justify-center"
                  style={{ borderColor: primaryColor }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
                </div>
                <span className="text-[11px] font-black text-slate-300 uppercase tracking-[0.25em] block mb-3">{m.year}</span>
                <div className="p-10 bg-white border border-slate-100 rounded-[40px] group-hover:border-blue-500 group-hover:shadow-xl transition-all">
                  <p className="text-2xl font-black text-slate-900 tracking-tight">{m.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Transformation Narrative */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="p-16 bg-slate-900 text-white rounded-[64px] space-y-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10 text-9xl">🔄</div>
          <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Transformation Narrative</h3>
          <div className="space-y-8">
            <div>
              <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2">Adaptation</p>
              <p className="text-lg font-medium text-slate-300">{history.transformationNarrative.adaptationToChange}</p>
            </div>
            <div>
              <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2">Technological Leap</p>
              <p className="text-lg font-medium text-slate-300">{history.transformationNarrative.technologicalUpgrades}</p>
            </div>
          </div>
        </div>
        <div className="p-16 bg-blue-50 rounded-[64px] space-y-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10 text-9xl" style={{ color: primaryColor }}>🌍</div>
          <h3 className="text-[11px] font-black uppercase tracking-[0.3em]" style={{ color: primaryColor }}>Community & Alumni</h3>
          <div className="space-y-8">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-60">Impact</p>
              <p className="text-lg font-medium text-slate-700">{history.transformationNarrative.communityImpact}</p>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-60">Alumni Legacy</p>
              <p className="text-lg font-medium text-slate-700">{history.transformationNarrative.alumniInfluence}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Then vs Now */}
      {history.thenVsNow && history.thenVsNow.length > 0 && (
        <section className="space-y-16">
          <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Then vs Now</h3>
          <div className="grid grid-cols-1 gap-16">
            {history.thenVsNow.map((item, idx) => (
              <div key={idx} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="aspect-video rounded-[40px] overflow-hidden relative group">
                    <img src={item.thenImage || undefined} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    <div className="absolute top-6 left-6 px-4 py-2 bg-black/50 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-full">Then</div>
                  </div>
                  <div className="aspect-video rounded-[40px] overflow-hidden relative group">
                    <img src={item.nowImage || undefined} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
                    <div className="absolute top-6 left-6 px-4 py-2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Now</div>
                  </div>
                </div>
                <p className="text-xl text-slate-500 font-medium text-center max-w-3xl mx-auto italic">"{item.description}"</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Archive Gallery */}
      {history.archiveGallery && history.archiveGallery.length > 0 && (
        <section className="space-y-12">
          <div className="flex justify-between items-end">
            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-widest">Archive Gallery</h3>
            <button className="text-[10px] font-black uppercase tracking-widest text-blue-600 border-b-2 border-blue-600 pb-1">View Full Archive</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {history.archiveGallery.map((img, idx) => (
              <div key={idx} className="aspect-square rounded-[32px] overflow-hidden bg-slate-100 hover:shadow-2xl transition-all group">
                <img src={img || undefined} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Anniversary Highlights */}
      {history.anniversaryHighlights && history.anniversaryHighlights.length > 0 && (
        <section className="bg-amber-50 p-16 rounded-[64px] border border-amber-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10 text-9xl">🎉</div>
          <h3 className="text-[11px] font-black text-amber-900 uppercase tracking-[0.3em] mb-10">Anniversary Highlights</h3>
          <div className="flex flex-wrap gap-4">
            {history.anniversaryHighlights.map((h, idx) => (
              <span key={idx} className="px-8 py-4 bg-white border border-amber-200 rounded-full text-sm font-black text-amber-900 shadow-sm">{h}</span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default HistorySection;
