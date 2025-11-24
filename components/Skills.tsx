import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../constants';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 px-6 bg-white dark:bg-tech-dark relative transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Skills</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My toolkit spans from low-level graphics programming to high-level AI architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SKILLS.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 hover:bg-white dark:hover:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700 transition-all shadow-sm hover:shadow-md dark:shadow-none"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-transparent shadow-sm dark:shadow-none">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{category.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {category.skills.map(skill => (
                  <span 
                    key={skill} 
                    className="px-3 py-1.5 bg-white dark:bg-black text-gray-700 dark:text-gray-300 text-sm rounded border border-gray-200 dark:border-gray-800 hover:border-cyan-500 dark:hover:border-neon-cyan/50 hover:text-cyan-700 dark:hover:text-neon-cyan transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;