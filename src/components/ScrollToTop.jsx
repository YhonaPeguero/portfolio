import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { animateScroll as scroll } from 'react-scroll';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 500,
      smooth: true,
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            className="fixed bottom-8 right-8 z-40"
        >
          <button
            onClick={scrollToTop}
            className="p-3 bg-bg-dark/80 backdrop-blur-md border border-primary/30 rounded-full text-primary hover:bg-primary hover:text-bg-dark hover:shadow-[0_0_20px_rgba(0,242,254,0.5)] transition-all duration-300 group"
          >
            <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform duration-300" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
