
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Zap, 
  BookOpen, 
  MessageSquare, 
  ChevronRight, 
  Loader2,
  BrainCircuit,
  GraduationCap,
  X,
  CreditCard,
  Smartphone
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AIStudyAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Sawubona! I am your AI Study Assistant. I can help you understand complex topics, summarize textbook chapters, or even practice for your EGCSE Exams using verified educator materials. What are we studying today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Paywall states
  const [queriesLeft, setQueriesLeft] = useState(3);
  const [isPro, setIsPro] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'method' | 'processing' | 'success'>('method');

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    if (!isPro && queriesLeft <= 0) {
      setShowPaywall(true);
      return;
    }

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    if (!isPro) {
      setQueriesLeft(prev => prev - 1);
    }

    try {
      const ai = new GoogleGenAI({ apiKey: (import.meta as any).env.VITE_GEMINI_API_KEY || 'mock-key' });
      const systemInstruction = `You are a helpful and professional AI Study Assistant for high school and tertiary students in Eswatini. 
      You have access to a database of verified educator materials (lesson plans, past papers, and study guides).
      Help students understand concepts, provide examples, and explain topics simply. 
      Always refer to things like "our verified educator notes" or "past exams council papers" where relevant. 
      Keep your tone encouraging and educational. Use Eswatini curricula (EGCSE, IGCSE) as your context.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...messages, { role: 'user', content: userMessage }].map(m => ({
          role: m.role,
          parts: [{ text: m.content }]
        })),
        config: {
          systemInstruction
        }
      });

      const aiResponse = response.text || "I'm sorry, I couldn't generate a response. Please try again.";
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "An error occurred while connecting to the knowledge base. Please check your connectivity." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayment = () => {
    setPaymentStep('processing');
    setTimeout(() => {
      setPaymentStep('success');
      setTimeout(() => {
        setIsPro(true);
        setShowPaywall(false);
        setPaymentStep('method');
      }, 2000);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-6 lg:px-8">
      <div className="max-w-5xl mx-auto flex flex-col h-[calc(100vh-12rem)] min-h-[600px]">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-fuchsia-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-fuchsia-600/20">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">AI Study Assistant</h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Grounded in Verified Educator Materials</p>
              </div>
            </div>
          </div>
          <div className="hidden md:flex gap-3">
             <div className="px-4 py-2 bg-white border border-slate-200 rounded-xl flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-fuchsia-600" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">EGCSE Mode Active</span>
             </div>
          </div>
        </header>

        {/* Main Content Layout */}
        <div className="flex-1 flex flex-col lg:flex-row gap-8 min-h-0">
          {/* Chat Area */}
          <div className="flex-1 bg-white rounded-[40px] border border-slate-100 shadow-sm flex flex-col overflow-hidden">
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 scroll-smooth"
            >
              {messages.map((message, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-10 h-10 rounded-xl bg-fuchsia-100 text-fuchsia-600 flex items-center justify-center shrink-0 shadow-sm">
                      <Bot className="w-5 h-5" />
                    </div>
                  )}
                  <div className={`max-w-[80%] p-6 rounded-3xl text-sm font-medium leading-relaxed ${
                    message.role === 'user' 
                      ? 'bg-slate-900 text-white rounded-tr-none shadow-xl' 
                      : 'bg-slate-50 text-slate-700 rounded-tl-none border border-slate-100'
                  }`}>
                    {message.content}
                  </div>
                  {message.role === 'user' && (
                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-sm">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                  )}
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-fuchsia-100 text-fuchsia-600 flex items-center justify-center shrink-0">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div className="bg-slate-50 p-6 rounded-3xl rounded-tl-none flex items-center gap-3">
                     <Loader2 className="w-4 h-4 animate-spin text-fuchsia-600" />
                     <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Consulting Marketplace Data...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Suggestions */}
            <div className="px-10 py-4 bg-slate-50/50 border-t border-slate-50 flex gap-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
               {[
                 "Explain Photosynthesis", 
                 "EGCSE Math Practice", 
                 "Summarize SiSwati Poetry", 
                 "How to write a business plan?"
               ].map((suggest) => (
                 <button 
                  key={suggest}
                  onClick={() => setInput(suggest)}
                  className="px-4 py-2 bg-white border border-slate-200 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest hover:border-fuchsia-400 hover:text-fuchsia-600 transition-all shadow-sm"
                 >
                   {suggest}
                 </button>
               ))}
            </div>

            {/* Input Area */}
            <div className="p-6 md:p-8 border-t border-slate-100">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask me anything about your subjects..."
                    disabled={isLoading}
                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-5 font-bold outline-none focus:ring-4 focus:ring-fuchsia-100 disabled:opacity-50"
                  />
                  <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-fuchsia-600 transition-colors">
                    <Zap className="w-5 h-5" />
                  </button>
                </div>
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="bg-slate-900 text-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl hover:bg-fuchsia-600 transition-all disabled:opacity-50 shrink-0"
                >
                  {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar: Knowledge Context */}
          <div className="lg:w-80 space-y-6 flex flex-col">
             <div className="bg-white rounded-[32px] border border-slate-100 p-6 shadow-sm flex-1 overflow-y-auto">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                   <BookOpen className="w-4 h-4 text-fuchsia-600" /> Active Reference
                </h3>
                <div className="space-y-4">
                   <div className="p-4 bg-fuchsia-50 rounded-2xl border border-fuchsia-100">
                      <p className="text-[9px] font-black text-fuchsia-600 uppercase mb-1">EGCSE Study Guide</p>
                      <h4 className="text-xs font-black text-slate-900">Form 5 Biology Core Notes</h4>
                      <p className="text-[10px] text-slate-500 mt-2">Verified by MoET Marketplace Experts</p>
                   </div>
                   <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 opacity-50 grayscale">
                      <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Past Paper Library</p>
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-tight">Mathematics 2023 Paper 2</h4>
                      <p className="text-[10px] text-slate-500 mt-1 italic">Click to switch context</p>
                   </div>
                </div>
             </div>

             <div className="bg-fuchsia-600 rounded-[32px] p-6 text-white shadow-xl shadow-fuchsia-600/20">
                <GraduationCap className="w-6 h-6 mb-4" />
                <h4 className="text-sm font-black mb-2 uppercase tracking-wide">Exam Mastery</h4>
                <p className="text-xs text-fuchsia-100 font-medium leading-relaxed mb-6">
                   Using this AI reduces study time by <span className="font-black text-white">35%</span> by extracting core themes instantly.
                </p>
                {isPro ? (
                   <div className="w-full py-3 bg-white/20 text-white rounded-xl text-[9px] font-black uppercase tracking-widest text-center border border-white/20">PRO STATUS ACTIVE</div>
                ) : (
                  <>
                    <div className="w-full bg-fuchsia-700/50 rounded-full h-1.5 mb-3 overflow-hidden">
                      <div 
                        className="bg-white h-full transition-all duration-500 ease-out" 
                        style={{ width: `${(queriesLeft / 3) * 100}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-fuchsia-200 font-bold mb-4 text-center">{queriesLeft} free queries remaining</p>
                    <button onClick={() => setShowPaywall(true)} className="w-full py-3 bg-white text-fuchsia-600 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-50 transition-colors shadow-sm">Upgrade to Unlimited</button>
                  </>
                )}
             </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6 px-10">
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                 <div className="w-3 h-3 bg-fuchsia-100 rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-fuchsia-600 rounded-full" />
                 </div>
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Contextual Reasoning</span>
              </div>
              <div className="flex items-center gap-2">
                 <div className="w-3 h-3 bg-blue-100 rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                 </div>
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Safe Content Filter</span>
              </div>
           </div>
           <p className="text-[9px] font-medium text-slate-400">AI can make mistakes. Check important information with your teacher.</p>
        </div>
      </div>

      {/* Paywall Modal */}
      <AnimatePresence>
        {showPaywall && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[40px] max-w-md w-full p-8 shadow-2xl relative overflow-hidden"
            >
              <button 
                onClick={() => setShowPaywall(false)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {paymentStep === 'method' && (
                <>
                  <div className="w-16 h-16 bg-fuchsia-100 text-fuchsia-600 rounded-2xl flex items-center justify-center mb-6">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-black text-slate-900 mb-2">Upgrade to Pro</h2>
                  <p className="text-sm font-medium text-slate-500 mb-8">
                    You've run out of free queries. Unlock unlimited AI tutoring, essay grading, and premium exam papers for just <strong>E50/month</strong>.
                  </p>

                  <div className="space-y-3">
                    <button 
                      onClick={handlePayment}
                      className="w-full flex items-center gap-4 p-4 border-2 border-slate-100 hover:border-yellow-400 rounded-2xl transition-all group relative overflow-hidden"
                    >
                      <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center text-slate-900 shrink-0 relative z-10">
                        <Smartphone className="w-5 h-5" />
                      </div>
                      <div className="text-left flex-1 relative z-10">
                        <h4 className="text-sm font-bold text-slate-900">MTN MoMo</h4>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Pay with mobile money</p>
                      </div>
                      <div className="absolute inset-0 bg-yellow-50 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>

                    <button 
                      onClick={handlePayment}
                      className="w-full flex items-center gap-4 p-4 border-2 border-slate-100 hover:border-blue-600 rounded-2xl transition-all group relative overflow-hidden"
                    >
                      <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shrink-0 relative z-10">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div className="text-left flex-1 relative z-10">
                        <h4 className="text-sm font-bold text-slate-900">Credit / Debit Card</h4>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Visa, Mastercard</p>
                      </div>
                      <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </div>
                </>
              )}

              {paymentStep === 'processing' && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6">
                    <Loader2 className="w-8 h-8 text-fuchsia-600 animate-spin" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Processing Payment...</h3>
                  <p className="text-sm font-medium text-slate-500">Please do not close this window.</p>
                </div>
              )}

              {paymentStep === 'success' && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-emerald-600 mb-2">Payment Successful!</h3>
                  <p className="text-sm font-medium text-slate-500">You are now an AI Tutor Pro member.</p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIStudyAssistant;
