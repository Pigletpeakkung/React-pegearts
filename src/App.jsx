// Updated App.jsx with all corrections
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Portfolio from './components/Portfolio/Portfolio';
import VoiceDemos from './components/VoiceDemos/VoiceDemos';
import Services from './components/Services/Services';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Modal from './components/Modal/Modal';
import Notification from './components/Notification/Notification';
import StructuredData from './components/StructuredData/StructuredData';
import { ThemeProvider } from './contexts/ThemeContext';
import { ModalProvider } from './contexts/ModalContext';
import { NotificationProvider } from './contexts/NotificationContext';

// Import libraries
import AOS from 'aos';
import 'aos/dist/aos.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });

    // Remove loading screen after 2 seconds
    const timer = setTimeout(() => {
      const loadingScreen = document.getElementById('loading-screen');
      if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    }, 2000);

    // Initialize particles.js if available
    const initializeParticles = () => {
      if (window.particlesJS && document.getElementById('particles-js')) {
        window.particlesJS('particles-js', {
          particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#6366f1" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: {
              enable: true,
              distance: 150,
              color: "#6366f1",
              opacity: 0.4,
              width: 1
            },
            move: {
              enable: true,
              speed: 6,
              direction: "none",
              random: false,
              straight: false,
              out_mode: "out",
              bounce: false
            }
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: { enable: true, mode: "repulse" },
              onclick: { enable: true, mode: "push" },
              resize: true
            }
          },
          retina_detect: true
        });
      }
    };

    setTimeout(initializeParticles, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <HelmetProvider>
      <ThemeProvider>
        <ModalProvider>
          <NotificationProvider>
            <Router>
              <div className="App">
                <StructuredData />
                
                {isLoading && <LoadingScreen />}
                
                <Header />
                
                <main id="main-content">
                  <Routes>
                    <Route path="/" element={
                      <>
                        <Hero />
                        <About />
                        <Skills />
                        <Portfolio />
                        <VoiceDemos />
                        <Services />
                        <Contact />
                      </>
                    } />
                    <Route path="/about" element={<About />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/contact" element={<Contact />} />
                  </Routes>
                </main>

                <Footer />
                <ScrollToTop />
                <Modal />
                <Notification />
              </div>
            </Router>
          </NotificationProvider>
        </ModalProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
