'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Sparkles, Users, MapPin } from 'lucide-react';

const iconMap: any = {
  Sparkles, Users, MapPin
};

export default function Highlights() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get('/api/settings');
        if (res.data) setSettings(res.data);
      } catch (error) {
        console.error('Failed to load highlights settings');
      }
    };
    fetchSettings();
  }, []);

  const title = settings?.highlightsTitle || 'Our Community';
  const heading = settings?.highlightsHeading || 'Hostel Highlights';
  const highlightsList = settings?.highlights?.length > 0 ? settings.highlights : [
    { title: 'Passionate Staff', description: 'Our team consists of seasoned travelers who know exactly what you need for a great stay.', icon: 'Sparkles' },
    { title: 'Global Community', description: 'Meet people from over 100+ countries and share stories over our communal dinners.', icon: 'Users' },
    { title: 'Prime Locations', description: 'All our hostels are located in the heart of the city, steps away from major attractions.', icon: 'MapPin' },
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-[#0a0a0a]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <span className="text-primary font-bold uppercase tracking-widest text-sm">{title}</span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">{heading}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {highlightsList.map((item: any, i: number) => {
            const Icon = iconMap[item.icon] || Sparkles;
            return (
              <div key={i} className="text-center space-y-6 group">
                <div className="w-20 h-20 bg-white dark:bg-white/5 rounded-[2rem] flex items-center justify-center mx-auto shadow-xl group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Icon size={32} />
                </div>
                <div className="space-y-3">
                  <h4 className="text-xl font-bold">{item.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
