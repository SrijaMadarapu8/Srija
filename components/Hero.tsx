import React from 'react';
import { motion } from 'framer-motion';
import PlantGame from './PlantGame';
const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center px-6 pt-16 z-10">
      <div className="max-w-5xl w-full mx-auto text-center">
        <div className="max-w-4xl text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-cyan-600 dark:text-neon-cyan font-mono mb-4 text-lg tracking-widest font-semibold">HELLO, WORLD. I AM</h2>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-7xl md:text-8xl font-bold text-gray-900 dark:text-white tracking-tight mb-6"
        >
          Srija Madarapu
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8"
        >
           <div className="text-2xl sm:text-3xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-gray-700 via-gray-900 to-gray-800 dark:from-gray-100 dark:via-gray-400 dark:to-gray-500 font-semibold">
             XR Developer • Creative Technologist <br className="hidden md:block" /> 
             <span className="text-xl sm:text-2xl md:text-3xl font-light text-gray-600 dark:text-gray-400 mt-2 block">
               Computer Vision Engineer
             </span>
           </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-2xl text-gray-600 dark:text-gray-400 text-lg md:text-xl leading-relaxed mb-10 mx-auto"
        >
          I build immersive experiences, intelligent 3D systems, and real-time interactive applications that bridge the physical and digital worlds.
        </motion.p>

      </div>
      </div>
      {/* Right Column: Interactive Window (Plant Game) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="hidden lg:flex justify-center items-center h-full w-full"
          >
            <PlantGame/>
          </motion.div>

      {/* Decorative Elements */}
      <motion.div 
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-gray-400 dark:text-gray-600 hidden sm:block"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-cyan-500 dark:via-neon-cyan to-transparent mx-auto mb-2"></div>
        <span className="text-xs tracking-widest uppercase">Scroll</span>
      </motion.div>
    </section>
  );
};

export default Hero;