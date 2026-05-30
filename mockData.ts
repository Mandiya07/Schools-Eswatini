
import { Institution, Region, InstitutionType, User, UserRole, GenderType, SubscriptionPlan, StudentProgress } from './types';
import { NEW_ESTABLISHED_SCHOOLS } from './newSchools';

import imgVarsity from './src/assets/images/black_student_studying_1778977275379.png';
import imgHighSchool from './src/assets/images/black_students_high_school_classroom_1778977218280.png';
import imgPrimary from './src/assets/images/black_students_primary_school_1778977256860.png';
import imgCampus from './src/assets/images/black_students_tertiary_campus_1778977237829.png';

export const MOCK_USERS: User[] = [
  {
    id: 'user-1',
    email: 'siphom.yati@gmail.com',
    name: 'Sipho M. Yati',
    role: UserRole.SUPER_ADMIN,
    isVerified: true,
    twoFactorEnabled: true
  },
  {
    id: 'user-2',
    email: 'admin@schoolseswatini.com',
    name: 'Super Admin',
    role: UserRole.SUPER_ADMIN,
    isVerified: true,
    twoFactorEnabled: true
  },
  {
    id: 'user-3',
    email: 'principal@waterford.sz',
    name: 'Waterford Kamhlaba Admin',
    role: UserRole.INSTITUTION_ADMIN,
    institutionId: 'inst-1',
    isVerified: true,
    twoFactorEnabled: false
  },
  {
    id: 'user-4',
    email: 'admin@stmarks.sz',
    name: 'St. Marks High Admin',
    role: UserRole.INSTITUTION_ADMIN,
    institutionId: 'inst-3',
    isVerified: true,
    twoFactorEnabled: false
  },
  {
    id: 'user-moet',
    email: 'official@moet.gov.sz',
    name: 'MoET Administrator',
    role: UserRole.MOET_OFFICIAL,
    isVerified: true,
    twoFactorEnabled: true
  }
];

export const MOCK_INSTITUTIONS: Institution[] = [
  {
    id: 'inst-1',
    name: 'Waterford Kamhlaba UWCSA',
    downloads: [
      { label: 'School Prospectus 2024', url: '/docs/prospectus.pdf' },
      { label: 'School Policies', url: '/docs/policies.pdf' }
    ],
    slug: 'waterford-kamhlaba',
    subdomain: 'waterford',
    logo: 'https://picsum.photos/seed/waterford/200/200',
    coverImage: imgHighSchool,
    region: Region.HHOHHO,
    type: [InstitutionType.HIGH_SCHOOL, InstitutionType.PRIVATE],
    isVerified: true,
    isAccredited: true,
    moetRegistration: 'MoET/HHO/001-WK',
    isFeatured: true,
    isSpotlight: true,
    seoScore: 92,
    trustScore: 98,
    accreditationStatus: 'accredited',
    lastInspectionDate: '2023-11-15',
    examResults: [
      { year: 2023, level: 'IB', passRate: 98, merits: 45, credits: 50 },
      { year: 2023, level: 'IGCSE', passRate: 99, merits: 60, credits: 35 }
    ],
    performanceHistory: [
      { year: 2023, nationalRanking: 1, regionalRanking: 1, valueAddedScore: 8.5, studentGrowth: 12 },
      { year: 2022, nationalRanking: 2, regionalRanking: 1, valueAddedScore: 8.2, studentGrowth: 10 }
    ],
    plan: SubscriptionPlan.ENTERPRISE_B2B,
    status: 'published',
    adminId: 'user-2',
    createdAt: '2023-01-01T00:00:00Z',
    bannerAds: [
      {
        id: 'ad-1',
        imageUrl: 'https://picsum.photos/seed/ad1/1200/400',
        linkUrl: '#/school/waterford-kamhlaba',
        position: 'homepage',
        active: true,
        startDate: '2024-01-01',
        endDate: '2024-12-31'
      }
    ],
    alumni: [
      {
        id: 'alum-1',
        name: 'Dr. Jane Smith',
        graduationYear: 2010,
        careerPath: 'Medicine',
        expertise: ['Healthcare', 'Research', 'Pre-Med Advice'],
        company: 'Mbabane Government Hospital',
        role: 'Pediatrician',
        photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200&h=200',
        bio: 'Passionate about improving pediatric care in Eswatini.',
        isMentor: true,
        contactUrl: 'mailto:jane.smith@example.com'
      },
      {
        id: 'alum-2',
        name: 'Michael Zwane',
        graduationYear: 2015,
        careerPath: 'Software Engineering',
        expertise: ['Tech', 'Startups', 'Frontend Development'],
        company: 'Tech Eswatini',
        role: 'Senior Developer',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200',
        bio: 'Building digital solutions for the next generation of Africans.',
        isMentor: true,
        contactUrl: 'mailto:mike.z@example.com'
      }
    ],
    seo: {
      title: 'Waterford Kamhlaba - Leading IB World School in Eswatini',
      description: 'The premier international school in Southern Africa.',
      keywords: ['International School', 'IB World School'],
      healthScore: 95
    },
    theme: {
      primaryColor: '#2563eb',
      fontFamily: 'Inter',
      borderRadius: '2xl',
      layout: 'modern',
      sectionOrder: ['homepage', 'about', 'admissions', 'academics', 'news', 'studentLife', 'portal']
    },
    finance: {
      mobileMoneyEnabled: true,
      bankDetails: 'Standard Bank Swaziland, Acc: 123456789, Branch: Mbabane',
      onlinePaymentsEnabled: true,
      applicationFee: 500,
      installmentPlans: [
        { name: 'Termly', description: 'Pay in 3 equal installments at the start of each term.' },
        { name: 'Monthly', description: 'Pay in 10 equal monthly installments.' }
      ]
    },
    academicTools: {
      timetableEnabled: true,
      onlineExamsEnabled: false,
      digitalReportsEnabled: true,
      attendanceTrackingEnabled: true,
      homeworkTrackerEnabled: true,
      parentTeacherBookingEnabled: false,
      inventoryEnabled: true,
      complianceEnabled: true,
      staffManagementEnabled: true,
      alumniEnabled: true,
    },
    administrativeDetails: {
      compliance: {
        fireSafetyExpiry: '2024-12-01',
        healthCertExpiry: '2025-06-15',
        lastCensusDate: '2023-03-10',
        registrationExpiry: '2028-12-31'
      },
      staffManagement: {
        members: [
          { id: 'staff-1', name: 'Ms. Sarah Dlamini', email: 'sarah.d@waterford.sz', type: 'Private', role: 'Head of Mathematics', weeklyHours: 22, subjects: ['Further Maths', 'IGCSE Maths'] },
          { id: 'staff-2', name: 'Mr. John Maseko', email: 'john.m@waterford.sz', type: 'TSC', role: 'Science Teacher', weeklyHours: 18, subjects: ['Physics', 'Chemistry'] },
          { id: 'staff-3', name: 'Mrs. Thandi Kunene', email: 'thandi.k@waterford.sz', type: 'TSC', role: 'Language Dept', weeklyHours: 26, subjects: ['English', 'Siswaati'] }
        ]
      },
      inventory: {
        textbooks: [
          { id: 'book-1', title: 'IGCSE Mathematics Core', subject: 'Math', grade: 'Form 4', totalStock: 120, issuedCount: 115, barcodeRange: 'MTH-4-001 to MTH-4-120' },
          { id: 'book-2', title: 'Biology for Swaziland', subject: 'Science', grade: 'Form 3', totalStock: 80, issuedCount: 45, barcodeRange: 'BIO-3-001 to BIO-3-080' }
        ],
        assets: [
          { id: 'asset-1', name: 'Dell Latitude Laptops', category: 'ICT', status: 'Functional', quantity: 30 },
          { id: 'asset-2', name: 'Projector Epson X41', category: 'ICT', status: 'Maintenance', quantity: 5 }
        ]
      },
      healthLedger: {
        records: [
          { id: 'hlt-1', studentId: 'st-001', studentName: 'Banele Gamedze', timestamp: '2024-04-20T08:30:00Z', symptoms: 'Severe Headache', diagnosis: 'Migraine', medicationProvided: 'Panado 500mg', parentNotified: true },
          { id: 'hlt-2', studentId: 'st-002', studentName: 'Nomvula Simelane', timestamp: '2024-04-20T10:15:00Z', symptoms: 'Upset Stomach', diagnosis: 'Food Sensitivity', medicationProvided: 'Gaviscon liquid', parentNotified: true }
        ]
      },
      alumniPortal: {
        graduates: [
          { id: 'alm-1', name: 'Sibusiso Mnisi', graduationYear: '2015', currentIndustry: 'Finance & Technology', passportId: 'EP-2015-1049' },
          { id: 'alm-2', name: 'Tengetile Dlamini', graduationYear: '2018', currentIndustry: 'Renewable Energy', passportId: 'EP-2018-5521' },
          { id: 'alm-3', name: 'Mandla Zulu', graduationYear: '2012', currentIndustry: 'Medicine', passportId: 'EP-2012-8832' }
        ],
        fundraisingGoals: [
          { id: 'fund-1', title: 'Science Lab Modernization', targetAmount: 500000, currentAmount: 320000 },
          { id: 'fund-2', title: 'Sports Pavilion Fund', targetAmount: 150000, currentAmount: 85000 }
        ]
      },
      timetabling: {
        rooms: [
          { id: 'r1', name: 'Room 101', capacity: 40 },
          { id: 'r2', name: 'Lab A', capacity: 30 },
          { id: 'r3', name: 'Gymnasium', capacity: 200 }
        ],
        periods: [
          { id: 'p1', startTime: '07:30', endTime: '08:15' },
          { id: 'p2', startTime: '08:15', endTime: '09:00' },
          { id: 'p3', startTime: '09:30', endTime: '10:15' }
        ],
        generatedSchedule: [
          { periodId: 'p1', roomId: 'r1', subject: 'Mathematics', teacherId: 'staff-1', day: 'Mon' },
          { periodId: 'p2', roomId: 'r1', subject: 'Additional Maths', teacherId: 'staff-1', day: 'Mon' },
          { periodId: 'p3', roomId: 'r2', subject: 'Physics', teacherId: 'staff-2', day: 'Mon' }
        ]
      },
      logistics: {
        trips: [
          { id: 'trip-1', destination: 'Hlane Royal National Park', date: '2024-05-15', purpose: 'Geography Field Trip', busCapacity: 60, studentsJoined: 58, permissionSlipsSigned: 54, teacherInCharge: 'Mr. Maseko', status: 'Approved' },
          { id: 'trip-2', destination: 'Mbabane Science Fair', date: '2024-06-02', purpose: 'Academic Competition', busCapacity: 25, studentsJoined: 20, permissionSlipsSigned: 12, teacherInCharge: 'Dr. Mamba', status: 'Planning' }
        ]
      },
      marketing: {
        enrollmentFunnel: {
          applyClicks: 145,
          directoryVisits: 1250,
          prospectusDownloads: 62
        }
      },
      benchmarking: {
        mockExamPerformance: [
          { subject: 'Maths', schoolAverage: 82, regionalAverage: 65 },
          { subject: 'Science', schoolAverage: 78, regionalAverage: 68 },
          { subject: 'English', schoolAverage: 88, regionalAverage: 72 },
          { subject: 'Siswaati', schoolAverage: 75, regionalAverage: 70 }
        ]
      },
      paperlessHub: {
        enabled: true,
        documents: [
          { id: 'p-doc-1', name: 'Student Code of Conduct 2024', category: 'Policy', url: '/docs/conduct.pdf', uploadedAt: '2024-01-10T09:00:00Z', size: '1.2 MB' },
          { id: 'p-doc-2', name: 'March Newsletter', category: 'Newsletter', url: '/docs/newsletter-mar.pdf', uploadedAt: '2024-03-01T14:30:00Z', size: '2.5 MB' },
          { id: 'p-doc-3', name: 'Sports Day Permission Slip', category: 'Form', url: '/docs/sports-slip.pdf', uploadedAt: '2024-03-15T11:00:00Z', size: '450 KB' }
        ],
        paperSavedEstimate: 12450,
        digitalTransformationScore: 88
      }
    },
    metadata: {
      gender: GenderType.MIXED,
      isBoarding: true,
      feeRange: { min: 50000, max: 150000 },
      establishedYear: 1963,
      studentCount: 600,
      hasStudentPortal: true
    },
    contact: { 
      address: 'P.O. Box H100, Mbabane, Eswatini', 
      latitude: -26.303056,
      longitude: 31.109722,
      phone: '+268 2422 0834', 
      email: 'admissions@waterford.sz',
      website: 'www.waterford.sz',
      officeHours: 'Mon - Fri: 08:00 - 16:30',
      googleMapsUrl: 'https://maps.google.com/?q=Waterford+Kamhlaba',
      facebook: 'https://facebook.com/waterfordkamhlaba',
      twitter: 'https://twitter.com/waterfordkamh',
      linkedin: 'https://linkedin.com/school/waterford-kamhlaba-uwc-of-southern-africa/',
      instagram: 'https://instagram.com/waterfordkamhlaba',
      youtube: 'https://youtube.com/c/WaterfordKamhlabaUWCSA',
      headline: 'We\'re Here to Help You',
      introduction: 'Whether you have questions about admissions, academics, or general inquiries, our team is ready to assist you. We welcome prospective students, parents, and alumni to reach out to us.',
      departments: [
        { name: 'Admissions Office', phone: '+268 2422 0866 ext 101', email: 'admissions@waterford.sz' },
        { name: 'Academic Office', phone: '+268 2422 0866 ext 105', email: 'academics@waterford.sz' },
        { name: 'Finance Office', phone: '+268 2422 0866 ext 110', email: 'finance@waterford.sz' },
        { name: 'Student Support', phone: '+268 2422 0866 ext 115', email: 'support@waterford.sz' }
      ],
      emergencyContacts: [
        { name: 'Campus Security', phone: '+268 7602 1234' },
        { name: 'Health Services', phone: '+268 7602 5678' }
      ],
      directions: {
        landmarks: ['Near Mbabane City Centre', 'Sidwashini Industrial Area'],
        transport: 'Accessible via local kombis and taxis from Mbabane bus rank.',
        parking: 'Ample secure parking available on campus for visitors.',
        accessibility: 'Wheelchair accessible entrances and facilities throughout the campus.'
      },
      faqs: [
        { question: 'How can I apply?', answer: 'Applications can be submitted online through our Admissions portal or by visiting the school office.' },
        { question: 'Where is the school located?', answer: 'We are located on the hills overlooking Mbabane, the capital city of Eswatini.' },
        { question: 'What are your office hours?', answer: 'Our administrative offices are open Monday to Friday, 08:00 to 16:30.' }
      ]
    },
    reviews: [],
    sections: {
      homepage: {
        heroBanner: imgHighSchool,
        welcomeMessage: 'Waterford Kamhlaba United World College of Southern Africa (WK UWCSA) is one of the world\'s leading international schools.',
        principalMessage: {
          text: 'Welcome to our vibrant community where we celebrate diversity and strive for academic excellence.',
          name: 'Jackie Otula',
          photo: 'https://picsum.photos/seed/principal/300/400'
        },
        quickLinks: [
          { label: 'Academic Calendar', url: '#' },
          { label: 'Portal Login', url: '#' },
          { label: 'UWC Movement', url: '#' }
        ],
        announcements: [
          { id: 'ann-1', title: 'Open Day 2024', date: '2023-12-10', content: 'Join us for our annual campus tour.', priority: 'High' }
        ]
      },
      about: {
        overview: 'Waterford Kamhlaba UWCSA is a premier international boarding school in Southern Africa, providing high-quality education to students from over 60 countries. We offer a world-class IB curriculum focused on leadership, service, and academic rigor.',
        foundingBackground: 'Founded in 1963 as a multi-racial institution.',
        history: {
          foundingStory: {
            yearEstablished: 1963,
            founders: ['Michael Stern'],
            originalPurpose: 'Founded as a multi-racial institution in direct opposition to South Africa\'s apartheid education system. It began with only 16 boys in a single building on a rugged hillside.',
            initialStudentPopulation: '16 Boys',
            firstCampusLocation: 'Rugged hillside in Mbabane'
          },
          milestones: [
            { year: '1963', event: 'School founded with 16 students.' },
            { year: '1981', event: 'Joined the United World Colleges movement.' },
            { year: '2010', event: 'New Arts Center inaugurated.' },
            { year: '2023', event: 'Celebrated 60 years of academic excellence.' }
          ],
          growthSummary: 'Waterford Kamhlaba has grown from 16 boys to a premier international boarding school with hundreds of students.',
          transformationNarrative: {
            adaptationToChange: 'Over six decades, the campus has evolved from a small house to a state-of-the-art academic hub featuring multiple science labs, an Olympic-size pool, and extensive residential facilities.',
            technologicalUpgrades: 'Implementation of smart classrooms, high-speed fiber across campus, and digital learning platforms.',
            communityImpact: 'Our students participate in over 30 weekly community service projects across Eswatini, fostering deep local roots.',
            alumniInfluence: 'Our alumni network includes prominent leaders, activists, and professionals making a difference globally.'
          },
          archiveGallery: [
            'https://picsum.photos/seed/old1/800/600',
            'https://picsum.photos/seed/old2/800/600',
            'https://picsum.photos/seed/old3/800/600',
            'https://picsum.photos/seed/old4/800/600'
          ],
          thenVsNow: [
            {
              thenImage: 'https://picsum.photos/seed/then1/800/450',
              nowImage: 'https://picsum.photos/seed/now1/800/450',
              description: 'The original single-building campus compared to the modern multi-facility estate.'
            }
          ],
          anniversaryHighlights: ['60th Anniversary Gala', 'Alumni Homecoming 2023', 'Stern Legacy Lecture Series']
        },
        vision: {
          headline: 'To become a leading institution of academic excellence and character development in Eswatini and beyond.',
          supportingParagraph: 'We believe in fostering a community where students develop the skills and values necessary to become courageous leaders who make a difference in the world.',
          explanation: 'Our vision is to empower global citizens.',
          nationalAlignment: 'Aligned with Eswatini National Development Plan (NDP) 2023-2027, focusing on human capital development and quality education for all.',
          keywords: ['Excellence', 'Innovation', 'Integrity', 'Leadership'],
          visualRepresentation: 'https://picsum.photos/seed/vision1/1200/600'
        },
        mission: {
          statement: 'To provide quality education, nurture responsible citizens, and promote innovation and leadership.',
          description: 'Our daily approach combines rigorous academics with an extensive community service program, ensuring that students learn to value humanity and service alongside their studies.',
          pillars: [
            {
              title: 'Educational Philosophy',
              description: 'We believe in holistic development, where academic rigor meets character building and social responsibility.',
              icon: 'BookOpen'
            },
            {
              title: 'Target Learners',
              description: 'Serving diverse students from across Eswatini and the globe, fostering an international mindset.',
              icon: 'Users'
            },
            {
              title: 'Teaching Approach',
              description: 'Student-centered, inquiry-based learning that encourages critical thinking and creative problem-solving.',
              icon: 'Lightbulb'
            },
            {
              title: 'Community Engagement',
              description: 'Deeply rooted in the local community through service projects and sustainable partnerships.',
              icon: 'Heart'
            },
            {
              title: 'Moral & Ethical Commitments',
              description: 'Upholding the highest standards of integrity, respect, and global citizenship in every action.',
              icon: 'ShieldCheck'
            }
          ],
          objectives: [
            'Maintain a 95%+ pass rate in IB and IGCSE examinations annually.',
            'Ensure 100% student participation in community service programs.',
            'Implement at least two new technological innovations in the classroom each year.',
            'Foster a diverse student body representing at least 40 different nationalities.',
            'Achieve a 1:10 teacher-to-student ratio for personalized learning support.'
          ]
        },
        coreValues: [
          { 
            name: 'Integrity', 
            description: 'We promote honesty, accountability, and ethical behavior among students and staff.',
            icon: 'ShieldCheck',
            example: 'Students are trusted to manage their own study schedules and adhere to the honor code during examinations.',
            quote: {
              text: 'Integrity is the foundation of every great leader.',
              author: 'Jackie Otula, Principal'
            }
          },
          { 
            name: 'Excellence', 
            description: 'We strive for the highest academic and personal standards in all we do.',
            icon: 'Trophy',
            example: 'Our students consistently achieve top-tier IB scores and gain admission to world-renowned universities.',
            quote: {
              text: 'Excellence is not an act, but a habit.',
              author: 'Head of Academics'
            }
          },
          { 
            name: 'Compassion', 
            description: 'Empathy and kindness are central to our community life.',
            icon: 'Heart',
            example: 'The peer-mentorship program ensures that every new student feels supported and welcomed.',
            quote: {
              text: 'A kind heart is a powerful force for change.',
              author: 'Student Council President'
            }
          },
          { 
            name: 'Service', 
            description: 'Learning through helping others is a core part of our curriculum.',
            icon: 'HandHelping',
            example: 'Every student completes at least 150 hours of community service in local clinics and schools.',
            quote: {
              text: 'Service is the rent we pay for our room here on earth.',
              author: 'Community Service Coordinator'
            }
          },
          { 
            name: 'Diversity', 
            description: 'Celebrating our differences is what makes us a unique UWC community.',
            icon: 'Globe',
            example: 'Our annual UWC Day features cultural performances from over 40 different nationalities.',
            quote: {
              text: 'Our strength lies in our differences, not in our similarities.',
              author: 'UWC National Committee'
            }
          }
        ],
        leadership: {
          principal: {
            name: 'Jackie Otula',
            title: 'Principal',
            qualifications: 'M.Ed. in Educational Leadership, BA in Education',
            experience: '25 years in international education',
            description: 'Jackie has led multiple international schools across Africa and Europe, focusing on student-centered learning and curriculum innovation. Her leadership is defined by a commitment to the UWC mission of making education a force to unite people, nations and cultures for peace and a sustainable future.',
            photo: 'https://picsum.photos/seed/jackie/800/1000',
            philosophy: 'Education should not just be about passing exams, but about shaping the character of the next generation of global leaders.',
            achievements: [
              'Implemented the first digital learning initiative in Eswatini.',
              'Increased IB pass rate to a record 98%.',
              'Established the Pan-African Leadership Summit.',
              'Secured $2M in scholarship funding for local students.'
            ],
            linkedin: 'https://linkedin.com/in/jackie-otula',
            videoUrl: 'https://youtube.com/watch?v=example',
            cvUrl: 'https://example.com/cv.pdf'
          },
          seniorTeam: [
            { 
              name: 'Stephen Lowry', 
              title: 'Head of Academics', 
              description: 'Oversees the implementation of the IB and IGCSE programs, ensuring academic excellence across all departments.', 
              photo: 'https://picsum.photos/seed/stephen/200/200',
              linkedin: 'https://linkedin.com/in/stephen-lowry'
            },
            { 
              name: 'Hlobsile Dlamini', 
              title: 'Director of Residential Life', 
              description: 'Ensures a safe and supportive boarding environment for all students, fostering a home-away-from-home atmosphere.', 
              photo: 'https://picsum.photos/seed/hlob/200/200',
              linkedin: 'https://linkedin.com/in/hlobsile-dlamini'
            }
          ],
          boardMembers: [
            { name: 'Hon. Themba Masuku', title: 'Board Chairman' },
            { name: 'Prof. Lydia Makhubu', title: 'Academic Advisor' },
            { name: 'Mr. Richard Branson', title: 'Global Ambassador' }
          ],
          messageFromPrincipal: {
            title: 'Message from the Principal',
            content: 'Welcome to Waterford Kamhlaba UWCSA. As we embark on another academic year, I am filled with pride and optimism for our community. Our mission remains clear: to provide an education that transcends borders and empowers our students to become agents of positive change.\n\nIn the coming year, we will focus on deepening our commitment to sustainability and social justice, ensuring that our students are not only academically prepared but also ethically grounded.',
            visionForYear: 'Expanding our digital infrastructure and strengthening our community service partnerships across Eswatini.',
            commitmentToStudents: 'We promise to provide a safe, inclusive, and challenging environment where every student can thrive and find their voice.'
          }
        },
        accreditation: {
          registeredWith: 'Ministry of Education and Training, Eswatini',
          registrationNumber: 'HHO/001/WK',
          examinationBody: 'International Baccalaureate (IB) & Cambridge IGCSE',
          affiliations: ['UWC Movement', 'Council of International Schools'],
          awards: ['Best Performing High School 2022', 'Regional Green Campus Award']
        },
        statistics: {
          totalStudents: 600,
          totalStaff: 85,
          studentTeacherRatio: '1:7',
          yearsOfOperation: 60,
          graduationRate: '98%'
        },
        facilities: {
          overview: 'Our hill-top campus offers world-class facilities designed for a holistic educational experience.',
          list: ['Smart Classrooms', 'Science Laboratories', 'Modern Library', 'Olympic Pool', 'ICT Hubs', 'Student Hostels', 'Wellness Center']
        },
        community: {
          outreach: 'Our students participate in over 30 weekly community service projects across Eswatini.',
          partnerships: 'We work closely with UNICEF and local NGOs like SWAGAA.',
          socialResponsibility: 'Waterford runs a scholarship program for local Swazi students from disadvantaged backgrounds.'
        },
        downloads: [
          { label: 'School Prospectus 2024', url: '#' },
          { label: 'Strategic Plan 2020-2025', url: '#' },
          { label: 'Code of Conduct', url: '#' },
          { label: 'School Policies', url: '#' }
        ],
        testimonials: [
          { author: 'Alumni 2018', text: 'Waterford changed my worldview entirely.' }
        ]
      },
      admissions: {
        headline: 'Join a Community of Global Changemakers',
        introduction: 'Academic transcripts, entrance exam (English & Mathematics), reference letters, and a demonstrated commitment to community service and UWC values.',
        programs: [
          { level: 'High School', items: ['Form 1', 'Form 2', 'Form 3'] },
          { level: 'IB Diploma', items: ['IB1 (Grade 11)', 'IB2 (Grade 12)'] }
        ],
        requirements: {
          academic: ['Academic transcripts', 'Strong academic potential', 'Entrance exam (English & Mathematics)'],
          documents: ['Reference letters', 'Birth certificate / Identity Document'],
          additional: ['Demonstrated commitment to community service and UWC values']
        },
        processSteps: [
          { step: '1', instruction: 'Complete the online application via our portal.' },
          { step: '2', instruction: 'Pay the non-refundable SZL 500 application fee.' },
          { step: '3', instruction: 'Attend the scheduled entrance test at our campus.' }
        ],
        applicationFee: {
          amount: 'SZL 500',
          methods: ['Bank Transfer', 'Mobile Money']
        },
        processingTime: '2 - 3 Weeks',
        importantDates: [
          { event: 'Application Opening', date: 'Jan 15, 2024' },
          { event: 'Closing Date', date: 'March 31, 2024' }
        ],
        tuitionFees: {
          perTerm: 'SZL 35,000',
          perYear: 'SZL 105,000',
          additional: [
             { label: 'Registration', amount: 'SZL 5,000' },
             { label: 'Boarding Deposit', amount: 'SZL 10,000' }
          ]
        },
        scholarships: {
          types: ['Academic Merit', 'Financial Need', 'UWC National Committee Scholarships'],
          eligibility: 'Open to high-performing Swati students with demonstrated financial need.',
          howToApply: 'Check the scholarship box on the main application and submit tax returns of parents.'
        },
        allowOnlineApplications: true,
        onlineApplicationUrl: 'https://waterford.managebac.com/apply',
        scholarshipApplicationLink: 'https://www.waterford.sz/admissions/scholarships/',
        boardingInfo: {
          available: true,
          description: 'Our residential life program is a core part of the UWC experience, fostering independence and cross-cultural understanding.',
          facilities: ['Single & Double Rooms', 'Common Lounges', 'Laundry Services', '24/7 Security'],
          supervision: 'Live-in house parents and student mentors provide round-the-clock support.',
          conduct: 'Students are expected to adhere to the UWC code of conduct, promoting respect and responsibility.'
        },
        internationalStudents: {
          overview: 'We welcome students from over 60 countries, creating a truly global learning environment.',
          requirements: ['Valid Study Permit', 'English Proficiency', 'Health Insurance'],
          support: 'Our dedicated international student office assists with visa applications and cultural adjustment.'
        },
        faqs: [
          { question: 'When does the academic year start?', answer: 'Our year starts in late January.' },
          { question: 'Is boarding mandatory?', answer: 'Boarding is optional for local students but recommended for the full UWC experience.' }
        ],
        contact: {
          name: 'Admissions Office',
          phone: '+268 2422 0866',
          email: 'admissions@waterford.sz',
          hours: '08:00 - 16:30'
        }
      },
      academics: {
        overview: {
          headline: 'Excellence in Teaching and Learning',
          introduction: 'We provide a world-class academic environment focusing on critical thinking and global citizenship. Our programs are designed to challenge students and prepare them for top universities worldwide.'
        },
        curriculum: {
          structure: 'Our curriculum is divided into the IGCSE (Junior) and IB Diploma (Senior) phases.',
          examinationBody: 'International Baccalaureate (IB) and Cambridge International Education (CIE)',
          description: 'We follow a rigorous international framework that emphasizes inquiry-based learning and cross-cultural understanding.'
        },
        departments: [
          { name: 'Sciences', head: 'Dr. John Mamba', subjects: ['Physics', 'Chemistry', 'Biology'], overview: 'A department equipped with modern labs and a focus on research-led learning.' },
          { name: 'Mathematics', head: 'Ms. Sarah Dlamini', subjects: ['Standard Maths', 'Higher Maths', 'Further Maths'], overview: 'Focused on logical reasoning and problem-solving excellence.' }
        ],
        programs: [
          { id: 'prog-1', name: 'IB Diploma Programme', qualification: 'IB Diploma', duration: '2 Years', subjects: ['Mathematics', 'Physics', 'History', 'English', 'Biology'], requirements: 'Pass in IGCSE with minimum 5 Cs', description: 'Advanced pre-university curriculum recognized by top universities globally.', syllabusUrl: '#', courseOutlineUrl: '#' },
          { id: 'prog-2', name: 'IGCSE', qualification: 'IGCSE Certificate', duration: '2 Years', subjects: ['Mathematics', 'Science', 'English', 'Geography', 'ICT'], requirements: 'Completion of Form 2', description: 'Cambridge secondary education providing foundation for senior studies.', syllabusUrl: '#', courseOutlineUrl: '#' }
        ],
        calendar: {
          startDate: 'January 20, 2024',
          terms: [
            { name: 'Term 1', info: 'Jan - April (Summer Term)' },
            { name: 'Term 2', info: 'May - August (Winter Term)' },
            { name: 'Term 3', info: 'September - December (Spring Term)' }
          ],
          examPeriods: 'November for IGCSE/IB Final Exams',
          holidays: 'April, August, and December school holidays',
          url: '#'
        },
        assessment: {
          approach: 'Continuous assessment through tests, projects, and coursework combined with final external exams.',
          gradingSystem: 'IB 1-7 Scale and IGCSE A*-G Scale.'
        },
        support: {
          services: ['Remedial classes', 'Tutoring programs', 'Academic counseling', 'Career guidance'],
          description: 'We offer intensive academic support through our dedicated learning support center.'
        },
        staff: {
          head: { 
            name: 'Stephen Lowry', 
            qualifications: 'PhD in Education, M.Ed', 
            experience: '30 Years',
            professionalBackground: 'Stephen Lowry has a distinguished career in international education, spanning over three decades. He has led several UWC colleges and is a recognized voice in global citizenship education. His background includes curriculum development for the IB and leadership in diverse educational settings.',
            messageFromPrincipal: 'Welcome to Waterford Kamhlaba. Our mission is to provide a world-class education that inspires students to become responsible global citizens. We believe in the power of education to transform lives and communities, and we are committed to fostering an environment where every student can thrive academically and personally.'
          },
          totalCount: 85,
          avgExperience: '12 Years',
          certifications: ['IB Certification', 'PGCE', 'Cambridge Certified Examiner'],
          profiles: [
            {
              id: 'sp1',
              name: 'Dr. John Mamba',
              role: 'Head of Sciences',
              qualifications: 'PhD in Particle Physics, Stanford',
              professionalBackground: 'Dr. Mamba has over 15 years of experience in research and teaching. He previously worked at CERN and is passionate about making physics accessible to all students.',
              image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200'
            },
            {
              id: 'sp2',
              name: 'Ms. Sarah Dlamini',
              role: 'Head of Mathematics',
              qualifications: 'MSc in Pure Mathematics, Oxford',
              professionalBackground: 'With a decade of experience in international education, Ms. Dlamini specializes in the IB Higher Level Mathematics curriculum.',
              image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200'
            },
            {
              id: 'sp3',
              name: 'Mr. Sipho Ndlovu',
              role: 'Senior History Teacher',
              qualifications: 'MA in African History, UNESWA',
              professionalBackground: 'Mr. Ndlovu is a renowned historian in the region and has authored several textbooks used in the national curriculum.',
              image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200'
            }
          ]
        },
        faculty: [
          {
            name: 'Dr. John Mamba',
            title: 'Head of Sciences',
            qualifications: 'PhD in Particle Physics, Stanford',
            description: 'Dr. Mamba has over 15 years of experience in research and teaching. He previously worked at CERN and is passionate about making physics accessible to all students.',
            photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200'
          },
          {
            name: 'Ms. Sarah Dlamini',
            title: 'Head of Mathematics',
            qualifications: 'MSc in Pure Mathematics, Oxford',
            description: 'With a decade of experience in international education, Ms. Dlamini specializes in the IB Higher Level Mathematics curriculum.',
            photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200'
          }
        ],
        performance: {
          passRate: '98%',
          ranking: 'Top 5 in Southern Africa',
          distinctions: 'Average 34 points in IB',
          awards: ['Regional Academic Excellence 2023', 'National Science Fair Winner']
        },
        research: {
          focus: 'Environmental Sustainability and Social Justice',
          papers: 'Annual IB Extended Essay Repository',
          partnerships: 'UWC Research Network'
        },
        facilities: {
          description: 'High-standard science labs and a multi-media resource library.',
          list: ['6 Science Labs', 'Computer Lab', '24/7 Library', 'E-learning Portal']
        },
        elearning: {
          enabled: true,
          platform: 'ManageBac, Google Workspace & Microsoft Teams',
          onlineClassOptions: 'Hybrid learning environment with live Zoom and Teams sessions for remote students.',
          digitalAssignments: 'All assignments submitted via Google Classroom and ManageBac Canvas.',
          recordedLectures: 'Select advanced courses are recorded and archived for student review on the internal portal.'
        },
        partnerships: {
          internships: 'Available for IB students during winter break with local NGOs.',
          collaborations: 'Student exchange with UWC Atlantic College.'
        }
      },
      news: {
        overview: {
          title: 'News & Events',
          description: 'Stay updated with the latest happenings at Waterford Kamhlaba. From academic achievements to campus activities, we share our journey with our community of students, parents, and alumni.'
        },
        featuredPostId: 'p1',
        posts: [
          { 
            id: 'p1', 
            title: 'WK Wins National Debate Championships', 
            category: 'Achievements',
            date: 'Nov 12, 2023', 
            excerpt: 'Our senior team triumphed in the Eswatini National Debate Championships, showcasing exceptional critical thinking and oratory skills.', 
            content: 'The Waterford Kamhlaba senior debate team has once again proven their excellence by winning the National Championships held in Mbabane. The team, led by captain Sarah Dlamini, navigated through complex topics ranging from economic policy to environmental ethics. This victory qualifies them for the regional finals in Johannesburg next year.',
            image: 'https://picsum.photos/seed/news1/800/400',
            author: 'Academic Office',
            tags: ['Debate', 'Achievements', 'National']
          },
          {
            id: 'p2',
            title: 'New Science Wing Inauguration',
            category: 'Academic',
            date: 'Oct 25, 2023',
            excerpt: 'The state-of-the-art science wing is now open, providing students with advanced laboratories for research and experimentation.',
            image: 'https://picsum.photos/seed/news2/800/400',
            author: 'Facilities Management'
          }
        ],
        events: [
          { 
            id: 'e1', 
            title: 'Annual Winter Gala', 
            type: 'Cultural',
            date: 'Dec 15, 2023', 
            time: '18:00 - 22:00',
            location: 'Multi-Purpose Hall',
            organizer: 'Student Council',
            description: 'A night of music, dance, and celebration as we wrap up the academic year. The gala features performances from the school choir and jazz band.',
            registrationRequired: true,
            registrationDeadline: 'Dec 10, 2023',
            media: [{ url: 'https://picsum.photos/seed/gala1/400/300', type: 'image' }]
          },
          {
            id: 'e2',
            title: 'Parent-Teacher Consultations',
            type: 'Meeting',
            date: 'Nov 30, 2023',
            time: '09:00 - 16:00',
            location: 'Main Campus',
            organizer: 'Administration',
            description: 'An opportunity for parents to discuss their children\'s progress with subject teachers.',
            registrationRequired: false
          }
        ],
        gallery: [
          { id: 'gal-1', url: 'https://picsum.photos/seed/g1/800/600', title: 'Inter-house Sports Day 2023', type: 'image', createdAt: new Date().toISOString() },
          { id: 'gal-2', url: 'https://picsum.photos/seed/g2/800/600', title: 'Science Fair Winners', type: 'image', createdAt: new Date().toISOString() },
          { id: 'gal-3', url: 'https://picsum.photos/seed/g3/800/600', title: 'Drama Production: Hamlet', type: 'image', createdAt: new Date().toISOString() }
        ],
        newsletterCta: 'Stay Updated with Our Latest News'
      },
      studentLife: {
        overview: {
          headline: 'A Vibrant Student Experience',
          introduction: 'Life at Waterford Kamhlaba is a rich tapestry of academic rigor, extracurricular exploration, and community engagement. We foster an environment where students from diverse backgrounds come together to learn, grow, and lead. Our campus culture is built on mutual respect, social responsibility, and a passion for excellence in all endeavors.'
        },
        sports: {
          list: ['Soccer', 'Swimming', 'Tennis', 'Basketball', 'Netball', 'Athletics'],
          facilities: ['Olympic-sized Swimming Pool', 'Tennis Courts', 'Soccer Pitch', 'Multi-purpose Indoor Hall'],
          achievements: ['National High School Soccer Champions 2023', 'Regional Swimming Gala Winners'],
          description: 'Sports are integral to our holistic education, promoting physical health, teamwork, and resilience.'
        },
        clubs: [
          { name: 'Model United Nations', focus: 'Leadership & Diplomacy', description: 'Students simulate UN sessions, debating global issues and developing negotiation skills.' },
          { name: 'Environment Club', focus: 'Sustainability', description: 'Leading campus green initiatives and community environmental awareness programs.' },
          { name: 'Debate Society', focus: 'Academic', description: 'Developing critical thinking and public speaking through competitive debating.' }
        ],
        arts: {
          activities: ['Annual Drama Production', 'Jazz Band Performances', 'Visual Arts Exhibition'],
          description: 'Creativity is celebrated through a diverse range of artistic expressions and cultural events.'
        },
        leadership: {
          opportunities: ['Student Representative Council (SRC)', 'Peer Mentors', 'House Captains'],
          roles: 'Students take active roles in school governance and community leadership.',
          development: 'Regular leadership workshops and training programs for student leaders.'
        },
        facilities: [
          { name: 'Modern Library', description: 'World-class library with digital resources.' },
          { name: 'Science Laboratories', description: 'Advanced labs for physics, chemistry, and biology.' },
          { name: 'Computer Centers', description: 'High-speed internet and modern computing facilities.' },
          { name: 'Student Lounge', description: 'Relaxing space for student socialization.' },
          { name: 'Hostels', description: 'Safe and comfortable on-campus accommodation.' }
        ],
        support: {
          services: ['Academic Counseling', 'Career Guidance', 'Psychological Support', 'Health Services'],
          description: 'We provide comprehensive support to ensure the well-being and success of every student.'
        },
        accommodation: {
          available: true,
          type: 'Boarding',
          facilities: ['Comfortable Dormitories', 'Dining Hall', 'Supervised Study Areas'],
          description: 'Our boarding program offers a safe and supportive home-away-from-home for international and local students.'
        },
        activities: {
          list: ['Cultural Days', 'Talent Shows', 'Field Trips', 'Community Outreach Days'],
          description: 'Regular events enrich the student experience and foster a strong sense of community.'
        },
        community: {
          programs: ['Local School Tutoring', 'Environmental Clean-up', 'Charity Fundraising'],
          description: 'Students engage in meaningful service projects that impact the local and global community.'
        },
        testimonials: [
          { name: 'Thabo Dlamini', grade: 'IB2', text: 'Waterford has given me the confidence to lead and the skills to succeed in a global environment.' },
          { name: 'Sarah Smith', grade: 'Form 5', text: 'The sense of community here is incredible. I\'ve made friends from all over the world.' }
        ]
      },
      contactUs: {
        enabled: true,
        headline: 'Get in Touch with Us',
        introduction: 'We are here to answer any questions you may have.',
        email: 'info@waterford.sz',
        phone: '+268 2422 0866',
        address: 'Mbabane, Hhohho, Eswatini',
        supportHours: 'Mon - Fri: 08:00 - 16:30',
        socialMediaEnabled: true
      },
      portal: {
        enabled: true,
        name: 'WK ManageBac Portal',
        headline: 'Access Your Learning Anytime, Anywhere',
        description: 'The WK ManageBac Portal is our central hub for academic management, curriculum planning, and student-teacher collaboration. It provides students with real-time access to their coursework, assignments, and academic progress, ensuring a seamless digital learning experience.',
        url: 'https://example.com/',
        loginRequirements: ['Student ID', 'School Email', 'Secure Password'],
        rolesSupported: ['Students', 'Teachers', 'Parents', 'Administrators'],
        accountCreationProcess: 'Accounts are automatically generated upon enrollment. Login credentials are provided during orientation.',
        features: {
          dashboard: {
            list: ['Personalized Dashboard', 'Announcements', 'Upcoming Deadlines', 'Quick Shortcuts'],
            description: 'A centralized view of your academic life, highlighting what needs your immediate attention.'
          },
          learning: {
            list: ['Course Outlines', 'Learning Modules', 'PDF Notes', 'Recorded Lectures'],
            description: 'Engage with rich course content and resources curated by your educators.'
          },
          assessments: {
            list: ['Assignment Uploads', 'Online Quizzes', 'Grade Tracking', 'Teacher Feedback'],
            description: 'Submit work digitally and receive comprehensive feedback to support your growth.'
          },
          records: {
            list: ['View Grades', 'Track Progress', 'Download Reports'],
            accessLevel: 'Students + Parents'
          },
          scheduling: {
            list: ['Class Timetable', 'Exam Schedule', 'Event Reminders'],
            description: 'Stay organized with synchronized calendars for all your academic activities.'
          },
          collaboration: ['Messaging System', 'Discussion Forums', 'Group Announcements'],
          attendance: {
            enabled: true,
            description: 'Daily attendance records and alerts for absences are accessible to students and parents.'
          },
          parentAccess: {
            enabled: true,
            features: ['Monitor Results', 'Track Attendance', 'Communicate with Teachers']
          }
        },
        tools: {
          list: ['ManageBac LMS', 'Zoom Integration', 'Digital Library'],
          platforms: ['ManageBac', 'Google Workspace', 'Zoom']
        },
        mobileAccess: {
          list: ['Mobile-friendly Website', 'Dedicated iOS/Android App'],
          devices: ['Android', 'iOS', 'Web Browsers']
        },
        security: ['Secure SSL Login', 'Role-based Access', 'Data Privacy Compliance'],
        support: {
          email: 'it-support@waterford.sz',
          phone: '+268 2422 0866',
          hours: '08:00 - 16:30 (Mon - Fri)',
          resources: ['User Guides', 'Video Tutorials', 'FAQ Section']
        },
        usageGuidelines: {
          policy: 'Acceptable use of digital resources for academic purposes only.',
          rules: 'Academic integrity and honesty in all digital submissions.',
          expectations: 'Respectful online behavior and professional communication.'
        },
        screenshots: [
          'https://picsum.photos/seed/portal1/800/600',
          'https://picsum.photos/seed/portal2/800/600'
        ]
      }
    },
    stats: { views: 12500, applications: 450, engagementRate: 15 }
  },
  {
    id: 'inst-2',
    name: 'Sifundzani Primary School',
    slug: 'sifundzani-primary',
    logo: 'https://picsum.photos/seed/sifundzani/200/200',
    coverImage: imgPrimary,
    region: Region.HHOHHO,
    type: [InstitutionType.PRIMARY, InstitutionType.PRIVATE],
    isVerified: true,
    isAccredited: true,
    moetRegistration: 'MoET/HHO/002-SP',
    isFeatured: false,
    isSpotlight: false,
    seoScore: 85,
    trustScore: 90,
    plan: SubscriptionPlan.FREE,
    status: 'published',
    adminId: 'user-1',
    createdAt: '2023-02-15T00:00:00Z',
    seo: {
      title: 'Sifundzani Primary - Quality Foundation Education',
      description: 'A leading private primary school in Mbabane.',
      keywords: ['Primary School', 'Mbabane'],
      healthScore: 80
    },
    theme: {
      primaryColor: '#059669',
      fontFamily: 'Inter',
      borderRadius: 'md',
      layout: 'classic'
    },
    metadata: {
      gender: GenderType.MIXED,
      isBoarding: false,
      feeRange: { min: 15000, max: 30000 },
      establishedYear: 1981,
      studentCount: 450,
      hasStudentPortal: false
    },
    contact: {
      address: 'Mbabane, Hhohho, Eswatini',
      latitude: -26.33,
      longitude: 31.14,
      phone: '+268 2404 2461',
      email: 'info@sifundzani.ac.sz',
      website: 'www.sifundzani.ac.sz',
      officeHours: 'Mon - Fri: 07:30 - 13:30',
      googleMapsUrl: 'https://maps.google.com/?q=Sifundzani+Primary+School',
      facebook: 'https://facebook.com/sifundzaniprimary',
      headline: 'Building Strong Foundations',
      introduction: 'At Sifundzani Primary, we believe in nurturing every child\'s potential through a balanced curriculum and a supportive community. Contact us to learn more about our admissions process and school life.',
      departments: [
        { name: 'Admissions', phone: '+268 2404 2461 ext 10', email: 'admissions@sifundzani.ac.sz' },
        { name: 'Accounts', phone: '+268 2404 2461 ext 12', email: 'accounts@sifundzani.ac.sz' }
      ],
      emergencyContacts: [
        { name: 'School Nurse', phone: '+268 7602 1234' },
        { name: 'Security Head', phone: '+268 7605 5678' }
      ],
      directions: {
        landmarks: ['Near Mbabane Library', 'Opposite Coronation Park'],
        transport: 'Accessible via Mbabane city buses and kombis.',
        parking: 'On-site parking available for parents and visitors.',
        accessibility: 'Wheelchair accessible entrance and ground floor facilities.'
      },
      faqs: [
        { question: 'What is the entry age?', answer: 'We accept students from age 5 for Grade 1.' },
        { question: 'Do you offer after-school care?', answer: 'Yes, we have a supervised after-school program until 16:30.' }
      ]
    },
    reviews: [],
    sections: {
      homepage: {
        heroBanner: imgPrimary,
        welcomeMessage: 'Welcome to Sifundzani Primary School.',
        principalMessage: { text: 'We nurture young minds.', name: 'Principal Sifundzani' },
        quickLinks: [],
        announcements: []
      },
      about: {
        overview: 'Sifundzani Primary School provides a nurturing environment for early childhood and primary education. Established in 1981, we have a long history of academic excellence and holistic development.',
        foundingBackground: 'Established in 1981.',
        history: { 
          foundingStory: { 
            yearEstablished: 1981, 
            founders: ['Community Leaders', 'Education Advocates'], 
            originalPurpose: 'To provide high-quality foundation education for children in Mbabane.', 
            initialStudentPopulation: '50 Students', 
            firstCampusLocation: 'Mbabane Central' 
          }, 
          milestones: [
            { year: '1981', event: 'School founded with 50 students.' },
            { year: '1995', event: 'Expansion of the upper primary wing.' },
            { year: '2010', event: 'Introduction of the digital learning program.' }
          ], 
          growthSummary: 'Steady historical growth.',
          transformationNarrative: { 
            adaptationToChange: 'We have continuously updated our curriculum to include modern pedagogical approaches.', 
            technologicalUpgrades: 'Every classroom is now equipped with interactive smart boards.', 
            communityImpact: 'We have educated generations of Eswatini leaders.', 
            alumniInfluence: 'Our alumni are prominent in various sectors globally.' 
          } 
        },
        vision: { headline: 'Excellence in early education', supportingParagraph: 'To be the leading foundation school in Eswatini, recognized for our commitment to nurturing young minds.' },
        mission: { statement: 'To provide quality foundation education.', description: 'We strive to create a safe, inclusive, and stimulating environment where every child can thrive academically and socially.' },
        coreValues: [
          { name: 'Integrity', description: 'Acting with honesty and strong moral principles.' },
          { name: 'Respect', description: 'Valuing ourselves, others, and the environment.' },
          { name: 'Excellence', description: 'Striving for the highest standards in all we do.' }
        ],
        leadership: { 
          principal: { name: 'Mrs. N. Dlamini', title: 'Principal' }, 
          seniorTeam: [
            { name: 'Mr. S. Mamba', title: 'Deputy Principal' },
            { name: 'Mrs. T. Gamedze', title: 'Head of Lower Primary' }
          ] 
        },
        accreditation: { 
          registeredWith: 'MoET', 
          registrationNumber: 'HHO/002', 
          examinationBody: 'EPC', 
          affiliations: ['Eswatini Independent Schools Association'], 
          awards: ['Best Primary School Hhohho 2022'] 
        },
        statistics: { totalStudents: 450, totalStaff: 30, studentTeacherRatio: '1:15', yearsOfOperation: 42, graduationRate: '100%' },
        facilities: { 
          overview: 'Our campus is designed to provide a safe and engaging learning environment.', 
          list: ['Modern Classrooms', 'Science Lab', 'Computer Lab', 'Library', 'Art Studio', 'Music Room', 'Sports Field', 'Playground'] 
        },
        community: { 
          outreach: 'We regularly participate in local community service projects.', 
          partnerships: 'Collaborations with local NGOs for environmental awareness.', 
          socialResponsibility: 'Scholarship program for underprivileged students.' 
        },
        downloads: [
          { label: 'School Prospectus', url: '#' },
          { label: 'Fee Structure 2024', url: '#' }
        ],
        testimonials: [
          { author: 'Parent', text: 'Sifundzani has been a second home for my children. The teachers are incredibly dedicated.' },
          { author: 'Alumni', text: 'The foundation I received at Sifundzani prepared me for success in high school and beyond.' }
        ]
      },
      admissions: { 
        headline: 'Start Your Child\'s Journey With Us', 
        introduction: 'We welcome applications for students from Grade 1 to Grade 7. Our admissions process is designed to ensure that Sifundzani is the right fit for your child.', 
        programs: [
          { level: 'Lower Primary', items: ['Grade 1', 'Grade 2', 'Grade 3'] },
          { level: 'Upper Primary', items: ['Grade 4', 'Grade 5', 'Grade 6', 'Grade 7'] }
        ], 
        requirements: { 
          academic: ['Previous school reports', 'Basic literacy and numeracy assessment'], 
          documents: ['Birth certificate', 'Immunization card', 'Proof of residence'], 
          additional: ['Parent interview'] 
        }, 
        processSteps: [
          { step: '1', instruction: 'Collect application form from the school office.' },
          { step: '2', instruction: 'Submit completed form with required documents.' },
          { step: '3', instruction: 'Schedule an assessment date for the child.' }
        ], 
        applicationFee: { amount: 'SZL 200', methods: ['Cash', 'Bank Transfer'] }, 
        processingTime: '1 Week', 
        importantDates: [
          { event: 'Application Deadline', date: 'September 30, 2023' }
        ], 
        tuitionFees: { 
          perTerm: 'SZL 8,500', 
          perYear: 'SZL 25,500', 
          additional: [
            { label: 'Development Levy', amount: 'SZL 1,000' }
          ] 
        }, 
        scholarships: { types: [], eligibility: '', howToApply: '' }, 
        faqs: [
          { question: 'Is there a waiting list?', answer: 'Yes, for certain grades we maintain a waiting list.' }
        ], 
        contact: { 
          name: 'Admissions Secretary', 
          phone: '+268 2404 2461', 
          email: 'info@sifundzani.ac.sz', 
          hours: '07:30 - 13:30' 
        },
        allowOnlineApplications: false 
      },
      academics: { 
        overview: { 
          headline: 'A Foundation for Lifelong Learning', 
          introduction: 'Our academic program follows the Eswatini National Curriculum, enriched with international best practices in early childhood education.' 
        }, 
        curriculum: { 
          structure: 'Primary Education (Grade 1-7)', 
          examinationBody: 'Eswatini Examinations Council (EPC)', 
          description: 'We focus on core subjects: English, Mathematics, Science, and Siswati, alongside creative arts and physical education.' 
        }, 
        departments: [
          { name: 'Languages', head: 'Mrs. Gamedze', subjects: ['English', 'Siswati'], overview: 'Developing strong communication skills from an early age.' },
          { name: 'STEM', head: 'Mr. Shongwe', subjects: ['Mathematics', 'Science', 'ICT'], overview: 'Encouraging curiosity and logical thinking.' }
        ], 
        programs: [
          { id: 'prog-sif-1', name: 'Primary Foundation Phase', qualification: 'Primary Certificate', duration: '3 Years (Grade 1-3)', subjects: ['English', 'Mathematics', 'Science', 'Siswati'], requirements: 'Age 6+ and placement assessment.', description: 'Focuses on building core literacy and numeracy skills in a supportive environment.', syllabusUrl: '#' },
          { id: 'prog-sif-2', name: 'Intermediate Phase', qualification: 'Primary Certificate', duration: '4 Years (Grade 4-7)', subjects: ['English', 'Social Studies', 'Integrated Science', 'ICT'], requirements: 'Successful completion of Foundation Phase.', description: 'Prepares students for the EPC examinations with a broad, balanced curriculum.', syllabusUrl: '#' }
        ], 
        calendar: { 
          startDate: 'January 23, 2024', 
          terms: [
            { name: 'Term 1', info: 'Jan - April' },
            { name: 'Term 2', info: 'May - August' },
            { name: 'Term 3', info: 'Sept - Dec' }
          ], 
          examPeriods: 'November (EPC Exams for Grade 7)', 
          holidays: 'Standard school holidays' 
        }, 
        assessment: { 
          approach: 'Continuous assessment through classwork, tests, and projects.', 
          gradingSystem: 'Percentage based with descriptive feedback.' 
        }, 
        support: { 
          services: ['Remedial reading', 'Maths support'], 
          description: 'We provide extra help for students who need a bit more time to master core concepts.' 
        }, 
        staff: { 
          head: { 
          name: 'Mrs. N. Dlamini', 
          qualifications: 'B.Ed Primary, Advanced Cert in School Management', 
          experience: '20 Years',
          professionalBackground: 'Mrs. Dlamini has dedicated two decades to primary education in Eswatini. She has served as a senior teacher and administrator in various public and private schools, consistently advocating for child-centered learning and teacher professional development.',
          messageFromPrincipal: 'At Sifundzani Primary, we believe in nurturing the whole child. Our goal is to provide a safe, engaging, and challenging environment where students can discover their strengths and develop a love for learning. We work closely with parents to ensure every child reaches their full potential.'
        }, 
          totalCount: 30, 
          avgExperience: '10 Years', 
          certifications: ['SACE Registered', 'First Aid Certified'] 
        }, 
        performance: { passRate: '100%', ranking: 'Top 10 Nationally', distinctions: '85% Merit/Credit rate', awards: ['Best Primary School Hhohho 2022'] }, 
        facilities: { 
          description: 'Child-friendly classrooms and specialized learning areas.', 
          list: ['Library', 'Computer Lab', 'Art Room', 'Music Room'] 
        }, 
        elearning: { enabled: true, platform: 'Google Classroom', onlineClassOptions: 'Online homework support and remote classes when required.', digitalAssignments: 'Daily homework and term projects assigned via Google Classroom.', recordedLectures: 'Not available for primary grades.' }, 
        partnerships: { internships: '', collaborations: '' } 
      },
      news: { 
        overview: { title: 'Sifundzani Updates', description: 'Keep up with our latest school activities and student achievements.' }, 
        posts: [
          { id: 's1', title: 'Grade 7 Farewell', category: 'Events', date: 'Dec 1, 2023', excerpt: 'Celebrating our graduating class as they move on to high school.', image: 'https://picsum.photos/seed/grad/800/400' }
        ], 
        events: [
          { id: 'se1', title: 'Annual Sports Day', type: 'Sports', date: 'Oct 15, 2023', time: '08:00', location: 'School Grounds', organizer: 'Sports Dept', description: 'A day of fun and competition for all grades.', registrationRequired: false }
        ], 
        gallery: [], 
        newsletterCta: 'Subscribe to our monthly newsletter' 
      },
      studentLife: { 
        overview: { 
          headline: 'Beyond the Classroom', 
          introduction: 'We offer a variety of activities to help students discover their talents and build confidence.' 
        }, 
        sports: { 
          list: ['Soccer', 'Netball', 'Swimming', 'Athletics'], 
          facilities: ['Sports field', 'Swimming pool access'], 
          description: 'Regular physical education and competitive matches with other schools.' 
        }, 
        clubs: [
          { name: 'Chess Club', focus: 'Strategy', description: 'Developing focus and critical thinking.' },
          { name: 'Drama Club', focus: 'Arts', description: 'Building confidence through performance.' }
        ], 
        arts: { 
          activities: ['Choir', 'Traditional Dance', 'Art & Craft'], 
          description: 'Encouraging creative expression through various mediums.' 
        }, 
        leadership: { 
          opportunities: ['Prefects', 'Class Monitors', 'Library Assistants'], 
          roles: 'Grade 7 students take on leadership roles to serve the school community.' 
        }, 
        facilities: [
          { name: 'Playground', description: 'Safe and fun play area for students.' },
          { name: 'Assembly Hall', description: 'Central gathering space for events.' },
          { name: 'Tuck Shop', description: 'Convenient on-campus snack shop.' }
        ], 
        support: { 
          services: ['School Counselor', 'First Aid'], 
          description: 'Ensuring the emotional and physical well-being of our students.' 
        }, 
        activities: { 
          list: ['Educational Trips', 'Concerts', 'Fun Days'], 
          description: 'Enriching the curriculum with real-world experiences.' 
        }, 
        community: { 
          programs: ['Charity Drives', 'Visit to Elderly Home'], 
          description: 'Teaching students the importance of giving back.' 
        } 
      },
      portal: { 
        enabled: true, 
        name: 'Sifundzani Student Portal', 
        headline: 'Welcome to our Digital Learning Space', 
        description: 'Explore our foundation education resources.', 
        url: '', 
        loginRequirements: ['Student ID'], 
        rolesSupported: ['STUDENT', 'PARENT'], 
        accountCreationProcess: 'Initial login provided at enrollment.', 
        features: { 
          dashboard: { list: ['Activities', 'News'], description: '' }, 
          learning: { list: ['Educational Games'], description: '' }, 
          assessments: { list: ['Grade Summary'], description: '' }, 
          records: { list: ['Attendance'], accessLevel: 'Parental' }, 
          scheduling: { list: ['Class Schedule'], description: '' }, 
          collaboration: [] 
        }, 
        tools: { list: [], platforms: [] }, 
        mobileAccess: { list: [], devices: [] }, 
        security: [], 
        support: { email: 'info@sifundzani.ac.sz', phone: '+268 2404 2461', hours: '07:30 - 13:30', resources: [] }, 
        usageGuidelines: { policy: '', rules: '', expectations: '' } 
      }
    },
    stats: { views: 5000, applications: 120, engagementRate: 8 }
  },
  {
    id: 'inst-3',
    name: 'Manzini Nazarene High School',
    slug: 'manzini-nazarene-high',
    logo: 'https://picsum.photos/seed/nazarene/200/200',
    coverImage: imgCampus,
    region: Region.MANZINI,
    type: [InstitutionType.HIGH_SCHOOL, InstitutionType.PUBLIC],
    isVerified: true,
    isAccredited: true,
    moetRegistration: 'MoET/MA/001-MN',
    isFeatured: true,
    isSpotlight: false,
    seoScore: 80,
    trustScore: 85,
    plan: SubscriptionPlan.FREE,
    status: 'published',
    adminId: 'user-1',
    createdAt: '2023-03-10T00:00:00Z',
    seo: {
      title: 'Manzini Nazarene High - Academic Excellence',
      description: 'A top-performing public high school in Manzini.',
      keywords: ['High School', 'Manzini'],
      healthScore: 75
    },
    theme: {
      primaryColor: '#dc2626',
      fontFamily: 'Inter',
      borderRadius: 'md',
      layout: 'classic'
    },
    metadata: {
      gender: GenderType.MIXED,
      isBoarding: false,
      feeRange: { min: 5000, max: 10000 },
      establishedYear: 1950,
      studentCount: 800,
      hasStudentPortal: true
    },
    contact: {
      address: 'Manzini, Eswatini',
      latitude: -26.48,
      longitude: 31.37,
      phone: '+268 2505 2211',
      email: 'info@nazarenehigh.sz',
      website: 'www.nazarenehigh.sz',
      officeHours: 'Mon - Fri: 08:00 - 16:00',
      googleMapsUrl: 'https://maps.google.com/?q=Manzini+Nazarene+High+School',
      facebook: 'https://facebook.com/nazarenehigh',
      headline: 'Striving for Excellence in Christ',
      introduction: 'Manzini Nazarene High School is a premier public school dedicated to academic excellence and spiritual development. We prepare students for the SGCSE examinations and beyond.',
      departments: [
        { name: 'Admissions', phone: '+268 2505 2211', email: 'admissions@nazarenehigh.sz' },
        { name: 'Principal\'s Office', phone: '+268 2505 2211', email: 'principal@nazarenehigh.sz' }
      ],
      emergencyContacts: [
        { name: 'School Security', phone: '+268 7602 9999' },
        { name: 'Local Clinic', phone: '+268 2505 1111' }
      ],
      directions: {
        landmarks: ['Near Manzini Bus Rank', 'Opposite Nazarene Hospital'],
        transport: 'Central location in Manzini, easily accessible by all public transport.',
        parking: 'Limited on-site parking; public parking nearby.',
        accessibility: 'Ramp access to main buildings.'
      },
      faqs: [
        { question: 'What curriculum do you follow?', answer: 'We follow the SGCSE curriculum.' },
        { question: 'Is boarding available?', answer: 'No, we are currently a day school only.' }
      ]
    },
    reviews: [],
    sections: {
      homepage: {
        heroBanner: 'https://picsum.photos/seed/mnhhero/1600/600',
        welcomeMessage: 'Welcome to Manzini Nazarene High School.',
        principalMessage: { text: 'Striving for excellence.', name: 'Principal Dlamini' },
        quickLinks: [],
        announcements: []
      },
      about: {
        overview: 'Manzini Nazarene High School is a leading public school committed to academic and spiritual growth. Founded in 1950, we have a rich tradition of producing well-rounded individuals who excel in various fields.',
        foundingBackground: 'Founded in 1950.',
        history: { 
          foundingStory: { 
            yearEstablished: 1950, 
            founders: ['Church of the Nazarene Missionaries'], 
            originalPurpose: 'To provide quality secondary education based on Christian principles.', 
            initialStudentPopulation: '100 Students', 
            firstCampusLocation: 'Manzini Mission Station' 
          }, 
          milestones: [
            { year: '1950', event: 'School established by the Church of the Nazarene.' },
            { year: '1975', event: 'First science laboratory built.' },
            { year: '2005', event: 'Named Top Performing School in Manzini.' }
          ], 
          growthSummary: 'Consistent growth.',
          transformationNarrative: { 
            adaptationToChange: 'We have embraced the SGCSE curriculum and integrated technology into our teaching.', 
            technologicalUpgrades: 'Expansion of the computer center and campus-wide Wi-Fi.', 
            communityImpact: 'Strong ties with the Nazarene Hospital and local community.', 
            alumniInfluence: 'Our alumni include prominent doctors, engineers, and educators.' 
          } 
        },
        vision: { headline: 'Academic excellence for all', supportingParagraph: 'To be a center of excellence in education, fostering spiritual growth and academic success.' },
        mission: { statement: 'To provide quality education in a Christian environment.', description: 'We aim to develop students who are academically competent, spiritually mature, and socially responsible.' },
        coreValues: [
          { name: 'Faith', description: 'Grounded in Christian principles.' },
          { name: 'Excellence', description: 'Striving for the best in academics and character.' },
          { name: 'Service', description: 'Encouraging students to serve their community.' }
        ],
        leadership: { 
          principal: { name: 'Mr. S. Dlamini', title: 'Principal' }, 
          seniorTeam: [
            { name: 'Mrs. P. Simelane', title: 'Deputy Principal' },
            { name: 'Mr. J. Mamba', title: 'Head of Sciences' }
          ] 
        },
        accreditation: { 
          registeredWith: 'MoET', 
          registrationNumber: 'MA/001', 
          examinationBody: 'SGCSE', 
          affiliations: ['International Board of Education (Nazarene)'], 
          awards: ['Best Performing School in Science 2021'] 
        },
        statistics: { totalStudents: 800, totalStaff: 50, studentTeacherRatio: '1:16', yearsOfOperation: 73, graduationRate: '95%' },
        facilities: { 
          overview: 'Our facilities support a comprehensive academic and extracurricular program.', 
          list: ['Science Labs', 'Computer Center', 'Library', 'School Hall', 'Sports Grounds', 'Workshop'] 
        },
        community: { 
          outreach: 'Regular visits to local orphanages and community clean-up projects.', 
          partnerships: 'Collaboration with UNESWA for science outreach programs.', 
          socialResponsibility: 'Strong emphasis on spiritual mentorship and character building.' 
        },
        downloads: [
          { label: 'School Rules & Regulations', url: '#' },
          { label: 'SGCSE Subject List', url: '#' }
        ],
        testimonials: [
          { author: 'Student', text: 'Nazarene High has not only challenged me academically but also helped me grow in my faith.' },
          { author: 'Parent', text: 'The discipline and academic focus at this school are commendable.' }
        ]
      },
      admissions: { 
        headline: 'Join Our Community of Achievers', 
        introduction: 'We admit students based on merit and potential. Our admissions window typically opens in August for the following academic year.', 
        programs: [
          { level: 'Junior Secondary', items: ['Form 1', 'Form 2', 'Form 3'] },
          { level: 'Senior Secondary', items: ['Form 4', 'Form 5 (SGCSE)'] }
        ], 
        requirements: { 
          academic: ['EPC Results (for Form 1)', 'Junior Certificate Results (for Form 4)', 'Transfer letter for other forms'], 
          documents: ['Birth certificate', 'Identity document', 'Latest school report'], 
          additional: ['Placement test for certain subjects'] 
        }, 
        processSteps: [
          { step: '1', instruction: 'Submit application form during the open window.' },
          { step: '2', instruction: 'Attend an interview if shortlisted.' },
          { step: '3', instruction: 'Receive admission letter and pay commitment fee.' }
        ], 
        applicationFee: { amount: 'SZL 150', methods: ['Bank Deposit'] }, 
        processingTime: '2 Weeks', 
        importantDates: [
          { event: 'Form 1 Applications Open', date: 'August 15, 2023' },
          { event: 'Entrance Exam', date: 'October 10, 2023' }
        ], 
        tuitionFees: { 
          perTerm: 'SZL 3,500', 
          perYear: 'SZL 10,500', 
          additional: [
            { label: 'Lab Fee', amount: 'SZL 500' },
            { label: 'Sports Fee', amount: 'SZL 300' }
          ] 
        }, 
        scholarships: { types: ['Merit-based', 'Need-based'], eligibility: 'Top 5% in EPC/JC exams', howToApply: 'Submit scholarship application with admission form.' }, 
        faqs: [
          { question: 'Do you offer A-Levels?', answer: 'Currently, we focus on SGCSE.' }
        ], 
        contact: { name: 'School Secretary', phone: '+268 2505 2211', email: 'admin@nazarenehigh.sz', hours: '08:00 - 16:00' }, 
        allowOnlineApplications: false 
      },
      academics: { 
        overview: { 
          headline: 'Academic Rigor and Spiritual Growth', 
          introduction: 'Our academic program is designed to challenge students and prepare them for higher education and professional careers.' 
        }, 
        curriculum: { 
          structure: 'Secondary Education (Form 1-5)', 
          examinationBody: 'Eswatini Examinations Council (ECESWA)', 
          description: 'We offer a comprehensive range of subjects including Sciences, Humanities, and Vocational subjects.' 
        }, 
        departments: [
          { name: 'Sciences', head: 'Mr. Mamba', subjects: ['Physics', 'Chemistry', 'Biology', 'Maths'], overview: 'Strong focus on practical laboratory work.' },
          { name: 'Humanities', head: 'Mrs. Simelane', subjects: ['History', 'Geography', 'Religious Education'], overview: 'Developing critical analysis and social awareness.' }
        ], 
        programs: [
          { id: 'prog-naz-1', name: 'SGCSE Science Stream', qualification: 'SGCSE Certificate', duration: '2 Years (Form 4-5)', subjects: ['Physics', 'Chemistry', 'Biology', 'Add Maths'], requirements: 'Merit pass in JC Sciences and Mathematics.', description: 'A rigorous program for students aiming for careers in engineering, medicine, and technology.', syllabusUrl: '#' },
          { id: 'prog-naz-2', name: 'Junior Secondary Program', qualification: 'Junior Certificate', duration: '3 Years (Form 1-3)', subjects: ['English', 'Maths', 'Integrated Science', 'Geography'], requirements: 'Pass in EPC (Grade 7) examinations.', description: 'Foundation secondary education covering a wide range of academic and practical subjects.', syllabusUrl: '#' }
        ], 
        calendar: { 
          startDate: 'January 24, 2024', 
          terms: [
            { name: 'First Term', info: 'Jan - April' },
            { name: 'Second Term', info: 'May - August' },
            { name: 'Third Term', info: 'Sept - Dec' }
          ], 
          examPeriods: 'Mid-year (June), Finals (Oct/Nov)', 
          holidays: 'Standard MoET holidays' 
        }, 
        assessment: { 
          approach: 'Regular tests, assignments, and mock examinations.', 
          gradingSystem: 'SGCSE Grading (A* - G)' 
        }, 
        support: { 
          services: ['Career Guidance', 'Peer Tutoring'], 
          description: 'Helping students navigate their academic path and future careers.' 
        }, 
        staff: { 
          head: { name: 'Mr. S. Dlamini', qualifications: 'M.Ed Administration', experience: '25 Years' }, 
          totalCount: 50, 
          avgExperience: '12 Years', 
          certifications: ['MoET Certified', 'SGCSE Examiners'] 
        }, 
        performance: { passRate: '95%', ranking: 'Top 5 in Manzini', distinctions: 'High rate of credits in Sciences', awards: ['Best Performing School in Science 2021'] }, 
        facilities: { 
          description: 'Well-equipped labs and classrooms.', 
          list: ['Science Labs', 'Computer Center', 'Library', 'Workshop'] 
        }, 
        elearning: { enabled: true, platform: 'School Management System', onlineClassOptions: 'Virtual teacher-parent consultations available.', digitalAssignments: 'Digital report cards and assignments.', recordedLectures: 'N/A' }, 
        partnerships: { internships: '', collaborations: 'UNESWA Science Outreach' } 
      },
      news: { 
        overview: { title: 'Nazarene High News', description: 'Stay updated with school events and achievements.' }, 
        posts: [
          { id: 'n1', title: 'Science Fair Success', category: 'Academic', date: 'July 15, 2023', excerpt: 'Our students took home three gold medals at the regional science fair.', image: 'https://picsum.photos/seed/science/800/400' }
        ], 
        events: [
          { id: 'ne1', title: 'Parents Day', type: 'Meeting', date: 'Sept 5, 2023', time: '10:00', location: 'School Hall', organizer: 'Admin', description: 'Meeting to discuss student progress.', registrationRequired: false }
        ], 
        gallery: [], 
        newsletterCta: 'Join our mailing list' 
      },
      studentLife: { 
        overview: { 
          headline: 'A Vibrant Student Community', 
          introduction: 'Life at Nazarene High is more than just books. We encourage students to participate in various extracurricular activities.' 
        }, 
        sports: { 
          list: ['Soccer', 'Basketball', 'Volleyball', 'Tennis'], 
          facilities: ['Basketball court', 'Soccer pitch'], 
          description: 'Competitive sports teams participating in inter-school leagues.' 
        }, 
        clubs: [
          { name: 'Debate Society', focus: 'Public Speaking', description: 'Developing eloquence and critical thinking.' },
          { name: 'Christian Fellowship', focus: 'Spiritual', description: 'Daily devotions and weekly meetings.' }
        ], 
        arts: { 
          activities: ['School Choir', 'Drama Club', 'Traditional Dance'], 
          description: 'Showcasing student talent through annual concerts and festivals.' 
        }, 
        leadership: { 
          opportunities: ['Prefect Body', 'SRC', 'Club Executives'], 
          roles: 'Students are given responsibility to lead and serve their peers.' 
        }, 
        facilities: [
          { name: 'Student Center', description: 'Spaces for relaxation and social interaction.' },
          { name: 'Sports Grounds', description: 'Available for various sports activities.' },
          { name: 'Canteen', description: 'Serving balanced meals for students.' }
        ], 
        support: { 
          services: ['Guidance & Counseling', 'Spiritual Mentorship'], 
          description: 'Holistic support for student well-being.' 
        }, 
        activities: { 
          list: ['Culture Day', 'Talent Show', 'Community Service'], 
          description: 'Celebrating diversity and giving back to the community.' 
        }, 
        community: { 
          programs: ['Local Orphanage Support', 'Environmental Awareness'], 
          description: 'Engaging with the local community in Manzini.' 
        } 
      },
      portal: { 
        enabled: true, 
        name: 'Nazarene High Portal', 
        headline: 'Student Success Center', 
        description: 'Access your grades, attendance, and learning materials.', 
        url: '', 
        loginRequirements: ['Student ID', 'Password'], 
        rolesSupported: ['STUDENT', 'PARENT', 'TEACHER'], 
        accountCreationProcess: 'Accounts are created upon registration.', 
        features: { 
          dashboard: { list: ['Live Attendance', 'Grade Summary'], description: 'Overview of your academic status.' }, 
          learning: { list: ['Assignments', 'Resources'], description: 'Access course materials.' }, 
          assessments: { list: ['Test Results', 'Mock Exams'], description: 'Track your performance.' }, 
          records: { list: ['Report Cards'], accessLevel: 'Student/Parent' }, 
          scheduling: { list: ['Timetable'], description: 'View your weekly schedule.' }, 
          collaboration: [] 
        }, 
        tools: { list: [], platforms: [] }, 
        mobileAccess: { list: ['Android App', 'iOS App'], devices: ['Smartphone', 'Tablet'] }, 
        security: ['SSL Encryption', 'Two-Factor Authentication'], 
        support: { email: 'support@nazarenehigh.sz', phone: '+268 2505 2211', hours: '08:00 - 16:00', resources: [] }, 
        usageGuidelines: { policy: 'Terms of Use', rules: 'Respectful Conduct', expectations: 'Daily Check-ins' } 
      }
    },
    stats: { views: 8000, applications: 300, engagementRate: 10 }
  },
  {
    id: 'inst-4',
    name: 'University of Eswatini (UNESWA)',
    slug: 'uneswa',
    logo: 'https://picsum.photos/seed/uneswa/200/200',
    coverImage: imgVarsity,
    region: Region.LUBOMBO,
    type: [InstitutionType.TERTIARY, InstitutionType.PUBLIC],
    isVerified: true,
    isAccredited: true,
    moetRegistration: 'MoET/LU/001-UN',
    isFeatured: true,
    isSpotlight: true,
    seoScore: 90,
    trustScore: 95,
    plan: SubscriptionPlan.ENTERPRISE_B2B,
    status: 'published',
    adminId: 'user-1',
    createdAt: '2023-04-01T00:00:00Z',
    seo: {
      title: 'UNESWA - The National University of Eswatini',
      description: 'The premier tertiary institution in Eswatini.',
      keywords: ['University', 'Tertiary', 'Eswatini'],
      healthScore: 88
    },
    theme: {
      primaryColor: '#1e3a8a',
      fontFamily: 'Inter',
      borderRadius: 'lg',
      layout: 'modern'
    },
    metadata: {
      gender: GenderType.MIXED,
      isBoarding: true,
      feeRange: { min: 20000, max: 60000 },
      establishedYear: 1982,
      studentCount: 5000,
      hasStudentPortal: true
    },
    contact: {
      address: 'Kwaluseni Campus (Main), Luyengo, Mbabane',
      latitude: -26.48,
      longitude: 31.32,
      phone: '+268 2517 0000',
      email: 'info@uneswa.ac.sz',
      website: 'www.uneswa.ac.sz',
      officeHours: 'Mon - Fri: 08:00 - 16:45',
      googleMapsUrl: 'https://maps.google.com/?q=University+of+Eswatini',
      facebook: 'https://facebook.com/uneswa',
      headline: 'The National University of Eswatini',
      introduction: 'UNESWA is the premier tertiary institution in the Kingdom of Eswatini, offering diverse undergraduate and postgraduate programs across three campuses.',
      departments: [
        { name: 'Registrar', phone: '+268 2517 0000', email: 'registrar@uneswa.ac.sz' },
        { name: 'Admissions', phone: '+268 2517 0000', email: 'admissions@uneswa.ac.sz' },
        { name: 'Student Affairs', phone: '+268 2517 0000', email: 'dsa@uneswa.ac.sz' }
      ],
      emergencyContacts: [
        { name: 'Campus Security (Kwaluseni)', phone: '+268 2517 0000 ext 2222' },
        { name: 'Campus Clinic', phone: '+268 2517 0000 ext 3333' }
      ],
      directions: {
        landmarks: ['Near Matsapha Industrial Site', 'Kwaluseni Hill'],
        transport: 'Frequent kombis from Manzini and Mbabane to Kwaluseni.',
        parking: 'Ample parking available for students and staff across all campuses.',
        accessibility: 'Most buildings are equipped with ramps and elevators.'
      },
      faqs: [
        { question: 'When do applications close?', answer: 'Typically in March for the August intake.' },
        { question: 'Do you offer distance learning?', answer: 'Yes, through the Institute of Distance Education (IDE).' }
      ]
    },
    reviews: [],
    sections: {
      homepage: {
        heroBanner: imgVarsity,
        welcomeMessage: 'Welcome to the University of Eswatini.',
        principalMessage: { text: 'Empowering through knowledge.', name: 'Vice Chancellor' },
        quickLinks: [],
        announcements: []
      },
      about: {
        overview: 'UNESWA is the national university of Eswatini, offering a wide range of undergraduate and postgraduate programs. Established in 1982, it has grown to become the premier center for higher learning and research in the country.',
        foundingBackground: 'Established in 1982.',
        history: { 
          foundingStory: { 
            yearEstablished: 1982, 
            founders: ['Government of Eswatini'], 
            originalPurpose: 'To provide high-level manpower for the development of Eswatini.', 
            initialStudentPopulation: '500 Students', 
            firstCampusLocation: 'Kwaluseni' 
          }, 
          milestones: [
            { year: '1982', event: 'University of Swaziland (now Eswatini) established.' },
            { year: '1988', event: 'Opening of the Luyengo campus for Agriculture.' },
            { year: '2018', event: 'Name changed to University of Eswatini.' }
          ], 
          growthSummary: 'Significant growth.',
          transformationNarrative: { 
            adaptationToChange: 'We have expanded our program offerings to include modern fields like ICT and Renewable Energy.', 
            technologicalUpgrades: 'Implementation of the Moodle LMS and high-speed campus connectivity.', 
            communityImpact: 'Leading research in agriculture and food security for the nation.', 
            alumniInfluence: 'Our alumni hold key positions in government and industry across SADC.' 
          } 
        },
        vision: { headline: 'A leading university in Africa', supportingParagraph: 'To be a world-class university committed to excellence in teaching, research, and community service.' },
        mission: { statement: 'To provide quality higher education.', description: 'To produce highly skilled and versatile graduates who can contribute to the sustainable development of Eswatini and the global community.' },
        coreValues: [
          { name: 'Academic Freedom', description: 'Promoting independent thought and inquiry.' },
          { name: 'Excellence', description: 'Striving for the highest quality in all academic pursuits.' },
          { name: 'Social Responsibility', description: 'Engaging with the community to address societal challenges.' }
        ],
        leadership: { 
          principal: { name: 'Prof. J.M. Thwala', title: 'Vice Chancellor' }, 
          seniorTeam: [
            { name: 'Dr. S.S. Dlamini', title: 'Registrar' },
            { name: 'Prof. N.S. Mamba', title: 'Pro-Vice Chancellor' }
          ] 
        },
        accreditation: { 
          registeredWith: 'MoET', 
          registrationNumber: 'LU/001', 
          examinationBody: 'UNESWA Senate', 
          affiliations: ['Association of African Universities', 'SADC University Network'], 
          awards: ['Regional Research Excellence Award 2022'] 
        },
        statistics: { totalStudents: 5000, totalStaff: 400, studentTeacherRatio: '1:12', yearsOfOperation: 41, graduationRate: '90%' },
        facilities: { 
          overview: 'Our three campuses offer specialized facilities for diverse academic disciplines.', 
          list: ['Main Library', 'Science & Engineering Labs', 'Research Farm (Luyengo)', 'Computer Labs', 'Student Residences', 'Sports Stadium', 'Health Center'] 
        },
        community: { 
          outreach: 'Extensive agricultural extension services and community health programs.', 
          partnerships: 'Collaborations with international universities and research institutes.', 
          socialResponsibility: 'Leading national research on climate change and food security.' 
        },
        downloads: [
          { label: 'University Calendar 2024', url: '#' },
          { label: 'Undergraduate Prospectus', url: '#' }
        ],
        testimonials: [
          { author: 'Graduate', text: 'My time at UNESWA was transformative. The academic rigor prepared me for my career in law.' },
          { author: 'Researcher', text: 'The research facilities at Luyengo are among the best in the region for agricultural studies.' }
        ]
      },
      admissions: { 
        headline: 'Shape Your Future at UNESWA', 
        introduction: 'We offer a wide range of academic programs designed to meet the needs of a changing world. Applications for the 2024/2025 academic year are now open.', 
        programs: [
          { level: 'Undergraduate', items: ['Bachelor of Science', 'Bachelor of Arts', 'Bachelor of Commerce', 'Bachelor of Laws'] },
          { level: 'Postgraduate', items: ['Master of Education', 'Master of Science', 'PhD in Agriculture'] },
          { level: 'Diploma', items: ['Diploma in Law', 'Diploma in Agriculture'] }
        ], 
        requirements: { 
          academic: ['SGCSE/O-Level with 5 credits including English', 'Specific subject requirements for certain faculties', 'Postgraduate: Relevant Bachelor degree'], 
          documents: ['Certified copy of certificates', 'Identity document', 'Academic transcripts', 'Reference letters (for PG)'], 
          additional: ['Entrance exam for Law and Nursing'] 
        }, 
        processSteps: [
          { step: '1', instruction: 'Download application form or apply online.' },
          { step: '2', instruction: 'Pay application fee at the bank.' },
          { step: '3', instruction: 'Submit form with proof of payment and documents.' }
        ], 
        applicationFee: { amount: 'SZL 350', methods: ['Bank Deposit', 'Mobile Money'] }, 
        processingTime: '4-8 Weeks', 
        importantDates: [
          { event: 'Application Deadline', date: 'March 31, 2024' },
          { event: 'Registration', date: 'August 12, 2024' }
        ], 
        tuitionFees: { 
          perTerm: 'Varies by Faculty', 
          perYear: 'SZL 25,000 - 45,000', 
          additional: [
            { label: 'Registration Fee', amount: 'SZL 1,500' },
            { label: 'Caution Fee', amount: 'SZL 500' }
          ] 
        }, 
        scholarships: { types: ['Government Sponsorship', 'Private Foundations'], eligibility: 'Eswatini Citizens with high academic standing', howToApply: 'Apply through the Ministry of Labour and Social Security.' }, 
        faqs: [
          { question: 'Is there on-campus housing?', answer: 'Yes, we have residences on all three campuses.' }
        ], 
        contact: { name: 'Admissions Office', phone: '+268 2517 0000', email: 'admissions@uneswa.ac.sz', hours: '08:00 - 16:45' }, 
        allowOnlineApplications: true 
      },
      academics: { 
        overview: { 
          headline: 'Excellence in Higher Education', 
          introduction: 'UNESWA provides a rigorous academic environment supported by experienced faculty and modern research facilities.' 
        }, 
        curriculum: { 
          structure: 'Semester-based credit system', 
          examinationBody: 'University of Eswatini Senate', 
          description: 'Our curriculum is regularly reviewed to ensure relevance to national and international standards.' 
        }, 
        departments: [
          { name: 'Faculty of Agriculture', head: 'Prof. Manyatsi', subjects: ['Crop Science', 'Animal Science', 'Consumer Science'], overview: 'Located at Luyengo campus, focusing on food security and rural development.' },
          { name: 'Faculty of Commerce', head: 'Dr. Dlamini', subjects: ['Accounting', 'Business Administration', 'Economics'], overview: 'Preparing leaders for the business world.' },
          { name: 'Faculty of Science & Engineering', head: 'Prof. Enshayan', subjects: ['Computer Science', 'Physics', 'Mathematics', 'Electrical Engineering'], overview: 'Driving innovation and technological advancement.' }
        ], 
        programs: [
          { id: 'prog-uneswa-1', name: 'BSc in Computer Science', qualification: 'Degree', duration: '4 Years', subjects: ['Programming', 'Data Structures', 'Database Systems', 'AI'], requirements: 'C or better in SGCSE Mathematics and English.', description: 'Comprehensive training in software development and computing theory.', syllabusUrl: '#' },
          { id: 'prog-uneswa-2', name: 'Bachelor of Commerce', qualification: 'Degree', duration: '4 Years', subjects: ['Accounting', 'Business Management', 'Economics', 'Finance'], requirements: 'Credits in SGCSE English and Mathematics.', description: 'Prepares students for leadership roles in the global business environment.', syllabusUrl: '#' }
        ], 
        calendar: { 
          startDate: 'August 19, 2024', 
          terms: [
            { name: 'Semester 1', info: 'Aug - Dec' },
            { name: 'Semester 2', info: 'Jan - May' }
          ], 
          examPeriods: 'Dec and May', 
          holidays: 'Standard university breaks' 
        }, 
        assessment: { 
          approach: 'Continuous assessment (40%) and Final Examination (60%).', 
          gradingSystem: 'GPA System (0.0 - 5.0)' 
        }, 
        support: { 
          services: ['Academic Advising', 'Library Services', 'ICT Support'], 
          description: 'Comprehensive support to ensure student success.' 
        }, 
        staff: { 
          head: { name: 'Prof. J.M. Thwala', qualifications: 'PhD', experience: '30 Years' }, 
          totalCount: 400, 
          avgExperience: '15 Years', 
          certifications: ['HEQC Accredited'] 
        }, 
        performance: { passRate: '90%', ranking: 'Ranked #1 in Eswatini', distinctions: 'High research output in Agriculture', awards: ['Regional Research Excellence Award 2022'] }, 
        facilities: { 
          description: 'State-of-the-art laboratories, libraries, and lecture halls.', 
          list: ['Main Library', 'Computer Labs', 'Science Labs', 'Research Farm'] 
        }, 
        elearning: { enabled: true, platform: 'Moodle LMS', onlineClassOptions: 'Full virtual campus for distance learning students.', digitalAssignments: 'Automated grading and submission for all tertiary courses.', recordedLectures: 'All lectures for core modules are recorded and available for 12 months.' }, 
        partnerships: { internships: 'Mandatory for most programs', collaborations: 'University of Johannesburg, SADC Research Network' } 
      },
      news: { 
        overview: { title: 'UNESWA Newsroom', description: 'Latest updates from the national university.' }, 
        posts: [
          { id: 'u1', title: '2023 Graduation Ceremony', category: 'Events', date: 'Oct 20, 2023', excerpt: 'Celebrating the achievements of over 2000 graduates.', image: 'https://picsum.photos/seed/grad/800/400' }
        ], 
        events: [
          { id: 'ue1', title: 'Research Symposium', type: 'Academic', date: 'Nov 15, 2023', time: '09:00', location: 'Kwaluseni Campus', organizer: 'Research Office', description: 'Showcasing faculty and student research.', registrationRequired: false }
        ], 
        gallery: [], 
        newsletterCta: 'Subscribe to UNESWA Weekly' 
      },
      studentLife: { 
        overview: { 
          headline: 'A Dynamic Campus Experience', 
          introduction: 'University life is about growth beyond academics. We offer a rich array of social, cultural, and sporting activities.' 
        }, 
        sports: { 
          list: ['Soccer', 'Basketball', 'Athletics', 'Rugby'], 
          facilities: ['Sports Stadium', 'Gymnasium', 'Tennis Courts'], 
          description: 'Competing in national and regional university games.' 
        }, 
        clubs: [
          { name: 'Enactus', focus: 'Entrepreneurship', description: 'Using business to solve social issues.' },
          { name: 'Debate Club', focus: 'Intellectual', description: 'Participating in international debate tournaments.' }
        ], 
        arts: { 
          activities: ['Drama Society', 'University Choir', 'Poetry Club'], 
          description: 'Promoting cultural expression and artistic talent.' 
        }, 
        leadership: { 
          opportunities: ['Student Representative Council (SRC)', 'Faculty Representatives'], 
          roles: 'Students play a key role in university governance.' 
        }, 
        facilities: [
          { name: 'Student Union Building', description: 'Essential services for student well-being.' },
          { name: 'Cafeterias', description: 'Multiple dining options across campus.' },
          { name: 'Health Center', description: 'Basic medical services for students.' }
        ], 
        support: { 
          services: ['Counseling Services', 'Career Center', 'Financial Aid Office'], 
          description: 'Holistic support for all students.' 
        }, 
        activities: { 
          list: ['Freshers Ball', 'Cultural Week', 'Career Fair'], 
          description: 'Annual events that define the UNESWA experience.' 
        }, 
        community: { 
          programs: ['Community Outreach', 'Volunteer Programs'], 
          description: 'Engaging with the Eswatini community through service.' 
        } 
      },
      portal: { 
        enabled: true, 
        name: 'UNESWA Student Portal', 
        headline: 'University Information System', 
        description: 'Manage your academic life at the national university.', 
        url: 'https://portal.uneswa.ac.sz', 
        loginRequirements: ['Student Number', 'PIN'], 
        rolesSupported: ['STUDENT', 'TEACHER', 'ADMIN'], 
        accountCreationProcess: 'Registration through the ICT center.', 
        features: { 
          dashboard: { list: ['Registration Status', 'Finances'], description: 'Complete overview of student life.' }, 
          learning: { list: ['Moodle Integration'], description: 'Direct access to online learning.' }, 
          assessments: { list: ['Examination Results', 'Transcripts'], description: 'Official academic records.' }, 
          records: { list: ['Personal Info', 'Degree Audit'], accessLevel: 'Confidential' }, 
          scheduling: { list: ['Lecture Timetable'], description: 'Campus-wide schedules.' }, 
          collaboration: ['Discussion Forums'] 
        }, 
        tools: { list: ['Office 365'], platforms: ['Web', 'Mobile'] }, 
        mobileAccess: { list: ['UNESWA App'], devices: ['Android', 'iOS'] }, 
        security: ['Enterprise Grade Security'], 
        support: { email: 'ictsupport@uneswa.ac.sz', phone: '+268 2517 0000', hours: '24/7 Support', resources: [] }, 
        usageGuidelines: { policy: 'IT Policy', rules: '', expectations: '' } 
      }
    },
    stats: { views: 25000, applications: 2000, engagementRate: 20 }
  },
  {
    id: 'inst-5',
    name: 'Evelyn Baring High School',
    slug: 'evelyn-baring-high',
    logo: 'https://picsum.photos/seed/ebaring/200/200',
    coverImage: imgHighSchool,
    region: Region.SHISELWENI,
    type: [InstitutionType.HIGH_SCHOOL, InstitutionType.PUBLIC],
    isVerified: true,
    isAccredited: true,
    moetRegistration: 'MoET/SH/001-EB',
    isFeatured: false,
    isSpotlight: false,
    seoScore: 75,
    trustScore: 80,
    plan: SubscriptionPlan.FREE,
    status: 'published',
    adminId: 'user-1',
    createdAt: '2023-05-20T00:00:00Z',
    seo: {
      title: 'Evelyn Baring High - Nhlangano',
      description: 'A prominent high school in the Shiselweni region.',
      keywords: ['High School', 'Nhlangano', 'Shiselweni'],
      healthScore: 70
    },
    theme: {
      primaryColor: '#16a34a',
      fontFamily: 'Inter',
      borderRadius: 'md',
      layout: 'classic'
    },
    metadata: {
      gender: GenderType.MIXED,
      isBoarding: true,
      feeRange: { min: 6000, max: 12000 },
      establishedYear: 1955,
      studentCount: 700,
      hasStudentPortal: false
    },
    contact: {
      address: 'P.O. Box 11, Nhlangano, Eswatini',
      latitude: -27.112222,
      longitude: 31.205,
      phone: '+268 2207 8241',
      email: 'info@evelynbaring.sz',
      website: 'www.evelynbaring.sz',
      officeHours: 'Mon - Fri: 08:00 - 16:00',
      googleMapsUrl: 'https://maps.google.com/?q=Evelyn+Baring+High+School',
      facebook: 'https://facebook.com/evelynbaring',
      headline: 'Excellence in the South',
      introduction: 'Evelyn Baring High School is a historic institution in Nhlangano, dedicated to providing quality secondary education and fostering leadership in our students.',
      departments: [
        { name: 'Admissions', phone: '+268 2207 8211', email: 'admissions@evelynbaring.sz' },
        { name: 'Accounts', phone: '+268 2207 8211', email: 'accounts@evelynbaring.sz' }
      ],
      emergencyContacts: [
        { name: 'Dormitory Supervisor', phone: '+268 7602 4444' },
        { name: 'Nhlangano Police', phone: '+268 2207 8222' }
      ],
      directions: {
        landmarks: ['Near Nhlangano Town Center', 'Opposite Shiselweni Region Offices'],
        transport: 'Walking distance from Nhlangano bus rank.',
        parking: 'On-site parking for staff and visitors.',
        accessibility: 'Ground floor access for most classrooms.'
      },
      faqs: [
        { question: 'Do you offer boarding?', answer: 'Yes, we have boarding facilities for both boys and girls.' },
        { question: 'What are the school fees?', answer: 'Fees range from SZL 6,000 to SZL 12,000 per year depending on grade and boarding status.' }
      ]
    },
    reviews: [],
    sections: {
      homepage: {
        heroBanner: 'https://picsum.photos/seed/ebhero/1600/600',
        welcomeMessage: 'Welcome to Evelyn Baring High School.',
        principalMessage: { text: 'Building the future.', name: 'Principal Mkhonta' },
        quickLinks: [],
        announcements: []
      },
      about: {
        overview: 'One of the earliest massive public high institutions in the southern border district.',
        foundingBackground: 'Established in 1955.',
        history: { 
          foundingStory: { 
            yearEstablished: 1955, 
            founders: ['Colonial Administration', 'Local Chiefs'], 
            originalPurpose: 'To provide secondary education for the people of Shiselweni.', 
            initialStudentPopulation: '80 Students', 
            firstCampusLocation: 'Nhlangano' 
          }, 
          milestones: [
            { year: '1955', event: 'School opened by Sir Evelyn Baring.' },
            { year: '1980', event: 'Introduction of the boarding facilities.' },
            { year: '2015', event: 'Celebrated 60 years of excellence.' }
          ], 
          growthSummary: 'Historical growth.',
          transformationNarrative: { 
            adaptationToChange: 'We have transitioned through various curriculum changes, always maintaining high standards.', 
            technologicalUpgrades: 'Renovation of the computer lab and introduction of e-learning tools.', 
            communityImpact: 'A cornerstone of the Nhlangano community.', 
            alumniInfluence: 'Our alumni serve in various leadership roles across Eswatini.' 
          } 
        },
        vision: { headline: 'Excellence in the South', supportingParagraph: 'To be the premier high school in the Shiselweni region, known for producing disciplined and high-achieving students.' },
        mission: { statement: 'To empower students through education.', description: 'To provide a holistic education that prepares students for higher learning and responsible citizenship.' },
        coreValues: [
          { name: 'Discipline', description: 'Fostering a culture of self-control and respect.' },
          { name: 'Hard Work', description: 'Encouraging diligence in all pursuits.' },
          { name: 'Integrity', description: 'Building character through honesty and fairness.' }
        ],
        leadership: { 
          principal: { name: 'Mr. M. Mkhonta', title: 'Principal' }, 
          seniorTeam: [
            { name: 'Mrs. L. Mdluli', title: 'Deputy Principal' },
            { name: 'Mr. T. Khumalo', title: 'Head of Languages' }
          ] 
        },
        accreditation: { 
          registeredWith: 'MoET', 
          registrationNumber: 'SH/001', 
          examinationBody: 'SGCSE', 
          affiliations: ['Shiselweni Schools Association'], 
          awards: ['Regional Excellence Award 2022'] 
        },
        statistics: { totalStudents: 700, totalStaff: 45, studentTeacherRatio: '1:15', yearsOfOperation: 68, graduationRate: '92%' },
        facilities: { 
          overview: 'Our facilities provide a conducive environment for both day and boarding students.', 
          list: ['Science Lab', 'Computer Lab', 'Library', 'Agriculture Plot', 'Home Economics Room', 'Dining Hall', 'Boarding Houses', 'Sports Fields'] 
        },
        community: { 
          outreach: 'Participation in local environmental clean-up and charity drives.', 
          partnerships: 'Collaboration with local farmers for agricultural training.', 
          socialResponsibility: 'Support for orphaned and vulnerable children in the school.' 
        },
        downloads: [
          { label: 'Admission Form', url: '#' },
          { label: 'Boarding Requirements', url: '#' }
        ],
        testimonials: [
          { author: 'Parent', text: 'Evelyn Baring has provided my child with a solid foundation and strong values.' },
          { author: 'Alumni', text: 'The discipline I learned at Evelyn Baring has been key to my success in my professional life.' }
        ]
      },
      admissions: { 
        headline: 'Join a Legacy of Excellence', 
        introduction: 'General public secondary enrollment guidelines, localized prioritized quota based on regional school leaving cards.', 
        programs: [
          { level: 'Junior Secondary', items: ['Form 1', 'Form 2', 'Form 3'] },
          { level: 'Senior Secondary', items: ['Form 4', 'Form 5 (SGCSE)'] }
        ], 
        requirements: { 
          academic: ['General public secondary enrollment guidelines', 'localized prioritized quota based on regional school leaving cards'], 
          documents: ['SPC regional school leaving card', 'Reference letter from primary school', 'Birth certificate'], 
          additional: ['Prioritized Shiselweni southern regional allocation'] 
        }, 
        processSteps: [
          { step: '1', instruction: 'Collect application forms from the school office.' },
          { step: '2', instruction: 'Submit completed forms with all required documents.' },
          { step: '3', instruction: 'Attend the scheduled interview.' }
        ], 
        applicationFee: { amount: 'SZL 100', methods: ['Cash', 'Bank Deposit'] }, 
        processingTime: '2 Weeks', 
        importantDates: [
          { event: 'Application Deadline', date: 'October 15, 2023' },
          { event: 'Interviews', date: 'November 5-10, 2023' }
        ], 
        tuitionFees: { 
          perTerm: 'SZL 2,500 - 4,000', 
          perYear: 'SZL 7,500 - 12,000', 
          additional: [
            { label: 'Boarding Fee', amount: 'SZL 5,000 per term' },
            { label: 'Uniform', amount: 'SZL 1,500' }
          ] 
        }, 
        scholarships: { types: ['Academic Excellence', 'Sports Talent'], eligibility: 'Top performers in regional competitions', howToApply: 'Submit a formal request to the School Committee.' }, 
        faqs: [
          { question: 'Is there a school bus?', answer: 'Yes, we provide transport for day students within Nhlangano.' }
        ], 
        contact: { name: 'Admissions Officer', phone: '+268 2207 8211', email: 'info@evelynbaring.sz', hours: '08:00 - 16:00' }, 
        allowOnlineApplications: false 
      },
      academics: { 
        overview: { 
          headline: 'Quality Education for a Brighter Future', 
          introduction: 'Our academic program is designed to empower students with the knowledge and skills needed for success in the SGCSE examinations and beyond.' 
        }, 
        curriculum: { 
          structure: 'Secondary Education (Form 1-5)', 
          examinationBody: 'Eswatini Examinations Council (ECESWA)', 
          description: 'We offer a balanced curriculum including Sciences, Humanities, and Practical subjects like Agriculture and Home Economics.' 
        }, 
        departments: [
          { name: 'Practical Subjects', head: 'Mrs. Mdluli', subjects: ['Agriculture', 'Home Economics', 'Technical Drawing'], overview: 'Focusing on hands-on skills and vocational training.' },
          { name: 'Languages', head: 'Mr. Khumalo', subjects: ['English', 'Siswati', 'French'], overview: 'Promoting multilingualism and cultural understanding.' }
        ], 
        programs: [
          { id: 'prog-eb-1', name: 'SGCSE General Stream', qualification: 'SGCSE', duration: '2 Years', subjects: ['English', 'Siswati', 'Maths', 'History', 'Geography'], requirements: 'Pass in Junior Certificate (JC).', description: 'A broad-based secondary education program preparing students for tertiary institutions.', syllabusUrl: '#' },
          { id: 'prog-eb-2', name: 'Practical Arts Program', qualification: 'SGCSE', duration: '2 Years', subjects: ['Agriculture', 'Home Economics', 'Fashion & Fabrics'], requirements: 'Interest in vocational and practical skills.', description: 'Focuses on hands-on skills for self-reliance and vocational career paths.', syllabusUrl: '#' }
        ], 
        calendar: { 
          startDate: 'January 22, 2024', 
          terms: [
            { name: 'Term 1', info: 'Jan - April' },
            { name: 'Term 2', info: 'May - August' },
            { name: 'Term 3', info: 'Sept - Dec' }
          ], 
          examPeriods: 'June and November', 
          holidays: 'Standard MoET holidays' 
        }, 
        assessment: { 
          approach: 'Regular class tests, assignments, and term-end examinations.', 
          gradingSystem: 'SGCSE Grading System' 
        }, 
        support: { 
          services: ['Remedial Classes', 'Library Access'], 
          description: 'Providing extra support for students to reach their full potential.' 
        }, 
        staff: { 
          head: { name: 'Mr. M. Mkhonta', qualifications: 'B.Ed, M.Ed', experience: '22 Years' }, 
          totalCount: 45, 
          avgExperience: '10 Years', 
          certifications: ['MoET Registered'] 
        }, 
        performance: { passRate: '92%', ranking: 'Top High School in Shiselweni', distinctions: 'Strong performance in Agriculture and Siswati', awards: ['Regional Excellence Award 2022'] }, 
        facilities: { 
          description: 'Well-maintained classrooms and specialized subject rooms.', 
          list: ['Science Lab', 'Agriculture Plot', 'Home Economics Room', 'Library'] 
        }, 
        elearning: { enabled: false, platform: 'SMS', onlineClassOptions: 'N/A', digitalAssignments: 'SMS based notifications.', recordedLectures: '' }, 
        partnerships: { internships: '', collaborations: 'Local Farmers Association' } 
      },
      news: { 
        overview: { title: 'Evelyn Baring Updates', description: 'Latest news and events from our school.' }, 
        posts: [
          { id: 'e1', title: 'Culture Day Celebration', category: 'Events', date: 'Sept 20, 2023', excerpt: 'A day of traditional music, dance, and food.', image: 'https://picsum.photos/seed/culture/800/400' }
        ], 
        events: [
          { id: 'ee1', title: 'Annual General Meeting', type: 'Meeting', date: 'Oct 5, 2023', time: '14:00', location: 'School Hall', organizer: 'Admin', description: 'Important meeting for all parents and guardians.', registrationRequired: false }
        ], 
        gallery: [], 
        newsletterCta: 'Stay informed' 
      },
      studentLife: { 
        overview: { 
          headline: 'A Holistic Student Experience', 
          introduction: 'We believe in the development of the whole child through a variety of extracurricular activities.' 
        }, 
        sports: { 
          list: ['Soccer', 'Netball', 'Athletics', 'Volleyball'], 
          facilities: ['Soccer field', 'Netball court'], 
          description: 'Active participation in regional sports competitions.' 
        }, 
        clubs: [
          { name: 'Scouts', focus: 'Leadership', description: 'Building character and outdoor skills.' },
          { name: 'Red Cross', focus: 'Service', description: 'First aid training and community service.' }
        ], 
        arts: { 
          activities: ['Traditional Dance', 'School Choir', 'Art Club'], 
          description: 'Celebrating Eswatini culture and student creativity.' 
        }, 
        leadership: { 
          opportunities: ['Prefects', 'Dormitory Captains', 'Club Leaders'], 
          roles: 'Developing leadership skills through responsibility.' 
        }, 
        facilities: [
          { name: 'Dining Hall', description: 'Facilities that support a vibrant boarding community.' },
          { name: 'Boarding Houses', description: 'Home away from home for our students.' },
          { name: 'Sports Grounds', description: 'Ample space for outdoor activities.' }
        ], 
        support: { 
          services: ['School Nurse', 'Guidance Counselor'], 
          description: 'Caring for the physical and emotional health of our students.' 
        }, 
        activities: { 
          list: ['Inter-house Competitions', 'Educational Tours', 'Concerts'], 
          description: 'Fun and engaging activities throughout the year.' 
        }, 
        community: { 
          programs: ['Environmental Clean-up', 'Local Charity Support'], 
          description: 'Teaching students to be responsible citizens.' 
        } 
      },
      portal: { 
        enabled: false, 
        name: 'Evelyn Baring Portal', 
        headline: '', 
        description: '', 
        url: '', 
        loginRequirements: [], 
        rolesSupported: [], 
        accountCreationProcess: '', 
        features: { 
          dashboard: { list: [], description: '' }, 
          learning: { list: [], description: '' }, 
          assessments: { list: [], description: '' }, 
          records: { list: [], accessLevel: '' }, 
          scheduling: { list: [], description: '' }, 
          collaboration: [] 
        }, 
        tools: { list: [], platforms: [] }, 
        mobileAccess: { list: [], devices: [] }, 
        security: [], 
        support: { email: '', phone: '', hours: '', resources: [] }, 
        usageGuidelines: { policy: '', rules: '', expectations: '' } 
      }
    },
    stats: { views: 6000, applications: 200, engagementRate: 7 }
  },
  {
    id: 'inst-6',
    name: "St. Mark's High School",
    slug: 'st-marks-high',
    logo: 'https://picsum.photos/seed/stmarks/200/200',
    coverImage: imgCampus,
    region: Region.HHOHHO,
    type: [InstitutionType.HIGH_SCHOOL, InstitutionType.PUBLIC],
    isVerified: true,
    isAccredited: true,
    moetRegistration: 'MoET/HHO/001-SM',
    isFeatured: true,
    isSpotlight: false,
    seoScore: 82,
    trustScore: 88,
    plan: SubscriptionPlan.FREE,
    status: 'published',
    adminId: 'user-1',
    createdAt: '2023-01-10T00:00:00Z',
    seo: { title: "St. Mark's High - Mbabane", description: 'A prestigious public high school in Mbabane.', keywords: ['High School', 'Mbabane'], healthScore: 80 },
    theme: { primaryColor: '#1e40af', fontFamily: 'Inter', borderRadius: 'md', layout: 'classic' },
    metadata: { gender: GenderType.MIXED, isBoarding: false, feeRange: { min: 6000, max: 12000 }, establishedYear: 1908, studentCount: 900, hasStudentPortal: true },
    contact: {
      address: 'Centre 422 / P.O. Box 16, Mbabane, Eswatini',
      latitude: -26.320833,
      longitude: 31.139444,
      phone: '+268 2404 2121',
      email: 'info@stmarks.ac.sz',
      website: 'www.stmarks.ac.sz',
      officeHours: 'Mon - Fri: 08:00 - 16:00',
      googleMapsUrl: 'https://maps.google.com/?q=St.+Mark\'s+High+School+Mbabane',
      headline: 'Excellence in Education',
      introduction: 'St. Mark\'s High School is one of the oldest and most respected schools in Mbabane, known for its strong academic record and vibrant student life.',
      departments: [{ name: 'Admissions', phone: '+268 2404 2211', email: 'admissions@stmarks.ac.sz' }],
      faqs: [{ question: 'Do you offer A-Levels?', answer: 'Yes, we offer both SGCSE and A-Level programs.' }]
    },
    reviews: [],
    sections: {
      homepage: { heroBanner: 'https://picsum.photos/seed/smhero/1600/600', welcomeMessage: 'Welcome to St. Mark\'s High School.', principalMessage: { text: 'Building a legacy of excellence.', name: 'Principal' }, quickLinks: [], announcements: [] },
      about: {
        overview: 'Historic government-aided mission foundation dating back to 1908.',
        foundingBackground: 'Established in 1908.',
        history: { foundingStory: { yearEstablished: 1908, founders: [], originalPurpose: '', initialStudentPopulation: '', firstCampusLocation: '' }, milestones: [], growthSummary: 'Steady growth over several decades.', transformationNarrative: { adaptationToChange: '', technologicalUpgrades: '', communityImpact: '', alumniInfluence: '' } },
        vision: { headline: 'Excellence in all we do', supportingParagraph: '', explanation: '' },
        mission: { statement: 'To provide quality education for all.' },
        coreValues: [],
        leadership: { principal: { name: 'Principal', title: 'Principal' }, seniorTeam: [] },
        accreditation: { registeredWith: 'MoET', registrationNumber: '', examinationBody: 'EGCSE and GCE Advanced Level (A-Levels)', affiliations: [], awards: [] },
        statistics: { totalStudents: 900, totalStaff: 60, studentTeacherRatio: '1:15', yearsOfOperation: 115, graduationRate: '98%' },
        facilities: { overview: '', list: ['Science Labs', 'Library', 'Computer Center', 'Sports Grounds'] },
        community: { outreach: '', partnerships: '', socialResponsibility: '' },
        downloads: [],
        testimonials: []
      },
      admissions: { headline: 'Join St. Mark\'s', introduction: 'Swaziland Primary Certificate pass with top grades; interview process for external high school transfers.', programs: [], requirements: { academic: ['Swaziland Primary Certificate pass with top grades'], documents: ['SPC result sheet', 'Transfer recommendation card', 'Birth certificate'], additional: ['Formal interview process for external high school transfers'] }, processSteps: [], applicationFee: { amount: 'SZL 150', methods: [] }, processingTime: '', importantDates: [], tuitionFees: { perTerm: '', perYear: '', additional: [] }, scholarships: { types: [], eligibility: '', howToApply: '' }, faqs: [], contact: { name: '', phone: '', email: '', hours: '' }, allowOnlineApplications: false },
      academics: { 
        overview: { headline: '', introduction: '' }, 
        curriculum: { structure: '', examinationBody: '', description: '' }, 
        departments: [], 
        calendar: { startDate: '', terms: [], examPeriods: '', holidays: '' }, 
        assessment: { approach: '', gradingSystem: '' }, 
        support: { services: [], description: '' }, 
        staff: { head: { name: '', qualifications: '', experience: '' }, totalCount: 0, avgExperience: '', certifications: [] },
        performance: { passRate: '98%', ranking: '', distinctions: '', awards: [] },
        programs: [
          { id: 'prog-sm-1', name: 'SGCSE Pure Sciences', qualification: 'SGCSE Certificate', duration: '2 Years', subjects: ['Physics', 'Chemistry', 'Biology', 'Add Maths'], requirements: 'Merit in JC Science.', description: 'For students pursuing STEM careers.', syllabusUrl: 'https://www.stmarks.ac.sz/downloads/pure-sciences-syllabus.pdf' }
        ],
        facilities: { description: '', list: [] },
        elearning: { enabled: false, platform: '', onlineClassOptions: '', digitalAssignments: '', recordedLectures: '' },
        studentPortal: { enabled: true, url: 'https://portal.stmarks.ac.sz', features: { learningMaterials: true, assignmentSubmission: true, resultsDisplay: true } },
        partnerships: { internships: '', collaborations: '' }
      },
      news: { overview: { title: '', description: '' }, posts: [], events: [], gallery: [], newsletterCta: '' },
      studentLife: { overview: { headline: '', introduction: '' }, sports: { list: [], facilities: [], description: '' }, clubs: [], arts: { activities: [], description: '' }, leadership: { opportunities: [], roles: '' }, facilities: [], support: { services: [], description: '' }, activities: { list: [], description: '' }, community: { programs: [], description: '' } },
      portal: { 
        enabled: true, 
        name: 'St. Marks Portal', 
        headline: 'Academic & Administration Hub', 
        description: 'Quality education through digital innovation.', 
        url: '', 
        loginRequirements: ['Student Number'], 
        rolesSupported: ['STUDENT', 'TEACHER'], 
        accountCreationProcess: 'Automated for all registered students.', 
        features: { 
          dashboard: { list: ['My Courses', 'Notifications'], description: '' }, 
          learning: { list: ['Lecture Notes'], description: '' }, 
          assessments: { list: ['Continuous Assessment'], description: '' }, 
          records: { list: ['Results History'], accessLevel: 'Student' }, 
          scheduling: { list: ['Subject Timetable'], description: '' }, 
          collaboration: [] 
        }, 
        tools: { list: ['Google Workspace'], platforms: ['Web'] }, 
        mobileAccess: { list: [], devices: [] }, 
        security: ['Password Protected'], 
        support: { email: 'ict@stmarks.ac.sz', phone: '+268 2404 2211', hours: '08:00 - 16:00', resources: [] }, 
        usageGuidelines: { policy: 'Internet Policy', rules: '', expectations: '' } 
      }
    },
    stats: { views: 12000, applications: 500, engagementRate: 15 }
  },
  {
    id: 'inst-7',
    name: 'Salesian High School',
    slug: 'salesian-high',
    logo: 'https://picsum.photos/seed/salesian/200/200',
    coverImage: 'https://picsum.photos/seed/salesiancover/1200/400',
    region: Region.MANZINI,
    type: [InstitutionType.HIGH_SCHOOL, InstitutionType.PRIVATE],
    isVerified: true,
    isAccredited: true,
    moetRegistration: 'MoET/MA/002-SH',
    isFeatured: false,
    isSpotlight: false,
    seoScore: 78,
    trustScore: 85,
    plan: SubscriptionPlan.FREE,
    status: 'published',
    adminId: 'user-1',
    createdAt: '2023-02-20T00:00:00Z',
    seo: { title: 'Salesian High - Manzini', description: 'A leading boys high school in Manzini.', keywords: ['High School', 'Manzini', 'Boys School'], healthScore: 75 },
    theme: { primaryColor: '#1d4ed8', fontFamily: 'Inter', borderRadius: 'md', layout: 'classic' },
    metadata: { gender: GenderType.BOYS, isBoarding: true, feeRange: { min: 10000, max: 20000 }, establishedYear: 1960, studentCount: 600, hasStudentPortal: false },
    contact: {
      address: 'P.O. Box 163, Manzini, Eswatini',
      latitude: -26.493056,
      longitude: 31.380556,
      phone: '+268 2505 2419',
      email: 'info@salesian.ac.sz',
      website: 'www.salesian.ac.sz',
      officeHours: 'Mon - Fri: 08:00 - 16:30',
      googleMapsUrl: 'https://maps.google.com/?q=Salesian+High+School+Manzini',
      headline: 'Don Bosco\'s Legacy',
      introduction: 'Salesian High School is a Catholic school for boys, following the educational philosophy of St. John Bosco.',
      departments: [{ name: 'Admissions', phone: '+268 2505 2233', email: 'admissions@salesian.ac.sz' }],
      faqs: [{ question: 'Is it only for Catholics?', answer: 'No, we welcome students of all faiths.' }]
    },
    reviews: [],
    sections: {
      homepage: { heroBanner: 'https://picsum.photos/seed/shhero/1600/600', welcomeMessage: 'Welcome to Salesian High School.', principalMessage: { text: 'Educating the heart and mind.', name: 'Principal' }, quickLinks: [], announcements: [] },
      about: {
        overview: 'Roman Catholic mission-run boys\' academy with an exceptional reputation for mathematics and engineering sciences.',
        foundingBackground: 'Established in 1960.',
        history: { foundingStory: { yearEstablished: 1960, founders: ['Salesian Fathers'], originalPurpose: 'To provide Catholic education.', initialStudentPopulation: '100 Students', firstCampusLocation: 'Manzini' }, milestones: [], growthSummary: 'Strong community focus.', transformationNarrative: { adaptationToChange: '', technologicalUpgrades: '', communityImpact: '', alumniInfluence: '' } },
        vision: { headline: 'Honest citizens and good Christians', supportingParagraph: '', explanation: '' },
        mission: { statement: 'To provide holistic education for young men.' },
        coreValues: [],
        leadership: { principal: { name: 'Principal', title: 'Principal' }, seniorTeam: [] },
        accreditation: { registeredWith: 'MoET', registrationNumber: '', examinationBody: 'SGCSE', affiliations: [], awards: [] },
        statistics: { totalStudents: 600, totalStaff: 40, studentTeacherRatio: '1:15', yearsOfOperation: 63, graduationRate: '96%' },
        facilities: { overview: '', list: ['Chapel', 'Science Labs', 'Sports Fields', 'Boarding House'] },
        community: { outreach: '', partnerships: '', socialResponsibility: '' },
        downloads: [],
        testimonials: []
      },
      admissions: { headline: 'Join Salesian', introduction: 'All-boys entry. High-tier SPC cut-off requirements for Form 1 entry.', programs: [], requirements: { academic: ['Strict high-tier SPC cut-off requirements for Form 1 entry'], documents: ['SPC primary report card', 'Behavioral reference letter', 'Birth certificate'], additional: ['All-boys entry requirement'] }, processSteps: [], applicationFee: { amount: 'SZL 200', methods: [] }, processingTime: '', importantDates: [], tuitionFees: { perTerm: '', perYear: '', additional: [] }, scholarships: { types: [], eligibility: '', howToApply: '' }, faqs: [], contact: { name: '', phone: '', email: '', hours: '' }, allowOnlineApplications: false },
      academics: { 
        overview: { headline: '', introduction: '' }, 
        curriculum: { structure: '', examinationBody: '', description: '' }, 
        departments: [], 
        calendar: { startDate: '', terms: [], examPeriods: '', holidays: '' }, 
        assessment: { approach: '', gradingSystem: '' }, 
        support: { services: [], description: '' }, 
        staff: { head: { name: '', qualifications: '', experience: '' }, totalCount: 0, avgExperience: '', certifications: [] },
        performance: { passRate: '96%', ranking: '', distinctions: '', awards: [] },
        programs: [
          { id: 'prog-sal-1', name: 'Commercial Stream', qualification: 'SGCSE', duration: '2 Years', subjects: ['Accounting', 'Economics', 'Business Studies'], requirements: 'Credit in JC Maths.', description: 'Focused on business and financial sciences.', syllabusUrl: 'https://www.salesian.ac.sz/academics/commercial-stream-syllabus.pdf' }
        ],
        facilities: { description: '', list: [] },
        elearning: { enabled: false, platform: '', onlineClassOptions: '', digitalAssignments: '', recordedLectures: '' },
        studentPortal: { enabled: false, url: '', features: { learningMaterials: false, assignmentSubmission: false, resultsDisplay: false } },
        partnerships: { internships: '', collaborations: '' }
      },
      news: { overview: { title: '', description: '' }, posts: [], events: [], gallery: [], newsletterCta: '' },
      studentLife: { overview: { headline: '', introduction: '' }, sports: { list: [], facilities: [], description: '' }, clubs: [], arts: { activities: [], description: '' }, leadership: { opportunities: [], roles: '' }, facilities: [], support: { services: [], description: '' }, activities: { list: [], description: '' }, community: { programs: [], description: '' } },
      portal: { 
        enabled: true, 
        name: 'Salesian Portal', 
        headline: 'Salesian High Online Services', 
        description: 'Faith, Excellence, and Technology.', 
        url: '', 
        loginRequirements: ['Student ID'], 
        rolesSupported: ['STUDENT', 'PARENT'], 
        accountCreationProcess: 'Individual accounts created on school entry.', 
        features: { 
          dashboard: { list: ['Academic Overview'], description: '' }, 
          learning: { list: ['E-Learning Portal'], description: '' }, 
          assessments: { list: ['Mid-Term Results'], description: '' }, 
          records: { list: ['Conduct Records'], accessLevel: 'Staff/Parent' }, 
          scheduling: { list: ['Activity Calendar'], description: '' }, 
          collaboration: [] 
        }, 
        tools: { list: [], platforms: [] }, 
        mobileAccess: { list: [], devices: [] }, 
        security: [], 
        support: { email: 'it@salesian.ac.sz', phone: '+268 2505 2233', hours: '08:00 - 16:30', resources: [] }, 
        usageGuidelines: { policy: '', rules: '', expectations: '' } 
      }
    },
    stats: { views: 7000, applications: 250, engagementRate: 9 }
  },
  {
    id: 'inst-8',
    name: 'Gwamile VOCTIM',
    slug: 'gwamile-voctim',
    logo: 'https://picsum.photos/seed/voctim/200/200',
    coverImage: 'https://picsum.photos/seed/voctimcover/1200/400',
    region: Region.MANZINI,
    type: [InstitutionType.TERTIARY, InstitutionType.PUBLIC],
    isVerified: true,
    isAccredited: true,
    moetRegistration: 'MoET/MA/003-GV',
    isFeatured: false,
    isSpotlight: false,
    seoScore: 70,
    trustScore: 80,
    plan: SubscriptionPlan.FREE,
    status: 'published',
    adminId: 'user-1',
    createdAt: '2023-03-15T00:00:00Z',
    seo: { title: 'Gwamile VOCTIM - Vocational Training', description: 'Premier vocational and technical training institute.', keywords: ['Vocational', 'Technical', 'Matsapha'], healthScore: 65 },
    theme: { primaryColor: '#0369a1', fontFamily: 'Inter', borderRadius: 'md', layout: 'classic' },
    metadata: { gender: GenderType.MIXED, isBoarding: true, feeRange: { min: 8000, max: 15000 }, establishedYear: 1987, studentCount: 800, hasStudentPortal: false },
    contact: {
      address: 'Matsapha, Eswatini',
      phone: '+268 2518 6361',
      email: 'info@voctim.ac.sz',
      website: 'www.voctim.ac.sz',
      officeHours: 'Mon - Fri: 08:00 - 16:45',
      googleMapsUrl: 'https://maps.google.com/?q=Gwamile+VOCTIM+Matsapha',
      headline: 'Skills for Industry',
      introduction: 'Gwamile VOCTIM provides high-quality technical and vocational training to meet the needs of the Eswatini industry.',
      departments: [{ name: 'Admissions', phone: '+268 2518 6361', email: 'admissions@voctim.ac.sz' }],
      faqs: [{ question: 'What courses do you offer?', answer: 'We offer courses in Engineering, Building, and Business Studies.' }]
    },
    reviews: [],
    sections: {
      homepage: { heroBanner: 'https://picsum.photos/seed/gvhero/1600/600', welcomeMessage: 'Welcome to Gwamile VOCTIM.', principalMessage: { text: 'Empowering through skills.', name: 'Principal' }, quickLinks: [], announcements: [] },
      about: {
        overview: 'Gwamile VOCTIM is a leading vocational training institute in Matsapha.',
        foundingBackground: 'Established in 1987.',
        history: { foundingStory: { yearEstablished: 1987, founders: ['Government/Industry'], originalPurpose: 'Skilled labor development.', initialStudentPopulation: '100 Students', firstCampusLocation: 'Matsapha' }, milestones: [], growthSummary: 'Key vocational trainer.', transformationNarrative: { adaptationToChange: '', technologicalUpgrades: '', communityImpact: '', alumniInfluence: '' } },
        vision: { headline: 'A center of excellence in vocational training', supportingParagraph: '', explanation: '' },
        mission: { statement: 'To provide relevant technical skills.' },
        coreValues: [],
        leadership: { principal: { name: 'Principal', title: 'Principal' }, seniorTeam: [] },
        accreditation: { registeredWith: 'MoET', registrationNumber: '', examinationBody: 'DTE', affiliations: [], awards: [] },
        statistics: { totalStudents: 800, totalStaff: 60, studentTeacherRatio: '1:13', yearsOfOperation: 36, graduationRate: '85%' },
        facilities: { overview: '', list: ['Workshops', 'Computer Labs', 'Library', 'Hostels'] },
        community: { outreach: '', partnerships: '', socialResponsibility: '' },
        downloads: [],
        testimonials: []
      },
      admissions: { headline: 'Apply to VOCTIM', introduction: 'Applications open for January intake.', programs: [], requirements: { academic: [], documents: [], additional: [] }, processSteps: [], applicationFee: { amount: 'SZL 100', methods: [] }, processingTime: '', importantDates: [], tuitionFees: { perTerm: '', perYear: '', additional: [] }, scholarships: { types: [], eligibility: '', howToApply: '' }, faqs: [], contact: { name: '', phone: '', email: '', hours: '' }, allowOnlineApplications: false },
      academics: { 
        overview: { headline: '', introduction: '' }, 
        curriculum: { structure: '', examinationBody: '', description: '' }, 
        departments: [], 
        calendar: { startDate: '', terms: [], examPeriods: '', holidays: '' }, 
        assessment: { approach: '', gradingSystem: '' }, 
        support: { services: [], description: '' }, 
        staff: { head: { name: '', qualifications: '', experience: '' }, totalCount: 0, avgExperience: '', certifications: [] },
        performance: { passRate: '85%', ranking: '', distinctions: '', awards: [] },
        programs: [
          { id: 'prog-voctim-1', name: 'Electrical Engineering', qualification: 'Diploma', duration: '3 Years', subjects: ['Electrical Theory', 'Practical Wiring', 'Industrial Electronics'], requirements: 'Credit in SGCSE Science.', description: 'Technical training for electrical trades.', syllabusUrl: 'https://www.voctim.ac.sz/courses/electrical-engineering-syllabus.pdf' }
        ],
        facilities: { description: '', list: [] },
        elearning: { enabled: false, platform: '', onlineClassOptions: '', digitalAssignments: '', recordedLectures: '' },
        studentPortal: { enabled: false, url: '', features: { learningMaterials: false, assignmentSubmission: false, resultsDisplay: false } },
        partnerships: { internships: '', collaborations: '' }
      },
      news: { overview: { title: '', description: '' }, posts: [], events: [], gallery: [], newsletterCta: '' },
      studentLife: { overview: { headline: '', introduction: '' }, sports: { list: [], facilities: [], description: '' }, clubs: [], arts: { activities: [], description: '' }, leadership: { opportunities: [], roles: '' }, facilities: [], support: { services: [], description: '' }, activities: { list: [], description: '' }, community: { programs: [], description: '' } },
      portal: { 
        enabled: true, 
        name: 'VOCTIM Student Portal', 
        headline: 'Technical Training Management System', 
        description: 'Digital tools for technical excellence.', 
        url: '', 
        loginRequirements: ['Enrollment Number'], 
        rolesSupported: ['STUDENT', 'INSTRUCTOR'], 
        accountCreationProcess: 'Self-service registration following enrollment confirmation.', 
        features: { 
          dashboard: { list: ['Course Enrollment'], description: '' }, 
          learning: { list: ['Workshop Manuals'], description: '' }, 
          assessments: { list: ['Practical Assessments'], description: '' }, 
          records: { list: ['Certifications'], accessLevel: 'Public/Private' }, 
          scheduling: { list: ['Workshop Rotation'], description: '' }, 
          collaboration: ['Project Groups'] 
        }, 
        tools: { list: ['AutoCAD Viewer'], platforms: ['Desktop'] }, 
        mobileAccess: { list: [], devices: [] }, 
        security: ['Industry Standard Encryption'], 
        support: { email: 'support@voctim.ac.sz', phone: '+268 2518 6361', hours: '08:00 - 16:45', resources: [] }, 
        usageGuidelines: { policy: 'Computer Lab Policy', rules: '', expectations: '' } 
      }
    },
    stats: { views: 5000, applications: 150, engagementRate: 6 }
  },
  {
    id: 'inst-9',
    name: 'Good Shepherd High School',
    slug: 'good-shepherd-high',
    logo: 'https://picsum.photos/seed/goodshepherd/200/200',
    coverImage: 'https://picsum.photos/seed/gshero/1200/400',
    region: Region.LUBOMBO,
    type: [InstitutionType.HIGH_SCHOOL, InstitutionType.PRIVATE],
    isVerified: true,
    isAccredited: true,
    moetRegistration: 'MoET/LU/002-GS',
    isFeatured: false,
    isSpotlight: false,
    seoScore: 72,
    trustScore: 82,
    plan: SubscriptionPlan.FREE,
    status: 'published',
    adminId: 'user-1',
    createdAt: '2023-04-10T00:00:00Z',
    seo: { title: 'Good Shepherd High - Siteki', description: 'A prominent Catholic high school in Siteki.', keywords: ['High School', 'Siteki', 'Lubombo'], healthScore: 68 },
    theme: { primaryColor: '#b91c1c', fontFamily: 'Inter', borderRadius: 'md', layout: 'classic' },
    metadata: { gender: GenderType.MIXED, isBoarding: true, feeRange: { min: 7000, max: 14000 }, establishedYear: 1965, studentCount: 550, hasStudentPortal: false },
    contact: {
      address: 'Siteki, Eswatini',
      phone: '+268 2343 4111',
      email: 'info@goodshepherd.ac.sz',
      website: 'www.goodshepherd.ac.sz',
      officeHours: 'Mon - Fri: 08:00 - 16:00',
      googleMapsUrl: 'https://maps.google.com/?q=Good+Shepherd+High+School+Siteki',
      headline: 'Guided by Faith',
      introduction: 'Good Shepherd High School is a Catholic institution in Siteki, providing quality education in a supportive environment.',
      departments: [{ name: 'Admissions', phone: '+268 2343 4111', email: 'admissions@goodshepherd.ac.sz' }],
      faqs: [{ question: 'Do you have boarding?', answer: 'Yes, we offer boarding for both boys and girls.' }]
    },
    reviews: [],
    sections: {
      homepage: { heroBanner: 'https://picsum.photos/seed/gshero/1600/600', welcomeMessage: 'Welcome to Good Shepherd High School.', principalMessage: { text: 'Excellence through faith.', name: 'Principal' }, quickLinks: [], announcements: [] },
      about: {
        overview: 'Good Shepherd High School is a Catholic school in Siteki.',
        foundingBackground: 'Established in 1965.',
        history: { foundingStory: { yearEstablished: 1965, founders: ['Catholic Mission'], originalPurpose: 'Secondary education.', initialStudentPopulation: '100 Students', firstCampusLocation: 'Siteki' }, milestones: [], growthSummary: 'Steady development.', transformationNarrative: { adaptationToChange: '', technologicalUpgrades: '', communityImpact: '', alumniInfluence: '' } },
        vision: { headline: 'Academic success and spiritual growth', supportingParagraph: '', explanation: '' },
        mission: { statement: 'To provide quality education.' },
        coreValues: [],
        leadership: { principal: { name: 'Principal', title: 'Principal' }, seniorTeam: [] },
        accreditation: { registeredWith: 'MoET', registrationNumber: '', examinationBody: 'SGCSE', affiliations: [], awards: [] },
        statistics: { totalStudents: 550, totalStaff: 35, studentTeacherRatio: '1:16', yearsOfOperation: 58, graduationRate: '92%' },
        facilities: { overview: '', list: ['Science Lab', 'Library', 'Boarding House', 'Sports Field'] },
        community: { outreach: '', partnerships: '', socialResponsibility: '' },
        downloads: [],
        testimonials: []
      },
      admissions: { headline: 'Join Good Shepherd', introduction: 'Admissions open for all forms.', programs: [], requirements: { academic: [], documents: [], additional: [] }, processSteps: [], applicationFee: { amount: 'SZL 100', methods: [] }, processingTime: '', importantDates: [], tuitionFees: { perTerm: '', perYear: '', additional: [] }, scholarships: { types: [], eligibility: '', howToApply: '' }, faqs: [], contact: { name: '', phone: '', email: '', hours: '' }, allowOnlineApplications: false },
      academics: { 
        overview: { headline: '', introduction: '' }, 
        curriculum: { structure: '', examinationBody: '', description: '' }, 
        departments: [], 
        calendar: { startDate: '', terms: [], examPeriods: '', holidays: '' }, 
        assessment: { approach: '', gradingSystem: '' }, 
        support: { services: [], description: '' }, 
        staff: { head: { name: '', qualifications: '', experience: '' }, totalCount: 0, avgExperience: '', certifications: [] },
        performance: { passRate: '92%', ranking: '', distinctions: '', awards: [] },
        programs: [
          { id: 'prog-gs-1', name: 'Agric & Biology Stream', qualification: 'SGCSE', duration: '2 Years', subjects: ['Agriculture', 'Biology', 'English', 'Maths'], requirements: 'Pass in JC Science.', description: 'Integrating agriculture with core sciences.', syllabusUrl: '#' }
        ],
        facilities: { description: '', list: [] },
        elearning: { enabled: false, platform: '', onlineClassOptions: '', digitalAssignments: '', recordedLectures: '' },
        partnerships: { internships: '', collaborations: '' }
      },
      news: { overview: { title: '', description: '' }, posts: [], events: [], gallery: [], newsletterCta: '' },
      studentLife: { overview: { headline: '', introduction: '' }, sports: { list: [], facilities: [], description: '' }, clubs: [], arts: { activities: [], description: '' }, leadership: { opportunities: [], roles: '' }, facilities: [], support: { services: [], description: '' }, activities: { list: [], description: '' }, community: { programs: [], description: '' } },
      portal: { 
        enabled: true, 
        name: 'Good Shepherd Portal', 
        headline: 'Faith & Learning Hub', 
        description: 'Guided by faith to academic excellence.', 
        url: '', 
        loginRequirements: ['Student ID'], 
        rolesSupported: ['STUDENT', 'PARENT'], 
        accountCreationProcess: 'Accounts assigned during orientation.', 
        features: { 
          dashboard: { list: ['Announcements'], description: '' }, 
          learning: { list: ['Class Resources'], description: '' }, 
          assessments: { list: ['Term Reports'], description: '' }, 
          records: { list: ['Religious Education Progress'], accessLevel: 'Student' }, 
          scheduling: { list: ['Term Calendar'], description: '' }, 
          collaboration: [] 
        }, 
        tools: { list: [], platforms: [] }, 
        mobileAccess: { list: [], devices: [] }, 
        security: [], 
        support: { email: 'admin@goodshepherd.ac.sz', phone: '+268 2343 4111', hours: '08:00 - 16:00', resources: [] }, 
        usageGuidelines: { policy: '', rules: '', expectations: '' } 
      }
    },
    stats: { views: 4000, applications: 120, engagementRate: 5 }
  },
  {
    id: 'inst-10',
    name: "Ngwane Teacher's Training College",
    slug: 'ngwane-teachers-college',
    logo: 'https://picsum.photos/seed/ngwane/200/200',
    coverImage: 'https://picsum.photos/seed/ngwanecover/1200/400',
    region: Region.SHISELWENI,
    type: [InstitutionType.TERTIARY, InstitutionType.PUBLIC],
    isVerified: true,
    isAccredited: true,
    moetRegistration: 'MoET/SH/002-NT',
    isFeatured: true,
    isSpotlight: false,
    seoScore: 75,
    trustScore: 85,
    plan: SubscriptionPlan.FREE,
    status: 'published',
    adminId: 'user-1',
    createdAt: '2023-05-01T00:00:00Z',
    seo: { title: 'Ngwane Teacher\'s College - Nhlangano', description: 'Premier teacher training college in Eswatini.', keywords: ['Teacher Training', 'College', 'Nhlangano'], healthScore: 72 },
    theme: { primaryColor: '#15803d', fontFamily: 'Inter', borderRadius: 'md', layout: 'classic' },
    metadata: { gender: GenderType.MIXED, isBoarding: true, feeRange: { min: 12000, max: 25000 }, establishedYear: 1982, studentCount: 1200, hasStudentPortal: true },
    contact: {
      address: 'Nhlangano, Eswatini',
      phone: '+268 2207 8466',
      email: 'info@ngwane.ac.sz',
      website: 'www.ngwane.ac.sz',
      officeHours: 'Mon - Fri: 08:00 - 16:45',
      googleMapsUrl: 'https://maps.google.com/?q=Ngwane+Teachers+Training+College+Nhlangano',
      headline: 'Educating the Educators',
      introduction: 'Ngwane Teacher\'s Training College is dedicated to producing high-quality teachers for Eswatini\'s primary schools.',
      departments: [{ name: 'Admissions', phone: '+268 2207 8466', email: 'admissions@ngwane.ac.sz' }],
      faqs: [{ question: 'What programs do you offer?', answer: 'We offer a Diploma in Primary Education.' }]
    },
    reviews: [],
    sections: {
      homepage: { heroBanner: 'https://picsum.photos/seed/nthero/1600/600', welcomeMessage: 'Welcome to Ngwane Teacher\'s Training College.', principalMessage: { text: 'Shaping the future of education.', name: 'Principal' }, quickLinks: [], announcements: [] },
      about: {
        overview: 'Ngwane Teacher\'s Training College is a premier teacher training institution in Nhlangano.',
        foundingBackground: 'Established in 1982.',
        history: { foundingStory: { yearEstablished: 1982, founders: ['Government'], originalPurpose: 'Teacher training.', initialStudentPopulation: '200 Students', firstCampusLocation: 'Nhlangano' }, milestones: [], growthSummary: 'Core teacher educator.', transformationNarrative: { adaptationToChange: '', technologicalUpgrades: '', communityImpact: '', alumniInfluence: '' } },
        vision: { headline: 'Excellence in teacher education', supportingParagraph: '', explanation: '' },
        mission: { statement: 'To produce competent primary school teachers.' },
        coreValues: [],
        leadership: { principal: { name: 'Principal', title: 'Principal' }, seniorTeam: [] },
        accreditation: { registeredWith: 'MoET', registrationNumber: '', examinationBody: 'UNESWA', affiliations: [], awards: [] },
        statistics: { totalStudents: 1200, totalStaff: 80, studentTeacherRatio: '1:15', yearsOfOperation: 41, graduationRate: '95%' },
        facilities: { overview: '', list: ['Lecture Halls', 'Library', 'Computer Lab', 'Hostels'] },
        community: { outreach: '', partnerships: '', socialResponsibility: '' },
        downloads: [],
        testimonials: []
      },
      admissions: { headline: 'Apply to Ngwane', introduction: 'Applications open for the Diploma in Primary Education.', programs: [], requirements: { academic: [], documents: [], additional: [] }, processSteps: [], applicationFee: { amount: 'SZL 250', methods: [] }, processingTime: '', importantDates: [], tuitionFees: { perTerm: '', perYear: '', additional: [] }, scholarships: { types: [], eligibility: '', howToApply: '' }, faqs: [], contact: { name: '', phone: '', email: '', hours: '' }, allowOnlineApplications: false },
      academics: { 
        overview: { headline: '', introduction: '' }, 
        curriculum: { structure: '', examinationBody: '', description: '' }, 
        departments: [], 
        calendar: { startDate: '', terms: [], examPeriods: '', holidays: '' }, 
        assessment: { approach: '', gradingSystem: '' }, 
        support: { services: [], description: '' }, 
        staff: { head: { name: '', qualifications: '', experience: '' }, totalCount: 0, avgExperience: '', certifications: [] },
        performance: { passRate: '95%', ranking: '', distinctions: '', awards: [] },
        programs: [
          { id: 'prog-nt-1', name: 'Diploma in Primary Education', qualification: 'Diploma', duration: '3 Years', subjects: ['Professional Studies', 'Subject Content', 'Teaching Practice'], requirements: 'Credits in SGCSE English.', description: 'Comprehensive teacher development.', syllabusUrl: '#' }
        ],
        facilities: { description: '', list: [] },
        elearning: { enabled: false, platform: '', onlineClassOptions: '', digitalAssignments: '', recordedLectures: '' },
        partnerships: { internships: '', collaborations: '' }
      },
      news: { overview: { title: '', description: '' }, posts: [], events: [], gallery: [], newsletterCta: '' },
      studentLife: { overview: { headline: '', introduction: '' }, sports: { list: [], facilities: [], description: '' }, clubs: [], arts: { activities: [], description: '' }, leadership: { opportunities: [], roles: '' }, facilities: [], support: { services: [], description: '' }, activities: { list: [], description: '' }, community: { programs: [], description: '' } },
      portal: { 
        enabled: true, 
        name: 'Ngwane College Portal', 
        headline: 'Educator Development System', 
        description: 'Empowering future teachers through technology.', 
        url: '', 
        loginRequirements: ['College ID', 'Password'], 
        rolesSupported: ['STUDENT', 'LECTURER'], 
        accountCreationProcess: 'Registration through the Registrar office.', 
        features: { 
          dashboard: { list: ['Teaching Practice Status'], description: '' }, 
          learning: { list: ['Course Modules', 'Research Library'], description: '' }, 
          assessments: { list: ['Continuous Assessment Results'], description: '' }, 
          records: { list: ['Professional Development Record'], accessLevel: 'Restricted' }, 
          scheduling: { list: ['Lecture/Exam Timetable'], description: '' }, 
          collaboration: ['Research Groups'] 
        }, 
        tools: { list: ['Learning Management System'], platforms: ['Web', 'Mobile'] }, 
        mobileAccess: { list: ['Ngwane App'], devices: ['Android'] }, 
        security: ['Two-Step Verification'], 
        support: { email: 'it@ngwane.ac.sz', phone: '+268 2207 8466', hours: '08:00 - 16:45', resources: [] }, 
        usageGuidelines: { policy: 'Academic Integrity Policy', rules: '', expectations: '' } 
      }
    },
    stats: { views: 6000, applications: 300, engagementRate: 8 }
  },
  {
    id: 'inst-11',
    name: "Entonjeni High School",
    slug: 'entonjeni-high',
    subdomain: 'entonjeni',
    logo: 'https://picsum.photos/seed/entonjeni/200/200',
    coverImage: imgHighSchool,
    region: Region.HHOHHO,
    type: [InstitutionType.HIGH_SCHOOL, InstitutionType.PUBLIC],
    isVerified: true,
    isAccredited: true,
    moetRegistration: 'MoET/HHO/224-EJ',
    isFeatured: false,
    isSpotlight: false,
    seoScore: 78,
    trustScore: 84,
    plan: SubscriptionPlan.FREE,
    status: 'published',
    adminId: 'user-1',
    createdAt: '2024-01-15T00:00:00Z',
    seo: { title: "Entonjeni High School - Pigg's Peak", description: "A government-aided community high school serving peri-urban settlements around Piggs Peak.", keywords: ['Entonjeni', 'Pigg\'s Peak', 'High School'], healthScore: 82 },
    theme: { primaryColor: '#2563eb', fontFamily: 'Inter', borderRadius: 'md', layout: 'classic' },
    metadata: { gender: GenderType.MIXED, isBoarding: false, feeRange: { min: 4000, max: 7000 }, establishedYear: 1993, studentCount: 450, hasStudentPortal: false },
    contact: {
      address: 'P.O. Box 34, Piggs Peak, Eswatini',
      latitude: -25.927778,
      longitude: 31.2375,
      phone: '+268 2437 1122',
      email: 'info@entonjenihigh.ac.sz',
      website: 'www.entonjeni-high.ac.sz',
      officeHours: 'Mon - Fri: 08:00 - 16:30',
      googleMapsUrl: 'https://maps.google.com/?q=Entonjeni+High+School+Piggs+Peak',
      headline: 'Nurturing Our Community',
      introduction: 'A government-aided community high school serving peri-urban settlements around Piggs Peak.',
      departments: [{ name: 'Admissions Desk', phone: '+268 2437 1122', email: 'admissions@entonjenihigh.ac.sz' }],
      faqs: [{ question: 'What curriculum do you run?', answer: 'We offer JC and EGCSE under the Examinations Council of Eswatini (ECESWA).' }]
    },
    reviews: [],
    sections: {
      homepage: { heroBanner: 'https://picsum.photos/seed/entonjenihero/1200/400', welcomeMessage: 'Welcome to Entonjeni High School.', principalMessage: { text: 'Welcome to our community, built on effort, determination, and success.', name: 'Principal' }, quickLinks: [], announcements: [] },
      about: {
        overview: 'A government-aided community high school serving peri-urban settlements around Piggs Peak.',
        foundingBackground: 'Established in 1993 to address secondary educational requirements in the peri-urban Piggs Peak area.',
        history: { foundingStory: { yearEstablished: 1993, founders: ['Community Council'], originalPurpose: 'Education access', initialStudentPopulation: '60 Pupils', firstCampusLocation: 'Piggs Peak' }, milestones: [], growthSummary: 'Steadily expanded to cater to more community learners.', transformationNarrative: { adaptationToChange: '', technologicalUpgrades: '', communityImpact: '', alumniInfluence: '' } },
        vision: { headline: 'To be a beacon of quality education and development for the local community.', supportingParagraph: '' },
        mission: { statement: 'To provide high-quality and inclusive education that empowers community learners.' },
        coreValues: [],
        leadership: { principal: { name: 'Principal', title: 'Principal' }, seniorTeam: [] },
        accreditation: { registeredWith: 'MoET', registrationNumber: 'MoET/HHO/224-EJ', examinationBody: 'ECESWA', affiliations: [], awards: [] },
        statistics: { totalStudents: 450, totalStaff: 28, studentTeacherRatio: '1:16', yearsOfOperation: 33, graduationRate: '92%' },
        facilities: { overview: '', list: ['Classrooms', 'Science Laboratory', 'Sports Field', 'Computer Room'] },
        community: { outreach: '', partnerships: '', socialResponsibility: '' },
        downloads: [],
        testimonials: []
      },
      admissions: { headline: 'Admissions & Requirements', introduction: 'Standard Eswatini Primary Certificate (SPC) pass; prioritization given to local primary school applicants.', programs: [], requirements: { academic: ['Standard Eswatini Primary Certificate (SPC) pass'], documents: ['SPC Certificate / Original Results Slip', 'Birth Certificate', 'Primary School Leaving Report'], additional: [] }, processSteps: [{ step: 'Application', instruction: 'Submit report and certificates to the admin office.' }], applicationFee: { amount: 'SZL 100', methods: [] }, processingTime: '2 weeks', importantDates: [], tuitionFees: { perTerm: 'SZL 1,800', perYear: 'SZL 5,400', additional: [] }, scholarships: { types: [], eligibility: '', howToApply: '' }, faqs: [], contact: { name: '', phone: '', email: '', hours: '' }, allowOnlineApplications: false },
      academics: {
        overview: { headline: 'Curriculum & Courses', introduction: 'A government-aided community high school serving peri-urban settlements around Piggs Peak.' },
        curriculum: { structure: 'Examinations Council of Eswatini (ECESWA) – JC and EGCSE.', examinationBody: 'ECESWA', description: 'JC and EGCSE paths.' },
        departments: [],
        calendar: { startDate: '', terms: [], examPeriods: '', holidays: '' },
        assessment: { approach: '', gradingSystem: '' },
        support: { services: [], description: '' },
        staff: { head: { name: '', qualifications: '', experience: '' }, totalCount: 0, avgExperience: '', certifications: [] },
        performance: { passRate: '92%', ranking: '', distinctions: '', awards: [] },
        programs: [
          { id: 'prog-ej-1', name: 'Junior Certificate (JC)', qualification: 'Junior Certificate', duration: '3 Years', subjects: ['English', 'SiSwati', 'Mathematics', 'Science', 'Social Studies'], requirements: 'SPC pass.', description: 'Core secondary foundation curriculum.', syllabusUrl: '#' },
          { id: 'prog-ej-2', name: 'EGCSE Certificate', qualification: 'EGCSE Certificate', duration: '2 Years', subjects: ['English Language', 'Mathematics', 'Physical Science', 'Biology', 'Geography'], requirements: 'JC pass.', description: 'Eswatini General Certificate of Secondary Education.', syllabusUrl: '#' }
        ],
        facilities: { description: '', list: [] },
        elearning: { enabled: false, platform: '', onlineClassOptions: '', digitalAssignments: '', recordedLectures: '' },
        partnerships: { internships: '', collaborations: '' }
      },
      news: { overview: { title: '', description: '' }, posts: [], events: [], gallery: [], newsletterCta: '' },
      studentLife: { overview: { headline: '', introduction: '' }, sports: { list: ['Football', 'Netball', 'Athletics'], facilities: [], description: '' }, clubs: [], arts: { activities: [], description: '' }, leadership: { opportunities: [], roles: '' }, facilities: [], support: { services: [], description: '' }, activities: { list: [], description: '' }, community: { programs: [], description: '' } },
      portal: { enabled: false, name: 'Portal', headline: 'Portal Link', description: '', url: '', loginRequirements: [], rolesSupported: [], accountCreationProcess: '', features: { dashboard: { list: [], description: '' }, learning: { list: [], description: '' }, assessments: { list: [], description: '' }, records: { list: [], accessLevel: 'Student' }, scheduling: { list: [], description: '' }, collaboration: [] }, tools: { list: [], platforms: [] }, mobileAccess: { list: [], devices: [] }, security: [], support: { email: '', phone: '', hours: '', resources: [] }, usageGuidelines: { policy: '', rules: '', expectations: '' } }
    },
    stats: { views: 1200, applications: 45, engagementRate: 4 }
  },
  {
    id: 'inst-12',
    name: "Usutu Mission High School",
    slug: 'usutu-mission-high',
    subdomain: 'usutuschool',
    logo: 'https://picsum.photos/seed/usutu/200/200',
    coverImage: imgHighSchool,
    region: Region.HHOHHO,
    type: [InstitutionType.HIGH_SCHOOL, InstitutionType.PUBLIC],
    isVerified: true,
    isAccredited: true,
    moetRegistration: 'MoET/HHO/438-UM',
    isFeatured: false,
    isSpotlight: false,
    seoScore: 80,
    trustScore: 86,
    plan: SubscriptionPlan.FREE,
    status: 'published',
    adminId: 'user-1',
    createdAt: '2024-01-20T00:00:00Z',
    seo: { title: "Usutu Mission High School - Bhunya", description: "A long-standing mission school serving the industrial and forestry community near the Bhunya corridor.", keywords: ['Usutu Mission', 'Bhunya', 'High School'], healthScore: 84 },
    theme: { primaryColor: '#16a34a', fontFamily: 'Inter', borderRadius: 'md', layout: 'classic' },
    metadata: { gender: GenderType.MIXED, isBoarding: true, feeRange: { min: 5000, max: 9000 }, establishedYear: 1968, studentCount: 520, hasStudentPortal: false },
    contact: {
      address: 'Centre 438 / P.O. Box 12, Bhunya, Eswatini',
      latitude: -26.478333,
      longitude: 31.021667,
      phone: '+268 2452 3011',
      email: 'usutumission@realnet.co.sz',
      website: 'www.usutumission.ac.sz',
      officeHours: 'Mon - Fri: 08:00 - 16:30',
      googleMapsUrl: 'https://maps.google.com/?q=Usutu+Mission+High+School+Bhunya',
      headline: 'Faith, Service, and Knowledge',
      introduction: 'A long-standing mission school serving the industrial and forestry community near the Bhunya corridor.',
      departments: [{ name: 'Admissions Dept', phone: '+268 2452 3011', email: 'admissions@usutumission.ac.sz' }],
      faqs: [{ question: 'Do you offer boarding facilities?', answer: 'Yes, we have comfortable and secure residential hostels for both boys and girls.' }]
    },
    reviews: [],
    sections: {
      homepage: { heroBanner: 'https://picsum.photos/seed/usutuhero/1200/400', welcomeMessage: 'Welcome to Usutu Mission High School.', principalMessage: { text: 'Serving the forest and industrial hub of Bhunya with quality learning.', name: 'Principal' }, quickLinks: [], announcements: [] },
      about: {
        overview: 'A long-standing mission school serving the industrial and forestry community near the Bhunya corridor.',
        foundingBackground: 'Established in 1968 by missionaries to provide outstanding academic guidance to families in the Bhunya timber and industrial zone.',
        history: { foundingStory: { yearEstablished: 1968, founders: ['Missionary Fathers'], originalPurpose: 'Education for industrial workers.', initialStudentPopulation: '80 Students', firstCampusLocation: 'Bhunya' }, milestones: [], growthSummary: 'Consolidated history of academic excellence and spiritual development.', transformationNarrative: { adaptationToChange: '', technologicalUpgrades: '', communityImpact: '', alumniInfluence: '' } },
        vision: { headline: 'Nurturing holistic development under core Christian values.', supportingParagraph: '' },
        mission: { statement: 'To produce well-rounded citizens equipped to serve both community and country.' },
        coreValues: [],
        leadership: { principal: { name: 'Principal', title: 'Principal' }, seniorTeam: [] },
        accreditation: { registeredWith: 'MoET', registrationNumber: 'MoET/HHO/438-UM', examinationBody: 'ECESWA', affiliations: [], awards: [] },
        statistics: { totalStudents: 520, totalStaff: 32, studentTeacherRatio: '1:16', yearsOfOperation: 58, graduationRate: '94%' },
        facilities: { overview: '', list: ['Hostels', 'Dining Hall', 'Assembly Hall', 'Science Lab', 'Library'] },
        community: { outreach: '', partnerships: '', socialResponsibility: '' },
        downloads: [],
        testimonials: []
      },
      admissions: { headline: 'Admissions & Requirements', introduction: 'Satisfactory completion of primary school with a verified SPC certificate; interview may be required.', programs: [], requirements: { academic: ['Satisfactory completion of primary school with SPC Certificate'], documents: ['Verified SPC Certificate', 'Character reference letter', 'Birth Certificate'], additional: ['An entrance interview may be required'] }, processSteps: [{ step: 'Submission', instruction: 'Submit report and certificates to the administrative office.' }], applicationFee: { amount: 'SZL 150', methods: [] }, processingTime: '3 weeks', importantDates: [], tuitionFees: { perTerm: 'SZL 2,500', perYear: 'SZL 7,500', additional: [] }, scholarships: { types: [], eligibility: '', howToApply: '' }, faqs: [], contact: { name: '', phone: '', email: '', hours: '' }, allowOnlineApplications: false },
      academics: {
        overview: { headline: 'Curriculum & Courses', introduction: 'A long-standing mission school serving the industrial and forestry community near the Bhunya corridor.' },
        curriculum: { structure: 'EGCSE curriculum.', examinationBody: 'ECESWA', description: 'EGCSE pathways.' },
        departments: [],
        calendar: { startDate: '', terms: [], examPeriods: '', holidays: '' },
        assessment: { approach: '', gradingSystem: '' },
        support: { services: [], description: '' },
        staff: { head: { name: '', qualifications: '', experience: '' }, totalCount: 0, avgExperience: '', certifications: [] },
        performance: { passRate: '94%', ranking: '', distinctions: '', awards: [] },
        programs: [
          { id: 'prog-um-1', name: 'EGCSE Secondary Certification', qualification: 'EGCSE Certificate', duration: '2 Years', subjects: ['Mathematics', 'English Language', 'Physical Science', 'Geography', 'SiSwati'], requirements: 'JC pass.', description: 'standard secondary certification.', syllabusUrl: '#' }
        ],
        facilities: { description: '', list: [] },
        elearning: { enabled: false, platform: '', onlineClassOptions: '', digitalAssignments: '', recordedLectures: '' },
        partnerships: { internships: '', collaborations: '' }
      },
      news: { overview: { title: '', description: '' }, posts: [], events: [], gallery: [], newsletterCta: '' },
      studentLife: { overview: { headline: '', introduction: '' }, sports: { list: ['Football', 'Volleyball', 'Netball'], facilities: [], description: '' }, clubs: [], arts: { activities: [], description: '' }, leadership: { opportunities: [], roles: '' }, facilities: [], support: { services: [], description: '' }, activities: { list: [], description: '' }, community: { programs: [], description: '' }, accommodation: { available: true, type: 'Boarding', description: 'Secured on-campus mission hostels.', facilities: ['Bedrooms', 'Lounge', 'Study area'] } },
      portal: { enabled: false, name: 'Portal', headline: 'Portal Link', description: '', url: '', loginRequirements: [], rolesSupported: [], accountCreationProcess: '', features: { dashboard: { list: [], description: '' }, learning: { list: [], description: '' }, assessments: { list: [], description: '' }, records: { list: [], accessLevel: 'Student' }, scheduling: { list: [], description: '' }, collaboration: [] }, tools: { list: [], platforms: [] }, mobileAccess: { list: [], devices: [] }, security: [], support: { email: '', phone: '', hours: '', resources: [] }, usageGuidelines: { policy: '', rules: '', expectations: '' } }
    },
    stats: { views: 1500, applications: 85, engagementRate: 6 }
  },
  {
    id: 'inst-13',
    name: "Ndzingeni Nazarene High School",
    slug: 'ndzingeni-nazarene-high',
    subdomain: 'ndzingeni',
    logo: 'https://picsum.photos/seed/ndzingeni/200/200',
    coverImage: imgHighSchool,
    region: Region.HHOHHO,
    type: [InstitutionType.HIGH_SCHOOL, InstitutionType.PUBLIC],
    isVerified: true,
    isAccredited: true,
    moetRegistration: 'MoET/HHO/088-NN',
    isFeatured: false,
    isSpotlight: false,
    seoScore: 82,
    trustScore: 88,
    plan: SubscriptionPlan.FREE,
    status: 'published',
    adminId: 'user-1',
    createdAt: '2024-01-22T00:00:00Z',
    seo: { title: "Ndzingeni Nazarene High School - Piggs Peak", description: "Church of the Nazarene mission school known for strong academic discipline and community development programs in northern Hhohho.", keywords: ['Ndzingeni', 'Nazarene', 'Piggs Peak', 'High School'], healthScore: 86 },
    theme: { primaryColor: '#1d4ed8', fontFamily: 'Inter', borderRadius: 'md', layout: 'classic' },
    metadata: { gender: GenderType.MIXED, isBoarding: true, feeRange: { min: 4800, max: 8000 }, establishedYear: 1974, studentCount: 560, hasStudentPortal: false },
    contact: {
      address: 'P.O. Box 88, Piggs Peak, Eswatini',
      latitude: -25.986111,
      longitude: 31.168056,
      phone: '+268 2437 3251',
      email: 'ndzingeni@realnet.co.sz',
      website: 'www.ndzingeninazarene.ac.sz',
      officeHours: 'Mon - Fri: 08:00 - 16:30',
      googleMapsUrl: 'https://maps.google.com/?q=Ndzingeni+Nazarene+High+School+Piggs+Peak',
      headline: 'Character and Academic Distinction',
      introduction: 'Church of the Nazarene mission school known for strong academic discipline and community development programs in northern Hhohho.',
      departments: [{ name: 'Admissions Desk', phone: '+268 2437 3251', email: 'admissions@ndzingeni.ac.sz' }],
      faqs: [{ question: 'What values are emphasized?', answer: 'We emphasize strong Christian values, ethical discipline, and active community development.' }]
    },
    reviews: [],
    sections: {
      homepage: { heroBanner: 'https://picsum.photos/seed/ndzingenihero/1200/400', welcomeMessage: 'Welcome to Ndzingeni Nazarene High School.', principalMessage: { text: 'Striving for intellectual and spiritual height in northern Hhohho.', name: 'Principal' }, quickLinks: [], announcements: [] },
      about: {
        overview: 'Church of the Nazarene mission school known for strong academic discipline and community development programs in northern Hhohho.',
        foundingBackground: 'Established in 1974 by the Church of the Nazarene to foster academic progress alongside holistic Christian value development.',
        history: { foundingStory: { yearEstablished: 1974, founders: ['Nazarene Missionaries'], originalPurpose: 'Education and spiritual guidance for Northern Hhohho.', initialStudentPopulation: '100 Students', firstCampusLocation: 'Ndzingeni' }, milestones: [], growthSummary: 'Grown into a reputable regional high school famous for its discipline markers.', transformationNarrative: { adaptationToChange: '', technologicalUpgrades: '', communityImpact: '', alumniInfluence: '' } },
        vision: { headline: 'To nurture diligent, ethical, and highly accomplished leaders.', supportingParagraph: '' },
        mission: { statement: 'To provide high-quality secondary education based on discipline, development, and Nazarene guidelines.' },
        coreValues: [],
        leadership: { principal: { name: 'Principal', title: 'Principal' }, seniorTeam: [] },
        accreditation: { registeredWith: 'MoET', registrationNumber: 'MoET/HHO/088-NN', examinationBody: 'ECESWA', affiliations: [], awards: [] },
        statistics: { totalStudents: 560, totalStaff: 36, studentTeacherRatio: '1:15', yearsOfOperation: 52, graduationRate: '95%' },
        facilities: { overview: '', list: ['Hostels', 'Dining facility', 'Agricultural plots', 'Science Laboratories', 'Library'] },
        community: { outreach: '', partnerships: '', socialResponsibility: '' },
        downloads: [],
        testimonials: []
      },
      admissions: { headline: 'Admissions & Requirements', introduction: 'Merit-based screening of SPC results; open day performance evaluation for external transfer students.', programs: [], requirements: { academic: ['SPC Merit or first-class result preferred', 'Good academic standing'], documents: ['SPC original results slip', 'Character recommendation', 'Birth Certificate'], additional: ['Open Day Performance Assessment for external transfers'] }, processSteps: [{ step: 'Academic Screening', instruction: 'Submit SPC results for merit-based screening.' }], applicationFee: { amount: 'SZL 120', methods: [] }, processingTime: '2 weeks', importantDates: [], tuitionFees: { perTerm: 'SZL 2,300', perYear: 'SZL 6,900', additional: [] }, scholarships: { types: [], eligibility: '', howToApply: '' }, faqs: [], contact: { name: '', phone: '', email: '', hours: '' }, allowOnlineApplications: false },
      academics: {
        overview: { headline: 'Curriculum & Courses', introduction: 'Church of the Nazarene mission school known for strong academic discipline and community development programs in northern Hhohho.' },
        curriculum: { structure: 'EGCSE curriculum.', examinationBody: 'ECESWA', description: 'Standard high school education.' },
        departments: [],
        calendar: { startDate: '', terms: [], examPeriods: '', holidays: '' },
        assessment: { approach: '', gradingSystem: '' },
        support: { services: [], description: '' },
        staff: { head: { name: '', qualifications: '', experience: '' }, totalCount: 0, avgExperience: '', certifications: [] },
        performance: { passRate: '95%', ranking: '', distinctions: '', awards: [] },
        programs: [
          { id: 'prog-nn-1', name: 'EGCSE Certificate Program', qualification: 'EGCSE Certificate', duration: '2 Years', subjects: ['English Language', 'Mathematics', 'Physical Science', 'Biology', 'Agriculture'], requirements: 'JC pass.', description: 'Core secondary certification.', syllabusUrl: '#' }
        ],
        facilities: { description: '', list: [] },
        elearning: { enabled: false, platform: '', onlineClassOptions: '', digitalAssignments: '', recordedLectures: '' },
        partnerships: { internships: '', collaborations: '' }
      },
      news: { overview: { title: '', description: '' }, posts: [], events: [], gallery: [], newsletterCta: '' },
      studentLife: { overview: { headline: '', introduction: '' }, sports: { list: ['Football', 'Athletics', 'Basketball'], facilities: [], description: '' }, clubs: [], arts: { activities: [], description: '' }, leadership: { opportunities: [], roles: '' }, facilities: [], support: { services: [], description: '' }, activities: { list: [], description: '' }, community: { programs: [], description: '' }, accommodation: { available: true, type: 'Boarding', description: 'Co-educational boarding support.', facilities: ['Hostel rooms', 'Play room'] } },
      portal: { enabled: false, name: 'Portal', headline: 'Portal Link', description: '', url: '', loginRequirements: [], rolesSupported: [], accountCreationProcess: '', features: { dashboard: { list: [], description: '' }, learning: { list: [], description: '' }, assessments: { list: [], description: '' }, records: { list: [], accessLevel: 'Student' }, scheduling: { list: [], description: '' }, collaboration: [] }, tools: { list: [], platforms: [] }, mobileAccess: { list: [], devices: [] }, security: [], support: { email: '', phone: '', hours: '', resources: [] }, usageGuidelines: { policy: '', rules: '', expectations: '' } }
    },
    stats: { views: 1800, applications: 92, engagementRate: 7 }
  },
  {
    id: 'inst-14',
    name: "Harolds Academy",
    slug: 'harolds-academy',
    subdomain: 'harolds',
    logo: 'https://picsum.photos/seed/harolds/200/200',
    coverImage: imgHighSchool,
    region: Region.MANZINI,
    type: [InstitutionType.HIGH_SCHOOL, InstitutionType.PRIVATE],
    isVerified: true,
    isAccredited: true,
    moetRegistration: 'MoET/MA/5112-HA',
    isFeatured: true,
    isSpotlight: true,
    seoScore: 88,
    trustScore: 92,
    plan: SubscriptionPlan.PREMIUM_B2B,
    status: 'published',
    adminId: 'user-1',
    createdAt: '2024-01-25T00:00:00Z',
    seo: { title: "Harolds Academy - Private High School", description: "A prominent private high school located in urban Manzini catering to learners tracking international university entrance paths.", keywords: ['Harolds Academy', 'Manzini Private school', 'IEB', 'International Secondary Certificate'], healthScore: 90 },
    theme: { primaryColor: '#0369a1', fontFamily: 'Inter', borderRadius: 'xl', layout: 'modern' },
    metadata: { gender: GenderType.MIXED, isBoarding: false, feeRange: { min: 24000, max: 48000 }, establishedYear: 2005, studentCount: 350, hasStudentPortal: true },
    contact: {
      address: 'P.O. Box 5112, Manzini, Eswatini',
      latitude: -26.498611,
      longitude: 31.386667,
      phone: '+268 2505 8899',
      email: 'admissions@haroldsacademy.ac.sz',
      website: 'www.haroldsacademy.ac.sz',
      officeHours: 'Mon - Fri: 07:30 - 16:30',
      googleMapsUrl: 'https://maps.google.com/?q=Harolds+Academy+Manzini',
      headline: 'Shaping Global Futures',
      introduction: 'A prominent private high school located in urban Manzini catering to learners tracking international university entrance paths.',
      departments: [{ name: 'Admissions Office', phone: '+268 2505 8899', email: 'admissions@haroldsacademy.ac.sz' }],
      faqs: [{ question: 'What is the IEB curriculum?', answer: 'The Independent Examinations Board provides a highly rigorous, South African-accredited curriculum recognized worldwide.' }]
    },
    reviews: [],
    sections: {
      homepage: { heroBanner: 'https://picsum.photos/seed/haroldshero/1200/400', welcomeMessage: 'Welcome to Harolds Academy.', principalMessage: { text: 'Nurturing academic independence and preparing modern learners for world-class universities.', name: 'Director' }, quickLinks: [], announcements: [] },
      about: {
        overview: 'A prominent private high school located in urban Manzini catering to learners tracking international university entrance paths.',
        foundingBackground: 'Established in 2005 to satisfy the urban demand for a flexible curriculum combining IEB International secondary lines and vocational pathways.',
        history: { foundingStory: { yearEstablished: 2005, founders: ['Harolds Educational Trust'], originalPurpose: 'International-focused private academy.', initialStudentPopulation: '40 Students', firstCampusLocation: 'Manzini Urban' }, milestones: [], growthSummary: 'Quickly obtained an elite status in Manzini region.', transformationNarrative: { adaptationToChange: '', technologicalUpgrades: '', communityImpact: '', alumniInfluence: '' } },
        vision: { headline: 'To be the standard of premium, international and vocational secondary education in Eswatini', supportingParagraph: '' },
        mission: { statement: 'To guide learners toward global university eligibility and technical mastery.' },
        coreValues: [],
        leadership: { principal: { name: 'Director of Academics', title: 'Director' }, seniorTeam: [] },
        accreditation: { registeredWith: 'MoET', registrationNumber: 'MoET/MA/5112-HA', examinationBody: 'IEB / International Secondary Certificate', affiliations: ['IEB South Africa'], awards: ['Top Academic Private School 2022'] },
        statistics: { totalStudents: 350, totalStaff: 30, studentTeacherRatio: '1:12', yearsOfOperation: 21, graduationRate: '99%' },
        facilities: { overview: '', list: ['Science Arena', 'ICT Hub', 'Multimedia Library', 'Seminar Rooms', 'Design Tech Workshop'] },
        community: { outreach: '', partnerships: '', socialResponsibility: '' },
        downloads: [],
        testimonials: []
      },
      admissions: { headline: 'Admissions & Requirements', introduction: 'Internal entrance assessment tests in English and Mathematics; previous academic transcripts and financial clearance.', programs: [], requirements: { academic: ['Entrance assessment tests in English and Mathematics', 'Academic transcripts for the past 2 years', 'Financial clearance record'], documents: ['Transfer Letter', 'Identity documents / Birth Certificate', 'Latest Academic Report'], additional: [] }, processSteps: [{ step: 'Entrance Test', instruction: 'Book and sit for the English and Mathematics entrance evaluation.' }], applicationFee: { amount: 'SZL 350', methods: [] }, processingTime: '1 week', importantDates: [], tuitionFees: { perTerm: 'SZL 12,000', perYear: 'SZL 36,000', additional: [] }, scholarships: { types: [], eligibility: '', howToApply: '' }, faqs: [], contact: { name: '', phone: '', email: '', hours: '' }, allowOnlineApplications: true, onlineApplicationUrl: '#' },
      academics: {
        overview: { headline: 'Curriculum & Courses', introduction: 'A prominent private high school located in urban Manzini catering to learners tracking international university entrance paths.' },
        curriculum: { structure: 'Independent Examinations Board (IEB) International Secondary Certificate and local vocational options.', examinationBody: 'IEB', description: 'International Standard Track.' },
        departments: [],
        calendar: { startDate: '', terms: [], examPeriods: '', holidays: '' },
        assessment: { approach: '', gradingSystem: '' },
        support: { services: [], description: '' },
        staff: { head: { name: '', qualifications: '', experience: '' }, totalCount: 0, avgExperience: '', certifications: [] },
        performance: { passRate: '99%', ranking: '', distinctions: '', awards: [] },
        programs: [
          { id: 'prog-ha-1', name: 'IEB Secondary Certificate', qualification: 'International Secondary Certificate', duration: '2 Years', subjects: ['English HL', 'Mathematics', 'Life Sciences', 'Physical Sciences', 'Business Studies'], requirements: 'Entrance Test Pass.', description: 'Rigorous college pre-university curriculum.', syllabusUrl: '#' },
          { id: 'prog-ha-2', name: 'Vocational Technical Track', qualification: 'Academy Certificate', duration: '2 Years', subjects: ['Design & Technology', 'Information Technology', 'Accounting', 'Entrepreneurship'], requirements: 'Practical inclination.', description: 'Focuses heavily on vocational options.', syllabusUrl: '#' }
        ],
        facilities: { description: '', list: [] },
        elearning: { enabled: true, platform: 'Google Classroom', onlineClassOptions: 'Hybrid', digitalAssignments: 'Active', recordedLectures: 'Yes' },
        studentPortal: { enabled: true, url: 'https://portal.haroldsacademy.ac.sz', features: { learningMaterials: true, assignmentSubmission: true, resultsDisplay: true } },
        partnerships: { internships: '', collaborations: '' }
      },
      news: { overview: { title: '', description: '' }, posts: [], events: [], gallery: [], newsletterCta: '' },
      studentLife: { overview: { headline: '', introduction: '' }, sports: { list: ['Swimming', 'Tennis', 'Basketball', 'Soccer'], facilities: [], description: '' }, clubs: [], arts: { activities: [], description: '' }, leadership: { opportunities: [], roles: '' }, facilities: [], support: { services: [], description: '' }, activities: { list: [], description: '' }, community: { programs: [], description: '' } },
      portal: {
        enabled: true,
        name: 'Harolds Academy Student Portal',
        headline: 'Interactive Learner Portal',
        description: 'Check grades, download tasks, and access study guidelines.',
        url: '#',
        loginRequirements: ['Student ID', 'Password'],
        rolesSupported: ['STUDENT', 'PARENT', 'TEACHER'],
        accountCreationProcess: 'Auto-generated by Admin upon registration clearance.',
        features: { dashboard: { list: ['Grades Tracker', 'Announcements Desk'], description: '' }, learning: { list: ['Virtual Library', 'Homework Submission'], description: '' }, assessments: { list: ['Weekly Quizzes'], description: '' }, records: { list: ['Report Cards'], accessLevel: 'Student' }, scheduling: { list: ['Class Timetables'], description: '' }, collaboration: [] },
        tools: { list: ['Google Workspace Integration'], platforms: ['Web', 'Mobile'] },
        mobileAccess: { list: ['Harolds Portal App'], devices: ['Android', 'iOS'] },
        security: ['Dual Factor Secure Access'],
        support: { email: 'it@haroldsacademy.ac.sz', phone: '+268 2505 8899', hours: '08:00 - 16:30', resources: [] },
        usageGuidelines: { policy: 'Acceptable ICT Use Policy', rules: '', expectations: '' }
      }
    },
    stats: { views: 3200, applications: 180, engagementRate: 12 }
  },
  {
    id: 'inst-15',
    name: "Matsapha High School",
    slug: 'matsapha-high',
    subdomain: 'matsaphahigh',
    logo: 'https://picsum.photos/seed/matsapha/200/200',
    coverImage: imgHighSchool,
    region: Region.MANZINI,
    type: [InstitutionType.HIGH_SCHOOL, InstitutionType.PUBLIC],
    isVerified: true,
    isAccredited: true,
    moetRegistration: 'MoET/MA/1032-MS',
    isFeatured: false,
    isSpotlight: false,
    seoScore: 80,
    trustScore: 85,
    plan: SubscriptionPlan.FREE,
    status: 'published',
    adminId: 'user-1',
    createdAt: '2024-01-28T00:00:00Z',
    seo: { title: "Matsapha High School - Government Secondary Hub", description: "A government school accommodating a large student population from the peri-urban Matsapha and Mahlabatsini areas.", keywords: ['Matsapha High', 'Matsapha Secondary', 'Mahlabatsini', 'High School'], healthScore: 82 },
    theme: { primaryColor: '#1e40af', fontFamily: 'Inter', borderRadius: 'md', layout: 'classic' },
    metadata: { gender: GenderType.MIXED, isBoarding: false, feeRange: { min: 5000, max: 10000 }, establishedYear: 1982, studentCount: 950, hasStudentPortal: false },
    contact: {
      address: 'Centre 1032 / P.O. Box 24, Matsapha, Eswatini',
      latitude: -26.522222,
      longitude: 31.327778,
      phone: '+268 2518 4331',
      email: 'matsaphahigh@realnet.co.sz',
      website: 'www.matsaphahigh.ac.sz',
      officeHours: 'Mon - Fri: 08:00 - 16:00',
      googleMapsUrl: 'https://maps.google.com/?q=Matsapha+High+School',
      headline: 'Knowledge and Progress',
      introduction: 'A government school accommodating a large student population from the peri-urban Matsapha and Mahlabatsini areas.',
      departments: [{ name: 'Admissions Office', phone: '+268 2518 4331', email: 'admissions@matsaphahigh.ac.sz' }],
      faqs: [{ question: 'How is admissions managed?', answer: 'Admissions are managed through General public secondary enrollment guidelines, and due to demand, spaces fill up very quickly.' }]
    },
    reviews: [],
    sections: {
      homepage: { heroBanner: 'https://picsum.photos/seed/matsaphahero/1200/400', welcomeMessage: 'Welcome to Matsapha High School.', principalMessage: { text: 'Serving the peri-urban and industrial communities with high secondary educational standards.', name: 'Principal' }, quickLinks: [], announcements: [] },
      about: {
        overview: 'A government school accommodating a large student population from the peri-urban Matsapha and Mahlabatsini areas.',
        foundingBackground: 'Established in 1982 to address the educational requirements of families working in the industrial zone and neighboring Mahlabatsini.',
        history: { foundingStory: { yearEstablished: 1982, founders: ['Ministry of Education'], originalPurpose: 'Peri-urban secondary school', initialStudentPopulation: '180 Students', firstCampusLocation: 'Matsapha Area' }, milestones: [], growthSummary: 'Highly competitive government institution holding significant student numbers.', transformationNarrative: { adaptationToChange: '', technologicalUpgrades: '', communityImpact: '', alumniInfluence: '' } },
        vision: { headline: 'Empowered, self-reliant, and highly competent graduates.', supportingParagraph: '' },
        mission: { statement: 'To provide affordable and quality education to peri-urban and urban learners.' },
        coreValues: [],
        leadership: { principal: { name: 'Principal', title: 'Principal' }, seniorTeam: [] },
        accreditation: { registeredWith: 'MoET', registrationNumber: 'MoET/MA/1032-MS', examinationBody: 'ECESWA', affiliations: [], awards: [] },
        statistics: { totalStudents: 950, totalStaff: 58, studentTeacherRatio: '1:16', yearsOfOperation: 44, graduationRate: '93%' },
        facilities: { overview: '', list: ['Spacious Classrooms', 'Science Lab', 'Multipurpose Pitch', 'Agricultural Plot'] },
        community: { outreach: '', partnerships: '', socialResponsibility: '' },
        downloads: [],
        testimonials: []
      },
      admissions: { headline: 'Admissions & Requirements', introduction: 'General public secondary enrollment guidelines; highly competitive due to its location in the industrial hub.', programs: [], requirements: { academic: ['Successful SPC passing grades'], documents: ['Original SPC results statement', 'Completed Ministry Application', 'Primary Transfer Confirmation'], additional: [] }, processSteps: [{ step: 'Ministry Selection', instruction: 'Submit guidelines following national results update in January.' }], applicationFee: { amount: 'SZL 100', methods: [] }, processingTime: '2 weeks', importantDates: [], tuitionFees: { perTerm: 'SZL 2,400', perYear: 'SZL 7,200', additional: [] }, scholarships: { types: [], eligibility: '', howToApply: '' }, faqs: [], contact: { name: '', phone: '', email: '', hours: '' }, allowOnlineApplications: false },
      academics: {
        overview: { headline: 'Curriculum & Courses', introduction: 'A government school accommodating a large student population from the peri-urban Matsapha and Mahlabatsini areas.' },
        curriculum: { structure: 'EGCSE curriculum.', examinationBody: 'ECESWA', description: 'EGCSE Curriculum.' },
        departments: [],
        calendar: { startDate: '', terms: [], examPeriods: '', holidays: '' },
        assessment: { approach: '', gradingSystem: '' },
        support: { services: [], description: '' },
        staff: { head: { name: '', qualifications: '', experience: '' }, totalCount: 0, avgExperience: '', certifications: [] },
        performance: { passRate: '93%', ranking: '', distinctions: '', awards: [] },
        programs: [
          { id: 'prog-mh-1', name: 'EGCSE Secondary Certificate', qualification: 'EGCSE Certificate', duration: '2 Years', subjects: ['Mathematics', 'English Language', 'Physical Science', 'Biology', 'Business Studies'], requirements: 'JC pass.', description: 'Standard high school certification curriculum.', syllabusUrl: '#' }
        ],
        facilities: { description: '', list: [] },
        elearning: { enabled: false, platform: '', onlineClassOptions: '', digitalAssignments: '', recordedLectures: '' },
        partnerships: { internships: '', collaborations: '' }
      },
      news: { overview: { title: '', description: '' }, posts: [], events: [], gallery: [], newsletterCta: '' },
      studentLife: { overview: { headline: '', introduction: '' }, sports: { list: ['Football', 'Athletics', 'Netball'], facilities: [], description: '' }, clubs: [], arts: { activities: [], description: '' }, leadership: { opportunities: [], roles: '' }, facilities: [], support: { services: [], description: '' }, activities: { list: [], description: '' }, community: { programs: [], description: '' } },
      portal: { enabled: false, name: 'Portal', headline: 'Portal Link', description: '', url: '', loginRequirements: [], rolesSupported: [], accountCreationProcess: '', features: { dashboard: { list: [], description: '' }, learning: { list: [], description: '' }, assessments: { list: [], description: '' }, records: { list: [], accessLevel: 'Student' }, scheduling: { list: [], description: '' }, collaboration: [] }, tools: { list: [], platforms: [] }, mobileAccess: { list: [], devices: [] }, security: [], support: { email: '', phone: '', hours: '', resources: [] }, usageGuidelines: { policy: '', rules: '', expectations: '' } }
    },
    stats: { views: 2400, applications: 155, engagementRate: 10 }
  },
  {
    id: 'inst-16',
    name: "Ekukhanyeni High School",
    slug: 'ekukhanyeni-high',
    subdomain: 'ekukhanyeni',
    logo: 'https://picsum.photos/seed/ekukhanyeni/200/200',
    coverImage: imgHighSchool,
    region: Region.MANZINI,
    type: [InstitutionType.HIGH_SCHOOL, InstitutionType.PUBLIC],
    isVerified: true,
    isAccredited: true,
    moetRegistration: 'MoET/MA/104-EK',
    isFeatured: false,
    isSpotlight: false,
    seoScore: 75,
    trustScore: 82,
    plan: SubscriptionPlan.FREE,
    status: 'published',
    adminId: 'user-1',
    createdAt: '2024-02-01T00:00:00Z',
    seo: { title: "Ekukhanyeni High School", description: "A rural public high school serving agricultural communities northeast of Manzini.", keywords: ['Ekukhanyeni High', 'Manzini rural school', 'agricultural community', 'High School'], healthScore: 78 },
    theme: { primaryColor: '#2563eb', fontFamily: 'Inter', borderRadius: 'md', layout: 'classic' },
    metadata: { gender: GenderType.MIXED, isBoarding: false, feeRange: { min: 3800, max: 6200 }, establishedYear: 1989, studentCount: 420, hasStudentPortal: false },
    contact: {
      address: 'P.O. Box 104, Manzini, Eswatini',
      latitude: -26.370833,
      longitude: 31.5125,
      phone: '+268 2551 2022',
      email: 'ekukhanyenihigh@gmail.com',
      website: 'www.ekukhanyenihigh.ac.sz',
      officeHours: 'Mon - Fri: 08:00 - 16:30',
      googleMapsUrl: 'https://maps.google.com/?q=Ekukhanyeni+High+School',
      headline: 'Education for Community Empowerment',
      introduction: 'A rural public high school serving agricultural communities northeast of Manzini.',
      departments: [{ name: 'Admissions Office', phone: '+268 2551 2022', email: 'admissions@ekukhanyenihigh.ac.sz' }],
      faqs: [{ question: 'When is application open?', answer: 'Registration opens immediately following the release of national primary certificate (SPC) results in January.' }]
    },
    reviews: [],
    sections: {
      homepage: { heroBanner: 'https://picsum.photos/seed/ekukhanyenihero/1200/400', welcomeMessage: 'Welcome to Ekukhanyeni High School.', principalMessage: { text: 'Laying robust educational foundations for our agricultural communities.', name: 'Principal' }, quickLinks: [], announcements: [] },
      about: {
        overview: 'A rural public high school serving agricultural communities northeast of Manzini.',
        foundingBackground: 'Established in 1989 to serve families and agricultural farming groups northeast of Manzini with local secondary education.',
        history: { foundingStory: { yearEstablished: 1989, founders: ['Development Committee'], originalPurpose: 'Secondary instruction', initialStudentPopulation: '50 Students', firstCampusLocation: 'Ekukhanyeni' }, milestones: [], growthSummary: 'Supports agricultural and rural community learners with solid achievements.', transformationNarrative: { adaptationToChange: '', technologicalUpgrades: '', communityImpact: '', alumniInfluence: '' } },
        vision: { headline: 'To produce morally sound and community-driven graduates.', supportingParagraph: '' },
        mission: { statement: 'To deliver quality and relevant education accessible to rural student demographics.' },
        coreValues: [],
        leadership: { principal: { name: 'Principal', title: 'Principal' }, seniorTeam: [] },
        accreditation: { registeredWith: 'MoET', registrationNumber: 'MoET/MA/104-EK', examinationBody: 'ECESWA', affiliations: [], awards: [] },
        statistics: { totalStudents: 420, totalStaff: 24, studentTeacherRatio: '1:17', yearsOfOperation: 37, graduationRate: '91%' },
        facilities: { overview: '', list: ['Classrooms', 'Science Laboratory', 'Agri Plots', 'Football Pitch'] },
        community: { outreach: '', partnerships: '', socialResponsibility: '' },
        downloads: [],
        testimonials: []
      },
      admissions: { headline: 'Admissions & Requirements', introduction: 'Standard pass in SPC; registration opens immediately following the release of national primary results in January.', programs: [], requirements: { academic: ['Standard pass in Eswatini Primary Certificate (SPC)'], documents: ['Official SPC results slip', 'Primary Leaving Letter', 'Birth Certificate'], additional: [] }, processSteps: [{ step: 'Registration', instruction: 'Submit enrollment request in January post-SPC publication.' }], applicationFee: { amount: 'SZL 80', methods: [] }, processingTime: '1 week', importantDates: [], tuitionFees: { perTerm: 'SZL 1,600', perYear: 'SZL 4,800', additional: [] }, scholarships: { types: [], eligibility: '', howToApply: '' }, faqs: [], contact: { name: '', phone: '', email: '', hours: '' }, allowOnlineApplications: false },
      academics: {
        overview: { headline: 'Curriculum & Courses', introduction: 'A rural public high school serving agricultural communities northeast of Manzini.' },
        curriculum: { structure: 'EGCSE curriculum.', examinationBody: 'ECESWA', description: 'EGCSE pathways.' },
        departments: [],
        calendar: { startDate: '', terms: [], examPeriods: '', holidays: '' },
        assessment: { approach: '', gradingSystem: '' },
        support: { services: [], description: '' },
        staff: { head: { name: '', qualifications: '', experience: '' }, totalCount: 0, avgExperience: '', certifications: [] },
        performance: { passRate: '91%', ranking: '', distinctions: '', awards: [] },
        programs: [
          { id: 'prog-ek-1', name: 'Standard Secondary EGCSE Route', qualification: 'EGCSE Certificate', duration: '2 Years', subjects: ['Mathematics', 'English Language', 'SiSwati', 'Biology', 'Agriculture'], requirements: 'JC Certificate.', description: 'Standard high school path.', syllabusUrl: '#' }
        ],
        facilities: { description: '', list: [] },
        elearning: { enabled: false, platform: '', onlineClassOptions: '', digitalAssignments: '', recordedLectures: '' },
        partnerships: { internships: '', collaborations: '' }
      },
      news: { overview: { title: '', description: '' }, posts: [], events: [], gallery: [], newsletterCta: '' },
      studentLife: { overview: { headline: '', introduction: '' }, sports: { list: ['Football', 'Netball', 'Athletics'], facilities: [], description: '' }, clubs: [], arts: { activities: [], description: '' }, leadership: { opportunities: [], roles: '' }, facilities: [], support: { services: [], description: '' }, activities: { list: [], description: '' }, community: { programs: [], description: '' } },
      portal: { enabled: false, name: 'Portal', headline: 'Portal Link', description: '', url: '', loginRequirements: [], rolesSupported: [], accountCreationProcess: '', features: { dashboard: { list: [], description: '' }, learning: { list: [], description: '' }, assessments: { list: [], description: '' }, records: { list: [], accessLevel: 'Student' }, scheduling: { list: [], description: '' }, collaboration: [] }, tools: { list: [], platforms: [] }, mobileAccess: { list: [], devices: [] }, security: [], support: { email: '', phone: '', hours: '', resources: [] }, usageGuidelines: { policy: '', rules: '', expectations: '' } }
    },
    stats: { views: 1000, applications: 50, engagementRate: 3 }
  },
  {
    id: 'inst-17',
    name: "Masundvwini High School",
    slug: 'masundvwini-high',
    subdomain: 'masundvwini',
    logo: 'https://picsum.photos/seed/masundvwini/200/200',
    coverImage: imgHighSchool,
    region: Region.MANZINI,
    type: [InstitutionType.HIGH_SCHOOL, InstitutionType.PUBLIC],
    isVerified: true,
    isAccredited: true,
    moetRegistration: 'MoET/MA/1030-MV',
    isFeatured: false,
    isSpotlight: false,
    seoScore: 81,
    trustScore: 86,
    plan: SubscriptionPlan.FREE,
    status: 'published',
    adminId: 'user-1',
    createdAt: '2024-02-05T00:00:00Z',
    seo: { title: "Masundvwini High School", description: "Located near royal residence areas and industrial zones, offering technical skills alongside regular academics.", keywords: ['Masundvwini High', 'Matsapha', 'Pre-vocational', 'High School'], healthScore: 80 },
    theme: { primaryColor: '#2563eb', fontFamily: 'Inter', borderRadius: 'md', layout: 'classic' },
    metadata: { gender: GenderType.MIXED, isBoarding: false, feeRange: { min: 5800, max: 11500 }, establishedYear: 1985, studentCount: 650, hasStudentPortal: false },
    contact: {
      address: 'Centre 1030 / P.O. Box 412, Matsapha, Eswatini',
      latitude: -26.534722,
      longitude: 31.297222,
      phone: '+268 2518 5212',
      email: 'masundvwini@realnet.co.sz',
      website: 'www.masundvwinihigh.ac.sz',
      officeHours: 'Mon - Fri: 08:00 - 16:00',
      googleMapsUrl: 'https://maps.google.com/?q=Masundvwini+High+School',
      headline: 'Skills for Integrity and Devotion',
      introduction: 'Located near royal residence areas and industrial zones, offering technical skills alongside regular academics.',
      departments: [{ name: 'Admissions Office', phone: '+268 2518 5212', email: 'admissions@masundvwini.ac.sz' }],
      faqs: [{ question: 'What technical tracks are available?', answer: 'We offer Ministry-approved pre-vocational education tracks such as woodwork and electronics.' }]
    },
    reviews: [],
    sections: {
      homepage: { heroBanner: 'https://picsum.photos/seed/masundvwinihero/1200/400', welcomeMessage: 'Welcome to Masundvwini High School.', principalMessage: { text: 'Integrating technical, vocational, and strong academics.', name: 'Principal' }, quickLinks: [], announcements: [] },
      about: {
        overview: 'Located near royal residence areas and industrial zones, offering technical skills alongside regular academics.',
        foundingBackground: 'Established in 1985 to offer pre-vocational training and regular academic tracks to neighboring communities.',
        history: { foundingStory: { yearEstablished: 1985, founders: ['Ministry of Education'], originalPurpose: 'Pre-vocational secondary education', initialStudentPopulation: '120 Students', firstCampusLocation: 'Masundvwini' }, milestones: [], growthSummary: 'Maintains strong local and royal residence community partnerships.', transformationNarrative: { adaptationToChange: '', technologicalUpgrades: '', communityImpact: '', alumniInfluence: '' } },
        vision: { headline: 'To equip learners with outstanding academic and practical technical competencies.', supportingParagraph: '' },
        mission: { statement: 'To provide quality high school academics together with Ministry-approved pre-vocational skills.' },
        coreValues: [],
        leadership: { principal: { name: 'Principal', title: 'Principal' }, seniorTeam: [] },
        accreditation: { registeredWith: 'MoET', registrationNumber: 'MoET/MA/1030-MV', examinationBody: 'ECESWA & pre-vocational board', affiliations: [], awards: [] },
        statistics: { totalStudents: 650, totalStaff: 40, studentTeacherRatio: '1:16', yearsOfOperation: 41, graduationRate: '92%' },
        facilities: { overview: '', list: ['Technical Workshops', 'Computer Lab', 'Science Labs'] },
        community: { outreach: '', partnerships: '', socialResponsibility: '' },
        downloads: [],
        testimonials: []
      },
      admissions: { headline: 'Admissions & Requirements', introduction: 'Evaluation of primary leaving certificates and localized residential quotas.', programs: [], requirements: { academic: ['SPC pass results statement'], documents: ['Primary school report', 'Official SPC results statement', 'Identity & Birth Certificate'], additional: [] }, processSteps: [{ step: 'Review', instruction: 'Evaluation of primary certificates and residential criteria.' }], applicationFee: { amount: 'SZL 120', methods: [] }, processingTime: '2 weeks', importantDates: [], tuitionFees: { perTerm: 'SZL 2,200', perYear: 'SZL 6,600', additional: [] }, scholarships: { types: [], eligibility: '', howToApply: '' }, faqs: [], contact: { name: '', phone: '', email: '', hours: '' }, allowOnlineApplications: false },
      academics: {
        overview: { headline: 'Curriculum & Courses', introduction: 'Located near royal residence areas and industrial zones, offering technical skills alongside regular academics.' },
        curriculum: { structure: 'EGCSE with Ministry-approved pre-vocational education tracks.', examinationBody: 'ECESWA / Ministry of Education', description: 'Secondary vocational curriculum.' },
        departments: [],
        calendar: { startDate: '', terms: [], examPeriods: '', holidays: '' },
        assessment: { approach: '', gradingSystem: '' },
        support: { services: [], description: '' },
        staff: { head: { name: '', qualifications: '', experience: '' }, totalCount: 0, avgExperience: '', certifications: [] },
        performance: { passRate: '92%', ranking: '', distinctions: '', awards: [] },
        programs: [
          { id: 'prog-mv-1', name: 'EGCSE General Track', qualification: 'EGCSE Certificate', duration: '2 Years', subjects: ['Mathematics', 'English Language', 'Physical Science', 'Biology', 'SiSwati'], requirements: 'JC pass.', description: 'Core secondary certification.', syllabusUrl: '#' },
          { id: 'prog-mv-2', name: 'Pre-Vocational Technical Track', qualification: 'Technical EGCSE', duration: '2 Years', subjects: ['Woodwork', 'Metalwork', 'Home Economics'], requirements: 'JC pass with practical aptitude.', description: 'Vocational elective options.', syllabusUrl: '#' }
        ],
        facilities: { description: '', list: [] },
        elearning: { enabled: false, platform: '', onlineClassOptions: '', digitalAssignments: '', recordedLectures: '' },
        partnerships: { internships: '', collaborations: '' }
      },
      news: { overview: { title: '', description: '' }, posts: [], events: [], gallery: [], newsletterCta: '' },
      studentLife: { overview: { headline: '', introduction: '' }, sports: { list: ['Football', 'Athletics', 'Netball'], facilities: [], description: '' }, clubs: [], arts: { activities: [], description: '' }, leadership: { opportunities: [], roles: '' }, facilities: [], support: { services: [], description: '' }, activities: { list: [], description: '' }, community: { programs: [], description: '' } },
      portal: { enabled: false, name: 'Portal', headline: 'Portal Link', description: '', url: '', loginRequirements: [], rolesSupported: [], accountCreationProcess: '', features: { dashboard: { list: [], description: '' }, learning: { list: [], description: '' }, assessments: { list: [], description: '' }, records: { list: [], accessLevel: 'Student' }, scheduling: { list: [], description: '' }, collaboration: [] }, tools: { list: [], platforms: [] }, mobileAccess: { list: [], devices: [] }, security: [], support: { email: '', phone: '', hours: '', resources: [] }, usageGuidelines: { policy: '', rules: '', expectations: '' } }
    },
    stats: { views: 1800, applications: 95, engagementRate: 6 }
  },
  {
    id: 'inst-18',
    name: "Big Bend High School",
    slug: 'big-bend-high',
    subdomain: 'bigbend',
    logo: 'https://picsum.photos/seed/bigbend/200/200',
    coverImage: imgHighSchool,
    region: Region.LUBOMBO,
    type: [InstitutionType.HIGH_SCHOOL, InstitutionType.PUBLIC],
    isVerified: true,
    isAccredited: true,
    moetRegistration: 'MoET/LU/015-BB',
    isFeatured: false,
    isSpotlight: false,
    seoScore: 78,
    trustScore: 84,
    plan: SubscriptionPlan.FREE,
    status: 'published',
    adminId: 'user-1',
    createdAt: '2024-02-10T00:00:00Z',
    seo: { title: "Big Bend High School", description: "Located in southern Lubombo; deeply connected to the local sugarcane agricultural community and business sector.", keywords: ['Big Bend High', 'Lubombo High', 'Sugarcane', 'High School'], healthScore: 80 },
    theme: { primaryColor: '#059669', fontFamily: 'Inter', borderRadius: 'md', layout: 'classic' },
    metadata: { gender: GenderType.MIXED, isBoarding: true, feeRange: { min: 6200, max: 12800 }, establishedYear: 1980, studentCount: 500, hasStudentPortal: false },
    contact: {
      address: 'P.O. Box 15, Big Bend, Eswatini',
      latitude: -26.82,
      longitude: 31.933889,
      phone: '+268 2363 6112',
      email: 'bigbendhigh@swazi.net',
      website: 'www.bigbendhigh.ac.sz',
      officeHours: 'Mon - Fri: 08:00 - 16:30',
      googleMapsUrl: 'https://maps.google.com/?q=Big+bend+High+School',
      headline: 'Cultivating Growth and Excellence',
      introduction: 'Located in southern Lubombo; deeply connected to the local sugarcane agricultural community and business sector.',
      departments: [{ name: 'Admissions Office', phone: '+268 2363 6112', email: 'admissions@bigbendhigh.ac.sz' }],
      faqs: [{ question: 'Is priority given to specific applicants?', answer: 'Yes, priority is given to families working within the local sugar estate networks.' }]
    },
    reviews: [],
    sections: {
      homepage: { heroBanner: 'https://picsum.photos/seed/bigbendhero/1200/400', welcomeMessage: 'Welcome to Big Bend High School.', principalMessage: { text: 'Developing responsible secondary education pathways in southern Lubombo.', name: 'Principal' }, quickLinks: [], announcements: [] },
      about: {
        overview: 'Located in southern Lubombo; deeply connected to the local sugarcane agricultural community and business sector.',
        foundingBackground: 'Established in 1980 to serve children of parents employed in the local sugar estates.',
        history: { foundingStory: { yearEstablished: 1980, founders: ['Estate Management'], originalPurpose: 'Education for estate families', initialStudentPopulation: '90 students', firstCampusLocation: 'Big Bend' }, milestones: [], growthSummary: 'Significant growth alongside regional investments.', transformationNarrative: { adaptationToChange: '', technologicalUpgrades: '', communityImpact: '', alumniInfluence: '' } },
        vision: { headline: 'To create industrious and highly accomplished citizens driving sugar belt progress.', supportingParagraph: '' },
        mission: { statement: 'To provide solid high-school education and relevant agricultural electives.' },
        coreValues: [],
        leadership: { principal: { name: 'Principal', title: 'Principal' }, seniorTeam: [] },
        accreditation: { registeredWith: 'MoET', registrationNumber: 'MoET/LU/015-BB', examinationBody: 'ECESWA', affiliations: [], awards: [] },
        statistics: { totalStudents: 500, totalStaff: 28, studentTeacherRatio: '1:17', yearsOfOperation: 46, graduationRate: '93%' },
        facilities: { overview: '', list: ['Hostels', 'Dining Room', 'Agri fields', 'Science Lab'] },
        community: { outreach: '', partnerships: '', socialResponsibility: '' },
        downloads: [],
        testimonials: []
      },
      admissions: { headline: 'Admissions & Requirements', introduction: 'Standard entry based on SPC performance; priority given to families working within the local sugar estate networks.', programs: [], requirements: { academic: ['Standard pass in Eswatini Primary Certificate (SPC)'], documents: ['SPC results transcript', 'Employer status index', 'Birth Certificate'], additional: [] }, processSteps: [{ step: 'Application', instruction: 'Submit SPC certificate and parent employment details.' }], applicationFee: { amount: 'SZL 100', methods: [] }, processingTime: '2 weeks', importantDates: [], tuitionFees: { perTerm: 'SZL 2,600', perYear: 'SZL 7,800', additional: [] }, scholarships: { types: [], eligibility: '', howToApply: '' }, faqs: [], contact: { name: '', phone: '', email: '', hours: '' }, allowOnlineApplications: false },
      academics: {
        overview: { headline: 'Curriculum & Courses', introduction: 'Located in southern Lubombo; deeply connected to the local sugarcane agricultural community and business sector.' },
        curriculum: { structure: 'EGCSE curriculum.', examinationBody: 'ECESWA', description: 'EGCSE certifications.' },
        departments: [],
        calendar: { startDate: '', terms: [], examPeriods: '', holidays: '' },
        assessment: { approach: '', gradingSystem: '' },
        support: { services: [], description: '' },
        staff: { head: { name: '', qualifications: '', experience: '' }, totalCount: 0, avgExperience: '', certifications: [] },
        performance: { passRate: '93%', ranking: '', distinctions: '', awards: [] },
        programs: [
          { id: 'prog-bb-1', name: 'EGCSE Certificate Pathway', qualification: 'EGCSE Certificate', duration: '2 Years', subjects: ['Mathematics', 'English Language', 'Physical Science', 'Biology', 'Agriculture'], requirements: 'JC pass.', description: 'Standard high school certification syllabus.', syllabusUrl: '#' }
        ],
        facilities: { description: '', list: [] },
        elearning: { enabled: false, platform: '', onlineClassOptions: '', digitalAssignments: '', recordedLectures: '' },
        partnerships: { internships: '', collaborations: '' }
      },
      news: { overview: { title: '', description: '' }, posts: [], events: [], gallery: [], newsletterCta: '' },
      studentLife: { overview: { headline: '', introduction: '' }, sports: { list: ['Football', 'Netball', 'Athletics'], facilities: [], description: '' }, clubs: [], arts: { activities: [], description: '' }, leadership: { opportunities: [], roles: '' }, facilities: [], support: { services: [], description: '' }, activities: { list: [], description: '' }, community: { programs: [], description: '' }, accommodation: { available: true, type: 'Boarding', description: 'Hostel housing on-campus.', facilities: ['Study room', 'Hostel dorms'] } },
      portal: { enabled: false, name: 'Portal', headline: 'Portal Link', description: '', url: '', loginRequirements: [], rolesSupported: [], accountCreationProcess: '', features: { dashboard: { list: [], description: '' }, learning: { list: [], description: '' }, assessments: { list: [], description: '' }, records: { list: [], accessLevel: 'Student' }, scheduling: { list: [], description: '' }, collaboration: [] }, tools: { list: [], platforms: [] }, mobileAccess: { list: [], devices: [] }, security: [], support: { email: '', phone: '', hours: '', resources: [] }, usageGuidelines: { policy: '', rules: '', expectations: '' } }
    },
    stats: { views: 1300, applications: 78, engagementRate: 5 }
  },
  {
    id: 'inst-19',
    name: "Siteki Industrial High School",
    slug: 'siteki-industrial-high',
    subdomain: 'sitekiindustrial',
    logo: 'https://picsum.photos/seed/sitekiindustrial/200/200',
    coverImage: imgHighSchool,
    region: Region.LUBOMBO,
    type: [InstitutionType.HIGH_SCHOOL, InstitutionType.PUBLIC],
    isVerified: true,
    isAccredited: true,
    moetRegistration: 'MoET/LU/312-SI',
    isFeatured: true,
    isSpotlight: false,
    seoScore: 82,
    trustScore: 88,
    plan: SubscriptionPlan.FREE,
    status: 'published',
    adminId: 'user-1',
    createdAt: '2024-02-12T00:00:00Z',
    seo: { title: "Siteki Industrial High - Technical Vocational Core", description: "A key government institution dedicated to bridging technical vocational skills with high school education in the eastern region.", keywords: ['Siteki Industrial', 'Siteki High', 'technical woodwork', 'metalwork', 'vocational high school'], healthScore: 84 },
    theme: { primaryColor: '#2563eb', fontFamily: 'Inter', borderRadius: 'md', layout: 'classic' },
    metadata: { gender: GenderType.MIXED, isBoarding: true, feeRange: { min: 5800, max: 11900 }, establishedYear: 1983, studentCount: 550, hasStudentPortal: false },
    contact: {
      address: 'Centre 312 / P.O. Box 110, Siteki, Eswatini',
      latitude: -26.459722,
      longitude: 31.952778,
      phone: '+268 2343 5144',
      email: 'siteki.industrial@swazi.net',
      website: 'www.sitekiindustrial.ac.sz',
      officeHours: 'Mon - Fri: 08:00 - 16:30',
      googleMapsUrl: 'https://maps.google.com/?q=Siteki+Industrial+High+School',
      headline: 'Skills for Industry',
      introduction: 'A key government institution dedicated to bridging technical vocational skills with high school education in the eastern region.',
      departments: [{ name: 'Admissions Office', phone: '+268 2343 5144', email: 'admissions@sitekiindustrial.ac.sz' }],
      faqs: [{ question: 'What technical streams are offered?', answer: 'We offer comprehensive pre-vocational technical streams: Woodwork, Metalwork, and Home Economics.' }]
    },
    reviews: [],
    sections: {
      homepage: { heroBanner: 'https://picsum.photos/seed/sitekihero/1200/400', welcomeMessage: 'Welcome to Siteki Industrial High School.', principalMessage: { text: 'Bridging practical vocational masteries with robust secondary high school certificates.', name: 'Principal' }, quickLinks: [], announcements: [] },
      about: {
        overview: 'A key government institution dedicated to bridging technical vocational skills with high school education in the eastern region.',
        foundingBackground: 'Established in 1983 as a dedicated technical training high school node in Siteki.',
        history: { foundingStory: { yearEstablished: 1983, founders: ['Ministry of Education'], originalPurpose: 'Technical vocational high school', initialStudentPopulation: '110 Students', firstCampusLocation: 'Siteki Urban' }, milestones: [], growthSummary: 'Important regional government technical instruction provider.', transformationNarrative: { adaptationToChange: '', technologicalUpgrades: '', communityImpact: '', alumniInfluence: '' } },
        vision: { headline: 'To be the hallmark of practical and high school educational excellence in Lubombo.', supportingParagraph: '' },
        mission: { statement: 'To provide industry-ready technical woodwork, metalwork, home economics with core EGCSE achievements.' },
        coreValues: [],
        leadership: { principal: { name: 'Principal', title: 'Principal' }, seniorTeam: [] },
        accreditation: { registeredWith: 'MoET', registrationNumber: 'MoET/LU/312-SI', examinationBody: 'ECESWA & Technical boards', affiliations: [], awards: [] },
        statistics: { totalStudents: 550, totalStaff: 38, studentTeacherRatio: '1:14', yearsOfOperation: 43, graduationRate: '94%' },
        facilities: { overview: '', list: ['Woodworking Arena', 'Metalwork Foundry', 'Home Economics Kitchen', 'Science Lab', 'Dormitories'] },
        community: { outreach: '', partnerships: '', socialResponsibility: '' },
        downloads: [],
        testimonials: []
      },
      admissions: { headline: 'Admissions & Requirements', introduction: 'General completion of the primary cycle; selection focuses heavily on students demonstrating practical or technical aptitude.', programs: [], requirements: { academic: ['General completion of the primary cycle (SPC Pass)'], documents: ['SPC certificate transcript', 'Pragmatic assessment interview evaluation', 'Birth Certificate'], additional: [] }, processSteps: [{ step: 'Evaluation', instruction: 'Submit primary SPC records and sit for basic structural craft interview.' }], applicationFee: { amount: 'SZL 120', methods: [] }, processingTime: '2 weeks', importantDates: [], tuitionFees: { perTerm: 'SZL 2,400', perYear: 'SZL 7,200', additional: [] }, scholarships: { types: [], eligibility: '', howToApply: '' }, faqs: [], contact: { name: '', phone: '', email: '', hours: '' }, allowOnlineApplications: false },
      academics: {
        overview: { headline: 'Curriculum & Courses', introduction: 'A key government institution dedicated to bridging technical vocational skills with high school education in the eastern region.' },
        curriculum: { structure: 'EGCSE along with comprehensive pre-vocational technical streams (Woodwork, Metalwork, Home Economics).', examinationBody: 'ECESWA & Technical Boards', description: 'Comprehensive pre-vocational.' },
        departments: [],
        calendar: { startDate: '', terms: [], examPeriods: '', holidays: '' },
        assessment: { approach: '', gradingSystem: '' },
        support: { services: [], description: '' },
        staff: { head: { name: '', qualifications: '', experience: '' }, totalCount: 0, avgExperience: '', certifications: [] },
        performance: { passRate: '94%', ranking: '', distinctions: '', awards: [] },
        programs: [
          { id: 'prog-si-1', name: 'Technical Craft EGCSE', qualification: 'EGCSE + Technical Certificate', duration: '2 Years', subjects: ['Woodwork', 'Metalwork', 'Technical Drawing', 'Mathematics'], requirements: 'JC pass.', description: 'Pragmatic and secondary qualification.', syllabusUrl: '#' }
        ],
        facilities: { description: '', list: [] },
        elearning: { enabled: false, platform: '', onlineClassOptions: '', digitalAssignments: '', recordedLectures: '' },
        partnerships: { internships: '', collaborations: '' }
      },
      news: { overview: { title: '', description: '' }, posts: [], events: [], gallery: [], newsletterCta: '' },
      studentLife: { overview: { headline: '', introduction: '' }, sports: { list: ['Football', 'Volleyball', 'Athletics'], facilities: [], description: '' }, clubs: [], arts: { activities: [], description: '' }, leadership: { opportunities: [], roles: '' }, facilities: [], support: { services: [], description: '' }, activities: { list: [], description: '' }, community: { programs: [], description: '' }, accommodation: { available: true, type: 'Boarding', description: 'On-campus boarding hostels.', facilities: ['Study hall', 'Metal craft lockers', 'Dormitories'] } },
      portal: { enabled: false, name: 'Portal', headline: 'Portal Link', description: '', url: '', loginRequirements: [], rolesSupported: [], accountCreationProcess: '', features: { dashboard: { list: [], description: '' }, learning: { list: [], description: '' }, assessments: { list: [], description: '' }, records: { list: [], accessLevel: 'Student' }, scheduling: { list: [], description: '' }, collaboration: [] }, tools: { list: [], platforms: [] }, mobileAccess: { list: [], devices: [] }, security: [], support: { email: '', phone: '', hours: '', resources: [] }, usageGuidelines: { policy: '', rules: '', expectations: '' } }
    },
    stats: { views: 1900, applications: 110, engagementRate: 7 }
  },
  {
    id: 'inst-20',
    name: "Hlatikulu Central High School",
    slug: 'hlatikulu-central-high',
    subdomain: 'hlatikulucentral',
    logo: 'https://picsum.photos/seed/hlatikulu/200/200',
    coverImage: imgHighSchool,
    region: Region.SHISELWENI,
    type: [InstitutionType.HIGH_SCHOOL, InstitutionType.PUBLIC],
    isVerified: true,
    isAccredited: true,
    moetRegistration: 'MoET/SH/045-HC',
    isFeatured: false,
    isSpotlight: false,
    seoScore: 76,
    trustScore: 82,
    plan: SubscriptionPlan.FREE,
    status: 'published',
    adminId: 'user-1',
    createdAt: '2024-02-15T00:00:00Z',
    seo: { title: "Hlatikulu Central High School", description: "One of the primary urban public high schools providing secondary education to the southern highland communities.", keywords: ['Hlatikulu Central High', 'Shiselweni High', 'Southern highlanders', 'High School'], healthScore: 78 },
    theme: { primaryColor: '#2563eb', fontFamily: 'Inter', borderRadius: 'md', layout: 'classic' },
    metadata: { gender: GenderType.MIXED, isBoarding: true, feeRange: { min: 5100, max: 9800 }, establishedYear: 1965, studentCount: 530, hasStudentPortal: false },
    contact: {
      address: 'P.O. Box 45, Hlatikulu, Eswatini',
      latitude: -26.97,
      longitude: 31.322778,
      phone: '+268 2217 6122',
      email: 'hlatikulucentral@gmail.com',
      website: 'www.hlatikulucentral.ac.sz',
      officeHours: 'Mon - Fri: 08:00 - 16:30',
      googleMapsUrl: 'https://maps.google.com/?q=Hlatikulu+Central+High+School',
      headline: 'Effort and Character',
      introduction: 'One of the primary urban public high schools providing secondary education to the southern highland communities.',
      departments: [{ name: 'Admissions Office', phone: '+268 2217 6122', email: 'admissions@hlatikulucentral.ac.sz' }],
      faqs: [{ question: 'How is admissions managed?', answer: 'Selection is managed via regional education office quotas post-SPC results.' }]
    },
    reviews: [],
    sections: {
      homepage: { heroBanner: 'https://picsum.photos/seed/hlatikuluhero/1200/400', welcomeMessage: 'Welcome to Hlatikulu Central High School.', principalMessage: { text: 'Nurturing community empowerment across the Southern highland communities.', name: 'Principal' }, quickLinks: [], announcements: [] },
      about: {
        overview: 'One of the primary urban public high schools providing secondary education to the southern highland communities.',
        foundingBackground: 'Established in 1965 to address high-altitude secondary school requirements in Southern Shiselweni.',
        history: { foundingStory: { yearEstablished: 1965, founders: ['Ministry of Education'], originalPurpose: 'Southern highlands secondary instruction hub', initialStudentPopulation: '90 pupils', firstCampusLocation: 'Hlatikulu' }, milestones: [], growthSummary: 'Significant history of regional development.', transformationNarrative: { adaptationToChange: '', technologicalUpgrades: '', communityImpact: '', alumniInfluence: '' } },
        vision: { headline: 'To be the premium reference point for public secondary achievements in South Eswatini.', supportingParagraph: '' },
        mission: { statement: 'To provide solid and highly relevant secondary EGCSE courses to southern highland families.' },
        coreValues: [],
        leadership: { principal: { name: 'Principal', title: 'Principal' }, seniorTeam: [] },
        accreditation: { registeredWith: 'MoET', registrationNumber: 'MoET/SH/045-HC', examinationBody: 'ECESWA', affiliations: [], awards: [] },
        statistics: { totalStudents: 530, totalStaff: 28, studentTeacherRatio: '1:18', yearsOfOperation: 61, graduationRate: '92%' },
        facilities: { overview: '', list: ['Science Lab', 'Library', 'Sports Field', 'Classrooms', 'Hostels'] },
        community: { outreach: '', partnerships: '', socialResponsibility: '' },
        downloads: [],
        testimonials: []
      },
      admissions: { headline: 'Admissions & Requirements', introduction: 'Public secondary enrollment guidelines; selection managed via regional education office quotas post-SPC results.', programs: [], requirements: { academic: ['Standard pass in Eswatini Primary Certificate (SPC)'], documents: ['SPC original records slip', 'Birth details/Identity Document', 'Regional Registry recommendation'], additional: [] }, processSteps: [{ step: 'Regional Quota Selection', instruction: 'Submit details for regional quota check post-January SPC results.' }], applicationFee: { amount: 'SZL 90', methods: [] }, processingTime: '2 weeks', importantDates: [], tuitionFees: { perTerm: 'SZL 1,900', perYear: 'SZL 5,700', additional: [] }, scholarships: { types: [], eligibility: '', howToApply: '' }, faqs: [], contact: { name: '', phone: '', email: '', hours: '' }, allowOnlineApplications: false },
      academics: {
        overview: { headline: 'Curriculum & Courses', introduction: 'One of the primary urban public high schools providing secondary education to the southern highland communities.' },
        curriculum: { structure: 'EGCSE curriculum.', examinationBody: 'ECESWA', description: 'EGCSE Secondary Certification.' },
        departments: [],
        calendar: { startDate: '', terms: [], examPeriods: '', holidays: '' },
        assessment: { approach: '', gradingSystem: '' },
        support: { services: [], description: '' },
        staff: { head: { name: '', qualifications: '', experience: '' }, totalCount: 0, avgExperience: '', certifications: [] },
        performance: { passRate: '92%', ranking: '', distinctions: '', awards: [] },
        programs: [
          { id: 'prog-hc-1', name: 'General High School Syllabus', qualification: 'EGCSE Certificate', duration: '2 Years', subjects: ['Mathematics', 'English Language', 'Physical Science', 'Biology', 'Geography'], requirements: 'JC Certificate.', description: 'Standard secondary certificate syllabus.', syllabusUrl: '#' }
        ],
        facilities: { description: '', list: [] },
        elearning: { enabled: false, platform: '', onlineClassOptions: '', digitalAssignments: '', recordedLectures: '' },
        partnerships: { internships: '', collaborations: '' }
      },
      news: { overview: { title: '', description: '' }, posts: [], events: [], gallery: [], newsletterCta: '' },
      studentLife: { overview: { headline: '', introduction: '' }, sports: { list: ['Football', 'Netball', 'Athletics'], facilities: [], description: '' }, clubs: [], arts: { activities: [], description: '' }, leadership: { opportunities: [], roles: '' }, facilities: [], support: { services: [], description: '' }, activities: { list: [], description: '' }, community: { programs: [], description: '' }, accommodation: { available: true, type: 'Boarding', description: 'Hostel facilities available on-site.', facilities: ['Dorm blocks', 'Kitchen area'] } },
      portal: { enabled: false, name: 'Portal', headline: 'Portal Link', description: '', url: '', loginRequirements: [], rolesSupported: [], accountCreationProcess: '', features: { dashboard: { list: [], description: '' }, learning: { list: [], description: '' }, assessments: { list: [], description: '' }, records: { list: [], accessLevel: 'Student' }, scheduling: { list: [], description: '' }, collaboration: [] }, tools: { list: [], platforms: [] }, mobileAccess: { list: [], devices: [] }, security: [], support: { email: '', phone: '', hours: '', resources: [] }, usageGuidelines: { policy: '', rules: '', expectations: '' } }
    },
    stats: { views: 1100, applications: 48, engagementRate: 4 }
  },
  {
    id: 'inst-21',
    name: "Our Lady of Sorrows High School",
    slug: 'our-lady-of-sorrows',
    subdomain: 'ourladysorrows',
    logo: 'https://picsum.photos/seed/sorrows/200/200',
    coverImage: imgHighSchool,
    region: Region.SHISELWENI,
    type: [InstitutionType.HIGH_SCHOOL, InstitutionType.PUBLIC],
    isVerified: true,
    isAccredited: true,
    moetRegistration: 'MoET/SH/512-OS',
    isFeatured: true,
    isSpotlight: true,
    seoScore: 84,
    trustScore: 90,
    plan: SubscriptionPlan.FREE,
    status: 'published',
    adminId: 'user-1',
    createdAt: '2024-02-18T00:00:00Z',
    seo: { title: "Our Lady of Sorrows High School - Roman Catholic Hluti", description: "A historically significant Roman Catholic mission-run boarding and day school located in the far southern belt near the South African border.", keywords: ['Our Lady of Sorrows', 'Hluti', 'Catholic Mission School', 'Shiselweni Boarding school', 'High School'], healthScore: 86 },
    theme: { primaryColor: '#1e40af', fontFamily: 'Inter', borderRadius: 'md', layout: 'classic' },
    metadata: { gender: GenderType.MIXED, isBoarding: true, feeRange: { min: 8200, max: 15500 }, establishedYear: 1954, studentCount: 580, hasStudentPortal: false },
    contact: {
      address: 'Centre 512 / P.O. Box 83, Hluti, Eswatini',
      latitude: -27.213889,
      longitude: 31.470833,
      phone: '+268 2227 5122',
      email: 'sorrowsmission@realnet.co.sz',
      website: 'www.ourladyofsorrows.ac.sz',
      officeHours: 'Mon - Fri: 08:00 - 16:30',
      googleMapsUrl: 'https://maps.google.com/?q=Our+Lady+of+Sorrows+High+School+Hluti',
      headline: 'Truth, Honor, and Charity',
      introduction: 'A historically significant Roman Catholic mission-run boarding and day school located in the far southern belt near the South African border.',
      departments: [{ name: 'Admissions Office', phone: '+268 2227 5122', email: 'admissions@ourladyofsorrows.ac.sz' }],
      faqs: [{ question: 'Are boarding facilities offered?', answer: 'Yes, we run mission boarding houses for both boys and girls.' }]
    },
    reviews: [],
    sections: {
      homepage: { heroBanner: 'https://picsum.photos/seed/sorrowshero/1200/400', welcomeMessage: 'Welcome to Our Lady of Sorrows High School.', principalMessage: { text: 'Providing deep spiritual and academic guidance since 1954 near the southern border.', name: 'Sister Principal' }, quickLinks: [], announcements: [] },
      about: {
        overview: 'A historically significant Roman Catholic boarding and day school near the South African border.',
        foundingBackground: 'Established in 1954 by Catholic sisters to cater to far southern communities and cross-border families with disciplined boarding and daily learning.',
        history: { foundingStory: { yearEstablished: 1954, founders: ['Roman Catholic Sisters'], originalPurpose: 'Mission boarding school for Shiselweni', initialStudentPopulation: '60 Students', firstCampusLocation: 'Hluti' }, milestones: [], growthSummary: 'Long legacy of secondary academic and moral distinction.', transformationNarrative: { adaptationToChange: '', technologicalUpgrades: '', communityImpact: '', alumniInfluence: '' } },
        vision: { headline: 'To cultivate moral integrity and intellect for a progressive society.', supportingParagraph: '' },
        mission: { statement: 'To provide high quality secondary education guided by Catholic standards.' },
        coreValues: [],
        leadership: { principal: { name: 'Sister Principal', title: 'Principal' }, seniorTeam: [] },
        accreditation: { registeredWith: 'MoET', registrationNumber: 'MoET/SH/512-OS', examinationBody: 'ECESWA', affiliations: [], awards: [] },
        statistics: { totalStudents: 580, totalStaff: 36, studentTeacherRatio: '1:16', yearsOfOperation: 72, graduationRate: '96%' },
        facilities: { overview: '', list: ['Convent Hostels', 'Chapel', 'Science Laboratories', 'Dining Hall'] },
        community: { outreach: '', partnerships: '', socialResponsibility: '' },
        downloads: [],
        testimonials: []
      },
      admissions: { headline: 'Admissions & Requirements', introduction: 'Catholic mission selection guidelines; open to all learners meeting minimum national primary passing grades.', programs: [], requirements: { academic: ['General completion of primary cycle (SPC Pass)'], documents: ['SPC results transcript', 'Reference from church / community', 'Birth details / Certificate'], additional: [] }, processSteps: [{ step: 'Registration Selection', instruction: 'Submit Catholic mission guidelines form and SPC slip.' }], applicationFee: { amount: 'SZL 150', methods: [] }, processingTime: '2 weeks', importantDates: [], tuitionFees: { perTerm: 'SZL 4,500', perYear: 'SZL 13,500', additional: [] }, scholarships: { types: [], eligibility: '', howToApply: '' }, faqs: [], contact: { name: '', phone: '', email: '', hours: '' }, allowOnlineApplications: false },
      academics: {
        overview: { headline: 'Curriculum & Courses', introduction: 'A historically significant Roman Catholic mission-run boarding and day school located in the far southern belt near the South African border.' },
        curriculum: { structure: 'EGCSE curriculum.', examinationBody: 'ECESWA', description: 'EGCSE Curriculum.' },
        departments: [],
        calendar: { startDate: '', terms: [], examPeriods: '', holidays: '' },
        assessment: { approach: '', gradingSystem: '' },
        support: { services: [], description: '' },
        staff: { head: { name: '', qualifications: '', experience: '' }, totalCount: 0, avgExperience: '', certifications: [] },
        performance: { passRate: '96%', ranking: '', distinctions: '', awards: [] },
        programs: [
          { id: 'prog-os-1', name: 'General High School Syllabus', qualification: 'EGCSE Certificate', duration: '2 Years', subjects: ['Mathematics', 'English Language', 'Physical Science', 'Biology', 'Religious Education'], requirements: 'JC pass.', description: 'Standard high school certificate pathway.', syllabusUrl: '#' }
        ],
        facilities: { description: '', list: [] },
        elearning: { enabled: false, platform: '', onlineClassOptions: '', digitalAssignments: '', recordedLectures: '' },
        partnerships: { internships: '', collaborations: '' }
      },
      news: { overview: { title: '', description: '' }, posts: [], events: [], gallery: [], newsletterCta: '' },
      studentLife: { overview: { headline: '', introduction: '' }, sports: { list: ['Football', 'Tennis', 'Netball'], facilities: [], description: '' }, clubs: [], arts: { activities: [], description: '' }, leadership: { opportunities: [], roles: '' }, facilities: [], support: { services: [], description: '' }, activities: { list: [], description: '' }, community: { programs: [], description: '' }, accommodation: { available: true, type: 'Boarding', description: 'Catholic mission managed boarding hostels.', facilities: ['Study halls', 'Dormitories'] } },
      portal: { enabled: false, name: 'Portal', headline: 'Portal Link', description: '', url: '', loginRequirements: [], rolesSupported: [], accountCreationProcess: '', features: { dashboard: { list: [], description: '' }, learning: { list: [], description: '' }, assessments: { list: [], description: '' }, records: { list: [], accessLevel: 'Student' }, scheduling: { list: [], description: '' }, collaboration: [] }, tools: { list: [], platforms: [] }, mobileAccess: { list: [], devices: [] }, security: [], support: { email: '', phone: '', hours: '', resources: [] }, usageGuidelines: { policy: '', rules: '', expectations: '' } }
    },
    stats: { views: 1900, applications: 120, engagementRate: 9 }
  },
  {
    id: 'inst-snat',
    name: 'SNAT (Swaziland National Association of Teachers)',
    slug: 'snat',
    subdomain: 'snat',
    logo: 'https://picsum.photos/seed/snat/200/200',
    coverImage: 'https://picsum.photos/seed/snatcover/1200/400',
    region: Region.MANZINI,
    type: [InstitutionType.ASSOCIATION],
    isVerified: true,
    isAccredited: false,
    moetRegistration: 'PROF-SNAT-001',
    isFeatured: true,
    isSpotlight: true,
    trustScore: 98,
    seoScore: 90,
    plan: SubscriptionPlan.PREMIUM_B2B,
    status: 'published',
    adminId: 'user-moet',
    createdAt: '2024-04-22T00:00:00Z',
    seo: {
      title: 'SNAT - Eswatini Teachers Union & Professional Body',
      description: 'Voice of the Swazi teacher. Advocating for excellence, rights, and professional development.',
      keywords: ['Teachers', 'Union', 'Eswatini', 'SNAT'],
      healthScore: 92
    },
    theme: {
      primaryColor: '#dc2626',
      fontFamily: 'Inter',
      borderRadius: '2xl',
      layout: 'modern',
      sectionOrder: ['homepage', 'about', 'news', 'portal']
    },
    metadata: {
      gender: GenderType.MIXED,
      isBoarding: false,
      feeRange: { min: 0, max: 0 },
      establishedYear: 1928,
      studentCount: 15000,
      hasStudentPortal: true
    },
    contact: {
      address: 'SNAT Centre, Manzini, Eswatini',
      phone: '+268 2505 2841',
      email: 'info@snat.org.sz',
      website: 'www.snat.org.sz',
      officeHours: 'Mon-Fri: 08:30 - 16:30'
    },
    reviews: [],
    sections: {
      homepage: {
        heroBanner: 'https://picsum.photos/seed/snathero/1200/600',
        welcomeMessage: 'Empowering Teachers, Shaping the Future of Eswatini.',
        principalMessage: {
          text: 'SNAT stands as the bulwark of teacher rights and professional excellence in our Kingdom. We welcome all educators to unite under our banner for collective bargaining, professional growth, and social justice.',
          name: 'Secretary General'
        },
        quickLinks: [
          { label: 'Join SNAT', url: '#admissions' },
          { label: 'SNAT Co-op', url: '#portal' },
          { label: 'Legal Aid', url: '#academics' },
          { label: 'Branch Meetings', url: '#news' }
        ],
        announcements: [
          { id: 'ann-1', date: '2026-05-10', title: 'National Executive Committee Updates', content: 'Latest outcomes from the TSC engagement regarding the cost of living adjustment.', priority: 'High' }
        ]
      },
      about: {
        overview: 'The Swaziland National Association of Teachers (SNAT) is the premier professional organization and labor union for educators in the Kingdom of Eswatini.',
        foundingBackground: 'Established in 1928, SNAT has a long, proud history of standing up for the rights and welfare of teachers.',
        history: { foundingStory: { yearEstablished: 1928, founders: ['Pioneering Eswatini Educators'], originalPurpose: 'To unite educators and advocate for better teaching conditions.', initialStudentPopulation: '0', firstCampusLocation: 'Manzini' }, milestones: [], growthSummary: 'Grown from a small association to the largest professional union in the country.', transformationNarrative: { adaptationToChange: 'Evolved into a modern labor union with a robust Cooperative Society.', technologicalUpgrades: 'Implementing digital member services.', communityImpact: 'Championing quality public education for all Swazi children.', alumniInfluence: 'Retired teachers continue to guide our policies.' } },
        vision: { headline: 'A unified, empowered, and professional teaching force driving national progress.', supportingParagraph: 'We envision a system where every teacher is respected, adequately compensated, and equipped to deliver world-class education.' },
        mission: { statement: 'To promote the professional, social, and economic interests of teachers in Eswatini.', description: 'Through collective bargaining, professional development, and socio-economic empowerment (SNAT Co-op).' },
        coreValues: [{name: 'Solidarity', description: ''}, {name: 'Integrity', description: ''}, {name: 'Professionalism', description: ''}, {name: 'Democracy', description: ''}, {name: 'Equality', description: ''}],
        leadership: { principal: { name: 'SNAT President', title: 'President' }, seniorTeam: [] },
        accreditation: { registeredWith: 'Eswatini Government & ILO', registrationNumber: 'SNAT-1928', examinationBody: 'N/A', affiliations: ['EI (Education International)', 'TUCOSWA'], awards: [] },
        statistics: { totalStudents: 0, totalStaff: 15000, studentTeacherRatio: 'N/A', yearsOfOperation: 98, graduationRate: 'N/A' },
        facilities: { overview: 'SNAT National Centre (Manzini) & Regional Offices', list: ['Conference Halls', 'Legal Aid Office', 'SNAT Co-op Financial Desks', 'Member Accommodation'] },
        community: { outreach: 'Educational policy advocacy.', partnerships: 'UNESCO, UNICEF, ActionAid.', socialResponsibility: 'Quality Public Education campaigns.' },
        downloads: [],
        testimonials: []
      },
      admissions: { 
        headline: 'Become a Member', 
        introduction: 'Join the largest and most influential professional body in Eswatini. Open to all registered educators.', 
        programs: [],
        requirements: { academic: ['Recognized Teaching Qualification'], documents: ['TSC Employment Letter', 'ID Copy', 'Latest Payslip'], additional: ['Completed Membership Form'] },
        processSteps: [{ step: 'Registration', instruction: 'Submit forms at your local SNAT branch or the National Centre.' }],
        applicationFee: { amount: 'E0', methods: [] },
        processingTime: 'Processed monthly with payroll.',
        importantDates: [],
        tuitionFees: { perTerm: '1% of Basic Salary (Monthly)', perYear: '', additional: [] },
        scholarships: { types: [], eligibility: '', howToApply: '' },
        faqs: [],
        contact: { name: 'Membership Office', phone: '+268 2505 2841', email: 'membership@snat.org.sz', hours: 'Mon-Fri: 08:00 - 16:30' },
        allowOnlineApplications: true 
      },
      academics: { 
        overview: { headline: 'Professional Development & Welfare', introduction: 'Empowering the Eswatini educator through continuous training, legal protection, and financial services.' },
        curriculum: { structure: '', examinationBody: '', description: '' },
        departments: [],
        programs: [
          { id: 'snat-pd-1', name: 'Workplace Rights Seminar', qualification: 'Certificate of Attendance', duration: '2 Days', description: 'Deep dive into the Employment Act, TSC regulations, and grievance handling procedures.', subjects: [], requirements: { academic: [], documents: [], additional: ['SNAT Membership'] } },
          { id: 'snat-pd-2', name: '21st Century Pedagogy Workshop', qualification: 'CPD Credits', duration: '3 Days', description: 'Integrating ICT in the classroom and modern assessment techniques.', subjects: [], requirements: { academic: [], documents: [], additional: ['Active Teacher'] } }
        ],
        calendar: { startDate: 'January', terms: [], examPeriods: '', holidays: '' },
        assessment: { approach: '', gradingSystem: '' },
        support: { services: ['Legal Representation (TSC Disciplinary)', 'SNAT Co-op Savings & Loans', 'Bereavement Fund', 'Psychosocial Support'], description: 'Comprehensive welfare and legal support for our members across all regions.' },
        staff: { head: { name: 'Secretary General', qualifications: '', experience: '' }, totalCount: 20, avgExperience: '10+ years', certifications: [] },
        performance: { passRate: '', ranking: '', distinctions: '', awards: [] },
        facilities: { description: '', list: [] },
        elearning: { enabled: false, platform: '', onlineClassOptions: '', digitalAssignments: '', recordedLectures: '' },
        partnerships: { internships: '', collaborations: '' }
      },
      news: { 
        overview: { title: 'SNAT Bulletins & Advocacy Updates', description: 'Stay informed on union activities, TSC negotiations, and policy changes.' }, 
        posts: [
          { id: '1', title: 'Update on Salary Negotiations', date: '2026-05-01', excerpt: 'The NEC provides a brief on the latest engagement with the government regarding the CoLA.', category: 'Announcements', image: 'https://picsum.photos/seed/snatnews/800/400' }
        ], 
        events: [
          { id: '1', title: 'Annual General Conference (AGC)', date: '2026-08-15', location: 'SNAT Centre, Manzini', description: 'The grand annual meeting of branch delegates to pass resolutions.', type: 'Academic', time: '08:00 AM', organizer: 'SNAT NEC', registrationRequired: true }
        ], 
        gallery: [], 
        newsletterCta: 'Subscribe to SNAT SMS alerts' 
      },
      studentLife: { overview: { headline: 'Branch Activities & Networks', introduction: 'Connect with fellow educators in your region.' }, sports: { list: ['SNAT Annual Sports Day', 'Regional Choral Music'], facilities: [], description: 'Promoting wellness and unity among teachers.' }, clubs: [], arts: { activities: [], description: '' }, leadership: { opportunities: ['Branch Chairperson', 'Shop Steward'], roles: 'Represent your school at the branch level.' }, facilities: [], support: { services: [], description: '' }, activities: { list: [], description: '' }, community: { programs: [], description: '' } },
      portal: { enabled: true, name: 'SNAT Digital Hub', headline: 'Member Services Portal', description: 'Manage your membership, access SNAT Co-op statements, and download resources.', url: '#', loginRequirements: ['TSC Number', 'Password'], rolesSupported: ['Member', 'Branch Executive'], accountCreationProcess: 'Auto-created for all active members.', features: { dashboard: { list: ['Membership Status', 'Co-op Balance Summary', 'Recent Alerts'], description: 'Your quick overview.' }, learning: { list: ['Download Syllabuses', 'Past Papers Hub'], description: 'A shared repository of teaching materials contributed by members.' }, assessments: { list: [], description: '' }, records: { list: ['View joining date', 'Beneficiary details'], accessLevel: 'Self-service' }, scheduling: { list: ['Book SNAT Accommodation', 'Schedule Legal Consultation'], description: '' }, collaboration: ['Branch Discussion Forums', 'Subject-Specific Groups'] }, tools: { list: ['Payslip Calculator', 'Tax Estimator'], platforms: ['Web', 'Mobile App'] }, mobileAccess: { list: ['Push notifications for urgent circulars'], devices: ['Android', 'iOS'] }, security: ['Secure login'], support: { email: 'ict@snat.org.sz', phone: '+268 2505 2841', hours: '08:00 - 16:30', resources: [] }, usageGuidelines: { policy: 'For verified members only.', rules: '', expectations: '' } }
    },
    stats: { views: 25000, applications: 450, engagementRate: 25 }
  },
  ...NEW_ESTABLISHED_SCHOOLS
];

export const MOCK_STUDENT_PROGRESS: StudentProgress[] = [
  {
    id: 'prog-1',
    studentId: 'stu-1',
    studentName: 'Banele Dlamini',
    institutionId: 'inst-1',
    teacherId: 'teacher-1',
    parentId: 'parent-1',
    term: 'Term 1',
    year: 2024,
    academics: [
      { subject: 'Mathematics', grade: 'A', comments: 'Shows great logic.' },
      { subject: 'English', grade: 'B+', comments: 'Strong vocabulary.' }
    ],
    behavior: {
      rating: 'Excellent',
      comments: 'Very cooperative in class.'
    },
    participation: {
      rating: 'High',
      activities: ['Soccer', 'Debate'],
      comments: 'Active participant in extracurriculars.'
    },
    lastUpdated: '2024-03-15T10:00:00Z'
  },
  {
    id: 'prog-2',
    studentId: 'stu-2',
    studentName: 'Sihle Simelane',
    institutionId: 'inst-1',
    teacherId: 'teacher-1',
    parentId: 'parent-2',
    term: 'Term 1',
    year: 2024,
    academics: [
      { subject: 'Mathematics', grade: 'C', comments: 'Needs more focus on algebra.' },
      { subject: 'Science', grade: 'B', comments: 'Great curiosity.' }
    ],
    behavior: {
      rating: 'Good',
      comments: 'Polite but sometimes distracted.'
    },
    participation: {
      rating: 'Medium',
      activities: ['Chess'],
      comments: 'Regular attendance in chess club.'
    },
    lastUpdated: '2024-03-16T11:30:00Z'
  }
];
