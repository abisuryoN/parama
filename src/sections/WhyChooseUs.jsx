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
      title: 'Waterproof Protection',
      description: 'Fully impervious to moisture, preventing damp grass, morning dew, or wet sand from seeping through.'
    },
    {
      icon: <Wind size={28} className="text-brand-green" />,
      title: 'Lightweight & Portable',
      description: 'Extremely light and compact, allowing you to easily carry it along with your yoga mat.'
    },
    {
      icon: <Layers size={28} className="text-brand-green" />,
      title: 'Easy to Fold',
      description: 'Designed for quick folding and seamless packing, fitting easily into any standard gym or tote bag.'
    },
    {
      icon: <Sparkles size={28} className="text-brand-green" />,
      title: 'Easy to Clean',
      description: 'Dirt, grass, and mud wipe off effortlessly with a damp cloth, keeping maintenance quick and simple.'
    },
    {
      icon: <Compass size={28} className="text-brand-green" />,
      title: 'Outdoor Ready',
      description: 'Engineered to withstand various outdoor terrains, from soft lawns and beaches to rocky soil.'
    },
    {
      icon: <ShieldCheck size={28} className="text-brand-green" />,
      title: 'Comfortable Ground Layer',
      description: 'Creates a smooth and sanitary boundary between your premium yoga mat and the natural ground.'
    },
    {
      icon: <Zap size={28} className="text-brand-green" />,
      title: 'Durable Material',
      description: 'High-quality craftsmanship using tear-resistant fabrics to ensure long-lasting performance.'
    },
    {
      icon: <Heart size={28} className="text-brand-green" />,
      title: 'Designed for Yogis',
      description: 'Specifically created to support your outdoor flows, retreats, and mindfulness practices in nature.'
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
          <span className="text-xs font-bold uppercase tracking-widest text-brand-green">Advantages</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-brand-dark mt-2">
            Why Choose Parama
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
