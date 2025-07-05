import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { X } from 'lucide-react';

const FloatingNutrition: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible && panelRef.current) {
      gsap.fromTo(panelRef.current,
        { opacity: 0, scale: 0.8, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" }
      );
    }
  }, [isVisible]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (panelRef.current) {
      setIsDragging(true);
      const rect = panelRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;

      const handleMouseMove = (e: MouseEvent) => {
        setPosition({
          x: e.clientX - offsetX,
          y: e.clientY - offsetY
        });
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  };

  const handleClose = () => {
    if (panelRef.current) {
      gsap.to(panelRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 50,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => setIsVisible(false)
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div
      ref={panelRef}
      className="floating-nutrition"
      style={{
        left: position.x,
        top: position.y,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-cyan-400">Nutrition Info</h3>
        <button
          onClick={handleClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-300">Calories</span>
          <span className="text-sm font-medium text-white">250</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-300">Protein</span>
          <span className="text-sm font-medium text-white">15g</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-300">Fiber</span>
          <span className="text-sm font-medium text-white">8g</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-300">Vitamins</span>
          <span className="text-sm font-medium text-white">12+</span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-cyan-400/20">
        <div className="text-xs text-gray-400">
          Drag to move • Click to interact
        </div>
      </div>
    </div>
  );
};

export default FloatingNutrition;