import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Institution } from '../../types';
import NewsEventsSection from '../../src/components/NewsEventsSection';

export const InstitutionNews: React.FC = () => {
  const { inst } = useOutletContext<{ inst: Institution }>();
  
  const news = inst.sections?.news;
  if (!news) return <div className="p-10 text-center">News information is being updated.</div>;

  return (
    <div className="space-y-32">
      <h2 className="text-7xl font-black text-slate-900 tracking-tighter">News & Media</h2>
      <NewsEventsSection news={news} primaryColor={inst.theme.primaryColor} />
    </div>
  );
};
