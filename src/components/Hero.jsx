import React from "react";
import profile from "../assets/Viraj_profile.png";

const Hero = () => {
  return (
    <>
      <section className="px-10 py-20 border-b-2 border-black">
        <div className="max-w-7xl mx-auto flex items-center gap-10">
          {/* Left: Image */}
          <div className="flex-1">
            <img
              src={profile}
              alt="Viraj Domadia"
              className="w-full max-w-sm object-cover border-4 border-black"
            />
          </div>

          {/* Right: Text */}
          <div className="flex-1">
            <h1 className="text-5xl font-bold leading-tight mb-4">
              Hey there.
              <br />
              I'm Viraj Domadia.
            </h1>
            <p className="text-lg max-w-xl">
              I’m a full-stack developer passionate about building intuitive,
              performant web applications. I work with React, Node.js, and
              MongoDB to bring scalable ideas to life.
            </p>
            <div className="mt-6 flex gap-4">
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
