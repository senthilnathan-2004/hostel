'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Bed, 
  CalendarCheck, 
  MessageSquare, 
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface Stats {
  totalRooms: number;
  totalBookings: number;
  totalMessages: number;
  pendingBookings: number;
  confirmedBookings: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [roomsRes, bookingsRes, messagesRes] = await Promise.all([
          axios.get('/api/rooms'),
          axios.get('/api/bookings'),
          axios.get('/api/messages')
        ]);

        const bookings = bookingsRes.data || [];
        const rooms = roomsRes.data || [];
        const messages = messagesRes.data || [];
        
        setStats({
          totalRooms: rooms.length,
          totalBookings: bookings.length,
          totalMessages: messages.length,
          pendingBookings: bookings.filter((b: any) => b.status === 'pending').length,
          confirmedBookings: bookings.filter((b: any) => b.status === 'confirmed').length,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    { 
      title: 'Total Rooms', 
      value: stats?.totalRooms || 0, 
      icon: Bed, 
      color: 'bg-blue-500/10 text-blue-500',
      description: 'Listed properties'
    },
    { 
      title: 'Total Bookings', 
      value: stats?.totalBookings || 0, 
      icon: CalendarCheck, 
      color: 'bg-primary/10 text-primary',
      description: 'All time requests'
    },
    { 
      title: 'Messages', 
      value: stats?.totalMessages || 0, 
      icon: MessageSquare, 
      color: 'bg-emerald-500/10 text-emerald-500',
      description: 'Contact inquiries'
    },
  ];

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">Monitor your hostel's performance at a glance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div 
            key={card.title}
            className="p-6 bg-card border border-border rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
                <h3 className="text-3xl font-bold mt-2">{card.value}</h3>
                <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
              </div>
              <div className={`p-4 rounded-xl ${card.color}`}>
                <card.icon size={28} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-6 bg-card border border-border rounded-2xl">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-primary" />
            Booking Status
          </h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-500/10 text-yellow-500 rounded-lg">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="font-medium">Pending Verification</p>
                  <p className="text-xs text-muted-foreground">Require attention</p>
                </div>
              </div>
              <span className="text-xl font-bold">{stats?.pendingBookings}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <p className="font-medium">Confirmed</p>
                  <p className="text-xs text-muted-foreground">Stay scheduled</p>
                </div>
              </div>
              <span className="text-xl font-bold">{stats?.confirmedBookings}</span>
            </div>
          </div>
        </div>

        <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl flex flex-col justify-center">
          <h3 className="text-xl font-bold text-primary mb-2">Welcome Back!</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            All your systems are operational. You have {stats?.pendingBookings} new bookings that need your review.
          </p>
          <div className="mt-6 p-4 bg-background rounded-xl border border-border shadow-sm">
            <div className="flex items-center gap-2 text-emerald-500 font-medium">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Database Connected
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
