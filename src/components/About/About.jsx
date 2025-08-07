import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './About.css';

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
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

  const skills = [
    { name: 'React/Next.js', level: 95, color: '#61dafb' },
    { name: 'Node.js', level: 90, color: '#339933' },
    { name: 'Voice Acting', level: 95, color: '#ff6b6b' },
    { name: 'Content Strategy', level: 92, color: '#4ecdc4' },
    { name: 'SEO Optimization', level: 88, color: '#45b7d1' },
    { name: 'AI Integration', level: 85, color: '#96ceb4' }
  ];

  const languages = [
    { name: 'Thai', flag: '🇹🇭', level: 'Native', proficiency: 100 },
    { name: 'English', flag: '🇬🇧', level: 'Fluent', proficiency: 95 },
    { name: 'Japanese', flag: '🇯🇵', level: 'Conversational', proficiency: 70 }
  ];

  return (
    <section id="about" className="about-section">
      <div className="container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="about-content"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="section-header">
            <h2 className="section-title">
              <span className="title-number">01.</span>
              About Me
            </h2>
            <div className="title-line"></div>
          </motion.div>

          <div className="about-grid">
            {/* Personal Story */}
            <motion.div variants={itemVariants} className="about-story">
              <div className="story-content">
                <h3>My Journey</h3>
                <p>
                  Hello! I'm <span className="highlight">Thanatsitt</span>, a passionate 
                  developer and creative technologist based in Thailand. My journey began 
                  with a fascination for how technology can amplify human creativity.
                </p>
                
                <p>
                  With <span className="highlight">7+ years</span> of experience spanning 
                  web development, voice acting, and content creation, I've learned that 
                  the best digital experiences come from understanding both the technical 
                  possibilities and human needs.
                </p>

                <p>
                  Today, I specialize in creating <span className="highlight">AI-powered 
                  solutions</span> that bridge language barriers and enhance digital 
                  storytelling through voice, code, and strategy.
                </p>

                {/* Key Stats */}
                <div className="about-stats">
                  <div className="stat-item">
                    <span className="stat-number">50+</span>
                    <span className="stat-label">Projects Completed</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">15+</span>
                    <span className="stat-label">Languages Supported</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">100%</span>
                    <span className="stat-label">Client Satisfaction</span>
                  </div>
                </div>
              </div>

              {/* Profile Image */}
              <motion.div 
                className="profile-image"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="image-wrapper">
                  <img 
                    src="/images/profile-thanatsitt.jpg" 
                    alt="Thanatsitt - AI Developer & Voice Actor"
                    loading="lazy"
                  />
                  <div className="image-overlay">
                    <div className="overlay-content">
                      <span>🎙️ Voice Actor</span>
                      <span>💻 Developer</span>
                      <span>🤖 AI Specialist</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Skills Section */}
            <motion.div variants={itemVariants} className="skills-section">
              <h3>Technical Expertise</h3>
              <div className="skills-grid">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="skill-item"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <motion.div
                        className="skill-progress"
                        style={{ backgroundColor: skill.color }}
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Languages Section */}
            <motion.div variants={itemVariants} className="languages-section">
              <h3>Languages</h3>
              <div className="languages-grid">
                {languages.map((lang, index) => (
                  <motion.div
                    key={lang.name}
                    className="language-card"
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <div className="lang-flag">{lang.flag}</div>
                    <div className="lang-info">
                      <h4>{lang.name}</h4>
                      <span className="lang-level">{lang.level}</span>
                      <div className="lang-bar">
                        <motion.div
                          className="lang-progress"
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${lang.proficiency}%` } : { width: 0 }}
                          transition={{ delay: 0.8 + index * 0.1, duration: 1 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* What I Do */}
            <motion.div variants={itemVariants} className="services-preview">
              <h3>What I Do</h3>
              <div className="services-grid">
                <div className="service-card">
                  <div className="service-icon">🌐</div>
                  <h4>Web Development</h4>
                  <p>Modern, responsive applications using React, Next.js, and cutting-edge technologies.</p>
                </div>
                <div className="service-card">
                  <div className="service-icon">🎙️</div>
                  <h4>Voice Acting</h4>
                  <p>Professional voice-over services in multiple languages for diverse media projects.</p>
                </div>
                <div className="service-card">
                  <div className="service-icon">🤖</div>
                  <h4>AI Integration</h4>
                  <p>Smart solutions leveraging AI for content generation, automation, and user experience.</p>
                </div>
                <div className="service-card">
                  <div className="service-icon">📈</div>
                  <h4>SEO Strategy</h4>
                  <p>Data-driven optimization strategies that boost visibility and drive organic growth.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
