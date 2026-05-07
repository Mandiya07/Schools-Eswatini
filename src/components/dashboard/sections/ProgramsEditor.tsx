import React from 'react';
import { Institution, AcademicProgram } from '../../../../types';
import { Trash2, Plus, FileText, ChevronDown, ChevronUp } from 'lucide-react';

interface ProgramsEditorProps {
  institution: Institution;
  onUpdate: (updatedSections: Institution['sections']) => void;
}

const ProgramsEditor: React.FC<ProgramsEditorProps> = ({ institution, onUpdate }) => {
  const { academics } = institution.sections;
  const [expandedId, setExpandedId] = React.useState<string | null>(null);

  const updatePrograms = (programs: AcademicProgram[]) => {
    onUpdate({
      ...institution.sections,
      academics: {
        ...academics,
        programs
      }
    });
  };

  const addProgram = () => {
    const newProgram: AcademicProgram = {
      id: `prog-${Date.now()}`,
      name: 'New Academic Program',
      qualification: 'Certificate',
      duration: '1 Year',
      subjects: [],
      requirements: 'General Entry Requirements',
      description: 'Brief description of the program.',
      syllabusUrl: ''
    };
    updatePrograms([...academics.programs, newProgram]);
    setExpandedId(newProgram.id);
  };

  const removeProgram = (id: string) => {
    updatePrograms(academics.programs.filter(p => p.id !== id));
  };

  const updateProgramField = (id: string, field: keyof AcademicProgram, value: any) => {
    updatePrograms(academics.programs.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-left-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-black text-slate-900">Academic Programs</h3>
          <p className="text-sm text-slate-500 font-medium">Manage the list of programs and courses offered by your institution.</p>
        </div>
        <button 
          onClick={addProgram}
          className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-2 hover:bg-slate-900 transition-all shadow-lg"
        >
          <Plus className="w-4 h-4" /> Add Program
        </button>
      </div>

      <div className="space-y-4">
        {academics.programs.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200">
            <FileText className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">No programs added yet.</p>
          </div>
        ) : (
          academics.programs.map((prog, idx) => (
            <div key={prog.id} className={`bg-white border rounded-[32px] overflow-hidden transition-all ${expandedId === prog.id ? 'border-blue-500 shadow-xl ring-4 ring-blue-50' : 'border-slate-100 hover:border-slate-200 shadow-sm'}`}>
              <div 
                className="p-6 flex items-center justify-between cursor-pointer"
                onClick={() => setExpandedId(expandedId === prog.id ? null : prog.id)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs ${expandedId === prog.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900">{prog.name || 'Untitled Program'}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{prog.qualification} • {prog.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      removeProgram(prog.id);
                    }}
                    className="p-2 text-slate-300 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  {expandedId === prog.id ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </div>
              </div>

              {expandedId === prog.id && (
                <div className="px-8 pb-8 space-y-6 border-t border-slate-50 pt-6 animate-in fade-in zoom-in-95">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Program Name</label>
                      <input 
                        className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-xl px-4 py-3 font-bold transition-all outline-none" 
                        value={prog.name} 
                        onChange={e => updateProgramField(prog.id, 'name', e.target.value)}
                        placeholder="e.g. IB Diploma Programme"
                      />
                    </div>
                    <div className="group">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Qualification Awarded</label>
                      <input 
                        className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-xl px-4 py-3 font-bold transition-all outline-none" 
                        value={prog.qualification} 
                        onChange={e => updateProgramField(prog.id, 'qualification', e.target.value)}
                        placeholder="e.g. SGCSE Certificate"
                      />
                    </div>
                    <div className="group">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Duration</label>
                      <input 
                        className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-xl px-4 py-3 font-bold transition-all outline-none" 
                        value={prog.duration} 
                        onChange={e => updateProgramField(prog.id, 'duration', e.target.value)}
                        placeholder="e.g. 2 Years"
                      />
                    </div>
                    <div className="group">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Syllabus URL (PDF)</label>
                      <input 
                        className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-xl px-4 py-3 font-bold transition-all outline-none" 
                        value={prog.syllabusUrl || ''} 
                        onChange={e => updateProgramField(prog.id, 'syllabusUrl', e.target.value)}
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Entry Requirements</label>
                    <textarea 
                      rows={3}
                      className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-xl px-4 py-3 font-medium transition-all outline-none resize-none" 
                      value={typeof prog.requirements === 'string' ? prog.requirements : JSON.stringify(prog.requirements, null, 2)} 
                      onChange={e => updateProgramField(prog.id, 'requirements', e.target.value)}
                      placeholder="List academic and document requirements..."
                    />
                  </div>

                  <div className="group">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Brief Description</label>
                    <textarea 
                      rows={4}
                      className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-xl px-4 py-3 font-medium transition-all outline-none resize-none" 
                      value={prog.description} 
                      onChange={e => updateProgramField(prog.id, 'description', e.target.value)}
                      placeholder="Summarize the program curriculum and objectives..."
                    />
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProgramsEditor;
