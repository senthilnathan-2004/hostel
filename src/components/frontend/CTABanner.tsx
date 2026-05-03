'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Gift, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

export default function CTABanner() {
  const [settings, setSettings] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get('/api/settings');
        if (res.data) setSettings(res.data);
      } catch (error) {
        console.error('Failed to load CTA settings');
      }
    };
    fetchSettings();
  }, []);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success('Promo code copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const title = settings?.specialOfferTitle || 'Special Offer: 20% Off for Long Stays!';
  const text = settings?.specialOfferText || 'Book for 7 days or more and get an exclusive discount.';
  const code = settings?.specialOfferCode || 'TRAVELER20';

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="bg-primary rounded-[3rem] p-8 md:p-16 text-white text-center space-y-8 relative overflow-hidden shadow-2xl shadow-primary/30">
          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Gift size={32} className="animate-bounce" />
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              {title}
            </h2>
            <p className="text-xl text-white/80">
              {text}
            </p>
            
            <div className="pt-4">
              <div className="inline-flex items-center gap-4 bg-white/20 backdrop-blur-md p-2 pl-6 rounded-2xl border border-white/30">
                <span className="font-mono text-2xl font-bold tracking-[0.2em]">{code}</span>
                <button 
                  onClick={() => copyCode(code)}
                  className="bg-white text-primary p-3 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  {copied ? <Check size={24} /> : <Copy size={24} />}
                </button>
              </div>
              <p className="mt-4 text-sm text-white/60">Use code at checkout</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
