import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Institution } from '../../types';
import ContactSection from '../../src/components/ContactSection';

export const InstitutionContact: React.FC = () => {
  const { inst, lang } = useOutletContext<{ inst: Institution, lang: 'en' | 'ss' }>();
  
  return (
    <div className="space-y-32">
      <h2 className="text-7xl font-black text-slate-900 tracking-tighter">Contact Us</h2>
      <ContactSection institution={inst} primaryColor={inst.theme.primaryColor} lang={lang} />
    </div>
  );
};
