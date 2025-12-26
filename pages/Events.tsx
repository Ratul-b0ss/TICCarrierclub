import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { dbService } from '../services/db';
import { Event } from '../types';

const EventPanel: React.FC<{ event: Event; index: number; total: number }> = ({ event, index, total }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div ref={containerRef} className="relative w-full h-auto min-h-screen flex items-center justify-center sticky top-0 py-10 md:py-0" style={{ zIndex: index }}>
      <motion.div 
        style={{ scale, opacity, y }} 
        className="relative w-full max-w-7xl min-h-[70vh] md:h-[80vh] bg-[var(--card-bg)] backdrop-blur-3xl border border-[var(--border-soft)] rounded-[32px] md:rounded-[48px] overflow-hidden group shadow-2xl mx-4 sm:mx-6"
      >
        <div className="flex h-full flex-col md:flex-row">
          {/* Image Section */}
          <div className="w-full md:w-1/2 h-48 sm:h-64 md:h-full relative overflow-hidden">
            <img 
              src={event.image} 
              className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" 
              alt={event.title} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4 md:bottom-12 md:left-12">
              <span className="text-6xl md:text-[14rem] font-black text-white opacity-[0.05] leading-none tracking-tighter select-none">
                0{index + 1}
              </span>
            </div>
          </div>
          
          {/* Content Section */}
          <div className="w-full md:w-1/2 p-8 md:p-24 flex flex-col justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center space-x-4 md:space-x-6 mb-6 md:mb-12">
                <div className="w-8 md:w-12 h-[1px] bg-sky-500" />
                <span className="text-[8px] md:text-[10px] font-black text-sky-500 tracking-[0.4em] md:tracking-[0.5em] uppercase">{event.category}</span>
              </div>
              
              <h3 className="text-4xl md:text-5xl lg:text-7xl font-black text-[var(--text-primary)] mb-6 md:mb-10 tracking-tighter leading-[1.1] md:leading-[0.9] group-hover:text-sky-400 transition-colors">
                {event.title}
              </h3>
              
              <p className="text-[var(--text-secondary)] text-base md:text-xl font-medium leading-relaxed max-w-lg opacity-80">
                {event.description}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-8 md:gap-12 items-start sm:items-center mt-auto">
              <motion.button 
                whileHover={{ scale: 1.05, x: 10 }} 
                className="w-full sm:w-auto px-10 py-5 bg-[var(--text-primary)] text-[var(--bg-deep)] rounded-xl text-[10px] font-black uppercase tracking-[0.4em] transition-all hover:bg-sky-500 hover:text-white"
              >
                Reserve Access
              </motion.button>
              
              <div className="flex flex-col">
                <span className="text-[8px] md:text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-1">Date Protocol</span>
                <span className="text-base md:text-lg font-black text-[var(--text-primary)] tracking-tight">{event.date}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Events: React.FC = () => {
  const events = dbService.getEvents();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });

  return (
    <div className="min-h-screen bg-transparent transition-colors duration-500">
      {/* Scroll Progress Indicator - Desktop Only */}
      <div className="fixed right-12 top-1/2 -translate-y-1/2 z-[100] hidden xl:flex flex-col items-center space-y-8">
        <div className="text-[10px] font-black text-[var(--text-muted)] rotate-90 opacity-20 tracking-[0.5em] uppercase mb-12">Summits Archive</div>
        <div className="w-[1px] h-64 bg-[var(--border-soft)] relative">
          <motion.div style={{ scaleY: smoothProgress, originY: 0 }} className="absolute inset-0 bg-sky-500" />
        </div>
        <div className="text-[10px] font-black text-sky-500">0{events.length}</div>
      </div>

      <header className="max-w-7xl mx-auto pt-48 md:pt-52 pb-24 md:pb-32 px-6 sm:px-12 text-center md:text-left">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-[var(--text-primary)] tracking-tighter mb-10 md:mb-16 leading-[1.1] md:leading-[0.8] select-none"
        >
          Executive<br className="hidden md:block" /><span className="text-sky-500">Summits.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-2xl text-[var(--text-secondary)] max-w-2xl font-medium leading-relaxed"
        >
          High-stakes gathering where industrial theory transforms into corporate leadership.
        </motion.p>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-12 pb-[30vh] md:pb-[50vh]">
        {events.length === 0 ? (
          <div className="py-20 md:py-40 text-center text-[var(--text-muted)] text-[10px] font-black uppercase tracking-[1em]">Summits Protocol Empty</div>
        ) : (
          events.map((event, i) => (
            <EventPanel key={event.id} event={event} index={i} total={events.length} />
          ))
        )}
      </div>
    </div>
  );
};

export default Events;