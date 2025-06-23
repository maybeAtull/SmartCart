import React from "react";
import BannerBackground from "../Assets/home_bg.jpg";
import BannerImage from "../Assets/home-banner-image.png";
import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";

const Home = () => {
  return (
    <div className="relative">
      <Navbar />
      <div className="relative w-full min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${BannerBackground})` }}>
        <div className="absolute inset-0 flex items-center justify-between px-6 md:px-12">
          <div className="text-black max-w-lg">
            <h1 className="text-5xl md:text-6xl font-semibold">Your Favourite Grocery</h1>
            <p className="mt-4 text-4lg md:text-xl">Fresh and Healthy</p>
            {/* <button className="mt-6 flex items-center bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600">
              Order Now <FiArrowRight className="ml-2" />
            </button> */}
          </div>
          <div className="hidden md:block">
            <img src={BannerImage} alt="Banner Image" className="w-[400px] md:w-[400px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
