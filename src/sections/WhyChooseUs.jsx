import React, { useRef } from 'react';
import { ShieldCheck, Droplets, Sparkles, Compass, Layers, Heart, Wind, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function WhyChooseUs() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Reveal cards on scroll
    gsap.fromTo('.why-card',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        clearProps: 'all'
      }
    );
  }, { scope: containerRef });

  const reasons = [
    {
      icon: <Droplets size={28} className="text-brand-green" />,
      title: 'Water-Resistant Protection',
      description: 'Completely waterproof to prevent wet grass, morning dew, or damp sand from seeping into your yoga mat.'
    },
    {
      icon: <Wind size={28} className="text-brand-green" />,
      title: 'Lightweight & Portable',
      description: 'Extremely lightweight and compact to carry alongside your yoga mat.'
    },
    {
      icon: <Layers size={28} className="text-brand-green" />,
      title: 'Easy to Fold',
      description: 'Designed for quick folding and effortless storage in your gym or carry bag.'
    },
    {
      icon: <Sparkles size={28} className="text-brand-green" />,
      title: 'Easy to Clean',
      description: 'Dirt, soil, and dust can be easily wiped away with a damp cloth.'
    },
    {
      icon: <Compass size={28} className="text-brand-green" />,
      title: 'Outdoor Ready',
      description: 'Built to perform on any outdoor surface, from parks and beaches to gardens.'
    },
    {
      icon: <ShieldCheck size={28} className="text-brand-green" />,
      title: 'Comfortable Practice',
      description: 'Provides a clean and even barrier between your premium mat and the natural ground.'
    },
    {
      icon: <Zap size={28} className="text-brand-green" />,
      title: 'Durable Material',
      description: 'Made with premium, high-quality materials and strong stitching for long-lasting use.'
    },
    {
      icon: <Heart size={28} className="text-brand-green" />,
      title: 'Designed for Yoga & Outdoor',
      description: 'Specifically crafted to support outdoor yoga, meditation retreats, and wellness events.'
    }
  ];

  return (
    <section
      id="why-us"
      ref={containerRef}
      className="py-20 md:py-28 bg-brand-cream border-t border-brand-grey-light overflow-hidden"
    >
      <div className="max-w-[90%] w-full mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-green">Benefits</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-brand-dark mt-2">
            Benefits
          </h2>
          <div className="w-16 h-1 bg-brand-green mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Reason Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {reasons.map((reason, idx) => (
            <div
              key={idx}
              className="why-card p-8 rounded-3xl bg-brand-cream-soft border border-brand-grey-light hover:border-brand-green/30 hover:shadow-lg transition-all duration-300 group text-left flex flex-col justify-between"
            >
              <div>
                {/* Icon Container */}
                <div className="w-14 h-14 rounded-2xl bg-brand-cream border border-brand-grey-light flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
                  {reason.icon}
                </div>

                {/* Title */}
                <h3 className="font-serif text-lg font-bold text-brand-dark mb-3">
                  {reason.title}
                </h3>

                {/* Description */}
                <p className="text-xs md:text-sm text-brand-grey leading-relaxed">
                  {reason.description}
                </p>
              </div>

              {/* Small accent detail at bottom */}
              <div className="w-8 h-1 bg-brand-green/20 group-hover:w-16 transition-all duration-500 rounded-full mt-6"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
