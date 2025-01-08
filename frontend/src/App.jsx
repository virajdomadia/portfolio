import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Use BrowserRouter
import "./App.css";
import Navbar from "./components/Navbar";
import ThemeProvider from "./components/ThemeContext";
import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import Blogs from "./components/Blogs";
import Contact from "./components/Contact";

function App() {
  return (
    <>
      <ThemeProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/contacts" element={<Contact />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
