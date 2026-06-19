import React, { useRef } from 'react';
import Button from '../components/Button';
import PlaceholderImage from '../components/PlaceholderImage';
import { ArrowRight, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Fade up staggered animation for text content
    gsap.fromTo('.hero-text',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power4.out', delay: 0.1, clearProps: 'all' }
    );

    // Fade and slide in for the image mock-up
    gsap.fromTo('.hero-visual',
      { opacity: 0, x: 40, scale: 0.95 },
      { opacity: 1, x: 0, scale: 1, duration: 1.2, ease: 'power3.out', delay: 0.3, clearProps: 'all' }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] md:min-h-screen flex items-center pt-28 pb-16 md:py-24 overflow-hidden bg-brand-cream"
    >
      {/* Decorative background gradients */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-green/5 rounded-full filter blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-brand-cream-soft rounded-full filter blur-[120px] pointer-events-none"></div>

      <div className="max-w-[90%] w-full mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Copy Column */}
        <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
          <div className="hero-text inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-cream-soft border border-brand-grey-light mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></span>
            <span className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-brand-green">
              Premium Outdoor Yoga Grounding Sheet
            </span>
          </div>

          <h1 className="hero-text font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-brand-dark leading-[1.1] mb-6">
            Grounding Sheet for <br />
            <span className="text-brand-green italic font-medium">Better Outdoor Practice</span>
          </h1>

          <p className="hero-text text-sm md:text-base text-brand-grey max-w-xl mb-3">
            Stay comfortable, clean, and connected with nature wherever your yoga journey takes you.
          </p>

          <p className="hero-text text-xs md:text-sm text-brand-grey max-w-xl mb-8 leading-relaxed">
            We believe that every outdoor yoga practice deserves a clean, comfortable, and worry-free foundation. Born from the simple challenges of practicing yoga outdoors, Parama was created to help protect your yoga mat from wet grass, damp surfaces, dirt, and uneven ground. Lightweight, foldable, waterproof, and easy to carry, Parama helps create a cleaner and more comfortable outdoor yoga experience.
          </p>

          <div className="hero-text flex flex-wrap gap-4 items-center">
            <Button href="#contact" variant="primary" className="flex items-center gap-2">
              Contact Us <ArrowRight size={16} />
            </Button>
            <Button href="#products" variant="secondary">
              Our Product
            </Button>
          </div>
        </div>

        {/* Mockup Column */}
        <div className="lg:col-span-5 w-full flex items-center justify-center relative">
          <div className="hero-visual relative w-full max-w-md lg:max-w-none">
            {/* Elegant wellness shadow card wrapper */}
            <div className="absolute -inset-4 bg-brand-green/5 rounded-3xl filter blur-xl transform rotate-2 pointer-events-none"></div>

            {/* Main Visual */}
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3] shadow-2xl border border-brand-grey-light bg-brand-cream-soft">
              <img
                src="/black.jpg"
                alt="Parama Premium Grounding Sheet"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Accent tag detailing tech spec */}
            <div className="absolute -bottom-4 -right-4 bg-brand-dark text-brand-cream p-4 rounded-2xl shadow-xl border border-brand-grey/30 hidden sm:flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-brand-green/20 flex items-center justify-center text-brand-green">
                <span className="font-bold text-sm">190</span>
              </div>
              <div className="text-left">
                <p className="text-[10px] text-brand-cream/50 uppercase tracking-widest font-semibold">Perfect Fit</p>
                <p className="text-xs font-bold font-mono">190 cm × 75 cm</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Down arrow link indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-opacity duration-300">
        <span className="text-[10px] uppercase tracking-widest font-semibold">Explore More</span>
        <ChevronDown size={16} className="animate-bounce" />
      </div>
    </section>
  );
}
