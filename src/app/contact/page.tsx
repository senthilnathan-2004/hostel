"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, MessageCircle, Send, Globe, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('/api/contact', formData);
      toast.success("Message sent! We'll get back to you soon.");
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-10 pb-20">
      <div className="bg-secondary py-16 md:py-24 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Get in <span className="text-primary">Touch</span></h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have questions? We're here to help. Reach out to us via any of the channels below.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { icon: Phone, title: 'Call Us', value: '+91 98765 43210', sub: 'Mon-Sun: 9am - 10pm' },
                  { icon: Mail, title: 'Email Us', value: 'hello@hostelconnect.com', sub: 'Response within 24 hours' },
                  { icon: MapPin, title: 'Visit Us', value: '123 Travel Street', sub: 'Backpackers District, City' },
                  { icon: Globe, title: 'Follow Us', value: '@hostelconnect', sub: 'Instagram, Facebook, Twitter' }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{item.title}</h4>
                      <p className="text-foreground font-medium">{item.value}</p>
                      <p className="text-sm text-muted-foreground">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-67 rounded-[2rem] overflow-hidden border border-border shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.28586321689!2d80.2223456758832!3d13.082680187243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266946399a9a3%3A0xc481c19b0a1d48c9!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1714571234567!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="border-none shadow-2xl rounded-[2rem] overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-3xl font-bold mb-8">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name</label>
                      <Input 
                        placeholder="John Doe" 
                        className="h-12 rounded-xl bg-gray-50 dark:bg-white/5 border-none" 
                        required 
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email Address</label>
                      <Input 
                        type="email" 
                        placeholder="john@example.com" 
                        className="h-12 rounded-xl bg-gray-50 dark:bg-white/5 border-none" 
                        required 
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Subject</label>
                    <Input 
                      placeholder="Booking Query" 
                      className="h-12 rounded-xl bg-gray-50 dark:bg-white/5 border-none" 
                      value={formData.subject}
                      onChange={e => setFormData({...formData, subject: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message</label>
                    <Textarea
                      placeholder="Tell us what you're looking for..."
                      className="min-h-[200px] rounded-xl bg-gray-50 dark:bg-white/5 border-none resize-none"
                      required
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                    />
                  </div>
                  <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 text-white py-8 text-lg rounded-xl transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-primary/20">
                    {loading ? <Loader2 className="animate-spin mr-2" /> : <Send className="w-5 h-5 mr-2" />}
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
