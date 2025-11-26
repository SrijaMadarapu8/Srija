import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../constants';
import ProjectCard from './ProjectCard';
import { ArrowRight } from 'lucide-react';

interface ProjectsProps {
  onViewAll: () => void;
}

const Projects: React.FC<ProjectsProps> = ({ onViewAll }) => {
  // Show only first 3 projects on the home page
  const displayedProjects = PROJECTS.slice(0, 3);

  return (
    <section id="projects" className="py-24 px-6 relative z-10 bg-gray-50 dark:bg-tech-dark transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Projects</h2>
            <div className="w-20 h-1 bg-cyan-500 dark:bg-neon-purple"></div>
          </motion.div>
          
          <motion.button
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             onClick={onViewAll}
             className="hidden md:flex items-center gap-2 px-6 py-2 rounded-full border border-gray-300 dark:border-gray-700 hover:border-cyan-500 dark:hover:border-neon-cyan text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-neon-cyan transition-all group"
          >
            View Full Archive <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayedProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        
        <div className="flex justify-center md:hidden">
          <button 
             onClick={onViewAll}
             className="flex items-center gap-2 px-8 py-3 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white font-medium hover:bg-cyan-500 hover:text-white dark:hover:bg-neon-cyan dark:hover:text-black transition-all"
          >
            View Full Archive <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;