// src/components/Projects.tsx
'use client';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  technologies: string[];
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const projects: Project[] = [
    {
      title: "ResiFinlyn",
      description: "React Native mobile app that integrates with Jubelio API to fetch order details after SKU scanning.",
      technologies: ["React Native", "API Integration", "PDF Generation"]
    },
    {
      title: "QR Code Generator",
      description: "Laravel-based QR code generator with dynamic routing for internal company use.",
      technologies: ["Laravel", "JavaScript", "MySQL"]
    },
    {
      title: "Kaomoji Emoji App",
      description: "React Native app for browsing and copying Japanese-style emojis with clean UI.",
      technologies: ["React Native", "UI Design"]
    },
    {
      title: "E-Voting System",
      description: "Built UIs using Laravel Blade for Admin Panel with responsive design.",
      technologies: ["Laravel", "JavaScript", "MySQL"]
    }
  ];

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
          Projects
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
              style={{ 
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 0.8s ease ${0.2 + index * 0.1}s, transform 0.8s ease ${0.2 + index * 0.1}s, box-shadow 0.3s ease`
              }}
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div 
          className="text-center mt-12"
          style={{ 
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(30px)',
            transition: `opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s`
          }}
        >
        </div>
      </div>
    </section>
  );
}