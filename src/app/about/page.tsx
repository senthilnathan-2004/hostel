import React from 'react';
import Image from 'next/image';
import { CheckCircle2, Heart, Users, Globe } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className=" pb-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="/common.png"
          alt="About Our Hostel"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6">Our <span className="text-primary">Story</span></h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Built by travelers, for travelers. We believe in affordable luxury and meaningful connections.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white dark:bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-8">More Than Just a <span className="text-primary">Place to Sleep</span></h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                HostelConnect was born in 2020 out of a passion for backpacking and a desire to create a sanctuary where comfort meets community. We saw a gap between overpriced hotels and underwhelming hostels, and we set out to fill it.
              </p>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                Our mission is to provide high-quality, secure, and social accommodation that empowers travelers to explore the world without breaking the bank. We are committed to sustainability, local integration, and fostering a global family.
              </p>
              <div className="space-y-4">
                {[
                  'Community-driven events every week',
                  'Environmentally conscious operations',
                  'Locally sourced food and staff',
                  'Safe and inclusive environment for everyone'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[500px] rounded-[2rem] overflow-hidden shadow-2xl">
              <Image
                src="/hero.png"
                alt="Our Community"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-24 bg-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Hostel <span className="text-primary">Highlights</span></h2>
            <p className="text-gray-400 text-lg">What makes us stand out from the rest.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Heart,
                title: 'Passionate Staff',
                desc: 'Our team consists of seasoned travelers who know exactly what you need for a great stay.'
              },
              {
                icon: Users,
                title: 'Global Community',
                desc: 'Meet people from over 100+ countries and share stories over our communal dinners.'
              },
              {
                icon: Globe,
                title: 'Prime Locations',
                desc: 'All our hostels are located in the heart of the city, steps away from major attractions.'
              }
            ].map((highlight, idx) => (
              <div key={idx} className="bg-white/5 p-10 rounded-[2rem] border border-white/10 hover:border-primary/50 transition-colors">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-8">
                  <highlight.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{highlight.title}</h3>
                <p className="text-gray-400 leading-relaxed">{highlight.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
