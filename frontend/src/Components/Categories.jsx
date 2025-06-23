import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react'; 
import axios from 'axios';

const Categories = ({ onSelectCategory }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the backend
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleCategoryClick = (item) => {
    setActiveCategory(item);
    onSelectCategory(item); // this Notify parent (App.jsx)
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Toggle Button for Mobile */}
      <button
        onClick={toggleMenu}
        className="md:hidden p-4 bg-gray-100 shadow-md flex items-center justify-between"
      >
        <span className="text-gray-800 font-semibold">Categories</span>
        <Menu className="w-5 h-5" />
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } md:block w-50 h-full bg-gray-100 p-4 shadow-md overflow-y-auto`}
      >
        <h2 className="text-l font-bold mb-4 text-gray-800">Categories</h2>
        <ul className="space-y-2">
          {categories.map((item, index) => (
            <li
              key={index}
              className={`p-2 rounded cursor-pointer transition ${
                activeCategory === item
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-200 text-gray-700'
              }`}
              onClick={() => handleCategoryClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Categories;
