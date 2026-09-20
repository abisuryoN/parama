import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function EventLightbox({
  isOpen,
  eventName,
  photos = [],
  currentIndex = 0,
  onClose,
  onNext,
  onPrev
}) {
  // Lock body scroll while lightbox is active
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
      } else if (e.key === 'ArrowRight') {
        onNext?.();
      } else if (e.key === 'ArrowLeft') {
        onPrev?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onNext, onPrev, onClose]);

  if (!isOpen || !photos.length) return null;

  const currentPhoto = photos[currentIndex] || photos[0];
  const hasMultiple = photos.length > 1;

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-brand-dark/95 backdrop-blur-md p-3 sm:p-6 transition-all duration-300 select-none"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative max-w-5xl w-full max-h-[95vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="w-full flex items-center justify-between text-brand-cream py-2.5 px-2 sm:px-4 mb-2">
          <div className="flex flex-col text-left">
            <span className="text-[10px] sm:text-xs uppercase tracking-widest font-mono text-brand-green-light font-semibold">
              Event Documentation
            </span>
            <h3 className="font-serif text-base sm:text-xl font-bold text-brand-cream">
              {eventName}
            </h3>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {hasMultiple && (
              <span className="text-xs font-mono bg-brand-dark-soft text-brand-cream/80 px-3 py-1 rounded-full border border-brand-grey/20">
                {currentIndex + 1} / {photos.length}
              </span>
            )}
            <button
              onClick={onClose}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-dark-soft hover:bg-brand-green border border-brand-grey/30 text-brand-cream flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer"
              aria-label="Close photo preview"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Main Image Frame (object-contain, uncropped) */}
        <div className="relative w-full max-h-[78vh] flex items-center justify-center overflow-hidden rounded-2xl bg-brand-dark/50 border border-brand-grey/20 shadow-2xl p-1.5 sm:p-2">
          <img
            key={currentPhoto}
            src={currentPhoto}
            alt={`${eventName} - Photo ${currentIndex + 1}`}
            className="w-full h-auto max-h-[75vh] object-contain rounded-xl"
          />

          {/* Left Arrow */}
          {hasMultiple && (
            <button
              onClick={onPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand-dark/80 hover:bg-brand-green text-brand-cream border border-brand-grey/30 flex items-center justify-center shadow-lg transition-all active:scale-90 cursor-pointer backdrop-blur-sm"
              aria-label="Previous photo"
            >
              <ChevronLeft size={22} />
            </button>
          )}

          {/* Right Arrow */}
          {hasMultiple && (
            <button
              onClick={onNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand-dark/80 hover:bg-brand-green text-brand-cream border border-brand-grey/30 flex items-center justify-center shadow-lg transition-all active:scale-90 cursor-pointer backdrop-blur-sm"
              aria-label="Next photo"
            >
              <ChevronRight size={22} />
            </button>
          )}
        </div>

        {/* Mobile Navigation Footer Bar */}
        {hasMultiple && (
          <div className="flex items-center justify-center gap-3 mt-3 sm:hidden">
            <button
              onClick={onPrev}
              className="px-4 py-1.5 rounded-full bg-brand-dark-soft text-brand-cream text-xs font-semibold flex items-center gap-1 border border-brand-grey/30 active:scale-95"
            >
              <ChevronLeft size={16} /> Prev
            </button>
            <span className="text-xs text-brand-cream/70 font-mono">
              {currentIndex + 1} of {photos.length}
            </span>
            <button
              onClick={onNext}
              className="px-4 py-1.5 rounded-full bg-brand-dark-soft text-brand-cream text-xs font-semibold flex items-center gap-1 border border-brand-grey/30 active:scale-95"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
