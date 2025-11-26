import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import AllProjects from './components/AllProjects';
import About from './components/About';
import Skills from './components/Skills';
import Contact from './components/Contact';
import InteractiveBackground from './components/InteractiveBackground';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [currentView, setCurrentView] = useState<'home' | 'projects'>('home');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleNavigation = (view: 'home' | 'projects', sectionId?: string) => {
    setCurrentView(view);
    
    // If navigating to a section on the home page
    if (view === 'home') {
      // Need a small timeout to allow React to render the Home view components first
      setTimeout(() => {
        if (sectionId) {
           const element = document.querySelector(sectionId);
           if (element) {
             element.scrollIntoView({ behavior: 'smooth' });
           }
        } else {
           window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 50);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-tech-dark text-gray-900 dark:text-gray-100 transition-colors duration-300 selection:bg-neon-cyan selection:text-black">
      <InteractiveBackground theme={theme} />
      <Navbar 
        theme={theme} 
        toggleTheme={toggleTheme} 
        currentView={currentView}
        onNavigate={handleNavigation}
      />
      
      <main className="relative z-10 flex flex-col">
        {currentView === 'home' ? (
          <>
            <Hero />
            <Projects onViewAll={() => handleNavigation('projects')} />
            <Skills />
            <About />
            <Contact />
          </>
        ) : (
          <AllProjects onBack={() => handleNavigation('home')} />
        )}
      </main>
    </div>
  );
};

export default App;