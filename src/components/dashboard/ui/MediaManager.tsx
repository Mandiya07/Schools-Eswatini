
import React, { useState } from 'react';
import { Image, Video, Plus, Trash2, Link as LinkIcon, X } from 'lucide-react';

interface MediaItem {
  url: string;
  caption?: string;
  type: 'image' | 'video';
}

interface MediaManagerProps {
  media: MediaItem[];
  onChange: (updatedMedia: MediaItem[]) => void;
  label?: string;
}

const MediaManager: React.FC<MediaManagerProps> = ({ media = [], onChange, label = "Gallery & Media" }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [newItem, setNewItem] = useState<MediaItem>({ url: '', caption: '', type: 'image' });

  const addItem = () => {
    if (!newItem.url) return;
    onChange([...media, newItem]);
    setNewItem({ url: '', caption: '', type: 'image' });
    setShowAdd(false);
  };

  const removeItem = (idx: number) => {
    onChange(media.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</label>
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className="text-blue-600 hover:text-blue-700 transition-colors"
        >
          {showAdd ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </button>
      </div>

      {showAdd && (
        <div className="bg-white p-4 rounded-2xl border border-blue-100 shadow-sm space-y-3 animate-in fade-in slide-in-from-top-2">
          <div className="flex gap-2">
            <button 
              onClick={() => setNewItem({ ...newItem, type: 'image' })}
              className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${newItem.type === 'image' ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-500'}`}
            >
              <Image className="w-3 h-3" /> Photo
            </button>
            <button 
              onClick={() => setNewItem({ ...newItem, type: 'video' })}
              className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${newItem.type === 'video' ? 'bg-rose-600 text-white' : 'bg-slate-50 text-slate-500'}`}
            >
              <Video className="w-3 h-3" /> Video
            </button>
          </div>
          <div className="space-y-2">
            <div className="relative">
              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
              <input 
                className="w-full bg-slate-50 border-none rounded-xl pl-8 pr-4 py-2 text-[10px] font-bold" 
                placeholder="Media URL (e.g. YouTube or direct link)"
                value={newItem.url}
                onChange={e => setNewItem({ ...newItem, url: e.target.value })}
              />
            </div>
            <input 
              className="w-full bg-slate-50 border-none rounded-xl px-4 py-2 text-[10px] font-bold" 
              placeholder="Caption (optional)"
              value={newItem.caption}
              onChange={e => setNewItem({ ...newItem, caption: e.target.value })}
            />
          </div>
          <button 
            onClick={addItem}
            disabled={!newItem.url}
            className="w-full py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest disabled:opacity-50"
          >
            Add to Gallery
          </button>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        {media.map((item, idx) => (
          <div key={idx} className="relative group w-20 h-20 rounded-xl overflow-hidden shadow-sm bg-slate-100 border border-slate-200">
            {item.type === 'image' ? (
              <img src={item.url} className="w-full h-full object-cover" alt={item.caption} />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-800 text-white">
                <Video className="w-6 h-6" />
              </div>
            )}
            <button 
              onClick={() => removeItem(idx)}
              className="absolute top-1 right-1 p-1 bg-white/90 text-rose-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
            >
              <Trash2 className="w-3 h-3" />
            </button>
            {item.caption && (
              <div className="absolute inset-x-0 bottom-0 bg-black/60 p-1">
                <p className="text-[6px] text-white font-medium truncate">{item.caption}</p>
              </div>
            )}
          </div>
        ))}
        {media.length === 0 && !showAdd && (
          <div className="w-full py-6 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center gap-2 grayscale opacity-50">
            <Image className="w-5 h-5 text-slate-400" />
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">No media attached<br/><span className="text-[8px] font-medium lowercase">Click + to adds images/videos</span></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaManager;
