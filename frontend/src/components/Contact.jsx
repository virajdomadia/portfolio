import React, { useState } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  // State to handle form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // State to handle form submission
  const [status, setStatus] = useState("");

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("Please fill out all fields.");
      return;
    }

    // Simulate form submission (later this can be replaced with an API call)
    setTimeout(() => {
      setStatus("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen py-10 px-6 lg:px-40 bg-gray-100 dark:bg-gray-900 dark:text-white">
      {/* Page Title */}
      <motion.h1
        className="text-4xl font-bold text-center mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Let's Connect
      </motion.h1>

      {/* Contact Layout */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
        {/* Form Container (Left Side) */}
        <div className="lg:w-1/2 w-full">
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Name Input */}
            <div className="flex flex-col">
              <label htmlFor="name" className="text-lg font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Your Name"
              />
            </div>

            {/* Email Input */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-lg font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Your Email"
              />
            </div>

            {/* Message Input */}
            <div className="flex flex-col">
              <label htmlFor="message" className="text-lg font-semibold mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="5"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Your Message"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-red-700 text-white py-2 px-4 rounded-lg font-semibold w-full transition-all duration-300 hover:bg-red-600"
              >
                Send Message
              </button>
            </div>
          </motion.form>

          {/* Status Message */}
          {status && (
            <motion.div
              className="mt-6 text-center text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <p
                className={`${
                  status === "Message sent successfully!"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {status}
              </p>
            </motion.div>
          )}
        </div>

        {/* Contact Info Container (Right Side) */}
        <div className="lg:w-1/3 w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Contact Information
            </h2>
            <div className="flex items-center gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12.79V21l-4.36-2.36c-.84-.47-1.9-.38-2.66.28L11 18.79V5.21l2.98-1.58c.76-.39 1.68-.24 2.36.42L21 12.79z"
                />
              </svg>
              <span className="text-xl font-semibold">
                Phone: +91 88280 91294
              </span>
            </div>
            <div className="flex items-center gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12.79V21l-4.36-2.36c-.84-.47-1.9-.38-2.66.28L11 18.79V5.21l2.98-1.58c.76-.39 1.68-.24 2.36.42L21 12.79z"
                />
              </svg>
              <span className="text-xl font-semibold">
                Email: virajdomadia6@gmail.com
              </span>
            </div>
            <div className="flex items-center gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12.79V21l-4.36-2.36c-.84-.47-1.9-.38-2.66.28L11 18.79V5.21l2.98-1.58c.76-.39 1.68-.24 2.36.42L21 12.79z"
                />
              </svg>
              <span className="text-xl font-semibold">
                Address: Mumbai, Maharashtra, India
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
