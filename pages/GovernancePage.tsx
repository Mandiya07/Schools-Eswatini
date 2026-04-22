import React from 'react';
import SEO from '../src/components/SEO';
import { Shield, FileText, Lock, CheckCircle } from 'lucide-react';

const GovernancePage: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-24">
      <SEO 
        title="Governance & Policies" 
        description="Read our data governance, privacy, and moderation policies for Schools Eswatini."
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">Governance & Policies</h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
            We are committed to maintaining a secure, transparent, and authoritative platform for education in Eswatini.
          </p>
        </div>

        <div className="space-y-12">
          <section className="bg-white p-12 rounded-[40px] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black text-slate-900">Data Governance</h2>
            </div>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 leading-relaxed mb-4">
                Our data governance policy ensures that all information presented on Schools Eswatini is accurate, up-to-date, and securely managed. We partner directly with the Ministry of Education and Training (MoET) to verify institutional data.
              </p>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Verification:</strong> All schools must undergo a manual verification process before their profiles are published.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Accuracy:</strong> Exam results and performance statistics are sourced directly from official national databases.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Updates:</strong> Institutions are required to review and update their profiles annually to maintain their verified status.</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="bg-white p-12 rounded-[40px] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black text-slate-900">Privacy Policy</h2>
            </div>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 leading-relaxed mb-4">
                We take user privacy seriously. This platform complies with national data protection regulations to ensure your personal information is safe.
              </p>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Data Collection:</strong> We only collect information necessary for providing our services, such as user accounts and inquiry forms.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Data Sharing:</strong> We do not sell personal data to third parties. Information is only shared with institutions when you explicitly submit an inquiry.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Security:</strong> All data is encrypted in transit and at rest using industry-standard security protocols.</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="bg-white p-12 rounded-[40px] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black text-slate-900">Content Moderation</h2>
            </div>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 leading-relaxed mb-4">
                To maintain a high-quality environment, all user-generated content is subject to moderation.
              </p>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Reviews:</strong> Reviews must be based on genuine experiences and must not contain offensive language or personal attacks.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Media:</strong> Uploaded images and videos must be relevant to the institution and comply with our community guidelines.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Enforcement:</strong> We reserve the right to remove any content that violates these policies and suspend accounts of repeat offenders.</span>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default GovernancePage;
