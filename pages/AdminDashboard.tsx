
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { authService } from '../services/auth';
import { dbService } from '../services/db';
import { AdminTab, Member, Event, BlogPost } from '../types';

const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('Dashboard');
  const [members, setMembers] = useState<Member[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [error, setError] = useState('');

  // Form states for adding data
  const [showEventForm, setShowEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '', description: '', date: '', location: '', speaker: '', category: 'Workshop' as any
  });

  useEffect(() => {
    if (isAuthenticated) {
      setMembers(dbService.getMembers());
      setEvents(dbService.getEvents());
      setBlogs(dbService.getBlogs(true)); // Include pending blogs
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (authService.login(password)) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid security key.');
    }
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const event: Event = {
      ...newEvent,
      id: Math.random().toString(36).substr(2, 9),
      time: 'TBD',
      image: `https://picsum.photos/seed/${Math.random()}/800/600`
    };
    dbService.saveEvent(event);
    setEvents(dbService.getEvents());
    setShowEventForm(false);
    setNewEvent({ title: '', description: '', date: '', location: '', speaker: '', category: 'Workshop' });
  };

  const refreshBlogs = () => setBlogs(dbService.getBlogs(true));

  const handleApproveBlog = (id: string) => {
    dbService.updateBlogStatus(id, 'Approved');
    refreshBlogs();
  };

  const handleRejectBlog = (id: string) => {
    dbService.updateBlogStatus(id, 'Rejected');
    refreshBlogs();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-[var(--bg-deep)]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-[var(--bg-indigo)] p-12 rounded-[3rem] shadow-2xl border border-[var(--border-soft)]"
        >
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-[var(--text-primary)] tracking-tighter uppercase">Board Access</h2>
            <p className="text-[var(--text-secondary)] mt-2 font-medium">Verify credentials to manage the TIC Archive</p>
          </div>
          {error && <div className="mb-6 p-4 bg-red-500/10 text-red-500 text-xs font-black uppercase tracking-widest rounded-xl text-center border border-red-500/20">{error}</div>}
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="password" 
              className="w-full px-6 py-4 bg-[var(--bg-deep)] border border-[var(--border-soft)] rounded-2xl focus:outline-none focus:border-sky-500 transition-all text-lg text-[var(--text-primary)]"
              placeholder="Security Key"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            <button className="w-full bg-[var(--text-primary)] text-[var(--bg-deep)] py-5 rounded-2xl font-black text-xs uppercase tracking-[0.4em] hover:bg-sky-500 hover:text-white transition-all active:scale-95 shadow-lg">
              Unlock Dashboard
            </button>
            <p className="text-center text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Default Key: admin123</p>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-32 sm:py-48 transition-colors duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
        <div>
          <h1 className="text-5xl sm:text-7xl font-black text-[var(--text-primary)] tracking-tighter leading-none mb-4">Command<br /><span className="text-sky-500">Center.</span></h1>
          <p className="text-[var(--text-secondary)] text-xl font-medium tracking-tight">System Status: <span className="text-emerald-500 uppercase font-black tracking-widest text-xs">Operational</span></p>
        </div>
        <button 
          onClick={() => { authService.logout(); setIsAuthenticated(false); }}
          className="bg-[var(--border-soft)] text-[var(--text-primary)] px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-red-500 hover:text-white transition-all"
        >
          Secure Logout
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-16">
        {/* Navigation Sidebar */}
        <div className="w-full lg:w-80 flex flex-col gap-4">
          {['Dashboard', 'Events', 'Blog', 'Members'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as AdminTab)}
              className={`group relative w-full text-left px-10 py-6 rounded-3xl font-black text-xs uppercase tracking-[0.4em] transition-all overflow-hidden ${
                activeTab === tab 
                ? 'bg-[var(--text-primary)] text-[var(--bg-deep)] shadow-2xl translate-x-4' 
                : 'bg-[var(--bg-indigo)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:translate-x-2'
              }`}
            >
              <span className="relative z-10">{tab === 'Blog' ? 'Review Queue' : tab}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Content Panel */}
        <div className="flex-grow bg-[var(--bg-indigo)] border border-[var(--border-soft)] rounded-[60px] p-10 sm:p-16 shadow-2xl min-h-[700px]">
          {activeTab === 'Dashboard' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-3xl font-black text-[var(--text-primary)] mb-12 tracking-tighter uppercase">Intelligence Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {[
                  { label: 'Total Members', count: members.length, color: 'sky' },
                  { label: 'Live Events', count: events.length, color: 'indigo' },
                  { label: 'Review Queue', count: blogs.filter(b => b.status === 'Pending').length, color: 'rose' }
                ].map((stat, i) => (
                  <div key={i} className={`p-10 bg-[var(--bg-deep)] rounded-[40px] border border-[var(--border-soft)] group hover:border-${stat.color}-500 transition-all duration-500`}>
                    <div className="text-[var(--text-muted)] font-black mb-4 uppercase text-[9px] tracking-[0.3em] group-hover:text-sky-500 transition-colors">{stat.label}</div>
                    <div className="text-6xl font-black text-[var(--text-primary)] tracking-tighter">{stat.count}</div>
                  </div>
                ))}
              </div>

              <div className="p-10 bg-[var(--bg-deep)] rounded-[40px] border border-[var(--border-soft)] flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center space-x-6">
                  <div className="h-4 w-4 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.4)]" />
                  <div>
                    <span className="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest block">Core Protocols Loaded</span>
                    <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest">Last transmission processed 12m ago</span>
                  </div>
                </div>
                <div className="h-[1px] w-full sm:w-20 bg-[var(--border-soft)]" />
              </div>
            </motion.div>
          )}

          {activeTab === 'Blog' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="mb-12">
                <h2 className="text-3xl font-black text-[var(--text-primary)] tracking-tighter uppercase mb-4">Editorial Queue</h2>
                <p className="text-[var(--text-secondary)] font-medium">Approve or reject intelligence transmissions before they reach the main network.</p>
              </div>

              <div className="space-y-8">
                {blogs.length === 0 ? (
                  <div className="text-center py-32 text-[var(--text-muted)] font-black uppercase tracking-[0.4em] text-xs opacity-50">Empty Archive.</div>
                ) : (
                  blogs.sort((a,b) => b.status === 'Pending' ? 1 : -1).map(blog => (
                    <div 
                      key={blog.id} 
                      className={`group p-10 bg-[var(--bg-deep)] border rounded-[40px] transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-8 ${
                        blog.status === 'Pending' ? 'border-sky-500/30 ring-4 ring-sky-500/5' : 'border-[var(--border-soft)] opacity-70 grayscale'
                      }`}
                    >
                      <div className="max-w-2xl">
                        <div className="flex items-center space-x-4 mb-4">
                           <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                            blog.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-500' : 
                            blog.status === 'Rejected' ? 'bg-rose-500/10 text-rose-500' : 'bg-sky-500 text-white animate-pulse'
                          }`}>
                            {blog.status}
                          </span>
                          <span className="text-[9px] font-black uppercase text-[var(--text-muted)] tracking-[0.2em]">{blog.category}</span>
                        </div>
                        <h4 className="text-2xl font-black text-[var(--text-primary)] mb-3 tracking-tight leading-tight">{blog.title}</h4>
                        <p className="text-sm text-[var(--text-secondary)] font-medium">By {blog.author} • Submitted {new Date(blog.submittedDate).toLocaleString()}</p>
                      </div>
                      
                      <div className="flex gap-4 w-full md:w-auto">
                        {blog.status === 'Pending' ? (
                          <>
                            <button 
                              onClick={() => handleApproveBlog(blog.id)}
                              className="flex-grow md:flex-none px-8 py-4 bg-emerald-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20"
                            >
                              Approve
                            </button>
                            <button 
                              onClick={() => handleRejectBlog(blog.id)}
                              className="flex-grow md:flex-none px-8 py-4 bg-rose-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-rose-600 transition-all shadow-xl shadow-rose-500/20"
                            >
                              Reject
                            </button>
                          </>
                        ) : (
                          <button 
                            onClick={() => { dbService.deleteBlog(blog.id); refreshBlogs(); }}
                            className="p-4 bg-[var(--border-soft)] text-rose-500 rounded-2xl hover:bg-rose-500 hover:text-white transition-all"
                            title="Purge from Archive"
                          >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'Events' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-16 gap-6">
                <h2 className="text-3xl font-black text-[var(--text-primary)] tracking-tighter uppercase">Manifest Events</h2>
                <button 
                  onClick={() => setShowEventForm(true)}
                  className="bg-[var(--text-primary)] text-[var(--bg-deep)] px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-sky-500 hover:text-white transition-all flex items-center shadow-2xl"
                >
                  <svg className="h-4 w-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                  Generate Summit
                </button>
              </div>

              {showEventForm && (
                <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="mb-20 p-12 bg-[var(--bg-deep)] rounded-[48px] border border-[var(--border-soft)] shadow-2xl">
                  <form onSubmit={handleAddEvent} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="col-span-2">
                      <label className="block text-[10px] font-black uppercase text-[var(--text-muted)] tracking-widest mb-3">Summit Designation</label>
                      <input 
                        className="w-full px-6 py-4 bg-[var(--bg-indigo)] border border-[var(--border-soft)] rounded-2xl text-[var(--text-primary)] focus:outline-none focus:border-sky-500 transition-all font-bold"
                        value={newEvent.title}
                        onChange={e => setNewEvent({...newEvent, title: e.target.value})}
                        required
                        placeholder="Ex: Executive Leadership Summit"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase text-[var(--text-muted)] tracking-widest mb-3">Manifest Date</label>
                      <input 
                        type="date"
                        className="w-full px-6 py-4 bg-[var(--bg-indigo)] border border-[var(--border-soft)] rounded-2xl text-[var(--text-primary)] focus:outline-none focus:border-sky-500 transition-all font-bold"
                        value={newEvent.date}
                        onChange={e => setNewEvent({...newEvent, date: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase text-[var(--text-muted)] tracking-widest mb-3">Category Protocol</label>
                      <select 
                        className="w-full px-6 py-4 bg-[var(--bg-indigo)] border border-[var(--border-soft)] rounded-2xl text-[var(--text-primary)] focus:outline-none focus:border-sky-500 transition-all font-bold"
                        value={newEvent.category}
                        onChange={e => setNewEvent({...newEvent, category: e.target.value as any})}
                      >
                        <option>Workshop</option>
                        <option>Seminar</option>
                        <option>Networking</option>
                        <option>Competition</option>
                      </select>
                    </div>
                    <div className="col-span-2 flex gap-4 pt-6">
                      <button type="submit" className="flex-grow bg-[var(--text-primary)] text-[var(--bg-deep)] py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-sky-500 hover:text-white transition-all">Broadcast Event</button>
                      <button type="button" onClick={() => setShowEventForm(false)} className="px-10 py-5 bg-[var(--border-soft)] text-[var(--text-secondary)] rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all">Abort</button>
                    </div>
                  </form>
                </motion.div>
              )}

              <div className="space-y-6">
                {events.map(event => (
                  <div key={event.id} className="p-8 bg-[var(--bg-deep)] border border-[var(--border-soft)] rounded-[32px] flex justify-between items-center group hover:border-sky-500/30 transition-all duration-500">
                    <div>
                      <h4 className="font-black text-xl text-[var(--text-primary)] mb-2 tracking-tight uppercase">{event.title}</h4>
                      <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">{event.date} • {event.category}</p>
                    </div>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => { dbService.deleteEvent(event.id); setEvents(dbService.getEvents()); }}
                        className="p-4 text-rose-500 bg-rose-500/5 rounded-2xl hover:bg-rose-500 hover:text-white transition-all"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'Members' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-3xl font-black text-[var(--text-primary)] tracking-tighter uppercase mb-12">Registry of Candidates</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-[var(--border-soft)]">
                      <th className="pb-8 font-black text-[10px] uppercase tracking-[0.4em] text-[var(--text-muted)]">Identifier</th>
                      <th className="pb-8 font-black text-[10px] uppercase tracking-[0.4em] text-[var(--text-muted)]">Department</th>
                      <th className="pb-8 font-black text-[10px] uppercase tracking-[0.4em] text-[var(--text-muted)]">Status</th>
                      <th className="pb-8 font-black text-[10px] uppercase tracking-[0.4em] text-[var(--text-muted)] text-right">Protocol</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.length === 0 ? (
                      <tr><td colSpan={4} className="py-32 text-center text-[var(--text-muted)] font-black uppercase tracking-widest text-xs opacity-50">Zero Admissions Found.</td></tr>
                    ) : (
                      members.map(m => (
                        <tr key={m.id} className="border-b border-[var(--border-soft)] group transition-colors hover:bg-[var(--bg-deep)]/50">
                          <td className="py-8">
                            <div className="font-black text-[var(--text-primary)] tracking-tight text-lg">{m.name}</div>
                            <div className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest">{m.email}</div>
                          </td>
                          <td className="py-8 text-[11px] text-[var(--text-secondary)] font-black uppercase tracking-widest">{m.department}</td>
                          <td className="py-8">
                            <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                              m.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-500' : 
                              m.status === 'Rejected' ? 'bg-rose-500/10 text-rose-500' : 'bg-sky-500 text-white'
                            }`}>
                              {m.status}
                            </span>
                          </td>
                          <td className="py-8 text-right">
                            <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={() => { dbService.updateMemberStatus(m.id, 'Approved'); setMembers(dbService.getMembers()); }}
                                className="p-3 bg-emerald-500 text-white rounded-xl hover:shadow-xl shadow-emerald-500/20"
                              >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                              </button>
                              <button 
                                onClick={() => { dbService.updateMemberStatus(m.id, 'Rejected'); setMembers(dbService.getMembers()); }}
                                className="p-3 bg-rose-500 text-white rounded-xl hover:shadow-xl shadow-rose-500/20"
                              >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
