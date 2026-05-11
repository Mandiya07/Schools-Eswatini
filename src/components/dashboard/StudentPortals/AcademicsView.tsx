
import React from 'react';
import { InstitutionType, User } from '../../../../types';
import { PrimaryStudentDashboard } from './PrimaryStudentDashboard';
import { HighSchoolStudentDashboard } from './HighSchoolStudentDashboard';
import { TertiaryStudentDashboard } from './TertiaryStudentDashboard';

interface AcademicsViewProps {
  institutionType: InstitutionType | null;
  user?: User | null;
}

export const AcademicsView: React.FC<AcademicsViewProps> = ({ institutionType, user }) => {
    switch (institutionType) {
        case InstitutionType.PRIMARY:
            return <PrimaryStudentDashboard />;
        case InstitutionType.TERTIARY:
            return <TertiaryStudentDashboard />;
        case InstitutionType.HIGH_SCHOOL:
        default:
            return <HighSchoolStudentDashboard user={user} />;
    }
};
