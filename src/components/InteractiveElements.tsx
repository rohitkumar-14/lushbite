import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Sparkles, Zap, Heart, Star } from 'lucide-react';

const InteractiveElements: React.FC = () => {
  const elementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Floating animation for interactive elements
    gsap.to('.floating-icon', {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      stagger: 0.3
    });

    // Rotate animation
    gsap.to('.rotating-icon', {
      rotation: 360,
      duration: 8,
      repeat: -1,
      ease: "none"
    });

    // Pulse animation
    gsap.to('.pulsing-icon', {
      scale: 1.2,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

    // Sparkle animation
    gsap.to('.sparkle-icon', {
      scale: 1.1,
      rotation: 15,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });
  }, []);

  return (
    <div ref={elementsRef} className="fixed inset-0 pointer-events-none z-10">
      {/* Top Left */}
      <div className="absolute top-20 left-10 floating-icon">
        <Sparkles size={24} className="text-cyan-400 opacity-70" />
      </div>

      {/* Top Right */}
      <div className="absolute top-32 right-16 rotating-icon">
        <Zap size={20} className="text-yellow-400 opacity-60" />
      </div>

      {/* Middle Left */}
      <div className="absolute top-1/2 left-20 pulsing-icon">
        <Heart size={18} className="text-pink-400 opacity-50" />
      </div>

      {/* Middle Right */}
      <div className="absolute top-1/3 right-10 sparkle-icon">
        <Star size={16} className="text-green-400 opacity-60" />
      </div>

      {/* Bottom Left */}
      <div className="absolute bottom-40 left-8 floating-icon">
        <Sparkles size={22} className="text-purple-400 opacity-40" />
      </div>

      {/* Bottom Right */}
      <div className="absolute bottom-32 right-12 rotating-icon">
        <Zap size={18} className="text-orange-400 opacity-50" />
      </div>

      {/* Additional scattered elements */}
      <div className="absolute top-1/4 left-1/4 pulsing-icon">
        <div className="w-2 h-2 bg-cyan-400 rounded-full opacity-60"></div>
      </div>

      <div className="absolute top-3/4 right-1/4 floating-icon">
        <div className="w-3 h-3 bg-green-400 rounded-full opacity-40"></div>
      </div>

      <div className="absolute top-1/2 left-3/4 sparkle-icon">
        <div className="w-1 h-1 bg-yellow-400 rounded-full opacity-70"></div>
      </div>

      <div className="absolute bottom-1/4 left-1/3 rotating-icon">
        <div className="w-2 h-2 bg-pink-400 rounded-full opacity-50"></div>
      </div>
    </div>
  );
};

export default InteractiveElements;