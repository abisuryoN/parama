import React, { useRef, useState, useEffect } from 'react';
import PlaceholderImage from '../components/PlaceholderImage';
import Button from '../components/Button';
import { Check, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Products() {
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
      // Reveal cards on scroll (only for desktop grid)
      gsap.fromTo('.product-card-desktop',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.product-container',
            start: 'top 80%',
          },
          clearProps: 'all'
        }
      );
    }
  }, { scope: containerRef, dependencies: [isMobile] });

  const productList = [
    {
      id: 'lite',
      name: 'Parama Lite Base (T-80)',
      description: 'Ideal untuk kasur busa tipis, matras santai, atau kasur anak. Sangat lentur, ringan, dan praktis dilipat.',
      thickness: '0.45mm Flexi-Shield',
      benefits: [
        'Material kuat & ringan',
        'Mudah dibersihkan',
        'Anti air & anti jamur',
        'Nyaman untuk matras tipis'
      ],
      placeholderText: 'Parama Lite Base T-80 Texture'
    },
    {
      id: 'standard',
      name: 'Parama Standard Shield (T-100)',
      description: 'Pilihan terpopuler untuk pelindung kasur ukuran reguler. Perlindungan maksimal dengan kelenturan seimbang.',
      thickness: '0.55mm Mid-Shield',
      benefits: [
        'Sangat kuat & tahan lama',
        'Nyaman & menstabilkan posisi kasur',
        'Tahan gesekan permukaan kasar',
        '100% kedap cairan'
      ],
      placeholderText: 'Parama Standard Shield T-100 Texture',
      featured: true
    },
    {
      id: 'heavy',
      name: 'Parama Heavy Guard (T-120)',
      description: 'Alas matras heavy-duty untuk spring bed besar berat, matras medis, kargo kasur, atau alas matras outdoor.',
      thickness: '0.65mm Ultra-Shield',
      benefits: [
        'Lapisan poliester ganda',
        'Tahan sobek tingkat ekstrem',
        'Proteksi kelembapan tinggi',
        'Tingkat kekencangan industri'
      ],
      placeholderText: 'Parama Heavy Guard T-120 Texture'
    }
  ];

  // Extended list for infinite loop slider
  const extendedProductList = [
    productList[productList.length - 1],
    ...productList,
    productList[0]
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
      setCurrentIndex(productList.length);
    } else if (currentIndex === productList.length + 1) {
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
      id="products"
      ref={containerRef}
      className="py-20 md:py-28 bg-brand-cream-soft border-t border-brand-grey-light overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-green">Produk Kami</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-brand-dark mt-2">
            Varian Terpal Alas Matras Unggulan
          </h2>
          <p className="text-xs md:text-sm text-brand-grey mt-3 max-w-lg mx-auto">
            Temukan spesifikasi alas terpal yang paling sesuai dengan ketebalan kasur dan kondisi ruangan Anda.
          </p>
          <div className="w-16 h-1 bg-brand-green mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Product Cards Container - Mobile Horizontal Slider, Desktop Grid */}
        <div className="product-container relative">
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
                  {extendedProductList.map((product, idx) => (
                    <div
                      key={`${product.id}-${idx}`}
                      className="w-full shrink-0 px-2"
                    >
                      <div
                        className={`product-card rounded-3xl p-6 flex flex-col justify-between border transition-all duration-500 bg-brand-cream relative ${product.featured
                            ? 'border-brand-green/45 shadow-xl shadow-brand-green/5 ring-1 ring-brand-green/30'
                            : 'border-brand-grey-light hover:border-brand-grey shadow-sm hover:shadow-md'
                          }`}
                      >
                        {product.featured && (
                          <span className="absolute -top-3.5 left-8 bg-brand-green text-brand-cream text-[10px] uppercase font-bold tracking-widest px-4 py-1.5 rounded-full flex items-center gap-1 shadow-sm z-10">
                            <ShieldCheck size={12} /> Terpopuler
                          </span>
                        )}

                        <div>
                          {/* Photo Container */}
                          <div className="mb-6 relative overflow-hidden rounded-2xl">
                            <PlaceholderImage
                              text={product.placeholderText}
                              aspect="aspect-[4/3]"
                              className="transition-transform duration-700 hover:scale-105"
                            />
                          </div>

                          {/* Name and description */}
                          <h3 className="font-serif text-xl font-bold text-brand-dark mb-1 text-left">
                            {product.name}
                          </h3>
                          <div className="text-left font-mono text-[11px] uppercase tracking-wider text-brand-green font-semibold mb-3">
                            Spesifikasi: {product.thickness}
                          </div>
                          <p className="text-xs text-brand-grey leading-relaxed text-left mb-6">
                            {product.description}
                          </p>

                          {/* Benefits */}
                          <div className="border-t border-brand-grey-light pt-6 mb-8 text-left">
                            <h4 className="text-xs uppercase tracking-wider font-semibold text-brand-dark/80 mb-3.5">
                              Kelebihan Varian
                            </h4>
                            <ul className="flex flex-col gap-2.5">
                              {product.benefits.map((benefit, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-xs text-brand-grey leading-tight">
                                  <Check size={14} className="text-brand-green shrink-0 mt-0.5" />
                                  <span>{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <Button
                          href="#contact"
                          variant={product.featured ? 'primary' : 'secondary'}
                          className="w-full text-center py-3"
                        >
                          Pesan Sekarang
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons for Mobile Slider */}
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-brand-cream border border-brand-grey-light hover:border-brand-green text-brand-dark hover:text-brand-green flex items-center justify-center shadow-md active:scale-90 transition-all cursor-pointer"
                aria-label="Previous product"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-brand-cream border border-brand-grey-light hover:border-brand-green text-brand-dark hover:text-brand-green flex items-center justify-center shadow-md active:scale-90 transition-all cursor-pointer"
                aria-label="Next product"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {productList.map((product) => (
                <div
                  key={product.id}
                  className={`product-card-desktop rounded-3xl p-6 md:p-8 flex flex-col justify-between border transition-all duration-500 bg-brand-cream relative ${product.featured
                      ? 'border-brand-green/45 shadow-xl shadow-brand-green/5 ring-1 ring-brand-green/30'
                      : 'border-brand-grey-light hover:border-brand-grey shadow-sm hover:shadow-md'
                    }`}
                >
                  {product.featured && (
                    <span className="absolute -top-3.5 left-8 bg-brand-green text-brand-cream text-[10px] uppercase font-bold tracking-widest px-4 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                      <ShieldCheck size={12} /> Terpopuler
                    </span>
                  )}

                  <div>
                    {/* Photo Container */}
                    <div className="mb-6 relative overflow-hidden rounded-2xl">
                      <PlaceholderImage
                        text={product.placeholderText}
                        aspect="aspect-[4/3]"
                        className="transition-transform duration-700 hover:scale-105"
                      />
                    </div>

                    {/* Name and description */}
                    <h3 className="font-serif text-xl font-bold text-brand-dark mb-1 text-left">
                      {product.name}
                    </h3>
                    <div className="text-left font-mono text-[11px] uppercase tracking-wider text-brand-green font-semibold mb-3">
                      Spesifikasi: {product.thickness}
                    </div>
                    <p className="text-xs text-brand-grey leading-relaxed text-left mb-6">
                      {product.description}
                    </p>

                    {/* Benefits */}
                    <div className="border-t border-brand-grey-light pt-6 mb-8 text-left">
                      <h4 className="text-xs uppercase tracking-wider font-semibold text-brand-dark/80 mb-3.5">
                        Kelebihan Varian
                      </h4>
                      <ul className="flex flex-col gap-2.5">
                        {product.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-brand-grey leading-tight">
                            <Check size={14} className="text-brand-green shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Button
                    href="#contact"
                    variant={product.featured ? 'primary' : 'secondary'}
                    className="w-full text-center py-3"
                  >
                    Pesan Sekarang
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
