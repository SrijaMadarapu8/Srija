import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../constants';
import ProjectCard from './ProjectCard';
import { ArrowLeft } from 'lucide-react';

interface AllProjectsProps {
  onBack: () => void;
}

const AllProjects: React.FC<AllProjectsProps> = ({ onBack }) => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="min-h-screen py-32 px-6 relative z-10 bg-gray-50 dark:bg-tech-dark transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div>
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-neon-cyan transition-colors mb-4 group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
            </button>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-2">Project Archive</h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
              A comprehensive collection of my work in XR, graphics programming, and automation.
            </p>
          </div>
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

export default AllProjects;