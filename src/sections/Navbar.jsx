import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const containerRef = useRef(null);

  // Monitor scroll state for styling updates
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Entrance Animation
  useGSAP(() => {
    gsap.fromTo('.nav-item', 
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
    );
  }, { scope: containerRef });

  const navLinks = [
    { label: 'Tentang Kami', href: '#about' },
    { label: 'Produk', href: '#products' },
    { label: 'Galeri', href: '#gallery' },
    { label: 'Keunggulan', href: '#why-us' },
    { label: 'Testimoni', href: '#testimonials' },
  ];

  return (
    <header 
      ref={containerRef}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-brand-cream/85 backdrop-blur-md py-4 shadow-sm border-b border-brand-grey-light' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="nav-item flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-brand-green flex items-center justify-center text-brand-cream font-bold text-lg select-none transition-transform duration-300 group-hover:rotate-12">
            P
          </div>
          <span className="font-serif text-xl font-bold tracking-tight text-brand-dark group-hover:text-brand-green transition-colors duration-300">
            Parama<span className="font-sans text-xs uppercase tracking-widest text-brand-green font-semibold ml-1.5">Terpal</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.label}
              href={link.href}
              className="nav-item text-xs uppercase tracking-wider font-semibold text-brand-dark/70 hover:text-brand-green transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a 
            href="#contact" 
            className="nav-item inline-flex items-center gap-1.5 bg-brand-dark text-brand-cream hover:bg-brand-green text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-full transition-colors duration-300 shadow-sm"
          >
            Hubungi Kami
            <ArrowUpRight size={13} />
          </a>
        </nav>

        {/* Mobile Navigation Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden nav-item text-brand-dark hover:text-brand-green transition-colors focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="fixed inset-0 top-[72px] bg-brand-cream/98 backdrop-blur-lg z-30 md:hidden flex flex-col p-8 border-t border-brand-grey-light">
          <nav className="flex flex-col gap-6 text-center mt-8">
            {navLinks.map((link) => (
              <a 
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-serif font-bold text-brand-dark hover:text-brand-green transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center gap-2 bg-brand-green text-brand-cream font-semibold uppercase text-sm tracking-wider py-4 rounded-xl mt-6 shadow-md"
            >
              Hubungi Kami
              <ArrowUpRight size={16} />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
