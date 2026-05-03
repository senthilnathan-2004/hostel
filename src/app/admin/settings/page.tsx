'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Save, 
  Loader2, 
  Home, 
  Phone, 
  Mail, 
  MapPin, 
  Share2, 
  Sparkles,
  Plus,
  Trash2,
  Users,
  Star,
  Quote,
  Layout,
  Info
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ImageUpload from '@/components/admin/ImageUpload';

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('hero');

  const [settings, setSettings] = useState<any>({
    heroTitle: '',
    heroSubtitle: '',
    offerText: '',
    stats: {
      startingPrice: '599',
      location: 'Downtown City',
      rating: '4.8',
      community: '500+',
    },
    roomsTitle: 'Choose Your Comfort',
    roomsSubtitle: 'Whether you want a private sanctuary...',
    amenitiesTitle: 'Everything You Need',
    amenities: [],
    reviewsTitle: 'Travelers Love Us',
    reviews: [],
    specialOfferTitle: '',
    specialOfferText: '',
    specialOfferCode: '',
    storyTitle: '',
    storyHeading: '',
    storyDescription: '',
    storyBullets: [],
    highlightsTitle: '',
    highlightsHeading: '',
    highlights: [],
    contactEmail: '',
    contactPhone: '',
    address: '',
    mapUrl: '',
    socialLinks: {
      instagram: '',
      facebook: '',
      whatsapp: '',
    }
  });

  const [newAmenity, setNewAmenity] = useState({ title: '', description: '', icon: '' });
  const [newReview, setNewReview] = useState({ name: '', role: '', comment: '', avatar: '' });
  const [newHighlight, setNewHighlight] = useState({ title: '', description: '' });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await axios.get('/api/settings');
      if (res.data) setSettings(res.data);
    } catch (error) {
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSubmitting(true);
    try {
      await axios.put('/api/settings', settings);
      toast.success('Settings updated successfully');
      fetchSettings();
    } catch (error) {
      toast.error('Update failed');
    } finally {
      setSubmitting(false);
    }
  };

  const addItem = (field: string, item: any, setItem: any) => {
    setSettings({ ...settings, [field]: [...(settings[field] || []), item] });
    setItem({ title: '', description: '', icon: '', name: '', role: '', comment: '', avatar: '' });
  };

  const removeItem = (field: string, index: number) => {
    const newList = [...settings[field]];
    newList.splice(index, 1);
    setSettings({ ...settings, [field]: newList });
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" /></div>;

  const tabs = [
    { id: 'hero', name: 'Hero & Stats', icon: Home },
    { id: 'about', name: 'Story & Highlights', icon: Info },
    { id: 'amenities', name: 'Amenities', icon: Sparkles },
    { id: 'reviews', name: 'Reviews', icon: Quote },
    { id: 'contact', name: 'Contact & Social', icon: Phone },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Full CMS Panel</h1>
          <p className="text-muted-foreground mt-1">Manage every word and image on your frontend website.</p>
        </div>
        <Button onClick={handleSave} disabled={submitting} className="font-bold px-8 py-6 text-lg shadow-xl shadow-primary/20">
          {submitting ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2" />}
          Save All Changes
        </Button>
      </div>

      <div className="flex overflow-x-auto gap-2 p-1 bg-muted rounded-2xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === tab.id 
              ? 'bg-background text-primary shadow-sm' 
              : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <tab.icon size={18} />
            {tab.name}
          </button>
        ))}
      </div>

      <div className="space-y-8">
        {activeTab === 'hero' && (
          <div className="grid gap-6 animate-in fade-in zoom-in-95 duration-300">
            <Card className="border-border/60 shadow-md">
              <CardHeader>
                <CardTitle>Hero Section</CardTitle>
                <CardDescription>Main headline and introductory text.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input value={settings.heroTitle} onChange={e => setSettings({...settings, heroTitle: e.target.value})} placeholder="Hero Title" />
                <Textarea value={settings.heroSubtitle} onChange={e => setSettings({...settings, heroSubtitle: e.target.value})} placeholder="Hero Subtitle" />
                <Input value={settings.offerText} onChange={e => setSettings({...settings, offerText: e.target.value})} placeholder="Offer Banner Text" />
              </CardContent>
            </Card>

            <Card className="border-border/60 shadow-md">
              <CardHeader>
                <CardTitle>Quick Statistics</CardTitle>
                <CardDescription>Floating stats on the homepage.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Starting Price</label>
                  <Input value={settings.stats.startingPrice} onChange={e => setSettings({...settings, stats: {...settings.stats, startingPrice: e.target.value}})} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Location</label>
                  <Input value={settings.stats.location} onChange={e => setSettings({...settings, stats: {...settings.stats, location: e.target.value}})} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Rating</label>
                  <Input value={settings.stats.rating} onChange={e => setSettings({...settings, stats: {...settings.stats, rating: e.target.value}})} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Community</label>
                  <Input value={settings.stats.community} onChange={e => setSettings({...settings, stats: {...settings.stats, community: e.target.value}})} />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="grid gap-6 animate-in fade-in zoom-in-95 duration-300">
            <Card>
              <CardHeader><CardTitle>Our Story</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <Input value={settings.storyTitle} onChange={e => setSettings({...settings, storyTitle: e.target.value})} placeholder="Story Section Title (e.g. Our Story)" />
                <Input value={settings.storyHeading} onChange={e => setSettings({...settings, storyHeading: e.target.value})} placeholder="Story Heading" />
                <Textarea value={settings.storyDescription} onChange={e => setSettings({...settings, storyDescription: e.target.value})} className="min-h-[150px]" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Highlights</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input value={newHighlight.title} onChange={e => setNewHighlight({...newHighlight, title: e.target.value})} placeholder="Highlight Title" />
                  <Input value={newHighlight.description} onChange={e => setNewHighlight({...newHighlight, description: e.target.value})} placeholder="Short Description" />
                </div>
                <Button onClick={() => addItem('highlights', newHighlight, setNewHighlight)} variant="secondary"><Plus className="mr-2"/> Add Highlight</Button>
                <div className="grid gap-4">
                  {settings.highlights.map((h: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                      <div>
                        <p className="font-bold">{h.title}</p>
                        <p className="text-sm text-muted-foreground">{h.description}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => removeItem('highlights', i)}><Trash2 size={16}/></Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'amenities' && (
          <Card className="animate-in fade-in zoom-in-95 duration-300">
            <CardHeader><CardTitle>Features & Amenities</CardTitle></CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-dashed rounded-2xl bg-muted/30">
                <Input value={newAmenity.title} onChange={e => setNewAmenity({...newAmenity, title: e.target.value})} placeholder="Amenity Title (e.g. 24/7 Security)" />
                <Input value={newAmenity.description} onChange={e => setNewAmenity({...newAmenity, description: e.target.value})} placeholder="Description" />
                <Button onClick={() => addItem('amenities', newAmenity, setNewAmenity)} className="md:col-span-2">Add Amenity</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {settings.amenities.map((a: any, i: number) => (
                  <div key={i} className="p-4 border border-border rounded-xl flex justify-between items-start">
                    <div>
                      <p className="font-bold">{a.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">{a.description}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="text-destructive" onClick={() => removeItem('amenities', i)}><Trash2 size={16}/></Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'reviews' && (
          <Card className="animate-in fade-in zoom-in-95 duration-300">
            <CardHeader><CardTitle>Customer Reviews</CardTitle></CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-dashed rounded-2xl bg-muted/30">
                <Input value={newReview.name} onChange={e => setNewReview({...newReview, name: e.target.value})} placeholder="Reviewer Name" />
                <Input value={newReview.role} onChange={e => setNewReview({...newReview, role: e.target.value})} placeholder="Role (e.g. Digital Nomad)" />
                <Textarea value={newReview.comment} onChange={e => setNewReview({...newReview, comment: e.target.value})} placeholder="The Review..." className="md:col-span-2" />
                <Input value={newReview.avatar} onChange={e => setNewReview({...newReview, avatar: e.target.value})} placeholder="Avatar URL (optional)" className="md:col-span-2" />
                <Button onClick={() => addItem('reviews', newReview, setNewReview)} className="md:col-span-2">Add Review</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {settings.reviews.map((r: any, i: number) => (
                  <div key={i} className="p-6 border border-border rounded-2xl relative group">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {r.name[0]}
                      </div>
                      <div>
                        <p className="font-bold">{r.name}</p>
                        <p className="text-xs text-muted-foreground">{r.role}</p>
                      </div>
                    </div>
                    <p className="text-sm italic text-muted-foreground line-clamp-3">"{r.comment}"</p>
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removeItem('reviews', i)}><Trash2 size={16}/></Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'contact' && (
          <div className="grid gap-6 animate-in fade-in zoom-in-95 duration-300">
            <Card>
              <CardHeader><CardTitle>Contact Information</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-muted-foreground">Contact Email</label>
                    <Input value={settings.contactEmail} onChange={e => setSettings({...settings, contactEmail: e.target.value})} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-muted-foreground">Contact Phone</label>
                    <Input value={settings.contactPhone} onChange={e => setSettings({...settings, contactPhone: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Office Address</label>
                  <Textarea value={settings.address} onChange={e => setSettings({...settings, address: e.target.value})} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Social Presence</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-muted-foreground tracking-widest flex items-center gap-2"><Share2 size={14}/> Instagram</label>
                  <Input value={settings.socialLinks.instagram} onChange={e => setSettings({...settings, socialLinks: {...settings.socialLinks, instagram: e.target.value}})} placeholder="URL" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-muted-foreground tracking-widest flex items-center gap-2"><Share2 size={14}/> Facebook</label>
                  <Input value={settings.socialLinks.facebook} onChange={e => setSettings({...settings, socialLinks: {...settings.socialLinks, facebook: e.target.value}})} placeholder="URL" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-muted-foreground tracking-widest flex items-center gap-2"><Share2 size={14}/> WhatsApp</label>
                  <Input value={settings.socialLinks.whatsapp} onChange={e => setSettings({...settings, socialLinks: {...settings.socialLinks, whatsapp: e.target.value}})} placeholder="Number" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
