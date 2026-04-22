
import React, { useState } from 'react';
import { Institution } from '../../types';
import { Image as ImageIcon, Video, Trash2, Upload, Plus, ExternalLink } from 'lucide-react';

interface MediaManagerProps {
  institution: Institution;
  onUpdate: (inst: Institution) => void;
}

const MediaManager: React.FC<MediaManagerProps> = ({ institution, onUpdate }) => {
  const [activeTab, setActiveTab] = useState<'images' | 'videos'>('images');
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [newMediaTitle, setNewMediaTitle] = useState('');

  const handleAddMedia = () => {
    if (!newMediaUrl) return;

    const updatedGallery = [...(institution.sections.news.gallery || [])];
    updatedGallery.push({
      id: crypto.randomUUID(),
      url: newMediaUrl,
      title: newMediaTitle || 'Gallery Image',
      type: activeTab === 'images' ? 'image' : 'video',
      createdAt: new Date().toISOString()
    });

    onUpdate({
      ...institution,
      sections: {
        ...institution.sections,
        news: {
          ...institution.sections.news,
          gallery: updatedGallery
        }
      }
    });

    setNewMediaUrl('');
    setNewMediaTitle('');
  };

  const handleRemoveMedia = (id: string) => {
    const updatedGallery = (institution.sections.news.gallery || []).filter(item => item.id !== id);
    onUpdate({
      ...institution,
      sections: {
        ...institution.sections,
        news: {
          ...institution.sections.news,
          gallery: updatedGallery
        }
      }
    });
  };

  const gallery = institution.sections.news.gallery || [];
  const filteredGallery = gallery.filter(item => item.type === (activeTab === 'images' ? 'image' : 'video'));

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">Media Manager</h3>
          <p className="text-sm text-slate-500 font-medium">Manage your institution's visual assets and gallery</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab('images')}
            className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'images' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <ImageIcon className="w-4 h-4 inline-block mr-2" />
            Images
          </button>
          <button 
            onClick={() => setActiveTab('videos')}
            className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'videos' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <Video className="w-4 h-4 inline-block mr-2" />
            Videos
          </button>
        </div>
      </div>

      <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100">
        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Add New {activeTab === 'images' ? 'Image' : 'Video'}</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{activeTab === 'images' ? 'Image' : 'Video'} URL</label>
            <input 
              className="w-full bg-white border rounded-xl px-4 py-3 font-bold" 
              placeholder="https://..."
              value={newMediaUrl}
              onChange={e => setNewMediaUrl(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Title / Caption</label>
            <input 
              className="w-full bg-white border rounded-xl px-4 py-3 font-bold" 
              placeholder="e.g. Science Lab 2024"
              value={newMediaTitle}
              onChange={e => setNewMediaTitle(e.target.value)}
            />
          </div>
        </div>
        <button 
          onClick={handleAddMedia}
          className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-blue-600 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add to Gallery
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGallery.map((item) => (
          <div key={item.id} className="group relative bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all">
            <div className="aspect-video relative overflow-hidden bg-slate-100">
              {item.type === 'image' ? (
                <img src={item.url || undefined} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Video className="w-12 h-12 text-slate-300" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <a href={item.url} target="_blank" rel="noreferrer" className="p-3 bg-white rounded-full text-slate-900 hover:bg-blue-600 hover:text-white transition-all">
                  <ExternalLink className="w-5 h-5" />
                </a>
                <button 
                  onClick={() => handleRemoveMedia(item.id)}
                  className="p-3 bg-white rounded-full text-rose-600 hover:bg-rose-600 hover:text-white transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h5 className="font-black text-slate-900 truncate">{item.title}</h5>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">{new Date(item.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
        {filteredGallery.length === 0 && (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-100 rounded-[40px]">
            <div className="text-4xl mb-4">📸</div>
            <p className="text-slate-400 font-bold">No {activeTab} in your gallery yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaManager;
