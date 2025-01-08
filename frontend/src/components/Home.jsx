import React from "react";
import profile from "../assets/Viraj_profile.png";
import { TypeAnimation } from "react-type-animation"; // Using TypeAnimation for better typing effects
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-between gap-10 px-6 lg:px-40 py-10 dark:bg-gray-900 dark:text-white">
      {/* Profile Image */}
      <motion.img
        src={profile}
        alt="Profile"
        className="h-[300px] w-[300px] lg:h-[500px] lg:w-[500px] rounded-full border-4 border-red-700 shadow-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      />

      {/* Content Section */}
      <div className="flex flex-col items-center lg:items-start gap-6 text-center lg:text-left">
        {/* Heading */}
        <motion.h1
          className="text-4xl lg:text-6xl font-bold"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Hi!! I am Viraj<span className="text-red-700"> Domadia</span>
        </motion.h1>

        {/* Typing Effect */}
        <motion.h2
          className="text-2xl lg:text-4xl font-semibold"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <TypeAnimation
            sequence={[
              "Frontend Developer.",
              1000,
              "Full Stack Developer.",
              1000,
              "UI/UX Developer.",
              1000,
              "Web Developer.",
              1000,
              "MERN Stack Developer.",
              1000,
              "React Developer.",
              1000,
              "JavaScript Developer.",
              1000,
            ]}
            wrapper="span"
            speed={50}
            style={{ display: "inline-block" }}
            repeat={Infinity}
          />
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-lg lg:text-xl font-medium text-gray-700 dark:text-gray-300"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          I am a passionate Frontend Developer with a strong focus on creating
          beautiful and user-friendly web applications. I have a solid
          understanding of HTML, CSS, JavaScript, and React.JS and I am always
          eager to learn new technologies and improve my skills.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col lg:flex-row gap-4 w-full lg:w-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <a
            href="../../public/VIRAJ_DOMADIA_RESUME.pdf"
            download="Viraj_Domadia_Resume"
          >
            <button className="bg-red-700 text-white py-3 px-6 rounded-xl font-semibold w-full lg:w-auto shadow-lg hover:bg-red-800 transition duration-300">
              Hire Me
            </button>
          </a>
          <a
            href="/contacts"
            className="border-2 border-red-700 text-red-700 py-3 px-6 rounded-xl font-semibold w-full lg:w-auto shadow-lg hover:bg-red-700 hover:text-white transition duration-300"
          >
            Contact Me
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
