
import React from 'react';
import { BannerAd as BannerAdType } from '../../types';
import { ExternalLink } from 'lucide-react';

interface BannerAdProps {
  ad: BannerAdType;
}

const BannerAd: React.FC<BannerAdProps> = ({ ad }) => {
  if (!ad.active) return null;

  return (
    <a 
      href={ad.linkUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group relative block w-full overflow-hidden rounded-[48px] bg-slate-900 aspect-[21/9] md:aspect-[32/9]"
    >
      <img src={ad.imageUrl || undefined} 
        alt="Sponsored Advertisement" 
        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex flex-col justify-end p-8 md:p-12">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border border-white/20">
            Sponsored
          </span>
        </div>
        <div className="flex justify-between items-end">
          <p className="text-white/80 text-xs font-bold max-w-md">
            Discover educational opportunities and resources from our partners.
          </p>
          <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-slate-900 shadow-xl group-hover:bg-blue-600 group-hover:text-white transition-all">
            <ExternalLink className="w-5 h-5" />
          </div>
        </div>
      </div>
    </a>
  );
};

export default BannerAd;
