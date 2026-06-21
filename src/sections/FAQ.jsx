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
      question: 'Apa itu terpal alas matras premium Parama?',
      answer: 'Parama menghadirkan terpal alas matras premium yang dirancang khusus sebagai pelindung matras yoga Anda saat latihan di area outdoor. Produk ini lahir dari kebutuhan akan latihan yoga yang lebih bersih, higienis, dan nyaman di alam terbuka.'
    },
    {
      question: 'Apakah alas matras outdoor Parama terbukti waterproof?',
      answer: 'Ya, alas matras outdoor Parama terbuat dari bahan waterproof berkualitas tinggi yang sepenuhnya tahan air. Ini mencegah kelembapan tanah, rumput basah, atau embun pagi merembes ke matras yoga Anda.'
    },
    {
      question: 'Mengapa harus memilih terpal premium dari Parama?',
      answer: 'Terpal premium Parama memiliki keunggulan berupa material yang tebal namun tetap ringan, mudah dilipat, tahan lama (tear-resistant), dan sangat praktis untuk dibawa bepergian ke sesi latihan outdoor maupun retreat yoga.'
    },
    {
      question: 'Apakah terpal pelindung matras ini mudah dibersihkan?',
      answer: 'Sangat mudah! Kotoran, noda tanah, rumput basah, dan debu dapat dibersihkan dengan mudah cukup dengan menyekanya menggunakan kain basah atau kanebo setelah selesai digunakan.'
    },
    {
      question: 'Bagaimana cara membawa alas matras yoga outdoor Parama?',
      answer: 'Alas matras yoga outdoor Parama dirancang sangat compact dan fleksibel. Anda dapat melipatnya dengan mudah hingga ukuran kecil dan memasukkannya ke dalam tas jinjing yoga atau ransel olahraga Anda tanpa menambah beban berat.'
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
            Temukan jawaban atas pertanyaan umum seputar terpal alas matras outdoor dari Parama.
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
