// src/components/About.tsx
'use client';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Code, Sparkles, MapPin, Calendar, Cpu, Smartphone, Palette } from 'lucide-react';

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
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.3, 0.7, 0.9, 1], [0, 0.3, 1, 1, 0.3, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.3, 0.7, 0.9, 1], [0.9, 0.93, 1, 1, 0.93, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [50, 0, 0, -50]);

  return (
    <section id="about" ref={containerRef} className="py-20 px-6 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          style={{ opacity, scale, y }}
        >
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-full mb-4">
            <Sparkles size={24} className="text-blue-600" />
          </div>
          <h1 className="text-3xl font-light text-gray-900 mb-4">
            About Me
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Software Engineering student passionate about creating digital experiences 
            with modern technologies.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column - Personal Info */}
          <div className="space-y-6">
            <FadeIn delay={0.2}>
              <motion.div 
                className="bg-blue-50 rounded-lg p-6"
                style={{ opacity, scale, y }}
              >
                <h3 className="text-lg font-medium text-gray-800 mb-4">Personal Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Calendar size={18} className="text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Date of Birth</p>
                      <p className="font-medium text-gray-800">March 27, 2004</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <MapPin size={18} className="text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-medium text-gray-800">Batam, Indonesia</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <GraduationCap size={18} className="text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Education</p>
                      <p className="font-medium text-gray-800">Software Engineering</p>
                      <p className="text-xs text-gray-500">Batam State Polytechnic</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <motion.div 
                className="bg-green-50 rounded-lg p-6"
                style={{ opacity, scale, y }}
              >
                <h3 className="text-lg font-medium text-gray-800 mb-4">Technical Skills</h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-gray-700 text-sm mb-1">Frontend</p>
                    <p className="text-gray-600 text-sm">JavaScript, TypeScript, Next.js, React, Tailwind CSS</p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-gray-700 text-sm mb-1">Backend</p>
                    <p className="text-gray-600 text-sm">Laravel, PHP, MySQL, Blade</p>
                  </div>

                  <div>
                    <p className="font-medium text-gray-700 text-sm mb-1">Mobile</p>
                    <p className="text-gray-600 text-sm">React Native, Expo</p>
                  </div>

                  <div>
                    <p className="font-medium text-gray-700 text-sm mb-1">Tools & Design</p>
                    <p className="text-gray-600 text-sm">Figma, Git, GitHub, AppSheet</p>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          </div>

          {/* Right Column - Focus & Philosophy */}
          <div className="space-y-6">
            <FadeIn delay={0.3}>
              <motion.div 
                className="bg-purple-50 rounded-lg p-6"
                style={{ opacity, scale, y }}
              >
                <h3 className="text-lg font-medium text-gray-800 mb-4">Current Focus</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm">
                      <Code size={20} className="text-purple-600" />
                    </div>
                    <h4 className="font-medium text-gray-800 text-sm">Web Dev</h4>
                    <p className="text-xs text-gray-600 mt-1">Next.js & Laravel</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm">
                      <Smartphone size={20} className="text-purple-600" />
                    </div>
                    <h4 className="font-medium text-gray-800 text-sm">Mobile Dev</h4>
                    <p className="text-xs text-gray-600 mt-1">React Native</p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm">
                      <Palette size={20} className="text-purple-600" />
                    </div>
                    <h4 className="font-medium text-gray-800 text-sm">UI/UX</h4>
                    <p className="text-xs text-gray-600 mt-1">Figma</p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm">
                      <Cpu size={20} className="text-purple-600" />
                    </div>
                    <h4 className="font-medium text-gray-800 text-sm">Full-Stack</h4>
                    <p className="text-xs text-gray-600 mt-1">JS & TS</p>
                  </div>
                </div>
              </motion.div>
            </FadeIn>

            <FadeIn delay={0.5}>
              <motion.div 
                className="bg-orange-50 rounded-lg p-6"
                style={{ opacity, scale, y }}
              >
                <h3 className="text-lg font-medium text-gray-800 mb-4">Philosophy</h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  I believe in creating digital solutions that not only look beautiful 
                  but also provide seamless user experiences.
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  My approach combines technical expertise with creative problem-solving 
                  to deliver products that are both functional and delightful to use.
                </p>
              </motion.div>
            </FadeIn>
          </div>
        </div>

        {/* Stats Section */}
        <FadeIn delay={0.6}>
          <motion.div 
            className="mt-12 grid grid-cols-3 gap-6"
            style={{ opacity, scale, y }}
          >
            <div className="text-center bg-blue-50 rounded-lg py-4">
              <div className="text-xl font-light text-blue-600 mb-1">8+</div>
              <div className="text-gray-600 text-xs">Projects</div>
            </div>
            <div className="text-center bg-green-50 rounded-lg py-4">
              <div className="text-xl font-light text-green-600 mb-1">2+</div>
              <div className="text-gray-600 text-xs">Years</div>
            </div>
            <div className="text-center bg-purple-50 rounded-lg py-4">
              <div className="text-xl font-light text-purple-600 mb-1">10+</div>
              <div className="text-gray-600 text-xs">Technologies</div>
            </div>
          </motion.div>
        </FadeIn>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100 rounded-full opacity-20 blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-100 rounded-full opacity-20 blur-3xl -z-10"></div>
    </section>
  );
}