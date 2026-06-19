import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight, Home, ShoppingBag, Image, MessageCircle, Info, Sparkles, MessageSquare, Phone } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const containerRef = useRef(null);

  const [activeSection, setActiveSection] = useState('home');

  // Monitor scroll state for styling updates & Scroll Spy
  useEffect(() => {
    const handleScroll = () => {
      // Scrolled styling check
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Scroll Spy check
      const sections = ['about', 'products', 'gallery', 'why-us', 'testimonials', 'contact'];
      let currentSection = 'home';

      if (window.scrollY < 120) {
        setActiveSection('home');
        return;
      }

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160) {
            currentSection = sectionId;
          }
        }
      }
      setActiveSection(currentSection);
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
    { label: 'About Us', href: '#about' },
    { label: 'Our Product', href: '#products' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Advantages', href: '#why-us' },
    { label: 'Testimonial', href: '#testimonials' },
  ];

  return (
    <>
      <header
        ref={containerRef}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled
          ? 'bg-brand-cream/85 backdrop-blur-md py-4 shadow-sm border-b border-brand-grey-light'
          : 'bg-transparent py-6'
          }`}
      >
        <div className="max-w-[90%] w-full mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="nav-item flex items-center gap-2 group">
            <img
              src="/logo.png"
              alt="PARAMA Logo"
              className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-serif text-xl font-bold tracking-tight text-brand-dark group-hover:text-brand-green transition-colors duration-300">
              PARAMA
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const linkSection = link.href.replace('#', '') || 'home';
              const isActive = activeSection === linkSection;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`nav-item text-xs uppercase tracking-wider font-bold transition-all duration-300 py-1.5 px-3.5 rounded-full ${
                    isActive
                      ? 'bg-brand-green text-brand-cream shadow-sm scale-105'
                      : 'text-brand-dark/70 hover:text-brand-green hover:bg-brand-green/5'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <a
              href="#contact"
              className={`nav-item inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-full transition-all duration-300 shadow-sm ${
                activeSection === 'contact'
                  ? 'bg-brand-green text-brand-cream scale-105'
                  : 'bg-brand-dark text-brand-cream hover:bg-brand-green'
              }`}
            >
              Contact Us
              <ArrowUpRight size={13} />
            </a>
          </nav>

          {/* Mobile Navigation Toggle */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden nav-item text-brand-dark hover:text-brand-green transition-colors focus:outline-none cursor-pointer"
            aria-label="Open Menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-brand-dark/40 backdrop-blur-sm md:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Navigation Drawer (Right to Left Slide) */}
      <div 
        className={`fixed top-0 right-0 bottom-0 w-[280px] bg-brand-cream z-50 md:hidden flex flex-col p-6 shadow-2xl border-l border-brand-grey-light/30 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center pb-4 border-b border-brand-grey-light/35 mb-6">
          <span className="font-serif text-lg font-bold text-brand-dark">Menu</span>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-brand-dark hover:text-brand-green p-1 transition-colors focus:outline-none cursor-pointer"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col gap-3 text-left">
          {navLinks.map((link) => {
            const linkSection = link.href.replace('#', '') || 'home';
            const isActive = activeSection === linkSection;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-sm font-bold transition-all duration-300 py-2.5 px-4 rounded-xl flex items-center justify-between ${
                  isActive
                    ? 'bg-brand-green text-brand-cream shadow-sm'
                    : 'text-brand-dark/80 hover:text-brand-green hover:bg-brand-green/5'
                }`}
              >
                <span>{link.label}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-brand-cream"></span>}
              </a>
            );
          })}
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className={`inline-flex items-center justify-center gap-2 font-semibold uppercase text-xs tracking-wider py-3 px-5 rounded-full mt-4 shadow-sm transition-all duration-300 ${
              activeSection === 'contact'
                ? 'bg-brand-green text-brand-cream scale-105'
                : 'bg-brand-dark text-brand-cream hover:bg-brand-green'
            }`}
          >
            Contact Us
            <ArrowUpRight size={14} />
          </a>
        </nav>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="fixed bottom-5 left-4 right-4 z-40 bg-brand-cream/80 backdrop-blur-lg border border-brand-grey-light/50 rounded-2xl shadow-xl shadow-brand-dark/10 md:hidden overflow-hidden">
        <div className="flex items-center gap-1.5 py-2 px-2.5 overflow-x-auto no-scrollbar scroll-smooth w-full">
          <a 
            href="#" 
            className={`flex-shrink-0 flex flex-col items-center gap-1 transition-all duration-300 py-1.5 px-3 rounded-xl text-[9px] font-bold uppercase tracking-wider ${
              activeSection === 'home'
                ? 'bg-brand-green text-brand-cream shadow-sm scale-105'
                : 'text-brand-dark/70 hover:text-brand-green hover:bg-brand-green/5'
            }`}
          >
            <Home size={18} />
            <span>Home</span>
          </a>
          <a 
            href="#about" 
            className={`flex-shrink-0 flex flex-col items-center gap-1 transition-all duration-300 py-1.5 px-3 rounded-xl text-[9px] font-bold uppercase tracking-wider ${
              activeSection === 'about'
                ? 'bg-brand-green text-brand-cream shadow-sm scale-105'
                : 'text-brand-dark/70 hover:text-brand-green hover:bg-brand-green/5'
            }`}
          >
            <Info size={18} />
            <span>About</span>
          </a>
          <a 
            href="#products" 
            className={`flex-shrink-0 flex flex-col items-center gap-1 transition-all duration-300 py-1.5 px-3 rounded-xl text-[9px] font-bold uppercase tracking-wider ${
              activeSection === 'products'
                ? 'bg-brand-green text-brand-cream shadow-sm scale-105'
                : 'text-brand-dark/70 hover:text-brand-green hover:bg-brand-green/5'
            }`}
          >
            <ShoppingBag size={18} />
            <span>Product</span>
          </a>
          <a 
            href="#gallery" 
            className={`flex-shrink-0 flex flex-col items-center gap-1 transition-all duration-300 py-1.5 px-3 rounded-xl text-[9px] font-bold uppercase tracking-wider ${
              activeSection === 'gallery'
                ? 'bg-brand-green text-brand-cream shadow-sm scale-105'
                : 'text-brand-dark/70 hover:text-brand-green hover:bg-brand-green/5'
            }`}
          >
            <Image size={18} />
            <span>Gallery</span>
          </a>
          <a 
            href="#why-us" 
            className={`flex-shrink-0 flex flex-col items-center gap-1 transition-all duration-300 py-1.5 px-3 rounded-xl text-[9px] font-bold uppercase tracking-wider ${
              activeSection === 'why-us'
                ? 'bg-brand-green text-brand-cream shadow-sm scale-105'
                : 'text-brand-dark/70 hover:text-brand-green hover:bg-brand-green/5'
            }`}
          >
            <Sparkles size={18} />
            <span>Advantages</span>
          </a>
          <a 
            href="#testimonials" 
            className={`flex-shrink-0 flex flex-col items-center gap-1 transition-all duration-300 py-1.5 px-3 rounded-xl text-[9px] font-bold uppercase tracking-wider ${
              activeSection === 'testimonials'
                ? 'bg-brand-green text-brand-cream shadow-sm scale-105'
                : 'text-brand-dark/70 hover:text-brand-green hover:bg-brand-green/5'
            }`}
          >
            <MessageSquare size={18} />
            <span>Testimonial</span>
          </a>
          <a 
            href="#contact" 
            className={`flex-shrink-0 flex flex-col items-center gap-1 transition-all duration-300 py-1.5 px-3 rounded-xl text-[9px] font-bold uppercase tracking-wider ${
              activeSection === 'contact'
                ? 'bg-brand-green text-brand-cream shadow-sm scale-105'
                : 'text-brand-dark/70 hover:text-brand-green hover:bg-brand-green/5'
            }`}
          >
            <Phone size={18} />
            <span>Contact</span>
          </a>
          <a 
            href="https://wa.me/6281294924003" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex flex-col items-center gap-1 text-brand-dark/70 hover:text-brand-green transition-colors py-1.5 px-3 rounded-xl text-[9px] font-semibold uppercase tracking-wider"
          >
            <MessageCircle size={18} />
            <span>Chat</span>
          </a>
          <button 
            onClick={() => setIsOpen(true)}
            className="flex-shrink-0 flex flex-col items-center gap-1 text-brand-dark/70 hover:text-brand-green transition-colors py-1.5 px-3 rounded-xl text-[9px] font-semibold uppercase tracking-wider focus:outline-none cursor-pointer"
          >
            <Menu size={18} />
            <span>Menu</span>
          </button>
        </div>
      </div>
    </>
  );
}
