import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Institution } from '../../types';
import PortalSection from '../../src/components/PortalSection';

export const InstitutionPortal: React.FC = () => {
  const { inst } = useOutletContext<{ inst: Institution }>();
  
  const portal = inst.sections?.portal;
  if (!portal) return <div className="p-10 text-center">Portal information is being updated.</div>;

  return (
    <div className="space-y-32">
      <h2 className="text-7xl font-black text-slate-900 tracking-tighter">Student Portal</h2>
      <PortalSection portal={portal} primaryColor={inst.theme.primaryColor} />
    </div>
  );
};
