import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Institution } from '../../types';
import MissionSection from '../../src/components/MissionSection';
import VisionSection from '../../src/components/VisionSection';
import CoreValuesSection from '../../src/components/CoreValuesSection';
import LeadershipSection from '../../src/components/LeadershipSection';
import AccreditationSection from '../../src/components/AccreditationSection';
import StatisticsPanel from '../../src/components/StatisticsPanel';
import CampusOverview from '../../src/components/CampusOverview';
import CommunityImpact from '../../src/components/CommunityImpact';
import DownloadCenter from '../../src/components/DownloadCenter';
import HistorySection from '../../src/components/HistorySection';

export const InstitutionAbout: React.FC = () => {
  const { inst } = useOutletContext<{ inst: Institution }>();
  const about = inst.sections?.about;

  if (!about) return <div className="p-10 text-center">About information is being updated.</div>;

  return (
    <div className="space-y-32">
      <section className="space-y-10">
        <h2 className="text-7xl font-black text-slate-900 tracking-tighter">Our Legacy</h2>
        <p className="text-2xl text-slate-500 font-medium leading-relaxed max-w-3xl">{about.overview}</p>
      </section>

      <section className="space-y-16">
        <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Our Mission</h3>
        <MissionSection mission={about.mission} primaryColor={inst.theme.primaryColor} />
      </section>

      <section className="space-y-16">
        <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">The Vision</h3>
        <VisionSection vision={about.vision} primaryColor={inst.theme.primaryColor} />
      </section>

      <section className="space-y-16">
        <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Core Values</h3>
        <CoreValuesSection values={about.coreValues} primaryColor={inst.theme.primaryColor} />
      </section>

      <section className="space-y-16">
        <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Leadership Profile</h3>
        <LeadershipSection leadership={about.leadership} primaryColor={inst.theme.primaryColor} />
      </section>

      <section className="space-y-16">
        <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Accreditation & Compliance</h3>
        <AccreditationSection accreditation={about.accreditation} primaryColor={inst.theme.primaryColor} />
      </section>

      <section className="space-y-16">
        <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Institutional Statistics</h3>
        <StatisticsPanel statistics={about.statistics} primaryColor={inst.theme.primaryColor} />
      </section>

      <section className="space-y-16">
        <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Campus Overview</h3>
        <CampusOverview facilities={about.facilities} primaryColor={inst.theme.primaryColor} />
      </section>

      <section className="space-y-16">
        <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Community Impact</h3>
        <CommunityImpact community={about.community} primaryColor={inst.theme.primaryColor} />
      </section>

      <section className="space-y-16">
        <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Download Center</h3>
        <DownloadCenter downloads={about.downloads} primaryColor={inst.theme.primaryColor} />
      </section>

      <section className="space-y-16">
        <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Our Journey</h3>
        <HistorySection foundingBackground={about.foundingBackground} history={about.history} primaryColor={inst.theme.primaryColor} />
      </section>
    </div>
  );
};
