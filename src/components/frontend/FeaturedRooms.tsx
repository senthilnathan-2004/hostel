'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Bed, Wifi, Loader2 } from 'lucide-react';

export default function FeaturedRooms() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get('/api/rooms');
        // Only show top 3 featured rooms on home page
        setRooms(res.data.slice(0, 3));
      } catch (error) {
        console.error('Failed to load rooms');
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  if (loading) return (
    <div className="py-24 flex flex-col items-center justify-center gap-4">
      <Loader2 className="animate-spin text-primary" size={40} />
      <p className="text-muted-foreground animate-pulse font-medium">Fetching best stays for you...</p>
    </div>
  );

  if (rooms.length === 0) return null;

  return (
    <section className="py-24 bg-gray-50 dark:bg-black/40">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Choose Your <span className="text-primary">Comfort</span></h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Whether you want a private sanctuary or a social hub, we have the perfect space for you.
            </p>
          </div>
          <Link href="/rooms">
            <Button variant="outline" className="rounded-xl px-6 border-primary text-primary hover:bg-primary hover:text-white transition-all">
              View All Rooms
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <Card key={room._id} className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all group rounded-[2rem] bg-white dark:bg-white/5">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={room.images?.[0] || '/placeholder.jpg'}
                  alt={room.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  unoptimized
                />
                <Badge className="absolute top-4 left-4 bg-primary text-white border-none shadow-lg">
                  {room.type}
                </Badge>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6">
                  <p className="text-white font-bold text-2xl">₹{room.price}<span className="text-sm font-normal text-gray-300"> / night</span></p>
                </div>
              </div>
              <CardContent className="p-6 pt-8">
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors line-clamp-1">{room.name}</h3>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                    <div className="p-1.5 bg-primary/10 rounded-md">
                      <Users className="w-4 h-4 text-primary" />
                    </div>
                    <span>Up to {room.capacity} Guests</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                    <div className="p-1.5 bg-primary/10 rounded-md">
                      <Bed className="w-4 h-4 text-primary" />
                    </div>
                    <span>{room.type === 'Private' ? '1 King Bed' : '1 Bunk Bed'}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(room.amenities || []).slice(0, 3).map((amenity: string, i: number) => (
                    <span key={i} className="text-[10px] uppercase font-bold tracking-wider bg-gray-100 dark:bg-white/10 px-3 py-1.5 rounded-full text-foreground/70">
                      {amenity}
                    </span>
                  ))}
                  {(room.amenities || []).length > 3 && (
                    <span className="text-[10px] uppercase font-bold tracking-wider bg-primary/10 text-primary px-3 py-1.5 rounded-full">
                      +{(room.amenities || []).length - 3} more
                    </span>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Link href={`/rooms/${room._id}`} className="w-full">
                  <Button className="mt-4 w-full bg-secondary text-white hover:bg-primary transition-all rounded-2xl py-7 font-bold text-lg shadow-lg shadow-secondary/20">
                    Book This Room
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
