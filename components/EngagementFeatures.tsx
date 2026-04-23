
import React, { useState, useEffect } from 'react';
import { db, auth } from '../src/lib/firebase';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  addDoc, 
  serverTimestamp, 
  orderBy,
  limit
} from 'firebase/firestore';
import { 
  Star, 
  MessageSquare, 
  UserPlus, 
  Trophy, 
  Users, 
  Heart, 
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Review, Message, AlumniProfile, SuccessStory, FundraisingCampaign, Institution } from '../types';

interface EngagementFeaturesProps {
  institution: Institution;
  lang: 'en' | 'ss';
}

export const ReviewsSection: React.FC<EngagementFeaturesProps> = ({ institution, lang }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Form state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [userRole, setUserRole] = useState<'parent' | 'alumni' | 'visitor'>('visitor');

  useEffect(() => {
    const q = query(
      collection(db, 'reviews'),
      where('institutionId', '==', institution.id),
      where('status', '==', 'approved'),
      orderBy('createdAt', 'desc'),
      limit(10)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Review));
      setReviews(data);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching reviews:", err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [institution.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) {
      setError(lang === 'en' ? 'Please sign in to leave a review' : 'Sicela ungene kute ushiye kubuyeketa');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await addDoc(collection(db, 'reviews'), {
        institutionId: institution.id,
        userId: auth.currentUser.uid,
        userName: auth.currentUser.displayName || 'Anonymous',
        userRole,
        rating,
        comment,
        status: 'pending',
        createdAt: new Date().toISOString()
      });
      setSuccess(true);
      setComment('');
      setTimeout(() => {
        setSuccess(false);
        setShowForm(false);
      }, 3000);
    } catch (err) {
      console.error("Error submitting review:", err);
      setError(lang === 'en' ? 'Failed to submit review' : 'Kuhluleke kutfumela kubuyeketa');
    } finally {
      setSubmitting(false);
    }
  };

  const labels = {
    en: {
      title: 'Community Reviews',
      subtitle: 'Hear from parents, students, and alumni',
      leaveReview: 'Leave a Review',
      rating: 'Rating',
      comment: 'Your Experience',
      role: 'I am a...',
      submit: 'Submit Review',
      pending: 'Thank you! Your review is pending moderation.',
      noReviews: 'No reviews yet. Be the first to share your experience!'
    },
    ss: {
      title: 'Kubuyeketa Kwemphakatsi',
      subtitle: 'Yiva kubatali, bafundzi, kanye ne-alumni',
      leaveReview: 'Shiya Kubuyeketa',
      rating: 'Silinganiso',
      comment: 'Lwati Lwakho',
      role: 'Ngingu...',
      submit: 'Tfumela Kubuyeketa',
      pending: 'Ngiyabonga! Kubuyeketa kwakho kulindzele kumodareyithwa.',
      noReviews: 'Kute kubuyeketa kwanyalo. Ba wekucala kwabelana ngelwati lwakho!'
    }
  }[lang];

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-5xl font-black text-slate-900 tracking-tight">{labels.title}</h2>
          <p className="text-xl text-slate-500 mt-2">{labels.subtitle}</p>
        </div>
        {!showForm && (
          <button 
            onClick={() => setShowForm(true)}
            className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition-all flex items-center gap-3"
          >
            <Star className="w-4 h-4" /> {labels.leaveReview}
          </button>
        )}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-slate-50 p-10 rounded-[40px] border border-slate-100 space-y-8"
          >
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">{labels.role}</label>
                  <div className="flex gap-4">
                    {(['parent', 'alumni', 'visitor'] as const).map(role => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setUserRole(role)}
                        className={`px-6 py-3 rounded-xl text-xs font-bold transition-all ${userRole === role ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}
                      >
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">{labels.rating}</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setRating(s)}
                        className="p-2 transition-transform hover:scale-110"
                      >
                        <Star className={`w-8 h-8 ${s <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">{labels.comment}</label>
                  <textarea
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full h-32 bg-white border border-slate-200 rounded-2xl p-6 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                    placeholder={lang === 'en' ? 'Share your thoughts...' : 'Yabelana ngeticabango takho...'}
                  />
                </div>
                <div className="flex items-center justify-between">
                  {error && <p className="text-rose-500 text-xs font-bold flex items-center gap-2"><AlertCircle className="w-4 h-4" /> {error}</p>}
                  {success && <p className="text-emerald-500 text-xs font-bold flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> {labels.pending}</p>}
                  <div className="flex gap-4 ml-auto">
                    <button 
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-8 py-4 text-slate-500 font-bold text-xs uppercase tracking-widest"
                    >
                      Cancel
                    </button>
                    <button 
                      disabled={submitting}
                      className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center gap-3"
                    >
                      {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      {labels.submit}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {loading ? (
          <div className="col-span-2 flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-slate-300" />
          </div>
        ) : reviews.length > 0 ? (
          reviews.map((review, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={review.id} 
              className="p-10 bg-white border border-slate-100 rounded-[48px] shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-xl font-black text-slate-400">
                    {review.userName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900">{review.userName}</h4>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{review.userRole}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} className={`w-4 h-4 ${s <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`} />
                  ))}
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed italic">"{review.comment}"</p>
              <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mt-8">{new Date(review.createdAt).toLocaleDateString()}</p>
            </motion.div>
          ))
        ) : (
          <div className="col-span-2 text-center py-20 bg-slate-50 rounded-[48px] border border-dashed border-slate-200">
            <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 font-medium">{labels.noReviews}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export const AlumniSection: React.FC<EngagementFeaturesProps> = ({ institution, lang }) => {
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [campaigns, setCampaigns] = useState<FundraisingCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [showReg, setShowReg] = useState(false);

  useEffect(() => {
    // Fetch success stories
    const qStories = query(
      collection(db, 'success_stories'),
      where('institutionId', '==', institution.id),
      orderBy('createdAt', 'desc'),
      limit(3)
    );

    const qCampaigns = query(
      collection(db, 'fundraising_campaigns'),
      where('institutionId', '==', institution.id),
      orderBy('createdAt', 'desc'),
      limit(2)
    );

    const unsubStories = onSnapshot(qStories, (snapshot) => {
      setStories(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SuccessStory)));
    });

    const unsubCampaigns = onSnapshot(qCampaigns, (snapshot) => {
      setCampaigns(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FundraisingCampaign)));
      setLoading(false);
    });

    return () => {
      unsubStories();
      unsubCampaigns();
    };
  }, [institution.id]);

  const labels = {
    en: {
      title: 'Alumni Network',
      subtitle: 'Connecting past, present, and future',
      join: 'Join Alumni Network',
      stories: 'Success Stories',
      fundraising: 'Support Our Growth',
      goal: 'Goal',
      raised: 'Raised',
      donate: 'Contribute Now'
    },
    ss: {
      title: 'Inkhundla ye-Alumni',
      subtitle: 'Kuhlanganisa lokwentekile, lokwentekako, nelikusasa',
      join: 'Joyina Inkhundla ye-Alumni',
      stories: 'Tindzaba tekuphumelela',
      fundraising: 'Sekela Kukhula Kwetfu',
      goal: 'Silinganiso',
      raised: 'Lokubutselwe',
      donate: 'Nikela Nyalo'
    }
  }[lang];

  return (
    <div className="space-y-32">
      {/* Header & Join CTA */}
      <section className="bg-indigo-900 text-white p-20 rounded-[80px] relative overflow-hidden shadow-3xl">
        <div className="absolute top-0 right-0 p-20 opacity-10 text-[15rem] leading-none select-none">🎓</div>
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-6xl font-black tracking-tighter mb-8 leading-none">{labels.title}</h2>
          <p className="text-xl text-indigo-200 font-medium leading-relaxed mb-12">{labels.subtitle}</p>
          <button 
            onClick={() => setShowReg(true)}
            className="bg-white text-indigo-900 px-12 py-6 rounded-[32px] font-black uppercase tracking-widest text-xs hover:bg-indigo-50 transition-all flex items-center gap-4 shadow-xl"
          >
            <UserPlus className="w-5 h-5" /> {labels.join}
          </button>
        </div>
      </section>

      {/* Success Stories */}
      <section className="space-y-16">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-3xl flex items-center justify-center text-3xl">🏆</div>
          <h3 className="text-4xl font-black text-slate-900 tracking-tight">{labels.stories}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {stories.length > 0 ? stories.map((story, idx) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              key={story.id} 
              className="group cursor-pointer"
            >
              <div className="aspect-square rounded-[56px] overflow-hidden mb-8 shadow-lg relative">
                <img src={story.image || `https://picsum.photos/seed/${story.id}/800/800`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-10">
                  <p className="text-white font-black text-2xl tracking-tight">{story.alumniName}</p>
                  <p className="text-indigo-300 text-[10px] font-black uppercase tracking-widest mt-2">{story.title}</p>
                </div>
              </div>
              <h4 className="text-xl font-black text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors">{story.title}</h4>
              <p className="text-slate-500 line-clamp-3 leading-relaxed">{story.story}</p>
            </motion.div>
          )) : (
            <div className="col-span-3 text-center py-20 bg-slate-50 rounded-[56px] border border-dashed border-slate-200">
              <Trophy className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">Coming soon: Inspiring stories from our graduates.</p>
            </div>
          )}
        </div>
      </section>

      {/* Fundraising */}
      <section className="space-y-16">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-3xl flex items-center justify-center text-3xl">❤️</div>
          <h3 className="text-4xl font-black text-slate-900 tracking-tight">{labels.fundraising}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {campaigns.length > 0 ? campaigns.map(campaign => (
            <div key={campaign.id} className="p-14 bg-white border border-slate-100 rounded-[64px] shadow-sm hover:shadow-2xl transition-all group">
              <h4 className="text-3xl font-black text-slate-900 mb-4">{campaign.title}</h4>
              <p className="text-slate-500 mb-10 leading-relaxed">{campaign.description}</p>
              
              <div className="space-y-4 mb-10">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                  <span className="text-slate-400">{labels.raised}: SZL {campaign.currentAmount}</span>
                  <span className="text-indigo-600">{labels.goal}: SZL {campaign.goalAmount}</span>
                </div>
                <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (campaign.currentAmount / campaign.goalAmount) * 100)}%` }}
                    className="h-full bg-indigo-600"
                  />
                </div>
              </div>

              <button className="w-full bg-slate-900 text-white py-6 rounded-[32px] font-black uppercase tracking-widest text-xs hover:bg-indigo-600 transition-all shadow-xl">
                {labels.donate}
              </button>
            </div>
          )) : (
            <div className="col-span-2 text-center py-20 bg-slate-50 rounded-[56px] border border-dashed border-slate-200">
              <Heart className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">No active campaigns at the moment. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export const InquiryForm: React.FC<EngagementFeaturesProps> = ({ institution, lang }) => {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    body: ''
  });

  const subjects = [
    'Admissions',
    'Academics',
    'Fees',
    'General Inquiry',
    'Other'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const messageData = {
        institutionId: institution.id,
        senderId: auth.currentUser?.uid || null,
        senderName: formData.name,
        senderEmail: formData.email,
        senderPhone: formData.phone,
        subject: formData.subject,
        body: formData.body,
        status: 'unread',
        isDirectInquiry: true,
        createdAt: new Date().toISOString()
      };

      await addDoc(collection(db, 'messages'), messageData);

      // Send Email Notification to School Admin
      try {
        await fetch('/api/notify/new-inquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            schoolEmail: institution.contact.email,
            schoolName: institution.name,
            previewText: formData.body.substring(0, 100)
          })
        });
      } catch (notifyErr) {
        console.error("Failed to notify school via email:", notifyErr);
      }

      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', body: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error("Error sending inquiry:", err);
      setError(lang === 'en' ? 'Failed to send inquiry' : 'Kuhluleke kutfumela imibuto');
    } finally {
      setSubmitting(false);
    }
  };

  const labels = {
    en: {
      title: 'Direct Inquiry',
      subtitle: 'Have questions? Send a message directly to our administration.',
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number (Optional)',
      subject: 'Subject',
      message: 'Your Message',
      send: 'Send Message',
      success: 'Thank you for contacting us. We will respond shortly.'
    },
    ss: {
      title: 'Imibuto Lekhona',
      subtitle: 'Unemibuto? Tfumela umlayeto ngco kubaphatsi betfu.',
      name: 'Ligama Lonkhe',
      email: 'I-imeyili',
      phone: 'Inombolo yelucingo (Sikhetselo)',
      subject: 'Sihloko',
      message: 'Umlayeto Wakho',
      send: 'Tfumela Umlayeto',
      success: 'Ngiyabonga ngekutsintsana natsi. Sitawuphendvula masinyane.'
    }
  }[lang];

  return (
    <div className="bg-white p-16 rounded-[80px] border border-slate-100 shadow-3xl">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="text-center">
          <h3 className="text-4xl font-black text-slate-900 tracking-tight">{labels.title}</h3>
          <p className="text-slate-500 mt-4 text-lg">{labels.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{labels.name}</label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-6 text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{labels.email}</label>
              <input
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-6 text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{labels.phone}</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-6 text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{labels.subject}</label>
              <select
                required
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-6 text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none"
              >
                {subjects.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{labels.message}</label>
            <textarea
              required
              value={formData.body}
              onChange={(e) => setFormData({...formData, body: e.target.value})}
              className="w-full h-48 bg-slate-50 border border-slate-100 rounded-3xl p-8 text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
            />
          </div>

          <div className="flex flex-col items-center gap-6">
            {success && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-50 text-emerald-700 px-8 py-4 rounded-2xl font-bold text-sm flex items-center gap-3 border border-emerald-100"
              >
                <CheckCircle2 className="w-5 h-5" /> {labels.success}
              </motion.div>
            )}
            {error && (
              <div className="text-rose-500 font-bold text-sm flex items-center gap-2">
                <AlertCircle className="w-5 h-5" /> {error}
              </div>
            )}
            <button 
              disabled={submitting}
              className="bg-slate-900 text-white px-16 py-7 rounded-[32px] font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition-all shadow-2xl flex items-center gap-4 disabled:opacity-50"
            >
              {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              {labels.send}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
