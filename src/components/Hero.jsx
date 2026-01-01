import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, ChevronDown } from "lucide-react";
import { Link } from "react-scroll";
import Resume from "../assets/Yhonatan Peguero-CV.pdf";

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[120px] animate-pulse-slow delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-primary font-mono mb-4 tracking-wider"
          >
            Hi, my name is
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-4 tracking-tight"
          >
            Yhona Peguero.
          </motion.h1>
          <motion.h2
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.4 }}
             className="text-3xl md:text-5xl font-bold text-text-muted mb-6 tracking-tight"
          >
            I build things for the web.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-text-muted text-lg max-w-xl mb-8 leading-relaxed"
          >
            Senior Software Engineer focused on building scalable, user-centric web products.
          </motion.p>

          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.6 }}
             className="flex flex-wrap gap-4"
          >
            <Link to="projects" smooth={true} duration={500} offset={-70}>
                <motion.button 
                    animate={{ 
                        boxShadow: [
                            "0 0 5px rgba(0,242,254,0.2), 0 0 0px rgba(112,0,223,0)",
                            "0 0 20px rgba(0,242,254,0.6), 0 0 10px rgba(112,0,223,0.4)",
                            "0 0 5px rgba(0,242,254,0.2), 0 0 0px rgba(112,0,223,0)"
                        ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="group px-8 py-3 bg-transparent border border-primary text-primary hover:bg-primary/10 transition-all rounded font-mono flex items-center gap-2"
                >
                Check out my work
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
            </Link>
            <a href={Resume} download="Yhonatan_Peguero_CV.pdf" target="_blank" rel="noopener noreferrer">
                <button className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white transition-all rounded font-mono flex items-center gap-2">
                Download CV
                <Download size={18} />
                </button>
            </a>
          </motion.div>
        </motion.div>

        {/* Visual Element (Future: 3D Model or Abstract Graphic) */}
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="hidden md:flex justify-center relative"
        >
            <div className="relative w-80 h-80 md:w-96 md:h-96">
                 {/* Decorative Circle */}
                <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
                <div className="absolute inset-4 border-2 border-accent/30 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                
                {/* Image PlaceHolder or Memoji */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-64 h-64 bg-gradient-to-tr from-primary to-accent rounded-full opacity-20 blur-2xl animate-pulse"></div>
                     {/* If user has an image, we put it here. For now a cool placeholder */}
                    <div className="z-10 text-9xl">👨‍💻</div>
                </div>
            </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer z-20"
      >
        <Link to="about" smooth={true} duration={500} offset={-70}>
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="text-primary drop-shadow-[0_0_10px_rgba(112,0,223,0.8)] hover:scale-110 transition-transform"
            >
                <ChevronDown size={36} strokeWidth={2.5} />
            </motion.div>
        </Link>
      </motion.div>
    </section>
  );
};

export default Hero;
