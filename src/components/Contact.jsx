import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Background gradients for depth, not boxed */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full mix-blend-screen opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
        >
            {/* Section Header - Exact match to Projects.jsx */}
            <div className="mb-16 text-left">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-2">
                    <span className="text-primary">04.</span> What's Next?
                </h2>
                <div className="h-1 w-20 bg-primary rounded"></div>
            </div>

            <div className="max-w-3xl">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight text-left">
                    Let's Build <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Something Incredible.</span>
                </h2>

                <p className="text-text-muted text-base md:text-lg max-w-2xl mb-10 leading-relaxed text-left">
                    I'm currently open to new opportunities and collaborations. 
                    Whether you have a game-changing idea or just want to discuss modern web tech, 
                    my inbox is always open.
                </p>

                <div className="text-left">
                    <a href="mailto:yhona.peguero@gmail.com" className="group inline-block">
                        <button className="px-8 py-4 bg-white text-bg-dark font-bold text-base rounded-full hover:scale-105 transition-transform duration-300 flex items-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(0,242,254,0.4)]">
                            <span>Say Hello</span>
                            <Mail size={18} className="group-hover:rotate-12 transition-transform" />
                        </button>
                    </a>
                </div>
            </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
