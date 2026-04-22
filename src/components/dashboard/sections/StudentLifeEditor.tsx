
import React from 'react';
import { Institution } from '../../../../types';

interface StudentLifeEditorProps {
  institution: Institution;
  onUpdate: (updatedSections: Institution['sections']) => void;
}

const StudentLifeEditor: React.FC<StudentLifeEditorProps> = ({ institution, onUpdate }) => {
  const { studentLife } = institution.sections;

  const updateField = (field: string, value: any) => {
    onUpdate({
      ...institution.sections,
      studentLife: {
        ...studentLife,
        [field]: value
      }
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-in fade-in slide-in-from-right-4">
      <div className="space-y-10">
        <header>
          <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Student Life Editor</h3>
          <p className="text-sm text-slate-500 font-medium">Showcase the vibrant culture beyond the classroom</p>
        </header>

        <div className="space-y-8">
          <div className="group">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Section Headline</label>
            <input 
              className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 font-bold transition-all outline-none" 
              value={studentLife.headline} 
              onChange={e => updateField('headline', e.target.value)} 
            />
          </div>

          <div className="group">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Life Overview</label>
            <textarea 
              rows={4} 
              className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 font-medium transition-all outline-none resize-none" 
              value={studentLife.overview} 
              onChange={e => updateField('overview', e.target.value)}
            />
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Clubs & Activities</h4>
              <button 
                onClick={() => updateField('clubs', [...studentLife.clubs, { id: Date.now(), name: 'New Club', description: '', icon: '🌟', category: 'General' }])}
                className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline"
              >
                + Add Club
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {studentLife.clubs.map((club, idx) => (
                <div key={club.id} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4">
                  <div className="flex justify-between items-center">
                    <input 
                      className="bg-transparent border-none font-black text-slate-900 p-0 focus:ring-0 text-sm" 
                      value={club.name} 
                      onChange={e => {
                        const newClubs = [...studentLife.clubs];
                        newClubs[idx].name = e.target.value;
                        updateField('clubs', newClubs);
                      }}
                    />
                    <button 
                      onClick={() => updateField('clubs', studentLife.clubs.filter((_, i) => i !== idx))}
                      className="text-rose-500 hover:text-rose-700"
                    >
                      ✕
                    </button>
                  </div>
                  <input 
                    className="w-full bg-white border rounded-xl px-4 py-2 text-[10px] font-bold" 
                    placeholder="Icon (Emoji)" 
                    value={club.icon} 
                    onChange={e => {
                      const newClubs = [...studentLife.clubs];
                      newClubs[idx].icon = e.target.value;
                      updateField('clubs', newClubs);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <header>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Student Life Preview</h3>
        </header>
        
        <div className="sticky top-8 space-y-6">
          <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
            <div className="space-y-4">
              <h4 className="text-2xl font-black text-slate-900 tracking-tight">{studentLife.headline}</h4>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">{studentLife.overview}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {studentLife.clubs.slice(0, 4).map(club => (
                <div key={club.id} className="p-6 bg-slate-50 rounded-3xl flex flex-col items-center text-center gap-3 group hover:bg-blue-50 transition-colors cursor-pointer">
                  <span className="text-3xl group-hover:scale-125 transition-transform duration-500">{club.icon}</span>
                  <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{club.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLifeEditor;
