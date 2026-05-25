
import React, { useState, useEffect } from 'react';
import { Institution, InstitutionType, User, UserRole } from '../../../../types';
import HomepageEditor from './HomepageEditor';
import AboutEditor from './AboutEditor';
import AdmissionsEditor from './AdmissionsEditor';
import AcademicsEditor from './AcademicsEditor';
import NewsEditor from './NewsEditor';
import StudentLifeEditor from './StudentLifeEditor';
import PortalEditor from './PortalEditor';
import ContactUsEditor from './ContactUsEditor';
import ProgramsEditor from './ProgramsEditor';
import ModuleVisibilityEditor from './ModuleVisibilityEditor';
import { Layout, Info, UserPlus, GraduationCap, Newspaper, Users, Globe, Settings, Mail, BookOpen } from 'lucide-react';

interface SectionManagerProps {
  institution: Institution;
  user: User;
  onUpdate: (updatedInst: Institution) => void;
}

const SectionManager: React.FC<SectionManagerProps> = ({ institution, user, onUpdate }) => {
  const isAdmin = user.role === UserRole.INSTITUTION_ADMIN || user.role === UserRole.SUPER_ADMIN;

  const isTertiary = institution.type.includes(InstitutionType.TERTIARY);
  const isPrimary = institution.type.includes(InstitutionType.PRIMARY);

  const allSections: { id: any; label: string; icon: React.ReactNode }[] = [
    { id: 'visibility', label: 'Visibility', icon: <Settings className="w-4 h-4" /> },
    { id: 'homepage', label: 'Homepage', icon: <Layout className="w-4 h-4" /> },
    { id: 'about', label: 'About', icon: <Info className="w-4 h-4" /> },
    { id: 'admissions', label: 'Admissions', icon: <UserPlus className="w-4 h-4" /> },
    { id: 'academics', label: 'Academics', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'news', label: 'News', icon: <Newspaper className="w-4 h-4" /> },
    { id: 'studentLife', label: 'Student Life', icon: <Users className="w-4 h-4" /> },
    { id: 'portal', label: 'Portal', icon: <Globe className="w-4 h-4" /> },
    { id: 'contactUs', label: 'Contact Us', icon: <Mail className="w-4 h-4" /> }
  ];

  const sections = allSections.filter(s => {
    if (isAdmin) return true;
    if (!user.permissions) return false;

    switch (s.id) {
      case 'news': return user.permissions.canEditNews;
      case 'studentLife': return user.permissions.canEditStudentLife;
      case 'admissions': return user.permissions.canEditAdmissions;
      case 'academics': return user.permissions.canEditAcademics;
      default: return false; 
    }
  });

  const [activeSection, setActiveSection] = useState<keyof Institution['sections'] | 'visibility'>(
    isAdmin ? 'visibility' : (sections[0]?.id as any) || 'visibility'
  );

  useEffect(() => {
    if (!isAdmin && sections.length > 0 && !sections.find(s => s.id === activeSection)) {
      setActiveSection(sections[0].id as any);
    }
  }, [isAdmin, sections, activeSection]);

  const updateSection = (updatedSections: Institution['sections']) => {
    onUpdate({
      ...institution,
      sections: updatedSections
    });
  };

  const renderEditor = () => {
    if (activeSection === 'visibility') {
      return <ModuleVisibilityEditor institution={institution} onUpdate={updateSection} />;
    }

    switch (activeSection) {
      case 'homepage': return <HomepageEditor institution={institution} onUpdate={updateSection} />;
      case 'about': return <AboutEditor institution={institution} onUpdate={updateSection} />;
      case 'admissions': return <AdmissionsEditor institution={institution} onUpdate={onUpdate} />;
      case 'academics': return <AcademicsEditor institution={institution} onUpdate={updateSection} />;
      case 'news': return <NewsEditor institution={institution} onUpdate={updateSection} />;
      case 'studentLife': return <StudentLifeEditor institution={institution} onUpdate={updateSection} />;
      case 'portal': return <PortalEditor institution={institution} onUpdate={updateSection} />;
      case 'contactUs': return <ContactUsEditor institution={institution} onUpdate={onUpdate} />;
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
