import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  doc, 
  getDoc, 
  serverTimestamp,
  orderBy,
  limit
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';

export interface Resource {
  id: string;
  title: string;
  description: string;
  subject: string;
  level: string;
  price: number;
  sellerId: string;
  sellerName: string;
  fileUrl: string;
  thumbnail: string;
  type: 'Notes' | 'Past Paper' | 'Guide';
  tags: string[];
  createdAt: any;
}

export const resourceService = {
  async getResources(filters?: { subject?: string; level?: string; searchQuery?: string }) {
    try {
      const resourcesRef = collection(db, 'resources');
      let q = query(resourcesRef, orderBy('createdAt', 'desc'));

      if (filters?.subject && filters.subject !== 'All') {
        q = query(q, where('subject', '==', filters.subject));
      }
      if (filters?.level && filters.level !== 'All') {
        q = query(q, where('level', '==', filters.level));
      }

      const querySnapshot = await getDocs(q);
      let results = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Resource));

      if (filters?.searchQuery) {
        const lowerQuery = filters.searchQuery.toLowerCase();
        results = results.filter(r => 
          r.title.toLowerCase().includes(lowerQuery) || 
          r.description.toLowerCase().includes(lowerQuery) ||
          r.sellerName.toLowerCase().includes(lowerQuery)
        );
      }

      return results;
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, 'resources');
      return [];
    }
  },

  async getResourceById(id: string) {
    const docRef = doc(db, 'resources', id);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Resource;
      }
      return null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `resources/${id}`);
      return null;
    }
  },

  async createTransaction(transactionData: {
    resourceId: string;
    buyerId: string;
    sellerId: string;
    amount: number;
    paymentMethod: string;
  }) {
    try {
      const docRef = await addDoc(collection(db, 'transactions'), {
        ...transactionData,
        status: 'pending',
        createdAt: new Date().toISOString() // Using ISO string as per existing pattern in rules
      });
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'transactions');
    }
  }
};
