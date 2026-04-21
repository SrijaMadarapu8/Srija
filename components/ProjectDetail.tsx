import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';
import { ArrowLeft, Github, Globe, Terminal, Box, Lightbulb ,Link as LinkIcon} from 'lucide-react';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen py-32 px-6 relative z-10 bg-cream dark:bg-tech-dark transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-neon-cyan transition-colors mb-12 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Archive
        </motion.button>

        <div className="flex flex-col gap-12">
          {/* Hero Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-white/10"
          >
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </motion.div>

          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
           
          >
            <span className="px-3 py-1 bg-cyan-100 dark:bg-neon-cyan/10 text-cyan-700 dark:text-neon-cyan text-xs font-bold rounded-full uppercase tracking-widest mb-6 inline-block">
              {project.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
              {project.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed text-justify">
              {project.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-8 border-t border-gray-100 dark:border-white/5">
            {/* Sidebar info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-8"
            >
              <div>
                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">
                  <Terminal size={14} /> Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map(tech => (
                    <span key={tech} className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-white/10 rounded-lg text-sm text-gray-700 dark:text-gray-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">
                  <Globe size={14} /> Links
                </h3>
                <div className="flex flex-col gap-3">
                  {project.repoLink && (
                    <a 
                      href={project.repoLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-gray-900 text-white rounded-xl hover:bg-black transition-colors group"
                    >
                      <Github size={20} />
                      <span className="font-medium text-sm">View Repository</span>
                    </a>
                  )}
                  {project.demoLink && (
                    <a 
                      href={project.demoLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-cyan-600 text-white rounded-xl hover:bg-cyan-700 transition-colors group"
                    >
                      <Globe size={20} />
                      <span className="font-medium text-sm">Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
              {project.referenceLink && (
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">
                    <LinkIcon size={14} /> References
                  </h3>
                  <a 
                    href={project.referenceLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-white/10 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                  >
                    <LinkIcon size={20} className="text-gray-400 group-hover:text-cyan-600 dark:group-hover:text-neon-cyan transition-colors" />
                    <span className="font-medium text-sm text-gray-700 dark:text-gray-300">External Documentation</span>
                  </a>
                </div>
              )}
            </motion.div>

            {/* Main Content Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="md:col-span-2 space-y-12"
            >
              <section>
                <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white mb-6">
                  <Lightbulb size={20} className="text-yellow-500" /> Idea
                </h3>
                <p className="text-gray-700 dark:text-gray-300 bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/5 italic">
                  "{project.problem}"
                </p>
              </section>

              <section>
                <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white mb-6">
                  <Box size={20} className="text-cyan-500" /> Key Contributions
                </h3>
                <ul className="space-y-4">
                  {project.contributions.map((point, i) => (
                    <li key={i} className="flex items-start gap-4 p-4 rounded-xl hover:bg-cyan-500/5 transition-colors group">
                      <div className="w-6 h-6 rounded-full bg-cyan-500/10 dark:bg-neon-cyan/10 flex items-center justify-center flex-shrink-0 text-cyan-600 dark:text-neon-cyan font-bold text-xs mt-0.5">
                        {i + 1}
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
