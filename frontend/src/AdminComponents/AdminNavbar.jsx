import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    navigate('/home');
  };

  return (
    <div className='flex justify-between items-center py-3 px-10 border-b border-gray-200 bg-white'>
      <div className='flex items-center'>
        <h3 className="text-xl font-semibold text-[#5F6FFF]">SmartCart</h3>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-gray-700 font-medium bg-gray-100 px-3 py-1 rounded-full hidden sm:inline">
          {username || 'User'}
        </span>
        <button 
          onClick={handleLogout}
          className='py-1.5 px-4 text-white bg-[#5F6FFF] hover:bg-[#4a57e4] rounded-full transition'>
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminNavbar;
