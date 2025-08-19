import React from "react";

const Navbar = ({ darkMode, setDarkMode }) => {
  return (
    <div className="py-3 max-w-screen-2xl mx-auto container px-6 md:px-40 shadow-lg h-16 fixed bg-white dark:bg-gray-900">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold cursor-pointer text-gray-900 dark:text-white">
          Word<span className="text-3xl text-green-500">To</span>PDF
        </h1>

        <div className="flex items-center gap-6">
          {/* Home Link */}
          <h1 className="mt-1 text-2xl font-bold cursor-pointer hover:scale-110 transition-transform text-gray-800 dark:text-gray-200">
            Home
          </h1>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:scale-105 transition-transform"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
