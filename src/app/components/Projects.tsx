// src/components/Projects.tsx
'use client';
import { useInView, useScroll, useTransform, motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ExternalLink, X, Loader2, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import VideoGallery from './VideoGallery';
import { MdLaptopChromebook } from "react-icons/md";
import { CiMobile3 } from "react-icons/ci";

interface Project {
  title: string;
  description: string | React.ReactNode;
  technologies: string[];
  media: {
    type: 'image' | 'video';
    url: string;
    alt: string;
    youtubeId?: string;
  }[];
  deviceType: 'iphone' | 'ipad' | 'mac' | 'web';
  category?: string;
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  const mediaContainerRef = useRef<HTMLDivElement>(null);
  const autoSlideIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const projects: Project[] = [
    {
      title: 'Login Page & QR Code Signature',
      description: (
        <a 
          href="https://pbl.polibatam.ac.id/pamerin/detail.php?title=tandatangan-digital-jurusan-mesin&id=MTQ3Ng==&ta=NA==&id_tim=MjE5OA==" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          View project details
        </a>
      ),
      technologies: ['Laravel', 'JavaScript', 'MySQL', 'Bootstrap', 'Next.Js'],
      media: [
        { type: 'image', url: 'https://i.ibb.co.com/LL62VK8/login.png', alt: 'loginpage' },
        { type: 'image', url: 'https://i.ibb.co.com/5ZvwVfN/Whats-App-Image-2025-09-15-at-20-35-04.jpg', alt: 'QR Code System Interface' },
        { type: 'image', url: 'https://i.ibb.co.com/bMH354XF/Whats-App-Image-2025-09-15-at-20-35-04-1.jpg', alt: 'Time Management Dashboard' }
      ],
      deviceType: 'mac',
      category: 'Web Development'
    },
    { 
      title: 'QR Code Generator', 
      description: 'Responsive QR code generator with customization', 
      technologies: ['React', 'TypeScript', 'Node.js', 'QR Code API'],
      media: [
        { type: 'image', url: 'https://i.ibb.co/JWzXb2w0/Whats-App-Image-2025-09-15-at-19-48-35.jpg', alt: 'QR Code Generator Interface' },
        { type: 'image', url: 'https://i.ibb.co/FLysTt1V/Whats-App-Image-2025-09-15-at-19-50-22.jpg', alt: 'QR Code Customization Options'},
        { type: 'image', url: 'https://i.ibb.co.com/DPcSNC5k/code1.jpg', alt: 'QR Code Generator Interface' },
        { type: 'image', url: 'https://i.ibb.co.com/4wmKXfPP/code2.jpg', alt: 'QR Code Generator Interface' },
        { type: 'image', url: 'https://i.ibb.co.com/tPXSzWKK/code3.jpg', alt: 'QR Code Generator Interface' },
        { type: 'image', url: 'https://i.ibb.co.com/fVjbzkN3/code4.jpg', alt: 'QR Code Generator Interface' }
      ],
      deviceType: 'mac',
      category: 'Web Development'
    },
    {
      title: 'AppSheet Automation', 
      description: 'No-code automation platform for business workflows and data management with custom integrations', 
      technologies: ['AppSheet', 'Google Sheets', 'Automation', 'Data Management', 'Workflow'],
      media: [
        { type: 'image', url: 'https://i.ibb.co.com/qM5zLbQk/appsheet1.jpg', alt: 'AppSheet Dashboard' },
        { type: 'image', url: 'https://i.ibb.co.com/dspt24w0/appsheet2.jpg', alt: 'Workflow Automation' },
        { type: 'image', url: 'https://i.ibb.co.com/QvtK5trS/appsheet3.jpg', alt: 'Data Management Interface' },
        { type: 'image', url: 'https://i.ibb.co.com/jPthyTbZ/appsheet4.jpg', alt: 'Workflow Automation' },
        { type: 'image', url: 'https://i.ibb.co.com/V0wq9GtR/appsheet5.jpg', alt: 'Workflow Automation' }
      ],
      deviceType: 'web',
      category: 'No-Code Development'
    },
    {
      title: 'E-Voting & IoT Interfaces', 
      description: (
        <>
          <a 
            href="https://pbl.polibatam.ac.id/pamerin/detail.php?title=aplikasi-e-voting-berbasis-mobile-dan-web-untuk-pemilihan-jajaran-pimpinan-muhammadiyah-kota-batam&id=MjQ3OA==&ta=NQ==&id_tim=MjgzMQ=="
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline mr-2"
          >
            E-Voting
          </a>
          <a 
            href="https://pbl.polibatam.ac.id/pamerin/detail.php?title=display-ketersediaan-laboratorium&id=MzMzMg==&ta=Ng==&id_tim=NDE5NQ==" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            IoT Project
          </a>
        </>
      ), 
      technologies: ['Laravel', 'Blade', 'Next.Js', 'TypeScript'],
      media: [
        { 
          type: 'video', 
          url: 'https://www.youtube.com/embed/ssob8yfIeoU?autoplay=1&mute=1&loop=1&playlist=ssob8yfIeoU',
          alt: 'IoT Project Demo Video',
          youtubeId: 'ssob8yfIeoU'
        },
        { type: 'image', url: 'https://i.ibb.co/Mk178nQp/image-1.png', alt: 'E-Voting Dashboard' },
        { type: 'image', url: 'https://i.ibb.co.com/whmJvtBt/ev1.png', alt: 'IoT Control Panel' },
        { type: 'image', url: 'https://i.ibb.co.com/nqzV3f1L/ev2.png', alt: 'IoT Control Panel' },
        { type: 'image', url: 'https://i.ibb.co.com/Myj6cKgH/ev3.png', alt: 'IoT Control Panel' }
      ],
      deviceType: 'mac',
      category: 'Web Development'
    },
    { 
      title: 'Kaomoji Emoji & evote Mobile', 
      description: 'Japanese emoji keyboard and voting app', 
      technologies: ['React Native', 'iOS', 'Android', 'Expo'],
      media: [
        { type: 'image', url: 'https://i.ibb.co.com/ccHbWkcj/kaomoji.jpg', alt: 'Kaomoji App Home' },
        { 
          type: 'video', 
          url: 'https://youtube.com/shorts/MnZLA4fUdX8?feature=share',
          alt: 'evote mobile demo',
          youtubeId: 'MnZLA4fUdX8'
        }
      ],
      deviceType: 'iphone',
      category: 'Mobile Development'
    },
    { 
      title: 'UI/UX - Infaq App', 
      description: 'Mobile donation app design', 
      technologies: ['Figma','Prototyping'],
      media: [
        { type: 'image', url: 'https://i.ibb.co.com/LzVx3mn5/1.png', alt: 'Infaq App Home' },
        { type: 'image', url: 'https://i.ibb.co.com/Y7ncV9zv/2.png', alt: 'Infaq App Home' },
        { type: 'image', url: 'https://i.ibb.co.com/Kch871Bt/3.png', alt: 'Infaq App Home' },
        { type: 'image', url: 'https://i.ibb.co.com/wZXZk8sc/4.png', alt: 'Infaq App Home' },
        { type: 'image', url: 'https://i.ibb.co.com/GvpJh5zn/5.png', alt: 'Infaq App Home' },
        { type: 'image', url: 'https://i.ibb.co.com/Qjbm37Mg/6.png', alt: 'Infaq App Home' }
      ],
      deviceType: 'iphone',
      category: 'UI/UX Design'
    }
  ];

  const youtubeVideos = [
    { id: 'IELeboEUvak', title: 'Product Design', poster: '/poster1.svg' },
    { id: 'ssob8yfIeoU', title: 'Product Features', poster: '/poster2.svg' },
    { id: 'mDPLOjrHN_k', title: 'Product Performance', poster: '/poster3.svg' },
  ];

  const [selectedProject, setSelectedProject] = useState<Project | null>(projects[0]);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imageLoadError, setImageLoadError] = useState<Record<number, boolean>>({});
  const [isAutoSlide, setIsAutoSlide] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const placeholderImage = 'https://png.pngtree.com/png-vector/20210702/ourmid/pngtree-comingsoon-lettering-on-hanging-red-board-png-image_3538924.jpg';

  const categories = ['All', ...new Set(projects.map(project => project.category || 'Other'))];
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  // Improved auto slide functionality - smooth continuous looping
  useEffect(() => {
    if (!selectedProject || selectedProject.media.length <= 1 || !isAutoSlide || isFullscreen) {
      if (autoSlideIntervalRef.current) {
        clearInterval(autoSlideIntervalRef.current);
        autoSlideIntervalRef.current = null;
      }
      return;
    }

    if (autoSlideIntervalRef.current) {
      clearInterval(autoSlideIntervalRef.current);
    }

    autoSlideIntervalRef.current = setInterval(() => {
      if (selectedProject && !isTransitioning) {
        setIsTransitioning(true);
        const nextIndex = (selectedMediaIndex + 1) % selectedProject.media.length;
        setSelectedMediaIndex(nextIndex);
        setMediaLoaded(false);
        
        setTimeout(() => {
          setIsTransitioning(false);
        }, 500);
      }
    }, 4000);

    return () => {
      if (autoSlideIntervalRef.current) {
        clearInterval(autoSlideIntervalRef.current);
        autoSlideIntervalRef.current = null;
      }
    };
  }, [selectedProject, selectedMediaIndex, isAutoSlide, isFullscreen, isTransitioning]);

  const handleProjectSelect = (project: Project) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedProject(project);
      setSelectedMediaIndex(0);
      setMediaLoaded(false);
      setImageLoadError({});
      setIsAutoSlide(true);
      setIsTransitioning(false);
    }, 300);
  };

  const handleMediaSelect = (index: number) => {
    if (index === selectedMediaIndex || isTransitioning) return;
    
    setIsTransitioning(true);
    setSelectedMediaIndex(index);
    setMediaLoaded(false);
    setIsAutoSlide(false);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  const handleNextMedia = () => {
    if (selectedProject && !isTransitioning) {
      setIsTransitioning(true);
      const nextIndex = (selectedMediaIndex + 1) % selectedProject.media.length;
      setSelectedMediaIndex(nextIndex);
      setMediaLoaded(false);
      setIsAutoSlide(false);
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }
  };

  const handlePrevMedia = () => {
    if (selectedProject && !isTransitioning) {
      setIsTransitioning(true);
      const prevIndex = (selectedMediaIndex - 1 + selectedProject.media.length) % selectedProject.media.length;
      setSelectedMediaIndex(prevIndex);
      setMediaLoaded(false);
      setIsAutoSlide(false);
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }
  };

  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      setIsAutoSlide(false);
    }
  };

  const handleImageError = (index: number) => {
    setImageLoadError(prev => ({ ...prev, [index]: true }));
    setMediaLoaded(true);
  };

  useEffect(() => {
    if (selectedProject) {
      selectedProject.media.forEach((media, index) => {
        if (media.type === 'image') {
          const img = new Image();
          img.src = media.url;
          img.onerror = () => handleImageError(index);
        }
      });
    }
  }, [selectedProject]);

  const renderDeviceFrame = (content: React.ReactNode, deviceType: string) => {
    const deviceConfig = {
      iphone: {
        frameClass: "w-60 h-[500px] mx-auto",
        screenClass: "w-[90%] h-[93%]",
        containerClass: "scale-85"
      },
      ipad: {
        frameClass: "w-72 h-[480px] mx-auto",
        screenClass: "w-[95%] h-[96%]",
        containerClass: "scale-85"
      },
      mac: {
        frameClass: "w-full max-w-xl mx-auto",
        screenClass: "w-[94%] h-[90%]",
        containerClass: ""
      },
      web: {
        frameClass: "w-full h-[280px]",
        screenClass: "w-full h-full",
        containerClass: ""
      }
    };

    const config = deviceConfig[deviceType as keyof typeof deviceConfig];

    return (
      <motion.div 
        className={`${config.containerClass}`}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {deviceType === 'mac' && (
          <div className={`${config.frameClass} relative`}>
            <div className="relative mx-auto w-full">
              <div className="bg-gradient-to-b from-gray-300 to-gray-400 rounded-t-xl pt-1 px-4 pb-6 shadow-xl">
                <div className="mx-auto w-24 h-3 bg-gradient-to-b from-gray-400 to-gray-500 rounded-b-lg mb-1 shadow-inner"></div>
                <div className="bg-white rounded-lg overflow-hidden aspect-video border border-gray-200 shadow-inner">
                  <div className="w-full h-full bg-gradient-to-br from-gray-50 to-white">
                    {content}
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-b from-gray-400 to-gray-500 h-4 rounded-b-xl shadow-lg">
                <div className="w-20 h-1 bg-gray-600 rounded-b-lg mx-auto mt-1"></div>
              </div>
            </div>
          </div>
        )}

        {deviceType === 'iphone' && (
          <div className={`${config.frameClass} relative`}>
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-[2rem] h-full p-2 shadow-xl border border-gray-300">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-4 bg-gradient-to-b from-gray-200 to-gray-300 rounded-b-xl z-10 shadow-sm"></div>
              <div className="bg-white rounded-[1.8rem] h-full overflow-hidden relative border border-gray-200 shadow-inner">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white">
                  {content}
                </div>
              </div>
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-400 rounded-full shadow-sm"></div>
            </div>
          </div>
        )}

        {deviceType === 'ipad' && (
          <div className={`${config.frameClass} relative`}>
            <div className="bg-gradient-to-b from-gray-200 to-gray-300 rounded-[1rem] h-full p-3 shadow-xl border border-gray-400">
              <div className="bg-white rounded-lg h-full overflow-hidden border border-gray-200 shadow-inner">
                <div className="w-full h-full bg-gradient-to-br from-gray-50 to-white">
                  {content}
                </div>
              </div>
            </div>
          </div>
        )}

        {deviceType === 'web' && (
          <div className={`${config.frameClass} relative`}>
            <div className="bg-gray-100 rounded-lg shadow-lg overflow-hidden h-full border border-gray-200">
              <div className="bg-gradient-to-r from-gray-200 to-gray-300 px-3 py-2 flex items-center space-x-2 border-b border-gray-300">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                </div>
                <div className="flex-1 bg-white rounded px-2 py-1 text-xs text-gray-600 truncate border border-gray-300">
                  project-demo.com
                </div>
              </div>
              <div className="h-[calc(100%-36px)] bg-gradient-to-br from-white to-gray-50">
                {content}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  const YouTubeVideo = ({ videoId, alt }: { videoId: string; alt: string }) => {
    return (
      <div className="w-full h-full">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=1&modestbranding=1&rel=0`}
          title={alt}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setMediaLoaded(true)}
        />
      </div>
    );
  };

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'iphone':
      case 'ipad':
        return <CiMobile3 className="w-4 h-4" />;
      case 'mac':
      case 'web':
        return <MdLaptopChromebook className="w-4 h-4" />;
      default:
        return <MdLaptopChromebook className="w-4 h-4" />;
    }
  };

  const getDeviceColor = (deviceType: string) => {
    switch (deviceType) {
      case 'iphone':
        return { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' };
      case 'ipad':
        return { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' };
      case 'mac':
        return { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' };
      case 'web':
        return { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200' };
      default:
        return { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200' };
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Web Development':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Mobile Development':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'UI/UX Design':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'No-Code Development':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <motion.section 
      ref={ref}
      style={{ opacity, y }}
      className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
    >
      <div className="absolute top-10 left-10 w-64 h-64 bg-blue-100 rounded-full opacity-20 blur-3xl -z-10"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-100 rounded-full opacity-20 blur-3xl -z-10"></div>
      
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.h2 
          className="text-4xl font-light mb-4 text-center text-gray-900"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          Featured Projects
        </motion.h2>

        <motion.p
          className="text-gray-600 text-center mb-12 max-w-2xl mx-auto text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          A collection of my work across web development, mobile apps, and no-code solutions
        </motion.p>

        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <VideoGallery videos={youtubeVideos} />
        </motion.div>

        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-2xl font-light mb-8 text-center text-gray-900">Project Portfolio</h3>
          
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map(category => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border ${
                  selectedCategory === category 
                    ? `${getCategoryColor(category)} shadow-md` 
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
          
          {/* Mobile Layout */}
          <div className="block lg:hidden space-y-6">
            {selectedProject && (
              <motion.div 
                className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 p-4 shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {!mediaLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-10 rounded-xl">
                    <div className="text-center">
                      <Loader2 className="animate-spin h-6 w-6 text-gray-400 mx-auto mb-1" />
                      <p className="text-gray-500 text-xs">Loading...</p>
                    </div>
                  </div>
                )}
                
                <div className={`transition-all duration-500 ${mediaLoaded ? 'opacity-100' : 'opacity-0'}`}>
                  {renderDeviceFrame(
                    <motion.div 
                      className="relative w-full h-full"
                      key={selectedMediaIndex}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      {selectedProject.media[selectedMediaIndex].type === 'image' ? (
                        <motion.img
                          src={imageLoadError[selectedMediaIndex] ? placeholderImage : selectedProject.media[selectedMediaIndex].url}
                          alt={selectedProject.media[selectedMediaIndex].alt}
                          className="w-full h-full object-contain"
                          onLoad={() => setMediaLoaded(true)}
                          onError={() => handleImageError(selectedMediaIndex)}
                          loading="lazy"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.8 }}
                        />
                      ) : selectedProject.media[selectedMediaIndex].youtubeId ? (
                        <YouTubeVideo 
                          videoId={selectedProject.media[selectedMediaIndex].youtubeId!}
                          alt={selectedProject.media[selectedMediaIndex].alt}
                        />
                      ) : (
                        <video
                          src={selectedProject.media[selectedMediaIndex].url}
                          className="w-full h-full object-contain"
                          controls
                          autoPlay
                          muted
                          loop
                          onLoadedData={() => setMediaLoaded(true)}
                        />
                      )}
                    </motion.div>,
                    selectedProject.deviceType
                  )}
                </div>

                {selectedProject.media.length > 1 && (
                  <div className="flex justify-center items-center space-x-3 mt-4">
                    <motion.button
                      onClick={handlePrevMedia}
                      className="bg-white/90 text-gray-700 p-2 rounded-full hover:bg-white transition-all duration-300 shadow-lg backdrop-blur-sm border border-gray-200 disabled:opacity-50"
                      disabled={isTransitioning}
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,1)' }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronLeft size={16} />
                    </motion.button>
                    
                    <div className="flex space-x-1.5">
                      {selectedProject.media.map((_, index) => (
                        <motion.button
                          key={index}
                          onClick={() => handleMediaSelect(index)}
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            selectedMediaIndex === index
                              ? 'bg-gray-800 scale-125'
                              : 'bg-gray-300 hover:bg-gray-400'
                          }`}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.8 }}
                        />
                      ))}
                    </div>

                    <motion.button
                      onClick={handleNextMedia}
                      className="bg-white/90 text-gray-700 p-2 rounded-full hover:bg-white transition-all duration-300 shadow-lg backdrop-blur-sm border border-gray-200 disabled:opacity-50"
                      disabled={isTransitioning}
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,1)' }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronRight size={16} />
                    </motion.button>
                  </div>
                )}
              </motion.div>
            )}

            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200/60 shadow-sm">
              <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Projects ({filteredProjects.length})</h4>
              <div className="space-y-2">
                {filteredProjects.map((project, index) => {
                  const colors = getDeviceColor(project.deviceType);
                  return (
                    <motion.button
                      key={index}
                      onClick={() => handleProjectSelect(project)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-200 border ${
                        selectedProject?.title === project.title 
                          ? `${colors.bg} ${colors.border} shadow-sm border-l-2 ${colors.border}` 
                          : 'border-transparent hover:bg-gray-50/80'
                      }`}
                      whileHover={{ x: 2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${colors.bg} ${colors.text}`}>
                          {getDeviceIcon(project.deviceType)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 truncate">{project.title}</h4>
                          <p className="text-xs text-gray-500 truncate mt-0.5">
                            {project.technologies.slice(0, 2).join(', ')}
                            {project.technologies.length > 2 && '...'}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:flex flex-row gap-8">
            {/* Left Side - Enlarged Project List */}
            <div className="w-1/3">
              <div className="sticky top-20 bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-gray-200/60 shadow-sm">
                <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Projects ({filteredProjects.length})</h4>
                <div className="space-y-2">
                  {filteredProjects.map((project, index) => {
                    const colors = getDeviceColor(project.deviceType);
                    return (
                      <motion.button
                        key={index}
                        onClick={() => handleProjectSelect(project)}
                        className={`w-full text-left p-3 rounded-lg transition-all duration-200 border ${
                          selectedProject?.title === project.title 
                            ? `${colors.bg} ${colors.border} shadow-sm border-l-2 ${colors.border}` 
                            : 'border-transparent hover:bg-gray-50/80'
                        }`}
                        whileHover={{ x: 2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${colors.bg} ${colors.text}`}>
                            {getDeviceIcon(project.deviceType)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 truncate">{project.title}</h4>
                            <p className="text-xs text-gray-500 truncate mt-0.5">
                              {project.technologies.slice(0, 2).join(', ')}
                              {project.technologies.length > 2 && '...'}
                            </p>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* Right Side - Project Detail */}
            <div className="w-2/3">
              {selectedProject && (
                <motion.div 
                  className="space-y-4"
                  key={selectedProject.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-gray-200/60">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{selectedProject.title}</h3>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDeviceColor(selectedProject.deviceType).bg} ${getDeviceColor(selectedProject.deviceType).text}`}>
                            {selectedProject.deviceType.toUpperCase()}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(selectedProject.category || 'Other')}`}>
                            {selectedProject.category}
                          </span>
                        </div>
                      </div>
                      {selectedProject.media.length > 1 && (
                        <button
                          onClick={() => setIsAutoSlide(!isAutoSlide)}
                          className={`p-1.5 rounded-full transition-colors ${
                            isAutoSlide 
                              ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {isAutoSlide ? <Pause size={14} /> : <Play size={14} />}
                        </button>
                      )}
                    </div>
                    
                    <div className="text-xs text-gray-600 mb-3 leading-relaxed">
                      {selectedProject.description}
                    </div>
                    
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.technologies.map(tech => (
                        <span key={tech} className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-700 font-medium border border-gray-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <motion.div 
                    className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 p-6 shadow-lg"
                    ref={mediaContainerRef}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {!mediaLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-10 rounded-xl">
                        <div className="text-center">
                          <Loader2 className="animate-spin h-6 w-6 text-gray-400 mx-auto mb-1" />
                          <p className="text-gray-500 text-xs">Loading...</p>
                        </div>
                      </div>
                    )}
                    
                    <div className={`transition-all duration-500 ${mediaLoaded ? 'opacity-100' : 'opacity-0'}`}>
                      {renderDeviceFrame(
                        <motion.div 
                          className="relative w-full h-full"
                          key={selectedMediaIndex}
                          initial={{ opacity: 0, x: 100 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                        >
                          {selectedProject.media[selectedMediaIndex].type === 'image' ? (
                            <motion.img
                              src={imageLoadError[selectedMediaIndex] ? placeholderImage : selectedProject.media[selectedMediaIndex].url}
                              alt={selectedProject.media[selectedMediaIndex].alt}
                              className="w-full h-full object-contain"
                              onLoad={() => setMediaLoaded(true)}
                              onError={() => handleImageError(selectedMediaIndex)}
                              loading="lazy"
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.8 }}
                            />
                          ) : selectedProject.media[selectedMediaIndex].youtubeId ? (
                            <YouTubeVideo 
                              videoId={selectedProject.media[selectedMediaIndex].youtubeId!}
                              alt={selectedProject.media[selectedMediaIndex].alt}
                            />
                          ) : (
                            <video
                              src={selectedProject.media[selectedMediaIndex].url}
                              className="w-full h-full object-contain"
                              controls
                              autoPlay
                              muted
                              loop
                              onLoadedData={() => setMediaLoaded(true)}
                            />
                          )}
                        </motion.div>,
                        selectedProject.deviceType
                      )}
                    </div>
                    
                    {selectedProject.media.length > 1 && (
                      <>
                        <motion.button
                          onClick={handlePrevMedia}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 text-gray-700 p-2 rounded-full hover:bg-white transition-all duration-300 z-20 shadow-lg backdrop-blur-sm border border-gray-200 disabled:opacity-50"
                          disabled={isTransitioning}
                          whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,1)' }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ChevronLeft size={16} />
                        </motion.button>
                        <motion.button
                          onClick={handleNextMedia}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 text-gray-700 p-2 rounded-full hover:bg-white transition-all duration-300 z-20 shadow-lg backdrop-blur-sm border border-gray-200 disabled:opacity-50"
                          disabled={isTransitioning}
                          whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,1)' }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ChevronRight size={16} />
                        </motion.button>
                      </>
                    )}
                    
                    <motion.button
                      onClick={handleFullscreenToggle}
                      className="absolute bottom-2 right-2 bg-white/90 text-gray-700 p-1.5 rounded-full hover:bg-white transition-colors z-20 backdrop-blur-sm border border-gray-200"
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,1)' }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ExternalLink size={12} />
                    </motion.button>
                    
                    <div className="absolute top-2 left-2 bg-white/90 text-gray-700 px-2 py-1 rounded-full text-xs z-20 backdrop-blur-sm border border-gray-200">
                      {selectedMediaIndex + 1} / {selectedProject.media.length}
                    </div>

                    {isAutoSlide && selectedProject.media.length > 1 && (
                      <div className="absolute bottom-2 left-2 bg-white/90 text-gray-700 px-2 py-1 rounded-full text-xs z-20 backdrop-blur-sm flex items-center border border-gray-200">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></div>
                        Auto
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}