import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, Move3d } from 'lucide-react';

const InteractiveDemo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation based on mouse position within container
    const rotateY = ((x / rect.width) - 0.5) * 40; // -20 to 20 deg
    const rotateX = ((y / rect.height) - 0.5) * -40; // 20 to -20 deg

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <section id="interactive" className="py-24 px-6 bg-[#050a14] relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-neon-cyan/5 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-neon-purple/5 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <div>
           <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
           >
             <div className="flex items-center gap-2 text-neon-green mb-4">
               <Layers size={20} />
               <span className="font-mono uppercase tracking-widest text-sm">Interactive Sandbox</span>
             </div>
             <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
               Real-Time <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-cyan-400">Visuals</span>
             </h2>
             <p className="text-gray-400 text-lg leading-relaxed mb-8">
               Beyond static code, I create systems that breathe. My work in TouchDesigner and WebGL explores the intersection of algorithmic generation and user agency.
               <br /><br />
               Interact with the card on the right to see a CSS-3D implementation of a parallax depth effect used in my VR UI systems.
             </p>

             <div className="flex gap-4">
                <div className="p-4 bg-gray-900 rounded border border-gray-800">
                  <div className="text-2xl font-bold text-white mb-1">60+</div>
                  <div className="text-xs text-gray-500 uppercase">FPS Target</div>
                </div>
                <div className="p-4 bg-gray-900 rounded border border-gray-800">
                  <div className="text-2xl font-bold text-white mb-1">GLSL</div>
                  <div className="text-xs text-gray-500 uppercase">Custom Shaders</div>
                </div>
             </div>
           </motion.div>
        </div>

        <div className="perspective-1000 flex justify-center" ref={containerRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
           <motion.div 
             className="w-full max-w-md aspect-[4/5] relative preserve-3d duration-100 ease-out"
             style={{ 
               transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
               transformStyle: 'preserve-3d'
             }}
           >
             {/* Card Back Layers for Depth */}
             <div className="absolute inset-0 bg-gradient-to-br from-neon-purple to-blue-600 rounded-2xl opacity-20 blur-2xl transform translate-z-[-50px]"></div>
             
             {/* Main Card Surface */}
             <div className="absolute inset-0 bg-gray-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden transform translate-z-[0px]">
                
                {/* Grid overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                {/* Content Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none transform translate-z-[40px]">
                   <Move3d size={64} className="text-white mb-4 drop-shadow-glow" />
                   <h3 className="text-2xl font-bold text-white tracking-widest">DEPTH<span className="text-neon-green">.SYS</span></h3>
                   <p className="text-xs text-gray-500 mt-2 font-mono">MOUSE_OVER_DETECTED</p>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-10 left-10 w-20 h-1 bg-neon-cyan transform translate-z-[80px] shadow-lg shadow-neon-cyan/50"></div>
                <div className="absolute bottom-10 right-10 w-20 h-20 border-2 border-neon-purple rounded-full transform translate-z-[60px]"></div>
             </div>
           </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;
