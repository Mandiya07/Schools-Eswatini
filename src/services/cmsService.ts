import { db, collection, query, where, getDocs, orderBy, limit } from '../lib/firebase';
import { SuccessStory, FundraisingCampaign } from '../../types';

/**
 * Headless CMS Service
 * Decouples content management from the main application logic.
 * Provides an API-first structure for content retrieval.
 */

export const fetchSuccessStories = async (institutionId?: string, count: number = 10): Promise<SuccessStory[]> => {
  try {
    let q = query(collection(db, 'success_stories'), orderBy('createdAt', 'desc'), limit(count));
    if (institutionId) {
      q = query(collection(db, 'success_stories'), where('institutionId', '==', institutionId), orderBy('createdAt', 'desc'), limit(count));
    }
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as SuccessStory);
  } catch (error) {
    console.error("CMS: Failed to fetch success stories", error);
    return [];
  }
};

export const fetchCampaigns = async (institutionId?: string): Promise<FundraisingCampaign[]> => {
  try {
    let q = query(collection(db, 'fundraising_campaigns'), orderBy('createdAt', 'desc'));
    if (institutionId) {
      q = query(collection(db, 'fundraising_campaigns'), where('institutionId', '==', institutionId), orderBy('createdAt', 'desc'));
    }
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as FundraisingCampaign);
  } catch (error) {
    console.error("CMS: Failed to fetch campaigns", error);
    return [];
  }
};

// Mock for modular expansion
export const fetchGlobalSettings = async () => {
  return {
    siteName: 'Schools Eswatini',
    maintenanceMode: false,
    featuredRegions: ['Hhohho', 'Manzini']
  };
};
