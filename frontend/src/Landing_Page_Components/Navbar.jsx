import React, { useState } from "react";
import { HiOutlineBars3 } from "react-icons/hi2";
import { Link as ScrollLink } from "react-scroll"; // Import Link from react-scroll for smooth scrolling
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();


  const menuOptions = [
    {
      text: "Home",
      link: "home", // Reference section IDs
    },
    {
      text: "About",
      link: "about",
    },
    {
      text: "Contact",
      link: "contact",
    },
  ];

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="text-xl font-semibold">
        <h3>SmartCart</h3>
      </div>
      <div className="hidden md:flex space-x-6">
        {menuOptions.map((item) => (
          <ScrollLink
            key={item.text}
            to={item.link} // Scroll to the section with the same ID
            smooth={true} // Enable smooth scrolling
            duration={500} // Scroll speed
            className="text-lg text-gray-700 hover:text-green-500"
          >
            {item.text}
          </ScrollLink>
        ))}
        <button onClick={() => navigate("/Login")} className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600">
          Login
        </button>
      </div>
      <div className="md:hidden">
        <HiOutlineBars3
          className="text-2xl cursor-pointer"
          onClick={() => setOpenMenu(true)}
        />
      </div>

      {/* Mobile Drawer */}
      {openMenu && (
        <div className="fixed top-0 right-0 z-50 w-3/4 h-full bg-white shadow-md p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">SmartCart</h2>
            <button
              className="text-2xl"
              onClick={() => setOpenMenu(false)}
            >
              &times;
            </button>
          </div>
          <div className="space-y-4">
            {menuOptions.map((item) => (
              <ScrollLink
                key={item.text}
                to={item.link}
                smooth={true}
                duration={500}
                className="block text-lg text-gray-700 hover:text-green-500"
                onClick={() => setOpenMenu(false)} // Close the menu on click
              >
                {item.text}
              </ScrollLink>
            ))}
          </div>
          <button onClick={() => navigate("/Login")} className="mt-6 bg-green-500 text-white py-2 px-6 rounded-md w-full hover:bg-green-600">
            Login
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
