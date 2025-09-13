// src/components/About.tsx
'use client';
import { useInView, useScroll, useTransform, motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { GraduationCap, Code, Sparkles, Award, Clock, Palette } from 'lucide-react';

interface FadeInProps {
  children: React.ReactNode;
  delay: number;
}

const FadeIn: React.FC<FadeInProps> = ({ children, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-10%' }); // Changed to false untuk deteksi berulang
  const [isLoaded, setIsLoaded] = useState(false);

  // Scroll animation for the entire section - dengan offset yang diperbaiki
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Efek yang lebih halus untuk masuk dan keluar
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.3, 0.7, 0.9, 1], [0, 0.3, 1, 1, 0.3, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.3, 0.7, 0.9, 1], [0.9, 0.93, 1, 1, 0.93, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [50, 0, 0, -50]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="about" ref={containerRef} className="py-24 px-6 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ opacity, scale, y }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-6">
            <Sparkles size={32} className="text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            About Me
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Passionate developer crafting digital experiences that blend 
            innovative technology with intuitive design.
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          style={{ opacity, scale, y }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left Column - Personal Info */}
          <div className="space-y-8">
            <FadeIn delay={0.2}>
              <motion.div 
                className="bg-gray-50 rounded-2xl p-8"
                style={{ opacity, scale, y }}
              >
                <h3 className="text-2xl font-light text-gray-800 mb-6">Background</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <GraduationCap size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Education</h4>
                      <p className="text-gray-600">Diploma IV – Software Engineering Technology</p>
                      <p className="text-sm text-gray-500">Batam State Polytechnic</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award size={20} className="text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Specialization</h4>
                      <p className="text-gray-600">Full-Stack Development & UI/UX Design</p>
                      <p className="text-sm text-gray-500">Web & Mobile Applications</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <motion.div 
                className="bg-gray-50 rounded-2xl p-8"
                style={{ opacity, scale, y }}
              >
                <h3 className="text-2xl font-light text-gray-800 mb-6">Approach</h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock size={16} className="text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Efficient</h4>
                      <p className="text-gray-600">Clean code and optimized performance</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Palette size={16} className="text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Design-Oriented</h4>
                      <p className="text-gray-600">User-centered design principles</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          </div>

          {/* Right Column - Skills & Description */}
          <div className="space-y-8">
            <FadeIn delay={0.3}>
              <motion.div 
                className="bg-blue-50 rounded-2xl p-8"
                style={{ opacity, scale, y }}
              >
                <h3 className="text-2xl font-light text-gray-800 mb-6">Technical Focus</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                      <Code size={24} className="text-blue-600" />
                    </div>
                    <h4 className="font-medium text-gray-800 mb-2">Development</h4>
                    <p className="text-sm text-gray-600">Frontend & Backend</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                      <Palette size={24} className="text-blue-600" />
                    </div>
                    <h4 className="font-medium text-gray-800 mb-2">UI/UX Design</h4>
                    <p className="text-sm text-gray-600">User Experience</p>
                  </div>
                </div>
              </motion.div>
            </FadeIn>

            <FadeIn delay={0.5}>
              <motion.div 
                className="bg-white border border-gray-200 rounded-2xl p-8"
                style={{ opacity, scale, y }}
              >
                <h3 className="text-2xl font-light text-gray-800 mb-6">Philosophy</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  I believe in creating digital solutions that not only look beautiful 
                  but also provide seamless user experiences. Every line of code and 
                  every design element should serve a purpose and enhance the overall 
                  user journey.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  My approach combines technical expertise with creative problem-solving 
                  to deliver products that are both functional and delightful to use.
                </p>
              </motion.div>
            </FadeIn>
          </div>
        </motion.div>

        {/* Stats Section */}
        <FadeIn delay={0.6}>
          <motion.div 
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
            style={{ opacity, scale, y }}
          >
            <div className="text-center">
              <div className="text-3xl font-light text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light text-green-600 mb-2">3+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light text-purple-600 mb-2">100%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light text-orange-600 mb-2">20+</div>
              <div className="text-gray-600">Technologies</div>
            </div>
          </motion.div>
        </FadeIn>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full opacity-20 blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-100 rounded-full opacity-20 blur-3xl -z-10"></div>
    </section>
  );
}