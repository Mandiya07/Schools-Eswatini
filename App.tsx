
import React, { useState, useEffect, ErrorInfo, ReactNode } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { User, Institution, Region, UserRole } from './types';
import { MOCK_INSTITUTIONS } from './mockData';
import { auth, db, onAuthStateChanged, onSnapshot, collection, doc, getDoc, setDoc, deleteDoc, getDocs, query, OperationType, handleFirestoreError } from './src/lib/firebase';
import { logActivity, ActivityType } from './src/services/securityService';

// Pages
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import InstitutionProfile from './pages/InstitutionProfile';
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

  useEffect(() => {
    if (isLowDataMode) {
      document.body.classList.add('low-data-mode');
    } else {
      document.body.classList.remove('low-data-mode');
    }
  }, [isLowDataMode]);

  // Firebase Auth Listener
  useEffect(() => {
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

          // Role assignment logic
          if (firebaseUser.email?.toLowerCase() === 'siphom.yati@gmail.com') {
            updatedRole = UserRole.SUPER_ADMIN;
          } else if (updatedRole !== UserRole.SUPER_ADMIN) {
            const instQuery = query(collection(db, 'institutions'));
            const instSnapshot = await getDocs(instQuery);
            
            let foundInstitutionalRole = false;

            for (const instDoc of instSnapshot.docs) {
              const data = instDoc.data() as Institution;
              const userEmail = firebaseUser.email?.toLowerCase();
              
              // Check if Institution Admin
              if (data.contact?.email?.toLowerCase() === userEmail || data.adminId === firebaseUser.uid) {
                updatedRole = UserRole.INSTITUTION_ADMIN;
                currentUser.institutionId = data.id;
                foundInstitutionalRole = true;
                break;
              }
              
              // Check if Teacher
              if (data.teacherEmails?.some(email => email.toLowerCase() === userEmail)) {
                updatedRole = UserRole.TEACHER;
                currentUser.institutionId = data.id;
                foundInstitutionalRole = true;
                break;
              }
            }

            if (!foundInstitutionalRole && updatedRole !== UserRole.PARENT) {
               // Default visitor logic if no institutional role found
               // (Except if they are already a parent, which we keep)
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
            <Route path="/student" element={<StudentDashboard user={user} />} />
            <Route 
              path="/school/:slug" 
              element={
                <InstitutionProfile 
                  institutions={institutions} 
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                  lang={lang}
                />
              } 
            />
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
      </div>
    </WorkflowProvider>
  );
};

export default App;