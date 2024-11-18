// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import MenuManagement from './pages/MenuManagement';
import OrderManagement from './pages/OrderManagement';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/MenuManagement" element={<MenuManagement />} />
        <Route path="/OrderManagement" element={<OrderManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
