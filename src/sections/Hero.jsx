import React, { useRef } from 'react';
import Button from '../components/Button';
import PlaceholderImage from '../components/PlaceholderImage';
import { ArrowRight } from 'lucide-react';
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

      <div className="max-w-[90%] w-full mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-x-12 lg:gap-x-16 gap-y-6 lg:gap-y-8 items-center">
        {/* Hero Header Block */}
        <div className="col-span-1 lg:col-span-7 flex flex-col items-start text-left z-10 order-1">
          <div className="hero-text inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-cream-soft border border-brand-grey-light mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></span>
            <span className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-brand-green">
              Premium Outdoor Yoga Grounding Sheet
            </span>
          </div>

          <h1 className="hero-text font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-brand-dark leading-[1.15]">
            Premium Outdoor <br />
            <span className="text-brand-green italic font-medium">Yoga Grounding Sheet</span>
          </h1>
        </div>

        {/* Mockup Column */}
        <div className="col-span-1 lg:col-span-5 lg:row-span-2 w-full flex items-center justify-center relative order-2">
          <div className="hero-visual relative w-full max-w-md lg:max-w-none">
            {/* Elegant wellness shadow card wrapper */}
            <div className="absolute -inset-4 bg-brand-green/5 rounded-3xl filter blur-xl transform rotate-2 pointer-events-none"></div>

            {/* Main Visual */}
            <div className="relative overflow-hidden rounded-2xl aspect-[3/4] shadow-2xl border border-brand-grey-light bg-brand-cream-soft">
              <img
                src="/hero1.jpg"
                alt="Parama Outdoor Yoga Grounding Sheet | Alas Matras Yoga Outdoor Premium"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="eager"
              />
            </div>
          </div>
        </div>

        {/* Description & CTA Block */}
        <div className="col-span-1 lg:col-span-7 flex flex-col items-start text-left z-10 order-3">
          <div className="hero-text space-y-4 mb-8">
            <p className="text-sm md:text-base text-brand-grey font-serif italic leading-relaxed">
              We believe that every outdoor yoga practice deserves a clean, comfortable, and worry-free foundation.
            </p>
            <p className="text-xs md:text-sm text-brand-grey leading-relaxed">
              Born from the simple challenges of practicing yoga outdoors, wet grass, damp surfaces, dirt, and uneven ground, Parama was created as a practical solution to help protect your yoga mat wherever your journey takes you.
            </p>
            <p className="text-xs md:text-sm text-brand-grey leading-relaxed">
              Our grounding sheets are lightweight, easy to fold, waterproof, and designed to fit seamlessly into your outdoor yoga routine. Whether you're practicing in a park, garden, beach, or open field, Parama helps create a cleaner space between your mat and the ground beneath it.
            </p>
            <p className="text-xs md:text-sm text-brand-grey leading-relaxed">
              More than just a protective layer, Parama is a companion for mindful movement, connection with nature, and meaningful moments shared through outdoor practice.
            </p>
            <p className="text-xs md:text-sm font-semibold text-brand-dark leading-relaxed">
              Simple. Practical. Made for Every Outdoor Flow.
            </p>
            <p className="text-xs md:text-sm font-bold text-brand-green font-mono">
              Let's #GroundingWithParama
            </p>
          </div>

          <div className="hero-text flex flex-wrap gap-4 items-center">
            <Button href="#contact" variant="primary" className="flex items-center gap-2">
              Contact Us <ArrowRight size={16} />
            </Button>
            <Button href="#products" variant="white">
              Our Product
            </Button>
          </div>
        </div>
      </div>

    </section>
  );
}
