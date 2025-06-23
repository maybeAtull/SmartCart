import React from "react";
import AboutBackground from "../Assets/about-background.png";
import AboutBackgroundImage from "../Assets/about-background-image.png";
import { BsFillPlayCircleFill } from "react-icons/bs";

const About = () => {
  return (
    <div className="relative flex flex-col lg:flex-row items-center justify-between px-6 py-16 lg:px-20 bg-white">
      {/* Background Image */}
      <div className="absolute left-0 top-0 -z-10 w-full h-full opacity-10 lg:opacity-100">
        <img src={AboutBackground} alt="Background" className="w-full h-full object-cover" />
      </div>

      {/* Foreground Image */}
      <div className="w-full lg:w-1/2 flex justify-center mb-10 lg:mb-0">
        <img src={AboutBackgroundImage} alt="About" className="w-[80%] max-w-md lg:max-w-none" />
      </div>

      {/* Text Content */}
      <div className="w-full lg:w-1/2 text-center lg:text-left">
        <p className="text-lg font-semibold text-orange-500 mb-2">About</p>
        <h1 className="text-4xl font-bold text-gray-800 leading-tight mb-4">
          Food Is An Important Part Of A Balanced Diet
        </h1>
        <p className="text-gray-600 mb-4">
          Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et
          elit. Dolor turpis molestie dui magnis facilisis at fringilla quam.
        </p>
        <p className="text-gray-600 mb-6">
          Non tincidunt magna non et elit. Dolor turpis molestie dui magnis
          facilisis at fringilla quam.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition duration-300">
            Learn More
          </button>
          <button className="flex items-center gap-2 text-orange-500 border border-orange-500 px-6 py-3 rounded-lg hover:bg-orange-50 transition duration-300">
            <BsFillPlayCircleFill className="text-xl" />
            Watch Video
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
