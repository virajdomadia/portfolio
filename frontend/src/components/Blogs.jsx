import React from "react";
import { motion } from "framer-motion";

const Blog = () => {
  return (
    <div className="min-h-screen py-10 px-6 lg:px-40 bg-gray-100 dark:bg-gray-900 dark:text-white">
      {/* Page Title */}
      <motion.h1
        className="text-4xl font-bold text-center mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Blog Page
      </motion.h1>

      {/* Coming Soon Message */}
      <div className="max-w-2xl mx-auto text-center bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            🚧 Coming Soon 🚧
          </h2>
          <p className="text-lg mt-4 text-gray-600 dark:text-gray-300">
            This page is currently under development. Stay tuned for the
            exciting content that will be coming soon!
          </p>
          <p className="text-lg mt-2 text-gray-600 dark:text-gray-300">
            We are working hard to bring you awesome blogs. Thank you for your
            patience!
          </p>

          <div className="mt-8">
            <a
              href="/"
              className="bg-red-700 text-white py-2 px-6 rounded-lg text-xl hover:bg-red-600 transition duration-300"
            >
              Back to Home
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;
