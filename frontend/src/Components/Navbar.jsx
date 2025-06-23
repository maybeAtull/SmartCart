

import React, { useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import profImage from '../assets/prof.jpg';

const Navbar = ({ username }) => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const goToCart = () => {
    navigate('/cart');
  };

  const goToOrders = () => {
    navigate('/orders'); // 
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.clear();
    navigate('/');
  };

  return (
    <div
      className="flex items-center justify-between px-6 py-4 shadow-md w-full"
      style={{ backgroundColor: 'rgba(213, 233, 222, 0.53)' }}
    >
      {/* Logo */}
      <div className="text-2xl font-semibold text-gray-600 font-outfit">
        SmartCart
      </div>

      {/* User section */}
      <div className="relative flex items-center gap-3">
        <button onClick={goToCart} className="text-gray-600 hover:text-gray-800">
          <FiShoppingCart size={22} />
        </button>

        <span className="text-gray-700 text-sm hidden sm:inline">
          {username || 'User'}
        </span>

        <img
          src={profImage}
          alt="User"
          className="w-10 h-10 rounded-full cursor-pointer object-cover"
          onClick={() => setShowMenu(!showMenu)}
        />

        {/* Dropdown */}
        {showMenu && (
          <div className="absolute right-0 top-14 w-40 bg-white border border-gray-200 rounded-lg shadow-md z-50">
            <ul className="py-2 text-sm text-gray-700">
              <li 
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={goToOrders} // ✅ Added navigation to Orders.jsx
              >
                Orders
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;