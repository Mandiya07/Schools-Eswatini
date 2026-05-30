
import React, { useState } from 'react';
import { Clock, MapPin, TrendingUp, BookOpen, GraduationCap, FileText, Calendar as CalendarIcon, CheckCircle2, Bell, Rocket, XCircle, Download, UploadCloud, Loader2, ShoppingBag, Star, ShieldCheck, Phone, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { uploadFile } from '../../../services/storageService';
import { requestToPay, checkPaymentStatus } from '../../../services/momoService';
import { db, doc, setDoc, collection, getDocs, query, where, orderBy, getDocsWithRetry, handleFirestoreError, OperationType } from '../../../lib/firebase';
import { User, AcademicResource } from '../../../../types';

const MOCK_TIMETABLE = [
  { id: 1, time: '08:00 AM', subject: 'Mathematics Core', teacher: 'Mr. Dlamini', room: 'Block A, Rm 12', status: 'completed' },
  { id: 2, time: '09:30 AM', subject: 'Physical Science', teacher: 'Mrs. Simelane', room: 'Science Lab 3', status: 'current' },
  { id: 3, time: '11:00 AM', subject: 'English Language', teacher: 'Ms. Mamba', room: 'Block B, Rm 4', status: 'upcoming' },
  { id: 4, time: '12:30 PM', subject: 'Lunch Break', teacher: '', room: 'Cafeteria', status: 'upcoming' },
  { id: 5, time: '01:30 PM', subject: 'Geography', teacher: 'Mr. Zwane', room: 'Block C, Rm 2', status: 'upcoming' },
];

const MOCK_GRADES = [
  { subject: 'Mathematics Core', currentGrade: 'A-', score: 88, maxScore: 100, trend: '+2%', color: 'bg-emerald-500' },
  { subject: 'Physical Science', currentGrade: 'B+', score: 78, maxScore: 100, trend: '-1%', color: 'bg-blue-500' },
  { subject: 'English Language', currentGrade: 'A', score: 92, maxScore: 100, trend: '+5%', color: 'bg-purple-500' },
  { subject: 'Geography', currentGrade: 'B', score: 74, maxScore: 100, trend: 'Same', color: 'bg-amber-500' },
  { subject: 'Accounting', currentGrade: 'A+', score: 96, maxScore: 100, trend: '+1%', color: 'bg-rose-500' },
];

const MOCK_ASSIGNMENTS = [
  { id: 1, title: 'Algebra Worksheet 4', subject: 'Mathematics', dueDate: 'Tomorrow, 08:00 AM', status: 'pending' },
  { id: 2, title: 'Lab Report: Titration', subject: 'Physical Science', dueDate: 'Wed, 14 May', status: 'submitted' },
  { id: 3, title: 'Essay: Things Fall Apart', subject: 'English Language', dueDate: 'Fri, 16 May', status: 'pending' },
];

const MOCK_EXAMS = [
  { id: 1, subject: 'Physical Science Paper 1', date: '2026-05-20', daysLeft: 8, type: 'EGCSE Mock' },
  { id: 2, subject: 'Mathematics Core Paper 2', date: '2026-05-24', daysLeft: 12, type: 'EGCSE Mock' },
];

const PAST_TRANSCRIPTS = [
  { term: 'Term 1, 2026', overall: 'A-', score: 85, url: '#' },
  { term: 'Term 3, 2025', overall: 'B+', score: 79, url: '#' },
  { term: 'Term 2, 2025', overall: 'B', score: 76, url: '#' },
];

export const HighSchoolStudentDashboard: React.FC<{ user?: User | null }> = ({ user }) => {
  const [showReportModal, setShowReportModal] = useState(false);
  const [isUploading, setIsUploading] = useState<string | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<'academics' | 'marketplace'>('academics');
  const [marketResources, setMarketResources] = useState<AcademicResource[]>([]);
  const [isPurchasing, setIsPurchasing] = useState<string | null>(null);
  const [showMomoModal, setShowMomoModal] = useState<AcademicResource | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('76');
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'pending' | 'success' | 'failed'>('idle');
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [paymentProvider, setPaymentProvider] = useState<'momo'|'emali'|'eft'|'card'>('momo');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (paymentStatus === 'pending' && referenceId) {
      interval = setInterval(async () => {
        try {
          if (paymentProvider === 'momo') {
            const status = await checkPaymentStatus(referenceId);
            if (status.status === 'SUCCESSFUL') {
              setPaymentStatus('success');
              setIsPurchasing(null);
              clearInterval(interval);
            } else if (status.status === 'FAILED' || status.status === 'REJECTED') {
              setPaymentStatus('failed');
              setIsPurchasing(null);
              clearInterval(interval);
            }
          } else {
             const { checkEMaliStatus } = await import('../../../services/emaliService');
             const status = await checkEMaliStatus(referenceId);
             if (status.status === 'SUCCESSFUL') {
               setPaymentStatus('success');
               setIsPurchasing(null);
               clearInterval(interval);
             } else if (status.status === 'FAILED' || status.status === 'REJECTED') {
               setPaymentStatus('failed');
               setIsPurchasing(null);
               clearInterval(interval);
             }
          }
        } catch (error) {
          console.error("Polling error", error);
        }
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [paymentStatus, referenceId, paymentProvider]);

  React.useEffect(() => {
    const fetchMarketplace = async () => {
      try {
        const q = query(collection(db, 'resources'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocsWithRetry(q);
        
        const fetched = snapshot.docs.map(doc => doc.data() as AcademicResource);
        if (fetched.length === 0) {
          // Fallback mock resource for testing
          setMarketResources([{
            id: 'mock_momo_res_1',
            title: 'EGCSE Core Math Past Paper 2024',
            type: 'PAST_PAPER' as any,
            url: '#',
            price: 5.00,
            subject: 'math',
            level: 'Form 5',
            size: '1.2 MB',
            downloads: 0,
            rating: 5,
            authorId: 'test_author',
            authorName: 'Ministry of Education & Training (MoET)',
            createdAt: new Date().toISOString()
          }]);
        } else {
          setMarketResources(fetched);
        }
      } catch (error: any) {
        if (error instanceof Error && !error.message.includes('offline')) {
          handleFirestoreError(error, OperationType.LIST, 'resources');
        } else {
          console.warn("Marketplace fetch failed (offline/timeout). Using mock fallback.");
          setMarketResources([{
            id: 'mock_momo_res_1',
            title: 'EGCSE Core Math Past Paper 2024 (Cached)',
            type: 'PAST_PAPER' as any,
            url: '#',
            price: 5.00,
            subject: 'math',
            level: 'Form 5',
            size: '1.2 MB',
            downloads: 0,
            rating: 5,
            authorId: 'test_author',
            authorName: 'Ministry of Education & Training (MoET)',
            createdAt: new Date().toISOString()
          }]);
        }
      }
    };
    fetchMarketplace();
  }, []);

  const handlePurchase = (resource: AcademicResource) => {
    if (!user) {
      alert("Please login to purchase resources.");
      return;
    }
    setShowMomoModal(resource);
    setPaymentStatus('idle');
    setReferenceId(null);
  };

  const handlePay = async () => {
    if (!showMomoModal) return;
    
    if (paymentProvider === 'momo' && !phoneNumber.match(/^(76|78)\d{6}$/)) {
      alert("Please enter a valid Eswatini MTN MoMo number (e.g. 76xxxxxx)");
      return;
    } else if (paymentProvider === 'emali' && !phoneNumber.match(/^(79)\d{6}$/)) {
      alert("Please enter a valid Eswatini Mobile eMali number (e.g. 79xxxxxx)");
      return;
    }

    setIsPurchasing(showMomoModal.id);
    setPaymentStatus('pending');
    try {
      if (paymentProvider === 'eft') {
         // Mock manual EFT confirmation
         await new Promise(resolve => setTimeout(resolve, 1500));
         alert("Transfer registered! Please allow 24-48 hours for finance to verify your payment.");
         setPaymentStatus('success');
         setIsPurchasing(null);
         return;
      } else if (paymentProvider === 'card') {
         // Mock Stripe/Card integration
         await new Promise(resolve => setTimeout(resolve, 2000));
         setPaymentStatus('success');
         setIsPurchasing(null);
         return;
      } else if (paymentProvider === 'momo') {
        const res = await requestToPay(showMomoModal, phoneNumber);
        setReferenceId(res.referenceId);
      } else {
        // eMali mock
        const { requestEMaliPay } = await import('../../../services/emaliService');
        const res = await requestEMaliPay(showMomoModal, phoneNumber);
        setReferenceId(res.referenceId);
      }
    } catch (error: any) {
      alert(error.message);
      setPaymentStatus('failed');
      setIsPurchasing(null);
    }
  };

  const handleAssignmentUpload = async (assignmentId: number, file: File) => {
    if (!user) {
      alert("You must be logged in to submit assignments.");
      return;
    }
    setIsUploading(assignmentId.toString());
    try {
      const path = `assignments/${user.id}/${assignmentId}_${Date.now()}_${file.name}`;
      const url = await uploadFile(path, file);
      
      const submissionId = `sub_${Date.now()}`;
      await setDoc(doc(db, 'submissions', submissionId), {
        id: submissionId,
        assignmentId,
        studentId: user.id,
        studentName: user.name,
        fileUrl: url,
        fileName: file.name,
        submittedAt: new Date().toISOString(),
        status: 'submitted'
      });

      alert(`Assignment "${file.name}" uploaded successfully!`);
    } catch (error) {
      console.error("Submission failed", error);
      alert("Failed to submit assignment. Please try again.");
    } finally {
      setIsUploading(null);
    }
  };

  return (
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
      <AnimatePresence>
        {showMomoModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white p-8 rounded-[40px] shadow-2xl max-w-md w-full border border-slate-100 text-center"
            >
              <div className="w-20 h-20 bg-amber-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-10 h-10 text-amber-600" />
              </div>
              
              <h3 className="text-2xl font-black text-slate-900 mb-2">Purchase Resource</h3>
              <p className="text-slate-500 font-medium mb-8">
                You are purchasing <span className="font-bold text-slate-900">{showMomoModal.title}</span> for <span className="font-bold text-emerald-600">E{showMomoModal.price}</span>
              </p>

              {paymentStatus === 'idle' ? (
                <div className="space-y-6">
                  <div className="flex bg-slate-100 p-1 rounded-xl">
                    <button 
                      onClick={() => { setPaymentProvider('momo'); setPhoneNumber('76') }}
                      className={`flex-1 py-2 rounded-lg text-[10px] font-black tracking-widest uppercase transition-all ${paymentProvider === 'momo' ? 'bg-white shadow-sm text-yellow-500' : 'text-slate-400'}`}
                    >
                      MoMo
                    </button>
                    <button 
                      onClick={() => { setPaymentProvider('emali'); setPhoneNumber('79') }}
                      className={`flex-1 py-2 rounded-lg text-[10px] font-black tracking-widest uppercase transition-all ${paymentProvider === 'emali' ? 'bg-white shadow-sm text-red-500' : 'text-slate-400'}`}
                    >
                      eMali
                    </button>
                    <button 
                      onClick={() => setPaymentProvider('eft')}
                      className={`flex-1 py-2 rounded-lg text-[10px] font-black tracking-widest uppercase transition-all ${paymentProvider === 'eft' ? 'bg-white shadow-sm text-blue-500' : 'text-slate-400'}`}
                    >
                      EFT
                    </button>
                    <button 
                      onClick={() => setPaymentProvider('card')}
                      className={`flex-1 py-2 rounded-lg text-[10px] font-black tracking-widest uppercase transition-all ${paymentProvider === 'card' ? 'bg-white shadow-sm text-indigo-500' : 'text-slate-400'}`}
                    >
                      Card
                    </button>
                  </div>
                  
                  {paymentProvider === 'momo' || paymentProvider === 'emali' ? (
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input 
                        type="text" 
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder={paymentProvider === 'momo' ? "MTN Number (76xxxxxx)" : "eMali Number (79xxxxxx)"}
                        className="w-full pl-12 pr-6 py-4 bg-slate-100 border-none rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </div>
                  ) : paymentProvider === 'card' ? (
                    <div className="space-y-3">
                      <div className="relative">
                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input 
                          type="text" 
                          placeholder="Card Number"
                          className="w-full pl-12 pr-6 py-4 bg-slate-100 border-none rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500 transition-all"
                        />
                      </div>
                      <div className="flex gap-3">
                         <input 
                            type="text" 
                            placeholder="MM/YY"
                            className="w-1/2 px-6 py-4 bg-slate-100 border-none rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500 transition-all"
                          />
                          <input 
                            type="text" 
                            placeholder="CVC"
                            className="w-1/2 px-6 py-4 bg-slate-100 border-none rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500 transition-all"
                          />
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-blue-50 text-blue-900 rounded-2xl text-xs font-medium space-y-2">
                       <p className="font-bold mb-3">Bank Details for Transfer:</p>
                       <p>Bank: <span className="font-bold">First National Bank Eswatini</span></p>
                       <p>Account Name: <span className="font-bold">Ministry of Education Portal</span></p>
                       <p>Account Number: <span className="font-bold">62800000000</span></p>
                       <p>Branch Code: <span className="font-bold">280164</span></p>
                       <p className="mt-3 text-[10px] uppercase font-black tracking-widest text-blue-600">Reference: {showMomoModal.id.substring(0, 8).toUpperCase()}</p>
                    </div>
                  )}

                  <button 
                    onClick={handlePay}
                    className={`w-full py-4 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all ${
                      paymentProvider === 'momo' ? 'bg-yellow-500' : 
                      paymentProvider === 'emali' ? 'bg-red-500' : 
                      paymentProvider === 'card' ? 'bg-indigo-600' : 'bg-blue-600'
                    }`}
                  >
                    {paymentProvider === 'eft' ? 'I Have Made the Transfer' : `Pay with ${paymentProvider.toUpperCase()}`}
                  </button>
                  <button 
                    onClick={() => setShowMomoModal(null)}
                    className="w-full py-4 bg-slate-100 text-slate-500 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              ) : paymentStatus === 'pending' ? (
                <div className="py-10">
                  <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-6" />
                  <h4 className="text-lg font-black text-slate-900 mb-2">Payment Pending</h4>
                  <p className="text-sm font-medium text-slate-500">
                    Please check your phone and enter your MoMo PIN to authorize the payment of <span className="font-bold">E{showMomoModal.price}</span>.
                  </p>
                </div>
              ) : paymentStatus === 'success' ? (
                <div className="py-10">
                   <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h4 className="text-lg font-black text-slate-900 mb-2">Payment Successful!</h4>
                  <p className="text-sm font-medium text-slate-500 mb-8">
                    Your resource is ready for download.
                  </p>
                  <a 
                    href={showMomoModal.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-emerald-700 transition-all"
                  >
                    <Download className="w-5 h-5" /> Download Now
                  </a>
                  <button 
                    onClick={() => setShowMomoModal(null)}
                    className="block w-full mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-600"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <div className="py-10">
                  <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <XCircle className="w-8 h-8 text-rose-600" />
                  </div>
                  <h4 className="text-lg font-black text-slate-900 mb-2">Payment Failed</h4>
                  <p className="text-sm font-medium text-slate-500 mb-8">
                    Either you rejected the request, your balance is low, or there was a system error.
                  </p>
                  <button 
                    onClick={() => setPaymentStatus('idle')}
                    className="w-full py-4 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-600 transition-all"
                  >
                    Try Again
                  </button>
                  <button 
                    onClick={() => setShowMomoModal(null)}
                    className="block w-full mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-600"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showReportModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white p-8 rounded-[40px] shadow-2xl max-w-2xl w-full border border-slate-100"
            >
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-2xl font-black text-slate-900">Academic History & Results</h3>
                  <p className="text-sm font-medium text-slate-500 mt-1">View and download previous report cards</p>
                </div>
                <button onClick={() => setShowReportModal(false)} className="bg-slate-100 p-3 rounded-full text-slate-500 hover:bg-slate-200">
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                {PAST_TRANSCRIPTS.map((t, i) => (
                  <div key={i} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 bg-slate-50 border border-slate-100 rounded-3xl gap-4 hover:border-blue-200 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center font-black">
                        {t.overall}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{t.term}</h4>
                        <p className="text-xs font-bold text-slate-400">Class Average: {t.score}%</p>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-slate-900 hover:text-white transition-all w-full sm:w-auto justify-center">
                      <Download className="w-4 h-4" /> Download PDF
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LEFT COLUMN: LIVE TIMETABLE */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-slate-100 p-1.5 rounded-2xl flex gap-1">
          <button 
            onClick={() => setActiveSubTab('academics')}
            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeSubTab === 'academics' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            My Studies
          </button>
          <button 
            onClick={() => setActiveSubTab('marketplace')}
            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeSubTab === 'marketplace' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Marketplace
          </button>
        </div>

        {activeSubTab === 'academics' ? (
          <>
            <div className="flex justify-between items-center px-2">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" /> Today's Schedule
          </h2>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tue, 12 May</span>
        </div>
        
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 relative">
          <div className="absolute left-[39px] top-10 bottom-10 w-0.5 bg-slate-100 rounded-full" />
          
          <div className="space-y-8 relative z-10">
            {MOCK_TIMETABLE.map((slot) => {
              const isCurrent = slot.status === 'current';
              const isCompleted = slot.status === 'completed';
              
              return (
                <motion.div 
                  key={slot.id} 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex gap-6 items-start ${isCompleted ? 'opacity-50' : 'opacity-100'}`}
                >
                  <div className="w-16 shrink-0 text-right pt-1">
                    <span className="text-[10px] font-black text-slate-500">{slot.time}</span>
                  </div>
                  
                  <div className="relative">
                    <div className={`w-4 h-4 rounded-full mt-1.5 ring-4 ${
                      isCurrent ? 'bg-blue-600 ring-blue-100 animate-pulse' : 
                      isCompleted ? 'bg-slate-300 ring-white border-2 border-slate-100' : 
                      'bg-white border-2 border-slate-300 ring-white'
                    }`} />
                  </div>
                  
                  <div className={`flex-1 p-5 rounded-2xl border transition-all ${
                    isCurrent 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 border-blue-600 scale-[1.02]' 
                      : isCompleted 
                        ? 'bg-slate-50 border-slate-100 text-slate-500' 
                        : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300'
                  }`}>
                    <h4 className="font-bold text-sm mb-1">{slot.subject}</h4>
                    {slot.teacher && (
                      <div className={`flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest ${isCurrent ? 'text-blue-200' : 'text-slate-400'}`}>
                        <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {slot.teacher}</span>
                      </div>
                    )}
                    <div className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest mt-2 ${isCurrent ? 'text-blue-100' : 'text-slate-500'}`}>
                      <MapPin className="w-3 h-3" /> {slot.room}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </>
    ) : (
      <div className="space-y-6">
        <div className="flex justify-between items-center px-2">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-600" /> Marketplace
          </h2>
        </div>
        
        <div className="space-y-4">
          {marketResources.filter(r => r.price > 0).map((res) => (
            <div key={res.id} className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all group">
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-[9px] font-black uppercase tracking-widest border border-amber-100">
                  {res.type.replace('_', ' ')}
                </span>
                <div className="flex items-center gap-1 text-emerald-600 font-bold text-sm">
                  E{res.price}
                </div>
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-blue-600 transition-colors">{res.title}</h4>
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">
                <BookOpen className="w-3 h-3" /> {res.authorName}
              </div>
              
              <button 
                onClick={() => handlePurchase(res)}
                disabled={isPurchasing === res.id}
                className="w-full py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 transition-all flex items-center justify-center gap-2"
              >
                {isPurchasing === res.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShoppingBag className="w-4 h-4" />}
                {isPurchasing === res.id ? 'Processing...' : 'Purchase To Download'}
              </button>
            </div>
          ))}
          
          {marketResources.filter(r => r.price > 0).length === 0 && (
            <div className="text-center py-12 px-6 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
              <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">No paid resources yet</p>
            </div>
          )}
        </div>
      </div>
    )}
  </div>

      {/* RIGHT COLUMN: GRADES, TASKS, EXAMS */}
      <div className="lg:col-span-8 space-y-8">
        
        {/* EXAM COUNTDOWNS */}
        {MOCK_EXAMS.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_EXAMS.map(exam => (
              <div key={exam.id} className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 rounded-3xl text-white shadow-lg shadow-amber-500/20 flex items-center justify-between">
                <div>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-[9px] font-black uppercase tracking-widest mb-3 inline-block">
                    {exam.type}
                  </span>
                  <h4 className="font-black text-lg">{exam.subject}</h4>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-4xl font-black">{exam.daysLeft}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-amber-100">Days Left</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* GRADE TRACKING */}
        <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 p-8 md:p-10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" /> Syllabus & Grade Tracking
            </h2>
            <button onClick={() => setShowReportModal(true)} className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-xl transition-colors">
              View Full Report Card
            </button>
          </div>

          <div className="space-y-6">
            {MOCK_GRADES.map(grade => (
              <div key={grade.subject} className="group">
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">{grade.subject}</h4>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${grade.trend.includes('+') ? 'text-emerald-500' : grade.trend.includes('-') ? 'text-rose-500' : 'text-slate-400'}`}>
                      {grade.trend} vs last term
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-slate-900">{grade.currentGrade}</span>
                    <span className="text-xs text-slate-400 font-bold ml-2">({grade.score}%)</span>
                  </div>
                </div>
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${grade.score}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className={`h-full ${grade.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SCHOLARSHIPS & CAREER GUIDANCE (High School Only) */}
        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-[40px] shadow-sm p-8 md:p-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-10">
              <GraduationCap className="w-64 h-64" />
            </div>
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h2 className="text-2xl font-black flex items-center gap-3">
                    <Rocket className="w-6 h-6 text-indigo-400" /> Career & scholarship Guidance
                  </h2>
                  <p className="text-indigo-200/60 font-medium mt-1">Planning for your future at UNESWA or abroad</p>
                </div>
                <button className="bg-indigo-500 text-white px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-indigo-400 transition-all">
                  Book Counselor Session
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors">
                  <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-2">Upcoming Deadline</p>
                  <h4 className="font-bold text-lg mb-1 whitespace-nowrap overflow-hidden text-ellipsis">Eswatini Gov Scholarship</h4>
                  <p className="text-indigo-200/50 text-[10px] uppercase font-black">Due: 30 June 2026</p>
                </div>
                <div className="p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors">
                  <p className="text-[10px] font-black text-emerald-300 uppercase tracking-widest mb-2">Matched Opportunity</p>
                  <h4 className="font-bold text-lg mb-1 whitespace-nowrap overflow-hidden text-ellipsis">Vodacom Tech Bursary</h4>
                  <p className="text-emerald-200/50 text-[10px] uppercase font-black">Eligibility: 95% Matched</p>
                </div>
                <div className="p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors">
                  <p className="text-[10px] font-black text-amber-300 uppercase tracking-widest mb-2">Career Roadmap</p>
                  <h4 className="font-bold text-lg mb-1 whitespace-nowrap overflow-hidden text-ellipsis">Software Engineering</h4>
                  <p className="text-amber-200/50 text-[10px] uppercase font-black">Next: Physics IGCSE</p>
                </div>
              </div>
            </div>
        </div>

        {/* PAST PAPERS & RESOURCES */}
        <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 p-8 md:p-10">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-600" /> Exam Resources & Past Papers
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { subject: 'Mathematics Core', year: '2023-2025', papers: 6 },
                { subject: 'Physical Science', year: '2022-2024', papers: 4 },
                { subject: 'English Language', year: '2023-2025', papers: 5 },
                { subject: 'Geography', year: '2024 Mock', papers: 2 }
              ].map(res => (
                  <button key={res.subject} className="p-5 bg-slate-50 border border-slate-100 rounded-2xl flex justify-between items-center hover:border-indigo-300 hover:bg-slate-100 transition-all group text-left">
                    <div>
                        <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors uppercase text-xs">{res.subject}</h4>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">{res.year} Archive</p>
                    </div>
                    <div className="flex items-center gap-2 text-indigo-600 font-black text-xs">
                        {res.papers} Papers <FileText className="w-4 h-4" />
                    </div>
                  </button>
              ))}
            </div>
        </div>

        {/* UPCOMING ASSIGNMENTS */}
        <div className="bg-slate-900 rounded-[40px] shadow-sm border border-slate-800 p-8 md:p-10 text-white">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-black flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-500" /> Action Items
            </h2>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <Bell className="w-4 h-4 text-white" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {MOCK_ASSIGNMENTS.map(task => (
              <div key={task.id} className={`p-6 rounded-3xl border transition-colors ${task.status === 'submitted' ? 'bg-white/5 border-white/10' : 'bg-blue-600/20 border-blue-500/30 hover:border-blue-500/50'}`}>
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-white/10 rounded-full text-[9px] font-black uppercase tracking-widest">
                    {task.subject}
                  </span>
                  {task.status === 'submitted' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                </div>
                <h4 className="font-bold text-sm mb-2">{task.title}</h4>
                <p className={`text-xs font-medium flex items-center gap-1 mb-4 ${task.status === 'submitted' ? 'text-slate-400' : 'text-amber-400'}`}>
                  <CalendarIcon className="w-3 h-3" /> Due {task.dueDate}
                </p>
                
                {task.status !== 'submitted' && (
                  <div className="pt-4 border-t border-white/10">
                    <input 
                      type="file" 
                      className="hidden" 
                      ref={fileInputRef}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleAssignmentUpload(task.id, file);
                      }}
                    />
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading === task.id.toString()}
                      className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
                    >
                      {isUploading === task.id.toString() ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <UploadCloud className="w-4 h-4" />
                      )}
                      {isUploading === task.id.toString() ? 'Uploading...' : 'Submit Work'}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
  </div>
  );
};
