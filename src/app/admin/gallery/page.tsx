'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Plus, 
  Trash2, 
  Loader2, 
  Image as ImageIcon,
  Save,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import ImageUpload from '@/components/admin/ImageUpload';
import ConfirmDialog from '@/components/admin/ConfirmDialog';

export default function GalleryManagement() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [gallery, setGallery] = useState<string[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get('/api/settings');
        setGallery(res.data.gallery || []);
      } catch (error) {
        toast.error('Failed to load gallery');
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const handleAddImage = (url: string) => {
    if (gallery.includes(url)) return toast.error('Image already exists');
    setGallery([...gallery, url]);
    toast.success('Image added to list');
  };

  const handleRemoveClick = (url: string) => {
    setImageToDelete(url);
    setIsDeleteDialogOpen(true);
  };

  const confirmRemove = () => {
    if (imageToDelete) {
      setGallery(gallery.filter(img => img !== imageToDelete));
      setImageToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleSave = async () => {
    setSubmitting(true);
    try {
      await axios.put('/api/settings', { gallery });
      toast.success('Gallery changes saved successfully');
    } catch (error) {
      toast.error('Update failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" /></div>;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gallery Management</h1>
          <p className="text-muted-foreground mt-1">Manage the global gallery images for your website. (Remember to save changes)</p>
        </div>
        <Button onClick={handleSave} disabled={submitting} className="font-bold px-8 h-12 shadow-xl shadow-primary/20">
          {submitting ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2" size={18} />}
          Save Gallery Changes
        </Button>
      </div>

      <Card className="border-dashed border-2 bg-muted/30 p-8 flex flex-col items-center justify-center">
        <p className="mb-4 text-sm font-medium text-muted-foreground">Upload a new image to your gallery</p>
        <ImageUpload 
          onUpload={handleAddImage}
          onRemove={() => {}}
        />
      </Card>

      {gallery.length === 0 ? (
        <div className="text-center py-24 border-2 border-dashed rounded-[3rem] bg-muted/10">
          <ImageIcon className="mx-auto text-muted-foreground/30 mb-4" size={64} />
          <p className="text-muted-foreground font-medium">Your gallery is currently empty.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {gallery.map((url, index) => (
            <div key={index} className="relative group aspect-[4/3] rounded-3xl overflow-hidden border border-border shadow-md">
              <Image 
                src={url} 
                alt={`Gallery ${index}`} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-4">
                <Button 
                  variant="destructive" 
                  size="icon" 
                  onClick={() => handleRemoveClick(url)}
                  className="rounded-full h-14 w-14 shadow-2xl scale-90 group-hover:scale-100 transition-transform"
                >
                  <Trash2 size={24} />
                </Button>
                <span className="text-white text-xs font-bold uppercase tracking-widest">Remove Image</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog 
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmRemove}
        title="Remove from Gallery?"
        description="This will remove the image from the list. You will need to click 'Save Changes' to apply this to the website."
      />
    </div>
  );
}
