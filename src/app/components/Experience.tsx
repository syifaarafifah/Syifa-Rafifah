// src/components/Experience.tsx
'use client';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string;
}

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const experiences: ExperienceItem[] = [
    {
      title: "Web Developer & AppSheet Developer",
      company: "Finlyn Fashion · Batam",
      period: "April 2025 – August 2025",
      description: "Developed internal systems using Laravel & MySQL, including dashboards, automation tools, and a QR Code web application."
    },
    {
      title: "Intern – React Native Developer",
      company: "PT. Kawan Kerja - Remote",
      period: "April 2025 – May 2025",
      description: "Developing mobile applications using React Native. Collaborating with cross-functional teams to build user-friendly features."
    },
    {
      title: "Administrative Staff",
      company: "SMK Negeri 8 Batam",
      period: "July 2023 – January 2025",
      description: "Proficient in managing administrative data and documents using Microsoft Excel and Word."
    }
  ];

  return (
    <section ref={ref} className="py-28 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 
          className="text-5xl md:text-6xl font-light mb-16 text-center"
          style={{ 
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(50px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease'
          }}
        >
          Experience
        </h2>
        
        <div className="space-y-16">
          {experiences.map((exp, index) => (
            <div 
              key={index} 
              className="flex"
              style={{ 
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 0.8s ease ${0.2 + index * 0.2}s, transform 0.8s ease ${0.2 + index * 0.2}s`
              }}
            >
              <div className="flex flex-col items-center mr-6">
                <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
                {index !== experiences.length - 1 && (
                  <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                )}
              </div>
              <div className="flex-1 pb-8">
                <h3 className="text-2xl font-semibold mb-2 text-gray-800">{exp.title}</h3>
                <p className="text-gray-600 mb-3">{exp.company} | {exp.period}</p>
                <p className="text-gray-700 leading-relaxed">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}