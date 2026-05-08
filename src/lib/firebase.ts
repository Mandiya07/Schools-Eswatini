import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, enableMultiTabIndexedDbPersistence, doc, getDoc, setDoc, updateDoc, deleteDoc, collection, query, where, onSnapshot, getDocs, orderBy, limit, addDoc, serverTimestamp, getDocFromServer, getDocFromCache, getDocsFromCache } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const databaseId = (firebaseConfig as any).firestoreDatabaseId || '(default)';

export const db = getFirestore(app, databaseId);

// Enable Persistence
if (typeof window !== 'undefined') {
  enableMultiTabIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn("Persistence failed-precondition (multiple tabs open)");
    } else if (err.code === 'unimplemented') {
      console.warn("Persistence unimplemented by browser");
    }
  });
}

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export async function testConnection(retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const docRef = doc(db, 'test', 'connection');
      await getDocFromServer(docRef);
      console.log("Firebase connection successful.");
      return;
    } catch (error) {
      console.warn(`Firebase connection attempt ${i + 1} failed:`, error);
      if (i === retries - 1) {
        if(error instanceof Error && (error.message.includes('the client is offline') || (error as any).code === 'unavailable')) {
          console.warn("Firebase may not be fully initialized or is offline. Retrying...", error);
        }
      }
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
}

export async function getDocWithRetry(docRef: any, maxRetries = 3, delay = 1500) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await getDoc(docRef);
    } catch (error: any) {
      const isOffline = error instanceof Error && (error.message.includes('offline') || error.code === 'unavailable');
      if (isOffline) {
        if (i < maxRetries - 1) {
          console.warn(`Fetch failed (offline/unavailable), retrying in ${delay}ms... (Attempt ${i + 1}/${maxRetries})`);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        } else {
          // Try cache as a last resort
          console.warn("All retries failed, attempting to read from cache...");
          try {
            return await getDocFromCache(docRef);
          } catch (cacheError) {
            console.error("Cache read also failed:", cacheError);
            throw error; // Throw original offline error if cache also fails
          }
        }
      }
      throw error;
    }
  }
  return await getDoc(docRef);
}

export async function getDocsWithRetry(q: any, maxRetries = 3, delay = 1500) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await getDocs(q);
    } catch (error: any) {
      const isOffline = error instanceof Error && (error.message.includes('offline') || error.code === 'unavailable');
      if (isOffline) {
        if (i < maxRetries - 1) {
          console.warn(`Fetch docs failed (offline/unavailable), retrying in ${delay}ms... (Attempt ${i + 1}/${maxRetries})`);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        } else {
          // Try cache as a last resort
          console.warn("All retries failed, attempting to read docs from cache...");
          try {
            return await getDocsFromCache(q);
          } catch (cacheError) {
            console.error("Cache docs read also failed:", cacheError);
            throw error;
          }
        }
      }
      throw error;
    }
  }
  return await getDocs(q);
}

// Only run testConnection in the browser
if (typeof window !== 'undefined') {
  testConnection();
}

// Error Handling
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  collection, 
  query, 
  where, 
  onSnapshot,
  getDocs,
  orderBy,
  limit,
  addDoc,
  serverTimestamp,
  getDocFromCache,
  getDocsFromCache
};
