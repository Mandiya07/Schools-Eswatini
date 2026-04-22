import React from 'react';

interface AdvertisementProps {
  type: 'banner' | 'card' | 'sidebar';
  className?: string;
}

const mockAds = {
  banner: {
    title: "Back to School Mega Sale!",
    sponsor: "Stationery Hub Swaziland",
    description: "Get 20% off all calculators, textbooks, and geometry sets. Free delivery in Mbabane and Manzini.",
    cta: "Shop Now",
    bgColor: "bg-amber-100",
    textColor: "text-amber-900",
    badgeColor: "bg-amber-200 text-amber-800",
  },
  card: {
    title: "Secure Your Child's Future",
    sponsor: "SwaziBank Student Accounts",
    description: "Zero maintenance fees. Free withdrawals at ATMs. Start their financial journey today with a SwaziBank Student Account.",
    cta: "Open Account",
    bgColor: "bg-blue-50",
    textColor: "text-blue-900",
    badgeColor: "bg-blue-100 text-blue-800",
  },
  sidebar: {
    title: "Fastest Internet for Schools",
    sponsor: "Eswatini Mobile",
    description: "Upgrade your school's internet with our new 5G Edu-Routers. Special pricing for MoET registered institutions.",
    cta: "Get a Quote",
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-900",
    badgeColor: "bg-emerald-100 text-emerald-800",
  }
};

const Advertisement: React.FC<AdvertisementProps> = ({ type, className = '' }) => {
  const ad = mockAds[type];

  if (type === 'card' || type === 'sidebar') {
    return (
      <div className={`p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow ${ad.bgColor} ${className}`}>
        <div className="absolute top-4 right-4">
          <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full ${ad.badgeColor}`}>
            Sponsored
          </span>
        </div>
        <h4 className={`text-[10px] font-black uppercase tracking-widest mb-1 opacity-70 ${ad.textColor}`}>
          {ad.sponsor}
        </h4>
        <h3 className={`text-xl font-bold mb-2 leading-tight ${ad.textColor}`}>
          {ad.title}
        </h3>
        <p className={`text-sm mb-6 opacity-80 ${ad.textColor}`}>
          {ad.description}
        </p>
        <button className={`text-xs font-black uppercase tracking-widest px-4 py-2 rounded-lg bg-white shadow-sm border border-transparent hover:border-slate-300 transition-all ${ad.textColor}`}>
          {ad.cta} &rarr;
        </button>
      </div>
    );
  }

  // Banner
  return (
    <div className={`w-full p-4 md:p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-slate-200 shadow-sm ${ad.bgColor} ${className}`}>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${ad.badgeColor}`}>
            Sponsored
          </span>
          <h4 className={`text-[10px] font-black uppercase tracking-widest opacity-70 ${ad.textColor}`}>
            {ad.sponsor}
          </h4>
        </div>
        <h3 className={`text-lg font-bold mb-1 ${ad.textColor}`}>
          {ad.title}
        </h3>
        <p className={`text-sm opacity-80 max-w-2xl ${ad.textColor}`}>
          {ad.description}
        </p>
      </div>
      <button className={`shrink-0 text-xs font-black uppercase tracking-widest px-6 py-3 rounded-xl bg-white shadow-sm border border-transparent hover:border-slate-300 transition-all ${ad.textColor}`}>
        {ad.cta}
      </button>
    </div>
  );
};

export default Advertisement;
