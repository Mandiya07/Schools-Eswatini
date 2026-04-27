import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Institution } from '../../types';
import StudentLifeSection from '../../src/components/StudentLifeSection';

export const InstitutionStudentLife: React.FC = () => {
  const { inst } = useOutletContext<{ inst: Institution }>();
  
  const life = inst.sections?.studentLife;
  if (!life) return <div className="p-10 text-center">Student life information is being updated.</div>;

  return (
    <div className="space-y-32">
      <h2 className="text-7xl font-black text-slate-900 tracking-tighter">Student Life</h2>
      <StudentLifeSection life={life} primaryColor={inst.theme.primaryColor} />
    </div>
  );
};
