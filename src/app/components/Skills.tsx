'use client';
import { SiExpo, SiReact } from "react-icons/si";
import { useRef } from 'react';
import { useInView, motion } from 'framer-motion';
import { 
  SiHtml5, SiCss3, SiJavascript, SiTypescript, SiNextdotjs, 
  SiLaravel, SiMysql, SiGit, SiGithub, SiFigma, 
  SiBootstrap, SiCanva, SiPhp
} from 'react-icons/si';
import { RiTelegram2Fill } from "react-icons/ri";

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once: false,
    margin: '0px',
    amount: 0.2
  });

  // Data skills dengan icon dan warna - ditambahkan AppSheet
  const allSkills = [
    { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
    { name: "CSS3", icon: SiCss3, color: "#1572B6" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
    { name: "PHP", icon: SiPhp, color: "#777BB4" },
    { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
    { name: "React Native", icon: SiReact, color: "#61DAFB" },
    { name: "Expo", icon: SiExpo, color: "#000020" },
    { name: "MySQL", icon: SiMysql, color: "#4479A1" },
    { name: "Git", icon: SiGit, color: "#F05032" },
    { name: "GitHub", icon: SiGithub, color: "#181717" },
    { name: "Figma", icon: SiFigma, color: "#F24E1E" },
    { name: "Canva", icon: SiCanva, color: "#00C4CC" },
    { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
    { name: "AppSheet", icon: RiTelegram2Fill, color: "#1A73E8" }
  ];

  // Infinite scrolling component yang lebih smooth
  const InfiniteScrollSkills = () => {
    // Duplicate skills untuk seamless loop
    const duplicatedSkills = [...allSkills, ...allSkills];
    
    return (
      <div className="relative overflow-hidden py-8">
        {/* Gradient overlay untuk efek fade */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10" />
        
        <motion.div
          className="flex gap-8"
          animate={{
            x: [0, -((allSkills.length * 152))] // Hitung offset berdasarkan jumlah skill dan gap
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {duplicatedSkills.map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <motion.div 
                key={`${skill.name}-${index}`} 
                className="flex flex-col items-center justify-center min-w-[140px] group"
                whileHover={{ 
                  scale: 1.05,
                  y: -5
                }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <div className="relative">
                  {/* Background glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative p-5 rounded-xl bg-white border border-gray-100 shadow-sm group-hover:shadow-xl transition-all duration-300 group-hover:border-gray-200">
                    {skill.name === "AppSheet" ? (
                      <RiTelegram2Fill size={36} color="#1A73E8" />
                    ) : (
                      <IconComponent 
                        size={36} 
                        color={skill.color} 
                        className={skill.name === "Figma" ? "rounded-lg" : ""}
                      />
                    )}
                  </div>
                  
                  <div className="mt-3 text-center">
                    <span className="text-xs font-semibold text-gray-700 tracking-tight bg-white/80 px-2 py-1 rounded-md">
                      {skill.name}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    );
  };

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
      
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
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
              <SiReact className="text-white text-sm" />
            </div>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4 tracking-tight">
            Skills & <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">Technologies</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <InfiniteScrollSkills />
        </motion.div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="inline-flex items-center text-gray-600 text-sm bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-200/50 shadow-sm">
            <motion.div 
              className="flex space-x-1 mr-3"
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
            </motion.div>
            Continuously learning and exploring new technologies
          </div>
        </motion.div>

        {/* Skills counter */}
        <motion.div 
          className="mt-12 grid grid-cols-3 gap-8 max-w-md mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{allSkills.length}+</div>
            <div className="text-gray-500 text-sm">Technologies</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">4</div>
            <div className="text-gray-500 text-sm">Categories</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">∞</div>
            <div className="text-gray-500 text-sm">Learning</div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}