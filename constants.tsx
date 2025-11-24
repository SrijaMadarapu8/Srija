import React from 'react';
import { Project, SkillCategory } from './types';
import { 
  Cpu, 
  Layers, 
  Box, 
  Code, 
  Terminal, 
  MonitorPlay 
} from 'lucide-react';

export const BIO_TEXT = `I am a graduate from USC with a background in Computer Science and Multimedia. I bridge the gap between creative design and robust engineering. My expertise lies in building scalable system architectures for real-time graphics, optimizing interactive pipelines, and creating immersive XR experiences that push the boundaries of human-computer interaction.`;

export const SKILLS: SkillCategory[] = [
  {
    title: "XR & Graphics",
    skills: ["Unity 3D", "Unreal Engine", "OpenXR", "OpenGL", "WebGL", "HLSL/GLSL Shaders", "Three.js", "ARKit/ARCore"],
    icon: <Box className="w-6 h-6 text-cyan-600 dark:text-neon-cyan" />
  },
  {
    title: "Computer Vision & ML",
    skills: ["OpenCV", "SIFT/RANSAC","SFM (Structure from Motion)", "DETR", "Mask R-CNN", "PyTorch", "YOLO"],
    icon: <Cpu className="w-6 h-6 text-purple-600 dark:text-neon-purple" />
  },
  {
    title: "Robotics & Automation",
    skills: ["ROS/ROS2", "Path Planning (RRT*)", "Kalman Filters", "SLAM", "UiPath (RPA)", "Inverse Kinematics"],
    icon: <Terminal className="w-6 h-6 text-green-600 dark:text-neon-green" />
  },
  {
    title: "Creative & Interactive",
    skills: ["TouchDesigner", "Generative Art", "Projection Mapping", "Blender", "Figma", "Real-time Visuals"],
    icon: <MonitorPlay className="w-6 h-6 text-pink-600 dark:text-pink-500" />
  },
  {
    title: "Languages & Tools",
    skills: ["C++", "C#", "Python", "TypeScript", "Rust", "Git", "Docker", "Linux"],
    icon: <Code className="w-6 h-6 text-yellow-600 dark:text-yellow-500" />
  }
];

export const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Geospatial AR Mobile App",
    category: "AR / Mobile",
    problem: "Navigating complex urban environments requires intuitive, heads-up information overlays.",
    contributions: [
      "Implemented GPS-VIO fusion for stable outdoor tracking.",
      "Designed a persistent cloud anchor system for multiplayer AR experiences.",
      "Optimized occlusion rendering for realistic depth integration."
    ],
    techStack: ["Unity", "AR Foundation", "Mapbox SDK", "C#"],
    image: "https://picsum.photos/id/1033/800/600",
    demoLink: "#",
    repoLink: "https://github.com",
  },
  {
    id: "p2",
    title: "Real-Time Rendering Engine",
    category: "Graphics / OpenGL",
    problem: "Standard engines lacked specific physically-based rendering features needed for simulation data.",
    contributions: [
      "Built a custom deferred rendering pipeline using OpenGL 4.5.",
      "Implemented PBR materials, shadow mapping, and screen-space ambient occlusion (SSAO).",
      "Developed a dynamic shader hot-reloading system for rapid iteration."
    ],
    techStack: ["C++", "OpenGL", "GLSL", "CMake"],
    image: "https://picsum.photos/id/134/800/600",
    demoLink: "#",
    repoLink: "https://github.com",
  },
  {
    id: "p3",
    title: "Robotics Path Planning Sim",
    category: "Robotics / Simulation",
    problem: "Autonomous agents needed efficient navigation in dynamic, cluttered environments.",
    contributions: [
      "Implemented RRT* algorithm for optimal pathfinding in 3D space.",
      "Integrated Kalman Filters for sensor fusion and noise reduction.",
      "Visualized real-time trajectory planning in a Unity-based digital twin."
    ],
    techStack: ["Python", "ROS", "Unity", "NumPy"],
    image: "https://picsum.photos/id/20/800/600",
    demoLink: "#",
    repoLink: "https://github.com",
  },
  {
    id: "p4",
    title: "3D Reconstruction Pipeline",
    category: "Computer Vision",
    problem: "Recreating 3D assets from 2D images for VR environments is time-consuming.",
    contributions: [
      "Developed a Structure-from-Motion (SFM) pipeline using OpenCV.",
      "Utilized SIFT feature matching and RANSAC for robust outlier rejection.",
      "Integrated a dense reconstruction module to output textured meshes."
    ],
    techStack: ["Python", "OpenCV", "MeshLab", "Colmap"],
    image: "https://picsum.photos/id/250/800/600",
    demoLink: "#",
    repoLink: "https://github.com",
  },
  {
    id: "p5",
    title: "TouchDesigner Interactive Wall",
    category: "Interactive Media",
    problem: "A museum needed an engaging, touch-free installation for visitor engagement.",
    contributions: [
      "Created a generative particle system reactive to depth camera input.",
      "Programmed real-time fluid simulation logic using GLSL shaders within TouchDesigner.",
      "Designed the installation hardware setup including projector calibration."
    ],
    techStack: ["TouchDesigner", "GLSL", "Kinect Azure", "Python"],
    image: "https://picsum.photos/id/1042/800/600",
    demoLink: "#",
    repoLink: "https://github.com",
  },
  {
    id: "p6",
    title: "RPA Automated Audit System",
    category: "Automation",
    problem: "Manual data entry for financial auditing was prone to human error.",
    contributions: [
      "Designed UiPath bots to scrape, validate, and enter data across legacy systems.",
      "Reduced processing time by 85% with 99.9% accuracy.",
      "Implemented exception handling and automated reporting via email."
    ],
    techStack: ["UiPath", "VB.NET", "SQL"],
    image: "https://picsum.photos/id/160/800/600",
    demoLink: "#",
    repoLink: "#",
  }
];