'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Wifi, Coffee, Utensils, Shield, Music, Zap, Tv, Waves, Sparkles } from 'lucide-react';

const iconMap: any = {
  Wifi, Coffee, Utensils, Shield, Music, Zap, Tv, Waves, Sparkles
};

export default function Amenities() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get('/api/settings');
        if (res.data) setSettings(res.data);
      } catch (error) {
        console.error('Failed to load amenities settings');
      }
    };
    fetchSettings();
  }, []);

  const title = settings?.amenitiesTitle || 'Everything You Need';
  const amenitiesList = settings?.amenities?.length > 0 ? settings.amenities : [
    { title: 'High-speed Wi-Fi', description: 'Seamless connectivity throughout the hostel.', icon: 'Wifi' },
    { title: 'Social Cafe', description: 'Fresh coffee and workspace for digital nomads.', icon: 'Coffee' },
    { title: 'Shared Kitchen', description: 'Fully equipped kitchen for your culinary experiments.', icon: 'Utensils' },
    { title: '24/7 Security', description: 'Lockers and round-the-clock surveillance for peace of mind.', icon: 'Shield' },
    { title: 'Weekly Events', description: 'From movie nights to walking tours and pub crawls.', icon: 'Music' },
    { title: 'Power Backup', description: 'Uninterrupted power for all your devices.', icon: 'Zap' },
    { title: 'Entertainment Room', description: 'Large screen TV, PS5, and board games gallery.', icon: 'Tv' },
    { title: 'Laundry Service', description: 'Professional laundry to keep you fresh on the go.', icon: 'Waves' },
  ];

  return (
    <section className="py-24 bg-white dark:bg-black">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-16">
          {title.split(' ').map((word: string, i: number) => (
            <span key={i} className={i === title.split(' ').length - 1 ? 'text-primary' : ''}>{word} </span>
          ))}
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
          {amenitiesList.map((item: any, idx: number) => {
            const IconComponent = iconMap[item.icon] || Sparkles;
            return (
              <div key={idx} className="group p-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-300">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:scale-110 transition-all">
                  <IconComponent className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                </div>
                <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
