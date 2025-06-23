import React from "react";
import Logo from "../Assets/Logo.svg";
import { BsTwitter, BsYoutube } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 px-6 py-12 mt-16 text-gray-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="flex flex-col items-start gap-4">
          {/* <img src={Logo} alt="Logo" className="w-32" /> */}
          <div className="flex items-center gap-4 text-xl text-gray-600">
            <BsTwitter className="hover:text-blue-500 cursor-pointer" />
            <SiLinkedin className="hover:text-blue-700 cursor-pointer" />
            <BsYoutube className="hover:text-red-500 cursor-pointer" />
            <FaFacebookF className="hover:text-blue-600 cursor-pointer" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full md:w-2/3">
          <div className="flex flex-col gap-2 text-sm">
            <span className="hover:underline cursor-pointer">Quality</span>
            <span className="hover:underline cursor-pointer">Help</span>
            <span className="hover:underline cursor-pointer">Share</span>
            <span className="hover:underline cursor-pointer">Careers</span>
            <span className="hover:underline cursor-pointer">Work</span>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <span>244-5333-7378</span>
            <span>SmartCart@food.com</span>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <span className="hover:underline cursor-pointer">Terms & Conditions</span>
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
