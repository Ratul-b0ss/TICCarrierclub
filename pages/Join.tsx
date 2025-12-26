import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { dbService } from '../services/db';
import { Member } from '../types';

const Join: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '', department: '', year: 'First Year', email: '', phone: '', motivation: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || formData.motivation.length < 50) {
      setError('A comprehensive motivation is required (min 50 chars).');
      return;
    }
    const newMember: Member = {
      ...formData, id: Math.random().toString(36).substr(2, 9), status: 'Pending', appliedDate: new Date().toISOString()
    };
    dbService.addMember(newMember);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-40 text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[var(--bg-indigo)] border border-[var(--border-soft)] p-20 rounded-[50px] shadow-2xl">
          <h2 className="text-5xl font-black text-[var(--text-primary)] mb-6 tracking-tighter">Application Logged.</h2>
          <button onClick={() => window.location.href = '#/'} className="bg-[var(--text-primary)] text-[var(--bg-deep)] px-12 py-5 rounded-[20px] font-black hover:opacity-90 transition-all">Back to Home</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-28 lg:py-40 transition-colors duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
        <div>
          <h1 className="text-7xl font-black text-[var(--text-primary)] mb-10 tracking-tighter leading-[0.9]">Member.<br /><span className="text-sky-500">Exclusive.</span></h1>
          <p className="text-xl text-[var(--text-secondary)] mb-16 font-medium leading-relaxed">We aren't just a club—we're an accelerator for industrial titans.</p>
          <div className="flex flex-col space-y-4 opacity-50">
             <div className="flex items-center space-x-3">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-primary)]">Priority Access</span>
             </div>
             <div className="flex items-center space-x-3">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-primary)]">Industrial Mentorship</span>
             </div>
          </div>
        </div>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="bg-[var(--card-bg)] border border-[var(--border-soft)] p-12 lg:p-16 rounded-[60px] shadow-2xl shadow-sky-900/5 backdrop-blur-3xl">
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="group">
              <label className="block text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] mb-3 opacity-70">Full Name</label>
              <input 
                type="text" 
                className="w-full px-6 py-4 bg-[var(--bg-indigo)] border border-[var(--border-soft)] rounded-[20px] text-[var(--text-primary)] focus:outline-none focus:border-sky-500 transition-all font-medium placeholder:text-[var(--text-muted)]" 
                placeholder="Ex: Tanvir Ahmed"
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
               <div className="group">
                 <label className="block text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] mb-3 opacity-70">Email Address</label>
                 <input 
                   type="email" 
                   className="w-full px-6 py-4 bg-[var(--bg-indigo)] border border-[var(--border-soft)] rounded-[20px] text-[var(--text-primary)] focus:outline-none focus:border-sky-500 transition-all font-medium placeholder:text-[var(--text-muted)]" 
                   placeholder="university.edu.bd"
                   value={formData.email} 
                   onChange={(e) => setFormData({...formData, email: e.target.value})} 
                 />
               </div>
               <div className="group">
                 <label className="block text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] mb-3 opacity-70">Department</label>
                 <input 
                   type="text" 
                   className="w-full px-6 py-4 bg-[var(--bg-indigo)] border border-[var(--border-soft)] rounded-[20px] text-[var(--text-primary)] focus:outline-none focus:border-sky-500 transition-all font-medium placeholder:text-[var(--text-muted)]" 
                   placeholder="e.g. CSE, Textile"
                   value={formData.department} 
                   onChange={(e) => setFormData({...formData, department: e.target.value})} 
                 />
               </div>
            </div>

            <div className="group">
              <label className="block text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] mb-3 opacity-70">Manifesto / Motivation</label>
              <textarea 
                className="w-full px-6 py-5 bg-[var(--bg-indigo)] border border-[var(--border-soft)] rounded-[24px] text-[var(--text-primary)] focus:outline-none focus:border-sky-500 min-h-[180px] font-medium resize-none placeholder:text-[var(--text-muted)]" 
                value={formData.motivation} 
                onChange={(e) => setFormData({...formData, motivation: e.target.value})} 
                placeholder="Why are you a fit for the TIC Protocol? (Min 50 characters)"
              ></textarea>
            </div>
            
            {error && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-red-500 text-[10px] font-black uppercase tracking-widest bg-red-500/5 p-4 rounded-xl border border-red-500/20">
                Error: {error}
              </motion.div>
            )}
            
            <button 
              type="submit" 
              className="group relative w-full bg-[var(--text-primary)] text-[var(--bg-deep)] py-6 rounded-[24px] text-xs font-black uppercase tracking-[0.4em] hover:bg-sky-500 hover:text-white transition-all duration-500 shadow-2xl overflow-hidden"
            >
              <span className="relative z-10">Transmit Application</span>
              <div className="absolute inset-0 bg-white/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Join;