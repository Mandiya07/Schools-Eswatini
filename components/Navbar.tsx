
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, UserRole } from '../types';
import { Menu, X, Download, Smartphone, Monitor, Share2 } from 'lucide-react';
import { hasRole } from '../src/lib/permissions';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
  compareCount?: number;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout, compareCount = 0 }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Install App PWA State & Hooks
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [showInstallGuideModal, setShowInstallGuideModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'ios' | 'android' | 'desktop'>('ios');
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Auto-detect OS for pre-selecting the correct install guide tab
    const ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
      setActiveTab('ios');
    } else if (/android/.test(ua)) {
      setActiveTab('android');
    } else {
      setActiveTab('desktop');
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleNativeInstall = async () => {
    if (!deferredPrompt) {
      setShowInstallGuideModal(true);
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`PWA install prompt choice: ${outcome}`);
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  const downloadShortcut = () => {
    const url = window.location.origin + "/#/";
    const content = `[InternetShortcut]\r\nURL=${url}\r\nIconIndex=0\r\n`;
    const blob = new Blob([content], { type: 'application/octet-stream' });
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = 'Schools Eswatini.url';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const getLinkClass = (path: string, colorBase: 'blue' | 'indigo' | 'amber' | 'fuchsia' = 'blue') => {
    const base = "font-medium text-[13px] px-1.5 py-1 transition-all";
    const isActive = location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
    
    const colors = {
      blue: { active: 'text-blue-600 border-b-2 border-blue-600 font-bold', inactive: 'text-slate-600 hover:text-blue-600' },
      indigo: { active: 'text-indigo-600 border-b-2 border-indigo-600 font-bold', inactive: 'text-indigo-600 hover:text-indigo-700' },
      amber: { active: 'text-amber-600 border-b-2 border-amber-600 font-bold', inactive: 'text-amber-600 hover:text-amber-700' },
      fuchsia: { active: 'text-fuchsia-600 border-b-2 border-fuchsia-600 font-bold', inactive: 'text-fuchsia-600 hover:text-fuchsia-700' },
    };
    
    return `${base} ${isActive ? colors[colorBase].active : colors[colorBase].inactive}`;
  };

  // Reusable Nav Link styling
  const PrimaryLinks = () => (
    <>
      <Link to="/browse" onClick={closeMobileMenu} className={getLinkClass('/browse')}>Directory</Link>
      <Link to="/scholarships" onClick={closeMobileMenu} className={getLinkClass('/scholarships')}>Scholarships</Link>
      <Link to="/resources" onClick={closeMobileMenu} className={getLinkClass('/resources')}>Resources</Link>
      <Link to="/tutors" onClick={closeMobileMenu} className={getLinkClass('/tutors', 'indigo')}>Tutoring</Link>
      <Link to="/marketplace" onClick={closeMobileMenu} className={getLinkClass('/marketplace', 'amber')}>Marketplace</Link>
      <Link to="/ai-tutor" onClick={closeMobileMenu} className={`${getLinkClass('/ai-tutor', 'fuchsia')} flex items-center gap-1`}>
        AI Tutor <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${location.pathname.startsWith('/ai-tutor') ? 'bg-fuchsia-200 text-fuchsia-800' : 'bg-fuchsia-100 text-fuchsia-600'}`}>BETA</span>
      </Link>
      <Link to="/pricing" onClick={closeMobileMenu} className={getLinkClass('/pricing')}>Pricing</Link>
      <Link to="/ministry-corner" onClick={closeMobileMenu} className={getLinkClass('/ministry-corner')}>Ministry Corner</Link>
    </>
  );

  const UserLinks = () => (
    <>
      {hasRole(user, [UserRole.STUDENT, UserRole.SUPER_ADMIN]) && (
        <Link to="/student" onClick={closeMobileMenu} className={getLinkClass('/student')}>Student Portal</Link>
      )}
      {hasRole(user, [UserRole.PARENT, UserRole.SUPER_ADMIN]) && (
        <Link to="/portal" onClick={closeMobileMenu} className={getLinkClass('/portal')}>Parent Portal</Link>
      )}
      {hasRole(user, [UserRole.SUPER_ADMIN, UserRole.INSTITUTION_ADMIN]) && (
        <Link to="/dashboard" onClick={closeMobileMenu} className={getLinkClass('/dashboard')}>Dashboard</Link>
      )}
      {hasRole(user, [UserRole.MOET_OFFICIAL, UserRole.SUPER_ADMIN]) && (
        <Link to="/ministry" onClick={closeMobileMenu} className={getLinkClass('/ministry')}>Ministry Dashboard</Link>
      )}
      {hasRole(user, [UserRole.TEACHER, UserRole.SUPER_ADMIN, UserRole.INSTITUTION_ADMIN]) && (
        <Link to="/teacher/dashboard" onClick={closeMobileMenu} className={getLinkClass('/teacher/dashboard')}>Teacher Portal</Link>
      )}
      <button 
        onClick={() => {
          onLogout();
          closeMobileMenu();
          navigate('/');
        }}
        className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 flex text-left rounded-lg text-[13px] font-medium items-center w-max transition-colors"
      >
        Logout
      </button>
    </>
  );

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0" onClick={closeMobileMenu}>
            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-800 truncate">
              Schools Eswatini
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1.5 xl:space-x-2.5 overflow-x-auto">
            <PrimaryLinks />
            <div className="w-px h-6 bg-slate-200 mx-1.5"></div>
            <button
              onClick={handleNativeInstall}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800 transition-all duration-200 rounded-lg text-[13px] font-bold cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-blue-600" />
              <span>Install App</span>
            </button>
            <div className="w-px h-6 bg-slate-200 mx-1.5"></div>
            {user ? (
              <div className="flex items-center space-x-1.5">
                <UserLinks />
              </div>
            ) : (
              <div className="flex items-center space-x-2 flex-shrink-0">
                <Link to="/auth" className="text-slate-600 hover:text-blue-600 font-medium text-[13px] px-1.5 transition-colors">Login</Link>
                <Link to="/auth?tab=register" className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-[13px] font-medium transition-shadow hover:shadow-md">Register</Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-600 hover:text-blue-600 focus:outline-none p-2"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-white shadow-2xl border-b border-slate-200 py-4 max-h-[calc(100vh-4rem)] overflow-y-auto w-full">
          <div className="flex flex-col space-y-4 px-6 pb-6">
            <div className="flex flex-col space-y-3 pb-4 border-b border-slate-100">
              <button
                type="button"
                onClick={() => {
                  handleNativeInstall();
                  closeMobileMenu();
                }}
                className="flex items-center justify-center gap-2 w-full py-3 bg-blue-50 text-blue-700 hover:bg-blue-100 transition-all duration-200 rounded-xl text-xs font-black uppercase tracking-widest cursor-pointer shadow-sm mb-1"
                id="mobile-install-app-btn"
              >
                <Download className="w-4 h-4 text-blue-600 animate-bounce" style={{ animationDuration: '3s' }} />
                <span>Install App</span>
              </button>
              <PrimaryLinks />
            </div>
            {user ? (
              <div className="flex flex-col space-y-3 pt-2">
                <h4 className="text-xs font-semibold text-slate-400 mb-1">Account</h4>
                <UserLinks />
              </div>
            ) : (
              <div className="flex flex-col space-y-3 pt-2">
                 <Link to="/auth" onClick={closeMobileMenu} className="w-full text-center border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-sm py-3 rounded-xl transition-colors">Login</Link>
                 <Link to="/auth?tab=register" onClick={closeMobileMenu} className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-3 rounded-xl transition-colors">Register</Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Gorgeous App Install & Guide Modal */}
      {showInstallGuideModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border border-slate-100 flex flex-col">
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-slate-100 flex justify-between items-start shrink-0">
              <div>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-[9px] font-black uppercase tracking-widest rounded-full">
                  PWA Mobile & Desktop
                </span>
                <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight mt-2">
                  Install Schools Eswatini
                </h3>
              </div>
              <button 
                type="button"
                onClick={() => setShowInstallGuideModal(false)}
                className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors cursor-pointer mr-[-8px] mt-[-8px]"
                id="close-install-modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 space-y-6 flex-1">
              <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                Install <strong className="text-slate-950 font-black">Schools Eswatini</strong> directly to your computer or mobile screen for rapid launching and offline student/school directory controls.
              </p>

              {/* Option 1: Direct File Download Builder */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                    Option 1: Direct File Shortcut Download
                  </h4>
                </div>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                  Double-click this custom configuration file on your Computer or Mobile device to run Schools Eswatini immediately in its own native app wrapper.
                </p>
                <button
                  type="button"
                  onClick={downloadShortcut}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  id="direct-download-shortcut-btn"
                >
                  <Download className="w-4 h-4" />
                  Download App Shortcut (.url)
                </button>
              </div>

              {/* Option 2: Native App (PWA) Install Wrapper */}
              <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                    Option 2: Browser Nest Installer (PWA)
                  </h4>
                </div>

                {isInstallable ? (
                  <div className="space-y-3">
                    <p className="text-[11px] text-emerald-800 font-semibold leading-relaxed">
                      🚀 Excellent! Direct native application installation is supported in your current browser!
                    </p>
                    <button
                      type="button"
                      onClick={handleNativeInstall}
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Download className="w-4 h-4 animate-bounce" />
                      Install App Natively
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="p-3 bg-amber-50 rounded-lg border border-amber-100 flex gap-2">
                       <span className="text-amber-500 mt-0.5">⚠️</span>
                       <div className="text-[11px] text-amber-900 font-medium leading-relaxed">
                         If you are using this inside an embedded window (like a preview iframe), browsers hide the standard Install address bar icon.
                         <strong className="block mt-1">Open the app in a full New Tab to trigger the browser's native URL bar Install Icon.</strong>
                       </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => window.open(window.location.origin, '_blank')}
                      className="w-full py-3 bg-slate-900 hover:bg-slate-800 active:scale-95 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Share2 className="w-4 h-4" />
                      Launch in New Tab to Install
                    </button>
                  </div>
                )}
              </div>

              {/* Install Guide Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                    Step-by-Step Install Guide
                  </h4>
                  {isInstallable && (
                    <span className="text-[10px] text-slate-400 font-semibold italic">Manual install steps below</span>
                  )}
                </div>

                {/* Tabs */}
                <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1.5 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setActiveTab('ios')}
                    className={`py-2 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      activeTab === 'ios' 
                        ? 'bg-white text-slate-900 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    iOS / iPad
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('android')}
                    className={`py-2 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      activeTab === 'android' 
                        ? 'bg-white text-slate-900 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    Android
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('desktop')}
                    className={`py-2 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      activeTab === 'desktop' 
                        ? 'bg-white text-slate-900 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    Desktop
                  </button>
                </div>

                {/* Tab Contents */}
                <div className="border border-slate-100 rounded-2xl p-4 sm:p-5 bg-slate-50/50 space-y-4 min-h-[220px]">
                  {activeTab === 'ios' && (
                    <div className="space-y-4 animate-in fade-in duration-200">
                      <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5 font-sans">1</div>
                        <div>
                          <p className="text-xs font-black text-slate-900 leading-tight">Launch in Safari Browser</p>
                          <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed font-semibold">Apple iOS device rules state PWA support requires using the native Safari browser application.</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5 font-sans">2</div>
                        <div>
                          <p className="text-xs font-black text-slate-900 leading-tight">Tap the 'Share' Button</p>
                          <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed font-semibold flex items-center flex-wrap gap-1">
                            Tap the Safari bottom action share sheet icon
                            <Share2 className="w-3.5 h-3.5 text-blue-600 inline shrink-0 mx-1" />
                            represented as a box with an upper-pointing arrow.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5 font-sans">3</div>
                        <div>
                          <p className="text-xs font-black text-slate-900 leading-tight">Select 'Add to Home Screen'</p>
                          <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed font-semibold">Scroll through the action options list and click 'Add to Home Screen'.</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5 font-sans">4</div>
                        <div>
                          <p className="text-xs font-black text-slate-900 leading-tight">Press 'Add' to Wrap App</p>
                          <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed font-semibold">Confirm the name 'Schools Eswatini' and tap 'Add' in the top right edge to install.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'android' && (
                    <div className="space-y-4 animate-in fade-in duration-200">
                      <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5 font-sans">1</div>
                        <div>
                          <p className="text-xs font-black text-slate-900 leading-tight">Open inside Google Chrome browser</p>
                          <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed font-semibold">Native Android installation runs beautifully within the default mobile Chrome engine.</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5 font-sans">2</div>
                        <div>
                          <p className="text-xs font-black text-slate-900 leading-tight">Open Settings Deck</p>
                          <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed font-semibold">Tap the three stacked dots button in the top-right corner to open Chrome's controls options.</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5 font-sans">3</div>
                        <div>
                          <p className="text-xs font-black text-slate-900 leading-tight">Select 'Install app' or 'Add to Home'</p>
                          <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed font-semibold">Click 'Install app' (or 'Add to Home screen') listed in the menu items list.</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5 font-sans">4</div>
                        <div>
                          <p className="text-xs font-black text-slate-900 leading-tight">Confirm Installation Request</p>
                          <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed font-semibold">Press install in the dialog pop-up. The operating systems will construct the container shortcut.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'desktop' && (
                    <div className="space-y-4 animate-in fade-in duration-200">
                      <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5 font-sans">1</div>
                        <div>
                          <p className="text-xs font-black text-slate-900 leading-tight">Check the Browser Address Bar</p>
                          <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed font-semibold">On Google Chrome, Microsoft Edge, or Safari, look at the right core side of the URL bar.</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5 font-sans">2</div>
                        <div>
                          <p className="text-xs font-black text-slate-900 leading-tight">Click the App icon badge shortcut</p>
                          <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed font-semibold">A monitor screen icon with a downward arrow (or simple install plus sign) will appear. Click it.</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5 font-sans">3</div>
                        <div>
                          <p className="text-xs font-black text-slate-900 leading-tight">Alternative Option (Chrome Menu)</p>
                          <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed font-semibold">Click parent Chrome Settings Dots, then find "Save and share" → "Install Schools Eswatini" to proceed.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Utility Footer action */}
              <div className="flex gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(window.location.origin);
                      setShowCopySuccess(true);
                      setTimeout(() => setShowCopySuccess(false), 2000);
                    } catch (err) {
                      console.error("Clipboard copy failed:", err);
                    }
                  }}
                  className={`flex-1 py-3 border rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    showCopySuccess 
                      ? "bg-emerald-500 border-emerald-500 text-white" 
                      : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600"
                  }`}
                  id="share-app-link-btn"
                >
                  {showCopySuccess ? "Portal Link Copied!" : "Share Portal Link"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowInstallGuideModal(false)}
                  className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-[10px] font-black uppercase tracking-widest text-center transition-all cursor-pointer"
                  id="dismiss-install-guide-btn"
                >
                  Got It, Thanks
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
