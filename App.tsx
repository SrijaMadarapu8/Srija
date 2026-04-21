import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import AllProjects from './components/AllProjects';
import About from './components/About';
import Skills from './components/Skills';
import Contact from './components/Contact';
import InteractiveBackground from './components/InteractiveBackground';
import AICompanion from './components/AICompanionProps';
import ProjectDetail from './components/ProjectDetail';
import { PROJECTS } from './constants';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [currentView, setCurrentView] = useState<'home' | 'projects' | 'detail'>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [filteredProjectIds, setFilteredProjectIds] = useState<string[] | null>(null);

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

  const handleNavigation = (view: 'home' | 'projects' | 'detail', sectionId?: string, projectId?: string) => {
    setCurrentView(view);
    if (view === 'detail' && projectId) {
      setSelectedProjectId(projectId);
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    // If we are navigating to home/projects generally, clear specific filters unless specified
    if (!sectionId && view === 'home') {
       setFilteredProjectIds(null); 
    }
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
  
  const handleAiAction = (action: string, target?: string | string[]) => {
    if (action === 'navigate') {
      setFilteredProjectIds(null); // Clear filters on general nav
      if (target === 'projects') {
        handleNavigation('projects');
      } else {
        handleNavigation('home', target as string);
      }
    } else if (action === 'filter') {
      // Switch to projects view and apply filter
      setCurrentView('projects');
      if (Array.isArray(target)) {
        setFilteredProjectIds(target);
      } else if (typeof target === 'string') {
        setFilteredProjectIds([target]);
      }
    }
  };

  const selectedProject = PROJECTS.find(p => p.id === selectedProjectId);
  return (
    <div className="relative min-h-screen bg-cream dark:bg-tech-dark text-gray-900 dark:text-gray-100 transition-colors duration-300 selection:bg-neon-cyan selection:text-black">
      <InteractiveBackground theme={theme} />
      <Navbar 
        theme={theme} 
        toggleTheme={toggleTheme} 
        currentView={currentView === 'detail' ? 'projects' : currentView}
        onNavigate={handleNavigation}
      />
      
      <main className="relative z-10 flex flex-col">
        {currentView === 'home' ? (
          <>
            <Hero />
            <Projects 
              onViewAll={() => handleNavigation('projects')} 
              onProjectClick={(id) => handleNavigation('detail', undefined, id)}
            />
            <Skills />
            <About />
            <Contact />
          </>
        ) :currentView === 'projects' ? (
          <AllProjects 
            onBack={() => {
              setFilteredProjectIds(null);
              handleNavigation('home');
            }} 
            filteredProjectIds={filteredProjectIds}
            onProjectClick={(id) => handleNavigation('detail', undefined, id)}
          />
        ) : (
          selectedProject && (
            <ProjectDetail 
              project={selectedProject} 
              onBack={() => handleNavigation('projects')} 
              />
          )
        )}
      </main>
      
      {/* AI Companion Layer */}
      <AICompanion onAction={handleAiAction} />

    </div>
  );
};

export default App;