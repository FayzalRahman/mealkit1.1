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

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    order_id: '',
    username: '',
    price: '',
    quantity: '',
    order_status: ''
  });
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');


  
  // Fetch orders from the API
  useEffect(() => {
    fetch('http://localhost:5000/OrderManagement')
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Filter orders based on search query
  const filteredOrders = orders.filter((order) =>
    order.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate indices for pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }; 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { order_id, username, price, quantity, order_status } = formData;
    if (!order_id || !username || !price || !quantity || !order_status) {
      setError('All fields are required!');
      return false;
    }
    setError('');
    return true;
  };

  const handleAddOrUpdate = () => {
    if (!validateForm()) return;

    if (editIndex !== null) {
        const updatedOrders = [...orders];
        updatedOrders[editIndex] = formData;
    
        fetch(`http://localhost:5000/OrderManagement/${orders[editIndex].order_id}`, { // use order_id instead of id
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order_status: formData.order_status }), // send only order_status
        })
          .then((response) => response.json())
          .then(() => {
            setOrders(updatedOrders);
            closeModal();
          })
          .catch((error) => console.error('Error updating order:', error));
      } else {
        fetch('http://localhost:5000/OrderManagement', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
          .then((response) => response.json())
          .then((newOrder) => {
            setOrders([...orders, newOrder]);
            closeModal();
          })
          .catch((error) => console.error('Error adding order:', error));
      }
  };

  const handleEdit = (index) => {
    setModalTitle('Update Order');
    setFormData(orders[index]);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      order_id: '',
      username: '',
      price: '',
      quantity: '',
      order_status: ''
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
        <h1 className="text-3xl font-bold mb-8">Order Management</h1>

        {/* Search Bar */}
        <div className="mb-4 w-full max-w-7xl flex justify-center">
          <input
            type="text"
            placeholder="Search by username"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full max-w-lg"
          />
        </div>        

        <div className="w-full max-w-7xl overflow-x-auto">
          {orders.length === 0 ? (
            <p className="text-gray-500">No orders available.</p>
          ) : (
            <table className="min-w-full table-auto bg-white shadow-md rounded">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-center">Order ID</th>
                  <th className="py-2 px-4 border-b text-center">Username</th>
                  <th className="py-2 px-4 border-b text-center">Price</th>
                  <th className="py-2 px-4 border-b text-center">Quantity</th>
                  <th className="py-2 px-4 border-b text-center">Order Status</th>
                  <th className="py-2 px-4 border-b text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order, index) => (
                  <tr key={order.id}>
                    <td className="py-2 px-4 border-b text-center">{order.order_id}</td>
                    <td className="py-2 px-4 border-b text-center">{order.username}</td>
                    <td className="py-2 px-4 border-b text-center">${order.price}</td>
                    <td className="py-2 px-4 border-b text-center">{order.quantity}</td>
                    <td className="py-2 px-4 border-b text-center">{order.order_status}</td>
                    <td className="py-2 px-4 border-b text-center">
                      <button
                        onClick={() => handleEdit(index)}
                        className="bg-yellow-500 text-white p-2 rounded"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                Order Status <span className="text-red-500">*</span>
              </label>
              <select
                name="order_status"
                value={formData.order_status}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded mb-2 w-full"
              >
                <option value="">Select status</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Shipped">Shipped</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <button
              onClick={handleAddOrUpdate}
              className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mt-4"
            >
              {editIndex !== null ? 'Update Order' : 'Add Order'}
            </button>
          </div>
        </Modal>
              {/* Pagination */}
              <div className="mt-6 flex justify-center space-x-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-2 rounded ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
