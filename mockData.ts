
import { Institution, Region, InstitutionType, User, UserRole, GenderType, SubscriptionPlan, StudentProgress } from './types';

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
    slug: 'waterford-kamhlaba',
    subdomain: 'waterford',
    logo: 'https://picsum.photos/seed/waterford/200/200',
    coverImage: 'https://picsum.photos/seed/waterfordcover/1200/400',
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
    plan: SubscriptionPlan.ENTERPRISE,
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
          { id: 'alm-1', name: 'Sibusiso Mnisi', graduationYear: '2022', currentIndustry: 'Finance', passportId: 'EP-2022-1049' },
          { id: 'alm-2', name: 'Tengetile Dlamini', graduationYear: '2023', currentIndustry: 'Technology', passportId: 'EP-2023-5521' }
        ],
        fundraisingGoals: [
          { id: 'fund-1', title: 'New Computer Lab', targetAmount: 200000, currentAmount: 145000 }
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
      address: 'Mbabane, Hhohho, Eswatini', 
      phone: '+268 2422 0866', 
      email: 'info@waterford.sz',
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
        heroBanner: 'https://picsum.photos/seed/wkhero/1600/600',
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
        introduction: 'Welcome to Waterford Kamhlaba UWCSA. We seek curious, motivated students from all backgrounds who are eager to challenge themselves and contribute to a better world.',
        programs: [
          { level: 'High School', items: ['Form 1', 'Form 2', 'Form 3'] },
          { level: 'IB Diploma', items: ['IB1 (Grade 11)', 'IB2 (Grade 12)'] }
        ],
        requirements: {
          academic: ['Previous school report (2 years)', 'Standardized testing results', 'Strong academic potential'],
          documents: ['Certified birth certificate', 'National ID / Passport', 'Two passport photos'],
          additional: ['Entrance examination', 'Personal interview', 'Recommendation from current principal']
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
          { id: 'prog-1', name: 'IB Diploma Programme', qualification: 'IB Diploma', duration: '2 Years', subjects: ['Mathematics', 'Physics', 'History', 'English', 'Biology'], requirements: 'Pass in IGCSE with minimum 5 Cs', description: 'Advanced pre-university curriculum recognized by top universities globally.', syllabusUrl: '#' },
          { id: 'prog-2', name: 'IGCSE', qualification: 'IGCSE Certificate', duration: '2 Years', subjects: ['Mathematics', 'Science', 'English', 'Geography', 'ICT'], requirements: 'Completion of Form 2', description: 'Cambridge secondary education providing foundation for senior studies.', syllabusUrl: '#' }
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
          head: { name: 'Stephen Lowry', qualifications: 'PhD in Education', experience: '30 Years' },
          totalCount: 85,
          avgExperience: '12 Years',
          certifications: ['IB Certification', 'PGCE', 'Cambridge Certified Examiner']
        },
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
        digital: {
          platform: 'ManageBac',
          features: ['Online classes', 'Digital assignments', 'Virtual library access']
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
            media: ['https://picsum.photos/seed/gala1/400/300']
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
          { url: 'https://picsum.photos/seed/g1/800/600', caption: 'Inter-house Sports Day 2023', type: 'photo' },
          { url: 'https://picsum.photos/seed/g2/800/600', caption: 'Science Fair Winners', type: 'photo' },
          { url: 'https://picsum.photos/seed/g3/800/600', caption: 'Drama Production: Hamlet', type: 'photo' }
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
        facilities: {
          list: ['Modern Library', 'Science Laboratories', 'Computer Centers', 'Student Lounge', 'Hostels'],
          description: 'Our campus features world-class facilities designed to support both learning and recreation.'
        },
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
    coverImage: 'https://picsum.photos/seed/sifundzanicover/1200/400',
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
        heroBanner: 'https://picsum.photos/seed/sphero/1600/600',
        welcomeMessage: 'Welcome to Sifundzani Primary School.',
        principalMessage: { text: 'We nurture young minds.', name: 'Principal Sifundzani' },
        quickLinks: [],
        announcements: []
      },
      about: {
        overview: 'Sifundzani Primary School provides a nurturing environment for early childhood and primary education. Established in 1981, we have a long history of academic excellence and holistic development.',
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
        contact: { name: 'Admissions Secretary', phone: '+268 2404 2461', email: 'info@sifundzani.ac.sz', hours: '07:30 - 13:30' }, 
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
        programs: [], 
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
          head: { name: 'Mrs. N. Dlamini', qualifications: 'B.Ed Primary', experience: '20 Years' }, 
          totalCount: 30, 
          avgExperience: '10 Years', 
          certifications: ['SACE Registered', 'First Aid Certified'] 
        }, 
        performance: { passRate: '100%', ranking: 'Top 10 Nationally', distinctions: '85% Merit/Credit rate', awards: ['Best Primary School Hhohho 2022'] }, 
        facilities: { 
          description: 'Child-friendly classrooms and specialized learning areas.', 
          list: ['Library', 'Computer Lab', 'Art Room', 'Music Room'] 
        }, 
        digital: { platform: 'Google Classroom', features: ['Homework assignments', 'Parent communication'] }, 
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
        facilities: { 
          list: ['Playground', 'Assembly Hall', 'Tuck Shop'], 
          description: 'Safe and engaging spaces for students to interact.' 
        }, 
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
      portal: { enabled: false, name: '', headline: '', description: '', url: '', loginRequirements: [], rolesSupported: [], accountCreationProcess: '', features: { dashboard: { list: [], description: '' }, learning: { list: [], description: '' }, assessments: { list: [], description: '' }, records: { list: [], accessLevel: '' }, scheduling: { list: [], description: '' }, collaboration: [] }, tools: { list: [], platforms: [] }, mobileAccess: { list: [], devices: [] }, security: [], support: { email: '', phone: '', hours: '', resources: [] }, usageGuidelines: { policy: '', rules: '', expectations: '' } }
    },
    stats: { views: 5000, applications: 120, engagementRate: 8 }
  },
  {
    id: 'inst-3',
    name: 'Manzini Nazarene High School',
    slug: 'manzini-nazarene-high',
    logo: 'https://picsum.photos/seed/nazarene/200/200',
    coverImage: 'https://picsum.photos/seed/nazarenecover/1200/400',
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
        programs: [], 
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
        digital: { platform: 'School Management System', features: ['Report cards', 'Attendance tracking'] }, 
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
        facilities: { 
          list: ['Student Center', 'Sports Grounds', 'Canteen'], 
          description: 'Spaces for relaxation and social interaction.' 
        }, 
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
      portal: { enabled: true, name: 'Student Portal', headline: '', description: '', url: '#', loginRequirements: [], rolesSupported: [], accountCreationProcess: '', features: { dashboard: { list: [], description: '' }, learning: { list: [], description: '' }, assessments: { list: [], description: '' }, records: { list: [], accessLevel: '' }, scheduling: { list: [], description: '' }, collaboration: [] }, tools: { list: [], platforms: [] }, mobileAccess: { list: [], devices: [] }, security: [], support: { email: '', phone: '', hours: '', resources: [] }, usageGuidelines: { policy: '', rules: '', expectations: '' } }
    },
    stats: { views: 8000, applications: 300, engagementRate: 10 }
  },
  {
    id: 'inst-4',
    name: 'University of Eswatini (UNESWA)',
    slug: 'uneswa',
    logo: 'https://picsum.photos/seed/uneswa/200/200',
    coverImage: 'https://picsum.photos/seed/uneswacover/1200/400',
    region: Region.LUBOMBO,
    type: [InstitutionType.TERTIARY, InstitutionType.PUBLIC],
    isVerified: true,
    isAccredited: true,
    moetRegistration: 'MoET/LU/001-UN',
    isFeatured: true,
    isSpotlight: true,
    seoScore: 90,
    trustScore: 95,
    plan: SubscriptionPlan.ENTERPRISE,
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
        heroBanner: 'https://picsum.photos/seed/uneswahero/1600/600',
        welcomeMessage: 'Welcome to the University of Eswatini.',
        principalMessage: { text: 'Empowering through knowledge.', name: 'Vice Chancellor' },
        quickLinks: [],
        announcements: []
      },
      about: {
        overview: 'UNESWA is the national university of Eswatini, offering a wide range of undergraduate and postgraduate programs. Established in 1982, it has grown to become the premier center for higher learning and research in the country.',
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
        programs: [], 
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
        digital: { platform: 'Moodle LMS', features: ['Online lectures', 'Course materials', 'Discussion forums'] }, 
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
        facilities: { 
          list: ['Student Union Building', 'Cafeterias', 'Health Center'], 
          description: 'Essential services for student well-being.' 
        }, 
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
      portal: { enabled: true, name: 'Student Portal', headline: '', description: '', url: '#', loginRequirements: [], rolesSupported: [], accountCreationProcess: '', features: { dashboard: { list: [], description: '' }, learning: { list: [], description: '' }, assessments: { list: [], description: '' }, records: { list: [], accessLevel: '' }, scheduling: { list: [], description: '' }, collaboration: [] }, tools: { list: [], platforms: [] }, mobileAccess: { list: [], devices: [] }, security: [], support: { email: '', phone: '', hours: '', resources: [] }, usageGuidelines: { policy: '', rules: '', expectations: '' } }
    },
    stats: { views: 25000, applications: 2000, engagementRate: 20 }
  },
  {
    id: 'inst-5',
    name: 'Evelyn Baring High School',
    slug: 'evelyn-baring-high',
    logo: 'https://picsum.photos/seed/ebaring/200/200',
    coverImage: 'https://picsum.photos/seed/ebaringcover/1200/400',
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
      address: 'Nhlangano, Shiselweni, Eswatini',
      phone: '+268 2207 8211',
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
        overview: 'Evelyn Baring High School is a historic institution in Nhlangano providing quality secondary education. Founded in 1955, it has a long-standing reputation for academic excellence and leadership development in the Shiselweni region.',
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
        introduction: 'We welcome students from all over Eswatini to join our diverse and vibrant school community. Our admissions process is merit-based and transparent.', 
        programs: [
          { level: 'Junior Secondary', items: ['Form 1', 'Form 2', 'Form 3'] },
          { level: 'Senior Secondary', items: ['Form 4', 'Form 5 (SGCSE)'] }
        ], 
        requirements: { 
          academic: ['EPC Results for Form 1', 'Junior Certificate for Form 4', 'Transfer letter for other grades'], 
          documents: ['Birth certificate', 'Identity document', 'Latest school report', 'Medical certificate for boarders'], 
          additional: ['Interview with the Principal'] 
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
        programs: [], 
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
        digital: { platform: 'SMS', features: ['Attendance', 'Grades'] }, 
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
        facilities: { 
          list: ['Dining Hall', 'Boarding Houses', 'Sports Grounds'], 
          description: 'Facilities that support a vibrant boarding community.' 
        }, 
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
      portal: { enabled: false, name: '', headline: '', description: '', url: '', loginRequirements: [], rolesSupported: [], accountCreationProcess: '', features: { dashboard: { list: [], description: '' }, learning: { list: [], description: '' }, assessments: { list: [], description: '' }, records: { list: [], accessLevel: '' }, scheduling: { list: [], description: '' }, collaboration: [] }, tools: { list: [], platforms: [] }, mobileAccess: { list: [], devices: [] }, security: [], support: { email: '', phone: '', hours: '', resources: [] }, usageGuidelines: { policy: '', rules: '', expectations: '' } }
    },
    stats: { views: 6000, applications: 200, engagementRate: 7 }
  },
  {
    id: 'inst-6',
    name: "St. Mark's High School",
    slug: 'st-marks-high',
    logo: 'https://picsum.photos/seed/stmarks/200/200',
    coverImage: 'https://picsum.photos/seed/stmarkscover/1200/400',
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
    metadata: { gender: GenderType.MIXED, isBoarding: false, feeRange: { min: 6000, max: 12000 }, establishedYear: 1950, studentCount: 900, hasStudentPortal: true },
    contact: {
      address: 'Mbabane, Eswatini',
      phone: '+268 2404 2211',
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
        overview: 'St. Mark\'s High School is a premier public school in Mbabane.',
        history: { foundingStory: { yearEstablished: 1950, founders: [], originalPurpose: '', initialStudentPopulation: '', firstCampusLocation: '' }, milestones: [], transformationNarrative: { adaptationToChange: '', technologicalUpgrades: '', communityImpact: '', alumniInfluence: '' } },
        vision: { headline: 'Excellence in all we do', supportingParagraph: '' },
        mission: { statement: 'To provide quality education for all.', description: '' },
        coreValues: [],
        leadership: { principal: { name: 'Principal', title: 'Principal' }, seniorTeam: [] },
        accreditation: { registeredWith: 'MoET', registrationNumber: '', examinationBody: 'SGCSE/A-Level', affiliations: [], awards: [] },
        statistics: { totalStudents: 900, totalStaff: 60, studentTeacherRatio: '1:15', yearsOfOperation: 73, graduationRate: '98%' },
        facilities: { overview: '', list: ['Science Labs', 'Library', 'Computer Center', 'Sports Grounds'] },
        community: { outreach: '', partnerships: '', socialResponsibility: '' },
        downloads: [],
        testimonials: []
      },
      admissions: { headline: 'Join St. Mark\'s', introduction: 'We admit students based on academic merit.', programs: [], requirements: { academic: [], documents: [], additional: [] }, processSteps: [], applicationFee: { amount: 'SZL 150', methods: [] }, processingTime: '', importantDates: [], tuitionFees: { perTerm: '', perYear: '', additional: [] }, scholarships: { types: [], eligibility: '', howToApply: '' }, faqs: [], contact: { name: '', phone: '', email: '', hours: '' }, allowOnlineApplications: false },
      academics: { overview: { headline: '', introduction: '' }, curriculum: { structure: '', examinationBody: '', description: '' }, departments: [], programs: [], calendar: { startDate: '', terms: [], examPeriods: '', holidays: '' }, assessment: { approach: '', gradingSystem: '' }, support: { services: [], description: '' }, staff: { head: { name: '', qualifications: '', experience: '' }, totalCount: 0, avgExperience: '', certifications: [] }, performance: { passRate: '98%', ranking: '', distinctions: '', awards: [] }, facilities: { description: '', list: [] }, digital: { platform: '', features: [] }, partnerships: { internships: '', collaborations: '' } },
      news: { overview: { title: '', description: '' }, posts: [], events: [], gallery: [], newsletterCta: '' },
      studentLife: { overview: { headline: '', introduction: '' }, sports: { list: [], facilities: [], description: '' }, clubs: [], arts: { activities: [], description: '' }, leadership: { opportunities: [], roles: '' }, facilities: { list: [], description: '' }, support: { services: [], description: '' }, activities: { list: [], description: '' }, community: { programs: [], description: '' } },
      portal: { enabled: true, name: 'Portal', headline: '', description: '', url: '#', loginRequirements: [], rolesSupported: [], accountCreationProcess: '', features: { dashboard: { list: [], description: '' }, learning: { list: [], description: '' }, assessments: { list: [], description: '' }, records: { list: [], accessLevel: '' }, scheduling: { list: [], description: '' }, collaboration: [] }, tools: { list: [], platforms: [] }, mobileAccess: { list: [], devices: [] }, security: [], support: { email: '', phone: '', hours: '', resources: [] }, usageGuidelines: { policy: '', rules: '', expectations: '' } }
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
      address: 'Manzini, Eswatini',
      phone: '+268 2505 2233',
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
        overview: 'Salesian High School is a Catholic boys school in Manzini.',
        history: { foundingStory: { yearEstablished: 1960, founders: [], originalPurpose: '', initialStudentPopulation: '', firstCampusLocation: '' }, milestones: [], transformationNarrative: { adaptationToChange: '', technologicalUpgrades: '', communityImpact: '', alumniInfluence: '' } },
        vision: { headline: 'Honest citizens and good Christians', supportingParagraph: '' },
        mission: { statement: 'To provide holistic education for young men.', description: '' },
        coreValues: [],
        leadership: { principal: { name: 'Principal', title: 'Principal' }, seniorTeam: [] },
        accreditation: { registeredWith: 'MoET', registrationNumber: '', examinationBody: 'SGCSE', affiliations: [], awards: [] },
        statistics: { totalStudents: 600, totalStaff: 40, studentTeacherRatio: '1:15', yearsOfOperation: 63, graduationRate: '96%' },
        facilities: { overview: '', list: ['Chapel', 'Science Labs', 'Sports Fields', 'Boarding House'] },
        community: { outreach: '', partnerships: '', socialResponsibility: '' },
        downloads: [],
        testimonials: []
      },
      admissions: { headline: 'Join Salesian', introduction: 'Admissions open for Form 1 and Form 4.', programs: [], requirements: { academic: [], documents: [], additional: [] }, processSteps: [], applicationFee: { amount: 'SZL 200', methods: [] }, processingTime: '', importantDates: [], tuitionFees: { perTerm: '', perYear: '', additional: [] }, scholarships: { types: [], eligibility: '', howToApply: '' }, faqs: [], contact: { name: '', phone: '', email: '', hours: '' }, allowOnlineApplications: false },
      academics: { overview: { headline: '', introduction: '' }, curriculum: { structure: '', examinationBody: '', description: '' }, departments: [], programs: [], calendar: { startDate: '', terms: [], examPeriods: '', holidays: '' }, assessment: { approach: '', gradingSystem: '' }, support: { services: [], description: '' }, staff: { head: { name: '', qualifications: '', experience: '' }, totalCount: 0, avgExperience: '', certifications: [] }, performance: { passRate: '96%', ranking: '', distinctions: '', awards: [] }, facilities: { description: '', list: [] }, digital: { platform: '', features: [] }, partnerships: { internships: '', collaborations: '' } },
      news: { overview: { title: '', description: '' }, posts: [], events: [], gallery: [], newsletterCta: '' },
      studentLife: { overview: { headline: '', introduction: '' }, sports: { list: [], facilities: [], description: '' }, clubs: [], arts: { activities: [], description: '' }, leadership: { opportunities: [], roles: '' }, facilities: { list: [], description: '' }, support: { services: [], description: '' }, activities: { list: [], description: '' }, community: { programs: [], description: '' } },
      portal: { enabled: false, name: '', headline: '', description: '', url: '', loginRequirements: [], rolesSupported: [], accountCreationProcess: '', features: { dashboard: { list: [], description: '' }, learning: { list: [], description: '' }, assessments: { list: [], description: '' }, records: { list: [], accessLevel: '' }, scheduling: { list: [], description: '' }, collaboration: [] }, tools: { list: [], platforms: [] }, mobileAccess: { list: [], devices: [] }, security: [], support: { email: '', phone: '', hours: '', resources: [] }, usageGuidelines: { policy: '', rules: '', expectations: '' } }
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
        history: { foundingStory: { yearEstablished: 1987, founders: [], originalPurpose: '', initialStudentPopulation: '', firstCampusLocation: '' }, milestones: [], transformationNarrative: { adaptationToChange: '', technologicalUpgrades: '', communityImpact: '', alumniInfluence: '' } },
        vision: { headline: 'A center of excellence in vocational training', supportingParagraph: '' },
        mission: { statement: 'To provide relevant technical skills.', description: '' },
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
      academics: { overview: { headline: '', introduction: '' }, curriculum: { structure: '', examinationBody: '', description: '' }, departments: [], programs: [], calendar: { startDate: '', terms: [], examPeriods: '', holidays: '' }, assessment: { approach: '', gradingSystem: '' }, support: { services: [], description: '' }, staff: { head: { name: '', qualifications: '', experience: '' }, totalCount: 0, avgExperience: '', certifications: [] }, performance: { passRate: '85%', ranking: '', distinctions: '', awards: [] }, facilities: { description: '', list: [] }, digital: { platform: '', features: [] }, partnerships: { internships: '', collaborations: '' } },
      news: { overview: { title: '', description: '' }, posts: [], events: [], gallery: [], newsletterCta: '' },
      studentLife: { overview: { headline: '', introduction: '' }, sports: { list: [], facilities: [], description: '' }, clubs: [], arts: { activities: [], description: '' }, leadership: { opportunities: [], roles: '' }, facilities: { list: [], description: '' }, support: { services: [], description: '' }, activities: { list: [], description: '' }, community: { programs: [], description: '' } },
      portal: { enabled: false, name: '', headline: '', description: '', url: '', loginRequirements: [], rolesSupported: [], accountCreationProcess: '', features: { dashboard: { list: [], description: '' }, learning: { list: [], description: '' }, assessments: { list: [], description: '' }, records: { list: [], accessLevel: '' }, scheduling: { list: [], description: '' }, collaboration: [] }, tools: { list: [], platforms: [] }, mobileAccess: { list: [], devices: [] }, security: [], support: { email: '', phone: '', hours: '', resources: [] }, usageGuidelines: { policy: '', rules: '', expectations: '' } }
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
        history: { foundingStory: { yearEstablished: 1965, founders: [], originalPurpose: '', initialStudentPopulation: '', firstCampusLocation: '' }, milestones: [], transformationNarrative: { adaptationToChange: '', technologicalUpgrades: '', communityImpact: '', alumniInfluence: '' } },
        vision: { headline: 'Academic success and spiritual growth', supportingParagraph: '' },
        mission: { statement: 'To provide quality education.', description: '' },
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
      academics: { overview: { headline: '', introduction: '' }, curriculum: { structure: '', examinationBody: '', description: '' }, departments: [], programs: [], calendar: { startDate: '', terms: [], examPeriods: '', holidays: '' }, assessment: { approach: '', gradingSystem: '' }, support: { services: [], description: '' }, staff: { head: { name: '', qualifications: '', experience: '' }, totalCount: 0, avgExperience: '', certifications: [] }, performance: { passRate: '92%', ranking: '', distinctions: '', awards: [] }, facilities: { description: '', list: [] }, digital: { platform: '', features: [] }, partnerships: { internships: '', collaborations: '' } },
      news: { overview: { title: '', description: '' }, posts: [], events: [], gallery: [], newsletterCta: '' },
      studentLife: { overview: { headline: '', introduction: '' }, sports: { list: [], facilities: [], description: '' }, clubs: [], arts: { activities: [], description: '' }, leadership: { opportunities: [], roles: '' }, facilities: { list: [], description: '' }, support: { services: [], description: '' }, activities: { list: [], description: '' }, community: { programs: [], description: '' } },
      portal: { enabled: false, name: '', headline: '', description: '', url: '', loginRequirements: [], rolesSupported: [], accountCreationProcess: '', features: { dashboard: { list: [], description: '' }, learning: { list: [], description: '' }, assessments: { list: [], description: '' }, records: { list: [], accessLevel: '' }, scheduling: { list: [], description: '' }, collaboration: [] }, tools: { list: [], platforms: [] }, mobileAccess: { list: [], devices: [] }, security: [], support: { email: '', phone: '', hours: '', resources: [] }, usageGuidelines: { policy: '', rules: '', expectations: '' } }
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
        history: { foundingStory: { yearEstablished: 1982, founders: [], originalPurpose: '', initialStudentPopulation: '', firstCampusLocation: '' }, milestones: [], transformationNarrative: { adaptationToChange: '', technologicalUpgrades: '', communityImpact: '', alumniInfluence: '' } },
        vision: { headline: 'Excellence in teacher education', supportingParagraph: '' },
        mission: { statement: 'To produce competent primary school teachers.', description: '' },
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
      academics: { overview: { headline: '', introduction: '' }, curriculum: { structure: '', examinationBody: '', description: '' }, departments: [], programs: [], calendar: { startDate: '', terms: [], examPeriods: '', holidays: '' }, assessment: { approach: '', gradingSystem: '' }, support: { services: [], description: '' }, staff: { head: { name: '', qualifications: '', experience: '' }, totalCount: 0, avgExperience: '', certifications: [] }, performance: { passRate: '95%', ranking: '', distinctions: '', awards: [] }, facilities: { description: '', list: [] }, digital: { platform: '', features: [] }, partnerships: { internships: '', collaborations: '' } },
      news: { overview: { title: '', description: '' }, posts: [], events: [], gallery: [], newsletterCta: '' },
      studentLife: { overview: { headline: '', introduction: '' }, sports: { list: [], facilities: [], description: '' }, clubs: [], arts: { activities: [], description: '' }, leadership: { opportunities: [], roles: '' }, facilities: { list: [], description: '' }, support: { services: [], description: '' }, activities: { list: [], description: '' }, community: { programs: [], description: '' } },
      portal: { enabled: true, name: 'Student Portal', headline: '', description: '', url: '#', loginRequirements: [], rolesSupported: [], accountCreationProcess: '', features: { dashboard: { list: [], description: '' }, learning: { list: [], description: '' }, assessments: { list: [], description: '' }, records: { list: [], accessLevel: '' }, scheduling: { list: [], description: '' }, collaboration: [] }, tools: { list: [], platforms: [] }, mobileAccess: { list: [], devices: [] }, security: [], support: { email: '', phone: '', hours: '', resources: [] }, usageGuidelines: { policy: '', rules: '', expectations: '' } }
    },
    stats: { views: 6000, applications: 300, engagementRate: 8 }
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
    plan: SubscriptionPlan.PRO,
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
          text: 'SNAT stands as the bulwark of teacher rights and professional excellence in our Kingdom. We welcome all educators to join our mission.',
          name: 'Secretary General'
        },
        quickLinks: [],
        announcements: []
      },
      about: {
        overview: 'The Swaziland National Association of Teachers (SNAT) is the premier professional organization for educators in the Kingdom of Eswatini.',
        history: { foundingStory: { yearEstablished: 1928, founders: [], originalPurpose: '', initialStudentPopulation: '', firstCampusLocation: '' }, milestones: [], transformationNarrative: { adaptationToChange: '', technologicalUpgrades: '', communityImpact: '', alumniInfluence: '' } },
        vision: { headline: 'A unified and empowered teaching force.', supportingParagraph: '' },
        mission: { statement: 'To promote the professional, social, and economic interests of teachers.', description: '' },
        coreValues: [],
        leadership: { principal: { name: 'SNAT President', title: 'President' }, seniorTeam: [] },
        accreditation: { registeredWith: 'Eswatini Government', registrationNumber: 'SNAT-1928', examinationBody: 'None', affiliations: [], awards: [] },
        statistics: { totalStudents: 15000, totalStaff: 50, studentTeacherRatio: 'N/A', yearsOfOperation: 96, graduationRate: 'N/A' },
        facilities: { overview: 'SNAT Headquarters & Regional Centres', list: ['Library', 'Conference Halls', 'Legal Aid Office'] },
        community: { outreach: '', partnerships: '', socialResponsibility: '' },
        downloads: [],
        testimonials: []
      },
      admissions: { 
        headline: 'Join SNAT', 
        introduction: 'Become a member of the largest professional body in Eswatini.', 
        programs: [],
        requirements: { academic: ['Teaching Qualification'], documents: ['TSC Number', 'ID Copy'], additional: [] },
        processSteps: [{ step: 'Registration', instruction: 'Fill the form at any office' }],
        applicationFee: { amount: '0', methods: [] },
        processingTime: 'Instant',
        importantDates: [],
        tuitionFees: { perTerm: '1% of Basic Salary', perYear: '', additional: [] },
        scholarships: { types: [], eligibility: '', howToApply: '' },
        faqs: [],
        contact: { name: 'Membership Office', phone: '+268 2505 2841', email: 'membership@snat.org.sz', hours: 'Mon-Fri' },
        allowOnlineApplications: true 
      },
      academics: { 
        overview: { headline: 'Professional Development & Advocacy', introduction: 'Resources for the modern Eswatini educator.' },
        curriculum: { structure: '', examinationBody: '', description: '' },
        departments: [],
        programs: [
          { id: 'snat-pd-1', name: 'Workplace Rights Seminar', qualification: 'Professional Credits', duration: '2 Days', description: 'Understanding the Employment Act and TSC regulations.', subjects: [], requirements: 'SNAT Member' }
        ],
        calendar: { startDate: '', terms: [], examPeriods: '', holidays: '' },
        assessment: { approach: '', gradingSystem: '' },
        support: { services: ['Legal Aid', 'Psychosocial Support', 'Credit Union Access'], description: 'Comprehensive support for members.' },
        staff: { head: { name: '', qualifications: '', experience: '' }, totalCount: 0, avgExperience: '', certifications: [] },
        performance: { passRate: 'N/A', ranking: '', distinctions: '', awards: [] },
        facilities: { description: '', list: [] },
        digital: { platform: '', features: [] },
        partnerships: { internships: '', collaborations: '' }
      },
      news: { overview: { title: 'SNAT Bulletins', description: 'Stay informed on union activities.' }, posts: [], events: [], gallery: [], newsletterCta: '' },
      studentLife: { overview: { headline: '', introduction: '' }, sports: { list: [], facilities: [], description: '' }, clubs: [], arts: { activities: [], description: '' }, leadership: { opportunities: [], roles: '' }, facilities: { list: [], description: '' }, support: { services: [], description: '' }, activities: { list: [], description: '' }, community: { programs: [], description: '' } },
      portal: { enabled: true, name: 'SNAT Portal', headline: '', description: '', url: '#', loginRequirements: [], rolesSupported: [], accountCreationProcess: '', features: { dashboard: { list: [], description: '' }, learning: { list: [], description: '' }, assessments: { list: [], description: '' }, records: { list: [], accessLevel: '' }, scheduling: { list: [], description: '' }, collaboration: [] }, tools: { list: [], platforms: [] }, mobileAccess: { list: [], devices: [] }, security: [], support: { email: '', phone: '', hours: '', resources: [] }, usageGuidelines: { policy: '', rules: '', expectations: '' } }
    },
    stats: { views: 25000, applications: 450, engagementRate: 25 }
  }
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
