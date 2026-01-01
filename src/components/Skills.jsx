import React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Layout,
  Smartphone,
  Server,
  Terminal,
  Cpu,
  Globe,
} from "lucide-react";

const Skills = () => {
  const skills = [
    { name: "Frontend Development", icon: <Layout />, tech: "React, Vue, Tailwind" },
    { name: "Backend Systems", icon: <Server />, tech: "Node.js, Python, Go" },
    { name: "Mobile App Dev", icon: <Smartphone />, tech: "React Native, Flutter" },
    { name: "Database Design", icon: <Database />, tech: "PostgreSQL, MongoDB, Redis" },
    { name: "DevOps & Cloud", icon: <Globe />, tech: "AWS, Docker, CI/CD" },
    { name: "System Architecture", icon: <Cpu />, tech: "Microservices, Serverless" },
  ];

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-2">
            <span className="text-primary">02.</span> Skills & Expertise
          </h2>
          <div className="h-1 w-20 bg-primary rounded"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="glass p-8 rounded-xl border border-white/5 hover:border-primary/30 transition-colors group cursor-default"
            >
              <div className="text-primary mb-4 group-hover:text-accent transition-colors">
                {React.cloneElement(skill.icon, { size: 40 })}
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {skill.name}
              </h3>
              <p className="text-text-muted text-sm font-mono">
                {skill.tech}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
