import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Lock, Eye, CheckCircle2 } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6"
          >
            <ShieldCheck className="w-8 h-8 text-emerald-600" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4"
          >
            Privacy Policy
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 font-medium max-w-2xl mx-auto"
          >
            Effective Date: January 1, 2026. This policy outlines our commitment to the Eswatini Data Protection Act (2022).
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-[40px] p-8 md:p-14 border border-slate-100 shadow-sm prose prose-slate max-w-none"
        >
          <h2 className="text-2xl font-black text-slate-900 mb-6">1. Our Commitment to Your Privacy</h2>
          <p className="text-slate-600 leading-relaxed mb-8">
            Schools Eswatini respects your privacy. We are fully committed to the strict compliance requirements of the Eswatini Data Protection Act (2022). This Privacy Policy explains how we collect, use, and protect your personal information when you use our platform.
          </p>

          <h2 className="text-2xl font-black text-slate-900 mb-6">2. Data We Collect</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-600" /> Account Data
              </h4>
              <p className="text-sm text-slate-600">Name, email, and optionally phone number when you register a student, parent, or institution account.</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                <Eye className="w-4 h-4 text-emerald-600" /> Usage & Academic Data
              </h4>
              <p className="text-sm text-slate-600">Grades, timetable inputs, and AI interactions from the Study Assistant to personalize your experience.</p>
            </div>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mb-6">3. Use of Information and AI Ethics</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Our use of data is restricted to providing and improving educational outcomes. We enforce a strict ethical policy:
          </p>
          <ul className="space-y-3 mb-8">
            <li className="flex gap-3 text-slate-600">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Anonymized AI Processing:</strong> If our AI analyzes student performance to recommend schools, study materials, or subjects, the data is deeply anonymized. Personal Identifiable Information (PII) is removed.</span>
            </li>
            <li className="flex gap-3 text-slate-600">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>No Sale to Data Brokers:</strong> Student academic performance, behavioral data, and personal inquiries will <strong>never</strong> be sold to third-party advertisers or data brokers under any circumstances.</span>
            </li>
            <li className="flex gap-3 text-slate-600">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Targeted Advertising:</strong> Regional display ads for local businesses (uniform suppliers, banks) are context-driven (e.g., placing a uniform ad on a school profile), not based on granular tracking of individual children.</span>
            </li>
          </ul>

          <h2 className="text-2xl font-black text-slate-900 mb-6">4. User Rights (Data Protection Act)</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Under the Eswatini Data Protection Act, you maintain full control over your data:
          </p>
          <ul className="space-y-3 mb-8 ml-6 list-disc text-slate-600 marker:text-emerald-500">
            <li><strong>Right to Access:</strong> You may request a copy of the personal data we hold about you at any time.</li>
            <li><strong>Right to Rectification:</strong> You can update or correct inaccuracies in your profile directly via the portal or by contacting support.</li>
            <li><strong>Right to Erasure:</strong> You can request the deletion of your account and all associated personal data from our systems.</li>
          </ul>

          <h2 className="text-2xl font-black text-slate-900 mb-6">5. Cybersecurity Measures</h2>
          <p className="text-slate-600 leading-relaxed mb-8">
            We implement robust cybersecurity measures to prevent data breaches. All traffic is encrypted via SSL/TLS. Passwords and sensitive authentication tokens are hashed safely using industry-standard cryptography. We regularly audit our infrastructure to ensure the security of educational and financial transactions.
          </p>
          
          <div className="pt-8 border-t border-slate-100 text-sm text-slate-500">
            If you have privacy concerns or need to submit a data deletion request, please contact our Data Protection Officer through the platform's support channels.
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
