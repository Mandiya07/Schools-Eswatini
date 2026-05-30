import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { User, UserRole } from '../types';
import { auth, googleProvider, signInWithPopup, db, doc, setDoc, getDocWithRetry } from '../src/lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Mail, Lock, User as UserIcon, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';

const AuthPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.VISITOR);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'register') setActiveTab('register');
    
    const plan = searchParams.get('plan');
    if (plan) {
      setSelectedRole(UserRole.INSTITUTION_ADMIN);
    }
    
    // Pre-fill email from URL if present
    const emailParam = searchParams.get('email');
    if (emailParam) setEmail(emailParam);
  }, [searchParams]);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please provide a valid email and password');
      return;
    }

    if (activeTab === 'register' && !name) {
      setError('Please provide your full name');
      return;
    }

    setLoading(true);
    try {
      if (activeTab === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser = result.user;
        
        await updateProfile(firebaseUser, { displayName: name });

        // Create user profile in Firestore
        const newUser: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: name,
          role: selectedRole,
          isVerified: false,
          twoFactorEnabled: false,
          aiCredits: 3,
          isAiPro: false
        };
        await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
      }
      navigate('/dashboard');
    } catch (err: any) {
      console.error("Auth error", err);
      let message = 'Authentication failed';
      if (err.code === 'auth/user-not-found') message = 'User not found';
      else if (err.code === 'auth/wrong-password') message = 'Incorrect password';
      else if (err.code === 'auth/email-already-in-use') message = 'Email already in use';
      else if (err.code === 'auth/weak-password') message = 'Password is too weak';
      else if (err.code === 'auth/invalid-email') message = 'Invalid email address';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;
      
      const userDoc = await getDocWithRetry(doc(db, 'users', firebaseUser.uid));
      if (!userDoc || !userDoc.exists()) {
        const newUser: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || 'User',
          role: activeTab === 'register' ? selectedRole : UserRole.VISITOR,
          isVerified: firebaseUser.emailVerified,
          twoFactorEnabled: false,
          aiCredits: 3,
          isAiPro: false
        };
        await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
      }
      navigate('/dashboard');
    } catch (err: any) {
      console.error("Login error", err);
      setError(err.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-600 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-600 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-xl w-full space-y-8 bg-white p-8 md:p-12 rounded-[40px] shadow-2xl border border-slate-100 relative z-10">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-3xl mb-4">
            <ShieldCheck className="w-10 h-10 text-blue-600" />
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">
            {activeTab === 'login' ? 'Welcome Back' : 'Join the Network'}
          </h2>
          <p className="text-slate-500 font-medium text-lg">
            {activeTab === 'login' 
              ? 'Access your unified education dashboard' 
              : 'Join the national education ecosystem'}
          </p>
        </div>

        <div className="flex bg-slate-50 p-1.5 rounded-2xl">
          <button 
            onClick={() => { setActiveTab('login'); setError(''); }}
            className={`flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'login' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Login
          </button>
          <button 
            onClick={() => { setActiveTab('register'); setError(''); }}
            className={`flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'register' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleEmailAuth} className="mt-8 space-y-6">
          {error && (
            <div className="p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl text-sm font-bold flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
              <span className="w-6 h-6 bg-rose-100 rounded-full flex items-center justify-center shrink-0">!</span>
              {error}
            </div>
          )}

          <div className="space-y-4">
            {activeTab === 'register' && (
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Full Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border-none rounded-2xl pl-14 pr-6 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-blue-600 transition-all placeholder:text-slate-300"
                    placeholder="Enter your name"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border-none rounded-2xl pl-14 pr-6 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-blue-600 transition-all placeholder:text-slate-300"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Password</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border-none rounded-2xl pl-14 pr-6 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-blue-600 transition-all placeholder:text-slate-300"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          {activeTab === 'register' && (
            <div className="bg-slate-50 p-6 rounded-3xl space-y-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Account Role</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {[UserRole.VISITOR, UserRole.PARENT, UserRole.TEACHER, UserRole.INSTITUTION_ADMIN, UserRole.STUDENT, UserRole.MOET_OFFICIAL].filter(r => searchParams.get('plan') ? r === UserRole.INSTITUTION_ADMIN : [UserRole.VISITOR, UserRole.PARENT, UserRole.TEACHER].includes(r)).map(role => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setSelectedRole(role)}
                    className={`px-4 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${selectedRole === role ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-slate-500 border border-slate-200'} ${searchParams.get('plan') ? 'w-full' : 'flex-1'}`}
                  >
                    {role === UserRole.INSTITUTION_ADMIN ? 'Institution Admin' : role}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : activeTab === 'login' ? 'Sign In' : 'Create Account'}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <div className="relative my-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-black tracking-[0.3em] text-slate-300">
            <span className="bg-white px-6">Social Auth</span>
          </div>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-4 py-4 px-6 border-2 border-slate-100 rounded-2xl text-slate-700 font-bold hover:bg-slate-50 transition-all disabled:opacity-50"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>

        <p className="text-center text-[10px] text-slate-400 font-medium leading-relaxed opacity-60">
          By continuing, you agree to the Schools Eswatini <br />
          <Link to="/terms" className="underline hover:text-blue-600">Terms of Service</Link> and <Link to="/privacy" className="underline hover:text-blue-600">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
