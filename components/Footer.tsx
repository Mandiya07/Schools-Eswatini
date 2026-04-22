
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                <span className="text-white font-bold">E</span>
              </div>
              <span className="text-xl font-bold">Schools Eswatini</span>
            </div>
            <p className="text-slate-400 max-w-sm mb-6">
              The official centralized platform for education discovery and digital presence for institutions across all four regions of Eswatini.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4 uppercase text-xs tracking-wider">Regions</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-blue-400">Hhohho</a></li>
              <li><a href="#" className="hover:text-blue-400">Manzini</a></li>
              <li><a href="#" className="hover:text-blue-400">Lubombo</a></li>
              <li><a href="#" className="hover:text-blue-400">Shiselweni</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4 uppercase text-xs tracking-wider">Support</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-blue-400">Add School</a></li>
              <li><a href="#" className="hover:text-blue-400">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-400">Contact Admin</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Schools Eswatini. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Facebook</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
