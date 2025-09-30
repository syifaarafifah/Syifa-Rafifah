// src/components/Contact.tsx
'use client';
import { useInView, useScroll, useTransform, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaLinkedin } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { FaRegMessage } from "react-icons/fa6";
import { GoClock } from "react-icons/go";
import { CiMapPin } from "react-icons/ci";

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

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Smooth scroll animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [40, 0, 0, -40]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSending(true);
    setSendStatus('idle');

    try {
      const formData = new FormData(formRef.current);
      
      const response = await fetch('https://formspree.io/f/mzzjrenp', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSendStatus('success');
        formRef.current.reset();
        
        setTimeout(() => {
          setSendStatus('idle');
        }, 5000);
      } else {
        throw new Error('Failed to send message');
      }
      
    } catch (error) {
      console.error('Error sending message:', error);
      setSendStatus('error');
      
      setTimeout(() => {
        setSendStatus('idle');
      }, 5000);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <motion.section 
      id="contact" 
      ref={containerRef} 
      className="py-32 px-6 bg-white relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{ opacity, y }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-50 rounded-full mb-8">
            <FaRegMessage size={32} className="text-gray-700" />
          </div>
          <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Let's discuss your project and bring your ideas to life. 
            I'm always open to new opportunities and creative collaborations.
          </p>
        </motion.div>

        {/* Contact Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Contact Information */}
          <div className="space-y-8">
            <FadeIn delay={0.2}>
              <div className="border border-gray-200 rounded-2xl p-8">
                <h3 className="text-2xl font-light text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MdOutlineEmail size={24} className="text-gray-700" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">Email</h4>
                      <a 
                        href="mailto:syifarafifah527@gmail.com" 
                        className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                      >
                        syifarafifah527@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CiMapPin size={24} className="text-gray-700" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">Location</h4>
                      <p className="text-gray-600">Batam, Indonesia</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <GoClock size={24} className="text-gray-700" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">Availability</h4>
                      <p className="text-gray-600">Open for new projects</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Social Links */}
            <FadeIn delay={0.4}>
              <div className="border border-gray-200 rounded-2xl p-8">
                <h3 className="text-2xl font-light text-gray-900 mb-6">Connect With Me</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://linkedin.com/in/syifa-rafifah-hidayat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gray-900 text-white rounded-xl p-4 flex flex-col items-center justify-center hover:bg-gray-800 transition-colors duration-200"
                  >
                    <FaLinkedin size={24} />
                    <span className="text-sm mt-2">LinkedIn</span>
                  </a>
                  
                  <a
                    href="https://github.com/syifarafifah"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gray-900 text-white rounded-xl p-4 flex flex-col items-center justify-center hover:bg-gray-800 transition-colors duration-200"
                  >
                    <BsGithub size={24} />
                    <span className="text-sm mt-2">GitHub</span>
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column - Contact Form */}
          <FadeIn delay={0.3}>
            <div className="border border-gray-200 rounded-2xl p-8">
              <h3 className="text-2xl font-light text-gray-900 mb-6">Send Message</h3>
              
              {/* Status Messages */}
              {sendStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 text-center">
                    ✅ Message sent successfully! I'll get back to you soon.
                  </p>
                </div>
              )}
              
              {sendStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-center">
                    ❌ Failed to send message. Please try again or email me directly.
                  </p>
                </div>
              )}

              <form 
                ref={formRef} 
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200"
                    placeholder="Your name"
                    disabled={isSending}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200"
                    placeholder="your.email@example.com"
                    disabled={isSending}
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200"
                    placeholder="Tell me about your project..."
                    disabled={isSending}
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSending ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>
          </FadeIn>
        </div>

        {/* Quick Response Info */}
        <FadeIn delay={0.6}>
          <div className="text-center border-t border-gray-200 pt-12">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
              <GoClock size={20} className="text-gray-700" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">Quick Response</h4>
            <p className="text-gray-600 max-w-md mx-auto">
              I typically respond to emails within 24 hours. For urgent matters, 
              feel free to connect with me on LinkedIn.
            </p>
          </div>
        </FadeIn>
      </div>

      {/* Subtle background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
    </motion.section>
  );
}