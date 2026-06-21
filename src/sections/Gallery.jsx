import React, { useRef, useState, useEffect } from 'react';
import PlaceholderImage from '../components/PlaceholderImage';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Gallery() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

  // Mobile slider state
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const transitionTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    };
  }, []);

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
      title: 'Latihan Yoga Outdoor dengan Terpal Alas Matras Parama',
      category: 'Alas Matras Outdoor',
      imageSrc: '/gakeri1.jpg',
      gridClass: 'md:col-span-2 md:row-span-2'
    },
    {
      id: 2,
      title: 'Sesi Relaksasi Yoga dengan Alas Matras Waterproof Parama',
      category: 'Alas Matras Waterproof',
      imageSrc: '/galeri2.jpg',
      gridClass: 'md:col-span-1 md:row-span-1'
    },
    {
      id: 3,
      title: 'Retreat Yoga di Alam Terbuka Menggunakan Terpal Premium Parama',
      category: 'Terpal Premium',
      imageSrc: '/galeri3.jpg',
      gridClass: 'md:col-span-1 md:row-span-1'
    },
    {
      id: 4,
      title: 'Latihan Pernapasan Nyaman dengan Terpal Pelindung Matras Parama',
      category: 'Terpal Pelindung Matras',
      imageSrc: '/galeri4.jpg',
      gridClass: 'md:col-span-1 md:row-span-1'
    },
    {
      id: 5,
      title: 'Sesi Peregangan Pagi dengan Alas Matras Yoga Outdoor Parama',
      category: 'Alas Matras Yoga Outdoor',
      imageSrc: '/galeri5.jpg',
      gridClass: 'md:col-span-1 md:row-span-1'
    },
    {
      id: 6,
      title: 'Area Meditasi Bersih Menggunakan Terpal Alas Matras Parama',
      category: 'Terpal Alas Matras',
      imageSrc: '/galeri6.jpg',
      gridClass: 'md:col-span-1 md:row-span-2'
    },
    {
      id: 7,
      title: 'Piknik dan Yoga di Hutan Menggunakan Alas Matras Outdoor Parama',
      category: 'Alas Matras Outdoor',
      imageSrc: '/galeri7.jpg',
      gridClass: 'md:col-span-2 md:row-span-1'
    },
    {
      id: 8,
      title: 'Latihan Yoga Sunset Menenangkan dengan Terpal Premium Parama',
      category: 'Terpal Premium',
      imageSrc: '/galeri8.jpg',
      gridClass: 'md:col-span-2 md:row-span-1'
    },
    {
      id: 9,
      title: 'Meditasi Ketenangan Jiwa dengan Terpal Pelindung Matras Parama',
      category: 'Terpal Pelindung Matras',
      imageSrc: '/galeri9.jpg',
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
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => prev + 1);

    if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    transitionTimeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => prev - 1);

    if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    transitionTimeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  const handleTransitionEnd = () => {
    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(galleryItems.length);
    } else if (currentIndex === galleryItems.length + 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    }
    setIsAnimating(false);
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = null;
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
      className="py-20 md:py-28 bg-brand-cream border-t border-brand-grey-light overflow-hidden font-sans"
    >
      <div className="max-w-full md:max-w-[90%] w-full mx-auto px-4 md:px-12">
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
            <div className="relative px-6">
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
                        className="rounded-3xl overflow-hidden bg-brand-cream border border-brand-grey-light hover:border-brand-green/30 group relative flex flex-col justify-between shadow-sm"
                      >
                        {/* Actual Image */}
                        <div 
                          className="w-full aspect-[4/5] relative overflow-hidden bg-brand-cream cursor-zoom-in group/img flex items-center justify-center p-2"
                          onClick={() => setActiveImage(item.imageSrc)}
                        >
                          <img
                            src={item.imageSrc}
                            alt={item.title}
                            className="max-w-full max-h-full object-contain transition-transform duration-700 hover:scale-[1.02] rounded-2xl"
                            loading="lazy"
                          />
                          {/* Zoom Icon overlay */}
                          <div className="absolute inset-0 bg-brand-dark/20 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                            <span className="bg-brand-cream text-brand-dark p-2.5 rounded-full shadow-lg">
                              <Maximize2 size={16} />
                            </span>
                          </div>
                        </div>

                        {/* Mobile Info Tag */}
                        <div className="p-4 bg-brand-cream border-t border-brand-grey-light flex flex-col items-start text-left">
                          <span className="text-[9px] uppercase tracking-wider font-semibold text-brand-dark-soft">
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
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {galleryItems.map((item) => (
                <div
                  key={item.id}
                  className="gallery-item-desktop break-inside-avoid mb-6 rounded-3xl overflow-hidden bg-brand-cream-soft border border-brand-grey-light hover:border-brand-green/30 group relative flex flex-col justify-between cursor-zoom-in"
                  onClick={() => setActiveImage(item.imageSrc)}
                >
                  {/* Actual Image */}
                  <div className="w-full relative overflow-hidden bg-brand-cream-soft">
                    <img
                      src={item.imageSrc}
                      alt={item.title}
                      className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                      loading="lazy"
                    />

                    {/* Premium overlay visible on hover */}
                    <div className="absolute inset-0 bg-brand-dark/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-between justify-between flex-col p-6 pointer-events-none">
                      <div className="flex justify-end w-full">
                        <span className="bg-brand-cream/90 text-brand-dark p-2.5 rounded-full shadow-lg">
                          <Maximize2 size={16} />
                        </span>
                      </div>
                      <div className="text-left text-brand-cream translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                        <span className="text-[10px] tracking-widest uppercase font-semibold text-brand-cream-soft block mb-1">
                          {item.category}
                        </span>
                        <h4 className="font-serif text-base font-bold text-brand-cream">
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

      {/* Image popup Modal overlay */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-dark/85 backdrop-blur-sm p-4 cursor-pointer"
          onClick={() => setActiveImage(null)}
        >
          <div 
            className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl bg-brand-cream border border-brand-grey-light shadow-2xl p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeImage}
              alt="Expanded view of Parama Gallery"
              className="w-full h-auto max-h-[85vh] object-contain rounded-2xl"
            />
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 bg-brand-dark/70 text-brand-cream hover:bg-brand-green p-2 rounded-full transition-all duration-300 shadow-md active:scale-95 cursor-pointer z-10"
              aria-label="Close image popup"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
