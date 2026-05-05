
import React from 'react';
import { InstitutionType } from '../../../../types';
import { PrimaryStudentDashboard } from './PrimaryStudentDashboard';
import { HighSchoolStudentDashboard } from './HighSchoolStudentDashboard';
import { TertiaryStudentDashboard } from './TertiaryStudentDashboard';

interface AcademicsViewProps {
  institutionType: InstitutionType | null;
}

export const AcademicsView: React.FC<AcademicsViewProps> = ({ institutionType }) => {
    switch (institutionType) {
        case InstitutionType.PRIMARY:
            return <PrimaryStudentDashboard />;
        case InstitutionType.TERTIARY:
            return <TertiaryStudentDashboard />;
        case InstitutionType.HIGH_SCHOOL:
        default:
            return <HighSchoolStudentDashboard />;
    }
};
