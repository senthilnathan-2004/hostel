'use client';

import { useState, useRef } from 'react';
import { Upload, X, Loader2, Image as ImageIcon, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';

interface ImageUploadProps {
  onUpload: (url: string) => void;
  value?: string;
  onRemove?: () => void;
}

export default function ImageUpload({ onUpload, value, onRemove }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      return toast.error('File size must be less than 5MB');
    }

    setUploading(true);
    try {
      const authRes = await fetch('/api/imagekit/auth');
      const authData = await authRes.json();

      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', file.name);
      formData.append('publicKey', process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || '');
      formData.append('signature', authData.signature);
      formData.append('expire', authData.expire);
      formData.append('token', authData.token);
      formData.append('folder', '/hostel-rooms');

      const uploadRes = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadRes.json();
      if (uploadData.url) {
        onUpload(uploadData.url);
        toast.success('Image uploaded successfully');
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      toast.error('Image upload failed. Please check your ImageKit configuration.');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full">
      {value ? (
        <div className="relative aspect-video rounded-[2rem] overflow-hidden border-2 border-primary/20 group shadow-2xl">
          <Image 
            src={value} 
            alt="Uploaded" 
            fill 
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            unoptimized
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[2px]">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onRemove) onRemove();
              }}
              type="button"
              className="p-4 bg-destructive text-white rounded-2xl shadow-xl hover:scale-110 transition-all active:scale-95"
            >
              <X size={24} />
            </button>
          </div>
          <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30 text-[10px] text-white font-bold uppercase tracking-widest">
            Preview Mode
          </div>
        </div>
      ) : (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="relative w-full aspect-video rounded-[2rem] border-2 border-dashed border-primary/30 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-primary/5 hover:border-primary/50 transition-all group overflow-hidden"
        >
          {/* Animated Background Pulse */}
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          
          {uploading ? (
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Loader2 className="animate-spin text-primary" size={48} />
                <div className="absolute inset-0 blur-xl bg-primary/20 animate-pulse" />
              </div>
              <p className="text-sm font-bold text-primary animate-pulse">Processing Media...</p>
            </div>
          ) : (
            <>
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-inner">
                <Upload size={28} />
              </div>
              <div className="text-center space-y-1">
                <p className="text-lg font-bold">Select Room Photo</p>
                <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                  <Sparkles size={12} className="text-primary" />
                  JPEG, PNG, WebP (Max 5MB)
                </p>
              </div>
            </>
          )}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept="image/*"
          />
        </div>
      )}
    </div>
  );
}
