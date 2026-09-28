'use client';

import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex justify-center items-center fixed top-6 w-full z-50">
      <nav className="flex items-center gap-3 px-4 py-2 border border-white/15 rounded-full bg-white/10 backdrop-blur">
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-3">
          <a href="#home" className="nav-item text-lg">Home</a>
          <a href="#projects" className="nav-item text-lg">Projects</a>
          <a href="#about" className="nav-item text-lg">About</a>
          <a href="/blog" className="nav-item text-lg">Blog</a>
          <a href="#contact" className="nav-item bg-white text-gray-900 hover:bg-white/70 hover:text-gray-900 text-lg">Contact</a>
        </div>

        {/* Social Icons - Always Visible */}
        <div className="flex items-center gap-2">
          <a 
            href="https://github.com/juangurdian" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/20 transition-colors p-1"
          >
            <FaGithub className="text-white text-xl w-full h-full" />
          </a>
          <a 
            href="https://linkedin.com/in/juan-gurdian" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/20 transition-colors p-1"
          >
            <FaLinkedin className="text-white text-xl w-full h-full" />
          </a>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full mt-2 bg-gray-900/95 backdrop-blur-md rounded-2xl p-4 md:hidden"
            >
              <div className="flex flex-col gap-3">
                <a href="#home" className="nav-item text-lg" onClick={() => setIsMenuOpen(false)}>Home</a>
                <a href="#projects" className="nav-item text-lg" onClick={() => setIsMenuOpen(false)}>Projects</a>
                <a href="#about" className="nav-item text-lg" onClick={() => setIsMenuOpen(false)}>About</a>
                <a href="/blog" className="nav-item text-lg" onClick={() => setIsMenuOpen(false)}>Blog</a>
                <a href="#contact" className="nav-item bg-white text-gray-900 hover:bg-white/70 hover:text-gray-900 text-lg" onClick={() => setIsMenuOpen(false)}>Contact</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};
