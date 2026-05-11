
import React, { useState, useRef } from 'react';
import { Institution } from '../../types';
import { Image as ImageIcon, Video, Trash2, Upload, Plus, ExternalLink, Loader2 } from 'lucide-react';
import { uploadFile } from '../services/storageService';

interface MediaManagerProps {
  institution: Institution;
  onUpdate: (inst: Institution) => void;
}

const MediaManager: React.FC<MediaManagerProps> = ({ institution, onUpdate }) => {
  const [activeTab, setActiveTab] = useState<'images' | 'videos'>('images');
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [newMediaTitle, setNewMediaTitle] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const path = `institutions/${institution.id}/gallery/${Date.now()}_${file.name}`;
      const url = await uploadFile(path, file);
      
      const updatedGallery = [...(institution.sections.news.gallery || [])];
      updatedGallery.push({
        id: crypto.randomUUID(),
        url: url,
        title: file.name.split('.')[0],
        type: 'image',
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
    } catch (error) {
      console.error("Gallery upload failed", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

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
        
        {activeTab === 'images' ? (
          <div className="space-y-6">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="p-12 border-2 border-dashed border-slate-200 rounded-[32px] bg-white flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all group overflow-hidden relative"
            >
              <input 
                type="file" 
                className="hidden" 
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
              />
              {isUploading ? (
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                  <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Uploading to Gallery...</p>
                </div>
              ) : (
                <>
                  <Upload className="w-10 h-10 text-slate-300 mb-2 group-hover:text-blue-500 transition-colors" />
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Click to Upload Image</p>
                  <p className="text-[9px] text-slate-400 font-bold mt-1">Direct upload to Firebase Storage</p>
                </>
              )}
            </div>
            
            <div className="relative flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">OR USE URL</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Image URL</label>
                <input 
                  className="w-full bg-white border rounded-xl px-4 py-3 font-bold text-sm" 
                  placeholder="https://..."
                  value={newMediaUrl}
                  onChange={e => setNewMediaUrl(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Title / Caption</label>
                <input 
                  className="w-full bg-white border rounded-xl px-4 py-3 font-bold text-sm" 
                  placeholder="e.g. Science Lab 2024"
                  value={newMediaTitle}
                  onChange={e => setNewMediaTitle(e.target.value)}
                />
              </div>
            </div>
            <button 
              onClick={handleAddMedia}
              disabled={!newMediaUrl}
              className="bg-slate-900 disabled:bg-slate-200 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-blue-600 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add via URL
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Video URL (YouTube/Vimeo)</label>
                <input 
                  className="w-full bg-white border rounded-xl px-4 py-3 font-bold text-sm" 
                  placeholder="https://..."
                  value={newMediaUrl}
                  onChange={e => setNewMediaUrl(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Video Title</label>
                <input 
                  className="w-full bg-white border rounded-xl px-4 py-3 font-bold text-sm" 
                  placeholder="e.g. Sports Day Highlights"
                  value={newMediaTitle}
                  onChange={e => setNewMediaTitle(e.target.value)}
                />
              </div>
            </div>
            <button 
              onClick={handleAddMedia}
              disabled={!newMediaUrl}
              className="bg-slate-900 disabled:bg-slate-200 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-blue-600 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Video
            </button>
          </div>
        )}
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
