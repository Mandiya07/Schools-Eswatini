
import React from 'react';
import { Institution } from '../../../../types';
import { Layout, Info, UserPlus, GraduationCap, Newspaper, Users, Globe, Eye, EyeOff, ShieldCheck } from 'lucide-react';

interface ModuleVisibilityEditorProps {
  institution: Institution;
  onUpdate: (updatedSections: Institution['sections']) => void;
}

const ModuleVisibilityEditor: React.FC<ModuleVisibilityEditorProps> = ({ institution, onUpdate }) => {
  const sections = institution.sections;

  const moduleConfigs = [
    { 
      id: 'homepage', 
      label: 'Homepage & Hero', 
      description: 'The landing page for your institution. Essential for first impressions.',
      icon: <Layout className="w-5 h-5" />,
      immutable: true // Cannot disable homepage
    },
    { 
      id: 'about', 
      label: 'About Us', 
      description: 'History, mission, vision, and leadership information.',
      icon: <Info className="w-5 h-5" />
    },
    { 
      id: 'academics', 
      label: 'Academics & Curricula', 
      description: 'Course information, departments, and academic performance.',
      icon: <GraduationCap className="w-5 h-5" />
    },
    { 
      id: 'admissions', 
      label: 'Admissions & Fees', 
      description: 'Application process, requirements, and tuition fee details.',
      icon: <UserPlus className="w-5 h-5" />
    },
    { 
      id: 'news', 
      label: 'News & Events', 
      description: 'Keep your community updated with blog posts and calendars.',
      icon: <Newspaper className="w-5 h-5" />
    },
    { 
      id: 'studentLife', 
      label: 'Student Life', 
      description: 'Extracurricular activities, sports, and clubs.',
      icon: <Users className="w-5 h-5" />
    },
    { 
      id: 'portal', 
      label: 'Digital Portal Access', 
      description: 'Allow students and parents to access the internal school portal.',
      icon: <Globe className="w-5 h-5" />
    }
  ];

  const toggleModule = (moduleId: string) => {
    const sectionKey = moduleId as keyof Institution['sections'];
    const updatedSections = {
      ...sections,
      [sectionKey]: {
        ...sections[sectionKey],
        enabled: !sections[sectionKey]?.enabled
      }
    };
    onUpdate(updatedSections);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4">
      <header className="space-y-2">
        <div className="flex items-center gap-3">
           <ShieldCheck className="w-6 h-6 text-blue-600" />
           <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Site Modules & Visibility</h3>
        </div>
        <p className="text-sm text-slate-500 font-medium">Control which sections are visible to the public on your institution's profile.</p>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {moduleConfigs.map((module) => {
          const isEnabled = sections[module.id as keyof Institution['sections']]?.enabled !== false;
          
          return (
            <div 
              key={module.id} 
              className={`flex items-center justify-between p-6 rounded-[32px] border-2 transition-all ${isEnabled ? 'bg-white border-slate-100 shadow-sm' : 'bg-slate-50 border-transparent opacity-60'}`}
            >
              <div className="flex items-center gap-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isEnabled ? 'bg-blue-50 text-blue-600' : 'bg-slate-200 text-slate-400'}`}>
                  {module.icon}
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
                    {module.label}
                    {!isEnabled && <span className="text-[8px] bg-slate-200 text-slate-500 px-2 py-0.5 rounded-full uppercase tracking-widest">Hidden</span>}
                  </h4>
                  <p className="text-[10px] text-slate-500 font-medium mt-1">{module.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {module.immutable ? (
                  <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Always On</span>
                ) : (
                  <button 
                    onClick={() => toggleModule(module.id)}
                    className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${isEnabled ? 'bg-blue-600' : 'bg-slate-300'}`}
                  >
                    <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${isEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
                  </button>
                )}
                
                <div className="w-10 flex justify-center">
                   {isEnabled ? <Eye className="w-4 h-4 text-slate-400" /> : <EyeOff className="w-4 h-4 text-slate-300" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-8 bg-indigo-50 rounded-[40px] border border-indigo-100 flex items-start gap-6">
         <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center shrink-0">
            <Globe className="w-6 h-6 text-indigo-600" />
         </div>
         <div className="space-y-2">
            <h5 className="font-black text-indigo-900 text-sm">Site Order & Layout</h5>
            <p className="text-xs text-indigo-700 leading-relaxed font-medium">
              You can also customize the order of these sections in the <span className="font-black tracking-widest">Appearance</span> tab. 
              Sections disabled here will be completely omitted from your public page navigation and layout.
            </p>
         </div>
      </div>
    </div>
  );
};

export default ModuleVisibilityEditor;
