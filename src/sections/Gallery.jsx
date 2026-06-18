import React, { useRef, useState, useEffect } from 'react';
import PlaceholderImage from '../components/PlaceholderImage';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Gallery() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Mobile slider state
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useGSAP(() => {
    if (!isMobile) {
      // Scroll reveal for the gallery cards (only on desktop)
      gsap.fromTo('.gallery-item-desktop',
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
          },
          clearProps: 'all'
        }
      );
    }
  }, { scope: containerRef, dependencies: [isMobile] });

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

  // Extended items for infinite loop slider on mobile
  const extendedGalleryItems = [
    galleryItems[galleryItems.length - 1],
    ...galleryItems,
    galleryItems[0]
  ];

  const handleNext = () => {
    if (!isTransitioning) return;
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (!isTransitioning) return;
    setCurrentIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(galleryItems.length);
    } else if (currentIndex === galleryItems.length + 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    }
  };

  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

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
          {isMobile ? (
            <div className="relative px-8">
              {/* Slider Viewport */}
              <div className="overflow-hidden w-full">
                <div
                  className="flex"
                  style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                    transition: isTransitioning ? 'transform 500ms cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
                  }}
                  onTransitionEnd={handleTransitionEnd}
                >
                  {extendedGalleryItems.map((item, idx) => (
                    <div
                      key={`${item.id}-${idx}`}
                      className="w-full shrink-0 px-2"
                    >
                      <div
                        className="rounded-3xl overflow-hidden bg-brand-cream-soft border border-brand-grey-light hover:border-brand-green/30 group relative flex flex-col justify-between"
                      >
                        {/* Image Placeholder */}
                        <div className="w-full relative overflow-hidden aspect-video">
                          <PlaceholderImage
                            text={item.placeholderText}
                            aspect="aspect-video"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Mobile Info Tag */}
                        <div className="p-4 bg-brand-cream border-t border-brand-grey-light flex flex-col items-start text-left">
                          <span className="text-[9px] uppercase tracking-wider font-semibold text-brand-green">
                            {item.category}
                          </span>
                          <h4 className="text-xs font-bold text-brand-dark mt-0.5">
                            {item.title}
                          </h4>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons for Mobile Slider */}
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-brand-cream border border-brand-grey-light hover:border-brand-green text-brand-dark hover:text-brand-green flex items-center justify-center shadow-md active:scale-90 transition-all cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-brand-cream border border-brand-grey-light hover:border-brand-green text-brand-dark hover:text-brand-green flex items-center justify-center shadow-md active:scale-90 transition-all cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 md:grid-rows-2 gap-6 md:h-[600px] lg:h-[700px] xl:h-[800px]">
              {galleryItems.map((item) => (
                <div
                  key={item.id}
                  className={`gallery-item-desktop rounded-3xl overflow-hidden bg-brand-cream-soft border border-brand-grey-light hover:border-brand-green/30 group relative flex flex-col justify-between ${item.gridClass}`}
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
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
