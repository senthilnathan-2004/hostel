"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Calendar, Search, Users, ShieldCheck, Zap, Star } from 'lucide-react';
import axios from 'axios';

export default function Hero() {
  const [settings, setSettings] = useState({
    heroTitle: 'Premium Budget Living for Modern Travelers',
    heroSubtitle: 'Discover high-end hostel comfort in the heart of the city. Join a vibrant community of travelers and digital nomads.',
    offerText: '#1 Rated Premium Stay'
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get('/api/settings');
        if (res.data) {
          setSettings({
            heroTitle: res.data.heroTitle || settings.heroTitle,
            heroSubtitle: res.data.heroSubtitle || settings.heroSubtitle,
            offerText: res.data.offerText || settings.offerText
          });
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };
    fetchSettings();
  }, []);

  return (
    <section className="relative min-h-[90svh] md:min-h-[98svh] flex items-center justify-center overflow-hidden">
      {/* Background with Professional Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.png"
          alt="Luxury Hostel Experience"
          fill
          priority
          className="object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-6 z-10 relative mt-10">
        <div className="max-w-4xl space-y-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            {/* Real World Trust Badge */}
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full shadow-2xl">
              <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-black bg-gray-600 overflow-hidden">
                    <div className="w-full h-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-white">U</div>
                  </div>
                ))}
              </div>
              <span className="text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                 {settings.offerText} <span className="text-primary font-bold">★ 4.9</span>
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tighter">
              {settings.heroTitle.split(' ').map((word, i) => (
                <span key={i} className="inline-block mr-4">
                  {['Premium', 'Modern', 'Star', 'Urban', 'Heart', 'Mens', 'PG'].includes(word) ? (
                    <span className="text-primary italic underline decoration-primary underline-offset-[12px] decoration-4">{word}</span>
                  ) : (
                    word
                  )}
                </span>
              ))}
            </h1>

            <p className="text-lg md:text-2xl text-gray-200/80 max-w-2xl font-medium leading-relaxed">
              {settings.heroSubtitle}
            </p>
          </motion.div>

          {/* Real World Floating Search/Booking Bar */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-3xl"
          >
            <div className="bg-white p-3 md:p-4 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col md:flex-row items-center gap-2">
              <div className="flex-1 w-full grid grid-cols-2 md:grid-cols-3 gap-2">
                 <div className="flex items-center gap-3 px-6 py-4 hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer group">
                    <Calendar className="text-primary w-5 h-5" />
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase text-gray-400">Check-in</span>
                        <span className="text-sm font-bold text-gray-800">Add date</span>
                    </div>
                 </div>
                 <div className="flex items-center gap-3 px-6 py-4 hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer group">
                    <Calendar className="text-primary w-5 h-5" />
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase text-gray-400">Check-out</span>
                        <span className="text-sm font-bold text-gray-800">Add date</span>
                    </div>
                 </div>
                 <div className="hidden md:flex items-center gap-3 px-6 py-4 hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer group">
                    <Users className="text-primary w-5 h-5" />
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase text-gray-400">Guests</span>
                        <span className="text-sm font-bold text-gray-800">1 Guest</span>
                    </div>
                 </div>
              </div>
              <Link href="/rooms" className="w-full md:w-auto">
                <Button className="w-full md:w-auto h-16 px-10 bg-primary hover:bg-primary/90 text-white rounded-[1.5rem] font-black text-lg flex items-center gap-3 shadow-xl shadow-red-500/20 group transition-all active:scale-95">
                  <Search size={20} className="group-hover:scale-110 transition-transform" />
                  Search
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Quick Trust Indicators */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center gap-8 pt-4"
          >
             <div className="flex items-center gap-2 text-white/60 text-xs font-bold uppercase tracking-widest">
                <ShieldCheck size={16} className="text-primary" /> Verified Stay
             </div>
             <div className="flex items-center gap-2 text-white/60 text-xs font-bold uppercase tracking-widest">
                <Zap size={16} className="text-primary" /> Instant Booking
             </div>
             <div className="flex items-center gap-2 text-white/60 text-xs font-bold uppercase tracking-widest">
                <Star size={16} className="text-primary" /> 4.9/5 Rating
             </div>
          </motion.div>
        </div>
      </div>

      {/* Modern Background Accents */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
}
