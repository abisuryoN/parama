import React, { useState, useEffect } from 'react';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Products from './sections/Products';
import WhyChooseUs from './sections/WhyChooseUs';
import Gallery from './sections/Gallery';
import Testimonials from './sections/Testimonials';
import FAQ from './sections/FAQ';
import CTA from './sections/CTA';
import Partnership from './sections/Partnership';
import Footer from './sections/Footer';
import FloatingCTA from './components/FloatingCTA';
import EventPage from './pages/Event';

export default function App() {
  const [currentPath, setCurrentPath] = useState(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  // Sync state on browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Handle hash scrolling when arriving on homepage
  useEffect(() => {
    if (currentPath === '/' && window.location.hash) {
      setTimeout(() => {
        const el = document.querySelector(window.location.hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [currentPath]);

  const navigate = (path) => {
    if (path.startsWith('/#')) {
      const hash = path.replace('/', '');
      window.history.pushState(null, '', '/');
      setCurrentPath('/');
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else {
      window.history.pushState(null, '', path);
      setCurrentPath(path);
      window.scrollTo(0, 0);
    }
  };

  const isEventRoute = currentPath === '/event' || currentPath.startsWith('/event/');

  return (
    <div className="min-h-screen bg-brand-cream text-brand-dark selection:bg-brand-green selection:text-brand-cream">
      {/* Navigation Bar */}
      <Navbar currentRoute={isEventRoute ? '/event' : '/'} onNavigate={navigate} />

      {/* Main Content Sections or Dedicated Event Page */}
      {isEventRoute ? (
        <main>
          <EventPage onNavigate={navigate} />
          <Partnership />
        </main>
      ) : (
        <main>
          <Hero />
          <About />
          <Products />
          <Gallery />
          <WhyChooseUs />
          <Testimonials />
          <FAQ />
          <CTA />
          <Partnership />
        </main>
      )}

      {/* Footer Section */}
      <Footer currentRoute={isEventRoute ? '/event' : '/'} onNavigate={navigate} />

      {/* Floating CTA Widget (Revealed on scroll) */}
      <FloatingCTA />
    </div>
  );
}
