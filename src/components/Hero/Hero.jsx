import React from 'react';
import { motion } from 'framer-motion';
import TypewriterEffect from '../TypewriterEffect/TypewriterEffect';
import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            สวัสดี! I'm <span className="name">Thanatsitt</span>
          </motion.h1>

          <div className="hero-subtitle">
            <TypewriterEffect
              texts={[
                'AI Content Developer & Creative Technologist',
                'Multilingual Voice Actor & Storyteller', 
                'SEO Strategy Expert & Digital Innovator'
              ]}
            />
          </div>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            Bridging creativity and technology through multilingual content 
            development, voice acting, and AI-powered solutions.
          </motion.p>

          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
          >
            <motion.a
              href="#portfolio"
              className="cta-primary"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore My Work 🚀
            </motion.a>
            
            <motion.a
              href="#contact"
              className="cta-secondary"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Connect 💬
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
