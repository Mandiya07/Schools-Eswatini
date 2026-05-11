
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, UserRole, StudentProgress, AcademicResource, InstitutionType, BehaviorLog, HomeworkTask } from '../types';
import { hasPermission } from '../src/lib/permissions';
import { db, collection, query, where, getDocs, setDoc, doc, getDoc, OperationType, handleFirestoreError, getDocWithRetry, getDocsWithRetry } from '../src/lib/firebase';
import { BookOpen, Activity, Users, Save, Edit2, CheckCircle, GraduationCap, ClipboardList, TrendingUp, Search, Plus, X, FolderOpen, FileText, Download, UploadCloud, FileArchive, Lightbulb, Star, Bot, Sparkles, Loader2, CalendarCheck, BellRing, UserCheck, UserX, Award, ShieldAlert, MessageSquare, Briefcase, ChevronRight, ChevronDown, History, ClipboardCheck, Info, ArrowUpDown, Video as VideoIcon, Clock, ArrowRight, ShoppingBag } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

import { uploadFile } from '../src/services/storageService';
import { requestToPay, checkPaymentStatus } from '../src/services/momoService';
import { Phone } from 'lucide-react';

interface TeacherDashboardProps {
  user: User;
}

const MOCK_RESOURCES: any[] = [
  { id: '1', type: 'syllabus', title: 'EGCSE Mathematics Syllabus 2026-2028', subject: 'Mathematics', level: 'EGCSE', author: 'MoET Official', size: '2.4 MB', downloads: 1250, date: '2025-10-12', rating: 5.0, price: 0 },
  { id: '2', type: 'past_paper', title: 'Nov 2025 Physical Science Paper 1', subject: 'Science', level: 'EGCSE', author: 'Exams Council', size: '1.1 MB', downloads: 3420, date: '2026-01-05', rating: 5.0, price: 0 },
  { id: '3', type: 'past_paper', title: 'Nov 2025 Physical Science Mark Scheme', subject: 'Science', level: 'EGCSE', author: 'Exams Council', size: '0.8 MB', downloads: 3100, date: '2026-01-05', rating: 5.0, price: 0 },
  { id: '4', type: 'lesson_plan', title: 'Covalent & Ionic Bonding Visual Guide', subject: 'Chemistry', level: 'Form 4', author: 'Mrs. Simelane (Mbabane)', size: '5.6 MB', downloads: 342, date: '2026-03-15', rating: 4.8, price: 45 },
  { id: '5', type: 'lesson_plan', title: 'Siswati Poetry Analysis Framework', subject: 'SiSwati', level: 'Form 5', author: 'Mr. Zwane (Manzini)', size: '1.2 MB', downloads: 89, date: '2026-04-10', rating: 4.9, price: 60 },
  { id: '6', type: 'syllabus', title: 'Junior Certificate (JC) Agriculture', subject: 'Agriculture', level: 'Form 1-3', author: 'MoET Official', size: '1.9 MB', downloads: 856, date: '2025-08-20', rating: 5.0, price: 0 },
];

const MOCK_STUDENTS = [
  { id: 's1', name: 'Sipho Dlamini', status: 'present', merits: 12, demerits: 0, grade: 'Form 4', class: 'Pure' },
  { id: 's2', name: 'Thando Lukhele', status: 'absent', merits: 5, demerits: 2, grade: 'Form 4', class: 'Arts' },
  { id: 's3', name: 'Nomsa Mamba', status: 'present', merits: 24, demerits: 0, grade: 'Form 5', class: 'Science' },
  { id: 's4', name: 'Lwandle Ndlovu', status: 'late', merits: 8, demerits: 1, grade: 'Form 4', class: 'Pure' },
  { id: 's5', name: 'Ncamiso Zwane', status: 'present', merits: 3, demerits: 0, grade: 'Form 5', class: 'Science' },
  { id: 's6', name: 'Banele Shongwe', status: 'present', merits: 15, demerits: 0, grade: 'Form 4', class: 'Arts' },
  { id: 's7', name: 'Zanele Gamedze', status: 'present', merits: 9, demerits: 0, grade: 'Form 5', class: 'Commercial' },
  { id: 's8', name: 'Milo Simelane', status: 'absent', merits: 4, demerits: 3, grade: 'Form 4', class: 'Pure' },
  { id: 's9', name: 'Nonhle Masuku', status: 'present', merits: 18, demerits: 0, grade: 'Form 5', class: 'Science' },
  { id: 's10', name: 'Sihle Khumalo', status: 'late', merits: 7, demerits: 0, grade: 'Form 5', class: 'Commercial' },
];

const MOCK_FORUMS = [
  { id: 'f1', title: 'Integration vs Differentiation: Teaching Approaches', author: 'Mr. Dlamini', replies: 24, topic: 'Mathematics', active: '2h ago' },
  { id: 'f2', title: 'New MoET changes regarding Continuous Assessment', author: 'Mrs. Shongwe', replies: 56, topic: 'General Policy', active: '10m ago' },
  { id: 'f3', title: 'Handling disruptive behavior in large Form 2 classes', author: 'Ms. Gamedze', replies: 12, topic: 'Classroom Management', active: '1d ago' },
];

const MOCK_VACANCIES = [
  { id: 'v1', role: 'Senior Science Teacher (Physical)', school: 'St. Marks High School', location: 'Mbabane', type: 'Permanent', deadline: '2026-05-15' },
  { id: 'v2', role: 'Substitute Mathematics Teacher', school: 'Salesian High', location: 'Manzini', type: 'Contract (3 Months)', deadline: '2026-04-30' },
];

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<string>('classroom');
  const [resourceFilter, setResourceFilter] = useState('all');
  const [cpdFilter, setCpdFilter] = useState<'forums' | 'vacancies'>('forums');

  // Attendance states for mockup
  const [attendanceList, setAttendanceList] = useState(MOCK_STUDENTS);
  const [alertToast, setAlertToast] = useState<{message: string, type: 'merit' | 'alert' | null}>({message: '', type: null});

  // AI Assistant States
  const [aiMode, setAiMode] = useState<'quiz' | 'rubric'>('quiz');
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResult, setAiResult] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');

  const [progressData, setProgressData] = useState<StudentProgress[]>([]);
  const [institutionTeachers, setInstitutionTeachers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<StudentProgress>>({});
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [isPurchasing, setIsPurchasing] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [mgmtSearchTerm, setMgmtSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<string>('All Grades');
  const [selectedClass, setSelectedClass] = useState<string>('All Classes');
  const [sortOption, setSortOption] = useState<string>('name_asc');
  const [isCreating, setIsCreating] = useState(false);
  const [expandedReportIds, setExpandedReportIds] = useState<string[]>([]);
  const [showMomoModal, setShowMomoModal] = useState<AcademicResource | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('76');
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'pending' | 'success' | 'failed'>('idle');
  const [referenceId, setReferenceId] = useState<string | null>(null);

  const toggleReportExpansion = (id: string) => {
    setExpandedReportIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Resource Upload States
  const [isUploadingResource, setIsUploadingResource] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const resourceInputRef = React.useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadForm, setUploadForm] = useState<Partial<AcademicResource>>({
    type: 'past_paper',
    title: '',
    subject: '',
    level: 'EGCSE',
    price: 0
  });
  const [resources, setResources] = useState<any[]>(MOCK_RESOURCES);
  const [isEditingTutorProfile, setIsEditingTutorProfile] = useState(false);
  const [tutorProfileForm, setTutorProfileForm] = useState<User['tutorProfile']>(user.tutorProfile || {
    isEnabled: false,
    subjects: [],
    bio: '',
    availability: {
      days: [],
      timeRange: '08:00 - 17:00',
      status: 'available'
    },
    hourlyRate: 150,
    weeklyTeachingLoad: 10
  });

  const [isEditingTeacherProfile, setIsEditingTeacherProfile] = useState(false);
  const [teacherProfileForm, setTeacherProfileForm] = useState<User['teacherProfile']>(user.teacherProfile || {
    subjects: [],
    contactPhone: '',
    contactEmail: user.email,
    bio: ''
  });

  const tabs = [
    { id: 'classroom', label: 'Classroom' },
    { id: 'resources', label: 'Resources' },
    { id: 'ai_assistant', label: 'AI Assistant' },
    { id: 'management', label: 'Management' },
    { id: 'cpd', label: 'CPD' },
    { id: 'marketplace', label: 'Marketplace' },
    { id: 'colleagues', label: 'Colleagues' },
    { id: 'virtual_sessions', label: 'Virtual Sessions' }
  ];

  const filteredTabs = tabs.filter(tab => {
    // Teachers usually have core access, but AI or Marketplace might be restricted
    if (user.role === UserRole.SUPER_ADMIN || user.role === UserRole.INSTITUTION_ADMIN) return true;
    
    switch (tab.id) {
      case 'classroom': return true;
      case 'resources': return true;
      case 'ai_assistant': return hasPermission(user, 'canUseAI');
      case 'management': return true;
      case 'cpd': return true;
      case 'marketplace': return true;
      case 'colleagues': return true;
      case 'virtual_sessions': return true;
      default: return false;
    }
  });

  useEffect(() => {
    if (!filteredTabs.find(t => t.id === activeTab)) {
      setActiveTab(filteredTabs[0]?.id || 'classroom');
    }
  }, [filteredTabs, activeTab]);

  // Behavior & Homework States
  const [behaviorLogs, setBehaviorLogs] = useState<BehaviorLog[]>([]);
  const [homeworkTasks, setHomeworkTasks] = useState<HomeworkTask[]>([]);
  const [managementSubTab, setManagementSubTab] = useState<'attendance' | 'behavior' | 'homework'>('attendance');
  const [selectedStudentForLog, setSelectedStudentForLog] = useState<string>('');
  const [logDescription, setLogDescription] = useState('');
  const [isCreatingHomework, setIsCreatingHomework] = useState(false);
  const [newHomework, setNewHomework] = useState<Partial<HomeworkTask>>({
    title: '',
    description: '',
    subject: '',
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    status: 'active'
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (paymentStatus === 'pending' && referenceId) {
      interval = setInterval(async () => {
        try {
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
        } catch (error) {
          console.error("Polling error", error);
        }
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [paymentStatus, referenceId]);

  const handlePurchase = (resource: AcademicResource) => {
    if (resource.price === 0) {
      window.open(resource.url, '_blank');
      return;
    }
    setShowMomoModal(resource);
    setPaymentStatus('idle');
    setReferenceId(null);
  };

  const handleMomoPay = async () => {
    if (!showMomoModal) return;
    if (!phoneNumber.match(/^(76|78|79)\d{6}$/)) {
      alert("Please enter a valid Eswatini MTN MoMo number (76xxxxxx)");
      return;
    }

    setIsPurchasing(showMomoModal.id);
    setPaymentStatus('pending');
    try {
      const res = await requestToPay(showMomoModal, phoneNumber);
      setReferenceId(res.referenceId);
    } catch (error: any) {
      alert(error.message);
      setPaymentStatus('failed');
      setIsPurchasing(null);
    }
  };

  const handleUpdateTeacherProfile = async () => {
    setSaveStatus('saving');
    try {
      await setDoc(doc(db, 'users', user.id), { teacherProfile: teacherProfileForm }, { merge: true });
      setSaveStatus('success');
      setIsEditingTeacherProfile(false);
      setTimeout(() => setSaveStatus('idle'), 3000);
      triggerAlert('merit', 'Staff profile updated successfully!');
      
      // Update local institutionTeachers list manually for immediate re-render
      setInstitutionTeachers(prev => prev.map(t => t.id === user.id ? { ...t, teacherProfile: teacherProfileForm } : t));
    } catch (error) {
      setSaveStatus('error');
      handleFirestoreError(error, OperationType.UPDATE, `users/${user.id}/teacherProfile`);
    }
  };

  const handleUpdateTutorProfile = async () => {
    setSaveStatus('saving');
    try {
      await setDoc(doc(db, 'users', user.id), { tutorProfile: tutorProfileForm }, { merge: true });
      setSaveStatus('success');
      setIsEditingTutorProfile(false);
      setTimeout(() => setSaveStatus('idle'), 3000);
      triggerAlert('merit', 'Tutoring profile updated successfully!');
    } catch (error) {
      setSaveStatus('error');
      handleFirestoreError(error, OperationType.UPDATE, `users/${user.id}/tutorProfile`);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    setIsUploadingResource(true);
    try {
      const path = `resources/${user.id}/${Date.now()}_${selectedFile.name}`;
      const downloadUrl = await uploadFile(path, selectedFile);

      const newResource: AcademicResource = {
        ...(uploadForm as any),
        id: `res_${Date.now()}`,
        authorName: user.name,
        authorId: user.id,
        size: `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`,
        downloads: 0,
        rating: 0,
        date: new Date().toISOString().split('T')[0],
        url: downloadUrl,
        createdAt: new Date().toISOString()
      };

      // Save to Firestore
      await setDoc(doc(db, 'resources', newResource.id), newResource);
      
      setResources([newResource, ...resources]);
      setIsUploading(false);
      setSelectedFile(null);
      setUploadForm({ type: 'past_paper', title: '', subject: '', level: 'EGCSE', price: 0 });
      triggerAlert('merit', 'Resource uploaded successfully!');
    } catch (error) {
      console.error("Upload failed", error);
      triggerAlert('alert', 'Resource upload failed. Please try again.');
    } finally {
      setIsUploadingResource(false);
    }
  };

  const [institutionType, setInstitutionType] = useState<InstitutionType | null>(null);

  useEffect(() => {
    const fetchProgress = async () => {
      setLoading(true);
      try {
        if (user.institutionId) {
          try {
            const instDoc = await getDocWithRetry(doc(db, 'institutions', user.institutionId));
            if (instDoc && instDoc.exists()) {
              const instData = instDoc.data() as any;
              if (instData.type && instData.type.length > 0) {
                setInstitutionType(instData.type[0]);
              }
            }
          } catch (err) {
            if (err instanceof Error && !err.message.includes('offline')) {
              console.error("Failed to fetch institution type", err);
            } else {
              console.warn("Failed to fetch institution type (likely offline)");
            }
          }
          
          const teachersQ = query(collection(db, 'users'), 
            where('institutionId', '==', user.institutionId),
            where('role', '==', UserRole.TEACHER)
          );
          const teachersSnapshot = await getDocsWithRetry(teachersQ);
          setInstitutionTeachers(teachersSnapshot.docs.map(doc => doc.data() as User));
        }

        // FILTER BY INSTITUTION as requested
        const q = user.institutionId 
          ? query(collection(db, 'student_progress'), where('institutionId', '==', user.institutionId))
          : query(collection(db, 'student_progress'), where('teacherId', '==', user.id));
          
        const snapshot = await getDocsWithRetry(q);
        const data = snapshot.docs.map(doc => doc.data() as StudentProgress);
        
        // Mock data injection if empty for demo purposes
        if (data.length <= 1) {
          const mockData: StudentProgress[] = [
            {
              id: 'prog_teacher_1',
              studentId: 'stu_1',
              studentName: 'Sipho Dlamini',
              grade: 'Form 4',
              class: 'Pure',
              institutionId: user.institutionId || 'inst_1',
              teacherId: user.id,
              parentId: 'parent_1',
              term: 'Term 1',
              year: 2026,
              academics: [
                { subject: 'Mathematics', grade: 'A', comments: 'Excellent problem-solving skills.' },
                { subject: 'Science', grade: 'B+', comments: 'Good understanding of concepts.' },
                { subject: 'English', grade: 'A-', comments: 'Strong reading comprehension.' }
              ],
              behavior: { rating: 'Excellent', comments: 'Very respectful and attentive in class.' },
              participation: { rating: 'High', activities: ['Debate', 'Robotics'], comments: 'Actively engages in all classroom discussions.' },
              lastUpdated: new Date().toISOString()
            },
            {
              id: 'prog_teacher_2',
              studentId: 'stu_2',
              studentName: 'Thando Lukhele',
              grade: 'Form 4',
              class: 'Arts',
              institutionId: user.institutionId || 'inst_1',
              teacherId: user.id,
              parentId: 'parent_2',
              term: 'Term 1',
              year: 2026,
              academics: [
                { subject: 'Mathematics', grade: 'C', comments: 'Needs more practice with algebra.' },
                { subject: 'Science', grade: 'B', comments: 'Showing steady improvement.' },
                { subject: 'English', grade: 'B+', comments: 'Great essay writing.' }
              ],
              behavior: { rating: 'Good', comments: 'A bit talkative but stays on task.' },
              participation: { rating: 'Medium', activities: ['Basketball'], comments: 'Prefers physical activities.' },
              lastUpdated: new Date().toISOString()
            },
            {
              id: 'prog_teacher_3',
              studentId: 'stu_3',
              studentName: 'Nomsa Mamba',
              grade: 'Form 5',
              class: 'Science',
              institutionId: user.institutionId || 'inst_1',
              teacherId: user.id,
              parentId: 'parent_3',
              term: 'Term 1',
              year: 2026,
              academics: [
                { subject: 'Physics', grade: 'A+', comments: 'Brilliant grasp of theories.' },
                { subject: 'Chemistry', grade: 'A', comments: 'Meticulous in lab work.' }
              ],
              behavior: { rating: 'Excellent', comments: 'A role model student.' },
              participation: { rating: 'High', activities: ['Science Club'], comments: 'Leads effectively.' },
              lastUpdated: new Date().toISOString()
            },
            {
              id: 'prog_teacher_4',
              studentId: 'stu_4',
              studentName: 'Lwandle Ndlovu',
              grade: 'Form 4',
              class: 'Pure',
              institutionId: user.institutionId || 'inst_1',
              teacherId: user.id,
              parentId: 'parent_4',
              term: 'Term 1',
              year: 2026,
              academics: [
                { subject: 'English', grade: 'B', comments: 'Creative writer.' },
                { subject: 'SiSwati', grade: 'A', comments: 'Excellent linguistic ability.' }
              ],
              behavior: { rating: 'Needs Improvement', comments: 'Frequently distracted.' },
              participation: { rating: 'Low', activities: ['Drama'], comments: 'Passive during rehearsals.' },
              lastUpdated: new Date().toISOString()
            },
            {
              id: 'prog_teacher_5',
              studentId: 'stu_5',
              studentName: 'Ncamiso Zwane',
              grade: 'Form 5',
              class: 'Science',
              institutionId: user.institutionId || 'inst_1',
              teacherId: user.id,
              parentId: 'parent_5',
              term: 'Term 1',
              year: 2026,
              academics: [
                { subject: 'History', grade: 'B+', comments: 'Good analytical skills.' },
                { subject: 'Geography', grade: 'B', comments: 'Improved map reading.' }
              ],
              behavior: { rating: 'Good', comments: 'Polite and helpful.' },
              participation: { rating: 'Medium', activities: ['Eco Club'], comments: 'Participates well.' },
              lastUpdated: new Date().toISOString()
            }
          ];
          const combined = [...data, ...mockData.filter(m => !data.find(d => d.studentName === m.studentName))];
          setProgressData(combined);
        } else {
          setProgressData(data);
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.LIST, 'student_progress');
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
    fetchBehaviorLogs();
    fetchHomework();
  }, [user.id, user.institutionId]);

  const fetchBehaviorLogs = async () => {
    try {
      const q = query(collection(db, 'behavior_logs'), where('teacherId', '==', user.id));
      const snapshot = await getDocsWithRetry(q);
      const logs = snapshot.docs.map(doc => doc.data() as BehaviorLog);
      setBehaviorLogs(logs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch (error) {
      console.warn("Failed to fetch behavior logs (likely offline)");
    }
  };

  const fetchHomework = async () => {
    try {
      const q = query(collection(db, 'homework'), where('teacherId', '==', user.id));
      const snapshot = await getDocsWithRetry(q);
      setHomeworkTasks(snapshot.docs.map(doc => doc.data() as HomeworkTask));
    } catch (error) {
      console.warn("Failed to fetch homework (likely offline)");
    }
  };

  const handleSaveLog = async (type: 'merit' | 'demerit' | 'participation' | 'warning') => {
    if (!selectedStudentForLog || !logDescription.trim()) return;
    
    setSaveStatus('saving');
    try {
      const student = attendanceList.find(s => s.id === selectedStudentForLog);
      const id = `log_${Date.now()}`;
      const newLog: BehaviorLog = {
        id,
        studentId: selectedStudentForLog,
        studentName: student?.name || 'Unknown Student',
        teacherId: user.id,
        teacherName: user.name,
        type,
        points: type === 'merit' ? 10 : type === 'demerit' ? -10 : 0,
        description: logDescription,
        createdAt: new Date().toISOString()
      };
      
      await setDoc(doc(db, 'behavior_logs', id), newLog);
      setBehaviorLogs([newLog, ...behaviorLogs]);
      setLogDescription('');
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
      triggerAlert('merit', `${type.charAt(0).toUpperCase() + type.slice(1)} logged successfully!`);
    } catch (error) {
      setSaveStatus('error');
      handleFirestoreError(error, OperationType.CREATE, 'behavior_logs');
    }
  };

  const handleSaveHomework = async () => {
    if (!newHomework.title || !newHomework.subject) return;
    
    setSaveStatus('saving');
    try {
      const id = `hw_${Date.now()}`;
      const task: HomeworkTask = {
        ...newHomework,
        id,
        teacherId: user.id,
        teacherName: user.name,
        institutionId: user.institutionId || 'inst_1',
        createdAt: new Date().toISOString()
      } as HomeworkTask;
      
      await setDoc(doc(db, 'homework', id), task);
      setHomeworkTasks([task, ...homeworkTasks]);
      setIsCreatingHomework(false);
      setNewHomework({ title: '', description: '', subject: '', dueDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], status: 'active' });
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
      triggerAlert('merit', 'Homework task created!');
    } catch (error) {
      setSaveStatus('error');
      handleFirestoreError(error, OperationType.CREATE, 'homework');
    }
  };

  const handleEditClick = (progress: StudentProgress) => {
    setEditingId(progress.id);
    setEditForm(JSON.parse(JSON.stringify(progress)));
  };

  const handleSave = async () => {
    if (!editForm.id && !isCreating) return;
    
    setSaveStatus('saving');
    try {
      const id = editForm.id || `prog_${Date.now()}`;
      const updatedProgress = { 
        ...editForm, 
        id,
        institutionId: user.institutionId || 'inst_1',
        teacherId: editForm.teacherId || user.id,
        lastUpdated: new Date().toISOString() 
      } as StudentProgress;
      
      await setDoc(doc(db, 'student_progress', id), updatedProgress);
      
      if (isCreating) {
        setProgressData(prev => [updatedProgress, ...prev]);
        setIsCreating(false);
      } else {
        setProgressData(prev => prev.map(p => p.id === id ? updatedProgress : p));
        setEditingId(null);
      }
      
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      setSaveStatus('error');
      handleFirestoreError(error, OperationType.UPDATE, `student_progress/${editForm.id || 'new'}`);
    }
  };

  const startCreate = () => {
    const newReport: Partial<StudentProgress> = {
      studentName: '',
      teacherId: user.id,
      term: 'Term 1',
      year: 2026,
      academics: [{ subject: '', grade: '', comments: '' }],
      behavior: { rating: 'Good', comments: '' },
      participation: { rating: 'Medium', activities: [], comments: '' }
    };
    setEditForm(newReport);
    setIsCreating(true);
  };

  const filteredData = progressData.filter(p => {
    const matchesSearch = p.studentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === 'All Grades' || p.grade === selectedGrade;
    const matchesClass = selectedClass === 'All Classes' || p.class === selectedClass;
    return matchesSearch && matchesGrade && matchesClass;
  }).sort((a, b) => {
    if (sortOption === 'name_asc') return a.studentName.localeCompare(b.studentName);
    if (sortOption === 'name_desc') return b.studentName.localeCompare(a.studentName);
    if (sortOption === 'grade_asc') return (a.grade || '').localeCompare(b.grade || '');
    if (sortOption === 'performance_desc') {
      const avgA = a.academics.reduce((sum, sub) => sum + (sub.grade.charCodeAt(0) || 0), 0) / a.academics.length;
      const avgB = b.academics.reduce((sum, sub) => sum + (sub.grade.charCodeAt(0) || 0), 0) / b.academics.length;
      return avgA - avgB; // Lower char code (A) is better performance
    }
    return 0;
  });

  const uniqueGrades = ['All Grades', ...Array.from(new Set([...progressData.map(p => p.grade), ...MOCK_STUDENTS.map(s => s.grade || '')].filter(Boolean)))];
  const uniqueClasses = ['All Classes', ...Array.from(new Set([...progressData.map(p => p.class), ...MOCK_STUDENTS.map(s => s.class || '')].filter(Boolean)))];

  const filteredAttendance = attendanceList.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(mgmtSearchTerm.toLowerCase());
    const matchesGrade = selectedGrade === 'All Grades' || s.grade === selectedGrade;
    const matchesClass = selectedClass === 'All Classes' || s.class === selectedClass;
    return matchesSearch && matchesGrade && matchesClass;
  }).sort((a, b) => {
    if (sortOption === 'name_asc') return a.name.localeCompare(b.name);
    if (sortOption === 'name_desc') return b.name.localeCompare(a.name);
    if (sortOption === 'grade_asc') return (a.grade || '').localeCompare(b.grade || '');
    return 0;
  });


  const filteredHomeworkTasks = homeworkTasks.filter(task => {
    const matchesGrade = selectedGrade === 'All Grades' || task.assignedToGrade === selectedGrade;
    const matchesSearch = task.title.toLowerCase().includes(mgmtSearchTerm.toLowerCase()) || 
                          task.subject.toLowerCase().includes(mgmtSearchTerm.toLowerCase());
    return matchesGrade && matchesSearch;
  }).sort((a, b) => {
    if (sortOption === 'name_asc') return a.title.localeCompare(b.title);
    if (sortOption === 'name_desc') return b.title.localeCompare(a.title);
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  const filteredBehaviorLogs = behaviorLogs.filter(log => {
    const matchesSearch = log.studentName.toLowerCase().includes(mgmtSearchTerm.toLowerCase());
    const student = attendanceList.find(s => s.id === log.studentId);
    const matchesGrade = selectedGrade === 'All Grades' || (student && student.grade === selectedGrade);
    const matchesClass = selectedClass === 'All Classes' || (student && student.class === selectedClass);
    return matchesSearch && matchesGrade && matchesClass;
  }).sort((a, b) => {
    if (sortOption === 'name_asc') return a.studentName.localeCompare(b.studentName);
    if (sortOption === 'name_desc') return b.studentName.localeCompare(a.studentName);
    return 0;
  });

  const handleAcademicChange = (index: number, field: string, value: string) => {
    const newAcademics = [...(editForm.academics || [])];
    newAcademics[index] = { ...newAcademics[index], [field]: value };
    setEditForm({ ...editForm, academics: newAcademics });
  };

  const handleGenerateAI = async () => {
    if (!aiPrompt.trim()) return;
    setIsAiLoading(true);
    setAiError('');
    setAiResult('');
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      // Constructing prompt based on teacher context
      const systemContext = `You are a professional, helpful AI Co-Teacher Assistant for an educator in Eswatini. 
      The teacher is using a regional Eswatini Education Portal. Provide accurate, formatted responses suitable for a school environment. `;
      
      const specificPrompt = aiMode === 'quiz' 
        ? `${systemContext}\nTask: Generate a quiz based on: "${aiPrompt}". Provide 10 questions with multiple choices and an Answer Key at the very end.`
        : `${systemContext}\nTask: Generate a detailed grading rubric based on: "${aiPrompt}". Use a table format if possible, or clear headers.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro',
        contents: specificPrompt
      });
      
      setAiResult(response.text || 'No response generated. Please try again.');
    } catch (err: any) {
      console.error("AI Generation Error:", err);
      setAiError(err.message || 'Error communicating with AI Assistant.');
    } finally {
      setIsAiLoading(false);
    }
  };

  const [isGeneratingComment, setIsGeneratingComment] = useState<number | null>(null);

  const handleAutoComment = async (index: number, subject: string, grade: string) => {
    if (!subject || !grade) return;
    setIsGeneratingComment(index);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `As a teacher, write a professional, encouraging, 2-sentence end-of-term progress comment for a student who received a grade of '${grade}' in '${subject}'. Keep it constructive.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash',
        contents: prompt
      });
      
      if (response.text) {
        handleAcademicChange(index, 'comments', response.text.trim());
      }
    } catch (err) {
      console.error("Auto comment failed", err);
    } finally {
      setIsGeneratingComment(null);
    }
  };

  const triggerAlert = (type: 'merit' | 'alert', message: string) => {
    setAlertToast({message, type});
    setTimeout(() => setAlertToast({message: '', type: null}), 3000);
  };

  const handleAttendanceChange = (id: string, status: string) => {
    setAttendanceList(prev => prev.map(s => s.id === id ? { ...s, status } : s));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 relative">
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
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="text" 
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="MTN Mobile Number (76xxxxxx)"
                      className="w-full pl-12 pr-6 py-4 bg-slate-100 border-none rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 transition-all text-center"
                    />
                  </div>
                  <button 
                    onClick={handleMomoPay}
                    className="w-full py-4 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-600 transition-all"
                  >
                    Pay with MTN MoMo
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
                    Check your phone and enter your MoMo PIN to authorize <span className="font-bold">E{showMomoModal.price}</span>.
                  </p>
                </div>
              ) : paymentStatus === 'success' ? (
                <div className="py-10">
                   <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h4 className="text-lg font-black text-slate-900 mb-2">Success!</h4>
                  <p className="text-sm font-medium text-slate-500 mb-8">
                    Resource unlocked.
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
                    <X className="w-8 h-8 text-rose-600" />
                  </div>
                  <h4 className="text-lg font-black text-slate-900 mb-2">Failed</h4>
                  <p className="text-sm font-medium text-slate-500 mb-8">
                    Please try again.
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
      <header className="mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex-1">
            <div className="flex flex-col md:flex-row justify-between md:items-end w-full">
               <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-widest">
                      Authorized Workspace
                    </span>
                    <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
                      {user.name}
                    </span>
                  </div>
                  <h1 className="text-4xl font-black text-slate-900 tracking-tight">Teacher Dashboard</h1>
                  <p className="text-slate-500 font-medium mt-2 mb-4 md:mb-0">Manage academic progress, administrative tasks, and professional development.</p>
               </div>
               <div className="shrink-0 flex items-center gap-3">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">View As:</span>
                  <select 
                    value={institutionType || ''}
                    onChange={(e) => setInstitutionType(e.target.value as InstitutionType)}
                    className="bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    <option value="">Primary School</option>
                    <option value="High School">High School</option>
                    <option value="Tertiary">Tertiary / University</option>
                  </select>
               </div>
            </div>
          </div>
          
          {activeTab === 'classroom' && (
            <div className="flex flex-wrap gap-4 w-full md:w-auto mt-6 md:mt-0">
               <div className="relative flex-grow md:flex-grow-0">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                 <input 
                  className="w-full md:w-64 bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold focus:ring-4 focus:ring-blue-50 focus:border-blue-200 transition-all"
                  placeholder="Student name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                 />
               </div>
               <div className="flex gap-2">
                 <select 
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(e.target.value)}
                    className="bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-2xl px-4 py-4 focus:ring-4 focus:ring-blue-50 outline-none cursor-pointer"
                  >
                    {uniqueGrades.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                  <select 
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-2xl px-4 py-4 focus:ring-4 focus:ring-blue-50 outline-none cursor-pointer"
                  >
                    {uniqueClasses.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <div className="relative">
                    <ArrowUpDown className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select 
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                      className="bg-white border border-slate-200 text-teal-700 text-xs font-black uppercase tracking-widest rounded-2xl pl-12 pr-10 py-4 focus:ring-4 focus:ring-teal-50 outline-none cursor-pointer appearance-none shadow-sm"
                    >
                      <option value="name_asc">Sort: A-Z</option>
                      <option value="name_desc">Sort: Z-A</option>
                      <option value="grade_asc">Sort: Grade</option>
                      <option value="performance_desc">Sort: Academic Performance</option>
                    </select>
                  </div>
               </div>
               <button 
                onClick={startCreate}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
               >
                 <Plus className="w-4 h-4" />
                 New Report
               </button>
            </div>
          )}
        </div>

        {saveStatus === 'success' && (
          <div className="mt-8 flex items-center gap-2 text-emerald-600 bg-emerald-50 px-6 py-4 rounded-3xl font-black text-xs uppercase tracking-widest shadow-sm animate-in fade-in slide-in-from-top-2">
            <CheckCircle className="w-5 h-5" />
            Changes Processed Successfully
          </div>
        )}
      </header>

      {/* Global Tabs */}
      <div className="flex flex-wrap gap-4 mb-8">
        {filteredTabs.map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-4 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-3 transition-all ${
              activeTab === tab.id 
                ? (tab.id === 'classroom' ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' :
                   tab.id === 'virtual_sessions' ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-600/20' :
                   tab.id === 'management' ? 'bg-rose-600 text-white shadow-xl shadow-rose-600/20' :
                   tab.id === 'colleagues' ? 'bg-teal-600 text-white shadow-xl shadow-teal-600/20' :
                   tab.id === 'resources' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' :
                   tab.id === 'ai_assistant' ? 'bg-fuchsia-600 text-white shadow-xl shadow-fuchsia-600/20' :
                   tab.id === 'cpd' ? 'bg-orange-600 text-white shadow-xl shadow-orange-600/20' :
                   tab.id === 'marketplace' ? 'bg-amber-600 text-white shadow-xl shadow-amber-600/20' :
                   'bg-slate-900 text-white shadow-xl')
                : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab.id === 'classroom' && <BookOpen className="w-4 h-4" />}
            {tab.id === 'virtual_sessions' && <VideoIcon className="w-4 h-4" />}
            {tab.id === 'management' && <Users className="w-4 h-4" />}
            {tab.id === 'colleagues' && <UserCheck className="w-4 h-4" />}
            {tab.id === 'resources' && <FolderOpen className="w-4 h-4" />}
            {tab.id === 'ai_assistant' && <Bot className="w-4 h-4" />}
            {tab.id === 'cpd' && <MessageSquare className="w-4 h-4" />}
            {tab.id === 'marketplace' && <ShoppingBag className="w-4 h-4" />}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Independent Teacher Notice */}
      {!user.institutionId && (
        <div className="mb-8 p-6 bg-amber-50 border border-amber-100 rounded-3xl flex items-center gap-6">
          <div className="w-12 h-12 bg-amber-400 text-white rounded-2xl flex items-center justify-center shrink-0">
             <Star className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-black text-amber-900 uppercase tracking-widest">Independent Educator Account</h4>
            <p className="text-xs text-amber-700 font-medium">You are currently using the platform as an independent educator. Connect to a school to access internal classroom management and reporting tools.</p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Syncing Data...</p>
        </div>
      ) : (
        <>
          {activeTab === 'marketplace' && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-12 mb-20">
               <div className="bg-amber-900 rounded-[48px] p-16 text-white relative overflow-hidden flex flex-col md:flex-row items-center gap-12 border border-amber-800/50">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400 opacity-5 blur-[100px]" />
                  <div className="relative z-10 space-y-6 flex-1">
                     <span className="px-4 py-2 bg-amber-500/20 text-amber-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-500/30">Educator Creator Economy</span>
                     <h2 className="text-4xl font-black tracking-tight leading-tight">Your Expertise is Valuable.</h2>
                     <p className="text-amber-200/70 font-medium max-w-sm">
                        Turn your lesson plans and study guides into a sustainable income stream while helping students across the nation.
                     </p>
                     <div className="flex flex-wrap gap-4">
                        <button className="bg-amber-500 text-amber-950 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-amber-500/20">Upload New Resource</button>
                        <button 
                          onClick={() => setIsEditingTutorProfile(true)}
                          className="bg-white/10 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] border border-white/10 hover:bg-white/20 transition-all"
                        >
                          {tutorProfileForm?.isEnabled ? 'Edit Tutor Profile' : 'Setup Tutor Profile'}
                        </button>
                     </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 w-full relative z-10">
                     <div className="bg-white/5 p-8 rounded-[32px] border border-white/10">
                        <p className="text-[10px] font-black text-amber-400 uppercase tracking-widest mb-4">Total Revenue (All Time)</p>
                        <p className="text-4xl font-black text-white">SZL 2,450.00</p>
                        <div className="flex justify-between items-center mt-6 text-[10px] font-black uppercase tracking-widest">
                           <span className="text-slate-400">Platform Share (20%)</span>
                           <span className="text-rose-400">- SZL 490.00</span>
                        </div>
                     </div>
                     <div className="bg-white/5 p-8 rounded-[32px] border border-white/10">
                        <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-4">Status & Reach</p>
                        <div className="space-y-4">
                           <div className="flex justify-between items-center">
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tutoring</span>
                              <span className={`px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest ${tutorProfileForm?.isEnabled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                                 {tutorProfileForm?.isEnabled ? 'Online' : 'Offline'}
                              </span>
                           </div>
                           <div className="flex justify-between items-center">
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Connections</span>
                              <span className="text-xl font-black text-white">12 Pupils</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {isEditingTutorProfile && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[48px] border border-slate-100 shadow-xl p-10 md:p-14 space-y-12"
                  >
                     <div className="flex justify-between items-center">
                        <div>
                           <h3 className="text-2xl font-black text-slate-900 tracking-tight">Tutor Profile Settings</h3>
                           <p className="text-slate-500 font-medium">Define your subjects, availability, and tuition rates.</p>
                        </div>
                        <button onClick={() => setIsEditingTutorProfile(false)} className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:text-rose-500 transition-all">
                           <X className="w-6 h-6" />
                        </button>
                     </div>

                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="space-y-8">
                           <div className="flex items-center justify-between p-6 bg-slate-900 rounded-[32px] text-white">
                              <div className="flex items-center gap-4">
                                 <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${tutorProfileForm?.isEnabled ? 'bg-emerald-500' : 'bg-white/10'}`}>
                                    <CheckCircle className="w-6 h-6" />
                                 </div>
                                 <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Visibility</p>
                                    <p className="font-bold">{tutorProfileForm?.isEnabled ? 'Visible in Marketplace' : 'Hidden from Students'}</p>
                                 </div>
                              </div>
                              <button 
                                onClick={() => setTutorProfileForm(prev => ({ ...prev!, isEnabled: !prev!.isEnabled }))}
                                className={`w-14 h-8 rounded-full transition-all relative ${tutorProfileForm?.isEnabled ? 'bg-emerald-500' : 'bg-slate-700'}`}
                              >
                                 <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${tutorProfileForm?.isEnabled ? 'right-1' : 'left-1'}`} />
                              </button>
                           </div>

                           <div className="space-y-4">
                              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Tutoring Subjects</label>
                              <div className="flex flex-wrap gap-2">
                                 {['Mathematics', 'Physics', 'SiSwati', 'English', 'Biology', 'Chemistry', 'Geography', 'History'].map(sub => (
                                    <button
                                      key={sub}
                                      onClick={() => {
                                        const subjects = tutorProfileForm!.subjects.includes(sub)
                                          ? tutorProfileForm!.subjects.filter(s => s !== sub)
                                          : [...tutorProfileForm!.subjects, sub];
                                        setTutorProfileForm(prev => ({ ...prev!, subjects }));
                                      }}
                                      className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${tutorProfileForm!.subjects.includes(sub) ? 'bg-amber-600 text-white border-amber-600 shadow-lg shadow-amber-600/20' : 'bg-white text-slate-500 border-slate-200'}`}
                                    >
                                       {sub}
                                    </button>
                                 ))}
                              </div>
                           </div>

                           <div className="space-y-4">
                              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Bio / Introduction</label>
                              <textarea 
                                className="w-full bg-slate-50 border border-slate-100 rounded-[32px] p-6 font-medium text-slate-600 h-32 resize-none focus:bg-white focus:border-amber-400 transition-all outline-none"
                                placeholder="Describe your teaching style and experience..."
                                value={tutorProfileForm?.bio}
                                onChange={(e) => setTutorProfileForm(prev => ({ ...prev!, bio: e.target.value }))}
                              />
                           </div>
                        </div>

                        <div className="space-y-8">
                           <div className="space-y-4">
                              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Weekly Availability</label>
                              <div className="grid grid-cols-7 gap-2">
                                 {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => {
                                    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                                    const isSelected = tutorProfileForm!.availability.days.includes(dayNames[i]);
                                    return (
                                       <button
                                         key={i}
                                         onClick={() => {
                                           const days = isSelected
                                             ? tutorProfileForm!.availability.days.filter(d => d !== dayNames[i])
                                             : [...tutorProfileForm!.availability.days, dayNames[i]];
                                           setTutorProfileForm(prev => ({ ...prev!, availability: { ...prev!.availability, days } }));
                                         }}
                                         className={`h-12 rounded-xl flex items-center justify-center text-[10px] font-black border transition-all ${isSelected ? 'bg-slate-900 text-white border-slate-900 shadow-lg' : 'bg-slate-50 text-slate-400 border-slate-100'}`}
                                       >
                                          {day}
                                       </button>
                                    )
                                 })}
                              </div>
                           </div>

                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                              <div className="space-y-4">
                                 <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest uppercase tracking-widest">Rate (SZL / Hr)</label>
                                 <input 
                                   type="number"
                                   className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold text-slate-900 outline-none"
                                   value={tutorProfileForm?.hourlyRate}
                                   onChange={(e) => setTutorProfileForm(prev => ({ ...prev!, hourlyRate: parseInt(e.target.value) || 0 }))}
                                 />
                              </div>
                              <div className="space-y-4">
                                 <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest uppercase tracking-widest">Weekly Load (Hrs)</label>
                                 <input 
                                   type="number"
                                   className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold text-slate-900 outline-none"
                                   value={tutorProfileForm?.weeklyTeachingLoad || ''}
                                   placeholder="e.g. 10"
                                   onChange={(e) => setTutorProfileForm(prev => ({ ...prev!, weeklyTeachingLoad: parseInt(e.target.value) || 0 }))}
                                 />
                              </div>
                           </div>

                           <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                 <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest uppercase">Specific Availability Slots</label>
                                 <button 
                                   onClick={() => {
                                      const newSlot = { id: `slot_${Date.now()}`, date: '', time: '' };
                                      setTutorProfileForm(prev => ({
                                         ...prev!,
                                         availability: {
                                            ...prev!.availability,
                                            slots: [...(prev!.availability.slots || []), newSlot]
                                         }
                                      }));
                                   }}
                                   className="text-[10px] font-black uppercase tracking-widest text-amber-600 hover:text-amber-700 flex items-center gap-1"
                                 >
                                    <Plus className="w-3 h-3" /> Add Slot
                                 </button>
                              </div>
                              <div className="space-y-3">
                                 {(tutorProfileForm?.availability.slots || []).map((slot, idx) => (
                                    <div key={slot.id} className="flex items-center gap-2">
                                       <input 
                                         type="date"
                                         value={slot.date || ''}
                                         onChange={(e) => {
                                            const newSlots = [...(tutorProfileForm!.availability.slots || [])];
                                            newSlots[idx].date = e.target.value;
                                            setTutorProfileForm(prev => ({ ...prev!, availability: { ...prev!.availability, slots: newSlots } }));
                                         }}
                                         className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 outline-none"
                                       />
                                       <input 
                                         type="time"
                                         value={slot.time || ''}
                                         onChange={(e) => {
                                            const newSlots = [...(tutorProfileForm!.availability.slots || [])];
                                            newSlots[idx].time = e.target.value;
                                            setTutorProfileForm(prev => ({ ...prev!, availability: { ...prev!.availability, slots: newSlots } }));
                                         }}
                                         className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 outline-none"
                                       />
                                       <button 
                                         onClick={() => {
                                            const newSlots = tutorProfileForm!.availability.slots!.filter(s => s.id !== slot.id);
                                            setTutorProfileForm(prev => ({ ...prev!, availability: { ...prev!.availability, slots: newSlots } }));
                                         }}
                                         className="p-3 bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-100"
                                       >
                                          <X className="w-4 h-4" />
                                       </button>
                                    </div>
                                 ))}
                                 {(!tutorProfileForm?.availability.slots || tutorProfileForm.availability.slots.length === 0) && (
                                    <p className="text-xs text-slate-400 font-medium text-center py-4 border border-dashed border-slate-200 rounded-2xl">No specific slots added. Add slots to allow students to book specific times.</p>
                                 )}
                              </div>
                           </div>

                           <div className="p-8 bg-amber-50 rounded-[32px] border border-amber-100 space-y-4">
                              <div className="flex items-center gap-3">
                                 <Sparkles className="text-amber-500 w-5 h-5" />
                                 <h4 className="text-sm font-black text-amber-900 uppercase tracking-widest">Pro Tip</h4>
                              </div>
                              <p className="text-xs text-amber-700 font-medium leading-relaxed">
                                 Detailed bios and specific availability slots increase student connection rates by up to 40%. Listing your primary institution also builds trust.
                              </p>
                           </div>
                        </div>
                     </div>

                     <div className="flex justify-end gap-4 pt-12 border-t border-slate-100">
                        <button 
                          onClick={() => setIsEditingTutorProfile(false)}
                          className="px-8 py-4 bg-slate-50 text-slate-400 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-100 transition-all"
                        >
                           Discard Changes
                        </button>
                        <button 
                          onClick={handleUpdateTutorProfile}
                          disabled={saveStatus === 'saving'}
                          className="px-12 py-4 bg-amber-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-amber-600/20 hover:bg-amber-700 transition-all flex items-center gap-3"
                        >
                           {saveStatus === 'saving' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                           Save Tutor Profile
                        </button>
                     </div>
                  </motion.div>
               )}

               <div>
                  <div className="flex items-center justify-between mb-8">
                     <h3 className="text-2xl font-black text-slate-900 tracking-tight">My Published Products</h3>
                     <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-amber-600" />
                        <span className="text-xs font-bold text-slate-500">Live Sales Data</span>
                     </div>
                  </div>
                  
                  <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
                     <table className="w-full text-left border-collapse">
                        <thead>
                           <tr className="bg-slate-50 border-b border-slate-100">
                              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Resource Details</th>
                              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Price</th>
                              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Sales</th>
                              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Revenue (Net)</th>
                              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Action</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 italic">
                           {[
                              { title: 'Full Form 5 Maths Revision Pack', type: 'Study Pack', price: 150, sales: 12, net: 1440 },
                              { title: 'Biology Lab Report Templates', type: 'Templates', price: 45, sales: 8, net: 288 },
                              { title: 'EGCSE English Essay Guide', type: 'Guide', price: 75, sales: 4, net: 240 }
                           ].map((item, i) => (
                              <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                                 <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                       <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 font-bold">
                                          {item.title[0]}
                                       </div>
                                       <div>
                                          <p className="font-black text-slate-900">{item.title}</p>
                                          <p className="text-[10px] font-black uppercase text-slate-400">{item.type}</p>
                                       </div>
                                    </div>
                                 </td>
                                 <td className="px-8 py-6 font-bold text-slate-600 italic">SZL {item.price}</td>
                                 <td className="px-8 py-6 font-bold text-slate-900">{item.sales} units</td>
                                 <td className="px-8 py-6">
                                    <p className="font-black text-emerald-600">SZL {item.net}</p>
                                    <p className="text-[9px] font-black text-slate-400 uppercase">After 20% commission</p>
                                 </td>
                                 <td className="px-8 py-6 text-right">
                                    <button className="p-3 bg-slate-100 text-slate-400 rounded-xl hover:bg-slate-900 hover:text-white transition-all">
                                       <Edit2 className="w-4 h-4" />
                                    </button>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
          )}
          {activeTab === 'classroom' && (
            <div className="grid grid-cols-1 gap-8 animate-in fade-in duration-300">
              {/* Create Form Section */}
              {isCreating && (
            <div className="bg-white rounded-[40px] border-4 border-dashed border-blue-200 p-10 animate-in zoom-in-95 duration-300">
               <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-black text-slate-900">Create New Progress Report</h2>
                  <button onClick={() => setIsCreating(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                    <X className="w-6 h-6" />
                  </button>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Student Name</label>
                    <input 
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 font-bold text-slate-900"
                      value={editForm.studentName}
                      onChange={(e) => setEditForm({...editForm, studentName: e.target.value})}
                      placeholder="Enter Full Name"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Assigned Teacher</label>
                    <select 
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 font-bold text-slate-900"
                      value={editForm.teacherId}
                      onChange={(e) => setEditForm({...editForm, teacherId: e.target.value})}
                    >
                      <option value={user.id}>{user.name} (You)</option>
                      {institutionTeachers.filter(t => t.id !== user.id).map(t => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Term</label>
                      <select 
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 font-bold text-slate-900"
                        value={editForm.term}
                        onChange={(e) => setEditForm({...editForm, term: e.target.value})}
                      >
                        <option>Term 1</option>
                        <option>Term 2</option>
                        <option>Term 3</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Year</label>
                      <input 
                        type="number"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 font-bold text-slate-900"
                        value={editForm.year}
                        onChange={(e) => setEditForm({...editForm, year: parseInt(e.target.value)})}
                      />
                    </div>
                  </div>
               </div>

               <div className="flex justify-end gap-3 pt-8 border-t">
                  <button 
                    onClick={() => setIsCreating(false)}
                    className="px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black uppercase tracking-widest text-[10px]"
                  >
                    Discard Draft
                  </button>
                  <button 
                    onClick={handleSave}
                    disabled={!editForm.studentName || saveStatus === 'saving'}
                    className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg disabled:opacity-50"
                  >
                    {saveStatus === 'saving' ? 'Creating...' : 'Finalize & Create Report'}
                  </button>
               </div>
            </div>
          )}

          {filteredData.length === 0 && !isCreating ? (
            <div className="text-center py-32 bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200">
               <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <Users className="w-8 h-8 text-slate-300" />
               </div>
               <h3 className="text-xl font-black text-slate-900">No students found</h3>
               <p className="text-slate-400 font-medium mt-2">Adjust your search or create a new student report.</p>
               <button onClick={startCreate} className="mt-8 text-blue-600 font-black uppercase tracking-widest text-[10px] hover:underline underline-offset-8">
                 + Create your first report
               </button>
            </div>
          ) : (
            filteredData.map(progress => {
              const isEditing = editingId === progress.id;
              const isExpanded = expandedReportIds.includes(progress.id) || isEditing;
              const data = isEditing ? editForm as StudentProgress : progress;

              return (
                <div key={progress.id} className={`transition-all duration-500 bg-white rounded-[40px] border shadow-sm overflow-hidden ${isEditing ? 'border-blue-200 ring-4 ring-blue-50' : 'border-slate-100 hover:shadow-md'}`}>
                  {/* Header Card */}
                  <div 
                    onClick={() => !isEditing && toggleReportExpansion(progress.id)}
                    className={`p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b transition-colors ${isEditing ? 'bg-blue-600 border-blue-700 text-white cursor-default' : 'bg-slate-50 border-slate-100 text-slate-900 cursor-pointer hover:bg-slate-100'}`}
                  >
                    <div className="flex items-center gap-6">
                      <div className={`w-16 h-16 rounded-3xl flex items-center justify-center text-2xl shadow-inner ${isEditing ? 'bg-white/20' : 'bg-white border border-slate-200 text-blue-600'}`}>
                        {data.studentName.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                           <h2 className="text-2xl font-black tracking-tight">{data.studentName}</h2>
                           <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${isEditing ? 'bg-white/20 text-white border-white/20' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                             {data.grade || 'No Grade'} {data.class || ''}
                           </span>
                           {!isEditing && <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-[8px] font-black uppercase tracking-widest">Active</span>}
                        </div>
                        <div className="flex items-center gap-4 mt-1 opacity-70">
                          <span className="text-xs font-bold">{data.term} {data.year}</span>
                          <div className="w-1 h-1 rounded-full bg-current" />
                          <span className="text-xs font-bold lowercase italic">Teacher: {institutionTeachers.find(t => t.id === data.teacherId)?.name || 'Assigned'}</span>
                          <div className="w-1 h-1 rounded-full bg-current" />
                          <span className="text-xs font-bold lowercase italic">last updated {new Date(data.lastUpdated).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                      <div className="flex gap-3 flex-1 md:flex-none">
                        {isEditing ? (
                          <>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingId(null);
                              }}
                              className="flex-1 md:flex-none px-6 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all"
                            >
                              Cancel
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSave();
                              }}
                              disabled={saveStatus === 'saving'}
                              className="flex-1 md:flex-none px-8 py-4 bg-white text-blue-600 hover:bg-slate-50 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg transition-all flex items-center justify-center gap-2"
                            >
                              <Save className="w-4 h-4" />
                              {saveStatus === 'saving' ? 'Saving...' : 'Save Report'}
                            </button>
                          </>
                        ) : (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditClick(progress);
                            }}
                            className="w-full md:w-auto px-8 py-4 bg-slate-900 hover:bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2 shadow-xl"
                          >
                            <Edit2 className="w-4 h-4" />
                            Edit Progress
                          </button>
                        )}
                      </div>
                      
                      {!isEditing && (
                        <div className={`p-2 rounded-xl transition-all ${isExpanded ? 'bg-blue-600 text-white rotate-180' : 'bg-slate-200 text-slate-500'}`}>
                          <ChevronDown className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="p-8 md:p-10 border-t border-slate-100">
                          {isEditing && (
                            <div className="mb-8 p-6 bg-blue-50 rounded-3xl border border-blue-100">
                              <label className="block text-[10px] font-black text-blue-400 uppercase tracking-widest mb-3">Reassign Academic Oversight</label>
                              <div className="flex flex-wrap gap-3">
                                <button 
                                  onClick={() => setEditForm({...editForm, teacherId: user.id})}
                                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${editForm.teacherId === user.id ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border border-blue-200'}`}
                                >
                                  Assign to Me
                                </button>
                                {institutionTeachers.filter(t => t.id !== user.id).map(t => (
                                  <button 
                                    key={t.id}
                                    onClick={() => setEditForm({...editForm, teacherId: t.id})}
                                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${editForm.teacherId === t.id ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border border-blue-200'}`}
                                  >
                                    {t.name}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                      {/* Academic Performance */}
                      <div className="lg:col-span-12">
                         <div className="flex items-center gap-3 mb-8">
                            <BookOpen className="w-5 h-5 text-blue-600" />
                            <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase tracking-widest text-xs">
                              {institutionType === InstitutionType.PRIMARY ? "Foundational Subjects" : 
                               institutionType === InstitutionType.TERTIARY ? "Course Units & Modules" : 
                               "Subject Performance"}
                            </h3>
                         </div>
                         
                         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {data.academics.map((acad, idx) => (
                              <div key={idx} className="group p-8 bg-slate-50 rounded-[32px] border border-slate-100 relative transition-all hover:bg-white hover:border-blue-200 hover:shadow-xl">
                                {isEditing ? (
                                  <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                      <input 
                                        className="bg-transparent border-none p-0 font-black text-slate-900 focus:ring-0 w-full"
                                        value={acad.subject}
                                        onChange={(e) => handleAcademicChange(idx, 'subject', e.target.value)}
                                        placeholder="Subject Name"
                                      />
                                      <button 
                                        onClick={() => {
                                          const newAcademics = [...(editForm.academics || [])];
                                          newAcademics.splice(idx, 1);
                                          setEditForm({ ...editForm, academics: newAcademics });
                                        }}
                                        className="text-rose-400 hover:text-rose-600 p-1"
                                      >
                                        ✕
                                      </button>
                                    </div>
                                    <input 
                                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-black text-blue-600 text-xl"
                                      value={acad.grade}
                                      onChange={(e) => handleAcademicChange(idx, 'grade', e.target.value)}
                                      placeholder="A+"
                                    />
                                    <div className="relative">
                                      <textarea 
                                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-medium text-sm text-slate-500 h-24 resize-none pr-10"
                                        value={acad.comments}
                                        onChange={(e) => handleAcademicChange(idx, 'comments', e.target.value)}
                                        placeholder="Teacher comments..."
                                      />
                                      <button
                                        onClick={() => handleAutoComment(idx, acad.subject, acad.grade)}
                                        disabled={!acad.subject || !acad.grade || isGeneratingComment === idx}
                                        className="absolute top-2 right-2 p-2 bg-fuchsia-100 text-fuchsia-600 hover:bg-fuchsia-200 rounded-lg transition-colors shadow-sm disabled:opacity-50"
                                        title="Auto-Generate Comment"
                                      >
                                        {isGeneratingComment === idx ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <div className="flex justify-between items-start mb-6">
                                      <h4 className="text-slate-400 font-black uppercase tracking-widest text-[10px]">{acad.subject}</h4>
                                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-xl font-black text-blue-600 shadow-sm">
                                        {acad.grade}
                                      </div>
                                    </div>
                                    <p className="text-slate-600 font-medium text-sm leading-relaxed">{acad.comments}</p>
                                  </>
                                )}
                              </div>
                            ))}
                            {isEditing && (
                              <button 
                                onClick={() => {
                                  setEditForm({
                                    ...editForm,
                                    academics: [...(editForm.academics || []), { subject: '', grade: '', comments: '' }]
                                  });
                                }}
                                className="p-8 border-4 border-dashed border-slate-100 rounded-[32px] flex flex-col items-center justify-center gap-4 text-slate-300 hover:text-blue-400 hover:border-blue-100 hover:bg-blue-50/30 transition-all min-h-[250px]"
                              >
                                <div className="w-16 h-16 rounded-full border-4 border-current flex items-center justify-center text-4xl font-light">+</div>
                                <span className="font-black uppercase tracking-widest text-[10px]">Add Evaluation Subject</span>
                              </button>
                            )}
                         </div>
                      </div>

                      {/* Conduct & Participation */}
                      <div className="lg:col-span-6">
                        <div className="flex items-center gap-3 mb-8">
                            <Activity className="w-5 h-5 text-emerald-600" />
                            <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase tracking-widest text-xs">
                              {institutionType === InstitutionType.PRIMARY ? "Behavior & Social Skills" : 
                               institutionType === InstitutionType.TERTIARY ? "Professional Conduct" : 
                               "Behavioral Conduct & Discipline"}
                            </h3>
                        </div>
                        <div className="bg-slate-50 rounded-[32px] p-8 border border-slate-100 h-full">
                          {isEditing ? (
                            <div className="space-y-6">
                               <div>
                                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Rating</label>
                                  <div className="grid grid-cols-2 gap-3">
                                    {['Excellent', 'Good', 'Needs Improvement', 'Poor'].map((r) => (
                                      <button
                                        key={r}
                                        onClick={() => setEditForm({...editForm, behavior: { ...editForm.behavior!, rating: r as any }})}
                                        className={`px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${data.behavior.rating === r ? 'bg-slate-900 text-white border-slate-900 shadow-lg' : 'bg-white text-slate-500 border-slate-200'}`}
                                      >
                                        {r}
                                      </button>
                                    ))}
                                  </div>
                               </div>
                               <div>
                                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Detailed Observations</label>
                                  <textarea 
                                    className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 font-medium text-slate-600 h-32 resize-none"
                                    value={data.behavior.comments}
                                    onChange={(e) => setEditForm({...editForm, behavior: { ...editForm.behavior!, comments: e.target.value }})}
                                    placeholder="Observations about discipline..."
                                  />
                               </div>
                               <div className="space-y-4">
                                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest uppercase tracking-widest">Meeting Link</label>
                                  <input 
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold text-slate-900 outline-none"
                                    value={tutorProfileForm?.meetingLink || ''}
                                    placeholder="e.g. Zoom/Meet/Teams link"
                                    onChange={(e) => setTutorProfileForm(prev => ({ ...prev!, meetingLink: e.target.value }))}
                                  />
                               </div>
                               <div className="space-y-4">
                                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest uppercase tracking-widest">Meeting Link</label>
                                  <input 
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold text-slate-900 outline-none"
                                    value={tutorProfileForm?.meetingLink || ''}
                                    placeholder="e.g. Zoom/Meet/Teams link"
                                    onChange={(e) => setTutorProfileForm(prev => ({ ...prev!, meetingLink: e.target.value }))}
                                  />
                               </div>
                            </div>
                          ) : (
                            <div className="flex flex-col gap-6">
                              <div className="flex items-center justify-between">
                                 <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm ${
                                    data.behavior.rating === 'Excellent' ? 'bg-emerald-500 text-white' : 
                                    data.behavior.rating === 'Good' ? 'bg-blue-500 text-white' : 'bg-rose-500 text-white'
                                 }`}>
                                    {data.behavior.rating} Status
                                 </div>
                                 <ClipboardList className="w-5 h-5 text-slate-300" />
                              </div>
                              <p className="text-slate-600 font-medium leading-relaxed italic border-l-4 border-slate-200 pl-6 py-2">
                                "{data.behavior.comments}"
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="lg:col-span-6">
                        <div className="flex items-center gap-3 mb-8">
                            <Users className="w-5 h-5 text-purple-600" />
                            <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase tracking-widest text-xs">
                              {institutionType === InstitutionType.PRIMARY ? "Classroom Engagement" : 
                               institutionType === InstitutionType.TERTIARY ? "Seminars, Research & Clubs" : 
                               "Extracurricular Engagement"}
                            </h3>
                        </div>
                        <div className="bg-slate-50 rounded-[32px] p-8 border border-slate-100 h-full">
                           {isEditing ? (
                             <div className="space-y-6">
                                <div>
                                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Participation Level</label>
                                  <div className="grid grid-cols-3 gap-3">
                                    {['High', 'Medium', 'Low'].map((r) => (
                                      <button
                                        key={r}
                                        onClick={() => setEditForm({...editForm, participation: { ...editForm.participation!, rating: r as any }})}
                                        className={`px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${data.participation.rating === r ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-500 border-slate-200'}`}
                                      >
                                        {r}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                                    {institutionType === InstitutionType.TERTIARY ? "Societies & Committees" : "Extra-Curricular Activities"}
                                  </label>
                                  <input 
                                    className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 font-bold text-slate-900"
                                    value={data.participation.activities.join(', ')}
                                    onChange={(e) => setEditForm({
                                      ...editForm, 
                                      participation: { ...editForm.participation!, activities: e.target.value.split(',').map(s => s.trim()).filter(s => s !== '') }
                                    })}
                                    placeholder="e.g. Debate, Swimming, Coding"
                                  />
                                </div>
                             </div>
                           ) : (
                             <div className="space-y-6">
                               <div className="flex items-center gap-3">
                                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active In:</span>
                                  <div className="flex flex-wrap gap-2">
                                    {data.participation.activities.map((act, i) => (
                                      <span key={i} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-black text-slate-600 uppercase tracking-widest shadow-sm">
                                        {act}
                                      </span>
                                    ))}
                                    {data.participation.activities.length === 0 && <span className="text-slate-400 text-xs italic">No activities listed</span>}
                                  </div>
                               </div>
                               <p className="text-slate-600 font-medium leading-relaxed bg-white/50 p-6 rounded-2xl border border-white">
                                  {data.participation.comments || "No participation comments recorded."}
                               </p>
                             </div>
                           )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })
    )}
  </div>
  )}

        {/* Resources Exchange Tab */}
        {activeTab === 'resources' && (
          <div className="animate-in fade-in duration-300">
            {/* Header / Info Panel */}
            <div className="bg-slate-900 rounded-[40px] text-white p-10 mb-8 border border-slate-800 shadow-xl overflow-hidden relative">
               <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px]" />
               <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                 <div className="md:w-2/3">
                   <div className="flex items-center gap-3 mb-4">
                     <FolderOpen className="w-8 h-8 text-indigo-400" />
                     <h2 className="text-3xl font-black text-white tracking-tight">National Resource Exchange</h2>
                   </div>
                   <p className="text-slate-300 font-medium leading-relaxed max-w-xl">
                     Access certified MoET syllabi, crowdsource EGCSE past papers, and download lesson plans uploaded directly by educators across Eswatini.
                   </p>
                 </div>
                 <div className="w-full md:w-auto">
                   <button 
                     onClick={() => setIsUploading(true)}
                     className="w-full md:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-indigo-900/50 flex items-center justify-center gap-3"
                   >
                     <UploadCloud className="w-4 h-4" /> Upload Material
                   </button>
                 </div>
               </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-8">
               <button 
                 onClick={() => setResourceFilter('all')}
                 className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${resourceFilter === 'all' ? 'bg-slate-900 text-white border-slate-900 shadow-lg' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
               >
                 All Resources
               </button>
               <button 
                 onClick={() => setResourceFilter('syllabus')}
                 className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${resourceFilter === 'syllabus' ? 'bg-blue-600 text-white border-blue-600 shadow-lg' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
               >
                 Syllabi & Guides
               </button>
               <button 
                 onClick={() => setResourceFilter('past_paper')}
                 className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${resourceFilter === 'past_paper' ? 'bg-amber-500 text-white border-amber-500 shadow-lg' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
               >
                 Past Papers
               </button>
               <button 
                 onClick={() => setResourceFilter('lesson_plan')}
                 className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${resourceFilter === 'lesson_plan' ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
               >
                 Lesson Plans
               </button>
            </div>

            {/* Resource Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {resources.filter(r => resourceFilter === 'all' || r.type === resourceFilter).map(resource => (
                 <div key={resource.id} className="bg-white rounded-[32px] border border-slate-100 p-8 hover:shadow-2xl hover:border-indigo-100 transition-all group flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${
                        resource.type === 'syllabus' ? 'bg-blue-500 shadow-blue-500/20' : 
                        resource.type === 'past_paper' ? 'bg-amber-500 shadow-amber-500/20' : 
                        'bg-emerald-500 shadow-emerald-500/20'
                      }`}>
                        {resource.type === 'syllabus' && <FileText className="w-6 h-6" />}
                        {resource.type === 'past_paper' && <FileArchive className="w-6 h-6" />}
                        {resource.type === 'lesson_plan' && <Lightbulb className="w-6 h-6" />}
                      </div>
                      <div className="flex flex-col items-end gap-1">
                         <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{resource.size}</span>
                         {resource.rating > 0 && (
                           <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2 py-1 rounded-md">
                             <Star className="w-3 h-3 fill-amber-500" />
                             <span className="text-[10px] font-bold">{resource.rating}</span>
                           </div>
                         )}
                      </div>
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex gap-2 mb-3">
                         <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-[9px] font-black uppercase tracking-widest">{resource.subject}</span>
                         <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-[9px] font-black uppercase tracking-widest">{resource.level}</span>
                      </div>
                      <h3 className="text-xl font-black text-slate-900 leading-tight mb-2 group-hover:text-indigo-600 transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-sm font-medium text-slate-500 tracking-tight">By {resource.authorName || resource.author}</p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                       <div className="flex flex-col">
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                           {resource.downloads.toLocaleString()} Downloads
                         </span>
                         {resource.price > 0 ? (
                           <span className="text-xs font-black text-emerald-600">SZL {resource.price}</span>
                         ) : (
                           <span className="text-[10px] font-black text-blue-600 uppercase">Free Community Resource</span>
                         )}
                       </div>
                       <button 
                          onClick={() => handlePurchase(resource as AcademicResource)}
                          disabled={isPurchasing === resource.id}
                          className="flex items-center gap-2 text-indigo-600 bg-indigo-50 hover:bg-indigo-600 hover:text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors disabled:opacity-50"
                        >
                          {isPurchasing === resource.id ? <Loader2 className="w-4 h-4 animate-spin" /> : (resource.price > 0 ? <ShoppingBag className="w-4 h-4" /> : <Download className="w-4 h-4" />)}
                          {isPurchasing === resource.id ? 'Processing...' : (resource.price > 0 ? 'Buy' : 'Get')}
                        </button>
                    </div>
                 </div>
               ))}
            </div>

            {/* Upload Modal */}
            {isUploading && (
              <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
                  onClick={() => setIsUploading(false)}
                />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="bg-white rounded-[40px] w-full max-w-xl p-10 relative z-10 shadow-2xl overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl -mr-16 -mt-16" />
                  
                  <div className="flex justify-between items-center mb-8 relative">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Upload Academic Material</h3>
                    <button onClick={() => setIsUploading(false)} className="text-slate-400 hover:text-slate-600">
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <form onSubmit={handleUploadSubmit} className="space-y-6 relative">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Type</label>
                        <select 
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-bold text-sm"
                          value={uploadForm.type}
                          onChange={e => setUploadForm({...uploadForm, type: e.target.value as any})}
                        >
                          <option value="past_paper">Past Paper</option>
                          <option value="lesson_plan">Lesson Plan</option>
                          <option value="guide">Revision Guide</option>
                          <option value="syllabus">Syllabus Breakdown</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Level</label>
                        <select 
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-bold text-sm"
                          value={uploadForm.level}
                          onChange={e => setUploadForm({...uploadForm, level: e.target.value})}
                        >
                          <option value="EPC">EPC (Primary)</option>
                          <option value="JC">JC (Junior)</option>
                          <option value="EGCSE">EGCSE</option>
                          <option value="IGCSE">IGCSE</option>
                          <option value="Pre-Voc">Pre-Voc</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Resource Title</label>
                      <input 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-bold"
                        placeholder="e.g. Nov 2023 Math Paper 2"
                        value={uploadForm.title}
                        onChange={e => setUploadForm({...uploadForm, title: e.target.value})}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Subject</label>
                        <input 
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-bold"
                          placeholder="e.g. Mathematics"
                          value={uploadForm.subject}
                          onChange={e => setUploadForm({...uploadForm, subject: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Price (SZL)</label>
                        <input 
                          type="number"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-bold"
                          placeholder="0 for Free"
                          value={uploadForm.price}
                          onChange={e => setUploadForm({...uploadForm, price: parseFloat(e.target.value) || 0})}
                        />
                        <p className="text-[9px] text-slate-400 font-medium mt-1">Leave 0 to share for free.</p>
                      </div>
                    </div>

                    <div 
                      onClick={() => resourceInputRef.current?.click()}
                      className="p-8 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center bg-slate-50 group hover:border-indigo-400 transition-colors cursor-pointer overflow-hidden relative"
                    >
                      <input 
                        type="file" 
                        className="hidden" 
                        ref={resourceInputRef} 
                        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                      />
                      {selectedFile ? (
                        <div className="text-center">
                          <FileText className="w-10 h-10 text-indigo-500 mx-auto mb-2" />
                          <p className="text-[10px] font-black text-slate-900 uppercase">{selectedFile.name}</p>
                          <p className="text-[8px] text-slate-400 font-bold">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                        </div>
                      ) : (
                        <>
                          <UploadCloud className="w-10 h-10 text-slate-300 mb-2 group-hover:text-indigo-500 transition-colors" />
                          <p className="text-[10px] font-black text-slate-400 uppercase">Select File (PDF, DOCX)</p>
                        </>
                      )}
                    </div>

                    <button 
                      type="submit"
                      disabled={isUploadingResource || !selectedFile}
                      className="w-full py-4 bg-indigo-600 disabled:bg-slate-300 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-3"
                    >
                      {isUploadingResource && <Loader2 className="w-4 h-4 animate-spin text-white" />}
                      {isUploadingResource ? 'Uploading...' : 'Finalize & Publish'}
                    </button>
                  </form>
                </motion.div>
              </div>
            )}
            
            {MOCK_RESOURCES.filter(r => resourceFilter === 'all' || r.type === resourceFilter).length === 0 && (
              <div className="text-center py-20 bg-white rounded-[40px] border border-slate-100">
                 <FolderOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                 <h3 className="text-xl font-black text-slate-400">No resources found</h3>
              </div>
            )}
          </div>
        )}

        {/* AI Co-Teacher Tab */}
        {activeTab === 'ai_assistant' && (
          <div className="animate-in fade-in duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
               
               {/* Left Column: AI Tools Panel */}
               <div className="lg:col-span-4 space-y-6">
                 <div className="bg-fuchsia-900 rounded-[32px] p-8 shadow-xl relative overflow-hidden text-white">
                   <div className="absolute -top-10 -right-10 w-40 h-40 bg-fuchsia-500 rounded-full blur-[50px] opacity-30" />
                   <div className="relative z-10">
                     <Bot className="w-10 h-10 text-fuchsia-300 mb-6" />
                     <h2 className="text-2xl font-black mb-2">
                       {institutionType === InstitutionType.PRIMARY ? "Primary Grade Co-Teacher" :
                        institutionType === InstitutionType.TERTIARY ? "Faculty AI Assistant" : 
                        "AI Co-Teacher"}
                     </h2>
                     <p className="text-fuchsia-200 text-sm font-medium leading-relaxed">
                       {institutionType === InstitutionType.PRIMARY ? "Generate fun quizzes, phonics exercises, and automated parent notes in seconds." :
                        institutionType === InstitutionType.TERTIARY ? "Generate research prompts, marking rubrics, and conceptual explainers in seconds." : 
                        "Generate lesson quizzes, grading rubrics, and automated student progress comments in seconds."}
                     </p>
                   </div>
                 </div>

                 {/* Tool Selectors */}
                 <div className="space-y-3">
                   <button 
                     onClick={() => setAiMode('quiz')}
                     className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all border ${aiMode === 'quiz' ? 'bg-fuchsia-50 border-fuchsia-200 shadow-sm' : 'bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50'}`}
                   >
                     <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${aiMode === 'quiz' ? 'bg-fuchsia-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                       <FileText className="w-5 h-5" />
                     </div>
                     <div className="text-left">
                       <h4 className={`font-black text-sm ${aiMode === 'quiz' ? 'text-fuchsia-900' : 'text-slate-600'}`}>Quiz Generator</h4>
                       <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Multiple Choice & Keys</p>
                     </div>
                   </button>
                   <button 
                     onClick={() => setAiMode('rubric')}
                     className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all border ${aiMode === 'rubric' ? 'bg-fuchsia-50 border-fuchsia-200 shadow-sm' : 'bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50'}`}
                   >
                     <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${aiMode === 'rubric' ? 'bg-fuchsia-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                       <ClipboardList className="w-5 h-5" />
                     </div>
                     <div className="text-left">
                       <h4 className={`font-black text-sm ${aiMode === 'rubric' ? 'text-fuchsia-900' : 'text-slate-600'}`}>Rubric Builder</h4>
                       <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Grading frameworks</p>
                     </div>
                   </button>
                 </div>
               </div>

               {/* Right Column: Interaction Window */}
               <div className="lg:col-span-8 flex flex-col gap-6">
                 {/* Input Area */}
                 <div className="bg-white rounded-[32px] border border-slate-200 p-8 shadow-sm">
                   <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                     {aiMode === 'quiz' ? 
                       (institutionType === InstitutionType.TERTIARY ? 'Module & Level' : 'Topic & Grade Level') 
                       : 'Assignment Type & Criteria'}
                   </label>
                   <textarea 
                     className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-6 font-medium text-slate-900 focus:ring-4 focus:ring-fuchsia-50 focus:border-fuchsia-200 transition-all min-h-[120px] resize-none"
                     placeholder={
                       aiMode === 'quiz' 
                         ? (institutionType === InstitutionType.PRIMARY ? "e.g. Generate a fun math quiz with 5 questions on addition for Grade 2." : 
                            institutionType === InstitutionType.TERTIARY ? "e.g. Generate 10 multiple-choice questions on Microeconomics to test undergraduate students." :
                            "e.g. Generate a 10-question multiple-choice quiz on Swazi History (King Sobhuza II) for Form 4s.") 
                         : (institutionType === InstitutionType.PRIMARY ? "e.g. Generate a simple grading rubric for a Grade 4 creative writing task." :
                            institutionType === InstitutionType.TERTIARY ? "e.g. Generate a marking rubric for an Engineering thesis proposal." :
                             "e.g. Generate a detailed grading rubric for a Form 5 Physical Science laboratory report on Titration.")
                     }
                     value={aiPrompt}
                     onChange={(e) => setAiPrompt(e.target.value)}
                   />
                   <div className="flex justify-between items-center mt-6">
                     <p className="text-slate-400 text-xs font-medium">Powered by Gemini</p>
                     <button 
                       onClick={handleGenerateAI}
                       disabled={isAiLoading || !aiPrompt.trim()}
                       className="px-8 py-4 bg-fuchsia-600 hover:bg-fuchsia-700 disabled:bg-slate-300 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-fuchsia-200 transition-all flex items-center gap-2"
                     >
                       {isAiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                       {isAiLoading ? 'Generating...' : 'Generate Content'}
                     </button>
                   </div>
                 </div>

                 {/* Output Area */}
                 {(aiResult || isAiLoading || aiError) && (
                   <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                     <div className="bg-slate-50 border-b border-slate-100 px-8 py-4 flex justify-between items-center">
                       <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Generation Result</h3>
                       {aiResult && (
                         <button className="text-indigo-600 hover:text-indigo-700 text-[10px] font-black flex items-center gap-1 uppercase tracking-widest">
                           <Save className="w-3 h-3" /> Save to Drive
                         </button>
                       )}
                     </div>
                     <div className="p-8">
                       {isAiLoading ? (
                         <div className="flex flex-col items-center justify-center py-12 text-fuchsia-500">
                           <Loader2 className="w-8 h-8 animate-spin mb-4" />
                           <p className="font-bold text-[10px] uppercase tracking-widest animate-pulse">Consulting Gemini Engine...</p>
                         </div>
                       ) : aiError ? (
                         <div className="bg-rose-50 text-rose-600 p-6 rounded-2xl text-sm font-medium border border-rose-100">
                           {aiError}
                         </div>
                       ) : (
                         <div className="prose prose-slate max-w-none text-sm font-medium whitespace-pre-wrap">
                           {aiResult}
                         </div>
                       )}
                     </div>
                   </div>
                 )}
               </div>
            </div>
          </div>
        )}

        {activeTab === 'virtual_sessions' && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-8">
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-8">
                     <div className="p-12 bg-emerald-900 rounded-[56px] text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-12 opacity-10">
                           <VideoIcon className="w-48 h-48" />
                        </div>
                        <div className="relative z-10 space-y-6">
                           <span className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/30">
                              Live E-Learning Portal
                           </span>
                           <h2 className="text-5xl font-black tracking-tight leading-tight italic">Host Your Next Class Online</h2>
                           <p className="text-emerald-200/70 font-medium max-w-lg text-lg">
                              Enable real-time learning with integrated whiteboard, student chat, and AI-powered session summaries.
                           </p>
                           <button 
                             onClick={() => window.open('/classroom', '_blank')}
                             className="px-10 py-5 bg-emerald-500 text-emerald-950 rounded-3xl font-black uppercase tracking-widest text-[10px] flex items-center gap-3 hover:bg-white transition-all shadow-2xl shadow-emerald-500/20 group"
                           >
                              Launch Virtual Classroom
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                           </button>
                        </div>
                     </div>

                     <div className="space-y-6">
                        <div className="flex justify-between items-end">
                           <div>
                              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Upcoming Scheduled Classes</h3>
                              <p className="text-slate-500 font-medium">Manage your virtual teaching timetable</p>
                           </div>
                           <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-slate-50">
                              <Plus className="w-4 h-4" /> Schedule New
                           </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           {[
                             { time: '09:00 AM Today', subject: 'Advanced Mathematics', grade: 'Form 5 Science', status: 'ready', link: '#' },
                             { time: '11:15 AM Today', subject: 'Physics Practical', grade: 'Form 4 Pure', status: 'pending', link: '#' },
                             { time: '02:30 PM Today', subject: 'Biology Review', grade: 'Form 4 Arts', status: 'pending', link: '#' },
                             { time: '08:30 AM Tomorrow', subject: 'SiSwati Literature', grade: 'Form 3-A', status: 'pending', link: '#' },
                           ].map((session, idx) => (
                             <div key={idx} className="p-8 bg-white border border-slate-100 rounded-[40px] shadow-sm hover:shadow-xl transition-all group">
                                <div className="flex justify-between items-start mb-6">
                                   <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl">
                                      <Clock className="w-6 h-6" />
                                   </div>
                                   <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${session.status === 'ready' ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                      {session.status === 'ready' ? 'Ready to Start' : 'Scheduled'}
                                   </span>
                                </div>
                                <div className="space-y-4">
                                   <div className="space-y-1">
                                      <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{session.time}</p>
                                      <h4 className="text-xl font-black text-slate-900 tracking-tight">{session.subject}</h4>
                                   </div>
                                   <div className="flex items-center gap-3 text-slate-400 font-bold text-xs pb-4 border-b border-dashed border-slate-100">
                                      <Users className="w-3.5 h-3.5" />
                                      {session.grade}
                                   </div>
                                   <button 
                                     onClick={() => window.open('/classroom', '_blank')}
                                     className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[9px] flex items-center justify-center gap-2 group-hover:bg-emerald-600 transition-all"
                                   >
                                      Open Classroom Link
                                   </button>
                                </div>
                             </div>
                           ))}
                        </div>
                     </div>
                  </div>

                  <div className="space-y-8">
                     <div className="p-8 bg-slate-50 border border-slate-100 rounded-[40px] space-y-6">
                        <div className="flex items-center gap-3">
                           <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                              <Sparkles className="w-5 h-5" />
                           </div>
                           <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">E-Learning Stats</h4>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                           <div className="p-6 bg-white rounded-3xl border border-slate-100">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Virtual Sessions</p>
                              <p className="text-3xl font-black text-slate-900">124</p>
                           </div>
                           <div className="p-6 bg-white rounded-3xl border border-slate-100">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Student Engagement</p>
                              <p className="text-3xl font-black text-emerald-600">88%</p>
                           </div>
                        </div>
                        <div className="pt-4 space-y-3">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Recommended AI Tools</p>
                           <button className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-[10px] font-bold text-slate-600 hover:border-blue-500 hover:text-blue-600 flex items-center gap-3 transition-all">
                              <Bot className="w-4 h-4" /> AI Session Transcription
                           </button>
                           <button className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-[10px] font-bold text-slate-600 hover:border-blue-500 hover:text-blue-600 flex items-center gap-3 transition-all">
                              <ClipboardCheck className="w-4 h-4" /> Auto-Attendance Generator
                           </button>
                        </div>
                     </div>

                     <div className="p-8 bg-indigo-50 border border-indigo-100 rounded-[40px] space-y-6">
                        <h4 className="text-sm font-black text-indigo-900 uppercase tracking-widest italic">Digital Resources</h4>
                        <p className="text-xs text-indigo-700/70 font-medium">Upload recordings or assignments for your students to access on the web portal.</p>
                        <div className="flex flex-col gap-3">
                           <button className="px-6 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-[9px] flex items-center justify-center gap-2">
                              <UploadCloud className="w-4 h-4" /> Upload New Resource
                           </button>
                           <button className="px-6 py-4 bg-white border border-indigo-200 text-indigo-600 rounded-2xl font-black uppercase tracking-widest text-[9px]">
                              View Resource Library
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          )}

         {/* Classroom Management Tab */}
        {activeTab === 'management' && (
          <div className="animate-in fade-in duration-300">
             <div className="bg-rose-900 rounded-[40px] text-white p-10 mb-8 border border-rose-800 shadow-xl overflow-hidden relative">
               <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/20 rounded-full blur-[100px]" />
               <div className="relative z-10">
                 <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-10">
                   <div>
                    <div className="flex items-center gap-3 mb-4">
                      <CalendarCheck className="w-8 h-8 text-rose-300" />
                      <h2 className="text-3xl font-black tracking-tight">
                        Classroom Lifecycle
                      </h2>
                    </div>
                    <p className="text-rose-200 font-medium leading-relaxed max-w-xl">
                      Maintain daily records, enforce behavioral standards, and manage assigned workloads from a central hub.
                    </p>
                   </div>
                   <div className="flex gap-2 bg-white/10 p-2 rounded-3xl border border-white/10 shrink-0">
                      <button 
                        onClick={() => setManagementSubTab('attendance')}
                        className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${managementSubTab === 'attendance' ? 'bg-white text-rose-900 shadow-xl' : 'text-rose-100 hover:bg-white/10'}`}
                      >
                        Attendance
                      </button>
                      <button 
                        onClick={() => setManagementSubTab('behavior')}
                        className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${managementSubTab === 'behavior' ? 'bg-white text-rose-900 shadow-xl' : 'text-rose-100 hover:bg-white/10'}`}
                      >
                        Behavior Log
                      </button>
                      <button 
                        onClick={() => setManagementSubTab('homework')}
                        className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${managementSubTab === 'homework' ? 'bg-white text-rose-900 shadow-xl' : 'text-rose-100 hover:bg-white/10'}`}
                      >
                        Homework
                      </button>
                   </div>
                 </div>

                 {/* Centralized Management Filters */}
                 <div className="flex flex-wrap items-center gap-4 bg-white/5 p-6 rounded-[32px] border border-white/10 backdrop-blur-md">
                    <div className="relative flex-grow min-w-[200px]">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-300" />
                      <input 
                        className="bg-white/10 border border-white/20 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold text-white placeholder:text-rose-300/50 focus:ring-4 focus:ring-rose-500/20 outline-none w-full transition-all"
                        placeholder="Filter list by student name..."
                        value={mgmtSearchTerm}
                        onChange={(e) => setMgmtSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                       <select 
                        value={selectedGrade}
                        onChange={(e) => setSelectedGrade(e.target.value)}
                        className="bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase rounded-2xl px-6 py-4 focus:ring-4 focus:ring-rose-500/20 outline-none cursor-pointer appearance-none min-w-[140px]"
                      >
                        {uniqueGrades.map(g => <option key={g} value={g} className="text-slate-900">{g}</option>)}
                      </select>
                      <select 
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                        className="bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase rounded-2xl px-6 py-4 focus:ring-4 focus:ring-rose-500/20 outline-none cursor-pointer appearance-none min-w-[140px]"
                      >
                        {uniqueClasses.map(c => <option key={c} value={c} className="text-slate-900">{c}</option>)}
                      </select>
                      <div className="relative">
                        <ArrowUpDown className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-300" />
                        <select 
                          value={sortOption}
                          onChange={(e) => setSortOption(e.target.value)}
                          className="bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase rounded-2xl pl-12 pr-10 py-4 focus:ring-4 focus:ring-rose-500/20 outline-none cursor-pointer appearance-none min-w-[140px]"
                        >
                          <option value="name_asc" className="text-slate-900">Sort: A-Z</option>
                          <option value="name_desc" className="text-slate-900">Sort: Z-A</option>
                          <option value="grade_asc" className="text-slate-900">Sort: Grade</option>
                        </select>
                      </div>
                    </div>
                 </div>
               </div>
             </div>
             {managementSubTab === 'attendance' && (
               <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
                 <div className="px-8 py-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-slate-50/50">
                    <div>
                      <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
                        {institutionType === InstitutionType.TERTIARY ? "Lecture Hall Attendance" : "Today's Attendance Roll Call"}
                      </h3>
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date: {new Date().toLocaleDateString()}</span>
                        <span className="px-2 py-0.5 bg-rose-100 text-rose-700 rounded text-[9px] font-black uppercase tracking-widest">{filteredAttendance.length} Students Listed</span>
                      </div>
                    </div>
                    <button className="px-8 py-4 bg-rose-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-rose-200 hover:bg-rose-700 transition-all">Submit Final Roll</button>
                 </div>
                 <div className="divide-y divide-slate-100">
                   {filteredAttendance.length === 0 ? (
                      <div className="p-20 text-center">
                         <Info className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                         <p className="text-slate-400 font-bold text-sm">No students match current filters.</p>
                      </div>
                   ) : filteredAttendance.map(student => (
                     <div key={student.id} className="p-4 px-8 flex items-center justify-between hover:bg-slate-50 transition-colors">
                       <div className="flex flex-col">
                         <span className="font-bold text-slate-900">{student.name}</span>
                         <div className="flex gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                            <span className="text-emerald-500">{student.merits} {institutionType === InstitutionType.TERTIARY ? "Credits" : "Merits"}</span>
                            <span className="text-rose-500">{student.demerits} {institutionType === InstitutionType.TERTIARY ? "Warnings" : "Demerits"}</span>
                         </div>
                       </div>
                       <div className="flex gap-2">
                          <button
                            onClick={() => handleAttendanceChange(student.id, 'present')}
                            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${student.status === 'present' ? 'bg-emerald-500 text-white shadow-md' : 'bg-slate-100 text-slate-400 hover:bg-emerald-50 hover:text-emerald-500'}`}
                          >
                             <UserCheck className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleAttendanceChange(student.id, 'late')}
                            className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm transition-all ${student.status === 'late' ? 'bg-amber-500 text-white shadow-md' : 'bg-slate-100 text-slate-400 hover:bg-amber-50 hover:text-amber-500'}`}
                          >
                             L
                          </button>
                          <button
                            onClick={() => {
                              handleAttendanceChange(student.id, 'absent');
                              if (student.status !== 'absent' && institutionType !== InstitutionType.TERTIARY) {
                                triggerAlert('alert', `Absence Notice triggered for ${student.name}'s parents`);
                              }
                            }}
                            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${student.status === 'absent' ? 'bg-rose-500 text-white shadow-md' : 'bg-slate-100 text-slate-400 hover:bg-rose-50 hover:text-rose-500'}`}
                          >
                             <UserX className="w-5 h-5" />
                          </button>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
             )}

             {managementSubTab === 'behavior' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                   <div className="lg:col-span-5 space-y-6">
                      <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Create Behavioral Entry</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Target Student</label>
                            <select 
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold text-slate-900 focus:ring-2 focus:ring-rose-100 outline-none"
                              value={selectedStudentForLog}
                              onChange={(e) => setSelectedStudentForLog(e.target.value)}
                            >
                              <option value="">Select Student...</option>
                              {attendanceList.filter(s => {
                                const matchesGrade = selectedGrade === 'All Grades' || s.grade === selectedGrade;
                                const matchesClass = selectedClass === 'All Classes' || s.class === selectedClass;
                                const matchesSearch = s.name.toLowerCase().includes(mgmtSearchTerm.toLowerCase());
                                return matchesGrade && matchesClass && matchesSearch;
                              }).map(s => <option key={s.id} value={s.id}>{s.name} ({s.grade} {s.class})</option>)}
                            </select>
                          </div>
                          <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Notice Type</label>
                            <div className="grid grid-cols-2 gap-3 mb-4">
                              <button 
                                onClick={() => handleSaveLog('merit')}
                                disabled={!selectedStudentForLog || (!logDescription.trim() && !logDescription) || saveStatus === 'saving'}
                                className="p-5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-2xl font-black text-[10px] uppercase tracking-widest flex flex-col items-center gap-3 hover:bg-emerald-100 transition-all disabled:opacity-50"
                              >
                                 <Award className="w-6 h-6" /> Issue Merit
                              </button>
                              <button 
                                onClick={() => handleSaveLog('demerit')}
                                disabled={!selectedStudentForLog || (!logDescription.trim() && !logDescription) || saveStatus === 'saving'}
                                className="p-5 bg-rose-50 text-rose-700 border border-rose-200 rounded-2xl font-black text-[10px] uppercase tracking-widest flex flex-col items-center gap-3 hover:bg-rose-100 transition-all disabled:opacity-50"
                              >
                                 <ShieldAlert className="w-6 h-6" /> Log Demerit
                              </button>
                            </div>

                            <div className="mb-4">
                               <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Quick Templates</label>
                               <div className="flex flex-wrap gap-2">
                                  {['Excellent Participation', 'Homework Not Submitted', 'Improved Performance', 'Disruptive Behavior', 'Supporting Peers', 'Late for Class'].map(phrase => (
                                    <button 
                                      key={phrase}
                                      onClick={() => setLogDescription(phrase)}
                                      className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-[9px] font-bold uppercase tracking-wider hover:bg-slate-900 hover:text-white transition-all"
                                    >
                                      {phrase}
                                    </button>
                                  ))}
                               </div>
                            </div>
                          </div>
                          <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Detailed Context (Optional)</label>
                            <textarea 
                              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-medium text-sm resize-none h-32 focus:bg-white transition-all outline-none" 
                              placeholder="Describe the achievement or incident..."
                              value={logDescription}
                              onChange={(e) => setLogDescription(e.target.value)}
                            ></textarea>
                          </div>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic text-center">
                            * Parent/Guardian will receive an encrypted notification upon logging.
                          </p>
                        </div>
                      </div>
                   </div>

                   <div className="lg:col-span-7">
                      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full">
                         <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Recent Behavioral Audit</h3>
                            <History className="w-4 h-4 text-slate-300" />
                         </div>
                         <div className="divide-y divide-slate-100 overflow-y-auto max-h-[600px]">
                            {filteredBehaviorLogs.map(log => (
                              <div key={log.id} className="p-6 px-8 hover:bg-slate-50 transition-colors">
                                 <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-3">
                                       <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                          log.type === 'merit' ? 'bg-emerald-100 text-emerald-600' : 
                                          log.type === 'demerit' ? 'bg-rose-100 text-rose-600' : 
                                          log.type === 'warning' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
                                       }`}>
                                          {log.type === 'merit' ? <Plus className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
                                       </div>
                                       <div>
                                          <div className="flex items-center gap-2">
                                             <p className="font-bold text-slate-900">{log.studentName}</p>
                                             <span className="text-[8px] font-black uppercase text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                                                {attendanceList.find(s => s.id === log.studentId)?.grade} {attendanceList.find(s => s.id === log.studentId)?.class}
                                             </span>
                                          </div>
                                          <p className="text-[10px] font-black uppercase text-slate-400">{log.type}</p>
                                       </div>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400">{new Date(log.createdAt).toLocaleDateString()}</span>
                                 </div>
                                 <p className="text-sm font-medium text-slate-600 pl-11">{log.description}</p>
                              </div>
                            ))}
                            {behaviorLogs.length === 0 && (
                               <div className="py-20 text-center">
                                  <History className="w-12 h-12 text-slate-100 mx-auto mb-4" />
                                  <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">No entries logged yet</p>
                               </div>
                            )}
                         </div>
                      </div>
                   </div>
                </div>
             )}

             {managementSubTab === 'homework' && (
                <div className="space-y-8">
                   <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div>
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight">Class Assignments & Tasks</h3>
                        <p className="text-slate-500 font-medium text-sm">Published homework will be visible to all students in the assigned class.</p>
                      </div>
                      <button 
                        onClick={() => setIsCreatingHomework(true)}
                        className="w-full md:w-auto px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl flex items-center justify-center gap-3 hover:bg-blue-600 transition-all"
                      >
                         <Plus className="w-4 h-4" /> Create Assignment
                      </button>
                   </div>

                   {isCreatingHomework && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-[40px] border-4 border-dashed border-slate-200 p-10"
                      >
                         <div className="flex justify-between items-center mb-8">
                            <div>
                               <h4 className="text-xl font-black text-slate-900">New Homework Specification</h4>
                               <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">This task will reflect for the entire class registry.</p>
                            </div>
                            <button onClick={() => setIsCreatingHomework(false)} className="text-slate-400"><X className="w-6 h-6" /></button>
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                               <div>
                                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Subject</label>
                                  <input 
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold"
                                    placeholder="e.g. Mathematics"
                                    value={newHomework.subject}
                                    onChange={(e) => setNewHomework({...newHomework, subject: e.target.value})}
                                  />
                               </div>
                               <div>
                                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Assign To Class / Grade</label>
                                  <select 
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold text-slate-900 focus:ring-2 focus:ring-rose-100 outline-none"
                                    value={newHomework.assignedToGrade || ''}
                                    onChange={(e) => setNewHomework({...newHomework, assignedToGrade: e.target.value})}
                                  >
                                    <option value="">Select Target Class...</option>
                                    <option value="Form 1A">Form 1A</option>
                                    <option value="Form 2B">Form 2B</option>
                                    <option value="Form 3 Science">Form 3 Science</option>
                                    <option value="Form 4 Pure">Form 4 Pure</option>
                                    <option value="Form 5 Commercial">Form 5 Commercial</option>
                                    {institutionType === InstitutionType.TERTIARY && (
                                       <>
                                          <option value="CSC301 - Year 3">CSC301 - Year 3</option>
                                          <option value="MAT101 - Year 1">MAT101 - Year 1</option>
                                       </>
                                    )}
                                  </select>
                               </div>
                               <div>
                                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Task Title</label>
                                  <input 
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold"
                                    placeholder="e.g. Quadratic Equations Exercises"
                                    value={newHomework.title}
                                    onChange={(e) => setNewHomework({...newHomework, title: e.target.value})}
                                  />
                               </div>
                               <div>
                                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Due Date</label>
                                  <input 
                                    type="date"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold"
                                    value={newHomework.dueDate}
                                    onChange={(e) => setNewHomework({...newHomework, dueDate: e.target.value})}
                                  />
                               </div>
                            </div>
                            <div>
                               <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Instructions & References</label>
                               <textarea 
                                 className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-6 font-medium text-slate-600 h-full min-h-[200px] resize-none focus:bg-white transition-all outline-none"
                                 placeholder="Detail the pages, question numbers or specific requirements..."
                                 value={newHomework.description}
                                 onChange={(e) => setNewHomework({...newHomework, description: e.target.value})}
                               ></textarea>
                            </div>
                         </div>
                         <div className="flex justify-end gap-4 mt-10 pt-10 border-t border-slate-100">
                            <button onClick={() => setIsCreatingHomework(false)} className="px-8 py-4 bg-slate-100 text-slate-400 rounded-2xl font-black uppercase tracking-widest text-[10px]">Back</button>
                            <button 
                              onClick={handleSaveHomework}
                              disabled={!newHomework.title || !newHomework.subject || !newHomework.assignedToGrade || saveStatus === 'saving'}
                              className="px-12 py-4 bg-rose-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-rose-200"
                            >
                               {saveStatus === 'saving' ? 'Publishing...' : 'Publish to Entire Class'}
                            </button>
                         </div>
                      </motion.div>
                   )}

                   <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {filteredHomeworkTasks.map(task => (
                        <div key={task.id} className="bg-white rounded-[32px] border border-slate-100 p-8 hover:shadow-xl hover:border-rose-200 transition-all flex flex-col group">
                           <div className="flex justify-between items-start mb-6">
                              <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center shadow-inner group-hover:bg-rose-600 group-hover:text-white transition-all">
                                 <ClipboardCheck className="w-6 h-6" />
                              </div>
                              <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                 task.status === 'active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-50 text-slate-400 border border-slate-200'
                              }`}>
                                 {task.status}
                              </span>
                           </div>
                           <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-[10px] font-black text-rose-600 uppercase tracking-widest">{task.subject}</h4>
                              <span className="text-[10px] text-slate-300">•</span>
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{task.assignedToGrade || 'General Class'}</span>
                           </div>
                           <h3 className="text-xl font-black text-slate-900 leading-tight mb-4">{task.title}</h3>
                           <p className="text-sm font-medium text-slate-500 mb-8 line-clamp-3 leading-relaxed">{task.description}</p>
                           
                           <div className="mt-auto pt-6 border-t border-slate-100 flex justify-between items-center">
                              <div>
                                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Submission Deadline</p>
                                 <p className="text-sm font-black text-slate-900">{new Date(task.dueDate).toLocaleDateString()}</p>
                              </div>
                              <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-rose-600 hover:text-white transition-all">
                                 <Edit2 className="w-4 h-4" />
                              </button>
                           </div>
                        </div>
                      ))}
                      {filteredHomeworkTasks.length === 0 && !isCreatingHomework && (
                         <div className="col-span-full py-20 bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200 text-center">
                            <ClipboardList className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">No active homework tasks listed</p>
                            <button onClick={() => setIsCreatingHomework(true)} className="mt-4 text-rose-600 font-black text-[10px] uppercase hover:underline underline-offset-8">+ Create your first task</button>
                         </div>
                      )}
                   </div>
                </div>
             )}
          </div>
        )}

        {/* CPD Tab */}
        {activeTab === 'cpd' && (
          <div className="animate-in fade-in duration-300">
            <div className="bg-emerald-900 rounded-[40px] text-white p-10 mb-8 border border-emerald-800 shadow-xl overflow-hidden relative">
               <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-[100px]" />
               <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                 <div className="md:w-2/3">
                   <div className="flex items-center gap-3 mb-4">
                     <Award className="w-8 h-8 text-emerald-300" />
                     <h2 className="text-3xl font-black text-white tracking-tight">Professional Development Forum</h2>
                   </div>
                   <p className="text-emerald-200 font-medium leading-relaxed max-w-xl">
                     Connect securely with educators across Eswatini. View official TSC transfer requests, job vacancies, and subject-specific teaching forums.
                   </p>
                 </div>
               </div>
            </div>

            <div className="flex gap-4 mb-8">
               <button 
                 onClick={() => setCpdFilter('forums')}
                 className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${cpdFilter === 'forums' ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
               >
                 Educator Forums
               </button>
               <button 
                 onClick={() => setCpdFilter('vacancies')}
                 className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${cpdFilter === 'vacancies' ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
               >
                 Vacancies & Transfers
               </button>
            </div>

            {cpdFilter === 'forums' ? (
              <div className="space-y-4">
                 {MOCK_FORUMS.map(forum => (
                   <div key={forum.id} className="bg-white border border-slate-100 rounded-3xl p-6 hover:shadow-lg transition-all group cursor-pointer flex justify-between items-center">
                      <div className="flex gap-6 items-center">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                           <MessageSquare className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex gap-2 mb-1">
                             <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[9px] font-black uppercase tracking-widest">{forum.topic}</span>
                             <span className="text-slate-400 text-[10px] font-bold">— Active {forum.active}</span>
                          </div>
                          <h3 className="text-lg font-black text-slate-900 group-hover:text-emerald-700 transition-colors">{forum.title}</h3>
                          <p className="text-sm font-medium text-slate-500">Started by {forum.author}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-emerald-600">
                         <div className="text-right hidden sm:block">
                            <span className="block text-2xl font-black">{forum.replies}</span>
                            <span className="block text-[9px] font-bold uppercase tracking-widest opacity-60 mt-[-4px]">Replies</span>
                         </div>
                         <ChevronRight className="w-6 h-6 opacity-30 group-hover:opacity-100 transition-opacity" />
                      </div>
                   </div>
                 ))}
                 <button className="w-full py-6 border-2 border-dashed border-slate-200 text-slate-400 font-black uppercase tracking-widest text-[10px] rounded-3xl hover:border-emerald-500 hover:text-emerald-600 transition-all flex items-center justify-center gap-2">
                    <Plus className="w-4 h-4" /> Start New Discussion
                 </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {MOCK_VACANCIES.map(vac => (
                   <div key={vac.id} className="bg-white border border-slate-100 rounded-[32px] p-8 hover:shadow-xl hover:border-slate-300 transition-all">
                      <div className="flex justify-between items-start mb-6">
                         <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-lg">
                           <Briefcase className="w-5 h-5" />
                         </div>
                         <span className="px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg text-[10px] font-black uppercase tracking-widest">
                           {vac.type}
                         </span>
                      </div>
                      <h3 className="text-xl font-black text-slate-900 leading-tight mb-2">{vac.role}</h3>
                      <p className="text-sm font-bold text-slate-500 mb-6">{vac.school} • {vac.location}</p>
                      
                      <div className="pt-6 border-t border-slate-100 border-dashed flex justify-between items-center">
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                           Closes: {new Date(vac.deadline).toLocaleDateString()}
                         </span>
                         <button className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md transition-colors">
                           View Details
                         </button>
                      </div>
                   </div>
                 ))}
              </div>
            )}
          </div>
        )}

        {/* Staff Directory / Colleagues Tab */}
        {activeTab === 'colleagues' && (
          <div className="animate-in fade-in duration-300">
             <div className="bg-teal-900 rounded-[40px] text-white p-10 mb-8 border border-teal-800 shadow-xl overflow-hidden relative">
               <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px]" />
               <div className="relative z-10">
                 <div className="flex justify-between items-center">
                   <div>
                     <div className="flex items-center gap-3 mb-4">
                       <UserCheck className="w-8 h-8 text-teal-300" />
                       <h2 className="text-3xl font-black tracking-tight">
                         {institutionType === InstitutionType.TERTIARY ? "Faculty Directory" : "Staff Directory"}
                       </h2>
                     </div>
                     <p className="text-teal-200 font-medium leading-relaxed max-w-xl">
                       Connect with your colleagues, view finding subjects, and manage your own professional contact details.
                     </p>
                   </div>
                   <button 
                     onClick={() => setIsEditingTeacherProfile(true)}
                     className="px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-teal-900/50 transition-all flex items-center justify-center gap-2"
                   >
                     <Edit2 className="w-4 h-4" /> Edit My Profile
                   </button>
                 </div>
               </div>
             </div>

             {/* Profile Edit Modal */}
             {isEditingTeacherProfile && (
               <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                 <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
                   onClick={() => setIsEditingTeacherProfile(false)}
                 />
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.95, y: 20 }}
                   animate={{ opacity: 1, scale: 1, y: 0 }}
                   className="bg-white rounded-[40px] w-full max-w-2xl p-10 relative z-10 shadow-2xl overflow-hidden"
                 >
                   <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl -mr-16 -mt-16" />
                   
                   <div className="flex justify-between items-center mb-8 relative">
                     <div>
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight">Staff Profile Settings</h3>
                        <p className="text-slate-500 font-medium mt-1">Update your internal contact details.</p>
                     </div>
                     <button onClick={() => setIsEditingTeacherProfile(false)} className="text-slate-400 hover:text-slate-600">
                       <X className="w-6 h-6" />
                     </button>
                   </div>

                   <div className="space-y-6 relative">
                     <div>
                       <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Subjects Taught</label>
                       <div className="flex flex-wrap gap-2 mb-3">
                         {teacherProfileForm?.subjects.map(sub => (
                           <span key={sub} className="px-3 py-1 bg-teal-50 text-teal-700 rounded-lg text-xs font-bold border border-teal-100 flex items-center gap-2">
                             {sub}
                             <button onClick={() => setTeacherProfileForm(prev => ({ ...prev!, subjects: prev!.subjects.filter(s => s !== sub) }))} className="hover:text-teal-900">
                               <X className="w-3 h-3" />
                             </button>
                           </span>
                         ))}
                       </div>
                       <input 
                         className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-medium text-sm"
                         placeholder="Type a subject and press Enter"
                         onKeyDown={(e) => {
                           if (e.key === 'Enter') {
                             e.preventDefault();
                             const input = e.currentTarget;
                             const val = input.value.trim();
                             if (val && !teacherProfileForm?.subjects.includes(val)) {
                               setTeacherProfileForm(prev => ({ ...prev!, subjects: [...prev!.subjects, val] }));
                               input.value = '';
                             }
                           }
                         }}
                       />
                     </div>

                     <div className="grid grid-cols-2 gap-4">
                       <div>
                         <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Contact Phone</label>
                         <input 
                           className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold text-sm"
                           placeholder="+268 7600 0000"
                           value={teacherProfileForm?.contactPhone || ''}
                           onChange={e => setTeacherProfileForm(prev => ({...prev!, contactPhone: e.target.value}))}
                         />
                       </div>
                       <div>
                         <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Contact Email</label>
                         <input 
                           className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold text-sm"
                           placeholder="teacher@school.edu"
                           value={teacherProfileForm?.contactEmail || ''}
                           onChange={e => setTeacherProfileForm(prev => ({...prev!, contactEmail: e.target.value}))}
                         />
                       </div>
                     </div>

                     <div>
                       <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Internal Bio / Responsibilities</label>
                       <textarea 
                         className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-medium text-sm resize-none h-24"
                         placeholder="e.g. Head of Science Department, Athletics Coach..."
                         value={teacherProfileForm?.bio || ''}
                         onChange={e => setTeacherProfileForm(prev => ({...prev!, bio: e.target.value}))}
                       />
                     </div>

                     <div className="flex justify-end pt-6 border-t border-slate-100">
                       <button 
                         onClick={handleUpdateTeacherProfile}
                         disabled={saveStatus === 'saving'}
                         className="px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl disabled:opacity-50 font-black uppercase tracking-widest text-[10px] shadow-xl transition-all"
                       >
                         {saveStatus === 'saving' ? 'Saving...' : 'Save Profile'}
                       </button>
                     </div>
                   </div>
                 </motion.div>
               </div>
             )}

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {institutionTeachers.map(teacher => {
                   const profile = teacher.teacherProfile;
                   const initials = teacher.name.split(' ').map(n=>n[0]).join('').substring(0, 2);
                   
                   return (
                     <div key={teacher.id} className="bg-white border border-slate-100 rounded-[32px] p-8 hover:shadow-xl hover:border-teal-200 transition-all flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center text-2xl font-black shadow-inner mb-6">
                           {initials}
                        </div>
                        <h3 className="text-xl font-black text-slate-900 leading-tight mb-1">{teacher.name}</h3>
                        
                        <div className="flex flex-wrap gap-2 justify-center my-4">
                           {profile?.subjects && profile.subjects.length > 0 ? (
                             profile.subjects.map(s => (
                               <span key={s} className="px-3 py-1 bg-slate-100 text-slate-600 font-bold text-[10px] uppercase tracking-widest rounded-lg">
                                 {s}
                               </span>
                             ))
                           ) : (
                             <span className="text-slate-400 font-bold text-xs italic">Subjects not listed</span>
                           )}
                        </div>

                        {profile?.bio && (
                          <p className="text-slate-500 font-medium text-sm bg-slate-50 p-4 rounded-2xl w-full mb-4">
                            {profile.bio}
                          </p>
                        )}

                        <div className="w-full mt-auto pt-6 border-t border-slate-100 space-y-3">
                           <div className="flex items-center justify-center gap-2 text-slate-600 text-sm font-medium">
                              <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest px-2">Phone:</span>
                              {profile?.contactPhone || 'N/A'}
                           </div>
                           <div className="flex items-center justify-center text-slate-600 text-sm font-medium truncate px-4">
                              <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest px-2">Email:</span>
                              {profile?.contactEmail || teacher.email || 'N/A'}
                           </div>
                        </div>
                     </div>
                   );
                })}
                {institutionTeachers.length === 0 && (
                  <div className="col-span-full py-16 text-center text-slate-400 font-medium">
                     No colleagues found in this institution.
                  </div>
                )}
             </div>
          </div>
        )}
        </>
      )}

      {/* Floating Alert Toast */}
      {alertToast.message && (
         <div className="fixed bottom-8 right-8 z-50 animate-in slide-in-from-bottom-8 fade-in">
           <div className={`px-6 py-4 rounded-2xl flex items-center gap-3 shadow-2xl border ${
             alertToast.type === 'merit' ? 'bg-emerald-600 text-white border-emerald-700' : 'bg-rose-600 text-white border-rose-700'
           }`}>
             <BellRing className="w-5 h-5 animate-pulse" />
             <span className="font-black text-sm tracking-wide">{alertToast.message}</span>
           </div>
         </div>
      )}
      
      {/* Help Footer */}
      <footer className="mt-20 pt-12 border-t border-slate-200 text-center">
         <div className="max-w-xl mx-auto">
            <GraduationCap className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <h4 className="text-slate-900 font-black uppercase tracking-widest text-[10px] mb-2">Authorized Teacher Access Only</h4>
            <p className="text-slate-400 text-sm font-medium">
              You are currently managing records for {user.institutionId ? "your assigned institution" : "students assigned directly to you"}. 
              All data is transmitted securely and synced in real-time with the parent portal.
            </p>
         </div>
      </footer>
    </div>
  );
};

export default TeacherDashboard;
