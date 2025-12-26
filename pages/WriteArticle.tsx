
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { dbService } from '../services/db';
import { BlogPost } from '../types';

const WriteArticle: React.FC = () => {
  const navigate = useNavigate();
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: '', 
    category: 'Career Advice', 
    author: '', 
    excerpt: '', 
    content: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const blog: BlogPost = {
      ...formData, 
      id: 'usr-' + Date.now(), 
      date: '', // Will be set by admin on approval
      image: `https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop`,
      status: 'Pending', 
      submittedDate: new Date().toISOString()
    };
    dbService.saveBlog(blog);
    setSubmitSuccess(true);
    // Automatic redirect after a few seconds
    setTimeout(() => {
      navigate('/blog');
    }, 5000);
  };

  return (
    <div className="min-h-screen pt-48 pb-40 px-6 sm:px-10 transition-colors duration-500">
      <div className="max-w-5xl mx-auto">
        <Link 
          to="/blog" 
          className="inline-flex items-center space-x-4 text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] hover:text-sky-500 transition-all mb-16"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          <span>Return to Feed</span>
        </Link>

        <AnimatePresence mode="wait">
          {!submitSuccess ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[var(--bg-indigo)] border border-[var(--border-soft)] rounded-[60px] p-12 sm:p-20 shadow-2xl relative overflow-hidden"
            >
              <div className="mb-20">
                <h1 className="text-6xl sm:text-7xl font-black text-[var(--text-primary)] tracking-tighter mb-6 leading-none">Drafting<br /><span className="text-sky-500">Protocol.</span></h1>
                <p className="text-[var(--text-secondary)] text-xl font-medium">Your submission will be reviewed by the editorial board before publication.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="group">
                    <label className="block text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] mb-4 opacity-70">Author Manifest</label>
                    <input 
                      required
                      className="w-full bg-transparent border-b-2 border-[var(--border-soft)] py-4 text-2xl font-bold text-[var(--text-primary)] focus:outline-none focus:border-sky-500 transition-all placeholder:text-[var(--text-muted)]" 
                      placeholder="Your Full Name"
                      value={formData.author}
                      onChange={e => setFormData({...formData, author: e.target.value})}
                    />
                  </div>
                  <div className="group">
                    <label className="block text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] mb-4 opacity-70">Knowledge Category</label>
                    <select 
                      className="w-full bg-transparent border-b-2 border-[var(--border-soft)] py-4 text-xl font-bold text-[var(--text-primary)] focus:outline-none focus:border-sky-500 transition-all cursor-pointer"
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                    >
                      <option>Career Advice</option>
                      <option>Industrial Trends</option>
                      <option>Interview Tips</option>
                      <option>Soft Skills</option>
                    </select>
                  </div>
                </div>

                <div className="group">
                  <label className="block text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] mb-4 opacity-70">Intelligence Title</label>
                  <input 
                    required
                    className="w-full bg-transparent border-b-2 border-[var(--border-soft)] py-4 text-3xl sm:text-5xl font-black text-[var(--text-primary)] focus:outline-none focus:border-sky-500 transition-all placeholder:text-[var(--text-muted)] tracking-tighter" 
                    placeholder="The Future of Industry 4.0"
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                  />
                </div>

                <div className="group">
                  <label className="block text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] mb-4 opacity-70">Brief Executive Summary</label>
                  <input 
                    required
                    className="w-full bg-transparent border-b-2 border-[var(--border-soft)] py-4 text-lg font-medium text-[var(--text-secondary)] focus:outline-none focus:border-sky-500 transition-all placeholder:text-[var(--text-muted)]" 
                    placeholder="What is the core takeaway of this article?"
                    value={formData.excerpt}
                    onChange={e => setFormData({...formData, excerpt: e.target.value})}
                  />
                </div>

                <div className="group">
                  <label className="block text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] mb-4 opacity-70">Comprehensive Content</label>
                  <textarea 
                    required
                    rows={12}
                    className="w-full bg-[var(--bg-deep)] border border-[var(--border-soft)] rounded-[40px] p-10 text-lg font-medium text-[var(--text-secondary)] focus:outline-none focus:border-sky-500 transition-all placeholder:text-[var(--text-muted)] resize-none leading-relaxed" 
                    placeholder="Deep dive into your professional insights..."
                    value={formData.content}
                    onChange={e => setFormData({...formData, content: e.target.value})}
                  />
                </div>

                <div className="pt-10">
                  <button 
                    type="submit" 
                    className="group relative w-full sm:w-auto bg-[var(--text-primary)] text-[var(--bg-deep)] px-16 py-7 rounded-[30px] text-xs font-black uppercase tracking-[0.4em] hover:bg-sky-500 hover:text-white transition-all shadow-2xl overflow-hidden"
                  >
                    <span className="relative z-10">Transmit for Review</span>
                    <div className="absolute inset-0 bg-white/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-40 text-center bg-[var(--bg-indigo)] rounded-[60px] border border-[var(--border-soft)] shadow-2xl"
            >
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                transition={{ type: "spring", damping: 12 }}
                className="w-32 h-32 rounded-full bg-sky-500/10 flex items-center justify-center mb-12"
              >
                <svg className="w-16 h-16 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <h2 className="text-6xl font-black text-[var(--text-primary)] tracking-tighter mb-6">Transmission Logged.</h2>
              <p className="text-[var(--text-secondary)] text-xl font-medium max-w-md leading-relaxed">
                Your article has been successfully submitted to the **Editorial Review Queue**. 
                It will appear in the Intelligence feed once verified by a TIC Board Member.
              </p>
              <div className="mt-16 flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Redirecting to Archive...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WriteArticle;
