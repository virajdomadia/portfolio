import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Blogs = () => {
  // Placeholder for blogs; can be fetched from a CMS in the future
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Simulate a CMS fetch
    setTimeout(() => {
      setBlogs([
        {
          id: 1,
          title: "Understanding React Hooks",
          description:
            "An in-depth guide to understanding and using React Hooks effectively in your projects.",
          author: "Viraj Domadia",
          date: "Jan 1, 2025",
          link: "#",
          image: "https://via.placeholder.com/300", // Replace with real image URL
        },
        {
          id: 2,
          title: "TailwindCSS Tips & Tricks",
          description:
            "Learn how to make the most out of TailwindCSS to create modern and responsive UIs.",
          author: "Viraj Domadia",
          date: "Jan 5, 2025",
          link: "#",
          image: "https://via.placeholder.com/300", // Replace with real image URL
        },
        {
          id: 3,
          title: "Deploying with Vercel",
          description:
            "A step-by-step tutorial on deploying your React applications using Vercel.",
          author: "Viraj Domadia",
          date: "Jan 10, 2025",
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
        className="text-4xl font-bold text-center mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        My Blogs
      </motion.h1>

      {/* Blogs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <motion.div
              key={blog.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: blog.id * 0.2 }}
            >
              {/* Blog Image */}
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-40 object-cover"
              />
              {/* Blog Content */}
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-3">{blog.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  {blog.description}
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span>By {blog.author}</span> | <span>{blog.date}</span>
                </div>
                <a
                  href={blog.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-red-700 font-semibold hover:underline"
                >
                  Read More →
                </a>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center">
            <p className="text-lg">Loading blogs...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
