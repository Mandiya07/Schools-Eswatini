import React from 'react';
import { Institution } from '../../../../types';

interface ProgramsEditorProps {
  institution: Institution;
  onUpdate: (updatedSections: Institution['sections']) => void;
}

const ProgramsEditor: React.FC<ProgramsEditorProps> = ({ institution, onUpdate }) => {
  const { academics } = institution.sections;

  const updatePrograms = (programs: typeof academics.programs) => {
    onUpdate({
      ...institution.sections,
      academics: {
        ...academics,
        programs
      }
    });
  };

  return (
    <div className="space-y-8">
      <h3 className="text-xl font-black text-slate-900">Programs & Courses</h3>
      <p className="text-sm text-slate-500">Manage academic programs and courses.</p>
      
      {/* 
        This is a placeholder for the program management UI.
        Since I'm reusing the existing structure, I'll implement the program list editor here. 
      */}
      
      {academics.programs.map((prog, idx) => (
        <div key={prog.id} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4 relative group">
          <div className="flex justify-between items-center">
            <input 
              className="bg-transparent border-none font-black text-slate-900 p-0 focus:ring-0 text-lg w-full" 
              value={prog.name} 
              onChange={e => {
                const newProgs = [...academics.programs];
                newProgs[idx].name = e.target.value;
                updatePrograms(newProgs);
              }}
              placeholder="Program Name"
            />
            <button 
              onClick={() => updatePrograms(academics.programs.filter((_, i) => i !== idx))}
              className="text-rose-500 hover:text-rose-700 ml-4"
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Qualification Awarded</label>
              <input 
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold outline-none" 
                value={prog.qualification}
                onChange={e => {
                  const newProgs = [...academics.programs];
                  newProgs[idx].qualification = e.target.value;
                  updatePrograms(newProgs);
                }}
              />
            </div>
            <div>
              <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Duration</label>
              <input 
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold outline-none" 
                value={prog.duration}
                onChange={e => {
                  const newProgs = [...academics.programs];
                  newProgs[idx].duration = e.target.value;
                  updatePrograms(newProgs);
                }}
              />
            </div>
          </div>
          <div>
            <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Brief Description</label>
            <textarea 
              rows={3}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium outline-none resize-none" 
              value={prog.description}
              onChange={e => {
                const newProgs = [...academics.programs];
                newProgs[idx].description = e.target.value;
                updatePrograms(newProgs);
              }}
            />
          </div>
        </div>
      ))}
      <button 
        onClick={() => updatePrograms([...academics.programs, { id: Date.now().toString(), name: 'New Program', qualification: '', duration: '', subjects: [], requirements: '', description: '' }])}
        className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline"
      >
        + Add Program
      </button>
    </div>
  );
};

export default ProgramsEditor;
