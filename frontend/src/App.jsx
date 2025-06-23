import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cart from './Pages/Cart';
import Login from '../src/Pages/Login'
import Home from './Pages/Home'
import Homepage from './Pages/Homepage'
import AdminDashboard from './Pages/AdminDashboard';
import { CartProvider } from './context/CartContext';
import Signup from './Pages/Signup';
import OrderView from './Pages/OrderView';


const App = () => { 
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/orders" element={<OrderView />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
