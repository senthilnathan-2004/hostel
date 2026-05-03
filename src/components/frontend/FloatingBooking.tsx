"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Bed } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingBooking() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 md:hidden w-[90%]"
        >
          <Link href="/rooms">
            <Button className="w-full bg-primary hover:bg-primary/90 text-white py-8 rounded-2xl shadow-2xl shadow-primary/30 text-xl font-bold flex items-center justify-center gap-3">
              <Bed className="w-6 h-6" />
              Book Now
            </Button>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
