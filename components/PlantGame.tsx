import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RefreshCw, 
  Trophy,
  Flower2,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Map as MapIcon,
  Move
} from 'lucide-react';

// Maze Configuration
const ROWS = 13;
const COLS = 11;

type Point = { x: number; y: number };

const InteractiveDemo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  
  // Game State
  const [maze, setMaze] = useState<number[][]>([]); // 1 = Path (Branch), 0 = Empty
  const [playerPos, setPlayerPos] = useState<Point>({ x: 1, y: ROWS - 2 });
  const [endPos, setEndPos] = useState<Point>({ x: COLS - 2, y: 1 });
  const [pathHistory, setPathHistory] = useState<Point[]>([]);
  const [isWon, setIsWon] = useState(false);
  const [gameId, setGameId] = useState(0); // To trigger resets

  // 3D Tilt Effect - Mouse
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 15; 
    const rotateX = ((y / rect.height) - 0.5) * -15; 
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  // Maze Generation (Recursive Backtracker)
  const generateMaze = useCallback(() => {
    // Initialize with walls (0)
    const newMaze = Array(ROWS).fill(0).map(() => Array(COLS).fill(0));
    
    const stack: Point[] = [];
    const start: Point = { x: 1, y: ROWS - 2 };
    
    // Helper to check valid neighbors
    const getUnvisitedNeighbors = (curr: Point) => {
      const neighbors: Point[] = [];
      const dirs = [[0, -2], [0, 2], [-2, 0], [2, 0]]; // Jump 2 to leave walls
      
      for (const [dx, dy] of dirs) {
        const nx = curr.x + dx;
        const ny = curr.y + dy;
        if (nx > 0 && nx < COLS - 1 && ny > 0 && ny < ROWS - 1 && newMaze[ny][nx] === 0) {
          neighbors.push({ x: nx, y: ny });
        }
      }
      return neighbors;
    };

    // Start Generation
    newMaze[start.y][start.x] = 1;
    stack.push(start);

    while (stack.length > 0) {
      const current = stack[stack.length - 1];
      const neighbors = getUnvisitedNeighbors(current);

      if (neighbors.length > 0) {
        // Choose random neighbor
        const next = neighbors[Math.floor(Math.random() * neighbors.length)];
        
        // Remove wall between
        newMaze[(current.y + next.y) / 2][(current.x + next.x) / 2] = 1;
        newMaze[next.y][next.x] = 1;
        
        stack.push(next);
      } else {
        stack.pop();
      }
    }

    // Ensure start/end are open (sometimes the algo isolates corners in small grids)
    newMaze[ROWS-2][1] = 1;
    // Set End Point at top right-ish
    newMaze[1][COLS-2] = 1; 

    setMaze(newMaze);
    setPlayerPos({ x: 1, y: ROWS - 2 });
    setEndPos({ x: COLS - 2, y: 1 });
    setPathHistory([{ x: 1, y: ROWS - 2 }]);
    setIsWon(false);
  }, []);

  // Initialize Game
  useEffect(() => {
    generateMaze();
  }, [gameId, generateMaze]);

  // Movement Logic
  const move = useCallback((dx: number, dy: number) => {
    if (isWon) return;

    setPlayerPos(prev => {
      const newX = prev.x + dx;
      const newY = prev.y + dy;

      // Check bounds
      if (newY < 0 || newY >= ROWS || newX < 0 || newX >= COLS) return prev;
      
      // Check collision (0 is empty space/wall)
      if (maze[newY][newX] === 0) return prev;

      // Update Path History
      // If we are backtracking (going to previous cell), pop history. Else push.
      const lastPos = pathHistory[pathHistory.length - 2];
      let newHistory = [...pathHistory];
      
      if (lastPos && lastPos.x === newX && lastPos.y === newY) {
        newHistory.pop();
      } else {
        newHistory.push({ x: newX, y: newY });
      }
      setPathHistory(newHistory);

      // Check Win
      if (newX === endPos.x && newY === endPos.y) {
        setIsWon(true);
      }

      return { x: newX, y: newY };
    });
  }, [maze, isWon, endPos, pathHistory]);

  // Keyboard Controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      // Prevent scrolling for game keys
      if (["arrowup", "arrowdown", "arrowleft", "arrowright", " ", "w", "a", "s", "d", "i", "j", "k", "l"].includes(k)) {
         // Only prevent default if we are specifically handling it to avoid locking browser too aggressively
         if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(k)) e.preventDefault();
      }

      switch (k) {
        // Player Movement (Arrows + WASD)
        case 'arrowup': 
        case 'w':
          move(0, -1); break;
        case 'arrowdown':
        case 's': 
          move(0, 1); break;
        case 'arrowleft':
        case 'a':
          move(-1, 0); break;
        case 'arrowright':
        case 'd':
          move(1, 0); break;
        
        // 3D Layer Tilt Controls (IJKL)
        case 'i': // Tilt Up
            setRotation(prev => ({ ...prev, x: Math.min(prev.x + 2, 15) })); break;
        case 'k': // Tilt Down
            setRotation(prev => ({ ...prev, x: Math.max(prev.x - 2, -15) })); break;
        case 'j': // Tilt Left
            setRotation(prev => ({ ...prev, y: Math.max(prev.y - 2, -15) })); break;
        case 'l': // Tilt Right
            setRotation(prev => ({ ...prev, y: Math.min(prev.y + 2, 15) })); break;

        // Reset
        case ' ':
          if (isWon) setGameId(p => p + 1);
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [move, isWon]);


  // Helper to check if a cell is in the player's current path
  const getPathIndex = (x: number, y: number) => {
    return pathHistory.findIndex(p => p.x === x && p.y === y);
  };

  return (
    <div 
      className="perspective-1000 w-full h-full flex items-center justify-center p-4 min-h-[500px]" 
      ref={containerRef} 
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave}
    >
      <motion.div 
        className="w-full max-w-sm aspect-[4/5] relative preserve-3d duration-100 ease-out"
        style={{ 
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Glow Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-green-500/10 rounded-2xl opacity-50 blur-2xl transform translate-z-[-40px]"></div>
        
        {/* Main Card */}
        <div className="absolute inset-0 bg-gray-900/90 dark:bg-black/80 backdrop-blur-xl border border-amber-900/30 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col transform translate-z-[0px]">
          
          {/* Header */}
          <div className="h-14 border-b border-white/10 flex items-center justify-between px-6 bg-white/5">
             <div className="flex items-center gap-3">
               <div className={`w-2 h-2 rounded-full animate-pulse ${isWon ? 'bg-green-500' : 'bg-amber-500'}`}></div>
               <span className="text-xs font-mono text-gray-300 tracking-widest uppercase">
                 {isWon ? 'Blossom' : 'Play Bloom'}
               </span>
             </div>
             <MapIcon size={16} className="text-amber-500" />
          </div>

          {/* Game Area */}
          <div className="flex-grow relative p-6 flex flex-col items-center justify-center transform translate-z-[20px]">
             
             {/* The Maze Grid */}
             <div 
                className="relative grid gap-1"
                style={{
                  gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
                  width: '100%',
                  aspectRatio: `${COLS}/${ROWS}`
                }}
             >
                {maze.map((row, y) => (
                  row.map((cell, x) => {
                    const isPath = cell === 1;
                    const pathIndex = getPathIndex(x, y);
                    const isPlayer = playerPos.x === x && playerPos.y === y;
                    const isEnd = endPos.x === x && endPos.y === y;
                    const isTraversed = pathIndex !== -1;

                    if (!isPath) return <div key={`${x}-${y}`} className="opacity-0" />; // Empty space

                    return (
                      <div 
                        key={`${x}-${y}`} 
                        className={`
                          relative rounded-sm transition-all duration-300
                          ${isTraversed && !isWon ? 'bg-green-600/80' : 'bg-amber-900/40'}
                          ${isWon && isTraversed ? 'bg-green-900/40' : ''}
                        `}
                      >
                        {/* Player Wisp - "Flower Bust" Avatar */}
                        {isPlayer && !isWon && (
                          <motion.div 
                            layoutId="player"
                            className="absolute inset-0 z-20 flex items-center justify-center"
                          >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className="relative w-full h-full flex items-center justify-center"
                            >
                                {/* Inner glow */}
                                <div className="absolute w-4 h-4 bg-cyan-400/30 rounded-full blur-md" />
                                {/* The Flower Character */}
                                <Flower2 size={16} className="text-cyan-200 relative z-10 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                                
                                {/* Orbiting particles (The Bust Effect) */}
                                {[0, 1, 2].map(i => (
                                    <motion.div
                                        key={i}
                                        animate={{ 
                                            scale: [0.8, 1.2, 0.8], 
                                            opacity: [0.4, 0.8, 0.4] 
                                        }}
                                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                                        className="absolute w-1 h-1 bg-white rounded-full"
                                        style={{ 
                                            top: i === 0 ? '-10%' : i === 1 ? '80%' : '80%',
                                            left: i === 0 ? '50%' : i === 1 ? '10%' : '90%',
                                        }}
                                    />
                                ))}
                            </motion.div>
                          </motion.div>
                        )}

                        {/* End Goal Marker (Before Win) */}
                        {isEnd && !isWon && (
                           <div className="absolute inset-0 flex items-center justify-center">
                             <div className="w-2 h-2 bg-pink-500 rounded-full animate-ping" />
                           </div>
                        )}

                        {/* Blooming Animation on Win (Standard Path) */}
                        {isWon && isTraversed && !isEnd && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1.5, opacity: 1 }}
                            transition={{ delay: pathIndex * 0.05, type: 'spring' }}
                            className="absolute inset-0 flex items-center justify-center z-10"
                          >
                            <Flower2 
                              size={16} 
                              className={`${
                                ['text-pink-500', 'text-purple-500', 'text-yellow-500', 'text-red-400'][pathIndex % 4]
                              }`} 
                              fill="currentColor"
                            />
                          </motion.div>
                        )}

                        {/* END GOAL FLOWER BURST ANIMATION (Victory) */}
                        {isWon && isEnd && (
                          <>
                             {/* Central Big Flower */}
                             <motion.div
                               initial={{ scale: 0, rotate: 0 }}
                               animate={{ scale: 2.5, rotate: 360 }}
                               transition={{ type: "spring", duration: 1.5, delay: pathHistory.length * 0.05 }}
                               className="absolute inset-0 flex items-center justify-center z-30"
                             >
                                <Flower2 size={24} className="text-pink-500 fill-pink-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.6)]" />
                             </motion.div>

                             {/* Burst Particles */}
                             {[...Array(12)].map((_, i) => {
                               const angle = (i * 30 * Math.PI) / 180;
                               return (
                                 <motion.div
                                   key={`burst-${i}`}
                                   initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                                   animate={{
                                     x: Math.cos(angle) * 40,
                                     y: Math.sin(angle) * 40,
                                     opacity: 0,
                                     scale: [0, 1, 0]
                                   }}
                                   transition={{ duration: 1.2, ease: "easeOut", delay: pathHistory.length * 0.05 + 0.1 }}
                                   className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-gradient-to-r from-pink-300 to-purple-400 rounded-full z-20 shadow-[0_0_5px_rgba(236,72,153,0.8)]"
                                   style={{ marginLeft: '-3px', marginTop: '-3px' }}
                                 />
                               );
                             })}
                             
                             {/* Ring Ripple */}
                             <motion.div
                               initial={{ scale: 0, opacity: 0.8 }}
                               animate={{ scale: 4, opacity: 0 }}
                               transition={{ duration: 1.5, delay: pathHistory.length * 0.05 }}
                               className="absolute top-1/2 left-1/2 w-full h-full border-2 border-pink-400/50 rounded-full z-10 -translate-x-1/2 -translate-y-1/2"
                             />
                          </>
                        )}
                        
                        {/* Buds/Leaves for traversed path */}
                        {isWon && isTraversed && (
                           <motion.div 
                             initial={{ scale: 0 }}
                             animate={{ scale: 1 }}
                             transition={{ delay: pathIndex * 0.05 + 0.1 }}
                             className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-500 rounded-full"
                           />
                        )}
                      </div>
                    );
                  })
                ))}
             </div>

             {/* Victory Overlay */}
             <AnimatePresence>
               {isWon && (
                 <motion.div 
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.5 }}
                   className="absolute bottom-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-green-500/30 flex items-center gap-2 z-30"
                 >
                   <Trophy size={14} className="text-yellow-500" />
                   <span className="text-xs font-bold text-green-400">MAZE BLOOMED! SPACE TO RESET</span>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="p-4 bg-white/5 border-t border-white/10 z-20 transform translate-z-[40px]">
            {isWon ? (
              <button 
                onClick={(e) => { e.stopPropagation(); setGameId(p => p + 1); }}
                className="w-full py-3 bg-green-900/50 hover:bg-green-800/50 text-green-400 rounded-lg flex items-center justify-center gap-2 font-mono text-sm transition-colors border border-green-500/30"
              >
                <RefreshCw size={16} /> RESTART (SPACE)
              </button>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-3 gap-2 max-w-[200px] mx-auto">
                   <div />
                   <button className="h-10 bg-white/10 rounded hover:bg-cyan-500/20 active:bg-cyan-500/40 text-gray-300 flex items-center justify-center transition-colors" onClick={() => move(0, -1)}><ChevronUp size={20} /></button>
                   <div />
                   <button className="h-10 bg-white/10 rounded hover:bg-cyan-500/20 active:bg-cyan-500/40 text-gray-300 flex items-center justify-center transition-colors" onClick={() => move(-1, 0)}><ChevronLeft size={20} /></button>
                   <button className="h-10 bg-white/10 rounded hover:bg-cyan-500/20 active:bg-cyan-500/40 text-gray-300 flex items-center justify-center transition-colors" onClick={() => move(0, 1)}><ChevronDown size={20} /></button>
                   <button className="h-10 bg-white/10 rounded hover:bg-cyan-500/20 active:bg-cyan-500/40 text-gray-300 flex items-center justify-center transition-colors" onClick={() => move(1, 0)}><ChevronRight size={20} /></button>
                </div>
                
                <div className="flex justify-between items-center text-[10px] text-gray-500 px-2 uppercase tracking-widest font-mono">
                    <span>WASD to Move</span>
                    <span className="flex items-center gap-1"><Move size={10}/> IJKL to Tilt</span>
                </div>
              </div>
            )}
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default InteractiveDemo;