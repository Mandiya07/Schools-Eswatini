
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, UserRole } from '../types';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
  compareCount?: number;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout, compareCount = 0 }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Reusable Nav Link styling
  const PrimaryLinks = () => (
    <>
      <Link to="/browse" onClick={closeMobileMenu} className="text-slate-600 hover:text-blue-600 font-medium text-sm px-2 py-1 transition-colors">Directory</Link>
      <Link to="/scholarships" onClick={closeMobileMenu} className="text-slate-600 hover:text-blue-600 font-medium text-sm px-2 py-1 transition-colors">Scholarships</Link>
      <Link to="/resources" onClick={closeMobileMenu} className="text-slate-600 hover:text-blue-600 font-medium text-sm px-2 py-1 transition-colors">Resources</Link>
      <Link to="/marketplace" onClick={closeMobileMenu} className="text-amber-600 hover:text-amber-700 font-medium text-sm px-2 py-1 transition-colors">Marketplace</Link>
      <Link to="/ai-tutor" onClick={closeMobileMenu} className="text-fuchsia-600 hover:text-fuchsia-700 font-medium text-sm flex items-center gap-1 px-2 py-1 transition-colors">
        AI Tutor <span className="text-[10px] bg-fuchsia-100 px-1.5 py-0.5 rounded-full font-semibold">BETA</span>
      </Link>
      <Link to="/compare" onClick={closeMobileMenu} className="text-slate-600 hover:text-blue-600 font-medium text-sm flex items-center gap-2 px-2 py-1 transition-colors">
        Compare {compareCount > 0 && <span className="bg-blue-100 text-blue-600 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold">{compareCount}</span>}
      </Link>
    </>
  );

  const UserLinks = () => (
    <>
      <Link to="/student" onClick={closeMobileMenu} className="text-slate-600 hover:text-blue-600 font-medium text-sm px-2 py-1 transition-colors">Student</Link>
      <Link to="/portal" onClick={closeMobileMenu} className="text-slate-600 hover:text-blue-600 font-medium text-sm px-2 py-1 transition-colors">Portal</Link>
      {(user?.role === UserRole.SUPER_ADMIN || user?.role === UserRole.INSTITUTION_ADMIN) && (
        <Link to="/dashboard" onClick={closeMobileMenu} className="text-slate-600 hover:text-blue-600 font-medium text-sm px-2 py-1 transition-colors">Dashboard</Link>
      )}
      {(user?.role === UserRole.MOET_OFFICIAL || user?.role === UserRole.SUPER_ADMIN) && (
        <Link to="/ministry" onClick={closeMobileMenu} className="text-slate-600 hover:text-blue-600 font-medium text-sm px-2 py-1 transition-colors">Ministry Dashboard</Link>
      )}
      {user?.role === UserRole.TEACHER && (
        <Link to="/teacher/dashboard" onClick={closeMobileMenu} className="text-slate-600 hover:text-blue-600 font-medium text-sm px-2 py-1 transition-colors">Teacher Dashboard</Link>
      )}
      <button 
        onClick={() => {
          onLogout();
          closeMobileMenu();
          navigate('/');
        }}
        className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 flex text-left rounded-lg text-sm font-medium items-center w-max transition-colors"
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
              <span className="text-white font-bold">E</span>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-800 truncate">
              Schools Eswatini
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6 overflow-x-auto">
            <PrimaryLinks />
            <div className="w-px h-6 bg-slate-200 mx-2"></div>
            {user ? (
              <div className="flex items-center space-x-4">
                <UserLinks />
              </div>
            ) : (
              <div className="flex items-center space-x-4 flex-shrink-0">
                <Link to="/auth" className="text-slate-600 hover:text-blue-600 font-medium text-sm px-2 transition-colors">Login</Link>
                <Link to="/auth?tab=register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-shadow hover:shadow-md">Register</Link>
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
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-white shadow-2xl border-b border-slate-200 py-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="flex flex-col space-y-4 px-6 pb-6">
            <div className="flex flex-col space-y-3 pb-4 border-b border-slate-100">
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
    </nav>
  );
};

export default Navbar;
