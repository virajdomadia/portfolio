import React, { useRef, useEffect, useState } from "react";
import taskmanager from "../assets/TaskManager.png";
import blogapp from "../assets/BlogApp.png";
import weather from "../assets/WeatherApp.png";
import url from "../assets/urlshortener.png";
import expense from "../assets/expensetracker.png";
import ecommerce from "../assets/ecommerce.png";
import mernEcomm from "../assets/e-commerce-MERN.png";
import chat from "../assets/ChatApp.png";
import job from "../assets/JobBoard.png";

const projects = [
  {
    title: "Smart Job Board App",
    description:
      "A full-featured MERN stack Job Board platform connecting job seekers and employers. Includes role-based authentication, job applications with resume uploads, personalized dashboards, and AI-powered job-resume matching.",
    image: job,
    tech: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "JWT",
      "Cloudinary",
      "Tailwind CSS",
      "Axios",
    ],
    github: {
      frontend: "https://github.com/virajdomadia/job-board-frontend",
      backend: "https://github.com/virajdomadia/job-board-backend",
    },
    live: "https://job-board-viraj.vercel.app/",
  },
  {
    title: "Real-Time Chat App",
    description:
      "A MERN stack chat application with real-time one-on-one messaging using Socket.io. Features include JWT authentication, live WebSocket communication, REST APIs, and a modern responsive UI with TailwindCSS.",
    image: chat,
    tech: [
      "React",
      "Node.js",
      "MongoDB",
      "Express",
      "Socket.io",
      "Tailwind CSS",
      "JWT",
      "bcrypt",
    ],
    github: "https://github.com/virajdomadia/ChatApp.git",
    live: "https://realtime-chatapp-viraj.vercel.app/",
  },
  {
    title: "E-Commerce App",
    description:
      "A MERN stack e-commerce app with JWT-based authentication. Includes product CRUD (admin only), shopping cart & checkout, and responsive UI built with React and TailwindCSS.",
    image: mernEcomm,
    tech: [
      "React",
      "Node.js",
      "MongoDB",
      "Express",
      "Tailwind CSS",
      "JWT",
      "bcrypt",
    ],
    github: "https://github.com/virajdomadia/E-Commerce.git",
    live: "https://ecommerce-viraj.vercel.app/",
  },
  {
    title: "Ecommerce UI",
    description:
      "Frontend-only e-commerce UI built with React and Tailwind CSS featuring product listings, details, and cart functionality.",
    image: ecommerce,
    tech: ["React", "Tailwind CSS", "JavaScript"],
    github: "https://github.com/virajdomadia/HypeCart-frontend.git",
    live: "https://hypecart-viraj.vercel.app/",
  },
  {
    title: "Expense Tracker",
    description:
      "A MERN stack expense tracker with JWT authentication and CRUD operations for managing categorized expenses. Features include filtering and a simple dashboard.",
    image: expense,
    tech: [
      "React",
      "Node.js",
      "MongoDB",
      "Express",
      "Tailwind CSS",
      "JWT",
      "bcrypt",
    ],
    github: "https://github.com/virajdomadia/ExpenseTracker.git",
    live: "https://expense-tracker-viraj.vercel.app/",
  },
  {
    title: "URL Shortener",
    description:
      "A minimal MERN-based URL shortener that allows users to generate short links, track clicks, and redirect to the original URL. Includes basic analytics and validation.",
    image: url,
    tech: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
    github: "https://github.com/virajdomadia/URL_Shortener.git",
    live: "https://urlshortner-viraj.vercel.app/",
  },
  {
    title: "Weather Dashboard",
    description:
      "A responsive weather dashboard that uses OpenWeather API to display real-time weather conditions. Supports city-based search, location detection, and temperature details in Celsius/Fahrenheit. Built with MERN stack and Tailwind CSS.",
    image: weather,
    tech: [
      "React",
      "Node.js",
      "MongoDB",
      "Express",
      "Tailwind CSS",
      "OpenWeather API",
      "Geolocation",
    ],
    github: "https://github.com/virajdomadia/WeatherApp.git",
    live: "https://weatherapp-viraj.vercel.app/",
  },
  {
    title: "Blog App",
    description:
      "A full-featured MERN blog platform with JWT authentication, blog post CRUD, category & tag support, and a comment system. Built with a clean and responsive UI using React and Tailwind CSS.",
    image: blogapp,
    tech: [
      "React",
      "Node.js",
      "MongoDB",
      "Express",
      "Tailwind CSS",
      "JWT",
      "bcrypt",
      "Markdown",
    ],
    github: "https://github.com/virajdomadia/Blog-App.git",
    live: "https://blog-app-viraj.vercel.app/",
  },
  {
    title: "Task Manager App",
    description:
      "A MERN stack task management app with JWT-based authentication. Includes CRUD, filters, priority sort, and responsive UI.",
    image: taskmanager,
    tech: [
      "React",
      "Node.js",
      "MongoDB",
      "Express",
      "Tailwind CSS",
      "JWT",
      "bcrypt",
    ],
    github: "https://github.com/virajdomadia/TaskManager.git",
    live: "https://task-manager-viraj.vercel.app/",
  },
];

const GitHubIcon = () => (
  <svg
    fill="currentColor"
    viewBox="0 0 24 24"
    className="w-5 h-5"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M12 2C6.48 2 2 6.58 2 12.19c0 4.53 2.87 8.38 6.84 9.74.5.09.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.61-3.37-1.37-3.37-1.37-.45-1.16-1.11-1.47-1.11-1.47-.91-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.56 2.36 1.11 2.94.85.09-.67.35-1.11.64-1.36-2.22-.26-4.56-1.15-4.56-5.14 0-1.14.39-2.07 1.03-2.8-.1-.26-.45-1.31.1-2.74 0 0 .84-.28 2.75 1.06a9.33 9.33 0 0 1 2.5-.34c.85 0 1.7.12 2.5.34 1.91-1.34 2.75-1.06 2.75-1.06.56 1.43.21 2.48.1 2.74.64.73 1.03 1.66 1.03 2.8 0 4-2.34 4.88-4.57 5.13.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.59.69.49A10.19 10.19 0 0 0 22 12.19C22 6.58 17.52 2 12 2z"
      clipRule="evenodd"
    />
  </svg>
);

const LiveIcon = () => (
  <svg
    fill="currentColor"
    viewBox="0 0 24 24"
    className="w-5 h-5"
    aria-hidden="true"
  >
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);

const Project = () => {
  const scrollRef = useRef(null);
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    const cards = document.querySelectorAll(".project-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => [
              ...new Set([...prev, entry.target.dataset.index]),
            ]);
          }
        });
      },
      { threshold: 0.3 }
    );
    cards.forEach((card) => observer.observe(card));
    return () => cards.forEach((card) => observer.unobserve(card));
  }, []);

  const scroll = (dir) => {
    if (scrollRef.current) {
      const amount = 320;
      scrollRef.current.scrollBy({
        left: dir === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .project-card {
          opacity: 0;
          transform: translateY(30px) scale(0.95);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .project-card.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .project-card:hover {
          transform: scale(1.05);
          transition: transform 0.3s ease;
          box-shadow: 0 10px 20px rgba(0,0,0,0.15);
          z-index: 10;
          position: relative;
        }
      `}</style>

      <section
        id="projects"
        aria-label="Projects"
        className="py-16 px-4 sm:px-10 md:px-20 bg-gray-50 border-b-2 border-black"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
          Projects
        </h2>

        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 bg-black text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
            aria-label="Scroll left"
          >
            &#8592;
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 bg-black text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
            aria-label="Scroll right"
          >
            &#8594;
          </button>

          <div
            ref={scrollRef}
            className="overflow-x-auto scroll-smooth px-6 hide-scrollbar"
            tabIndex={0}
            aria-label="Projects list scroll container"
          >
            <div className="flex gap-6">
              {projects.map((project, i) => (
                <article
                  key={i}
                  data-index={i}
                  className={`project-card min-w-[280px] sm:min-w-[320px] max-w-[320px] bg-white border border-black rounded-xl shadow p-5 flex-shrink-0 flex flex-col ${
                    visibleCards.includes(i.toString()) ? "visible" : ""
                  }`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-40 object-cover rounded mb-4 border"
                    loading="lazy"
                  />
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.tech.map((tech, idx) => (
                      <span
                        key={idx}
                        className="bg-black text-white text-xs px-3 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 mb-4 flex-grow">
                    {project.description}
                  </p>
                  <div className="flex justify-between flex-wrap mt-auto gap-2">
                    {typeof project.github === "string" ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-black hover:text-blue-600 font-medium"
                      >
                        <GitHubIcon />
                        <span className="hidden sm:inline">GitHub</span>
                      </a>
                    ) : (
                      <>
                        <a
                          href={project.github.frontend}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-black hover:text-blue-600 font-medium"
                        >
                          <GitHubIcon />
                          <span className="hidden sm:inline">Frontend</span>
                        </a>
                        <a
                          href={project.github.backend}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-black hover:text-blue-600 font-medium"
                        >
                          <GitHubIcon />
                          <span className="hidden sm:inline">Backend</span>
                        </a>
                      </>
                    )}
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-black hover:text-blue-600 font-medium"
                    >
                      <LiveIcon />
                      <span className="hidden sm:inline">Live</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Project;
