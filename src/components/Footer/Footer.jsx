import React from 'react';
import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      name: 'GitHub', 
      url: 'https://github.com/Pigletpeakkung', 
      icon: 'fab fa-github',
      color: '#333'
    },
    { 
      name: 'LinkedIn', 
      url: 'https://www.linkedin.com/in/thanattsitt-s', 
      icon: 'fab fa-linkedin',
      color: '#0077b5'
    },
    { 
      name: 'Voice123', 
      url: 'https://voice123.com/voice-actor/zeintharts', 
      icon: 'fas fa-microphone',
      color: '#ff6b35'
    },
    { 
      name: 'YouTube', 
      url: 'https://youtube.com/@pegearts', 
      icon: 'fab fa-youtube',
      color: '#ff0000'
    },
    { 
      name: 'Medium', 
      url: 'https://medium.com/@zeintharts', 
      icon: 'fab fa-medium',
      color: '#00ab6c'
    },
    { 
      name: 'Wattpad', 
      url: 'https://www.wattpad.com/user/Ezekielarts', 
      icon: 'fas fa-book',
      color: '#ff500a'
    }
  ];

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' }
  ];

  const services = [
    'AI Content Development',
    'Voice Acting (Thai/English)',
    'SEO Strategy & Consulting',
    'Creative Writing & Storytelling',
    'React/Web Development',
    'Multilingual Content Creation'
  ];

  const credentials = [
    'BA (Hons) Fashion & Design Communication - London College of Fashion',
    'Fashion Studies - Bunka Fashion College, Tokyo',
    'Shopify Partner Academy Certified',
    'Google Digital Garage - SEO & Marketing'
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Brand Section */}
          <motion.div 
            className="footer-brand"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="brand-logo">
              <h3>Thanatsitt Santisamranwilai</h3>
              <div className="brand-aliases">
                <span>aka Pegearts • Ezekielarts • Zeintharts</span>
              </div>
              <span className="brand-tagline">AI Content Developer & Creative Technologist</span>
            </div>
            <p className="brand-description">
              Multilingual content developer with 7+ years of experience combining creative writing, 
              voice acting, SEO strategy, and AI automation. Bridging creativity and technology 
              through innovative solutions.
            </p>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  style={{ '--social-color': social.color }}
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  viewport={{ once: true }}
                  title={social.name}
                >
                  <i className={social.icon}></i>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="footer-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4>Navigation</h4>
            <ul className="footer-links">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
              <li>
                <a href="https://linktr.ee/ThanttEzekiel" target="_blank" rel="noopener noreferrer">
                  All Links
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div 
            className="footer-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4>Services</h4>
            <ul className="footer-links">
              {services.map((service) => (
                <li key={service}>
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info & Education */}
          <motion.div 
            className="footer-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4>Get In Touch</h4>
            <div className="contact-info">
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>thanattsitt.info@yahoo.co.uk</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>Kamphaeng Phet, Thailand</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-clock"></i>
                <span>UTC+7 Timezone</span>
              </div>
            </div>
            
            {/* Languages */}
            <div className="languages-footer">
              <span className="lang-label">Available in:</span>
              <div className="lang-flags">
                <span title="Thai - Native">🇹🇭</span>
                <span title="English - Fluent">🇬🇧</span>
                <span title="Japanese - Conversational">🇯🇵</span>
              </div>
            </div>

            {/* Education */}
            <div className="education-footer">
              <h5>Education & Certifications</h5>
              <ul className="education-list">
                <li>🎓 London College of Fashion, University of the Arts London</li>
                <li>🏫 Bunka Fashion College, Tokyo</li>
                <li>🎯 Bangkok University</li>
                <li>📜 Shopify Partner Academy Certified</li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div 
          className="footer-bottom"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>
                &copy; {currentYear} Thanatsitt Santisamranwilai (Pegearts). 
                All rights reserved.
              </p>
              <p className="built-with">
                Built with ❤️ using React, Framer Motion & Creative Technology
              </p>
            </div>
            <div className="footer-meta">
              <span className="version">v2.0.0</span>
              <span className="last-updated">
                Last updated: {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
