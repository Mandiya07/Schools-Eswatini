import React from 'react';
import { Institution } from '../../../../types';

interface AcademicsContentEditorProps {
  institution: Institution;
  onUpdate: (sections: Institution['sections']) => void;
}

const AcademicsContentEditor: React.FC<AcademicsContentEditorProps> = ({ institution, onUpdate }) => {
  const { academics } = institution.sections;

  const updateAcademics = (field: keyof Institution['sections']['academics'], value: any) => {
    onUpdate({
      ...institution.sections,
      academics: {
        ...academics,
        [field]: value
      }
    });
  };

  return (
    <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-12 animate-in fade-in">
        <h2 className="text-3xl font-black text-slate-900">Academics Content Editor</h2>
        <p className="text-slate-500">Edit the comprehensive academic profile for your institution.</p>
        
        {/* Simplified editor UI - will need inputs for all fields in real use */}
        <div className="grid grid-cols-1 gap-8">
            <section className="bg-slate-50 p-6 rounded-3xl">
                <h3 className="text-lg font-bold mb-4">Academic Overview</h3>
                <input className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 mb-2" value={academics.overview.headline} onChange={e => updateAcademics('overview', {...academics.overview, headline: e.target.value})} placeholder="Headline" />
                <textarea className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2" value={academics.overview.introduction} onChange={e => updateAcademics('overview', {...academics.overview, introduction: e.target.value})} placeholder="Introduction"></textarea>
            </section>
            {/* Add more sections for Curriculum, Assessment, Facilities, Digital Learning, etc. */}
        </div>
    </div>
  );
};

export default AcademicsContentEditor;
