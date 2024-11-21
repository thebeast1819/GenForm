import React from "react";
import ThemeToggle from "./ThemeToggle";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-50">
      <div className="flex justify-end p-4">
        <ThemeToggle />
      </div>
      {children}
    </div>
  );
};

export default Layout;

