'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Mail, 
  Trash2, 
  Loader2,
  MessageSquare
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

export default function MessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await axios.get('/api/messages');
      setMessages(res.data || []);
    } catch (error) {
      toast.error('Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/messages?id=${id}`);
      toast.success('Message deleted');
      fetchMessages();
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Messages</h1>
      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {messages.map((m, index) => (
            <div key={m._id || `msg-${index}`} className="bg-card border border-border p-6 rounded-2xl relative group">
              <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-destructive opacity-0 group-hover:opacity-100" onClick={() => handleDelete(m._id)}>
                <Trash2 size={16} />
              </Button>
              <h4 className="font-bold">{m.name}</h4>
              <p className="text-xs text-muted-foreground">{m.email}</p>
              <p className="mt-4 text-sm leading-relaxed">{m.message}</p>
              <p className="mt-4 text-[10px] text-muted-foreground">{format(new Date(m.createdAt), 'MMM dd, yyyy')}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
