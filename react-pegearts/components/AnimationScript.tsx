'use client'
import Script from 'next/script'

export default function AnimationScript() {
  return (
    <Script id="main-animations" strategy="afterInteractive">
      {`
        // Wait for DOM to be fully loaded
        document.addEventListener('DOMContentLoaded', function() {
          console.log('Animations initializing...');
          
          // Preloader
          window.addEventListener('load', () => {
            const preloader = document.querySelector('.preloader');
            if (preloader && window.gsap) {
              window.gsap.to(preloader, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                  preloader.style.display = 'none';
                }
              });
            }
          });

          // Navbar scroll behavior
          let lastScroll = 0;
          const navbar = document.querySelector('.navbar');

          window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (navbar) {
              // Add scrolled class
              if (currentScroll > 50) {
                navbar.classList.add('scrolled');
              } else {
                navbar.classList.remove('scrolled');
              }

              // Hide/show navbar
              if (currentScroll > lastScroll && currentScroll > 300) {
                navbar.classList.add('hidden');
              } else {
                navbar.classList.remove('hidden');
              }
            }

            lastScroll = currentScroll;
          });

          // Particle System
          const canvas = document.getElementById('particleCanvas');
          if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
              canvas.width = window.innerWidth;
              canvas.height = window.innerHeight;

              const particles = [];
              const particleCount = window.innerWidth < 768 ? 30 : 50;

              // Create particles
              for (let i = 0; i < particleCount; i++) {
                particles.push({
                  x: Math.random() * canvas.width,
                  y: Math.random() * canvas.height,
                  vx: (Math.random() - 0.5) * 0.5,
                  vy: (Math.random() - 0.5) * 0.5,
                  size: Math.random() * 2 + 1,
                  opacity: Math.random() * 0.3 + 0.1
                });
              }

              function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                particles.forEach((particle) => {
                  // Update position
                  particle.x += particle.vx;
                  particle.y += particle.vy;

                  // Wrap around edges
                  if (particle.x < 0) particle.x = canvas.width;
                  if (particle.x > canvas.width) particle.x = 0;
                  if (particle.y < 0) particle.y = canvas.height;
                  if (particle.y > canvas.height) particle.y = 0;

                  // Draw particle
                  ctx.beginPath();
                  ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                  ctx.fillStyle = 'rgba(167, 139, 250, ' + particle.opacity + ')';
                  ctx.fill();

                  // Draw connections
                  particles.forEach((otherParticle) => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                      ctx.beginPath();
                      ctx.moveTo(particle.x, particle.y);
                      ctx.lineTo(otherParticle.x, otherParticle.y);
                      ctx.strokeStyle = 'rgba(167, 139, 250, ' + (0.1 * (1 - distance / 100)) + ')';
                      ctx.lineWidth = 0.5;
                      ctx.stroke();
                    }
                  });
                });

                requestAnimationFrame(animate);
              }

              animate();

              // Handle resize
              window.addEventListener('resize', () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
              });
            }
          }

          // Fade in animations
          const fadeElements = document.querySelectorAll('.fade-in');
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add('visible');
              }
            });
          }, { threshold: 0.1 });

          fadeElements.forEach(element => {
            observer.observe(element);
          });

          // Smooth scrolling for anchor links
          document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
              e.preventDefault();
              const target = document.querySelector(this.getAttribute('href'));
              if (target) {
                const offset = 80;
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                  top: targetPosition,
                  behavior: 'smooth'
                });
              }
            });
          });

          console.log('Basic animations initialized!');
        });
      `}
    </Script>
  )
}
