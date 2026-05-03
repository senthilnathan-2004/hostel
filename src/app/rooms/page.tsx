"use client";

import React, { useState, useMemo, useEffect } from 'react';
import RoomCard from '@/components/frontend/RoomCard';
import { Button } from '@/components/ui/button';
import { Filter, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import axios from 'axios';

export default function RoomsPage() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(10000); // Increased default max price
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [roomsRes, settingsRes] = await Promise.all([
          axios.get('/api/rooms'),
          axios.get('/api/settings')
        ]);
        setRooms(roomsRes.data || []);
        if (settingsRes.data) setSettings(settingsRes.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredRooms = useMemo(() => {
    return rooms.filter(room => {
      // Filter by Type
      if (selectedTypes.length > 0) {
        if (!selectedTypes.includes(room.type)) return false;
      }

      // Filter by Price
      if (room.price > maxPrice) return false;

      // Filter by Amenities
      if (selectedAmenities.length > 0) {
        const hasAllAmenities = selectedAmenities.every(amenity =>
          room.amenities.some((a: string) => a.toLowerCase().includes(amenity.toLowerCase()))
        );
        if (!hasAllAmenities) return false;
      }

      return true;
    });
  }, [rooms, selectedTypes, maxPrice, selectedAmenities]);

  const toggleType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  return (
    <div className="pb-20 pt-10">
      {/* Header */}
      <div className="bg-secondary py-16 md:py-24 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
            {settings?.roomsTitle || 'Choose Your Comfort'}
          </h1>
          <p className="text-gray-400 text-lg">
            {settings?.roomsSubtitle || 'Whether you want a private sanctuary or a social hub, we have the perfect space for you.'}
          </p>
        </div>
      </div>

      {/* Filters & Grid */}
      <div className="container mx-auto px-4 py-16">
        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-6">
          <Button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full bg-primary text-white flex items-center justify-center gap-2 h-12 rounded-xl"
          >
            {showFilters ? <X className="w-5 h-5" /> : <Filter className="w-5 h-5" />}
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Sidebar Filters */}
          <aside className={cn(
            "w-full md:w-64 space-y-8 sticky top-24 transition-all duration-300 md:block",
            showFilters ? "block" : "hidden"
          )}>
            <div>
              <h4 className="font-bold mb-4 uppercase tracking-wider text-sm text-secondary">Room Type</h4>
              <div className="space-y-3">
                {[
                  { label: 'Private Rooms', value: 'Private' },
                  { label: 'Dormitories', value: 'Dorm' }
                ].map((type) => (
                  <label key={type.value} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type.value)}
                      onChange={() => toggleType(type.value)}
                      className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                    />
                    <span className={cn(
                      "text-sm transition-colors",
                      selectedTypes.includes(type.value) ? "text-primary font-bold" : "text-muted-foreground group-hover:text-foreground"
                    )}>
                      {type.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold uppercase tracking-wider text-sm text-secondary">Price Range</h4>
                <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">Up to ₹{maxPrice}</span>
              </div>
              <div className="space-y-4">
                <input
                  type="range"
                  min="400"
                  max="10000"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs font-medium text-muted-foreground">
                  <span>₹400</span>
                  <span>₹10000+</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4 uppercase tracking-wider text-sm text-secondary">Amenities</h4>
              <div className="space-y-3">
                {['AC', 'Wifi', 'Locker', 'Workspace'].map((item) => (
                  <label key={item} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedAmenities.includes(item)}
                      onChange={() => toggleAmenity(item)}
                      className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                    />
                    <span className={cn(
                      "text-sm transition-colors",
                      selectedAmenities.includes(item) ? "text-primary font-bold" : "text-muted-foreground group-hover:text-foreground"
                    )}>
                      {item}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <Button
              variant="outline"
              onClick={() => {
                setSelectedTypes([]);
                setMaxPrice(10000);
                setSelectedAmenities([]);
              }}
              className="w-full text-xs h-10 rounded-lg"
            >
              Reset Filters
            </Button>
          </aside>

          {/* Main Grid */}
          <div className="flex-1 w-full">
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground text-sm">
                Showing <span className="text-foreground font-bold">{filteredRooms.length}</span> rooms
              </p>
            </div>

            {filteredRooms.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredRooms.map((room) => (
                  <RoomCard key={room._id || room.id} room={room} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                <p className="text-muted-foreground text-lg">No rooms match your filters.</p>
                <Button
                  variant="link"
                  onClick={() => {
                    setSelectedTypes([]);
                    setMaxPrice(10000);
                    setSelectedAmenities([]);
                  }}
                  className="text-primary mt-2"
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
