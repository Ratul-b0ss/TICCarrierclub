import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PROGRAMS } from '../constants';

const Programs: React.FC = () => {
  return (
    <div className="min-h-screen pt-48 pb-40 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-[10px] font-black text-sky-500 uppercase tracking-[0.5em] mb-8 block">Educational Architecture</span>
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-10 leading-none">
              Specialized <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">Pathways.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
              Curated frameworks designed to accelerate your professional maturity and technical IQ.
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {PROGRAMS.map((program, i) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="group relative p-12 rounded-[40px] bg-slate-900/40 border border-white/5 backdrop-blur-3xl hover:border-sky-500/20 transition-all duration-500 overflow-hidden"
            >
              {/* Card Aura */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-sky-500/5 blur-[60px] rounded-full group-hover:bg-sky-500/10 transition-colors" />
              
              <div className="relative z-10">
                <div className="text-5xl mb-10 filter grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110 origin-left">
                  {program.icon}
                </div>
                
                <div className="inline-block px-3 py-1 rounded-full border border-sky-500/20 bg-sky-500/5 text-[9px] font-black text-sky-400 uppercase tracking-widest mb-6">
                  {program.category}
                </div>
                
                <h3 className="text-3xl font-black text-white mb-6 tracking-tighter leading-tight group-hover:text-sky-400 transition-colors">
                  {program.title}
                </h3>
                
                <p className="text-slate-400 text-base mb-10 font-medium leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                  {program.purpose}
                </p>

                <div className="flex flex-wrap gap-2 mb-12">
                  {program.skills.slice(0, 3).map((skill) => (
                    <span key={skill} className="px-4 py-2 bg-black/40 border border-white/5 rounded-xl text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                      {skill}
                    </span>
                  ))}
                </div>

                <Link 
                  to="/join" 
                  className="inline-flex items-center space-x-4 text-[10px] font-black text-white uppercase tracking-[0.4em] group/btn"
                >
                  <span>Engage Protocol</span>
                  <div className="w-10 h-[1px] bg-white group-hover/btn:w-16 group-hover/btn:bg-sky-500 transition-all duration-500" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Programs;