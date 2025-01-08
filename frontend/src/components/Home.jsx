import React from "react";
import profile from "../assets/Viraj_profile.png";
import { ReactTyped } from "react-typed";

const Home = () => {
  return (
    <div className="min-h-screen py-2 px-40 flex items-center justify-between dark:bg-gray-900 dark:text-white gap-10">
      <img
        src={profile}
        alt=""
        className="h-[700px] rounded-full border-red-700 border-4 shadow-red-700"
      />
      <div className="flex flex-col gap-10">
        <h1 className="text-6xl font-bold">
          Hi!! I am V<span className="text-red-700">iraj</span> D
          <span className="text-red-700">omadia</span>
        </h1>
        <h2 className="text-4xl font-semibold">
          <ReactTyped
            strings={[
              "Frontend Developer.",
              "Full Stack Developer.",
              "UI/UX Developer.",
              "Web Developer.",
              "MERN Stack Developer.",
              "React Developer.",
              "JavaScript Developer.",
            ]}
            typeSpeed={50} // Speed of typing
            backSpeed={30} // Speed of deleting
            backDelay={1000} // Delay before start deleting
            startDelay={500} // Delay before start typing
            loop // Loop the effect
          />
        </h2>
        <p className="text-xl font-semibold">
          I am a passionate Frontend Developer with a strong focus on creating
          beautiful and user-friendly web applications. I have a solid
          understanding of HTML, CSS, JavaScript, and React.JS and I am always
          eager to learn new technologies and improve my skills.
        </p>
        <a
          href="../../public/VIRAJ_DOMADIA_RESUME.pdf"
          download="Viraj_Domadia_Resume"
        >
          <button className="bg-red-700 text-white py-2 px-4 rounded-xl font-semibold w-full">
            Hire Me
          </button>
        </a>
      </div>
    </div>
  );
};

export default Home;
