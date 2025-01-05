import React from "react";

import "./Home.css";
import About from "../../components/About/About";
import Contact from "../../components/Contact/Contact";

import Header from "../../components/header/header";
import Footer from "../../components/Footer/Footer";
import ExploreOfferings from "../../components/ExploreOfferings/ExploreOfferings";
// import About from "../../components/About/About";

const Home = () => {
  return (
    <>
      <Header />
      <div className="home-container" id="home">
        <div className="container main-container">
          <div>
            <h3>
              Welcome to our intuitive data viewing platform! Powered by S4
              HANA, we bring real-time, accurate data directly to your screen.
              Dive into actionable insights and experience the power of modern
              UI at your fingertips. Let's explore together!
            </h3>
          </div>
        </div>
        <ExploreOfferings />
        <About />
        <Contact />
      </div>
      <Footer />
    </>
  );
};

export default Home;
