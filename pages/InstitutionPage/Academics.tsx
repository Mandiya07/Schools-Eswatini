import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Institution } from '../../types';
import AcademicsSection from '../../src/components/AcademicsSection';

export const InstitutionAcademics: React.FC = () => {
  const { inst } = useOutletContext<{ inst: Institution }>();
  
  const academics = inst.sections?.academics;
  if (!academics) return <div className="p-10 text-center">Academics information is being updated.</div>;
  
  return (
    <div className="space-y-32">
      <h2 className="text-7xl font-black text-slate-900 tracking-tighter">Academics</h2>
      <AcademicsSection 
        academics={academics} 
        primaryColor={inst.theme.primaryColor} 
        institutionType={inst.type} 
      />
    </div>
  );
};
