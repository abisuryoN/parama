import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function FAQ() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.faq-item',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        },
        clearProps: 'all'
      }
    );
  }, { scope: containerRef });

  const faqs = [
    {
      question: 'What is the Parama premium grounding sheet?',
      answer: 'Parama premium grounding sheet is specifically designed as a protective layer for your yoga mat during outdoor practice. Born from the need for a cleaner, more hygienic, and comfortable yoga practice in nature.'
    },
    {
      question: 'Is the Parama outdoor grounding sheet waterproof?',
      answer: 'Yes, the Parama grounding sheet is made from high-quality water-resistant material, preventing ground moisture, wet grass, and damp sand from seeping into your yoga mat.'
    },
    {
      question: 'Why choose a premium grounding sheet from Parama?',
      answer: 'Parama grounding sheets are crafted from premium materials that are extra thick yet lightweight, easy to fold, tear-resistant, and highly portable for outdoor sessions or yoga retreats.'
    },
    {
      question: 'Is this yoga mat protection layer easy to clean?',
      answer: 'Very easy! Dirt, soil, grass stains, and dust can be easily wiped clean with a damp cloth or towel after your practice.'
    },
    {
      question: 'How do I carry the Parama grounding sheet?',
      answer: 'It is designed to be highly compact and flexible. You can fold it easily into a small package and fit it into your yoga bag or backpack without adding extra weight.'
    }
  ];

  return (
    <section
      id="faq"
      ref={containerRef}
      className="py-20 md:py-28 bg-brand-cream border-t border-brand-grey-light overflow-hidden font-sans"
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-green">FAQ</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-brand-dark mt-2">
            FAQ
          </h2>
          <p className="text-xs md:text-sm text-brand-grey mt-3 max-w-lg mx-auto">
            Find answers to frequently asked questions about Parama outdoor grounding sheets.
          </p>
          <div className="w-16 h-1 bg-brand-green mx-auto mt-4 rounded-full"></div>
        </div>

        {/* FAQ Accordion List using native details/summary */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              className="faq-item group bg-brand-cream-soft border border-brand-grey-light rounded-2xl overflow-hidden transition-all duration-300 open:shadow-md hover:border-brand-green/20"
            >
              <summary className="flex items-center justify-between p-5 md:p-6 text-sm md:text-base font-bold text-brand-dark cursor-pointer list-none select-none font-serif text-left">
                <span>{faq.question}</span>
                <span className="ml-4 shrink-0 transition-transform duration-300 group-open:rotate-180 text-brand-green">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>
                </span>
              </summary>
              <div className="px-5 md:px-6 pb-5 md:pb-6 text-xs md:text-sm text-brand-grey leading-relaxed border-t border-brand-grey-light/50 pt-4 text-left font-sans">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
