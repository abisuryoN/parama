import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Instagram, Send, X, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Monitor scroll height to reveal the floating button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animating menu expansion
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(menuRef.current, 
        { opacity: 0, y: 15, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'power2.out' }
      );
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 font-sans">
      {/* Expanded Menu Options */}
      {isOpen && (
        <div 
          ref={menuRef}
          className="bg-brand-dark/95 backdrop-blur-md border border-brand-grey/30 rounded-2xl p-4 shadow-2xl w-60 text-brand-cream flex flex-col gap-2"
        >
          <div className="pb-2 border-b border-brand-grey/20 mb-1 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-cream/60">Contact Us</span>
            <span className="text-[10px] bg-brand-green/80 text-brand-cream px-2 py-0.5 rounded-full font-medium">Online</span>
          </div>

          <a 
            href="https://www.instagram.com/parama.wellness" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-brand-green transition-colors duration-200 group text-sm"
          >
            <div className="flex items-center gap-2.5">
              <Instagram size={18} className="text-brand-cream group-hover:scale-110 transition-transform duration-200" />
              <span>Instagram</span>
            </div>
            <ArrowUpRight size={14} className="opacity-40 group-hover:opacity-100 transition-opacity" />
          </a>

          <a 
            href="https://www.threads.net/@parama.wellness" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-brand-green transition-colors duration-200 group text-sm"
          >
            <div className="flex items-center gap-2.5">
              <span className="font-bold text-base select-none leading-none group-hover:scale-110 transition-transform duration-200">@</span>
              <span>Threads</span>
            </div>
            <ArrowUpRight size={14} className="opacity-40 group-hover:opacity-100 transition-opacity" />
          </a>

          <a 
            href="https://wa.me/6281294924003" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-brand-green transition-colors duration-200 group text-sm"
          >
            <div className="flex items-center gap-2.5">
              <MessageCircle size={18} className="text-brand-cream group-hover:scale-110 transition-transform duration-200" />
              <span>WhatsApp Chat</span>
            </div>
            <ArrowUpRight size={14} className="opacity-40 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>
      )}

      {/* Primary Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-brand-green text-brand-cream rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-brand-green-light transition-all duration-300 hover:scale-105 active:scale-95 group relative border border-brand-green-light"
        aria-label="Open contact actions"
      >
        <span className="absolute -inset-1 rounded-full bg-brand-green/20 animate-ping opacity-75 group-hover:opacity-0 transition-opacity duration-300"></span>
        
        {isOpen ? (
          <X size={22} className="rotate-0 transition-transform duration-300" />
        ) : (
          <MessageCircle size={24} className="transition-transform duration-300 group-hover:rotate-12" />
        )}
      </button>
    </div>
  );
}
