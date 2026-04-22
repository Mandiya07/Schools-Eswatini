
import React, { useState } from 'react';
import { Sparkles, Send, Loader2, Copy, Check, Wand2, FileText, Megaphone, Target } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface AIContentAssistantProps {
  institutionName: string;
}

const AIContentAssistant: React.FC<AIContentAssistantProps> = ({ institutionName }) => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'mission' | 'announcement' | 'admission'>('mission');

  const generateContent = async (type: string) => {
    setIsLoading(true);
    setResult('');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const model = ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate a professional ${type} for a school named "${institutionName}". 
        Context: ${prompt || 'Focus on academic excellence and character development.'}
        Keep it inspiring, professional, and suitable for the Eswatini education context.`,
      });
      
      const response = await model;
      setResult(response.text || 'No content generated.');
    } catch (error) {
      console.error('AI Generation Error:', error);
      setResult('Failed to generate content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const templates = {
    mission: { icon: Target, label: 'Mission Statement', placeholder: 'e.g., Focus on STEM and community service' },
    announcement: { icon: Megaphone, label: 'Announcement', placeholder: 'e.g., Open day for 2024 admissions' },
    admission: { icon: FileText, label: 'Admission Content', placeholder: 'e.g., Why choose our school for high school?' }
  };

  return (
    <div className="bg-white rounded-3xl border border-indigo-100 shadow-sm overflow-hidden">
      <div className="p-8 bg-gradient-to-br from-indigo-600 to-violet-700 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black tracking-tight">AI Content Assistant</h3>
            <p className="text-xs text-indigo-100 font-medium">Powered by Gemini AI</p>
          </div>
        </div>
        
        <div className="flex gap-2 mt-8 overflow-x-auto scrollbar-hide">
          {(Object.keys(templates) as Array<keyof typeof templates>).map((key) => {
            const Icon = templates[key].icon;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
                  activeTab === key ? 'bg-white text-indigo-600 shadow-lg' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <Icon className="w-4 h-4" />
                {templates[key].label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-8 space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Context & Keywords</label>
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={templates[activeTab].placeholder}
              className="w-full h-32 bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-sm focus:ring-4 ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all resize-none"
            />
            <button
              onClick={() => generateContent(templates[activeTab].label)}
              disabled={isLoading}
              className="absolute bottom-4 right-4 bg-indigo-600 text-white px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-indigo-700 disabled:opacity-50 shadow-lg shadow-indigo-200"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
              Generate
            </button>
          </div>
        </div>

        {result && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">AI Generated Content</label>
              <button
                onClick={copyToClipboard}
                className="text-indigo-600 hover:text-indigo-700 flex items-center gap-2 text-xs font-bold"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
            </div>
            <div className="bg-indigo-50/30 border border-indigo-100 rounded-2xl p-6 text-slate-700 text-sm leading-relaxed whitespace-pre-wrap font-medium italic">
              "{result}"
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIContentAssistant;
