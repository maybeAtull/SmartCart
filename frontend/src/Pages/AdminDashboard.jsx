import React from 'react';
import Navbar from '../AdminComponents/AdminNavbar';
import Sidebar from '../AdminComponents/AdminSidebar';
import { Routes, Route } from 'react-router-dom';
import AddItems from '../AdminComponents/AddItems';
import Users from '../AdminComponents/Users';
import Orders from '../AdminComponents/Orders';
import ManageItems from '../AdminComponents/ManageItems';
import Queries from '../AdminComponents/Queries';
import Payment from '../AdminComponents/Payment';

const AdminDashboard = () => {
  return (
    <div className="h-screen flex flex-col">
      {/* Navbar (Fixed at the Top) */}
      <div className="fixed top-0 left-0 w-full z-10">
        <Navbar />
      </div>

      {/* Sidebar + Main Content */}
      <div className="flex flex-1 mt-[60px]"> {/* Adjust `mt` to match Navbar height */}
        {/* Sidebar (Fixed on the left) */}
        <div className="fixed left-0 w-64 h-full">
          <Sidebar />
        </div>

        {/* Main Content (Scrollable) */}
        <div className="flex-1 bg-gray-900 text-white p-6 ml-64 overflow-auto h-[calc(100vh-60px)]">
          <Routes>
            <Route path="additems" element={<AddItems />} />
            <Route path="users" element={<Users />} />
            <Route path="orders" element={<Orders />} />
            <Route path="manageitems" element={<ManageItems />} />
            <Route path="queries" element={<Queries/>} />
            <Route path="payment" element={<Payment/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;