import React, { useRef } from 'react';
import { partnerLogos } from '../data/partners';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Partnership() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Header reveal
    gsap.fromTo('.partnership-header',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.partnership-header',
          start: 'top 85%',
        },
        clearProps: 'all'
      }
    );

    // Marquee container fade in
    gsap.fromTo('.partnership-marquee',
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.partnership-marquee',
          start: 'top 85%',
        },
        clearProps: 'all'
      }
    );

    // CTA Box reveal
    gsap.fromTo('.partnership-cta',
      { opacity: 0, scale: 0.97, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.partnership-cta',
          start: 'top 85%',
        },
        clearProps: 'all'
      }
    );
  }, { scope: containerRef });

  // Dynamically split logos evenly into 2 rows
  const midIndex = Math.ceil(partnerLogos.length / 2);
  const row1Logos = partnerLogos.slice(0, midIndex);
  const row2Logos = partnerLogos.slice(midIndex);

  return (
    <section
      id="partnership"
      ref={containerRef}
      className="py-20 md:py-28 bg-brand-cream border-t border-brand-grey-light overflow-hidden font-sans"
    >
      <div className="max-w-[90%] w-full mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <div className="partnership-header text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-green">
            Our Partners
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-brand-dark mt-2">
            OUR PARTNERS
          </h2>
          <p className="text-xs md:text-sm text-brand-grey mt-3 max-w-lg mx-auto">
            Growing together through meaningful collaboration.
          </p>
          <div className="w-16 h-1 bg-brand-green mx-auto mt-4 rounded-full"></div>
        </div>

        {/* 2-Row Infinite Marquee: Single Large Unified Background */}
        <div className="partnership-marquee marquee-pause relative w-full overflow-hidden bg-brand-cream-soft/90 border border-brand-grey-light rounded-3xl py-10 md:py-16 px-3 sm:px-6 md:px-8 shadow-xs">
          {/* Edge Fade Masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 md:w-44 bg-gradient-to-r from-brand-cream-soft to-transparent z-10"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 md:w-44 bg-gradient-to-l from-brand-cream-soft to-transparent z-10"></div>

          <div className="space-y-8 md:space-y-12">
            {/* ROW 1: Moves RIGHT → LEFT */}
            <div className="flex overflow-hidden select-none">
              <div className="animate-marquee-left flex items-center gap-12 sm:gap-16 md:gap-24 shrink-0 pr-12 sm:pr-16 md:pr-24">
                {/* Primary list */}
                {row1Logos.map((logo, idx) => (
                  <div
                    key={`r1-orig-${logo.id}-${idx}`}
                    className="flex items-center justify-center shrink-0"
                  >
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="h-14 sm:h-20 md:h-24 lg:h-28 w-auto max-w-[180px] sm:max-w-[220px] md:max-w-[280px] object-contain filter contrast-[1.03] transition-transform duration-300 hover:scale-108"
                      loading="lazy"
                    />
                  </div>
                ))}
                {/* Duplicated list for seamless loop */}
                {row1Logos.map((logo, idx) => (
                  <div
                    key={`r1-dup-${logo.id}-${idx}`}
                    className="flex items-center justify-center shrink-0"
                  >
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="h-14 sm:h-20 md:h-24 lg:h-28 w-auto max-w-[180px] sm:max-w-[220px] md:max-w-[280px] object-contain filter contrast-[1.03] transition-transform duration-300 hover:scale-108"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* ROW 2: Moves LEFT → RIGHT */}
            <div className="flex overflow-hidden select-none">
              <div className="animate-marquee-right flex items-center gap-12 sm:gap-16 md:gap-24 shrink-0 pr-12 sm:pr-16 md:pr-24">
                {/* Primary list */}
                {row2Logos.map((logo, idx) => (
                  <div
                    key={`r2-orig-${logo.id}-${idx}`}
                    className="flex items-center justify-center shrink-0"
                  >
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="h-14 sm:h-20 md:h-24 lg:h-28 w-auto max-w-[180px] sm:max-w-[220px] md:max-w-[280px] object-contain filter contrast-[1.03] transition-transform duration-300 hover:scale-108"
                      loading="lazy"
                    />
                  </div>
                ))}
                {/* Duplicated list for seamless loop */}
                {row2Logos.map((logo, idx) => (
                  <div
                    key={`r2-dup-${logo.id}-${idx}`}
                    className="flex items-center justify-center shrink-0"
                  >
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="h-14 sm:h-20 md:h-24 lg:h-28 w-auto max-w-[180px] sm:max-w-[220px] md:max-w-[280px] object-contain filter contrast-[1.03] transition-transform duration-300 hover:scale-108"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Partnership CTA Block */}
        <div className="partnership-cta bg-brand-green text-brand-cream rounded-3xl p-8 sm:p-10 md:p-14 text-center max-w-4xl mx-auto relative overflow-hidden shadow-xl border border-brand-green-light mt-14 md:mt-20">
          {/* Subtle Decorative Backdrop Elements */}
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-brand-green-light/20 rounded-full filter blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-brand-green-dark/30 rounded-full filter blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3 text-brand-cream leading-tight">
              INTERESTED IN COLLABORATING WITH US?
            </h3>

            <p className="text-xs sm:text-sm md:text-base text-brand-cream/85 mb-6 max-w-xl leading-relaxed">
              We’re open to new partnerships and opportunities to work together.
            </p>

            {/* Contact Information */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-8 text-xs sm:text-sm text-brand-cream/90">
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-brand-cream/60">
                  WhatsApp:
                </span>
                <a
                  href="https://wa.me/6285961080003"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-brand-cream hover:text-brand-cream-soft font-semibold transition-colors"
                >
                  0859 6108 0003
                </a>
              </div>
            </div>

            {/* CTA Button */}
            <a
              href="https://wa.me/6285961080003"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-brand-cream text-brand-dark hover:bg-brand-cream-soft font-sans font-medium text-xs md:text-sm tracking-wider uppercase transition-all duration-300 shadow-md hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
            >
              <span>LET’S COLLABORATE</span>
              <ArrowUpRight size={16} className="text-brand-green" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
