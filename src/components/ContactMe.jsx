import React from "react";
import { HiOutlineMail } from "react-icons/hi";
import { HiOutlinePhone } from "react-icons/hi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";

const ContactMe = () => {
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
          onSubmit={(e) => {
            e.preventDefault();
            alert("Message sent! (mock)");
          }}
        >
          <label className="block mb-6">
            <span className="block text-black font-semibold mb-2 text-lg font-josefin">
              Name
            </span>
            <input
              type="text"
              name="name"
              required
              className="w-full rounded-lg border border-black/30 px-4 py-3 text-black font-inter text-base placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
              placeholder="Your Name"
            />
          </label>

          <label className="block mb-6">
            <span className="block text-black font-semibold mb-2 text-lg font-josefin">
              Email
            </span>
            <input
              type="email"
              name="email"
              required
              className="w-full rounded-lg border border-black/30 px-4 py-3 text-black font-inter text-base placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
              placeholder="your.email@example.com"
            />
          </label>

          <label className="block mb-6">
            <span className="block text-black font-semibold mb-2 text-lg font-josefin">
              Message
            </span>
            <textarea
              name="message"
              rows={5}
              required
              className="w-full rounded-lg border border-black/30 px-4 py-3 text-black font-inter text-base placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none transition"
              placeholder="Write your message here..."
            ></textarea>
          </label>

          <button
            type="submit"
            className="mt-4 w-full bg-black hover:bg-gray-800 text-white font-josefin font-semibold text-lg py-3 rounded-lg shadow-md transition-colors duration-300"
          >
            Send Message
          </button>
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
                href="mailto:virajdomadia@example.com"
                className="hover:underline hover:text-gray-700 transition"
              >
                virajdomadia6@gmail.com
              </a>
            </div>

            <div className="flex items-center gap-4">
              <HiOutlinePhone className="w-7 h-7" />
              <a
                href="tel:+919876543210"
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
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/viraj-domadia-6b89751b5/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-black hover:text-gray-700 transition"
            >
              <FaLinkedinIn className="w-8 h-8" />
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/virajdomadia"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
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
