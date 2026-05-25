
import React from 'react';
import { Institution, BlogPost, EventItem } from '../../../../types';
import { Trash2, Calendar, MapPin, Clock, Image as ImageIcon, Video, Star } from 'lucide-react';
import MediaManager from '../ui/MediaManager';

interface NewsEditorProps {
  institution: Institution;
  onUpdate: (updatedSections: Institution['sections']) => void;
}

import SectionBaseFields from './SectionBaseFields';

const NewsEditor: React.FC<NewsEditorProps> = ({ institution, onUpdate }) => {
  const { news } = institution.sections;

  const updateField = (field: string, value: any) => {
    onUpdate({
      ...institution.sections,
      news: {
        ...news,
        [field]: value,
        lastUpdated: new Date().toISOString()
      }
    });
  };

  const addPost = () => {
    const newPost: BlogPost = {
      id: `post-${Date.now()}`,
      title: 'New Article',
      category: 'Academic',
      date: new Date().toISOString().split('T')[0],
      excerpt: 'A brief summary of the post...',
      content: '',
      image: 'https://picsum.photos/seed/news/800/400',
      media: [],
      author: 'Admin'
    };
    updateField('posts', [newPost, ...news.posts]);
    updateField('blogPosts', [newPost, ...news.posts]);
  };

  const addEvent = () => {
    const newEvent: EventItem = {
      id: `event-${Date.now()}`,
      title: 'New Upcoming Event',
      type: 'Academic',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: '09:00 AM',
      location: 'Main Hall',
      organizer: institution.name,
      description: 'Event details and description goes here.',
      registrationRequired: false,
      media: []
    };
    updateField('events', [newEvent, ...news.events]);
    updateField('eventCalendar', [newEvent, ...news.events]);
  };

  const syncSpecificFields = (field: 'posts' | 'events' | 'gallery') => {
    if (field === 'posts') {
      updateField('blogPosts', news.posts);
    } else if (field === 'events') {
      updateField('eventCalendar', news.events);
    } else if (field === 'gallery') {
      updateField('photoGallery', news.gallery.filter(m => m.type === 'image'));
      updateField('videoUploads', news.gallery.filter(m => m.type === 'video'));
    }
  };

  return (
    <div className="space-y-12">
      <SectionBaseFields 
        section={news} 
        onUpdate={updateField} 
        label="News & Media" 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-in fade-in slide-in-from-right-4">
        <div className="space-y-10 pb-20">
          <header>
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">News & Media Module</h3>
            <p className="text-sm text-slate-500 font-medium">Keep your community informed with the latest updates and events</p>
          </header>

          <div className="space-y-12">
            {/* Overview & Subscription */}
            <div className="p-8 bg-blue-50/50 rounded-[40px] border border-blue-100/50 space-y-6">
              <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Newsletter & Overview</h4>
              <div className="space-y-4">
                <div className="group">
                  <label className="block text-[8px] font-black text-blue-400 uppercase tracking-widest mb-1">Section Title</label>
                  <input 
                    className="w-full bg-white border-none rounded-xl px-4 py-2 text-xs font-black text-slate-900" 
                    value={news.overview.title} 
                    onChange={e => updateField('overview', { ...news.overview, title: e.target.value })} 
                  />
                </div>
                <div className="group">
                  <label className="block text-[8px] font-black text-blue-400 uppercase tracking-widest mb-1">Introduction</label>
                  <textarea 
                    rows={2}
                    className="w-full bg-white border-none rounded-xl px-4 py-2 text-xs font-medium text-slate-600" 
                    value={news.overview.subtitle || ''} 
                    onChange={e => updateField('overview', { ...news.overview, subtitle: e.target.value })} 
                  />
                </div>
                <div className="group">
                  <label className="block text-[8px] font-black text-blue-400 uppercase tracking-widest mb-1">Newsletter CTA Text</label>
                  <input 
                    className="w-full bg-white border-none rounded-xl px-4 py-2 text-xs font-bold text-blue-700" 
                    placeholder="e.g. Subscribe to our monthly newsletter"
                    value={news.newsletterCta || ''} 
                    onChange={e => updateField('newsletterCta', e.target.value)} 
                  />
                </div>
              </div>
            </div>

            {/* Latest News / Posts */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Latest Articles</h4>
                <button 
                  onClick={() => {
                    addPost();
                    syncSpecificFields('posts');
                  }}
                  className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline"
                >
                  + Add Article
                </button>
              </div>
              <div className="space-y-6">
                {news.posts.map((post, idx) => (
                  <div key={post.id} className="bg-slate-50 p-8 rounded-[32px] border border-slate-100 space-y-6">
                    <div className="flex justify-between items-center">
                      <input 
                        className="bg-transparent border-none font-black text-slate-900 p-0 focus:ring-0 text-sm flex-1" 
                        value={post.title} 
                        onChange={e => {
                          const newPosts = [...news.posts];
                          newPosts[idx].title = e.target.value;
                          updateField('posts', newPosts);
                          updateField('blogPosts', newPosts);
                        }}
                      />
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            const newPosts = [...news.posts];
                            newPosts[idx].isFeatured = !newPosts[idx].isFeatured;
                            updateField('posts', newPosts);
                          }}
                          className={`p-2 rounded-lg transition-all ${post.isFeatured ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-400'}`}
                        >
                          <Star className={`w-4 h-4 ${post.isFeatured ? 'fill-current' : ''}`} />
                        </button>
                        <button 
                          onClick={() => {
                            const next = news.posts.filter((_, i) => i !== idx);
                            updateField('posts', next);
                            updateField('blogPosts', next);
                          }}
                          className="text-rose-500 hover:text-rose-700 p-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    {/* ... post details ... */}
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      className="bg-white border rounded-xl px-4 py-2 text-[10px] font-bold" 
                      placeholder="Category" 
                      value={post.category} 
                      onChange={e => {
                        const newPosts = [...news.posts];
                        newPosts[idx].category = e.target.value as any;
                        updateField('posts', newPosts);
                      }}
                    />
                    <input 
                      type="date"
                      className="bg-white border rounded-xl px-4 py-2 text-[10px] font-bold" 
                      value={post.date} 
                      onChange={e => {
                        const newPosts = [...news.posts];
                        newPosts[idx].date = e.target.value;
                        updateField('posts', newPosts);
                      }}
                    />
                  </div>
                  <textarea 
                    className="w-full bg-white border rounded-xl px-4 py-2 text-[10px] font-medium"
                    placeholder="Brief excerpt..."
                    value={post.excerpt}
                    onChange={e => {
                      const newPosts = [...news.posts];
                      newPosts[idx].excerpt = e.target.value;
                      updateField('posts', newPosts);
                    }}
                  />
                  
                  <MediaManager 
                    label="Article Media"
                    media={post.media || []}
                    onChange={(m) => {
                      const newPosts = [...news.posts];
                      newPosts[idx].media = m;
                      updateField('posts', newPosts);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Upcoming Events</h4>
              <button 
                onClick={addEvent}
                className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline"
              >
                + Add Event
              </button>
            </div>
            <div className="space-y-6">
              {news.events.map((event, idx) => (
                <div key={event.id} className="bg-white p-8 rounded-[32px] border border-slate-100 space-y-6 shadow-sm group">
                  {/* ... event fields ... */}
                  <div className="flex justify-between items-center">
                    <div className="flex-1 flex gap-4">
                      <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-white shrink-0">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <input 
                        className="bg-transparent border-none font-black text-slate-900 p-0 focus:ring-0 text-sm flex-1" 
                        value={event.title} 
                        placeholder="Event Title"
                        onChange={e => {
                          const newEvents = [...news.events];
                          newEvents[idx].title = e.target.value;
                          updateField('events', newEvents);
                        }}
                      />
                    </div>
                    <button 
                      onClick={() => updateField('events', news.events.filter((_, i) => i !== idx))}
                      className="text-rose-500 hover:text-rose-700 ml-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <input 
                      placeholder="Date (e.g. 24 Oct 2024)"
                      className="bg-slate-50 border-none rounded-xl px-4 py-2 text-[10px] font-bold" 
                      value={event.date} 
                      onChange={e => {
                        const newEvents = [...news.events];
                        newEvents[idx].date = e.target.value;
                        updateField('events', newEvents);
                      }}
                    />
                    <input 
                      placeholder="Time"
                      className="bg-slate-50 border-none rounded-xl px-4 py-2 text-[10px] font-bold" 
                      value={event.time} 
                      onChange={e => {
                        const newEvents = [...news.events];
                        newEvents[idx].time = e.target.value;
                        updateField('events', newEvents);
                      }}
                    />
                    <div className="flex gap-2">
                       <button 
                         onClick={() => {
                           const newEvents = [...news.events];
                           newEvents[idx].isFeatured = !newEvents[idx].isFeatured;
                           updateField('events', newEvents);
                         }}
                         className={`flex-1 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${event.isFeatured ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-400'}`}
                       >
                         {event.isFeatured ? 'Featured' : 'Mark Featured'}
                       </button>
                       <button 
                         onClick={() => {
                           const newEvents = [...news.events];
                           newEvents[idx].isPast = !newEvents[idx].isPast;
                           updateField('events', newEvents);
                         }}
                         className={`flex-1 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${event.isPast ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-400'}`}
                       >
                         {event.isPast ? 'Archived' : 'Active'}
                       </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <input 
                      placeholder="Location"
                      className="bg-slate-50 border-none rounded-xl px-4 py-2 text-[10px] font-bold flex-1" 
                      value={event.location} 
                      onChange={e => {
                        const newEvents = [...news.events];
                        newEvents[idx].location = e.target.value;
                        updateField('events', newEvents);
                      }}
                    />
                    <input 
                      placeholder="Host / Speaker"
                      className="bg-slate-50 border-none rounded-xl px-4 py-2 text-[10px] font-bold flex-1" 
                      value={event.host || ''} 
                      onChange={e => {
                        const newEvents = [...news.events];
                        newEvents[idx].host = e.target.value;
                        updateField('events', newEvents);
                      }}
                    />
                    <input 
                      placeholder="Registration Link (External)"
                      className="bg-slate-50 border-none rounded-xl px-4 py-2 text-[10px] font-bold flex-1" 
                      value={event.registrationLink || ''} 
                      onChange={e => {
                        const newEvents = [...news.events];
                        newEvents[idx].registrationLink = e.target.value;
                        updateField('events', newEvents);
                      }}
                    />
                  </div>

                  <div className="space-y-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Event Description</p>
                    <textarea 
                      className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 text-[11px] font-medium min-h-[100px]"
                      placeholder="Detailed description of the event..."
                      value={event.description}
                      onChange={e => {
                        const newEvents = [...news.events];
                        newEvents[idx].description = e.target.value;
                        updateField('events', newEvents);
                      }}
                    />
                  </div>

                  <div className="space-y-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Optional Media URL (Direct Link)</p>
                    <input 
                      className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-[11px] font-medium"
                      placeholder="https://example.com/image-or-video.jpg"
                      value={event.mediaUrl || ''}
                      onChange={e => {
                        const newEvents = [...news.events];
                        newEvents[idx].mediaUrl = e.target.value;
                        updateField('events', newEvents);
                      }}
                    />
                  </div>

                  <div className="flex gap-4">
                     <select 
                       className="bg-slate-50 border-none rounded-xl px-4 py-2 text-[10px] font-bold flex-1"
                       value={event.type}
                       onChange={e => {
                         const newEvents = [...news.events];
                         newEvents[idx].type = e.target.value as any;
                         updateField('events', newEvents);
                       }}
                     >
                       <option value="Academic">Academic</option>
                       <option value="Sports">Sports</option>
                       <option value="Cultural">Cultural</option>
                       <option value="Meeting">Meeting</option>
                       <option value="Examination">Examination</option>
                       <option value="Community">Community</option>
                     </select>
                     <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl">
                        <input 
                          type="checkbox" 
                          id={`reg-${event.id}`}
                          checked={event.registrationRequired}
                          onChange={e => {
                            const newEvents = [...news.events];
                            newEvents[idx].registrationRequired = e.target.checked;
                            updateField('events', newEvents);
                          }}
                        />
                        <label htmlFor={`reg-${event.id}`} className="text-[9px] font-black uppercase tracking-widest text-slate-500">Reg. Required</label>
                     </div>
                  </div>

                  <MediaManager 
                    label="Event Photos/Videos"
                    media={event.media || []}
                    onChange={(m) => {
                      const newEvents = [...news.events];
                      newEvents[idx].media = m;
                      updateField('events', newEvents);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Main Gallery */}
          <div className="space-y-6 pt-6 border-t border-slate-100">
             <MediaManager 
               label="Main Institution Gallery"
               media={news.gallery || []}
               onChange={(m) => updateField('gallery', m)}
             />
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <header>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Section Overview Preview</h3>
        </header>
        
        <div className="sticky top-8 space-y-6">
          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
             <div className="space-y-2">
                <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest">News & Media</p>
                <h4 className="text-2xl font-black text-slate-900 tracking-tight">{news.overview.title}</h4>
             </div>

             <div className="space-y-6">
               <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Recent Post</h5>
               {news.posts.slice(0, 1).map(post => (
                 <div key={post.id} className="group cursor-pointer space-y-4">
                   <div className="aspect-video rounded-3xl overflow-hidden shadow-sm">
                     <img src={post.image || undefined} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={post.title} />
                   </div>
                   <div className="space-y-2">
                     <h6 className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors">{post.title}</h6>
                     <p className="text-[10px] font-medium text-slate-500 line-clamp-2">{post.excerpt}</p>
                   </div>
                 </div>
               ))}
             </div>

             <div className="pt-6 border-t border-slate-100 space-y-6">
                <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Upcoming Event</h5>
                {news.events.filter(e => !e.isPast).slice(0, 1).map(event => (
                  <div key={event.id} className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-12 h-12 bg-slate-900 rounded-xl flex flex-col items-center justify-center text-white shrink-0">
                       <span className="text-[8px] font-black uppercase opacity-60 leading-none">{event.date.split(' ')[0]}</span>
                       <span className="text-lg font-black leading-none">{event.date.split(' ')[1]}</span>
                    </div>
                    <div className="space-y-1">
                       <h6 className="text-xs font-black text-slate-900 line-clamp-1">{event.title}</h6>
                       <div className="flex items-center gap-3 text-[8px] font-bold text-slate-400">
                          <span className="flex items-center gap-1"><MapPin className="w-2 h-2" /> {event.location}</span>
                          <span className="flex items-center gap-1"><Clock className="w-2 h-2" /> {event.time}</span>
                       </div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};


export default NewsEditor;
