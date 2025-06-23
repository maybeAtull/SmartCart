import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Categories from "../Components/Categories";
import Item from "../Components/Item";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("Fruits");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div
      className="h-screen overflow-hidden bg-cover bg-no-repeat bg-center bg-fixed"
      style={{ backgroundImage: `url('/src/assets/bg2.jpg')` }}
    >
      <Navbar username={username} />

      <div className="flex h-[calc(100vh-64px)]"> {/* Adjust if your navbar isn't 64px tall */}
        <Categories onSelectCategory={setSelectedCategory} />

        <div className="flex-1 overflow-y-auto p-4">
          <Item selectedCategory={selectedCategory} />
        </div>
      </div>
    </div>

  );

};

export default Home;
