'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Search, 
  CheckCircle, 
  Trash2, 
  Loader2,
  Calendar,
  Filter,
  Eye,
  Mail,
  Phone,
  User as UserIcon
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export default function BookingsManagement() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const fetchBookings = async () => {
    try {
      const res = await axios.get('/api/bookings');
      setBookings(res.data || []);
    } catch (error) {
      toast.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await axios.put(`/api/bookings/${id}`, { status });
      toast.success(`Booking ${status}`);
      fetchBookings();
      setIsDetailsOpen(false);
    } catch (error) {
      toast.error('Update failed');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this booking record?')) return;
    try {
      await axios.delete(`/api/bookings/${id}`);
      toast.success('Booking deleted');
      fetchBookings();
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  const filteredBookings = bookings.filter(b => 
    b.guest_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.guest_email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Bookings</h1>
          <p className="text-muted-foreground">Monitor and manage guest reservations.</p>
        </div>
      </div>

      <div className="bg-card border border-border p-2 rounded-xl flex items-center gap-2 shadow-sm">
        <Search className="ml-2 text-muted-foreground" size={18} />
        <Input placeholder="Search by name or email..." className="border-none focus-visible:ring-0" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" size={40} /></div>
      ) : (
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="font-bold">Guest</TableHead>
                <TableHead className="font-bold">Check In</TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="text-right font-bold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-12 text-muted-foreground font-medium">No bookings found.</TableCell>
                </TableRow>
              ) : (
                filteredBookings.map((b, index) => (
                  <TableRow key={b._id || `booking-${index}`} className="hover:bg-muted/30 transition-colors">
                    <TableCell>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-bold text-base">{b.guest_name}</span>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Mail size={12} />
                          {b.guest_email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 font-medium">
                        <Calendar size={14} className="text-primary" />
                        {b.check_in ? format(new Date(b.check_in), 'MMM dd, yyyy') : 'N/A'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={
                        b.status === 'confirmed' 
                        ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 capitalize' 
                        : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20 capitalize'
                      }>
                        {b.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary transition-colors" onClick={() => { setSelectedBooking(b); setIsDetailsOpen(true); }}>
                          <Eye size={18} />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 transition-colors" onClick={() => handleDelete(b._id)}>
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Booking Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-[2rem] border-none shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                <UserIcon size={18} />
              </div>
              Guest Details
            </DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-1 gap-4 bg-muted/30 p-6 rounded-2xl border border-border/50">
                <div className="flex justify-between items-center pb-4 border-b border-border/50">
                  <span className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Guest Name</span>
                  <span className="font-bold text-lg">{selectedBooking.guest_name}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-border/50">
                  <span className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Email Address</span>
                  <span className="font-bold">{selectedBooking.guest_email}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-border/50">
                  <span className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Phone Number</span>
                  <span className="font-bold">{selectedBooking.guest_phone || 'Not Provided'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Reservation Status</span>
                  <Badge className="capitalize font-bold">{selectedBooking.status}</Badge>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase text-muted-foreground tracking-widest ml-1">Stay Duration</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-card border border-border p-4 rounded-xl flex flex-col gap-1">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground">Check-in</span>
                    <span className="font-bold text-sm">{selectedBooking.check_in ? format(new Date(selectedBooking.check_in), 'PPP') : 'N/A'}</span>
                  </div>
                  <div className="bg-card border border-border p-4 rounded-xl flex flex-col gap-1">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground">Check-out</span>
                    <span className="font-bold text-sm">{selectedBooking.check_out ? format(new Date(selectedBooking.check_out), 'PPP') : 'N/A'}</span>
                  </div>
                </div>
              </div>

              <DialogFooter className="flex gap-2 sm:justify-end pt-4 border-t border-border">
                {selectedBooking.status === 'pending' && (
                  <Button 
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 px-6 rounded-xl shadow-lg shadow-emerald-500/20" 
                    onClick={() => handleUpdateStatus(selectedBooking._id, 'confirmed')}
                  >
                    Confirm Booking
                  </Button>
                )}
                <Button variant="outline" onClick={() => setIsDetailsOpen(false)} className="h-12 px-6 rounded-xl font-bold">Close</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
