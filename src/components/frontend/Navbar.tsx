"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X, Home, Bed, Image as ImageIcon, Info, Phone, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Rooms', href: '/rooms', icon: Bed },
  { name: 'Gallery', href: '/gallery', icon: ImageIcon },
  { name: 'About', href: '/about', icon: Info },
  { name: 'Contact', href: '/contact', icon: Phone },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border/40 shadow-sm py-4 h-[72px] flex items-center">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-9 h-9 bg-primary flex items-center justify-center rounded-lg transform transition-transform group-hover:rotate-12">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-secondary">
              Hostel<span className="text-primary">Connect</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-semibold transition-all duration-200 hover:text-primary relative py-2",
                  pathname === item.href 
                    ? "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full" 
                    : "text-secondary/70 hover:text-primary"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/admin/login">
              <Button variant="ghost" size="sm" className="text-secondary font-medium hover:bg-primary/10 hover:text-primary">
                <User className="w-4 h-4 mr-2" />
                Admin
              </Button>
            </Link>
            <Link href="/rooms">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 shadow-md shadow-primary/20">
                Book Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-secondary hover:bg-gray-100 transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-[72px] bg-white z-40 md:hidden animate-in fade-in slide-in-from-right-10 duration-300">
          <div className="flex flex-col p-6 gap-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-4 text-lg font-bold p-4 rounded-xl transition-all",
                  pathname === item.href 
                    ? "bg-primary/10 text-primary" 
                    : "text-secondary hover:bg-gray-50"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            ))}
            <div className="mt-8 flex flex-col gap-4">
              <Link href="/rooms">
                <Button className="w-full bg-primary text-white h-14 text-lg font-bold rounded-xl shadow-lg shadow-primary/20">
                  Book Now
                </Button>
              </Link>
              <Link href="/admin/login">
                <Button variant="outline" className="w-full h-14 text-lg font-bold rounded-xl border-border">
                  <User className="w-5 h-5 mr-2" />
                  Admin Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
