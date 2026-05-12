import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { uploadFile } from '../services/storageService';
import { Loader2, Upload, X } from 'lucide-react';

interface SchoolApplicationFormProps {
  onClose: () => void;
}

export const SchoolApplicationForm: React.FC<SchoolApplicationFormProps> = ({ onClose }) => {
  const [institutionName, setInstitutionName] = useState('');
  const [email, setEmail] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      const documentUrls: string[] = [];
      for (const file of files) {
        const path = `applications/${Date.now()}_${file.name}`;
        const url = await uploadFile(path, file);
        documentUrls.push(url);
      }

      await addDoc(collection(db, 'school_applications'), {
        institutionName,
        email,
        status: 'pending',
        documentUrls,
        createdAt: new Date().toISOString()
      });

      alert('Application submitted successfully!');
      onClose();
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-[40px] max-w-lg w-full p-10 shadow-2xl animate-in zoom-in-95">
        <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-8">Register Your Institution</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">School Name</label>
            <input 
              type="text" 
              value={institutionName}
              onChange={(e) => setInstitutionName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-bold text-slate-900"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Contact Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-bold text-slate-900"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Registration Documents (Certificate/License)</label>
            <input 
              type="file" 
              multiple
              onChange={handleFileUpload}
              className="w-full"
              required
            />
          </div>
          <button 
            type="submit"
            disabled={isUploading}
            className="w-full bg-blue-600 text-white p-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            {isUploading ? <Loader2 className="animate-spin" /> : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
};
