// src/pages/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="space-y-4">
        <Link
          to="/AdminLogin"
          className="text-blue-600 underline hover:text-blue-800"
        >
          Admin Login
        </Link>
        <Link
          to="/MenuManagement"
          className="text-blue-600 underline hover:text-blue-800"
        >
          Menu Management
        </Link>
        <Link
          to="/OrderManagement"
          className="text-blue-600 underline hover:text-blue-800"
        >
          Order Management
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
