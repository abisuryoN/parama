import React from 'react';
import { Instagram, Send } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-brand-cream/80 pt-16 pb-24 md:pb-8 border-t border-brand-grey/20 font-sans">
      <div className="max-w-[90%] w-full mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 pb-12 border-b border-brand-grey/15">

        {/* Branding Column */}
        <div className="md:col-span-5 text-left flex flex-col items-start">
          <a href="#" className="flex items-center gap-2 group mb-5">
            <img
              src="/logo.png"
              alt="Parama Premium Yoga Mat Protection Layer | Terpal Yoga Premium Parama"
              className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-serif text-xl font-bold tracking-tight text-brand-cream group-hover:text-brand-green transition-colors duration-300">
              PARAMA
            </span>
          </a>
          <p className="text-xs md:text-sm text-brand-cream/60 leading-relaxed max-w-sm mb-6">
            PARAMA provides premium grounding sheets, designed to protect your yoga mat and enhance your outdoor practice.
          </p>
          <div className="flex gap-3">
            <a
              href="https://www.instagram.com/parama.wellness"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-brand-dark-soft border border-brand-grey/30 flex items-center justify-center text-brand-cream hover:bg-brand-green hover:border-brand-green transition-all duration-300 active:scale-95"
              aria-label="Instagram Link"
            >
              <Instagram size={16} />
            </a>
            <a
              href="https://www.threads.net/@parama.wellness"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-brand-dark-soft border border-brand-grey/30 flex items-center justify-center text-brand-cream hover:bg-brand-green hover:border-brand-green transition-all duration-300 active:scale-95 font-bold text-sm leading-none"
              aria-label="Threads Link"
            >
              @
            </a>
            <a
              href="https://wa.me/6281294924003"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-brand-dark-soft border border-brand-grey/30 flex items-center justify-center text-brand-cream hover:bg-brand-green hover:border-brand-green transition-all duration-300 active:scale-95"
              aria-label="WhatsApp Link"
            >
              <Send size={15} />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="md:col-span-3 text-left">
          <h4 className="text-xs uppercase tracking-widest font-bold text-brand-cream mb-5 border-l-2 border-brand-green pl-3">
            Navigation
          </h4>
          <ul className="flex flex-col gap-3 text-xs md:text-sm">
            <li>
              <a href="#about" className="hover:text-brand-green transition-colors duration-200">About Us</a>
            </li>
            <li>
              <a href="#products" className="hover:text-brand-green transition-colors duration-200">Our Product</a>
            </li>
            <li>
              <a href="#gallery" className="hover:text-brand-green transition-colors duration-200">Gallery</a>
            </li>
            <li>
              <a href="#why-us" className="hover:text-brand-green transition-colors duration-200">Benefits</a>
            </li>
            <li>
              <a href="#testimonials" className="hover:text-brand-green transition-colors duration-200">Testimonial</a>
            </li>
            <li>
              <a href="#faq" className="hover:text-brand-green transition-colors duration-200">FAQ</a>
            </li>
          </ul>
        </div>

        {/* Contact Info Column */}
        <div className="md:col-span-4 text-left">
          <h4 className="text-xs uppercase tracking-widest font-bold text-brand-cream mb-5 border-l-2 border-brand-green pl-3">
            Contact Us
          </h4>
          <ul className="flex flex-col gap-3 text-xs md:text-sm text-brand-cream/60">
            <li className="flex flex-col">
              <span className="text-[10px] text-brand-cream/40 uppercase tracking-wider font-semibold">Office Address</span>
              <span className="text-brand-cream/70 mt-0.5">Tajurhalang Kab Bogor, Indonesia</span>
            </li>
            <li className="flex flex-col">
              <span className="text-[10px] text-brand-cream/40 uppercase tracking-wider font-semibold">WhatsApp Chat</span>
              <a href="https://wa.me/6281294924003" className="text-brand-cream hover:text-brand-green transition-colors mt-0.5 font-mono">+62 812-9492-4003</a>
            </li>
            <li className="flex flex-col">
              <span className="text-[10px] text-brand-cream/40 uppercase tracking-wider font-semibold">Instagram DM</span>
              <a href="https://www.instagram.com/parama.wellness" target="_blank" rel="noopener noreferrer" className="text-brand-cream hover:text-brand-green transition-colors mt-0.5">@parama.wellness</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="max-w-[90%] w-full mx-auto px-6 md:px-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-cream/40 gap-4">
        <p>© {currentYear} PARAMA. All Rights Reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-brand-cream transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-brand-cream transition-colors">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
}
