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
  const isInView = useInView(ref, { once: false, margin: '-50px' });

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
    <section ref={ref} className="py-20 px-6 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100 rounded-full opacity-20 blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-100 rounded-full opacity-20 blur-3xl -z-10"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-full mb-4">
            <FaBriefcase className="text-blue-600 text-lg" />
          </div>
          <h2 className="text-3xl font-light text-gray-900 mb-4">Work Experience</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            My professional journey and career development
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200/50 to-purple-200/50"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="relative flex items-start group"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-6 md:left-8 transform -translate-x-1/2 z-10 flex items-center justify-center">
                  <div className="w-4 h-4 bg-white border-2 border-blue-500 rounded-full shadow-lg group-hover:bg-blue-500 group-hover:scale-125 transition-all duration-300"></div>
                </div>

                {/* Content Card */}
                <div className="w-full ml-12 md:ml-16">
                  {/* Period */}
                  <motion.div 
                    className="mb-3"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.1 }}
                  >
                    <div className="flex items-center text-gray-500 text-sm font-medium">
                      <FaCalendarAlt className="mr-2 text-blue-500" />
                      <span>{exp.period}</span>
                    </div>
                  </motion.div>

                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/60 shadow-sm hover:shadow-xl transition-all duration-300 group-hover:border-blue-200/50 group-hover:translate-y-[-2px]">
                    {/* Title and Company */}
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">{exp.title}</h3>
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
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                      >
                        {exp.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-full text-xs font-medium hover:from-blue-100 hover:to-blue-200 transition-all duration-300 border border-blue-200/50"
                          >
                            {tech}
                          </span>
                        ))}
                      </motion.div>
                    )}
                  </div>
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
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/60 shadow-sm">
            <motion.div
              className="w-2 h-2 bg-blue-500 rounded-full mr-3"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm text-gray-600 font-medium">
              Continuously expanding my skills and expertise
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}