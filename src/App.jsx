import React from 'react';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Products from './sections/Products';
import WhyChooseUs from './sections/WhyChooseUs';
import Gallery from './sections/Gallery';
import Testimonials from './sections/Testimonials';
import FAQ from './sections/FAQ';
import CTA from './sections/CTA';
import Footer from './sections/Footer';
import FloatingCTA from './components/FloatingCTA';

export default function App() {
  return (
    <div className="min-h-screen bg-brand-cream text-brand-dark selection:bg-brand-green selection:text-brand-cream">
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
        <Hero />
        <About />
        <Products />
        <Gallery />
        <WhyChooseUs />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>

      {/* Footer Section */}
      <Footer />

      {/* Floating CTA Widget (Revealed on scroll) */}
      <FloatingCTA />
    </div>
  );
}
