import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, initializeFirestore, doc, getDoc, setDoc, updateDoc, deleteDoc, collection, query, where, onSnapshot, getDocs, orderBy, limit, addDoc, serverTimestamp, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const databaseId = (firebaseConfig as any).firestoreDatabaseId || '(default)';

export const db = getFirestore(app, databaseId);

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
  serverTimestamp
};
