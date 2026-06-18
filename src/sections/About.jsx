import React, { useRef } from 'react';
import { Shield, Sparkles, Droplets, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function About() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    // Title reveal
    gsap.fromTo('.about-title',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-title',
          start: 'top 85%',
        },
        clearProps: 'all'
      }
    );

    // Left content text block fade-in
    gsap.fromTo('.about-content',
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-content',
          start: 'top 80%',
        },
        clearProps: 'all'
      }
    );

    // Highlight cards stagger animation
    gsap.fromTo('.about-card',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-grid',
          start: 'top 80%',
        },
        clearProps: 'all'
      }
    );
  }, { scope: sectionRef });

  const features = [
    {
      icon: <Droplets className="text-brand-green" size={24} />,
      title: '100% Anti Air (Waterproof)',
      description: 'Proteksi penuh terhadap air, cairan, dan kelembapan untuk menjaga matras tetap kering dan higienis.'
    },
    {
      icon: <Shield className="text-brand-green" size={24} />,
      title: 'Material Tahan Robek',
      description: 'Dibuat dari benang poliester kepadatan tinggi berlapis PVC ganda untuk ketahanan gesekan ekstrem.'
    },
    {
      icon: <Sparkles className="text-brand-green" size={24} />,
      title: 'Mudah Dibersihkan',
      description: 'Cukup dilap dengan kain basah atau disemprot air. Lapisan permukaan menolak noda minyak dan debu.'
    },
    {
      icon: <Zap className="text-brand-green" size={24} />,
      title: 'Teknologi Welding Rapi',
      description: 'Sambungan terpal diproses menggunakan mesin high-frequency welding modern agar anti bocor dan rapi.'
    }
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 md:py-28 bg-brand-cream border-t border-brand-grey-light overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="about-title text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-green">Tentang Kami</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-brand-dark mt-2">
            Dedikasi Menghadirkan Terpal Alas Matras Terbaik & Tahan Lama
          </h2>
          <div className="w-16 h-1 bg-brand-green mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Brand Story Column */}
          <div className="about-content lg:col-span-6 text-left">
            <h3 className="font-serif text-2xl font-bold text-brand-dark mb-4">
              Siapa Parama Terpal?
            </h3>
            <p className="text-sm md:text-base text-brand-grey leading-relaxed mb-6">
              Parama Terpal lahir dari kebutuhan akan alas kasur/matras industri dan rumah tangga yang benar-benar andal. Kami memahami bahwa matras adalah aset berharga yang membutuhkan perlindungan dari rembesan air, noda, jamur, serta gesekan lantai yang kasar.
            </p>
            <p className="text-sm md:text-base text-brand-grey leading-relaxed mb-8">
              Fokus utama kami terletak pada integritas material dan kepresisian ukuran. Dengan perpaduan serat sintetis premium dan formulasi karet protektif, terpal kami siap memberikan kenyamanan alas tidur yang tangguh di segala kondisi cuaca.
            </p>

            {/* Quote block */}
            <div className="border-l-4 border-brand-green pl-6 py-2 bg-brand-cream-soft rounded-r-xl">
              <p className="italic text-sm text-brand-dark font-medium leading-relaxed">
                "Kami tidak sekadar menjual lembaran terpal. Kami menghadirkan rasa tenang dan perlindungan jangka panjang untuk kenyamanan matras Anda."
              </p>
              <p className="text-xs font-bold uppercase tracking-wider text-brand-green mt-2 font-mono">
                — Tim QC Parama Terpal
              </p>
            </div>
          </div>

          {/* Highlights Grid Column */}
          <div className="lg:col-span-6">
            <div className="about-grid grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="about-card p-6 rounded-2xl bg-brand-cream-soft border border-brand-grey-light hover:border-brand-green/35 hover:shadow-lg transition-all duration-300 group text-left"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-cream border border-brand-grey-light flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <h4 className="font-serif text-base font-bold text-brand-dark mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-brand-grey leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
