// src/components/Hero.tsx
'use client';
import { useRef, useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useScroll, useTransform, motion } from 'framer-motion';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const animationRef = useRef<number | null>(null);

  // Scroll animation for fade in/out based on scroll position
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  // Function to scroll to contact section
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Function to open resume
  const openResume = () => {
    window.open('https://drive.google.com/file/d/13aXnfkKH5__PQQiv1lP843CRFLN_CNZC/view?usp=sharing', '_blank');
  };

  useEffect(() => {
    // Set loading state after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // Background animation with canvas - Professional aesthetic animation
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Enhanced aesthetic particle system with flowing lines
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      history: { x: number; y: number }[];
      maxHistory: number;
    }

    const particles: Particle[] = [];
    const colors = [
      'rgba(136, 136, 136, 0.2)', // Gray
      'rgba(170, 170, 170, 0.15)', // Light Gray
      'rgba(204, 204, 204, 0.1)',  // Lighter Gray
      'rgba(180, 180, 220, 0.1)',  // Lavender tint
      'rgba(200, 200, 240, 0.1)',  // Light lavender
    ];

    // Create particles
    for (let i = 0; i < 60; i++) {
      const size = Math.random() * 1.5 + 0.5;
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const speedX = (Math.random() - 0.5) * 0.4;
      const speedY = (Math.random() - 0.5) * 0.4;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const maxHistory = Math.floor(Math.random() * 20) + 10;
      const history: { x: number; y: number }[] = [];

      particles.push({ x, y, size, speedX, speedY, color, history, maxHistory });
    }

    // Animate particles
    const animate = () => {
      if (!ctx) return;
      
      // Clear with a luxury gray background with subtle fade effect
      ctx.fillStyle = 'rgba(245, 245, 247, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        // Add slight random movement for organic feel
        particle.x += particle.speedX + (Math.random() - 0.5) * 0.2;
        particle.y += particle.speedY + (Math.random() - 0.5) * 0.2;

        // Store position history for trail effect
        particle.history.push({ x: particle.x, y: particle.y });
        if (particle.history.length > particle.maxHistory) {
          particle.history.shift();
        }

        // Bounce off walls with slight randomness
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1;
          particle.x = particle.x < 0 ? 0 : canvas.width;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1;
          particle.y = particle.y < 0 ? 0 : canvas.height;
        }

        // Draw particle trail (aesthetic flowing lines)
        if (particle.history.length > 2) {
          ctx.beginPath();
          ctx.moveTo(particle.history[0].x, particle.history[0].y);
          
          for (let i = 1; i < particle.history.length; i++) {
            const point = particle.history[i];
            ctx.lineTo(point.x, point.y);
          }
          
          ctx.strokeStyle = particle.color;
          ctx.lineWidth = particle.size * 0.5;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.stroke();
        }

        // Draw connections between nearby particles
        particles.forEach((otherParticle) => {
          if (particle === otherParticle) return;
          
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            
            // Vary connection opacity based on distance
            const alpha = 0.1 * (1 - distance / 120);
            ctx.strokeStyle = `rgba(120, 120, 120, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleScroll = () => {
      if (!titleRef.current || !subtitleRef.current || !scrollIndicatorRef.current) return;
      
      const scrollY = window.scrollY;
      
      // Enhanced fade out elements on scroll
      const elementOpacity = 1 - scrollY / 300;
      if (titleRef.current) {
        titleRef.current.style.opacity = Math.max(0, elementOpacity).toString();
      }
      if (subtitleRef.current) {
        subtitleRef.current.style.opacity = Math.max(0, elementOpacity - 0.2).toString();
      }
      
      // Fade out scroll indicator faster
      if (scrollIndicatorRef.current) {
        scrollIndicatorRef.current.style.opacity = Math.max(0, 1 - scrollY / 100).toString();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <section className="h-screen flex items-center justify-center relative overflow-hidden bg-[#f5f5f7]">
      {/* Animated Canvas Background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0"
      />
      
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 z-1 bg-gradient-to-b from-[#f5f5f7]/70 via-[#f5f5f7]/40 to-[#f5f5f7]/70"></div>
      
      {/* Logo di kiri atas - Fixed position seperti di About */}
      <div className="fixed top-6 left-6 md:top-8 md:left-8 z-30 transition-all duration-500">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white/80 backdrop-blur-md flex items-center justify-center p-1.5 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
          <img
            src="https://i.ibb.co/1YG7QMXB/logo.png"
            alt="Syifa Rafifah Logo"
            className="rounded-lg object-contain w-full h-full"
          />
        </div>
      </div>
      
      <motion.div 
        style={{ 
          opacity,
          scale
        }}
        className="text-center z-20 px-4 max-w-4xl mx-auto w-full"
      >
        <h1 
          ref={titleRef}
          className={`text-6xl md:text-8xl lg:text-9xl font-thin mb-6 text-gray-900 transition-all duration-700 tracking-tight ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ 
            fontWeight: 200,
            transitionDelay: '0.2s'
          }}
        >
          SYIFA <span className="text-gray-700">RAFIFAH</span>
        </h1>
        
        <p 
          ref={subtitleRef}
          className={`text-xl md:text-2xl text-gray-600 mb-10 transition-all duration-700 font-light tracking-wide ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ 
            transitionDelay: '0.4s'
          }}
        >
          <span className="block">Frontend Engineer & UI/UX Specialist</span>
          <span className="text-sm md:text-base text-gray-500 mt-2 block">
            Crafting intuitive digital experiences with modern technologies
          </span>
        </p>
        
        <div className={`mt-20 flex flex-col md:flex-row justify-center items-center gap-4 transition-all duration-700 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ 
          transitionDelay: '0.6s'
        }}>
          <button 
            onClick={openResume}
            className="px-8 py-3 bg-gray-900 text-white rounded-full text-lg hover:bg-gray-800 transition-all duration-300 font-normal transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
          >
            View Resume
          </button>
          <button 
            onClick={scrollToContact}
            className="px-8 py-3 bg-transparent text-gray-900 border border-gray-400 rounded-full text-lg hover:bg-white/70 transition-all duration-300 font-normal transform hover:scale-105 backdrop-blur-sm cursor-pointer"
          >
            Start Collaboration
          </button>
        </div>
      </motion.div>
      
      <div 
        ref={scrollIndicatorRef}
        className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 transition-all duration-700 z-30 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ 
          transitionDelay: '0.8s'
        }}
      >
        <div className="animate-bounce">
          <ChevronDown size={36} color="#666" className="opacity-70" />
        </div>
      </div>
    </section>
  );
}