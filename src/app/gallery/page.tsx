"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const galleryItems = [
  { id: 1, url: '/private-room.png', category: 'Rooms', title: 'Private Suite' },
  { id: 2, url: '/dorm-room.png', category: 'Rooms', title: 'Mixed Dorm' },
  { id: 3, url: '/common.png', category: 'Common Area', title: 'Social Lounge' },
  { id: 4, url: '/event.png', category: 'Events', title: 'Rooftop Party' },
  { id: 5, url: '/hero.png', category: 'Common Area', title: 'Lobby' },
  { id: 6, url: '/private-room.png', category: 'Rooms', title: 'Twin Room' },
  { id: 7, url: '/common.png', category: 'Common Area', title: 'Game Zone' },
  { id: 8, url: '/event.png', category: 'Events', title: 'Workshop' },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState('All');

  const filteredItems = filter === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === filter);

  return (
    <div className="pt-10 pb-20">
      <div className="bg-secondary py-16 md:py-24 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Hostel <span className="text-primary">Gallery</span></h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Take a visual tour of our spaces and see why travelers from around the world choose us.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Filters */}
        <div className="flex justify-center mb-12">
          <Tabs defaultValue="All" className="w-full max-w-md" onValueChange={setFilter}>
            <TabsList className="grid w-full grid-cols-4 bg-gray-100 dark:bg-white/5 rounded-xl h-12">
              <TabsTrigger value="All" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white">All</TabsTrigger>
              <TabsTrigger value="Rooms" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white">Rooms</TabsTrigger>
              <TabsTrigger value="Common Area" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white">Common</TabsTrigger>
              <TabsTrigger value="Events" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white">Events</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative h-80 overflow-hidden rounded-2xl cursor-pointer"
            >
              <Image
                src={item.url}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <Badge className="w-fit mb-2 bg-primary text-white border-none">{item.category}</Badge>
                <h3 className="text-white font-bold text-xl">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
