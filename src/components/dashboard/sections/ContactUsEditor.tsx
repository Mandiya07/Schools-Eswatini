import React from 'react';
import { Institution } from '../../../../types';

interface ContactUsEditorProps {
  institution: Institution;
  onUpdate: (updatedSections: Institution['sections']) => void;
}

const ContactUsEditor: React.FC<ContactUsEditorProps> = ({ institution, onUpdate }) => {
  const contactUs = institution.sections.contactUs;

  const updateField = (field: keyof typeof contactUs, value: any) => {
    onUpdate({
      ...institution.sections,
      contactUs: {
        ...contactUs,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-8">
      <h3 className="text-xl font-black text-slate-900">Contact Us Section</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Headline</label>
          <input className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 font-bold" value={contactUs?.headline || ''} onChange={e => updateField('headline', e.target.value)} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Introduction</label>
          <textarea className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 font-bold" value={contactUs?.introduction || ''} onChange={e => updateField('introduction', e.target.value)} />
        </div>
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Email</label>
          <input className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 font-bold" value={contactUs?.email || ''} onChange={e => updateField('email', e.target.value)} />
        </div>
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Phone</label>
          <input className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 font-bold" value={contactUs?.phone || ''} onChange={e => updateField('phone', e.target.value)} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Address</label>
          <input className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 font-bold" value={contactUs?.address || ''} onChange={e => updateField('address', e.target.value)} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Support Hours</label>
          <input className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 font-bold" value={contactUs?.supportHours || ''} onChange={e => updateField('supportHours', e.target.value)} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Map URL</label>
          <input className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 font-bold" value={contactUs?.mapUrl || ''} onChange={e => updateField('mapUrl', e.target.value)} />
        </div>
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <input type="checkbox" checked={contactUs?.socialMediaEnabled} onChange={e => updateField('socialMediaEnabled', e.target.checked)} />
            <label className="text-sm font-black text-slate-900">Enable Social Media Links</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsEditor;
