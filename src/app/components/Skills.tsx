'use client';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface SkillCategory {
  [key: string]: string[];
}

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const skills: SkillCategory = {
    "Web Development": ["HTML", "CSS", "JavaScript", "Laravel", "Next.js"],
    "Mobile Development": ["React Native", "AppSheet"],
    "Database": ["MySQL", "PhpMyAdmin"],
    "UI/UX Design": ["Figma", "Canva"],
    "Office Tools": ["Microsoft Word", "Excel"],
    "Other Tools": ["Git", "GitHub"]
  };

  return (
    <section ref={ref} className="py-28 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        <h2 
          className="text-5xl md:text-6xl font-light mb-16 text-center"
          style={{ 
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(50px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease'
          }}
        >
          Skills & Expertise
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skills).map(([category, items], index) => (
            <div 
              key={category}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
              style={{ 
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 0.8s ease ${0.2 + index * 0.1}s, transform 0.8s ease ${0.2 + index * 0.1}s, box-shadow 0.3s ease`
              }}
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-800">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span 
                    key={skill} 
                    className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}