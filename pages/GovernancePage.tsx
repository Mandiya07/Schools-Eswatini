import React from 'react';
import SEO from '../src/components/SEO';
import { Shield, FileText, Lock, CheckCircle, Scale, Heart, Eye } from 'lucide-react';

const GovernancePage: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-24">
      <SEO 
        title="Trust, Safety & Governance" 
        description="Our commitment to the Eswatini Data Protection Act (2022), Children's Protection and Welfare Act, and inclusive education."
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-2xl mb-6">
             <Scale className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">Trust, Governance & Compliance</h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            We are committed to maintaining a secure, transparent, and legally compliant platform for education in Eswatini, prioritizing child safety and data protection.
          </p>
        </div>

        <div className="space-y-12">
          {/* Regulatory Compliance */}
          <section className="bg-white p-8 md:p-12 rounded-[40px] border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-bl-[100px] -z-10" />
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black text-slate-900">Regulatory Framework</h2>
            </div>
            
            <div className="space-y-8">
               <div>
                  <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 mb-3">
                     <div className="w-2 h-2 rounded-full bg-blue-500" />
                     Eswatini Data Protection Act (2022)
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                     Strict compliance governing how personal data is collected and processed from students, parents, and educators.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-600 ml-6">
                    <li className="list-disc">Explicit consent obtained for data collection via portals.</li>
                    <li className="list-disc">Full rights for users to access, correct, and delete personal data.</li>
                    <li className="list-disc">Robust cybersecurity measures and encrypted transit.</li>
                  </ul>
               </div>

               <div>
                  <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 mb-3">
                     <div className="w-2 h-2 rounded-full bg-blue-500" />
                     Ministry of Education and Training (MoET) Compliance
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                     Ensuring all educational content and institutional profiles align with national standards to protect parents from fraudulent entries.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-600 ml-6">
                    <li className="list-disc"><strong>Verification:</strong> Institutions must hold valid MoET registration numbers to be listed.</li>
                    <li className="list-disc"><strong>Curriculum Alignment:</strong> Academic tools align with EPC, JC, EGCSE, and international frameworks.</li>
                  </ul>
               </div>

               <div>
                  <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 mb-3">
                     <div className="w-2 h-2 rounded-full bg-blue-500" />
                     Children's Protection and Welfare Act (2012)
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                     Rigorous safeguarding of minors across our tutor matching and peer-to-peer study hubs to prevent exploitation, cyberbullying, or exposure to inappropriate content.
                  </p>
               </div>
               
               <div>
                  <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 mb-3">
                     <div className="w-2 h-2 rounded-full bg-blue-500" />
                     ESCCOM & Corporate Compliance
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                     Full compliance with the Eswatini Communications Commission (ESCCOM) regarding electronic transactions, and transparency with the ERS for taxation and invoicing.
                  </p>
               </div>
            </div>
          </section>

          {/* Ethical Requirements */}
          <section className="bg-white p-8 md:p-12 rounded-[40px] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black text-slate-900">Ethical Standards & Equity</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <Shield className="w-6 h-6 text-slate-900 mb-4" />
                  <h4 className="font-black text-slate-900 mb-2">Child Safety & Vetting</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                     Strict credential vetting for expert tutors. Peer tutors are monitored, and clear "Report Abuse" mechanisms are universally accessible across communication channels.
                  </p>
               </div>
               
               <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <Scale className="w-6 h-6 text-slate-900 mb-4" />
                  <h4 className="font-black text-slate-900 mb-2">Equity & Inclusion</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                     Search algorithms are transparent and objective, prioritizing student fit over institution marketing budgets. We ensure rural schools in Shiselweni or Lubombo have equal visibility.
                  </p>
               </div>

               <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <Lock className="w-6 h-6 text-slate-900 mb-4" />
                  <h4 className="font-black text-slate-900 mb-2">Data Privacy & AI Ethics</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                     Student academic and behavioral data is deeply anonymized for AI use and <strong>never</strong> sold to third-party advertisers or data brokers.
                  </p>
               </div>

               <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <Eye className="w-6 h-6 text-slate-900 mb-4" />
                  <h4 className="font-black text-slate-900 mb-2">Truth in Advertising</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                     Institution profiles must be strictly accurate. Claims of "100% pass rates" or specific facilities are subject to verification to protect parents from misleading claims.
                  </p>
               </div>
            </div>
          </section>

          {/* Financial Fairness */}
           <section className="bg-emerald-900 p-8 md:p-12 rounded-[40px] text-white overflow-hidden relative">
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50" />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
               <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                  <Shield className="w-8 h-8 text-emerald-400" />
               </div>
               <div>
                  <h2 className="text-2xl font-black mb-3">Financial Fairness</h2>
                  <p className="text-emerald-100 leading-relaxed max-w-2xl">
                     Our B2B and B2C monetization models are designed to be sustainable, not exploitative. We charge fair commission rates for educators and keep platform costs accessible so learning is never cost-prohibitive for Eswatini's students.
                  </p>
               </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default GovernancePage;
