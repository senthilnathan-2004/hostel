import React from 'react';
import { MapPin, Star, Tag, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const stats = [
  { label: 'Starting from', value: '₹599/night', icon: Tag, color: 'text-green-500' },
  { label: 'Location', value: 'Downtown City', icon: MapPin, color: 'text-primary' },
  { label: 'Ratings', value: '4.8 (2.4k Reviews)', icon: Star, color: 'text-yellow-500' },
  { label: 'Community', value: '500+ Monthly', icon: Users, color: 'text-blue-500' },
];

export default function QuickInfo() {
  return (
    <section className="py-12 bg-white dark:bg-black border-b border-border relative z-20 -mt-10 mx-auto max-w-6xl px-4">
      <div className="bg-white dark:bg-card rounded-2xl shadow-2xl border border-border p-6 md:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className={cn(
                "flex items-center gap-4 md:px-4",
                idx !== 0 && "pt-6 sm:pt-0 sm:border-t-0",
                idx % 2 !== 0 && "sm:border-l sm:pl-8 md:border-l-0 md:pl-4",
                idx >= 2 && "md:border-l md:pl-8",
                idx === 1 && "sm:border-l sm:pl-8 md:border-l md:pl-8"
              )}
            >
              <div className={`p-3 rounded-xl bg-gray-50 dark:bg-black/20 ${stat.color} shrink-0`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</p>
                <p className="text-lg font-bold text-foreground leading-tight">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
