import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Portfolio.css';

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const categories = [
    { id: 'all', label: 'All Projects', count: 8 },
    { id: 'web', label: 'Web Development', count: 4 },
    { id: 'mobile', label: 'Mobile Apps', count: 2 },
    { id: 'ai', label: 'AI Projects', count: 3 },
    { id: 'voice', label: 'Voice Work', count: 2 }
  ];

  const projects = [
    {
      id: 1,
      title: "AI Content Generation Platform",
      category: "ai",
      tags: ["React", "Node.js", "OpenAI", "PostgreSQL"],
      description: "Revolutionary platform that generates high-quality content using advanced AI models with multilingual support.",
      image: "/images/projects/ai-platform.jpg",
      demoUrl: "https://demo.ai-content.com",
      codeUrl: "https://github.com/pegearts/ai-content",
      year: 2024,
      featured: true,
      metrics: {
        users: "10K+",
        performance: "99.9%",
        satisfaction: "4.9/5"
      }
    },
    {
      id: 2,
      title: "Multilingual E-commerce Site",
      category: "web",
      tags: ["Next.js", "TypeScript", "Shopify", "Tailwind"],
      description: "Full-stack e-commerce solution with real-time inventory and advanced SEO optimization.",
      image: "/images/projects/ecommerce.jpg",
      demoUrl: "https://shop.example.com",
      codeUrl: "https://github.com/pegearts/multilingual-shop",
      year: 2024,
      featured: true,
      metrics: {
        conversion: "+45%",
        loadTime: "1.2s",
        seoScore: "98/100"
      }
    },
    {
      id: 3,
      title: "Voice Acting Portfolio App",
      category: "mobile",
      tags: ["React Native", "Audio API", "Firebase"],
      description: "Mobile app showcasing voice acting portfolio with advanced audio player and booking system.",
      image: "/images/projects/voice-app.jpg",
      year: 2023,
      metrics: {
        downloads: "5K+",
        rating: "4.8/5",
        retention: "85%"
      }
    },
    {
      id: 4,
      title: "SEO Analytics Dashboard",
      category: "web",
      tags: ["Vue.js", "Python", "Google APIs"],
      description: "Comprehensive SEO tracking dashboard with keyword monitoring and automated reporting.",
      image: "/images/projects/seo-dashboard.jpg",
      year: 2023,
      metrics: {
        clients: "50+",
        accuracy: "96%",
        timesSaved: "20h/week"
      }
    },
    {
      id: 5,
      title: "AI Voice Synthesis Tool",
      category: "ai",
      tags: ["Python", "TensorFlow", "React", "FastAPI"],
      description: "Advanced voice synthesis tool that can clone voices in multiple languages.",
      image: "/images/projects/voice-synthesis.jpg",
      year: 2024,
      featured: true,
      metrics: {
        accuracy: "98%",
        languages: "15+",
        samples: "1M+"
      }
    },
    {
      id: 6,
      title: "Interactive Learning Platform",
      category: "web",
      tags: ["React", "Node.js", "MongoDB", "WebRTC"],
      description: "Educational platform with real-time collaboration and AI-powered personalization.",
      image: "/images/projects/learning-platform.jpg",
      year: 2023,
      metrics: {
        students: "25K+",
        completion: "89%",
        satisfaction: "4.7/5"
      }
    }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  return (
    <section id="portfolio" className="portfolio-section">
      <div className="container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="section-header">
            <h2 className="section-title">
              <span className="title-number">02.</span>
              My Portfolio
            </h2>
            <div className="title-line"></div>
          </motion.div>

          <motion.p variants={itemVariants} className="section-description">
            A showcase of projects where creativity meets technology. From AI-powered 
            solutions to multilingual applications, each project represents a unique 
            challenge solved through innovative thinking.
          </motion.p>

          {/* Category Filter */}
          <motion.div variants={itemVariants} className="portfolio-filters">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{category.label}</span>
                <span className="filter-count">{category.count}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div className="projects-grid" layout>
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className={`project-card ${project.featured ? 'featured' : ''}`}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Project Image */}
                  <div className="project-image">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      loading="lazy"
                    />
                    <div className="project-overlay">
                      <div className="project-actions">
                        <motion.a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="action-btn demo-btn"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <i className="fas fa-external-link-alt"></i>
                        </motion.a>
                        {project.codeUrl && (
                          <motion.a
                            href={project.codeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="action-btn code-btn"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <i className="fab fa-github"></i>
                          </motion.a>
                        )}
                      </div>
                    </div>
                    {project.featured && (
                      <div className="featured-badge">
                        <i className="fas fa-star"></i>
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Project Content */}
                  <div className="project-content">
                    <div className="project-meta">
                      <span className="project-year">{project.year}</span>
                      <span className="project-category">{project.category}</span>
                    </div>
                    
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    
                    <div className="project-tags">
                      {project.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="project-tag">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Project Metrics */}
                    {project.metrics && (
                      <div className="project-metrics">
                        {Object.entries(project.metrics).map(([key, value]) => (
                          <div key={key} className="metric-item">
                            <span className="metric-value">{value}</span>
                            <span className="metric-label">{key}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Call to Action */}
          <motion.div variants={item
