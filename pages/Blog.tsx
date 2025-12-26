import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getCareerAdvice } from '../services/ai';
import { dbService } from '../services/db';
import { BlogPost } from '../types';

const Blog: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [query, setQuery] = useState('');
  const [advice, setAdvice] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setBlogs(dbService.getBlogs());
  }, []);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsLoading(true);
    const res = await getCareerAdvice(query);
    setAdvice(res);
    setIsLoading(false);
  };

  return (
    <div className="pt-48 pb-40 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-32 text-center md:text-left">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black text-[var(--text-primary)] tracking-tighter mb-8"
          >
            Intelligence Feed<span className="text-sky-500">.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-2xl font-medium leading-relaxed"
          >
            Decoding the industrial matrix. Expert insights for the modern leader.
          </motion.p>
        </header>

        {/* AI Career Assistant - Command Center Style */}
        <section className="mb-40">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative p-12 md:p-16 rounded-[40px] bg-[var(--card-bg)] border border-[var(--border-soft)] backdrop-blur-3xl overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 blur-[80px] rounded-full group-hover:bg-sky-500/10 transition-colors" />
            
            <h2 className="text-[10px] font-black text-sky-400 uppercase tracking-[0.5em] mb-12">Oracle Interface</h2>
            
            <form onSubmit={handleAsk} className="relative z-10">
              <div className="flex flex-col md:flex-row gap-6">
                <input
                  className="flex-grow p-6 bg-[var(--bg-indigo)] rounded-2xl border border-[var(--border-soft)] focus:outline-none focus:border-sky-500 text-xl text-[var(--text-primary)] font-medium transition-all placeholder:text-[var(--text-muted)] shadow-inner"
                  placeholder="Ask the Institutional Mentor..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button
                  disabled={isLoading}
                  className="px-12 py-6 bg-[var(--text-primary)] text-[var(--bg-deep)] rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] transition-all hover:bg-sky-500 hover:text-white disabled:opacity-50"
                >
                  {isLoading ? 'Decrypting...' : 'Query Protocol'}
                </button>
              </div>
            </form>

            <AnimatePresence>
              {advice && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-12 p-8 bg-sky-500/5 border border-sky-500/20 rounded-2xl overflow-hidden"
                >
                  <div className="flex items-start space-x-6">
                    <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center flex-shrink-0 text-xs font-black text-white">TIC</div>
                    <div className="text-[var(--text-secondary)] text-lg leading-relaxed font-medium italic">
                      {advice}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {blogs.map((blog, i) => (
            <motion.article 
              key={blog.id} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer flex flex-col h-full"
            >
              <div className="aspect-[16/10] bg-[var(--bg-indigo)] rounded-[32px] overflow-hidden mb-8 relative border border-[var(--border-soft)]">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
              </div>
              
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-[10px] font-black text-sky-500 uppercase tracking-[0.3em]">{blog.category}</span>
                <span className="h-[1px] w-8 bg-[var(--border-soft)]" />
                <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em]">{blog.date}</span>
              </div>
              
              <h3 className="text-2xl font-black text-[var(--text-primary)] mb-4 tracking-tighter leading-tight group-hover:text-sky-400 transition-colors">
                {blog.title}
              </h3>
              <p className="text-[var(--text-secondary)] text-base mb-8 line-clamp-3 font-medium flex-grow">
                {blog.excerpt}
              </p>
              
              <div className="pt-6 border-t border-[var(--border-soft)] flex items-center justify-between">
                <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em]">By {blog.author}</span>
                <div className="w-8 h-8 rounded-full border border-[var(--border-soft)] flex items-center justify-center group-hover:border-sky-500/50 transition-colors">
                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-[var(--text-muted)] group-hover:text-sky-500"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-40 text-center">
          <Link 
            to="/write-article" 
            className="group inline-flex flex-col items-center"
          >
            <div className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.5em] mb-6">Contribute Intelligence</div>
            <div className="px-12 py-6 border border-[var(--border-soft)] text-[var(--text-primary)] rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] hover:bg-[var(--text-primary)] hover:text-[var(--bg-deep)] transition-all">
              Initiate Drafting Protocol
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Blog;