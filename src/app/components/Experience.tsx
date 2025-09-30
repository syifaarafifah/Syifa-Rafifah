// src/components/Experience.tsx
'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  technologies?: string[];
}

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once: false,
    margin: '0px',
    amount: 0.2
  });

  const experiences: ExperienceItem[] = [
    {
      title: "Web Developer & AppSheet Developer",
      company: "Finlyn Fashion",
      location: "Batam",
      period: "April 2025 – August 2025",
      description: "Developed internal systems using Laravel & MySQL, including dashboards, automation tools, and a QR Code web application. Implemented responsive designs and optimized database performance.",
      technologies: ["Laravel", "MySQL", "JavaScript", "Bootstrap", "AppSheet"]
    },
    {
      title: "Intern – React Native Developer",
      company: "PT. Kawan Kerja",
      location: "Remote",
      period: "April 2025 – May 2025",
      description: "Developing mobile applications using React Native. Collaborating with cross-functional teams to build user-friendly features and implement modern UI/UX designs.",
      technologies: ["React Native", "JavaScript", "Git", "Figma", "API Integration"]
    },
    {
      title: "Administrative Staff",
      company: "SMK Negeri 8 Batam",
      location: "Batam",
      period: "July 2023 – January 2025",
      description: "Proficient in managing administrative data and documents using Microsoft Excel and Word. Streamlined document processing and improved data organization efficiency.",
      technologies: ["Microsoft Office", "Data Management", "Documentation"]
    }
  ];

  return (
    <motion.section 
      ref={ref} 
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30 min-h-screen flex items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />
      
      <div className="max-w-4xl mx-auto px-6 w-full relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-sm mb-6"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <FaBriefcase className="text-white text-sm" />
            </div>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4 tracking-tight">
            Work <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">Experience</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            My professional journey and career development
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200/50 to-purple-200/50" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="relative flex items-start group"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.2,
                  ease: "easeOut"
                }}
                whileHover={{ 
                  y: -2,
                  transition: { type: "spring", stiffness: 400, damping: 25 }
                }}
              >
                {/* Timeline Dot */}
                <motion.div 
                  className="absolute left-6 md:left-8 transform -translate-x-1/2 z-10 flex items-center justify-center"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="w-4 h-4 bg-white border-2 border-blue-500 rounded-full shadow-lg group-hover:bg-blue-500 group-hover:shadow-blue-200 transition-all duration-300" />
                </motion.div>

                {/* Content Card */}
                <div className="w-full ml-12 md:ml-16">
                  {/* Period */}
                  <motion.div 
                    className="mb-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.1 }}
                  >
                    <div className="flex items-center text-gray-500 text-sm font-medium">
                      <FaCalendarAlt className="mr-2 text-blue-500" />
                      <span>{exp.period}</span>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/60 shadow-sm hover:shadow-xl transition-all duration-300 group-hover:border-blue-200/50"
                    whileHover={{ 
                      y: -4,
                      transition: { type: "spring", stiffness: 300, damping: 20 }
                    }}
                  >
                    {/* Title and Company */}
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {exp.title}
                      </h3>
                      <div className="flex flex-col sm:flex-row sm:items-center text-gray-700 gap-2">
                        <div className="flex items-center">
                          <FaBriefcase className="mr-2 text-blue-500 text-sm" />
                          <span className="font-medium">{exp.company}</span>
                        </div>
                        <div className="flex items-center">
                          <FaMapMarkerAlt className="mr-2 text-green-500 text-sm" />
                          <span className="text-gray-600">{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <motion.p 
                      className="text-gray-600 text-sm leading-relaxed mb-6"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.2 }}
                    >
                      {exp.description}
                    </motion.p>

                    {/* Technologies */}
                    {exp.technologies && (
                      <motion.div 
                        className="flex flex-wrap gap-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                      >
                        {exp.technologies.map((tech, techIndex) => (
                          <motion.span
                            key={techIndex}
                            className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-full text-xs font-medium hover:from-blue-100 hover:to-blue-200 transition-all duration-300 border border-blue-200/50"
                            whileHover={{ 
                              scale: 1.05,
                              y: -1
                            }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/60 shadow-sm"
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <motion.div
              className="flex space-x-1 mr-3"
              animate={{ 
                rotate: [0, 10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="w-2 h-2 bg-blue-500 rounded-full" />
              <span className="w-2 h-2 bg-blue-600 rounded-full" />
              <span className="w-2 h-2 bg-blue-400 rounded-full" />
            </motion.div>
            <span className="text-sm text-gray-600 font-medium">
              Continuously expanding my skills and expertise
            </span>
          </motion.div>
        </motion.div>

        {/* Experience Counter */}
        <motion.div 
          className="mt-12 grid grid-cols-3 gap-8 max-w-md mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <div className="text-center">
            <motion.div 
              className="text-2xl font-bold text-blue-600"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.5, delay: 1.0, type: "spring" }}
            >
              {experiences.length}
            </motion.div>
            <div className="text-gray-500 text-sm">Experiences</div>
          </div>
          <div className="text-center">
            <motion.div 
              className="text-2xl font-bold text-blue-600"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.5, delay: 1.1, type: "spring" }}
            >
              {experiences.reduce((acc, exp) => acc + (exp.technologies?.length || 0), 0)}+
            </motion.div>
            <div className="text-gray-500 text-sm">Technologies</div>
          </div>
          <div className="text-center">
            <motion.div 
              className="text-2xl font-bold text-blue-600"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.5, delay: 1.2, type: "spring" }}
            >
              ∞
            </motion.div>
            <div className="text-gray-500 text-sm">Learning</div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}