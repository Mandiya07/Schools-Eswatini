
import React, { useState } from 'react';
import { Accessibility, Sun, Moon, Type, Languages, X, Check, Wifi, WifiOff } from 'lucide-react';

interface AccessibilityToolbarProps {
  isHighContrast: boolean;
  onToggleContrast: () => void;
  fontSize: number;
  onSetFontSize: (size: number) => void;
  lang: 'en' | 'ss';
  onToggleLang: () => void;
  isLowDataMode?: boolean;
  onToggleLowData?: () => void;
}

const AccessibilityToolbar: React.FC<AccessibilityToolbarProps> = ({ 
  isHighContrast, onToggleContrast, fontSize, onSetFontSize, lang, onToggleLang, isLowDataMode, onToggleLowData 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-indigo-700 transition-all hover:scale-110 active:scale-95"
        aria-label="Accessibility Tools"
      >
        <Accessibility className="w-7 h-7" />
      </button>

      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <Accessibility className="w-5 h-5 text-indigo-600" />
              Accessibility Tools
            </h3>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            {/* High Contrast */}
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">Visual Mode</label>
              <button
                onClick={onToggleContrast}
                className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                  isHighContrast 
                    ? 'bg-slate-900 text-white border-slate-900' 
                    : 'bg-slate-50 text-slate-600 border-slate-100 hover:border-indigo-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  {isHighContrast ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                  <span className="font-medium">High Contrast Mode</span>
                </div>
                {isHighContrast && <Check className="w-4 h-4" />}
              </button>
            </div>

            {/* Font Size */}
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">Text Size</label>
              <div className="grid grid-cols-3 gap-2">
                {[14, 16, 20].map((size) => (
                  <button
                    key={size}
                    onClick={() => onSetFontSize(size)}
                    className={`p-2 rounded-lg border text-center transition-all ${
                      fontSize === size
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-slate-50 text-slate-600 border-slate-100 hover:border-indigo-200'
                    }`}
                  >
                    <Type className={`mx-auto ${size === 14 ? 'w-3 h-3' : size === 16 ? 'w-4 h-4' : 'w-6 h-6'}`} />
                    <span className="text-[10px] mt-1 block capitalize">{size === 14 ? 'Small' : size === 16 ? 'Medium' : 'Large'}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Language */}
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">Language / Lulwimi</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => lang !== 'en' && onToggleLang()}
                  className={`p-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${
                    lang === 'en'
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-slate-50 text-slate-600 border-slate-100 hover:border-indigo-200'
                  }`}
                >
                  <Languages className="w-4 h-4" />
                  <span className="font-medium">English</span>
                </button>
                <button
                  onClick={() => lang !== 'ss' && onToggleLang()}
                  className={`p-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${
                    lang === 'ss'
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-slate-50 text-slate-600 border-slate-100 hover:border-indigo-200'
                  }`}
                >
                  <Languages className="w-4 h-4" />
                  <span className="font-medium">SiSwati</span>
                </button>
              </div>
            </div>

            {/* Low Data Mode */}
            {onToggleLowData && (
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">Data & Bandwidth</label>
                <button
                  onClick={onToggleLowData}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                    isLowDataMode 
                      ? 'bg-amber-100 text-amber-700 border-amber-300' 
                      : 'bg-slate-50 text-slate-600 border-slate-100 hover:border-amber-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {isLowDataMode ? <WifiOff className="w-5 h-5 text-amber-600" /> : <Wifi className="w-5 h-5 text-slate-400" />}
                    <div className="text-left">
                      <span className="font-bold block text-sm">Low-Bandwidth Mode</span>
                      <span className="text-[9px] font-medium opacity-80 uppercase tracking-widest block">Disable images & animations</span>
                    </div>
                  </div>
                  {isLowDataMode && <Check className="w-4 h-4 text-amber-600" />}
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
};

export default AccessibilityToolbar;
