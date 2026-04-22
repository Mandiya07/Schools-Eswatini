import React from 'react';
import { Settings, Type, Moon, Sun, Globe } from 'lucide-react';
import { AccessibilitySettings } from '../../types';

interface AccessibilityToolbarProps {
  settings: AccessibilitySettings;
  onUpdateSettings: (settings: Partial<AccessibilitySettings>) => void;
}

const AccessibilityToolbar: React.FC<AccessibilityToolbarProps> = ({ settings, onUpdateSettings }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 mb-4 w-64 animate-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
            <h3 className="font-bold text-slate-800">Accessibility</h3>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600">
              <Settings className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Contrast</label>
              <button 
                onClick={() => onUpdateSettings({ highContrast: !settings.highContrast })}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${settings.highContrast ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                <span className="flex items-center gap-2">
                  {settings.highContrast ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  High Contrast
                </span>
                <div className={`w-8 h-4 rounded-full relative ${settings.highContrast ? 'bg-indigo-500' : 'bg-slate-300'}`}>
                  <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${settings.highContrast ? 'right-0.5' : 'left-0.5'}`} />
                </div>
              </button>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Text Size</label>
              <div className="flex gap-2">
                {(['small', 'medium', 'large', 'extra-large'] as const).map(size => (
                  <button
                    key={size}
                    onClick={() => onUpdateSettings({ fontSize: size })}
                    className={`flex-1 py-1.5 rounded-lg text-sm font-medium transition-colors ${settings.fontSize === size ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                  >
                    {size === 'small' ? 'A' : size === 'medium' ? 'A+' : size === 'large' ? 'A++' : 'A+++'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Language</label>
              <div className="flex gap-2">
                <button
                  onClick={() => onUpdateSettings({ language: 'en' })}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors ${settings.language === 'en' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  <Globe className="w-4 h-4" /> EN
                </button>
                <button
                  onClick={() => onUpdateSettings({ language: 'ss' })}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors ${settings.language === 'ss' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  <Globe className="w-4 h-4" /> SS
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-all ${isOpen ? 'bg-slate-800 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105'}`}
      >
        <Settings className="w-6 h-6" />
      </button>
    </div>
  );
};

export default AccessibilityToolbar;
