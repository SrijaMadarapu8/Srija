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
    skills: ["OpenCV", "SIFT/RANSAC", "SFM (Structure from Motion)", "DETR", "Mask R-CNN", "PyTorch", "YOLO"],
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
    title: "GeoAnchor AR",
    category: "AR / Mobile",
    problem: "A Unity-based geospatial AR application that places and anchors 3D models accurately onto real-world locations using live GPS data, ARCore Geospatial APIs, and large-scale map visualization.",
    description: "GeoAnchor AR is a geospatial augmented reality system that enables placement of persistent 3D models and interactive content anchored to real-world GPS locations. Using Google’s Geospatial API and ARCore, the application blends live camera input with high-precision world mapping, allowing users to visualize digital assets seamlessly integrated into physical environments.The system leverages Cesium-based map tiling for large-scale spatial context and high-fidelity terrain rendering, enabling accurate alignment between real-world geography and virtual content. It is designed for applications such as navigation overlays, urban planning visualization, location-based storytelling, and immersive AR experiences.",    
    contributions: [
      "Developed a Unity-based geospatial AR system to place and anchor 3D models in real-world locations using ARCore Geospatial API",
      "Integrated Cesium for real-time large-scale terrain and map visualization",
      "Handled synchronization between AR tracking, map tiles, and geospatial coordinates for stable outdoor AR experiences"
    ],
    techStack: ["Unity", "AR Foundation", "Google ARCore", "Map Tiles API","CesiumJS","Android"],
    image: "https://picsum.photos/id/1033/800/600",
    repoLink: "https://github.com/srijam358/geospatial-ar"
  },
  {
    id: "p2",
    title: "DualTrace",
    category: "Graphics / OpenGL",
    problem: "A hybrid WebGL and CPU-based ray tracing system that renders the same 3D scene through both real-time GPU rasterization and physically accurate CPU ray tracing using a shared stereo camera and transformation pipeline for direct visual and depth perception comparison.",
    description: "This project implements a dual-rendering architecture that supports two independent but consistent rendering pipelines over the same 3D scene. Mode A (WebGL Rasterization):A real-time GPU-based rendering pipeline using WebGL2 with programmable shaders for interactive visualization, stereo camera support, and Phong shading. Mode B (CPU Ray Tracing):A software-based ray tracer implemented in JavaScript that performs per-pixel ray generation, triangle intersection (Möller–Trumbore algorithm), barycentric interpolation, and Phong illumination.Both modes operate on the same triangle mesh dataset and share consistent camera and transformation logic, enabling direct comparison between rasterized and physically simulated rendering outputs.The system also supports stereo camera configuration, allowing left/right eye rendering for depth perception analysis.",
    contributions: [
      "Dual stereo rendering pipeline combining WebGL rasterization and CPU ray tracing for the same 3D scene",
      "Consistent stereo camera model across both modes using shared IPD-based left/right eye setup and off-axis projection logic",
      "Unified transformation framework ensuring identical model, view, and projection handling for both rendering approaches",
      "CPU ray tracer implementation with full shading, including triangle intersection, barycentric interpolation, and Phong lighting",
      "Direct visual comparison system enabling analysis of stereo depth perception differences between real-time GPU rendering and physically-based CPU rendering"
    ],
    techStack: ["JavaScript", "WebGL", "GLSL", "HTML", "JSON"],
    image: "https://picsum.photos/id/134/800/600",
    repoLink: "https://github.com/srijam358/cpp-render-engine",
    referenceLink:"https://arxiv.org/pdf/2311.05887v2"
  },
  {
    id: "p3",
    title: "Autonomous Navigation",
    category: "Robotics / Simulation",
    problem: "A complete robotic autonomy pipeline that combines probabilistic localization, sampling-based motion planning, and high-precision control for reliable robot navigation and manipulation in noisy environments.",
    description: "Autonomous Navigation is an end-to-end robotics system designed to handle uncertainty in perception and execution. It integrates particle-filter localization, optimized path planning, and Jacobian-based control to enable stable navigation and sub-centimeter manipulation accuracy.",
    contributions: [
      "Built particle filter localization (3.5k particles) for robust pose estimation under heavy sensor noise",
      "Developed RRT-based motion planning with shortcut smoothing, reducing path length by ~30%",
      "Implemented collision-safe trajectory execution pipeline.",
      "Designed Jacobian-based inverse kinematics controller for precision grasping",
      "Tuned control and integration parameters for stable real-time manipulation"
    ],
    techStack: ["Python", "ROS", "Robotics Kinematics", "NumPy","Probabilistic Filtering","Motion Planning"],
    image: "https://picsum.photos/id/20/800/600",
    repoLink: "https://github.com/srijam358/robotics-path-planning"
  },
  {
    id: "p4",
    title: "MotionFlow",
    category: "C++ / Graphics",
    problem: "A motion capture reconstruction system that fills missing data in animation sequences using multiple interpolation techniques for real-time playback and analysis.",
    description: "MotionFlow is a C++-based system that reconstructs incomplete motion capture data using interpolation techniques like Linear, Bézier, SLERP, and hybrid Bézier-SLERP methods. It enables real-time comparison of accuracy vs performance trade-offs in animation reconstruction.",
    contributions: [
      "Reconstructed missing motion capture data using Linear, Bézier, SLERP, and hybrid interpolation methods",
      "Evaluated accuracy vs performance trade-offs under real-time constraints",
      "Built OOP-based playback system with FLTK UI for live comparison of results",
      "Designed modular interpolation framework for extensibility",
      "Optimized computation for real-time animation playback"
    ],
    techStack: ["C++", "OpenGL", "FLTK", "Animation Systems"],
    image: "https://picsum.photos/id/450/800/600",
    repoLink: "https://github.com/srijam358/volumetric-player"
  },
  {
    id: "p5",
    title: "Gesture AI Controller",
    category: "ML / Interaction",
    problem: "Creating natural hand-tracking interfaces for non-VR setups.",
    description: "This project uses computer vision and deep learning to enable touchless control of desktop applications. By training a specialized Convolutional Neural Network (CNN) on a diverse dataset of hand gestures, the system achieves robust tracking in varying lighting conditions using only a standard webcam. It maps hand movements to complex OS-level commands.",
    contributions: [
      "Trained a lightweight CNN for hand pose estimation.",
      "Integrated with webcam input for real-time cursor control.",
      "Designed a gesture library for common UI actions."
    ],
    techStack: ["TensorFlow.js", "React", "Python"],
    image: "https://picsum.photos/id/532/800/600",
    repoLink: "https://github.com/srijam358/ai-gesture-control"
  },
   {
    id: "p6",
    title: "Game Engine Toolkit",
    category: "Game Engine / CG",
    problem: "A lightweight real-time rendering and debugging framework for a custom game engine, focusing on performance optimization, visualization tools, and streamlined asset workflows.",
    description: "Game Engine Toolkit is a custom-built graphics and game module for prime engine designed to improve debugging efficiency and rendering performance. It supports real-time overlays, optimized rendering pipelines, and integration with Maya-based asset workflows and physically-inspired simulation including wind effects for dynamic environments.",
    contributions: [
      "Built real-time 2D overlay system and player control debugging tools",
      "Improved rendering performance by ~40% using AABB frustum culling",
      "Integrated real-time visualization tools for engine debugging",
      "Designed Maya asset pipeline integration for faster iteration cycles",
      "Optimized render loop architecture for scalability"
    ],
    techStack: ["C++", "OpenGL", "Maya"],
    image: "https://picsum.photos/id/532/800/600",
    repoLink: "https://github.com/srijam358/ai-gesture-control"
  },
  {
    id: "p7",
    title: "3D Reconstruction Pipeline",
    category: "Computer Vision",
    problem: "Recreating 3D assets from 2D images for VR environments is time-consuming.",
    description: "A sophisticated computer vision pipeline that automates the generation of 3D models from standard photographs. By utilizing Structure-from-Motion (SFM) techniques and multi-view stereo matching, the system extracts camera positions and point clouds from unorganized image sets. The pipeline is optimized for high-resolution textured mesh generation suitable for game assets.",
    contributions: [
      "Developed a Structure-from-Motion (SFM) pipeline using OpenCV.",
      "Utilized SIFT feature matching and RANSAC for robust outlier rejection.",
      "Integrated a dense reconstruction module to output textured meshes."
    ],
    techStack: ["Python", "OpenCV", "MeshLab", "Colmap"],
    image: "https://picsum.photos/id/250/800/600",
    repoLink: "https://github.com/srijam358/3d-recon-pipeline"
  },
  {
    id: "p8",
    title: "TouchDesigner Interactive Wall",
    category: "Interactive Media",
    problem: "A museum needed an engaging, touch-free installation for visitor engagement.",
    description: "An immersive digital art installation that responds dynamically to human presence. Using Azure Kinect depth sensors, the system tracks visitor movements and translates them into fluid, generative visuals. The project features custom GLSL fragment shaders for real-time particle simulations and projection mapping calibration for irregular surfaces.",
    contributions: [
      "Created a generative particle system reactive to depth camera input.",
      "Programmed real-time fluid simulation logic using GLSL shaders within TouchDesigner.",
      "Designed the installation hardware setup including projector calibration."
    ],
    techStack: ["TouchDesigner", "GLSL", "Kinect Azure", "Python"],
    image: "https://picsum.photos/id/1042/800/600",
    repoLink: "https://github.com/srijam358/interactive-wall"
  },
  {
    id: "p9",
    title: "RPA Automated Audit System",
    category: "Automation",
    problem: "Manual data entry for financial auditing was prone to human error.",
    description: "An enterprise-grade Robotic Process Automation (RPA) solution that streamlines complex financial auditing tasks. The system utilizes UiPath bots equipped with OCR and intelligent pattern matching to process thousands of records across disparate legacy systems. It includes robust logging, error recovery, and automated compliance reporting.",
    contributions: [
      "Design UiPath bots to scrape, validate, and enter data across 4 legacy systems.",
      "Reduced processing time by 85% with 99.9% accuracy.",
      "Implemented exception handling and automated reporting via email."
    ],
    techStack: ["UiPath", "VB.NET", "SQL"],
    image: "https://picsum.photos/id/160/800/600",
    repoLink: "https://github.com/srijam358/rpa-audit"
  }
];