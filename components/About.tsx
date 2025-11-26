import React from 'react';
import { BIO_TEXT } from '../constants';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 px-6 bg-gray-50 dark:bg-[#080c16] transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/3"
          >
            {/* Stylized Profile Image Placeholder */}
            <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-gray-200 dark:border-gray-800 shadow-lg dark:shadow-none">
              <img 
                src="./src/assets/pic1.jpg" 
                alt="Profile" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-cyan-500/10 dark:bg-neon-purple/10 mix-blend-overlay pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
            </div>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="w-full md:w-2/3"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">About Me</h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
              {BIO_TEXT}
            </p>
            <div className="grid grid-cols-2 gap-6">
               <div className="border-l-2 border-cyan-500 dark:border-neon-cyan pl-4">
                 <h4 className="text-gray-900 dark:text-white font-bold">Education</h4>
                 <p className="text-gray-600 dark:text-gray-400 text-sm">M.S. Computer Science <br/> University of Southern California</p>
               </div>
               <div className="border-l-2 border-purple-500 dark:border-neon-purple pl-4">
                 <h4 className="text-gray-900 dark:text-white font-bold">Focus</h4>
                 <p className="text-gray-600 dark:text-gray-400 text-sm">System Architecture <br/> Real-Time Rendering</p>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;