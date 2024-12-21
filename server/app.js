// app.js
const express = require('express');
const cors = require('cors');
const db = require('./db'); // Import the MySQL connection
const app = express();
const bcrypt = require('bcryptjs'); // For hashing passwords
const jwt = require('jsonwebtoken'); // For generating JWT tokens

app.use(express.json()); // To parse JSON requests
app.use(cors());         // To handle cross-origin requests

// Create a new menu item (Create)
app.post('/MenuManagement', (req, res) => {
  const { product_name, category, image, description, price, stock } = req.body;
  const query = 'INSERT INTO menumanage (product_name, category, image, description, price, stock) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [product_name, category, image, description, price, stock], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Product added successfully!', productId: result.insertId });
  });
});

// Get all menu items (Read)
app.get('/MenuManagement', (req, res) => {
  const query = 'SELECT * FROM menumanage';
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Cannot connect to the database' });
    }
    res.status(200).json(result);
  });
});

// Update a menu item (Update)
app.put('/MenuManagement/:id', (req, res) => {
  const { id } = req.params;
  const { product_name, category, image, description, price, stock } = req.body;
  const query = 'UPDATE menumanage SET product_name = ?, category = ?, image = ?, description = ?, price = ?, stock = ? WHERE id = ?';
  db.query(query, [product_name, category, image, description, price, stock, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found!' });
    }
    res.status(200).json({ message: 'Product updated successfully!' });
  });
});

// Delete a menu item (Delete)
app.delete('/MenuManagement/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM menumanage WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found!' });
    }
    res.status(200).json({ message: 'Product deleted successfully!' });
  });
});

// Get all orders (Read)
app.get('/OrderManagement', (req, res) => {
  const query = 'SELECT * FROM orders';
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Cannot connect to the database' });
    }
    res.status(200).json(result);
  });
});


// Update an order status (Update)
app.put('/OrderManagement/:id', (req, res) => {
  const { id } = req.params;
  const { order_status } = req.body; // Only extracting order_status
  const query = 'UPDATE orders SET order_status = ? WHERE order_id = ?'; // Only update order_status
  db.query(query, [order_status, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Order not found!' });
    }
    res.status(200).json({ message: 'Order status updated successfully!' });
  });
});

// Dummy admin credentials (replace with a database check in real app)
const adminCredentials = {
  username: 'admin',
  password: '$2a$12$i4049rxXrrzyET77SuDqWeRKIPZ0QVexEOlu7R5D/AqWzw/zURkvy', // Hashed password for 'admin123'
};

// Admin login route
app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  if (username !== adminCredentials.username) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  bcrypt.compare(password, adminCredentials.password, (err, result) => {
    if (err || !result) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token (you can add more security and user-specific data in the token)
    const token = jwt.sign({ username }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
    });
  });
});

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
