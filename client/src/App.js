// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import MenuManagement from './pages/MenuManagement';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/MenuManagement" element={<MenuManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
