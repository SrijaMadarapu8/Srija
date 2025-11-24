import React, { useEffect, useRef } from 'react';

interface InteractiveBackgroundProps {
  theme: 'light' | 'dark';
}

const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    
    // Define properties based on theme
    const properties = {
      bgColor: theme === 'dark' ? 'rgba(3, 7, 18, 1)' : 'rgba(249, 250, 251, 1)', // tech-dark vs gray-50
      particleColor: theme === 'dark' ? 'rgba(6, 182, 212, 0.5)' : 'rgba(8, 145, 178, 0.3)', // neon-cyan vs darker cyan
      particleRadius: 2,
      particleCount: 60,
      lineLength: 150,
      mouseRadius: 200,
      lineColor: theme === 'dark' ? '6, 182, 212' : '8, 145, 178',
      highlightColor: theme === 'dark' ? '168, 85, 247' : '147, 51, 234'
    };

    let mouse = { x: w / 2, y: h / 2 };

    class Particle {
      x: number;
      y: number;
      velocityX: number;
      velocityY: number;

      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.velocityX = Math.random() * (Math.random() < 0.5 ? -0.5 : 0.5);
        this.velocityY = Math.random() * (Math.random() < 0.5 ? -0.5 : 0.5);
      }

      position() {
        this.x + this.velocityX > w && this.velocityX > 0 || this.x + this.velocityX < 0 && this.velocityX < 0 ? this.velocityX *= -1 : this.velocityX;
        this.y + this.velocityY > h && this.velocityY > 0 || this.y + this.velocityY < 0 && this.velocityY < 0 ? this.velocityY *= -1 : this.velocityY;
        this.x += this.velocityX;
        this.y += this.velocityY;
      }

      reDraw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = properties.particleColor;
        ctx.fill();
      }
    }

    const reDrawBackground = () => {
      ctx.fillStyle = properties.bgColor;
      ctx.fillRect(0, 0, w, h);
    };

    const drawLines = () => {
      let x1, y1, x2, y2, length, opacity;
      for (let i in particles) {
        for (let j in particles) {
          x1 = particles[i].x;
          y1 = particles[i].y;
          x2 = particles[j].x;
          y2 = particles[j].y;
          length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
          
          const distMouse = Math.sqrt(Math.pow(x1 - mouse.x, 2) + Math.pow(y1 - mouse.y, 2));

          if (length < properties.lineLength) {
            opacity = 1 - length / properties.lineLength;
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = `rgba(${properties.lineColor}, ${opacity})`;
            
            if (distMouse < properties.mouseRadius) {
                ctx.strokeStyle = `rgba(${properties.highlightColor}, ${opacity + 0.2})`;
                if (distMouse < 100) {
                    ctx.lineWidth = 1;
                }
            }

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.closePath();
            ctx.stroke();
          }
        }
      }
    };

    let animationFrameId: number;
    const loop = () => {
      reDrawBackground();
      for (let i in particles) {
        particles[i].position();
        particles[i].reDraw();
      }
      drawLines();
      animationFrameId = requestAnimationFrame(loop);
    };

    const init = () => {
      particles.length = 0;
      for (let i = 0; i < properties.particleCount; i++) {
        particles.push(new Particle());
      }
      loop();
    };

    init();

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default InteractiveBackground;