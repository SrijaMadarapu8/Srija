import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'About Me', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen 
          ? 'bg-white/90 dark:bg-tech-dark/90 backdrop-blur-md border-b border-gray-200 dark:border-white/5 py-6 shadow-sm dark:shadow-none' 
          : 'bg-transparent py-8'
      }`}
    >
      <div className="w-full px-8 md:px-12 flex justify-center items-center relative">
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-12 lg:space-x-16">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-base text-gray-600 dark:text-gray-300 hover:text-neon-cyan dark:hover:text-neon-cyan transition-colors tracking-[0.15em] uppercase font-medium"
            >
              {link.name}
            </a>
          ))}
          <div className="w-px h-6 bg-gray-300 dark:bg-gray-800 mx-8"></div>
          <div className="flex items-center space-x-6">
             <a href="https://github.com/SrijaMadarapu8" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"><Github size={20} /></a>
             <a href="https://www.linkedin.com/in/srija-madarapu-991390165/" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white transition-colors"><Linkedin size={20} /></a>
             <a href="mailto:srija.madarapu@usc.edu" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"><Mail size={20} /></a>
             
             <button 
               onClick={toggleTheme}
               className="ml-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
               aria-label="Toggle theme"
             >
               {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
             </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden absolute right-6 flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="text-gray-800 dark:text-white"
          >
             {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            className="text-gray-800 dark:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-white dark:bg-tech-dark flex flex-col items-center justify-center space-y-8 z-40 transition-colors duration-300">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-2xl text-gray-800 dark:text-gray-300 hover:text-neon-cyan font-light tracking-widest uppercase"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="flex space-x-8 mt-8">
               <a href="https://github.com/SrijaMadarapu8" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"><Github size={24} /></a>
               <a href="https://www.linkedin.com/in/srija-madarapu-991390165/" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white transition-colors"><Linkedin size={24} /></a>
               <a href="mailto:srija.madarapu@usc.edu" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"><Mail size={24} /></a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;