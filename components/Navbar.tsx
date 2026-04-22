
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, UserRole } from '../types';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
  compareCount?: number;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout, compareCount = 0 }) => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold">E</span>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-800">
                Schools Eswatini
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/browse" className="text-slate-600 hover:text-blue-600 font-bold text-xs uppercase tracking-widest">
              Directory
            </Link>
            <Link to="/scholarships" className="text-slate-600 hover:text-blue-600 font-bold text-xs uppercase tracking-widest">
              Scholarships
            </Link>
            <Link to="/resources" className="text-slate-600 hover:text-blue-600 font-bold text-xs uppercase tracking-widest">
              Resources
            </Link>
            <Link to="/governance" className="text-slate-600 hover:text-blue-600 font-bold text-xs uppercase tracking-widest hidden lg:block">
              Governance
            </Link>
            <Link to="/ministry-corner" className="text-slate-600 hover:text-blue-600 font-bold text-xs uppercase tracking-widest text-[#f59e0b]">
              Ministry Corner
            </Link>
            <Link to="/compare" className="text-slate-600 hover:text-blue-600 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
              Compare {compareCount > 0 && <span className="bg-blue-100 text-blue-600 w-5 h-5 rounded-full flex items-center justify-center text-[8px]">{compareCount}</span>}
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/student" className="text-slate-600 hover:text-blue-600 font-bold text-xs uppercase tracking-widest">
                  Student
                </Link>
                <Link to="/portal" className="text-slate-600 hover:text-blue-600 font-bold text-xs uppercase tracking-widest">
                  Portal
                </Link>
                {(user.role === UserRole.SUPER_ADMIN || user.role === UserRole.INSTITUTION_ADMIN) && (
                  <Link to="/dashboard" className="text-slate-600 hover:text-blue-600 font-bold text-xs uppercase tracking-widest">
                    Dashboard
                  </Link>
                )}
                {(user.role === UserRole.MOET_OFFICIAL || user.role === UserRole.SUPER_ADMIN) && (
                  <Link to="/ministry" className="text-slate-600 hover:text-blue-600 font-bold text-xs uppercase tracking-widest">
                    Ministry Dashboard
                  </Link>
                )}
                {user.role === UserRole.TEACHER && (
                  <Link to="/teacher/dashboard" className="text-slate-600 hover:text-blue-600 font-bold text-xs uppercase tracking-widest">
                    Teacher Dashboard
                  </Link>
                )}
                <button 
                  onClick={() => {
                    onLogout();
                    navigate('/');
                  }}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/auth" 
                  className="text-slate-600 hover:text-blue-600 font-bold text-xs uppercase tracking-widest"
                >
                  Login
                </Link>
                <Link 
                  to="/auth?tab=register" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-shadow hover:shadow-md"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
