import React from "react";
import { motion } from "framer-motion";
import illustration from "../assets/viraj_illustration.png";
import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaDocker,
  FaGitAlt,
  FaJsSquare,
  FaDatabase,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiFirebase,
  SiTypescript,
  SiMongodb,
} from "react-icons/si";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, duration: 0.6 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const skills = [
  { name: "React", icon: <FaReact className="text-black text-3xl" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-black text-3xl" /> },
  { name: "Express", icon: <FaDatabase className="text-black text-3xl" /> },
  { name: "MongoDB", icon: <SiMongodb className="text-black text-3xl" /> },
  { name: "Tailwind", icon: <SiTailwindcss className="text-black text-3xl" /> },
  { name: "Git", icon: <FaGitAlt className="text-black text-3xl" /> },
  { name: "Docker", icon: <FaDocker className="text-black text-3xl" /> },
  { name: "Firebase", icon: <SiFirebase className="text-black text-3xl" /> },
  { name: "JavaScript", icon: <FaJsSquare className="text-black text-3xl" /> },
  {
    name: "TypeScript",
    icon: <SiTypescript className="text-black text-3xl" />,
  },
  { name: "HTML5", icon: <FaHtml5 className="text-black text-3xl" /> },
  { name: "CSS3", icon: <FaCss3Alt className="text-black text-3xl" /> },
];

const AboutMe = () => {
  return (
    <section id="about-me" className="px-6 py-20 border-b-2 border-black">
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        {/* Title */}
        <motion.h2
          className="text-4xl font-bold mb-10 text-center"
          variants={itemVariants}
        >
          About Me
        </motion.h2>

        {/* Intro + Illustration */}
        <div className="flex flex-col md:flex-row gap-10 mb-20 items-center">
          {/* Text */}
          <motion.div className="md:w-2/3" variants={itemVariants}>
            <p className="text-2xl leading-relaxed">
              I'm a full-stack developer passionate about building clean,
              scalable, and efficient web applications. With experience in both
              frontend and backend technologies, I specialize in turning ideas
              into polished, performant products. Whether it's designing UIs or
              building APIs, I thrive on solving real-world challenges through
              code and collaboration.
            </p>
          </motion.div>

          {/* Illustration */}
          <motion.div
            className="md:w-1/3 flex justify-center"
            variants={itemVariants}
          >
            <img
              src={illustration}
              alt="Viraj Illustration"
              className="w-full max-w-xs md:max-w-full border-4 border-black object-cover"
            />
          </motion.div>
        </div>

        {/* Education & Career */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          {/* Education */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-semibold mb-4">🎓 Education</h3>
            <ul className="space-y-3">
              <li>
                <p className="font-medium">
                  MCA – Amity University (2025–2027)
                </p>
                <p className="text-sm text-gray-700">
                  Specializing in Full Stack Development
                </p>
              </li>
              <li>
                <p className="font-medium">
                  B.Sc. IT – Narsee Monjee College (2019–2022)
                </p>
                <p className="text-sm text-gray-700">
                  Graduated with First Class
                </p>
              </li>
            </ul>
          </motion.div>

          {/* Career */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-semibold mb-4">💼 Career</h3>
            <ul className="space-y-3">
              <li>
                <p className="font-medium">
                  Full Stack Developer – Venus Vacations Pvt. Ltd
                </p>
                <p className="text-sm text-gray-700">
                  Built and maintained full-stack travel platforms
                </p>
              </li>
              <li>
                <p className="font-medium">
                  Application Development Associate – Accenture
                </p>
                <p className="text-sm text-gray-700">
                  Worked on enterprise-grade UI components using React
                </p>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Skills */}
        <motion.div variants={itemVariants}>
          <h3 className="text-2xl font-semibold mb-6">🛠️ Skills</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-8 text-center">
            {skills.map((skill) => (
              <motion.div
                key={skill.name}
                className="flex flex-col items-center transition hover:scale-110"
              >
                {skill.icon}
                <span className="mt-2 text-sm">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutMe;
