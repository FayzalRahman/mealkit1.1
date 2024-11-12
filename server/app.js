// app.js
const express = require('express');
const cors = require('cors');
const db = require('./db'); // Import the MySQL connection
const app = express();

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
      return res.status(500).json({ error: err.message });
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

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
