
import React from 'react';
import { motion } from 'motion/react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Globe,
  ChevronDown,
  AlertCircle,
  Navigation,
  Info
} from 'lucide-react';
import { Institution } from '../../types';
import { InquiryForm } from '../../components/EngagementFeatures';

interface ContactSectionProps {
  institution: Institution;
  primaryColor: string;
  lang: 'en' | 'ss';
}

const ContactSection: React.FC<ContactSectionProps> = ({ institution, primaryColor, lang }) => {
  const { contact } = institution;

  const labels = {
    en: {
      title: 'Contact Us',
      headline: contact.headline || 'We\'re Here to Help You',
      intro: contact.introduction || 'Have questions? We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.',
      info: 'Key Contact Information',
      departments: 'Departmental Contacts',
      hours: 'Office Hours',
      directions: 'Directions & Accessibility',
      faq: 'Frequently Asked Questions',
      emergency: 'Emergency Contacts',
      social: 'Follow Us',
      landmarks: 'Nearby Landmarks',
      transport: 'Public Transport',
      parking: 'Parking Availability',
      accessibility: 'Accessibility'
    },
    ss: {
      title: 'Tsintsana Natsi',
      headline: contact.headline || 'Sikhona Kute Sikusite',
      intro: contact.introduction || 'Unemibuto? Singakutsandza kuva lokuvela kuwe. Tfumela umlayeto futsi sitawuphendvula masinyane.',
      info: 'Lwati Lwekutsintsana',
      departments: 'Tihhovisi Letehlukene',
      hours: 'Tikhathi Tekusebenta',
      directions: 'Tindlela Tekufika',
      faq: 'Imibuto Levamise Kubutwa',
      emergency: 'Tinombolo Tetuphakanyiswa',
      social: 'Silandzele',
      landmarks: 'Tindzawo Letisedvute',
      transport: 'Tikuhamba Temphakatsi',
      parking: 'Indzawo Yekupaka',
      accessibility: 'Kufikeleleka'
    }
  }[lang];

  return (
    <div className="space-y-32 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <h2 className="text-7xl font-black text-slate-900 tracking-tighter">{labels.title}</h2>
        <p className="text-4xl font-black text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
          {labels.headline}
        </p>
        <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
          {labels.intro}
        </p>
      </section>

      {/* Main Contact Info & Form */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
        <div className="space-y-16">
          <div className="space-y-12">
            <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">{labels.info}</h3>
            
            <div className="space-y-10">
              <div className="flex gap-8 group">
                <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center shrink-0 text-2xl group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                  <MapPin className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Physical Address</p>
                  <p className="text-2xl font-black text-slate-900 tracking-tight leading-snug">{contact.address}</p>
                  <p className="text-slate-500 font-medium mt-1">{institution.region} Region</p>
                </div>
              </div>

              <div className="flex gap-8 group">
                <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center shrink-0 text-2xl group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
                  <Phone className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Phone Number</p>
                  <p className="text-2xl font-black text-slate-900 tracking-tight">{contact.phone}</p>
                </div>
              </div>

              <div className="flex gap-8 group">
                <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center shrink-0 text-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                  <Mail className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Email Address</p>
                  <p className="text-2xl font-black text-slate-900 tracking-tight">{contact.email}</p>
                </div>
              </div>

              {contact.website && (
                <div className="flex gap-8 group">
                  <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center shrink-0 text-2xl group-hover:bg-sky-600 group-hover:text-white transition-all shadow-sm">
                    <Globe className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Official Website</p>
                    <a href={`https://${contact.website}`} target="_blank" rel="noreferrer" className="text-2xl font-black text-slate-900 tracking-tight hover:text-blue-600 transition-colors">{contact.website}</a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-8">
            <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">{labels.social}</h4>
            <div className="flex flex-wrap gap-6">
              {contact.facebook && (
                <a href={contact.facebook} target="_blank" rel="noreferrer" className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                  <Globe className="w-6 h-6" />
                </a>
              )}
              {contact.twitter && (
                <a href={contact.twitter} target="_blank" rel="noreferrer" className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-600 hover:bg-sky-500 hover:text-white transition-all shadow-sm">
                  <Globe className="w-6 h-6" />
                </a>
              )}
              {contact.linkedin && (
                <a href={contact.linkedin} target="_blank" rel="noreferrer" className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-600 hover:bg-blue-700 hover:text-white transition-all shadow-sm">
                  <Globe className="w-6 h-6" />
                </a>
              )}
              {contact.instagram && (
                <a href={contact.instagram} target="_blank" rel="noreferrer" className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-600 hover:bg-pink-600 hover:text-white transition-all shadow-sm">
                  <Globe className="w-6 h-6" />
                </a>
              )}
              {contact.youtube && (
                <a href={contact.youtube} target="_blank" rel="noreferrer" className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-600 hover:bg-red-600 hover:text-white transition-all shadow-sm">
                  <Globe className="w-6 h-6" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Inquiry Form */}
        <div>
          <InquiryForm institution={institution} lang={lang} />
        </div>
      </section>

      {/* Departmental Contacts */}
      {contact.departments && contact.departments.length > 0 && (
        <section className="space-y-16">
          <div className="text-center space-y-4">
            <h3 className="text-4xl font-black text-slate-900 tracking-tight">{labels.departments}</h3>
            <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contact.departments.map((dept, idx) => (
              <div key={idx} className="p-10 bg-white border border-slate-100 rounded-[48px] shadow-sm hover:shadow-xl transition-all group">
                <h4 className="text-xl font-black text-slate-900 mb-6 group-hover:text-blue-600 transition-colors">{dept.name}</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-slate-500">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm font-bold">{dept.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm font-bold truncate">{dept.email}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Office Hours & Emergency */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="p-16 bg-slate-50 rounded-[64px] border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-[12rem] leading-none">🕒</div>
          <div className="relative z-10 space-y-10">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm">
                <Clock className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">{labels.hours}</h3>
            </div>
            <div className="space-y-6">
              <div className="p-8 bg-white rounded-[32px] border border-slate-100 flex justify-between items-center">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Weekdays</span>
                <span className="text-lg font-black text-slate-900">{contact.officeHours}</span>
              </div>
              <div className="p-8 bg-white rounded-[32px] border border-slate-100 flex justify-between items-center">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Weekends</span>
                <span className="text-lg font-black text-slate-900 italic opacity-50">Closed</span>
              </div>
            </div>
          </div>
        </div>

        {contact.emergencyContacts && contact.emergencyContacts.length > 0 && (
          <div className="p-16 bg-rose-50 rounded-[64px] border border-rose-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-[12rem] leading-none text-rose-900">🚨</div>
            <div className="relative z-10 space-y-10">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm">
                  <AlertCircle className="w-7 h-7 text-rose-600" />
                </div>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">{labels.emergency}</h3>
              </div>
              <div className="space-y-6">
                {contact.emergencyContacts.map((emergency, idx) => (
                  <div key={idx} className="p-8 bg-white rounded-[32px] border border-rose-100 flex justify-between items-center group hover:bg-rose-600 transition-all">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-rose-100">{emergency.name}</span>
                    <span className="text-lg font-black text-slate-900 group-hover:text-white">{emergency.phone}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Campus Location & Google Maps */}
      <section className="space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-4xl font-black text-slate-900 tracking-tight">Visit Our Campus</h3>
            </div>
            <p className="text-slate-500 font-medium max-w-xl">
              We are located in the heart of {institution.region}. Follow the map below for precise directions to our main entrance.
            </p>
          </div>
          <a 
            href={contact.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(institution.name + ' ' + institution.region)}`}
            target="_blank" 
            rel="noreferrer"
            className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl flex items-center gap-3 hover:bg-blue-600 hover:-translate-y-1 transition-all"
          >
            <Navigation className="w-4 h-4" /> Open in Google Maps
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Map Container */}
          <div className="lg:col-span-8">
            <div className="h-[500px] md:h-[650px] bg-slate-100 rounded-[56px] overflow-hidden border border-slate-200 relative group shadow-2xl shadow-slate-200/50">
              <iframe 
                title="Google Maps Location"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(institution.name + ' ' + institution.region)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-1000" 
                allowFullScreen 
                loading="lazy" 
              />
              <div className="absolute top-6 left-6 px-6 py-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 pointer-events-none">
                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Location</p>
                 <p className="text-sm font-black text-slate-900">{institution.name}</p>
              </div>
            </div>
          </div>

          {/* Directions Info */}
          <div className="lg:col-span-4 space-y-10">
            <div className="p-10 bg-slate-50 border border-slate-100 rounded-[48px] space-y-10">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <Navigation className="w-5 h-5 text-blue-600" />
                  </div>
                  <h4 className="text-xl font-black text-slate-900 tracking-tight">{labels.directions}</h4>
                </div>
                
                <div className="space-y-8">
                  {contact.directions?.landmarks && (
                    <div className="space-y-3">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{labels.landmarks}</p>
                      <div className="flex flex-wrap gap-2">
                        {contact.directions.landmarks.map((l, i) => (
                          <span key={i} className="px-4 py-1.5 bg-white border border-slate-200 rounded-full text-[11px] font-bold text-slate-700 shadow-sm">{l}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {contact.directions?.transport && (
                    <div className="space-y-2">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{labels.transport}</p>
                      <p className="text-sm font-medium text-slate-600 leading-relaxed">{contact.directions.transport}</p>
                    </div>
                  )}

                  {contact.directions?.parking && (
                    <div className="space-y-2">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{labels.parking}</p>
                      <p className="text-sm font-medium text-slate-600 leading-relaxed">{contact.directions.parking}</p>
                    </div>
                  )}
                </div>
              </div>

              {contact.directions?.accessibility && (
                <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-[32px] flex items-start gap-4">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shrink-0 shadow-sm">
                    <Info className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-emerald-800 uppercase tracking-widest">{labels.accessibility}</p>
                    <p className="text-xs font-bold text-emerald-700 leading-relaxed">{contact.directions.accessibility}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Contact Card */}
            <div className="p-10 bg-blue-600 rounded-[48px] text-white shadow-2xl shadow-blue-200 space-y-6">
              <h4 className="text-lg font-black tracking-tight">Need help finding us?</h4>
              <p className="text-sm font-medium opacity-80 leading-relaxed">Call our reception desk for immediate assistance with directions.</p>
              <div className="pt-2">
                <a href={`tel:${contact.phone}`} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center group-hover:bg-white group-hover:text-blue-600 transition-all">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="text-xl font-black">{contact.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {contact.faqs && contact.faqs.length > 0 && (
        <section className="space-y-16">
          <div className="text-center space-y-4">
            <h3 className="text-4xl font-black text-slate-900 tracking-tight">{labels.faq}</h3>
            <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full" />
          </div>
          <div className="max-w-4xl mx-auto space-y-6">
            {contact.faqs.map((faq, idx) => (
              <div key={idx} className="p-10 bg-white border border-slate-100 rounded-[40px] shadow-sm hover:shadow-xl transition-all group">
                <div className="flex justify-between items-center cursor-pointer">
                  <h4 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">{faq.question}</h4>
                  <ChevronDown className="w-6 h-6 text-slate-300 group-hover:text-blue-600 transition-all" />
                </div>
                <p className="mt-6 text-slate-500 font-medium leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ContactSection;
