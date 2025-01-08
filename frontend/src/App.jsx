import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Use BrowserRouter
import "./App.css";
import Navbar from "./components/Navbar";
import ThemeProvider from "./components/ThemeContext";
import Home from "./components/Home";

function App() {
  return (
    <>
      <ThemeProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
