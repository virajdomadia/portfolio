import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Projects = () => {
  // Placeholder for projects; later this can be fetched from a CMS
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Simulate a CMS fetch
    setTimeout(() => {
      setProjects([
        {
          id: 1,
          title: "Portfolio Website",
          description:
            "A responsive portfolio website built with React, TailwindCSS, and Framer Motion.",
          link: "#",
          image: "https://via.placeholder.com/300", // Replace with real image URL
        },
        {
          id: 2,
          title: "E-commerce Platform",
          description:
            "An e-commerce platform with a seamless user experience and payment integration.",
          link: "#",
          image: "https://via.placeholder.com/300", // Replace with real image URL
        },
        {
          id: 3,
          title: "Blog CMS",
          description:
            "A fully-featured blog CMS with user authentication and dynamic content management.",
          link: "#",
          image: "https://via.placeholder.com/300", // Replace with real image URL
        },
      ]);
    }, 1000); // Simulate network delay
  }, []);

  return (
    <div className="min-h-screen py-10 px-6 lg:px-40 bg-gray-100 dark:bg-gray-900 dark:text-white">
      {/* Page Title */}
      <motion.h1
        className="text-4xl font-bold text-center mb-10 text-red-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        My Projects
      </motion.h1>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.length > 0 ? (
          projects.map((project) => (
            <motion.div
              key={project.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: project.id * 0.2 }}
            >
              {/* Project Image */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-40 object-cover"
              />
              {/* Project Content */}
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-3">{project.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-red-700 font-semibold hover:underline"
                >
                  View Project →
                </a>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center">
            <p className="text-lg">Loading projects...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
