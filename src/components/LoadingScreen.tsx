import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const LoadingScreen: React.FC = () => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Animate progress bar
    tl.fromTo(progressRef.current, 
      { width: '0%' },
      { width: '100%', duration: 2.5, ease: "power2.out" }
    );

    // Animate text
    tl.fromTo(textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      0.5
    );

    // Pulse animation for the logo
    gsap.to('.loading-logo', {
      scale: 1.1,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

    // Floating particles
    gsap.to('.loading-particle', {
      y: -20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      stagger: 0.3
    });

    // Exit animation
    const exitTl = gsap.timeline({ delay: 2.8 });
    exitTl.to(loaderRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out"
    });
    exitTl.to(loaderRef.current, {
      display: 'none',
      duration: 0
    });

  }, []);

  return (
    <div ref={loaderRef} className="loading-screen">
      <div className="text-center">
        {/* Logo */}
        <div className="loading-logo mb-8">
          <h1 className="text-6xl md:text-7xl font-black orbitron glow-text text-cyan-400">
            LUSH<span className="text-green-400">BITE</span>
          </h1>
        </div>

        {/* Loading text */}
        <div ref={textRef} className="mb-8">
          <p className="text-xl text-gray-300">Preparing your future food experience...</p>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-1 bg-gray-800 rounded-full mx-auto mb-8 overflow-hidden">
          <div 
            ref={progressRef}
            className="h-full bg-gradient-to-r from-cyan-400 to-green-400 rounded-full"
          ></div>
        </div>

        {/* Floating particles */}
        <div className="flex justify-center space-x-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="loading-particle w-2 h-2 bg-cyan-400 rounded-full"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;