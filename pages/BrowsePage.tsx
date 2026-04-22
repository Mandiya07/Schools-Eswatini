
import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Institution, Region, InstitutionType, GenderType } from '../types';
import MapComponent from '../components/MapComponent';
import Advertisement from '../components/Advertisement';
import { GoogleGenAI } from "@google/genai";

interface BrowsePageProps {
  institutions: Institution[];
  region: Region | null;
  onSelectRegion: (region: Region | null) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  compareList: string[];
  onToggleCompare: (id: string) => void;
  lang: 'en' | 'ss';
}

const BrowsePage: React.FC<BrowsePageProps> = ({ 
  institutions, region, onSelectRegion, favorites, onToggleFavorite, compareList, onToggleCompare, lang 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedGender, setSelectedGender] = useState<string>('All');
  const [selectedOwnership, setSelectedOwnership] = useState<string>('All');
  const [boardingOnly, setBoardingOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [sortBy, setSortBy] = useState<'featured' | 'az' | 'newest' | 'views'>('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [aiQuery, setAiQuery] = useState('');
  const [isAiSearching, setIsAiSearching] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);

  const handleAiSearch = async () => {
    if (!aiQuery.trim()) return;
    setIsAiSearching(true);
    try {
      const ai = new GoogleGenAI({ apiKey: (import.meta as any).env.VITE_GEMINI_API_KEY || 'mock-key' });
      const prompt = `
        Given the user query: "${aiQuery}"
        And the following list of institutions:
        ${institutions.map(i => `- ${i.name} (${i.region}, ${i.type.join(', ')}, ${i.metadata.gender}, Boarding: ${i.metadata.isBoarding})`).join('\n')}
        
        Return a JSON array of strings containing ONLY the exact names of the institutions that best match the query.
        Example output: ["Waterford Kamhlaba", "St. Mark's High School"]
      `;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        }
      });
      
      const result = JSON.parse(response.text || '[]');
      setAiSuggestions(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error("AI Search failed:", error);
    } finally {
      setIsAiSearching(false);
    }
  };

  const filteredInstitutions = useMemo(() => {
    return institutions
      .filter(inst => {
        if (aiSuggestions && aiSuggestions.length > 0) {
          return aiSuggestions.includes(inst.name);
        }
        const matchesRegion = region ? inst.region === region : true;
        const matchesSearch = (inst.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                              (inst.region || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                              (inst.type || []).some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesType = selectedType === 'All' || inst.type?.includes(selectedType as InstitutionType);
        const matchesOwnership = selectedOwnership === 'All' || inst.type?.includes(selectedOwnership as InstitutionType);
        const matchesGender = selectedGender === 'All' || inst.metadata.gender === selectedGender;
        const matchesBoarding = !boardingOnly || inst.metadata.isBoarding;
        return matchesRegion && matchesSearch && matchesType && matchesOwnership && matchesGender && matchesBoarding && inst.status === 'published';
      })
      .sort((a, b) => {
        if (sortBy === 'featured') {
          return a.isFeatured === b.isFeatured ? 0 : a.isFeatured ? -1 : 1;
        }
        if (sortBy === 'az') {
          return a.name.localeCompare(b.name);
        }
        if (sortBy === 'newest') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        if (sortBy === 'views') {
          return b.stats.views - a.stats.views;
        }
        return 0;
      });
  }, [institutions, region, searchTerm, selectedType, selectedOwnership, selectedGender, boardingOnly, aiSuggestions, sortBy]);

  const totalPages = Math.ceil(filteredInstitutions.length / itemsPerPage);
  const paginatedInstitutions = filteredInstitutions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, region, selectedType, selectedOwnership, selectedGender, boardingOnly, aiSuggestions, sortBy]);

  if (!region) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-4xl w-full text-center space-y-12">
          <div className="space-y-4">
            <h1 className="text-5xl font-black text-slate-900 tracking-tight">Select a Region</h1>
            <p className="text-slate-500 font-medium text-lg">Please select a region to start browsing institutions in Eswatini.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.values(Region).map(r => (
              <button 
                key={r}
                onClick={() => onSelectRegion(r)}
                className="bg-white p-12 rounded-[40px] border-2 border-transparent hover:border-blue-600 hover:shadow-2xl transition-all group relative overflow-hidden text-left"
              >
                <div className="relative z-10">
                  <h3 className="text-3xl font-black text-slate-900 mb-2">{r}</h3>
                  <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Explore Institutions →</p>
                </div>
                <div className="absolute -right-4 -bottom-4 text-8xl opacity-5 group-hover:opacity-10 transition-opacity">
                  {r === Region.HHOHHO ? '🏙️' : r === Region.MANZINI ? '🏭' : r === Region.LUBOMBO ? '🌾' : '⛰️'}
                </div>
              </button>
            ))}
          </div>
          <Link to="/" className="inline-block text-slate-400 font-black uppercase tracking-widest text-[10px] hover:text-slate-600 transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Filters Sidebar */}
          <aside className="lg:w-72 shrink-0 space-y-10">
            <div>
               <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">Explore</h1>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Discovery Engine v2.5</p>
            </div>

            <div className="space-y-8">
               <section className="space-y-4">
                  <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                    <span className="text-blue-600">✨</span> AI Smart Search
                  </label>
                  <div className="relative flex flex-col gap-2">
                     <textarea 
                        placeholder="e.g., 'Looking for a boys boarding school in Hhohho with a strong science program'"
                        className="w-full bg-blue-50/50 border border-blue-100 rounded-2xl px-5 py-4 text-sm font-medium shadow-sm focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                        rows={3}
                        value={aiQuery}
                        onChange={e => setAiQuery(e.target.value)}
                     />
                     <button 
                        onClick={handleAiSearch}
                        disabled={isAiSearching || !aiQuery.trim()}
                        className="bg-blue-600 text-white px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                     >
                        {isAiSearching ? (
                          <><span className="animate-spin">⏳</span> Analyzing...</>
                        ) : 'Find Matches'}
                     </button>
                     {aiSuggestions.length > 0 && (
                        <button 
                          onClick={() => { setAiSuggestions([]); setAiQuery(''); }}
                          className="text-[10px] font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest mt-2"
                        >
                          Clear AI Filters
                        </button>
                     )}
                  </div>
               </section>

               <section className="space-y-4">
                  <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Keyword Search</label>
                  <div className="relative">
                     <input 
                        type="text"
                        placeholder="School name or city..."
                        className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold shadow-sm focus:ring-2 focus:ring-blue-500 transition-all"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                     />
                  </div>
               </section>

               <section className="space-y-4">
                  <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Region</label>
                  <div className="flex flex-col gap-2">
                     {Object.values(Region).map(r => (
                        <button key={r} onClick={() => onSelectRegion(r)} className={`text-left px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${region === r ? 'bg-blue-600 text-white shadow-lg' : 'bg-white border text-slate-500 hover:border-slate-300'}`}>{r}</button>
                     ))}
                  </div>
               </section>

               <section className="space-y-4">
                  <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Level</label>
                  <div className="flex flex-col gap-2">
                     {['All', InstitutionType.PRIMARY, InstitutionType.HIGH_SCHOOL, InstitutionType.TERTIARY, InstitutionType.ASSOCIATION].map(type => (
                        <button 
                          key={type} 
                          onClick={() => setSelectedType(type)} 
                          className={`text-left px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedType === type ? 'bg-slate-900 text-white shadow-lg' : 'bg-white border text-slate-500 hover:border-slate-300'}`}
                        >
                          {type === 'All' ? 'All Levels' : type === InstitutionType.ASSOCIATION ? 'Professional Bodies' : type}
                        </button>
                     ))}
                  </div>
               </section>

               <section className="space-y-4">
                  <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Ownership</label>
                  <div className="flex flex-col gap-2">
                     {['All', InstitutionType.PUBLIC, InstitutionType.PRIVATE].map(ownership => (
                        <button 
                          key={ownership} 
                          onClick={() => setSelectedOwnership(ownership)} 
                          className={`text-left px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedOwnership === ownership ? 'bg-slate-900 text-white shadow-lg' : 'bg-white border text-slate-500 hover:border-slate-300'}`}
                        >
                          {ownership === 'All' ? 'All Ownership' : ownership}
                        </button>
                     ))}
                  </div>
               </section>

               <section className="space-y-4">
                  <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Student Mix</label>
                  <div className="grid grid-cols-2 gap-2">
                     {['All', GenderType.MIXED, GenderType.BOYS, GenderType.GIRLS].map(g => (
                        <button key={g} onClick={() => setSelectedGender(g)} className={`px-3 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all ${selectedGender === g ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-400 hover:border-slate-300'}`}>{g}</button>
                     ))}
                  </div>
               </section>

               <section className="flex items-center justify-between p-5 bg-white border rounded-2xl">
                  <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Boarding Facilities</span>
                  <button 
                    onClick={() => setBoardingOnly(!boardingOnly)}
                    className={`w-10 h-6 rounded-full transition-all relative ${boardingOnly ? 'bg-blue-600' : 'bg-slate-200'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${boardingOnly ? 'left-5' : 'left-1'}`} />
                  </button>
               </section>

               <div className="pt-6">
                 <Advertisement type="sidebar" />
               </div>
            </div>
          </aside>

          {/* Results Area */}
          <main className="flex-1">
            <Advertisement type="banner" className="mb-8" />
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
               <div className="flex items-center gap-4">
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{filteredInstitutions.length} Results Found</p>
                 <div className="w-1 h-1 bg-slate-300 rounded-full" />
                 <select 
                   className="bg-transparent border-none text-xs font-black text-slate-900 uppercase tracking-widest cursor-pointer focus:ring-0"
                   value={sortBy}
                   onChange={(e) => setSortBy(e.target.value as any)}
                 >
                   <option value="featured">Featured First</option>
                   <option value="az">Name (A-Z)</option>
                   <option value="newest">Recently Added</option>
                   <option value="views">Most Popular</option>
                 </select>
               </div>
               <div className="h-px flex-1 mx-8 bg-slate-200 hidden lg:block" />
               <div className="flex bg-slate-100 p-1 rounded-xl">
                 <button 
                   onClick={() => setViewMode('list')}
                   className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                 >
                   List View
                 </button>
                 <button 
                   onClick={() => setViewMode('map')}
                   className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'map' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                 >
                   Map View
                 </button>
               </div>
            </div>

            {viewMode === 'list' ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">
                  {paginatedInstitutions.map(inst => (
                      <div key={inst.id} className="bg-white rounded-[40px] overflow-hidden border border-slate-100 transition-all hover:shadow-2xl flex flex-col group relative">
                        {inst.isFeatured && (
                          <div className="absolute top-6 left-6 z-20 bg-blue-600 text-white px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-[0.15em] shadow-xl flex items-center gap-2">
                              <span className="animate-pulse w-1.5 h-1.5 bg-white rounded-full" />
                              Featured Institution
                          </div>
                        )}
                        
                        <div className="absolute top-6 right-6 z-20 flex flex-col gap-2">
                          <button 
                            onClick={() => onToggleCompare(inst.id)}
                            className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all shadow-xl ${compareList.includes(inst.id) ? 'bg-blue-600 text-white' : 'bg-white/80 backdrop-blur-md text-slate-900 hover:bg-white'}`}
                          >
                            {compareList.includes(inst.id) ? '✓' : '+'}
                          </button>
                        </div>

                        <Link to={`/school/${inst.slug}`} className="block relative h-72 overflow-hidden">
                          <img src={inst.coverImage || undefined} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" loading="lazy" />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60" />
                          <div className="absolute bottom-6 left-6 flex gap-2">
                              {inst.metadata.isBoarding && <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-[8px] font-black text-white uppercase">Boarding</span>}
                              <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-[8px] font-black text-white uppercase">{inst.metadata.gender}</span>
                          </div>
                        </Link>

                        <div className="p-10 flex-grow">
                          <div className="flex justify-between items-start mb-4">
                              <div>
                                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">{inst.region}</p>
                                <h3 className="text-3xl font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-tight flex items-center gap-2">
                                  {inst.name}
                                  {inst.isVerified && (
                                    <span className="text-emerald-500 text-xl" title="Verified Institution">✅</span>
                                  )}
                                </h3>
                              </div>
                              <div className="bg-slate-50 p-2 rounded-2xl border shrink-0">
                                <img src={inst.logo || undefined} className="w-8 h-8 object-contain" />
                              </div>
                          </div>

                          <div className="flex items-center gap-4 mb-6">
                              <div className="flex text-amber-400">
                                {'★★★★★'.split('').map((s, i) => <span key={i} className={i < 4 ? 'opacity-100' : 'opacity-20'}>{s}</span>)}
                              </div>
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">(4.0) 12 Reviews</span>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-8">
                              {inst.type.map(t => (
                                <span key={t} className="px-3 py-1 bg-slate-100 rounded-lg text-[8px] font-black uppercase text-slate-500">{t}</span>
                              ))}
                          </div>

                          <div className="pt-8 border-t flex items-center justify-between mt-auto">
                              <div className="flex gap-8">
                                <div>
                                    <p className="text-[8px] font-black text-slate-300 uppercase mb-1">Pass Rate</p>
                                    <p className="text-lg font-black text-emerald-500">{inst.sections.academics.performance.passRate}</p>
                                </div>
                                <div>
                                    <p className="text-[8px] font-black text-slate-300 uppercase mb-1">Established</p>
                                    <p className="text-lg font-black text-slate-900">{inst.metadata.establishedYear}</p>
                                </div>
                              </div>
                              <Link 
                                to={`/school/${inst.slug}`} 
                                className="bg-slate-900 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-100"
                              >
                                Profile
                              </Link>
                          </div>
                        </div>
                    </div>
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="mt-16 flex justify-center items-center gap-4">
                    <button 
                      disabled={currentPage === 1}
                      onClick={() => { setCurrentPage(prev => prev - 1); window.scrollTo(0, 0); }}
                      className="w-12 h-12 rounded-2xl border bg-white flex items-center justify-center font-black text-slate-400 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      ←
                    </button>
                    <div className="flex gap-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button 
                          key={page}
                          onClick={() => { setCurrentPage(page); window.scrollTo(0, 0); }}
                          className={`w-12 h-12 rounded-2xl font-black text-xs transition-all ${currentPage === page ? 'bg-slate-900 text-white shadow-xl' : 'bg-white border text-slate-400 hover:text-slate-900'}`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                    <button 
                      disabled={currentPage === totalPages}
                      onClick={() => { setCurrentPage(prev => prev + 1); window.scrollTo(0, 0); }}
                      className="w-12 h-12 rounded-2xl border bg-white flex items-center justify-center font-black text-slate-400 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      →
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="animate-in fade-in zoom-in-95 duration-500">
                <MapComponent institutions={filteredInstitutions} />
              </div>
            )}

            {filteredInstitutions.length === 0 && (
              <div className="py-32 text-center space-y-6">
                <div className="text-6xl">🔍</div>
                <h3 className="text-2xl font-black text-slate-900">No schools match your search</h3>
                <p className="text-slate-500 max-w-xs mx-auto text-sm font-medium">Try adjusting your filters or search for a different region.</p>
                <button onClick={() => { setSearchTerm(''); onSelectRegion(null); setSelectedType('All'); }} className="text-blue-600 font-black uppercase tracking-widest text-xs">Reset Filters</button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default BrowsePage;
