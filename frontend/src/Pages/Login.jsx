import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault(); 
  const res = await fetch("http://localhost:5000/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (data.status === "success") {
    localStorage.setItem("username", data.username);
    localStorage.setItem("role", data.role);
    localStorage.setItem("customer_number",data.customer_num)

    if (data.role === "admin") {
      navigate("/admin"); // redirect to admin dashboard
    } else {
      navigate("/home"); // redirect to user homepage
    }
  } else {
    alert("Invalid credentials");
  }
};

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Side: Background Image */}
      <div
        className="hidden md:block md:w-1/2 h-64 md:h-full bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: "url('/cover.jpg')" }}
      >
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-white text-center">
          <h1 className="font-outfit text-3xl md:text-4xl font-bold">Your own store</h1>
          <p className="font-poppins text-sm md:text-lg">Login to continue</p>
        </div>
      </div>

      {/* Right Side: Login Card */}
      <div className="w-full md:w-1/2 h-full flex items-center justify-center">
        <div className="w-full max-w-md bg-white p-8 md:p-10 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">Login</h2>
          <p className="text-sm md:text-lg text-gray-600 text-center mb-6">
            Access your account to manage your store
          </p>

          <form className="w-full" onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full mt-1 px-4 py-3 border rounded-md focus:ring focus:ring-indigo-300"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full mt-1 px-4 py-3 border rounded-md focus:ring focus:ring-indigo-300"
              />
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-2">
              <label className="flex items-center text-gray-700">
                <input type="checkbox" className="mr-2" /> Remember me
              </label>
              <a href="/" className="text-sm text-indigo-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700"
            >
              Login
            </button>
            <p className="text-center text-sm text-gray-600 mt-4">
              Don't have an account?{" "}
              <a href="/signup" className="text-indigo-600 hover:underline">
                Signup here
              </a>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
