import React, { useContext } from "react";
import { NavLink } from "react-router-dom"; // Import NavLink from react-router-dom
import { ThemeContext } from "./ThemeContext"; // Import the theme context

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext); // Access theme and toggle function

  return (
    <div className="border-b-2 border-gray-200 py-2 px-40 flex items-center justify-between ">
      <h1 className="text-3xl font-bold">
        VIRAJ <span className="text-red-700">DOMADIA</span>
      </h1>

      {/* Navigation links */}
      <div className="flex items-center gap-10 text-xl font-semibold">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-red-700" : "hover:text-red-700"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "text-red-700" : "hover:text-red-700"
          }
        >
          About Me
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            isActive ? "text-red-700" : "hover:text-red-700"
          }
        >
          Projects
        </NavLink>
        <NavLink
          to="/blogs"
          className={({ isActive }) =>
            isActive ? "text-red-700" : "hover:text-red-700"
          }
        >
          Blogs
        </NavLink>
        <NavLink
          to="/contacts"
          className={({ isActive }) =>
            isActive ? "text-red-700" : "hover:text-red-700"
          }
        >
          Contact
        </NavLink>
      </div>

      {/* Theme Toggle Switch */}
      <div className="flex items-center gap-4">
        <span>{theme === "light" ? "🌞" : "🌙"}</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={theme === "dark"} // Toggle checked based on theme
            onChange={toggleTheme} // Call the toggle function when clicked
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
      </div>
    </div>
  );
};

export default Navbar;
