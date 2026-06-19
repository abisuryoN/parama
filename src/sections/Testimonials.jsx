import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, X } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomImage, setZoomImage] = useState(null);
  const cardRef = useRef(null);
  const reviews = [
    { image: '/testimoni1.jpg', alt: 'Testimonial 1' },
    { image: '/testimoni2.jpg', alt: 'Testimonial 2' },
    { image: '/testimoni3.jpg', alt: 'Testimonial 3' },
    { image: '/testimoni4.jpg', alt: 'Testimonial 4' },
    { image: '/testimoni5.jpg', alt: 'Testimonial 5' },
    { image: '/testimoni6.jpg', alt: 'Testimonial 6' },
    { image: '/testimoni7.jpg', alt: 'Testimonial 7' },
    { image: '/testimoni8.jpg', alt: 'Testimonial 8' },
    { image: '/testimoni9.jpg', alt: 'Testimonial 9' },
    { image: '/testimoni10.jpg', alt: 'Testimonial 10' }
  ];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  // GSAP animation on index update
  useGSAP(() => {
    gsap.fromTo(cardRef.current,
      { opacity: 0, scale: 0.98 },
      { opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out', clearProps: 'all' }
    );
  }, [activeIndex]);

  return (
    <section
      id="testimonials"
      className="py-20 md:py-28 bg-brand-cream-soft border-t border-brand-grey-light overflow-hidden font-sans"
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-green">Testimonial</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-brand-dark mt-2">
            What Our Community Says
          </h2>
          <div className="w-16 h-1 bg-brand-green mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Carousel container with side spacing for buttons */}
        <div className="relative max-w-[500px] w-full mx-auto px-12 sm:px-14">
          
          {/* Card Wrapper */}
          <div className="bg-brand-cream border border-brand-grey-light p-2.5 rounded-3xl shadow-xl shadow-brand-dark/5">
            {/* Testimonial Active Slide */}
            <div ref={cardRef} className="relative z-10 flex flex-col items-center justify-center">
              <div 
                onClick={() => setZoomImage(reviews[activeIndex].image)}
                className="relative w-full overflow-hidden rounded-2xl shadow-md cursor-zoom-in group transition-transform duration-300 hover:scale-[1.01]"
              >
                <img
                  src={reviews[activeIndex].image}
                  alt={reviews[activeIndex].alt}
                  className="w-full h-auto object-contain block"
                />
                {/* Hover overlay with zoom icon */}
                <div className="absolute inset-0 bg-brand-dark/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-brand-cream/90 flex items-center justify-center text-brand-dark shadow-md">
                    <ZoomIn size={20} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Slider navigation buttons (outside card wrapper) */}
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none px-1 sm:px-2">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-brand-cream border border-brand-grey-light hover:border-brand-green text-brand-dark hover:text-brand-green flex items-center justify-center cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 pointer-events-auto active:scale-90"
              aria-label="Previous review"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-brand-cream border border-brand-grey-light hover:border-brand-green text-brand-dark hover:text-brand-green flex items-center justify-center cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 pointer-events-auto active:scale-90"
              aria-label="Next review"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carousel indicators/dots */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${idx === activeIndex
                ? 'bg-brand-green w-6'
                : 'bg-brand-grey-light hover:bg-brand-grey'
                }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox / Zoom Modal */}
      {zoomImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-dark/90 backdrop-blur-sm p-4 cursor-pointer"
          onClick={() => setZoomImage(null)}
        >
          <div 
            className="relative max-w-4xl w-full max-h-[95vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setZoomImage(null)}
              className="absolute -top-12 right-0 text-brand-cream hover:text-brand-green p-2 transition-all duration-300 active:scale-95 cursor-pointer z-10"
              aria-label="Close zoom popup"
            >
              <X size={28} />
            </button>
            <img 
              src={zoomImage} 
              alt="Testimonial zoom preview" 
              className="max-w-full max-h-[85vh] md:max-h-[90vh] object-contain rounded-2xl shadow-2xl bg-white"
            />
          </div>
        </div>
      )}
    </section>
  );
}
