import React, { useEffect, useState } from 'react';
import fallbackImage from '../assets/fallback.jpg';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Item = ({ selectedCategory }) => {
  const [items, setItems] = useState([]);
  const { cartItems, setCartItems } = useCart();
  const navigate = useNavigate();

  // Fetch items from DB and filter by selectedCategory
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/items');
        const filteredItems = res.data.filter(
          (item) => item.category?.toLowerCase() === selectedCategory?.toLowerCase()
        );
        setItems(filteredItems);
      } catch (err) {
        console.error('Error fetching items:', err);
      }
    };

    if (selectedCategory) {
      fetchItems();
    }
  }, [selectedCategory]);

  const handleAdd = (item) => {
    const newCartItem = {
      name: item.item_name,
      price: item.price,
      image_link: item.image_link || fallbackImage,
      qty: 1,
    };

    setCartItems((prev) => {
      const newCart = { ...prev };
      if (newCart[item.item_name]) {
        newCart[item.item_name].qty += 1; // Increment quantity if item already exists
      } else {
        newCart[item.item_name] = newCartItem; // Add new item
      }
      return newCart;
    });
  };

  const handleIncrement = (name) => {
    setCartItems((prev) => {
      // Deep clone is safer in some cases
      const newCart = JSON.parse(JSON.stringify(prev));
      if (newCart[name]) {
        newCart[name].qty = (newCart[name].qty || 0) + 1;
      }
      return newCart;
    });
  };
  
  const handleDecrement = (name) => {
    setCartItems((prev) => {
      const newCart = JSON.parse(JSON.stringify(prev));
      if (newCart[name]) {
        if (newCart[name].qty > 1) {
          newCart[name].qty -= 1;
        } else {
          delete newCart[name];
        }
      }
      return newCart;
    });
  };
  

  const goToCart = () => {
    navigate('/cart');
  };

  return (
    <div className="flex-1 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {items.map((item, index) => (
        <div key={index} className="bg-white p-4 shadow rounded-lg flex flex-col items-center">
          <img
            src={item.image_link || fallbackImage}
            alt={item.item_name}
            className="w-30 h-30 object-cover rounded mb-2"
          />
          <h3 className="text-lg font-semibold text-gray-800 capitalize">{item.item_name}</h3>
          <p className="text-sm text-gray-600 mt-1">Price: ₹{item.price}</p>

          {cartItems[item.item_name] ? (
            <div>
              <div className="flex items-center mt-2 gap-2">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded ml-2" // Add margin-left to shift the "-" button
                  onClick={() => handleDecrement(item.item_name)}
                >
                  -
                </button>
                <span>{cartItems[item.item_name].qty}</span>
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded ml-2" // Add margin-left to shift the "+" button
                  onClick={() => handleIncrement(item.item_name)}
                >
                  +
                </button>
              </div>
             
              {/* Show the 'Go to Cart' button only if the item is in the cart */}
              <div className="mt-4 w-full flex justify-center">
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded w-full"
                  onClick={goToCart}
                >
                  Go to Cart
                </button>
              </div>
            </div>
          ) : (
            <button
              className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
              onClick={() => handleAdd(item)}
            >
              Add to Cart
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Item;
