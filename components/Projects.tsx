import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import { Play, ExternalLink, Github } from 'lucide-react';

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white dark:bg-tech-card border border-gray-200 dark:border-gray-800 hover:border-cyan-500 dark:hover:border-neon-cyan/50 transition-all duration-500 overflow-hidden rounded-xl flex flex-col h-full shadow-md dark:shadow-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'} opacity-90 dark:opacity-80 group-hover:opacity-100`}
        />
        {/* <div className={`absolute inset-0 bg-black/40 dark:bg-black/60 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
           <div className="p-4 rounded-full bg-cyan-500/20 dark:bg-neon-cyan/20 border border-cyan-400 dark:border-neon-cyan/50 backdrop-blur-md">
             <Play className="text-white dark:text-neon-cyan fill-white dark:fill-neon-cyan" size={32} />
           </div>
        </div> */}
        <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 dark:bg-black/80 backdrop-blur text-xs text-cyan-700 dark:text-neon-cyan border border-cyan-200 dark:border-neon-cyan/30 rounded-full uppercase tracking-wider font-bold">
          {project.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-neon-cyan transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 italic text-sm mb-4 border-l-2 border-cyan-500/50 dark:border-gray-700 pl-3">
          "{project.problem}"
        </p>
        
        <ul className="space-y-2 mb-6 flex-grow">
          {project.contributions.map((point, i) => (
            <li key={i} className="text-gray-700 dark:text-gray-300 text-sm flex items-start gap-2">
              <span className="text-cyan-600 dark:text-neon-purple mt-1">›</span>
              {point}
            </li>
          ))}
        </ul>

        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.map((tech) => (
              <span key={tech} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800 rounded">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
            {project.demoLink && (
              <a 
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-white hover:text-cyan-600 dark:hover:text-neon-cyan transition-colors"
              >
                <ExternalLink size={16} /> Demo
              </a>
            )}
            {project.repoLink && (
              <a 
                href={project.repoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-white hover:text-purple-600 dark:hover:text-neon-purple transition-colors"
              >
                <Github size={16} /> Code
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 px-6 relative z-10 bg-gray-50 dark:bg-tech-dark">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Projects</h2>
          <div className="w-20 h-1 bg-cyan-500 dark:bg-neon-purple"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;