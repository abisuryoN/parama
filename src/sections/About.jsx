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
      title: 'Perlindungan Tahan Air',
      description: 'Mencegah air tanah, rumput basah, dan embun pagi merembes ke matras Anda.'
    },
    {
      icon: <Zap className="text-brand-green" size={24} />,
      title: 'Ringan & Praktis',
      description: 'Sangat mudah dilipat dan ringan untuk dibawa ke mana saja untuk sesi latihan outdoor Anda.'
    },
    {
      icon: <Sparkles className="text-brand-green" size={24} />,
      title: 'Alas Nyaman & Bersih',
      description: 'Memberikan lapisan pembatas yang bersih dan rata antara matras dengan tanah.'
    },
    {
      icon: <Shield className="text-brand-green" size={24} />,
      title: 'Bahan Terpal Premium',
      description: 'Material berkualitas tinggi yang kuat, tebal, dan awet untuk penggunaan jangka panjang.'
    }
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 md:py-28 bg-brand-cream border-t border-brand-grey-light overflow-hidden"
    >
      <div className="max-w-[90%] w-full mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="about-title text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-green">Tentang Kami</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-brand-dark mt-2">
            Tentang Kami
          </h2>
          <div className="w-16 h-1 bg-brand-green mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Brand Story Column */}
          <div className="about-content lg:col-span-6 text-left">
            <div className="space-y-5 mb-10">
              <p className="text-sm md:text-base text-brand-grey leading-relaxed">
                Parama Terpal lahir dari kebutuhan akan alas matras yang lebih bersih, nyaman, dan tahan lama. Kami menyediakan terpal premium yang membantu melindungi matras dari debu, kotoran, permukaan lembap, serta kondisi lingkungan yang kurang ideal.
              </p>
              <p className="text-xs md:text-sm text-brand-grey leading-relaxed">
                Dengan material berkualitas dan desain yang praktis, produk Parama Terpal cocok digunakan untuk berbagai kebutuhan, mulai dari penggunaan di rumah, kegiatan outdoor, camping, piknik, yoga, hingga aktivitas sehari-hari yang membutuhkan alas pelindung yang kuat dan mudah dibersihkan.
              </p>
              <p className="text-xs md:text-sm text-brand-grey leading-relaxed">
                Kami percaya bahwa kenyamanan dimulai dari fondasi yang baik. Karena itu, setiap produk Parama Terpal dirancang untuk memberikan perlindungan maksimal sekaligus kemudahan penggunaan bagi pelanggan.
              </p>
              <p className="text-xs md:text-sm font-bold text-brand-green font-mono">
                Let's #GroundingWithParama
              </p>
            </div>

            {/* Quote block */}
            <div className="border-l-4 border-brand-green pl-6 py-2 bg-brand-cream-soft rounded-r-xl mt-10">
              <p className="italic text-xs text-brand-dark font-medium leading-relaxed">
                "A protective layer between your yoga mat and outdoor surfaces, helping keep your practice cleaner and more comfortable."
              </p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-brand-green mt-2 font-mono">
                — Let's #GroundingWithParama
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
