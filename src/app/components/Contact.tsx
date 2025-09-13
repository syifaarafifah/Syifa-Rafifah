// src/components/Contact.tsx
'use client';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, ExternalLink, Download } from 'lucide-react';

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" ref={ref} className="py-28 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 
          className="text-5xl md:text-6xl font-light mb-16 text-center text-gray-900"
          style={{ 
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(50px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease'
          }}
        >
         Contact Me 
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div
            style={{ 
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s'
            }}
          >
            <h3 className="text-2xl font-light mb-6 text-gray-800">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <Mail size={20} className="text-blue-600 mt-1 mr-4" />
                <div>
                  <p className="font-medium text-gray-700">Email</p>
                  <p className="text-gray-600">syifarafifah527@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone size={20} className="text-blue-600 mt-1 mr-4" />
                <div>
                  <p className="font-medium text-gray-700">Phone</p>
                  <p className="text-gray-600">+62 895-4031-53291</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin size={20} className="text-blue-600 mt-1 mr-4" />
                <div>
                  <p className="font-medium text-gray-700">Location</p>
                  <p className="text-gray-600">Batam City, Riau Islands, Indonesia</p>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="pt-4">
                <p className="font-medium mb-4 text-gray-700">Connect With Me</p>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/syifarafifah"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-110"
                    aria-label="GitHub"
                  >
                    <Github size={20} className="text-gray-700" />
                  </a>
                  <a
                    href="https://linkedin.com/in/syifa-rafifah"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-full hover:bg-blue-100 transition-all duration-300 transform hover:scale-110"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={20} className="text-blue-600" />
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div className="pt-6">
                <p className="font-medium mb-3 text-gray-700">Quick Links</p>
                <div className="space-y-2">
                  <a 
                    href="https://syifarafifahportofolio.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300 py-1"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    View Previous Portfolio
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div
            style={{ 
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s'
            }}
          >
            <h3 className="text-2xl font-light mb-6 text-gray-800">Send a Message</h3>
            
            <form className="space-y-4">
              <div>
                <input 
                  type="text" 
                  placeholder="Your Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                  required
                />
              </div>
              
              <div>
                <input 
                  type="email" 
                  placeholder="Your Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                  required
                />
              </div>
              
              <div>
                <textarea 
                  placeholder="Your Message"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="flex items-center justify-center w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
              >
                Send Message
                <Send size={18} className="ml-2" />
              </button>
            </form>

            {/* Download Resume Button */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Resume download link would be here');
                }}
                className="flex items-center justify-center w-full bg-gray-100 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-200 transition-all duration-300"
              >
                <Download size={18} className="mr-2" />
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}