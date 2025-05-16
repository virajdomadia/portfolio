import React, { useState } from "react";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [active, setActive] = useState("Home");

  const links = ["Home", "About Me", "Projects", "Skills", "Contact Me"];
  return (
    <>
      <div className="flex justify-between items-center border-b-2 px-35 py-5">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-10" />
          <div className="flex flex-col ml-2 leading-tight">
            <h1 className="font-bold">Viraj</h1>
            <h1 className="font-bold">Domadia</h1>
          </div>
        </div>
        <div>
          <nav className="flex space-x-4 text-base font-semibold">
            {links.map((link) => (
              <button
                key={link}
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
              ${active === link ? "" : "scale-x-0 group-hover:scale-x-100"} 
              origin-left transition-transform duration-300 ease-out z-0`}
                ></span>
                <span className="relative z-10">{link}</span>
              </button>
            ))}
          </nav>
        </div>
        <div>
          <a
            href="../../public/Viraj_Domadia_resume.pdf"
            download
            className="border border-black bg-white text-black px-4 py-2 font-semibold transition duration-300 hover:bg-black hover:text-white"
          >
            Download Resume
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
