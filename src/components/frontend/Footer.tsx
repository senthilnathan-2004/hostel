'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Mail, Phone, MapPin, Globe, Camera, MessageCircle } from 'lucide-react';

export default function Footer() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get('/api/settings');
        if (res.data) setSettings(res.data);
      } catch (error) {
        console.error('Failed to load footer settings');
      }
    };
    fetchSettings();
  }, []);

  const contact = {
    email: settings?.contactEmail || 'hello@hostelconnect.com',
    phone: settings?.contactPhone || '+91 98765 43210',
    address: settings?.address || '123 Travel Street, Backpackers District, City',
  };

  return (
    <footer className="bg-black text-white pt-20 pb-10 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand & Mission */}
          <div className="md:col-span-4 space-y-6">
            <Link href="/" className="text-3xl font-extrabold tracking-tighter text-white flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">H</span>
              </div>
              <span>Star<span className="text-primary">MensPG</span></span>
            </Link>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              We provide modern, safe, and social living spaces for travelers and students. Your perfect home away from home.
            </p>
            <div className="flex gap-3">
              <SocialLink icon={<Camera size={18}/>} href={settings?.socialLinks?.instagram || '#'} />
              <SocialLink icon={<Globe size={18}/>} href={settings?.socialLinks?.facebook || '#'} />
              <SocialLink icon={<MessageCircle size={18}/>} href={settings?.socialLinks?.whatsapp || '#'} />
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/60">Explore</h4>
            <ul className="space-y-3">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/rooms">Our Rooms</FooterLink>
              <FooterLink href="/gallery">Gallery</FooterLink>
              <FooterLink href="/about">About Us</FooterLink>
            </ul>
          </div>

          {/* Support */}
          <div className="md:col-span-2 space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/60">Support</h4>
            <ul className="space-y-3">
              <FooterLink href="/contact">Contact Us</FooterLink>
              <FooterLink href="/faq">FAQs</FooterLink>
              <FooterLink href="/terms">Terms of Service</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/60">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                <MapPin className="text-primary shrink-0" size={20} />
                <span className="text-sm text-gray-400">{contact.address}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Phone size={18} />
                  </div>
                  <span className="text-sm font-medium text-gray-200">{contact.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Mail size={18} />
                  </div>
                  <span className="text-sm font-medium text-gray-200 truncate">{contact.email.split('@')[0]}...</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-medium">
          <p>&copy; {new Date().getFullYear()} Star Mens PG. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
            <Link href="/sitemap" className="hover:text-primary transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-sm text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group">
        <span className="w-0 h-0.5 bg-primary group-hover:w-2 transition-all duration-300 rounded-full" />
        {children}
      </Link>
    </li>
  );
}

function SocialLink({ icon, href }: { icon: any; href: string }) {
  return (
    <Link href={href} className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all duration-300 border border-white/10">
      {icon}
    </Link>
  );
}
