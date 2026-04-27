import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Institution } from '../../types';
import AdmissionsSection from '../../src/components/AdmissionsSection';

export const InstitutionAdmissions: React.FC = () => {
  const { inst } = useOutletContext<{ inst: Institution }>();
  
  const admissions = inst.sections?.admissions;
  if (!admissions) return <div className="p-10 text-center">Admissions information is being updated.</div>;

  return (
    <div className="space-y-32">
      <h2 className="text-7xl font-black text-slate-900 tracking-tighter">Admissions</h2>
      <AdmissionsSection admissions={admissions} primaryColor={inst.theme.primaryColor} />
    </div>
  );
};
