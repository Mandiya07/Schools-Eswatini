
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Tag, 
  ChevronRight, 
  Search, 
  Filter, 
  ArrowRight, 
  Bell, 
  Image as ImageIcon, 
  PlayCircle, 
  Mail,
  Share2,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { Institution, BlogPost, EventItem } from '../../types';

interface NewsEventsSectionProps {
  news: Institution['sections']['news'];
  primaryColor: string;
}

const NewsEventsSection: React.FC<NewsEventsSectionProps> = ({ news, primaryColor }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = ['All', 'Academic', 'Sports', 'Events', 'Announcements', 'Achievements', 'Community'];

  const filteredPosts = news.posts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = (post.title || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (post.excerpt || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = news.posts.find(p => p.id === news.featuredPostId) || news.posts[0];
  const upcomingEvents = news.events.filter(e => !e.isPast);
  const pastEvents = news.events.filter(e => e.isPast);

  return (
    <div className="space-y-32 pb-20">
      {/* Section Header */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <h2 className="text-7xl font-black text-slate-900 tracking-tighter leading-[0.9]">
              {news.overview.title}
            </h2>
            <p className="text-2xl text-slate-500 font-medium leading-relaxed max-w-2xl">
              {news.overview.description}
            </p>
          </div>
          <div className="flex items-center gap-4 p-2 bg-slate-100 rounded-[32px]">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search updates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-14 pr-8 py-4 bg-white rounded-[24px] border-none focus:ring-2 focus:ring-blue-500 text-sm font-bold w-64 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Categories Ticker */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide">
          <div className="p-2 bg-slate-50 rounded-2xl flex items-center gap-2 mr-4">
            <Filter className="w-4 h-4 text-slate-400 ml-2" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 pr-2">Filter</span>
          </div>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                activeCategory === cat 
                ? 'bg-slate-900 text-white shadow-xl scale-105' 
                : 'bg-white border border-slate-100 text-slate-500 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured News Hero */}
      {featuredPost && (
        <section className="group relative h-[600px] rounded-[80px] overflow-hidden shadow-3xl cursor-pointer">
          <img src={featuredPost.image || undefined} 
            alt={featuredPost.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full p-12 md:p-20 space-y-8">
            <div className="flex items-center gap-4">
              <span className="px-5 py-2 bg-blue-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                Featured Story
              </span>
              <span className="text-white/60 text-[10px] font-black uppercase tracking-widest">
                {featuredPost.date}
              </span>
            </div>
            <div className="max-w-4xl space-y-6">
              <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
                {featuredPost.title}
              </h3>
              <p className="text-xl text-slate-300 font-medium leading-relaxed line-clamp-2">
                {featuredPost.excerpt}
              </p>
            </div>
            <button className="flex items-center gap-3 text-white font-black uppercase tracking-[0.2em] text-[10px] group-hover:gap-6 transition-all">
              Read Full Article <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      )}

      {/* News Grid & Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Latest News Grid */}
        <div className="lg:col-span-2 space-y-12">
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Latest News</h3>
            <div className="flex gap-2">
              <button onClick={() => setViewMode('grid')} className={`p-3 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-400'}`}>
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post, idx) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="bg-white border border-slate-100 rounded-[56px] overflow-hidden hover:shadow-2xl transition-all group cursor-pointer"
                >
                  <div className="h-64 overflow-hidden relative">
                    <img src={post.image || undefined} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest text-slate-900 shadow-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-10 space-y-6">
                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <span>{post.date}</span>
                      {post.author && (
                        <>
                          <span className="w-1 h-1 bg-slate-200 rounded-full" />
                          <span>By {post.author}</span>
                        </>
                      )}
                    </div>
                    <h4 className="text-2xl font-black text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-slate-500 font-medium leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="pt-6 border-t border-slate-50 flex justify-between items-center">
                      <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
                        Read More <ChevronRight className="w-3 h-3" />
                      </span>
                      <button className="p-3 text-slate-300 hover:text-blue-600 transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Sidebar: Events & Announcements */}
        <aside className="space-y-16">
          {/* Upcoming Events */}
          <section className="space-y-10">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Upcoming Events</h3>
              <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">View All</button>
            </div>
            <div className="space-y-6">
              {upcomingEvents.map(event => (
                <div key={event.id} className="p-8 bg-slate-50 border border-slate-100 rounded-[40px] hover:bg-white hover:shadow-xl transition-all group cursor-pointer">
                  <div className="flex gap-6">
                    <div className="w-16 h-16 bg-slate-900 rounded-2xl flex flex-col items-center justify-center text-white shrink-0 shadow-lg">
                      <span className="text-[9px] font-black uppercase opacity-60 mb-0.5">{event.date.split(' ')[0]}</span>
                      <span className="text-xl font-black">{event.date.split(' ')[1]}</span>
                    </div>
                    <div className="space-y-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-[8px] font-black uppercase tracking-widest">
                        {event.type}
                      </span>
                      <h4 className="text-lg font-black text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                        {event.title}
                      </h4>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-slate-200/50 grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                      <Clock className="w-3 h-3" /> {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                      <MapPin className="w-3 h-3" /> {event.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Announcements */}
          <section className="p-10 bg-blue-600 rounded-[56px] text-white space-y-8 relative overflow-hidden shadow-2xl shadow-blue-500/20">
            <div className="absolute top-0 right-0 p-10 opacity-10">
              <Bell className="w-24 h-24" />
            </div>
            <div className="relative z-10 space-y-6">
              <h3 className="text-2xl font-black tracking-tight">Quick Notices</h3>
              <div className="space-y-6">
                <div className="p-6 bg-white/10 rounded-3xl border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-rose-500 rounded-full text-[8px] font-black uppercase tracking-widest">High Priority</span>
                    <span className="text-[9px] font-bold opacity-60">Today</span>
                  </div>
                  <p className="text-sm font-bold leading-relaxed">Term 3 Examination Timetable is now available for download.</p>
                </div>
                <div className="p-6 bg-white/10 rounded-3xl border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-amber-500 rounded-full text-[8px] font-black uppercase tracking-widest">Medium</span>
                    <span className="text-[9px] font-bold opacity-60">Yesterday</span>
                  </div>
                  <p className="text-sm font-bold leading-relaxed">Reminder: School fees for the upcoming term are due by Nov 30th.</p>
                </div>
              </div>
              <button className="w-full py-4 bg-white text-blue-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-colors shadow-xl">
                View All Notices
              </button>
            </div>
          </section>

          {/* Newsletter Signup */}
          <section className="p-10 bg-slate-900 rounded-[56px] text-white space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-black tracking-tight">{news.newsletterCta}</h3>
              <p className="text-sm text-slate-400 font-medium leading-relaxed">
                Get the latest updates delivered directly to your inbox every month.
              </p>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input 
                  type="email" 
                  placeholder="Your email address"
                  className="w-full pl-14 pr-6 py-5 bg-white/5 border border-white/10 rounded-3xl focus:ring-2 focus:ring-blue-500 text-sm font-bold transition-all"
                />
              </div>
              <button className="w-full py-5 bg-blue-600 text-white rounded-3xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-2xl shadow-blue-500/20">
                Subscribe Now
              </button>
            </div>
          </section>
        </aside>
      </div>

      {/* Media Gallery */}
      <section className="space-y-16">
        <div className="flex items-end justify-between">
          <div className="space-y-4">
            <h3 className="text-4xl font-black text-slate-900 tracking-tight">Media Gallery</h3>
            <p className="text-slate-500 font-medium">Visual highlights from our campus and events</p>
          </div>
          <div className="flex gap-4">
            <button className="px-8 py-3 bg-slate-50 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">Photos</button>
            <button className="px-8 py-3 bg-slate-50 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">Videos</button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {news.gallery.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className={`relative rounded-[40px] overflow-hidden group cursor-pointer shadow-sm ${
                idx === 0 ? 'col-span-2 row-span-2 h-[600px]' : 'h-[288px]'
              }`}
            >
              <img src={item.url || undefined} alt={item.caption} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="flex items-center gap-3 mb-2">
                  {item.type === 'photo' ? <ImageIcon className="w-4 h-4 text-white" /> : <PlayCircle className="w-4 h-4 text-white" />}
                  <span className="text-[9px] font-black text-white uppercase tracking-widest">{item.type}</span>
                </div>
                <p className="text-lg font-bold text-white leading-tight">{item.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default NewsEventsSection;
