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
      title: 'Outdoor Yoga Flow',
      category: 'Outdoor Yoga',
      imageSrc: '/gakeri1.jpg',
      gridClass: 'md:col-span-2 md:row-span-2'
    },
    {
      id: 2,
      title: 'Nature Connection',
      category: 'Nature Connection',
      imageSrc: '/galeri2.jpg',
      gridClass: 'md:col-span-1 md:row-span-1'
    },
    {
      id: 3,
      title: 'Tranquil Retreat',
      category: 'Yoga Retreat',
      imageSrc: '/galeri3.jpg',
      gridClass: 'md:col-span-1 md:row-span-1'
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
      <div className="max-w-[90%] w-full mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-green">Gallery</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-brand-dark mt-2">
            Wellness in Nature
          </h2>
          <p className="text-xs md:text-sm text-brand-grey mt-3 max-w-lg mx-auto">
            Explore the tranquil moments of outdoor flow, connection, and mindful movement with Parama.
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
                        {/* Actual Image */}
                        <div className="w-full relative overflow-hidden aspect-video bg-brand-cream-soft">
                          <img
                            src={item.imageSrc}
                            alt={item.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
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
                  {/* Actual Image */}
                  <div className="w-full h-full relative overflow-hidden bg-brand-cream-soft">
                    <img
                      src={item.imageSrc}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Premium overlay visible on hover */}
                    <div className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <div className="text-left text-brand-cream translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                        <span className="text-[10px] tracking-widest uppercase font-semibold text-brand-green block mb-1">
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
