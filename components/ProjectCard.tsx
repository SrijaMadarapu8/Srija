import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white dark:bg-tech-card border border-gray-200 dark:border-gray-800 hover:border-cyan-500 dark:hover:border-neon-cyan/50 transition-all duration-500 overflow-hidden rounded-xl flex flex-col h-full shadow-md dark:shadow-none cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'} opacity-90 dark:opacity-80 group-hover:opacity-100`}
        />
        <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 dark:bg-black/80 backdrop-blur text-xs text-cyan-700 dark:text-neon-cyan border border-cyan-200 dark:border-neon-cyan/30 rounded-full uppercase tracking-wider font-bold">
          {project.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-neon-cyan transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 italic text-sm mb-6 border-l-2 border-cyan-500/50 dark:border-gray-700 pl-3">
          "{project.problem}"
        </p>

        <div className="mt-auto">
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span key={tech} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800 rounded">
                {tech}
              </span>
            ))}
          </div>

          
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;