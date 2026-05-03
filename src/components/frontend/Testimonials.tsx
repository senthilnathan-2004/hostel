'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Testimonials() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get('/api/settings');
        if (res.data) setSettings(res.data);
      } catch (error) {
        console.error('Failed to load testimonials settings');
      }
    };
    fetchSettings();
  }, []);

  const title = settings?.reviewsTitle || 'Travelers Love Us';
  const reviewsList = settings?.reviews?.length > 0 ? settings.reviews : [
    { 
      name: 'Sarah Jenkins', 
      role: 'Solo Traveler', 
      comment: 'The best hostel experience I have had! The community vibe is amazing, and the rooms are actually clean and comfortable. Definitely coming back.' 
    },
    { 
      name: 'Marco Rossi', 
      role: 'Digital Nomad', 
      comment: 'Perfect workspace and lightning-fast Wi-Fi. I managed to work all day and join the pub crawl at night. The staff is super helpful!' 
    },
    { 
      name: 'Aisha Khan', 
      role: 'Student', 
      comment: 'Safe, affordable, and in a great location. The female dorms are very secure and the common area is a great place to make new friends.' 
    },
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-[#0a0a0a] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold">
            {title.split(' ').map((word: string, i: number) => (
              <span key={i} className={i === title.split(' ').length - 1 ? 'text-primary' : ''}>{word} </span>
            ))}
          </h2>
          <p className="text-muted-foreground">Hear from our community of global travelers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviewsList.map((review: any, idx: number) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-white/5 p-8 rounded-[2.5rem] shadow-xl shadow-black/5 relative group"
            >
              
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} size={16} className="fill-primary text-primary" />
                ))}
              </div>

              <p className="text-lg leading-relaxed mb-8 italic text-foreground/80">
                "{review.comment}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl border border-primary/20">
                  {review.name[0]}
                </div>
                <div>
                  <h4 className="font-bold">{review.name}</h4>
                  <p className="text-sm text-muted-foreground">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
