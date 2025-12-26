import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: { 
        duration: 1.2, 
        delay: i * 0.15,
        ease: [0.16, 1, 0.3, 1] 
      }
    })
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const principles = [
    { title: 'Tension', desc: 'Growth occurs at the intersection of challenge and high capability.' },
    { title: 'Alignment', desc: 'Syncing student ambition with global industrial benchmarks.' },
    { title: 'Precision', desc: 'Executing with corporate rigor in every workshop and summit.' }
  ];

  return (
    <div className="bg-transparent transition-colors duration-500">
      <section className="pt-40 md:pt-64 pb-20 md:pb-32 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" animate="visible" className="max-w-4xl">
            <motion.h1 
              custom={0}
              variants={fadeInUp}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-[8vw] font-black tracking-tighter text-[var(--text-primary)] leading-[1] md:leading-[0.85] mb-8 md:mb-12"
            >
              About.<br />
              <span className="text-sky-500">TIC Carrier Club.</span>
            </motion.h1>
            
            <motion.p 
              custom={1}
              variants={fadeInUp}
              className="text-lg md:text-2xl text-[var(--text-secondary)] font-medium leading-relaxed max-w-2xl"
            >
              Where skills meet opportunity. We curate the professional trajectory of the next generation of industrial leaders.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-40 px-6 sm:px-10 border-t border-[var(--border-soft)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-sky-500 mb-6 md:mb-10">The Narrative</h2>
            <p className="text-xl md:text-2xl text-[var(--text-primary)] opacity-80 leading-relaxed font-medium mb-6 md:mb-8">
              Established in 2018, TIC Carrier Club was engineered to resolve the widening gap between technical education and industrial mastery.
            </p>
            <p className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed font-medium">
              We treat careers as complex textiles—woven from threads of curiosity, mentorship, and high-stakes exposure.
            </p>
          </motion.div>
          <div className="aspect-square rounded-[40px] md:rounded-[60px] overflow-hidden bg-[var(--border-soft)] border border-[var(--border-soft)] relative">
            <motion.div 
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
              transition={{ duration: 20, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-transparent opacity-50"
            />
          </div>
        </div>
      </section>

      <section className="py-20 md:py-40 px-6 sm:px-10 bg-[var(--border-soft)]/10">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {principles.map((p, i) => (
              <motion.div 
                key={i}
                variants={fadeInUp}
                className="p-8 md:p-12 rounded-[32px] md:rounded-[40px] bg-[var(--card-bg)] border border-[var(--border-soft)] backdrop-blur-xl group transition-all duration-500"
              >
                <div className="w-10 md:w-12 h-[1px] bg-sky-500 mb-8 md:mb-10 group-hover:w-20 transition-all duration-700" />
                <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-4 md:mb-6">{p.title}</h3>
                <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed font-medium">{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;