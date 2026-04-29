
import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  ClipboardCheck, 
  FileText, 
  Calendar, 
  MessageSquare, 
  ShieldCheck, 
  Smartphone, 
  LifeBuoy, 
  ExternalLink,
  Lock,
  UserCircle,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { Institution } from '../../types';

interface PortalSectionProps {
  portal: Institution['sections']['portal'];
  primaryColor: string;
}

const PortalSection: React.FC<PortalSectionProps> = ({ portal, primaryColor }) => {
  const featureCards = [
    { 
      title: 'Personalized Dashboard', 
      icon: LayoutDashboard, 
      color: 'blue',
      bg: 'bg-blue-50',
      bgHover: 'group-hover:bg-blue-600',
      iconColor: 'text-blue-600',
      dot: 'bg-blue-500',
      description: 'Your central hub for academic life, featuring real-time announcements, upcoming deadlines, and a quick-view of your current academic standing.',
      items: ['Unified Calendar View', 'Real-time Notifications', 'Progress Overview']
    },
    { 
      title: 'Learning Management', 
      icon: BookOpen, 
      color: 'indigo',
      bg: 'bg-indigo-50',
      bgHover: 'group-hover:bg-indigo-600',
      iconColor: 'text-indigo-600',
      dot: 'bg-indigo-500',
      description: 'Access course materials, submit assignments directly online, and participate in interactive learning modules from anywhere.',
      items: ['Online Assignment Submission', 'Course Material Repository', 'Self-paced Learning Modules']
    },
    { 
      title: 'Assessments & Feedback', 
      icon: ClipboardCheck, 
      color: 'emerald',
      bg: 'bg-emerald-50',
      bgHover: 'group-hover:bg-emerald-600',
      iconColor: 'text-emerald-600',
      dot: 'bg-emerald-500',
      description: 'Review your grades instantly as they are posted, access detailed teacher comments, and track your performance trends over the entire term.',
      items: ['Instant Grade Tracking', 'Detailed Teacher Feedback', 'Performance Trend Analysis']
    },
    { 
      title: 'Academic Records', 
      icon: FileText, 
      color: 'amber',
      bg: 'bg-amber-50',
      bgHover: 'group-hover:bg-amber-600',
      iconColor: 'text-amber-600',
      dot: 'bg-amber-500',
      description: `Access level: ${portal.features.records.accessLevel}`,
      items: portal.features.records.list
    },
    { 
      title: 'Scheduling & Timetables', 
      icon: Calendar, 
      color: 'rose',
      bg: 'bg-rose-50',
      bgHover: 'group-hover:bg-rose-600',
      iconColor: 'text-rose-600',
      dot: 'bg-rose-500',
      description: portal.features.scheduling.description,
      items: portal.features.scheduling.list
    },
    { 
      title: 'Collaboration Tools', 
      icon: MessageSquare, 
      color: 'purple',
      bg: 'bg-purple-50',
      bgHover: 'group-hover:bg-purple-600',
      iconColor: 'text-purple-600',
      dot: 'bg-purple-500',
      description: 'Facilitate seamless communication between students and teachers through secure messaging, discussion forums, and collaborative group projects.',
      items: ['Secure Messaging', 'Discussion Forums', 'Group Project Sync']
    }
  ];

  return (
    <div className="space-y-32 pb-20">
      {/* Hero Section */}
      <section className="relative p-16 md:p-24 bg-slate-900 text-white rounded-[80px] overflow-hidden shadow-3xl">
        <div className="absolute top-0 right-0 p-24 opacity-10 text-[15rem] leading-none select-none">💻</div>
        <div className="relative z-10 max-w-3xl space-y-10">
          <div className="space-y-4">
            <span className="px-4 py-2 bg-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">
              {portal.name}
            </span>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]">
              {portal.headline}
            </h2>
          </div>
          <p className="text-2xl text-slate-400 font-medium leading-relaxed">
            {portal.description}
          </p>
          <div className="flex flex-wrap gap-6">
            {portal.url ? (
              <a 
                href={portal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-12 py-6 bg-blue-600 hover:bg-white hover:text-slate-900 text-white rounded-[32px] font-black uppercase tracking-widest text-xs transition-all flex items-center gap-3 shadow-2xl shadow-blue-500/20"
              >
                Launch External Portal
                <ExternalLink className="w-4 h-4" />
              </a>
            ) : (
              <Link 
                to="/portal" 
                className="px-12 py-6 bg-blue-600 hover:bg-white hover:text-slate-900 text-white rounded-[32px] font-black uppercase tracking-widest text-xs transition-all flex items-center gap-3 shadow-2xl shadow-blue-500/20"
              >
                Login to Portal
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Access & Login Info */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="p-12 bg-white border border-slate-100 rounded-[56px] shadow-sm space-y-8">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
            <Lock className="w-7 h-7 text-blue-600" />
          </div>
          <h4 className="text-2xl font-black text-slate-900 tracking-tight">Login Requirements</h4>
          <div className="space-y-4">
            {portal.loginRequirements.map((req, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span className="text-slate-700 font-bold">{req}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-12 bg-white border border-slate-100 rounded-[56px] shadow-sm space-y-8">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center">
            <UserCircle className="w-7 h-7 text-indigo-600" />
          </div>
          <h4 className="text-2xl font-black text-slate-900 tracking-tight">Supported Roles</h4>
          <div className="flex flex-wrap gap-3">
            {portal.rolesSupported.map((role, idx) => (
              <span key={idx} className="px-5 py-2.5 bg-slate-50 rounded-2xl text-sm font-bold text-slate-700 border border-slate-100">
                {role}
              </span>
            ))}
          </div>
        </div>

        <div className="p-12 bg-slate-50 rounded-[56px] border border-slate-100 space-y-8">
          <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm">
            <ArrowRight className="w-7 h-7 text-slate-400" />
          </div>
          <h4 className="text-2xl font-black text-slate-900 tracking-tight">Account Creation</h4>
          <p className="text-slate-600 font-medium leading-relaxed">
            {portal.accountCreationProcess}
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="space-y-16">
        <div className="text-center space-y-4">
          <h3 className="text-4xl font-black text-slate-900 tracking-tight">Portal Features</h3>
          <p className="text-slate-500 font-medium">Everything you need to succeed in one place</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureCards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-12 bg-white border border-slate-100 rounded-[64px] shadow-sm hover:shadow-2xl transition-all group"
            >
              <div className={`w-16 h-16 rounded-3xl ${card.bg} flex items-center justify-center mb-10 ${card.bgHover} transition-colors`}>
                <card.icon className={`w-8 h-8 ${card.iconColor} group-hover:text-white transition-colors`} />
              </div>
              <h5 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{card.title}</h5>
              <p className="text-slate-500 font-medium leading-relaxed mb-8">{card.description}</p>
              <div className="space-y-3">
                {card.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-1.5 h-1.5 rounded-full ${card.dot}`} />
                    <span className="text-sm font-bold text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Parent Access & Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {portal.features.parentAccess?.enabled && (
          <section className="p-14 bg-emerald-900 text-white rounded-[64px] shadow-2xl space-y-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-14 opacity-10">
              <UserCircle className="w-40 h-40" />
            </div>
            <div className="relative z-10 space-y-8">
              <h4 className="text-3xl font-black tracking-tight">Parent Access</h4>
              <p className="text-emerald-100 font-medium text-lg leading-relaxed">
                Parents can stay involved in their child's academic journey with dedicated access to key information.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {portal.features.parentAccess.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 bg-white/10 rounded-2xl border border-white/10">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span className="text-sm font-bold">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="p-14 bg-slate-50 rounded-[64px] border border-slate-100 space-y-10">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-sm">
              <Smartphone className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="text-3xl font-black text-slate-900 tracking-tight">Mobile Access</h4>
          </div>
          <div className="space-y-8">
            <div className="flex flex-wrap gap-3">
              {portal.mobileAccess.list.map((item, idx) => (
                <span key={idx} className="px-6 py-3 bg-white rounded-2xl text-xs font-black uppercase tracking-widest border border-slate-200 shadow-sm">
                  {item}
                </span>
              ))}
            </div>
            <div className="space-y-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Supported Devices</p>
              <div className="flex gap-4">
                {portal.mobileAccess.devices.map((device, idx) => (
                  <div key={idx} className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">
                    {device}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Security & Support */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 p-14 bg-white border border-slate-100 rounded-[64px] shadow-sm space-y-12">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-blue-50 rounded-3xl flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="text-3xl font-black text-slate-900 tracking-tight">Security & Privacy</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portal.security.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <Lock className="w-5 h-5 text-slate-400" />
                <span className="text-sm font-bold text-slate-700">{item}</span>
              </div>
            ))}
          </div>
          <div className="p-8 bg-blue-50 rounded-[40px] border border-blue-100">
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">Usage Guidelines</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Policy</p>
                <p className="text-xs font-bold text-slate-700">{portal.usageGuidelines.policy}</p>
              </div>
              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Rules</p>
                <p className="text-xs font-bold text-slate-700">{portal.usageGuidelines.rules}</p>
              </div>
              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Expectations</p>
                <p className="text-xs font-bold text-slate-700">{portal.usageGuidelines.expectations}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="p-14 bg-slate-900 text-white rounded-[64px] space-y-12">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center">
              <LifeBuoy className="w-8 h-8 text-blue-400" />
            </div>
            <h4 className="text-3xl font-black tracking-tight">Technical Support</h4>
          </div>
          <div className="space-y-8">
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Email Support</p>
                <p className="text-lg font-bold">{portal.support.email}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Phone</p>
                <p className="text-lg font-bold">{portal.support.phone}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Support Hours</p>
                <p className="text-lg font-bold">{portal.support.hours}</p>
              </div>
            </div>
            <div className="pt-8 border-t border-white/10 space-y-4">
              <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Help Resources</p>
              <div className="flex flex-wrap gap-2">
                {portal.support.resources.map((res, idx) => (
                  <span key={idx} className="px-4 py-2 bg-white/5 rounded-xl text-[10px] font-bold border border-white/10">
                    {res}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PortalSection;
