'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { BarChart3, Layers } from 'lucide-react';

const Testimonials = () => {
  const logos = [
    { name: "Acme Corp", color: "text-white" },
    { name: "GlobalTech", color: "text-zinc-400" },
    { name: "Nebula", color: "text-blue-400" },
    { name: "Vertex", color: "text-white" },
    { name: "Orbit", color: "text-zinc-400" },
    { name: "FocalPoint", color: "text-white" }
  ];

  return (
    <section className="py-20 border-t border-zinc-900 bg-zinc-950/50 overflow-hidden">
      <div className="text-center mb-10">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">Trusted by innovative teams</h3>
      </div>
      
      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee flex gap-16 whitespace-nowrap py-4">
          {[...logos, ...logos, ...logos].map((logo, idx) => (
            <div key={idx} className={`text-2xl font-bold flex items-center gap-2 ${logo.color} opacity-70 hover:opacity-100 transition-opacity`}>
              <Layers className="w-6 h-6" />
              {logo.name}
            </div>
          ))}
        </div>
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-zinc-950 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-zinc-950 to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error('Failed');
      
      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="lg:col-span-1">
      <h4 className="font-semibold text-white mb-6">Stay Updated</h4>
      <form onSubmit={subscribe} className="flex flex-col gap-3">
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email" 
          disabled={status === 'loading' || status === 'success'}
          className="bg-zinc-900 border border-zinc-800 text-sm p-3 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50"
          required
        />
        <button 
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="bg-blue-600 text-white text-sm font-semibold p-3 rounded-lg hover:bg-blue-500 transition-colors disabled:bg-blue-800"
        >
          {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed!' : 'Subscribe'}
        </button>
        {status === 'error' && <p className="text-red-400 text-xs">Something went wrong. Try again.</p>}
      </form>
    </div>
  );
};

export default function Footer() {
  const columns = [
    {
      title: "Product",
      links: ["Features", "Integrations", "Pricing", "Changelog", "Docs"]
    },
    {
      title: "Company",
      links: ["About Us", "Careers", "Blog", "Contact", "Partners"]
    },
    {
      title: "Resources",
      links: ["Community", "Help Center", "Status", "Terms of Service"]
    }
  ];

  return (
    <>
      <Testimonials />
      <footer className="bg-zinc-950 pt-20 pb-10 px-6 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          
          <div className="lg:col-span-2 pr-8">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span>Nexus</span>
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed mb-6">
              Empowering data-driven teams to build better products. 
              Designed in California, available worldwide.
            </p>
          </div>

          {columns.map((col, i) => (
            <div key={i} className="lg:col-span-1">
              <h4 className="font-semibold text-white mb-6">{col.title}</h4>
              <ul className="space-y-4">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-sm text-zinc-500 hover:text-blue-400 transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <NewsletterForm />
        </div>

        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-600">
            © 2024 Nexus Analytics Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-zinc-600 hover:text-zinc-400">Privacy Policy</Link>
            <Link href="#" className="text-xs text-zinc-600 hover:text-zinc-400">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </>
  );
}