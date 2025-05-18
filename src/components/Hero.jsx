import React from "react";
import { motion } from "framer-motion";
import profile from "../assets/Viraj_profile.png";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, duration: 0.8 },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { ease: "easeOut" } },
};

const Hero = () => {
  return (
    <section className="px-6 py-20 border-b-2 border-black">
      <motion.div
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left: Image */}
        <motion.div
          className="flex-1 w-full max-w-sm"
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
          }}
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={profile}
            alt="Viraj Domadia"
            className="w-full object-cover border-4 border-black rounded-md"
          />
        </motion.div>

        {/* Right: Text */}
        <motion.div className="flex-1 w-full text-center md:text-left">
          <motion.h1
            className="text-4xl md:text-5xl font-bold leading-tight mb-4"
            variants={textVariants}
          >
            Hey there.
            <br />
            I'm Viraj Domadia.
          </motion.h1>
          <motion.p
            className="text-lg max-w-xl mx-auto md:mx-0"
            variants={textVariants}
          >
            I’m a full-stack developer passionate about building intuitive,
            performant web applications. I work with React, Node.js, and MongoDB
            to bring scalable ideas to life.
          </motion.p>
          <motion.div
            className="mt-6 flex flex-col md:flex-row justify-center md:justify-start gap-4 max-w-xs mx-auto md:mx-0"
            variants={textVariants}
          >
            <a
              href="#contact"
              className="border border-black bg-white text-black px-5 py-2 font-semibold transition duration-300 hover:bg-black hover:text-white"
            >
              Contact Me
            </a>
            <a
              href="../../public/Viraj_Domadia_resume.pdf"
              download
              className="border border-black bg-white text-black px-5 py-2 font-semibold transition duration-300 hover:bg-black hover:text-white"
            >
              Download Resume
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
