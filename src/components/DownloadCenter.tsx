
import React from 'react';
import { motion } from 'motion/react';
import { FileText, Download, FileCheck, FileSearch, ScrollText } from 'lucide-react';

interface DownloadCenterProps {
  downloads: { label: string; url: string }[];
  primaryColor: string;
}

const DownloadCenter: React.FC<DownloadCenterProps> = ({ downloads, primaryColor }) => {
  const getIcon = (label: string) => {
    const l = (label || '').toLowerCase();
    if (l.includes('prospectus')) return FileText;
    if (l.includes('policy')) return FileCheck;
    if (l.includes('conduct')) return ScrollText;
    if (l.includes('strategic')) return FileSearch;
    return FileText;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {downloads.map((doc, idx) => {
        const Icon = getIcon(doc.label);
        return (
          <motion.a
            key={idx}
            href={doc.url}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="p-10 bg-slate-900 text-white rounded-[48px] flex flex-col items-center text-center group hover:bg-blue-600 transition-all duration-500 shadow-xl"
          >
            <div className="w-20 h-20 bg-white/10 rounded-[28px] flex items-center justify-center mb-8 group-hover:bg-white group-hover:text-blue-600 transition-all">
              <Icon className="w-10 h-10" />
            </div>
            <h5 className="text-sm font-black uppercase tracking-widest mb-6 leading-tight h-10 flex items-center">{doc.label}</h5>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] opacity-60 group-hover:opacity-100 transition-opacity">
              <Download className="w-4 h-4" />
              Download PDF
            </div>
          </motion.a>
        );
      })}
    </div>
  );
};

export default DownloadCenter;
