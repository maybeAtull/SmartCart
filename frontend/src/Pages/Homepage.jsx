import React from "react";
import Home from "../Landing_Page_Components/Home";
import About from "../Landing_Page_Components/About";
import Work from "../Landing_Page_Components/Work";
import Contact from "../Landing_Page_Components/Contact";
import Footer from "../Landing_Page_Components/Footer";

function Homepage() {
  return (
    <div className="Homepage">
      <div id="home">
        <Home />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="work">
        <Work />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <Footer />
    </div>
  );
}

export default Homepage;
