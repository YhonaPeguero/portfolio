import React, { useState, useEffect } from "react";
import { Menu, X, Github, Linkedin } from "lucide-react";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Force 'contact' active state when near bottom of page
      const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
      if (isBottom) {
        setActiveSection('contact');
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", to: "home" },
    { name: "About", to: "about" },
    { name: "Skills", to: "skills" },
    { name: "Projects", to: "projects" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "glass py-4 border-b border-white/5" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold font-mono tracking-tighter text-white cursor-pointer relative group">
          <Link 
            to="home" 
            smooth={true} 
            duration={500}
            onSetActive={() => setActiveSection('home')}
          >
            YP<span className="text-primary">.</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              spy={true}
              smooth={true}
              duration={500}
              offset={-70}
              onSetActive={() => setActiveSection(link.to)}
              className={`relative px-3 py-2 transition-all duration-300 cursor-pointer text-sm font-medium tracking-wide uppercase group
                ${activeSection === link.to ? "text-white font-bold" : "text-text-muted hover:text-white"}`}
            >
              {link.name}
              {/* Active Line (Always visible when active) */}
              <span 
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-[2px] bg-primary rounded-full transform transition-transform duration-500 ease-out origin-center
                ${activeSection === link.to ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50"}`}
              ></span>
             </Link>
          ))}

          {/* Contact CTA */}
          <Link
            to="contact"
            spy={true}
            smooth={true}
            duration={500}
            offset={-70}
            onSetActive={() => setActiveSection('contact')}
            className="ml-8 px-6 py-2 text-sm font-bold text-primary border border-primary/50 hover:bg-primary hover:text-bg-dark rounded-full transition-all duration-300 cursor-pointer shadow-[0_0_10px_rgba(0,242,254,0.1)] hover:shadow-[0_0_20px_rgba(0,242,254,0.4)] hover:scale-105 relative group overflow-hidden"
          >
            <span className="relative z-10">Let's Talk</span>
            {/* Active Line inside button */}
             <span 
                className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[40%] h-[2px] bg-primary/0 rounded-full transform transition-all duration-500 ease-out origin-center
                ${activeSection === 'contact' ? "!bg-primary scale-x-100" : "scale-x-0"}`}
              ></span>
          </Link>

        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden text-text-main cursor-pointer hover:text-primary transition-colors" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full glass border-b border-white/10 md:hidden flex flex-col items-center py-8 space-y-6 overflow-hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                smooth={true}
                duration={500}
                offset={-70}
                onClick={() => setIsOpen(false)}
                className="text-text-main text-lg font-medium hover:text-primary transition-colors cursor-pointer"
              >
                {link.name}
              </Link>
            ))}
            <Link
                to="contact"
                smooth={true}
                duration={500}
                offset={-70}
                onClick={() => setIsOpen(false)}
                className="text-primary font-bold border border-primary px-6 py-2 rounded-full hover:bg-primary hover:text-bg-dark transition-all"
            >
                Let's Talk
            </Link>
            
             <div className="flex space-x-6 mt-4 pt-4 border-t border-white/10 w-1/2 justify-center">
                <a href="https://github.com/YhonaPeguero" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-white">
                    <Github size={24} />
                </a>
                <a href="https://linkedin.com/in/yhona-peguero" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-white">
                    <Linkedin size={24} />
                </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
