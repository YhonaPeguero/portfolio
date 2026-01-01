import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const terminalLines = [
  "> INITIALIZING_CORE_SYSTEMS...",
  "> LOADING_ASSETS...",
  "> ESTABLISHING_SECURE_CONNECTION...",
  "> DECRYPTING_USER_PROFILE...",
  "> ACCESS_GRANTED.",
];

const LoadingScreen = ({ onComplete }) => {
  const [lines, setLines] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Sequence the terminal lines
    let delay = 0;
    terminalLines.forEach((line, index) => {
      delay += Math.random() * 300 + 100; // Random typing speed
      setTimeout(() => {
        setLines((prev) => [...prev, line]);
      }, delay);
    });

    // Final completion trigger
    setTimeout(() => {
      setIsLoaded(true);
      setTimeout(onComplete, 800); // Wait for exit animation
    }, delay + 800);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black font-mono flex flex-col items-center justify-center p-8 overflow-hidden"
          exit={{ 
            opacity: 0, 
            scale: 1.1, 
            transition: { duration: 0.8, ease: "easeInOut" } 
          }}
        >
            {/* Background Grid Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none"></div>

            <div className="max-w-xl w-full relative z-10">
                {/* Terminal Header */}
                <div className="border-b border-primary/30 pb-2 mb-4 flex justify-between items-end">
                    <span className="text-primary text-xs">TERMINAL_V2.0</span>
                    <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    </div>
                </div>

                {/* Typing Lines */}
                <div className="space-y-2 h-32 flex flex-col justify-end">
                    {lines.map((line, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`${
                                i === lines.length - 1 ? "text-primary" : "text-primary/50"
                            } text-sm md:text-base`}
                        >
                            {line}
                        </motion.div>
                    ))}
                </div>

                {/* Progress Bar */}
                <motion.div 
                    className="w-full h-1 bg-gray-800 mt-8 rounded-full overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <motion.div
                        className="h-full bg-primary shadow-[0_0_10px_#00f2fe]"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2.5, ease: "easeInOut" }}
                    />
                </motion.div>
                
                <motion.div 
                    className="mt-2 text-right text-xs text-primary/70"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    SYSTEM_READY
                </motion.div>
            </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
