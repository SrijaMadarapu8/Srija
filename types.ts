import React from 'react';

export interface Project {
  id: string;
  title: string;
  category: string;
  problem: string;
  contributions: string[];
  techStack: string[];
  image: string;
  demoLink?: string;
  repoLink?: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
  icon: React.ReactNode;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: React.ReactNode;
}