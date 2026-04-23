
import React from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, 
  FileText, 
  CheckCircle2, 
  Clock, 
  CreditCard, 
  HelpCircle, 
  Phone, 
  Mail, 
  MapPin,
  GraduationCap,
  Home,
  Globe,
  ArrowRight,
  Download,
  Trophy,
  Award
} from 'lucide-react';
import { Institution } from '../../types';

interface AdmissionsSectionProps {
  admissions: Institution['sections']['admissions'];
  primaryColor: string;
}

const AdmissionsSection: React.FC<AdmissionsSectionProps> = ({ admissions, primaryColor }) => {
  return (
    <div className="space-y-24 pb-20">
      {/* Overview */}
      <section className="relative">
        <div className="max-w-3xl">
          <h2 className="text-5xl font-black text-slate-900 tracking-tight mb-8 leading-tight">
            {admissions.headline}
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed font-medium">
            {admissions.introduction}
          </p>
          <div className="flex flex-wrap gap-4 mt-10">
            {admissions.allowOnlineApplications && admissions.onlineApplicationUrl && (
              <a 
                href={admissions.onlineApplicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl hover:bg-blue-600 transition-all hover:scale-105 active:scale-95"
              >
                Apply Online Now
                <Globe className="w-5 h-5" />
              </a>
            )}
            {admissions.scholarshipApplicationLink && (
              <a 
                href={admissions.scholarshipApplicationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white border-2 border-slate-900 text-slate-900 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-50 transition-all hover:scale-105 active:scale-95"
              >
                Scholarship Portal
                <Trophy className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Programs & Requirements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-12 bg-white border border-slate-100 rounded-[48px] shadow-sm space-y-10"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Available Programs</h3>
          </div>
          
          <div className="space-y-8">
            {admissions.programs.map((prog, idx) => (
              <div key={idx} className="space-y-4">
                <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">{prog.level}</h4>
                <div className="flex flex-wrap gap-3">
                  {prog.items.map((item, i) => (
                    <span key={i} className="px-5 py-2.5 bg-slate-50 rounded-2xl text-sm font-bold text-slate-700 border border-slate-100">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-12 bg-slate-900 text-white rounded-[48px] shadow-2xl space-y-10"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-2xl font-black tracking-tight">Admission Requirements</h3>
          </div>

          <div className="grid grid-cols-1 gap-8">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Academic & Documents</p>
              <div className="space-y-3">
                {[...admissions.requirements.academic, ...admissions.requirements.documents].map((req, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-slate-200">{req}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Process Steps */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h3 className="text-3xl font-black text-slate-900 tracking-tight">Application Process</h3>
          <p className="text-slate-500 font-medium">Follow these simple steps to join our institution</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {admissions.processSteps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-10 bg-white border border-slate-100 rounded-[40px] relative group hover:border-blue-500 transition-colors"
            >
              <div className="text-6xl font-black text-slate-50 absolute top-6 right-8 group-hover:text-blue-50 transition-colors">
                {step.step}
              </div>
              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                  <ArrowRight className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" />
                </div>
                <p className="text-lg font-bold text-slate-900 leading-tight">
                  {step.instruction}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Fees & Scholarships */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <section className="p-12 bg-slate-50 rounded-[48px] border border-slate-100 space-y-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Tuition & Fees</h3>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-white rounded-3xl border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Per Term</p>
                <p className="text-2xl font-black text-slate-900">{admissions.tuitionFees.perTerm}</p>
              </div>
              <div className="p-6 bg-white rounded-3xl border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Per Year</p>
                <p className="text-2xl font-black text-slate-900">{admissions.tuitionFees.perYear}</p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Additional Fees</p>
              {admissions.tuitionFees.additional.map((fee, idx) => (
                <div key={idx} className="flex justify-between items-center p-4 bg-white rounded-2xl border border-slate-100">
                  <span className="font-bold text-slate-700">{fee.label}</span>
                  <span className="font-black text-blue-600">{fee.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="p-12 bg-blue-600 text-white rounded-[48px] shadow-xl space-y-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Trophy className="w-40 h-40" />
          </div>
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-black tracking-tight">Scholarships</h3>
          </div>

          <div className="space-y-8 relative z-10">
            <div className="flex flex-wrap gap-3">
              {admissions.scholarships.types.map((type, idx) => (
                <span key={idx} className="px-4 py-2 bg-white/10 rounded-xl text-xs font-bold border border-white/10">
                  {type}
                </span>
              ))}
            </div>
            
            <div className="space-y-4">
              <p className="text-sm font-medium text-blue-50 leading-relaxed">
                <span className="block text-[10px] font-black text-blue-200 uppercase tracking-widest mb-2">Eligibility</span>
                {admissions.scholarships.eligibility}
              </p>
              <p className="text-sm font-medium text-blue-50 leading-relaxed">
                <span className="block text-[10px] font-black text-blue-200 uppercase tracking-widest mb-2">How to Apply</span>
                {admissions.scholarships.howToApply}
              </p>
            </div>

            {admissions.scholarshipApplicationLink && (
              <a 
                href={admissions.scholarshipApplicationLink}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-colors"
              >
                Apply for Scholarship
                <ArrowRight className="w-4 h-4" />
              </a>
            )}
          </div>
          
          {admissions.scholarshipOpportunities && admissions.scholarshipOpportunities.length > 0 && (
            <div className="mt-10 space-y-4">
              <h4 className="text-sm font-black text-blue-200 uppercase tracking-widest">Available Opportunities</h4>
              <div className="grid gap-4">
                {admissions.scholarshipOpportunities.map((s, i) => (
                  <div key={i} className="p-6 bg-white/10 rounded-2xl border border-white/10 flex justify-between items-center text-white">
                    <div>
                      <p className="font-bold text-white">{s.name}</p>
                      <p className="text-xs text-blue-100 mt-1">{s.criteria} | <span className="font-bold text-emerald-300">{s.amount}</span></p>
                      <p className="text-[10px] text-blue-200 mt-1">Deadline: {s.deadline}</p>
                    </div>
                    {s.applicationLink && (
                      <a href={s.applicationLink} target="_blank" rel="noopener" className="px-4 py-2 bg-white text-blue-800 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-blue-50">Apply</a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Boarding & International */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {admissions.boardingInfo && (
          <section className="p-12 bg-white border border-slate-100 rounded-[48px] space-y-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center">
                <Home className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Boarding Info</h3>
            </div>
            
            <div className="space-y-6">
              <p className="text-slate-600 font-medium leading-relaxed">{admissions.boardingInfo.description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                {admissions.boardingInfo.facilities.map((fac, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-500" />
                    <span className="text-sm font-bold text-slate-700">{fac}</span>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-slate-50 rounded-3xl space-y-4">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Supervision</p>
                  <p className="text-sm font-medium text-slate-700">{admissions.boardingInfo.supervision}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Code of Conduct</p>
                  <p className="text-sm font-medium text-slate-700">{admissions.boardingInfo.conduct}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {admissions.internationalStudents && (
          <section className="p-12 bg-white border border-slate-100 rounded-[48px] space-y-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
                <Globe className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">International Students</h3>
            </div>

            <div className="space-y-6">
              <p className="text-slate-600 font-medium leading-relaxed">{admissions.internationalStudents.overview}</p>
              
              <div className="space-y-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Requirements</p>
                <div className="flex flex-wrap gap-3">
                  {admissions.internationalStudents.requirements.map((req, idx) => (
                    <span key={idx} className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-bold border border-emerald-100">
                      {req}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-emerald-900 text-white rounded-3xl">
                <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2">Support Services</p>
                <p className="text-sm font-medium">{admissions.internationalStudents.support}</p>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Important Dates & Contact */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 p-12 bg-slate-50 rounded-[48px] border border-slate-100 space-y-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Important Dates</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {admissions.importantDates.map((date, idx) => (
              <div key={idx} className="flex items-center gap-4 p-5 bg-white rounded-3xl border border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{date.event}</p>
                  <p className="text-sm font-bold text-slate-900">{date.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="p-12 bg-slate-900 text-white rounded-[48px] space-y-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
              <Phone className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-2xl font-black tracking-tight">Contact Us</h3>
          </div>

          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Email</p>
                  <p className="text-sm font-bold">{admissions.contact.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Phone</p>
                  <p className="text-sm font-bold">{admissions.contact.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Office Hours</p>
                  <p className="text-sm font-bold">{admissions.contact.hours}</p>
                </div>
              </div>
            </div>

            {admissions.allowOnlineApplications && (
              <a 
                href={admissions.onlineApplicationUrl}
                className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-3xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
              >
                Apply Online Now
                <ArrowRight className="w-5 h-5" />
              </a>
            )}
          </div>
        </section>
      </div>

      {/* FAQ */}
      <section className="space-y-12">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center">
            <HelpCircle className="w-6 h-6 text-slate-600" />
          </div>
          <h3 className="text-3xl font-black text-slate-900 tracking-tight">Frequently Asked Questions</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {admissions.faqs.map((faq, idx) => (
            <div key={idx} className="p-8 bg-white border border-slate-100 rounded-[32px] space-y-3">
              <h4 className="text-lg font-bold text-slate-900 leading-tight">{faq.question}</h4>
              <p className="text-slate-500 font-medium leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdmissionsSection;
