import React, { useState, useRef } from 'react';
import { Maximize2, Images, ChevronLeft, ChevronRight, Sparkles, Grid } from 'lucide-react';

export default function EventCard({ event, onPhotoClick, onViewAllClick }) {
  const photos = event.photos || [];
  const hasPhotos = photos.length > 0;
  const partners = event.partners || [];
  const hasPartners = partners.length > 0;

  // Mobile carousel state
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef(null);

  // Update slide index on scroll
  const handleScroll = () => {
    if (!carouselRef.current || !photos.length) return;
    const { scrollLeft, clientWidth } = carouselRef.current;
    if (clientWidth > 0) {
      const index = Math.round(scrollLeft / (clientWidth * 0.85));
      setActiveSlide(Math.min(Math.max(0, index), photos.length - 1));
    }
  };

  const scrollToSlide = (index) => {
    if (!carouselRef.current) return;
    const slideWidth = carouselRef.current.clientWidth * 0.85 + 12; // item width + gap
    carouselRef.current.scrollTo({
      left: index * slideWidth,
      behavior: 'smooth'
    });
    setActiveSlide(index);
  };

  const handleNextSlide = () => {
    const next = (activeSlide + 1) % photos.length;
    scrollToSlide(next);
  };

  const handlePrevSlide = () => {
    const prev = (activeSlide - 1 + photos.length) % photos.length;
    scrollToSlide(prev);
  };

  return (
    <article
      id={event.slug}
      className="event-card scroll-mt-28 bg-brand-cream rounded-3xl p-5 sm:p-7 md:p-8 border border-brand-grey-light hover:border-brand-green/30 transition-all duration-300 shadow-sm"
    >
      {/* 1. Event Header & Title */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6 pb-6 border-b border-brand-grey-light/70 text-left">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-[10px] font-mono font-semibold uppercase tracking-wider">
              <Sparkles size={11} />
              {event.category || 'EVENT'}
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">
            {event.name}
          </h2>
          {/* 2. Event Description */}
          {event.description && (
            <p className="text-xs sm:text-sm text-brand-grey leading-relaxed mt-2.5 font-sans">
              {event.description}
            </p>
          )}
        </div>

        {/* Photo Count Badge */}
        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          <span className="text-xs font-mono font-semibold text-brand-grey bg-brand-cream-soft px-3.5 py-1.5 rounded-full border border-brand-grey-light flex items-center gap-1.5 shadow-2xs">
            <Images size={14} className="text-brand-green" />
            {hasPhotos ? `${photos.length} ${photos.length === 1 ? 'Photo' : 'Photos'}` : 'Coming Soon'}
          </span>
        </div>
      </div>

      {/* 3. Event Image / Gallery Showcase */}
      {!hasPhotos ? (
        /* Empty State / Coming Soon */
        <div className="rounded-2xl border-2 border-dashed border-brand-grey-light bg-brand-cream-soft/50 py-12 px-6 text-center flex flex-col items-center justify-center mb-6">
          <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green mb-3">
            <Images size={22} />
          </div>
          <h4 className="font-serif text-base font-bold text-brand-dark mb-1">
            Photos Coming Soon
          </h4>
          <p className="text-xs text-brand-grey max-w-sm">
            Documentation photos for {event.name} will be uploaded soon.
          </p>
        </div>
      ) : (
        <div>
          {/* DESKTOP VIEW: Preview Grid with Uncropped Images */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
            {photos.slice(0, 4).map((photo, index) => (
              <div
                key={`${event.slug}-desktop-${index}`}
                onClick={() => onPhotoClick(event, index)}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-brand-cream-soft border border-brand-grey-light cursor-zoom-in shadow-2xs hover:shadow-md transition-all duration-300 p-2 flex items-center justify-center"
              >
                <img
                  src={photo}
                  alt={`${event.name} - Photo ${index + 1}`}
                  loading="lazy"
                  className="w-full h-full object-contain rounded-xl transition-transform duration-500 group-hover:scale-105"
                />
                {/* Hover overlay with zoom icon */}
                <div className="absolute inset-0 bg-brand-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none rounded-2xl">
                  <span className="bg-brand-cream text-brand-dark p-2.5 rounded-full shadow-lg transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <Maximize2 size={16} />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* MOBILE VIEW: Touch Swipe Carousel with Uncropped Images */}
          <div className="md:hidden mb-5">
            <div className="relative">
              <div
                ref={carouselRef}
                onScroll={handleScroll}
                className="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-1 -mx-1 px-1"
              >
                {photos.map((photo, index) => (
                  <div
                    key={`${event.slug}-mobile-carousel-${index}`}
                    onClick={() => onPhotoClick(event, index)}
                    className="snap-center shrink-0 w-[85%] aspect-[4/3] rounded-2xl overflow-hidden bg-brand-cream-soft border border-brand-grey-light cursor-zoom-in relative p-2 flex items-center justify-center shadow-xs"
                  >
                    <img
                      src={photo}
                      alt={`${event.name} - ${index + 1}`}
                      loading="lazy"
                      className="w-full h-full object-contain rounded-xl"
                    />
                    <div className="absolute bottom-3 right-3 bg-brand-dark/75 text-brand-cream px-2 py-0.5 rounded-full text-[10px] font-mono flex items-center gap-1 shadow-sm">
                      <Maximize2 size={10} />
                      {index + 1} / {photos.length}
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows for Mobile (if > 1 photo) */}
              {photos.length > 1 && (
                <div className="flex items-center justify-between mt-3 px-1">
                  <button
                    onClick={handlePrevSlide}
                    className="w-8 h-8 rounded-full bg-brand-cream border border-brand-grey-light text-brand-dark hover:text-brand-green flex items-center justify-center shadow-2xs active:scale-90 transition-all cursor-pointer"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  <span className="text-xs font-mono text-brand-grey font-semibold">
                    {activeSlide + 1} / {photos.length}
                  </span>

                  <button
                    onClick={handleNextSlide}
                    className="w-8 h-8 rounded-full bg-brand-cream border border-brand-grey-light text-brand-dark hover:text-brand-green flex items-center justify-center shadow-2xs active:scale-90 transition-all cursor-pointer"
                    aria-label="Next photo"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 4. Supported / Sponsored by: Single Unified Container */}
      {hasPartners && (
        <div className="mt-6 pt-5 border-t border-brand-grey-light/70 text-left">
          <span className="text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-wider text-brand-grey block mb-3">
            Supported & Sponsored by
          </span>
          <div className="bg-brand-cream-soft/90 border border-brand-grey-light/80 rounded-2xl p-4 sm:p-6 flex flex-wrap items-center gap-6 sm:gap-10">
            {partners.map((partner, pIdx) => (
              <div key={`${event.slug}-partner-${pIdx}`} className="flex items-center justify-center">
                <img
                  src={partner.src}
                  alt={partner.alt || `${partner.name} partner logo`}
                  className="h-10 sm:h-14 md:h-16 w-auto max-w-[140px] sm:max-w-[200px] object-contain filter contrast-[1.03] transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. CTA / Action */}
      {hasPhotos && (
        <div className="pt-4 flex justify-center md:justify-start">
          <button
            type="button"
            onClick={() => onViewAllClick(event)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-brand-green hover:text-brand-cream bg-brand-cream-soft hover:bg-brand-green border border-brand-grey-light hover:border-brand-green px-5 py-2.5 rounded-full shadow-2xs active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <Grid size={14} />
            <span>View All Photos ({photos.length})</span>
          </button>
        </div>
      )}
    </article>
  );
}
