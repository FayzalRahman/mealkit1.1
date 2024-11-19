import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Modal component
const Modal = ({ isOpen, onClose, title, children, error }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded shadow-lg max-w-lg w-full relative">
        {/* Modal Title and Close button */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-semibold">{title}</div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-[#F3F4F6] flex justify-center items-center rounded"
          >
            <span className="text-gray-600 font-bold text-xl">X</span>
          </button>
        </div>

        {/* Show error message inside the modal */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Modal Content */}
        {children}
      </div>
    </div>
  );
};

// Confirmation Modal for Delete
const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete this item? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-600 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const MenuManagement = () => {
  const [menu, setMenu] = useState([]);
  const [formData, setFormData] = useState({
    product_name: '',
    category: '',
    image: '',
    description: '',
    price: '',
    stock: ''
  });
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  // Fetch menu items from the API
  useEffect(() => {
    fetch('http://localhost:5000/MenuManagement')
      .then((response) => response.json())
      .then((data) => setMenu(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { product_name, category, image, description, price, stock } = formData;
    if (!product_name || !category || !image || !description || !price || !stock) {
      setError('All fields are required!');
      return false;
    }
    setError('');
    return true;
  };

  const handleAddOrUpdate = () => {
    if (!validateForm()) return;

    if (editIndex !== null) {
      const updatedMenu = [...menu];
      updatedMenu[editIndex] = formData;

      fetch(`http://localhost:5000/MenuManagement/${menu[editIndex].id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then(() => {
          setMenu(updatedMenu);
          closeModal();
        })
        .catch((error) => console.error('Error updating food item:', error));
    } else {
      fetch('http://localhost:5000/MenuManagement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          setMenu([...menu, { ...formData, id: data.productId }]);
          closeModal();
        })
        .catch((error) => console.error('Error adding new food item:', error));
    }
  };

  const handleAdd = () => {
    setModalTitle('Add New Menu Item');
    setFormData({
      product_name: '',
      category: '',
      image: '',
      description: '',
      price: '',
      stock: ''
    });
    setEditIndex(null);
    setIsModalOpen(true);
  };

  const handleEdit = (index) => {
    setModalTitle('Update Menu Item');
    setFormData(menu[index]);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const confirmDelete = (index) => {
    setDeleteIndex(index);
    setIsConfirmOpen(true);
  };

  const handleDelete = () => {
    const foodId = menu[deleteIndex].id;

    fetch(`http://localhost:5000/MenuManagement/${foodId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        const updatedMenu = menu.filter((_, i) => i !== deleteIndex);
        setMenu(updatedMenu);
        setIsConfirmOpen(false);
      })
      .catch((error) => console.error('Error deleting food item:', error));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      product_name: '',
      category: '',
      image: '',
      description: '',
      price: '',
      stock: ''
    });
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-100">
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





      <div className="flex flex-col items-center py-8">
      <h1 className="text-3xl font-bold mb-8">Menu Management</h1>

      <button
        onClick={handleAdd}
        className="p-2 bg-blue-500 text-white rounded mb-4"
      >
        Add New Menu Item
      </button>


      <div className="w-full flex justify-center">
  {menu.length === 0 ? (
    <p className="text-gray-500 text-center">No menu items available.</p>
  ) : (
    <div className="flex flex-wrap justify-center gap-4">
      {menu.map((item, index) => (
        <div
          key={item.id}
          className="w-64 p-4 bg-white rounded shadow flex flex-col items-start"
        >
          <div className="w-full">
            <img
              className="w-full h-48 object-cover rounded"
              src={item.image}
              alt={item.image}
            />
            <h2 className="text-xl font-bold mt-2">{item.product_name}</h2>
            <p>{item.category}</p>
            <p>
              {item.description.length > 25
                ? item.description.slice(0, 25) + "....."
                : item.description}
            </p>
            <p>Price: ${item.price}</p>
            <p>Stock: {item.stock}</p>
          </div>
          {/* Buttons positioned at the bottom */}
          <div className="flex space-x-2 mt-4 self-stretch">
            <button
              onClick={() => handleEdit(index)}
              className="flex-grow bg-yellow-500 text-white py-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => confirmDelete(index)}
              className="flex-grow bg-red-500 text-white py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )}
</div>





      {/* Modal for form */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalTitle}
        error={error}
      >
        <div>
          <div className="mb-2">
            <label className="block font-semibold">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="product_name"
              value={formData.product_name}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded mb-2 w-full"
              placeholder="Product Name"
            />
          </div>

          <div className="mb-2">
            <label className="block font-semibold">
              Category <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded mb-2 w-full"
              placeholder="Category"
            />
          </div>

          <div className="mb-2">
            <label className="block font-semibold">
              Image URL <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded mb-2 w-full"
              placeholder="Image URL"
            />
          </div>

          <div className="mb-2">
            <label className="block font-semibold">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded mb-2 w-full"
              placeholder="Description"
            />
          </div>

          <div className="mb-2">
            <label className="block font-semibold">
              Price <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded mb-2 w-full"
              placeholder="Price"
            />
          </div>

          <div className="mb-2">
            <label className="block font-semibold">
              Stock <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded mb-2 w-full"
              placeholder="Stock"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              onClick={closeModal}
              className="bg-gray-200 text-gray-600 p-2 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleAddOrUpdate}
              className="bg-green-500 text-white p-2 rounded"
            >
              {editIndex !== null ? 'Update Item' : 'Add Item'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDelete}
      />
      </div>
    </div>
  );
};

export default MenuManagement;
