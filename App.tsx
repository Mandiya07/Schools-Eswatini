
import React, { useState, useEffect, ErrorInfo, ReactNode } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { User, Institution, Region, UserRole, InstitutionType, GenderType } from './types';
import { MOCK_INSTITUTIONS } from './mockData';
import { auth, db, onAuthStateChanged, onSnapshot, collection, doc, getDoc, setDoc, deleteDoc, getDocs, query, where, OperationType, handleFirestoreError, getDocWithRetry, getDocsWithRetry, isOffline as checkFirebaseOffline } from './src/lib/firebase';
import { logActivity, ActivityType } from './src/services/securityService';
import { requestNotificationPermission } from './src/lib/pwa';

// Pages
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import { 
  InstitutionLayout,
  InstitutionHome,
  InstitutionAbout,
  InstitutionAdmissions,
  InstitutionAcademics,
  InstitutionNews,
  InstitutionStudentLife,
  InstitutionReviews,
  InstitutionAlumni,
  InstitutionPortal,
  InstitutionMinistry,
  InstitutionContact
} from './pages/InstitutionPage';
import AuthPage from './pages/AuthPage';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import InstitutionAdminDashboard from './pages/InstitutionAdminDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import ComparePage from './pages/ComparePage';
import ScholarshipHub from './pages/ScholarshipHub';
import AcademicHub from './pages/AcademicHub';
import CommunityHub from './pages/CommunityHub';
import StudentDashboard from './pages/StudentDashboard';
import GovernancePage from './pages/GovernancePage';
import ParentPortal from './pages/ParentPortal';
import MinistryPortal from './pages/MinistryPortal';
import TutoringMarketplace from './pages/TutoringMarketplace';
import MinistryCorner from './pages/MinistryCorner';
import AIStudyAssistant from './pages/AIStudyAssistant';
import EducatorMarketplace from './pages/EducatorMarketplace';
import Advertising from './pages/Advertising';
import PaymentCheckoutPage from './pages/PaymentCheckoutPage';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import VirtualClassroom from './pages/VirtualClassroom';
import SecurityLogsPage from './pages/SecurityLogsPage';
import PricingPage from './pages/PricingPage';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AccessibilityToolbar from './components/AccessibilityToolbar';
import SchoolComparison from './src/components/SchoolComparison';
import { WorkflowProvider } from './src/context/WorkflowContext';
import { RoleGuard } from './src/components/RoleGuard';

const App: React.FC = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedRegion, setSelectedRegion] = useState<Region | null>(() => {
    const saved = localStorage.getItem('se_region');
    return saved ? (saved as Region) : null;
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('se_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [compareList, setCompareList] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const compareSchools = institutions.filter(i => compareList.includes(i.id));

  // Accessibility State
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [lang, setLang] = useState<'en' | 'ss'>('en');
  const [isLowDataMode, setIsLowDataMode] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [isFirebaseOffline, setIsFirebaseOffline] = useState(false);

  useEffect(() => {
    // Attempt to request PWA push notification permission
    requestNotificationPermission();

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Poll for Firestore connection status
    const interval = setInterval(() => {
      setIsFirebaseOffline(checkFirebaseOffline());
    }, 5000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (isLowDataMode) {
      document.body.classList.add('low-data-mode');
    } else {
      document.body.classList.remove('low-data-mode');
    }
  }, [isLowDataMode]);

  // Firebase Auth Listener
  useEffect(() => {
    // Safety timeout for loading state
    const safetyTimeout = setTimeout(() => {
      if (!isAuthReady) {
        console.warn("Auth initialization taking too long. Forcing ready state (possibly offline).");
        setIsAuthReady(true);
        setLoading(false);
      }
    }, 15000); // 15 seconds max wait

    // Development bypass check
    const isDevAdmin = localStorage.getItem('se_dev_admin') === 'true';
    const isDevTeacher = localStorage.getItem('se_dev_teacher') === 'true';
    
    if (isDevAdmin) {
      setUser({
        id: 'dev-admin',
        email: 'siphom.yati@gmail.com',
        name: 'Sipho Mati (Govt. Official)',
        role: UserRole.SUPER_ADMIN,
        institutionId: 'inst-1',
        isVerified: true,
        twoFactorEnabled: true
      });
      setIsAuthReady(true);
      setLoading(false);
      clearTimeout(safetyTimeout);
      return;
    }

    if (isDevTeacher) {
      setUser({
        id: 'dev-teacher',
        email: 'teacher@stmarks.sz',
        name: 'Mr. Simelane (Teacher)',
        role: UserRole.TEACHER,
        institutionId: 'inst-3', // St. Marks High School
        isVerified: true,
        twoFactorEnabled: false
      });
      setIsAuthReady(true);
      setLoading(false);
      clearTimeout(safetyTimeout);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDocWithRetry(doc(db, 'users', firebaseUser.uid));
          let currentUser: User;

          if (userDoc && userDoc.exists()) {
            currentUser = userDoc.data() as User;
            logActivity(ActivityType.LOGIN, `User logged in: ${firebaseUser.email}`);
          } else {
            // Create new user profile if it doesn't exist
            currentUser = {
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              name: firebaseUser.displayName || 'User',
              role: UserRole.VISITOR,
              isVerified: firebaseUser.emailVerified,
              twoFactorEnabled: false
            };
            logActivity(ActivityType.LOGIN, `New user registered: ${firebaseUser.email}`);
          }

          let updatedRole = currentUser.role;

          // Role assignment and verification logic
          if (firebaseUser.email?.toLowerCase() === 'siphom.yati@gmail.com') {
            updatedRole = UserRole.SUPER_ADMIN;
            currentUser.institutionId = 'inst-1'; // Use hyphen to match mock data
          } else if (firebaseUser.email?.toLowerCase().endsWith('@moet.gov.sz')) {
            updatedRole = UserRole.MOET_OFFICIAL;
          } else {
            // Targeted Institutional Check: Use specific queries instead of listing ALL institutions
            // which causes security permission errors and performance issues.
            const userEmail = firebaseUser.email?.toLowerCase();
            
            // 1. Check if they are the adminId
            const adminQuery = query(collection(db, 'institutions'), where('adminId', '==', firebaseUser.uid));
            // 2. Check if they are in teacherEmails array
            const teacherQuery = query(collection(db, 'institutions'), where('teacherEmails', 'array-contains', userEmail));

            const [adminSnap, teacherSnap] = await Promise.all([
              getDocsWithRetry(adminQuery),
              getDocsWithRetry(teacherQuery)
            ]);
            
            let foundInstitutionalRole = false;

            if (!adminSnap.empty) {
              const data = adminSnap.docs[0].data() as Institution;
              updatedRole = UserRole.INSTITUTION_ADMIN;
              currentUser.institutionId = data.id;
              foundInstitutionalRole = true;
            } else if (!teacherSnap.empty) {
              const data = teacherSnap.docs[0].data() as Institution;
              updatedRole = UserRole.TEACHER;
              currentUser.institutionId = data.id;
              foundInstitutionalRole = true;
            }

            // If no institutional role found, keep their registered role (Parent or Independent Teacher)
            if (!foundInstitutionalRole) {
              // Independent Teacher is still a TEACHER role, just without an institutionId
              // Parent is already set during registration
            }
          }

          if (updatedRole !== currentUser.role) {
            currentUser.role = updatedRole;
            await setDoc(doc(db, 'users', firebaseUser.uid), currentUser, { merge: true });
          } else if (!userDoc.exists()) {
            await setDoc(doc(db, 'users', firebaseUser.uid), currentUser);
          }

          setUser(currentUser);
        } catch (error: any) {
          if (error instanceof Error && !error.message.includes('offline')) {
            handleFirestoreError(error, OperationType.GET, `users/${firebaseUser.uid}`);
          } else {
            console.warn("Auth initialization fetch failed (offline). Using default profile.");
            setUser({
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              name: firebaseUser.displayName || 'User (Offline)',
              role: UserRole.VISITOR,
              isVerified: firebaseUser.emailVerified,
              twoFactorEnabled: false
            });
          }
        }
      } else {
        setUser(null);
      }
      setIsAuthReady(true);
      clearTimeout(safetyTimeout);
    });

    return () => {
      unsubscribe();
      clearTimeout(safetyTimeout);
    };
  }, []);

  // Firestore Institutions Listener
  useEffect(() => {
    if (!isAuthReady) return;
    
    setLoading(true);

    const isSuperAdmin = user?.role === UserRole.SUPER_ADMIN || user?.email?.toLowerCase() === 'siphom.yati@gmail.com';
    
    // Determine the base query. 
    // Public/Visitors only see 'published' ones.
    // Super Admins see everything.
    // Targeted: regular users only shouldn't even attempt to list 'pending' ones unless they own them.
    // For simplicity of the global list, we'll keep it to 'published' for non-admins.
    
    let q;
    if (isSuperAdmin) {
      q = collection(db, 'institutions');
    } else {
      q = query(collection(db, 'institutions'), where('status', '==', 'published'));
    }

    const unsubscribe = onSnapshot(q, 
      (snapshot: any) => {
        let instList = snapshot.docs.map((doc: any) => {
          const data = doc.data();
          const id = doc.id;
          const inst = { id, ...data };
          
          const sections = inst.sections || {};
          
          if (sections.about) {
            if (typeof sections.about.overview === 'object' && sections.about.overview !== null) {
              sections.about.overview = sections.about.overview.description || sections.about.overview.title || '';
            }
          }
          
          const mockMatch = MOCK_INSTITUTIONS.find((m: any) => m.id === id || m.slug === inst.slug);
          if (mockMatch) {
            // Merge missing root properties from mockMatch
            for (const prop of ['region', 'type', 'curriculum', 'admission', 'details', 'logo', 'coverImage', 'metadata', 'contact', 'plan', 'isVerified', 'isAccredited']) {
              if (inst[prop] === undefined && (mockMatch as any)[prop] !== undefined) {
                (inst as any)[prop] = JSON.parse(JSON.stringify((mockMatch as any)[prop]));
              }
            }
            // Merge sections
            for (const key of ['about', 'news', 'studentLife', 'academics', 'homepage']) {
              if (!sections[key] && (mockMatch.sections as any)[key]) {
                sections[key] = JSON.parse(JSON.stringify((mockMatch.sections as any)[key]));
              }
            }
          }

          // Ensure base properties exist so they never crash or fail filters
          if (!inst.region) inst.region = Region.HHOHHO;
          if (!inst.type) inst.type = [InstitutionType.HIGH_SCHOOL, InstitutionType.PUBLIC];
          if (!inst.metadata) {
            inst.metadata = {
              gender: GenderType.MIXED,
              isBoarding: false,
              feeRange: { min: 3000, max: 8000 },
              establishedYear: new Date().getFullYear(),
              studentCount: 0,
              hasStudentPortal: false
            };
          }
          if (!inst.contact) {
            inst.contact = {
              address: 'Eswatini',
              phone: '+268 2505 2000',
              email: 'info@schoolseswatini.sz',
              officeHours: 'Mon - Fri: 08:00 - 16:30',
              googleMapsUrl: '',
              headline: inst.details || '',
              introduction: inst.details || '',
              departments: [],
              faqs: []
            };
          }
          
          inst.sections = sections;
          return inst as Institution;
        });

        const mergedList = [...instList];
        for (const mockInst of MOCK_INSTITUTIONS) {
          const exists = mergedList.some(i => i.id === mockInst.id || (mockInst.slug && i.slug === mockInst.slug));
          if (!exists) {
            if (isSuperAdmin || mockInst.status === 'published') {
              mergedList.push(mockInst);
            }
          }
        }
        setInstitutions(mergedList);
        setLoading(false);
      },
        (error: any) => {
          console.warn("Institutions snapshot error:", error.message);
          const isPermissionError = error.message.includes('permission') || error.message.includes('insufficient permissions');
          
          if (isPermissionError) {
             console.info("Institutions access restricted (possibly not logged in as admin). Using mocks for public view.");
          }
          
          setInstitutions(MOCK_INSTITUTIONS);
          setLoading(false);
        }
    );

    return () => unsubscribe();
  }, [isAuthReady, user?.id, user?.role]);

  useEffect(() => {
    localStorage.setItem('se_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (selectedRegion) {
      localStorage.setItem('se_region', selectedRegion);
    }
  }, [selectedRegion]);

  const handleLogout = async () => {
    try {
      const email = user?.email;
      localStorage.removeItem('se_dev_admin');
      await auth.signOut();
      setUser(null);
      logActivity(ActivityType.LOGOUT, `User logged out: ${email}`);
      navigate('/');
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  const updateInstitution = async (updated: Institution) => {
    try {
      await setDoc(doc(db, 'institutions', updated.id), updated);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `institutions/${updated.id}`);
    }
  };

  const addInstitution = async (newInst: Institution) => {
    try {
      await setDoc(doc(db, 'institutions', newInst.id), newInst);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `institutions/${newInst.id}`);
    }
  };

  const deleteInstitution = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'institutions', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `institutions/${id}`);
    }
  };

  const seedDatabase = async () => {
    try {
      for (const inst of MOCK_INSTITUTIONS) {
        await setDoc(doc(db, 'institutions', inst.id), inst);
      }
      alert("Database seeded successfully! All mock institutions have been added to Firestore.");
      console.log("Database seeded successfully!");
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'institutions');
    }
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const toggleCompare = (id: string) => {
    setCompareList(prev => {
      if (prev.includes(id)) return prev.filter(i => i !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  if (!isAuthReady || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium animate-pulse">Loading Schools Eswatini...</p>
        </div>
      </div>
    );
  }

  return (
    <WorkflowProvider>
      <div className={`min-h-screen flex flex-col transition-all duration-300 ${isHighContrast ? 'bg-black text-amber-400 grayscale contrast-150' : 'bg-slate-50 text-slate-900'}`} style={{ fontSize: `${fontSize}px` }}>
        <AccessibilityToolbar 
          isHighContrast={isHighContrast} 
          onToggleContrast={() => setIsHighContrast(!isHighContrast)} 
          fontSize={fontSize} 
          onSetFontSize={setFontSize} 
          lang={lang} 
          onToggleLang={() => setLang(lang === 'en' ? 'ss' : 'en')}
          isLowDataMode={isLowDataMode}
          onToggleLowData={() => setIsLowDataMode(!isLowDataMode)}
        />
        <Navbar user={user} onLogout={handleLogout} compareCount={compareList.length} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage institutions={institutions} onSelectRegion={setSelectedRegion} lang={lang} compareList={compareList} onToggleCompare={toggleCompare} />} />
            <Route 
              path="/browse" 
              element={
                <BrowsePage 
                  institutions={institutions} 
                  region={selectedRegion} 
                  onSelectRegion={setSelectedRegion} 
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                  compareList={compareList}
                  onToggleCompare={toggleCompare}
                  lang={lang}
                />
              } 
            />
            <Route 
              path="/compare" 
              element={<ComparePage institutions={institutions} compareList={compareList} onRemove={toggleCompare} />} 
            />
            <Route 
              path="/scholarships" 
              element={<ScholarshipHub institutions={institutions} />} 
            />
            <Route path="/resources" element={<AcademicHub />} />
            <Route path="/campus-life" element={<CommunityHub />} />
            <Route path="/governance" element={<GovernancePage />} />
            <Route path="/ministry-corner" element={<MinistryCorner />} />
            <Route path="/ai-tutor" element={
              <RoleGuard user={user} redirectTo="/auth">
                <AIStudyAssistant user={user!} />
              </RoleGuard>
            } />
            <Route path="/student" element={
              <RoleGuard user={user} allowedRoles={[UserRole.STUDENT, UserRole.SUPER_ADMIN]} redirectTo="/auth">
                <StudentDashboard user={user!} />
              </RoleGuard>
            } />
            <Route 
              path="/school/:slug" 
              element={
                <InstitutionLayout 
                  institutions={institutions} 
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                  lang={lang}
                  loading={loading}
                />
              }
            >
              <Route index element={<InstitutionHome />} />
              <Route path="about" element={<InstitutionAbout />} />
              <Route path="admissions" element={<InstitutionAdmissions />} />
              <Route path="academics" element={<InstitutionAcademics />} />
              <Route path="news" element={<InstitutionNews />} />
              <Route path="studentLife" element={<InstitutionStudentLife />} />
              <Route path="reviews" element={<InstitutionReviews />} />
              <Route path="alumni" element={<InstitutionAlumni />} />
              <Route path="portal" element={<InstitutionPortal />} />
              <Route path="ministry" element={<InstitutionMinistry />} />
              <Route path="contact" element={<InstitutionContact />} />
            </Route>
            <Route 
              path="/portal" 
              element={
                <RoleGuard user={user} redirectTo="/auth">
                  {user?.role === UserRole.TEACHER ? <Navigate to="/teacher/dashboard" /> : <ParentPortal user={user!} />}
                </RoleGuard>
              } 
            />
            <Route path="/auth" element={user ? <Navigate to="/dashboard" /> : <AuthPage />} />
            
            <Route 
              path="/dashboard" 
              element={
                <RoleGuard user={user} redirectTo="/auth">
                  {user?.role === UserRole.SUPER_ADMIN ? (
                    <SuperAdminDashboard 
                      user={user!}
                      institutions={institutions} 
                      onUpdate={updateInstitution} 
                      onDelete={deleteInstitution} 
                      onSeed={seedDatabase}
                      onAdd={addInstitution}
                    />
                  ) : user?.role === UserRole.INSTITUTION_ADMIN ? (
                    <InstitutionAdminDashboard 
                      user={user!} 
                      institutions={institutions} 
                      onUpdate={updateInstitution} 
                      onAdd={addInstitution}
                    />
                  ) : user?.role === UserRole.TEACHER ? (
                    <Navigate to="/teacher/dashboard" />
                  ) : user?.role === UserRole.MOET_OFFICIAL ? (
                    <Navigate to="/ministry" />
                  ) : (
                    <Navigate to="/portal" />
                  )}
                </RoleGuard>
              } 
            />

            <Route path="/pricing" element={<PricingPage user={user} />} />

            <Route 
              path="/teacher/dashboard" 
              element={
                <RoleGuard 
                  user={user} 
                  allowedRoles={[UserRole.TEACHER, UserRole.SUPER_ADMIN, UserRole.INSTITUTION_ADMIN]} 
                  redirectTo="/auth"
                >
                  <TeacherDashboard user={user!} />
                </RoleGuard>
              } 
            />

            <Route path="/marketplace" element={<EducatorMarketplace />} />
            <Route path="/advertising" element={<Advertising />} />
            <Route path="/tutors" element={<TutoringMarketplace />} />
            <Route path="/classroom" element={<VirtualClassroom />} />
            <Route path="/payment-checkout" element={<PaymentCheckoutPage />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />

            <Route 
              path="/ministry" 
              element={
                <RoleGuard user={user} allowedRoles={[UserRole.MOET_OFFICIAL, UserRole.SUPER_ADMIN]} redirectTo="/auth">
                  <MinistryPortal user={user!} institutions={institutions} />
                </RoleGuard>
              } 
            />

            <Route 
              path="/security" 
              element={
                <RoleGuard user={user} allowedRoles={UserRole.SUPER_ADMIN} redirectTo="/dashboard">
                  <SecurityLogsPage />
                </RoleGuard>
              } 
            />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <Footer />
        
        {compareList.length > 0 && (
          <div className="fixed bottom-8 right-8 z-[60] animate-in slide-in-from-bottom-4 flex flex-col items-end gap-4">
            <button 
              onClick={() => setShowComparison(true)}
              className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl flex items-center gap-4 hover:bg-indigo-700 transition-all"
            >
              Compare Schools ({compareList.length}/3)
              <span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">→</span>
            </button>
            <button 
              onClick={() => navigate('/compare')}
              className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl flex items-center gap-4 hover:bg-blue-600 transition-all"
            >
              Full Comparison Page
            </button>
          </div>
        )}

        {showComparison && (
          <SchoolComparison 
            schools={compareSchools} 
            onRemove={toggleCompare} 
            onClose={() => setShowComparison(false)} 
          />
        )}

        {(isOffline || isFirebaseOffline) && (
          <div className="fixed bottom-6 right-6 z-[100] animate-in slide-in-from-right-2">
            <div className={`px-4 py-2 rounded-full shadow-lg flex items-center gap-3 backdrop-blur-md border ${
              isOffline ? 'bg-slate-900/90 text-white border-white/10' : 'bg-amber-100/90 text-amber-900 border-amber-200'
            }`}>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full animate-pulse ${isOffline ? 'bg-rose-500' : 'bg-amber-500'}`}></span>
                <span className="text-[10px] font-black uppercase tracking-widest">
                  {isOffline ? "You are Offline" : (isFirebaseOffline ? "Local Mode" : "Connected")}
                </span>
              </div>
              
              <div className="h-4 w-px bg-current/20"></div>
              
              <p className="text-[9px] font-medium opacity-80">
                {isFirebaseOffline && !isOffline ? 
                  "Using local cache while database reconnects" : 
                  "Pages are cached for offline use"}
              </p>

              {isFirebaseOffline && !isOffline && (
                <button 
                  onClick={() => window.location.reload()}
                  className="px-2 py-0.5 bg-amber-200/50 hover:bg-amber-300/50 rounded text-[8px] font-bold transition-all ml-1"
                >
                  Retry
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </WorkflowProvider>
  );
};

export default App;