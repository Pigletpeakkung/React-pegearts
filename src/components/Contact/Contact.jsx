import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNotification } from '../../contexts/NotificationContext';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    services: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  
  const { addNotification } = useNotification();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const services = [
    { id: 'ai-content', label: 'AI Content Development', icon: '🤖' },
    { id: 'voice-acting', label: 'Voice Acting Services', icon: '🎙️' },
    { id: 'seo-strategy', label: 'SEO Strategy', icon: '📈' },
    { id: 'web-dev', label: 'Web Development', icon: '🌐' },
    { id: 'content-creation', label: 'Creative Writing', icon: '✍️' },
    { id: 'training', label: 'Training & Workshops', icon: '🎓' }
  ];

  const contactMethods = [
    {
      type: 'email',
      label: 'Email Me',
      value: 'thanattsitt.info@yahoo.co.uk',
      link: 'mailto:thanattsitt.info@yahoo.co.uk',
      icon: '📧',
      primary: true,
      description: 'Best for project inquiries'
    },
    {
      type: 'linkedin',
      label: 'LinkedIn',
      value: 'linkedin.com/in/thanattsitt-s',
      link: 'https://www.linkedin.com/in/thanattsitt-s',
      icon: '💼',
      description: 'Professional networking'
    },
    {
      type: 'github',
      label: 'GitHub',
      value: 'github.com/Pigletpeakkung',
      link: 'https://github.com/Pigletpeakkung',
      icon: '💻',
      description: 'View my code & projects'
    },
    {
      type: 'voice123',
      label: 'Voice123 Profile',
      value: 'voice123.com/zeintharts',
      link: 'https://voice123.com/voice-actor/zeintharts',
      icon: '🎤',
      description: 'Voice acting portfolio'
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      addNotification('Please fix the errors in the form', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      // Next.js API route for sending emails
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent
        }),
      });

      if (response.ok) {
        addNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        setFormData({
          name: '',
          email: '',
          company: '',
          subject: '',
          message: '',
          services: []
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      // Fallback to mailto
      const subject = formData.subject || 'New Project Inquiry from Portfolio';
      const body = `Hello Thanatsitt,

${formData.message}

---
Contact Details:
Name: ${formData.name}
Email: ${formData.email}
${formData.company ? `Company: ${formData.company}` : ''}
${formData.services.length > 0 ? `Interested Services: ${formData.services.join(', ')}` : ''}

Best regards,
${formData.name}`;

      const mailtoUrl = `mailto:thanattsitt.info@yahoo.co.uk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;
      
      addNotification('Email client opened! Message prepared for sending.', 'success');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Rest of component remains the same...
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleServiceToggle = (serviceId) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(s => s !== serviceId)
        : [...prev.services, serviceId]
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        {/* Component JSX remains the same as React version */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="section-header">
            <h2 className="section-title">
              <span className="title-number">03.</span>
              Let&apos;s Work Together
            </h2>
            <div className="title-line"></div>
          </motion.div>

          <motion.div variants={itemVariants} className="contact-intro">
            <h3>Ready to bring your ideas to life?</h3>
            <p>
              Whether you need AI-powered content development, professional voice acting in Thai/English, 
              or creative technology solutions, I&apos;m here to help transform your vision into reality. 
              Let&apos;s create something amazing together!
            </p>
          </motion.div>

          <div className="contact-content">
            {/* Contact Methods */}
            <motion.div variants={itemVariants} className="contact-methods">
              <h4>Get in Touch</h4>
              <div className="methods-grid">
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={method.type}
                    href={method.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`contact-method ${method.primary ? 'primary' : ''}`}
                    whileHover={{ scale: 1.05, y: -5 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <div className="method-icon">{method.icon}</div>
                    <div className="method-info">
                      <h5>{method.label}</h5>
                      <p className="method-value">{method.value}</p>
                      <span className="method-desc">{method.description}</span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Contact Form - same as before */}
            <motion.div variants={itemVariants} className="contact-form-container">
              <h4>Send Me a Message</h4>
              <form onSubmit={handleSubmit} className="contact-form">
                {/* Form fields remain the same */}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">
                      Name *
                      {errors.name && <span className="error-text">{errors.name}</span>}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={errors.name ? 'error' : ''}
                      placeholder="Your full name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">
                      Email *
                      {errors.email && <span className="error-text">{errors.email}</span>}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? 'error' : ''}
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="company">Company / Organization</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Optional"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Brief description of your project"
                    />
                  </div>
                </div>

                {/* Services Selection */}
                <div className="form-group">
                  <label>Services Interested In</label>
                  <div className="services-selection">
                    {services.map((service) => (
                      <motion.button
                        key={service.id}
                        type="button"
                        className={`service-tag ${formData.services.includes(service.id) ? 'selected' : ''}`}
                        onClick={() => handleServiceToggle(service.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="service-icon">{service.icon}</span>
                        <span>{service.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">
                    Message *
                    {errors.message && <span className="error-text">{errors.message}</span>}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={errors.message ? 'error' : ''}
                    rows="5"
                    placeholder="Tell me about your project, timeline, budget, or any questions you have..."
                    maxLength="1000"
                  ></textarea>
                  <div className="char-count">
                    {formData.message.length}/1000
                  </div>
                </div>

                <motion.button
                  type="submit"
                  className="submit-btn"
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.span
                        key="sending"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="btn-content"
                      >
                        <motion.i 
                          className="fas fa-spinner"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Sending...
                      </motion.span>
                    ) : (
                      <motion.span
                        key="send"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="btn-content"
                      >
                        <i className="fas fa-paper-plane"></i>
                        Send Message
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* Additional Info */}
          <motion.div variants={itemVariants} className="contact-additional">
            <div className="response-time">
              <div className="response-icon">⚡</div>
              <div className="response-info">
                <h5>Quick Response</h5>
                <p>I typically respond within 24 hours</p>
              </div>
            </div>

            <div className="timezone-info">
              <div className="timezone-icon">🌍</div>
              <div className="timezone-details">
                <h5>Location</h5>
                <p>Kamphaeng Phet, Thailand (UTC+7)</p>
                <span className="current-time">
                  Current time: {new Date().toLocaleString('en-US', { 
                    timeZone: 'Asia/Bangkok',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  })}
                </span>
              </div>
            </div>

            <div className="languages-available">
              <div className="lang-icon">💬</div>
              <div className="lang-details">
                <h5>Languages Available</h5>
                <div className="lang-flags">
                  <span title="Thai - Native">🇹🇭</span>
                  <span title="English - Fluent">🇬🇧</span>
                  <span title="Japanese - Conversational">🇯🇵</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
