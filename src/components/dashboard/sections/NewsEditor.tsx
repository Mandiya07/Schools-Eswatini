
import React from 'react';
import { Institution } from '../../../../types';

interface NewsEditorProps {
  institution: Institution;
  onUpdate: (updatedSections: Institution['sections']) => void;
}

const NewsEditor: React.FC<NewsEditorProps> = ({ institution, onUpdate }) => {
  const { news } = institution.sections;

  const updateField = (field: string, value: any) => {
    onUpdate({
      ...institution.sections,
      news: {
        ...news,
        [field]: value
      }
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-in fade-in slide-in-from-right-4">
      <div className="space-y-10">
        <header>
          <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">News & Media Module</h3>
          <p className="text-sm text-slate-500 font-medium">Keep your community informed with the latest updates</p>
        </header>

        <div className="space-y-8">
          <div className="group">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Section Headline</label>
            <input 
              className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 font-bold transition-all outline-none" 
              value={news.headline} 
              onChange={e => updateField('headline', e.target.value)} 
            />
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Recent Articles</h4>
              <button 
                onClick={() => updateField('articles', [...news.articles, { id: Date.now(), title: 'New Article', excerpt: '', content: '', date: new Date().toISOString().split('T')[0], author: 'Admin', image: 'https://picsum.photos/seed/news/800/400', category: 'General' }])}
                className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline"
              >
                + Add Article
              </button>
            </div>
            <div className="space-y-4">
              {news.articles.map((article, idx) => (
                <div key={article.id} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4">
                  <div className="flex justify-between items-center">
                    <input 
                      className="bg-transparent border-none font-black text-slate-900 p-0 focus:ring-0 text-sm flex-1" 
                      value={article.title} 
                      onChange={e => {
                        const newArticles = [...news.articles];
                        newArticles[idx].title = e.target.value;
                        updateField('articles', newArticles);
                      }}
                    />
                    <button 
                      onClick={() => updateField('articles', news.articles.filter((_, i) => i !== idx))}
                      className="text-rose-500 hover:text-rose-700 ml-4"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      className="bg-white border rounded-xl px-4 py-2 text-[10px] font-bold" 
                      placeholder="Category" 
                      value={article.category} 
                      onChange={e => {
                        const newArticles = [...news.articles];
                        newArticles[idx].category = e.target.value;
                        updateField('articles', newArticles);
                      }}
                    />
                    <input 
                      type="date"
                      className="bg-white border rounded-xl px-4 py-2 text-[10px] font-bold" 
                      value={article.date} 
                      onChange={e => {
                        const newArticles = [...news.articles];
                        newArticles[idx].date = e.target.value;
                        updateField('articles', newArticles);
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <header>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">News Feed Preview</h3>
        </header>
        
        <div className="sticky top-8 space-y-6">
          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
            <h4 className="text-xl font-black text-slate-900 tracking-tight">{news.headline}</h4>
            <div className="space-y-6">
              {news.articles.slice(0, 2).map(article => (
                <div key={article.id} className="flex gap-4 group cursor-pointer">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-sm">
                    <img src={article.image || undefined} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={article.title} />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[8px] font-black text-blue-600 uppercase tracking-widest">{article.category}</span>
                    <h5 className="text-xs font-black text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors">{article.title}</h5>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{article.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-3 bg-slate-100 text-slate-600 rounded-xl font-black uppercase tracking-widest text-[8px] hover:bg-slate-200 transition-all">View All News</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsEditor;
