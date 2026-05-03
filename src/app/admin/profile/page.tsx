'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Save, Loader2, User, Mail, Lock, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/api/admin/profile');
        setFormData({
          name: res.data.name || '',
          email: res.data.email || '',
          password: '',
          confirmPassword: ''
        });
      } catch (error) {
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password && formData.password !== formData.confirmPassword) {
      return toast.error('Passwords do not match');
    }

    setSubmitting(true);
    try {
      await axios.put('/api/admin/profile', {
        name: formData.name,
        email: formData.email,
        password: formData.password || undefined
      });
      toast.success('Profile updated successfully');
      setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Update failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your account settings and security.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card className="border-border/60 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <User size={20} />
              </div>
              <div>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your display name and email address.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Display Name</label>
              <Input 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
                placeholder="Full Name" 
                required
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Email Address</label>
              <Input 
                type="email"
                value={formData.email} 
                onChange={e => setFormData({...formData, email: e.target.value})} 
                placeholder="admin@example.com" 
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-500">
                <Shield size={20} />
              </div>
              <div>
                <CardTitle>Security</CardTitle>
                <CardDescription>Change your password to keep your account secure.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">New Password (optional)</label>
              <Input 
                type="password"
                value={formData.password} 
                onChange={e => setFormData({...formData, password: e.target.value})} 
                placeholder="••••••••" 
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Confirm New Password</label>
              <Input 
                type="password"
                value={formData.confirmPassword} 
                onChange={e => setFormData({...formData, confirmPassword: e.target.value})} 
                placeholder="••••••••" 
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={submitting} className="px-8 py-6 text-lg font-bold">
            {submitting ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2" />}
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
