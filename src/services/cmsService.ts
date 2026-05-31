import { db, collection, query, where, getDocs, orderBy, limit, getDocsWithRetry } from '../lib/firebase';
import { SuccessStory, FundraisingCampaign } from '../../types';

/**
 * Headless CMS Service
 * Decouples content management from the main application logic.
 * Provides an API-first structure for content retrieval.
 */

export const fetchSuccessStories = async (institutionId?: string, count: number = 10): Promise<SuccessStory[]> => {
  try {
    let q = query(collection(db, 'success_stories'));
    if (institutionId) {
      q = query(collection(db, 'success_stories'), where('institutionId', '==', institutionId));
    }
    const snapshot = await getDocsWithRetry(q);
    let data = snapshot.docs.map(doc => doc.data() as SuccessStory);
    data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return data.slice(0, count);
  } catch (error) {
    console.error("CMS: Failed to fetch success stories", error);
    return [];
  }
};

export const fetchCampaigns = async (institutionId?: string): Promise<FundraisingCampaign[]> => {
  try {
    let q = query(collection(db, 'fundraising_campaigns'));
    if (institutionId) {
      q = query(collection(db, 'fundraising_campaigns'), where('institutionId', '==', institutionId));
    }
    const snapshot = await getDocsWithRetry(q);
    let data = snapshot.docs.map(doc => doc.data() as FundraisingCampaign);
    data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return data;
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
