import React from "react";
import { motion } from "framer-motion";
import profile from "../assets/Viraj_profile.png";
import { FaEnvelope, FaLinkedin } from "react-icons/fa";

const skills = [
  { name: "HTML5", logo: "https://cdn.simpleicons.org/html5/E34F26" },
  { name: "CSS3", logo: "https://cdn.simpleicons.org/css3/1572B6" },
  { name: "JavaScript", logo: "https://cdn.simpleicons.org/javascript/F7DF1E" },
  { name: "React", logo: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "Node.js", logo: "https://cdn.simpleicons.org/nodedotjs/339933" },
  { name: "Express", logo: "https://cdn.simpleicons.org/express/000000" },
  { name: "MongoDB", logo: "https://cdn.simpleicons.org/mongodb/47A248" },
  { name: "Git", logo: "https://cdn.simpleicons.org/git/F05032" },
  { name: "Docker", logo: "https://cdn.simpleicons.org/docker/2496ED" },
  {
    name: "Tailwind CSS",
    logo: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
      {/* Introduction Section */}
      <section className="flex flex-col items-center justify-center min-h-[60vh] text-center py-10">
        <motion.div
          className="w-full max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold mb-4 text-red-700">
            Hi, I'm Viraj Domadia
          </h1>
          <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
            A passionate Full Stack Developer who loves solving complex problems
            and building meaningful applications.
          </p>
          <motion.img
            src={profile}
            alt="Viraj Domadia"
            className="w-40 h-40 rounded-full object-cover mx-auto mb-6"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
      </section>

      {/* Background Story Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-8 text-red-700"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            My Journey
          </motion.h2>
          <motion.p
            className="text-xl text-center"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            After completing my degree in Computer Science, I started working on
            web development. My passion for building web applications led me to
            explore full-stack technologies, where I now specialize in React,
            Node.js, and other modern web frameworks.
          </motion.p>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-700 ">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-8 text-red-700"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Skills & Technologies
          </motion.h2>
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-auto gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.2 }}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={skill.logo}
                  alt={skill.name}
                  className="w-16 h-16 object-contain mb-2"
                />
                <p className="text-lg font-semibold">{skill.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact/Call to Action Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          {/* Heading */}
          <motion.h2
            className="text-3xl font-bold mb-6 text-red-700"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Let's Connect
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-300 mb-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Feel free to reach out if you'd like to collaborate, discuss an
            idea, or just say hello!
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.2 }}
          >
            {/* Email Button */}
            <motion.a
              href="mailto:viraj@example.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaEnvelope className="text-xl" />
              Email Me
            </motion.a>

            {/* LinkedIn Button */}
            <motion.a
              href="https://www.linkedin.com/in/viraj-domadia"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaLinkedin className="text-xl" />
              LinkedIn
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
