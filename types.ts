
export interface WellnessArticle {
  id: number;
  title: string;
  desc: string;
  readTime: string;
}

export enum Region {
  HHOHHO = 'Hhohho',
  MANZINI = 'Manzini',
  LUBOMBO = 'Lubombo',
  SHISELWENI = 'Shiselweni'
}

export enum InstitutionType {
  PRIMARY = 'Primary',
  HIGH_SCHOOL = 'High School',
  TERTIARY = 'Tertiary',
  PRIVATE = 'Private',
  PUBLIC = 'Public',
  ASSOCIATION = 'Association'
}

export enum SubscriptionPlan {
  FREE = 'Free Listing',
  STANDARD_B2B = 'Standard Portal',
  PREMIUM_B2B = 'Premium Suite',
  ENTERPRISE_B2B = 'Enterprise'
}

export interface BillingRecord {
  id: string;
  date: string;
  amount: number;
  description: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  method: 'EFT' | 'MoMo' | 'Cheque' | 'Card';
  invoiceUrl?: string;
}

export interface MoMoTransaction {
  id: string;
  referenceId: string;
  amount: number;
  type: 'school_fees' | 'uniform' | 'safari_trip' | 'scholarship_premium' | 'registration';
  status: 'Completed' | 'Pending' | 'Failed';
  timestamp: string;
  phoneNumber: string;
  studentId?: string;
}

export enum UserRole {
  SUPER_ADMIN = 'Super Admin',
  INSTITUTION_ADMIN = 'Institution Admin',
  DEPARTMENT_HEAD = 'Department Head',
  FINANCE_OFFICER = 'Finance Officer',
  TEACHER = 'Teacher',
  STUDENT = 'Student',
  PARENT = 'Parent',
  MOET_OFFICIAL = 'MoET Official',
  SYSTEM_AUDITOR = 'System Auditor',
  VISITOR = 'Visitor'
}

export interface ExamResult {
  id?: string;
  year: number;
  level: 'JC' | 'SGCSE' | 'IGCSE' | 'IB' | 'EGCSE' | 'EPC';
  passRate: number;
  merits: number;
  credits: number;
  topPerformers?: { name: string; position: number }[];
  regionalPerformance?: { region: string; average: number }[];
  averageScore?: number;
  topStudent?: string;
}

export interface SchoolPerformance {
  id?: string;
  institutionId?: string;
  year: number;
  nationalRanking: number;
  regionalRanking: number;
  valueAddedScore: number;
  studentGrowth: number;
  academicGrowth?: number;
  teacherStudentRatio?: string;
  infrastructureRating?: number;
  extracurricularBreadth?: number;
  complianceScore?: number;
  category?: string;
}

export interface PolicyAnnouncement {
  id: string;
  title: string;
  content: string;
  category: 'curriculum' | 'safety' | 'finance' | 'general' | 'policy';
  date: string;
  isUrgent: boolean;
  attachmentUrl?: string;
  author?: string;
}

export interface AccessibilitySettings {
  highContrast: boolean;
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  language: 'en' | 'ss';
}

export interface WorkflowTask {
  id: string;
  institutionId: string;
  title: string;
  description: string;
  status: 'pending' | 'completed' | 'overdue' | 'Pending' | 'In Progress' | 'New';
  dueDate?: string;
  date?: string;
  type: 'document_expiry' | 'application_review' | 'inquiry_followup' | 'warning' | 'info' | 'success';
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  isRead: boolean;
  createdAt: string;
}

export enum GenderType {
  BOYS = 'Boys',
  GIRLS = 'Girls',
  MIXED = 'Mixed'
}

export interface Review {
  id: string;
  institutionId: string;
  userId: string;
  userName: string;
  userRole: 'parent' | 'alumni' | 'visitor';
  rating: number;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface Message {
  id: string;
  institutionId: string;
  senderId?: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  body: string;
  status: 'unread' | 'read' | 'archived';
  isDirectInquiry: boolean;
  createdAt: string;
  adminReply?: {
    body: string;
    adminName: string;
    createdAt: string;
    adminId: string;
  };
}

export interface AlumniProfile {
  id: string;
  userId: string;
  institutionId: string;
  graduationYear: number;
  major?: string;
  currentJob?: string;
  bio?: string;
  isPublic: boolean;
  createdAt: string;
}

export interface SuccessStory {
  id: string;
  institutionId: string;
  alumniId: string;
  alumniName: string;
  title: string;
  story: string;
  image?: string;
  createdAt: string;
}

export interface FundraisingCampaign {
  id: string;
  institutionId: string;
  title: string;
  description: string;
  goalAmount: number;
  currentAmount: number;
  deadline: string;
  createdAt: string;
}

export interface ScholarshipDetail {
  name: string;
  amount: string;
  criteria: string;
  deadline: string;
  applicationLink?: string;
}

export interface ScholarshipItem {
  institutionId: string;
  institutionName: string;
  type: string;
  eligibility: string;
  deadline?: string;
}

export interface QuickLink {
  label: string;
  url: string;
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  content: string;
  priority: 'High' | 'Medium' | 'Low';
  isFeatured?: boolean;
}

export interface CoreValue {
  name: string;
  description: string;
  icon?: string;
  example?: string;
  quote?: {
    text: string;
    author: string;
  };
}

export interface Milestone {
  year: string;
  event: string;
}

export interface LeadershipMember {
  name: string;
  title: string;
  description?: string;
  bio?: string;
  photo?: string;
  qualifications?: string;
  experience?: string;
  achievements?: string[];
  philosophy?: string;
  personalMessage?: string;
  linkedin?: string;
  videoUrl?: string;
  cvUrl?: string;
}

export interface AcademicProgram {
  id: string;
  name: string;
  qualification: string;
  duration: string;
  subjects: string[];
  requirements: string | {
    academic: string[];
    documents: string[];
    additional: string[];
  };
  description: string;
  pathways?: string;
  syllabusUrl?: string;
  courseOutlineUrl?: string;
}

export interface DigitalDocument {
  id: string;
  name: string;
  category: 'Form' | 'Policy' | 'Newsletter' | 'Handbook';
  url: string;
  uploadedAt: string;
  size: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: 'Academic' | 'Sports' | 'Events' | 'Announcements' | 'Achievements' | 'Community';
  date: string;
  excerpt: string;
  content?: string;
  image: string;
  media?: { url: string; caption?: string; type: 'image' | 'video' }[];
  author?: string;
  tags?: string[];
}

export interface EventItem {
  id: string;
  title: string;
  type: 'Academic' | 'Sports' | 'Cultural' | 'Meeting' | 'Examination' | 'Community';
  date: string;
  time: string;
  location: string;
  organizer: string;
  host?: string; // Optional alias for organizer
  description: string;
  registrationRequired: boolean;
  registrationLink?: string;
  registrationDeadline?: string;
  isPast?: boolean;
  highlights?: string[];
  media?: { url: string; caption?: string; type: 'image' | 'video' }[];
  mediaUrl?: string; // Simple media URL as requested
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  healthScore: number;
}

export interface AcademicDepartment {
  id?: string | number;
  name: string;
  head: string;
  subjects: string[];
  overview: string;
  icon?: string;
}

export interface BannerAd {
  id: string;
  imageUrl: string;
  linkUrl: string;
  position: 'homepage' | 'sidebar' | 'search_results';
  active: boolean;
  startDate: string;
  endDate: string;
}

export interface Institution {
  id: string;
  name: string;
  downloads?: { label: string; url: string }[];
  slug: string;
  subdomain?: string;
  logo: string;
  coverImage: string;
  region: Region;
  type: InstitutionType[];
  isVerified: boolean;
  verificationStatus?: 'pending' | 'verified' | 'rejected' | 'unverified';
  verificationDocuments?: string[];
  isAccredited: boolean;
  moetRegistration: string;
  lastInspectionDate?: string;
  nextInspectionDate?: string;
  isFeatured: boolean;
  isSpotlight: boolean;
  trustScore: number;
  seoScore: number;
  isFlagged?: boolean;
  flagReason?: string;
  accreditationStatus?: 'accredited' | 'provisional' | 'expired' | 'not_accredited';
  examResults?: ExamResult[];
  performanceHistory?: SchoolPerformance[];
  plan: SubscriptionPlan;
  subscription?: {
    plan: SubscriptionPlan;
    expiryDate: string;
    isAutoRenewValue: boolean;
    billingHistory: BillingRecord[];
  };
  monetization?: {
    isEnabled: boolean;
    momoMerchantId?: string;
    feesEnabled: boolean;
    scholarshipPremiumEnabled: boolean;
    alumniDonationsEnabled: boolean;
    premiumContentEnabled: boolean;
  };
  status: 'pending' | 'published' | 'suspended';
  seo: SEOMetadata;
  bannerAds?: BannerAd[];
  alumni?: {
    id: string;
    name: string;
    graduationYear: number;
    careerPath: string;
    expertise: string[];
    company?: string;
    role?: string;
    photo?: string;
    bio?: string;
    isMentor?: boolean;
    contactUrl?: string;
  }[];
  theme: {
    primaryColor: string;
    fontFamily: string;
    borderRadius: string;
    layout: string;
    sectionOrder?: string[];
  };
  finance?: {
    mobileMoneyEnabled: boolean;
    bankDetails?: string;
    onlinePaymentsEnabled: boolean;
    applicationFee?: number;
    installmentPlans?: { name: string; description: string }[];
  };
  academicTools?: {
    timetableEnabled: boolean;
    onlineExamsEnabled: boolean;
    digitalReportsEnabled: boolean;
    attendanceTrackingEnabled: boolean;
    homeworkTrackerEnabled: boolean;
    parentTeacherBookingEnabled: boolean;
    inventoryEnabled?: boolean;
    complianceEnabled?: boolean;
    staffManagementEnabled?: boolean;
    wellnessEnabled?: boolean;
    alumniEnabled?: boolean;
    timetablingAIEnabled?: boolean;
    logisticsEnabled?: boolean;
    marketingEnabled?: boolean;
    benchmarkingEnabled?: boolean;
  };
  administrativeDetails?: {
    compliance: {
      fireSafetyExpiry: string;
      healthCertExpiry: string;
      lastCensusDate: string;
      registrationExpiry: string;
    };
    staffManagement: {
      members: {
        id: string;
        name: string;
        email: string;
        type: 'TSC' | 'Private';
        role: string;
        weeklyHours: number;
        subjects: string[];
      }[];
    };
    inventory: {
      textbooks: {
        id: string;
        title: string;
        subject: string;
        grade: string;
        totalStock: number;
        issuedCount: number;
        barcodeRange: string;
      }[];
      assets: {
        id: string;
        name: string;
        category: 'ICT' | 'Furniture' | 'Lab' | 'Other';
        status: 'Functional' | 'Maintenance' | 'Obsolete';
        quantity: number;
      }[];
    };
    healthLedger?: {
      records: {
        id: string;
        studentId: string;
        studentName: string;
        timestamp: string;
        symptoms: string;
        diagnosis: string;
        medicationProvided: string;
        parentNotified: boolean;
      }[];
    };
    alumniPortal?: {
      graduates: {
        id: string;
        name: string;
        graduationYear: string;
        currentIndustry: string;
        passportId: string; // Digital Eswatini Passport Reference
      }[];
      fundraisingGoals: {
        id: string;
        title: string;
        targetAmount: number;
        currentAmount: number;
      }[];
    };
    timetabling?: {
      rooms: { id: string; name: string; capacity: number }[];
      periods: { id: string; startTime: string; endTime: string }[];
      generatedSchedule: {
        periodId: string;
        roomId: string;
        subject: string;
        teacherId: string;
        day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';
      }[];
    };
    logistics?: {
      trips: {
        id: string;
        destination: string;
        date: string;
        purpose: string;
        busCapacity: number;
        studentsJoined: number;
        permissionSlipsSigned: number;
        teacherInCharge: string;
        status: 'Planning' | 'Approved' | 'Completed' | 'Cancelled';
      }[];
    };
    marketing?: {
      enrollmentFunnel: {
        applyClicks: number;
        directoryVisits: number;
        prospectusDownloads: number;
      };
    };
    benchmarking?: {
      mockExamPerformance: {
        subject: string;
        schoolAverage: number;
        regionalAverage: number;
      }[];
    };
    paperlessHub?: {
      enabled: boolean;
      documents: DigitalDocument[];
      paperSavedEstimate: number;
      digitalTransformationScore: number;
    };
  };
  metadata: {
    gender: GenderType;
    isBoarding: boolean;
    feeRange: { min: number; max: number };
    establishedYear: number;
    studentCount: number;
    hasStudentPortal: boolean;
    students?: Student[];
  };
  contact: {
    address: string;
    phone: string;
    email: string;
    website?: string;
    officeHours: string;
    googleMapsUrl?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    youtube?: string;
    headline?: string;
    introduction?: string;
    departments?: {
      name: string;
      phone: string;
      email: string;
    }[];
    emergencyContacts?: {
      name: string;
      phone: string;
    }[];
    directions?: {
      landmarks: string[];
      transport: string;
      parking: string;
      accessibility: string;
    };
    faqs?: {
      question: string;
      answer: string;
    }[];
  };
  parentContact?: {
    name: string;
    email: string;
    phone: string;
  };
  reviews: Review[];
  sections: {
    homepage: {
      enabled?: boolean;
      heroBanner: string;
      welcomeMessage: string;
      principalMessage: {
        text: string;
        name: string;
        photo?: string;
      };
      quickLinks: QuickLink[];
      announcements: Announcement[];
    };
    about: {
      enabled?: boolean;
      title?: string;
      content?: string;
      mediaUrls?: string[];
      lastUpdated?: string;
      overview: string;
      foundingBackground: string;
      history: {
        foundingStory: {
          yearEstablished: number;
          founders: string[];
          originalPurpose: string;
          initialStudentPopulation: string;
          firstCampusLocation: string;
        };
        milestones: Milestone[];
        growthSummary: string;
        transformationNarrative: {
          adaptationToChange: string;
          technologicalUpgrades: string;
          communityImpact: string;
          alumniInfluence: string;
        };
        archiveGallery?: string[];
        thenVsNow?: {
          thenImage: string;
          nowImage: string;
          description: string;
        }[];
        anniversaryHighlights?: string[];
      };
      vision: {
        headline: string;
        supportingParagraph: string;
        explanation?: string;
        nationalAlignment?: string;
        keywords?: string[];
        visualRepresentation?: string;
      };
      mission: {
        statement: string;
        description?: string;
        pillars?: {
          title: string;
          description: string;
          icon?: string;
        }[];
        objectives?: string[];
      };
      coreValues: CoreValue[];
      leadership: {
        principal: LeadershipMember;
        seniorTeam: LeadershipMember[];
        boardMembers?: LeadershipMember[];
        messageFromPrincipal?: {
          title: string;
          content: string;
          visionForYear?: string;
          commitmentToStudents?: string;
        };
      };
      accreditation: {
        registeredWith: string;
        registrationNumber: string;
        examinationBody: string;
        affiliations: string[];
        awards: string[];
      };
      statistics: {
        totalStudents: number;
        totalStaff: number;
        studentTeacherRatio: string;
        yearsOfOperation: number;
        graduationRate: string;
      };
      facilities: {
        overview: string;
        list: string[];
      };
      community: {
        outreach: string;
        partnerships: string;
        socialResponsibility: string;
      };
      downloads: { label: string; url: string }[];
      testimonials: { author: string; text: string }[];
    };
    admissions: {
      enabled?: boolean;
      headline: string;
      introduction: string;
      programs: { level: string; items: string[] }[];
      requirements: {
        academic: string[];
        documents: string[];
        additional: string[];
      };
      processSteps: { step: string; instruction: string }[];
      applicationFee: {
        amount: string;
        methods: string[];
      };
      processingTime: string;
      importantDates: { event: string; date: string }[];
      tuitionFees: {
        perTerm: string;
        perYear: string;
        additional: { label: string; amount: string; cycle?: 'Term' | 'Year' | 'Once-off' }[];
      };
      scholarships: {
        types: string[];
        eligibility: string;
        howToApply: string;
      };
      scholarshipOpportunities?: ScholarshipDetail[];
      boardingInfo?: {
        available: boolean;
        description: string;
        facilities: string[];
        supervision: string;
        conduct: string;
      };
      internationalStudents?: {
        overview: string;
        requirements: string[];
        support: string;
      };
      faqs: { question: string; answer: string }[];
      contact: {
        name: string;
        phone: string;
        email: string;
        hours: string;
      };
      allowOnlineApplications: boolean;
      onlineApplicationUrl?: string;
      scholarshipApplicationLink?: string;
    };
    academics: {
      enabled?: boolean;
      title?: string;
      content?: string;
      mediaUrls?: string[];
      lastUpdated?: string;
      overview: {
        headline: string;
        introduction: string;
      };
      curriculum: {
        structure: string;
        examinationBody: string;
        description: string;
      };
      departments: AcademicDepartment[];
      programs: AcademicProgram[];
      academicCalendar?: {
        startDate: string;
        terms: { name: string; info: string }[];
        examPeriods: string;
        holidays: string;
        url?: string;
      };
      calendar: {
        startDate: string;
        terms: { name: string; info: string }[];
        examPeriods: string;
        holidays: string;
        url?: string;
      };
      staffProfiles?: {
        id: string;
        name: string;
        role: string;
        qualifications: string;
        professionalBackground: string;
        image?: string;
      }[];
      researchFocus?: string;
      elearningCapabilities?: {
        enabled: boolean;
        platform: string;
        onlineClassOptions: string;
        digitalAssignments: string;
        recordedLectures: string;
      };
      elearning?: {
        enabled: boolean;
        platform: string;
        onlineClassOptions: string;
        digitalAssignments: string;
        recordedLectures: string;
      };
      studentPortal?: {
        enabled: boolean;
        url: string;
        features: {
          learningMaterials: boolean;
          assignmentSubmission: boolean;
          resultsDisplay: boolean;
        };
      };
      assessment: {
        approach: string;
        gradingSystem: string;
      };
      tuitionFees?: {
        perTerm: string;
        perYear: string;
        additionalFees: { label: string; amount: string }[];
      };
      support: {
        services: string[];
        description: string;
      };
      staff: {
        head: { 
          name: string; 
          qualifications: string; 
          experience: string;
          professionalBackground?: string;
          messageFromPrincipal?: string;
        };
        totalCount: number;
        avgExperience: string;
        certifications: string[];
        profiles?: {
          id: string;
          name: string;
          role: string;
          qualifications: string;
          professionalBackground: string;
          image?: string;
        }[];
      };
      faculty?: LeadershipMember[];
      performance: {
        passRate: string;
        ranking: string;
        distinctions: string;
        awards: string[];
      };
      research?: {
        focus: string;
        papers: string;
        partnerships: string;
      };
      facilities: {
        description: string;
        list: string[];
      };
      partnerships: {
        internships: string;
        collaborations: string;
      };
    };
    news: {
      enabled?: boolean;
      title?: string;
      content?: string;
      mediaUrls?: string[];
      lastUpdated?: string;
      overview: {
        title: string;
        description: string;
      };
      featuredPostId?: string;
      blogPosts?: BlogPost[];
      eventCalendar?: EventItem[];
      photoGallery?: { id: string; url: string; title: string; type: 'image'; createdAt: string }[];
      videoUploads?: { id: string; url: string; title: string; type: 'video'; createdAt: string }[];
      posts: BlogPost[];
      events: EventItem[];
      gallery: { id: string; url: string; title: string; type: 'image' | 'video'; createdAt: string }[];
      newsletterCta: string;
    };
    studentLife: {
      enabled?: boolean;
      title?: string;
      content?: string;
      mediaUrls?: string[];
      lastUpdated?: string;
      overview: {
        headline: string;
        introduction: string;
      };
      sports: {
        list: string[];
        facilities: string[];
        achievements?: string[];
        description: string;
      };
      clubs: {
        id?: string | number;
        name: string;
        focus: string;
        description: string;
        icon?: string;
        category?: string;
      }[];
      campusFacilities?: {
        id?: string | number;
        name: string;
        description: string;
        icon?: string;
        image?: string;
      }[];
      supportServices?: {
        services: string[];
        description: string;
      };
      arts: {
        activities: string[];
        description: string;
      };
      leadership: {
        opportunities: string[];
        roles: string;
        development?: string;
      };
      facilities: {
        id?: string | number;
        name: string;
        description: string;
        icon?: string;
        image?: string;
      }[];
      support: {
        services: string[];
        description: string;
      };
      accommodation?: {
        available: boolean;
        type: 'Boarding' | 'Day School Only';
        facilities?: string[];
        description?: string;
      };
      activities: {
        list: string[];
        description: string;
      };
      community: {
        programs: string[];
        description: string;
      };
      testimonials?: {
        name: string;
        grade: string;
        text: string;
      }[];
    };
    contactUs?: {
      enabled?: boolean;
      headline: string;
      introduction: string;
      email: string;
      phone: string;
      address: string;
      supportHours: string;
      mapUrl?: string;
      socialMediaEnabled: boolean;
    };
    portal: {
      enabled: boolean;
      title?: string;
      content?: string;
      mediaUrls?: string[];
      lastUpdated?: string;
      url: string;
      name: string;
      headline: string;
      description: string;
      loginRequirements: string[];
      rolesSupported: string[];
      accountCreationProcess: string;
      features: {
        dashboard: { list: string[]; description: string };
        learning: { list: string[]; description: string };
        assessments: { list: string[]; description: string };
        records: { list: string[]; accessLevel: string };
        scheduling: { list: string[]; description: string };
        collaboration: string[];
        attendance?: { enabled: boolean; description: string };
        parentAccess?: { enabled: boolean; features: string[] };
      };
      tools: { list: string[]; platforms: string[] };
      mobileAccess: { list: string[]; devices: string[] };
      security: string[];
      support: {
        email: string;
        phone: string;
        hours: string;
        resources: string[];
      };
      usageGuidelines: {
        policy: string;
        rules: string;
        expectations: string;
      };
      screenshots?: string[];
    };
  };
  stats: {
    views: number;
    applications: number;
    engagementRate: number;
    performanceRanking?: number;
  };
  adminId: string;
  teacherEmails?: string[];
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  institutionId?: string;
  linkedStudentIds?: string[]; // For parents to track their children
  isVerified: boolean;
  twoFactorEnabled: boolean;
  isAiPro?: boolean;
  aiCredits?: number; // Free tier credits
  isAiSubscriptionActive?: boolean; // B2C E50.00/month status
  isTutorSubscriptionActive?: boolean; // B2C E50.00/month status
  tutorProfile?: {
    isEnabled: boolean;
    subjects: string[];
    bio: string;
    availability: {
      days: string[];
      timeRange: string;
      slots?: { date?: string; time: string; id: string }[];
      status: 'available' | 'busy' | 'away';
    };
    hourlyRate?: number;
    rating?: number;
    reviews?: number;
    connections?: number;
    weeklyTeachingLoad?: number;
    meetingLink?: string;
  };
  teacherProfile?: {
    subjects: string[];
    contactPhone?: string;
    contactEmail?: string;
    bio?: string;
  };
  permissions?: {
    canEditNews?: boolean;
    canEditStudentLife?: boolean;
    canEditAdmissions?: boolean;
    canEditAcademics?: boolean;
    canManagePortal?: boolean;
    canManageFinance?: boolean;
    canManageInventory?: boolean;
    canManageStudents?: boolean;
    canManageStaff?: boolean;
  };
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId: string;
  details: any;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

export interface ActivityHistory {
  id: string;
  userId: string;
  type: 'login' | 'logout' | 'profile_update' | 'review_submit' | 'inquiry_send';
  description: string;
  metadata?: any;
  createdAt: string;
}

export interface Student {
  id: string;
  institutionId: string;
  name: string;
  email?: string;
  grade: string;
  class: string;
  studentId: string; // School-provided ID
  dob: string;
  parentName?: string;
  parentRelationship?: string;
  parentPhone?: string;
  parentEmails: string[]; // Used for auto-reconciliation
  createdAt: string;
}

export interface BehaviorLog {
  id: string;
  studentId: string;
  studentName: string;
  teacherId: string;
  teacherName: string;
  type: 'merit' | 'demerit' | 'participation' | 'warning';
  points: number;
  description: string;
  createdAt: string;
}

export interface HomeworkTask {
  id: string;
  teacherId: string;
  teacherName: string;
  institutionId: string;
  subject: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'active' | 'closed' | 'archived';
  createdAt: string;
  assignedToClass?: string;
  assignedToGrade?: string;
}

export interface StudentProgress {
  id: string;
  studentId: string;
  studentName: string;
  institutionId: string;
  teacherId: string;
  parentId: string;
  term: string;
  year: number;
  academics: {
    subject: string;
    grade: string;
    comments: string;
  }[];
  behavior: {
    rating: 'Excellent' | 'Good' | 'Needs Improvement' | 'Poor';
    comments: string;
  };
  participation: {
    rating: 'High' | 'Medium' | 'Low';
    activities: string[];
    comments: string;
  };
  grade?: string;
  class?: string;
  lastUpdated: string;
}

export interface AcademicResource {
  id: string;
  type: 'syllabus' | 'past_paper' | 'lesson_plan' | 'guide' | 'marking_scheme';
  title: string;
  subject: string;
  level: string; // EGCSE, JC, EPC, etc.
  authorId: string;
  authorName: string;
  size: string;
  price: number; // 0 for free
  downloads: number;
  rating: number;
  url: string;
  createdAt: string;
  isVerified?: boolean;
}
