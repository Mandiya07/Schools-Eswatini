
import React, { useState, useEffect, ErrorInfo, ReactNode } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { User, Institution, Region, UserRole } from './types';
import { MOCK_INSTITUTIONS } from './mockData';
import { auth, db, onAuthStateChanged, onSnapshot, collection, doc, getDoc, setDoc, deleteDoc, getDocs, query, OperationType, handleFirestoreError } from './src/lib/firebase';
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

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AccessibilityToolbar from './components/AccessibilityToolbar';
import SchoolComparison from './src/components/SchoolComparison';
import { WorkflowProvider } from './src/context/WorkflowContext';

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

  useEffect(() => {
    // Attempt to request PWA push notification permission
    requestNotificationPermission();

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
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
    // Development bypass check
    const isDevAdmin = localStorage.getItem('se_dev_admin') === 'true';
    if (isDevAdmin) {
      setUser({
        id: 'dev-admin',
        email: 'siphom.yati@gmail.com',
        name: 'Dev Super Admin',
        role: UserRole.SUPER_ADMIN,
        isVerified: true,
        twoFactorEnabled: true
      });
      setIsAuthReady(true);
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          let currentUser: User;

          if (userDoc.exists()) {
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
          } else if (firebaseUser.email?.toLowerCase().endsWith('@moet.gov.sz')) {
            updatedRole = UserRole.MOET_OFFICIAL;
          } else {
            // Institutional Check: Only overwrite if they don't have a high-privilege role 
            // or if we find a specific matching institutional record.
            const instQuery = query(collection(db, 'institutions'));
            const instSnapshot = await getDocs(instQuery);
            
            let foundInstitutionalRole = false;
            const userEmail = firebaseUser.email?.toLowerCase();

            for (const instDoc of instSnapshot.docs) {
              const data = instDoc.data() as Institution;
              
              // Check if Institution Admin
              if (data.contact?.email?.toLowerCase() === userEmail || data.adminId === firebaseUser.uid) {
                updatedRole = UserRole.INSTITUTION_ADMIN;
                currentUser.institutionId = data.id;
                foundInstitutionalRole = true;
                break;
              }
              
              // Check if Teacher assigned by Institution
              const isInstitutionalTeacher = 
                data.teacherEmails?.some(email => email.toLowerCase() === userEmail) ||
                data.administrativeDetails?.staffManagement?.members?.some((m: any) => m.email?.toLowerCase() === userEmail);

              if (isInstitutionalTeacher) {
                updatedRole = UserRole.TEACHER;
                currentUser.institutionId = data.id;
                foundInstitutionalRole = true;
                break;
              }
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
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, `users/${firebaseUser.uid}`);
        }
      } else {
        setUser(null);
      }
      setIsAuthReady(true);
    });

    return () => unsubscribe();
  }, []);

  // Firestore Institutions Listener
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'institutions'), 
      (snapshot) => {
        const instList = snapshot.docs.map(doc => doc.data() as Institution);
        if (instList.length === 0) {
          // Seed with mock data if empty (for demo purposes)
          setInstitutions(MOCK_INSTITUTIONS);
        } else {
          setInstitutions(instList);
        }
        setLoading(false);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, 'institutions');
      }
    );

    return () => unsubscribe();
  }, []);

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
            <Route path="/ai-tutor" element={<AIStudyAssistant user={user} />} />
            <Route path="/student" element={<StudentDashboard user={user} />} />
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
                !user ? <Navigate to="/auth" /> : <ParentPortal user={user} />
              } 
            />
            <Route path="/auth" element={user ? <Navigate to="/dashboard" /> : <AuthPage />} />
            
            <Route 
              path="/dashboard" 
              element={
                !user ? <Navigate to="/auth" /> : 
                user.role === UserRole.SUPER_ADMIN ? 
                  <SuperAdminDashboard 
                    institutions={institutions} 
                    onUpdate={updateInstitution} 
                    onDelete={deleteInstitution} 
                    onSeed={seedDatabase}
                    onAdd={addInstitution}
                  /> : 
                user.role === UserRole.INSTITUTION_ADMIN ?
                  <InstitutionAdminDashboard 
                    user={user} 
                    institutions={institutions} 
                    onUpdate={updateInstitution} 
                    onAdd={addInstitution}
                  /> :
                user.role === UserRole.TEACHER ?
                  <Navigate to="/teacher/dashboard" /> :
                  <Navigate to="/portal" />
              } 
            />

            <Route 
              path="/teacher/dashboard" 
              element={
                !user || user.role !== UserRole.TEACHER ? 
                  <Navigate to="/auth" /> : 
                  <TeacherDashboard user={user} />
              } 
            />

            <Route path="/marketplace" element={<EducatorMarketplace />} />
            <Route path="/tutors" element={<TutoringMarketplace />} />

            <Route 
              path="/ministry" 
              element={
                !user || (user.role !== UserRole.MOET_OFFICIAL && user.role !== UserRole.SUPER_ADMIN) ? 
                  <Navigate to="/auth" /> : 
                  <MinistryPortal />
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

        {isOffline && (
          <div className="fixed bottom-0 left-0 right-0 bg-rose-600 text-white text-center py-2 px-4 shadow-lg z-[100] animate-in slide-in-from-bottom-2 flex items-center justify-center gap-3">
            <span className="w-2 h-2 bg-rose-300 rounded-full animate-pulse"></span>
            <p className="text-[10px] font-black uppercase tracking-widest">You are currently offline. Pages and data may be cached for offline use.</p>
          </div>
        )}
      </div>
    </WorkflowProvider>
  );
};

export default App;