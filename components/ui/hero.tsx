'use client'

import React from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section 
      className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 z-0 bg-grid-pattern opacity-30" />
      
      <motion.div 
        className="absolute -inset-px z-0 pointer-events-none opacity-40"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(37, 99, 235, 0.15),
              transparent 80%
            )
          `
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/50 border border-zinc-800 mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
          <span className="text-xs font-medium text-zinc-400 tracking-wide uppercase">v2.0 Now Available</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-zinc-500">
            Analytics that
          </span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
            actually make sense.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Stop wrestling with complex dashboards. Nexus provides real-time insights, 
          AI-driven predictions, and seamless team collaboration in one fluid interface.
        </motion.p>

        {/* CTAs - UPDATED SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a 
            href="#features" 
            className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            Start Free Trial
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <button 
            onClick={() => alert("This is where you would link to a video modal!")}
            className="w-full sm:w-auto px-8 py-4 bg-zinc-900 border border-zinc-800 text-white font-bold rounded-xl hover:bg-zinc-800 transition-all"
          >
            View Live Demo
          </button>
        </motion.div>
      </div>

      {/* Dashboard Preview */}
      <motion.div 
        initial={{ opacity: 0, y: 100, rotateX: 20 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1, delay: 0.4, type: "spring" }}
        style={{ perspective: '1000px' }}
        className="mt-20 w-full max-w-6xl mx-auto"
      >
        <div className="relative rounded-xl border border-zinc-800 bg-zinc-950/50 shadow-2xl overflow-hidden aspect-[16/9] sm:aspect-[2/1]">
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10" />
          <div className="p-6 grid grid-cols-4 gap-4 h-full opacity-60">
             <div className="col-span-1 bg-zinc-900/50 rounded-lg h-3/4 animate-pulse"></div>
             <div className="col-span-3 grid grid-rows-3 gap-4">
               <div className="bg-zinc-900/50 rounded-lg row-span-2"></div>
               <div className="grid grid-cols-3 gap-4">
                 <div className="bg-zinc-900/50 rounded-lg"></div>
                 <div className="bg-zinc-900/50 rounded-lg"></div>
                 <div className="bg-zinc-900/50 rounded-lg"></div>
               </div>
             </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1/2 flex items-end justify-center pb-10 z-20">
             <p className="text-zinc-500 text-sm font-mono">Simulated Dashboard Environment</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}