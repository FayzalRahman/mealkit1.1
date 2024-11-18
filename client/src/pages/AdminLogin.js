// AdminLogin.js
import React, { useState } from 'react';
import Header from '../components/Header'; // Import the Header component

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // Dummy login check (replace with actual authentication logic)
    if (username === 'admin' && password === 'admin') {
      // Redirect to the dashboard or another page after successful login
      // Example: history.push('/dashboard');
      alert('Login Successful');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      <Header /> {/* Add the Header here */}
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8">
        <div className="bg-white p-8 rounded shadow-lg w-full max-w-sm">
          <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-semibold mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-semibold mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
