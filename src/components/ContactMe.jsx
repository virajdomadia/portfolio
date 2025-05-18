import React, { useState } from "react";
import axios from "axios";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";

const ContactMe = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/contact",
        formData
      );
      if (res.status === 201 || res.status === 200) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Something went wrong. Try again later.");
      }
    } catch (err) {
      console.error("Axios error:", err);
      setStatus("Failed to send. Server error or not reachable.");
    }
  };

  return (
    <section
      id="contact-me"
      className="py-20 px-6 md:px-20 bg-gradient-to-br from-gray-100 to-gray-50 border-t-4 border-black"
    >
      <h2 className="text-5xl font-josefin font-bold mb-12 text-center tracking-wide text-black">
        Contact Me
      </h2>
      <div className="flex flex-col md:flex-row gap-14 max-w-6xl mx-auto">
        {/* Left: Contact Form */}
        <form
          className="flex-1 bg-white p-10 rounded-2xl shadow-lg border border-black/20"
          onSubmit={handleSubmit}
        >
          <label className="block mb-6">
            <span className="block text-black font-semibold mb-2 text-lg font-josefin">
              Name
            </span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your Name"
              className="w-full rounded-lg border border-black/30 px-4 py-3 text-black font-inter text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
            />
          </label>

          <label className="block mb-6">
            <span className="block text-black font-semibold mb-2 text-lg font-josefin">
              Email
            </span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your.email@example.com"
              className="w-full rounded-lg border border-black/30 px-4 py-3 text-black font-inter text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
            />
          </label>

          <label className="block mb-6">
            <span className="block text-black font-semibold mb-2 text-lg font-josefin">
              Message
            </span>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              required
              placeholder="Write your message here..."
              className="w-full rounded-lg border border-black/30 px-4 py-3 text-black font-inter text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none transition"
            />
          </label>

          <button
            type="submit"
            className="mt-4 w-full bg-black hover:bg-gray-800 text-white font-josefin font-semibold text-lg py-3 rounded-lg shadow-md transition-colors duration-300"
          >
            Send Message
          </button>

          {status && (
            <p className="mt-4 text-center text-sm text-black/70">{status}</p>
          )}
        </form>

        {/* Right: Contact Info */}
        <div className="flex-1 bg-white p-10 rounded-2xl shadow-lg border border-black/20 flex flex-col justify-center text-black font-inter">
          <h3 className="text-3xl font-josefin font-semibold mb-8 tracking-wide">
            Get in Touch
          </h3>
          <div className="space-y-6 text-lg">
            <div className="flex items-center gap-4">
              <HiOutlineMail className="w-7 h-7" />
              <a
                href="mailto:virajdomadia6@gmail.com"
                className="hover:underline hover:text-gray-700 transition"
              >
                virajdomadia6@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-4">
              <HiOutlinePhone className="w-7 h-7" />
              <a
                href="tel:+918828091294"
                className="hover:underline hover:text-gray-700 transition"
              >
                +91 88280 91294 / +91 90821 28748
              </a>
            </div>
            <div className="flex items-center gap-4">
              <HiOutlineLocationMarker className="w-7 h-7" />
              <span>Mumbai, India</span>
            </div>
          </div>

          <div className="mt-12 flex space-x-8">
            <a
              href="https://www.linkedin.com/in/viraj-domadia-6b89751b5/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-gray-700 transition"
            >
              <FaLinkedinIn className="w-8 h-8" />
            </a>
            <a
              href="https://github.com/virajdomadia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-gray-700 transition"
            >
              <FaGithub className="w-8 h-8" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMe;
