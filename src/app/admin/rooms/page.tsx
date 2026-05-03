'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Loader2,
  Bed,
  Users,
  IndianRupee
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
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import ImageUpload from '@/components/admin/ImageUpload';
import ConfirmDialog from '@/components/admin/ConfirmDialog';

interface Room {
  _id: string;
  name: string;
  description: string;
  price: number;
  capacity: number;
  amenities: string[];
  images: string[];
  type: string;
  status: string;
}

export default function RoomsManagement() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    capacity: 1,
    amenities: '',
    images: [] as string[],
    type: 'Private',
    status: 'Available'
  });

  const fetchRooms = async () => {
    try {
      const res = await axios.get('/api/rooms');
      setRooms(res.data || []);
    } catch (error) {
      toast.error('Failed to fetch rooms');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleOpenDialog = (room: Room | null = null) => {
    if (room) {
      setEditingRoom(room);
      setFormData({
        name: room.name,
        description: room.description,
        price: room.price,
        capacity: room.capacity,
        amenities: room.amenities.join(', '),
        images: room.images || [],
        type: room.type,
        status: room.status
      });
    } else {
      setEditingRoom(null);
      setFormData({
        name: '',
        description: '',
        price: 0,
        capacity: 1,
        amenities: '',
        images: [],
        type: 'Private',
        status: 'Available'
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        amenities: formData.amenities.split(',').map(s => s.trim()).filter(s => s),
      };

      if (editingRoom) {
        await axios.put(`/api/rooms/${editingRoom._id}`, payload);
        toast.success('Room updated');
      } else {
        await axios.post('/api/rooms', payload);
        toast.success('Room created');
      }
      setIsDialogOpen(false);
      fetchRooms();
    } catch (error: any) {
      const message = error.response?.data?.error || 'Action failed';
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setSelectedRoomId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedRoomId) return;
    setDeleteLoading(true);
    try {
      await axios.delete(`/api/rooms/${selectedRoomId}`);
      toast.success('Room deleted');
      fetchRooms();
      setIsDeleteDialogOpen(false);
    } catch (error: any) {
      const message = error.response?.data?.error || 'Delete failed';
      toast.error(message);
    } finally {
      setDeleteLoading(false);
      setSelectedRoomId(null);
    }
  };

  // Filter out duplicates based on _id
  const uniqueRooms = rooms.filter((room, index, self) =>
    index === self.findIndex((r) => r._id === room._id)
  );

  const filteredRooms = uniqueRooms.filter(room => 
    room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Rooms</h1>
          <p className="text-muted-foreground">Manage your property listings and inventory.</p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="font-bold">
          <Plus className="mr-2 h-4 w-4" /> Add Room
        </Button>
      </div>

      <div className="bg-card border border-border p-2 rounded-xl flex items-center gap-2 shadow-sm">
        <Search className="ml-2 text-muted-foreground" size={18} />
        <Input placeholder="Search rooms..." className="border-none focus-visible:ring-0" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" /></div>
      ) : (
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="font-bold">Room</TableHead>
                <TableHead className="font-bold">Type</TableHead>
                <TableHead className="font-bold">Price</TableHead>
                <TableHead className="text-right font-bold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRooms.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Bed className="h-10 w-10 text-muted-foreground/30" />
                      <p className="font-bold text-lg">No Rooms Found</p>
                      <p className="text-sm text-muted-foreground">Click "Add Room" to create your first listing.</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredRooms.map((room, index) => (
                  <TableRow key={room._id || `room-${index}`} className="hover:bg-muted/30 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-border">
                          <Image src={room.images?.[0] || '/placeholder.jpg'} alt={room.name} fill className="object-cover" unoptimized />
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="font-bold">{room.name}</span>
                            {room._id.startsWith('mock-') && (
                              <Badge variant="secondary" className="text-[10px] h-4 px-1 bg-yellow-100 text-yellow-700 border-yellow-200">Sample</Badge>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground">Capacity: {room.capacity}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell><Badge variant="outline" className="font-medium">{room.type}</Badge></TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 font-bold">
                        <IndianRupee size={14} />
                        {room.price}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(room)}><Edit2 size={16} /></Button>
                        <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDeleteClick(room._id)}><Trash2 size={16} /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{editingRoom ? 'Edit Room' : 'Add New Room'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Room Name</label>
                  <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Deluxe Private Suite" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Type</label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                      <option value="Private">Private</option>
                      <option value="Dorm">Dorm</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Price (per night)</label>
                    <Input type="number" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} placeholder="599" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Capacity</label>
                  <Input type="number" value={formData.capacity} onChange={e => setFormData({...formData, capacity: Number(e.target.value)})} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Amenities (comma separated)</label>
                  <Input value={formData.amenities} onChange={e => setFormData({...formData, amenities: e.target.value})} placeholder="Wi-Fi, AC, Parking" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Room Images (Upload via ImageKit)</label>
                  <div className="grid grid-cols-1 gap-4">
                    <ImageUpload 
                      onUpload={(url) => setFormData({...formData, images: [...formData.images, url]})} 
                      onRemove={() => setFormData({...formData, images: []})}
                      value={formData.images[0]}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Description</label>
                  <textarea className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Describe the room details..." />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? <Loader2 className="animate-spin mr-2" /> : null}
                {editingRoom ? 'Update Room' : 'Create Room'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <ConfirmDialog 
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        loading={deleteLoading}
        title="Delete Room?"
        description="This action cannot be undone. All data related to this room will be permanently removed."
      />
    </div>
  );
}
