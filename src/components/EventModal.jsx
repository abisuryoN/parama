import React, { useEffect } from 'react';
import { X, Images, Maximize2 } from 'lucide-react';

export default function EventModal({
  isOpen,
  event,
  onClose,
  onPhotoClick
}) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !event) return null;

  const photos = event.photos || [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-brand-dark/85 backdrop-blur-md p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-brand-cream rounded-3xl border border-brand-grey-light shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 sm:py-5 border-b border-brand-grey-light bg-brand-cream-soft/80 text-left">
          <div>
            <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-brand-green block mb-0.5">
              {event.category || 'EVENT DOCUMENTATION'}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-dark">
              {event.name}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-semibold text-brand-grey bg-brand-cream px-3 py-1 rounded-full border border-brand-grey-light flex items-center gap-1.5 shadow-2xs">
              <Images size={13} className="text-brand-green" />
              {photos.length} {photos.length === 1 ? 'Photo' : 'Photos'}
            </span>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-brand-cream hover:bg-brand-green hover:text-brand-cream border border-brand-grey-light text-brand-dark flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer shadow-2xs"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Grid: 3 Photos Per Row */}
        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto max-h-[calc(90vh-140px)]">
          {photos.length === 0 ? (
            <div className="py-16 text-center text-brand-grey">
              <p className="font-serif text-base text-brand-dark mb-1">No Photos Available Yet</p>
              <p className="text-xs">Event documentation will be uploaded soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2 sm:gap-3.5 md:gap-4">
              {photos.map((photo, idx) => (
                <div
                  key={`${event.slug}-modal-${idx}`}
                  onClick={() => onPhotoClick?.(event, idx)}
                  className="group relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-brand-cream-soft border border-brand-grey-light cursor-zoom-in flex items-center justify-center p-1 sm:p-1.5 shadow-2xs hover:shadow-md transition-all duration-300"
                >
                  <img
                    src={photo}
                    alt={`${event.name} - Photo ${idx + 1}`}
                    loading="lazy"
                    className="w-full h-full object-contain rounded-lg sm:rounded-xl transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-brand-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-xl pointer-events-none">
                    <span className="bg-brand-cream text-brand-dark p-2 rounded-full shadow-md">
                      <Maximize2 size={14} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 sm:px-7 py-3.5 border-t border-brand-grey-light bg-brand-cream-soft/60 flex items-center justify-between text-xs text-brand-grey">
          <span className="font-mono text-[11px]">Click any photo to view in full size</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-brand-dark text-brand-cream hover:bg-brand-green transition-colors text-xs font-semibold uppercase tracking-wider cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
