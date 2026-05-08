import React from 'react';
import { motion } from 'motion/react';
import { FileText, ShieldAlert, CheckCircle2 } from 'lucide-react';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6"
          >
            <FileText className="w-8 h-8 text-blue-600" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4"
          >
            Terms of Service
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 font-medium max-w-2xl mx-auto"
          >
            Effective Date: January 1, 2026. Please read these terms carefully before using the Schools Eswatini platform.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-[40px] p-8 md:p-14 border border-slate-100 shadow-sm prose prose-slate max-w-none"
        >
          <h2 className="text-2xl font-black text-slate-900 mb-6">1. Acceptance of Terms</h2>
          <p className="text-slate-600 leading-relaxed mb-8">
            By accessing and using Schools Eswatini ("the Platform"), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our services. These terms comply with the laws of the Kingdom of Eswatini, including the Eswatini Communications Commission (ESCCOM) guidelines on electronic transactions.
          </p>

          <h2 className="text-2xl font-black text-slate-900 mb-6">2. Eligibility & Child Safety</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            In compliance with the Children's Protection and Welfare Act (2012), the Platform prioritizes the safety of minors:
          </p>
          <ul className="space-y-3 mb-8">
            <li className="flex gap-3 text-slate-600">
              <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <span>Users under the age of 18 should use the Platform under the guidance of a parent or guardian, especially when making transactions (e.g., in the Tutoring Marketplace).</span>
            </li>
            <li className="flex gap-3 text-slate-600">
              <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <span>We actively monitor public peer-to-peer study hubs. Harmful content, cyberbullying, and inappropriate behavior are strictly prohibited and will result in an immediate ban.</span>
            </li>
          </ul>

          <h2 className="text-2xl font-black text-slate-900 mb-6">3. Accounts & Verification</h2>
          <h3 className="text-xl font-bold text-slate-800 mb-4">Institutional Accounts</h3>
          <p className="text-slate-600 leading-relaxed mb-4">
            Schools and educational institutions listing their profiles must maintain a valid Ministry of Education and Training (MoET) registration. We continuously verify listed schools to prevent fraudulent operations.
          </p>
          <h3 className="text-xl font-bold text-slate-800 mb-4">Tutoring Accounts</h3>
          <p className="text-slate-600 leading-relaxed mb-8">
            Educators and tutors opting into our marketplace must represent their credentials accurately. We maintain the right to verify certifications and suspend accounts misrepresenting their qualifications. 
          </p>

          <h2 className="text-2xl font-black text-slate-900 mb-6">4. Financial Fairness & Transactions</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Schools Eswatini provides B2B SaaS solutions for schools and B2C tutoring matching:
          </p>
          <ul className="space-y-3 mb-8">
            <li className="flex gap-3 text-slate-600">
              <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <span><strong>Tutors & Freelancers:</strong> We collect a transparent platform commission (up to 10-15%) or a flat monthly fee for marketplace usage. By completing services on our platform, you agree to these deductions.</span>
            </li>
            <li className="flex gap-3 text-slate-600">
              <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <span><strong>Advertisers:</strong> Advertising spots for regional banners and search results are billed monthly according to the agreed-upon rates.</span>
            </li>
          </ul>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mt-10">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 mb-3">
              <ShieldAlert className="w-5 h-5 text-rose-500" />
              Limitation of Liability
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              While we verify institutional MoET registrations and monitor the tutoring marketplace, Schools Eswatini acts purely as a facilitator. We will not be held liable for any direct or indirect damages arising out of the performance of a tutor or external institution, or any inaccuracies in external promotional materials provided by the schools, subject to our Truth in Advertising policies.
            </p>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;
