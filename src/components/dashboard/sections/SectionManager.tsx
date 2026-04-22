
import React, { useState } from 'react';
import { Institution } from '../../../../types';
import HomepageEditor from './HomepageEditor';
import AboutEditor from './AboutEditor';
import AdmissionsEditor from './AdmissionsEditor';
import AcademicsEditor from './AcademicsEditor';
import NewsEditor from './NewsEditor';
import StudentLifeEditor from './StudentLifeEditor';
import PortalEditor from './PortalEditor';
import { Layout, Info, UserPlus, GraduationCap, Newspaper, Users, Globe } from 'lucide-react';

interface SectionManagerProps {
  institution: Institution;
  onUpdate: (updatedSections: Institution['sections']) => void;
}

const SectionManager: React.FC<SectionManagerProps> = ({ institution, onUpdate }) => {
  const [activeSection, setActiveSection] = useState<keyof Institution['sections']>('homepage');

  const sections = [
    { id: 'homepage', label: 'Homepage', icon: <Layout className="w-4 h-4" /> },
    { id: 'about', label: 'About Us', icon: <Info className="w-4 h-4" /> },
    { id: 'admissions', label: 'Admissions', icon: <UserPlus className="w-4 h-4" /> },
    { id: 'academics', label: 'Academics', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'news', label: 'News & Media', icon: <Newspaper className="w-4 h-4" /> },
    { id: 'studentLife', label: 'Student Life', icon: <Users className="w-4 h-4" /> },
    { id: 'portal', label: 'Student Portal', icon: <Globe className="w-4 h-4" /> }
  ];

  const renderEditor = () => {
    switch (activeSection) {
      case 'homepage': return <HomepageEditor institution={institution} onUpdate={onUpdate} />;
      case 'about': return <AboutEditor institution={institution} onUpdate={onUpdate} />;
      case 'admissions': return <AdmissionsEditor institution={institution} onUpdate={onUpdate} />;
      case 'academics': return <AcademicsEditor institution={institution} onUpdate={onUpdate} />;
      case 'news': return <NewsEditor institution={institution} onUpdate={onUpdate} />;
      case 'studentLife': return <StudentLifeEditor institution={institution} onUpdate={onUpdate} />;
      case 'portal': return <PortalEditor institution={institution} onUpdate={onUpdate} />;
      default: return null;
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex bg-white p-2 rounded-[32px] shadow-sm border border-slate-100 overflow-x-auto whitespace-nowrap scrollbar-hide">
        {sections.map(s => (
          <button 
            key={s.id} 
            onClick={() => setActiveSection(s.id as any)} 
            className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeSection === s.id ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
          >
            {s.icon}
            {s.label}
          </button>
        ))}
      </div>

      <div className="bg-white p-12 rounded-[48px] border border-slate-100 shadow-sm min-h-[700px]">
        {renderEditor()}
      </div>
    </div>
  );
};

export default SectionManager;
