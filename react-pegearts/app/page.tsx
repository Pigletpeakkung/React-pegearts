 'use client'
import { useEffect, useRef, useState } from 'react'

export default function Page() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('all')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const heroContentRef = useRef<HTMLDivElement>(null)

  // Preloader
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Navbar scroll effects
  useEffect(() => {
    let lastScrollY = 0
    
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar')
      const currentScrollY = window.scrollY

      if (navbar) {
        // Add scrolled class for background effect
        if (currentScrollY > 50) {
          navbar.classList.add('scrolled')
        } else {
          navbar.classList.remove('scrolled')
        }

        // Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          navbar.classList.add('hidden')
        } else {
          navbar.classList.remove('hidden')
        }
      }

      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Particle Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
    }> = []

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.1
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(167, 139, 250, ${particle.opacity})`
        ctx.fill()

        // Draw connections
        particles.forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(167, 139, 250, ${0.1 * (1 - distance / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Typing animation for subtitle
  useEffect(() => {
    const subtitle = document.querySelector('.subtitle')
    if (!subtitle) return

    const text = 'AI Creative Designer & Digital Innovator'
    let index = 0

    const typeWriter = () => {
      if (index < text.length) {
        subtitle.textContent = text.slice(0, index + 1)
        index++
        setTimeout(typeWriter, 100)
      }
    }

    setTimeout(typeWriter, 1000)
  }, [])

  // Scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, observerOptions)

    const fadeElements = document.querySelectorAll('.fade-in')
    fadeElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // Stats counter animation
  useEffect(() => {
    const animateCounter = (element: Element, target: number) => {
      let current = 0
      const increment = target / 100
      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        element.textContent = Math.floor(current).toString()
      }, 20)
    }

    const statNumbers = document.querySelectorAll('[data-count]')
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.getAttribute('data-count') || '0')
          animateCounter(entry.target, target)
          statsObserver.unobserve(entry.target)
        }
      })
    })

    statNumbers.forEach((stat) => statsObserver.observe(stat))

    return () => statsObserver.disconnect()
  }, [])

  // Character floating animation
  useEffect(() => {
    const heroTitle = document.querySelector('.hero-title')
    if (!heroTitle) return

    const text = heroTitle.textContent || ''
    heroTitle.innerHTML = text
      .split('')
      .map((char, index) => 
        `<span class="char" style="animation-delay: ${index * 0.1}s">${char === ' ' ? '&nbsp;' : char}</span>`
      )
      .join('')
  }, [])

  // Portfolio filtering
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter)
    const portfolioItems = document.querySelectorAll('.portfolio-item')
    
    portfolioItems.forEach((item) => {
      const category = item.getAttribute('data-category')
      if (filter === 'all' || category === filter) {
        (item as HTMLElement).style.display = 'block'
        setTimeout(() => {
          item.classList.add('visible')
        }, 100)
      } else {
        item.classList.remove('visible')
        setTimeout(() => {
          (item as HTMLElement).style.display = 'none'
        }, 300)
      }
    })
  }

  // Contact form handling
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    // Add your form submission logic here
    console.log('Form submitted:', Object.fromEntries(formData))
    
    // Show success message (you can customize this)
    alert('Message sent successfully!')
    e.currentTarget.reset()
  }

  // Moon container interaction
  const handleMoonClick = () => {
    const moonContainer = document.querySelector('.moon-container')
    if (moonContainer) {
      moonContainer.classList.add('clicked')
      setTimeout(() => {
        moonContainer.classList.remove('clicked')
      }, 1000)
    }
  }

  return (
    <>
      {/* Preloader */}
      {isLoading && (
        <div className="preloader">
          <div className="preloader-spinner"></div>
        </div>
      )}

      {/* Header */}
      <header className="header" id="header" role="banner">
        <nav className="navbar navbar-expand-lg fixed-top" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
          <div className="container">
            <a className="navbar-brand logo" href="#home">Thanatsitt</a>
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navMenu" 
              aria-controls="navMenu" 
              aria-expanded="false" 
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navMenu">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item"><a className="nav-link active" href="#home">Home</a></li>
                <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
                <li className="nav-item"><a className="nav-link" href="#services">Services</a></li>
                <li className="nav-item"><a className="nav-link" href="#portfolio">Portfolio</a></li>
                <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <main id="main-content">
        {/* Enhanced Hero Section */}
        <section className="hero" id="home">
          {/* Particle Canvas */}
          <canvas ref={canvasRef} className="particle-canvas" id="particleCanvas"></canvas>

          {/* Geometric shapes background */}
          <div className="geometric-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>

          {/* Background Gradient Blobs */}
          <div className="hero-bg-gradient">
            <div className="gradient-blob gradient-blob-1"></div>
            <div className="gradient-blob gradient-blob-2"></div>
            <div className="gradient-blob gradient-blob-3"></div>
          </div>

          {/* Enhanced Moon Container */}
          <div className="moon-container" id="moonContainer" onClick={handleMoonClick}>
            <div className="moon-glow"></div>
            <svg className="moon" viewBox="0 0 200 200" aria-label="Decorative moon illustration">
              <defs>
                <radialGradient id="moonGradient" cx="0.3" cy="0.3" r="0.8">
                  <stop offset="0%" style={{ stopColor: '#FDFCFB', stopOpacity: 1 }} />
                  <stop offset="70%" style={{ stopColor: '#F7F3F0', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#E8E4E1', stopOpacity: 1 }} />
                </radialGradient>
                <filter id="moonShadow">
                  <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#D1D5DB" floodOpacity="0.3"/>
                </filter>
              </defs>
              <circle cx="100" cy="100" r="90" fill="url(#moonGradient)" filter="url(#moonShadow)"/>
              <circle cx="75" cy="75" r="18" fill="#F0E6FF" opacity="0.4"/>
              <circle cx="130" cy="85" r="12" fill="#FFE6F0" opacity="0.5"/>
              <circle cx="115" cy="135" r="22" fill="#E6FFF0" opacity="0.3"/>
              <circle cx="65" cy="125" r="10" fill="#F0E6FF" opacity="0.4"/>
            </svg>
          </div>

          {/* Hero Content */}
          <div className="hero-content" id="heroContent" ref={heroContentRef}>
            <h1 className="hero-title">Thanatsitt Santisamranwilai</h1>
            <p className="subtitle"></p>
            <p className="hero-description">
              Crafting the future of digital experiences through the perfect blend of artificial intelligence, 
              creative vision, and innovative design thinking.
            </p>
            <div className="hero-cta">
              <a href="#contact" className="cta-button">
                <span className="button-text">Let&apos;s Create Together</span>
              </a>
              <a href="#portfolio" className="cta-button cta-secondary">
                <span className="button-text">View My Work</span>
              </a>
            </div>
            <div className="social-links">
              <a href="https://www.linkedin.com/in/thanatsitt" aria-label="LinkedIn profile" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://github.com/thanattsitt" aria-label="GitHub profile" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://dribbble.com/thanatsitt" aria-label="Dribbble profile" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-dribbble"></i>
              </a>
              <a href="https://twitter.com/thanatsitt" aria-label="Twitter profile" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>

          <div className="scroll-indicator">
            <span>Scroll to explore</span>
            <div className="scroll-animation">
              <i className="fas fa-chevron-down"></i>
              <i className="fas fa-chevron-down"></i>
              <i className="fas fa-chevron-down"></i>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="section about-section" id="about">
          <div className="container">
            <h2 className="section-title fade-in">About Me</h2>
            <p className="section-subtitle fade-in">Bridging the gap between technology and creativity</p>

            <div className="about-content fade-in">
              <div className="about-image">
                <div className="about-image-wrapper">
                                    <video 
                    width="500" 
                    height="600" 
                    controls 
                    muted 
                    autoPlay 
                    loop 
                    playsInline 
                    style={{ display: 'block' }}
                  >
                    <source src="assets/vid/thanattsittMechanical-Botanical-Style-500x600.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
              <div className="about-text">
                <h3>Innovating at the Intersection of AI and Design</h3>
                <p>
                  As an AI Creative Designer with a passion for pushing boundaries, I specialize in creating 
                  innovative digital experiences that seamlessly blend artificial intelligence with human-centered design.
                </p>
                <p>
                  My expertise spans across AI training, script writing, multilingual translation, voice acting, 
                  and conducting natural flow talk sessions. I work with leading AI companies to enhance their 
                  models through authentic, culturally-aware content creation.
                </p>
                <div className="stats-grid">
                  <div className="stat-item">
                    <div className="stat-number">5+</div>
                    <div className="stat-label">Years Experience</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">50+</div>
                    <div className="stat-label">AI Projects</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">1000+</div>
                    <div className="stat-label">Training Hours</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Companies Section */}
        <section className="section companies-section" id="companies">
          <div className="container">
            <h2 className="section-title fade-in">Trusted By Leading Companies</h2>
            <p className="section-subtitle fade-in">Collaborating with innovative organizations in AI and technology</p>

            {/* Infinite Logo Scroll */}
            <div className="logo-scroll-wrapper">
              <div className="logo-scroll">
                <div className="logo-track">
                  <div className="logo-item">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/2560px-OpenAI_Logo.svg.png" alt="OpenAI" loading="lazy" />
                    <span className="logo-name">OpenAI</span>
                  </div>
                  <div className="logo-item">
                    <img src="https://via.placeholder.com/200x80/A78BFA/ffffff?text=BARBEL" alt="Barbel" loading="lazy" />
                    <span className="logo-name">Barbel</span>
                  </div>
                  <div className="logo-item">
                    <img src="https://via.placeholder.com/200x80/F9A8D4/ffffff?text=CROWNGEN" alt="Crowngen" loading="lazy" />
                    <span className="logo-name">Crowngen</span>
                  </div>
                  <div className="logo-item">
                    <img src="https://via.placeholder.com/200x80/6EE7B7/ffffff?text=TELLUS" alt="Tellus" loading="lazy" />
                    <span className="logo-name">Tellus</span>
                  </div>
                  <div className="logo-item">
                    <img src="https://via.placeholder.com/200x80/FCD34D/ffffff?text=ONEFORMA" alt="OneForma" loading="lazy" />
                    <span className="logo-name">OneForma</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Partnership Stats */}
            <div className="partnership-stats">
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-building"></i>
                </div>
                <div className="stat-content">
                  <span className="stat-number" data-count="10">0</span>
                  <span className="stat-label">Partner Companies</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-project-diagram"></i>
                </div>
                <div className="stat-content">
                  <span className="stat-number" data-count="50">0</span>
                  <span className="stat-label">AI Projects</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-microphone"></i>
                </div>
                <div className="stat-content">
                  <span className="stat-number" data-count="1000">0</span>
                  <span className="stat-label">Voice Sessions</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="section services-section" id="services">
          <div className="container">
            <h2 className="section-title fade-in">AI Training & Creative Services</h2>
            <p className="section-subtitle fade-in">Specialized expertise in AI model training and creative content development</p>

            {/* AI Training Services Grid */}
            <div className="services-grid">
              <div className="service-card fade-in">
                <div className="service-icon">
                  <i className="fas fa-feather-alt"></i>
                  <div className="icon-bg"></div>
                </div>
                <h3>AI Script Writing</h3>
                <p>Creating natural, contextual scripts for AI training datasets. Specializing in conversational flows, dialogue variations, and scenario-based content.</p>
                <ul className="service-features">
                  <li><i className="fas fa-check"></i> Natural dialogue patterns</li>
                  <li><i className="fas fa-check"></i> Multi-context scenarios</li>
                  <li><i className="fas fa-check"></i> Cultural adaptations</li>
                </ul>
                <div className="service-stats">
                  <span className="badge">500+ Scripts</span>
                  <span className="badge">10+ Languages</span>
                </div>
              </div>

              <div className="service-card fade-in">
                <div className="service-icon">
                  <i className="fas fa-language"></i>
                  <div className="icon-bg"></div>
                </div>
                <h3>Multilingual Translation</h3>
                <p>High-quality translations for AI training data, maintaining context, tone, and cultural nuances across languages.</p>
                <ul className="service-features">
                  <li><i className="fas fa-check"></i> Context preservation</li>
                  <li><i className="fas fa-check"></i> Idiomatic accuracy</li>
                  <li><i className="fas fa-check"></i> Technical terminology</li>
                </ul>
                <div className="service-stats">
                  <span className="badge">EN/TH/JP</span>
                  <span className="badge">99% Accuracy</span>
                </div>
              </div>

              <div className="service-card fade-in">
                <div className="service-icon">
                  <i className="fas fa-microphone-alt"></i>
                  <div className="icon-bg"></div>
                </div>
                <h3>Voice Acting & Recording</h3>
                <p>Professional voice recordings for AI speech models, featuring diverse tones, emotions, and speaking styles.</p>
                <ul className="service-features">
                  <li><i className="fas fa-check"></i> Emotional variations</li>
                  <li><i className="fas fa-check"></i> Clear articulation</li>
                  <li><i className="fas fa-check"></i> Multiple personas</li>
                </ul>
                <div className="service-stats">
                  <span className="badge">1000+ Hours</span>
                  <span className="badge">Studio Quality</span>
                </div>
              </div>

              <div className="service-card fade-in featured">
                <div className="service-icon">
                  <i className="fas fa-comments"></i>
                  <div className="icon-bg"></div>
                </div>
                <h3>Natural Flow Talk Sessions</h3>
                <p>Conducting authentic conversational sessions for training conversational AI models with real-world dialogue patterns.</p>
                <ul className="service-features">
                  <li><i className="fas fa-check"></i> Spontaneous conversations</li>
                  <li><i className="fas fa-check"></i> Topic diversity</li>
                  <li><i className="fas fa-check"></i> Natural interruptions</li>
                </ul>
                <div className="service-stats">
                  <span className="badge">Expert Level</span>
                  <span className="badge">Live Sessions</span>
                </div>
              </div>
            </div>

            {/* AI Training Process */}
            <div className="ai-process-section">
              <h3 className="process-title">My AI Training Process</h3>
              <div className="process-timeline">
                <div className="process-step">
                  <div className="step-number">01</div>
                  <div className="step-content">
                    <h4>Understanding Requirements</h4>
                    <p>Analyzing AI model needs and data specifications</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">02</div>
                  <div className="step-content">
                    <h4>Content Creation</h4>
                    <p>Developing scripts, translations, or recording sessions</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">03</div>
                  <div className="step-content">
                    <h4>Quality Assurance</h4>
                    <p>Ensuring natural flow and contextual accuracy</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">04</div>
                  <div className="step-content">
                    <h4>Iterative Refinement</h4>
                    <p>Continuous improvement based on model feedback</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="section portfolio-section" id="portfolio">
          <div className="container">
            <h2 className="section-title fade-in">Featured Work</h2>
            <p className="section-subtitle fade-in">Showcasing AI training projects and creative innovations</p>

            <div className="portfolio-filters">
              {['all', 'ai-training', 'voice', 'translation', 'design'].map((filter) => (
                <button
                  key={filter}
                  className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                  onClick={() => handleFilterChange(filter)}
                >
                  {filter === 'all' ? 'All Projects' : 
                   filter === 'ai-training' ? 'AI Training' :
                   filter === 'voice' ? 'Voice Acting' :
                   filter === 'translation' ? 'Translation' : 'Design'}
                </button>
              ))}
            </div>

            <div className="portfolio-grid">
              <div className="portfolio-item fade-in" data-category="ai-training">
                <img src="https://via.placeholder.com/400x300/A78BFA/ffffff?text=AI+Training" alt="AI Training Project" className="portfolio-image" loading="lazy" />
                <div className="portfolio-overlay">
                  <h3>Conversational AI Training</h3>
                  <p>Created 500+ natural dialogue scenarios for customer service AI</p>
                </div>
              </div>

              <div className="portfolio-item fade-in" data-category="voice">
                <img src="https://via.placeholder.com/400x300/F9A8D4/ffffff?text=Voice+Acting" alt="Voice Acting Project" className="portfolio-image" loading="lazy" />
                <div className="portfolio-overlay">
                  <h3>Multilingual Voice Dataset</h3>
                  <p>Recorded 100+ hours of diverse voice samples for TTS models</p>
                </div>
              </div>

              <div className="portfolio-item fade-in" data-category="translation">
                <img src="https://via.placeholder.com/400x300/6EE7B7/ffffff?text=Translation" alt="Translation Project" className="portfolio-image" loading="lazy" />
                <div className="portfolio-overlay">
                  <h3>Technical Documentation Translation</h3>
                  <p>Translated AI training materials across 5 languages</p>
                </div>
              </div>

              <div className="portfolio-item fade-in" data-category="design">
                <img src="https://via.placeholder.com/400x300/FCD34D/ffffff?text=UI+Design" alt="Design Project" className="portfolio-image" loading="lazy" />
                <div className="portfolio-overlay">
                  <h3>AI Dashboard Interface</h3>
                  <p>Designed intuitive UI for AI training platform</p>
                </div>
              </div>

              <div className="portfolio-item fade-in" data-category="ai-training">
                <img src="https://via.placeholder.com/400x300/E9D5FF/ffffff?text=Script+Writing" alt="Script Writing Project" className="portfolio-image" loading="lazy" />
                <div className="portfolio-overlay">
                  <h3>Natural Flow Conversations</h3>
                  <p>Conducted 200+ spontaneous dialogue sessions</p>
                </div>
              </div>

              <div className="portfolio-item fade-in" data-category="voice">
                <img src="https://via.placeholder.com/400x300/BBF7D0/ffffff?text=Audio+Project" alt="Audio Project" className="portfolio-image" loading="lazy" />
                <div className="portfolio-overlay">
                  <h3>Emotion Recognition Dataset</h3>
                  <p>Voice samples with 10+ emotional variations</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="section contact-section" id="contact">
          <div className="container">
            <h2 className="section-title fade-in">Let&apos;s Connect</h2>
            <p className="section-subtitle fade-in">Ready to collaborate on your next AI project?</p>

            <div className="contact-content">
              <div className="contact-info">
                <h3>Get in Touch</h3>
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="contact-details">
                    <h4>Email</h4>
                    <p>thanatsitt@example.com</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className="contact-details">
                    <h4>Phone</h4>
                    <p>+66 XX XXX XXXX</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="contact-details">
                    <h4>Location</h4>
                    <p>Bangkok, Thailand</p>
                  </div>
                </div>
              </div>

              <form className="contact-form fade-in" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input type="text" className="form-control" id="name" name="name" required />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" className="form-control" id="email" name="email" required />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input type="text" className="form-control" id="subject" name="subject" required />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea className="form-control" id="message" name="message" rows={5} required></textarea>
                </div>

                <button type="submit" className="submit-btn">Send Message</button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Thanatsitt Santisamranwilai</h3>
              <p>AI Creative Designer & Digital Innovator crafting the future of human-AI interaction through innovative content and design.</p>
              <div className="footer-social">
                <a href="https://www.linkedin.com/in/thanatsitt" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://github.com/thanatsitt" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-github"></i>
                </a>
                <a href="https://dribbble.com/thanatsitt" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-dribbble"></i>
                </a>
                <a href="https://twitter.com/thanatsitt" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"></i>
                </a>
              </div>
            </div>

            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul className="footer-links">
                <li><a href="#about">About Me</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#portfolio">Portfolio</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Services</h3>
              <ul className="footer-links">
                <li><a href="#services">AI Script Writing</a></li>
                <li><a href="#services">Translation Services</a></li>
                <li><a href="#services">Voice Acting</a></li>
                <li><a href="#services">Natural Flow Sessions</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Newsletter</h3>
              <p>Stay updated with AI trends and my latest projects</p>
              <form className="newsletter-form" onSubmit={(e) => {
                e.preventDefault()
                const email = (e.target as HTMLFormElement).email.value
                console.log('Newsletter signup:', email)
                alert('Thank you for subscribing!')
                ;(e.target as HTMLFormElement).reset()
              }}>
                                <input type="email" name="email" placeholder="Your email" className="form-control mb-3" required />
                <button type="submit" className="btn btn-primary w-100">Subscribe</button>
              </form>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 Thanatsitt Santisamranwilai. All rights reserved. | Designed with <i className="fas fa-heart" style={{ color: 'var(--bs-primary)' }}></i> and AI</p>
          </div>
        </div>
      </footer>
    </>
  );
      }
