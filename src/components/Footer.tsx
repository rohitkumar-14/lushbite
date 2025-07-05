import React from 'react';
import { Sparkles, Zap, Leaf, Heart, Mail, Phone, MapPin, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-gradient-to-b from-gray-900/50 to-black border-t border-cyan-400/20">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-green-400/5"></div>
      
      <div className="relative container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-3xl font-black orbitron glow-text text-cyan-400 mb-4">
                LUSH<span className="text-green-400">BITE</span>
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Experience the future of organic snacking with our revolutionary bio-enhanced nutrition technology.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 text-green-400">
                <Leaf size={16} />
                <span className="text-sm">100% Organic</span>
              </div>
              <div className="flex items-center gap-2 text-blue-400">
                <Zap size={16} />
                <span className="text-sm">Energy Enhanced</span>
              </div>
              <div className="flex items-center gap-2 text-pink-400">
                <Heart size={16} />
                <span className="text-sm">Health Optimized</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex gap-4">
              {[
                { icon: Instagram, color: 'text-pink-400' },
                { icon: Twitter, color: 'text-blue-400' },
                { icon: Facebook, color: 'text-blue-500' },
                { icon: Youtube, color: 'text-red-400' }
              ].map((social, index) => (
                <button
                  key={index}
                  className={`${social.color} hover:scale-110 transition-transform duration-300 p-2 rounded-full glass hover:bg-white/10`}
                >
                  <social.icon size={20} />
                </button>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-6 orbitron">Products</h4>
            <ul className="space-y-3">
              {[
                'Cosmic Berry',
                'Quantum Mint',
                'Solar Citrus',
                'Nebula Chocolate',
                'Stellar Vanilla',
                'Galaxy Mix Pack'
              ].map((product, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2">
                    <Sparkles size={12} className="text-cyan-400" />
                    {product}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-6 orbitron">Company</h4>
            <ul className="space-y-3">
              {[
                'About Us',
                'Our Mission',
                'Sustainability',
                'Careers',
                'Press Kit',
                'Investor Relations'
              ].map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-6 orbitron">Contact</h4>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-gray-300">
                <Mail size={16} className="text-cyan-400" />
                <span>hello@lushbite.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone size={16} className="text-green-400" />
                <span>+1 (555) 123-BITE</span>
              </div>
              <div className="flex items-start gap-3 text-gray-300">
                <MapPin size={16} className="text-pink-400 mt-1" />
                <span>123 Future Food Ave<br />Innovation City, IC 12345</span>
              </div>
            </div>

            <div>
              <h5 className="text-lg font-semibold text-white mb-3">Support</h5>
              <ul className="space-y-2">
                {[
                  'Help Center',
                  'Shipping Info',
                  'Returns',
                  'FAQ'
                ].map((link, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="glass rounded-2xl p-8 mb-12">
          <div className="text-center mb-6">
            <h4 className="text-2xl font-bold orbitron text-cyan-400 mb-2">Stay in the Loop</h4>
            <p className="text-gray-300">Get the latest updates on new flavors and exclusive offers</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-cyan-400/30 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            />
            <button className="ripple bg-gradient-to-r from-cyan-400 to-green-400 text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform">
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © 2025 LushBite. All rights reserved. | Powered by future food technology.
            </div>
            
            <div className="flex gap-6 text-sm">
              {[
                'Privacy Policy',
                'Terms of Service',
                'Cookie Policy',
                'Accessibility'
              ].map((link, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 right-10 opacity-20">
          <Sparkles size={24} className="text-cyan-400 animate-pulse" />
        </div>
        <div className="absolute bottom-20 left-10 opacity-20">
          <Zap size={20} className="text-green-400 animate-bounce" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;