import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[var(--border-soft)] bg-transparent py-32 px-10 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-24">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-black tracking-tighter text-[var(--text-primary)]">
              TIC<span className="opacity-20 ml-1">CARRIER</span>
            </Link>
            <p className="mt-8 text-[var(--text-secondary)] text-sm leading-relaxed font-medium">
              A premium institute engineered for the next era of industrial leadership in Bangladesh. We weave technical excellence with corporate ambition.
            </p>
          </div>
          
          <div>
            <h4 className="text-[10px] font-bold text-[var(--text-primary)] uppercase tracking-[0.3em] mb-10 opacity-50">Navigation</h4>
            <ul className="space-y-6">
              <li><Link to="/" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">About</Link></li>
              <li><Link to="/programs" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Programs</Link></li>
              <li><Link to="/events" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Events</Link></li>
              <li><Link to="/blog" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Insights</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold text-[var(--text-primary)] uppercase tracking-[0.3em] mb-10 opacity-50">Protocol</h4>
            <ul className="space-y-6 text-sm font-medium text-[var(--text-secondary)]">
              <li>Dhaka, Bangladesh</li>
              <li>hq@ticcarrier.pro</li>
              <li>+880 2 999 000</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold text-[var(--text-primary)] uppercase tracking-[0.3em] mb-10 opacity-50">Newsletter</h4>
            <form className="mt-2 group">
              <input 
                type="email" 
                placeholder="Institutional Email" 
                className="w-full px-6 py-4 bg-[var(--card-bg)] border border-[var(--border-soft)] rounded-2xl focus:outline-none focus:border-sky-400/50 text-sm font-medium text-[var(--text-primary)] transition-all"
              />
              <button className="mt-4 w-full bg-sky-500 text-white py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-sky-400 transition-all">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-32 pt-12 border-t border-[var(--border-soft)] flex flex-col md:flex-row justify-between items-center text-[9px] font-bold uppercase tracking-[0.4em] text-[var(--text-muted)]">
          <span>copyright 2025 Ratul</span>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <Link to="/admin" className="opacity-10 hover:opacity-100 transition-opacity cursor-pointer">Board Access</Link>
            <span className="opacity-40 hover:opacity-100 transition-opacity cursor-pointer">Privacy</span>
            <span className="opacity-40 hover:opacity-100 transition-opacity cursor-pointer">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;