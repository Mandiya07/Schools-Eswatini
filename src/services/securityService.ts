import { db, auth, collection, addDoc, serverTimestamp } from '../lib/firebase';

export enum ActivityType {
  LOGIN = 'login',
  LOGOUT = 'logout',
  PROFILE_UPDATE = 'profile_update',
  REVIEW_SUBMIT = 'review_submit',
  INQUIRY_SEND = 'inquiry_send',
  SECURITY_EVENT = 'security_event'
}

export const logActivity = async (type: ActivityType, description: string, metadata: any = {}) => {
  const user = auth.currentUser;
  if (!user) return;

  try {
    await addDoc(collection(db, 'activity_history'), {
      id: crypto.randomUUID(),
      userId: user.uid,
      type,
      description,
      metadata,
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Failed to log activity", error);
  }
};

export const logAudit = async (action: string, resource: string, resourceId: string, details: any = {}) => {
  const user = auth.currentUser;
  if (!user) return;

  try {
    // In a real app, we might call a server-side endpoint to get IP/UserAgent
    await fetch('/api/audit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action,
        resource,
        resourceId,
        details,
        userId: user.uid
      })
    });

    // Also write to Firestore for persistence
    await addDoc(collection(db, 'audit_logs'), {
      id: crypto.randomUUID(),
      userId: user.uid,
      action,
      resource,
      resourceId,
      details,
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Failed to log audit", error);
  }
};
