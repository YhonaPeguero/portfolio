import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section id="about" className="py-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Image / Visual */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative group"
        >
            <div className="absolute top-4 left-4 w-full h-full border-2 border-primary rounded-lg -z-10 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
            <div className="bg-transparent rounded-lg overflow-hidden transition-all duration-300">
             {/* Placeholder for profile image */}
             <div className="w-full h-[400px] bg-gradient-to-b from-gray-700 to-gray-900 flex items-center justify-center">
                <span className="text-6xl">👋</span>
             </div>
            </div>
        </motion.div>

        {/* Content */}
        <motion.div
           initial={{ opacity: 0, x: 50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center gap-2">
            <span className="text-primary">01.</span> About Me
          </h2>
          <div className="text-text-muted space-y-4 text-lg leading-relaxed">
            <p>
              I’m a Senior Software Engineer and Product Engineer with over 5 years of experience, specializing in product-driven front-end development with strong foundations in backend. I work at the intersection of UX, performance, and architecture, building web products that are clear, efficient, and scalable.
            </p>
            <p>
              As a Base LATAM Ambassador, I have extensive experience in Web3 and crypto, along with a strong interest in AI agents and intelligent systems applied to real-world products. I focus on taking complex ideas to production with technical judgment, business awareness, and attention to detail.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
