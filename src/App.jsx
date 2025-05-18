import "./App.css";
import AboutMe from "./components/AboutMe";
import ContactMe from "./components/ContactMe";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Project from "./components/Project";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutMe />
      <Project />
      <ContactMe />
    </>
  );
}

export default App;
