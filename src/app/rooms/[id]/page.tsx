"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  Bed,
  Wifi,
  CheckCircle2,
  ArrowLeft,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Zap,
  Coffee,
  Loader2,
  Star,
  MessageSquare
} from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { format } from 'date-fns';

export default function RoomDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [room, setRoom] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [reviewStats, setReviewStats] = useState({ total: 0, average: 0 });
  const [reviewLoading, setReviewLoading] = useState(false);

  // Review Form State
  const [reviewForm, setReviewForm] = useState({
    guest_name: '',
    rating: 5,
    comment: ''
  });

  // Booking Form State
  const [bookingForm, setBookingForm] = useState({
    guest_name: '',
    guest_email: '',
    guest_phone: '',
    check_in: '',
    check_out: ''
  });

  const fetchData = async () => {
    try {
      const [roomRes, reviewRes] = await Promise.all([
        axios.get(`/api/rooms/${id}`),
        axios.get(`/api/reviews/${id}`)
      ]);
      setRoom(roomRes.data);
      setReviews(reviewRes.data.reviews);
      setReviewStats(reviewRes.data.stats);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error("Failed to load details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingLoading(true);

    try {
      const res = await axios.post('/api/bookings', {
        ...bookingForm,
        room_id: id,
      });

      if (res.status === 200 || res.status === 201) {
        toast.success("Booking request sent! Our team will contact you shortly.");
        setBookingForm({ guest_name: '', guest_email: '', guest_phone: '', check_in: '', check_out: '' });
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to submit booking");
    } finally {
      setBookingLoading(false);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setReviewLoading(true);

    try {
      await axios.post(`/api/reviews/${id}`, reviewForm);
      toast.success("Review submitted! Thank you for your feedback.");
      setReviewForm({ guest_name: '', rating: 5, comment: '' });
      fetchData(); // Refresh data
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to submit review");
    } finally {
      setReviewLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <Loader2 className="animate-spin text-primary" size={48} />
      <p className="text-muted-foreground font-medium">Loading room details...</p>
    </div>
  );

  if (!room) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">Room not found</h2>
      <Link href="/rooms">
        <Button variant="outline">Back to Rooms</Button>
      </Link>
    </div>
  );

  const images = room.images?.length > 0 ? room.images : ['/placeholder.jpg'];
  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  // Rating percentage calculation
  const ratingsCount = [0, 0, 0, 0, 0]; // 1 to 5 stars
  reviews.forEach(r => {
    if (r.rating >= 1 && r.rating <= 5) ratingsCount[r.rating - 1]++;
  });

  return (
    <div className="pt-10 pb-20">
      <div className="container mx-auto px-4">
        <Link href="/rooms" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors group">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3 group-hover:bg-primary/10 group-hover:text-primary transition-all">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="font-bold">Back to Rooms</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Gallery & Info */}
          <div className="lg:col-span-2 space-y-12">
            {/* Gallery Slider */}
            <div className="relative h-[400px] md:h-[600px] rounded-[3rem] overflow-hidden group shadow-2xl border border-border">
              <Image
                src={images[currentImage]}
                alt={room.name}
                fill
                className="object-cover transition-all duration-700"
                unoptimized
              />

              {/* Overlay controls */}
              {images.length > 1 && (
                <div className="absolute inset-0 flex items-center justify-between p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button onClick={prevImage} size="icon" variant="secondary" className="rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 text-white border-none h-12 w-12 shadow-xl">
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                  <Button onClick={nextImage} size="icon" variant="secondary" className="rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 text-white border-none h-12 w-12 shadow-xl">
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                </div>
              )}

              {/* Thumbnails indicator */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
                {images.map((_: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      currentImage === i ? "bg-primary w-12" : "bg-white/50 w-6"
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Room Info */}
            <div className="bg-white dark:bg-white/5 p-8 md:p-12 rounded-[3rem] shadow-sm border border-border">
              <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#1a1a1a] dark:text-white">{room.name}</h1>
                <Badge className="bg-[#FF002E] text-white border-none px-6 py-2 text-sm rounded-full font-bold shadow-lg shadow-red-500/20">
                  {room.type}
                </Badge>
              </div>

              {/* Facilities Icons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12 py-8 border-y border-border">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-red-50 dark:bg-red-500/10 rounded-2xl flex items-center justify-center text-[#FF002E]">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Capacity</p>
                    <p className="font-bold text-lg">{room.capacity} Persons</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-red-50 dark:bg-red-500/10 rounded-2xl flex items-center justify-center text-[#FF002E]">
                    <Bed className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Bed Configuration</p>
                    <p className="font-bold text-lg">{room.type === 'Private' ? 'King Size' : 'Premium Bunk'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-red-50 dark:bg-red-500/10 rounded-2xl flex items-center justify-center text-[#FF002E]">
                    <Wifi className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Connectivity</p>
                    <p className="font-bold text-lg">Free 5G Wi-Fi</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
                  <div className="w-1.5 h-8 bg-[#FF002E] rounded-full" />
                  About This Space
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg font-medium whitespace-pre-line">
                  {room.description || 'Experience the perfect blend of comfort and community. Our spaces are designed for modern travelers who value both privacy and social connection.'}
                </p>
              </div>

              <div className="mt-16">
                <h3 className="text-2xl font-black uppercase tracking-tight mb-8 flex items-center gap-3">
                   <div className="w-1.5 h-8 bg-[#FF002E] rounded-full" />
                   Premium Amenities
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {(room.amenities || []).map((amenity: string, i: number) => (
                    <div key={i} className="flex items-center gap-4 p-5 bg-gray-50 dark:bg-white/5 rounded-2xl border border-transparent hover:border-red-500/20 transition-all group">
                      <CheckCircle2 className="w-6 h-6 text-[#FF002E] shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="text-base font-bold text-foreground/80">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Real World Review Section - Airbnb Style Wrapped in Card */}
            <Card className="border border-border shadow-sm rounded-[3rem] overflow-hidden bg-white dark:bg-white/5">
                <CardContent className="p-8 md:p-12 space-y-12">
                    <div className="flex flex-col md:flex-row gap-12">
                        {/* Left: Rating Summary */}
                        <div className="md:w-1/3 space-y-6">
                            <div className="flex items-center gap-3">
                                <Star className="w-8 h-8 text-[#FF002E] fill-current" />
                                <h3 className="text-4xl font-black">{reviewStats.average}</h3>
                                <span className="text-muted-foreground font-bold text-lg">• {reviewStats.total} Reviews</span>
                            </div>
                            
                            <div className="space-y-3">
                                {[5, 4, 3, 2, 1].map(star => (
                                    <div key={star} className="flex items-center gap-4 text-sm font-medium">
                                        <span className="w-4">{star}</span>
                                        <div className="flex-1 h-1.5 bg-gray-100 dark:bg-white/10 rounded-full">
                                            <div 
                                                className="h-full bg-secondary dark:bg-white/40 rounded-full" 
                                                style={{ width: `${reviewStats.total > 0 ? (ratingsCount[star - 1] / reviewStats.total) * 100 : 0}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-6">
                                <h4 className="font-bold text-lg mb-2">Share your stay</h4>
                                <p className="text-sm text-muted-foreground mb-4 font-medium">Was it comfortable? Let other travelers know about your experience.</p>
                                <Button 
                                    variant="outline" 
                                    className="w-full h-12 rounded-xl border-2 border-secondary dark:border-white font-black hover:bg-secondary hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                                    onClick={() => document.getElementById('review-form')?.scrollIntoView({ behavior: 'smooth' })}
                                >
                                    Write a Review
                                </Button>
                            </div>
                        </div>

                        {/* Right: Review List */}
                        <div className="md:w-2/3 space-y-10">
                            {reviews.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center py-12 bg-gray-50 dark:bg-white/5 rounded-3xl border-2 border-dashed border-border text-center">
                                    <MessageSquare className="w-10 h-10 text-muted-foreground/30 mb-4" />
                                    <p className="text-muted-foreground font-bold">No reviews yet for this room.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-10">
                                    {reviews.map((r, i) => (
                                        <div key={i} className="space-y-4 pb-10 border-b border-border last:border-0 last:pb-0">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center font-black text-secondary dark:text-white text-lg">
                                                    {r.guest_name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <h5 className="font-bold">{r.guest_name}</h5>
                                                    <p className="text-xs text-muted-foreground font-medium">{format(new Date(r.createdAt), 'MMMM yyyy')}</p>
                                                </div>
                                                <div className="ml-auto flex gap-0.5">
                                                    {[...Array(5)].map((_, starIdx) => (
                                                        <Star key={starIdx} size={12} className={cn(starIdx < r.rating ? "text-secondary dark:text-white fill-current" : "text-gray-200")} />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-foreground/80 leading-relaxed font-medium">
                                                {r.comment}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
          </div>

          {/* Right: Review Form & Booking Widget */}
          <div className="lg:col-span-1 space-y-8">
            <div className="lg:sticky lg:top-[120px] self-start space-y-8">
              {/* Booking Widget */}
              <Card className="border border-border shadow-[0_12px_24px_rgba(0,0,0,0.08)] rounded-2xl overflow-hidden bg-white dark:bg-[#0a0a0a]">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-baseline justify-between mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-foreground">₹{room.price}</span>
                      <span className="text-muted-foreground text-sm font-medium">/ night</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-bold">
                        <span className="text-[#FF002E]">★</span>
                        <span>{reviewStats.total > 0 ? reviewStats.average : 'New'}</span>
                        <span className="text-muted-foreground font-medium underline">({reviewStats.total} reviews)</span>
                    </div>
                  </div>

                  <form onSubmit={handleBooking} className="space-y-4">
                    {/* Date Picker Grid - Real World Style */}
                    <div className="grid grid-cols-2 border border-border rounded-xl overflow-hidden">
                      <div className="p-3 border-r border-border hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                        <label className="text-[10px] font-black uppercase text-foreground block mb-1">Check-in</label>
                        <input 
                            type="date"
                            className="bg-transparent border-none p-0 text-sm font-medium focus:ring-0 w-full cursor-pointer outline-none"
                            required
                            value={bookingForm.check_in}
                            onChange={e => setBookingForm({...bookingForm, check_in: e.target.value})}
                        />
                      </div>
                      <div className="p-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                        <label className="text-[10px] font-black uppercase text-foreground block mb-1">Check-out</label>
                        <input 
                            type="date"
                            className="bg-transparent border-none p-0 text-sm font-medium focus:ring-0 w-full cursor-pointer outline-none"
                            required
                            value={bookingForm.check_out}
                            onChange={e => setBookingForm({...bookingForm, check_out: e.target.value})}
                        />
                      </div>
                    </div>

                    {/* Guest/Info Section */}
                    <div className="space-y-3">
                        <div className="p-4 border border-border rounded-xl bg-gray-50/30 dark:bg-white/5 space-y-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase text-muted-foreground">Guest Name</label>
                                <input 
                                    placeholder="Enter your name" 
                                    className="w-full bg-transparent border-none p-0 text-sm font-bold focus:ring-0 outline-none"
                                    required
                                    value={bookingForm.guest_name}
                                    onChange={e => setBookingForm({...bookingForm, guest_name: e.target.value})}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-muted-foreground">Email</label>
                                    <input 
                                        type="email"
                                        placeholder="mail@host.com" 
                                        className="w-full bg-transparent border-none p-0 text-sm font-bold focus:ring-0 outline-none"
                                        required
                                        value={bookingForm.guest_email}
                                        onChange={e => setBookingForm({...bookingForm, guest_email: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-muted-foreground">Phone</label>
                                    <input 
                                        placeholder="+91..." 
                                        className="w-full bg-transparent border-none p-0 text-sm font-bold focus:ring-0 outline-none"
                                        required
                                        value={bookingForm.guest_phone}
                                        onChange={e => setBookingForm({...bookingForm, guest_phone: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={bookingLoading}
                      className="w-full h-14 text-lg font-black bg-[#FF002E] hover:bg-[#D90027] text-white rounded-xl shadow-lg shadow-red-500/10 transition-all hover:scale-[1.01] active:scale-[0.99]"
                    >
                      {bookingLoading ? <Loader2 className="animate-spin" /> : "Request to Book"}
                    </Button>

                    <p className="text-center text-[11px] text-muted-foreground font-medium">You won't be charged yet</p>
                  </form>

                  {/* Price Breakdown - Professional Detail */}
                  <div className="mt-8 space-y-4 pt-6 border-t border-border">
                    <div className="flex justify-between text-sm text-foreground/80 font-medium">
                      <span className="underline decoration-muted-foreground/30 underline-offset-4">₹{room.price} x 1 night</span>
                      <span>₹{room.price}</span>
                    </div>
                    <div className="flex justify-between text-sm text-foreground/80 font-medium">
                      <span className="underline decoration-muted-foreground/30 underline-offset-4">Service fee</span>
                      <span className="text-emerald-600 font-bold">Free</span>
                    </div>
                    <hr className="border-border" />
                    <div className="flex justify-between text-base font-black text-foreground">
                      <span>Total</span>
                      <span>₹{room.price}</span>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-[#FF002E]/5 rounded-xl border border-[#FF002E]/10 flex items-start gap-3">
                    <Zap size={16} className="text-[#FF002E] mt-1 shrink-0" />
                    <div className="space-y-1">
                        <p className="text-[11px] font-black uppercase text-[#FF002E] tracking-wider">Fast Booking</p>
                        <p className="text-[10px] font-medium text-muted-foreground leading-relaxed">This property usually responds within 1 hour. Secure your spot now!</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Sidebar Review Form */}
              <Card id="review-form" className="border border-border shadow-[0_12px_24px_rgba(0,0,0,0.05)] rounded-2xl overflow-hidden bg-gray-50 dark:bg-white/5">
                <CardContent className="p-6">
                  <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                    <Star className="w-5 h-5 text-[#FF002E]" />
                    Leave a Review
                  </h3>
                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-muted-foreground ml-1">Your Name</label>
                        <Input 
                          placeholder="Name" 
                          className="h-12 rounded-xl border-none bg-white dark:bg-black/20 shadow-sm" 
                          required
                          value={reviewForm.guest_name}
                          onChange={e => setReviewForm({...reviewForm, guest_name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-muted-foreground ml-1">Rating</label>
                        <select 
                          className="w-full h-12 rounded-xl border-none bg-white dark:bg-black/20 px-4 text-sm font-bold outline-none cursor-pointer shadow-sm appearance-none"
                          value={reviewForm.rating}
                          onChange={e => setReviewForm({...reviewForm, rating: Number(e.target.value)})}
                        >
                          <option value="5">★★★★★ Excellent</option>
                          <option value="4">★★★★☆ Good</option>
                          <option value="3">★★★☆☆ Average</option>
                          <option value="2">★★☆☆☆ Poor</option>
                          <option value="1">★☆☆☆☆ Terrible</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-muted-foreground ml-1">Review</label>
                      <Textarea 
                        placeholder="How was your stay?" 
                        className="rounded-xl border-none bg-white dark:bg-black/20 min-h-[100px] resize-none shadow-sm p-4 text-sm" 
                        required
                        value={reviewForm.comment}
                        onChange={e => setReviewForm({...reviewForm, comment: e.target.value})}
                      />
                    </div>
                    <Button type="submit" disabled={reviewLoading} className="w-full bg-secondary dark:bg-white text-white dark:text-black font-black h-12 rounded-xl transition-all hover:scale-[1.02] active:scale-95">
                      {reviewLoading ? <Loader2 className="animate-spin" /> : "Post Review"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
