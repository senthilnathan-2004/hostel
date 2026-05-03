import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Bed, Wifi, Maximize } from 'lucide-react';

interface RoomCardProps {
  room: any;
}

export default function RoomCard({ room }: RoomCardProps) {
  // Support both _id (MongoDB) and id (Mock)
  const roomId = room._id || room.id;
  // Support both images (Array) and image (String)
  const displayImage = room.images?.[0] || room.image || '/dorm-room.png';

  return (
    <Card className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all group rounded-[2rem] flex flex-col h-full bg-white dark:bg-white/5">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={displayImage}
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
      <CardContent className="p-6 pt-8 flex-grow">
        <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors line-clamp-1">{room.name}</h3>
        <p className="text-muted-foreground text-sm mb-6 line-clamp-2 leading-relaxed">
          {room.description || 'Experience comfort and style in our modern hostel rooms designed for the modern traveler.'}
        </p>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-3 text-sm text-muted-foreground font-medium">
            <div className="p-1.5 bg-primary/10 rounded-lg">
              <Users className="w-4 h-4 text-primary" />
            </div>
            <span>Up to {room.capacity}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground font-medium">
            <div className="p-1.5 bg-primary/10 rounded-lg">
              <Maximize className="w-4 h-4 text-primary" />
            </div>
            <span>{room.type === 'Private' ? 'Premium' : 'Social'}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground font-medium">
            <div className="p-1.5 bg-primary/10 rounded-lg">
              <Wifi className="w-4 h-4 text-primary" />
            </div>
            <span>High-Speed</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground font-medium">
            <div className="p-1.5 bg-primary/10 rounded-lg">
              <Bed className="w-4 h-4 text-primary" />
            </div>
            <span>{room.type === 'Private' ? 'King' : 'Bunk'} Bed</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {(room.amenities || []).slice(0, 4).map((amenity: string, i: number) => (
            <span key={i} className="text-[10px] uppercase font-bold tracking-wider bg-gray-100 dark:bg-white/10 px-3 py-1.5 rounded-full text-foreground/70">
              {amenity}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 gap-3">
        <Link href={`/rooms/${roomId}`} className=" flex-1">
          <Button variant="outline" className="mt-4 w-full border-primary/20 text-primary hover:bg-primary/5 rounded-2xl h-12 font-bold">
            Details
          </Button>
        </Link>
        <Link href={`/rooms/${roomId}`} className="flex-1">
          <Button className="mt-4 w-full bg-primary text-white hover:bg-primary/90 rounded-2xl h-12 font-bold shadow-lg shadow-primary/20">
            Book Now
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
