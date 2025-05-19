import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png";

const links = ["Home", "About Me", "Projects", "Contact Me"];

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const menuVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  return (
    <header className="border-b-2 px-6 py-4 md:px-20">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-10" loading="lazy" />
          <div className="flex flex-col ml-2 leading-tight">
            <h1 className="font-bold">Viraj</h1>
            <h1 className="font-bold">Domadia</h1>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-6 text-base font-semibold">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => setActive(link)}
              className={`relative px-4 py-2 transition duration-300 overflow-hidden group 
                ${
                  active === link
                    ? "bg-black text-white"
                    : "text-black hover:text-white"
                }`}
            >
              <span
                className={`absolute inset-0 left-0 w-full h-full bg-black transform 
                  ${
                    active === link ? "" : "scale-x-0 group-hover:scale-x-100"
                  } origin-left transition-transform duration-300 ease-out z-0`}
              ></span>
              <span className="relative z-10">{link}</span>
            </a>
          ))}
        </nav>

        {/* Download resume desktop */}
        <div className="hidden md:block">
          <a
            href="/Viraj_Domadia_Resume.pdf"
            download
            className="border border-black bg-white text-black px-4 py-2 font-semibold transition duration-300 hover:bg-black hover:text-white"
          >
            Download Resume
          </a>
        </div>

        {/* Hamburger menu */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className="relative w-8 h-8 flex flex-col justify-center items-center group"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block absolute h-0.5 w-6 bg-black rounded"
              transition={{ duration: 0.3 }}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block absolute h-0.5 w-6 bg-black rounded"
              style={{ top: "50%", transformOrigin: "center" }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="block absolute h-0.5 w-6 bg-black rounded"
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            key="mobile-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="md:hidden mt-4 overflow-hidden space-y-3"
          >
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => {
                  setActive(link);
                  setMenuOpen(false);
                }}
                className={`relative block w-full text-left px-4 py-2 font-semibold transition duration-300 group
                  ${
                    active === link
                      ? "bg-black text-white"
                      : "text-black hover:text-white hover:bg-black"
                  }`}
              >
                <span
                  className={`absolute inset-0 left-0 w-full h-full bg-black transform 
                    ${
                      active === link ? "" : "scale-x-0 group-hover:scale-x-100"
                    } origin-left transition-transform duration-300 ease-out z-0`}
                ></span>
                <span className="relative z-10">{link}</span>
              </a>
            ))}

            {/* Download resume mobile */}
            <a
              href="/Viraj_Domadia_Resume.pdf"
              download
              className="block border border-black bg-white text-black px-4 py-2 font-semibold transition duration-300 hover:bg-black hover:text-white"
              onClick={() => setMenuOpen(false)}
            >
              Download Resume
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
