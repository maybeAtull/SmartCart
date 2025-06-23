import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    address: "",
  });

  const handleSignup = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userDetails),
    });

    const data = await res.json();
    if (data.status === "success") {
      alert("Signup successful!");
      navigate("/home"); // Redirect to homepage after signup
    } else {
      alert("Signup failed, please try again.");
    }
  };

  const handleInputChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Side: Background Image */}
      <div
        className="hidden md:block md:w-1/2 h-64 md:h-full bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: "url('/cover.jpg')" }}
      >
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-white text-center">
          <h1 className="font-outfit text-3xl md:text-4xl font-bold">
            Join SmartCart
          </h1>
          <p className="font-poppins text-sm md:text-lg">Create your account</p>
        </div>
      </div>

      {/* Right Side: Signup Card */}
      <div className="w-full md:w-1/2 h-full flex items-center justify-center">
        <div className="w-full max-w-md bg-white p-8 md:p-10 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">
            Signup
          </h2>
          <p className="text-sm md:text-lg text-gray-600 text-center mb-6">
            Create an account to start shopping
          </p>

          <form className="w-full" onSubmit={handleSignup}>
            <div className="mb-4">
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={userDetails.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className="w-full mt-1 px-4 py-3 border rounded-md focus:ring focus:ring-indigo-300"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={userDetails.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                className="w-full mt-1 px-4 py-3 border rounded-md focus:ring focus:ring-indigo-300"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={userDetails.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full mt-1 px-4 py-3 border rounded-md focus:ring focus:ring-indigo-300"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={userDetails.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="w-full mt-1 px-4 py-3 border rounded-md focus:ring focus:ring-indigo-300"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Address</label>
              <textarea
                name="address"
                value={userDetails.address}
                onChange={handleInputChange}
                placeholder="Enter your address"
                rows={3}
                className="w-full mt-1 px-4 py-3 border rounded-md focus:ring focus:ring-indigo-300"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700"
            >
              Signup
            </button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{" "}
              <a href="/login" className="text-indigo-600 hover:underline">
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;