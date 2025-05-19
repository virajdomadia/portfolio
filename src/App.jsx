import "./App.css";
import AboutMe from "./components/AboutMe";
import ContactMe from "./components/ContactMe";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Project from "./components/Project";

import { Helmet } from "react-helmet";
import ReactGA from "react-ga4";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    ReactGA.initialize("G-V8M9C34EY7"); // ✅ Your real Measurement ID
    ReactGA.send("pageview"); // 👈 This sends a pageview event
  }, []);

  return (
    <>
      <Helmet>
        <title>Viraj Domadia | Full Stack Developer</title>
        <meta
          name="description"
          content="Portfolio of Viraj Domadia, a skilled Full Stack Developer specializing in MERN stack, React, Node.js, MongoDB, and Tailwind CSS."
        />
        <meta
          name="keywords"
          content="Viraj Domadia, MERN Developer, React Developer, Node.js Developer, Portfolio, Full Stack Developer, MongoDB, Tailwind CSS"
        />
        <meta name="author" content="Viraj Domadia" />

        {/* Open Graph (OG) for social sharing */}
        <meta
          property="og:title"
          content="Viraj Domadia | Full Stack Developer"
        />
        <meta
          property="og:description"
          content="Explore Viraj Domadia's projects, skills, and professional experience as a MERN stack developer."
        />
        <meta
          property="og:image"
          content="https://virajdomadia.vercel.app/preview.jpg"
        />
        <meta property="og:url" content="https://virajdomadia.vercel.app" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Viraj Domadia | Full Stack Developer"
        />
        <meta
          name="twitter:description"
          content="Explore the portfolio of Viraj Domadia, MERN stack developer."
        />
        <meta
          name="twitter:image"
          content="https://virajdomadia.vercel.app/preview.jpg"
        />
      </Helmet>
      <header>
        <Navbar />
      </header>

      <main>
        <section id="hero">
          <Hero />
        </section>

        <section id="about">
          <AboutMe />
        </section>

        <section id="projects">
          <Project />
        </section>

        <section id="contact">
          <ContactMe />
        </section>
      </main>

      <footer className="text-center p-4 mt-10 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Viraj Domadia. All rights reserved.
      </footer>
    </>
  );
}

export default App;
