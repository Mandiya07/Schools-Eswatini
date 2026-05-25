import React, { useState, useEffect } from 'react';
import { db, doc, setDoc, collection, getDocs, query, orderBy, getDocsWithRetry, handleFirestoreError, OperationType } from '../src/lib/firebase';
import { onSnapshot } from 'firebase/firestore';
import { ShieldCheck, Calendar, User as UserIcon, Activity, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AuditLog } from '../types';

const MOCK_LOGS: AuditLog[] = [
  { id: 'log_1', action: 'Login', resource: 'System', resourceId: 'sys_1', details: { message: 'User logged in successfully' }, userId: 'admin@school.sz', createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
  { id: 'log_2', action: 'Profile Update', resource: 'Institution', resourceId: 'inst_1', details: { message: 'Updated institution settings for St. Marks' }, userId: 'admin@school.sz', createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
  { id: 'log_3', action: 'Logout', resource: 'System', resourceId: 'sys_1', details: { message: 'User logged out' }, userId: 'teacher@stmarks.sz', createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString() },
  { id: 'log_4', action: 'Security Event', resource: 'System', resourceId: 'sys_1', details: { message: 'Failed login attempts threshold reached' }, userId: 'unknown@hacker.com', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
  { id: 'log_5', action: 'Content Edit', resource: 'Resource', resourceId: 'res_5', details: { message: 'Created new resources for Form 5 Math' }, userId: 'teacher@stmarks.sz', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() },
];

const SecurityLogsPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState<'createdAt' | 'userId'>('createdAt');
  const [sortAsc, setSortAsc] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAndSeed = async () => {
      try {
        const q = query(collection(db, 'audit_logs'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocsWithRetry(q);
        
        if (snapshot.empty) {
          // Seed mock logs
          console.log('Seeding mock audit logs...');
          for (const log of MOCK_LOGS) {
            try {
              await setDoc(doc(db, 'audit_logs', log.id), log);
            } catch (err) {
              console.error(`Failed to seed log ${log.id}`, err);
            }
          }
        }
      } catch (err: any) {
        if (err instanceof Error && !err.message.includes('offline')) {
          handleFirestoreError(err, OperationType.GET, 'audit_logs');
        }
        console.error("Error setting up audit logs:", err);
      }
    };

    fetchAndSeed().then(() => {
      const q = query(collection(db, 'audit_logs'), orderBy('createdAt', sortAsc ? 'asc' : 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedLogs = snapshot.docs.map(doc => doc.data() as AuditLog);
        setLogs(fetchedLogs);
        setLoading(false);
      }, (error) => {
        handleFirestoreError(error, OperationType.LIST, 'audit_logs');
        setLoading(false);
      });
      return unsubscribe;
    });
  }, [sortAsc]);

  const handleSort = (field: 'createdAt' | 'userId') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(field === 'createdAt' ? false : true); // default desc for date, asc for user
    }
  };

  const sortedLogs = [...logs].sort((a, b) => {
    let valA = a[sortField] || '';
    let valB = b[sortField] || '';
    
    if (valA < valB) return sortAsc ? -1 : 1;
    if (valA > valB) return sortAsc ? 1 : -1;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate('/dashboard')} className="p-3 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        <div>
          <h1 className="text-3xl font-black flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-blue-600" />
            Security & Audit Logs
          </h1>
          <p className="text-slate-500 mt-1 font-medium">Monitor system events, logins, and administrative actions.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        {loading ? (
          <div className="flex justify-center p-12">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="pb-4 pt-2 px-4 border-b border-slate-100">
                    <button onClick={() => handleSort('createdAt')} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors">
                      <Calendar className="w-3 h-3" />
                      Date / Time
                      {sortField === 'createdAt' && (sortAsc ? ' ↑' : ' ↓')}
                    </button>
                  </th>
                  <th className="pb-4 pt-2 px-4 border-b border-slate-100">
                     <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <Activity className="w-3 h-3" />
                        Event Type
                     </div>
                  </th>
                  <th className="pb-4 pt-2 px-4 border-b border-slate-100">
                    <button onClick={() => handleSort('userId')} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors">
                      <UserIcon className="w-3 h-3" />
                      User ID
                      {sortField === 'userId' && (sortAsc ? ' ↑' : ' ↓')}
                    </button>
                  </th>
                  <th className="pb-4 pt-2 px-4 border-b border-slate-100">
                     <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Description
                     </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="py-4 px-4 border-b border-slate-50 text-xs font-medium text-slate-500 whitespace-nowrap">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td className="py-4 px-4 border-b border-slate-50">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        log.action === 'Security Event' ? 'bg-red-50 text-red-600' :
                        log.action === 'Login' ? 'bg-emerald-50 text-emerald-600' :
                        log.action === 'Logout' ? 'bg-amber-50 text-amber-600' :
                        'bg-blue-50 text-blue-600'
                      }`}>
                        {log.action === 'Security Event' && <AlertTriangle className="w-3 h-3" />}
                        {log.action}
                      </span>
                    </td>
                    <td className="py-4 px-4 border-b border-slate-50 text-sm font-bold text-slate-900">
                      {log.userId || 'System'}
                    </td>
                    <td className="py-4 px-4 border-b border-slate-50 text-sm text-slate-600 font-medium">
                      {log.details?.message || log.resource}
                    </td>
                  </tr>
                ))}
                {sortedLogs.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-slate-400 font-medium text-sm">
                      No security logs found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecurityLogsPage;
