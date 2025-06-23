import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Cart = () => {
  
  const navigate = useNavigate(); // Hook for navigation
  const { cartItems, setCartItems } = useCart();
  const [userDetails, setUserDetails] = useState({
    name: '',
    phone: '',
    address: ''
  });

   const handleCheckout = async () => {
    const { name, phone, address } = userDetails;
    const customer_no = localStorage.getItem("customer_number");
    console.log(customer_no)


    if (!name || !phone || !address) {
        alert("Please fill in all shipping details.");
        return;
    }

    const items = Object.entries(cartItems).map(([itemName, item]) => ({
        name: itemName,
        qty: item.qty,
    }));

    const totalAmount = calculateTotal();

    const options = {
        key: "rzp_test_OZTmZAy2h8Wt1Y",
        amount: totalAmount * 100,
        currency: "INR",
        name: "SmartCart Pvt Ltd",
        description: "Order Payment",
        handler: async function (response) {
            alert("Payment successful! Payment ID: " + response.razorpay_payment_id);

            // **Only insert order after successful payment**
            const payload = {
                customer_num:customer_no,
                name,
                phone,
                address,
                items,
                total: totalAmount,
                date: new Date().toISOString(),
                payment_id: response.razorpay_payment_id,
                payment_mode: "Online",
                payment_status: "Paid"
            };


            try {
                const res = await axios.post("http://localhost:5000/api/checkout", payload);
                if (res.data.status === "success") {
                    alert("Order placed successfully!");
                    clearCart();
                    navigate("/home");
                } else {
                    alert("Failed to save order after payment.");
                }
            } catch (error) {
                console.error("Order saving error:", error.response?.data || error);
                alert("An error occurred while saving your order.");
            }
        },
        prefill: {
            name: userDetails.name,
            contact: userDetails.phone,
        },
        notes: {
            address: userDetails.address,
        },
        theme: {
            color: "#F59E0B",
        },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
};


const handlePayByCash = async () => {
    const { name, phone, address } = userDetails;

    if (!name || !phone || !address) {
        alert("Please fill in all shipping details.");
        return;
    }

    const items = Object.entries(cartItems).map(([itemName, item]) => ({
        name: itemName,
        qty: item.qty,
    }));

    const customer_no = localStorage.getItem("customer_number");
    console.log(customer_no)
    const payload = {
        customer_num:customer_no,
        name,
        phone,
        address,
        items,
        total: calculateTotal(),
        date: new Date().toISOString(),
        payment_id: "Paid By Cash",
        payment_mode: "Cash",
        payment_status: "Success"
    };


    try {
        const res = await axios.post("http://localhost:5000/api/checkout", payload);
        if (res.data.status === "success") {
            alert("Order placed successfully (Cash Payment)!");
            clearCart();
            navigate("/home"); // Redirect to home page
        } else {
            alert("Failed to save order.");
        }
    } catch (error) {
        console.error("Order saving error:", error.response?.data || error);
        alert("An error occurred while saving your order.");
    }
};
  const calculateTotal = () => {
    return Object.values(cartItems).reduce(
      (total, item) => total + item.price * item.qty,
      0
    );
  };

  const clearCart = () => {
    setCartItems({});
  };

  const handleInputChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left - Cart Items */}
      <div
        className="md:w-2/3 h-screen overflow-y-auto p-4 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url('/src/assets/bg6.jpg')`,
          backgroundPosition: 'center 10%',
        }}
      >
        <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
        <div className="space-y-4">
          {Object.entries(cartItems).map(([itemName, item]) => (
            <div
              key={itemName}
              className="flex items-center gap-4 border-b pb-4"
            >
              <img
                src={item.image_link}
                alt={itemName}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <h2 className="font-medium">{itemName}</h2>
                <p>₹{item.price} × {item.qty}</p>
              </div>
              <div className="font-semibold">₹{item.price * item.qty}</div>
            </div>
          ))}
        </div>

        <button
          onClick={clearCart}
          className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded"
        >
          Clear Cart
        </button>
      </div>

      {/* Right - Shipping Details & Total */}
      <div className="md:w-1/3 h-screen bg-neutral-900 text-white p-6">
        <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={userDetails.name}
            onChange={handleInputChange}
            className="w-full border-b border-gray-400 bg-transparent text-white placeholder-gray-400 py-2 focus:outline-none focus:border-white"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={userDetails.phone}
            onChange={handleInputChange}
            className="w-full border-b border-gray-400 bg-transparent text-white placeholder-gray-400 py-2 focus:outline-none focus:border-white"
          />
          <textarea
            name="address"
            placeholder="Shipping Address"
            rows={3}
            value={userDetails.address}
            onChange={handleInputChange}
            className="w-full border-b border-gray-400 bg-transparent text-white placeholder-gray-400 py-2 focus:outline-none focus:border-white"
          />
        </div>

          <div className="mt-6 border-t border-gray-700 pt-4">
            <div className="flex justify-between text-lg font-medium">
                <span>Total:</span>
                <span>₹{calculateTotal()}</span>
            </div>

            <button
                onClick={handleCheckout}
                className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded"
            >
                Checkout
            </button>

            <button
                onClick={handlePayByCash}
                className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded"
            >
                Pay By Cash
            </button>
        </div>
      </div>
    </div>

  );
};

export default Cart;
