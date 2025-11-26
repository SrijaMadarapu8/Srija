import React from 'react';
import { motion } from 'framer-motion';
import PlantGame from './PlantGame';
const Hero: React.FC = () => {
  return (
    <section 
  id="hero" 
  className="relative h-screen flex items-center pt-16 z-10 bg-transparent"
>
  <div className="max-w-7xl mx-auto w-full h-full px-6 flex flex-col lg:flex-row items-center">
    
    {/* LEFT: TEXT */}
    <div className="w-full lg:w-1/2 pl-4 lg:pl-8 text-left">
      <div className="max-w-xl">

        {/* Your existing animated text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-cyan-600 dark:text-neon-cyan font-mono mb-4 text-lg tracking-widest font-semibold">
            HELLO, WORLD. I AM
          </h2>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-6"
        >
          Srija Madarapu
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8"
        >
          <div className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-gray-700 via-gray-900 to-gray-800 dark:from-gray-100 dark:via-gray-400 dark:to-gray-500 font-semibold">
            XR Developer • Creative Technologist
            <br className="hidden md:block" />
            <span className="text-xl font-light text-gray-600 dark:text-gray-400 mt-2 block">
              Computer Vision Engineer
            </span>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-10"
        >
          I build immersive experiences, intelligent 3D systems, and real-time interactive applications that bridge the physical and digital worlds.
        </motion.p>

      </div>
    </div>

    {/* RIGHT: PLANT GAME */}
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="hidden lg:flex justify-center items-center w-full lg:w-1/2"
    >
      <PlantGame />
    </motion.div>

  </div>
</section>

  );
};

export default Hero;