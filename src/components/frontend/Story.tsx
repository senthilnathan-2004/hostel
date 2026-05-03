'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function Story() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get('/api/settings');
        if (res.data) setSettings(res.data);
      } catch (error) {
        console.error('Failed to load story settings');
      }
    };
    fetchSettings();
  }, []);

  const title = settings?.storyTitle || 'Our Story';
  const heading = settings?.storyHeading || 'More Than Just a Place to Sleep';
  const description = settings?.storyDescription || 'HostelConnect was born in 2020 out of a passion for backpacking and a desire to create a sanctuary where comfort meets community.';
  const bullets = settings?.storyBullets?.length > 0 ? settings.storyBullets : [
    'Community-driven events every week',
    'Environmentally conscious operations',
    'Locally sourced food and staff',
    'Safe and inclusive environment for everyone'
  ];

  return (
    <section className="py-24 bg-white dark:bg-black overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <span className="text-primary font-bold uppercase tracking-widest text-sm">{title}</span>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">{heading}</h2>
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {bullets.map((bullet: string, i: number) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="p-1 bg-primary/10 rounded-full text-primary">
                    <CheckCircle2 size={18} />
                  </div>
                  <span className="font-medium">{bullet}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="relative aspect-square w-full max-w-[500px] mx-auto rounded-[3rem] overflow-hidden shadow-2xl rotate-3">
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10" />
              <img 
                src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=1000" 
                alt="Our Community" 
                className="object-cover w-full h-full"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
