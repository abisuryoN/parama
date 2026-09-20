import React, { useState, useEffect } from 'react';
import { events } from '../data/events';
import EventCard from '../components/EventCard';
import EventModal from '../components/EventModal';
import EventLightbox from '../components/EventLightbox';
import { Sparkles, Calendar, MessageCircle, ArrowUpRight } from 'lucide-react';

export default function EventPage() {
  // Modal for "View All Photos" (3 photos per row)
  const [modalEvent, setModalEvent] = useState(null);

  // Lightbox for fullscreen image viewing
  const [activeLightbox, setActiveLightbox] = useState({
    isOpen: false,
    event: null,
    photoIndex: 0
  });

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleOpenModal = (event) => {
    setModalEvent(event);
  };

  const handleCloseModal = () => {
    setModalEvent(null);
  };

  const handleOpenLightbox = (event, photoIndex) => {
    setActiveLightbox({
      isOpen: true,
      event,
      photoIndex
    });
  };

  const handleCloseLightbox = () => {
    setActiveLightbox((prev) => ({ ...prev, isOpen: false }));
  };

  const handleNextPhoto = () => {
    if (!activeLightbox.event) return;
    const total = activeLightbox.event.photos.length;
    setActiveLightbox((prev) => ({
      ...prev,
      photoIndex: (prev.photoIndex + 1) % total
    }));
  };

  const handlePrevPhoto = () => {
    if (!activeLightbox.event) return;
    const total = activeLightbox.event.photos.length;
    setActiveLightbox((prev) => ({
      ...prev,
      photoIndex: (prev.photoIndex - 1 + total) % total
    }));
  };

  return (
    <div className="pt-28 pb-20 md:pt-36 md:pb-28 bg-brand-cream text-brand-dark min-h-screen font-sans">
      <div className="max-w-[90%] w-full mx-auto px-4 sm:px-6 md:px-12">

        {/* Page Hero Header */}
        <header className="text-left max-w-3xl mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-[11px] font-mono font-semibold uppercase tracking-widest mb-4">
            <Sparkles size={13} />
            <span>Event Documentation</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-brand-dark tracking-tight leading-[1.15] mb-4">
            Yoga & Wellness <br className="hidden sm:inline" />
            <span className="text-brand-green italic font-medium">Events</span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-brand-grey leading-relaxed font-serif italic mb-3">
            Moments of mindful movement, outdoor yoga sessions, and community wellness gatherings grounded with Parama Terpal.
          </p>

          <p className="text-xs sm:text-sm text-brand-grey leading-relaxed font-sans">
            Every collaboration reflects our commitment to conscious living, nature connection, and worry-free practice on all outdoor terrains.
          </p>
        </header>

        {/* Quick Jump Pills */}
        <div className="mb-10 md:mb-14 pb-2.5 overflow-x-auto no-scrollbar flex items-center gap-2 border-b border-brand-grey-light/60">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-brand-grey mr-2 shrink-0 flex items-center gap-1.5">
            <Calendar size={13} />
            Events:
          </span>
          {events.map((evt) => (
            <a
              key={evt.slug}
              href={`#${evt.slug}`}
              className="shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-brand-cream-soft hover:bg-brand-green hover:text-brand-cream text-brand-dark/80 border border-brand-grey-light transition-all duration-200 shadow-2xs"
            >
              {evt.name}
            </a>
          ))}
        </div>

        {/* Event Cards List */}
        <section className="space-y-10 md:space-y-14">
          {events.map((event) => (
            <EventCard
              key={event.slug}
              event={event}
              onPhotoClick={handleOpenLightbox}
              onViewAllClick={handleOpenModal}
            />
          ))}
        </section>

        {/* Collaboration Banner CTA */}
        <div className="mt-20 md:mt-28 rounded-3xl bg-brand-green text-brand-cream p-8 sm:p-10 md:p-14 text-center relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-brand-green-light rounded-full opacity-20 filter blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 bg-brand-green-dark rounded-full opacity-30 filter blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-brand-cream/15 text-brand-cream text-[10px] font-mono font-semibold uppercase tracking-widest">
              Event Collaboration
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              Host Your Yoga Event with Parama
            </h3>
            <p className="text-xs sm:text-sm text-brand-cream/80 leading-relaxed font-sans max-w-xl mx-auto pb-2">
              We welcome partnerships with yoga studios, wellness communities, retreat organizers, and outdoor facilitators to bring protection and grounding comfort to your participants.
            </p>
            <div className="pt-2">
              <a
                href="https://wa.me/6281294924003?text=Hello%20Parama%2C%20I%20am%20interested%20in%20event%20collaboration%20with%20Parama."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand-cream text-brand-dark hover:bg-brand-cream-soft font-semibold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full shadow-lg transition-all duration-300 active:scale-95 cursor-pointer"
              >
                <MessageCircle size={16} className="text-brand-green" />
                <span>Contact Us for Collaboration</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* "View All Photos" Modal (3 Photos per Row) */}
      <EventModal
        isOpen={Boolean(modalEvent)}
        event={modalEvent}
        onClose={handleCloseModal}
        onPhotoClick={handleOpenLightbox}
      />

      {/* Fullscreen Photo Lightbox */}
      <EventLightbox
        isOpen={activeLightbox.isOpen}
        eventName={activeLightbox.event?.name}
        photos={activeLightbox.event?.photos}
        currentIndex={activeLightbox.photoIndex}
        onClose={handleCloseLightbox}
        onNext={handleNextPhoto}
        onPrev={handlePrevPhoto}
      />
    </div>
  );
}
