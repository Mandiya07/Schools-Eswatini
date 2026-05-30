import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { 
  getFirestore, 
  enableMultiTabIndexedDbPersistence, 
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
  getDocFromServer,
  initializeFirestore,
  CACHE_SIZE_UNLIMITED,
  terminate,
  waitForPendingWrites,
  setLogLevel
} from 'firebase/firestore';

// Suppress Firestore offline warnings
setLogLevel('silent');
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firestore with specific settings for europe-west2 and robustness
const db = initializeFirestore(app, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
  experimentalAutoDetectLongPolling: true,
}, (firebaseConfig as Record<string, string>).firestoreDatabaseId || '(default)');

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

export const storage = getStorage(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export { db };

// Connection & Online State Tracking
let isOfflineMode = false;
let connectionCheckInterval: any = null;

export async function testConnection(retries = 1) {
  if (typeof window === 'undefined') return;
  
  try {
    // Attempt a lightweight check. 
    // Even if it results in permission denied, it confirms connectivity to the project.
    const docRef = doc(db, '_connection_test_', 'ping');
    
    // Instead of forcing a server fetch every time which is prone to transient failures,
    // we use getDoc and checking for network errors
    const pingPromise = getDoc(docRef);
    
    const timeout = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Connection timeout')), 3000)
    );

    await Promise.race([pingPromise, timeout]);
    
    if (isOfflineMode) {
      console.log("Firebase connection established.");
      isOfflineMode = false;
      if (connectionCheckInterval) {
        clearInterval(connectionCheckInterval);
        connectionCheckInterval = setInterval(() => testConnection(1), 120000); // Only check every 2 mins when online
      }
    }
    return true;
  } catch (error: any) {
    const errorMsg = error?.message?.toLowerCase() || '';
    
    // If we get a "Permission Denied" or "Resource Exhausted", it actually means we ARE connected to Firebase.
    const isActuallyConnected = errorMsg.includes('permission') || 
                                errorMsg.includes('insufficient permissions') ||
                                errorMsg.includes('resource exhausted') ||
                                errorMsg.includes('quota exceeded') ||
                                errorMsg.includes('unauthenticated');
    
    if (isActuallyConnected) {
      if (isOfflineMode) {
        console.log("Firebase connection confirmed (api responding).");
        isOfflineMode = false;
        if (connectionCheckInterval) {
          clearInterval(connectionCheckInterval);
          connectionCheckInterval = setInterval(() => testConnection(1), 180000);
        }
      }
      return true;
    }

    const isOfflineError = errorMsg.includes('client is offline') || 
                          errorMsg.includes('timeout') || 
                          errorMsg.includes('unavailable') ||
                          errorMsg.includes('not found') ||
                          errorMsg.includes('failed to fetch');

    if (!isOfflineMode) {
      if (isOfflineError) {
        console.info("Firebase operating in offline mode (local cache/mock data).");
      } else {
        console.warn("Firebase connectivity issue:", error.message);
      }
      isOfflineMode = true;
      if (connectionCheckInterval) clearInterval(connectionCheckInterval);
      connectionCheckInterval = setInterval(() => testConnection(1), 15000);
    }
    return false;
  }
}

export function isOffline() {
  return isOfflineMode;
}

export async function getDocWithRetry(docRef: any, maxRetries = 2, delay = 1000) {
  try {
    // Try from cache first (fastest for offline)
    const cachedDoc = await getDoc(docRef);
    if (cachedDoc.exists()) return cachedDoc;
  } catch (e) {
    // Ignore cache errors
  }

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await getDoc(docRef);
    } catch (error: any) {
      const isUnavailable = error instanceof Error && (error.message.includes('offline') || (error as any).code === 'unavailable' || error.message.includes('timeout'));
      if (isUnavailable) {
        if (i < maxRetries - 1) {
          console.warn(`Fetch failed, retrying... (Attempt ${i + 1}/${maxRetries})`);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
      }
      throw error;
    }
  }
  return await getDoc(docRef);
}

export async function getDocsWithRetry(q: any, maxRetries = 2, delay = 1000) {
  try {
    const cachedDocs = await getDocs(q);
    if (!cachedDocs.empty) return cachedDocs;
  } catch (e) {}

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await getDocs(q);
    } catch (error: any) {
      const isUnavailable = error instanceof Error && (error.message.includes('offline') || (error as any).code === 'unavailable' || error.message.includes('timeout'));
      if (isUnavailable) {
        if (i < maxRetries - 1) {
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
      }
      throw error;
    }
  }
  return await getDocs(q);
}

// Background connection test
if (typeof window !== 'undefined') {
  // Initial check
  testConnection(2);
  
  // Set up periodic check
  connectionCheckInterval = setInterval(() => testConnection(1), 30000);
  
  // Listen for online/offline browser events
  window.addEventListener('online', () => {
    console.log("Browser back online, checking Firebase connection...");
    testConnection(3);
  });
  window.addEventListener('offline', () => {
    isOfflineMode = true;
    console.log("Browser went offline.");
  });
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
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
};
