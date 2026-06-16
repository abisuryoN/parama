import React, { useRef } from 'react';
import PlaceholderImage from '../components/PlaceholderImage';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Gallery() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Scroll reveal for the gallery cards
    gsap.fromTo('.gallery-item',
      { opacity: 0, scale: 0.95, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.gallery-wrapper',
          start: 'top 80%',
        }
      }
    );
  }, { scope: containerRef });

  const galleryItems = [
    {
      id: 1,
      title: 'Uji Lapisan Anti-Air',
      category: 'Kualitas Material',
      placeholderText: 'Water Droplets Testing on Green Canvas',
      gridClass: 'md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-2'
    },
    {
      id: 2,
      title: 'Detail Serat Terpal T-120',
      category: 'Tekstur Kain',
      placeholderText: 'Macro Weave Pattern Detail',
      gridClass: 'md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1'
    },
    {
      id: 3,
      title: 'Penggunaan Alas Kasur',
      category: 'Aplikasi Produk',
      placeholderText: 'Under Mattress Base Installation',
      gridClass: 'md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1'
    },
    {
      id: 4,
      title: 'Presisi Sambungan Welding',
      category: 'Detail Jahitan',
      placeholderText: 'High Frequency Welding Seamless Edge',
      gridClass: 'md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1'
    },
    {
      id: 5,
      title: 'Kemasan Gulungan Silinder',
      category: 'Pengiriman',
      placeholderText: 'Heavy Duty Roll Shipping Packaging',
      gridClass: 'md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-1'
    }
  ];

  return (
    <section 
      id="gallery" 
      ref={containerRef}
      className="py-20 md:py-28 bg-brand-cream border-t border-brand-grey-light overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-green">Galeri Visual</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-brand-dark mt-2">
            Detail Material & Penggunaan
          </h2>
          <p className="text-xs md:text-sm text-brand-grey mt-3 max-w-lg mx-auto">
            Melihat lebih dekat tenunan serat polyester, sambungan kedap air, serta penempatan terpal Parama di berbagai matras.
          </p>
          <div className="w-16 h-1 bg-brand-green mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Gallery Wrapper - Mobile Horizontal Scroll, Desktop Masonry Grid */}
        <div className="gallery-wrapper relative">
          <div className="flex md:grid md:grid-cols-3 md:grid-rows-2 gap-6 overflow-x-auto md:overflow-x-visible pb-8 md:pb-0 px-2 -mx-2 md:px-0 md:mx-0 snap-x snap-mandatory no-scrollbar">
            {galleryItems.map((item) => (
              <div 
                key={item.id}
                className={`gallery-item w-[80vw] sm:w-[320px] md:w-auto shrink-0 snap-center rounded-3xl overflow-hidden bg-brand-cream-soft border border-brand-grey-light hover:border-brand-green/30 group relative flex flex-col justify-between ${item.gridClass}`}
              >
                {/* Image Placeholder */}
                <div className="w-full h-full relative overflow-hidden">
                  <PlaceholderImage 
                    text={item.placeholderText} 
                    aspect={item.gridClass.includes('row-span-2') ? 'aspect-square md:aspect-auto md:h-full' : 'aspect-video md:aspect-auto md:h-full'}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Premium overlay visible on hover */}
                  <div className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="text-left text-brand-cream translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="text-[10px] tracking-widest uppercase font-semibold text-brand-green-light block mb-1">
                        {item.category}
                      </span>
                      <h4 className="font-serif text-base font-bold">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Mobile Info Tag - Hidden on Desktop */}
                <div className="p-4 bg-brand-cream border-t border-brand-grey-light md:hidden flex flex-col items-start text-left">
                  <span className="text-[9px] uppercase tracking-wider font-semibold text-brand-green">
                    {item.category}
                  </span>
                  <h4 className="text-xs font-bold text-brand-dark mt-0.5">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>

          {/* Swipe Indicator for Mobile */}
          <div className="flex md:hidden justify-center items-center gap-1.5 mt-2 text-brand-grey/50 text-[10px] uppercase tracking-wider font-semibold">
            <span>Geser untuk melihat detail visual</span>
            <span className="animate-pulse">→</span>
          </div>
        </div>
      </div>
    </section>
  );
}
