import React from 'react';
import { ImageIcon, Clock, Type, FileText, ToggleLeft, ToggleRight } from 'lucide-react';

interface SectionBaseFieldsProps {
  section: {
    title?: string;
    content?: string;
    enabled?: boolean;
    mediaUrls?: string[];
    lastUpdated?: string;
  };
  onUpdate: (field: string, value: any) => void;
  label: string;
}

const SectionBaseFields: React.FC<SectionBaseFieldsProps> = ({ section, onUpdate, label }) => {
  return (
    <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-bold">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">{label} Configuration</h4>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Base section properties</p>
          </div>
        </div>
        <button 
          onClick={() => onUpdate('enabled', !section.enabled)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${section.enabled ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-50 text-slate-400 border border-slate-100'}`}
        >
          {section.enabled ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
          {section.enabled ? 'Enabled' : 'Disabled'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <Type className="w-3 h-3" /> Section Title
          </label>
          <input 
            className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold text-slate-900 focus:ring-2 focus:ring-blue-500"
            value={section.title || ''}
            onChange={e => onUpdate('title', e.target.value)}
            placeholder={`Enter ${label} section title...`}
          />
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <Clock className="w-3 h-3" /> Last Updated
          </label>
          <div className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold text-slate-400 flex items-center gap-3">
             {section.lastUpdated ? new Date(section.lastUpdated).toLocaleString() : 'Never'}
          </div>
        </div>

        <div className="md:col-span-2 space-y-4">
          <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <FileText className="w-3 h-3" /> Section Content
          </label>
          <textarea 
            rows={5}
            className="w-full bg-slate-50 border-none rounded-3xl px-6 py-4 font-medium text-slate-900 focus:ring-2 focus:ring-blue-500 transition-all outline-none resize-none"
            value={section.content || ''}
            onChange={e => onUpdate('content', e.target.value)}
            placeholder={`Describe the ${label} of your institution...`}
          />
        </div>

        <div className="md:col-span-2 space-y-4">
          <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <ImageIcon className="w-3 h-3" /> Media URLs (Images/Videos)
          </label>
          <div className="space-y-3">
            {(section.mediaUrls || []).map((url, idx) => (
              <div key={idx} className="flex gap-3">
                <input 
                  className="flex-1 bg-slate-50 border-none rounded-xl px-4 py-2 text-xs font-medium"
                  value={url}
                  onChange={e => {
                    const next = [...(section.mediaUrls || [])];
                    next[idx] = e.target.value;
                    onUpdate('mediaUrls', next);
                  }}
                />
                <button 
                  onClick={() => {
                    const next = (section.mediaUrls || []).filter((_, i) => i !== idx);
                    onUpdate('mediaUrls', next);
                  }}
                  className="text-rose-500 hover:text-rose-700 p-2"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button 
              onClick={() => onUpdate('mediaUrls', [...(section.mediaUrls || []), ''])}
              className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline"
            >
              + Add Media Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import { Settings, X } from 'lucide-react';

export default SectionBaseFields;
