import React, { useRef, useState, useEffect } from 'react';
import PlaceholderImage from '../components/PlaceholderImage';
import Button from '../components/Button';
import { Check, ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Products() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

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
      id: 'black',
      name: 'PARAMA BLACK',
      alt: 'Parama Black Grounding Sheet | Alas Matras Yoga Outdoor Premium',
      description: 'Our premium grounding sheet, designed for yogis who seek extra durability and protection during outdoor practice.',
      subtitle: 'Size: 190 cm × 75 cm | Thickness: Extra Thick',
      specifications: [
        'Size: 190 cm × 75 cm',
        'Thickness: Extra Thick',
        'Water-resistant',
        'Lightweight and foldable',
        'Easy to clean',
        'Suitable for grass, soil, sand, and outdoor surfaces'
      ],
      bestFor: 'Outdoor yoga, retreats, wellness events, and regular outdoor practice.',
      placeholderText: 'Parama Black Grounding Sheet'
    },
    {
      id: 'silver',
      name: 'PARAMA SILVER',
      alt: 'Parama Silver Grounding Sheet | Alas Matras Yoga Outdoor Premium',
      description: 'A durable grounding sheet with enhanced thickness, offering reliable protection between your yoga mat and the ground.',
      subtitle: 'Size: 190 cm × 75 cm | Thickness: Extra Thick',
      specifications: [
        'Size: 190 cm × 75 cm',
        'Thickness: Extra Thick',
        'Water-resistant',
        'Lightweight and easy to carry',
        'Easy to wipe clean',
        'Designed for outdoor use'
      ],
      bestFor: 'Yoga in parks, gardens, beaches, and outdoor community events.',
      placeholderText: 'Parama Silver Grounding Sheet'
    },
    {
      id: 'navy',
      name: 'PARAMA NAVY',
      alt: 'Parama Navy Grounding Sheet | Alas Matras Yoga Outdoor Premium',
      description: 'A lightweight grounding sheet that provides practical protection while remaining easy to pack and carry.',
      subtitle: 'Size: 190 cm × 75 cm | Thickness: Standard',
      specifications: [
        'Size: 190 cm × 75 cm',
        'Thickness: Standard',
        'Water-resistant',
        'Foldable and compact',
        'Easy to clean',
        'Suitable for outdoor yoga and wellness activities'
      ],
      bestFor: 'Casual outdoor practice and everyday use.',
      placeholderText: 'Parama Navy Grounding Sheet'
    },
    {
      id: 'blue',
      name: 'PARAMA BLUE',
      alt: 'Parama Blue Grounding Sheet | Alas Matras Yoga Outdoor Premium',
      description: 'A simple and functional grounding sheet designed to help keep your yoga mat cleaner during outdoor sessions.',
      subtitle: 'Size: 190 cm × 75 cm | Thickness: Standard',
      specifications: [
        'Size: 190 cm × 75 cm',
        'Thickness: Standard',
        'Water-resistant',
        'Lightweight and portable',
        'Easy to fold and store',
        'Ideal for outdoor yoga and meditation'
      ],
      bestFor: 'Outdoor yoga, picnics, meditation, and community gatherings.',
      placeholderText: 'Parama Blue Grounding Sheet'
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
      <div className="max-w-full md:max-w-[90%] w-full mx-auto px-4 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-green">Our Product</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-brand-dark mt-2">
            Our Product
          </h2>
          <p className="text-xs md:text-sm text-brand-grey mt-3 max-w-lg mx-auto">
            Choose the perfect grounding sheet to complement your outdoor yoga flow and wellness routine.
          </p>
          <div className="w-16 h-1 bg-brand-green mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Product Cards Container - Mobile Horizontal Slider, Desktop Grid */}
        <div className="product-container relative">
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
                  {extendedProductList.map((product, idx) => (
                    <div
                      key={`${product.id}-${idx}`}
                      className="w-full shrink-0 px-2"
                    >
                      <div
                        className="product-card rounded-3xl p-4 sm:p-6 flex flex-col justify-between border transition-all duration-500 bg-brand-cream relative border-brand-grey-light hover:border-brand-green/30 shadow-sm hover:shadow-md"
                      >
                        <div>
                          {/* Photo Container */}
                          <div 
                            className="mb-6 relative overflow-hidden rounded-2xl aspect-square bg-brand-cream-soft border border-brand-grey-light cursor-zoom-in group"
                            onClick={() => setActiveImage(`/${product.id}.jpg`)}
                          >
                            <img
                              src={`/${product.id}.jpg`}
                              alt={product.alt}
                              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                              loading="lazy"
                            />
                            {/* Hover overlay with zoom icon */}
                            <div className="absolute inset-0 bg-brand-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                              <span className="bg-brand-cream text-brand-dark p-2.5 rounded-full shadow-lg">
                                <Maximize2 size={16} />
                              </span>
                            </div>
                          </div>

                          {/* Name and description */}
                          <h3 className="font-serif text-xl font-bold text-brand-dark mb-1 text-left">
                            {product.name}
                          </h3>
                          <div className="text-left font-mono text-[11px] uppercase tracking-wider text-brand-green font-semibold mb-3">
                            {product.subtitle}
                          </div>
                          <p className="text-xs text-brand-grey leading-relaxed text-left mb-6 font-sans">
                            {product.description}
                          </p>

                          {/* Specifications */}
                          <div className="border-t border-brand-grey-light pt-6 mb-4 text-left">
                            <h4 className="text-xs uppercase tracking-wider font-semibold text-brand-dark/80 mb-3.5">
                              Specifications
                            </h4>
                            <ul className="flex flex-col gap-2.5">
                              {product.specifications.map((spec, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-xs text-brand-grey leading-tight">
                                  <Check size={14} className="text-brand-green shrink-0 mt-0.5" />
                                  <span>{spec}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Best For */}
                          <div className="border-t border-brand-grey-light/50 pt-4 mb-6 text-left text-xs">
                            <span className="font-bold text-brand-dark">Best For: </span>
                            <span className="text-brand-grey">{product.bestFor}</span>
                          </div>
                        </div>

                        <Button
                          href="#contact"
                          variant="secondary"
                          className="w-full text-center py-3"
                        >
                          Contact Us
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {productList.map((product) => (
                <div
                  key={product.id}
                  className="product-card-desktop rounded-3xl p-6 flex flex-col justify-between border transition-all duration-500 bg-brand-cream relative border-brand-grey-light hover:border-brand-green/30 shadow-sm hover:shadow-md"
                >
                  <div>
                    {/* Photo Container */}
                    <div 
                      className="mb-6 relative overflow-hidden rounded-2xl aspect-square bg-brand-cream-soft border border-brand-grey-light cursor-zoom-in group"
                      onClick={() => setActiveImage(`/${product.id}.jpg`)}
                    >
                      <img
                        src={`/${product.id}.jpg`}
                        alt={product.alt}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        loading="lazy"
                      />
                      {/* Hover overlay with zoom icon */}
                      <div className="absolute inset-0 bg-brand-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="bg-brand-cream text-brand-dark p-2.5 rounded-full shadow-lg">
                          <Maximize2 size={16} />
                        </span>
                      </div>
                    </div>

                    {/* Name and description */}
                    <h3 className="font-serif text-xl font-bold text-brand-dark mb-1 text-left">
                      {product.name}
                    </h3>
                    <div className="text-left font-mono text-[11px] uppercase tracking-wider text-brand-green font-semibold mb-3">
                      {product.subtitle}
                    </div>
                    <p className="text-xs text-brand-grey leading-relaxed text-left mb-6 font-sans">
                      {product.description}
                    </p>

                    {/* Specifications */}
                    <div className="border-t border-brand-grey-light pt-6 mb-4 text-left">
                      <h4 className="text-xs uppercase tracking-wider font-semibold text-brand-dark/80 mb-3.5">
                        Specifications
                      </h4>
                      <ul className="flex flex-col gap-2.5">
                        {product.specifications.map((spec, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-brand-grey leading-tight">
                            <Check size={14} className="text-brand-green shrink-0 mt-0.5" />
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Best For */}
                    <div className="border-t border-brand-grey-light/50 pt-4 mb-6 text-left text-xs">
                      <span className="font-bold text-brand-dark">Best For: </span>
                      <span className="text-brand-grey">{product.bestFor}</span>
                    </div>
                  </div>

                  <Button
                    href="#contact"
                    variant="secondary"
                    className="w-full text-center py-3"
                  >
                    Contact Us
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Closing Copy Block */}
        <div className="mt-20 text-center max-w-xl mx-auto border-t border-brand-grey-light pt-10">
          <p className="text-xs md:text-sm text-brand-grey leading-relaxed mb-4">
            A protective layer between your yoga mat and outdoor surfaces, helping keep your practice cleaner and more comfortable.
          </p>
          <h4 className="font-serif text-base md:text-lg font-bold text-brand-green mb-1">
            Simple Grounding Essential
          </h4>
          <p className="text-[10px] md:text-xs font-bold text-brand-green font-mono uppercase tracking-wider">
            Let's #GroundingWithParama
          </p>
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
              alt="Expanded view of Parama Grounding Sheet"
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
