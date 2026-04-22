
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Region, Institution, InstitutionType } from '../types';
import { GoogleGenAI } from "@google/genai";
import SEO from '../src/components/SEO';
import BannerAd from '../src/components/BannerAd';
import { Star, TrendingUp, Award } from 'lucide-react';

interface HomePageProps {
  institutions: Institution[];
  onSelectRegion: (region: Region) => void;
  lang: 'en' | 'ss';
  compareList: string[];
  onToggleCompare: (id: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ institutions, onSelectRegion, lang, compareList, onToggleCompare }) => {
  const navigate = useNavigate();
  const [hoveredRegion, setHoveredRegion] = useState<Region | null>(null);
  const [aiQuery, setAiQuery] = useState('');
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [groundingLinks, setGroundingLinks] = useState<{web: {uri: string, title: string}}[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [scoutMode, setScoutMode] = useState<'search' | 'suggest'>('search');

  const handleRegionSelect = (region: Region) => {
    onSelectRegion(region);
    navigate('/browse');
  };

  const handleAiScout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAiLoading(true);
    setAiResult(null);
    setGroundingLinks([]);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      let prompt = '';
      
      if (scoutMode === 'search') {
        prompt = `User query: "${aiQuery}". Use Google Search to find real-time information about schools, athletic news, or Ministry of Education updates in Eswatini related to this query. Summarize your findings and provide helpful advice.`;
      } else {
        const schoolList = institutions.map(i => `${i.name} (${i.region}, ${i.type.join(', ')})`).join(', ');
        prompt = `Based on the following schools in Eswatini: ${schoolList}. 
        The user is looking for: "${aiQuery}". 
        Suggest the best 3 schools from this list and explain why they match the user's needs. 
        If no schools match perfectly, suggest the closest alternatives and explain what they offer.`;
      }
      
      const response = await ai.models.generateContent({ 
        model: scoutMode === 'search' ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview', 
        contents: prompt,
        config: scoutMode === 'search' ? { tools: [{googleSearch: {}}] } : {}
      });
      
      setAiResult(response.text);
      if (scoutMode === 'search' && response.candidates?.[0]?.groundingMetadata?.groundingChunks) {
        const chunks = response.candidates[0].groundingMetadata.groundingChunks as any[];
        setGroundingLinks(chunks.filter(c => c.web).map(c => ({web: c.web})));
      }
    } catch (err) {
      console.error(err);
      setAiResult("I encountered an error connecting to the scout engine. Please try again later.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const content = {
    en: {
      hero: "The Heart of Eswatini Education",
      sub: "Find verified institutions, explore campus portals, and build your future in the Kingdom.",
      browse: "Browse All Schools",
      moet: "Ministry of Education Policy Corner",
      scoutTitle: "AI Smart Scout (Pro)",
      scoutSub: "Real-time search across the Kingdom's education sector.",
      suggestSub: "Personalized school recommendations based on your needs.",
      searchPlaceholder: "e.g. Latest pass rates for Hhohho high schools...",
      suggestPlaceholder: "e.g. Best boarding school for science in Manzini...",
      searchBtn: "Search",
      suggestBtn: "Suggest",
      exploreRegions: "Explore by Region",
      featuredSpotlight: "Featured Spotlight",
      viewProfile: "View Profile",
      quickCompare: "Quick Compare",
      fullCompare: "Full Comparison Page",
      partnersTitle: "Professional Bodies & Support",
      partnersSub: "Official associations and organizations supporting educators and students."
    },
    ss: {
      hero: "Inhlitiyo yeMfundvo kaNgwane",
      sub: "Tfola tikolwa leticinisekisiwe, hlola emaphothali asekhampasi, futsi wakhe likusasa lakho eMbusweni.",
      browse: "Buka Tonkhe Tikolwa",
      moet: "Lihhovisi Letemfundo Neticondziso",
      scoutTitle: "AI Umhloli (Pro)",
      scoutSub: "Kusesha kwesikhatsi sangempela kuyo yonke imfundvo yakaNgwane.",
      suggestSub: "Tincomo tetikolwa letentelwe wena kuye ngetidzingo takho.",
      searchPlaceholder: "sib. Emaphesenti ekuphasa akamuva etikolwa taseHhohho...",
      suggestPlaceholder: "sib. Sikolwa lesihamba embili sekuhlala eManzini...",
      searchBtn: "Sesha",
      suggestBtn: "Phakamisa",
      exploreRegions: "Hlola ngeTigodzi",
      featuredSpotlight: "Lokugcamile",
      viewProfile: "Buka Iphrofayela",
      quickCompare: "Catsanisa Msinya",
      fullCompare: "Likhasi Lekucatsanisa",
      partnersTitle: "Tinhlangano Teticondziso Netekusekela",
      partnersSub: "Tinhlangano letisemtsetfweni letisekela othisha nabafundzi."
    }
  };

  const t = content[lang];

  const spotlightSchools = institutions.filter(i => i.isFeatured).slice(0, 3);
  const recentlyAdded = [...institutions].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 4);
  const globalAds = institutions.flatMap(i => i.bannerAds || []).filter(ad => ad.active && ad.position === 'homepage');

  const regions = [
    { id: 'HH', name: Region.HHOHHO, color: 'fill-blue-600', hoverColor: 'fill-blue-500', description: 'Capital region & top-tier high schools.', path: "M 30,10 L 60,10 L 70,40 L 45,55 L 25,35 Z", cx: 46, cy: 30 },
    { id: 'MA', name: Region.MANZINI, color: 'fill-indigo-600', hoverColor: 'fill-indigo-500', description: 'Economic hub & tertiary institutions.', path: "M 25,35 L 45,55 L 70,40 L 85,45 L 85,75 L 40,75 L 20,60 Z", cx: 53, cy: 56 },
    { id: 'LU', name: Region.LUBOMBO, color: 'fill-amber-600', hoverColor: 'fill-amber-500', description: 'Agricultural heartland.', path: "M 60,10 L 95,15 L 105,55 L 95,95 L 85,75 L 85,45 L 70,40 Z", cx: 88, cy: 48 },
    { id: 'SH', name: Region.SHISELWENI, color: 'fill-emerald-600', hoverColor: 'fill-emerald-500', description: 'Scenic southern region.', path: "M 20,60 L 40,75 L 85,75 L 95,95 L 60,115 L 20,100 Z", cx: 56, cy: 88 }
  ];

  return (
    <div className="relative">
      <SEO 
        title="Home" 
        description="Find verified schools, explore campus portals, and build your future in the Kingdom of Eswatini."
        keywords={['schools eswatini', 'education eswatini', 'moet eswatini', 'eswatini universities']}
      />
      <div className="bg-slate-900 text-white py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://picsum.photos/seed/eswatini/1600/900" alt="Background" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 text-left">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-[0.9]">
              {t.hero}
            </h1>
            <p className="text-xl text-slate-300 max-w-xl mb-12 leading-relaxed">
              {t.sub}
            </p>
            <div className="flex gap-4">
               <button 
                 onClick={() => document.getElementById('regions-section')?.scrollIntoView({ behavior: 'smooth' })} 
                 className="bg-blue-600 px-8 py-4 rounded-2xl font-bold shadow-xl shadow-blue-900/40 hover:bg-blue-700 transition-all uppercase tracking-widest text-xs"
               >
                  Select Region to Browse
               </button>
            </div>
          </div>

          <div className="lg:w-1/2 relative bg-white/5 backdrop-blur-sm p-12 rounded-[40px] border border-white/10 shadow-2xl flex flex-col items-center justify-center text-center overflow-hidden">
             {/* Decorative Background Elements */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]" />
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-[80px]" />
             
             <div className="relative z-10">
               <div className="w-24 h-24 mx-auto bg-white/10 rounded-[32px] flex items-center justify-center backdrop-blur-md border border-white/20 mb-8 shadow-inner">
                 <span className="text-5xl">🇸🇿</span>
               </div>
               <h3 className="text-3xl font-black text-white mb-4">Empowering the Nation</h3>
               <p className="text-slate-400 font-medium leading-relaxed max-w-sm mx-auto">
                 Discover high-performing institutions, access centralized MoET resources, and track your academic journey all in one place.
               </p>
               
               <div className="grid grid-cols-2 gap-4 mt-10">
                 <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                   <p className="text-3xl font-black text-blue-400">{institutions.length}</p>
                   <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Verified Schools</p>
                 </div>
                 <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                   <p className="text-3xl font-black text-emerald-400">4</p>
                   <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Regions Covered</p>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* Interactive Regional Map Section */}
      <div id="regions-section" className="bg-slate-50 py-24 border-b border-slate-100 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-[100px] opacity-50" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-100 rounded-full blur-[100px] opacity-50" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center gap-12">
          
          <div className="md:w-1/3">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-6">{t.exploreRegions}</h2>
            <p className="text-slate-500 font-medium mb-12">
              Select a region on the map to discover educational institutions, from primary schools directly up to tertiary universities safely scattered throughout Eswatini.
            </p>
            
            {/* Dynamic Summary Panel */}
            <div className={`transition-all duration-500 rounded-[32px] p-8 border shadow-xl bg-white ${hoveredRegion ? 'opacity-100 scale-100 border-indigo-200' : 'opacity-50 scale-95 border-slate-100'}`}>
               {hoveredRegion ? (
                 <>
                   <div className="flex items-center gap-4 mb-4">
                     <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl text-white shadow-lg ${regions.find(r => r.name === hoveredRegion)?.color.replace('fill-', 'bg-')}`}>
                       {regions.find(r => r.name === hoveredRegion)?.id === 'HH' ? '🏙️' : regions.find(r => r.name === hoveredRegion)?.id === 'MA' ? '🏭' : regions.find(r => r.name === hoveredRegion)?.id === 'LU' ? '🌾' : '⛰️'}
                     </div>
                     <h3 className="text-3xl font-black text-slate-900">{hoveredRegion}</h3>
                   </div>
                   <p className="text-slate-500 font-medium leading-relaxed mb-6">
                     {regions.find(r => r.name === hoveredRegion)?.description}
                   </p>
                   <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between border border-slate-100">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Verified Institutions</span>
                     <span className="text-xl font-black text-indigo-600">
                       {institutions.filter(i => i.region === hoveredRegion).length}
                     </span>
                   </div>
                 </>
               ) : (
                 <div className="text-center py-8">
                   <div className="w-16 h-16 bg-slate-50 rounded-full mx-auto mb-4 border-2 border-dashed border-slate-200 flex items-center justify-center">
                     <span className="text-slate-300">📍</span>
                   </div>
                   <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Hover over the map</p>
                 </div>
               )}
            </div>
          </div>

          <div className="md:w-2/3 w-full flex justify-center">
             <div className="w-full max-w-[600px] relative">
               <svg viewBox="0 0 120 130" className="w-full h-auto drop-shadow-2xl">
                  {regions.map((r) => {
                    const count = institutions.filter(i => i.region === r.name).length;
                    const isHovered = hoveredRegion === r.name;
                    
                    return (
                      <g 
                        key={r.id}
                        onMouseEnter={() => setHoveredRegion(r.name)}
                        onMouseLeave={() => setHoveredRegion(null)}
                        onClick={() => handleRegionSelect(r.name)}
                        className="cursor-pointer group"
                      >
                        {/* Region Path */}
                        <path
                          d={r.path}
                          className={`transition-all duration-300 ${isHovered ? r.hoverColor : r.color} stroke-white stroke-[0.5] hover:stroke-2 origin-center`}
                          style={{
                            transformOrigin: `${r.cx}px ${r.cy}px`,
                            transform: isHovered ? 'scale(1.02)' : 'scale(1)'
                          }}
                        />
                        
                        {/* Interactive Pins */}
                        <g 
                          className={`transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-80'}`}
                          style={{
                            transformOrigin: `${r.cx}px ${r.cy}px`,
                            transform: isHovered ? 'scale(1.1)' : 'scale(1)'
                          }}
                        >
                          <circle cx={r.cx} cy={r.cy} r="4" className="fill-white shadow-lg" />
                          <circle cx={r.cx} cy={r.cy} r="1.5" className={r.color} />
                          <text 
                            x={r.cx} 
                            y={r.cy - 7} 
                            textAnchor="middle" 
                            className="text-[4px] font-black fill-white drop-shadow-md pointer-events-none"
                            style={{ textShadow: '0px 1px 2px rgba(0,0,0,0.5)' }}
                          >
                            {count}
                          </text>
                        </g>
                      </g>
                    );
                  })}
               </svg>
             </div>
          </div>
        </div>
      </div>

      {spotlightSchools.length > 0 && (
        <div className="bg-white py-24 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Featured Spotlight</h2>
                <p className="text-slate-500 font-medium text-sm mt-2">Prominent institutions leading the way in Eswatini education.</p>
              </div>
              <div className="flex items-center gap-2 text-blue-600">
                <Star className="w-6 h-6 fill-blue-600" />
                <span className="text-[10px] font-black uppercase tracking-widest">Featured</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {spotlightSchools.map(inst => (
                <div 
                  key={inst.id} 
                  onClick={() => navigate(`/school/${inst.slug}`)}
                  className="group cursor-pointer bg-slate-50 rounded-[40px] overflow-hidden border border-slate-100 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-100 transition-all duration-500"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img src={inst.coverImage || undefined} alt={inst.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest text-blue-600 flex items-center gap-1 shadow-sm">
                      <Star className="w-3 h-3 fill-blue-600" />
                      Featured
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <img src={inst.logo || undefined} alt={inst.name} className="w-12 h-12 rounded-xl border bg-white p-1" />
                      <div>
                        <h3 className="font-black text-slate-900 group-hover:text-blue-600 transition-colors">{inst.name}</h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{inst.region}</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 font-medium line-clamp-2 mb-6 leading-relaxed">
                      {inst.seo.description}
                    </p>
                    <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-emerald-500" />
                        <span className="text-[10px] font-black uppercase text-slate-400">Verified</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleCompare(inst.id);
                          }}
                          className={`text-[10px] font-black uppercase tracking-widest transition-colors ${compareList.includes(inst.id) ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                          {compareList.includes(inst.id) ? '✓ Added' : '+ Compare'}
                        </button>
                        <span className="text-blue-600 text-xs font-black uppercase tracking-widest group-hover:translate-x-2 transition-transform">View →</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Recently Added Section */}
      <div className="bg-slate-50 py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Recently Added</h2>
              <p className="text-slate-500 font-medium text-sm mt-2">The newest institutions to join our platform.</p>
            </div>
            <button 
              onClick={() => navigate('/browse')}
              className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors"
            >
              View All Schools →
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentlyAdded.map(inst => (
              <div 
                key={inst.id} 
                onClick={() => navigate(`/school/${inst.slug}`)}
                className="group cursor-pointer bg-white p-6 rounded-[32px] border border-slate-100 hover:border-blue-500 hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img src={inst.logo || undefined} alt={inst.name} className="w-10 h-10 rounded-xl border bg-slate-50 p-1" />
                  <div>
                    <h4 className="font-black text-slate-900 group-hover:text-blue-600 transition-colors text-sm truncate w-32">{inst.name}</h4>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{inst.region}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <span className="text-[8px] font-black uppercase text-slate-400">{inst.type[0]}</span>
                  <span className="text-[8px] font-black uppercase text-emerald-500">New</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Educational Partners Section */}
      <div className="bg-slate-50 py-24 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <div className="space-y-4">
              <h3 className="text-4xl font-black text-slate-900 tracking-tight">{t.partnersTitle}</h3>
              <p className="text-slate-500 font-medium text-lg">{t.partnersSub}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {institutions.filter(i => i.type.includes(InstitutionType.ASSOCIATION)).map(inst => (
              <div 
                key={inst.id}
                onClick={() => navigate(`/school/${inst.slug}`)}
                className="group cursor-pointer bg-white p-10 rounded-[48px] border border-slate-100 hover:border-red-500 hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] transition-all flex flex-col justify-between h-full bg-linear-to-br from-white to-slate-50/50"
              >
                <div className="flex items-start justify-between mb-10">
                   <div className="w-20 h-20 bg-slate-50 rounded-[24px] flex items-center justify-center p-4 group-hover:bg-red-50 transition-colors border border-slate-100">
                      <img src={inst.logo || undefined} alt={inst.name} className="w-full h-full object-contain filter " />
                   </div>
                   <div className="flex flex-col items-end gap-2">
                    <span className="text-[9px] font-black uppercase tracking-widest px-4 py-1.5 bg-red-50 text-red-600 rounded-full border border-red-100 shadow-sm">Key Stakeholder</span>
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{inst.region} Center</span>
                   </div>
                </div>
                <div>
                   <h4 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-red-600 transition-colors leading-tight">{inst.name}</h4>
                   <p className="text-slate-500 font-medium line-clamp-3 leading-relaxed">{inst.seo.description}</p>
                </div>
                <div className="mt-10 pt-10 border-t border-slate-100 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="relative flex items-center justify-center">
                        <span className="w-3 h-3 rounded-full bg-emerald-500/20 animate-ping absolute" />
                        <span className="w-2 h-2 rounded-full bg-emerald-500 relative" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">MoET Recognized</span>
                   </div>
                   <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-red-600 group-hover:text-white transition-all">
                    <Award className="w-6 h-6 text-slate-300 group-hover:text-white transition-colors" />
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {globalAds.length > 0 && (
          <div className="mb-24">
            <BannerAd ad={globalAds[0]} />
          </div>
        )}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
            <div className="bg-white p-12 rounded-[48px] border border-slate-100 shadow-sm flex flex-col justify-between">
               <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-black text-slate-900">{t.scoutTitle}</h3>
                    <div className="flex bg-slate-100 rounded-xl p-1">
                      <button 
                        onClick={() => setScoutMode('search')}
                        className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${scoutMode === 'search' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
                      >
                        {t.searchBtn}
                      </button>
                      <button 
                        onClick={() => setScoutMode('suggest')}
                        className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${scoutMode === 'suggest' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
                      >
                        {t.suggestBtn}
                      </button>
                    </div>
                  </div>
                  <p className="text-slate-500 text-sm font-medium mb-8">
                    {scoutMode === 'search' ? t.scoutSub : t.suggestSub}
                  </p>
                  <form onSubmit={handleAiScout} className="relative mb-6">
                     <input 
                        className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold text-sm pr-20" 
                        placeholder={scoutMode === 'search' ? t.searchPlaceholder : t.suggestPlaceholder} 
                        value={aiQuery}
                        onChange={e => setAiQuery(e.target.value)}
                     />
                     <button 
                        disabled={isAiLoading}
                        className="absolute right-2 top-2 bg-slate-900 text-white p-2 rounded-xl text-xs font-black uppercase tracking-widest px-4 hover:bg-blue-600 transition-colors disabled:opacity-50"
                     >
                        {isAiLoading ? 'Searching...' : 'Scout'}
                     </button>
                  </form>
                  {aiResult && (
                    <div className="bg-blue-50 p-8 rounded-[32px] text-xs font-medium text-blue-900 animate-in slide-in-from-top-4 space-y-6">
                       <p className="whitespace-pre-wrap leading-relaxed">{aiResult}</p>
                       {groundingLinks.length > 0 && (
                         <div className="pt-6 border-t border-blue-200">
                            <p className="text-[10px] font-black uppercase mb-4 opacity-50">Sources Found:</p>
                            <div className="flex flex-col gap-2">
                               {groundingLinks.map((link, idx) => (
                                 <a key={idx} href={link.web.uri} target="_blank" rel="noreferrer" className="text-blue-600 underline font-bold hover:text-blue-800 transition-colors">
                                    {link.web.title}
                                 </a>
                               ))}
                            </div>
                         </div>
                       )}
                    </div>
                  )}
               </div>
            </div>

            <div className="bg-indigo-950 p-12 rounded-[48px] text-white flex flex-col justify-between relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-10 text-8xl">🏛</div>
               <div>
                  <h3 className="text-2xl font-black mb-4">{t.moet}</h3>
                  <div className="space-y-4 mb-8">
                     <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-xl">📄</div>
                        <div>
                           <p className="text-xs font-black uppercase">Official Circular 2024/02</p>
                           <p className="text-[10px] text-slate-400">Revised Admission Policy for Grade 1</p>
                        </div>
                     </div>
                     <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-4">
                        <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-xl">✅</div>
                        <div>
                           <p className="text-xs font-black uppercase">Accreditation Audit</p>
                           <p className="text-[10px] text-slate-400">All 2023 licenses extended to June 2024</p>
                        </div>
                     </div>
                  </div>
                  <button className="text-[10px] font-black uppercase tracking-widest underline decoration-2 underline-offset-8">Visit MoET Portal</button>
               </div>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all">
               <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">🛡️</div>
               <h3 className="text-lg font-black text-slate-900 mb-2">Verified Status</h3>
               <p className="text-slate-500 text-xs font-medium leading-relaxed">Manually vetted against the MoET database for 100% credibility.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all">
               <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6">📊</div>
               <h3 className="text-lg font-black text-slate-900 mb-2">Exam Results</h3>
               <p className="text-slate-500 text-xs font-medium leading-relaxed">Direct access to national EPC, JC, and IGCSE performance stats.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all">
               <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">📍</div>
               <h3 className="text-lg font-black text-slate-900 mb-2">Regional Mapping</h3>
               <p className="text-slate-500 text-xs font-medium leading-relaxed">Geospatial data ensuring accurate placement in the correct region.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all">
               <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">💻</div>
               <h3 className="text-lg font-black text-slate-900 mb-2">Live Portals</h3>
               <p className="text-slate-500 text-xs font-medium leading-relaxed">One-click student and staff portal access for every institution.</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default HomePage;
