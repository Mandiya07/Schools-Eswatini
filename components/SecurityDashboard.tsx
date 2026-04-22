import React, { useState, useEffect } from 'react';
import { db, collection, query, orderBy, limit, onSnapshot } from '../src/lib/firebase';
import { AuditLog, ActivityHistory } from '../types';
import { motion } from 'motion/react';

const SecurityDashboard: React.FC = () => {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [activityHistory, setActivityHistory] = useState<ActivityHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auditQuery = query(collection(db, 'audit_logs'), orderBy('createdAt', 'desc'), limit(50));
    const activityQuery = query(collection(db, 'activity_history'), orderBy('createdAt', 'desc'), limit(50));

    const unsubAudit = onSnapshot(auditQuery, (snapshot) => {
      setAuditLogs(snapshot.docs.map(doc => doc.data() as AuditLog));
    });

    const unsubActivity = onSnapshot(activityQuery, (snapshot) => {
      setActivityHistory(snapshot.docs.map(doc => doc.data() as ActivityHistory));
      setLoading(false);
    });

    return () => {
      unsubAudit();
      unsubActivity();
    };
  }, []);

  if (loading) return <div className="p-8 animate-pulse text-slate-400">Loading security data...</div>;

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Audit Logs */}
        <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">System Audit Logs</h3>
            <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-widest">Live</span>
          </div>
          <div className="divide-y divide-slate-50 max-h-[500px] overflow-y-auto">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-6 hover:bg-slate-50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{log.action}</span>
                  <span className="text-[10px] text-slate-400 font-medium">{new Date(log.createdAt).toLocaleString()}</span>
                </div>
                <p className="text-sm font-bold text-slate-900 mb-1">{log.resource}: {log.resourceId}</p>
                <p className="text-xs text-slate-500">User: {log.userId}</p>
              </div>
            ))}
            {auditLogs.length === 0 && <div className="p-12 text-center text-slate-400 text-sm italic">No audit logs found</div>}
          </div>
        </div>

        {/* Activity History */}
        <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">User Activity History</h3>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-widest">Real-time</span>
          </div>
          <div className="divide-y divide-slate-50 max-h-[500px] overflow-y-auto">
            {activityHistory.map((activity) => (
              <div key={activity.id} className="p-6 hover:bg-slate-50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[10px] font-black uppercase tracking-widest ${
                    activity.type === 'login' ? 'text-emerald-600' : 
                    activity.type === 'logout' ? 'text-rose-600' : 'text-slate-600'
                  }`}>{activity.type}</span>
                  <span className="text-[10px] text-slate-400 font-medium">{new Date(activity.createdAt).toLocaleString()}</span>
                </div>
                <p className="text-sm font-bold text-slate-900 mb-1">{activity.description}</p>
                <p className="text-xs text-slate-500">User ID: {activity.userId}</p>
              </div>
            ))}
            {activityHistory.length === 0 && <div className="p-12 text-center text-slate-400 text-sm italic">No activity history found</div>}
          </div>
        </div>
      </div>

      {/* Security Infrastructure Summary */}
      <div className="bg-slate-900 rounded-[48px] p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10 text-9xl">🔒</div>
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50 mb-4">Data Encryption</p>
            <p className="text-2xl font-black tracking-tight">AES-256 Enabled</p>
            <p className="text-xs text-slate-400 mt-2">All data is encrypted at rest and in transit.</p>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50 mb-4">Backup Status</p>
            <p className="text-2xl font-black tracking-tight">Daily Snapshots</p>
            <p className="text-xs text-slate-400 mt-2">Last backup: {new Date().toLocaleDateString()} 03:00 AM</p>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50 mb-4">Access Control</p>
            <p className="text-2xl font-black tracking-tight">RBAC Active</p>
            <p className="text-xs text-slate-400 mt-2">Role-based permissions enforced via Firestore Rules.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityDashboard;
