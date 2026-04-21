import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../constants';
import ProjectCard from './ProjectCard';
import { ArrowLeft, RefreshCcw } from 'lucide-react';

interface AllProjectsProps {
  onBack: () => void;
  filteredProjectIds: string[] | null;
  onProjectClick: (id: string) => void;
}

const AllProjects: React.FC<AllProjectsProps> = ({ onBack, filteredProjectIds, onProjectClick }) => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [filteredProjectIds]);

  const displayedProjects = filteredProjectIds 
    ? PROJECTS.filter(p => filteredProjectIds.includes(p.id))
    : PROJECTS;

  return (
    <section className="min-h-screen py-32 px-6 relative z-10 bg-cream dark:bg-tech-dark transition-colors duration-300">
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
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-2">
              {filteredProjectIds ? 'Matched Projects' : 'Project Archive'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
              {filteredProjectIds 
                ? `Found ${displayedProjects.length} project(s) matching your request.` 
                : 'A comprehensive collection of my work in XR, graphics programming, and automation.'}
            </p>
          </div>
          
          {filteredProjectIds && (
            <button
              onClick={() => onBack()} // Essentially resets view
              className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-cyan-500 hover:text-white transition-colors"
            >
              <RefreshCcw size={14} /> Clear Filter
            </button>
          )}
        </motion.div>

        {displayedProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index} 
                onClick={() => onProjectClick(project.id)} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            No projects found matching criteria.
          </div>
        )}
      </div>
    </section>
  );
};

export default AllProjects;