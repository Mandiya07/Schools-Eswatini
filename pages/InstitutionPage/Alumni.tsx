import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Institution } from '../../types';
import { AlumniSection } from '../../components/EngagementFeatures';

export const InstitutionAlumni: React.FC = () => {
  const { inst, lang } = useOutletContext<{ inst: Institution, lang: 'en' | 'ss' }>();
  
  return (
    <div className="space-y-32">
      <h2 className="text-7xl font-black text-slate-900 tracking-tighter">Alumni Network</h2>
      <AlumniSection institution={inst} lang={lang} />
    </div>
  );
};
