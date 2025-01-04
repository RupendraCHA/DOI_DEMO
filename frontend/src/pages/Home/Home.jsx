import React from "react";

import "./Home.css";

import Header from "../../components/header/header";
import Footer from "../../components/Footer/Footer";
import About from "../../components/About/About";

const Home = () => {
  return (
    <>
      <Header />
      <div className="home-container">
        <div className="container main-container">Main</div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
