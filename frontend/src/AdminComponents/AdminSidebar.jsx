import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
  return (
 <div className="fixed left-0 top-0 h-screen w-64 border-r bg-white shadow-md">
  <ul className="mt-15 text-[#515151]">
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 py-3.5 px-6 cursor-pointer ${
              isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5F6FFF]' : ''
            }`
          }
          to="/admin/additems"
          end
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/1828/1828859.png"
            alt="Items Icon"
            className="w-5 h-5"
          />
          <p>Add Items</p>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 py-3.5 px-6 cursor-pointer ${
              isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5F6FFF]' : ''
            }`
          }
          to="/admin/manageitems"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3144/3144456.png"
            alt="Manage Items Icon"
            className="w-5 h-5"
          />
          <p>Manage Items</p>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 py-3.5 px-6 cursor-pointer ${
              isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5F6FFF]' : ''
            }`
          }
          to="/admin/orders"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3523/3523885.png"
            alt="Orders Icon"
            className="w-5 h-5"
          />
          <p>Orders</p>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 py-3.5 px-6 cursor-pointer ${
              isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5F6FFF]' : ''
            }`
          }
          to="/admin/users"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            alt="Users Icon"
            className="w-5 h-5"
          />
          <p>Users</p>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 py-3.5 px-6 cursor-pointer ${
              isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5F6FFF]' : ''
            }`
          }
          to="/admin/queries"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/1041/1041916.png"
            alt="Queries Icon"
            className="w-5 h-5"
          />
          <p>User Queries</p>
        </NavLink>


        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 py-3.5 px-6 cursor-pointer ${
              isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5F6FFF]' : ''
            }`
          }
          to="/admin/payment"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/1041/1041925.png"
            alt="payment Icon"
            className="w-5 h-5"
          />
          <p>Payment Details</p>
        </NavLink>
      </ul>
    </div>
  );
};

export default AdminSidebar;