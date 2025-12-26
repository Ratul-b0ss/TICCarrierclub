import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../App';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2.5 md:p-3 rounded-xl bg-white/5 border border-[var(--border-soft)] hover:border-sky-500/30 transition-all active:scale-90 overflow-hidden group"
      aria-label="Toggle Theme"
    >
      <motion.div
        initial={false}
        animate={{ y: isDark ? 0 : 40, opacity: isDark ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-center"
      >
        <svg className="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
        </svg>
      </motion.div>
      <motion.div
        initial={false}
        animate={{ y: isDark ? -40 : 0, opacity: isDark ? 0 : 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      </motion.div>
    </button>
  );
};

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDark } = useTheme();
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Events', path: '/events' },
    { name: 'Insights', path: '/blog' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-1000 ${
      isScrolled ? 'py-4' : 'py-6 md:py-10'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link 
          to="/" 
          onClick={() => setIsMobileMenuOpen(false)}
          className="text-lg md:text-xl font-black tracking-tighter text-[var(--text-primary)] group flex items-center whitespace-nowrap z-[110]"
        >
          TIC <span className="text-sky-500 ml-2 group-hover:animate-pulse">Carrier Club</span>
        </Link>

        {/* Desktop Navigation */}
        <div className={`hidden lg:flex items-center space-x-1 p-1 rounded-2xl border transition-all duration-700 ${
          isScrolled ? 'glass shadow-2xl' : 'bg-transparent border-transparent'
        }`}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.25em] transition-all overflow-hidden ${
                location.pathname === link.path 
                ? 'text-[var(--text-primary)]' 
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <span className="relative z-10">{link.name}</span>
              {location.pathname === link.path && (
                <motion.div 
                  layoutId="activeNav"
                  className="absolute inset-0 bg-sky-500/10 rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-3 md:space-x-4 z-[110]">
          <ThemeToggle />
          
          <Link to="/join" className="hidden sm:block px-6 md:px-8 py-3 md:py-3.5 rounded-xl bg-sky-500 text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] hover:bg-sky-400 transition-all active:scale-95">
            Join Protocol
          </Link>

          <button 
            className="lg:hidden p-2.5 md:p-3 bg-white/5 rounded-xl border border-[var(--border-soft)] active:scale-90 transition-transform"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <div className={`w-5 h-0.5 bg-[var(--text-primary)] transition-all duration-500 ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : 'mb-1.5'}`} />
            <div className={`w-5 h-0.5 bg-[var(--text-primary)] transition-all duration-500 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 w-full h-screen bg-[var(--bg-deep)]/95 backdrop-blur-2xl flex flex-col items-center justify-center space-y-8 lg:hidden z-[105]"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                <Link 
                  to={link.path} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-4xl sm:text-5xl font-black tracking-tighter transition-colors ${
                    location.pathname === link.path ? 'text-sky-500' : 'text-[var(--text-primary)] hover:text-sky-500'
                  }`}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;