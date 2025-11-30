'use client'

import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { LineChart, Globe2, Users2, Zap, ShieldCheck, LucideIcon } from 'lucide-react';

// --- 3D TILT CARD COMPONENT ---
interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  children?: React.ReactNode;
  delay: number;
}

const FeatureCard = ({ title, description, icon: Icon, className, children, delay }: FeatureCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 20 });

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = (e.clientX - rect.left) * 32.5;
    const mouseY = (e.clientY - rect.top) * 32.5;
    const rX = (mouseY / height - 32.5 / 2) * -1;
    const rY = mouseX / width - 32.5 / 2;
    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: delay }}
      style={{ transformStyle: "preserve-3d", transform }}
      className={`relative group overflow-hidden rounded-3xl bg-zinc-900/40 border border-zinc-800 p-8 transition-colors duration-300 hover:bg-zinc-900/60 ${className}`}
    >
      <div style={{ transform: "translateZ(50px)" }} className="relative z-10 flex flex-col h-full">
        <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-800/50 border border-zinc-700 text-white shadow-lg">
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-zinc-400 text-sm leading-relaxed mb-6">{description}</p>
        <div className="mt-auto pt-4 border-t border-zinc-800/50">
          {children}
        </div>
      </div>
      
      {/* Glossy Reflection Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
};

export default function BentoGrid() {
  return (
    <section id="features" className="py-32 px-6 max-w-7xl mx-auto perspective-1000">
      <div className="text-center mb-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
          Engineered for <span className="text-blue-500">Scale</span>
        </h2>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          We rebuilt the analytics stack from the ground up using edge computing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)]">
        
        {/* Card 1: Real-time (Span 2) */}
        <FeatureCard 
          title="Sub-ms Latency" 
          description="Data streams faster than human perception. Powered by Rust."
          icon={Zap}
          className="md:col-span-2"
          delay={0.1}
        >
          <div className="flex items-end gap-1 h-24 mt-2">
             {[40, 70, 45, 90, 65, 80, 50, 95, 75, 60, 85, 90, 40, 70, 45].map((h, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: "10%" }}
                  animate={{ height: [`${h}%`, `${h/2}%`, `${h}%`] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                  className="flex-1 bg-blue-500/80 rounded-t-sm"
                />
              ))}
          </div>
        </FeatureCard>

        {/* Card 2: Security */}
        <FeatureCard 
          title="Bank-Grade Security" 
          description="End-to-end encryption with rotating keys."
          icon={ShieldCheck}
          className="md:col-span-1"
          delay={0.2}
        >
           <div className="flex items-center justify-center h-full">
             <ShieldCheck className="w-24 h-24 text-zinc-800 group-hover:text-blue-500/20 transition-colors duration-500" />
           </div>
        </FeatureCard>

        {/* Card 3: Global */}
        <FeatureCard 
          title="Global Edge" 
          description="35+ Regions. We route traffic to the nearest node automatically."
          icon={Globe2}
          className="md:col-span-1"
          delay={0.3}
        >
          <div className="relative w-full h-24 bg-zinc-950/50 rounded-lg border border-zinc-800 overflow-hidden">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-blue-500/30 rounded-full animate-[spin_10s_linear_infinite]" />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-blue-500/50 rounded-full animate-[spin_5s_linear_infinite_reverse]" />
          </div>
        </FeatureCard>

        {/* Card 4: API (Span 2) */}
        <FeatureCard 
          title="GraphQL API" 
          description="Type-safe SDKs for TypeScript, Python, and Go."
          icon={LineChart}
          className="md:col-span-2"
          delay={0.4}
        >
           <div className="p-3 rounded-lg bg-zinc-950/80 border border-zinc-800 font-mono text-xs text-blue-300">
             <p><span className="text-purple-400">await</span> analytics.<span className="text-yellow-300">track</span>({`{`}</p>
             <p className="pl-4">event: <span className="text-green-400">"purchase"</span>,</p>
             <p className="pl-4">revenue: <span className="text-orange-400">99.00</span></p>
             <p>{`}`});</p>
           </div>
        </FeatureCard>
      </div>
    </section>
  );
}