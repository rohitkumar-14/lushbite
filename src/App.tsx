import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Zap, Leaf, Heart, ArrowDown, Menu, X, Play, Pause } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import ThreeScene from './components/ThreeScene';
import LoadingScreen from './components/LoadingScreen';
import FloatingNutrition from './components/FloatingNutrition';
import FlavorShowcase from './components/FlavorShowcase';
import InteractiveElements from './components/InteractiveElements';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

function App() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      initializeAnimations();
    }
  }, [loading]);

  const initializeAnimations = () => {
    // Hero text reveal animation
    gsap.fromTo('.hero-title span', 
      { y: 100, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1.2, 
        stagger: 0.1,
        ease: "power3.out"
      }
    );

    // Floating elements animation
    gsap.to('.floating-element', {
      y: -20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      stagger: 0.2
    });

    // Scroll-triggered animations
    ScrollTrigger.create({
      trigger: ".about-section",
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo('.about-content', 
          { x: -100, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.5, ease: "power3.out" }
        );
      }
    });

    ScrollTrigger.create({
      trigger: ".features-section",
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo('.feature-card', 
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
        );
      }
    });

    ScrollTrigger.create({
      trigger: ".nutrition-section",
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo('.nutrition-stats', 
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.2, stagger: 0.1, ease: "back.out(1.7)" }
        );
      }
    });

    // Parallax effects
    gsap.to('.parallax-bg', {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: ".parallax-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // Section pinning
    ScrollTrigger.create({
      trigger: ".hero-section",
      start: "top top",
      end: "bottom center",
      pin: true,
      pinSpacing: false
    });

    // Navigation highlighting
    ScrollTrigger.batch(".section", {
      onEnter: (elements) => {
        elements.forEach(element => {
          const id = element.getAttribute('id');
          if (id) setActiveSection(id);
        });
      }
    });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div ref={containerRef} className="relative">
      <ThreeScene />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="orbitron font-bold text-xl glow-text text-cyan-400">
              LushBite
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['hero', 'about', 'features', 'flavors', 'nutrition'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === section
                      ? 'text-cyan-400 bg-cyan-400/20'
                      : 'text-gray-300 hover:text-cyan-400'
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-gray-300 hover:text-cyan-400 transition-colors"
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden glass border-t border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['hero', 'about', 'features', 'flavors', 'nutrition'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors ${
                    activeSection === section
                      ? 'text-cyan-400 bg-cyan-400/20'
                      : 'text-gray-300 hover:text-cyan-400'
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero-section section min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 morphing-bg opacity-10"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="hero-title text-reveal">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black orbitron mb-6">
              <span className="inline-block glow-text text-cyan-400">LUSH</span>
              <span className="inline-block glow-text text-green-400">BITE</span>
            </h1>
          </div>
          
          <div className="text-reveal">
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto">
              <span className="inline-block">Experience the future of organic snacking with our</span>
              <span className="inline-block text-cyan-400 font-semibold"> revolutionary bio-enhanced nutrition</span>
            </p>
          </div>

          <div className="floating-element">
            <button className="ripple bg-gradient-to-r from-cyan-400 to-green-400 text-black px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition-transform interactive-element">
              <span className="flex items-center gap-2">
                <Sparkles size={20} />
                Discover LushBite
              </span>
            </button>
          </div>
        </div>

        <div className="scroll-indicator">
          <span>Scroll to explore</span>
          <ArrowDown size={16} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section section min-h-screen flex items-center py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="about-content">
              <h2 className="text-4xl md:text-5xl font-bold orbitron mb-6 glow-text text-cyan-400">
                Future Food, Today
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                LushBite represents the next evolution in organic nutrition. Using advanced bio-enhancement 
                technology, we've created snacks that not only taste incredible but actively boost your 
                energy levels and cognitive function.
              </p>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Each bite contains carefully balanced nutrients that work in harmony with your body's 
                natural processes, providing sustained energy without the crash.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-green-400">
                  <Leaf size={20} />
                  <span>100% Organic</span>
                </div>
                <div className="flex items-center gap-2 text-blue-400">
                  <Zap size={20} />
                  <span>Energy Enhanced</span>
                </div>
                <div className="flex items-center gap-2 text-pink-400">
                  <Heart size={20} />
                  <span>Health Optimized</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="product-glow w-full h-96 bg-gradient-to-br from-cyan-400/20 to-green-400/20 rounded-full flex items-center justify-center">
                <div className="text-6xl floating-element">🍃</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section section py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold orbitron mb-6 glow-text text-cyan-400">
              Revolutionary Features
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover what makes LushBite the most advanced organic snack on the planet
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Sparkles className="w-8 h-8 text-cyan-400" />,
                title: "Bio-Enhanced Nutrition",
                description: "Advanced molecular nutrition that adapts to your body's needs"
              },
              {
                icon: <Zap className="w-8 h-8 text-yellow-400" />,
                title: "Instant Energy Boost",
                description: "Feel the difference within minutes of your first bite"
              },
              {
                icon: <Leaf className="w-8 h-8 text-green-400" />,
                title: "100% Organic",
                description: "Pure, natural ingredients with zero artificial additives"
              },
              {
                icon: <Heart className="w-8 h-8 text-pink-400" />,
                title: "Cognitive Enhancement",
                description: "Boost focus and mental clarity with every serving"
              },
              {
                icon: <Sparkles className="w-8 h-8 text-purple-400" />,
                title: "Sustained Release",
                description: "Long-lasting energy without the crash or jitters"
              },
              {
                icon: <Zap className="w-8 h-8 text-orange-400" />,
                title: "Adaptive Formula",
                description: "Responds to your daily activity levels and requirements"
              }
            ].map((feature, index) => (
              <div key={index} className="feature-card interactive-element">
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flavors Section */}
      <section id="flavors" className="section py-20 relative">
        <FlavorShowcase />
      </section>

      {/* Nutrition Section */}
      <section id="nutrition" className="nutrition-section section py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold orbitron mb-6 glow-text text-cyan-400">
              Nutrition Facts
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Scientifically balanced nutrition for optimal performance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Protein", value: "15g", color: "text-blue-400" },
              { label: "Energy", value: "250cal", color: "text-yellow-400" },
              { label: "Fiber", value: "8g", color: "text-green-400" },
              { label: "Vitamins", value: "12+", color: "text-purple-400" }
            ].map((stat, index) => (
              <div key={index} className="nutrition-stats text-center">
                <div className={`text-4xl font-bold orbitron mb-2 ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-gray-300 text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section py-20 relative">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold orbitron mb-6 glow-text text-cyan-400">
            Ready to Experience the Future?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who've already upgraded their nutrition
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="ripple bg-gradient-to-r from-cyan-400 to-green-400 text-black px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition-transform interactive-element">
              Order Now
            </button>
            <button className="ripple border-2 border-cyan-400 text-cyan-400 px-8 py-4 rounded-full text-lg font-semibold hover:bg-cyan-400 hover:text-black transition-colors interactive-element">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Interactive Elements */}
      <InteractiveElements />
      
      {/* Floating Nutrition Info */}
      <FloatingNutrition />
    </div>
  );
}

export default App;