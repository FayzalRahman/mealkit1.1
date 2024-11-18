// Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-700 text-white p-3 sticky top-0 z-50 shadow-md">
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-semibold tracking-wide">Admin Panel</h1>
        <div className="flex space-x-6">
          <Link
            to="/"
            className="text-base font-medium hover:text-yellow-400 transition duration-300"
          >
            Dashboard
          </Link>
          <Link
            to="/MenuManagement"
            className="text-base font-medium hover:text-yellow-400 transition duration-300"
          >
            Menu Management
          </Link>
          <Link
            to="/OrderManagement"
            className="text-base font-medium hover:text-yellow-400 transition duration-300"
          >
            Order Management
          </Link>
          <Link
            to="/AdminLogin"
            className="text-base font-medium hover:text-yellow-400 transition duration-300"
          >
            Admin Login
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
