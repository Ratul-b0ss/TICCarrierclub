import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../App';

const FeatureCard = ({ title, desc, index }: { title: string; desc: string; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group relative p-8 md:p-10 bg-[var(--card-bg)] border border-[var(--border-soft)] rounded-[32px] md:rounded-[40px] overflow-hidden hover:border-sky-500/30 transition-all duration-500 backdrop-blur-md"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative z-10">
        <div className="text-[10px] font-black text-sky-500 uppercase tracking-[0.4em] mb-6 md:mb-8">Protocol 0{index + 1}</div>
        <h3 className="text-2xl md:text-3xl font-black text-[var(--text-primary)] mb-4 md:mb-6 tracking-tight">{title}</h3>
        <p className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed font-medium">{desc}</p>
      </div>
    </motion.div>
  );
};

const MetricCounter = ({ value, label }: { value: number; label: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center p-4">
      <div className="text-4xl md:text-7xl font-[900] text-[var(--text-primary)] tracking-tighter mb-2 md:mb-4">{count}+</div>
      <div className="text-[8px] md:text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.3em] md:tracking-[0.5em] opacity-50">{label}</div>
    </div>
  );
};

const Home: React.FC = () => {
  const { isDark } = useTheme();
  
  const wordVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9, 
      filter: 'blur(30px)',
      y: 40
    },
    visible: (i: number) => ({
      opacity: 1, 
      scale: 1, 
      filter: 'blur(0px)',
      y: 0,
      transition: { 
        duration: 1.4, 
        delay: i * 0.4, 
        ease: [0.16, 1, 0.3, 1] 
      }
    })
  };

  return (
    <div className="relative min-h-screen bg-transparent">
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center z-20 overflow-hidden">
        <div className="max-w-7xl w-full">
          <h1 className="select-none flex flex-col items-center gap-2 md:gap-4 cursor-default">
            <motion.div className="overflow-hidden">
              <motion.span 
                custom={0}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className="text-6xl sm:text-8xl md:text-9xl lg:text-[10vw] font-[900] tracking-[0.05em] leading-[0.85] uppercase tic-hero-gradient block"
              >
                TIC
              </motion.span>
            </motion.div>

            <motion.div className="overflow-hidden">
              <motion.span 
                custom={1}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className="text-3xl sm:text-5xl md:text-6xl lg:text-[6vw] font-[800] tracking-[-0.05em] leading-[1.1] text-[var(--text-primary)] block transition-colors duration-1000"
              >
                Carrier Club<span className="text-sky-500 animate-pulse ml-1 md:ml-2">.</span>
              </motion.span>
            </motion.div>
          </h1>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 1, ease: "easeOut" }}
            className="mt-12 md:mt-24 flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-12"
          >
            <Link to="/join" className="group relative w-full sm:w-auto px-10 md:px-14 py-5 md:py-7 rounded-xl md:rounded-2xl text-[10px] md:text-[11px] font-[900] uppercase tracking-[0.4em] overflow-hidden transition-all duration-700 bg-sky-500 text-white shadow-[0_0_60px_-15px_rgba(14,165,233,0.5)] hover:shadow-sky-500/60 hover:scale-[1.02] active:scale-95 text-center">
              <span className="relative z-20">Initiate Protocol</span>
              <div className="absolute inset-0 bg-sky-400 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-700 ease-[0.16, 1, 0.3, 1] z-10" />
            </Link>

            <Link to="/about" className="group relative w-full sm:w-auto px-10 md:px-14 py-5 md:py-7 border border-[var(--border-soft)] text-[var(--text-primary)] rounded-xl md:rounded-2xl text-[10px] md:text-[11px] font-[900] uppercase tracking-[0.4em] hover:bg-sky-500/5 hover:border-sky-500/40 transition-all duration-700 overflow-hidden text-center">
              <span className="relative z-10">The Mission</span>
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 3, duration: 2 }}
          className="absolute bottom-8 hidden sm:flex flex-col items-center"
        >
          <div className="w-[1px] h-12 md:h-20 bg-gradient-to-b from-sky-500 to-transparent" />
        </motion.div>
      </section>

      {/* Content layers */}
      <div className="relative z-20">
        {/* Stats Board */}
        <section className="py-24 md:py-48 border-y border-[var(--border-soft)] backdrop-blur-md bg-transparent relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sky-500/[0.02] to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-20">
            <MetricCounter value={2500} label="Active Members" />
            <MetricCounter value={45} label="Global Partners" />
            <MetricCounter value={120} label="Annual Summits" />
            <MetricCounter value={98} label="Success Quotient" />
          </div>
        </section>

        {/* Feature Grid */}
        <section className="py-32 md:py-60 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20 md:mb-40 text-center md:text-left">
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-[9px] md:text-[11px] font-black text-sky-500 uppercase tracking-[0.5em] md:tracking-[1em] mb-6 md:mb-10"
              >
                System Architecture
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-7xl lg:text-8xl font-black text-[var(--text-primary)] tracking-tighter leading-[1.1] md:leading-[0.9] transition-colors duration-1000"
              >
                Foundations of <br className="hidden md:block" /><span className="opacity-40 italic font-medium">unparalleled excellence.</span>
              </motion.p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
              <FeatureCard index={0} title="Career Pathways" desc="Curated tracks aligning your skills with global industrial benchmarks." />
              <FeatureCard index={1} title="Intelligence Feed" desc="Real-time industry insights decoded from current MNC leadership." />
              <FeatureCard index={2} title="Leadership Vault" desc="Exclusive bootcamps and executive-level mentorship sessions." />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;