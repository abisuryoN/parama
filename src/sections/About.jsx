import React, { useRef } from 'react';
import { Shield, Sparkles, Droplets, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function About() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    // Title reveal
    gsap.fromTo('.about-title',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-title',
          start: 'top 85%',
        },
        clearProps: 'all'
      }
    );

    // Left content text block fade-in
    gsap.fromTo('.about-content',
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-content',
          start: 'top 80%',
        },
        clearProps: 'all'
      }
    );

    // Highlight cards stagger animation
    gsap.fromTo('.about-card',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-grid',
          start: 'top 80%',
        },
        clearProps: 'all'
      }
    );
  }, { scope: sectionRef });

  const features = [
    {
      icon: <Droplets className="text-brand-green" size={24} />,
      title: 'Waterproof Protection',
      description: 'Keeps wet grass and damp soil from seeping through to your mat, keeping your space dry.'
    },
    {
      icon: <Zap className="text-brand-green" size={24} />,
      title: 'Lightweight & Portable',
      description: 'Extremely easy to roll, fold, and carry to any outdoor setting or daily practice.'
    },
    {
      icon: <Sparkles className="text-brand-green" size={24} />,
      title: 'Comfortable Ground Layer',
      description: 'Provides a clean, flat, and stable surface between your mat and nature.'
    },
    {
      icon: <Shield className="text-brand-green" size={24} />,
      title: 'Durable Material',
      description: 'Premium build designed for long-lasting outdoor use and terrain resistance.'
    }
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 md:py-28 bg-brand-cream border-t border-brand-grey-light overflow-hidden"
    >
      <div className="max-w-[90%] w-full mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="about-title text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-green">About Us</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-brand-dark mt-2">
            About Parama
          </h2>
          <div className="w-16 h-1 bg-brand-green mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Brand Story Column */}
          <div className="about-content lg:col-span-6 text-left">
            {/* English Version */}
            <div className="space-y-5 mb-10">
              <p className="text-sm md:text-base text-brand-grey leading-relaxed">
                We believe that every outdoor yoga practice deserves a clean, comfortable, and worry-free foundation.
              </p>
              <p className="text-xs md:text-sm text-brand-grey leading-relaxed">
                Born from the simple challenges of practicing yoga outdoors—wet grass, damp surfaces, dirt, and uneven ground—Parama was created as a practical solution to help protect your yoga mat wherever your journey takes you.
              </p>
              <p className="text-xs md:text-sm text-brand-grey leading-relaxed">
                Our grounding sheets are lightweight, easy to fold, waterproof, and designed to fit seamlessly into your outdoor yoga routine.
              </p>
              <p className="text-xs md:text-sm text-brand-grey leading-relaxed">
                Whether you're practicing in a park, garden, beach, or open field, Parama helps create a cleaner space between your mat and the ground beneath it.
              </p>
              <p className="text-xs md:text-sm text-brand-grey leading-relaxed">
                More than just a protective layer, Parama is a companion for mindful movement, connection with nature, and meaningful moments shared through outdoor practice.
              </p>
              <p className="text-xs md:text-sm text-brand-grey font-medium leading-relaxed">
                Simple. Practical. Made for every outdoor flow.
              </p>
              <p className="text-xs md:text-sm font-bold text-brand-green font-mono">
                Let's #GroundingWithParama
              </p>
            </div>

            {/* Indonesian Version */}
            <div className="border-t border-brand-grey-light/50 pt-10 mt-10 space-y-4 opacity-95">
              <p className="text-[11px] md:text-xs text-brand-grey leading-relaxed">
                Kami percaya bahwa setiap sesi yoga outdoor layak dilakukan dengan nyaman, bersih, dan tanpa rasa khawatir.
              </p>
              <p className="text-[11px] md:text-xs text-brand-grey/80 leading-relaxed">
                Berawal dari pengalaman sederhana saat berlatih yoga di alam terbuka—rumput yang basah, permukaan yang lembap, tanah yang kotor, hingga kondisi lapangan yang tidak selalu ideal—Parama hadir sebagai solusi praktis untuk membantu melindungi matras yoga Anda.
              </p>
              <p className="text-[11px] md:text-xs text-brand-grey/80 leading-relaxed">
                Grounding sheet Parama dirancang agar ringan, mudah dilipat, tahan air, dan praktis dibawa ke mana saja.
              </p>
              <p className="text-[11px] md:text-xs text-brand-grey/80 leading-relaxed">
                Baik digunakan di taman, lapangan, pantai, maupun ruang terbuka lainnya, Parama membantu menciptakan lapisan pelindung antara matras dan permukaan di bawahnya.
              </p>
              <p className="text-[11px] md:text-xs text-brand-grey/80 leading-relaxed">
                Lebih dari sekadar alas tambahan, Parama hadir untuk mendukung pengalaman yoga outdoor yang lebih nyaman, lebih tenang, dan lebih dekat dengan alam.
              </p>
              <p className="text-[11px] md:text-xs text-brand-grey/80 font-medium leading-relaxed">
                Sederhana. Praktis. Siap menemani setiap sesi yoga outdoor Anda.
              </p>
              <p className="text-[11px] md:text-xs font-bold text-brand-green/80 font-mono">
                Let's #GroundingWithParama
              </p>
            </div>

            {/* Quote block */}
            <div className="border-l-4 border-brand-green pl-6 py-2 bg-brand-cream-soft rounded-r-xl mt-10">
              <p className="italic text-xs text-brand-dark font-medium leading-relaxed">
                "A protective layer between your yoga mat and outdoor surfaces, helping keep your practice cleaner and more comfortable."
              </p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-brand-green mt-2 font-mono">
                — Let's #GroundingWithParama
              </p>
            </div>
          </div>

          {/* Highlights Grid Column */}
          <div className="lg:col-span-6">
            <div className="about-grid grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="about-card p-6 rounded-2xl bg-brand-cream-soft border border-brand-grey-light hover:border-brand-green/35 hover:shadow-lg transition-all duration-300 group text-left"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-cream border border-brand-grey-light flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <h4 className="font-serif text-base font-bold text-brand-dark mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-brand-grey leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
