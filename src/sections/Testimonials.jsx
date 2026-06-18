import React, { useState, useEffect, useRef } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRef = useRef(null);
  const autoPlayRef = useRef(null);

  const reviews = [
    {
      name: 'Budi Santoso',
      role: 'Pengelola Kos Eksklusif, Jakarta',
      stars: 5,
      comment: 'Kami memesan 40 unit Parama Standard Shield (T-100) untuk seluruh kamar kos kami. Sangat ampuh mencegah lembap lantai naik ke kasur busa dan mempercepat pembersihan saat pergantian penyewa. Sangat direkomendasikan!'
    },
    {
      name: 'Dewi Sartika',
      role: 'Ibu Rumah Tangga, Bandung',
      stars: 5,
      comment: 'Terpal alas matras Parama sangat rapi, tebal, dan yang terpenting tidak berbau kimia menyengat. Sangat pas diletakkan di bawah spring bed anak-anak untuk menjaga kasur dari noda tumpahan susu atau air ompol.'
    },
    {
      name: 'Rian Wijaya',
      role: 'Pengelola Glamping & Resort, Bali',
      stars: 5,
      comment: 'Untuk matras outdoor di glamping resort kami, Parama Heavy Guard (T-120) adalah penyelamat. Bahannya tebal, tahan robekan gesekan dek kayu kasar, dan menjaga kasur tetap 100% kering meski hujan deras badai.'
    },
    {
      name: 'Hendra Kurniawan',
      role: 'Distributor Kasur & Ranjang, Surabaya',
      stars: 5,
      comment: 'Konsumen toko kami sangat puas dengan kualitas jahitannya yang rapi. Layanan Parama Terpal sangat responsif untuk pembuatan ukuran custom. Proses pengerjaan cepat dan pengiriman tergulung rapi tanpa cacat.'
    }
  ];

  // Auto-play interval
  useEffect(() => {
    autoPlayRef.current = nextSlide;
  });

  useEffect(() => {
    const play = () => {
      autoPlayRef.current();
    };
    const interval = setInterval(play, 6000); // Change slide every 6s
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  // GSAP animation on index update
  useGSAP(() => {
    gsap.fromTo(cardRef.current,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.55, ease: 'power2.out', clearProps: 'all' }
    );
  }, [activeIndex]);

  return (
    <section
      id="testimonials"
      className="py-20 md:py-28 bg-brand-cream-soft border-t border-brand-grey-light overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-green">Testimonial</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-brand-dark mt-2">
            Kata Pelanggan Kami
          </h2>
          <div className="w-16 h-1 bg-brand-green mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Carousel Card Wrapper */}
        <div className="relative bg-brand-cream border border-brand-grey-light p-8 md:p-14 rounded-3xl shadow-xl shadow-brand-dark/5">
          {/* Decorative quote icon */}
          <div className="absolute top-6 left-6 text-brand-green/10">
            <Quote size={56} fill="currentColor" />
          </div>

          {/* Testimonial Active Slide */}
          <div ref={cardRef} className="relative z-10 flex flex-col items-center">
            {/* Stars rating */}
            <div className="flex gap-1 mb-5">
              {Array.from({ length: reviews[activeIndex].stars }).map((_, idx) => (
                <Star key={idx} size={16} className="fill-brand-green text-brand-green" />
              ))}
            </div>

            {/* Comment */}
            <blockquote className="font-serif text-sm md:text-lg text-brand-dark leading-relaxed italic mb-8 max-w-2xl text-center">
              "{reviews[activeIndex].comment}"
            </blockquote>

            {/* Customer identity details */}
            <div className="text-center">
              <cite className="not-italic text-sm font-bold text-brand-dark block">
                {reviews[activeIndex].name}
              </cite>
              <span className="text-xs text-brand-grey font-medium uppercase tracking-wider font-mono">
                {reviews[activeIndex].role}
              </span>
            </div>
          </div>

          {/* Slider navigation buttons */}
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 pointer-events-none">
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
    </section>
  );
}
