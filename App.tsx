import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Events from './pages/Events';
import Blog from './pages/Blog';
import Join from './pages/Join';
import WriteArticle from './pages/WriteArticle';
import AdminDashboard from './pages/AdminDashboard';

const ThemeContext = createContext({ isDark: true, toggleTheme: () => {} });
export const useTheme = () => useContext(ThemeContext);

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/programs" element={<PageWrapper><Programs /></PageWrapper>} />
        <Route path="/events" element={<PageWrapper><Events /></PageWrapper>} />
        <Route path="/blog" element={<PageWrapper><Blog /></PageWrapper>} />
        <Route path="/write-article" element={<PageWrapper><WriteArticle /></PageWrapper>} />
        <Route path="/join" element={<PageWrapper><Join /></PageWrapper>} />
        <Route path="/admin" element={<PageWrapper><AdminDashboard /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <Router>
        <div className="flex flex-col min-h-screen selection:bg-sky-500/30 selection:text-white bg-transparent transition-colors duration-1000">
          <Navbar />
          <main className="flex-grow overflow-x-hidden">
            <AnimatedRoutes />
          </main>
          <Footer />
          <ScrollToTop />
        </div>
      </Router>
    </ThemeContext.Provider>
  );
};

export default App;