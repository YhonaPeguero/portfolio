import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Folder } from "lucide-react";

// Import images
import AnimeApp from "../assets/anime-app.png";
import TestApiPeliculas from "../assets/test-api.png";
import PromoVisa from "../assets/promo-visa-sin-limites.jpg";
import LeoPrint from "../assets/leoprint.jpg";
import VocationalLanding from "../assets/VocationalLanding.jpg";
import DigitalThrive from "../assets/digital-thrive.jpg";
import TokenCalculator from "../assets/llmtokencalculator.jpg";

const Projects = () => {
  const projects = [
    {
      title: "LeoPrint Client Portal",
      description: "A commercial landing page and portal for a printing business. Focused on accessibility and quick information retrieval.",
      tech: ["React", "Vite", "TailwindCSS"],
      github: null, // Private/Client
      live: "https://leo-print.vercel.app/",
      image: LeoPrint,
      category: "Client",
    },
    {
      title: "Visa Promo Campaign",
      description: "Promotional landing page for Visa 'Sin Límites'. dynamic content and high-fidelity visuals for a major marketing campaign.",
      tech: ["HTML/CSS", "JavaScript", "Animation"],
      github: null, // Private/Client
      live: "https://promo-visa.netlify.app/",
      image: PromoVisa,
      category: "Client",
    },
    {
      title: "Digital Thrive Agency",
      description: "Modern agency website featuring smooth scroll animations and a dark-mode aesthetic to showcase digital services.",
      tech: ["React", "Framer Motion", "UI/UX"],
      github: null, // Private/Client
      live: "https://digitalthrivee.com/",
      image: DigitalThrive,
      category: "Client",
    },
    {
      title: "Vocational AI Guide",
      description: "AI-powered career guidance tool. Helps users discover paths based on interests using generative AI integration.",
      tech: ["AI/LLM", "React", "Node.js"],
      github: "https://github.com/YhonaPeguero/VocationalAI",
      live: "https://vocational-ai.vercel.app/",
      image: VocationalLanding,
      category: "Side Project",
    },
    {
      title: "LLM Token Calculator",
      description: "Utility tool for developers to estimate token usage and costs for Large Language Models. essential for API budgeting.",
      tech: ["React", "Logic", "Utilities"],
      github: "https://github.com/YhonaPeguero/llms-tokens-calculator",
      live: "https://llmtokenscalulator.netlify.app/",
      image: TokenCalculator,
      category: "Tool",
    },
    {
      title: "Anime Discovery App",
      description: "Dynamic catalog application fetching data from public APIs. Features search, filtering, and detail views.",
      tech: ["React", "REST API", "CSS Grid"],
      github: "https://github.com/fabioalcocer/anime-app",
      live: "https://anime-app-ob.netlify.app/",
      image: AnimeApp,
      category: "Side Project",
    },
  ];

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-2">
            <span className="text-primary">03.</span> Featured Projects
          </h2>
          <div className="h-1 w-20 bg-primary rounded"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="group relative bg-[#112240] rounded-xl overflow-hidden hover:shadow-neon transition-all duration-300 border border-white/5"
            >
              {/* Image Overlay */}
              <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-transparent group-hover:bg-primary/10 transition-colors z-10 w-full h-full"></div>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
                  />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                        {project.title}
                    </h3>
                    <div className="flex gap-4">
                        {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-primary transition-colors">
                                <Github size={20} />
                            </a>
                        )}
                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-primary transition-colors">
                            <ExternalLink size={20} />
                        </a>
                    </div>
                </div>

                 <p className="text-text-muted mb-4 text-sm leading-relaxed line-clamp-3">
                    {project.description}
                 </p>
                 
                 <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((t, i) => (
                        <span key={i} className="text-xs font-mono text-primary/80 bg-primary/10 px-2 py-1 rounded">
                            {t}
                        </span>
                    ))}
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
