import React from 'react';
import { Institution, DigitalDocument } from '../../../../types';
import { FileText, Plus, Trash2, ShieldCheck, Leaf, TrendingUp, Download, Share2 } from 'lucide-react';

interface PaperlessHubEditorProps {
  institution: Institution;
  onUpdate: (updatedAdminDetails: Institution['administrativeDetails']) => void;
}

const PaperlessHubEditor: React.FC<PaperlessHubEditorProps> = ({ institution, onUpdate }) => {
  const paperlessHub = institution.administrativeDetails?.paperlessHub || {
    enabled: true,
    documents: [],
    paperSavedEstimate: 0,
    digitalTransformationScore: 0
  };

  const updateHub = (updatedHub: typeof paperlessHub) => {
    onUpdate({
      ...institution.administrativeDetails!,
      paperlessHub: updatedHub
    });
  };

  const addDocument = () => {
    const newDoc: DigitalDocument = {
      id: `doc-${Date.now()}`,
      name: 'New Document',
      category: 'Form',
      url: '',
      uploadedAt: new Date().toISOString(),
      size: '0 KB'
    };
    updateHub({
      ...paperlessHub,
      documents: [newDoc, ...paperlessHub.documents],
      paperSavedEstimate: paperlessHub.paperSavedEstimate + 50,
      digitalTransformationScore: Math.min(100, paperlessHub.digitalTransformationScore + 5)
    });
  };

  const removeDocument = (id: string) => {
    updateHub({
      ...paperlessHub,
      documents: paperlessHub.documents.filter(d => d.id !== id),
      digitalTransformationScore: Math.max(0, paperlessHub.digitalTransformationScore - 5)
    });
  };

  const updateDocumentField = (id: string, field: keyof DigitalDocument, value: any) => {
    updateHub({
      ...paperlessHub,
      documents: paperlessHub.documents.map(d => d.id === id ? { ...d, [field]: value } : d)
    });
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-left-4">
      <div className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
              <Leaf className="w-6 h-6 text-emerald-200" />
            </div>
            <h3 className="text-2xl font-black italic tracking-tight">Paperless Initiative</h3>
          </div>
          <p className="text-emerald-50 font-bold max-w-xl leading-relaxed mb-8">
            Transitioning to a digital-first campus. Reduce costs, increase accessibility, and save the environment by hosting your documents online.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-black/20 backdrop-blur-lg rounded-3xl p-6 border border-white/10">
              <div className="text-[10px] font-black uppercase tracking-widest text-emerald-200 mb-1">Sheets Saved</div>
              <div className="text-4xl font-black tabular-nums">{paperlessHub.paperSavedEstimate.toLocaleString()}</div>
              <div className="mt-2 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div className="bg-black/20 backdrop-blur-lg rounded-3xl p-6 border border-white/10">
              <div className="text-[10px] font-black uppercase tracking-widest text-emerald-200 mb-1">Digital Score</div>
              <div className="text-4xl font-black tabular-nums">{paperlessHub.digitalTransformationScore}%</div>
              <div className="mt-2 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-blue-400" style={{ width: `${paperlessHub.digitalTransformationScore}%` }}></div>
              </div>
            </div>
            <div className="bg-black/20 backdrop-blur-lg rounded-3xl p-6 border border-white/10">
              <div className="text-[10px] font-black uppercase tracking-widest text-emerald-200 mb-1">Initiative Status</div>
              <div className="flex items-center gap-2 mt-1">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <span className="text-xl font-black tracking-tight">{paperlessHub.digitalTransformationScore > 50 ? 'Advanced' : 'Growth' }</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-500/20 blur-[100px] rounded-full"></div>
      </div>

      <div className="bg-white border-2 border-slate-100 rounded-[40px] p-8 shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h4 className="text-xl font-black text-slate-900 tracking-tight">Digital Document Library</h4>
            <p className="text-sm text-slate-500 font-medium italic">Upload forms, handbooks, and newsletters to replace paper distributions.</p>
          </div>
          <button 
            onClick={addDocument}
            className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-2 hover:bg-slate-900 transition-all shadow-lg"
          >
            <Plus className="w-4 h-4" /> Add Document
          </button>
        </div>

        <div className="space-y-4">
          {paperlessHub.documents.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 rounded-[32px] border-2 border-dashed border-slate-200">
              <FileText className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">No digital documents yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b-2 border-slate-50">
                    <th className="pb-4 pt-2 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Document Name</th>
                    <th className="pb-4 pt-2 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Category</th>
                    <th className="pb-4 pt-2 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {paperlessHub.documents.map((doc) => (
                    <tr key={doc.id} className="group hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-emerald-50 rounded-xl">
                            <FileText className="w-5 h-5 text-emerald-600" />
                          </div>
                          <input 
                            className="bg-transparent border-none font-bold text-slate-900 p-0 focus:ring-0 w-full"
                            value={doc.name}
                            onChange={e => updateDocumentField(doc.id, 'name', e.target.value)}
                            placeholder="e.g. 2024 Parent Handbook"
                          />
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <select 
                          className="bg-slate-100 border-none rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-emerald-500"
                          value={doc.category}
                          onChange={e => updateDocumentField(doc.id, 'category', e.target.value)}
                        >
                          <option value="Form">Form</option>
                          <option value="Policy">Policy</option>
                          <option value="Newsletter">Newsletter</option>
                          <option value="Handbook">Handbook</option>
                        </select>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            className="p-2 text-slate-300 hover:text-blue-500 transition-colors"
                            title="Share Link"
                          >
                            <Share2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => removeDocument(doc.id)}
                            className="p-2 text-slate-300 hover:text-rose-500 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900 rounded-[40px] p-8 text-white">
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="w-6 h-6 text-blue-400" />
            <h5 className="font-black italic tracking-tight text-xl">Compliance & Security</h5>
          </div>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2"></div>
              <p className="text-slate-400 text-sm font-medium">Auto-backups for all uploaded school policies.</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2"></div>
              <p className="text-slate-400 text-sm font-medium">Role-based access for internal documents.</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2"></div>
              <p className="text-slate-400 text-sm font-medium">Digital signatures support coming soon.</p>
            </li>
          </ul>
        </div>
        
        <div className="bg-blue-50 rounded-[40px] p-8">
          <h5 className="font-black italic tracking-tight text-xl text-slate-900 mb-6">Benefits of Going Paperless</h5>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-blue-600">Cost Savings</div>
                <div className="text-sm font-bold text-slate-700 leading-tight">Reduce printing & toner expenses by up to 80%.</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-blue-600">High Accessibility</div>
                <div className="text-sm font-bold text-slate-700 leading-tight">Parents can access files 24/7 on any device.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperlessHubEditor;
