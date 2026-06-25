import React, { useRef } from 'react';
import Button from '../components/Button';
import { Instagram, Send, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function CTA() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Fade up block on scroll
    gsap.fromTo('.cta-box',
      { opacity: 0, scale: 0.96, y: 35 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.95,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        },
        clearProps: 'all'
      }
    );
  }, { scope: containerRef });

  return (
    <section
      id="contact"
      ref={containerRef}
      className="py-20 md:py-24 bg-brand-cream border-t border-brand-grey-light overflow-hidden"
    >
      <div className="max-w-[90%] w-full mx-auto px-6 md:px-12">
        <div className="cta-box bg-brand-green text-brand-cream rounded-3xl p-8 md:p-16 text-center max-w-5xl mx-auto relative overflow-hidden shadow-2xl border border-brand-green-light">
          {/* Background decorative circles */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-brand-green-light/20 rounded-full filter blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-brand-green-dark/30 rounded-full filter blur-3xl pointer-events-none"></div>

          {/* Content */}
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-brand-cream/60 bg-brand-green-dark/40 px-4 py-1.5 rounded-full mb-6">
              Connect With Us
            </span>

            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight mb-6 max-w-2xl leading-tight">
              Ready to Elevate Your Outdoor Yoga Experience?
            </h2>

            <p className="text-sm md:text-base text-brand-cream/90 mb-10 max-w-xl leading-relaxed">
              Create a cleaner and more comfortable space for every practice with Parama grounding sheets.
            </p>

            {/* CTA Buttons Grid */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto">
              <a
                href="https://wa.me/6281294924003" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-brand-cream text-brand-dark hover:bg-brand-cream-soft font-sans font-medium text-xs md:text-sm tracking-wider uppercase transition-all duration-300 shadow-md hover:-translate-y-0.5 active:scale-[0.98]"
              >
                <Send size={16} className="text-brand-green animate-pulse" />
                <span>Contact Us</span>
              </a>

              <a
                href="#products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full border border-brand-cream/40 bg-transparent text-brand-cream hover:bg-brand-cream/10 font-sans font-medium text-xs md:text-sm tracking-wider uppercase transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
              >
                <span>View Products</span>
              </a>

              <a
                href="https://www.instagram.com/parama.wellness"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-brand-dark text-brand-cream hover:bg-brand-dark-soft font-sans font-medium text-xs md:text-sm tracking-wider uppercase transition-all duration-300 shadow-md hover:-translate-y-0.5 active:scale-[0.98]"
              >
                <Instagram size={18} />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
