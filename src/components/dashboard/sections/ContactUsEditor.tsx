import React from 'react';
import { Institution } from '../../../../types';

import { Globe, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Facebook, Twitter, Linkedin, Instagram, Youtube } from '../../icons/SocialIcons';

interface ContactUsEditorProps {
  institution: Institution;
  onUpdate: (updatedInst: Institution) => void;
}

const ContactUsEditor: React.FC<ContactUsEditorProps> = ({ institution, onUpdate }) => {
  const contactUs = institution.sections.contactUs;
  const contact = institution.contact;

  const updateSectionField = (field: keyof NonNullable<Institution['sections']['contactUs']>, value: any) => {
    onUpdate({
      ...institution,
      sections: {
        ...institution.sections,
        contactUs: {
          ...contactUs!,
          [field]: value
        }
      }
    });
  };

  const updateContactField = (field: keyof Institution['contact'], value: any) => {
    onUpdate({
      ...institution,
      contact: {
        ...contact,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-12">
      <header className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">Contact Us Section</h3>
          <p className="text-sm text-slate-500 font-medium">Configure how your institution appears on the public contact page.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100 space-y-6">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Globe className="w-3 h-3" /> Content & Messaging
            </h4>
            <div className="space-y-6">
              <div className="group">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Headline</label>
                <input 
                  className="w-full bg-white border-2 border-transparent focus:border-blue-500 rounded-2xl px-6 py-4 font-bold transition-all outline-none shadow-sm" 
                  placeholder="e.g. We're Here to Help You"
                  value={contactUs?.headline || ''} 
                  onChange={e => updateSectionField('headline', e.target.value)} 
                />
              </div>
              <div className="group">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Introduction</label>
                <textarea 
                  className="w-full bg-white border-2 border-transparent focus:border-blue-500 rounded-2xl px-6 py-4 font-bold transition-all outline-none shadow-sm min-h-[120px]" 
                  placeholder="Tell visitors how you can help them..."
                  value={contactUs?.introduction || ''} 
                  onChange={e => updateSectionField('introduction', e.target.value)} 
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100 space-y-6">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Mail className="w-3 h-3" /> Master Contact Information
            </h4>
            <p className="text-xs text-slate-500 font-medium px-1">These details are synced across your entire profile.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    className="w-full bg-white border-2 border-transparent focus:border-blue-500 rounded-2xl pl-14 pr-6 py-4 font-bold transition-all outline-none shadow-sm" 
                    value={contact?.email || ''} 
                    onChange={e => updateContactField('email', e.target.value)} 
                  />
                </div>
              </div>
              <div className="group">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    className="w-full bg-white border-2 border-transparent focus:border-blue-500 rounded-2xl pl-14 pr-6 py-4 font-bold transition-all outline-none shadow-sm" 
                    value={contact?.phone || ''} 
                    onChange={e => updateContactField('phone', e.target.value)} 
                  />
                </div>
              </div>
              <div className="md:col-span-2 group">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Physical Address</label>
                <div className="relative">
                  <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    className="w-full bg-white border-2 border-transparent focus:border-blue-500 rounded-2xl pl-14 pr-6 py-4 font-bold transition-all outline-none shadow-sm" 
                    value={contact?.address || ''} 
                    onChange={e => updateContactField('address', e.target.value)} 
                  />
                </div>
              </div>
              <div className="group">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Support Hours</label>
                <div className="relative">
                  <Clock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    className="w-full bg-white border-2 border-transparent focus:border-blue-500 rounded-2xl pl-14 pr-6 py-4 font-bold transition-all outline-none shadow-sm" 
                    value={contact?.officeHours || ''} 
                    onChange={e => updateContactField('officeHours', e.target.value)} 
                  />
                </div>
              </div>
              <div className="group">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Official Website</label>
                <div className="relative">
                  <Globe className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    className="w-full bg-white border-2 border-transparent focus:border-blue-500 rounded-2xl pl-14 pr-6 py-4 font-bold transition-all outline-none shadow-sm" 
                    value={contact?.website || ''} 
                    onChange={e => updateContactField('website', e.target.value)} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-blue-50 p-8 rounded-[40px] border border-blue-100 space-y-8">
            <header className="space-y-1">
              <h4 className="text-sm font-black text-blue-900 uppercase tracking-tight">Social Presence</h4>
              <p className="text-[10px] text-blue-700/60 font-bold uppercase tracking-widest">Connect your social channels</p>
            </header>

            <div className="space-y-6">
              <div className="group">
                <label className="flex items-center gap-2 text-[10px] font-black text-blue-700/60 uppercase tracking-widest mb-3">
                  <Facebook className="w-3 h-3" /> Facebook URL
                </label>
                <input 
                  className="w-full bg-white border-2 border-transparent focus:border-blue-500 rounded-2xl px-6 py-4 font-bold transition-all outline-none shadow-sm" 
                  placeholder="facebook.com/yourschool"
                  value={contact?.facebook || ''} 
                  onChange={e => updateContactField('facebook', e.target.value)} 
                />
              </div>
              <div className="group">
                <label className="flex items-center gap-2 text-[10px] font-black text-blue-700/60 uppercase tracking-widest mb-3">
                  <Twitter className="w-3 h-3" /> Twitter/X URL
                </label>
                <input 
                  className="w-full bg-white border-2 border-transparent focus:border-blue-500 rounded-2xl px-6 py-4 font-bold transition-all outline-none shadow-sm" 
                  placeholder="twitter.com/yourschool"
                  value={contact?.twitter || ''} 
                  onChange={e => updateContactField('twitter', e.target.value)} 
                />
              </div>
              <div className="group">
                <label className="flex items-center gap-2 text-[10px] font-black text-blue-700/60 uppercase tracking-widest mb-3">
                  <Linkedin className="w-3 h-3" /> LinkedIn URL
                </label>
                <input 
                  className="w-full bg-white border-2 border-transparent focus:border-blue-500 rounded-2xl px-6 py-4 font-bold transition-all outline-none shadow-sm" 
                  placeholder="linkedin.com/school/yourschool"
                  value={contact?.linkedin || ''} 
                  onChange={e => updateContactField('linkedin', e.target.value)} 
                />
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/60 p-6 rounded-3xl border border-blue-100">
              <div className="flex-1">
                <h4 className="text-sm font-black text-blue-900 mb-1">Display Social Icons</h4>
                <p className="text-[10px] text-blue-700 font-bold font-sans">Toggle social media presence on your public page.</p>
              </div>
              <button 
                onClick={() => updateSectionField('socialMediaEnabled', !contactUs?.socialMediaEnabled)}
                className={`w-14 h-8 rounded-full transition-all relative ${contactUs?.socialMediaEnabled ? 'bg-blue-600' : 'bg-slate-300'}`}
              >
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${contactUs?.socialMediaEnabled ? 'right-1' : 'left-1 shadow-sm'}`} />
              </button>
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-[40px] text-white space-y-6">
            <h4 className="text-sm font-black uppercase tracking-tight">Pro Tip</h4>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              Ensure your Google Maps URL is accurate to help parents find your campus easily using the integrated navigation button.
            </p>
            <div className="group">
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 px-1">Google Maps URL</label>
              <input 
                className="w-full bg-white/10 border-2 border-transparent focus:border-blue-500 rounded-2xl px-6 py-4 font-bold transition-all outline-none text-white text-sm" 
                placeholder="https://maps.google.com/..."
                value={contact?.googleMapsUrl || ''} 
                onChange={e => updateContactField('googleMapsUrl', e.target.value)} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsEditor;
