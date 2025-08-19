import React from "react";

const Footer = () => {
  return (
    <footer className="w-full mt-8 bg-gray-100 dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-40 py-4 flex flex-col items-center justify-center">
        <h1 className="text-center text-sm text-gray-600 dark:text-gray-400">
          © 2025 <span className="font-semibold">WordToPdf</span>, LLC. All
          rights reserved.
        </h1>
      </div>
    </footer>
  );
};

export default Footer;
