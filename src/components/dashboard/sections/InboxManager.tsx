
import React, { useState, useEffect } from 'react';
import { db, auth } from '../../../lib/firebase';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  orderBy, 
  doc, 
  updateDoc, 
  deleteDoc 
} from 'firebase/firestore';
import { 
  Mail, 
  MailOpen, 
  Trash2, 
  Search, 
  Filter, 
  ChevronRight, 
  Clock, 
  User, 
  AtSign, 
  Phone,
  Inbox as InboxIcon,
  Archive,
  RefreshCw,
  MoreVertical,
  Send,
  MessageSquare,
  Reply
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Message, Institution } from '../../../../types';

interface InboxManagerProps {
  institution: Institution;
}

const InboxManager: React.FC<InboxManagerProps> = ({ institution }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'archived'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Reply State
  const [replyText, setReplyText] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const [sendingReply, setSendingReply] = useState(false);

  useEffect(() => {
    const q = query(
      collection(db, 'messages'),
      where('institutionId', '==', institution.id),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message));
      setMessages(data);
      setLoading(false);
      
      // Update selected message if it was updated in the list
      if (selectedMessage) {
        const updated = data.find(m => m.id === selectedMessage.id);
        if (updated) setSelectedMessage(updated);
      }
    }, (err) => {
      console.error("Error fetching messages:", err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [institution.id, selectedMessage?.id]);

  const filteredMessages = messages.filter(m => {
    const matchesFilter = filter === 'all' ? m.status !== 'archived' : 
                         filter === 'unread' ? m.status === 'unread' : 
                         m.status === 'archived';
    const matchesSearch = m.senderName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           m.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           m.body.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const markAsRead = async (message: Message) => {
    if (message.status === 'unread') {
      try {
        await updateDoc(doc(db, 'messages', message.id), {
          status: 'read'
        });
      } catch (err) {
        console.error("Error updating message status:", err);
      }
    }
  };

  const archiveMessage = async (messageId: string) => {
    try {
      await updateDoc(doc(db, 'messages', messageId), {
        status: 'archived'
      });
      if (selectedMessage?.id === messageId) setSelectedMessage(null);
    } catch (err) {
      console.error("Error archiving message:", err);
    }
  };

  const deleteMessage = async (messageId: string) => {
    if (window.confirm('Are you sure you want to delete this message forever?')) {
      try {
        await deleteDoc(doc(db, 'messages', messageId));
        if (selectedMessage?.id === messageId) setSelectedMessage(null);
      } catch (err) {
        console.error("Error deleting message:", err);
      }
    }
  };

  const handleReply = async () => {
    if (!selectedMessage || !replyText.trim()) return;

    setSendingReply(true);
    try {
      const adminReply = {
        body: replyText,
        adminName: auth.currentUser?.displayName || 'Administrator',
        adminId: auth.currentUser?.uid || 'admin',
        createdAt: new Date().toISOString()
      };

      await updateDoc(doc(db, 'messages', selectedMessage.id), {
        adminReply,
        status: 'read'
      });

      // Send Email Notification to Sender
      try {
        await fetch('/api/notify/reply', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            recipientEmail: selectedMessage.senderEmail,
            schoolName: institution.name,
            replyBody: replyText
          })
        });
      } catch (notifyErr) {
        console.error("Failed to notify sender via email:", notifyErr);
      }

      setReplyText('');
      setIsReplying(false);
    } catch (err) {
      console.error("Error sending reply:", err);
      alert('Failed to send reply. Please try again.');
    } finally {
      setSendingReply(false);
    }
  };

  return (
    <div className="flex bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden min-h-[700px] animate-in fade-in">
      {/* Sidebar List */}
      <div className="w-1/3 border-r border-slate-100 flex flex-col">
        <header className="p-8 border-b border-slate-100 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Inbox</h3>
            <div className="flex gap-2">
              <button 
                onClick={() => setFilter('all')}
                className={`p-2 rounded-xl transition-all ${filter === 'all' ? 'bg-slate-900 text-white' : 'text-slate-400 hover:bg-slate-100'}`}
              >
                <InboxIcon className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setFilter('unread')}
                className={`p-2 rounded-xl transition-all ${filter === 'unread' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-100'}`}
              >
                <Mail className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setFilter('archived')}
                className={`p-2 rounded-xl transition-all ${filter === 'archived' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:bg-slate-100'}`}
              >
                <Archive className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search messages..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border-none rounded-xl pl-12 pr-4 py-3 text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <RefreshCw className="w-8 h-8 animate-spin text-slate-200" />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Loading messages...</p>
            </div>
          ) : filteredMessages.length > 0 ? (
            <div className="divide-y divide-slate-50">
              {filteredMessages.map(m => (
                <button 
                  key={m.id}
                  onClick={() => {
                    setSelectedMessage(m);
                    markAsRead(m);
                    setIsReplying(false);
                  }}
                  className={`w-full text-left p-6 transition-all hover:bg-slate-50 flex gap-4 ${selectedMessage?.id === m.id ? 'bg-blue-50' : ''} ${m.status === 'unread' ? 'border-l-4 border-blue-600' : ''}`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${m.status === 'unread' ? 'bg-blue-600 text-white' : m.adminReply ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                    {m.adminReply ? <Reply className="w-5 h-5" /> : m.status === 'unread' ? <Mail className="w-5 h-5" /> : <MailOpen className="w-5 h-5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className={`text-sm font-bold truncate ${m.status === 'unread' ? 'text-slate-900' : 'text-slate-500'}`}>{m.senderName}</h4>
                      <span className="text-[9px] font-bold text-slate-400 uppercase whitespace-nowrap ml-2">{new Date(m.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className={`text-xs truncate font-medium mb-1 ${m.status === 'unread' ? 'text-slate-700' : 'text-slate-400'}`}>{m.subject}</p>
                    <p className="text-[10px] text-slate-400 truncate leading-relaxed">{m.body}</p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 px-12 text-center gap-6">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-4xl">📭</div>
              <div className="space-y-2">
                <p className="text-sm font-black text-slate-900 uppercase tracking-widest">No Messages</p>
                <p className="text-xs text-slate-400 font-medium">Your inbox is currently empty.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Message Content */}
      <div className="flex-1 bg-slate-50/30 flex flex-col">
        <AnimatePresence mode="wait">
          {selectedMessage ? (
            <motion.div 
              key={selectedMessage.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex flex-col h-full"
            >
              <header className="p-8 bg-white border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-black">
                    {selectedMessage.senderName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-base font-black text-slate-900">{selectedMessage.senderName}</h4>
                    <p className="text-xs text-slate-500 font-medium">{selectedMessage.senderEmail}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {selectedMessage.status !== 'archived' && (
                    <button 
                      onClick={() => archiveMessage(selectedMessage.id)}
                      className="p-3 bg-slate-50 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all"
                      title="Archive"
                    >
                      <Archive className="w-4 h-4" />
                    </button>
                  )}
                  <button 
                    onClick={() => deleteMessage(selectedMessage.id)}
                    className="p-3 bg-slate-50 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                    title="Delete Permanently"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </header>

              <div className="flex-1 p-12 overflow-y-auto">
                <div className="max-w-3xl mx-auto space-y-12">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-3xl font-black text-slate-900 tracking-tight">{selectedMessage.subject}</h2>
                      <div className="flex items-center gap-2 text-slate-400">
                        <Clock className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">{new Date(selectedMessage.createdAt).toLocaleString()}</span>
                      </div>
                    </div>
                    {selectedMessage.isDirectInquiry && (
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">
                        Portal Inquiry
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12 border-b border-slate-100">
                    <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100">
                      <AtSign className="w-4 h-4 text-slate-400" />
                      <div className="min-w-0">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Email Address</p>
                        <p className="text-xs font-bold text-slate-900 truncate">{selectedMessage.senderEmail}</p>
                      </div>
                    </div>
                    {(selectedMessage as any).senderPhone && (
                      <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100">
                        <Phone className="w-4 h-4 text-slate-400" />
                        <div className="min-w-0">
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Phone Number</p>
                          <p className="text-xs font-bold text-slate-900 truncate">{(selectedMessage as any).senderPhone}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-10">
                    {/* Original Message */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative">
                       <div className="absolute -left-3 top-8 w-6 h-6 bg-white border-l border-t border-slate-100 rotate-45"></div>
                       <p className="text-base text-slate-700 leading-relaxed font-medium whitespace-pre-wrap">
                        {selectedMessage.body}
                      </p>
                    </div>

                    {/* Admin Reply */}
                    {selectedMessage.adminReply && (
                      <div className="flex flex-col items-end space-y-4">
                        <div className="bg-blue-600 p-8 rounded-3xl text-white shadow-lg relative max-w-[90%]">
                          <div className="absolute -right-3 top-8 w-6 h-6 bg-blue-600 border-r border-t border-blue-600 rotate-45"></div>
                          <p className="text-base leading-relaxed font-medium whitespace-pre-wrap">
                            {selectedMessage.adminReply.body}
                          </p>
                          <div className="mt-4 pt-4 border-t border-white/20 flex justify-between items-center text-[10px] font-black uppercase tracking-widest opacity-80">
                            <span>{selectedMessage.adminReply.adminName}</span>
                            <span>{new Date(selectedMessage.adminReply.createdAt).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Reply Input Area */}
                    {!selectedMessage.adminReply && !isReplying && (
                       <button 
                         onClick={() => setIsReplying(true)}
                         className="w-full py-8 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-all font-bold flex flex-col items-center gap-3 group"
                       >
                         <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center group-hover:bg-blue-50 transition-all">
                           <Reply className="w-6 h-6" />
                         </div>
                         Write a reply...
                       </button>
                    )}

                    {isReplying && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4 bg-white p-8 rounded-3xl border border-slate-100 shadow-xl"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-blue-600" /> Sending Reply
                          </h5>
                          <button 
                            onClick={() => setIsReplying(false)}
                            className="text-[10px] font-black text-slate-400 hover:text-slate-600 uppercase tracking-widest"
                          >
                            Cancel
                          </button>
                        </div>
                        <textarea 
                          autoFocus
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Type your response to the inquirer..."
                          className="w-full h-48 bg-slate-50 border-none rounded-2xl p-6 text-slate-900 font-medium outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                        />
                        <div className="flex justify-end">
                          <button 
                            disabled={sendingReply || !replyText.trim()}
                            onClick={handleReply}
                            className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 transition-all flex items-center gap-3 disabled:opacity-50 shadow-lg"
                          >
                            {sendingReply ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                            Send Reply
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>

              {!selectedMessage.adminReply && !isReplying && (
                <footer className="p-8 bg-white border-t border-slate-100">
                  <div className="flex gap-4">
                    <button 
                      className="flex-1 py-5 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:bg-blue-600 flex items-center justify-center gap-3 shadow-xl"
                      onClick={() => setIsReplying(true)}
                    >
                      <Reply className="w-4 h-4" /> Quick Reply
                    </button>
                    <button 
                      className="px-8 py-5 bg-slate-100 text-slate-600 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:bg-slate-200 flex items-center justify-center gap-3"
                      onClick={() => window.location.href = `mailto:${selectedMessage.senderEmail}?subject=Re: ${selectedMessage.subject}`}
                    >
                      <Mail className="w-4 h-4" /> Email Client
                    </button>
                  </div>
                </footer>
              )}
            </motion.div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-20 gap-8">
              <div className="w-32 h-32 bg-slate-100 rounded-[48px] flex items-center justify-center text-6xl shadow-inner animate-pulse">✉️</div>
              <div className="max-w-xs space-y-4">
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">No Message Selected</h3>
                <p className="text-sm text-slate-400 font-medium leading-relaxed">Select a message from the sidebar to read and manage your inquiries.</p>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InboxManager;
