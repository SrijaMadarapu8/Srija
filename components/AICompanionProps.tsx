import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Mic, MicOff, X, Sparkles, Flower } from 'lucide-react';
import { PROJECTS } from '../constants';

interface AICompanionProps {
  onAction: (action: string, target?: string | string[]) => void;
}

// CSS-Only 3D Plant Component
const LilyOfTheValley: React.FC<{ isSpeaking: boolean; isListening: boolean }> = ({ isSpeaking, isListening }) => {
  // Animation Variants
  const swayVariant: Variants = {
    idle: { rotate: [0, 2, -1, 0], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } },
    speaking: { rotate: [0, 1, -1, 0], scale: 1.02, transition: { duration: 0.3, repeat: Infinity } }
  };

  const bellVariant = (delay: number): Variants => ({
    idle: { 
      rotate: [0, 5, -5, 0], 
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: delay } 
    },
    speaking: { 
      rotate: [-10, 10, -10], 
      scale: [1, 1.1, 1],
      transition: { duration: 0.2, repeat: Infinity, delay: delay * 0.1 } 
    },
    listening: {
      scale: [1, 1.1, 1],
      rotate: 0,
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
    }
  });

  const state = isSpeaking ? 'speaking' : isListening ? 'listening' : 'idle';

  return (
    <div className="relative w-full h-full flex items-end justify-center pb-8 perspective-600">
      <motion.div
        className="relative w-2 h-40 bg-emerald-500 rounded-full origin-bottom flex flex-col items-center"
        variants={swayVariant}
        animate={state}
      >
         {/* Leaves at Base */}
         <div className="absolute bottom-0 left-0 w-16 h-32 bg-emerald-700 rounded-tr-[100%] rounded-bl-[20%] origin-bottom-left -rotate-45 -z-10 shadow-lg" />
         <div className="absolute bottom-0 right-0 w-14 h-28 bg-emerald-600 rounded-tl-[100%] rounded-br-[20%] origin-bottom-right rotate-[40deg] -z-10 shadow-lg" />
         
         {/* Stem Structure - Recursively curved */}
         <div className="absolute top-0 w-full h-full">
            {/* Upper Stem Segment (Arch start) */}
            <div className="absolute -top-1 left-0 w-1.5 h-20 bg-emerald-500 origin-bottom -rotate-[25deg] rounded-full">
               
               {/* Bell 1 */}
               <div className="absolute top-6 -left-1">
                 <motion.div 
                   className="w-0.5 h-4 bg-emerald-400 origin-top rotate-[30deg]"
                   animate={state === 'speaking' ? { rotate: [30, 35, 30] } : {}}
                 >
                    <motion.div 
                      className="absolute bottom-0 -left-2 w-5 h-5 bg-white rounded-t-[10px] rounded-b-[4px] shadow-[0_0_15px_rgba(255,255,255,0.9)] origin-top"
                      variants={bellVariant(0)}
                      animate={state}
                    />
                 </motion.div>
               </div>

               {/* Mid Stem Segment */}
               <div className="absolute -top-1 left-0 w-1.5 h-16 bg-emerald-500 origin-bottom -rotate-[30deg] rounded-full">
                  
                  {/* Bell 2 */}
                  <div className="absolute top-6 -left-1">
                    <motion.div 
                      className="w-0.5 h-4 bg-emerald-400 origin-top rotate-[45deg]"
                    >
                        <motion.div 
                          className="absolute bottom-0 -left-2.5 w-5 h-5 bg-white rounded-t-[10px] rounded-b-[4px] shadow-[0_0_15px_rgba(255,255,255,0.9)] origin-top"
                          variants={bellVariant(0.2)}
                          animate={state}
                        />
                    </motion.div>
                  </div>

                  {/* Top Stem Segment (Tip) */}
                  <div className="absolute -top-1 left-0 w-1.5 h-12 bg-emerald-500 origin-bottom -rotate-[35deg] rounded-full">
                       {/* Bell 3 (End) */}
                       <div className="absolute top-8 -left-0.5">
                        <motion.div 
                          className="w-0.5 h-3 bg-emerald-400 origin-top rotate-[45deg]"
                        >
                            <motion.div 
                              className="absolute bottom-0 -left-2 w-4 h-4 bg-white rounded-t-[8px] rounded-b-[3px] shadow-[0_0_15px_rgba(255,255,255,0.9)] origin-top"
                              variants={bellVariant(0.4)}
                              animate={state}
                            />
                        </motion.div>
                      </div>
                  </div>
               </div>
            </div>
         </div>
      </motion.div>
    </div>
  );
};

const AICompanion: React.FC<AICompanionProps> = ({ onAction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [responseMsg, setResponseMsg] = useState('How can I help you grow?');
  
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis>(window.speechSynthesis);

  // Initialize Speech Recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => setIsListening(true);
      recognitionRef.current.onend = () => setIsListening(false);
      
      recognitionRef.current.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        processLocalCommand(text);
      };
      
      recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error", event.error);
          setIsListening(false);
      }
    }
  }, []);

  // Initialize Voices
  useEffect(() => {
    const loadVoices = () => {
        synthRef.current.getVoices();
    };
    loadVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const speak = (text: string) => {
    if (synthRef.current.speaking) {
      synthRef.current.cancel();
    }
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = synthRef.current.getVoices();
    // Prefer a soft female voice
    const preferredVoice = voices.find(v => v.name.includes('Samantha') || v.name.includes('Google US English'));
    if (preferredVoice) utterance.voice = preferredVoice;
    
    utterance.pitch = 1.1; // Slightly higher
    utterance.rate = 0.95; // Slightly slower/calmer
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    synthRef.current.speak(utterance);
  };

  // --- LOCAL INTELLIGENCE LOGIC ---
  const processLocalCommand = async (command: string) => {
    setIsProcessing(true);
    const lowerCmd = command.toLowerCase();

    // Simulated "thinking" delay
    await new Promise(r => setTimeout(r, 600));

    let message = "";
    let action = "none";
    let target: string | string[] | undefined = undefined;

    // 0. Conversational / Small Talk Capabilities
    if (/(hello|hi|hey|greetings|morning|afternoon)/.test(lowerCmd)) {
        message = "Hello! I am Lily, your guide to Srija's digital garden.";
    } else if (/(how are you|how is it going|how are you doing)/.test(lowerCmd)) {
        message = "I am blooming happily, thank you for asking! How can I assist you?";
    } else if (/(who are you|what are you|your name)/.test(lowerCmd)) {
        message = "I am a digital Lily of the Valley, grown here to help you explore this portfolio.";
    } else if (/(what can you do|help|capabilities)/.test(lowerCmd)) {
        message = "I can take you to different sections or find specific projects. Try saying 'Show me Python projects' or 'Go to Contact'.";
    } else if (/(thank you|thanks)/.test(lowerCmd)) {
        message = "You are most welcome! Let me know if you need anything else.";
    } else if (/(bye|goodbye|see you|exit)/.test(lowerCmd)) {
        message = "Farewell! May your path be full of blossoms.";
    } else if (/(cool|awesome|beautiful|pretty|nice)/.test(lowerCmd)) {
        message = "That is very kind of you! Nature—and code—are full of wonders.";
    } else if (/(joke|funny)/.test(lowerCmd)) {
        message = "Why do programmers prefer nature? Because it has fewer bugs!";
    }

    // 1. Navigation Detection
    else if (lowerCmd.includes('home') || lowerCmd.includes('start') || lowerCmd.includes('top')) {
        message = "Returning to the garden.";
        action = "navigate";
        target = "#hero";
    } else if (lowerCmd.includes('about') || lowerCmd.includes('bio') || lowerCmd.includes('story')) {
        message = "Here is Srija's story.";
        action = "navigate";
        target = "#about";
    } else if (lowerCmd.includes('contact') || lowerCmd.includes('email') || lowerCmd.includes('hire')) {
        message = "Let's connect!";
        action = "navigate";
        target = "#contact";
    } else if (lowerCmd.includes('skills') || lowerCmd.includes('tech') || lowerCmd.includes('stack')) {
        message = "Showing technical roots.";
        action = "navigate";
        target = "#skills";
    } else if (lowerCmd.includes('all projects') || lowerCmd.includes('archive') || (lowerCmd.includes('projects') && !lowerCmd.includes('show') && !lowerCmd.includes('find'))) {
        message = "Opening the project archive.";
        action = "navigate";
        target = "projects";
    } 
    
    // 2. Project Filtering / Querying
    else {
        const stopWords = ['show', 'me', 'find', 'search', 'for', 'projects', 'works', 'using', 'with', 'in', 'made', 'a', 'the', 'i', 'want', 'to', 'see', 'tell', 'about'];
        const keywords = lowerCmd.split(' ').filter(w => !stopWords.includes(w) && w.length > 2);

        if (keywords.length > 0) {
            const matches = PROJECTS.map(p => {
                let score = 0;
                const projectString = `${p.title} ${p.category} ${p.techStack.join(' ')} ${p.problem}`.toLowerCase();
                keywords.forEach(k => {
                    if (projectString.includes(k)) score += 1;
                });
                return { id: p.id, score };
            }).filter(p => p.score > 0).sort((a, b) => b.score - a.score);

            if (matches.length > 0) {
                const bestIds = matches.map(m => m.id);
                message = `I found ${matches.length} matches blooming here.`;
                action = "filter";
                target = bestIds;
            } else {
                message = "I couldn't find a match in the garden.";
            }
        } else {
            // Fallback for unrecognized commands
            if (message === "") {
               message = "I didn't quite catch that. Try asking for 'React projects' or say 'Hello'.";
            }
        }
    }

    setResponseMsg(message);
    speak(message);

    if (action !== "none") {
        onAction(action, target);
    }

    setIsProcessing(false);
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      try {
        recognitionRef.current?.start();
        setResponseMsg("Listening...");
      } catch (e) {
        console.error("Mic error", e);
        setResponseMsg("Microphone error!");
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-6 w-72 md:w-80 bg-gray-900/95 backdrop-blur-xl border-2 border-emerald-500/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* 3D Character Viewport */}
            <div className="h-56 bg-gradient-to-b from-emerald-900/20 to-gray-900 relative flex items-center justify-center overflow-hidden">
               {/* Background Glow */}
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 to-transparent"></div>
               
               {/* CSS Plant Avatar */}
               <div className="w-full h-full relative z-10 pt-10">
                 <LilyOfTheValley isSpeaking={isSpeaking} isListening={isListening} />
               </div>

               {/* Interaction Status Indicator */}
               {isListening && (
                 <div className="absolute top-4 right-4 flex gap-1 z-20">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                 </div>
               )}
            </div>

            {/* Content Area */}
            <div className="p-4 bg-gray-900 border-t border-emerald-500/30">
              <p className="text-emerald-100 text-sm min-h-[2.5rem] font-medium leading-relaxed flex items-center">
                {isProcessing ? (
                  <span className="flex items-center gap-2 text-emerald-300">
                    <Sparkles size={14} className="animate-spin" /> Growing thoughts...
                  </span>
                ) : (
                   `"${responseMsg}"`
                )}
              </p>
              
              {transcript && (
                 <p className="text-xs text-gray-500 mt-2 border-t border-gray-800 pt-2 italic truncate">
                   You said: {transcript}
                 </p>
              )}
            </div>

            {/* Input Area */}
            <div className="p-3 bg-black/40 flex items-center gap-2">
               <input 
                 type="text" 
                 placeholder="Say 'Hello' or 'Show React projects'"
                 className="flex-grow bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none transition-colors"
                 onKeyDown={(e) => {
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                    if (e.key === 'Enter') {
                        setTranscript(e.currentTarget.value);
                        processLocalCommand(e.currentTarget.value);
                        e.currentTarget.value = '';
                    }
                 }}
               />
               <button 
                 onClick={toggleListening}
                 className={`p-2 rounded-full transition-all shadow-lg ${isListening ? 'bg-red-500/20 text-red-400 ring-1 ring-red-500' : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/40 ring-1 ring-emerald-500/30'}`}
               >
                 {isListening ? <MicOff size={16} /> : <Mic size={16} />}
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative group w-14 h-14 bg-emerald-500 border-2 border-emerald-300 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.5)] hover:shadow-[0_0_30px_rgba(16,185,129,0.8)] transition-all z-50 overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/20 rounded-full animate-[pulse_2s_infinite]"></div>
        {isOpen ? (
          <X className="text-white relative z-10 font-bold" strokeWidth={3} />
        ) : (
          <div className="relative z-10">
            <Flower className="text-white fill-white" size={24} />
          </div>
        )}
      </motion.button>
    </div>
  );
};

export default AICompanion;